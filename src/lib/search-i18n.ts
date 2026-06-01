/**
 * Arabic to English lookup for the search box. Users frequently type a dish
 * or ingredient in Arabic (فلافل، حمص، طماطم). The recipe APIs we use
 * (TheMealDB and Forkify) only index English text, so we translate the
 * query before sending it. The map is small, hand-curated, and biased
 * toward Arabic-speaking users' actual search vocabulary.
 *
 * Matching is forgiving: we strip diacritics, normalize alif and ya
 * variants, lowercase the English fallback, and check for both whole-word
 * and substring hits.
 */

/**
 * Strip Arabic diacritics and unify the common letter variants that users
 * type interchangeably. Example: 'كرز' and 'كرز' (with shadda) both become
 * the same canonical form.
 */
function normalizeArabic(s: string): string {
  return s
    .replace(/[ً-ٰٟ]/g, '') // tashkeel
    .replace(/[أإآٱ]/g, 'ا') // various alif → bare alif
    .replace(/ة/g, 'ه') // ta marbuta → ha
    .replace(/[يى]/g, 'ي') // ya / alif maqsura → ya
    .replace(/\s+/g, ' ')
    .trim();
}

const RAW_AR_EN: Record<string, string> = {
  // ============ ARAB DISHES ============
  'فلافل': 'falafel',
  'فلافيل': 'falafel',
  'طعمية': 'falafel',
  'حمص': 'hummus',
  'حمّص': 'hummus',
  'حماس': 'hummus',
  'منسف': 'mansaf',
  'منصف': 'mansaf',
  'كبسة': 'kabsa',
  'كبسه': 'kabsa',
  'مقلوبة': 'maqluba',
  'مقلوبه': 'maqluba',
  'مغلوبه': 'maqluba',
  'كنافة': 'kunafa',
  'كنافه': 'kunafa',
  'كنفة': 'kunafa',
  'كنفه': 'kunafa',
  'بقلاوة': 'baklava',
  'بقلاوه': 'baklava',
  'شاورما': 'shawarma',
  'شورما': 'shawarma',
  'كباب': 'kebab',
  'طاجين': 'tagine',
  'طاجن': 'tagine',
  'طجين': 'tagine',
  'شكشوكة': 'shakshuka',
  'شكشوكه': 'shakshuka',
  'كشري': 'koshari',
  'كوشري': 'koshari',
  'مسخن': 'musakhan',
  'مفتول': 'maftoul',
  'مجدرة': 'mujadara',
  'مجدره': 'mujadara',
  'صيادية': 'sayadieh',
  'صياديه': 'sayadieh',
  'مسكوف': 'masgouf',
  'مناقيش': 'manakish',
  'مناقيش زعتر': 'manakish zaatar',
  'ملوخية': 'molokhia',
  'ملوخيه': 'molokhia',
  'تبولة': 'tabbouleh',
  'تبوله': 'tabbouleh',
  'فتوش': 'fattoush',
  'محشي': 'mahshi stuffed',
  'محاشي': 'mahshi',
  'ورق عنب': 'grape leaves dolma',
  'ورق دوالي': 'grape leaves dolma',
  'ورق عنبر': 'grape leaves',
  'يبرق': 'dolma',
  'معمول': 'maamoul',
  'قطايف': 'qatayef',
  'عوامة': 'awwama luqaimat',
  'لقيمات': 'luqaimat',
  'فطير': 'fateer',
  'بصبوسة': 'basbousa',
  'بصبوسه': 'basbousa',
  'زلابية': 'zalabia',
  'كنفه نابلسيه': 'kunafa nablus',
  'هريسة': 'harissa',
  'هريسه': 'harissa',
  'كباب حلبي': 'kebab',
  'كفتة': 'kofta',
  'كفته': 'kofta',
  'كبة': 'kibbeh',
  'كبه': 'kibbeh',
  'صفيحة': 'safiha sfiha',
  'لحم بعجين': 'lahm bi ajeen',
  'بابا غنوج': 'baba ghanoush eggplant',
  'متبل': 'mutabbal eggplant',
  'لبنة': 'labneh',
  'فول': 'foul fava beans',
  'فول مدمس': 'foul medames',
  'موسي': 'moussaka',

  // ============ WORLD DISHES ============
  'بيتزا': 'pizza',
  'باستا': 'pasta',
  'سباغيتي': 'spaghetti',
  'سباجيتي': 'spaghetti',
  'لازانيا': 'lasagna',
  'لازانية': 'lasagna',
  'سوشي': 'sushi',
  'سوشى': 'sushi',
  'رامن': 'ramen',
  'تمبورا': 'tempura',
  'برغر': 'burger',
  'بيرغر': 'burger',
  'سندويش': 'sandwich',
  'تاكو': 'taco',
  'تاكوس': 'tacos',
  'بوريتو': 'burrito',
  'كاري': 'curry',
  'بريانى': 'biryani',
  'برياني': 'biryani',
  'نان': 'naan',
  'نودلز': 'noodles',
  'كروسون': 'croissant',
  'كرواسون': 'croissant',
  'كيكة': 'cake',
  'كيك': 'cake',
  'تشيز كيك': 'cheesecake',
  'تيراميسو': 'tiramisu',
  'بانكيك': 'pancake',
  'وافل': 'waffle',
  'دونات': 'donut',
  'كوكيز': 'cookies',

  // ============ CATEGORIES AND PROTEINS ============
  'دجاج': 'chicken',
  'دجاجة': 'chicken',
  'فروج': 'chicken',
  'لحم': 'beef',
  'لحمة': 'beef',
  'بقر': 'beef',
  'لحم بقر': 'beef',
  'خروف': 'lamb',
  'لحم خروف': 'lamb',
  'ضأن': 'lamb',
  'غنم': 'lamb',
  'سمك': 'fish',
  'حوت': 'fish',
  'تونة': 'tuna',
  'تونه': 'tuna',
  'سلمون': 'salmon',
  'روبيان': 'shrimp',
  'جمبري': 'shrimp',
  'قريدس': 'shrimp',
  'بط': 'duck',
  'ديك': 'rooster',
  'ديك رومي': 'turkey',
  'حبش': 'turkey',
  'أرز': 'rice',
  'ارز': 'rice',
  'رز': 'rice',
  'برغل': 'bulgur',
  'فريكة': 'freekeh',
  'فريكه': 'freekeh',
  'معكرونة': 'pasta',
  'معكرونه': 'pasta',
  'خضار': 'vegetables',
  'خضرة': 'vegetables',
  'فواكه': 'fruit',
  'حلويات': 'dessert',
  'حلى': 'dessert',
  'حلويه': 'dessert',
  'فطور': 'breakfast',
  'افطار': 'breakfast',
  'إفطار': 'breakfast',
  'عشاء': 'dinner',
  'غداء': 'lunch',
  'مشروبات': 'drinks beverage',
  'عصير': 'juice',
  'قهوة': 'coffee',
  'قهوه': 'coffee',
  'شاي': 'tea',
  'شوربة': 'soup',
  'شوربه': 'soup',
  'سلطة': 'salad',
  'سلطه': 'salad',
  'خبز': 'bread',
  'مقبلات': 'starter appetizer',
  'مازة': 'mezze appetizer',
  'مازه': 'mezze',

  // ============ INGREDIENTS ============
  'طماطم': 'tomato',
  'بندورة': 'tomato',
  'بندوره': 'tomato',
  'بصل': 'onion',
  'ثوم': 'garlic',
  'زيتون': 'olive',
  'ليمون': 'lemon',
  'لومي': 'dried lime',
  'بقدونس': 'parsley',
  'نعنع': 'mint',
  'كزبرة': 'cilantro coriander',
  'كزبره': 'cilantro coriander',
  'زعتر': 'thyme zaatar',
  'سماق': 'sumac',
  'كركم': 'turmeric',
  'زنجبيل': 'ginger',
  'هيل': 'cardamom',
  'حبهان': 'cardamom',
  'قرفة': 'cinnamon',
  'قرفه': 'cinnamon',
  'قرنفل': 'clove',
  'بهارات': 'spices',
  'زبدة': 'butter',
  'زبده': 'butter',
  'زيت': 'oil',
  'زيت زيتون': 'olive oil',
  'سمنة': 'ghee',
  'سمنه': 'ghee',
  'ملح': 'salt',
  'فلفل': 'pepper chili',
  'فلفل حار': 'chili pepper',
  'فلفل أحمر': 'red pepper',
  'فلفل اخضر': 'green pepper',
  'بطاطا': 'potato',
  'بطاطس': 'potato',
  'جزر': 'carrot',
  'كوسا': 'zucchini',
  'كوسه': 'zucchini',
  'كوسة': 'zucchini',
  'باذنجان': 'eggplant aubergine',
  'باذنجانه': 'eggplant',
  'قرنبيط': 'cauliflower',
  'زهرة': 'cauliflower',
  'ملفوف': 'cabbage',
  'سبانخ': 'spinach',
  'خس': 'lettuce',
  'خيار': 'cucumber',
  'فجل': 'radish',
  'شمندر': 'beetroot',
  'فطر': 'mushroom',
  'فول مصبح': 'fava beans',
  'فاصوليا': 'beans',
  'بازيلاء': 'peas',
  'عدس': 'lentils',
  'حمص حب': 'chickpeas',
  'برتقال': 'orange',
  'تفاح': 'apple',
  'موز': 'banana',
  'فراولة': 'strawberry',
  'فراوله': 'strawberry',
  'عنب': 'grape',
  'تمر': 'date',
  'تمور': 'dates',
  'لوز': 'almond',
  'جوز': 'walnut',
  'فستق': 'pistachio',
  'صنوبر': 'pine nuts',
  'بندق': 'hazelnut',
  'كاجو': 'cashew',
  'سمسم': 'sesame',
  'طحينة': 'tahini',
  'طحينه': 'tahini',
  'حليب': 'milk',
  'لبن': 'yogurt milk',
  'زبادي': 'yogurt',
  'لبنه': 'labneh',
  'جبنة': 'cheese',
  'جبنه': 'cheese',
  'موزاريلا': 'mozzarella',
  'فيتا': 'feta',
  'حلوم': 'halloumi',
  'كاسات': 'parmesan',
  'بارميزان': 'parmesan',
  'بيض': 'egg',
  'بيضة': 'egg',
  'دقيق': 'flour',
  'سكر': 'sugar',
  'عسل': 'honey',
  'دبس رمان': 'pomegranate molasses',
  'دبس': 'molasses',
  'ماء ورد': 'rose water',
  'ماء زهر': 'orange blossom',

  // ============ CUISINES ============
  'إيطالي': 'italian',
  'ايطالي': 'italian',
  'فرنسي': 'french',
  'ياباني': 'japanese',
  'صيني': 'chinese',
  'هندي': 'indian',
  'مكسيكي': 'mexican',
  'يوناني': 'greek',
  'مغربي': 'moroccan',
  'تركي': 'turkish',
  'عربي': 'arab',
  'لبناني': 'lebanese',
  'شامي': 'levantine',
  'سوري': 'syrian',
  'مصري': 'egyptian',
  'سعودي': 'saudi',
  'أردني': 'jordanian',
  'اردني': 'jordanian',
  'فلسطيني': 'palestinian',
  'يمني': 'yemeni',
  'عراقي': 'iraqi',
  'تونسي': 'tunisian',
  'جزائري': 'algerian',
  'إسباني': 'spanish',
  'اسباني': 'spanish',
  'برتغالي': 'portuguese',
  'كوري': 'korean',
  'تايلندي': 'thai',
  'فيتنامي': 'vietnamese',
  'أمريكي': 'american',
  'امريكي': 'american',
  'بريطاني': 'british',
  'ألماني': 'german',

  // ============ COOKING METHODS ============
  'مشوي': 'grilled',
  'مقلي': 'fried',
  'مخبوز': 'baked',
  'مسلوق': 'boiled',
  'محمر': 'roasted',
  'محمص': 'toasted',
  'سوتيه': 'sauteed',
  'بخار': 'steamed',
};

