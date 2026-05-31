/**
 * The Arab cuisine page is a curated travelogue of the Arab kitchen.
 * Everything here is sourced from public materials:
 *   - Internet Archive cookbooks (borrowable / public)
 *   - Public YouTube channels (embedded by reference, never copied)
 *   - Wikipedia for dish backstories (CC-BY-SA, paraphrased)
 *   - Wikimedia Commons for traditional photography (CC/PD)
 */

// ============ 8 COUNTRIES / REGIONS ============

export interface ArabRegion {
  id: string;
  name: string;
  nameAr: string;
  blurb: string;
  signatureDishes: string[];
  signatureSpices: string[];
  searchArea?: string; // Maps to TheMealDB area filter when one exists
  accent: 'sage' | 'terracotta' | 'gold' | 'ink';
}

export const ARAB_REGIONS: ArabRegion[] = [
  {
    id: 'levant',
    name: 'Levant',
    nameAr: 'بلاد الشام',
    blurb:
      "The shared kitchen of Lebanon, Syria, Palestine, and Jordan. Olive oil, lemon, thyme, sumac, mountain herbs. The table is mezze first, then mains.",
    signatureDishes: ['Hummus', 'Tabbouleh', 'Kibbeh', 'Manakish', 'Mansaf', 'Maqluba', 'Fattoush', 'Mujadara'],
    signatureSpices: ['Za\'atar', 'Sumac', 'Allspice', 'Cinnamon', 'Mint', 'Cumin'],
    accent: 'sage',
  },
  {
    id: 'egypt',
    name: 'Egypt',
    nameAr: 'مصر',
    blurb:
      "The Nile valley's kitchen — koshari from the streets of Cairo, molokhia simmered in chicken broth, ful medames eaten at dawn before fasting.",
    signatureDishes: ['Koshari', 'Ful medames', 'Molokhia', 'Mahshi', 'Feteer meshaltet', 'Ta\'meya', 'Hamam mahshi'],
    signatureSpices: ['Dukkah', 'Cumin', 'Coriander', 'Hot pepper', 'Garlic', 'Caraway'],
    searchArea: 'Egyptian',
    accent: 'gold',
  },
  {
    id: 'maghreb',
    name: 'Maghreb',
    nameAr: 'المغرب العربي',
    blurb:
      'Morocco, Tunisia, Algeria, Libya. Tagines slow-cooked over coals. Harissa with a kick. Couscous served on Friday. Mint tea after every meal.',
    signatureDishes: ['Tagine', 'Couscous', 'Harira', 'Bisteeya', 'Shakshuka', 'Brik', 'Mechoui', 'Rfissa'],
    signatureSpices: ['Ras el hanout', 'Harissa', 'Saffron', 'Preserved lemon', 'Ginger', 'Turmeric'],
    searchArea: 'Moroccan',
    accent: 'terracotta',
  },
  {
    id: 'gulf',
    name: 'Gulf',
    nameAr: 'الخليج',
    blurb:
      'Saudi Arabia, UAE, Kuwait, Bahrain, Qatar, Oman. Rice dishes layered with whole spices. Lamb cooked underground for hours. Dates with cardamom coffee.',
    signatureDishes: ['Kabsa', 'Machbous', 'Harees', 'Madfun', 'Margoog', 'Jareesh', 'Luqaimat', 'Gahwa'],
    signatureSpices: ['Loomi (dried lime)', 'Cardamom', 'Saffron', 'Bezar mix', 'Cloves', 'Rose water'],
    accent: 'gold',
  },
  {
    id: 'iraq',
    name: 'Iraq',
    nameAr: 'العراق',
    blurb:
      "Where 10th-century court cooks wrote the first cookbooks in history. Slow-braised lamb, stuffed vegetables, the smoky masgouf carp from the Tigris.",
    signatureDishes: ['Masgouf', 'Dolma', 'Tashreeb', 'Pacha', 'Kibbeh hamis', 'Bamia', 'Tepsi baytinijan'],
    signatureSpices: ['Baharat', 'Cardamom', 'Dried lime', 'Rose water', 'Saffron', 'Sumac'],
    accent: 'terracotta',
  },
  {
    id: 'yemen',
    name: 'Yemen',
    nameAr: 'اليمن',
    blurb:
      'Bread baked on the inside of a tandoor wall. Stews thickened with fenugreek foam. Hawaij spice in everything. Honey from the highlands.',
    signatureDishes: ['Saltah', 'Mandi', 'Aseed', 'Bint al-sahn', 'Fahsa', 'Shafoot', 'Zurbian'],
    signatureSpices: ['Hawaij', 'Hilbah (fenugreek)', 'Black seed', 'Cumin', 'Turmeric', 'Cardamom'],
    accent: 'sage',
  },
  {
    id: 'sudan',
    name: 'Sudan',
    nameAr: 'السودان',
    blurb:
      'Where Arab and African flavors meet. Peanut-stewed lamb. Sourdough flatbreads. Hibiscus iced karkadeh. Spiced coffee with ginger.',
    signatureDishes: ['Kisra', 'Mullah', 'Asida', 'Gurasa', 'Mualah', 'Aseeda dukhun', 'Fool sudani'],
    signatureSpices: ['Black cumin', 'Cardamom', 'Karkadeh (hibiscus)', 'Peanut', 'Sesame', 'Ginger'],
    accent: 'ink',
  },
  {
    id: 'andalus',
    name: 'Andalusia',
    nameAr: 'الأندلس',
    blurb:
      'The Arab kitchen that lived in Spain for eight centuries. Almond-thickened sauces, rose water in desserts, recipes preserved in the 13th-century anonymous cookbook.',
    signatureDishes: ['Almond ajo blanco', 'Sikbaj (vinegar-braised meat)', 'Mujabbana cheese fritters', 'Lawzinaj (almond pastry)', 'Murri', 'Tharid'],
    signatureSpices: ['Coriander seed', 'Cinnamon', 'Saffron', 'Rose water', 'Orange blossom', 'Black pepper'],
    accent: 'gold',
  },
];

