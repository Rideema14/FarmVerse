import translate from 'google-translate-api-x';

const TARGET_LANGUAGES = ['hi', 'mr', 'gu', 'pa'] as const;

type TranslationRecord = Record<string, { name?: string; description?: string }>;

function clean(value?: string | null): string | undefined {
  const text = value?.trim();
  return text ? text : undefined;
}

function normalize(text: string): string {
  return text.trim().toLocaleLowerCase();
}

// Reliable local translations for common machinery names. The online translator
// is still used for arbitrary seller-entered names/descriptions.
const COMMON: Record<string, Record<string, string>> = {
  'tractor': { hi: 'ट्रैक्टर', mr: 'ट्रॅक्टर', gu: 'ટ્રેક્ટર', pa: 'ਟਰੈਕਟਰ' },
  'tractor rental': { hi: 'ट्रैक्टर किराया', mr: 'ट्रॅक्टर भाडे', gu: 'ટ્રેક્ટર ભાડે', pa: 'ਟਰੈਕਟਰ ਕਿਰਾਇਆ' },
  'rotavator': { hi: 'रोटावेटर', mr: 'रोटावेटर', gu: 'રોટાવેટર', pa: 'ਰੋਟਾਵੇਟਰ' },
  'cultivator': { hi: 'कल्टीवेटर', mr: 'कल्टीवेटर', gu: 'કલ્ટીવેટર', pa: 'ਕਲਟੀਵੇਟਰ' },
  'harvester': { hi: 'हार्वेस्टर', mr: 'हार्वेस्टर', gu: 'હાર્વેસ્ટર', pa: 'ਹਾਰਵੈਸਟਰ' },
  'combine harvester': { hi: 'कंबाइन हार्वेस्टर', mr: 'कंबाईन हार्वेस्टर', gu: 'કમ્બાઇન હાર્વેસ્ટર', pa: 'ਕੰਬਾਈਨ ਹਾਰਵੈਸਟਰ' },
  'seed drill': { hi: 'सीड ड्रिल', mr: 'सीड ड्रिल', gu: 'સીડ ડ્રિલ', pa: 'ਸੀਡ ਡ੍ਰਿਲ' },
  'thresher': { hi: 'थ्रेशर', mr: 'थ्रेशर', gu: 'થ્રેશર', pa: 'ਥ੍ਰੈਸ਼ਰ' },
  'plough': { hi: 'हल', mr: 'नांगर', gu: 'હળ', pa: 'ਹਲ' },
  'plow': { hi: 'हल', mr: 'नांगर', gu: 'હળ', pa: 'ਹਲ' },
  'sprayer': { hi: 'स्प्रेयर', mr: 'फवारणी यंत्र', gu: 'સ્પ્રેયર', pa: 'ਸਪ੍ਰੇਅਰ' },
  'power tiller': { hi: 'पावर टिलर', mr: 'पॉवर टिलर', gu: 'પાવર ટીલર', pa: 'ਪਾਵਰ ਟਿਲਰ' },
  'disc harrow': { hi: 'डिस्क हैरो', mr: 'डिस्क हॅरो', gu: 'ડિસ્ક હેરો', pa: 'ਡਿਸਕ ਹੈਰੋ' },
  'baler': { hi: 'बेलर', mr: 'बेलर', gu: 'બેલર', pa: 'ਬੇਲਰ' },
  'potato planter': { hi: 'आलू प्लांटर', mr: 'बटाटा लागवड यंत्र', gu: 'બટાકા પ્લાન્ટર', pa: 'ਆਲੂ ਪਲਾਂਟਰ' },
};

function localTranslation(text: string, to: string): string | undefined {
  return COMMON[normalize(text)]?.[to];
}

async function translateWithGoogle(text: string, to: string): Promise<string | undefined> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url, { signal: controller.signal, headers: { accept: 'application/json' } });
    clearTimeout(timer);
    if (!response.ok) return undefined;
    const data = await response.json() as unknown;
    const parts = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : [];
    const translated = parts.map((part) => Array.isArray(part) ? String(part[0] ?? '') : '').join('').trim();
    return translated && normalize(translated) !== normalize(text) ? translated : undefined;
  } catch {
    return undefined;
  }
}

async function translateWithMyMemory(text: string, to: string): Promise<string | undefined> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|${encodeURIComponent(to)}`;
    const response = await fetch(url, { signal: controller.signal, headers: { accept: 'application/json' } });
    clearTimeout(timer);
    if (!response.ok) return undefined;
    const data = await response.json() as { responseData?: { translatedText?: string } };
    const result = data.responseData?.translatedText?.trim();
    return result && normalize(result) !== normalize(text) ? result : undefined;
  } catch {
    return undefined;
  }
}

async function translateText(text: string, to: string): Promise<string> {
  const cleanText = clean(text)!;
  const local = localTranslation(cleanText, to);
  if (local) return local;

  const google = await translateWithGoogle(cleanText, to);
  if (google) return google;

  try {
    const result = await translate(cleanText, { to });
    const value = result.text?.trim();
    if (value && normalize(value) !== normalize(cleanText)) return value;
  } catch {}

  return (await translateWithMyMemory(cleanText, to)) ?? cleanText;
}

export async function translateMachineryContent(name?: string, description?: string): Promise<TranslationRecord | null> {
  const sourceName = clean(name);
  const sourceDescription = clean(description);
  if (!sourceName && !sourceDescription) return null;

  const entries = await Promise.all(
    TARGET_LANGUAGES.map(async (language) => {
      const [translatedName, translatedDescription] = await Promise.all([
        sourceName ? translateText(sourceName, language) : Promise.resolve(undefined),
        sourceDescription ? translateText(sourceDescription, language) : Promise.resolve(undefined),
      ]);
      return [language, { name: translatedName, description: translatedDescription }] as const;
    }),
  );

  return Object.fromEntries(entries);
}

export function mergeMachineryTranslations(existing: unknown, refreshed: TranslationRecord | null): TranslationRecord | null {
  if (!refreshed && !existing) return null;
  const base = existing && typeof existing === 'object' ? (existing as TranslationRecord) : {};
  return { ...base, ...(refreshed ?? {}) };
}