// Precompute a normalized version of the dictionary so lookup is fast and
// tolerant to small spelling variations.
const NORMALIZED_AR_EN: Record<string, string> = {};
for (const [k, v] of Object.entries(RAW_AR_EN)) {
  NORMALIZED_AR_EN[normalizeArabic(k)] = v;
}

// English synonyms. Useful when British, American, and Australian users
// type the same ingredient under different names. We expand the query at
// search time, not at the API call, so the user can still type either form.
const ENGLISH_SYNONYMS: Record<string, string> = {
  aubergine: 'eggplant',
  eggplant: 'aubergine',
  courgette: 'zucchini',
  zucchini: 'courgette',
  cilantro: 'coriander',
  coriander: 'cilantro',
  chickpea: 'garbanzo',
  garbanzo: 'chickpea',
  chickpeas: 'garbanzo chickpeas',
  prawn: 'shrimp',
  prawns: 'shrimp',
  shrimp: 'prawn',
  mince: 'ground beef',
  'minced beef': 'ground beef',
  capsicum: 'bell pepper',
  rocket: 'arugula',
  arugula: 'rocket',
  swede: 'rutabaga',
  beetroot: 'beet',
  spring: 'scallion',
  scallion: 'spring onion',
  'spring onion': 'scallion',
  yogurt: 'yoghurt',
  yoghurt: 'yogurt',
  candy: 'sweets',
  sweets: 'candy',
  cookies: 'biscuits',
  biscuits: 'cookies',
  fries: 'chips',
  crisps: 'chips',
  soda: 'pop fizzy drink',
  pop: 'soda',
};