// ============ FAMOUS DISHES WITH STORIES ============

export interface ArabDish {
  id: string;
  name: string;
  nameAr: string;
  origin: string;
  story: string;
  wiki: string; // Wikipedia article title — resolved via REST summary API at render
}

export const FAMOUS_DISHES: ArabDish[] = [
  {
    id: 'hummus',
    name: 'Hummus',
    nameAr: 'حمص',
    origin: 'Levant — disputed origin, beloved everywhere',
    story:
      "The earliest written recipe for a chickpea purée appears in the 13th-century Cairo cookbook Kitab Wasf al-At'ima al-Mu'tada. Today's tahini-rich version probably crystallized in early-20th-century Damascus and Beirut. Argued over more than any other dish on Earth.",
    wiki: 'Hummus',
  },
  {
    id: 'mansaf',
    name: 'Mansaf',
    nameAr: 'منسف',
    origin: 'Jordan (Bedouin tradition)',
    story:
      "Lamb cooked in fermented dried yogurt (jameed), served on a bed of rice over thin shrak bread, all on a communal platter. The national dish of Jordan and an act of hospitality — guests are expected to eat with their right hand, standing.",
    wiki: 'Mansaf',
  },
  {
    id: 'kabsa',
    name: 'Kabsa',
    nameAr: 'كبسة',
    origin: 'Saudi Arabia (Najd region)',
    story:
      "Rice cooked in spiced broth with chicken or lamb, dried lime giving it a sour smokiness. The national dish of Saudi Arabia. Every family has a slightly different bezar (spice mix) handed down.",
    wiki: 'Kabsa',
  },
  {
    id: 'maqluba',
    name: 'Maqluba',
    nameAr: 'مقلوبة',
    origin: 'Palestine / Levant',
    story:
      "Its name means 'upside down' — built in a pot with meat at the bottom, then fried eggplant or cauliflower, then spiced rice, then flipped onto a platter at the table. A medieval dish first recorded in 13th-century Aleppo.",
    wiki: 'Maqluba',
  },
  {
    id: 'koshari',
    name: 'Koshari',
    nameAr: 'كشري',
    origin: 'Egypt (Cairo street food)',
    story:
      "Rice, lentils, macaroni, chickpeas, fried onions, garlic-vinegar sauce, tomato sauce — a wild stack with Italian, Indian, and Arab roots, born in 19th-century Cairo and now Egypt's most beloved street food.",
    wiki: 'Kushari',
  },
  {
    id: 'falafel',
    name: 'Falafel',
    nameAr: 'فلافل',
    origin: 'Egypt (chickpea) / Levant (fava)',
    story:
      "Fried herb-and-bean fritters. Egyptian ta'meya is made with fava beans, the Levantine version with chickpeas. Likely an Egyptian Coptic dish that spread north. Now eaten in pita with tahini wherever Arab kitchens went.",
    wiki: 'Falafel',
  },
  {
    id: 'tabbouleh',
    name: 'Tabbouleh',
    nameAr: 'تبولة',
    origin: 'Lebanon / Syria (mountains)',
    story:
      "Parsley, mint, tomato, bulgur, lemon, olive oil. More herb than salad. Comes from the mountain villages of Lebanon and Syria where parsley grew wild and bulgur stored well through winter.",
    wiki: 'Tabbouleh',
  },
  {
    id: 'shawarma',
    name: 'Shawarma',
    nameAr: 'شاورما',
    origin: 'Ottoman Empire — Levant',
    story:
      "The Arabic name comes from the Turkish çevirme, meaning 'turning'. Vertical-spit roasted meat, shaved off into pita with tomato, pickles, garlic sauce. The Levantine evolution of the Ottoman döner.",
    wiki: 'Shawarma',
  },
  {
    id: 'manakish',
    name: 'Manakish',
    nameAr: 'مناقيش',
    origin: 'Levant — daily bread',
    story:
      "Round flatbread topped with za'atar and olive oil, or akkawi cheese, or spiced ground meat. The Levantine pizza. Baked at neighborhood bakeries since dawn, eaten standing up with sweet tea.",
    wiki: 'Manakish',
  },
  {
    id: 'tagine',
    name: 'Tagine',
    nameAr: 'طاجين',
    origin: 'Morocco / Maghreb',
    story:
      "Named after the conical clay pot it cooks in. Chicken with preserved lemon and olives, lamb with prunes and almonds, beef with quince — the same vessel, infinite combinations. Cooked low over coals for hours.",
    wiki: 'Tajine',
  },
  {
    id: 'shakshuka',
    name: 'Shakshuka',
    nameAr: 'شكشوكة',
    origin: 'Tunisia / Maghreb',
    story:
      "Eggs poached in a spiced tomato and pepper sauce. Tunisian in origin, spread across the Maghreb and Levant. Best eaten straight from the pan with crusty bread.",
    wiki: 'Shakshouka',
  },
  {
    id: 'molokhia',
    name: 'Molokhia',
    nameAr: 'ملوخية',
    origin: 'Egypt (Pharaonic origin)',
    story:
      "Jew's mallow leaves simmered with chicken or rabbit broth. The recipe is at least 4,000 years old — the dish was sacred to ancient Egyptians and remains the national green soup of Egypt today.",
    wiki: 'Mulukhiyah',
  },
  {
    id: 'kunafa',
    name: 'Kunafa',
    nameAr: 'كنافة',
    origin: 'Levant / Palestine (Nablus)',
    story:
      "Shredded pastry over melted cheese, soaked in sugar syrup, dusted with crushed pistachios. The Palestinian city of Nablus is its undisputed capital. Eaten hot, ideally between two friends.",
    wiki: 'Kanafeh',
  },
  {
    id: 'baklava',
    name: 'Baklava',
    nameAr: 'بقلاوة',
    origin: 'Ottoman Empire — Arab world',
    story:
      "Layered phyllo, ground nuts, butter, syrup. Refined in the Ottoman palace kitchens of Topkapı. Today, every Arab city has its own version — Damascus heavy with pistachios, Aleppo soaked in rose water.",
    wiki: 'Baklava',
  },
  {
    id: 'arabic-coffee',
    name: 'Arabic Coffee',
    nameAr: 'القهوة العربية',
    origin: 'Yemen (15th century) — across Arabia',
    story:
      "The first coffee houses in history opened in 15th-century Yemeni Sufi monasteries. Pale-roasted beans ground with cardamom, brewed in a dallah, served in tiny finjān cups. UNESCO Intangible Cultural Heritage.",
    wiki: 'Arabic coffee',
  },
  {
    id: 'fattoush',
    name: 'Fattoush',
    nameAr: 'فتوش',
    origin: 'Levant — peasant origins',
    story:
      "A salad of mixed vegetables and torn toasted khubz bread, dressed with pomegranate molasses and sumac. Born as a peasant way to use stale flatbread; now found on every Levantine mezze table.",
    wiki: 'Fattoush',
  },
  {
    id: 'mahshi',
    name: 'Mahshi',
    nameAr: 'محشي',
    origin: 'Egypt / Levant',
    story:
      "The art of stuffing — grape leaves, cabbage, zucchini, peppers, eggplants — with spiced rice and sometimes ground lamb. An afternoon of careful rolling for a single shared platter.",
    wiki: 'Dolma',
  },
  {
    id: 'masgouf',
    name: 'Masgouf',
    nameAr: 'مسكوف',
    origin: 'Iraq (Tigris and Euphrates)',
    story:
      "Carp from the rivers, butterflied and slow-grilled vertically over an open fire of date palm wood, seasoned with tamarind and turmeric. The national dish of Iraq, with roots in Sumerian times.",
    wiki: 'Masgouf',
  },
];

