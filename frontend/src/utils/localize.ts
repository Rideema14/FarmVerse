import type { TranslationKey } from '@/context/LanguageContext'

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
  if (!name) return ''
  const trimmed = name.trim()
  const table = CROP_NAME_MAP[language]
  if (table && table[trimmed]) {
    return table[trimmed]
  }
  // Try case-insensitive or partial match
  if (table) {
    const key = Object.keys(table).find((k) => k.toLowerCase() === trimmed.toLowerCase())
    if (key) return table[key]
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
  if (!name) return ''
  const trimmed = name.trim()
  const table = CROP_NAME_MAP[language]
  if (table && table[trimmed]) {
    return table[trimmed]
  }
  if (table) {
    const key = Object.keys(table).find((k) => k.toLowerCase() === trimmed.toLowerCase())
    if (key) return table[key]
  }
  return name
}
