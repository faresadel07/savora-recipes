/**
 * Cooking magazines and journals — two flavors:
 *  1. ARCHIVE_MAGAZINES: public-domain magazines hosted on Internet Archive,
 *     embeddable in full inside Zaytoun via the BookReader iframe.
 *  2. MODERN_SITES: living cooking magazines/sites that are free to read at
 *     their own URL. We link out (linking is unrestricted).
 *
 * Cover thumbnails come from `archive.org/services/img/{id}`, which always
 * resolves to either the real cover or a tasteful fallback.
 */

export interface ArchiveMagazine {
  id: string;
  title: string;
  titleAr?: string;
  issue: string;
  issueAr?: string;
  year: number;
  blurb: string;
  blurbAr?: string;
  archiveId: string;
  detailUrl: string;
  embedUrl: string;
  coverUrl: string;
  fallbackSearchUrl: string;
  era: 'Victorian' | 'Edwardian' | 'Progressive' | 'Modern';
  accent: 'terracotta' | 'sage' | 'gold' | 'ink';
}

function arch(archiveId: string): Pick<ArchiveMagazine, 'archiveId' | 'detailUrl' | 'embedUrl' | 'coverUrl'> {
  return {
    archiveId,
    detailUrl: `https://archive.org/details/${archiveId}`,
    embedUrl: `https://archive.org/embed/${archiveId}`,
    coverUrl: `https://archive.org/services/img/${archiveId}`,
  };
}

export const ARCHIVE_MAGAZINES: ArchiveMagazine[] = [
  {
    id: 'boston-cooking-school-1896',
    title: 'The Boston Cooking-School Cook Book',
    issue: 'First edition',
    year: 1896,
    blurb:
      'The book that gave Americans level measuring spoons. Fannie Farmer\'s spare, accurate prose changed home cooking forever.',
    ...arch('bostoncookingsch00farm'),
    fallbackSearchUrl: 'https://archive.org/search?query=boston+cooking+school+cookbook+farmer',
    era: 'Victorian',
    accent: 'terracotta',
    titleAr: 'كتاب الطبخ في مدرسة بوسطن للطبخ',
    issueAr: 'الطبعة الأولى',
    blurbAr: 'الكتاب الذي أعطى الأمريكان ملاعق قياس المستوى. لقد غير نثر فاني فارمر الاحتياطي والدقيق الطبخ المنزلي إلى الأبد.',
  },
  {
    id: 'mrs-beeton-1861',
    title: 'The Book of Household Management',
    issue: 'Isabella Beeton, first edition',
    year: 1861,
    blurb:
      'A thousand recipes and a thousand opinions on running a household. The Victorian cooking world in one volume.',
    ...arch('bookofhouseholdm0000mrsi'),
    fallbackSearchUrl: 'https://archive.org/search?query=mrs+beeton+book+household+management',
    era: 'Victorian',
    accent: 'ink',
    titleAr: 'كتاب إدارة الأسرة',
    issueAr: 'إيزابيلا بيتون، الطبعة الأولى',
    blurbAr: 'ألف وصفة وألف رأي حول إدارة الأسرة. عالم الطبخ الفيكتوري في مجلد واحد.',
  },
  {
    id: 'white-house-1887',
    title: 'The White House Cook Book',
    issue: 'Ziemann & Gillette edition',
    year: 1887,
    blurb:
      'Recipes from a presidential chef paired with chapters on table service and what to do when a fire breaks out.',
    ...arch('whitehousecookbo00ziem'),
    fallbackSearchUrl: 'https://archive.org/search?query=white+house+cook+book+ziemann',
    era: 'Victorian',
    accent: 'gold',
    titleAr: 'كتاب طبخ البيت الأبيض',
    issueAr: 'طبعة زيمان وجيليت',
    blurbAr: 'وصفات من طاهٍ رئاسي مقترنة بفصول عن خدمة المائدة وما يجب فعله عند اندلاع حريق.',
  },
  {
    id: 'inglenook-1911',
    title: 'The Inglenook Cook Book',
    issue: 'Brethren community edition',
    year: 1911,
    blurb:
      'Plainspoken Brethren home cooking submitted by readers of a religious magazine. Pickles, pies, and pot-lucks.',
    ...arch('inglenookcookboo00unse'),
    fallbackSearchUrl: 'https://archive.org/search?query=inglenook+cook+book',
    era: 'Edwardian',
    accent: 'sage',
    titleAr: 'كتاب إنجلينوك كوك',
    issueAr: 'طبعة مجتمع الاخوة',
    blurbAr: 'طبخ منزلي بسيط للأخوة مقدم من قراء مجلة دينية. المخللات والفطائر والحظوظ.',
  },
  {
    id: 'settlement-1903',
    title: 'The Settlement Cook Book',
    issue: 'First edition',
    year: 1903,
    blurb:
      'A Milwaukee settlement house cookbook that became one of America\'s best-loved community cookbooks. Jewish home cooking at its core.',
    ...arch('settlementcookbo00kand'),
    fallbackSearchUrl: 'https://archive.org/search?query=settlement+cook+book+kander',
    era: 'Edwardian',
    accent: 'terracotta',
    titleAr: 'كتاب طبخ التسوية',
    issueAr: 'الطبعة الأولى',
    blurbAr: 'كتاب طبخ منزل مستوطنة ميلووكي الذي أصبح واحدًا من أفضل كتب الطبخ المجتمعية المحبوبة في أمريكا. الطبخ المنزلي اليهودي في جوهره.',
  },
  {
    id: 'rumford-1908',
    title: 'The Rumford Complete Cook Book',
    issue: 'Wallace edition',
    year: 1908,
    blurb:
      'A turn-of-the-century classic of plain home baking. Soda biscuits, johnnycakes, and the rise of the chemical leavener.',
    ...arch('rumfordcompletec00wall'),
    fallbackSearchUrl: 'https://archive.org/search?query=rumford+complete+cook+book',
    era: 'Edwardian',
    accent: 'gold',
    titleAr: 'كتاب طبخ رومفورد الكامل',
    issueAr: 'طبعة والاس',
    blurbAr: 'كلاسيكيات مطلع القرن من الخبز المنزلي البسيط. بسكويت الصودا، وكعك جوني، وظهور الخميرة الكيميائية.',
  },
  {
    id: 'american-cookery-1796',
    title: 'American Cookery',
    issue: 'Amelia Simmons, first American cookbook',
    year: 1796,
    blurb:
      'The first cookbook written by an American, for Americans. Includes the first printed recipes for cornmeal pudding, spruce beer, and pumpkin pie.',
    ...arch('american-cookery-by-amelia-simmons'),
    fallbackSearchUrl: 'https://archive.org/search?query=american+cookery+amelia+simmons',
    era: 'Victorian',
    accent: 'ink',
    titleAr: 'الطبخ الأمريكي',
    issueAr: 'أميليا سيمونز، أول كتاب طبخ أمريكي',
    blurbAr: 'أول كتاب طبخ كتبه أمريكي للأمريكيين. يتضمن أول وصفات مطبوعة لبودنغ دقيق الذرة، وبيرة التنوب، وفطيرة اليقطين.',
  },
  {
    id: 'choice-cookery-1889',
    title: 'Choice Cookery',
    issue: 'Owen edition',
    year: 1889,
    blurb:
      'Catherine Owen\'s sharp, plainspoken guide for "small families and slender means." Charming, opinionated, useful.',
    ...arch('choicecookery00owenrich'),
    fallbackSearchUrl: 'https://archive.org/search?query=choice+cookery+catherine+owen',
    era: 'Victorian',
    accent: 'sage',
    titleAr: 'اختيار الطبخ',
    issueAr: 'طبعة أوين',
    blurbAr: 'دليل كاثرين أوين الحاد والصريح لـ "العائلات الصغيرة والوسائل النحيلة". ساحر، عنيد، مفيد.',
  },
];