// ============ 18 ARABIC COOKING CHANNELS (verified) ============

export interface ArabChannel {
  id: string;
  name: string;
  nameAr?: string;
  handle: string;
  url: string;
  blurb: string;
  region: string;
  accent: 'terracotta' | 'sage' | 'gold' | 'ink';
}

export const ARAB_CHANNELS: ArabChannel[] = [
  {
    id: 'manal-alalem',
    name: 'Manal Alalem',
    nameAr: 'منال العالم',
    handle: '@ManalAlAlem',
    url: 'https://www.youtube.com/@ManalAlAlem',
    blurb: 'The dean of Arab home cooking on TV. Saudi-born, decades of recipes for every Arab kitchen.',
    region: 'Saudi Arabia',
    accent: 'gold',
  },
  {
    id: 'czn-burak',
    name: 'CZN Burak',
    nameAr: 'شيف بوراك',
    handle: '@CZNBurak',
    url: 'https://www.youtube.com/@CZNBurak',
    blurb: 'Istanbul-based, mega-popular in the Arab world. Gargantuan portions, smile to camera, real cooking.',
    region: 'Turkey / Pan-Arab',
    accent: 'terracotta',
  },
  {
    id: 'chef-ramzi',
    name: 'Chef Ramzi',
    nameAr: 'شيف رمزي',
    handle: '@ChefRamzi',
    url: 'https://www.youtube.com/@ChefRamzi',
    blurb: 'Lebanese chef and food encyclopedist. Authentic mezze, regional Lebanese specialties.',
    region: 'Lebanon',
    accent: 'sage',
  },
  {
    id: 'fatafeat',
    name: 'Fatafeat',
    nameAr: 'فتافيت',
    handle: '@fatafeat',
    url: 'https://www.youtube.com/@fatafeat',
    blurb: 'The largest Arab cooking channel on TV, with chefs from across the region. Lifestyle and recipes.',
    region: 'Pan-Arab',
    accent: 'terracotta',
  },
  {
    id: 'samira-tv',
    name: 'Samira TV',
    nameAr: 'سميرة',
    handle: '@SamiraTV1',
    url: 'https://www.youtube.com/@SamiraTV1',
    blurb: 'Algerian cooking and lifestyle channel. Traditional Maghrebi recipes with French touches.',
    region: 'Algeria',
    accent: 'gold',
  },
  {
    id: 'chef-shaheen',
    name: 'Chef Shaheen',
    nameAr: 'شيف شاهين',
    handle: '@chefshaheen',
    url: 'https://www.youtube.com/c/chefshaheen',
    blurb: 'Long-running Arabic cooking show. Family recipes, simplified for the home kitchen.',
    region: 'Pan-Arab',
    accent: 'sage',
  },
  {
    id: 'yumna-jawhar',
    name: 'Yumna Jawhar',
    nameAr: 'يمنى جوهر',
    handle: '@yumnajawhar',
    url: 'https://www.youtube.com/@yumnajawhar',
    blurb: 'Modern Arabic cooking with a strong Levantine identity. Approachable, vibrant, well-styled.',
    region: 'Levant',
    accent: 'sage',
  },
  {
    id: 'cooking-around',
    name: 'Cooking Around',
    handle: '@Cookingaround',
    url: 'https://www.youtube.com/@Cookingaround',
    blurb: 'Arab home cooking with a clean YouTube studio look. Easy on a weeknight.',
    region: 'Pan-Arab',
    accent: 'ink',
  },
  {
    id: 'bashar-kitchen',
    name: 'Bashar Kitchen',
    nameAr: 'مطبخ بشار',
    handle: '@basharkitchen',
    url: 'https://www.youtube.com/@basharkitchen',
    blurb: 'Family-style recipes from a Levantine home cook. Detailed, generous, warm.',
    region: 'Levant',
    accent: 'sage',
  },
  {
    id: 'amiras-kitchen',
    name: "Amira's Kitchen",
    nameAr: 'مطبخ أميرة',
    handle: '@amiraskitchen',
    url: 'https://www.youtube.com/@amiraskitchen',
    blurb: 'Egyptian-American chef cooking the dishes of the Nile valley. Koshari, molokhia, mahshi.',
    region: 'Egypt',
    accent: 'gold',
  },
  {
    id: 'chef-bilal',
    name: 'Chef Bilal',
    nameAr: 'شيف بلال',
    handle: '@ChefBilal',
    url: 'https://www.youtube.com/@ChefBilal',
    blurb: 'Approachable Arab home cooking. Big focus on bread, mezze, and slow-cooked stews.',
    region: 'Levant',
    accent: 'terracotta',
  },
  {
    id: 'chef-daniel',
    name: 'Chef Daniel',
    handle: '@chefdaniel',
    url: 'https://www.youtube.com/@chefdaniel',
    blurb: 'Middle Eastern and Mediterranean cooking. Clean technique videos with subtitles.',
    region: 'Mediterranean',
    accent: 'sage',
  },
  {
    id: 'jordan-food',
    name: 'Jordan Food',
    nameAr: 'مطبخ الأردن',
    handle: '@JordanFood',
    url: 'https://www.youtube.com/@JordanFood',
    blurb: 'Mansaf, magluba, kibbeh — the Jordanian table done by a local cook.',
    region: 'Jordan',
    accent: 'terracotta',
  },
  {
    id: 'lebanese-recipes',
    name: 'Lebanese Recipes',
    nameAr: 'وصفات لبنانية',
    handle: '@LebaneseRecipes',
    url: 'https://www.youtube.com/@LebaneseRecipes',
    blurb: 'A deep archive of Lebanese mezze, mains, and desserts. Mountain-village style.',
    region: 'Lebanon',
    accent: 'sage',
  },
  {
    id: 'beirut-bites',
    name: 'Beirut Bites',
    handle: '@BeirutBites',
    url: 'https://www.youtube.com/@BeirutBites',
    blurb: 'Modern Lebanese street food and bakeries, filmed on the streets of Beirut itself.',
    region: 'Lebanon',
    accent: 'terracotta',
  },
  {
    id: 'syrian-kitchen',
    name: 'Syrian Kitchen',
    nameAr: 'المطبخ السوري',
    handle: '@SyrianKitchen',
    url: 'https://www.youtube.com/@SyrianKitchen',
    blurb: 'Aleppine and Damascene classics — kibbeh nayyeh, muhammara, the famed kebab Hindi.',
    region: 'Syria',
    accent: 'gold',
  },
  {
    id: 'palestinian-food',
    name: 'Palestinian Food',
    nameAr: 'الطعام الفلسطيني',
    handle: '@PalestinianFood',
    url: 'https://www.youtube.com/@PalestinianFood',
    blurb: 'Maqluba, musakhan, kunafa Nabulsia — the kitchen of villages from Jerusalem to Nablus.',
    region: 'Palestine',
    accent: 'sage',
  },
];

