import translate from 'google-translate-api-x';

export const CONTENT_LANGUAGES = ['hi', 'mr', 'gu', 'pa'] as const;
export type ContentLanguage = typeof CONTENT_LANGUAGES[number];
export type ContentTranslations = Record<string, Record<string, string>>;

const COMMON: Record<string, Record<string, string>> = {
  'rice': { hi: 'चावल', mr: 'तांदूळ', gu: 'ચોખા', pa: 'ਚੌਲ' },
  'wheat': { hi: 'गेहूं', mr: 'गहू', gu: 'ઘઉં', pa: 'ਕਣਕ' },
  'maize': { hi: 'मक्का', mr: 'मका', gu: 'મકાઈ', pa: 'ਮੱਕੀ' },
  'cotton': { hi: 'कपास', mr: 'कापूस', gu: 'કપાસ', pa: 'ਕਪਾਹ' },
  'soybean': { hi: 'सोयाबीन', mr: 'सोयाबीन', gu: 'સોયાબીન', pa: 'ਸੋਇਆਬੀਨ' },
  'sugarcane': { hi: 'गन्ना', mr: 'ऊस', gu: 'શેરડી', pa: 'ਗੰਨਾ' },
  'tractor': { hi: 'ट्रैक्टर', mr: 'ट्रॅक्टर', gu: 'ટ્રેક્ટર', pa: 'ਟਰੈਕਟਰ' },
  'rotavator': { hi: 'रोटावेटर', mr: 'रोटावेटर', gu: 'રોટાવેટર', pa: 'ਰੋਟਾਵੇਟਰ' },
  'cultivator': { hi: 'कल्टीवेटर', mr: 'कल्टीवेटर', gu: 'કલ્ટીવેટર', pa: 'ਕਲਟੀਵੇਟਰ' },
  'harvester': { hi: 'हार्वेस्टर', mr: 'हार्वेस्टर', gu: 'હાર્વેસ્ટર', pa: 'ਹਾਰਵੈਸਟਰ' },
  'seed': { hi: 'बीज', mr: 'बियाणे', gu: 'બીજ', pa: 'ਬੀਜ' },
  'fertilizer': { hi: 'उर्वरक', mr: 'खत', gu: 'ખાતર', pa: 'ਖਾਦ' },
};

function clean(value?: string | null) { return value?.trim() || undefined; }
function normalize(value: string) { return value.trim().toLocaleLowerCase(); }

async function fetchGoogleTranslate(text: string, to: ContentLanguage): Promise<string | undefined> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url, { signal: controller.signal, headers: { accept: 'application/json' } });
    clearTimeout(timer);
    if (!response.ok) return undefined;
    const data = await response.json() as unknown;
    const parts = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : [];
    const translated = parts
      .map((part) => Array.isArray(part) ? String(part[0] ?? '') : '')
      .join('')
      .trim();
    return translated && normalize(translated) !== normalize(text) ? translated : undefined;
  } catch {
    return undefined;
  }
}

async function fallbackTranslate(text: string, to: ContentLanguage): Promise<string | undefined> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|${encodeURIComponent(to)}`,
      { signal: controller.signal, headers: { accept: 'application/json' } },
    );
    clearTimeout(timer);
    if (!response.ok) return undefined;
    const data = await response.json() as { responseData?: { translatedText?: string } };
    const result = data.responseData?.translatedText?.trim();
    return result && normalize(result) !== normalize(text) ? result : undefined;
  } catch {
    return undefined;
  }
}

async function translateText(text: string, to: ContentLanguage): Promise<string> {
  const cleanText = clean(text)!;
  const common = COMMON[normalize(cleanText)]?.[to];
  if (common) return common;

  // Provider order is intentional: the direct Google endpoint handles arbitrary
  // seller-entered text without requiring an API key, while the package and
  // MyMemory provide additional fallbacks. This makes NEW listings multilingual
  // at creation/update time instead of depending on a one-time backfill.
  const google = await fetchGoogleTranslate(cleanText, to);
  if (google) return google;

  try {
    const result = await translate(cleanText, { to });
    const value = result.text?.trim();
    if (value && normalize(value) !== normalize(cleanText)) return value;
  } catch {}

  return (await fallbackTranslate(cleanText, to)) ?? cleanText;
}

export async function translateContent(fields: Record<string, string | null | undefined>): Promise<ContentTranslations> {
  const usable = Object.entries(fields).filter(([, value]) => clean(value));
  if (!usable.length) return {};
  const output: ContentTranslations = {};
  for (const language of CONTENT_LANGUAGES) {
    output[language] = {};
    for (const [field, value] of usable) output[language][field] = await translateText(clean(value)!, language);
  }
  return output;
}

export function mergeContentTranslations(existing: unknown, refreshed: ContentTranslations) {
  const base = existing && typeof existing === 'object' ? existing as ContentTranslations : {};
  return { ...base, ...refreshed };
}