export interface ModernSite {
  id: string;
  name: string;
  nameAr?: string;
  url: string;
  blurb: string;
  blurbAr?: string;
  region: string;
  regionAr?: string;
  free: 'fully free' | 'mostly free' | 'some free';
  category: 'general' | 'baking' | 'global' | 'healthy' | 'science' | 'community';
  accent: 'terracotta' | 'sage' | 'gold' | 'ink';
}

export const MODERN_SITES: ModernSite[] = [
  {
    id: 'bbc-good-food',
    name: 'BBC Good Food',
    url: 'https://www.bbcgoodfood.com/',
    blurb: 'The biggest free recipe site in the UK. Test kitchen quality, magazine writing.',
    region: 'United Kingdom',
    free: 'fully free',
    category: 'general',
    accent: 'terracotta',
    nameAr: 'بي بي سي طعام جيد',
    blurbAr: 'أكبر موقع وصفات مجانية في المملكة المتحدة. اختبار جودة المطبخ، وكتابة المجلات.',
    regionAr: 'المملكة المتحدة',
  },
  {
    id: 'eatingwell',
    name: 'EatingWell',
    url: 'https://www.eatingwell.com/',
    blurb: 'A nutrition-led magazine and site. Recipes that pay attention to what is in them.',
    region: 'United States',
    free: 'fully free',
    category: 'healthy',
    accent: 'sage',
    nameAr: 'الأكل بشكل جيد',
    blurbAr: 'مجلة وموقع متخصص في التغذية. وصفات تنتبه لما فيها.',
    regionAr: 'الولايات المتحدة',
  },
  {
    id: 'serious-eats',
    name: 'Serious Eats',
    url: 'https://www.seriouseats.com/',
    blurb: 'The Kenji López-Alt school of cooking. Deeply tested, scientifically argued.',
    region: 'United States',
    free: 'fully free',
    category: 'science',
    accent: 'ink',
    nameAr: 'يأكل خطيرة',
    blurbAr: 'مدرسة كينجي لوبيز ألت للطهي. تم اختباره بعمق، وجادل علميا.',
    regionAr: 'الولايات المتحدة',
  },
  {
    id: 'food52',
    name: 'Food52',
    url: 'https://food52.com/',
    blurb: 'A community-driven food site. Crowd-sourced recipes plus its own editorial test kitchen.',
    region: 'United States',
    free: 'fully free',
    category: 'community',
    accent: 'gold',
    nameAr: 'الغذاء52',
    blurbAr: 'موقع الغذاء يحركه المجتمع. وصفات من مصادر جماعية بالإضافة إلى مطبخ الاختبار التحريري الخاص بها.',
    regionAr: 'الولايات المتحدة',
  },
  {
    id: 'king-arthur',
    name: 'King Arthur Baking',
    url: 'https://www.kingarthurbaking.com/',
    blurb: 'America\'s oldest flour company runs a free baking school. Sourdough to scones.',
    region: 'United States',
    free: 'fully free',
    category: 'baking',
    accent: 'gold',
    nameAr: 'الملك آرثر بيكينج',
    blurbAr: 'تدير أقدم شركة دقيق في أمريكا مدرسة مجانية للخبز. العجين المخمر للكعكات.',
    regionAr: 'الولايات المتحدة',
  },
  {
    id: 'nyt-cooking',
    name: 'NYT Cooking',
    url: 'https://cooking.nytimes.com/',
    blurb: 'The newspaper\'s recipe vault. A subset is free without subscription.',
    region: 'United States',
    free: 'some free',
    category: 'general',
    accent: 'ink',
    nameAr: 'نيويورك تايمز الطبخ',
    blurbAr: 'قبو وصفة الصحيفة. مجموعة فرعية مجانية بدون اشتراك.',
    regionAr: 'الولايات المتحدة',
  },
  {
    id: 'smitten-kitchen',
    name: 'Smitten Kitchen',
    url: 'https://smittenkitchen.com/',
    blurb: 'Deb Perelman\'s home-tested classics. Cookbook-quality writing on a free blog.',
    region: 'United States',
    free: 'fully free',
    category: 'general',
    accent: 'terracotta',
    nameAr: 'مطبخ سميت',
    blurbAr: 'كلاسيكيات Deb Perelman التي تم اختبارها في المنزل. كتابة بجودة كتب الطبخ على مدونة مجانية.',
    regionAr: 'الولايات المتحدة',
  },
  {
    id: 'half-baked-harvest',
    name: 'Half Baked Harvest',
    url: 'https://www.halfbakedharvest.com/',
    blurb: 'Tieghan Gerard\'s seasonal cooking. Lush photography, full-flavor recipes.',
    region: 'United States',
    free: 'fully free',
    category: 'general',
    accent: 'gold',
    nameAr: 'نصف حصاد مخبوز',
    blurbAr: 'الطبخ الموسمي لتيغان جيرارد. التصوير الفوتوغرافي الخصب، وصفات كاملة النكهة.',
    regionAr: 'الولايات المتحدة',
  },
  {
    id: 'the-kitchn',
    name: 'The Kitchn',
    url: 'https://www.thekitchn.com/',
    blurb: 'Daily cooking-as-life writing. Recipes plus the small skills nobody teaches.',
    region: 'United States',
    free: 'fully free',
    category: 'general',
    accent: 'sage',
    nameAr: 'المطبخ',
    blurbAr: 'الكتابة اليومية للطبخ كحياة. وصفات بالإضافة إلى المهارات الصغيرة التي لا أحد يعلمها.',
    regionAr: 'الولايات المتحدة',
  },
  {
    id: 'cookie-and-kate',
    name: 'Cookie and Kate',
    url: 'https://cookieandkate.com/',
    blurb: 'Kate Taylor\'s vegetarian cooking. Plant-first food with broad appeal.',
    region: 'United States',
    free: 'fully free',
    category: 'healthy',
    accent: 'sage',
    nameAr: 'كوكي وكيت',
    blurbAr: 'الطبخ النباتي لكيت تايلور. الغذاء النباتي الأول ذو جاذبية واسعة.',
    regionAr: 'الولايات المتحدة',
  },
  {
    id: 'olive-magazine',
    name: 'Olive Magazine',
    url: 'https://www.olivemagazine.com/',
    blurb: 'A British food and travel magazine with a generous free archive.',
    region: 'United Kingdom',
    free: 'mostly free',
    category: 'global',
    accent: 'sage',
    nameAr: 'مجلة الزيتون',
    blurbAr: 'مجلة بريطانية للطعام والسفر تحتوي على أرشيف مجاني سخي.',
    regionAr: 'المملكة المتحدة',
  },
  {
    id: 'taste',
    name: 'Taste.com.au',
    url: 'https://www.taste.com.au/',
    blurb: 'Australia\'s most-read recipe site. Family cooking, weeknight pace.',
    region: 'Australia',
    free: 'fully free',
    category: 'general',
    accent: 'terracotta',
    nameAr: 'Taste.com.au',
    blurbAr: 'موقع الوصفات الأكثر قراءة في أستراليا. الطبخ العائلي، وتيرة عطلة نهاية الأسبوع.',
    regionAr: 'أستراليا',
  },
];
