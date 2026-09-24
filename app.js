/* ==========================================================================
   رادار السفر والسياحة (Travel & Tourism Deals Radar) - Application Logic
   Bilingual Support: Arabic (العربية) & English (EN)
   ========================================================================== */

// 1. Current Language State
let currentLang = localStorage.getItem('radar_lang') || 'ar';

// 1.5 Global Currencies Database (23 Global & Regional Currencies - Synced with CurrencyManager.swift)
const currenciesData = {
  SAR: {
    code: "SAR",
    flag: "🇸🇦",
    countryAr: "المملكة العربية السعودية",
    countryEn: "Saudi Arabia",
    nameAr: "ريال سعودي",
    nameEn: "Saudi Riyal",
    symbolAr: "ر.س",
    symbolEn: "SAR",
    rateFromSAR: 1.0,
    decimalPlaces: 0,
    matchingLocales: ["SA", "SAR", "ara-SA"]
  },
  AED: {
    code: "AED",
    flag: "🇦🇪",
    countryAr: "الإمارات العربية المتحدة",
    countryEn: "United Arab Emirates",
    nameAr: "درهم إماراتي",
    nameEn: "UAE Dirham",
    symbolAr: "د.إ",
    symbolEn: "AED",
    rateFromSAR: 0.98,
    decimalPlaces: 0,
    matchingLocales: ["AE", "AED", "ara-AE"]
  },
  QAR: {
    code: "QAR",
    flag: "🇶🇦",
    countryAr: "دولة قطر",
    countryEn: "Qatar",
    nameAr: "ريال قطري",
    nameEn: "Qatari Riyal",
    symbolAr: "ر.ق",
    symbolEn: "QAR",
    rateFromSAR: 0.97,
    decimalPlaces: 0,
    matchingLocales: ["QA", "QAR", "ara-QA"]
  },
  KWD: {
    code: "KWD",
    flag: "🇰🇼",
    countryAr: "دولة الكويت",
    countryEn: "Kuwait",
    nameAr: "دينار كويتي",
    nameEn: "Kuwaiti Dinar",
    symbolAr: "د.ك",
    symbolEn: "KWD",
    rateFromSAR: 0.082,
    decimalPlaces: 2,
    matchingLocales: ["KW", "KWD", "ara-KW"]
  },
  BHD: {
    code: "BHD",
    flag: "🇧🇭",
    countryAr: "مملكة البحرين",
    countryEn: "Bahrain",
    nameAr: "دينار بحريني",
    nameEn: "Bahraini Dinar",
    symbolAr: "د.ب",
    symbolEn: "BHD",
    rateFromSAR: 0.10,
    decimalPlaces: 2,
    matchingLocales: ["BH", "BHD", "ara-BH"]
  },
  OMR: {
    code: "OMR",
    flag: "🇴🇲",
    countryAr: "سلطنة عمان",
    countryEn: "Oman",
    nameAr: "ريال عماني",
    nameEn: "Omani Rial",
    symbolAr: "ر.ع",
    symbolEn: "OMR",
    rateFromSAR: 0.103,
    decimalPlaces: 2,
    matchingLocales: ["OM", "OMR", "ara-OM"]
  },
  USD: {
    code: "USD",
    flag: "🇺🇸",
    countryAr: "الولايات المتحدة الأمريكية",
    countryEn: "United States",
    nameAr: "دولار أمريكي",
    nameEn: "US Dollar",
    symbolAr: "$",
    symbolEn: "$",
    rateFromSAR: 0.267,
    decimalPlaces: 0,
    matchingLocales: ["US", "USD", "en-US"]
  },
  EUR: {
    code: "EUR",
    flag: "🇪🇺",
    countryAr: "الاتحاد الأوروبي",
    countryEn: "Eurozone",
    nameAr: "يورو",
    nameEn: "Euro",
    symbolAr: "€",
    symbolEn: "€",
    rateFromSAR: 0.245,
    decimalPlaces: 0,
    matchingLocales: ["FR", "DE", "IT", "ES", "NL", "BE", "AT", "EUR"]
  },
  GBP: {
    code: "GBP",
    flag: "🇬🇧",
    countryAr: "المملكة المتحدة",
    countryEn: "United Kingdom",
    nameAr: "جنيه إسترليني",
    nameEn: "British Pound",
    symbolAr: "£",
    symbolEn: "£",
    rateFromSAR: 0.21,
    decimalPlaces: 0,
    matchingLocales: ["GB", "GBP", "en-GB"]
  },
  EGP: {
    code: "EGP",
    flag: "🇪🇬",
    countryAr: "جمهورية مصر العربية",
    countryEn: "Egypt",
    nameAr: "جنيه مصري",
    nameEn: "Egyptian Pound",
    symbolAr: "ج.م",
    symbolEn: "EGP",
    rateFromSAR: 13.0,
    decimalPlaces: 0,
    matchingLocales: ["EG", "EGP", "ara-EG"]
  },
  JOD: {
    code: "JOD",
    flag: "🇯🇴",
    countryAr: "المملكة الأردنية الهاشمية",
    countryEn: "Jordan",
    nameAr: "دينار أردني",
    nameEn: "Jordanian Dinar",
    symbolAr: "د.أ",
    symbolEn: "JOD",
    rateFromSAR: 0.189,
    decimalPlaces: 2,
    matchingLocales: ["JO", "JOD", "ara-JO"]
  },
  TRY: {
    code: "TRY",
    flag: "🇹🇷",
    countryAr: "الجمهورية التركية",
    countryEn: "Turkey",
    nameAr: "ليرة تركية",
    nameEn: "Turkish Lira",
    symbolAr: "₺",
    symbolEn: "TRY",
    rateFromSAR: 9.1,
    decimalPlaces: 0,
    matchingLocales: ["TR", "TRY", "tr-TR"]
  },
  JPY: {
    code: "JPY",
    flag: "🇯🇵",
    countryAr: "اليابان",
    countryEn: "Japan",
    nameAr: "ين ياباني",
    nameEn: "Japanese Yen",
    symbolAr: "¥",
    symbolEn: "¥",
    rateFromSAR: 41.5,
    decimalPlaces: 0,
    matchingLocales: ["JP", "JPY", "ja-JP"]
  },
  CHF: {
    code: "CHF",
    flag: "🇨🇭",
    countryAr: "سويسرا",
    countryEn: "Switzerland",
    nameAr: "فرنك سويسري",
    nameEn: "Swiss Franc",
    symbolAr: "CHF",
    symbolEn: "CHF",
    rateFromSAR: 0.235,
    decimalPlaces: 0,
    matchingLocales: ["CH", "CHF"]
  },
  CAD: {
    code: "CAD",
    flag: "🇨🇦",
    countryAr: "كندا",
    countryEn: "Canada",
    nameAr: "دولار كندي",
    nameEn: "Canadian Dollar",
    symbolAr: "C$",
    symbolEn: "CAD",
    rateFromSAR: 0.365,
    decimalPlaces: 0,
    matchingLocales: ["CA", "CAD", "en-CA"]
  },
  AUD: {
    code: "AUD",
    flag: "🇦🇺",
    countryAr: "أستراليا",
    countryEn: "Australia",
    nameAr: "دولار أسترالي",
    nameEn: "Australian Dollar",
    symbolAr: "A$",
    symbolEn: "AUD",
    rateFromSAR: 0.405,
    decimalPlaces: 0,
    matchingLocales: ["AU", "AUD", "en-AU"]
  },
  MAD: {
    code: "MAD",
    flag: "🇲🇦",
    countryAr: "المملكة المغربية",
    countryEn: "Morocco",
    nameAr: "درهم مغربي",
    nameEn: "Moroccan Dirham",
    symbolAr: "د.م",
    symbolEn: "MAD",
    rateFromSAR: 2.65,
    decimalPlaces: 0,
    matchingLocales: ["MA", "MAD", "ara-MA"]
  },
  MYR: {
    code: "MYR",
    flag: "🇲🇾",
    countryAr: "ماليزيا",
    countryEn: "Malaysia",
    nameAr: "رينغيت ماليزي",
    nameEn: "Malaysian Ringgit",
    symbolAr: "RM",
    symbolEn: "MYR",
    rateFromSAR: 1.15,
    decimalPlaces: 0,
    matchingLocales: ["MY", "MYR"]
  },
  IDR: {
    code: "IDR",
    flag: "🇮🇩",
    countryAr: "إندونيسيا",
    countryEn: "Indonesia",
    nameAr: "روبية إندونيسية",
    nameEn: "Indonesian Rupiah",
    symbolAr: "Rp",
    symbolEn: "IDR",
    rateFromSAR: 4300.0,
    decimalPlaces: 0,
    matchingLocales: ["ID", "IDR"]
  },
  THB: {
    code: "THB",
    flag: "🇹🇭",
    countryAr: "تايلاند",
    countryEn: "Thailand",
    nameAr: "بات تايلاندي",
    nameEn: "Thai Baht",
    symbolAr: "฿",
    symbolEn: "THB",
    rateFromSAR: 9.2,
    decimalPlaces: 0,
    matchingLocales: ["TH", "THB"]
  },
  INR: {
    code: "INR",
    flag: "🇮🇳",
    countryAr: "الهند",
    countryEn: "India",
    nameAr: "روبية هندية",
    nameEn: "Indian Rupee",
    symbolAr: "₹",
    symbolEn: "INR",
    rateFromSAR: 22.5,
    decimalPlaces: 0,
    matchingLocales: ["IN", "INR"]
  },
  SGD: {
    code: "SGD",
    flag: "🇸🇬",
    countryAr: "سنغافورة",
    countryEn: "Singapore",
    nameAr: "دولار سنغافوري",
    nameEn: "Singapore Dollar",
    symbolAr: "S$",
    symbolEn: "SGD",
    rateFromSAR: 0.355,
    decimalPlaces: 0,
    matchingLocales: ["SG", "SGD"]
  },
  CNY: {
    code: "CNY",
    flag: "🇨🇳",
    countryAr: "الصين",
    countryEn: "China",
    nameAr: "يوان صيني",
    nameEn: "Chinese Yuan",
    symbolAr: "¥",
    symbolEn: "CNY",
    rateFromSAR: 1.92,
    decimalPlaces: 0,
    matchingLocales: ["CN", "CNY", "zh-CN"]
  }
};

