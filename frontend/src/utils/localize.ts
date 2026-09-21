import type { TranslationKey } from '@/context/LanguageContext'
import dynamicTranslations from './dynamic_translations.json'
import cropTranslations from './crop_translations.json'
/**
 * Comprehensive Crop & Commodity translations for Mandi rates and Marketplace items.
 */
const CROP_NAME_MAP: Record<string, Record<string, string>> = {
  hi: {
    'Lak(Teora)': 'लाख (तेवड़ा)',
    'Teora': 'लाख (तेवड़ा)',
    'Khesari': 'खेसारी (लाख)',
    'Kabuli Chana(Chickpeas-White)': 'काबुली चना',
    'Kabuli Chana': 'काबुली चना',
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
    'Green Peas': 'हरी मटर',
    'Moong(Green Gram)': 'मूंग',
    'Moong': 'मूंग',
    'Urad': 'उड़द',
    'Arhar (Tur)': 'अरहर (तुअर)',
    'Arhar': 'अरहर',
    'Tur': 'तुअर',
    'Apple': 'सेब',
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
    'Lak(Teora)': 'लाख (तेवडा)',
    'Teora': 'लाख (तेवडा)',
    'Khesari': 'लाख / खेसारी',
    'Kabuli Chana(Chickpeas-White)': 'काबुली चणा',
    'Kabuli Chana': 'काबुली चणा',
    'Bottle gourd': 'दुधी भोपळा',
    'Linseed': 'जवस',
    'Papaya': 'पपई',
    'Bitter gourd': 'कारले',
    'Pumpkin': 'लाल भोपळा',
    'Bhindi(Ladies Finger)': 'भेंडी',
    'Bhindi': 'भेंडी',
    'Ladies Finger': 'भेंडी',
    'Wheat': 'गहू',
    'Rice': 'तांदूळ',
    'Paddy(Dhan)': 'धान (भात)',
    'Paddy': 'धान (भात)',
    'Onion': 'कांदा',
    'Tomato': 'टोमॅटो',
    'Potato': 'बटाटा',
    'Soybean': 'सोयाबीन',
    'Cotton': 'कापूस',
    'Chana (Gram)': 'हरभरा / चणा',
    'Chana': 'हरभरा',
    'Gram': 'हरभरा',
    'Garlic': 'लसूण',
    'Ginger': 'आले',
    'Mustard': 'मोहरी',
    'Maize': 'मका',
    'Sugarcane': 'ऊस',
    'Groundnut': 'भुईमूग',
    'Chilli': 'मिरची',
    'Green Chilli': 'हिरवी मिरची',
    'Red Chilli': 'लाल मिरची',
    'Coriander': 'कोथिंबीर / धणे',
    'Turmeric': 'हळद',
    'Cumin': 'जिरे',
    'Fenugreek': 'मेथी',
    'Brinjal': 'वांगी',
    'Cabbage': 'कोबी',
    'Cauliflower': 'फ्लॉवर',
    'Peas': 'मटार',
    'Green Peas': 'हिरवे मटार',
    'Moong(Green Gram)': 'मूग',
    'Moong': 'मूग',
    'Urad': 'उडीद',
    'Arhar (Tur)': 'तूर',
    'Arhar': 'तूर',
    'Tur': 'तूर',
    'Apple': 'सफरचंद',
    'Banana': 'केळी',
    'Mango': 'आंबा',
    'Guava': 'पेरू',
    'Pomegranate': 'डाळिंब',
    'Lemon': 'लिंबू',
    'Milk': 'दूध',
    'Milk & Dairy': 'दूध व दुग्धजन्य',
    'Urea': 'युरिया खत',
    'Fertilizer': 'खते',
    'Tractor': 'ट्रॅक्टर',
    'Seeds': 'बियाणे',
    '123': 'उत्पादन #123',
    'xyz': 'उत्पादन (xyz)',
  },
  gu: {
    'Lak(Teora)': 'લાખ (તેઓડા)',
    'Teora': 'લાખ (તેઓડા)',
    'Khesari': 'ખેસારી / લાખ',
    'Kabuli Chana(Chickpeas-White)': 'કાબુલી ચણા',
    'Kabuli Chana': 'કાબુલી ચણા',
    'Bottle gourd': 'દૂધી',
    'Linseed': 'અળસી',
    'Papaya': 'પપૈયા',
    'Bitter gourd': 'કારેલા',
    'Pumpkin': 'કોળું',
    'Bhindi(Ladies Finger)': 'ભીંડા',
    'Bhindi': 'ભીંડા',
    'Ladies Finger': 'ભીંડા',
    'Wheat': 'ઘઉં',
    'Rice': 'ચોખા',
    'Paddy(Dhan)': 'ડાંગર',
    'Paddy': 'ડાંગર',
    'Onion': 'ડુંગળી',
    'Tomato': 'ટામેટા',
    'Potato': 'બટાટા',
    'Soybean': 'સોયાબીન',
    'Cotton': 'કપાસ',
    'Chana (Gram)': 'ચણા',
    'Chana': 'ચણા',
    'Gram': 'ચણા',
    'Garlic': 'લસણ',
    'Ginger': 'આદુ',
    'Mustard': 'રાઈ / સરસવ',
    'Maize': 'મકાઈ',
    'Sugarcane': 'શેરડી',
    'Groundnut': 'મગફળી',
    'Chilli': 'મરચાં',
    'Green Chilli': 'લીલા મરચાં',
    'Red Chilli': 'લાલ મરચાં',
    'Coriander': 'ધાણા / કોથમીર',
    'Turmeric': 'હળદર',
    'Cumin': 'જીરું',
    'Fenugreek': 'મેથી',
    'Brinjal': 'રીંગણ',
    'Cabbage': 'કોબીજ',
    'Cauliflower': 'ફ્લાવર',
    'Peas': 'વટાણા',
    'Green Peas': 'લીલા વટાણા',
    'Moong(Green Gram)': 'મગ',
    'Moong': 'મગ',
    'Urad': 'અડદ',
    'Arhar (Tur)': 'તુવેર',
    'Arhar': 'તુવેર',
    'Tur': 'તુવેર',
    'Apple': 'સફરજન',
    'Banana': 'કેળાં',
    'Mango': 'કેરી',
    'Guava': 'જામફળ',
    'Pomegranate': 'દાડમ',
    'Lemon': 'લીંબુ',
    'Milk': 'દૂધ',
    'Milk & Dairy': 'દૂધ અને ડેરી',
    'Tractor': 'ટ્રેક્ટર',
    'Seeds': 'બિયારણ',
    '123': 'પ્રોડક્ટ #123',
    'xyz': 'પ્રોડક્ટ (xyz)',
  },
  pa: {
    'Lak(Teora)': 'ਲਾਖ (ਤੇਓੜਾ)',
    'Teora': 'ਲਾਖ (ਤੇਓੜਾ)',
    'Khesari': 'ਖੇਸਾਰੀ / ਲਾਖ',
    'Kabuli Chana(Chickpeas-White)': 'ਕਾਬੁਲੀ ਛੋਲੇ',
    'Kabuli Chana': 'ਕਾਬੁਲੀ ਛੋਲੇ',
    'Bottle gourd': 'ਘੀਆ',
    'Linseed': 'ਅਲਸੀ',
    'Papaya': 'ਪਪੀਤਾ',
    'Bitter gourd': 'ਕਰੇਲਾ',
    'Pumpkin': 'ਕੱਦੂ',
    'Bhindi(Ladies Finger)': 'ਭਿੰਡੀ',
    'Bhindi': 'ਭਿੰਡੀ',
    'Ladies Finger': 'ਭਿੰਡੀ',
    'Wheat': 'ਕਣਕ',
    'Rice': 'ਚੌਲ',
    'Paddy(Dhan)': 'ਝੋਨਾ',
    'Paddy': 'ਝੋਨਾ',
    'Onion': 'ਪਿਆਜ਼',
    'Tomato': 'ਟਮਾਟਰ',
    'Potato': 'ਆਲੂ',
    'Soybean': 'ਸੋਇਆਬੀਨ',
    'Cotton': 'ਕਪਾਹ',
    'Chana (Gram)': 'ਛੋਲੇ',
    'Chana': 'ਛੋਲੇ',
    'Gram': 'ਛੋਲੇ',
    'Garlic': 'ਲਸਣ',
    'Ginger': 'ਅਦਰਕ',
    'Mustard': 'ਸਰ੍ਹੋਂ',
    'Maize': 'ਮੱਕੀ',
    'Sugarcane': 'ਗੰਨਾ',
    'Groundnut': 'ਮੂੰਗਫਲੀ',
    'Chilli': 'ਮਿਰਚ',
    'Green Chilli': 'ਹਰੀ ਮਿਰਚ',
    'Red Chilli': 'ਲਾਲ ਮਿਰਚ',
    'Coriander': 'ਧਨੀਆ',
    'Turmeric': 'ਹਲਦੀ',
    'Cumin': 'ਜੀਰਾ',
    'Fenugreek': 'ਮੇਥੀ',
    'Brinjal': 'ਬੈਂਗਣ',
    'Cabbage': 'ਬੰਦ ਗੋਭੀ',
    'Cauliflower': 'ਫੁੱਲ ਗੋਭੀ',
    'Peas': 'ਮਟਰ',
    'Green Peas': 'ਹਰੇ ਮਟਰ',
    'Moong(Green Gram)': 'ਮੂੰਗ',
    'Moong': 'ਮੂੰਗ',
    'Urad': 'ਮਾਂਹ / ਉੜਦ',
    'Arhar (Tur)': 'ਅਰਹਰ (ਤੂਰ)',
    'Arhar': 'ਅਰਹਰ',
    'Tur': 'ਤੂਰ',
    'Apple': 'ਸੇਬ',
    'Banana': 'ਕੇਲਾ',
    'Mango': 'ਅੰਬ',
    'Guava': 'ਅਮਰੂਦ',
    'Pomegranate': 'ਅਨਾਰ',
    'Lemon': 'ਨਿੰਬੂ',
    'Milk': 'ਦੁੱਧ',
    'Milk & Dairy': 'ਦੁੱਧ ਅਤੇ ਡੇਅਰੀ',
    'Tractor': 'ਟਰੈਕਟਰ',
    'Seeds': 'ਬੀਜ',
    '123': 'ਉਤਪਾਦ #123',
    'xyz': 'ਉਤਪਾਦ (xyz)',
  },
}

