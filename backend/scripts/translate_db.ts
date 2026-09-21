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
  
  // Dedup all strings
  const allStrings = Array.from(new Set([...states, ...districts, ...mandis, ...crops])).filter(Boolean);
  
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

  console.log('Done mapping.');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