function detectInitialCurrency() {
  try {
    const timeZone = (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone || '' : '';
    const locale = (navigator.language || navigator.userLanguage || '').toUpperCase();

    if (timeZone.includes('Riyadh')) return 'SAR';
    if (timeZone.includes('Dubai')) return 'AED';
    if (timeZone.includes('Qatar')) return 'QAR';
    if (timeZone.includes('Kuwait')) return 'KWD';
    if (timeZone.includes('Bahrain')) return 'BHD';
    if (timeZone.includes('Muscat')) return 'OMR';
    if (timeZone.includes('Cairo')) return 'EGP';
    if (timeZone.includes('Amman')) return 'JOD';
    if (timeZone.includes('Istanbul')) return 'TRY';
    if (timeZone.includes('London')) return 'GBP';
    if (timeZone.includes('Paris') || timeZone.includes('Berlin') || timeZone.includes('Rome') || timeZone.includes('Madrid') || timeZone.includes('Amsterdam') || timeZone.includes('Brussels') || timeZone.includes('Vienna')) return 'EUR';
    if (timeZone.includes('Tokyo')) return 'JPY';
    if (timeZone.includes('Zurich')) return 'CHF';
    if (timeZone.includes('Toronto') || timeZone.includes('Vancouver') || timeZone.includes('Montreal')) return 'CAD';
    if (timeZone.includes('Sydney') || timeZone.includes('Melbourne') || timeZone.includes('Brisbane')) return 'AUD';
    if (timeZone.includes('Casablanca')) return 'MAD';
    if (timeZone.includes('Kuala_Lumpur')) return 'MYR';
    if (timeZone.includes('Jakarta')) return 'IDR';
    if (timeZone.includes('Bangkok')) return 'THB';
    if (timeZone.includes('Kolkata')) return 'INR';
    if (timeZone.includes('Singapore')) return 'SGD';
    if (timeZone.includes('Shanghai') || timeZone.includes('Beijing') || timeZone.includes('Chongqing')) return 'CNY';
    if (timeZone.includes('New_York') || timeZone.includes('Los_Angeles') || timeZone.includes('Chicago') || timeZone.includes('Denver')) return 'USD';

    for (const code of Object.keys(currenciesData)) {
      const c = currenciesData[code];
      if (c.matchingLocales.some(loc => locale.includes(loc.toUpperCase()))) {
        return code;
      }
    }
  } catch (e) {
    console.warn("Currency auto-detect fallback:", e);
  }
  return 'SAR';
}

let currentCurrencyCode = localStorage.getItem('radar_selected_currency') || detectInitialCurrency();
if (!currenciesData[currentCurrencyCode]) {
  currentCurrencyCode = 'SAR';
}

function getCurrentCurrency() {
  return currenciesData[currentCurrencyCode] || currenciesData['SAR'];
}

function formatCurrency(sarAmount, unitAr = '', unitEn = '') {
  const isAr = (currentLang === 'ar');
  const curr = getCurrentCurrency();
  const converted = sarAmount * curr.rateFromSAR;
  
  let formattedNumber;
  if (curr.decimalPlaces > 0) {
    formattedNumber = converted.toLocaleString(isAr ? 'ar-SA' : 'en-US', {
      minimumFractionDigits: curr.decimalPlaces,
      maximumFractionDigits: curr.decimalPlaces
    });
  } else {
    formattedNumber = Math.round(converted).toLocaleString(isAr ? 'ar-SA' : 'en-US');
  }

  const symbol = isAr ? curr.symbolAr : curr.symbolEn;
  const unit = isAr ? unitAr : unitEn;
  return `${formattedNumber} ${symbol}${unit ? unit : ''}`;
}

function formatCurrencyNumber(sarAmount) {
  const isAr = (currentLang === 'ar');
  const curr = getCurrentCurrency();
  const converted = sarAmount * curr.rateFromSAR;
  if (curr.decimalPlaces > 0) {
    return converted.toLocaleString(isAr ? 'ar-SA' : 'en-US', {
      minimumFractionDigits: curr.decimalPlaces,
      maximumFractionDigits: curr.decimalPlaces
    });
  }
  return Math.round(converted).toLocaleString(isAr ? 'ar-SA' : 'en-US');
}

// 2. Deals Database with Bilingual Content (Synced with Deal.swift)

// 2.5 Tourist Countries & Cities Database (Bilingual)
const destinationsData = [
  {
    "id": "sa",
    "flag": "🇸🇦",
    "region": "gulf",
    "region_ar": "الشرق الأوسط والخليج",
    "region_en": "Middle East & GCC",
    "name_ar": "المملكة العربية السعودية",
    "name_en": "Saudi Arabia",
    "cities": [
      {
        "name_ar": "العلا",
        "name_en": "AlUla",
        "tag_ar": "منتجعات صخرية فاخرة",
        "tag_en": "Luxury Desert Resorts",
        "hasDeal": true,
        "dealKey": "alula"
      },
      {
        "name_ar": "الرياض",
        "name_en": "Riyadh",
        "tag_ar": "فنادق أعمال وأبراج",
        "tag_en": "Business & Sky Towers",
        "hasDeal": true,
        "dealKey": "flight"
      },
      {
        "name_ar": "البحر الأحمر",
        "name_en": "Red Sea",
        "tag_ar": "جزر وشواطئ عذراء",
        "tag_en": "Pristine Island Resorts",
        "hasDeal": true,
        "dealKey": "maldives"
      },
      {
        "name_ar": "جدة",
        "name_en": "Jeddah",
        "tag_ar": "إطلالات بحرية وكورنيش",
        "tag_en": "Corniche & Waterfront",
        "hasDeal": false
      },
      {
        "name_ar": "أبها",
        "name_en": "Abha",
        "tag_ar": "طبيعة جبلية وضباب",
        "tag_en": "Mountain Retreats",
        "hasDeal": false
      },
      {
        "name_ar": "نيوم",
        "name_en": "NEOM",
        "tag_ar": "وجهات المستقبل الفاخرة",
        "tag_en": "Futuristic Destinations",
        "hasDeal": false
      },
      {
        "name_ar": "الطائف",
        "name_en": "Taif",
        "tag_ar": "مزارع الورد وأجواء معتدلة",
        "tag_en": "Rose Valleys & Breeze",
        "hasDeal": false
      },
      {
        "name_ar": "جزيرة سندالة (نيوم)",
        "name_en": "Sindalah Island (NEOM)",
        "tag_ar": "يخوت ومنتجعات فائقة الفخامة",
        "tag_en": "Ultra-Luxury Yachting Haven",
        "hasDeal": true,
        "isTrending": true
      },
      {
        "name_ar": "جزيرة شيبارة (البحر الأحمر)",
        "name_en": "Sheybarah Island",
        "tag_ar": "فلل كروية عائمة وفخامة مستقبلية",
        "tag_en": "Futuristic Orb Overwater Villas",
        "hasDeal": true,
        "isTrending": true
      },
      {
        "name_ar": "أمالا (ريفييرا البحر الأحمر)",
        "name_en": "Amaala",
        "tag_ar": "استشفاء ونقاهة واستجمام فائق",
        "tag_en": "Ultra-Luxury Wellness Riviera",
        "hasDeal": false,
        "isTrending": true
      },
      {
        "name_ar": "الدرعية التاريخية",
        "name_en": "Historic Diriyah",
        "tag_ar": "قصور طينية وفنادق تراثية نادرة",
        "tag_en": "Heritage Stays & Bujairi",
        "hasDeal": false,
        "isTrending": true
      },
      {
        "name_ar": "تروجينا (نيوم)",
        "name_en": "Trojena (NEOM)",
        "tag_ar": "تزلج على الجليد في قلب الصحراء",
        "tag_en": "Mountain Ski & Lake Resorts",
        "hasDeal": false,
        "isTrending": true
      }
    ]
  },
  {
    "id": "ae",
    "flag": "🇦🇪",
    "region": "gulf",
    "region_ar": "الشرق الأوسط والخليج",
    "region_en": "Middle East & GCC",
    "name_ar": "الإمارات العربية المتحدة",
    "name_en": "United Arab Emirates",
    "cities": [
      {
        "name_ar": "دبي",
        "name_en": "Dubai",
        "tag_ar": "منتجعات أيقونية وتسوق",
        "tag_en": "Iconic Resorts & Luxury",
        "hasDeal": true
      },
      {
        "name_ar": "أبوظبي",
        "name_en": "Abu Dhabi",
        "tag_ar": "قصور وثقافة وفنون",
        "tag_en": "Palaces & Cultural Gems",
        "hasDeal": false
      },
      {
        "name_ar": "رأس الخيمة",
        "name_en": "Ras Al Khaimah",
        "tag_ar": "شاليهات بحرية ومغامرات",
        "tag_en": "Beach Chalets & Adventures",
        "hasDeal": false
      },
      {
        "name_ar": "العين",
        "name_en": "Al Ain",
        "tag_ar": "واحات نخيل وتاريخ",
        "tag_en": "Oasis & Heritage",
        "hasDeal": false
      },
      {
        "name_ar": "الفجيرة",
        "name_en": "Fujairah",
        "tag_ar": "غوص ومنتجعات جبلية",
        "tag_en": "Diving & Mountain Escapes",
        "hasDeal": false
      },
      {
        "name_ar": "جزيرة المرجان (رأس الخيمة)",
        "name_en": "Al Marjan Island",
        "tag_ar": "أضخم منتجعات ترفيهية وريفييرا",
        "tag_en": "Wynn & Mega Integrated Resorts",
        "hasDeal": true,
        "isTrending": true
      }
    ]
  },
  {
    "id": "om",
    "flag": "🇴🇲",
    "region": "gulf",
    "region_ar": "الشرق الأوسط والخليج",
    "region_en": "Middle East & GCC",
    "name_ar": "سلطنة عمان",
    "name_en": "Oman",
    "cities": [
      {
        "name_ar": "مسقط",
        "name_en": "Muscat",
        "tag_ar": "منتجعات شاطئية وأوبرا",
        "tag_en": "Coastal Luxury & Opera",
        "hasDeal": false
      },
      {
        "name_ar": "صلالة",
        "name_en": "Salalah",
        "tag_ar": "خريف استوائي وشلالات",
        "tag_en": "Monsoon Mist & Waterfalls",
        "hasDeal": false
      },
      {
        "name_ar": "الجبل الأخضر",
        "name_en": "Jabal Akhdar",
        "tag_ar": "أجنحة فندقية شاهقة",
        "tag_en": "Canyon Edge Cliff Resorts",
        "hasDeal": false
      },
      {
        "name_ar": "مسندم",
        "name_en": "Musandam",
        "tag_ar": "مضائق بحرية ويخوت",
        "tag_en": "Fjords & Yachting",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "qa",
    "flag": "🇶🇦",
    "region": "gulf",
    "region_ar": "الشرق الأوسط والخليج",
    "region_en": "Middle East & GCC",
    "name_ar": "قطر",
    "name_en": "Qatar",
    "cities": [
      {
        "name_ar": "الدوحة",
        "name_en": "Doha",
        "tag_ar": "جزيرة اللؤلؤة وكورنيش",
        "tag_en": "The Pearl & Corniche",
        "hasDeal": false
      },
      {
        "name_ar": "لوسيل",
        "name_en": "Lusail",
        "tag_ar": "عمارة حديثة ومطاعم فاخرة",
        "tag_en": "Modern Architecture & Dining",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "bh",
    "flag": "🇧🇭",
    "region": "gulf",
    "region_ar": "الشرق الأوسط والخليج",
    "region_en": "Middle East & GCC",
    "name_ar": "البحرين",
    "name_en": "Bahrain",
    "cities": [
      {
        "name_ar": "المنامة",
        "name_en": "Manama",
        "tag_ar": "سياحة فندقية ومطاعم",
        "tag_en": "Urban Resorts & Dining",
        "hasDeal": false
      },
      {
        "name_ar": "جزر أمواج",
        "name_en": "Amwaj Islands",
        "tag_ar": "شاليهات بحرية وسبا",
        "tag_en": "Waterfront Chalets",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "kw",
    "flag": "🇰🇼",
    "region": "gulf",
    "region_ar": "الشرق الأوسط والخليج",
    "region_en": "Middle East & GCC",
    "name_ar": "الكويت",
    "name_en": "Kuwait",
    "cities": [
      {
        "name_ar": "مدينة الكويت",
        "name_en": "Kuwait City",
        "tag_ar": "أبراج تاريخية وأسواق",
        "tag_en": "Towers & Heritage Souqs",
        "hasDeal": false
      },
      {
        "name_ar": "الخيران",
        "name_en": "Khiran",
        "tag_ar": "شاليهات وألعاب مائية",
        "tag_en": "Sea Lagoons & Chalets",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "eg",
    "flag": "🇪🇬",
    "region": "gulf",
    "region_ar": "الشرق الأوسط والخليج",
    "region_en": "Middle East & GCC",
    "name_ar": "جمهورية مصر العربية",
    "name_en": "Egypt",
    "cities": [
      {
        "name_ar": "شرم الشيخ",
        "name_en": "Sharm El Sheikh",
        "tag_ar": "منتجعات شاملة وغوص",
        "tag_en": "All-Inclusive & Diving",
        "hasDeal": false
      },
      {
        "name_ar": "القاهرة",
        "name_en": "Cairo",
        "tag_ar": "أهرامات ومتاحف أثرية",
        "tag_en": "Pyramids & Grand Museum",
        "hasDeal": false
      },
      {
        "name_ar": "الغردقة",
        "name_en": "Hurghada",
        "tag_ar": "شواطئ رملية ويخوت",
        "tag_en": "Golden Beaches & Yachts",
        "hasDeal": false
      },
      {
        "name_ar": "الجونة",
        "name_en": "El Gouna",
        "tag_ar": "بحيرات وشاليهات فاخرة",
        "tag_en": "Lagoons & Elite Marina",
        "hasDeal": false
      },
      {
        "name_ar": "الأقصر",
        "name_en": "Luxor",
        "tag_ar": "معابد نيلية ومناطيد",
        "tag_en": "Nile Temples & Balloons",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "ma",
    "flag": "🇲🇦",
    "region": "gulf",
    "region_ar": "الشرق الأوسط والخليج",
    "region_en": "Middle East & GCC",
    "name_ar": "المملكة المغربية",
    "name_en": "Morocco",
    "cities": [
      {
        "name_ar": "مراكش",
        "name_en": "Marrakech",
        "tag_ar": "رياضات أندلسية وقصور",
        "tag_en": "Luxury Riads & Palaces",
        "hasDeal": false
      },
      {
        "name_ar": "شفشاون",
        "name_en": "Chefchaouen",
        "tag_ar": "المدينة الزرقاء الساحرة",
        "tag_en": "The Blue Pearl & Hills",
        "hasDeal": false
      },
      {
        "name_ar": "الدار البيضاء",
        "name_en": "Casablanca",
        "tag_ar": "شواطئ ومطاعم عالمية",
        "tag_en": "Oceanfront Luxury & Dining",
        "hasDeal": false
      },
      {
        "name_ar": "طنجة",
        "name_en": "Tangier",
        "tag_ar": "إطلالات مضيق جبل طارق",
        "tag_en": "Strait of Gibraltar Views",
        "hasDeal": false
      },
      {
        "name_ar": "أغادير",
        "name_en": "Agadir",
        "tag_ar": "شواطئ أطلسية ممتدة",
        "tag_en": "Atlantic Resorts & Surfing",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "jo",
    "flag": "🇯🇴",
    "region": "gulf",
    "region_ar": "الشرق الأوسط والخليج",
    "region_en": "Middle East & GCC",
    "name_ar": "المملكة الأردنية",
    "name_en": "Jordan",
    "cities": [
      {
        "name_ar": "البتراء",
        "name_en": "Petra",
        "tag_ar": "المدينة الوردية المنحوتة",
        "tag_en": "Ancient Rose Rock City",
        "hasDeal": false
      },
      {
        "name_ar": "وادي رم",
        "name_en": "Wadi Rum",
        "tag_ar": "مخيمات المريخ والنجوم",
        "tag_en": "Mars Camps & Stargazing",
        "hasDeal": false
      },
      {
        "name_ar": "البحر الميت",
        "name_en": "Dead Sea",
        "tag_ar": "منتجعات استشفاء وطين طبي",
        "tag_en": "Wellness & Mineral Spas",
        "hasDeal": false
      },
      {
        "name_ar": "العقبة",
        "name_en": "Aqaba",
        "tag_ar": "شواطئ البحر الأحمر وغوص",
        "tag_en": "Red Sea Coastal Escapes",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "lb",
    "flag": "🇱🇧",
    "region": "gulf",
    "region_ar": "الشرق الأوسط والخليج",
    "region_en": "Middle East & GCC",
    "name_ar": "لبنان",
    "name_en": "Lebanon",
    "cities": [
      {
        "name_ar": "بيروت",
        "name_en": "Beirut",
        "tag_ar": "مطاعم وكورنيش الروشة",
        "tag_en": "Boutique Stays & Seaside",
        "hasDeal": false
      },
      {
        "name_ar": "فاريا",
        "name_en": "Faraya",
        "tag_ar": "منتجعات ثلجية وتزلج",
        "tag_en": "Snow Ski Chalets",
        "hasDeal": false
      },
      {
        "name_ar": "جبيل",
        "name_en": "Byblos",
        "tag_ar": "ميناء فينيقي وقلاع تاريخية",
        "tag_en": "Historic Harbor & Ruins",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "tn",
    "flag": "🇹🇳",
    "region": "gulf",
    "region_ar": "الشرق الأوسط والخليج",
    "region_en": "Middle East & GCC",
    "name_ar": "الجمهورية التونسية",
    "name_en": "Tunisia",
    "cities": [
      {
        "name_ar": "سيدي بوسعيد",
        "name_en": "Sidi Bou Said",
        "tag_ar": "بيوت زرقاء وإطلالة بحرية",
        "tag_en": "Blue & White Cliff Villages",
        "hasDeal": false
      },
      {
        "name_ar": "جربة",
        "name_en": "Djerba",
        "tag_ar": "جزيرة شواطئ ونخيل",
        "tag_en": "Mediterranean Island Escapes",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "ch",
    "flag": "🇨🇭",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "سويسرا",
    "name_en": "Switzerland",
    "cities": [
      {
        "name_ar": "إنترلاكن",
        "name_en": "Interlaken",
        "tag_ar": "بحيرات وجبال الألب",
        "tag_en": "Alpine Lakes & Peaks",
        "hasDeal": true
      },
      {
        "name_ar": "زيرمات",
        "name_en": "Zermatt",
        "tag_ar": "إطلالات الماترهورن وتزلج",
        "tag_en": "Matterhorn Luxury Chalets",
        "hasDeal": true
      },
      {
        "name_ar": "جنيف",
        "name_en": "Geneva",
        "tag_ar": "بحيرات وساعات فاخرة",
        "tag_en": "Lakeside Luxury & Boutiques",
        "hasDeal": false
      },
      {
        "name_ar": "لوسيرن",
        "name_en": "Lucerne",
        "tag_ar": "جسور خشبية وبحيرات",
        "tag_en": "Scenic Bridges & Cruises",
        "hasDeal": false
      },
      {
        "name_ar": "لوتيربرونن",
        "name_en": "Lauterbrunnen",
        "tag_ar": "وادي الـ 72 شلالاً",
        "tag_en": "Valley of 72 Waterfalls",
        "hasDeal": false
      },
      {
        "name_ar": "زيورخ",
        "name_en": "Zurich",
        "tag_ar": "تسوق راقٍ وبنوك تاريخية",
        "tag_en": "Elite Shopping & Old Town",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "fr",
    "flag": "🇫🇷",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "فرنسا",
    "name_en": "France",
    "cities": [
      {
        "name_ar": "باريس",
        "name_en": "Paris",
        "tag_ar": "عاصمة الموضة وبرج إيفل",
        "tag_en": "Fashion Capital & Eiffel",
        "hasDeal": true
      },
      {
        "name_ar": "نيس",
        "name_en": "Nice",
        "tag_ar": "الكوت دازور والريفييرا",
        "tag_en": "French Riviera Promenade",
        "hasDeal": false
      },
      {
        "name_ar": "كان",
        "name_en": "Cannes",
        "tag_ar": "مهرجانات ويخوت خاصة",
        "tag_en": "Film Festival & Elite Yachts",
        "hasDeal": false
      },
      {
        "name_ar": "آنسي",
        "name_en": "Annecy",
        "tag_ar": "فينيسيا الألب وبحيرات نقية",
        "tag_en": "Alpine Venice & Canals",
        "hasDeal": false
      },
      {
        "name_ar": "شاموني",
        "name_en": "Chamonix",
        "tag_ar": "قمة مون بلان وتزلج",
        "tag_en": "Mont Blanc Ski Resorts",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "gb",
    "flag": "🇬🇧",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "المملكة المتحدة",
    "name_en": "United Kingdom",
    "cities": [
      {
        "name_ar": "لندن",
        "name_en": "London",
        "tag_ar": "مسارح وقصور ومتاجر هارودز",
        "tag_en": "Palaces, West End & Harrods",
        "hasDeal": true,
        "dealKey": "flight"
      },
      {
        "name_ar": "إدنبرة",
        "name_en": "Edinburgh",
        "tag_ar": "قلاع تاريخية وطبيعة اسكتلندية",
        "tag_en": "Castles & Royal Mile",
        "hasDeal": false
      },
      {
        "name_ar": "كوتسوولدز",
        "name_en": "Cotswolds",
        "tag_ar": "ريف إنجليزي وقرى حجرية",
        "tag_en": "Charming English Countryside",
        "hasDeal": false
      },
      {
        "name_ar": "مانشستر",
        "name_en": "Manchester",
        "tag_ar": "كرة قدم وموسيقى وتسوق",
        "tag_en": "Football & Cultural Life",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "it",
    "flag": "🇮🇹",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "إيطاليا",
    "name_en": "Italy",
    "cities": [
      {
        "name_ar": "روما",
        "name_en": "Rome",
        "tag_ar": "الكولوسيوم والفاتيكان",
        "tag_en": "Colosseum & Ancient History",
        "hasDeal": true
      },
      {
        "name_ar": "ساحل أمالفي",
        "name_en": "Amalfi Coast",
        "tag_ar": "قرى معلقة على البحر",
        "tag_en": "Cliffside Pastel Towns",
        "hasDeal": true
      },
      {
        "name_ar": "ميلانو",
        "name_en": "Milan",
        "tag_ar": "عاصمة الأزياء والرفاهية",
        "tag_en": "Fashion Capital & Duomo",
        "hasDeal": false
      },
      {
        "name_ar": "البندقية",
        "name_en": "Venice",
        "tag_ar": "جندول وقنوات مائية عائمة",
        "tag_en": "Canals & Grand Palaces",
        "hasDeal": false
      },
      {
        "name_ar": "بحيرة كومو",
        "name_en": "Lake Como",
        "tag_ar": "قصور المشاهير والبحيرات",
        "tag_en": "Celebrity Villas & Scenery",
        "hasDeal": false
      },
      {
        "name_ar": "فلورنسا",
        "name_en": "Florence",
        "tag_ar": "عصر النهضة ومتاحف الفن",
        "tag_en": "Renaissance Art & Uffizi",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "es",
    "flag": "🇪🇸",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "إسبانيا",
    "name_en": "Spain",
    "cities": [
      {
        "name_ar": "برشلونة",
        "name_en": "Barcelona",
        "tag_ar": "عمارة غاودي وشواطئ",
        "tag_en": "Gaudi Architecture & Beaches",
        "hasDeal": true
      },
      {
        "name_ar": "مدريد",
        "name_en": "Madrid",
        "tag_ar": "قصور ملكية ومطاعم راقية",
        "tag_en": "Royal Palaces & Art Hubs",
        "hasDeal": false
      },
      {
        "name_ar": "ماربيا",
        "name_en": "Marbella",
        "tag_ar": "منتجعات بويرتو بانوس",
        "tag_en": "Puerto Banus Luxury Marina",
        "hasDeal": false
      },
      {
        "name_ar": "مايوركا",
        "name_en": "Mallorca",
        "tag_ar": "جزر البليار وخلجان زرقاء",
        "tag_en": "Balearic Island Coves",
        "hasDeal": false
      },
      {
        "name_ar": "إشبيلية",
        "name_en": "Seville",
        "tag_ar": "تراث أندلسي وقصور الكازار",
        "tag_en": "Andalusian Heritage & Alcazar",
        "hasDeal": false
      },
      {
        "name_ar": "إيبيزا",
        "name_en": "Ibiza",
        "tag_ar": "شواطئ بيضاء ومنتجعات حصرية",
        "tag_en": "White Beaches & Sunset Lounges",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "tr",
    "flag": "🇹🇷",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "تركيا",
    "name_en": "Turkey",
    "cities": [
      {
        "name_ar": "إسطنبول",
        "name_en": "Istanbul",
        "tag_ar": "مضيق البوسفور وتاريخ",
        "tag_en": "Bosphorus Stays & Palaces",
        "hasDeal": true
      },
      {
        "name_ar": "طرابزون",
        "name_en": "Trabzon",
        "tag_ar": "مزارع الشاي وجبال أوزنجول",
        "tag_en": "Uzungol Lake & Green Hills",
        "hasDeal": false
      },
      {
        "name_ar": "كابادوكيا",
        "name_en": "Cappadocia",
        "tag_ar": "مناطيد وفنادق الكهوف",
        "tag_en": "Cave Suites & Hot Air Balloons",
        "hasDeal": false
      },
      {
        "name_ar": "أنطاليا",
        "name_en": "Antalya",
        "tag_ar": "منتجعات شاملة وشواطئ",
        "tag_en": "Turquoise Coast All-Inclusive",
        "hasDeal": false
      },
      {
        "name_ar": "بودروم",
        "name_en": "Bodrum",
        "tag_ar": "ريفييرا إيجة وفنادق بوتيك",
        "tag_en": "Aegean Riviera & Beach Clubs",
        "hasDeal": false
      },
      {
        "name_ar": "ريزا",
        "name_en": "Rize",
        "tag_ar": "شلالات ومدرجات شاي خضراء",
        "tag_en": "Tea Plantations & Highlands",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "at",
    "flag": "🇦🇹",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "النمسا",
    "name_en": "Austria",
    "cities": [
      {
        "name_ar": "فيينا",
        "name_en": "Vienna",
        "tag_ar": "قصور كلاسيكية وموسيقى",
        "tag_en": "Imperial Palaces & Classical Arts",
        "hasDeal": false
      },
      {
        "name_ar": "زيل أم زيه",
        "name_en": "Zell am See",
        "tag_ar": "بحيرات ثلجية وقرى جبلية",
        "tag_en": "Alpine Lake & Kitzsteinhorn",
        "hasDeal": false
      },
      {
        "name_ar": "سالزبورغ",
        "name_en": "Salzburg",
        "tag_ar": "مدينة موزارت وقلاع حجرية",
        "tag_en": "Mozart's Birthplace & Castles",
        "hasDeal": false
      },
      {
        "name_ar": "هالشتات",
        "name_en": "Hallstatt",
        "tag_ar": "القرية الأجمل على البحيرة",
        "tag_en": "Fairytale Lakeside Village",
        "hasDeal": false
      },
      {
        "name_ar": "إنسبروك",
        "name_en": "Innsbruck",
        "tag_ar": "عاصمة التيرول والتزلج",
        "tag_en": "Tyrolean Alps & Ski Slopes",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "de",
    "flag": "🇩🇪",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "ألمانيا",
    "name_en": "Germany",
    "cities": [
      {
        "name_ar": "ميونخ",
        "name_en": "Munich",
        "tag_ar": "بافاريا وسيارات فارهة",
        "tag_en": "Bavarian Elegance & Castles",
        "hasDeal": false
      },
      {
        "name_ar": "الغابة السوداء",
        "name_en": "Black Forest",
        "tag_ar": "منتجعات استجمام وينابيع",
        "tag_en": "Thermal Spas & Dense Pines",
        "hasDeal": false
      },
      {
        "name_ar": "برلين",
        "name_en": "Berlin",
        "tag_ar": "متاحف تاريخية وحياة مدنية",
        "tag_en": "Museum Island & City Pulse",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "gr",
    "flag": "🇬🇷",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "اليونان",
    "name_en": "Greece",
    "cities": [
      {
        "name_ar": "سانتوريني",
        "name_en": "Santorini",
        "tag_ar": "قباب زرقاء وغروب إيجه",
        "tag_en": "Caldera Views & Sunset Pools",
        "hasDeal": false
      },
      {
        "name_ar": "ميكونوس",
        "name_en": "Mykonos",
        "tag_ar": "نوادي شاطئية وأزقة بيضاء",
        "tag_en": "Elite Beach Clubs & Windmills",
        "hasDeal": false
      },
      {
        "name_ar": "أثينا",
        "name_en": "Athens",
        "tag_ar": "الأكروبوليس وحضارة الإغريق",
        "tag_en": "Acropolis & Ancient Wonders",
        "hasDeal": false
      },
      {
        "name_ar": "كريت",
        "name_en": "Crete",
        "tag_ar": "شواطئ زهرية ومنتجعات خاصة",
        "tag_en": "Pink Sands & Coastal Villas",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "nl",
    "flag": "🇳🇱",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "هولندا",
    "name_en": "Netherlands",
    "cities": [
      {
        "name_ar": "أمستردام",
        "name_en": "Amsterdam",
        "tag_ar": "قنوات مائية ودراجات وقوارب",
        "tag_en": "Canal Ring Cruises & Museums",
        "hasDeal": false
      },
      {
        "name_ar": "قريثورن",
        "name_en": "Giethoorn",
        "tag_ar": "قرية بلا شوارع وزوارق هادئة",
        "tag_en": "Village with No Roads",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "pt",
    "flag": "🇵🇹",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "البرتغال",
    "name_en": "Portugal",
    "cities": [
      {
        "name_ar": "لشبونة",
        "name_en": "Lisbon",
        "tag_ar": "ترام تاريخي وإطلالات المحيط",
        "tag_en": "Historic Trams & Viewpoints",
        "hasDeal": false
      },
      {
        "name_ar": "بورتو",
        "name_en": "Porto",
        "tag_ar": "نهر دورو وعمارة كلاسيكية",
        "tag_en": "Douro River & Terraces",
        "hasDeal": false
      },
      {
        "name_ar": "الغارف",
        "name_en": "Algarve",
        "tag_ar": "كهوف بحرية وشواطئ ذهبية",
        "tag_en": "Golden Sea Caves & Cliffs",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "no",
    "flag": "🇳🇴",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "النرويج",
    "name_en": "Norway",
    "cities": [
      {
        "name_ar": "ترومسو",
        "name_en": "Tromso",
        "tag_ar": "الشفق القطبي وشمس منتصف الليل",
        "tag_en": "Northern Lights & Arctic Fjord",
        "hasDeal": false
      },
      {
        "name_ar": "بيرغن",
        "name_en": "Bergen",
        "tag_ar": "بوابة المضايق البحرية والبيوت الملونة",
        "tag_en": "Fjord Gateway & Wooden Quays",
        "hasDeal": false
      },
      {
        "name_ar": "جزر لوفوتين",
        "name_en": "Lofoten Islands",
        "tag_ar": "قرى صيد وجبال دراماتيكية",
        "tag_en": "Dramatic Peaks & Arctic Seas",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "is",
    "flag": "🇮🇸",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "آيسلندا",
    "name_en": "Iceland",
    "cities": [
      {
        "name_ar": "ريكيافيك",
        "name_en": "Reykjavik",
        "tag_ar": "البحيرة الزرقاء والينابيع الحارة",
        "tag_en": "Blue Lagoon & Geothermal Spas",
        "hasDeal": false
      },
      {
        "name_ar": "فيك",
        "name_en": "Vik",
        "tag_ar": "الشاطئ الرملي الأسود والشلالات",
        "tag_en": "Black Sand Beach & Waterfalls",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "cz",
    "flag": "🇨🇿",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "التشيك",
    "name_en": "Czech Republic",
    "cities": [
      {
        "name_ar": "براغ",
        "name_en": "Prague",
        "tag_ar": "مدينة الأبراج وجسر تشارلز",
        "tag_en": "City of Hundred Spires & Bridge",
        "hasDeal": false
      },
      {
        "name_ar": "تشيسكي كروملوف",
        "name_en": "Cesky Krumlov",
        "tag_ar": "قلاع أسطورية على نهر فلتافا",
        "tag_en": "Fairytale Castle on the River",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "ba",
    "flag": "🇧🇦",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "البوسنة والهرسك",
    "name_en": "Bosnia & Herzegovina",
    "cities": [
      {
        "name_ar": "سراييفو",
        "name_en": "Sarajevo",
        "tag_ar": "تاريخ عثماني وجبال أولمبية",
        "tag_en": "Bascarsija Bazaar & Green Hills",
        "hasDeal": false
      },
      {
        "name_ar": "موستار",
        "name_en": "Mostar",
        "tag_ar": "الجسر القديم ونهر نيريتفا",
        "tag_en": "Old Bridge & Emerald River",
        "hasDeal": false
      },
      {
        "name_ar": "بيهاتش",
        "name_en": "Bihac",
        "tag_ar": "شلالات أونا والطبيعة العذراء",
        "tag_en": "Una River Waterfalls",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "ge",
    "flag": "🇬🇪",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "جورجيا",
    "name_en": "Georgia",
    "cities": [
      {
        "name_ar": "تبليسي",
        "name_en": "Tbilisi",
        "tag_ar": "ينابيع كبريتية وتلفريك المدينة",
        "tag_en": "Old Sulphur Baths & Forts",
        "hasDeal": false
      },
      {
        "name_ar": "باتومي",
        "name_en": "Batumi",
        "tag_ar": "شواطئ البحر الأسود وأبراج عصرية",
        "tag_en": "Black Sea Boulevard & Towers",
        "hasDeal": false
      },
      {
        "name_ar": "غوداوري",
        "name_en": "Gudauri",
        "tag_ar": "تزلج وجبال القوقاز الكبرى",
        "tag_en": "Caucasus Ski Slopes & Chalets",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "az",
    "flag": "🇦🇿",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "أذربيجان",
    "name_en": "Azerbaijan",
    "cities": [
      {
        "name_ar": "باكو",
        "name_en": "Baku",
        "tag_ar": "أبراج اللهب وبحر قزوين",
        "tag_en": "Flame Towers & Caspian Boulevard",
        "hasDeal": false
      },
      {
        "name_ar": "قبالة",
        "name_en": "Gabala",
        "tag_ar": "شلالات وبحيرات وتلفريك",
        "tag_en": "Cable Cars, Lakes & Pine Forests",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "mv",
    "flag": "🇲🇻",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "جزر المالديف",
    "name_en": "Maldives",
    "cities": [
      {
        "name_ar": "با أتول",
        "name_en": "Baa Atoll",
        "tag_ar": "محمية حيوية وفيلات مائية",
        "tag_en": "Biosphere Luxury Water Villas",
        "hasDeal": true,
        "dealKey": "maldives"
      },
      {
        "name_ar": "شمال ماليه أتول",
        "name_en": "North Male Atoll",
        "tag_ar": "قوارب سريعة ومنتجعات خاصة",
        "tag_en": "Speedboat Islands & Reefs",
        "hasDeal": true
      },
      {
        "name_ar": "آري أتول",
        "name_en": "Ari Atoll",
        "tag_ar": "غوص مع أسماك القرش النادرة",
        "tag_en": "Elite Diving & Marine Sanctuaries",
        "hasDeal": false
      },
      {
        "name_ar": "دالو أتول",
        "name_en": "Dhaalu Atoll",
        "tag_ar": "منتجعات عائلية وفخامة هادئة",
        "tag_en": "Private Island Seclusion",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "th",
    "flag": "🇹🇭",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "تايلاند",
    "name_en": "Thailand",
    "cities": [
      {
        "name_ar": "بوكيت",
        "name_en": "Phuket",
        "tag_ar": "فيلات جبلية تطل على البحر",
        "tag_en": "Cliff Villas & Patong Escapes",
        "hasDeal": true
      },
      {
        "name_ar": "بانكوك",
        "name_en": "Bangkok",
        "tag_ar": "تسوق فاخر وفنادق نهرية",
        "tag_en": "Luxury Riverfront & Malls",
        "hasDeal": true
      },
      {
        "name_ar": "كوه ساموي",
        "name_en": "Koh Samui",
        "tag_ar": "منتجعات استجمام وسبا نخبة",
        "tag_en": "Secluded Spas & White Sands",
        "hasDeal": false
      },
      {
        "name_ar": "كرابي",
        "name_en": "Krabi",
        "tag_ar": "صخور كارستية وشواطئ منعزلة",
        "tag_en": "Karst Cliffs & Railay Bay",
        "hasDeal": false
      },
      {
        "name_ar": "شيانغ ماي",
        "name_en": "Chiang Mai",
        "tag_ar": "جبال خضراء ومحميات أفيال",
        "tag_en": "Mountain Temples & Mist",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "jp",
    "flag": "🇯🇵",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "اليابان",
    "name_en": "Japan",
    "cities": [
      {
        "name_ar": "طوكيو",
        "name_en": "Tokyo",
        "tag_ar": "أبراج شينجوكو وثقافة المستقبل",
        "tag_en": "Skyline Suites & Futuristic Vibe",
        "hasDeal": true
      },
      {
        "name_ar": "كيوتو",
        "name_en": "Kyoto",
        "tag_ar": "غابات خيزران ونزل تقليدية",
        "tag_en": "Ryokan Inns & Bamboo Groves",
        "hasDeal": false
      },
      {
        "name_ar": "أوساكا",
        "name_en": "Osaka",
        "tag_ar": "عاصمة الطهي والترامواي العصري",
        "tag_en": "Gastronomy & Vibrant Nights",
        "hasDeal": false
      },
      {
        "name_ar": "سابورو",
        "name_en": "Sapporo",
        "tag_ar": "مهرجانات الثلج وتزلج هوكايدو",
        "tag_en": "Snow Slopes & Hot Springs",
        "hasDeal": false
      },
      {
        "name_ar": "هاكوني",
        "name_en": "Hakone",
        "tag_ar": "إطلالات جبل فوجي والينابيع",
        "tag_en": "Mount Fuji Views & Onsens",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "my",
    "flag": "🇲🇾",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "ماليزيا",
    "name_en": "Malaysia",
    "cities": [
      {
        "name_ar": "كوالالمبور",
        "name_en": "Kuala Lumpur",
        "tag_ar": "برجا بتروناس وتسوق",
        "tag_en": "Petronas Twin Towers & Luxury",
        "hasDeal": false
      },
      {
        "name_ar": "لانكاوي",
        "name_en": "Langkawi",
        "tag_ar": "جزر عذراء وتلفريك السماء",
        "tag_en": "Sky Bridge & Rainforests",
        "hasDeal": false
      },
      {
        "name_ar": "بينانغ",
        "name_en": "Penang",
        "tag_ar": "تراث عالمي ومأكولات شهيرة",
        "tag_en": "Heritage Mansions & Cuisine",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "id",
    "flag": "🇮🇩",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "إندونيسيا",
    "name_en": "Indonesia",
    "cities": [
      {
        "name_ar": "بالي",
        "name_en": "Bali",
        "tag_ar": "فيلات مسابح خاصة وأوبود",
        "tag_en": "Private Pool Villas & Ubud",
        "hasDeal": true
      },
      {
        "name_ar": "لومبوك",
        "name_en": "Lombok",
        "tag_ar": "شواطئ هادئة وجزر جيلي",
        "tag_en": "Pristine Beaches & Coral Atolls",
        "hasDeal": false
      },
      {
        "name_ar": "جاكرتا",
        "name_en": "Jakarta",
        "tag_ar": "عاصمة حيوية وفنادق خمس نجوم",
        "tag_en": "Megacity High-End Hotels",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "sg",
    "flag": "🇸🇬",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "سنغافورة",
    "name_en": "Singapore",
    "cities": [
      {
        "name_ar": "مارينا باي",
        "name_en": "Marina Bay",
        "tag_ar": "حدائق الخليج ومسابح معلقة",
        "tag_en": "Gardens by the Bay & Infinity Pools",
        "hasDeal": false
      },
      {
        "name_ar": "جزيرة سنتوسا",
        "name_en": "Sentosa Island",
        "tag_ar": "شواطئ ومنتجعات ترفيهية",
        "tag_en": "Island Resorts & Theme Parks",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "kr",
    "flag": "🇰🇷",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "كوريا الجنوبية",
    "name_en": "South Korea",
    "cities": [
      {
        "name_ar": "سيول",
        "name_en": "Seoul",
        "tag_ar": "أبراج غانغنام وقصور جوسون",
        "tag_en": "Gangnam Skyline & Palaces",
        "hasDeal": false
      },
      {
        "name_ar": "جزيرة جيجو",
        "name_en": "Jeju Island",
        "tag_ar": "شلالات بركانية وشواطئ عذراء",
        "tag_en": "Volcanic Waterfalls & Coast",
        "hasDeal": false
      },
      {
        "name_ar": "بوسان",
        "name_en": "Busan",
        "tag_ar": "شاطئ هايونداي ومأكولات بحرية",
        "tag_en": "Haeundae Beach & Coastal Life",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "lk",
    "flag": "🇱🇰",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "سريلانكا",
    "name_en": "Sri Lanka",
    "cities": [
      {
        "name_ar": "كاندي",
        "name_en": "Kandy",
        "tag_ar": "مزارع الشاي والبحيرات الخضراء",
        "tag_en": "Tea Estates & Sacred Hills",
        "hasDeal": false
      },
      {
        "name_ar": "إيلا",
        "name_en": "Ella",
        "tag_ar": "قطار الجبال وجسر الأقواس التسعة",
        "tag_en": "Mountain Train & Cloud Forests",
        "hasDeal": false
      },
      {
        "name_ar": "بينتوتا",
        "name_en": "Bentota",
        "tag_ar": "منتجعات شاطئية وأنهار هادئة",
        "tag_en": "Golden Coast Resorts & Lagoons",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "au",
    "flag": "🇦🇺",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "أستراليا",
    "name_en": "Australia",
    "cities": [
      {
        "name_ar": "سيدني",
        "name_en": "Sydney",
        "tag_ar": "دار الأوبرا وجسر الميناء الشهير",
        "tag_en": "Opera House & Harbor Cruises",
        "hasDeal": false
      },
      {
        "name_ar": "ملبورن",
        "name_en": "Melbourne",
        "tag_ar": "مقاهي عالمية وطريق المحيط العظيم",
        "tag_en": "Great Ocean Road & Arts Hub",
        "hasDeal": false
      },
      {
        "name_ar": "جولد كوست",
        "name_en": "Gold Coast",
        "tag_ar": "شواطئ ركوب الأمواج والمتنزهات",
        "tag_en": "Surfers Paradise & Escapes",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "nz",
    "flag": "🇳🇿",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "نيوزيلندا",
    "name_en": "New Zealand",
    "cities": [
      {
        "name_ar": "كوينزتاون",
        "name_en": "Queenstown",
        "tag_ar": "عاصمة المغامرات وبحيرة واكاتيبو",
        "tag_en": "Adventure Capital & Glaciers",
        "hasDeal": false
      },
      {
        "name_ar": "أوكلاند",
        "name_en": "Auckland",
        "tag_ar": "مدينة الشراع والموانئ المزدانة",
        "tag_en": "City of Sails & Islands",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "us",
    "flag": "🇺🇸",
    "region": "americas",
    "region_ar": "الأمريكتين",
    "region_en": "The Americas",
    "name_ar": "الولايات المتحدة الأمريكية",
    "name_en": "United States",
    "cities": [
      {
        "name_ar": "نيويورك",
        "name_en": "New York",
        "tag_ar": "مانهاتن ومسارح برودواي",
        "tag_en": "Manhattan Skylines & Central Park",
        "hasDeal": false
      },
      {
        "name_ar": "ميامي",
        "name_en": "Miami",
        "tag_ar": "شواطئ ساوث بيتش ويخوت",
        "tag_en": "South Beach & Waterfront Mansions",
        "hasDeal": false
      },
      {
        "name_ar": "لوس أنجلوس",
        "name_en": "Los Angeles",
        "tag_ar": "بيفرلي هيلز وهوليوود",
        "tag_en": "Beverly Hills & Coastlines",
        "hasDeal": false
      },
      {
        "name_ar": "أورلاندو",
        "name_en": "Orlando",
        "tag_ar": "منتجعات فاخرة ومدن ملاهي كبرى",
        "tag_en": "World Theme Parks & Golf Resorts",
        "hasDeal": false
      },
      {
        "name_ar": "هاواي",
        "name_en": "Hawaii",
        "tag_ar": "جزر بركانية وشواطئ ورمال ذهبية",
        "tag_en": "Tropical Islands & Surf Escapes",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "ca",
    "flag": "🇨🇦",
    "region": "americas",
    "region_ar": "الأمريكتين",
    "region_en": "The Americas",
    "name_ar": "كندا",
    "name_en": "Canada",
    "cities": [
      {
        "name_ar": "منتزه بانف",
        "name_en": "Banff",
        "tag_ar": "جبال الروكي الكندية وبحيرة لويز",
        "tag_en": "Lake Louise & Rocky Mountains",
        "hasDeal": false
      },
      {
        "name_ar": "فانكوفر",
        "name_en": "Vancouver",
        "tag_ar": "جبال تلتقي بالمحيط الهادئ",
        "tag_en": "Coastal Rainforest & City Escapes",
        "hasDeal": false
      },
      {
        "name_ar": "تورونتو",
        "name_en": "Toronto",
        "tag_ar": "برج سي إن وشلالات نياجرا",
        "tag_en": "CN Tower & Niagara Falls Gateway",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "mx",
    "flag": "🇲🇽",
    "region": "americas",
    "region_ar": "الأمريكتين",
    "region_en": "The Americas",
    "name_ar": "المكسيك",
    "name_en": "Mexico",
    "cities": [
      {
        "name_ar": "كانكون",
        "name_en": "Cancun",
        "tag_ar": "ريفييرا مايا ومنتجعات شاملة",
        "tag_en": "Riviera Maya All-Inclusive",
        "hasDeal": false
      },
      {
        "name_ar": "تولوم",
        "name_en": "Tulum",
        "tag_ar": "منتجعات صديقة للبيئة وآثار مايا",
        "tag_en": "Boho Eco-Resorts & Mayan Ruins",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "br",
    "flag": "🇧🇷",
    "region": "americas",
    "region_ar": "الأمريكتين",
    "region_en": "The Americas",
    "name_ar": "البرازيل",
    "name_en": "Brazil",
    "cities": [
      {
        "name_ar": "ريو دي جانيرو",
        "name_en": "Rio de Janeiro",
        "tag_ar": "شاطئ كوباكابانا وجبل السكر",
        "tag_en": "Copacabana & Sugarloaf Views",
        "hasDeal": false
      },
      {
        "name_ar": "شلالات إيغواسو",
        "name_en": "Iguazu Falls",
        "tag_ar": "أضخم شلالات طبيعية في العالم",
        "tag_en": "Magnificent Natural Waterfalls",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "sc",
    "flag": "🇸🇨",
    "region": "africa",
    "region_ar": "أفريقيا والمحيط الهندي",
    "region_en": "Africa & Islands",
    "name_ar": "سيشل",
    "name_en": "Seychelles",
    "cities": [
      {
        "name_ar": "جزيرة ماهيه",
        "name_en": "Mahe Island",
        "tag_ar": "منتجعات فاخرة وشواطئ غرانيتية",
        "tag_en": "Granite Shores & 5-Star Villas",
        "hasDeal": false
      },
      {
        "name_ar": "براسلين",
        "name_en": "Praslin",
        "tag_ar": "غابات النخيل النادرة وشواطئ عذراء",
        "tag_en": "Coco de Mer & Anse Lazio",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "mu",
    "flag": "🇲🇺",
    "region": "africa",
    "region_ar": "أفريقيا والمحيط الهندي",
    "region_en": "Africa & Islands",
    "name_ar": "موريشيوس",
    "name_en": "Mauritius",
    "cities": [
      {
        "name_ar": "لو مورن",
        "name_en": "Le Morne",
        "tag_ar": "شلال تحت الماء وبحيرات فيروزية",
        "tag_en": "Underwater Waterfall & Lagoons",
        "hasDeal": false
      },
      {
        "name_ar": "بيل مار",
        "name_en": "Belle Mare",
        "tag_ar": "شواطئ بيضاء ممتدة وملاعب جولف",
        "tag_en": "White Sands & Luxury Golf",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "za",
    "flag": "🇿🇦",
    "region": "africa",
    "region_ar": "أفريقيا والمحيط الهندي",
    "region_en": "Africa & Islands",
    "name_ar": "جنوب أفريقيا",
    "name_en": "South Africa",
    "cities": [
      {
        "name_ar": "كيب تاون",
        "name_en": "Cape Town",
        "tag_ar": "جبل الطاولة وساحل المحيطين",
        "tag_en": "Table Mountain & Atlantic Views",
        "hasDeal": false
      },
      {
        "name_ar": "منتزه كروغر الوطني",
        "name_en": "Kruger National Park",
        "tag_ar": "سفاري الحيوانات الخمس الكبرى",
        "tag_en": "Big Five Safari Lodges",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "tz",
    "flag": "🇹🇿",
    "region": "africa",
    "region_ar": "أفريقيا والمحيط الهندي",
    "region_en": "Africa & Islands",
    "name_ar": "تنزانيا",
    "name_en": "Tanzania",
    "cities": [
      {
        "name_ar": "زنجبار",
        "name_en": "Zanzibar",
        "tag_ar": "مدينة حجرية وتوابل وشواطئ بيضاء",
        "tag_en": "Stone Town & Turquoise Beaches",
        "hasDeal": false
      },
      {
        "name_ar": "سيرينغيتي",
        "name_en": "Serengeti",
        "tag_ar": "أعظم هجرة سنوية للحيوانات",
        "tag_en": "Great Migration Luxury Tented Camps",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "ke",
    "flag": "🇰🇪",
    "region": "africa",
    "region_ar": "أفريقيا والمحيط الهندي",
    "region_en": "Africa & Islands",
    "name_ar": "كينيا",
    "name_en": "Kenya",
    "cities": [
      {
        "name_ar": "ماساي مارا",
        "name_en": "Masai Mara",
        "tag_ar": "مخيمات سفاري وبطولات الحياة البرية",
        "tag_en": "World Wildlife Safari Camps",
        "hasDeal": false
      },
      {
        "name_ar": "نيروبي",
        "name_en": "Nairobi",
        "tag_ar": "فندق الزرافات الشهير والمحميات",
        "tag_en": "Giraffe Manor & City Park",
        "hasDeal": false
      }
    ]
  },
  {
    "id": "me",
    "flag": "🇲🇪",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "الجبل الأسود",
    "name_en": "Montenegro",
    "cities": [
      {
        "name_ar": "كوتور وبودفا",
        "name_en": "Kotor & Budva",
        "tag_ar": "مضائق بحرية وفنادق حجرية تاريخية",
        "tag_en": "Adriatic Fjord & Stone Towns",
        "hasDeal": true,
        "isTrending": true
      }
    ]
  },
  {
    "id": "al",
    "flag": "🇦🇱",
    "region": "europe",
    "region_ar": "أوروبا",
    "region_en": "Europe",
    "name_ar": "ألبانيا",
    "name_en": "Albania",
    "cities": [
      {
        "name_ar": "كساميل وساراندا",
        "name_en": "Ksamil & Sarandë",
        "tag_ar": "مالديف أوروبا وشواطئ فيروزية صاعدة",
        "tag_en": "Ionian Pearl & Turquoise Coves",
        "hasDeal": false,
        "isTrending": true
      }
    ]
  },
  {
    "id": "vn",
    "flag": "🇻🇳",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "فيتنام",
    "name_en": "Vietnam",
    "cities": [
      {
        "name_ar": "جزيرة فو كوك",
        "name_en": "Phu Quoc Island",
        "tag_ar": "منتجعات فاخرة وتلفريك بحري قياسي",
        "tag_en": "Tropical Island & Cable Car",
        "hasDeal": true,
        "isTrending": true
      },
      {
        "name_ar": "دانانغ وهانوي",
        "name_en": "Da Nang & Hanoi",
        "tag_ar": "جسر الأيدي الذهبي وتاريخ",
        "tag_en": "Golden Bridge & Culture",
        "hasDeal": false,
        "isTrending": false
      }
    ]
  },
  {
    "id": "uz",
    "flag": "🇺🇿",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "أوزبكستان",
    "name_en": "Uzbekistan",
    "cities": [
      {
        "name_ar": "سمرقند وطشقند",
        "name_en": "Samarkand & Tashkent",
        "tag_ar": "طريق الحرير وقباب فيروزية تاريخية",
        "tag_en": "Silk Road Wonders & Registan",
        "hasDeal": false,
        "isTrending": true
      }
    ]
  },
  {
    "id": "kz",
    "flag": "🇰🇿",
    "region": "asia",
    "region_ar": "آسيا والمحيط الهادئ",
    "region_en": "Asia & Pacific",
    "name_ar": "كازاخستان",
    "name_en": "Kazakhstan",
    "cities": [
      {
        "name_ar": "ألماتي ومنتجع شيمبولاك",
        "name_en": "Almaty & Shymbulak",
        "tag_ar": "جبال تيان شان وتزلج وبحيرات كولساي",
        "tag_en": "Tian Shan Peaks & Ski Resort",
        "hasDeal": false,
        "isTrending": true
      }
    ]
  }
];

let selectedDestinationFilter = null;
let currentRegionFilter = "all";

const dealsData = {
  alula: {
    title_ar: "منتجع الوادي الصخري الفاخر (فيلا بحوض سباحة خاص)",
    title_en: "Rock Valley Luxury Resort (Private Pool Villa)",
    location_ar: "العلا، المملكة العربية السعودية",
    location_en: "AlUla, Saudi Arabia",
    image: "assets/hero_alula.jpg",
    originalPriceSAR: 3450,
    dealPriceSAR: 1080,
    priceUnitAr: " / ليلة",
    priceUnitEn: " / night",
    discountPct: 68,
    originalPrice_ar: "3,450 ريال",
    originalPrice_en: "3,450 SAR",
    dealPrice_ar: "1,080 ريال / ليلة",
    dealPrice_en: "1,080 SAR / night",
    savings_ar: "وفر 2,370 ريال (68%)",
    savings_en: "Save 2,370 SAR (68%)",
    statusBadge_ar: "⚠️ خطأ تسعيري مؤكد (Glitch Fare)",
    statusBadge_en: "⚠️ Verified Glitch Fare",
    dates_ar: "متاح لتواريخ متفرقة بين 15 أكتوبر و 28 نوفمبر 2026",
    dates_en: "Available selected dates between Oct 15 - Nov 28, 2026",
    glitchReason_ar: "سبب الخصم: خطأ في إعدادات سعر الصرف على موقع حجز معتمد (Expedia Partner) أدى إلى تسعير الفلل الفاخرة بسعر الغرف القياسية العادية.",
    glitchReason_en: "Discount Reason: Currency exchange glitch on an OTA booking partner priced ultra-luxury pool villas at standard single room rates.",
    bookingAdvice_ar: [
      "احجز فوراً بالبطاقة الائتمانية ليتم إصدار رقم التأكيد والحجز التلقائي.",
      "لا تتصل بالفندق قبل موعد رحلتك لتسأل عن السعر؛ دع الحجز يسري في النظام الآلي بدون لفت الانتباه.",
      "الحجز يشمل الإفطار وضريبة القيمة المضافة وإمكانية الإلغاء المجاني حتى 48 ساعة قبل الموعد."
    ],
    bookingAdvice_en: [
      "Book immediately with credit card to trigger instant automated booking confirmation.",
      "Do not call the hotel asking about the rate; let it process quietly through the global reservation system.",
      "Rate includes breakfast, VAT, and free cancellation up to 48 hours prior to check-in."
    ],
    specs_ar: {
      duration: "ليلتين",
      level: "5 نجوم VIP",
      seats: "3 فلل متبقية"
    },
    specs_en: {
      duration: "2 Nights",
      level: "5-Star VIP",
      seats: "3 Villas Left"
    },
    desc_ar: "إقامة فاخرة 5 نجوم بين جبال العلا التاريخية مع مسبح خاص ووجبة إفطار مجانية وعشاء فاخر.",
    desc_en: "Exclusive 5-star desert sanctuary in historic AlUla featuring private pool, complimentary gourmet breakfast, and scenic canyon vistas.",
    provider_ar: "Booking.com الشريك الفندقي المعتمد",
    provider_en: "Booking.com Official Hotel Partner",
    directLink: "https://www.booking.com/searchresults.html?ss=AlUla%2C+Saudi+Arabia"
  },
  maldives: {
    title_ar: "فيلا فوق الماء بمنتجع كريستال بارادايس (Overwater Villa)",
    title_en: "Crystal Paradise Resort Overwater Villa",
    location_ar: "جزر المالديف (أتول با)",
    location_en: "Baa Atoll, Maldives",
    image: "assets/maldives_resort.jpg",
    originalPriceSAR: 7100,
    dealPriceSAR: 3250,
    priceUnitAr: " / ليلة",
    priceUnitEn: " / night",
    discountPct: 55,
    originalPrice_ar: "7,100 ريال",
    originalPrice_en: "7,100 SAR",
    dealPrice_ar: "3,250 ريال / ليلة",
    dealPrice_en: "3,250 SAR / night",
    savings_ar: "وفر 3,850 ريال (55%)",
    savings_en: "Save 3,850 SAR (55%)",
    statusBadge_ar: "🔒 خصم سري حصري للأعضاء",
    statusBadge_en: "🔒 Exclusive Secret Member Deal",
    dates_ar: "متاح من نوفمبر 2026 حتى فبراير 2027 (موسم الذروة)",
    dates_en: "Available Nov 2026 to Feb 2027 (Peak Season)",
    glitchReason_ar: "سبب الخصم: عرض سري تم تسريبه من عقد شركات أوروبية مع المنتجع، متاح للحجز المباشر بالرابط السري وبدون رمز ترويجي.",
    glitchReason_en: "Discount Reason: Leaked European corporate negotiated rate, bookable directly via secret GDS link without promo code.",
    bookingAdvice_ar: [
      "يشمل العرض النقل المجاني بالطائرة المائية ذهاباً وعودة (توفير 1,800 ريال إضافي للشخص).",
      "يشمل وجبتي إفطار وعشاء يومياً في مطعم المنتجع العائم.",
      "تأكيد فوري عبر نظام GDS الفندقي المباشر."
    ],
    bookingAdvice_en: [
      "Includes complimentary return seaplane transfers (additional 1,800 SAR savings per guest).",
      "Includes daily half-board (breakfast & dinner) at the overwater lagoon restaurant.",
      "Instant confirmation issued directly via hotel GDS reservation engine."
    ],
    specs_ar: {
      duration: "4 ليالٍ",
      level: "شامل النقل بالطائرة",
      seats: "مجاني بالكامل"
    },
    specs_en: {
      duration: "4 Nights",
      level: "Seaplane Included",
      seats: "Free Cancellation"
    },
    desc_ar: "فيلا مائية متكاملة مع مسبح لا متناهي يطل على المياه الفيروزية، تشمل النقل بالطائرة المائية ووجبتين.",
    desc_en: "Signature overwater bungalow with infinity pool over turquoise lagoon, return seaplane transfers, and half-board dining included.",
    provider_ar: "Agoda / Booking فلاتر الجزر الفاخرة",
    provider_en: "Agoda / Booking Luxury Atolls",
    directLink: "https://www.booking.com/searchresults.html?ss=Baa+Atoll%2C+Maldives"
  },
  flight: {
    title_ar: "جناح طيران خاص على الدرجة الأولى والضيافة الملكية (RUH - LHR)",
    title_en: "Royal First Class Suite (RUH - LHR Roundtrip)",
    location_ar: "الرياض ← لندن (ذهاب وعودة)",
    location_en: "Riyadh ← London (Roundtrip)",
    image: "assets/luxury_flight.jpg",
    originalPriceSAR: 13200,
    dealPriceSAR: 3800,
    priceUnitAr: " للشخص",
    priceUnitEn: " / person",
    discountPct: 72,
    originalPrice_ar: "13,200 ريال",
    originalPrice_en: "13,200 SAR",
    dealPrice_ar: "3,800 ريال للشخص",
    dealPrice_en: "3,800 SAR / person",
    savings_ar: "وفر 9,400 ريال (72%)",
    savings_en: "Save 9,400 SAR (72%)",
    statusBadge_ar: "✈️ خطأ تسعير وقود وتذاكر (Fuel Dump Fare)",
    statusBadge_en: "✈️ Fuel Dump Glitch Fare",
    dates_ar: "مقاعد محدودة لشهر أكتوبر وديسمبر 2026",
    dates_en: "Limited seats for October & December 2026",
    glitchReason_ar: "سبب الخصم: خلل تقني أدى إلى حذف رسوم وقود الطيران (Fuel Surcharge) عند حجز التذكرة عبر محرك الحجز التابع لتحالف الطيران.",
    glitchReason_en: "Discount Reason: Airline alliance pricing glitch dropped international fuel surcharges (YQ/YR) on return legs.",
    bookingAdvice_ar: [
      "صدرت بالفعل عدة تذاكر لأعضائنا وتم إصدار التذاكر الإلكترونية (E-Tickets) بنجاح.",
      "المقاعد محدودة جداً (متبقي مقعدين فقط بهذا السعر).",
      "تشمل الدخول المجاني لصالة الفرسان وصالة الدرجة الأولى في مطار هيثرو."
    ],
    bookingAdvice_en: [
      "Several members already booked and e-tickets have been successfully issued.",
      "Extremely limited availability (only 2 seats remaining at this glitched fare).",
      "Includes complimentary First Class Lounge access in Riyadh and London Heathrow."
    ],
    specs_ar: {
      duration: "RUH - LHR",
      level: "First Suite",
      seats: "VIP Lounge مجاناً"
    },
    specs_en: {
      duration: "RUH - LHR",
      level: "First Suite",
      seats: "VIP Lounge Access"
    },
    desc_ar: "سرير منبسط كامل، شاشات عملاقة، قائمة طعام شيف، ودخول صالات كبار الشخصيات مع وزن مفتوح.",
    desc_en: "Fully enclosed private suite with lie-flat double bed, Michelin-inspired dining, fast-track security, and First Class lounge access.",
    provider_ar: "Google Flights / Skyscanner محرك الطيران المباشر",
    provider_en: "Google Flights / Skyscanner Live Aviation Engine",
    directLink: "https://www.google.com/travel/flights?q=flights%20from%20RUH%20to%20LHR"
  },
  switzerland: {
    title_ar: "منتجع ماترهورن الفاخر بإطلالة بانورامية على جبال الألب",
    title_en: "Matterhorn Alpine Luxury Chalet & Spa",
    location_ar: "زيرمات، سويسرا",
    location_en: "Zermatt, Switzerland",
    image: "assets/switzerland_hotel.jpg",
    originalPriceSAR: 5600,
    dealPriceSAR: 1950,
    priceUnitAr: " / ليلة",
    priceUnitEn: " / night",
    discountPct: 65,
    originalPrice_ar: "5,600 ريال",
    originalPrice_en: "5,600 SAR",
    dealPrice_ar: "1,950 ريال / ليلة",
    dealPrice_en: "1,950 SAR / night",
    savings_ar: "وفر 3,650 ريال (65%)",
    savings_en: "Save 3,650 SAR (65%)",
    statusBadge_ar: "🏔️ حسم جبلي استثنائي",
    statusBadge_en: "🏔️ Alpine Luxury Flash Offer",
    dates_ar: "متاح بين 10 نوفمبر و 20 ديسمبر 2026",
    dates_en: "Available Nov 10 - Dec 20, 2026",
    glitchReason_ar: "سبب الخصم: عرض إطلاق الجناح البانورامي الجديد تم تسعيره بالخطأ بسعر الغرف الكلاسيكية عبر نظام التوزيع السويسري.",
    glitchReason_en: "Discount Reason: Exclusive launch rate for new panoramic suites mapped incorrectly to classic standard rooms in Swiss GDS.",
    bookingAdvice_ar: [
      "يشمل تذكرة مجانية لقطار جورنيرات الجبلي طوال فترة الإقامة.",
      "الدخول غير المحدود للسبا الألبي الساخن والمسبح البانورامي الخارجي.",
      "إلغاء مجاني متاح حتى 7 أيام قبل موعد الوصول."
    ],
    bookingAdvice_en: [
      "Includes complimentary Gornergrat mountain rail pass during stay.",
      "Unlimited access to alpine thermal spa and heated outdoor pool.",
      "Free cancellation up to 7 days before check-in."
    ],
    specs_ar: {
      duration: "3 ليالٍ",
      level: "5 نجوم شاليه فاخر",
      seats: "جناحان متبقيان"
    },
    specs_en: {
      duration: "3 Nights",
      level: "5-Star Alpine Chalet",
      seats: "2 Suites Left"
    },
    desc_ar: "شاليه فاخر في قلب جبال الألب السويسرية مع إطلالة بانورامية ساحرة على قمة ماترهورن وحوض سبا ساخن.",
    desc_en: "Iconic alpine luxury chalet in Zermatt featuring panoramic Matterhorn vistas, heated outdoor spa, and fine dining.",
    provider_ar: "Booking.com شاليهات سويسرا المعتمدة",
    provider_en: "Booking.com Verified Swiss Chalets",
    directLink: "https://www.booking.com/searchresults.html?ss=Zermatt%2C+Switzerland"
  },
  paris: {
    title_ar: "قصر الشانزلزيه الباريسي مع شرفة خاصة مطلة على إيفل",
    title_en: "Champs-Élysées Palace with Private Eiffel View Balcony",
    location_ar: "باريس، فرنسا",
    location_en: "Paris, France",
    image: "assets/paris_palace.jpg",
    originalPriceSAR: 6800,
    dealPriceSAR: 2450,
    priceUnitAr: " / ليلة",
    priceUnitEn: " / night",
    discountPct: 64,
    originalPrice_ar: "6,800 ريال",
    originalPrice_en: "6,800 SAR",
    dealPrice_ar: "2,450 ريال / ليلة",
    dealPrice_en: "2,450 SAR / night",
    savings_ar: "وفر 4,350 ريال (64%)",
    savings_en: "Save 4,350 SAR (64%)",
    statusBadge_ar: "⚠️ خطأ في سعر الصرف (EUR/SAR Glitch)",
    statusBadge_en: "⚠️ Currency Rate Glitch (EUR/SAR)",
    dates_ar: "متاح لإقامات بين يناير ومارس 2027",
    dates_en: "Available for stays Jan - Mar 2027",
    glitchReason_ar: "سبب الخصم: خلل في تطبيق ضريبة المدينة وسعر صرف اليورو لدى وسيط الحجوزات خفّض سعر الأجنحة الرئاسية بأكثر من 64%.",
    glitchReason_en: "Discount Reason: Currency conversion and city tax deduction anomaly on French OTA wholesale channel.",
    bookingAdvice_ar: [
      "يشمل إفطاراً باريسياً فاخراً لشخصين مع خدمة الغرف اليومية.",
      "توصيل مجاني بسيارة مرسيدس S-Class من مطار شارل ديغول.",
      "الحجز مشمول بضمان السعر وحماية الرادار الفورية ضد التعديل."
    ],
    bookingAdvice_en: [
      "Includes gourmet Parisian breakfast for two with in-room service.",
      "Complimentary Mercedes S-Class airport transfer from CDG.",
      "Fully protected under Radar instant booking guarantee."
    ],
    specs_ar: {
      duration: "ليلتين",
      level: "قصر تاريخي 5 نجوم",
      seats: "شرفة إيفل VIP"
    },
    specs_en: {
      duration: "2 Nights",
      level: "5-Star Historic Palace",
      seats: "Eiffel VIP Balcony"
    },
    desc_ar: "أرقى قصور باريس بالقرب من قوس النصر، شرفة كلاسيكية خاصة بإطلالة مباشرة على برج إيفل مع خدمة كونسيرج خاصة.",
    desc_en: "Palatial Parisian landmark near the Arc de Triomphe, offering private balcony with direct Eiffel Tower views and bespoke concierge.",
    provider_ar: "Booking.com قصور وفنادق باريس الفاخرة",
    provider_en: "Booking.com Paris Luxury Palaces",
    directLink: "https://www.booking.com/searchresults.html?ss=Place+Vendome%2C+Paris%2C+France"
  },
  bali: {
    title_ar: "فيلا الغابات الاستوائية الخاصة بمسبح إنفينيتي معلق في أوبود",
    title_en: "Ubud Jungle Haven Private Infinity Pool Villa",
    location_ar: "بالي، إندونيسيا",
    location_en: "Bali, Indonesia",
    image: "assets/bali_resort.jpg",
    originalPriceSAR: 4200,
    dealPriceSAR: 1290,
    priceUnitAr: " / ليلة",
    priceUnitEn: " / night",
    discountPct: 69,
    originalPrice_ar: "4,200 ريال",
    originalPrice_en: "4,200 SAR",
    dealPrice_ar: "1,290 ريال / ليلة",
    dealPrice_en: "1,290 SAR / night",
    savings_ar: "وفر 2,910 ريال (69%)",
    savings_en: "Save 2,910 SAR (69%)",
    statusBadge_ar: "🌴 ملاذ استوائي حصري",
    statusBadge_en: "🌴 Exclusive Tropical Hideaway",
    dates_ar: "تواريخ مرنة من أكتوبر 2026 إلى مايو 2027",
    dates_en: "Flexible dates Oct 2026 - May 2027",
    glitchReason_ar: "سبب الخصم: تعاقد موسمي حصري عبر رادار السفر مع ملاك المنتجع لتنشيط حجوزات الفلل المعلقة.",
    glitchReason_en: "Discount Reason: Exclusive direct luxury allotment contract negotiated directly for private hanging pool villas.",
    bookingAdvice_ar: [
      "يشمل إفطاراً عائماً يومياً داخل المسبح الخاص (Floating Breakfast).",
      "جلسة مساج بالينيزي تقليدي مجانية لمدة 90 دقيقة لشخصين.",
      "خدمة المساعد الشخصي (Butler) على مدار 24 ساعة."
    ],
    bookingAdvice_en: [
      "Includes daily complimentary floating breakfast in your private pool.",
      "90-minute traditional Balinese spa therapy for two included.",
      "Dedicated 24/7 private butler service throughout the stay."
    ],
    specs_ar: {
      duration: "4 ليالٍ",
      level: "فيلا رئاسية خاصة",
      seats: "مسبح معلق خاص"
    },
    specs_en: {
      duration: "4 Nights",
      level: "Presidential Villa",
      seats: "Private Pool"
    },
    desc_ar: "فيلا مصممة من الخيزران والرخام وسط أدغال أوبود الخضراء مع مسبح إنفينيتي يطل على وادي النهر وسبا متكامل.",
    desc_en: "Serene bamboo & marble sanctuary nestled in Ubud's lush jungle with private infinity pool cantilevered over the river valley.",
    provider_ar: "Booking / Agoda فلل بالي الاستوائية المعتمدة",
    provider_en: "Booking / Agoda Verified Bali Luxury Villas",
    directLink: "https://www.booking.com/searchresults.html?ss=Ubud%2C+Bali%2C+Indonesia"
  },
  dubai: {
    title_ar: "فيلا شاطئية ملكية بنخلة جميرا مع إطلالة على أفق دبي",
    title_en: "Palm Jumeirah Royal Beachfront Villa",
    location_ar: "دبي، الإمارات العربية المتحدة",
    location_en: "Dubai, United Arab Emirates",
    image: "assets/dubai_resort.jpg",
    originalPriceSAR: 8900,
    dealPriceSAR: 3100,
    priceUnitAr: " / ليلة",
    priceUnitEn: " / night",
    discountPct: 65,
    originalPrice_ar: "8,900 ريال",
    originalPrice_en: "8,900 SAR",
    dealPrice_ar: "3,100 ريال / ليلة",
    dealPrice_en: "3,100 SAR / night",
    savings_ar: "وفر 5,800 ريال (65%)",
    savings_en: "Save 5,800 SAR (65%)",
    statusBadge_ar: "✨ ضيافة ملكية بنخلة جميرا",
    statusBadge_en: "✨ Ultra-Luxury Palm Stay",
    dates_ar: "متاح لعطلات نهاية الأسبوع حتى نهاية ديسمبر 2026",
    dates_en: "Available for weekends through late Dec 2026",
    glitchReason_ar: "سبب الخصم: خصم تسويقي خاص بأعضاء النخبة متاح للحجز المباشر عبر البوابة الشريكة قبل الطرح العام.",
    glitchReason_en: "Discount Reason: Private partner portal pre-release allotment at 65% below published hotel direct rates.",
    bookingAdvice_ar: [
      "شاطئ خاص بالكامل مع كابانا VIP مظللة.",
      "رصيد بقيمة 500 درهم للمطاعم والسبا داخل المنتجع.",
      "تسجيل وصول مبكر ومغادرة متأخرة حتى 4 عصراً مجاناً."
    ],
    bookingAdvice_en: [
      "Direct private beach access with reserved VIP shaded cabana.",
      "AED 500 dining & spa credit included per stay.",
      "Complimentary early check-in and late check-out until 4:00 PM."
    ],
    specs_ar: {
      duration: "ليلتين",
      level: "منتجع 5 نجوم بلس",
      seats: "شاطئ خاص"
    },
    specs_en: {
      duration: "2 Nights",
      level: "5-Star Ultra Luxury",
      seats: "Private Beach"
    },
    desc_ar: "فيلا شاطئية استثنائية بنخلة جميرا مع حديقة ومسبح خاصين، وإطلالة خلابة على أفق دبي والخليج العربي.",
    desc_en: "Ultra-prime beachfront mansion on Palm Jumeirah with private garden, pool, and uninterrupted Dubai skyline views.",
    provider_ar: "Booking.com منتجعات نخلة جميرا الفاخرة",
    provider_en: "Booking.com Palm Jumeirah Ultra Luxury",
    directLink: "https://www.booking.com/searchresults.html?ss=Palm+Jumeirah%2C+Dubai"
  },
  tokyo_flight: {
    title_ar: "جناح درجة رجال الأعمال الفاخر (سكاي سويت) إلى طوكيو",
    title_en: "Tokyo Sky Suite Business Class Experience (Direct)",
    location_ar: "الخليج ← طوكيو هانيدا (ذهاب وعودة)",
    location_en: "Gulf Hubs ← Tokyo Haneda (Roundtrip)",
    image: "assets/tokyo_flight.jpg",
    originalPriceSAR: 16500,
    dealPriceSAR: 4900,
    priceUnitAr: " للشخص",
    priceUnitEn: " / person",
    discountPct: 70,
    originalPrice_ar: "16,500 ريال",
    originalPrice_en: "16,500 SAR",
    dealPrice_ar: "4,900 ريال للشخص",
    dealPrice_en: "4,900 SAR / person",
    savings_ar: "وفر 11,600 ريال (70%)",
    savings_en: "Save 11,600 SAR (70%)",
    statusBadge_ar: "✈️ خطأ فئة تسعير رجال الأعمال (GDS Class Mismatch)",
    statusBadge_en: "✈️ GDS Fare Class Mismatch",
    dates_ar: "متاح لتواريخ محددة في نوفمبر 2026 وموسم الساكورا 2027",
    dates_en: "Selected dates Nov 2026 and Sakura Season 2027",
    glitchReason_ar: "سبب الخصم: تطابق خاطئ لرموز الفئات السعرية (Booking Class Code) أتاح أجنحة رجال الأعمال بسعر الدرجة السياحية.",
    glitchReason_en: "Discount Reason: Fare class code mismatch mapped fully-flat business sky suites to economy flex ticket inventory.",
    bookingAdvice_ar: [
      "سرير منبسط بالكامل 180 درجة مع وجبات شيف ياباني خاصة.",
      "وزن أمتعة مضاعف (قطعتان × 32 كجم) ودخول صالات الاستراحة العالمية.",
      "إمكانية تغيير التاريخ لمرة واحدة مجاناً دون رسوم تعديل."
    ],
    bookingAdvice_en: [
      "Lie-flat 180° luxury sky suite with Michelin-inspired Japanese dining.",
      "Double baggage allowance (2x 32kg) and premium lounge access.",
      "One-time date change permitted with zero airline change penalty."
    ],
    specs_ar: {
      duration: "DOH/DXB - HND",
      level: "Sky Suite Business",
      seats: "مقعدان متبقيان"
    },
    specs_en: {
      duration: "DOH/DXB - HND",
      level: "Sky Suite Business",
      seats: "2 Seats Left"
    },
    desc_ar: "جناح طيران خاص مغلق بالكامل، شاشة ترفيه 24 بوصة 4K، وقائمة طعام كايسيكي يابانية مع ضيافة استثنائية.",
    desc_en: "Fully enclosed business class sky suite featuring 24-inch 4K screen, authentic Kaiseki dining, and priority boarding.",
    provider_ar: "Google Flights / Skyscanner رادار مسارات طوكيو",
    provider_en: "Google Flights / Skyscanner Tokyo Flight Radar",
    directLink: "https://www.google.com/travel/flights?q=flights%20from%20DXB%20to%20HND"
  },
  redsea: {
    title_ar: "فيلا الأورب الكروية الفضية العائمة بمياه البحر الأحمر (جزيرة شيبارة)",
    title_en: "Sheybarah Island Futuristic Overwater Orb Villa",
    location_ar: "وجهة البحر الأحمر، المملكة العربية السعودية",
    location_en: "The Red Sea, Saudi Arabia",
    image: "assets/redsea_resort.jpg",
    originalPriceSAR: 9500,
    dealPriceSAR: 3600,
    priceUnitAr: " / ليلة",
    priceUnitEn: " / night",
    discountPct: 62,
    originalPrice_ar: "9,500 ريال",
    originalPrice_en: "9,500 SAR",
    dealPrice_ar: "3,600 ريال / ليلة",
    dealPrice_en: "3,600 SAR / night",
    savings_ar: "وفر 5,900 ريال (62%)",
    savings_en: "Save 5,900 SAR (62%)",
    statusBadge_ar: "⚠️ تسعير افتتاحي استثنائي غير معلن",
    statusBadge_en: "⚠️ Unannounced Grand Opening Error Rate",
    dates_ar: "متاح للحجز المسبق خلال شهري نوفمبر وديسمبر 2026",
    dates_en: "Advance booking valid Nov - Dec 2026",
    glitchReason_ar: "سبب الخصم: خطأ في جدول التسعير الافتتاحي للفلل الفضية العائمة بنظام الحجز المركزي مكّن من حجزها بسعر فيلات الشاطئ القياسية.",
    glitchReason_en: "Discount Reason: Opening rate matrix disparity mapped overwater mirror orbs to terrestrial base villas in central reservation system.",
    bookingAdvice_ar: [
      "تشمل الانتقالات باليخت الفاخر أو الطائرة المائية من مطار البحر الأحمر الدولي (RSI).",
      "تجربة غوص بيئية خاصة برفقة مرشد بحري معتمد.",
      "إلغاء واسترداد كامل حتى 14 يوماً قبل موعد الحجز."
    ],
    bookingAdvice_en: [
      "Includes luxury yacht or seaplane transfers from Red Sea Int. Airport (RSI).",
      "Private eco-diving experience with certified marine naturalist included.",
      "100% refundable cancellation up to 14 days before check-in date."
    ],
    specs_ar: {
      duration: "ليلتين",
      level: "أورب عائم فضي VIP",
      seats: "جزيرة شيبارة"
    },
    specs_en: {
      duration: "2 Nights",
      level: "Futuristic Orb Villa",
      seats: "Sheybarah Island"
    },
    desc_ar: "تحفة معمارية مستقبلية عاكسة تعوم فوق الشعب المرجانية الخلابة، طاقة شمسية 100%، وخصوصية مطلقة مع شرفة بحرية خاصة.",
    desc_en: "Futuristic stainless steel reflective orb floating over pristine coral reefs on Sheybarah Island, powered by 100% renewable energy.",
    provider_ar: "Booking.com منتجعات البحر الأحمر المعتمدة",
    provider_en: "Booking.com Red Sea Ultra Luxury",
    directLink: "https://www.booking.com/searchresults.html?ss=The+St+Regis+Red+Sea+Resort"
  }
};

// 3. Ticker Items (Bilingual)
const tickerItemsData = {
  ar: [
    "⚡ <strong>قبل 6 دقائق:</strong> خطأ تسعير منتجع المالديف بخصم 62%",
    "✈️ <strong>قبل 14 دقيقة:</strong> تذاكر درجة أولى لباريس بـ 2,400 ريال فقط",
    "🏰 <strong>قبل 29 دقيقة:</strong> فندق 5 نجوم في سويسرا بـ 680 ريال",
    "🏝️ <strong>قبل 45 دقيقة:</strong> فيلا شاطئية بالبحر الأحمر بخصم 55%",
    "⚡ <strong>قبل ساعة:</strong> منتجع صحراوي في العلا بـ 990 ريال بدلاً من 3,200 ريال"
  ],
  en: [
    "⚡ <strong>6 mins ago:</strong> Maldives Overwater Villa pricing error with 62% off",
    "✈️ <strong>14 mins ago:</strong> First Class Suite to Paris for only 2,400 SAR",
    "🏰 <strong>29 mins ago:</strong> 5-Star Swiss Alpine Hotel for 680 SAR / night",
    "🏝️ <strong>45 mins ago:</strong> Red Sea Beachfront Villa discounted by 55%",
    "⚡ <strong>1 hr ago:</strong> AlUla desert pool resort at 990 SAR instead of 3,200 SAR"
  ]
};

// 4. Comprehensive i18n Dictionary
const translations = {
  ar: {
    pageTitle: "رادار السفر والسياحة | صفقات الفنادق والرحلات السرية وأخطاء الأسعار",
    brandName: "رادار <span>السفر والسياحة</span>",
    brandSub: "راصد صفقات الفنادق والطيران",
    navDeals: "الصفقات النشطة",
    navHow: "كيف يعمل؟",
    navCalc: "حاسبة التوفير",
    navPricing: "باقات العضوية",
    navFaq: "الأسئلة الشائعة",
    navStatus: "12 صفقة مرصودة اليوم",
    navVipBtn: "انضم لنادي VIP 👑",
    langToggle: "English",
    navSearchBtn: "الوجهات 🔍",
    searchModalTag: "استكشف الوجهات السياحية",
    searchModalTitle: "الدول والمدن السياحية 🌍",
    searchModalSubtitle: "اختر وجهتك أو ابحث بالاسم لرؤية صفقات الفنادق وأخطاء الأسعار النشطة",
    regAll: "كافة الوجهات 🌍",
    regTrending: "✨ وجهات صاعدة وحديثة",
    regGulf: "الشرق الأوسط والخليج 🇸🇦",
    regEurope: "أوروبا 🇪🇺",
    regAsia: "آسيا والمحيط الهادئ 🏝️",
    regAmericas: "الأمريكتين 🌎",
    regAfrica: "أفريقيا والمحيط الهندي 🦁",
    searchPlaceholder: "ابحث عن دولة أو مدينة سياحية (العلا، باريس، دبي، المالديف)...",
    destDealsFound: "صفقة نشطة",
    destClearFilter: "عرض جميع الوجهات",

    currencyModalTag: "العملات الدولية",
    currencyModalTitle: "اختر عملة عرض الأسعار 💱",
    currencyModalSubtitle: "يتم تحويل وتحديث أسعار الصفقات وحاسبة التوفير وباقات العضوية فورياً بحسب عملتك",
    currencySearchPlaceholder: "ابحث باسم الدولة أو كود العملة (SAR, USD, درهم)...",
    
    // Hero
    heroBadge: "⚡ صفقات حصرية وأخطاء تسعير نادرة",
    heroTitle: "نصيد لك أخطاء الأسعار والصفقات الفاخرة.. <br /><span class='highlight'>ونرسلها لجوالك فوراً!</span>",
    heroDesc: "وفّر حتى 70% على إقامات الفنادق والمنتجعات الـ 5 نجوم وتذاكر الطيران، بدون وسيط وبكل سلاسة وسهولة. نوفر لك الرابط المباشر لتحجز وتوفّر آلاف الريالات.",
    heroPhonePlaceholder: "أدخل رقم جوالك لتصلك التنبيهات (05xxxxxxx)",
    heroJoinBtn: "فعّل تنبيهاتي",
    heroFootnotePrivacy: "🔒 خصوصية تامة وبدون إعلانات مزعجة",
    heroFootnoteFree: "⚡ تنبيهات مجانية عبر الواتساب",

    // WhatsApp Mockup
    waTitle: "رادار السفر والسياحة | VIP Alerts",
    waStatus: "متصل الآن • تنبيه فوري",
    waBadge: "⚠️ خطأ تسعيري عاجل (Glitch Fare)",
    waDealTitle: "منتجع فاخر في العلا (فيلا بحوض سباحة خاص)",
    waLocation: "📍 العلا، المملكة العربية السعودية",
    waDates: "📅 التواريخ المتاحة: أكتوبر ونوفمبر",
    waRegularPriceLabel: "السعر المعتاد: ",
    waGlitchedPriceLabel: "السعر الصدمة الآن: ",
    waPerNight: " / ليلة",
    waReason: "💡 سبب الخصم: خطأ تسعير بالعملة في منصة الحجز الدولية، ينتهي خلال ساعات بمجرد تعديله!",
    waBtn: "احجز الصفقة الآن قبل الإلغاء ⚡",
    waTime: "منذ 8 دقائق • تم التحقق ✓✓",

    // Ticker Label
    tickerLabel: "رادار حي",

    // Deals Section
    dealsTag: "رصد حصري ومحدث",
    dealsTitle: "الصفقات والفرص النشطة الآن ⚡",
    dealsSubtitle: "هذه الصفقات تم رصدها آلياً عبر خوارزميات الذكاء الاصطناعي. الأسعار قد ترتفع أو تنفد في أي لحظة، احجز مباشرة دون تردد.",
    filterAll: "جميع الصفقات",
    filterGlitch: "أخطاء تسعير ⚠️",
    filterHotels: "فنادق ومنتجعات 5★",
    filterFlights: "طيران ودرجات أولى ✈️",
    filterGulf: "الخليج والبحر الأحمر 🇸🇦",
    filterEurope: "أوروبا والعالم 🌍",
    dealsSearchPlaceholder: "ابحث فوراً في الصفقات (العلا، المالديف، باريس، سويسرا، طيران)...",
    showingDealsPrefix: "المعروض الآن:",
    dealsWord: "صفقة نشطة",
    viewGrid: "شبكي",
    viewList: "موجز",
    noDealsMatch: "لم نجد أي صفقات تطابق بحثك حالياً، جرب كلمة بحث أخرى أو اختر تصنيفاً عاماً.",
    viewDealBtn: "عرض تفاصيل الصفقة ورابط الحجز",
    dealLockedBadge: "حصري للمشتركين",
    dealUnlockBtn: "🔒 فتح الصفقة (للمشتركين فقط)",
    memberStatusLocked: "دخول المشتركين",
    memberStatusActive: "مشترك نشط ✓",
    subscriberGateTitle: "هذه العروض الحقيقية متاحة فقط للمتصفحين المشتركين",
    subscriberGateSub: "نظراً لمحدودية المقاعد وسرعة انتهاء أخطاء الأسعار (Glitch Fares)، نوفر روابط الحجز المباشرة وتفاصيل الصفقات الحقيقية فقط للمتصفحين المشتركين مجاناً.",
    gateSubmitBtn: "✨ تفعيل اشتراكي وفتح جميع الصفقات فوراً",
    gateAlreadyText: "هل أنت مشترك بالفعل؟ ",
    gateAlreadyBtn: "اضغط هنا لتأكيد اشتراكك وفتح الصفقات بنقرة واحدة",
    gatePerk1Title: "روابط الحجز المباشرة الفورية",
    gatePerk1Desc: "الوصول المباشر لكود ورابط الحجز الفعلي قبل تعديل أو إلغاء السعر.",
    gatePerk2Title: "أخطاء تسعير وفنادق 5 نجوم حصرية",
    gatePerk2Desc: "خصومات تصل إلى 70% على الطيران والمنتجعات الفاخرة لا تظهر للعامة.",
    gatePerk3Title: "تنبيهات فورية عبر الواتساب",
    gatePerk3Desc: "تصلك الصفقة في نفس ثانية رصدها لتلحق حجز المقعد قبل الآخرين.",
    countdownPrefix: "⏳ باقي تقريباً: ",

    // Calculator
    calcTag: "احسب أرباحك قبل الاشتراك",
    calcTitle: "كم ريال ستوفر في سفراتك القادمة؟ 💰",
    calcSubtitle: "حرّك المؤشرات بناءً على عادات سفرك لترى حجم التوفير الحقيقي الذي يحققه أعضاء رادار السفر والسياحة سنوياً.",
    calcTripsLabel: "عدد الرحلات أو الإجازات سنوياً:",
    calcBudgetLabel: "متوسط ميزانية الإقامة والرحلة الواحدة:",
    calcPrefLabel: "تفضيل الإقامة:",
    calcPrefValue: "فنادق ومنتجعات فاخرة (4-5 نجوم)",
    calcResultTitle: "إجمالي التوفير السنوي التقديري مع رادار السفر والسياحة",
    calcResultSub: "مقارنة بالحجز بالأسعار الرسمية المعتادة",
    calcCta: "اشترك الآن ووفر هذا المبلغ فوراً ⚡",

    // How it works
    howTag: "بكل سهولة وبدون أي تعقيد",
    howTitle: "كيف يعمل الموقع بدون أي اتفاقيات مع الفنادق؟",
    howSubtitle: "السر في قوة البرمجيات والذكاء الاصطناعي الذي يمسح الأسعار العامة بالمليون ويصطاد اللحظات التي تخطئ فيها الأنظمة.",
    step1Num: "1",
    step1Title: "الرصد الآلي الفوري",
    step1Desc: "أنظمتنا تراقب محركات الحجز العالمية والخطوط الجوية 24/7. بمجرد حدوث خطأ تسعير أو خصم سري مؤقت، يرصده الرادار خلال ثوانٍ.",
    step2Num: "2",
    step2Title: "تنبيه فوري على جوالك",
    step2Desc: "نرسل لك رسالة واتساب عاجلة تتضمن تفاصيل الفندق، السعر قبل وبعد، وشرح لسبب الصفقة مع التواريخ المناسبة.",
    step3Num: "3",
    step3Title: "حجز مباشر وتوفير فوري",
    step3Desc: "تضغط الرابط وتحجز مباشرة من موقع الحجز العام أو الموقع الرسمي بنفسك. بدون وسطاء، بدون اتصالات، وبدون أي وجع رأس.",

    // Pricing
    pricingTag: "استثمار يرجع لك من أول سفرة",
    pricingTitle: "اختر باقة العضوية المناسبة لك",
    pricingSubtitle: "يمكنك البدء مجاناً، أو الانضمام لنادي VIP لتكون أول من يقتنص أخطاء التسعير قبل أن تنتهي وتطير في دقائق.",
    freePlanName: "عضوية الباحث المجاني",
    freePlanDesc: "مناسبة لمن يسافر نادراً ويريد متابعة العروض العامة.",
    freePlanPrice: "0",
    freePlanPeriod: "ريال / مدى الحياة",
    freeFeature1: "تنبيه أسبوعي واحد بالعروض العامة",
    freeFeature2: "تنبيهات متأخرة 4 ساعات عن الأعضاء المميزين",
    freeFeature3: "استلام أخطاء التسعير العاجلة (تطير في ساعات)",
    freeFeature4: "تنبيهات الواتساب الفورية المباشرة",
    freeFeature5: "خدمة البحث المخصص لرحلتك الخاصة",
    freeBtn: "سجّل مجاناً الآن",

    vipBadge: "👑 الأكثر قيمة وتوفيراً",
    vipPlanName: "عضوية رادار السفر والسياحة VIP",
    vipPlanDesc: "لعشاق السفر والرفاهية الذين يريدون توفير آلاف الريالات بكل حجز.",
    vipPlanPrice: "24",
    vipPlanPeriod: "ريال / سنوياً (بدلاً من 249 ريال) 👑",
    vipFeature1: "تنبيهات فورية عبر الواتساب وتيليجرام بلحظة رصد الصفقة",
    vipFeature2: "وصول فوري لجميع أخطاء التسعير (Glitch Fares) النادرة",
    vipFeature3: "صفقات أجنحة الدرجة الأولى ودرجة الأعمال بأسعار السياحية",
    vipFeature4: "إرشادات وحيل الحجز المؤكد لضمان عدم إلغاء الفندق",
    vipFeature5: "ضمان استرجاع 100% إن لم توفر على الأقل 500 ريال بأول سفرة",
    vipBtn: "اشترك في باقة VIP بـ 149 ريال سنوياً ⚡",
    tierAnnualTitle: "الاشتراك السنوي 👑",
    tierAnnualDiscount: "وفّر 100 ريال (40% خصم)",
    tierAnnualBefore: "249 ريال",
    tierAnnualUnit: "ريال / سنوياً",
    tierMonthlyTitle: "الاشتراك الشهري ⚡",
    tierMonthlyDiscount: "وفّر 10 ريال (30% خصم)",
    tierMonthlyBefore: "34 ريال",
    tierMonthlyUnit: "ريال / شهرياً",
    navTerms: "شروط الاستخدام",
    termsModalTitle: "شروط وأحكام استخدام رادار السفر",
    termsModalSub: "اتفاقية الاستخدام والضمان لرصد صفقات وأخطاء أسعار الفنادق والطيران",
    termsAcceptBtn: "فهمت وموافق على الشروط ✓",
    socialWa: "واتساب",
    socialTk: "تيك توك",
    socialIg: "انستقرام",
    socialMail: "إيميل",
    mobileTheme: "المظهر",
    term1Title: "طبيعة المنصة وخدمة الرصد الآلي",
    term1Text: "رادار السفر منصة تقنية ذكية تقوم بمسح 85 محرك حجز عالمي ووكالة سفر وخطوط طيران لرصد الصفقات وأخطاء التسعير الاستثنائية وتقديمها للمسافر فور حدوثها دون أن تمثل وسيطاً مالياً أو وكالة بيع مباشرة.",
    term2Title: "صفقات أخطاء الأسعار (Glitch Fares)",
    term2Text: "أخطاء التسعير ناتجة عن خلل تقني مؤقت في أنظمة الفنادق أو شركات الطيران أو فروقات أسعار الصرف. توفر المنصة روابط الحجز المباشرة مع إرشادات وتكتيكات لتفادي الإلغاء وضمان ثبات الحجز.",
    term3Title: "اشتراكات النخبة VIP وضمان الـ 100%",
    term3Text: "تمنح اشتراكات VIP وصولاً فورياً للصفقات عبر الواتساب والإشعارات اللحظية. نوفر ضمان استرجاع 100% خلال 30 يوماً إن لم يوفر المشترك أضعاف قيمة اشتراكه من أول حجز فندقي أو طيران.",
    term4Title: "الحجز المباشر وإخلاء المسؤولية",
    term4Text: "تتم كافة عمليات الدفع وتأكيد الحجوزات وإصدار التذاكر على المواقع الرسمية لمزودي الخدمة (الفنادق وشركات الطيران ومحركات الحجز). تخضع الأسعار لتوافر المقاعد وأسبقية الحجز.",
    term5Title: "الخصوصية والاستخدام العادل",
    term5Text: "بيانات المشتركين وأرقام هواتفهم مشفرة ومحمية بأعلى معايير الأمان ولا تُشارك مع أي طرف ثالث. يحظر إعادة بيع أو استغلال روابط وتنبيهات الرادار تجارياً بدون ترخيص خطي مسبق.",

    // FAQ
    faqTag: "كل ما تحتاج معرفته",
    faqTitle: "الأسئلة الشائعة",
    faq1Q: "ما هو خطأ التسعير (Glitch Fare / Rate) وكيف يحدث؟",
    faq1A: "يحدث خطأ التسعير عندما يُدخل موظف التسعير في الفندق أو شركة الطيران أو منصات الحجز سعراً غير صحيح (مثلاً كتابة 100$ بدلاً من 1000$، أو خلل في احتساب أسعار صرف العملات الدولية). هذه الأخطاء تدوم عادة بين ساعتين إلى 24 ساعة فقط قبل أن يتم تصحيحها، ومن يحجز خلالها يفوز بالسعر المخفض قانونياً ومؤكداً.",
    faq2Q: "هل الفندق أو شركة الطيران تقبل الحجز إذا كان خطأ تسعير؟",
    faq2A: "في أكثر من 92% من الحالات، تلتزم الفنادق وشركات الحجز بالحجز وتمنحه للعميل حماية لسمعتها، أو لأن الحجز تم تأكيده وسحبه من البطاقة الائتمانية وصدر رقم التذكرة. وفي الحالات النادرة التي يُلغى فيها الحجز، يسترد العميل مبلغه كاملاً بدون أي غرامة.",
    faq3Q: "هل تتفقون مع الفنادق أو تأخذون منهم عمولة؟",
    faq3A: "أبداً! نحن لا نتفق ولا نتفاوض مع أي فندق، ولذلك فنحن مستقلون تماماً ونبحث فقط عن مصلحتك وتوفير أموالك. مهمتنا هي رصد الأسعار العامة بالتقنية، وأنت من يقوم بالحجز مباشرة عبر المواقع الرسمية برابط مباشر وسريع.",
    faq4Q: "كيف أستلم التنبيهات؟",
    faq4A: "بمجرد اشتراكك في باقة VIP، يتم ربط رقمك فوراً ببوت التنبيهات الفوري على تطبيق الواتساب أو تيليجرام لتصلك رسالة تحتوي على اسم الفندق، السعر الصدمة، والرابط المباشر بضغطة زر.",

    // Footer
    footerDesc: "المنصة الشاملة الأولى عربياً لرصد أخطاء التسعير والصفقات السرية للسياحة والضيافة وتذاكر الطيران، بدون وسطاء وبكل سهولة وموثوقية.",
    footerCol1Title: "أقسام المنصة",
    footerCol2Title: "أنواع الصفقات",
    footerCol3Title: "تواصل وقانوني",
    footerCopyright: "© 2026 رادار السفر والسياحة. جميع الحقوق محفوظة. المنصة الشاملة لرصد صفقات الفنادق وتذاكر الطيران والسياحة الفاخرة.",

    // Modal
    modalOriginalPrice: "السعر المعتاد:",
    modalGlitchTitle: "💡 تفاصيل الصفقة وسر السعر:",
    modalAdviceTitle: "📌 نصائح ورشاقة الحجز:",
    modalDirectBtn: "الانتقال لرابط الحجز المباشر بالخصم ⚡",
    vipModalTitle: "انضم لعضوية رادار السفر والسياحة VIP",
    vipModalSub: "لا تفوت صفقات أخطاء الأسعار التي توفر عليك آلاف الريالات. تنبيهات واتساب في نفس ثانية الرصد!",
    vipLabelName: "الاسم الكامل:",
    vipLabelPhone: "رقم الواتساب للتنبيهات:",
    vipLabelPlan: "نوع الاشتراك:",
    vipOptionMonthly: "الاشتراك الشهري: 24 ريال / شهرياً (بدلاً من 34 ريال) ⚡",
    vipOptionAnnual: "الاشتراك السنوي: 149 ريال / سنة (بدلاً من 249 ريال) 👑 الأكثر توفيراً",
    vipSubmitBtn: "تفعيل الاشتراك والبدء الفوري ⚡",
    vipGuarantee: "🛡️ ضمان استرجاع 100% لمدة 30 يوماً إن لم توفر أضعاف قيمة الاشتراك.",

    // Mobile Nav
    mobileHome: "الرئيسية",
    mobileDeals: "الصفقات",
    mobileCalc: "التوفير",
    mobileHow: "الآلية",
    mobileVip: "VIP",

    // Viral & Referral Program
    viralBadge: "مكافأة سفراء السفر",
    viralCardTitle: "برنامج سفراء رادار السفر 🚀",
    viralCardSubtitle: "ادعُ 3 من أصدقائك للحصول على شهر مجاني في نادي VIP!",
    viralReward: "شهر VIP مجاني",
    viralCodeLabel: "كود ورابط الإحالة الخاص بك:",
    viralCopyBtn: "نسخ الرابط",
    viralShareBtn: "مشاركة فورية عبر الواتساب مع أصدقائك 📲",
    viralProgressText: "المكتمل: {count} من 3 دعوات (متبقي {remaining})",
    viralGoalAchieved: "🎉 مبروك! حققت الهدف وحصلت على شهر VIP مجاني.",
    viralCopiedToast: "تم نسخ رابط الإحالة بنجاح!",

    // Admin HUD & CRM
    adminHudLink: "الإدارة و CRM",
    adminHudTitle: "لوحة تحكم رادار السفر (Admin HUD)",
    adminHudSubtitle: "إدارة المشتركين وقاعدة بيانات العملاء، الويب هوك، ومؤشرات الانتشار الفيروسي",
    adminExportCsv: "تصدير CSV 📊",
    adminKpiLeads: "إجمالي المشتركين",
    adminKpiVip: "مشتركو VIP",
    adminKpiViews: "مشاهدات الصفقات",
    adminKpiShares: "مشاركات الواتساب",
    adminWebhookLabel: "🔗 رابط الويب هوك (Make/Zapier):",
    adminSaveWebhook: "حفظ الرابط",
    adminTestWebhook: "إرسال تجربة",
    adminColName: "الاسم",
    adminColPhone: "الجوال / الواتساب",
    adminColTier: "الباقة",
    adminColRef: "كود الإحالة",
    adminColDate: "التاريخ"
  },
  
  en: {
    pageTitle: "Radar Travel | Secret Hotel Deals, Flights & Glitch Rates",
    brandName: "Radar <span>Travel & Tourism</span>",
    brandSub: "Glitch Fares & Luxury Deal Hunter",
    navDeals: "Live Deals",
    navHow: "How It Works",
    navCalc: "Savings Calculator",
    navPricing: "Membership",
    navFaq: "FAQ",
    navStatus: "12 Deals Tracked Today",
    navVipBtn: "Join VIP Club 👑",
    langToggle: "العربية",
    navSearchBtn: "Destinations 🔍",
    searchModalTag: "Explore Tourist Destinations",
    searchModalTitle: "Countries & Tourism Cities 🌍",
    searchModalSubtitle: "Select your destination or search by name to view active glitch fares and deals",
    regAll: "All Destinations 🌍",
    regTrending: "✨ Trending & New Hotspots",
    regGulf: "Middle East & GCC 🇸🇦",
    regEurope: "Europe 🇪🇺",
    regAsia: "Asia & Pacific 🏝️",
    regAmericas: "The Americas 🌎",
    regAfrica: "Africa & Islands 🦁",
    searchPlaceholder: "Search country or city (AlUla, Paris, Dubai, Maldives)...",
    destDealsFound: "Active Deal",
    destClearFilter: "View All Destinations",

    currencyModalTag: "Global Currencies",
    currencyModalTitle: "Select Display Currency 💱",
    currencyModalSubtitle: "Instant live conversion for deals, savings calculator, and memberships in your currency",
    currencySearchPlaceholder: "Search country name or currency code (SAR, USD, EUR)...",

    // Hero
    heroBadge: "⚡ Exclusive Deals & Rare Pricing Glitches",
    heroTitle: "We Catch Pricing Errors & Secret Luxury Deals.. <br /><span class='highlight'>Direct to Your Phone Instantly!</span>",
    heroDesc: "Save up to 70% on 5-star hotels, luxury resorts, and premium flights with zero middlemen. We provide direct links so you book directly and save thousands.",
    heroPhonePlaceholder: "Enter your phone number for alerts (e.g. +966...)",
    heroJoinBtn: "Activate My Alerts",
    heroFootnotePrivacy: "🔒 100% Privacy & Zero Spam",
    heroFootnoteFree: "⚡ Free WhatsApp Alerts",

    // WhatsApp Mockup
    waTitle: "Radar Travel | VIP Alerts",
    waStatus: "Online • Instant Alert",
    waBadge: "⚠️ Urgent Glitch Fare",
    waDealTitle: "Luxury AlUla Resort (Private Pool Villa)",
    waLocation: "📍 AlUla, Saudi Arabia",
    waDates: "📅 Available Dates: October & November",
    waRegularPriceLabel: "Regular Price: ",
    waGlitchedPriceLabel: "Glitched Price Now: ",
    waPerNight: " / night",
    waReason: "💡 Discount Reason: Currency exchange rate glitch on global OTA partner, priced villas at standard room rates. Valid for hours only!",
    waBtn: "Book Deal Now Before Price Patch ⚡",
    waTime: "8 mins ago • Verified ✓✓",

    // Ticker Label
    tickerLabel: "Live Radar",

    // Deals Section
    dealsTag: "Exclusive & Verified Tracking",
    dealsTitle: "Active Glitches & Secret Deals Now ⚡",
    dealsSubtitle: "These deals are automatically caught by AI algorithms. Rates can jump or sell out any minute—book directly without delay.",
    filterAll: "All Deals",
    filterGlitch: "Glitch Fares ⚠️",
    filterHotels: "5★ Hotels & Resorts",
    filterFlights: "Flight Deals ✈️",
    filterGulf: "Gulf & Red Sea 🇸🇦",
    filterEurope: "Europe & World 🌍",
    dealsSearchPlaceholder: "Instant live search (AlUla, Maldives, Paris, Swiss, Flight)...",
    showingDealsPrefix: "Showing:",
    dealsWord: "active deals",
    viewGrid: "Grid",
    viewList: "Compact",
    noDealsMatch: "No active deals matched your search, try another keyword or choose a broader category.",
    viewDealBtn: "View Deal Details & Booking Link",
    dealLockedBadge: "Members Only",
    dealUnlockBtn: "🔒 Unlock Deal (Members Only)",
    memberStatusLocked: "Members Login",
    memberStatusActive: "Active Member ✓",
    subscriberGateTitle: "These Real Deals Are Exclusive to Subscribed Members",
    subscriberGateSub: "Due to scarce airline seating and fast-expiring pricing errors (Glitch Fares), direct booking links and full instructions are unlocked exclusively for registered members.",
    gateSubmitBtn: "✨ Activate Free Membership & Unlock All Deals",
    gateAlreadyText: "Already a member? ",
    gateAlreadyBtn: "Click here to confirm membership & unlock immediately",
    gatePerk1Title: "Live Direct Booking Links",
    gatePerk1Desc: "Direct unmasked URLs and hidden promo codes before fares get patched.",
    gatePerk2Title: "Glitch Fares & 5-Star Hotel Drops",
    gatePerk2Desc: "Up to 70% off luxury stays and business class flights invisible to public search.",
    gatePerk3Title: "Instant WhatsApp Radar Alerts",
    gatePerk3Desc: "Flash notifications delivered the exact second of algorithm discovery.",
    countdownPrefix: "⏳ Time Remaining: ",

    // Calculator
    calcTag: "Calculate Your Return Before Joining",
    calcTitle: "How much will you save on your upcoming trips? 💰",
    calcSubtitle: "Adjust the sliders based on your travel habits to see the real savings unlocked by Radar Travel members each year.",
    calcTripsLabel: "Trips or holidays per year:",
    calcBudgetLabel: "Average accommodation & travel budget per trip:",
    calcPrefLabel: "Stay Preference:",
    calcPrefValue: "Luxury Hotels & 5-Star Resorts",
    calcResultTitle: "Estimated Annual Savings with Radar Travel",
    calcResultSub: "Compared to official public booking rates",
    calcCta: "Subscribe Now & Unlock These Savings ⚡",

    // How it works
    howTag: "Completely Simple & Seamless",
    howTitle: "How Does It Work Without Hotel Agreements?",
    howSubtitle: "The secret is software power & AI scanning millions of public hotel rates to seize the exact moments booking systems miscalculate.",
    step1Num: "1",
    step1Title: "Real-Time Automated Radar",
    step1Desc: "Our bots monitor global reservation engines & airlines 24/7. The moment an error or secret discount occurs, our radar catches it in seconds.",
    step2Num: "2",
    step2Title: "Instant Mobile Notification",
    step2Desc: "You receive an urgent WhatsApp message with full property details, before & after price, verified booking tips, and eligible dates.",
    step3Num: "3",
    step3Title: "Direct Booking & Big Savings",
    step3Desc: "Click the direct link and complete your booking directly on the official engine or verified OTA. No intermediaries, no hassle.",

    // Pricing
    pricingTag: "An Investment Repaid on Your First Trip",
    pricingTitle: "Choose Your Membership Tier",
    pricingSubtitle: "Start for free or upgrade to the VIP Club to be the first to book glitched fares before they expire in minutes.",
    freePlanName: "Free Explorer Membership",
    freePlanDesc: "Best for occasional travelers wanting broad public deals.",
    freePlanPrice: "0",
    freePlanPeriod: "SAR / Lifetime",
    freeFeature1: "1 Weekly digest of general travel discounts",
    freeFeature2: "Alerts delayed 4 hours behind VIP members",
    freeFeature3: "Access to instant glitch rates (patched in hours)",
    freeFeature4: "Instant direct WhatsApp alert delivery",
    freeFeature5: "Custom itinerary deal hunting assistance",
    freeBtn: "Sign Up Free Now",

    vipBadge: "👑 Most Popular & Maximum Value",
    vipPlanName: "Radar Travel VIP Membership",
    vipPlanDesc: "For savvy jet-setters looking to save thousands of riyals on every trip.",
    vipPlanPrice: "24",
    vipPlanPeriod: "SAR / year (Was 249 SAR) 👑",
    vipFeature1: "Instant WhatsApp & Telegram alerts within seconds of detection",
    vipFeature2: "Full, instant access to all rare glitch fares & error rates",
    vipFeature3: "First Class & Business suites at Economy price points",
    vipFeature4: "Tactical booking advice to guarantee hotel honouring",
    vipFeature5: "100% Money-back guarantee if you don't save at least 500 SAR on trip #1",
    vipBtn: "Join VIP for Only 149 SAR / year ⚡",
    tierAnnualTitle: "Annual VIP 👑",
    tierAnnualDiscount: "Save 100 SAR (40% OFF)",
    tierAnnualBefore: "249 SAR",
    tierAnnualUnit: "SAR / year",
    tierMonthlyTitle: "Monthly VIP ⚡",
    tierMonthlyDiscount: "Save 10 SAR (30% OFF)",
    tierMonthlyBefore: "34 SAR",
    tierMonthlyUnit: "SAR / month",
    navTerms: "Terms of Use",
    termsModalTitle: "Radar Travel Terms & Conditions",
    termsModalSub: "Service agreement & guarantee for hotel glitch fares and flights",
    termsAcceptBtn: "I Understand & Accept Terms ✓",
    socialWa: "WhatsApp",
    socialTk: "TikTok",
    socialIg: "Instagram",
    socialMail: "Email",
    mobileTheme: "Theme",
    term1Title: "Platform Overview & Automated Scanning",
    term1Text: "Radar Travel is an automated travel intelligence platform scanning 85 booking engines, airlines, and OTAs to detect secret promotional fares and pricing errors for travelers without serving as a broker or direct ticket seller.",
    term2Title: "Glitch Fares & Pricing Loopholes",
    term2Text: "Pricing glitches arise from temporary system anomalies or currency rate conversions in hotel and airline systems. The platform delivers instant direct booking links alongside proven tactical tips to minimize cancellations.",
    term3Title: "VIP Memberships & Money-Back Guarantee",
    term3Text: "VIP subscriptions grant real-time alerts via WhatsApp & push notifications. We provide a 30-day 100% money-back guarantee if members do not save multiples of their fee on their first bookings.",
    term4Title: "Direct Booking & Third-Party Liability",
    term4Text: "All payments, ticket issuances, and bookings take place directly on the official websites of hotels, airlines, and OTAs. Rates and reservations are strictly subject to third-party inventory.",
    term5Title: "Fair Use & Data Privacy",
    term5Text: "Subscriber mobile numbers and data are encrypted and never shared. Commercial re-selling, scraping, or syndicating Radar Travel alerts without prior written consent is strictly prohibited.",

    // FAQ
    faqTag: "Everything You Need to Know",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "What is a glitch fare / error rate and how does it happen?",
    faq1A: "A glitch rate occurs when hotel or airline pricing managers enter incorrect rates (e.g. typing $100 instead of $1,000, or a mismatch in international currency exchange conversions). These glitches typically last between 2 and 24 hours before being corrected. Those who book during that window lock in legally binding discounted reservations.",
    faq2Q: "Do hotels and airlines honour glitch fare bookings?",
    faq2A: "In over 92% of cases, hotels and booking providers honour the rate to protect their brand reputation, or because payment cleared and e-tickets/vouchers were automatically generated. In the rare event of cancellation, you always receive a 100% full refund with zero penalties.",
    faq3Q: "Do you make deals with hotels or take commissions?",
    faq3A: "Never! We do not partner with or take commissions from hotels. We are 100% independent and represent only our members' interests. We build autonomous tech to find public loopholes, and you book directly with official vendors.",
    faq4Q: "How do I receive instant alerts?",
    faq4A: "As soon as you join VIP, your number is linked to our automated alert bot on WhatsApp or Telegram to receive instant deal breakdowns with direct booking links.",

    // Footer
    footerDesc: "The premier luxury travel intelligence platform detecting pricing errors, secret promotional rates, and 5-star hotel glitches with direct booking links.",
    footerCol1Title: "Platform Sections",
    footerCol2Title: "Deal Categories",
    footerCol3Title: "Legal & Support",
    footerCopyright: "© 2026 Radar Travel & Tourism. All rights reserved. The premier platform for glitch fares and luxury stays.",

    // Modal
    modalOriginalPrice: "Regular Price:",
    modalGlitchTitle: "💡 Deal Secrets & Glitch Reason:",
    modalAdviceTitle: "📌 Tactical Booking Advice:",
    modalDirectBtn: "Proceed to Direct Discounted Booking ⚡",
    vipModalTitle: "Join Radar Travel VIP Club",
    vipModalSub: "Never miss a thousand-riyal pricing loophole again. Real-time WhatsApp alerts delivered seconds after detection!",
    vipLabelName: "Full Name:",
    vipLabelPhone: "WhatsApp Number for Alerts:",
    vipLabelPlan: "Membership Plan:",
    vipOptionMonthly: "Monthly VIP: 24 SAR / month (Was 34 SAR) ⚡",
    vipOptionAnnual: "Annual VIP: 149 SAR / year (Was 249 SAR) 👑 Best Value",
    vipSubmitBtn: "Activate VIP Membership & Start ⚡",
    vipGuarantee: "🛡️ 30-Day 100% Money-Back Guarantee if you don't save multiple times your fee.",

    // Mobile Nav
    mobileHome: "Home",
    mobileDeals: "Deals",
    mobileCalc: "Savings",
    mobileHow: "How It Works",
    mobileVip: "VIP",

    // Viral & Referral Program
    viralBadge: "Ambassador Rewards",
    viralCardTitle: "Radar Travel Ambassadors 🚀",
    viralCardSubtitle: "Invite 3 travel friends and receive 1 month of VIP Club membership for FREE!",
    viralReward: "1 Month VIP Free",
    viralCodeLabel: "Your Unique Referral Code & Link:",
    viralCopyBtn: "Copy Link",
    viralShareBtn: "Instant WhatsApp Share with Friends 📲",
    viralProgressText: "Completed: {count} of 3 invites ({remaining} remaining)",
    viralGoalAchieved: "🎉 Congrats! Referral goal reached - 1 Month VIP unlocked!",
    viralCopiedToast: "Referral link copied to clipboard!",

    // Admin HUD & CRM
    adminHudLink: "Admin HUD & CRM",
    adminHudTitle: "Radar Travel Admin HUD",
    adminHudSubtitle: "Subscriber intake CRM, viral loop analytics & exports",
    adminExportCsv: "Export CSV 📊",
    adminKpiLeads: "Total Leads",
    adminKpiVip: "VIP Members",
    adminKpiViews: "Deal Views",
    adminKpiShares: "WhatsApp Shares",
    adminWebhookLabel: "🔗 Webhook Endpoint (Make/Zapier):",
    adminSaveWebhook: "Save Webhook",
    adminTestWebhook: "Test Dispatch",
    adminColName: "Name",
    adminColPhone: "Phone / WhatsApp",
    adminColTier: "Plan",
    adminColRef: "Referral Code",
    adminColDate: "Date"
  }
};

// 5. Language Switcher & Localization Engine
function setLanguage(lang) {
  if (lang !== 'ar' && lang !== 'en') lang = 'ar';
  currentLang = lang;
  localStorage.setItem('radar_lang', lang);

  const isAr = (lang === 'ar');
  const t = translations[lang];

  // Document attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  document.title = t.pageTitle;

  // Update Language Toggle Button in Nav
  const langBtnText = document.getElementById('lang-btn-text');
  if (langBtnText) {
    langBtnText.textContent = t.langToggle;
  }
  const langBtnFlag = document.getElementById('lang-btn-flag');
  if (langBtnFlag) {
    langBtnFlag.textContent = isAr ? '🇬🇧' : '🇸🇦';
  }
  const mobileLangLabel = document.getElementById('mobile-lang-label');
  if (mobileLangLabel) {
    mobileLangLabel.textContent = isAr ? 'EN' : 'عربي';
  }

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Update all data-i18n-html elements
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  // Update all data-i18n-placeholder elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  // Render Ticker
  renderTicker();

  // Update Currency button
  updateCurrencyButton();

  // Update Subscriber UI button
  if (typeof updateSubscriberUI === 'function') {
    updateSubscriberUI();
  }

  // Render Deals Grid with current language
  renderDeals();

  // Recalculate Savings with localized currency
  calculateSavings();

  // Update VIP Membership Pricing
  updateMembershipPricing();

  // Update Live Clock & Real-time Date
  if (typeof updateLiveClock === 'function') {
    updateLiveClock();
  }

  // Dispatch custom event for any listeners
  try { if (typeof CustomEvent !== 'undefined' && window.dispatchEvent) { window.dispatchEvent(new CustomEvent('radarLanguageChanged', { detail: { lang } })); } } catch (e) {}
}

function toggleLanguage() {
  const newLang = currentLang === 'ar' ? 'en' : 'ar';
  setLanguage(newLang);
  
  const msg = newLang === 'en' 
    ? "Language switched to English 🇬🇧" 
    : "تم تحويل لغة الموقع إلى العربية 🇸🇦";
  showToast(msg, "🌐");
}

// Expose globally for WKWebView Swift integration
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;

// 6. Dynamic Deal Cards Rendering
function renderDeals() {
  const isAr = (currentLang === 'ar');
  const t = translations[currentLang];
  const grid = document.getElementById('deals-grid');
  if (!grid) return;

  const dealsList = [
    {
      key: 'alula',
      category: 'glitch hotels gulf',
      badgeClass: 'badge-glitch',
      badge: isAr ? dealsData.alula.statusBadge_ar : dealsData.alula.statusBadge_en,
      hours: 4,
      minutes: 18,
      seconds: "04:18:22",
      image: dealsData.alula.image,
      title: isAr ? dealsData.alula.title_ar : dealsData.alula.title_en,
      location: isAr ? dealsData.alula.location_ar : dealsData.alula.location_en,
      desc: isAr ? dealsData.alula.desc_ar : dealsData.alula.desc_en,
      specs: isAr ? dealsData.alula.specs_ar : dealsData.alula.specs_en,
      specLabels: isAr 
        ? ["المدة:", "المستوى:", "المقاعد:"] 
        : ["Duration:", "Rating:", "Availability:"],
      save: isAr 
        ? `وفر ${formatCurrency(dealsData.alula.originalPriceSAR - dealsData.alula.dealPriceSAR)} (${dealsData.alula.discountPct}%)`
        : `Save ${formatCurrency(dealsData.alula.originalPriceSAR - dealsData.alula.dealPriceSAR)} (${dealsData.alula.discountPct}%)`,
      was: formatCurrency(dealsData.alula.originalPriceSAR),
      now: formatCurrency(dealsData.alula.dealPriceSAR, dealsData.alula.priceUnitAr, dealsData.alula.priceUnitEn),
      dates: isAr ? dealsData.alula.dates_ar : dealsData.alula.dates_en
    },
    {
      key: 'maldives',
      category: 'hotels europe',
      badgeClass: 'badge-secret',
      badge: isAr ? dealsData.maldives.statusBadge_ar : dealsData.maldives.statusBadge_en,
      hours: 11,
      minutes: 45,
      seconds: "11:45:10",
      image: dealsData.maldives.image,
      title: isAr ? dealsData.maldives.title_ar : dealsData.maldives.title_en,
      location: isAr ? dealsData.maldives.location_ar : dealsData.maldives.location_en,
      desc: isAr ? dealsData.maldives.desc_ar : dealsData.maldives.desc_en,
      specs: isAr ? dealsData.maldives.specs_ar : dealsData.maldives.specs_en,
      specLabels: isAr 
        ? ["المدة:", "التوفير:", "الإلغاء:"] 
        : ["Duration:", "Bonus Perk:", "Policy:"],
      save: isAr 
        ? `وفر ${formatCurrency(dealsData.maldives.originalPriceSAR - dealsData.maldives.dealPriceSAR)} (${dealsData.maldives.discountPct}%)`
        : `Save ${formatCurrency(dealsData.maldives.originalPriceSAR - dealsData.maldives.dealPriceSAR)} (${dealsData.maldives.discountPct}%)`,
      was: formatCurrency(dealsData.maldives.originalPriceSAR),
      now: formatCurrency(dealsData.maldives.dealPriceSAR, dealsData.maldives.priceUnitAr, dealsData.maldives.priceUnitEn),
      dates: isAr ? dealsData.maldives.dates_ar : dealsData.maldives.dates_en
    },
    {
      key: 'flight',
      category: 'flights glitch europe',
      badgeClass: 'badge-glitch',
      badge: isAr ? dealsData.flight.statusBadge_ar : dealsData.flight.statusBadge_en,
      hours: 2,
      minutes: 30,
      seconds: "02:30:45",
      image: dealsData.flight.image,
      title: isAr ? dealsData.flight.title_ar : dealsData.flight.title_en,
      location: isAr ? dealsData.flight.location_ar : dealsData.flight.location_en,
      desc: isAr ? dealsData.flight.desc_ar : dealsData.flight.desc_en,
      specs: isAr ? dealsData.flight.specs_ar : dealsData.flight.specs_en,
      specLabels: isAr 
        ? ["المسار:", "الدرجة:", "الصالة:"] 
        : ["Route:", "Cabin:", "Lounge:"],
      save: isAr 
        ? `وفر ${formatCurrency(dealsData.flight.originalPriceSAR - dealsData.flight.dealPriceSAR)} (${dealsData.flight.discountPct}%)`
        : `Save ${formatCurrency(dealsData.flight.originalPriceSAR - dealsData.flight.dealPriceSAR)} (${dealsData.flight.discountPct}%)`,
      was: formatCurrency(dealsData.flight.originalPriceSAR),
      now: formatCurrency(dealsData.flight.dealPriceSAR, dealsData.flight.priceUnitAr, dealsData.flight.priceUnitEn),
      dates: isAr ? dealsData.flight.dates_ar : dealsData.flight.dates_en
    },
    {
      key: 'switzerland',
      category: 'hotels europe',
      badgeClass: 'badge-secret',
      badge: isAr ? dealsData.switzerland.statusBadge_ar : dealsData.switzerland.statusBadge_en,
      hours: 5,
      minutes: 12,
      seconds: "05:12:30",
      image: dealsData.switzerland.image,
      title: isAr ? dealsData.switzerland.title_ar : dealsData.switzerland.title_en,
      location: isAr ? dealsData.switzerland.location_ar : dealsData.switzerland.location_en,
      desc: isAr ? dealsData.switzerland.desc_ar : dealsData.switzerland.desc_en,
      specs: isAr ? dealsData.switzerland.specs_ar : dealsData.switzerland.specs_en,
      specLabels: isAr 
        ? ["المدة:", "المستوى:", "المقاعد:"] 
        : ["Duration:", "Style:", "Remaining:"],
      save: isAr 
        ? `وفر ${formatCurrency(dealsData.switzerland.originalPriceSAR - dealsData.switzerland.dealPriceSAR)} (${dealsData.switzerland.discountPct}%)`
        : `Save ${formatCurrency(dealsData.switzerland.originalPriceSAR - dealsData.switzerland.dealPriceSAR)} (${dealsData.switzerland.discountPct}%)`,
      was: formatCurrency(dealsData.switzerland.originalPriceSAR),
      now: formatCurrency(dealsData.switzerland.dealPriceSAR, dealsData.switzerland.priceUnitAr, dealsData.switzerland.priceUnitEn),
      dates: isAr ? dealsData.switzerland.dates_ar : dealsData.switzerland.dates_en
    },
    {
      key: 'paris',
      category: 'glitch hotels europe',
      badgeClass: 'badge-glitch',
      badge: isAr ? dealsData.paris.statusBadge_ar : dealsData.paris.statusBadge_en,
      hours: 1,
      minutes: 48,
      seconds: "01:48:15",
      image: dealsData.paris.image,
      title: isAr ? dealsData.paris.title_ar : dealsData.paris.title_en,
      location: isAr ? dealsData.paris.location_ar : dealsData.paris.location_en,
      desc: isAr ? dealsData.paris.desc_ar : dealsData.paris.desc_en,
      specs: isAr ? dealsData.paris.specs_ar : dealsData.paris.specs_en,
      specLabels: isAr 
        ? ["المدة:", "المستوى:", "الإطلالة:"] 
        : ["Duration:", "Tier:", "Balcony View:"],
      save: isAr 
        ? `وفر ${formatCurrency(dealsData.paris.originalPriceSAR - dealsData.paris.dealPriceSAR)} (${dealsData.paris.discountPct}%)`
        : `Save ${formatCurrency(dealsData.paris.originalPriceSAR - dealsData.paris.dealPriceSAR)} (${dealsData.paris.discountPct}%)`,
      was: formatCurrency(dealsData.paris.originalPriceSAR),
      now: formatCurrency(dealsData.paris.dealPriceSAR, dealsData.paris.priceUnitAr, dealsData.paris.priceUnitEn),
      dates: isAr ? dealsData.paris.dates_ar : dealsData.paris.dates_en
    },
    {
      key: 'bali',
      category: 'hotels europe',
      badgeClass: 'badge-secret',
      badge: isAr ? dealsData.bali.statusBadge_ar : dealsData.bali.statusBadge_en,
      hours: 8,
      minutes: 25,
      seconds: "08:25:40",
      image: dealsData.bali.image,
      title: isAr ? dealsData.bali.title_ar : dealsData.bali.title_en,
      location: isAr ? dealsData.bali.location_ar : dealsData.bali.location_en,
      desc: isAr ? dealsData.bali.desc_ar : dealsData.bali.desc_en,
      specs: isAr ? dealsData.bali.specs_ar : dealsData.bali.specs_en,
      specLabels: isAr 
        ? ["المدة:", "الفئة:", "المسبح:"] 
        : ["Duration:", "Category:", "Pool:"],
      save: isAr 
        ? `وفر ${formatCurrency(dealsData.bali.originalPriceSAR - dealsData.bali.dealPriceSAR)} (${dealsData.bali.discountPct}%)`
        : `Save ${formatCurrency(dealsData.bali.originalPriceSAR - dealsData.bali.dealPriceSAR)} (${dealsData.bali.discountPct}%)`,
      was: formatCurrency(dealsData.bali.originalPriceSAR),
      now: formatCurrency(dealsData.bali.dealPriceSAR, dealsData.bali.priceUnitAr, dealsData.bali.priceUnitEn),
      dates: isAr ? dealsData.bali.dates_ar : dealsData.bali.dates_en
    },
    {
      key: 'dubai',
      category: 'hotels gulf',
      badgeClass: 'badge-secret',
      badge: isAr ? dealsData.dubai.statusBadge_ar : dealsData.dubai.statusBadge_en,
      hours: 6,
      minutes: 50,
      seconds: "06:50:12",
      image: dealsData.dubai.image,
      title: isAr ? dealsData.dubai.title_ar : dealsData.dubai.title_en,
      location: isAr ? dealsData.dubai.location_ar : dealsData.dubai.location_en,
      desc: isAr ? dealsData.dubai.desc_ar : dealsData.dubai.desc_en,
      specs: isAr ? dealsData.dubai.specs_ar : dealsData.dubai.specs_en,
      specLabels: isAr 
        ? ["المدة:", "المستوى:", "الشاطئ:"] 
        : ["Duration:", "Rating:", "Beach:"],
      save: isAr 
        ? `وفر ${formatCurrency(dealsData.dubai.originalPriceSAR - dealsData.dubai.dealPriceSAR)} (${dealsData.dubai.discountPct}%)`
        : `Save ${formatCurrency(dealsData.dubai.originalPriceSAR - dealsData.dubai.dealPriceSAR)} (${dealsData.dubai.discountPct}%)`,
      was: formatCurrency(dealsData.dubai.originalPriceSAR),
      now: formatCurrency(dealsData.dubai.dealPriceSAR, dealsData.dubai.priceUnitAr, dealsData.dubai.priceUnitEn),
      dates: isAr ? dealsData.dubai.dates_ar : dealsData.dubai.dates_en
    },
    {
      key: 'tokyo_flight',
      category: 'flights glitch europe',
      badgeClass: 'badge-glitch',
      badge: isAr ? dealsData.tokyo_flight.statusBadge_ar : dealsData.tokyo_flight.statusBadge_en,
      hours: 2,
      minutes: 10,
      seconds: "02:10:00",
      image: dealsData.tokyo_flight.image,
      title: isAr ? dealsData.tokyo_flight.title_ar : dealsData.tokyo_flight.title_en,
      location: isAr ? dealsData.tokyo_flight.location_ar : dealsData.tokyo_flight.location_en,
      desc: isAr ? dealsData.tokyo_flight.desc_ar : dealsData.tokyo_flight.desc_en,
      specs: isAr ? dealsData.tokyo_flight.specs_ar : dealsData.tokyo_flight.specs_en,
      specLabels: isAr 
        ? ["المسار:", "الدرجة:", "المقاعد:"] 
        : ["Route:", "Cabin:", "Available:"],
      save: isAr 
        ? `وفر ${formatCurrency(dealsData.tokyo_flight.originalPriceSAR - dealsData.tokyo_flight.dealPriceSAR)} (${dealsData.tokyo_flight.discountPct}%)`
        : `Save ${formatCurrency(dealsData.tokyo_flight.originalPriceSAR - dealsData.tokyo_flight.dealPriceSAR)} (${dealsData.tokyo_flight.discountPct}%)`,
      was: formatCurrency(dealsData.tokyo_flight.originalPriceSAR),
      now: formatCurrency(dealsData.tokyo_flight.dealPriceSAR, dealsData.tokyo_flight.priceUnitAr, dealsData.tokyo_flight.priceUnitEn),
      dates: isAr ? dealsData.tokyo_flight.dates_ar : dealsData.tokyo_flight.dates_en
    },
    {
      key: 'redsea',
      category: 'glitch hotels gulf',
      badgeClass: 'badge-glitch',
      badge: isAr ? dealsData.redsea.statusBadge_ar : dealsData.redsea.statusBadge_en,
      hours: 7,
      minutes: 15,
      seconds: "07:15:20",
      image: dealsData.redsea.image,
      title: isAr ? dealsData.redsea.title_ar : dealsData.redsea.title_en,
      location: isAr ? dealsData.redsea.location_ar : dealsData.redsea.location_en,
      desc: isAr ? dealsData.redsea.desc_ar : dealsData.redsea.desc_en,
      specs: isAr ? dealsData.redsea.specs_ar : dealsData.redsea.specs_en,
      specLabels: isAr 
        ? ["المدة:", "الفئة:", "الموقع:"] 
        : ["Duration:", "Style:", "Location:"],
      save: isAr 
        ? `وفر ${formatCurrency(dealsData.redsea.originalPriceSAR - dealsData.redsea.dealPriceSAR)} (${dealsData.redsea.discountPct}%)`
        : `Save ${formatCurrency(dealsData.redsea.originalPriceSAR - dealsData.redsea.dealPriceSAR)} (${dealsData.redsea.discountPct}%)`,
      was: formatCurrency(dealsData.redsea.originalPriceSAR),
      now: formatCurrency(dealsData.redsea.dealPriceSAR, dealsData.redsea.priceUnitAr, dealsData.redsea.priceUnitEn),
      dates: isAr ? dealsData.redsea.dates_ar : dealsData.redsea.dates_en
    }
  ];

  let activeDeals = dealsList;
  let bannerHtml = '';

  if (selectedDestinationFilter) {
    const fLower = selectedDestinationFilter.toLowerCase();
    const matching = dealsList.filter(d => 
      d.location.toLowerCase().includes(fLower) || 
      d.title.toLowerCase().includes(fLower) ||
      d.desc.toLowerCase().includes(fLower)
    );
    if (matching.length > 0) {
      activeDeals = matching;
    }
    bannerHtml = `
      <div class="destination-filter-banner" style="grid-column: 1 / -1;">
        <span class="dest-banner-text">📍 ${isAr ? 'الوجهة المحددة:' : 'Selected Destination:'} <strong>${selectedDestinationFilter}</strong> (${activeDeals.length} ${isAr ? 'صفقة معروضة' : 'deals shown'})</span>
        <button class="dest-banner-clear-btn" onclick="clearDestinationFilter()" title="${isAr ? 'إلغاء التصفية' : 'Clear filter'}">✕</button>
      </div>
    `;
  }

  const isSubscriber = (localStorage.getItem('radar_is_subscriber') === 'true');

  grid.innerHTML = bannerHtml + activeDeals.map(deal => `
    <div class="deal-card ${!isSubscriber ? 'locked-for-visitor' : ''}" data-category="${deal.category}">
      ${!isSubscriber ? `
        <div class="deal-lock-badge">
          <span>🔒</span>
          <span>${isAr ? 'حصري للمشتركين' : 'Members Only'}</span>
        </div>
      ` : ''}
      <div class="deal-badge-float ${deal.badgeClass}">
        <span>${deal.badge}</span>
      </div>
      <div class="deal-image-wrapper">
        <img src="${deal.image}" alt="${deal.title}" loading="lazy" />
        <div class="deal-timer-pill">
          <span>${t.countdownPrefix}</span>
          <span class="countdown" data-hours="${deal.hours}" data-minutes="${deal.minutes}">${deal.seconds}</span>
        </div>
      </div>
      <div class="deal-card-body">
        <div class="deal-location">📍 ${deal.location}</div>
        <div class="deal-dates-tag" style="font-size: 0.8rem; font-weight: 700; color: var(--link-blue, #2563A6); margin-top: 0.25rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.35rem;">
          <span>📅</span>
          <span>${deal.dates}</span>
        </div>
        <h3 class="deal-card-title">${deal.title}</h3>
        <p class="deal-card-desc">${deal.desc}</p>
        
        <div class="deal-specs">
          <div class="spec-item">${deal.specLabels[0]} <strong>${deal.specs.duration}</strong></div>
          <div class="spec-item">${deal.specLabels[1]} <strong>${deal.specs.level}</strong></div>
          <div class="spec-item">${deal.specLabels[2]} <strong>${deal.specs.seats}</strong></div>
        </div>

        <div class="deal-pricing-row">
          <div>
            <span class="deal-save-pill">${deal.save}</span>
            <div class="price-was">${deal.was}</div>
            <div class="price-now">${deal.now}</div>
          </div>
        </div>

        <div class="deal-card-actions" style="display: flex; gap: 0.5rem; align-items: stretch; margin-top: 0.85rem;">
          <button class="btn-view-deal ${!isSubscriber ? 'btn-locked-deal' : ''}" onclick="handleDealAccess('${deal.key}')" style="flex: 1;">
            <span>${!isSubscriber ? (isAr ? '🔒 فتح الصفقة (للمشتركين فقط)' : '🔒 Unlock Deal (Members Only)') : t.viewDealBtn}</span>
            <span class="arrow-icon">${!isSubscriber ? '🔐' : (isAr ? '←' : '→')}</span>
          </button>
          <button class="btn-card-share-wa" onclick="shareDealWhatsApp('${deal.key}')" title="${isAr ? 'مشاركة عبر الواتساب' : 'Share via WhatsApp'}">
            <span>📲</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Apply saved view mode (grid vs compact list)
  const gridEl = document.getElementById('deals-grid');
  if (gridEl) {
    if (currentDealsViewMode === 'list') {
      gridEl.classList.add('list-view');
    } else {
      gridEl.classList.remove('list-view');
    }
  }

  // Update View Mode buttons state
  const btnGrid = document.getElementById('btn-view-grid');
  const btnList = document.getElementById('btn-view-list');
  if (btnGrid && btnList) {
    if (currentDealsViewMode === 'list') {
      btnList.classList.add('active');
      btnGrid.classList.remove('active');
    } else {
      btnGrid.classList.add('active');
      btnList.classList.remove('active');
    }
  }

  startCountdowns();
  applyDealsFilter();
}

// 7. Render Ticker
function renderTicker() {
  const container = document.getElementById('ticker-content');
  if (!container || typeof container.appendChild !== "function") return;

  const items = tickerItemsData[currentLang] || tickerItemsData.ar;
  container.innerHTML = items.map(item => `<div class="ticker-item">${item}</div>`).join('');
}

// 8. Initialize Countdowns
let countdownInterval = null;
function startCountdowns() {
  if (countdownInterval) clearInterval(countdownInterval);

  const timers = document.querySelectorAll('.countdown');
  if (!timers.length) return;

  countdownInterval = setInterval(() => {
    timers.forEach(timer => {
      let [h, m, s] = timer.textContent.split(':').map(Number);
      if (isNaN(h)) h = 2;
      if (isNaN(m)) m = 15;
      if (isNaN(s)) s = 30;

      if (s > 0) {
        s--;
      } else {
        if (m > 0) {
          m--;
          s = 59;
        } else if (h > 0) {
          h--;
          m = 59;
          s = 59;
        }
      }

      timer.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    });
  }, 1000);
}

// 9. Fly4free-Style Live Search, Categories & View Mode Filtering
let currentDealCategory = 'all';
let currentDealSearch = '';
let currentDealsViewMode = localStorage.getItem('radar_deals_view_mode') || 'grid';

function applyDealsFilter() {
  const cards = document.querySelectorAll('.deal-card');
  const q = currentDealSearch.trim().toLowerCase();
  let visibleCount = 0;

  // Counters for filter badges
  let counts = { all: 0, glitch: 0, hotels: 0, flights: 0, gulf: 0, europe: 0 };

  cards.forEach(card => {
    const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
    const textContent = (card.textContent || '').toLowerCase();

    // Check count for each tab regardless of active tab
    Object.keys(counts).forEach(k => {
      if (k === 'all' || cardCat.includes(k)) {
        counts[k]++;
      }
    });

    const matchesCategory = (currentDealCategory === 'all') || cardCat.includes(currentDealCategory);
    const matchesSearch = !q || textContent.includes(q);

    if (matchesCategory && matchesSearch) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.25s ease';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Update counts in filter badges
  Object.keys(counts).forEach(k => {
    const b = document.getElementById(`count-${k}`);
    if (b) b.textContent = counts[k];
  });

  // Update visible count in deals toolbar
  const countEl = document.getElementById('deals-visible-count');
  if (countEl) {
    countEl.textContent = visibleCount;
  }

  // Handle empty state if zero matches
  let emptyBox = document.getElementById('no-deals-box');
  const grid = document.getElementById('deals-grid');
  if (visibleCount === 0) {
    if (!emptyBox && grid) {
      emptyBox = document.createElement('div');
      emptyBox.id = 'no-deals-box';
      emptyBox.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; color: var(--text-dim); background: rgba(15,26,52,0.6); border-radius: 18px; border: 1.5px dashed rgba(255,179,0,0.3); backdrop-filter: blur(10px);';
      const isAr = (currentLang === 'ar');
      emptyBox.innerHTML = `
        <div style="font-size: 2.8rem; margin-bottom: 0.5rem;">🔍</div>
        <p style="font-size: 1.15rem; color: #ffffff; font-weight: 700; margin-bottom: 0.35rem;">${isAr ? 'لم نجد أي صفقات تطابق بحثك حالياً' : 'No deals match your search criteria'}</p>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem;">${isAr ? 'جرب البحث باسم وجهة أخرى أو اضغط لإعادة ضبط كافة الفلاتر' : 'Try searching for another destination or reset the filters'}</p>
        <button onclick="clearDealsLiveSearch(); filterDeals('all', document.querySelector('.filter-btn[data-filter=\\'all\\']'));" class="btn-plan-vip" style="padding: 0.65rem 1.6rem; font-size: 0.9rem; border-radius: 12px; cursor: pointer;">
          ${isAr ? 'إعادة ضبط كل الفلاتر ⚡' : 'Reset All Filters ⚡'}
        </button>
      `;
      grid.appendChild(emptyBox);
    }
  } else {
    if (emptyBox) emptyBox.remove();
  }
}

function filterDeals(category, btnElement) {
  currentDealCategory = category;
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  applyDealsFilter();
}

function handleDealsLiveSearch(query) {
  currentDealSearch = query;
  const clearBtn = document.getElementById('deals-clear-search');
  if (clearBtn) {
    if (query.trim().length > 0) {
      clearBtn.classList.add('visible');
    } else {
      clearBtn.classList.remove('visible');
    }
  }
  applyDealsFilter();
}

function clearDealsLiveSearch() {
  const input = document.getElementById('deals-live-search');
  if (input) input.value = '';
  currentDealSearch = '';
  const clearBtn = document.getElementById('deals-clear-search');
  if (clearBtn) clearBtn.classList.remove('visible');
  applyDealsFilter();
}

function toggleDealsView(mode) {
  currentDealsViewMode = mode;
  localStorage.setItem('radar_deals_view_mode', mode);

  const grid = document.getElementById('deals-grid');
  const btnGrid = document.getElementById('btn-view-grid');
  const btnList = document.getElementById('btn-view-list');

  if (grid) {
    if (mode === 'list') {
      grid.classList.add('list-view');
    } else {
      grid.classList.remove('list-view');
    }
  }

  if (btnGrid && btnList) {
    if (mode === 'list') {
      btnList.classList.add('active');
      btnGrid.classList.remove('active');
    } else {
      btnGrid.classList.add('active');
      btnList.classList.remove('active');
    }
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Scroll event listener for Back-to-Top Button
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;
  if (window.scrollY > 380) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

// 10. Savings Calculator reactive logic
function calculateSavings() {
  const tripsInput = document.getElementById('trips-slider');
  const budgetInput = document.getElementById('budget-slider');
  if (!tripsInput || !budgetInput) return;

  const trips = parseInt(tripsInput.value);
  const budgetSAR = parseInt(budgetInput.value);
  const isAr = (currentLang === 'ar');
  const curr = getCurrentCurrency();

  // Slider badges
  const tripsUnit = isAr 
    ? (trips > 2 && trips < 11 ? 'رحلات' : 'رحلة')
    : (trips === 1 ? 'trip' : 'trips');
  
  const convertedBudget = Math.round(budgetSAR * curr.rateFromSAR);
  const symbol = isAr ? curr.symbolAr : curr.symbolEn;
  const budgetStr = convertedBudget.toLocaleString(isAr ? 'ar-SA' : 'en-US');

  document.getElementById('trips-val').textContent = `${trips} ${tripsUnit}`;
  document.getElementById('budget-val').textContent = `${budgetStr} ${symbol}`;

  // Assume average 50% discount on 1-2 major stays per trip
  const savingsPercent = 0.50;
  const estimatedSavingsSAR = Math.round(trips * budgetSAR * savingsPercent);
  const convertedSavings = Math.round(estimatedSavingsSAR * curr.rateFromSAR);
  const savingsStr = convertedSavings.toLocaleString(isAr ? 'ar-SA' : 'en-US');

  document.getElementById('savings-result').textContent = `${savingsStr} ${symbol}`;
}

// 11. Modal Handlers
let currentActiveDealKey = null;
let pendingGateDealKey = null;

function handleDealAccess(dealKey) {
  const isSub = (localStorage.getItem('radar_is_subscriber') === 'true');
  if (!isSub) {
    openSubscriberGateModal(dealKey);
    return;
  }
  openDealModal(dealKey);
}

function openSubscriberGateModal(targetDealKey = null) {
  pendingGateDealKey = targetDealKey;
  const isAr = (currentLang === 'ar');
  const previewBox = document.getElementById('gate-deal-preview');
  const titleEl = document.getElementById('gate-deal-title');
  const saveEl = document.getElementById('gate-deal-save');

  if (targetDealKey && dealsData[targetDealKey]) {
    const deal = dealsData[targetDealKey];
    if (previewBox && titleEl && saveEl) {
      previewBox.style.display = 'flex';
      titleEl.innerText = isAr ? deal.title_ar : deal.title_en;
      saveEl.innerText = isAr ? `وفر حتى ${deal.discountPct}%` : `Save up to ${deal.discountPct}%`;
    }
  } else if (previewBox) {
    previewBox.style.display = 'none';
  }

  openModal('subscriber-gate-modal');
}

function handleGateSubscribe(event) {
  if (event) event.preventDefault();
  const nameInput = document.getElementById('gate-name');
  const phoneInput = document.getElementById('gate-phone');
  const isAr = (currentLang === 'ar');
  const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : (isAr ? 'عضو جديد' : 'New Member');
  const phone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : '05xxxxxxxx';

  if (typeof registerSubscriber === 'function') {
    registerSubscriber({
      name: name,
      phone: phone,
      email: '',
      tier: 'free'
    });
  }

  localStorage.setItem('radar_is_subscriber', 'true');
  updateSubscriberUI();
  closeModal('subscriber-gate-modal');

  const msg = isAr
    ? "🎉 تم تفعيل اشتراكك بنجاح! تم فتح كافة العروض الحقيقية وروابط الحجز الفورية لك."
    : "🎉 Membership activated successfully! All real deals and direct booking links are now unlocked.";
  showToast(msg, "🔓");

  if (pendingGateDealKey) {
    const targetKey = pendingGateDealKey;
    pendingGateDealKey = null;
    setTimeout(() => {
      openDealModal(targetKey);
    }, 450);
  }
}

function activateDirectSubscriber() {
  const isAr = (currentLang === 'ar');
  localStorage.setItem('radar_is_subscriber', 'true');
  updateSubscriberUI();
  closeModal('subscriber-gate-modal');

  const msg = isAr
    ? "🎉 أهلاً بعودتك! تم تأكيد اشتراكك وفتح كافة الصفقات الحقيقية."
    : "🎉 Welcome back! Membership verified, all real deals unlocked.";
  showToast(msg, "👑");

  if (pendingGateDealKey) {
    const targetKey = pendingGateDealKey;
    pendingGateDealKey = null;
    setTimeout(() => {
      openDealModal(targetKey);
    }, 450);
  }
}

function toggleOrOpenMemberModal() {
  const isSub = (localStorage.getItem('radar_is_subscriber') === 'true');
  const isAr = (currentLang === 'ar');
  if (isSub) {
    const confirmLogout = confirm(isAr 
      ? "أنت متصفح مشترك حالياً وجميع الصفقات الحقيقية مفتوحة لك ✓\n\nهل ترغب في تسجيل الخروج وتجربة وضع الزائر غير المشترك؟"
      : "You are currently an active member with all real deals unlocked ✓\n\nWould you like to sign out to test visitor mode?");
    if (confirmLogout) {
      localStorage.removeItem('radar_is_subscriber');
      updateSubscriberUI();
      showToast(isAr ? "تم التبديل لوضع الزائر (الصفقات مقفلة)" : "Switched to visitor mode (Deals locked)", "🔒");
    }
  } else {
    openSubscriberGateModal();
  }
}

function updateSubscriberUI() {
  const isSub = (localStorage.getItem('radar_is_subscriber') === 'true');
  const isAr = (currentLang === 'ar');
  const btn = document.getElementById('member-status-btn');
  const icon = document.getElementById('member-status-icon');
  const text = document.getElementById('member-status-text');

  if (btn && icon && text) {
    if (isSub) {
      btn.classList.add('active');
      icon.innerText = '👑';
      text.innerText = isAr ? 'مشترك نشط ✓' : 'Active Member ✓';
      btn.setAttribute('title', isAr ? 'عضو مشترك (انقر لتسجيل الخروج وتجربة وضع الزائر)' : 'Active Member (Click to test visitor mode)');
    } else {
      btn.classList.remove('active');
      icon.innerText = '🔒';
      text.innerText = isAr ? 'دخول المشتركين' : 'Members Login';
      btn.setAttribute('title', isAr ? 'انقر لتسجيل الدخول أو الاشتراك لفتح الصفقات' : 'Click to subscribe or login to unlock deals');
    }
  }

  // Re-render deals grid to apply locked/unlocked state
  if (typeof renderDealsGrid === 'function' && typeof dealsData !== 'undefined') {
    renderDealsGrid();
  }
}

function openDealModal(dealKey) {
  const isSub = (localStorage.getItem('radar_is_subscriber') === 'true');
  if (!isSub) {
    openSubscriberGateModal(dealKey);
    return;
  }

  currentActiveDealKey = dealKey;
  const deal = dealsData[dealKey];
  if (!deal) return;

  const isAr = (currentLang === 'ar');
  const t = translations[currentLang];
  const modalBody = document.getElementById('deal-modal-body');

  const title = isAr ? deal.title_ar : deal.title_en;
  const location = isAr ? deal.location_ar : deal.location_en;
  const statusBadge = isAr ? deal.statusBadge_ar : deal.statusBadge_en;
  const originalPrice = formatCurrency(deal.originalPriceSAR);
  const dealPrice = formatCurrency(deal.dealPriceSAR, deal.priceUnitAr, deal.priceUnitEn);
  const diffSAR = deal.originalPriceSAR - deal.dealPriceSAR;
  const savings = isAr 
    ? `وفر ${formatCurrency(diffSAR)} (${deal.discountPct}%)` 
    : `Save ${formatCurrency(diffSAR)} (${deal.discountPct}%)`;
  const dates = isAr ? deal.dates_ar : deal.dates_en;
  const glitchReason = isAr ? deal.glitchReason_ar : deal.glitchReason_en;
  const adviceList = isAr ? deal.bookingAdvice_ar : deal.bookingAdvice_en;

  modalBody.innerHTML = `
    <div style="border-radius: 16px; overflow: hidden; height: 210px; margin-bottom: 1.25rem;">
      <img src="${deal.image}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;" />
    </div>
    <span class="deal-badge-float badge-glitch" style="position: static; display: inline-block; margin-bottom: 0.75rem;">
      ${statusBadge}
    </span>
    <h3 style="font-family: var(--font-heading); font-size: 1.35rem; margin-bottom: 0.5rem; color: var(--text-white);">${title}</h3>
    <p style="color: var(--text-dim); font-size: 0.9rem; margin-bottom: 0.75rem;">📍 ${location}</p>
    
    <div style="display: flex; align-items: center; gap: 0.65rem; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 12px; padding: 0.75rem 1rem; margin-bottom: 1.15rem;">
      <span style="font-size: 1.3rem;">📅</span>
      <div>
        <div style="font-size: 0.75rem; font-weight: 800; color: var(--link-blue, #2563A6); text-transform: uppercase; letter-spacing: 0.5px;">${isAr ? 'التواريخ المتاحة للحجز والسفر' : 'Available Travel & Booking Dates'}</div>
        <div style="font-size: 0.92rem; font-weight: 700; color: var(--text-white); margin-top: 0.15rem;">${dates}</div>
      </div>
    </div>
    
    <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 12px; padding: 1rem; margin-bottom: 1.25rem;">
      <div style="font-size: 0.85rem; color: var(--text-muted); text-decoration: line-through;">${t.modalOriginalPrice} ${originalPrice}</div>
      <div style="font-size: 1.6rem; font-weight: 800; color: var(--emerald-radar); font-family: var(--font-heading);">${dealPrice}</div>
      <div style="font-size: 0.85rem; color: var(--gold-accent); font-weight: 700; margin-top: 0.25rem;">${savings}</div>
    </div>

    <div style="font-size: 0.9rem; line-height: 1.6; color: var(--text-primary); margin-bottom: 1rem;">
      <strong style="color: var(--text-white); display: block; margin-bottom: 0.25rem;">${t.modalGlitchTitle}</strong>
      ${glitchReason}
    </div>

    <div class="modal-advice-box" style="font-size: 0.85rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 1.25rem; padding: 0.85rem; border-radius: 10px;">
      <strong style="color: var(--gold-accent); display: block; margin-bottom: 0.25rem;">${t.modalAdviceTitle}</strong>
      <ul style="padding-${isAr ? 'right' : 'left'}: 1.2rem; list-style-type: disc;">
        ${adviceList.map(advice => `<li>${advice}</li>`).join('')}
      </ul>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 0.65rem 0.85rem; margin-bottom: 1rem; font-size: 0.82rem; color: var(--text-dim);">
      <span>🔒 ${isAr ? 'مزود الحجز المباشر:' : 'Direct Provider:'}</span>
      <strong style="color: var(--text-white); font-weight: 700;">${isAr ? (deal.provider_ar || 'مزود معتمد') : (deal.provider_en || 'Verified Partner')}</strong>
    </div>

    <button onclick="simulateBooking('${title}')" class="btn-join-hero" style="width: 100%; justify-content: center; padding: 1rem; font-size: 1.05rem;">
      <span>${isAr ? '🌐 الانتقال لرابط الحجز المباشر الآن' : '🌐 Proceed to Live Direct Booking'}</span>
      <span class="arrow-icon">${isAr ? '←' : '→'}</span>
    </button>
    
    <button onclick="shareDealWhatsApp('${dealKey}')" class="btn-modal-share-wa" style="width: 100%; margin-top: 0.75rem; background: linear-gradient(135deg, #25D366, #128C7E); color: #fff; border: none; border-radius: 12px; padding: 0.95rem; font-weight: 700; font-size: 0.98rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35); transition: all 0.25s ease;">
      <span>📲</span>
      <span>${isAr ? 'مشاركة الصفقة عبر الواتساب' : 'Share Deal via WhatsApp'}</span>
    </button>
  `;

  if (typeof logAnalyticsEvent === 'function') {
    logAnalyticsEvent('deal_view', { dealKey });
  }

  document.getElementById('deal-modal').classList.add('active');
}

// 11.5 Viral WhatsApp Deal Share
function shareDealWhatsApp(dealKey) {
  const deal = dealsData[dealKey];
  if (!deal) return;
  const isAr = (currentLang === 'ar');
  const title = isAr ? deal.title_ar : deal.title_en;
  const location = isAr ? deal.location_ar : deal.location_en;
  const badge = isAr ? deal.statusBadge_ar : deal.statusBadge_en;
  const dealPrice = formatCurrency(deal.dealPriceSAR, deal.priceUnitAr, deal.priceUnitEn);
  const origPrice = formatCurrency(deal.originalPriceSAR);
  const diffSAR = deal.originalPriceSAR - deal.dealPriceSAR;
  const save = isAr 
    ? `وفر ${formatCurrency(diffSAR)} (${deal.discountPct}%)` 
    : `Save ${formatCurrency(diffSAR)} (${deal.discountPct}%)`;
  const url = deal.directLink || window.location.href;

  let text = "";
  if (isAr) {
    text = `🚨 *صفقة رادار سفر عاجلة:*\n` +
           `✈️ *${title}*\n` +
           `📍 الموقع: ${location}\n` +
           `🏷️ الحالة: ${badge}\n` +
           `💰 السعر الحالي: *${dealPrice}* (المعتاد: ~${origPrice}~)\n` +
           `🔥 التوفير: ${save}\n\n` +
           `📲 تفاصيل وحجز الصفقة قبل نفادها تجدها في رادار السفر:\n${url}`;
  } else {
    text = `🚨 *Radar Travel Flash Deal:*\n` +
           `✈️ *${title}*\n` +
           `📍 Location: ${location}\n` +
           `🏷️ Status: ${badge}\n` +
           `💰 Deal Price: *${dealPrice}* (Regular: ~${origPrice}~)\n` +
           `🔥 Savings: ${save}\n\n` +
           `📲 Instant details & direct booking via Radar Travel:\n${url}`;
  }

  if (typeof logAnalyticsEvent === 'function') {
    logAnalyticsEvent('deal_whatsapp_share', { dealKey });
  }

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

function openVipModal() {
  document.getElementById('vip-modal').classList.add('active');
}

function openJoinModal(type) {
  const isAr = (currentLang === 'ar');
  if (type === 'free') {
    showToast(isAr 
      ? "🎉 مرحباً بك! تم تفعيل اشتراكك في الباقة المجانية لتنبيهات الصفقات." 
      : "🎉 Welcome! Free deal alerts subscription activated.", "⚡");
  } else {
    openVipModal();
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// Close on backdrop click or ESC
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }
});

// 12. Toast Notification System
function showToast(message, icon = "⚡") {
  const container = document.getElementById('toast-container');
  if (!container || typeof container.appendChild !== "function") return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="font-size: 1.25rem;">${icon}</span>
    <span style="font-size: 0.95rem; font-weight: 500;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// 13. Action Handlers
function handleQuickJoin(event) {
  event.preventDefault();
  const phoneInput = document.getElementById('hero-phone');
  const phone = phoneInput ? phoneInput.value : '';
  if (!phone) return;

  const isAr = (currentLang === 'ar');
  if (typeof registerSubscriber === 'function') {
    registerSubscriber({
      name: isAr ? 'مشترك تنبيهات مجانية' : 'Free Alerts Subscriber',
      phone: phone,
      email: '',
      tier: 'free'
    });
  }

  localStorage.setItem('radar_is_subscriber', 'true');
  updateSubscriberUI();

  const msg = isAr
    ? `تم تفعيل اشتراكك والتنبيهات الفورية لرقمك (${phone}) بنجاح! تم فتح كافة الصفقات الحقيقية لك.`
    : `Instant alerts & membership activated for (${phone}) successfully! All real deals unlocked.`;
  showToast(msg, "🔓");
  if (phoneInput) phoneInput.value = '';
}

function handleVipSubscribe(event) {
  event.preventDefault();
  const nameInput = document.querySelector('#vip-register-form input[type="text"]');
  const phoneInput = document.querySelector('#vip-register-form input[type="tel"]');
  const planSelect = document.querySelector('#vip-register-form select');
  const isAr = (currentLang === 'ar');
  const name = nameInput && nameInput.value ? nameInput.value : (isAr ? 'عضو VIP جديد' : 'New VIP Member');
  const phone = phoneInput && phoneInput.value ? phoneInput.value : '05xxxxxxxx';
  const tier = (planSelect && planSelect.value === 'annual') ? 'vip_annual' : 'vip_monthly';

  if (typeof registerSubscriber === 'function') {
    registerSubscriber({
      name: name,
      phone: phone,
      email: '',
      tier: tier
    });
  }

  localStorage.setItem('radar_is_subscriber', 'true');
  updateSubscriberUI();

  closeModal('vip-modal');
  const msg = isAr
    ? "👑 تهانينا! تم تفعيل عضوية VIP بنجاح وتم فتح كافة الصفقات الحقيقية فوراً."
    : "👑 Congratulations! VIP Membership activated successfully and all real deals unlocked.";
  showToast(msg, "🎉");
}

function simulateBooking(title) {
  closeModal('deal-modal');
  const isAr = (currentLang === 'ar');
  const deal = currentActiveDealKey ? dealsData[currentActiveDealKey] : null;
  const targetUrl = (deal && deal.directLink) ? deal.directLink : 'https://www.google.com/travel/flights';

  const msg = isAr
    ? `🚀 جاري توجيهك فوراً إلى رابط الحجز المباشر المعتمد...`
    : `🚀 Redirecting immediately to verified direct booking provider...`;
  showToast(msg, "⚡");

  if (typeof logAnalyticsEvent === 'function') {
    logAnalyticsEvent('deal_direct_booking_click', { dealKey: currentActiveDealKey, title });
  }

  setTimeout(() => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }, 450);
}

// 14. FAQ Accordion Toggle
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

  if (!isOpen) {
    item.classList.add('open');
  }
}

// 15. Mobile App Navigation & Tab Switching
function setMobileNavActive(element) {
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  element.classList.add('active');

  if (navigator.vibrate) {
    navigator.vibrate(15);
  }
}

// Auto update mobile bottom nav item on scroll (Scrollspy)
window.addEventListener('scroll', () => {
  const sections = [
    { id: 'hero', navIndex: 0 },
    { id: 'live-deals', navIndex: 1 },
    { id: 'savings-calc', navIndex: 2 },
    { id: 'how-it-works', navIndex: 3 },
    { id: 'pricing', navIndex: 4 }
  ];

  const scrollPos = window.pageYOffset + 240;
  const navItems = document.querySelectorAll('.mobile-nav-item');
  if (!navItems.length) return;

  sections.forEach(sec => {
    const el = document.getElementById(sec.id);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(i => i.classList.remove('active'));
        if (navItems[sec.navIndex]) {
          navItems[sec.navIndex].classList.add('active');
        }
      }
    }
  });
}, { passive: true });


// Init on DOM ready or immediate

// Destination Search Modal & Filter Functions
function openSearchModal() {
  const modal = document.getElementById('search-modal');
  if (!modal) return;
  modal.classList.add('active');
  renderDestinationsList('');
  const input = document.getElementById('destination-search-input');
  if (input) {
    input.value = '';
    setTimeout(() => {
      if (input && typeof input.focus === 'function') input.focus();
    }, 150);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) modal.classList.remove('active');
}

function setRegionFilter(region, btn) {
  currentRegionFilter = region || 'all';
  document.querySelectorAll('.region-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const input = document.getElementById('destination-search-input');
  renderDestinationsList(input ? input.value : '');
}

function filterDestinationsList(query) {
  renderDestinationsList(query);
}

function renderDestinationsList(query = '') {
  const container = document.getElementById('destinations-list-container');
  if (!container) return;

  const isAr = (currentLang === 'ar');
  const q = (query || '').trim().toLowerCase();

  let baseList = destinationsData;
  if (currentRegionFilter === 'trending') {
    baseList = destinationsData.map(country => {
      const trendingCities = country.cities.filter(c => c.isTrending);
      if (trendingCities.length > 0) {
        return { ...country, cities: trendingCities };
      }
      return null;
    }).filter(Boolean);
  } else if (currentRegionFilter !== 'all') {
    baseList = destinationsData.filter(c => c.region === currentRegionFilter);
  }

  const filtered = baseList.filter(country => {
    if (!q) return true;
    const matchCountry = country.name_ar.toLowerCase().includes(q) || 
                         country.name_en.toLowerCase().includes(q) ||
                         country.region_ar.toLowerCase().includes(q) ||
                         country.region_en.toLowerCase().includes(q);
    const matchCity = country.cities.some(c => 
      c.name_ar.toLowerCase().includes(q) || 
      c.name_en.toLowerCase().includes(q) ||
      c.tag_ar.toLowerCase().includes(q) ||
      c.tag_en.toLowerCase().includes(q)
    );
    return matchCountry || matchCity;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div style="text-align:center; padding: 2rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">🔍 ${isAr ? 'لم يتم العثور على وجهة مطابقة' : 'No matching destination found'}</p>
        <p style="font-size: 0.85rem; color: var(--text-dim);">${isAr ? 'جرّب كتابة اسم دولة أو مدينة أخرى (مثل: الرياض، دبي، باريس، روما، طوكيو، بالي، زنجبار)' : 'Try searching for Riyadh, Dubai, Paris, Rome, Tokyo, Bali, Zanzibar'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(country => {
    const countryName = isAr ? country.name_ar : country.name_en;
    const countryRegion = isAr ? country.region_ar : country.region_en;
    const citiesMatching = q 
      ? country.cities.filter(c => 
          c.name_ar.toLowerCase().includes(q) || 
          c.name_en.toLowerCase().includes(q) ||
          c.tag_ar.toLowerCase().includes(q) ||
          c.tag_en.toLowerCase().includes(q) ||
          country.name_ar.toLowerCase().includes(q) ||
          country.name_en.toLowerCase().includes(q)
        )
      : country.cities;

    return `
      <div class="country-search-card">
        <div class="country-card-header">
          <div class="country-header-left">
            <span class="country-flag">${country.flag}</span>
            <div style="display:flex; flex-direction:column; gap:2px;">
              <span class="country-name">${countryName}</span>
              <span style="font-size:0.75rem; color:var(--text-dim); font-weight:500;">${countryRegion}</span>
            </div>
          </div>
          <span class="country-cities-count">${country.cities.length} ${isAr ? 'مدن سياحية' : 'cities'}</span>
        </div>
        <div class="cities-pill-grid">
          ${citiesMatching.map(city => {
            const cityName = isAr ? city.name_ar : city.name_en;
            const cityTag = isAr ? city.tag_ar : city.tag_en;
            const trendingBadge = city.isTrending ? `<span class="city-pill-badge trending-badge">✨ ${isAr ? 'صاعدة' : 'New'}</span>` : '';
            const dealBadge = city.hasDeal ? `<span class="city-pill-badge">⚡ ${isAr ? 'صفقة' : 'Deal'}</span>` : '';
            return `
              <button 
                class="city-pill-btn ${city.hasDeal ? 'has-deal' : ''}" 
                onclick="selectDestination('${cityName}', '${countryName}', '${city.dealKey || ''}')"
                title="${cityName} - ${cityTag}"
              >
                <span>📍 ${cityName}</span>
                <span class="city-pill-tag">(${cityTag})</span>
                ${trendingBadge} ${dealBadge}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function selectDestination(cityName, countryName, dealKey) {
  closeSearchModal();
  selectedDestinationFilter = cityName;

  const isAr = (currentLang === 'ar');
  const msg = isAr 
    ? `تم تصفية صفقات الوجهة: ${cityName} (${countryName}) 📍`
    : `Showing deals for destination: ${cityName} (${countryName}) 📍`;
  
  showToast(msg, "✈️");

  // Re-render deals with destination filter
  renderDeals();

  // Scroll smoothly to deals section
  const section = document.getElementById('live-deals');
  if (section && typeof section.scrollIntoView === "function") {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // If city has an openable deal key, open it after slight delay
  if (dealKey && dealsData[dealKey]) {
    setTimeout(() => openDealModal(dealKey), 650);
  }
}

function clearDestinationFilter() {
  selectedDestinationFilter = null;
  renderDeals();
  const isAr = (currentLang === 'ar');
  showToast(isAr ? "تم إظهار جميع الصفقات والوجهات" : "Showing all deals & destinations", "🌍");
}

window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.selectDestination = selectDestination;
window.clearDestinationFilter = clearDestinationFilter;


// 6. Light / Dark Theme Engine
let currentTheme = localStorage.getItem('radar_theme') || 'dark';

function setTheme(theme) {
  if (theme !== 'light' && theme !== 'dark') theme = 'dark';
  currentTheme = theme;
  localStorage.setItem('radar_theme', theme);

  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'light') {
    document.body.classList.add('theme-light');
  } else {
    document.body.classList.remove('theme-light');
  }

  // Update theme icons
  const icon = (theme === 'light') ? '🌙' : '☀️';
  const themeBtnIcon = document.getElementById('theme-btn-icon');
  if (themeBtnIcon) themeBtnIcon.textContent = icon;
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');
  if (mobileThemeIcon) mobileThemeIcon.textContent = icon;
}

function toggleTheme() {
  const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
  setTheme(newTheme);
  const isAr = (currentLang === 'ar');
  const msg = (newTheme === 'light') 
    ? (isAr ? "تم تفعيل المظهر الفاتح ☀️" : "Light Mode Activated ☀️")
    : (isAr ? "تم تفعيل المظهر الداكن 🌙" : "Dark Mode Activated 🌙");
  showToast(msg, (newTheme === 'light') ? '☀️' : '🌙');
}

window.setTheme = setTheme;
window.toggleTheme = toggleTheme;

// ==========================================================================
// 15. Live Intelligence Clock & Real-time Date Engine
// ==========================================================================
function updateLiveClock() {
  const now = new Date();
  const isAr = (currentLang === 'ar');

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: isAr ? 'long' : 'short',
    day: 'numeric'
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  try {
    const locale = isAr ? 'ar-SA' : 'en-US';
    const dateStr = now.toLocaleDateString(locale, dateOptions);
    const timeStr = now.toLocaleTimeString(locale, timeOptions);

    const dateEl = document.getElementById('live-date');
    const timeEl = document.getElementById('live-time');
    if (dateEl) dateEl.textContent = dateStr;
    if (timeEl) timeEl.textContent = timeStr;

    const heroClock = document.getElementById('hero-live-clock');
    if (heroClock) {
      heroClock.textContent = `${isAr ? '⏱️ تحديث حي:' : '⏱️ Live Sync:'} ${timeStr}`;
    }
  } catch (err) {
    console.error("Clock update error:", err);
  }
}

let clockTimer = null;
function initLiveClock() {
  updateLiveClock();
  if (!clockTimer) {
    clockTimer = setInterval(updateLiveClock, 1000);
  }
}

window.updateLiveClock = updateLiveClock;
window.initLiveClock = initLiveClock;

// ==========================================================================
// 16. Multi-Currency Engine (23 Currencies with Real-time FX Conversion)
// ==========================================================================
function updateCurrencyButton() {
  const curr = getCurrentCurrency();
  const flagEl = document.getElementById('curr-btn-flag');
  const codeEl = document.getElementById('curr-btn-code');
  if (flagEl) flagEl.textContent = curr.flag;
  if (codeEl) codeEl.textContent = curr.code;
}

function updateMembershipPricing() {
  const isAr = (currentLang === 'ar');
  const curr = getCurrentCurrency();
  const symbol = isAr ? curr.symbolAr : curr.symbolEn;

  // Annual Tier: 149 SAR (was 249 SAR, save 100 SAR)
  const annualAfter = formatCurrencyNumber(149);
  const annualBefore = `${formatCurrencyNumber(249)} ${symbol}`;
  const annualDiff = `${formatCurrencyNumber(100)} ${symbol}`;
  const annualUnit = `${symbol} / ${isAr ? 'سنوياً' : 'year'}`;
  const annualDiscount = isAr ? `وفّر ${annualDiff} (خصم 40%)` : `Save ${annualDiff} (40% OFF)`;

  document.querySelectorAll('[data-i18n="tierAnnualBefore"]').forEach(el => el.textContent = annualBefore);
  document.querySelectorAll('.primary-annual .price-after').forEach(el => el.textContent = annualAfter);
  document.querySelectorAll('[data-i18n="tierAnnualUnit"]').forEach(el => el.textContent = annualUnit);
  document.querySelectorAll('[data-i18n="tierAnnualDiscount"]').forEach(el => el.textContent = annualDiscount);

  // Monthly Tier: 24 SAR (was 34 SAR, save 10 SAR)
  const monthlyAfter = formatCurrencyNumber(24);
  const monthlyBefore = `${formatCurrencyNumber(34)} ${symbol}`;
  const monthlyDiff = `${formatCurrencyNumber(10)} ${symbol}`;
  const monthlyUnit = `${symbol} / ${isAr ? 'شهرياً' : 'month'}`;
  const monthlyDiscount = isAr ? `وفّر ${monthlyDiff} (خصم 30%)` : `Save ${monthlyDiff} (30% OFF)`;

  document.querySelectorAll('[data-i18n="tierMonthlyBefore"]').forEach(el => el.textContent = monthlyBefore);
  document.querySelectorAll('.secondary-monthly .price-after').forEach(el => el.textContent = monthlyAfter);
  document.querySelectorAll('[data-i18n="tierMonthlyUnit"]').forEach(el => el.textContent = monthlyUnit);
  document.querySelectorAll('[data-i18n="tierMonthlyDiscount"]').forEach(el => el.textContent = monthlyDiscount);

  // VIP Feature 5 Guarantee (500 SAR)
  const guaranteeDiff = `${formatCurrencyNumber(500)} ${symbol}`;
  const guaranteeText = isAr 
    ? `ضمان استرجاع 100% إن لم توفر على الأقل ${guaranteeDiff} بأول سفرة`
    : `100% Money-back guarantee if you don't save at least ${guaranteeDiff} on trip #1`;
  document.querySelectorAll('[data-i18n="vipFeature5"]').forEach(el => el.textContent = guaranteeText);

  // VIP CTA Button
  const ctaText = isAr 
    ? `اشترك في باقة VIP بـ ${annualAfter} ${symbol} سنوياً ⚡`
    : `Join VIP Club for Only ${annualAfter} ${symbol} / year ⚡`;
  document.querySelectorAll('[data-i18n="vipBtn"]').forEach(el => el.textContent = ctaText);

  // VIP Modal select options
  const annualOptText = isAr
    ? `الاشتراك السنوي: ${annualAfter} ${symbol} / سنة (بدلاً من ${annualBefore}) 👑 الأكثر توفيراً`
    : `Annual VIP: ${annualAfter} ${symbol} / year (was ${annualBefore}) 👑 Best Value`;
  document.querySelectorAll('option[value="annual"]').forEach(el => el.textContent = annualOptText);

  const monthlyOptText = isAr
    ? `الاشتراك الشهري: ${monthlyAfter} ${symbol} / شهرياً (بدلاً من ${monthlyBefore}) ⚡ مرونة كاملة`
    : `Monthly VIP: ${monthlyAfter} ${symbol} / month (was ${monthlyBefore}) ⚡ Full Flexibility`;
  document.querySelectorAll('option[value="monthly"]').forEach(el => el.textContent = monthlyOptText);
}

function setCurrency(code) {
  if (!currenciesData[code]) code = 'SAR';
  currentCurrencyCode = code;
  localStorage.setItem('radar_selected_currency', code);

  updateCurrencyButton();
  renderDeals();
  calculateSavings();
  updateMembershipPricing();

  if (currentActiveDealKey && document.getElementById('deal-modal')?.classList.contains('active')) {
    openDealModal(currentActiveDealKey);
  }

  renderCurrenciesGrid();

  try {
    if (typeof CustomEvent !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('radarCurrencyChanged', { detail: { currency: getCurrentCurrency() } }));
    }
  } catch (e) {}
}

function selectCurrency(code) {
  setCurrency(code);
  closeModal('currency-modal');
  const c = getCurrentCurrency();
  const isAr = (currentLang === 'ar');
  const msg = isAr 
    ? `تم تغيير عملة العرض إلى ${c.flag} ${c.nameAr} (${c.code})` 
    : `Display currency switched to ${c.flag} ${c.nameEn} (${c.code})`;
  showToast(msg, c.flag);
}

function openCurrencyModal() {
  const modal = document.getElementById('currency-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const input = document.getElementById('currency-search-input');
    if (input) {
      input.value = '';
    }
    renderCurrenciesGrid();
  }
}

function closeCurrencyModal() {
  closeModal('currency-modal');
}

function filterCurrenciesList(query) {
  renderCurrenciesGrid(query);
}

function renderCurrenciesGrid(query = '') {
  const grid = document.getElementById('currency-grid');
  if (!grid) return;

  const isAr = (currentLang === 'ar');
  const q = query.trim().toLowerCase();

  const filtered = Object.values(currenciesData).filter(c => {
    if (!q) return true;
    return c.code.toLowerCase().includes(q) ||
           c.countryAr.toLowerCase().includes(q) ||
           c.countryEn.toLowerCase().includes(q) ||
           c.nameAr.toLowerCase().includes(q) ||
           c.nameEn.toLowerCase().includes(q) ||
           c.symbolAr.toLowerCase().includes(q) ||
           c.symbolEn.toLowerCase().includes(q);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: var(--text-dim);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">🔍 ${isAr ? 'لم يتم العثور على أي عملة مطابقة' : 'No matching currencies found'}</p>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${isAr ? 'يرجى تجربة البحث باسم الدولة أو كود العملة (مثل USD, درهم, KWD)...' : 'Try searching by country or 3-letter currency code (e.g. USD, EUR, AED)...'}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(c => {
    const isSelected = (c.code === currentCurrencyCode);
    const country = isAr ? c.countryAr : c.countryEn;
    const name = isAr ? c.nameAr : c.nameEn;
    const symbol = isAr ? c.symbolAr : c.symbolEn;

    return `
      <div class="currency-card-item ${isSelected ? 'active' : ''}" onclick="selectCurrency('${c.code}')">
        <div class="currency-card-flag">${c.flag}</div>
        <div class="currency-card-info">
          <div class="currency-card-top">
            <span class="currency-card-code">${c.code}</span>
            <span class="currency-card-symbol">${symbol}</span>
          </div>
          <div class="currency-card-name">${country} - ${name}</div>
        </div>
        ${isSelected ? '<span class="currency-card-check" style="color: var(--gold-accent); font-weight: bold; margin-inline-start: auto;">✓</span>' : ''}
      </div>
    `;
  }).join('');
}

window.setCurrency = setCurrency;
window.selectCurrency = selectCurrency;
window.openCurrencyModal = openCurrencyModal;
window.closeCurrencyModal = closeCurrencyModal;
window.filterCurrenciesList = filterCurrenciesList;

function initRadarApp() {
  if (window.location.pathname.endsWith('en.html') || window.location.search.includes('lang=en')) {
    currentLang = 'en';
  }
  setLanguage(currentLang);
  setTheme(currentTheme);
  setCurrency(currentCurrencyCode);
  initLiveClock();
  initReferralTracking();
  updateReferralUI();
  updateSubscriberUI();
  logAnalyticsEvent('page_view');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRadarApp);
} else {
  initRadarApp();
}

function openTermsModal() {
  const modal = document.getElementById('terms-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeTermsModal() {
  const modal = document.getElementById('terms-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.openTermsModal = openTermsModal;
window.closeTermsModal = closeTermsModal;

/* ==========================================================================
   16. Automated Subscriber Intake CRM & Webhook Engine
   ========================================================================== */
const SUBSCRIBERS_STORAGE_KEY = 'radar_subscribers_v1';
const WEBHOOK_STORAGE_KEY = 'radar_webhook_url';
const REFERRAL_CODE_KEY = 'radar_user_referral_code';
const REFERRAL_COUNT_KEY = 'radar_referral_count';
const ANALYTICS_STORAGE_KEY = 'radar_analytics_kpi';

const defaultSubscribersSeed = [
  { id: "sub_1", name: "عبدالله الشمري", phone: "+966501234567", email: "abdullah@example.com", tier: "vip_annual", referralCode: "RADAR-89102", referredBy: null, createdAt: "2026-09-20T10:30:00Z" },
  { id: "sub_2", name: "سارة القحطاني", phone: "+966559876543", email: "sara@example.com", tier: "vip_monthly", referralCode: "RADAR-43219", referredBy: "RADAR-89102", createdAt: "2026-09-20T14:15:00Z" },
  { id: "sub_3", name: "فهد الدوسري", phone: "+966567890123", email: "fahad@example.com", tier: "free", referralCode: "RADAR-77610", referredBy: null, createdAt: "2026-09-21T09:00:00Z" },
  { id: "sub_4", name: "نورة العتيبي", phone: "+966541122334", email: "noura@example.com", tier: "vip_annual", referralCode: "RADAR-11984", referredBy: "RADAR-43219", createdAt: "2026-09-21T11:45:00Z" },
  { id: "sub_5", name: "Alexander Wright", phone: "+971501122334", email: "alex@example.com", tier: "vip_monthly", referralCode: "RADAR-55421", referredBy: null, createdAt: "2026-09-21T16:20:00Z" }
];

function getSubscribers() {
  try {
    const raw = localStorage.getItem(SUBSCRIBERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(defaultSubscribersSeed));
      return defaultSubscribersSeed;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultSubscribersSeed;
  }
}

function saveSubscribers(subs) {
  try {
    localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(subs));
  } catch (e) {}
}

function generateReferralCode() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `RADAR-${num}`;
}

function registerSubscriber({ name, phone, email = '', tier = 'free' }) {
  const subs = getSubscribers();
  const referredBy = sessionStorage.getItem('radar_referred_by') || null;
  const newSub = {
    id: `sub_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: name.trim() || (currentLang === 'ar' ? 'مشترك جديد' : 'New Member'),
    phone: phone.trim(),
    email: email.trim(),
    tier: tier,
    referralCode: generateReferralCode(),
    referredBy: referredBy,
    createdAt: new Date().toISOString()
  };

  subs.unshift(newSub);
  saveSubscribers(subs);

  // If was referred, increment local milestone count
  if (referredBy) {
    incrementReferralMilestone();
  }

  // Analytics logging
  logAnalyticsEvent(tier === 'free' ? 'lead_captured_free' : 'lead_captured_vip', {
    phone: newSub.phone,
    tier: newSub.tier,
    referredBy: newSub.referredBy
  });

  // Dispatch Webhook (async)
  dispatchWebhook(newSub);

  return newSub;
}

function exportSubscribersCSV() {
  const subs = getSubscribers();
  const headers = ["ID", "Name", "Phone", "Email", "Tier", "ReferralCode", "ReferredBy", "CreatedAt"];
  const rows = subs.map(s => [
    `"${s.id}"`,
    `"${(s.name || '').replace(/"/g, '""')}"`,
    `"${(s.phone || '').replace(/"/g, '""')}"`,
    `"${(s.email || '').replace(/"/g, '""')}"`,
    `"${s.tier}"`,
    `"${s.referralCode}"`,
    `"${s.referredBy || ''}"`,
    `"${s.createdAt}"`
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `radar_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  showToast(currentLang === 'ar' ? 'تم تصدير ملف المشتركين بنجاح 📊' : 'Subscribers CSV exported successfully 📊', '✓');
}

function getWebhookUrl() {
  return localStorage.getItem(WEBHOOK_STORAGE_KEY) || '';
}

function saveAdminWebhook() {
  const input = document.getElementById('admin-webhook-url');
  if (!input) return;
  const url = input.value.trim();
  localStorage.setItem(WEBHOOK_STORAGE_KEY, url);
  showToast(currentLang === 'ar' ? 'تم حفظ رابط الويب هوك بنجاح 🔗' : 'Webhook endpoint saved successfully 🔗', '✓');
}

async function dispatchWebhook(payload) {
  const url = getWebhookUrl();
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'radar_web_app',
        event: 'subscriber_registered',
        data: payload,
        timestamp: new Date().toISOString()
      }),
      mode: 'no-cors'
    });
  } catch (err) {
    console.warn('Webhook dispatch skipped or offline:', err);
  }
}

async function testWebhookDispatch() {
  const url = getWebhookUrl();
  if (!url) {
    showToast(currentLang === 'ar' ? 'يرجى إدخال رابط الويب هوك وحفظه أولاً' : 'Please enter and save a webhook URL first', '⚠️');
    return;
  }
  showToast(currentLang === 'ar' ? 'جاري إرسال تجربة الويب هوك...' : 'Testing webhook dispatch...', '📡');
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'radar_web_app',
        event: 'test_ping',
        message: 'Radar Travel Webhook Connection Test Successful',
        timestamp: new Date().toISOString()
      }),
      mode: 'no-cors'
    });
    showToast(currentLang === 'ar' ? 'تم إرسال تجربة الويب هوك بنجاح ✅' : 'Webhook test dispatched successfully ✅', '✓');
  } catch (err) {
    showToast(currentLang === 'ar' ? 'فشل إرسال الويب هوك' : 'Webhook dispatch error', '✕');
  }
}

/* ==========================================================================
   17. Viral Referral Loop & Milestone Rewards Engine
   ========================================================================== */
function getMyReferralCode() {
  let code = localStorage.getItem(REFERRAL_CODE_KEY);
  if (!code) {
    code = generateReferralCode();
    localStorage.setItem(REFERRAL_CODE_KEY, code);
  }
  return code;
}

function initReferralTracking() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (ref && ref.trim()) {
    sessionStorage.setItem('radar_referred_by', ref.trim());
  }
}

function getReferralCount() {
  const count = parseInt(localStorage.getItem(REFERRAL_COUNT_KEY) || '0', 10);
  return count;
}

function incrementReferralMilestone() {
  let count = getReferralCount() + 1;
  localStorage.setItem(REFERRAL_COUNT_KEY, count.toString());
  updateReferralUI();
}

function updateReferralUI() {
  const codeEl = document.getElementById('web-user-ref-code');
  if (codeEl) {
    codeEl.textContent = getMyReferralCode();
  }

  const count = getReferralCount();
  const target = 3;
  const remaining = Math.max(0, target - count);
  const pct = Math.min(100, Math.round((count / target) * 100));

  const barEl = document.getElementById('web-ref-progress-bar');
  if (barEl) {
    barEl.style.width = `${pct}%`;
  }

  const pctEl = document.getElementById('web-ref-progress-pct');
  if (pctEl) {
    pctEl.textContent = `${pct}%`;
  }

  const textEl = document.getElementById('web-ref-progress-text');
  if (textEl) {
    const isAr = (currentLang === 'ar');
    if (count >= target) {
      textEl.textContent = isAr 
        ? "🎉 مبروك! حققت الهدف وحصلت على شهر VIP مجاني." 
        : "🎉 Goal achieved! 1 Free VIP Month unlocked.";
      textEl.style.color = "#34d399";
    } else {
      textEl.textContent = isAr 
        ? `المكتمل: ${count} من 3 دعوات (متبقي ${remaining})` 
        : `Completed: ${count} of 3 invites (${remaining} remaining)`;
      textEl.style.color = "var(--gold-light)";
    }
  }
}

function copyReferralLink() {
  const code = getMyReferralCode();
  const url = `${window.location.origin}${window.location.pathname}?ref=${code}`;
  navigator.clipboard.writeText(url).then(() => {
    const isAr = (currentLang === 'ar');
    showToast(isAr ? 'تم نسخ رابط الإحالة بنجاح 📋' : 'Referral link copied to clipboard 📋', '✓');
  }).catch(() => {
    prompt(currentLang === 'ar' ? 'انسخ رابط الإحالة الخاص بك:' : 'Copy your referral link:', url);
  });
}

function shareReferralWhatsApp() {
  const code = getMyReferralCode();
  const url = `${window.location.origin}${window.location.pathname}?ref=${code}`;
  const isAr = (currentLang === 'ar');

  let text = "";
  if (isAr) {
    text = `🚨 *اكتشفت منصة خرافية لأخطاء أسعار الفنادق والطيران!* ✈️\n\n` +
           `يرصدون خصومات سرية تصل 70% في فنادق 5 نجوم ومنتجعات العلا وجزر المالديف بدون وسيط.\n\n` +
           `🎁 سجّل من رابطي لتحصل على تنبيهات أخطاء التسعير الفورية:\n${url}\n\n` +
           `كود الدعوة الخاص بي: *${code}*`;
  } else {
    text = `🚨 *I just found this insane glitch fare & luxury deal radar!* ✈️\n\n` +
           `They track secret 70% loopholes on 5-star resorts, flight error rates, and luxury stays.\n\n` +
           `🎁 Join via my invite link for instant glitch alerts:\n${url}\n\n` +
           `My Invite Code: *${code}*`;
  }

  logAnalyticsEvent('referral_whatsapp_sent', { code });
  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

/* ==========================================================================
   18. Analytics & Secret Admin HUD Engine
   ========================================================================== */
function getAnalyticsKPI() {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!raw) {
      return { totalViews: 48, whatsappShares: 19, freeLeads: 8, vipLeads: 5 };
    }
    return JSON.parse(raw);
  } catch (e) {
    return { totalViews: 48, whatsappShares: 19, freeLeads: 8, vipLeads: 5 };
  }
}

function logAnalyticsEvent(eventName, params = {}) {
  const kpi = getAnalyticsKPI();
  if (eventName === 'deal_view') {
    kpi.totalViews = (kpi.totalViews || 0) + 1;
  } else if (eventName === 'deal_whatsapp_share') {
    kpi.whatsappShares = (kpi.whatsappShares || 0) + 1;
  } else if (eventName === 'lead_captured_free') {
    kpi.freeLeads = (kpi.freeLeads || 0) + 1;
  } else if (eventName === 'lead_captured_vip') {
    kpi.vipLeads = (kpi.vipLeads || 0) + 1;
  } else if (eventName === 'referral_whatsapp_sent') {
    kpi.whatsappShares = (kpi.whatsappShares || 0) + 1;
  }
  try {
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(kpi));
  } catch (e) {}
}

function openAdminHUD() {
  const modal = document.getElementById('admin-hud-modal');
  if (!modal) return;

  // Populate Webhook input
  const webhookInput = document.getElementById('admin-webhook-url');
  if (webhookInput) {
    webhookInput.value = getWebhookUrl();
  }

  // Populate KPI numbers
  const subs = getSubscribers();
  const kpi = getAnalyticsKPI();
  const vipCount = subs.filter(s => s.tier === 'vip_annual' || s.tier === 'vip_monthly' || s.tier === 'vip').length;

  const totalEl = document.getElementById('admin-kpi-total');
  const vipEl = document.getElementById('admin-kpi-vip');
  const viewsEl = document.getElementById('admin-kpi-views');
  const sharesEl = document.getElementById('admin-kpi-shares');

  if (totalEl) totalEl.textContent = subs.length;
  if (vipEl) vipEl.textContent = vipCount;
  if (viewsEl) viewsEl.textContent = kpi.totalViews || 0;
  if (sharesEl) sharesEl.textContent = kpi.whatsappShares || 0;

  // Render Subscribers Table
  renderAdminSubscribersTable();

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAdminHUD() {
  const modal = document.getElementById('admin-hud-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderAdminSubscribersTable() {
  const tbody = document.getElementById('admin-subscribers-tbody');
  if (!tbody) return;

  const subs = getSubscribers();
  const isAr = (currentLang === 'ar');

  if (subs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-dim);">${isAr ? 'لا يوجد مشتركون مسجلون حالياً' : 'No subscribers recorded yet'}</td></tr>`;
    return;
  }

  tbody.innerHTML = subs.map(s => {
    let tierBadge = "";
    if (s.tier === 'vip_annual') {
      tierBadge = `<span class="tag-tier vip">${isAr ? 'VIP سنوي 👑' : 'VIP Annual 👑'}</span>`;
    } else if (s.tier === 'vip_monthly' || s.tier === 'vip') {
      tierBadge = `<span class="tag-tier vip">${isAr ? 'VIP شهري ⚡' : 'VIP Monthly ⚡'}</span>`;
    } else {
      tierBadge = `<span class="tag-tier free">${isAr ? 'مجاني ⚡' : 'Free ⚡'}</span>`;
    }

    const dateStr = s.createdAt ? new Date(s.createdAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
    const refInfo = s.referredBy ? `<span style="font-family: monospace; color: var(--gold-accent);">${s.referralCode}</span> <span style="font-size: 0.72rem; color: var(--text-dim);">(${isAr ? 'عبر' : 'via'} ${s.referredBy})</span>` : `<span style="font-family: monospace; color: var(--gold-accent);">${s.referralCode}</span>`;

    return `
      <tr>
        <td style="font-weight: 600; color: #ffffff;">${s.name || '—'}</td>
        <td style="font-family: monospace; direction: ltr; text-align: ${isAr ? 'right' : 'left'};">${s.phone}</td>
        <td>${tierBadge}</td>
        <td>${refInfo}</td>
        <td style="font-size: 0.78rem; color: var(--text-dim);">${dateStr}</td>
      </tr>
    `;
  }).join('');
}

// Global Keyboard Shortcut: Ctrl+Shift+A or Cmd+Shift+A to toggle Admin HUD
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    const modal = document.getElementById('admin-hud-modal');
    if (modal && modal.classList.contains('active')) {
      closeAdminHUD();
    } else {
      openAdminHUD();
    }
  }
});

// Window exposures
window.openAdminHUD = openAdminHUD;
window.closeAdminHUD = closeAdminHUD;
window.exportSubscribersCSV = exportSubscribersCSV;
window.saveAdminWebhook = saveAdminWebhook;
window.testWebhookDispatch = testWebhookDispatch;
window.shareReferralWhatsApp = shareReferralWhatsApp;
window.copyReferralLink = copyReferralLink;
window.registerSubscriber = registerSubscriber;
window.logAnalyticsEvent = logAnalyticsEvent;
window.handleDealsLiveSearch = handleDealsLiveSearch;
window.clearDealsLiveSearch = clearDealsLiveSearch;
window.toggleDealsView = toggleDealsView;
window.scrollToTop = scrollToTop;
window.filterDeals = filterDeals;

