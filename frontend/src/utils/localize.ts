import type { TranslationKey } from '@/context/LanguageContext'

const PRODUCT_NAME_MAP: Record<string, Record<string, string>> = {
  hi: {
    'Milk': 'दूध (Milk)',
    '123': 'उत्पाद #123',
    'xyz': 'उत्पाद (xyz)',
    'Wheat': 'गेहूं (Wheat)',
    'Rice': 'चावल (Rice)',
    'Urea': 'यूरिया खाद (Urea)',
    'Fertilizer': 'खाद (Fertilizer)',
    'Seeds': 'बीज (Seeds)',
    'Tractor': 'ट्रैक्टर (Tractor)',
    'Cotton': 'कपास (Cotton)',
    'Mustard': 'सरसों (Mustard)',
    'Soybean': 'सोयाबीन (Soybean)',
    'Sugarcane': 'गन्ना (Sugarcane)',
    'Potato': 'आलू (Potato)',
    'Tomato': 'टमाटर (Tomato)',
    'Onion': 'प्याज़ (Onion)',
  },
  mr: {
    'Milk': 'दूध (Milk)',
    'Wheat': 'गहू (Wheat)',
    'Rice': 'तांदूळ (Rice)',
    '123': 'उत्पादन #123',
    'xyz': 'उत्पादन (xyz)',
  },
  gu: {
    'Milk': 'દૂધ (Milk)',
    'Wheat': 'ઘઉં (Wheat)',
    'Rice': 'ચોખા (Rice)',
    '123': 'ઉત્પાદન #123',
    'xyz': 'ઉત્પાદન (xyz)',
  },
  pa: {
    'Milk': 'ਦੁੱਧ (Milk)',
    'Wheat': 'ਕਣਕ (Wheat)',
    'Rice': 'ਚੌਲ (Rice)',
    '123': 'ਉਤਪਾਦ #123',
    'xyz': 'ਉਤਪਾਦ (xyz)',
  },
}

const STATUS_KEYS: Record<string, TranslationKey> = {
  placed: 'orders.statusPlaced',
  confirmed: 'orders.statusConfirmed',
  packed: 'orders.statusPacked',
  shipped: 'orders.statusShipped',
  out_for_delivery: 'orders.statusOutForDelivery',
  delivered: 'orders.statusDelivered',
  delivery_failed: 'orders.statusDeliveryFailed',
  disputed: 'orders.statusDisputed',
  cancelled: 'orders.statusCancelled',
  returned: 'orders.statusReturned',
}

const CATEGORY_KEYS: Record<string, string> = {
  'building-materials': 'categoryNames.building-materials',
  'equipment': 'categoryNames.equipment',
  'fertilizers': 'categoryNames.fertilizers',
  'machinery': 'categoryNames.machinery',
  'dairy': 'categoryNames.dairy',
  'oil-products': 'categoryNames.oil-products',
  'seeds': 'categoryNames.seeds',
}

const NAME_TO_SLUG: Record<string, string> = {
  'Building Materials': 'building-materials',
  'Farming Equipment': 'equipment',
  'Fertilizers': 'fertilizers',
  'Machinery': 'machinery',
  'Milk & Dairy': 'dairy',
  'Oil Products': 'oil-products',
  'Seeds': 'seeds',
}

export function formatCategoryName(category: { slug?: string; name: string }, t: (key: any) => string): string {
  const slug = category.slug || NAME_TO_SLUG[category.name]
  if (slug && CATEGORY_KEYS[slug]) {
    const key = CATEGORY_KEYS[slug]
    const val = t(key as TranslationKey)
    if (val && val !== key) return val
  }
  return category.name
}

export function formatOrderStatus(status: string, t: (key: any) => string): string {
  if (!status) return ''
  const norm = status.toLowerCase().replace(/\s+/g, '_')
  const key = STATUS_KEYS[norm]
  if (key) {
    const val = t(key)
    if (val && val !== key) return val
  }
  return status
}

export function formatProductName(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = PRODUCT_NAME_MAP[language]
  if (table && table[trimmed]) {
    return table[trimmed]
  }
  return name
}
