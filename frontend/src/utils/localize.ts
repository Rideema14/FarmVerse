import type { TranslationKey } from '@/context/LanguageContext'

/**
 * Comprehensive Crop & Commodity translations for Mandi rates and Marketplace items.
 */
const CROP_NAME_MAP: Record<string, Record<string, string>> = {
  hi: {
    'Bottle gourd': 'लौकी',
    'Linseed': 'अलसी',
    'Papaya': 'पपीता',
    'Bitter gourd': 'करेला',
    'Pumpkin': 'कद्दू',
    'Bhindi(Ladies Finger)': 'भिंडी',
    'Bhindi': 'भिंडी',
    'Ladies Finger': 'भिंडी',
    'Wheat': 'गेहूं',
    'Rice': 'चावल',
    'Paddy(Dhan)': 'धान',
    'Paddy': 'धान',
    'Onion': 'प्याज़',
    'Tomato': 'टमाटर',
    'Potato': 'आलू',
    'Soybean': 'सोयाबीन',
    'Cotton': 'कपास',
    'Chana (Gram)': 'चना',
    'Chana': 'चना',
    'Gram': 'चना',
    'Garlic': 'लहसुन',
    'Ginger': 'अदरक',
    'Mustard': 'सरसों',
    'Maize': 'मक्का',
    'Sugarcane': 'गन्ना',
    'Groundnut': 'मूंगफली',
    'Chilli': 'मिर्च',
    'Green Chilli': 'हरी मिर्च',
    'Red Chilli': 'लाल मिर्च',
    'Coriander': 'धनिया',
    'Turmeric': 'हल्दी',
    'Cumin': 'जीरा',
    'Fenugreek': 'मेथी',
    'Brinjal': 'बैंगन',
    'Cabbage': 'पत्ता गोभी',
    'Cauliflower': 'फूल गोभी',
    'Peas': 'मटर',
    'Moong(Green Gram)': 'मूंग',
    'Moong': 'मूंग',
    'Urad': 'उड़द',
    'Arhar (Tur)': 'अरहर (तुअर)',
    'Arhar': 'अरहर',
    'Tur': 'तुअर',
    'Apple': 'सेव',
    'Banana': 'केला',
    'Mango': 'आम',
    'Guava': 'अमरूद',
    'Pomegranate': 'अनार',
    'Lemon': 'नींबू',
    'Milk': 'दूध',
    'Milk & Dairy': 'दूध एवं डेयरी',
    'Urea': 'यूरिया खाद',
    'Fertilizer': 'खाद एवं उर्वरक',
    'NPK Fertilizer': 'एनपीके उर्वरक',
    'DAP Fertilizer': 'डीएपी खाद',
    'Organic Compost': 'जैविक खाद',
    'Tractor': 'ट्रैक्टर',
    'Seeds': 'बीज',
    'Hybrid Seeds': 'हाइब्रिड बीज',
    'Mustard Oil': 'सरसों का तेल',
    '123': 'उत्पाद #123',
    'xyz': 'उत्पाद (xyz)',
  },
  mr: {
    'Bottle gourd': 'दुधी भोपळा',
    'Linseed': 'जवस',
    'Papaya': 'पपई',
    'Bitter gourd': 'कारले',
    'Pumpkin': 'लाल भोपळा',
    'Bhindi(Ladies Finger)': 'भेंडी',
    'Bhindi': 'भेंडी',
    'Wheat': 'गहू',
    'Rice': 'तांदूळ',
    'Onion': 'कांदा',
    'Tomato': 'टोमॅटो',
    'Potato': 'बटाटा',
    'Soybean': 'सोयाबीन',
    'Cotton': 'कापूस',
    'Milk': 'दूध',
  },
  gu: {
    'Bottle gourd': 'દૂધી',
    'Linseed': 'અળસી',
    'Papaya': 'પપૈયા',
    'Bitter gourd': 'કારેલા',
    'Pumpkin': 'કોળું',
    'Bhindi(Ladies Finger)': 'ભીંડા',
    'Wheat': 'ઘઉં',
    'Rice': 'ચોખા',
    'Onion': 'ડુંગળી',
    'Milk': 'દૂધ',
  },
  pa: {
    'Bottle gourd': 'ਘੀਆ',
    'Linseed': 'ਅਲਸੀ',
    'Papaya': 'ਪਪੀਤਾ',
    'Bitter gourd': 'ਕਰੇਲਾ',
    'Pumpkin': 'ਕੱਦੂ',
    'Bhindi(Ladies Finger)': 'ਭਿੰਡੀ',
    'Wheat': 'ਕਣਕ',
    'Rice': 'ਚੌਲ',
    'Onion': 'ਪਿਆਜ਼',
    'Milk': 'ਦੁੱਧ',
  },
}

