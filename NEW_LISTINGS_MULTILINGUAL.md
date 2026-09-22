# New listings are multilingual

Product, seed, land, and machinery create/update services generate stored translations for Hindi, Marathi, Gujarati, and Punjabi.

The translation pipeline now uses: local agricultural/common terms -> Google public translation endpoint -> google-translate-api-x -> MyMemory.

This runs whenever a listing is created or its translated fields are edited. Existing listings can still be backfilled separately.