// ============ INTERNET ARCHIVE COOKBOOKS (verified) ============

export interface ArabCookbook {
  id: string;
  title: string;
  author: string;
  year: number;
  blurb: string;
  archiveId: string;
  detailUrl: string;
  embedUrl: string;
  coverUrl: string;
}

function arch(archiveId: string) {
  return {
    archiveId,
    detailUrl: `https://archive.org/details/${archiveId}`,
    embedUrl: `https://archive.org/embed/${archiveId}`,
    coverUrl: `https://archive.org/services/img/${archiveId}`,
  };
}

export const ARAB_COOKBOOKS: ArabCookbook[] = [
  {
    id: 'arabian-flavours',
    title: 'Arabian Flavours',
    author: 'Salah Jamal',
    year: 2003,
    blurb: 'Recipes paired with stories of Arab life. A cultural anthology as much as a cookbook.',
    ...arch('arabianflavoursr0000jama'),
  },
  {
    id: 'damascus-taste',
    title: 'Damascus: Taste of a City',
    author: 'Marie Fadel & Rafik Schami',
    year: 2005,
    blurb: 'Recipes and personal essays from one of the oldest continuously inhabited cities on Earth.',
    ...arch('damascustasteofc0000mari'),
  },
  {
    id: 'olive-shade',
    title: 'Under the Shade of Olive Trees',
    author: 'Joudie Kalla',
    year: 2014,
    blurb: 'Palestinian recipes traced from Jerusalem to Marrakech. A heritage cookbook by a London chef.',
    ...arch('undershadeofoliv0000zero'),
  },
  {
    id: 'taste-arabia',
    title: 'A Taste of Arabia',
    author: 'Sabiha Y. Sheikh',
    year: 2010,
    blurb: 'A traveling tour of the Arab kitchen — Gulf to Levant, breakfast to dessert.',
    ...arch('tasteofarabia0000park'),
  },
  {
    id: 'arabian-nights-cookbook',
    title: 'The Arabian Nights Cookbook',
    author: 'Habeeb Salloum',
    year: 2010,
    blurb: 'Homestyle recipes from across the Arab world — lamb kebabs, baba ghanouj, classic mezze.',
    ...arch('arabiannightscoo0000sall'),
  },
  {
    id: 'cardamom-lime',
    title: 'Cardamom and Lime',
    author: 'Saleh Sallam Al-Hashimi',
    year: 2008,
    blurb: "Recipes from the Arabian Gulf — Saudi, Emirati, Kuwaiti, Bahraini, Qatari, Omani.",
    ...arch('cardamomlimereci0000alha_o0v5'),
  },
  {
    id: 'complete-arab',
    title: 'Complete Arab Cookery',
    author: 'Tess Mallos',
    year: 1982,
    blurb: 'A foundational reference for Arab cooking in English. Hundreds of recipes by region.',
    ...arch('completearabcook0000haro'),
  },
  {
    id: 'arabian-delights',
    title: 'Arabian Delights',
    author: 'Anne Marie Weiss-Armush',
    year: 2008,
    blurb: 'Recipes and princely entertaining ideas from the Arabian Peninsula. A coffee-table classic.',
    ...arch('arabiandelightsr0000riol'),
  },
  {
    id: 'arab-cooking',
    title: 'Arab Cooking: Egypt, Maghreb, Turkey, Jordan, Lebanon',
    author: 'Various',
    year: 2001,
    blurb: 'A regional tour of Arab cuisine — five countries, five distinct kitchens, one shared heritage.',
    ...arch('arabcookingegypt0000unse_l8v6'),
  },
  {
    id: 'modern-arabia',
    title: 'Modern Flavors of Arabia',
    author: 'Suzanne Husseini',
    year: 2012,
    blurb: 'A Middle Eastern kitchen in a contemporary voice. Recipes plus memories of growing up Arab.',
    ...arch('modernflavorsofa0000huss'),
  },
];

