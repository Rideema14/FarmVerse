import { PrismaClient } from '@prisma/client';
import translate from 'google-translate-api-x';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const TARGET_LANGS = ['hi', 'mr', 'gu', 'pa'];
const OUT_FILE = path.join(__dirname, '../../frontend/src/utils/dynamic_translations.json');

// Helper to chunk arrays
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function main() {
  console.log('Fetching unique strings from DB...');
  
  const states = (await prisma.mandi.findMany({ select: { state: true }, distinct: ['state'] })).map(x => x.state);
  const districts = (await prisma.mandi.findMany({ select: { district: true }, distinct: ['district'] })).map(x => x.district);
  const mandis = (await prisma.mandi.findMany({ select: { name: true }, distinct: ['name'] })).map(x => x.name);
  const crops = (await prisma.crop.findMany({ select: { name: true }, distinct: ['name'] })).map(x => x.name);

  const products = await prisma.product.findMany({ select: { name: true, description: true }, });
  const seeds = await prisma.seed.findMany({ select: { name: true, description: true }, });
  const lands = await prisma.land.findMany({ select: { title: true, description: true, location: true }, });
  const machinery = await prisma.machinery.findMany({ select: { name: true, description: true }, });
  const dynamicStrings = [
    ...products.flatMap((x) => [x.name, x.description]),
    ...seeds.flatMap((x) => [x.name, x.description]),
    ...lands.flatMap((x) => [x.title, x.description, x.location]),
    ...machinery.flatMap((x) => [x.name, x.description]),
  ].filter(Boolean);

  // Dedup all strings across every seller-created catalog and land listing.
  const allStrings = Array.from(new Set([...states, ...districts, ...mandis, ...crops, ...dynamicStrings])).filter(Boolean);

  console.log(`Total unique strings to translate: ${allStrings.length}`);

  // Load existing to avoid re-translating if run multiple times
  let existing = {};
  if (fs.existsSync(OUT_FILE)) {
    existing = JSON.parse(fs.readFileSync(OUT_FILE, 'utf-8'));
  }
  
  for (const lang of TARGET_LANGS) {
    if (!existing[lang]) existing[lang] = {};
  }

  // To avoid massive rate limits, let's just translate a subset for now or all if it allows
  const CHUNK_SIZE = 50;
  
  for (const lang of TARGET_LANGS) {
    const toTranslate = allStrings.filter(s => !existing[lang][s]);
    console.log(`Need to translate ${toTranslate.length} strings to ${lang}`);
    
    const chunks = chunkArray(toTranslate, CHUNK_SIZE);
    let count = 0;
    
    for (const chunk of chunks) {
      try {
        const res = await translate(chunk, { to: lang });
        // res can be an array if chunk has multiple
        const results = Array.isArray(res) ? res : [res];
        
        chunk.forEach((str, idx) => {
          existing[lang][str] = results[idx].text;
        });
        
        count += chunk.length;
        console.log(`Translated ${count}/${toTranslate.length} for ${lang}`);
        
        // Save intermediate
        fs.writeFileSync(OUT_FILE, JSON.stringify(existing, null, 2));
        
        // Slight delay
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        console.error(`Error translating chunk to ${lang}:`, err.message);
        // Pause and break this lang on error
        break;
      }
    }
  }

  async function persistRows<T extends { id: string; translations: unknown }>(
    rows: T[],
    getFields: (row: T) => Record<string, string | null | undefined>,
    update: (id: string, translations: Record<string, unknown>) => Promise<unknown>,
  ) {
    for (const row of rows) {
      const fields = getFields(row);
      const next: Record<string, unknown> = { ...(row.translations && typeof row.translations === 'object' ? row.translations as Record<string, unknown> : {}) };
      for (const lang of TARGET_LANGS) {
        next[lang] = {};
        for (const [field, value] of Object.entries(fields)) {
          if (value) (next[lang] as Record<string, string>)[field] = existing[lang][value] || value;
        }
      }
      await update(row.id, next);
    }
  }

  const productRows = await prisma.product.findMany({ select: { id: true, name: true, description: true, translations: true } });
  const seedRows = await prisma.seed.findMany({ select: { id: true, name: true, description: true, translations: true } });
  const landRows = await prisma.land.findMany({ select: { id: true, title: true, description: true, location: true, translations: true } });
  const machineryRows = await prisma.machinery.findMany({ select: { id: true, name: true, description: true, translations: true } });

  await persistRows(productRows, (r) => ({ name: r.name, description: r.description }), (id, translations) => prisma.product.update({ where: { id }, data: { translations } }));
  await persistRows(seedRows, (r) => ({ name: r.name, description: r.description }), (id, translations) => prisma.seed.update({ where: { id }, data: { translations } }));
  await persistRows(landRows, (r) => ({ title: r.title, description: r.description, location: r.location }), (id, translations) => prisma.land.update({ where: { id }, data: { translations } }));
  await persistRows(machineryRows, (r) => ({ name: r.name, description: r.description }), (id, translations) => prisma.machinery.update({ where: { id }, data: { translations } }));

  console.log(`Persisted translations for ${productRows.length} products, ${seedRows.length} seeds, ${landRows.length} land listings and ${machineryRows.length} machinery listings.`);
  console.log('Done mapping.');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
