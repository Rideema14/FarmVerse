# FarmVerse — Complete Multilingual Content

The multilingual system now covers seller-created content across the main FarmVerse marketplaces, not only machinery.

## Covered seller content
- Products: name and description
- Seeds: name and description
- Land: title, description and location
- Machinery: name and description
- Existing records can be backfilled with `npm run translate_db`.
- New/edited Product, Seed and Land listings cache translations at create/update time.
- Existing Machinery translation caching remains supported.

## Languages
Hindi (`hi`), Marathi (`mr`), Gujarati (`gu`) and Punjabi (`pa`) are supported in addition to English.

## Database setup
From `backend`:

```powershell
npm install
npx prisma generate
npx prisma migrate deploy
npm run translate_db
```

`translate_db` reads all existing seller-created catalog and land text, creates a multilingual dictionary, and persists per-listing translations so the frontend can display the selected language without relying only on a hardcoded product list.

Keep `DATABASE_URL` configured in `backend/.env` before running Prisma or the translation backfill.

## Existing listing display fallback
The frontend now has a safe fallback for older machinery listings whose database `translations` field is empty. Existing/demo machinery names are localized immediately, and common machinery terms inside older seller-created names are translated without changing brand/model identifiers. New listings continue to use stored backend translations.