const MANDI_NAMES_MAP: Record<string, Record<string, string>> = {
  hi: {
    'Khurai APMC': 'खुरई मंडी',
    'Deori (F&V) APMC': 'देवरी मंडी',
    'Deori APMC': 'देवरी मंडी',
    'Soyatkalan APMC': 'सोयत कलां मंडी',
    'Sehore(F&V) APMC': 'सीहोर मंडी',
    'Sehore APMC': 'सीहोर मंडी',
    'Chhatarpur (F&V) APMC': 'छतरपुर मंडी',
    'Chhatarpur APMC': 'छतरपुर मंडी',
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
  pa: {
    'Khurai APMC': 'ਖੁਰਈ ਮੰਡੀ',
    'Deori (F&V) APMC': 'ਦੇਵਰੀ ਮੰਡੀ',
    'Deori APMC': 'ਦੇਵਰੀ ਮੰਡੀ',
    'Soyatkalan APMC': 'ਸੋਯਤਕਲਾਂ ਮੰਡੀ',
    'Sehore(F&V) APMC': 'ਸਿਹੋਰ ਮੰਡੀ',
    'Sehore APMC': 'ਸਿਹੋਰ ਮੰਡੀ',
    'Chhatarpur (F&V) APMC': 'ਛਤਰਪੁਰ ਮੰਡੀ',
    'Chhatarpur APMC': 'ਛਤਰਪੁਰ ਮੰਡੀ',
    'Itarsi(F&V) APMC': 'ਇਟਾਰਸੀ ਮੰਡੀ',
    'Umariya APMC': 'ਉਮਰੀਆ ਮੰਡੀ',
    'Indore(F&V) APMC': 'ਇੰਦੌਰ ਮੰਡੀ',
    'Badwani(F&V) APMC': 'ਬੜਵਾਨੀ ਮੰਡੀ',
    'Harda(F&V) APMC': 'ਹਰਦਾ ਮੰਡੀ',
    'Bhopal APMC': 'ਭੋਪਾਲ ਮੰਡੀ',
    'Ujjain APMC': 'ਉਜੈਨ ਮੰਡੀ',
    'Jabalpur APMC': 'ਜਬਲਪੁਰ ਮੰਡੀ',
    'Gwalior APMC': 'ਗਵਾਲੀਅਰ ਮੰਡੀ',
  },
  mr: {
    'Khurai APMC': 'खुरई मंडी',
    'Deori (F&V) APMC': 'देवरी मंडी',
    'Deori APMC': 'देवरी मंडी',
    'Soyatkalan APMC': 'सोयत कलां मंडी',
    'Sehore(F&V) APMC': 'सीहोर मंडी',
    'Sehore APMC': 'सीहोर मंडी',
    'Chhatarpur (F&V) APMC': 'छतरपूर मंडी',
    'Chhatarpur APMC': 'छतरपूर मंडी',
    'Itarsi(F&V) APMC': 'इटारसी मंडी',
    'Umariya APMC': 'उमरिया मंडी',
    'Indore(F&V) APMC': 'इंदूर मंडी',
    'Badwani(F&V) APMC': 'बडवानी मंडी',
    'Harda(F&V) APMC': 'हरदा मंडी',
    'Bhopal APMC': 'भोपाळ मंडी',
    'Ujjain APMC': 'उज्जैन मंडी',
    'Jabalpur APMC': 'जबलपूर मंडी',
    'Gwalior APMC': 'ग्वाल्हेर मंडी',
  },
  gu: {
    'Khurai APMC': 'ખુરઈ મંડી',
    'Deori (F&V) APMC': 'દેવરી મંડી',
    'Deori APMC': 'દેવરી મંડી',
    'Soyatkalan APMC': 'સોયત કલાં મંડી',
    'Sehore(F&V) APMC': 'સિહોર મંડી',
    'Sehore APMC': 'સિહોર મંડી',
    'Chhatarpur (F&V) APMC': 'છતરપુર મંડી',
    'Chhatarpur APMC': 'છતરપુર મંડી',
    'Itarsi(F&V) APMC': 'ઇટારસી મંડી',
    'Umariya APMC': 'ઉમરિયા મંડી',
    'Indore(F&V) APMC': 'ઇન્દોર મંડી',
    'Badwani(F&V) APMC': 'બડવાની મંડી',
    'Harda(F&V) APMC': 'હરદા મંડી',
    'Bhopal APMC': 'ભોપાલ મંડી',
    'Ujjain APMC': 'ઉજ્જૈન મંડી',
    'Jabalpur APMC': 'જબલપુર મંડી',
    'Gwalior APMC': 'ગ્વાલિયર મંડી',
  },
}

const WEATHER_CONDITIONS: Record<string, Record<string, string>> = {
  hi: {
    'partly cloudy': 'आंशिक रूप से बादल',
    'cloudy': 'बादल छाए रहेंगे',
    'overcast': 'घने बादल',
    'sunny': 'धूप / साफ़',
    'clear': 'साफ़ आसमान',
    'clear sky': 'साफ़ आसमान',
    'rain': 'बारिश',
    'rainy': 'बारिश',
    'light rain': 'हल्की बारिश',
    'heavy rain': 'भारी बारिश',
    'patchy rain nearby': 'हल्की बारिश के आसार',
    'thunderstorm': 'गरज के साथ बारिश',
    'mist': 'धुंध',
    'fog': 'कोहरा',
  },
  pa: {
    'partly cloudy': "ਅੰਸ਼ਕ ਤੌਰ 'ਤੇ ਬੱਦਲਵਾਈ",
    'cloudy': 'ਬੱਦਲਵਾਈ',
    'overcast': 'ਘਣੇ ਬੱਦਲ',
    'sunny': 'ਧੁੱਪ / ਸਾਫ਼',
    'clear': 'ਸਾਫ਼ ਆਸਮਾਨ',
    'clear sky': 'ਸਾਫ਼ ਆਸਮਾਨ',
    'rain': 'ਮੀਂਹ',
    'rainy': 'ਮੀਂਹ',
    'light rain': 'ਹਲਕਾ ਮੀਂਹ',
    'heavy rain': 'ਭਾਰੀ ਮੀਂਹ',
    'patchy rain nearby': 'ਕਿਤੇ-ਕਿਤੇ ਮੀਂਹ',
    'thunderstorm': 'ਤੂਫ਼ਾਨੀ ਮੀਂਹ',
    'mist': 'ਧੁੰਦ',
    'fog': 'ਕੋਹਰਾ',
  },
  mr: {
    'partly cloudy': 'अंशतः ढगाळ',
    'cloudy': 'ढगाळ वातावरण',
    'overcast': 'दाट ढग',
    'sunny': 'ऊन / स्वच्छ',
    'clear': 'स्वच्छ आकाश',
    'clear sky': 'स्वच्छ आकाश',
    'rain': 'पाऊस',
    'rainy': 'पावसाळी',
    'light rain': 'हलका पाऊस',
    'heavy rain': 'मुसळधार पाऊस',
    'patchy rain nearby': 'अधूनमधून पाऊस',
    'thunderstorm': 'वादळी पाऊस',
    'mist': 'धुके',
    'fog': 'दाट धुके',
  },
  gu: {
    'partly cloudy': 'અંશતઃ વાદળછાયું',
    'cloudy': 'વાદળછાયું',
    'overcast': 'ઘેરાયેલા વાદળો',
    'sunny': 'તડકો / સ્વચ્છ',
    'clear': 'સ્વચ્છ આકાશ',
    'clear sky': 'સ્વચ્છ આકાશ',
    'rain': 'વરસાદ',
    'rainy': 'વરસાદી',
    'light rain': 'હળવો વરસાદ',
    'heavy rain': 'ભારે વરસાદ',
    'patchy rain nearby': 'છૂટોછવાયો વરસાદ',
    'thunderstorm': 'ગાજવીજ સાથે વરસાદ',
    'mist': 'ધુમ્મસ',
    'fog': 'ગાઢ ધુમ્મસ',
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
  if (!name || language === 'en') return name || ''
  const trimmed = name.trim()

  // 1. Direct dictionary match in cropTranslations
  const customTable = (cropTranslations as Record<string, Record<string, string>>)[language]
  if (customTable && customTable[trimmed]) {
    return customTable[trimmed]
  }

  // 2. Direct dictionary match in CROP_NAME_MAP
  const mapTable = CROP_NAME_MAP[language]
  if (mapTable && mapTable[trimmed]) {
    return mapTable[trimmed]
  }

  // 3. Case-insensitive match in dictionaries
  const lowerTrimmed = trimmed.toLowerCase()
  if (customTable) {
    for (const [key, value] of Object.entries(customTable)) {
      if (key.toLowerCase() === lowerTrimmed) return value
    }
  }
  if (mapTable) {
    for (const [key, value] of Object.entries(mapTable)) {
      if (key.toLowerCase() === lowerTrimmed) return value
    }
  }

  // 4. Sub-segment or parenthetical extraction (e.g. "Bajra(Pearl Millet/Cumbu)" or "Paddy(Dhan)")
  const parts = trimmed.split(/[\(\)\/\-]+/).map((p) => p.trim()).filter(Boolean)
  if (parts.length > 1) {
    for (const part of parts) {
      if (customTable && customTable[part]) return customTable[part]
      if (mapTable && mapTable[part]) return mapTable[part]
      if (customTable) {
        const lower = part.toLowerCase()
        for (const [key, value] of Object.entries(customTable)) {
          if (key.toLowerCase() === lower) return value
        }
      }
    }
  }

  // 5. Try dynamic translations fallback
  const dynTable = (dynamicTranslations as Record<string, Record<string, string>>)[language]
  if (dynTable && dynTable[trimmed]) {
    return dynTable[trimmed]
  }
  if (dynTable) {
    for (const [key, value] of Object.entries(dynTable)) {
      if (key.toLowerCase() === lowerTrimmed) return value
    }
  }

  return name
}

export function formatMandiMarket(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = MANDI_NAMES_MAP[language]
  if (table && table[trimmed]) {
    return table[trimmed]
  }
  if (language === 'hi' || language === 'mr' || language === 'pa' || language === 'gu') {
    const suffix = language === 'pa' ? 'ਮੰਡੀ' : language === 'gu' ? 'મંડી' : 'मंडी'
    const cleaned = trimmed.replace(/\(F&V\)/gi, '').replace(/\bAPMC\b/gi, '').trim()
    if (cleaned) {
      return `${cleaned} ${suffix}`
    }
  }

  // Try dynamic translations fallback
  const dynTable = (dynamicTranslations as Record<string, Record<string, string>>)[language]
  if (dynTable && dynTable[trimmed]) {
    return dynTable[trimmed]
  }

  return name
}

export function formatWeatherCondition(condition: string, language: string): string {
  if (!condition) return ''
  const norm = condition.toLowerCase().trim()
  const table = WEATHER_CONDITIONS[language]
  if (table && table[norm]) {
    return table[norm]
  }
  if (table) {
    for (const [k, v] of Object.entries(table)) {
      if (norm.includes(k)) return v
    }
  }
  return condition
}

export function formatProductName(name: string, language: string): string {
  if (!name || language === 'en') return name || ''
  const trimmed = name.trim()
  
  // Try crop formatter first (for commodities / crops / seeds)
  const cropFormatted = formatCropName(trimmed, language)
  if (cropFormatted && cropFormatted !== trimmed) {
    return cropFormatted
  }

  const table = CROP_NAME_MAP[language]
  if (table && table[trimmed]) {
    return table[trimmed]
  }
  if (table) {
    const key = Object.keys(table).find((k) => k.toLowerCase() === trimmed.toLowerCase())
    if (key) return table[key]
  }

  const customTable = (cropTranslations as Record<string, Record<string, string>>)[language]
  if (customTable && customTable[trimmed]) {
    return customTable[trimmed]
  }

  return name
}

export function formatLocationName(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  
  const translations: Record<string, Record<string, string>> = {
    hi: {
      'Madhya Pradesh': 'मध्य प्रदेश',
      'Maharashtra': 'महाराष्ट्र',
      'Gujarat': 'गुजरात',
      'Punjab': 'पंजाब',
      'Bhopal': 'भोपाल',
      'Indore': 'इंदौर',
      'Ujjain': 'उज्जैन',
      'Jabalpur': 'जबलपुर',
      'Gwalior': 'ग्वालियर',
      'Sehore': 'सीहोर',
      'Sagar': 'सागर',
      'Harda': 'हरदा',
      'Badwani': 'बड़वानी',
      'Umariya': 'उमरिया',
      'Chhatarpur': 'छतरपुर',
      'Itarsi': 'इटारसी',
      'Khurai': 'खुरई',
      'Deori': 'देवरी',
      'Soyatkalan': 'सोयत कलां'
    },
    mr: {
      'Madhya Pradesh': 'मध्य प्रदेश',
      'Maharashtra': 'महाराष्ट्र',
      'Gujarat': 'गुजरात',
      'Punjab': 'पंजाब',
      'Bhopal': 'भोपाळ',
      'Indore': 'इंदूर',
      'Ujjain': 'उज्जैन',
      'Jabalpur': 'जबलपूर',
      'Gwalior': 'ग्वाल्हेर',
      'Sehore': 'सीहोर',
      'Sagar': 'सागर',
      'Harda': 'हरदा',
      'Badwani': 'बडवानी',
      'Umariya': 'उमरिया',
      'Chhatarpur': 'छतरपूर',
      'Itarsi': 'इटारसी',
      'Khurai': 'खुरई',
      'Deori': 'देवरी',
      'Soyatkalan': 'सोयत कलां'
    },
    gu: {
      'Madhya Pradesh': 'મધ્ય પ્રદેશ',
      'Maharashtra': 'મહારાષ્ટ્ર',
      'Gujarat': 'ગુજરાત',
      'Punjab': 'પંજાબ',
      'Bhopal': 'ભોપાલ',
      'Indore': 'ઇન્દોર',
      'Ujjain': 'ઉજ્જૈન',
      'Jabalpur': 'જબલપુર',
      'Gwalior': 'ગ્વાલિયર',
      'Sehore': 'સિહોર',
      'Sagar': 'સાગર',
      'Harda': 'હરદા',
      'Badwani': 'બડવાની',
      'Umariya': 'ઉમરિયા',
      'Chhatarpur': 'છતરપુર',
      'Itarsi': 'ઇટારસી',
      'Khurai': 'ખુરઈ',
      'Deori': 'દેવરી',
      'Soyatkalan': 'સોયત કલાં'
    },
    pa: {
      'Madhya Pradesh': 'ਮੱਧ ਪ੍ਰਦੇਸ਼',
      'Maharashtra': 'ਮਹਾਰਾਸ਼ਟਰ',
      'Gujarat': 'ਗੁਜਰਾਤ',
      'Punjab': 'ਪੰਜਾਬ',
      'Bhopal': 'ਭੋਪਾਲ',
      'Indore': 'ਇੰਦੌਰ',
      'Ujjain': 'ਉਜੈਨ',
      'Jabalpur': 'ਜਬਲਪੁਰ',
      'Gwalior': 'ਗਵਾਲੀਅਰ',
      'Sehore': 'ਸਿਹੋਰ',
      'Sagar': 'ਸਾਗਰ',
      'Harda': 'ਹਰਦਾ',
      'Badwani': 'ਬੜਵਾਨੀ',
      'Umariya': 'ਉਮਰੀਆ',
      'Chhatarpur': 'ਛਤਰਪੁਰ',
      'Itarsi': 'ਇਟਾਰਸੀ',
      'Khurai': 'ਖੁਰਈ',
      'Deori': 'ਦੇਵਰੀ',
      'Soyatkalan': 'ਸੋਯਤਕਲਾਂ'
    }
  }

  const table = translations[language]
  if (table && table[trimmed]) {
    return table[trimmed]
  }

  // Try dynamic translations fallback
  const dynTable = (dynamicTranslations as Record<string, Record<string, string>>)[language]
  if (dynTable && dynTable[trimmed]) {
    return dynTable[trimmed]
  }

  return name
}

const SOIL_NAMES_MAP: Record<string, Record<string, string>> = {
  hi: {
    'Black soil': 'काली मिट्टी',
    'Alluvial soil': 'जलोढ़ मिट्टी',
    'Red soil': 'लाल मिट्टी',
    'Loamy soil': 'दोमट मिट्टी',
    'Sandy soil': 'बलुई / रेतीली मिट्टी',
    'Clay soil': 'चिकनी मिट्टी',
    'Laterite soil': 'लैटेराइट मिट्टी',
    'Saline soil': 'लवणीय मिट्टी',
    'Peaty soil': 'दलदली मिट्टी',
    'Mountain soil': 'पर्वतीय मिट्टी',
    'Forest soil': 'वन मिट्टी',
    'Desert soil': 'मरुस्थलीय मिट्टी',
  },
  mr: {
    'Black soil': 'काळी माती',
    'Alluvial soil': 'गाळाची माती',
    'Red soil': 'तांबडी / लाल माती',
    'Loamy soil': 'पोयटा / दोमट माती',
    'Sandy soil': 'वाळूची / रेताड माती',
    'Clay soil': 'चिकण माती',
    'Laterite soil': 'जांभी माती',
    'Saline soil': 'खारवट माती',
    'Peaty soil': 'दलदली माती',
    'Mountain soil': 'पर्वतीय माती',
    'Forest soil': 'जंगल माती',
    'Desert soil': 'वाळवंटी माती',
  },
  gu: {
    'Black soil': 'કાળી માટી',
    'Alluvial soil': 'કાંપવાળી માટી',
    'Red soil': 'લાલ માટી',
    'Loamy soil': 'ગોરાડુ માટી',
    'Sandy soil': 'રેતાળ માટી',
    'Clay soil': 'ચીકણી માટી',
    'Laterite soil': 'લેટેરાઇટ માટી',
    'Saline soil': 'ક્ષારીય માટી',
    'Peaty soil': 'પીટ માટી',
    'Mountain soil': 'પર્વતીય માટી',
    'Forest soil': 'જંગલ માટી',
    'Desert soil': 'રણ માટી',
  },
  pa: {
    'Black soil': 'ਕਾਲੀ ਮਿੱਟੀ',
    'Alluvial soil': 'ਜਲੋੜ ਮਿੱਟੀ',
    'Red soil': 'ਲਾਲ ਮਿੱਟੀ',
    'Loamy soil': 'ਦੋਮਟ ਮਿੱਟੀ',
    'Sandy soil': 'ਰੇਤਲੀ ਮਿੱਟੀ',
    'Clay soil': 'ਚੀਕਣੀ ਮਿੱਟੀ',
    'Laterite soil': 'ਲੈਟੇਰਾਈਟ ਮਿੱਟੀ',
    'Saline soil': 'ਲੂਣੀ ਮਿੱਟੀ',
    'Peaty soil': 'ਪੀਟ ਮਿੱਟੀ',
    'Mountain soil': 'ਪਰਬਤੀ ਮਿੱਟੀ',
    'Forest soil': 'ਜੰਗਲੀ ਮਿੱਟੀ',
    'Desert soil': 'ਮਾਰੂਥਲੀ ਮਿੱਟੀ',
  },
}

const SEASONS_MAP: Record<string, Record<string, string>> = {
  hi: {
    'Kharif (Jun–Oct)': 'खरीफ (जून–अक्टूबर)',
    'Kharif (Jun-Oct)': 'खरीफ (जून–अक्टूबर)',
    'Rabi (Nov–Mar)': 'रबी (नवंबर–मार्च)',
    'Rabi (Nov-Mar)': 'रबी (नवंबर–मार्च)',
    'Zaid (Mar–Jun)': 'जायद (मार्च–जून)',
    'Zaid (Mar-Jun)': 'जायद (मार्च–जून)',
    'Kharif': 'खरीफ',
    'Rabi': 'रबी',
    'Zaid': 'जायद',
  },
  mr: {
    'Kharif (Jun–Oct)': 'खरीप (जून–ऑक्टोबर)',
    'Kharif (Jun-Oct)': 'खरीप (जून–ऑक्टोबर)',
    'Rabi (Nov–Mar)': 'रब्बी (नोव्हेंबर–मार्च)',
    'Rabi (Nov-Mar)': 'रब्बी (नोव्हेंबर–मार्च)',
    'Zaid (Mar–Jun)': 'उन्हाळी / झैद (मार्च–जून)',
    'Zaid (Mar-Jun)': 'उन्हाळी / झैद (मार्च–जून)',
    'Kharif': 'खरीप',
    'Rabi': 'रब्बी',
    'Zaid': 'उन्हाळी / झैद',
  },
  gu: {
    'Kharif (Jun–Oct)': 'ખરીફ (જૂન–ઓક્ટોબર)',
    'Kharif (Jun-Oct)': 'ખરીફ (જૂન–ઓક્ટોબર)',
    'Rabi (Nov–Mar)': 'રવિ (નવેમ્બર–માર્ચ)',
    'Rabi (Nov-Mar)': 'રવિ (નવેમ્બર–માર્ચ)',
    'Zaid (Mar–Jun)': 'જાયદ (માર્ચ–જૂન)',
    'Zaid (Mar-Jun)': 'જાયદ (માર્ચ–જૂન)',
    'Kharif': 'ખરીફ',
    'Rabi': 'રવિ',
    'Zaid': 'જાયદ',
  },
  pa: {
    'Kharif (Jun–Oct)': 'ਖਰੀਫ (ਜੂਨ–ਅਕਤੂਬਰ)',
    'Kharif (Jun-Oct)': 'ਖਰੀਫ (ਜੂਨ–ਅਕਤੂਬਰ)',
    'Rabi (Nov–Mar)': 'ਰਬੀ (ਨਵੰਬਰ–ਮਾਰਚ)',
    'Rabi (Nov-Mar)': 'ਰਬੀ (ਨਵੰਬਰ–ਮਾਰਚ)',
    'Zaid (Mar–Jun)': 'ਜ਼ਾਇਦ (ਮਾਰਚ–ਜੂਨ)',
    'Zaid (Mar-Jun)': 'ਜ਼ਾਇਦ (ਮਾਰਚ–ਜੂਨ)',
    'Kharif': 'ਖਰੀਫ',
    'Rabi': 'ਰਬੀ',
    'Zaid': 'ਜ਼ਾਇਦ',
  },
}

const WATER_AVAILABILITY_MAP: Record<string, Record<string, string>> = {
  hi: {
    'Rainfed only': 'केवल वर्षा आधारित',
    'Partial irrigation': 'आंशिक सिंचाई',
    'Full irrigation': 'पूर्ण सिंचाई',
  },
  mr: {
    'Rainfed only': 'केवळ पावसावर अवलंबून',
    'Partial irrigation': 'अंशतः सिंचन',
    'Full irrigation': 'पूर्ण सिंचन',
  },
  gu: {
    'Rainfed only': 'માત્ર વરસાદ આધારિત',
    'Partial irrigation': 'અંશતઃ સિંચાઈ',
    'Full irrigation': 'સંપૂર્ણ સિંચાઈ',
  },
  pa: {
    'Rainfed only': "ਸਿਰਫ਼ ਮੀਂਹ 'ਤੇ ਨਿਰਭਰ",
    'Partial irrigation': 'ਅੰਸ਼ਕ ਸਿੰਚਾਈ',
    'Full irrigation': 'ਪੂਰੀ ਸਿੰਚਾਈ',
  },
}

const NUTRIENT_LEVELS_MAP: Record<string, Record<string, string>> = {
  hi: {
    Low: 'कम (Low)',
    Medium: 'मध्यम (Medium)',
    High: 'अधिक (High)',
  },
  mr: {
    Low: 'कमी (Low)',
    Medium: 'मध्यम (Medium)',
    High: 'जास्त (High)',
  },
  gu: {
    Low: 'ઓછું (Low)',
    Medium: 'મધ્યમ (Medium)',
    High: 'વધુ (High)',
  },
  pa: {
    Low: 'ਘੱਟ (Low)',
    Medium: 'ਦਰਮਿਆਨਾ (Medium)',
    High: 'ਵੱਧ (High)',
  },
}

const GROWTH_STAGES_MAP: Record<string, Record<string, string>> = {
  hi: {
    'Sowing': 'बुआई (Sowing)',
    'Vegetative growth': 'वानस्पतिक वृद्धि (Vegetative growth)',
    'Flowering': 'फूल आने का समय (Flowering)',
    'Grain filling': 'दाना भरने का समय (Grain filling)',
    'Harvesting': 'कटाई (Harvesting)',
  },
  mr: {
    'Sowing': 'पेरणी (Sowing)',
    'Vegetative growth': 'शाकीय वाढ (Vegetative growth)',
    'Flowering': 'फुलोरा (Flowering)',
    'Grain filling': 'दाणे भरणे (Grain filling)',
    'Harvesting': 'कापणी (Harvesting)',
  },
  gu: {
    'Sowing': 'વાવણી (Sowing)',
    'Vegetative growth': 'વાનસ્પતિક વૃદ્ધિ (Vegetative growth)',
    'Flowering': 'ફૂલ આવવાનો તબક્કો (Flowering)',
    'Grain filling': 'દાણા ભરાવાનો તબક્કો (Grain filling)',
    'Harvesting': 'લણણી (Harvesting)',
  },
  pa: {
    'Sowing': 'ਬਿਜਾਈ (Sowing)',
    'Vegetative growth': 'ਵਾਧੇ ਦਾ ਪੜਾਅ (Vegetative growth)',
    'Flowering': 'ਫੁੱਲ ਪੈਣ ਦਾ ਸਮਾਂ (Flowering)',
    'Grain filling': 'ਦਾਣਾ ਭਰਨ ਦਾ ਸਮਾਂ (Grain filling)',
    'Harvesting': 'ਵਾਢੀ (Harvesting)',
  },
}

const UNITS_MAP: Record<string, Record<string, string>> = {
  hi: {
    'kg': 'किलो',
    'Kg': 'किलो',
    'per kg': 'प्रति किलो',
    'quintal': 'क्विंटल',
    'Quintal': 'क्विंटल',
    'per quintal': 'प्रति क्विंटल',
    'ton': 'टन',
    'Ton': 'टन',
    'per ton': 'प्रति टन',
    'acre': 'एकड़',
    'Acre': 'एकड़',
    'per acre': 'प्रति एकड़',
    'packet': 'पैकेट',
    'Packet': 'पैकेट',
    'bag': 'बोरी',
    'Bag': 'बोरी',
    'day': 'दिन',
    'Day': 'दिन',
    'per day': '/ दिन',
    'hour': 'घंटा',
    'Hour': 'घंटा',
    'per hour': '/ घंटा',
    'year': 'वर्ष',
    'Year': 'वर्ष',
    'per year': '/ वर्ष',
    'unit': 'इकाई',
    'per unit': 'प्रति इकाई',
  },
  mr: {
    'kg': 'किलो',
    'Kg': 'किलो',
    'per kg': 'प्रति किलो',
    'quintal': 'क्विंटल',
    'Quintal': 'क्विंटल',
    'per quintal': 'प्रति क्विंटल',
    'ton': 'टन',
    'Ton': 'टन',
    'per ton': 'प्रति टन',
    'acre': 'एकर',
    'Acre': 'एकर',
    'per acre': 'प्रति एकर',
    'packet': 'पॅकेट',
    'Packet': 'पॅकेट',
    'bag': 'पोते',
    'Bag': 'पोते',
    'day': 'दिवस',
    'Day': 'दिवस',
    'per day': '/ दिवस',
    'hour': 'तास',
    'Hour': 'तास',
    'per hour': '/ तास',
    'year': 'वर्ष',
    'Year': 'वर्ष',
    'per year': '/ वर्ष',
    'unit': 'नग',
    'per unit': 'प्रति नग',
  },
  gu: {
    'kg': 'કિલો',
    'Kg': 'કિલો',
    'per kg': 'પ્રતિ કિલો',
    'quintal': 'ક્વિન્ટલ',
    'Quintal': 'ક્વિન્ટલ',
    'per quintal': 'પ્રતિ ક્વિન્ટલ',
    'ton': 'ટન',
    'Ton': 'ટન',
    'per ton': 'પ્રતિ ટન',
    'acre': 'એકર',
    'Acre': 'એકર',
    'per acre': 'પ્રતિ એકર',
    'packet': 'પેકેટ',
    'Packet': 'પેકેટ',
    'bag': 'થેલી',
    'Bag': 'થેલી',
    'day': 'દિવસ',
    'Day': 'દિવસ',
    'per day': '/ દિવસ',
    'hour': 'કલાક',
    'Hour': 'કલાક',
    'per hour': '/ કલાક',
    'year': 'વર્ષ',
    'Year': 'વર્ષ',
    'per year': '/ વર્ષ',
    'unit': 'નંગ',
    'per unit': 'પ્રતિ નંગ',
  },
  pa: {
    'kg': 'ਕਿਲੋ',
    'Kg': 'ਕਿਲੋ',
    'per kg': 'ਪ੍ਰਤੀ ਕਿਲੋ',
    'quintal': 'ਕੁਇੰਟਲ',
    'Quintal': 'ਕੁਇੰਟਲ',
    'per quintal': 'ਪ੍ਰਤੀ ਕੁਇੰਟਲ',
    'ton': 'ਟਨ',
    'Ton': 'ਟਨ',
    'per ton': 'ਪ੍ਰਤੀ ਟਨ',
    'acre': 'ਏਕੜ',
    'Acre': 'ਏਕੜ',
    'per acre': 'ਪ੍ਰਤੀ ਏਕੜ',
    'packet': 'ਪੈਕੇਟ',
    'Packet': 'ਪੈਕੇਟ',
    'bag': 'ਬੋਰੀ',
    'Bag': 'ਬੋਰੀ',
    'day': 'ਦਿਨ',
    'Day': 'ਦਿਨ',
    'per day': '/ ਦਿਨ',
    'hour': 'ਘੰਟਾ',
    'Hour': 'ਘੰਟਾ',
    'per hour': '/ ਘੰਟਾ',
    'year': 'ਸਾਲ',
    'Year': 'ਸਾਲ',
    'per year': '/ ਸਾਲ',
    'unit': 'ਨਗ',
    'per unit': 'ਪ੍ਰਤੀ ਨਗ',
  },
}

const WATER_SOURCES_MAP: Record<string, Record<string, string>> = {
  hi: {
    'Borewell': 'बोरवेल',
    'Borewell (working)': 'बोरवेल (चालू)',
    'Canal': 'नहर',
    'Canal connection': 'नहर कनेक्शन',
    'Well': 'कुआं',
    'Open Well': 'खुला कुआं',
    'River': 'नदी',
    'Rainfed': 'वर्षा आधारित',
    'Drip irrigation': 'ड्रिप सिंचाई',
  },
  mr: {
    'Borewell': 'बोअरवेल',
    'Borewell (working)': 'बोअरवेल (सुरू)',
    'Canal': 'कालवा',
    'Canal connection': 'कालवा जोडणी',
    'Well': 'विहीर',
    'Open Well': 'खुली विहीर',
    'River': 'नदी',
    'Rainfed': 'पावसावर अवलंबून',
    'Drip irrigation': 'ठिबक सिंचन',
  },
  gu: {
    'Borewell': 'બોરવેલ',
    'Borewell (working)': 'બોરવેલ (ચાલુ)',
    'Canal': 'કેનાલ',
    'Canal connection': 'કેનાલ જોડાણ',
    'Well': 'કૂવો',
    'Open Well': 'ખુલ્લો કૂવો',
    'River': 'નદી',
    'Rainfed': 'વરસાદ આધારિત',
    'Drip irrigation': 'ટપક સિંચાઈ',
  },
  pa: {
    'Borewell': 'ਬੋਰਵੈੱਲ',
    'Borewell (working)': 'ਬੋਰਵੈੱਲ (ਚਾਲੂ)',
    'Canal': 'ਨਹਿਰ',
    'Canal connection': 'ਨਹਿਰੀ ਕੁਨੈਕਸ਼ਨ',
    'Well': 'ਖੂਹ',
    'Open Well': 'ਖੁੱਲ੍ਹਾ ਖੂਹ',
    'River': 'ਦਰਿਆ / ਨਦੀ',
    'Rainfed': "ਮੀਂਹ 'ਤੇ ਨਿਰਭਰ",
    'Drip irrigation': 'ਡ੍ਰਿਪ ਸਿੰਚਾਈ',
  },
}

const CONFIDENCE_MAP: Record<string, Record<string, string>> = {
  hi: {
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कम',
  },
  mr: {
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कमी',
  },
  gu: {
    high: 'ઉચ્ચ',
    medium: 'મધ્યમ',
    low: 'ઓછી',
  },
  pa: {
    high: 'ਉੱਚ',
    medium: 'ਦਰਮਿਆਨਾ',
    low: 'ਘੱਟ',
  },
}

export function formatSoilName(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = SOIL_NAMES_MAP[language]
  if (table && table[trimmed]) return table[trimmed]
  return name
}

export function formatSeason(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = SEASONS_MAP[language]
  if (table && table[trimmed]) return table[trimmed]
  return name
}

export function formatWaterAvailability(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = WATER_AVAILABILITY_MAP[language]
  if (table && table[trimmed]) return table[trimmed]
  return name
}

export function formatNutrientLevel(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = NUTRIENT_LEVELS_MAP[language]
  if (table && table[trimmed]) return table[trimmed]
  return name
}

export function formatGrowthStage(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = GROWTH_STAGES_MAP[language]
  if (table && table[trimmed]) return table[trimmed]
  return name
}

export function formatUnit(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = UNITS_MAP[language]
  if (table && table[trimmed]) return table[trimmed]
  return name
}

export function formatWaterSource(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim()
  const table = WATER_SOURCES_MAP[language]
  if (table && table[trimmed]) return table[trimmed]
  return name
}

export function formatConfidence(name: string, language: string): string {
  if (!name) return ''
  const trimmed = name.trim().toLowerCase()
  const table = CONFIDENCE_MAP[language]
  if (table && table[trimmed]) return table[trimmed]
  return name
}

