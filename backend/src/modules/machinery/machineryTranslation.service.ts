import translate from 'google-translate-api-x';

const TARGET_LANGUAGES = ['hi', 'mr', 'gu', 'pa'] as const;

type TranslationRecord = Record<string, { name?: string; description?: string }>;

function clean(value?: string | null): string | undefined {
  const text = value?.trim();
  return text ? text : undefined;
}

async function translateText(text: string, to: string): Promise<string> {
  try {
    const result = await translate(text, { to });
    return result.text?.trim() || text;
  } catch {
    // Translation is an enhancement, never a reason to block a seller from
    // publishing/editing a listing. The UI falls back to the source text and
    // the background dictionary can be generated later with translate_db.
    return text;
  }
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

export function mergeMachineryTranslations(
  existing: unknown,
  refreshed: TranslationRecord | null,
): TranslationRecord | null {
  if (!refreshed && !existing) return null;
  const base = existing && typeof existing === 'object' ? (existing as TranslationRecord) : {};
  return { ...base, ...(refreshed ?? {}) };
}