const MANDI_MARKET_MAP: Record<string, Record<string, string>> = {
  hi: {
    'Itarsi(F&V) APMC': 'इटारसी मंडी',
    'Umariya APMC': 'उमरिया मंडी',
    'Indore(F&V) APMC': 'इंदौर मंडी',
    'Badwani(F&V) APMC': 'बड़वानी मंडी',
    'Harda(F&V) APMC': 'हरदा मंडी',
    'Bhopal APMC': 'भोपाल मंडी',
    'Ujjain APMC': 'उज्जैन मंडी',
    'Jabalpur APMC': 'जबलपुर मंडी',
    'Gwalior APMC': 'ग्वालियर मंडी',
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
  'farming-equipment': 'categoryNames.equipment',
  'equipment': 'categoryNames.equipment',
  'fertilizers': 'categoryNames.fertilizers',
  'machinery': 'categoryNames.machinery',
  'milk-dairy': 'categoryNames.dairy',
  'dairy': 'categoryNames.dairy',
  'oil-products': 'categoryNames.oil-products',
  'seeds': 'categoryNames.seeds',
  'tractors': 'categoryNames.tractors',
  'harvesters-combines': 'categoryNames.harvesters',
  'tillage-soil-prep': 'categoryNames.tillage',
  'sowing-planting': 'categoryNames.sowing',
  'sprayers-protection': 'categoryNames.sprayers',
}

const NAME_TO_SLUG: Record<string, string> = {
  'Building Materials': 'building-materials',
  'Farming Equipment': 'farming-equipment',
  'Equipment': 'equipment',
  'Fertilizers': 'fertilizers',
  'Machinery': 'machinery',
  'Milk & Dairy': 'milk-dairy',
  'Milk and Dairy': 'milk-dairy',
  'Dairy': 'dairy',
  'Oil Products': 'oil-products',
  'Seeds': 'seeds',
  'Tractors': 'tractors',
  'Harvesters & Combines': 'harvesters-combines',
  'Tillage & Soil Prep': 'tillage-soil-prep',
  'Sowing & Planting': 'sowing-planting',
  'Sprayers & Protection': 'sprayers-protection',
}

export function formatCategoryName(category: { slug?: string; name: string }, t: (key: any) => string): string {
  const slug = category.slug || NAME_TO_SLUG[category.name]
  if (slug && CATEGORY_KEYS[slug]) {
    const key = CATEGORY_KEYS[slug]
    const val = t(key as TranslationKey)
    if (val && val !== key) return val
  }
  // Fallback to name map if key lookup fails
  const nameSlug = NAME_TO_SLUG[category.name]
  if (nameSlug && CATEGORY_KEYS[nameSlug]) {
    const key = CATEGORY_KEYS[nameSlug]
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

export function formatCropName(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = CROP_NAME_MAP[language]
  if (table && table[trimmed]) {
    return table[trimmed]
  }
  return name
}

export function formatMandiMarket(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = MANDI_MARKET_MAP[language]
  if (table && table[trimmed]) {
    return table[trimmed]
  }
  if (language === 'hi') {
    // Clean raw "APMC" / "(F&V)" text for unmapped Mandi locations
    const cleaned = trimmed.replace(/\(F&V\)/g, '').replace(/APMC/g, 'मंडी').trim()
    return cleaned
  }
  return name
}

export function formatProductName(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = CROP_NAME_MAP[language]
  if (table && table[trimmed]) {
    return table[trimmed]
  }
  return name
}