export function expandEnglishSynonyms(s: string): string {
  if (!s) return s;
  const lower = s.toLowerCase().trim();
  if (ENGLISH_SYNONYMS[lower]) return `${s} ${ENGLISH_SYNONYMS[lower]}`;
  // Word-level expansion
  const words = lower.split(/\s+/);
  const extras: string[] = [];
  for (const w of words) {
    if (ENGLISH_SYNONYMS[w]) extras.push(ENGLISH_SYNONYMS[w]);
  }
  if (extras.length === 0) return s;
  return `${s} ${extras.join(' ')}`;
}

const ARABIC_RE = /[؀-ۿ]/;

export function containsArabic(s: string): boolean {
  return ARABIC_RE.test(s);
}

/**
 * Translate a user query into English search terms when it is Arabic or
 * mixed. Tries whole-string match first; otherwise translates word by word.
 * Words without an Arabic mapping are kept as-is, so an English word inside
 * an Arabic phrase still survives.
 */
export function translateQuery(raw: string): string {
  if (!raw || !containsArabic(raw)) return raw;
  const norm = normalizeArabic(raw);

  // Whole-string hit (handles multi-word entries like "ورق عنب").
  if (NORMALIZED_AR_EN[norm]) return NORMALIZED_AR_EN[norm];

  // Word-by-word fallback. Combine adjacent translated words.
  const words = norm.split(' ');
  const out: string[] = [];
  let i = 0;
  while (i < words.length) {
    // Try longest match starting at i (up to 3 words).
    let matched = false;
    for (let len = Math.min(3, words.length - i); len >= 1; len--) {
      const phrase = words.slice(i, i + len).join(' ');
      const en = NORMALIZED_AR_EN[phrase];
      if (en) {
        out.push(en);
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Word has no translation; keep it but it likely will not match the
      // English-indexed API. We still keep it so the user can see what got
      // through to the API.
      out.push(words[i]);
      i += 1;
    }
  }
  return out.join(' ').trim();
}

/**
 * For UI display: tell the user we translated their Arabic into English so
 * the search box does not feel like it ignored what they typed.
 */
export function translationLabel(raw: string): string | null {
  if (!containsArabic(raw)) return null;
  const translated = translateQuery(raw);
  if (translated.toLowerCase() === raw.toLowerCase()) return null;
  return translated;
}
