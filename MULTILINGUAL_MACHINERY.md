# Multilingual machinery listings

Machinery listing names and descriptions now use the same multilingual dictionary as
the rest of FarmVerse. The backend translation script also collects seller-created
machinery names/descriptions, so existing listings can be translated into Hindi,
Marathi, Gujarati and Punjabi.

After deploying the backend/database, run:

```bash
npm run translate_db
```

If your package does not expose that script, run:

```bash
npx tsx scripts/translate_db.ts
```

The generated translations are written to:
`frontend/src/utils/dynamic_translations.json`

Brand and model values are intentionally left unchanged because they are proper
product identifiers rather than translatable UI text.