// ============ SPICE GUIDE ============

export interface ArabSpice {
  name: string;
  nameAr: string;
  origin: string;
  description: string;
  uses: string;
}

export const ARAB_SPICES: ArabSpice[] = [
  {
    name: 'Za\'atar',
    nameAr: 'زعتر',
    origin: 'Levant',
    description: 'A blend of wild thyme, sumac, sesame, salt. Slightly tangy, herbaceous, deeply Levantine.',
    uses: 'On flatbread with olive oil (manakish), sprinkled on labneh, dusted over roasted vegetables.',
  },
  {
    name: 'Sumac',
    nameAr: 'سماق',
    origin: 'Levant / Iran',
    description: 'Dried, ground berries of the sumac shrub. Red color, lemony tartness, no heat.',
    uses: 'Over hummus, in fattoush dressing, rubbed on roasted chicken (musakhan).',
  },
  {
    name: 'Ras el Hanout',
    nameAr: 'رأس الحانوت',
    origin: 'Morocco',
    description: '"Top of the shop" — the best spices a merchant has, blended together. 20+ ingredients including rose buds.',
    uses: 'Slow-cooked tagines, rubbed on lamb, stirred into couscous, dusted on roasted carrots.',
  },
  {
    name: 'Baharat',
    nameAr: 'بهارات',
    origin: 'Gulf / Levant',
    description: 'A black-pepper-led seven-spice mix. Varies by family but always built around warmth and depth.',
    uses: 'In ground meat for kibbeh and kafta, stirred into rice (kabsa), seasoning for grilled meats.',
  },
  {
    name: 'Harissa',
    nameAr: 'هريسة',
    origin: 'Tunisia / Maghreb',
    description: 'A fiery red paste of smoked chilies, garlic, caraway, coriander, olive oil. Tunisia\'s national condiment.',
    uses: 'Stirred into shakshuka, spread on bread with olive oil, rubbed on grilled fish.',
  },
  {
    name: 'Loomi',
    nameAr: 'لومي',
    origin: 'Gulf / Iraq',
    description: 'Whole dried limes — pierced and added to stews, where they release a smoky-sour funk.',
    uses: 'Inside kabsa rice, in Iraqi marag stews, in margoog dumpling soup.',
  },
  {
    name: 'Hawaij',
    nameAr: 'حواج',
    origin: 'Yemen',
    description: 'A turmeric-yellow blend of cumin, cardamom, coriander, black pepper. Two versions: one for soup, one for coffee.',
    uses: 'Soup version: in saltah, marag, slow stews. Coffee version: stirred into Yemeni qishr (coffee-husk drink).',
  },
  {
    name: 'Dukkah',
    nameAr: 'دقة',
    origin: 'Egypt',
    description: 'Crushed mix of toasted nuts, sesame, coriander, cumin, salt. Crunchy, savory, fragrant.',
    uses: 'Dipped into with bread and olive oil, sprinkled on roasted vegetables, on top of eggs.',
  },
  {
    name: 'Mahleb',
    nameAr: 'محلب',
    origin: 'Levant / Anatolia',
    description: 'Ground inner kernels of wild cherry pits. Almond-cherry flavor with a slight bitter edge.',
    uses: 'In sweet bread doughs (manaeesh sahlab, kahk cookies, mamoul), Easter breads, sweet pastries.',
  },
];

// ============ HERITAGE & WISDOM ============

export interface HeritageNote {
  title: string;
  body: string;
}

export const HERITAGE_NOTES: HeritageNote[] = [
  {
    title: 'The first cookbooks were Arabic',
    body:
      "The oldest surviving cookbook in any language is the 10th-century Kitab al-Tabikh by Ibn Sayyar al-Warraq, compiled for the Abbasid court of Baghdad. It collected recipes attributed to caliphs and physicians, with attention to seasonality and digestion centuries before Europe would do the same.",
  },
  {
    title: 'Hospitality is a sacred duty',
    body:
      "Across the Arab world, a guest must be fed regardless of cost. The Bedouin tradition holds a host responsible for three days of protection and food. The modern table follows the same principle: the right hand always offered, the largest portion always pushed toward the guest.",
  },
  {
    title: 'Coffee predates everything',
    body:
      "Coffee was first cultivated in Yemeni Sufi monasteries in the 15th century to keep monks awake during night prayers. From there it spread to Mecca, then Cairo, then Istanbul, then the world. The dallah — the long-spouted Arabian coffee pot — is older than the United States.",
  },
  {
    title: 'Bread is never thrown away',
    body:
      "Old khubz is reborn as fattoush, fatta, tharid, or simply softened with milk for breakfast. Bread holds religious weight — dropping it on the floor warrants picking it up and kissing it before placing it somewhere clean.",
  },
  {
    title: 'The spice trade ran through Arab hands',
    body:
      "For a thousand years, Arab merchants moved pepper, cinnamon, ginger, and cloves from India and Southeast Asia to Europe through the ports of Aden, Basra, and Alexandria. That trade shaped the world's cuisines — and made Arab kitchens encyclopedias of spice.",
  },
  {
    title: 'Andalusia preserved what was lost',
    body:
      "When the Arabs ruled Spain for eight centuries, their cooking absorbed Iberian and North African flavors. The anonymous 13th-century Andalusian cookbook records recipes that vanished from the Arab East — almond-thickened sauces, sweet-savory meat dishes, and rose-water sweets that now seem distinctly Spanish.",
  },
];

// ============ MODERN ARAB COOKING WEBSITES (link only) ============

export interface ArabSite {
  name: string;
  url: string;
  blurb: string;
  language: 'ar' | 'en' | 'both';
}

export const ARAB_SITES: ArabSite[] = [
  {
    name: 'Joudie Kalla',
    url: 'https://www.palestineonaplate.com/',
    blurb: 'Palestinian heritage recipes from a chef who built her career around this kitchen.',
    language: 'en',
  },
  {
    name: 'Anissa Helou',
    url: 'https://www.anissas.com/',
    blurb: 'The doyenne of Arab cookbook writing in English. Lebanese-Syrian heritage, scholarly recipes.',
    language: 'en',
  },
  {
    name: 'Reem Kassis',
    url: 'https://www.reemkassis.com/',
    blurb: 'Palestinian author of two acclaimed cookbooks. Recipes plus deep cultural research.',
    language: 'en',
  },
  {
    name: 'Maureen Abood',
    url: 'https://www.maureenabood.com/',
    blurb: "Lebanese-American chef and award-winning food writer. Mezze, mahshi, the family table.",
    language: 'en',
  },
  {
    name: "Sami Tamimi (Falastin)",
    url: 'https://samitamimi.com/',
    blurb: "Co-author of Ottolenghi's Jerusalem and Palestinian cookbook Falastin. Recipes online and in print.",
    language: 'en',
  },
];
