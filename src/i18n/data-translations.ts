/**
 * Arabic overlays for the static data files. Each map is keyed by the same
 * id/slug used in the source data. Pages pick the Arabic value when language
 * is `ar`, otherwise the original English from the data file is shown.
 *
 * Recipe content from the live APIs (TheMealDB, Forkify) stays in its original
 * language by design — translating thousands of recipes server-side is out of
 * scope for this app.
 */

// ---------- World cuisines (HomePage) ----------
export const CUISINE_AR: Record<string, { label: string; region: string }> = {
  italian: { label: 'الإيطالي', region: 'أوروبا' },
  french: { label: 'الفرنسي', region: 'أوروبا' },
  spanish: { label: 'الإسباني', region: 'أوروبا' },
  greek: { label: 'اليوناني', region: 'البحر المتوسط' },
  turkish: { label: 'التركي', region: 'الأناضول' },
  moroccan: { label: 'المغربي', region: 'شمال أفريقيا' },
  egyptian: { label: 'المصري', region: 'شمال أفريقيا' },
  tunisian: { label: 'التونسي', region: 'شمال أفريقيا' },
  kenyan: { label: 'الكيني', region: 'شرق أفريقيا' },
  indian: { label: 'الهندي', region: 'جنوب آسيا' },
  thai: { label: 'التايلندي', region: 'جنوب شرق آسيا' },
  vietnamese: { label: 'الفيتنامي', region: 'جنوب شرق آسيا' },
  malaysian: { label: 'الماليزي', region: 'جنوب شرق آسيا' },
  filipino: { label: 'الفلبيني', region: 'جنوب شرق آسيا' },
  chinese: { label: 'الصيني', region: 'شرق آسيا' },
  japanese: { label: 'الياباني', region: 'شرق آسيا' },
  mexican: { label: 'المكسيكي', region: 'أمريكا اللاتينية' },
  jamaican: { label: 'الجامايكي', region: 'الكاريبي' },
  uruguayan: { label: 'الأوروغواي', region: 'أمريكا اللاتينية' },
  american: { label: 'الأمريكي', region: 'الأمريكتان' },
  canadian: { label: 'الكندي', region: 'الأمريكتان' },
  british: { label: 'البريطاني', region: 'الجزر البريطانية' },
  irish: { label: 'الأيرلندي', region: 'الجزر البريطانية' },
  dutch: { label: 'الهولندي', region: 'شمال أوروبا' },
};

// ---------- Cooking channels (VideosPage) ----------
export const CHANNEL_AR: Record<string, { blurb: string; vibeLabel: string }> = {
  bonappetit: {
    blurb: 'مطبخ التجربة وراء المجلة. إنتاج راقي، طبخ حقيقي، كل المطابخ.',
    vibeLabel: 'طبخ بيتي حديث',
  },
  'americas-test-kitchen': {
    blurb: 'وصفات مُجرّبة بخمسين طريقة. لو سألت "بس ليش؟"، عندهم الجواب.',
    vibeLabel: 'علم الطبخ',
  },
  babish: {
    blurb: 'أطباق شفتها بالأفلام، يعيد صنعها بإتقان. وسلسلة "Basics" صبورة جداً.',
    vibeLabel: 'طبخ بيتي حديث',
  },
  'adam-ragusea': {
    blurb: 'أستاذ صحافة يطبخ. كل فيديو يجاوب على "ليش هذا يشتغل".',
    vibeLabel: 'علم الطبخ',
  },
  'joshua-weissman': {
    blurb: 'طبخ بيتي جريء، معايير عالية، وسلسلة "But Better" لإعادة صنع الفاست فود.',
    vibeLabel: 'طبخ بيتي حديث',
  },
  'food-wishes': {
    blurb: 'ألفي وصفة، مع راوي مرح. أحب معلمي الطبخ على الإنترنت.',
    vibeLabel: 'كلاسيكي',
  },
  'nyt-cooking': {
    blurb: 'دروس مع كتّاب الوصفات أنفسهم. مارك بيتمان، سامين نوصرت، إريك كيم.',
    vibeLabel: 'كلاسيكي',
  },
  'king-arthur': {
    blurb: 'أقدم شركة طحين بأمريكا تعلّم كل شي من العجين المخمر حتى المعجنات.',
    vibeLabel: 'خبيز',
  },
  'helen-rennie': {
    blurb: 'مدربة طبخ تشرح التقنية بدون ضوضاء. كأنه درس خاص.',
    vibeLabel: 'علم الطبخ',
  },
  'brian-lagerstrom': {
    blurb: 'شيف مطعم سابق يطبخ عشاءات حديثة تناسب أيام الأسبوع.',
    vibeLabel: 'طبخ بيتي حديث',
  },
  'internet-shaquille': {
    blurb: 'نصائح طبخ عملية بفيديوهات دقيقتين. ذوّاق كسول بذكاء.',
    vibeLabel: 'طبخ اقتصادي',
  },
  'sorted-food': {
    blurb: 'خمسة أصدقاء بريطانيين يطبخون معاً. ترفيه وتقنية مفيدة بنفس الوقت.',
    vibeLabel: 'عالمي',
  },
};

// ---------- Archive magazines (MagazinesPage) ----------
export const ARCHIVE_AR: Record<string, { title?: string; issue: string; blurb: string; eraLabel: string }> = {
  'boston-cooking-school-1896': {
    issue: 'الطبعة الأولى',
    blurb: 'الكتاب الذي أعطى الأمريكيين ملاعق القياس. أسلوب فاني فارمر الدقيق غيّر الطبخ البيتي للأبد.',
    eraLabel: 'فيكتوري',
  },
  'mrs-beeton-1861': {
    title: 'كتاب إدارة الأسرة',
    issue: 'إيزابيلا بيتون، الطبعة الأولى',
    blurb: 'ألف وصفة وألف رأي عن إدارة البيت. عالم الطبخ الفيكتوري في مجلد واحد.',
    eraLabel: 'فيكتوري',
  },
  'white-house-1887': {
    title: 'كتاب طبخ البيت الأبيض',
    issue: 'طبعة زيمان وجيليت',
    blurb: 'وصفات من طاهي رئاسي مع فصول عن خدمة الطاولة وماذا تفعل لو شب حريق.',
    eraLabel: 'فيكتوري',
  },
  'inglenook-1911': {
    title: 'كتاب طبخ إنجلنوك',
    issue: 'طبعة جمعية إخوة',
    blurb: 'طبخ بيتي بسيط من مجتمع البريثرن، مرسل من قراء مجلة دينية. مخللات، فطائر، وحفلات.',
    eraLabel: 'إدواردي',
  },
  'settlement-1903': {
    title: 'كتاب طبخ المستوطنة',
    issue: 'الطبعة الأولى',
    blurb: 'كتاب طبخ من دار خدمات اجتماعية في ميلواكي صار من أحب الكتب المجتمعية. طبخ يهودي بيتي في جوهره.',
    eraLabel: 'إدواردي',
  },
  'rumford-1908': {
    title: 'كتاب طبخ رامفورد الكامل',
    issue: 'طبعة والاس',
    blurb: 'كلاسيكي من بداية القرن للخبيز البيتي البسيط. بسكويت، خبز سريع، وصعود الخميرة الكيميائية.',
    eraLabel: 'إدواردي',
  },
  'american-cookery-1796': {
    title: 'الطبخ الأمريكي',
    issue: 'أميليا سيمونز، أول كتاب طبخ أمريكي',
    blurb: 'أول كتاب طبخ تكتبه أمريكية لأمريكيين. فيه أول وصفات مطبوعة لبودينغ الذرة، شراب التنوب، وفطيرة القرع.',
    eraLabel: 'فيكتوري',
  },
  'choice-cookery-1889': {
    title: 'طبخ مختار',
    issue: 'طبعة أوين',
    blurb: 'دليل كاثرين أوين الواضح والصريح للعائلات الصغيرة ذات الموارد المحدودة. ساحر، حازم، مفيد.',
    eraLabel: 'فيكتوري',
  },
};

// ---------- Modern sites (MagazinesPage) ----------
export const MODERN_SITE_AR: Record<string, { blurb: string; region: string; free: string; category: string }> = {
  'bbc-good-food': {
    blurb: 'أكبر موقع وصفات مجاني في بريطانيا. جودة مطبخ اختباري، كتابة بأسلوب مجلة.',
    region: 'المملكة المتحدة',
    free: 'مجاني كلياً',
    category: 'عام',
  },
  eatingwell: {
    blurb: 'مجلة وموقع موجهان نحو التغذية. وصفات تنتبه لما فيها.',
    region: 'الولايات المتحدة',
    free: 'مجاني كلياً',
    category: 'صحي',
  },
  'serious-eats': {
    blurb: 'مدرسة كنجي لوبيز-آلت في الطبخ. مُجرّبة بعمق، مبنية على العلم.',
    region: 'الولايات المتحدة',
    free: 'مجاني كلياً',
    category: 'علمي',
  },
  food52: {
    blurb: 'موقع طعام مجتمعي. وصفات من القراء بالإضافة لمطبخه الاختباري التحريري.',
    region: 'الولايات المتحدة',
    free: 'مجاني كلياً',
    category: 'مجتمعي',
  },
  'king-arthur': {
    blurb: 'أقدم شركة طحين بأمريكا تدير مدرسة خبيز مجانية. من العجين المخمر حتى السكون.',
    region: 'الولايات المتحدة',
    free: 'مجاني كلياً',
    category: 'خبيز',
  },
  'nyt-cooking': {
    blurb: 'مكتبة الجريدة للوصفات. جزء منها مجاني بدون اشتراك.',
    region: 'الولايات المتحدة',
    free: 'بعضه مجاني',
    category: 'عام',
  },
  'smitten-kitchen': {
    blurb: 'كلاسيكيات ديب بيريلمان المُجرّبة بيتياً. كتابة بمستوى كتاب طبخ على مدونة مجانية.',
    region: 'الولايات المتحدة',
    free: 'مجاني كلياً',
    category: 'عام',
  },
  'half-baked-harvest': {
    blurb: 'طبخ تيغان جيرارد الموسمي. تصوير غني، وصفات ذات نكهات قوية.',
    region: 'الولايات المتحدة',
    free: 'مجاني كلياً',
    category: 'عام',
  },
  'the-kitchn': {
    blurb: 'كتابة يومية عن الطبخ كأسلوب حياة. وصفات + المهارات الصغيرة اللي ما يعلّمها أحد.',
    region: 'الولايات المتحدة',
    free: 'مجاني كلياً',
    category: 'عام',
  },
  'cookie-and-kate': {
    blurb: 'طبخ كيت تايلور النباتي. طعام نباتي جذاب للجميع.',
    region: 'الولايات المتحدة',
    free: 'مجاني كلياً',
    category: 'صحي',
  },
  'olive-magazine': {
    blurb: 'مجلة بريطانية للطعام والسفر مع أرشيف مجاني واسع.',
    region: 'المملكة المتحدة',
    free: 'أغلبه مجاني',
    category: 'عالمي',
  },
  taste: {
    blurb: 'الموقع الأكثر قراءة للوصفات في أستراليا. طبخ عائلي، إيقاع أيام الأسبوع.',
    region: 'أستراليا',
    free: 'مجاني كلياً',
    category: 'عام',
  },
};

// ---------- MealDB category and area lookup tables ----------
export const MEALDB_CATEGORY_AR: Record<string, string> = {
  Beef: 'لحم بقر',
  Breakfast: 'فطور',
  Chicken: 'دجاج',
  Dessert: 'حلويات',
  Goat: 'لحم ماعز',
  Lamb: 'لحم خروف',
  Miscellaneous: 'متنوّع',
  Pasta: 'باستا',
  Pork: 'لحم خنزير',
  Seafood: 'مأكولات بحرية',
  Side: 'طبق جانبي',
  Starter: 'مقبّلات',
  Vegan: 'نباتي صرف',
  Vegetarian: 'نباتي',
  Salad: 'سلطة',
  Soup: 'حساء',
  'Main course': 'طبق رئيسي',
  Baking: 'مخبوزات',
  Snack: 'وجبة خفيفة',
};

export const MEALDB_AREA_AR: Record<string, string> = {
  Italian: 'إيطالي', French: 'فرنسي', France: 'فرنسي',
  Chinese: 'صيني', Japanese: 'ياباني', Indian: 'هندي', India: 'هندي',
  Mexican: 'مكسيكي', Thai: 'تايلندي', Vietnamese: 'فيتنامي',
  Greek: 'يوناني', Spanish: 'إسباني', Turkish: 'تركي',
  Moroccan: 'مغربي', Egyptian: 'مصري', Egypt: 'مصري',
  Lebanese: 'لبناني', Jordanian: 'أردني', Palestinian: 'فلسطيني', Syrian: 'سوري',
  British: 'بريطاني', 'United Kingdom': 'بريطاني',
  American: 'أمريكي', 'United States': 'أمريكي',
  Australian: 'أسترالي', Australia: 'أسترالي',
  Canadian: 'كندي', Canada: 'كندي',
  Irish: 'أيرلندي', Ireland: 'أيرلندي',
  Polish: 'بولندي', Poland: 'بولندي',
  Portuguese: 'برتغالي', Portugal: 'برتغالي',
  Croatian: 'كرواتي', Croatia: 'كرواتي',
  Russian: 'روسي', Russia: 'روسي',
  Ukrainian: 'أوكراني', Ukraine: 'أوكراني',
  Dutch: 'هولندي', Netherlands: 'هولندي',
  Norwegian: 'نرويجي', Norway: 'نرويجي',
  Swedish: 'سويدي', Sweden: 'سويدي',
  German: 'ألماني', Germany: 'ألماني',
  Austrian: 'نمساوي', Austria: 'نمساوي',
  Hungarian: 'هنغاري', Hungary: 'هنغاري',
  Czech: 'تشيكي',
  Filipino: 'فلبيني', Philippines: 'فلبيني',
  Malaysian: 'ماليزي', Malaysia: 'ماليزي',
  Singaporean: 'سنغافوري',
  Indonesian: 'إندونيسي', Indonesia: 'إندونيسي',
  Cambodian: 'كمبودي', Cambodia: 'كمبودي',
  Korean: 'كوري', 'South Korean': 'كوري جنوبي',
  Kenyan: 'كيني', Kenya: 'كيني',
  Nigerian: 'نيجيري', 'South African': 'جنوب أفريقي',
  Brazilian: 'برازيلي', Brazil: 'برازيلي',
  Argentine: 'أرجنتيني', Argentina: 'أرجنتيني',
  Uruguayan: 'أوروغواي', Uruguay: 'أوروغواي',
  Peruvian: 'بيروفي', Peru: 'بيروفي',
  Venezuelan: 'فنزويلي', Venezuela: 'فنزويلي',
  Colombian: 'كولومبي', Colombia: 'كولومبي',
  Cuban: 'كوبي',
  Jamaican: 'جامايكي', Jamaica: 'جامايكي',
  Bahamian: 'باهامي',
  Salvadoran: 'سلفادوري',
  Algerian: 'جزائري', Algeria: 'جزائري',
  Tunisian: 'تونسي', Tunisia: 'تونسي',
  Libyan: 'ليبي', Sudanese: 'سوداني', Yemeni: 'يمني',
  'Saudi Arabian': 'سعودي',
  Emirati: 'إماراتي', Kuwaiti: 'كويتي', Bahraini: 'بحريني',
  Qatari: 'قطري', Omani: 'عماني',
  Iraqi: 'عراقي', Iranian: 'إيراني', Iran: 'إيراني',
  Afghan: 'أفغاني', Pakistani: 'باكستاني', Bangladeshi: 'بنغالي',
  'Sri Lankan': 'سريلانكي', Nepalese: 'نيبالي',
  Mediterranean: 'متوسطي', Asian: 'آسيوي', African: 'أفريقي', European: 'أوروبي',
};

export function arCategory(category?: string): string | undefined {
  if (!category) return undefined;
  return MEALDB_CATEGORY_AR[category] || category;
}

export function arArea(area?: string): string | undefined {
  if (!area) return undefined;
  return MEALDB_AREA_AR[area] || area;
}

// ---------- Local recipes (RecipeDetailPage) ----------
export const LOCAL_RECIPE_AR: Record<string, { title: string; blurb: string }> = {
  'lo-usda-oats': { title: 'شوفان منقوع بالتوت', blurb: 'تحضير خمس دقائق، فطور بدون طبخ. يستيقظ كريمي في الثلاجة.' },
  'lo-usda-tacos': { title: 'تاكو الفاصولياء السوداء والذرة', blurb: 'تاكو نباتي لأيام الأسبوع. عشر دقائق، مقلاة واحدة، ستة دولارات.' },
  'lo-usda-salmon': { title: 'سلمون مشوي بالديجون', blurb: 'بروتين لأيام الأسبوع بشعور ليلة الأحد. الفرن يعمل الشغل.' },
  'lo-usda-lentil': { title: 'حساء عدس دسم', blurb: 'مكونات مخزن، قدر واحد، جاهز بأقل من ساعة. يسخّن بجمال.' },
  'lo-usda-stirfry': { title: 'دجاج وخضار مقلية', blurb: 'مقلاة سريعة تستخدم اللي بدرج الخضار. متسامحة وسريعة.' },
  'lo-usda-smoothie': { title: 'سموذي الموز والتوت', blurb: 'ثلاث مكونات، دقيقتان، خلاط واحد. علاج الصباح.' },
  'lo-fanny-lemon-pie': { title: 'فطيرة الليمون البسيطة', blurb: 'كلاسيكية فاني فارمر من كتاب طبخ مدرسة بوسطن، 1896. كاسترد حامض تحت مرنغ ناعم كالغيمة.' },
  'lo-fanny-brown-bread': { title: 'خبز بوسطن البني', blurb: 'رغيف مبخّر من كتاب طبخ مدرسة بوسطن، 1896. غامق، حلو، كثيف، ولا شي يشبهه في مخبز حديث.' },
  'lo-beeton-lemon-curd': { title: 'كريم الليمون', blurb: 'طريقة السيدة بيتون من 1861، مُكيّفة بلطف. اسكبه فوق التوست أو اخلطه بالقشطة المخفوقة.' },
  'lo-fanny-tomato-soup': { title: 'حساء كريمة الطماطم', blurb: 'كلاسيكي من 1896 يستحق التذكّر. غني بدون أن يكون ثقيلاً، كما كان مقصوداً دائماً.' },
  'lo-usda-chickpea-curry': { title: 'كاري الحمص السريع', blurb: 'كاري من المخزن جاهز في عشرين دقيقة. بهارات دافئة، بدون قائمة تسوق.' },
  'lo-usda-omelet': { title: 'عجة السبانخ والفطر', blurb: 'فطور لنهاية أسبوع يشعر أحسن من قائمة مكوناتها القصيرة.' },
  'lo-usda-quinoa-bowl': { title: 'وعاء الكينوا الغذائي', blurb: 'وعاء يحقق كل مجموعات الطعام بدون مجهود. حضّره الأحد، كله طول الأسبوع.' },
  'lo-usda-pancakes': { title: 'فطائر القمح الكامل', blurb: 'كومة لنهاية الأسبوع فيها ألياف كافية لتشبعك حتى الغداء. نعم تقدر تجمد البواقي.' },
  'lo-usda-roasted-veg': { title: 'خضار مشوية متنوعة', blurb: 'رائحة المطبخ التي تقول إن أحداً أخذ عشر دقائق ليقطع شيئاً. تستحق كل ثانية.' },
  'lo-usda-chicken-soup': { title: 'حساء الدجاج بالشعيرية', blurb: 'الحساء الذي يصلح زكاماً سيئاً ويوماً طويلاً بنفس الكفاءة.' },
  'lo-usda-apple-oatmeal': { title: 'شوفان التفاح بالقرفة', blurb: 'وعاء دافئ للصباحات الباردة. الرائحة كأن التفاح يُخبز على الموقد.' },
  'lo-usda-tuna-salad': { title: 'ساندويش سلطة التونة', blurb: 'كلاسيكي صندوق الغداء. مشرق، مقرمش، أحسن بكثير من نسخة المحل.' },
  'lo-beeton-yorkshire': { title: 'يوركشاير بودينغ', blurb: 'من كتاب السيدة بيتون 1861. النفخة الكلاسيكية التي تعيش بجانب الروست.' },
  'lo-fanny-apple-pie': { title: 'فطيرة التفاح الكلاسيكية', blurb: 'فطيرة فاني فارمر المباشرة من 1896. تفاح حامض، عجينة حلوة، بدون حيل.' },
  'lo-fanny-roast-chicken': { title: 'دجاج محمر يوم الأحد', blurb: 'من فاني فارمر، 1896. الطريقة التي علّمت جيلاً كيف يجب أن يكون طعم دجاج محمر.' },
  'lo-beeton-rarebit': { title: 'رايبيت ويلز', blurb: 'وصفة السيدة بيتون لصلصة الجبن المالحة التي تحوّل التوست إلى وجبة.' },
  'lo-fanny-beef-stew': { title: 'يخنة لحم البقر', blurb: 'يخنة فاني فارمر من 1896. الطهي البطيء يبني النكهة؛ الوصفة فقط لا تعترض الطريق.' },
  'lo-beeton-plum-pudding': { title: 'بودينغ البرقوق الميلادي', blurb: 'بودينغ السيدة بيتون من 1861. الفواكه، البراندي، البخار، الصمت على الطاولة.' },
  'lo-usda-chickpea-salad': { title: 'سلطة الحمص المتوسطية', blurb: 'بدون طبخ، عشر دقائق، أسبوع من الغداء. الليمون والأعشاب يقومان بكل الشغل.' },
  'lo-usda-turkey-chili': { title: 'تشيلي الديك الرومي', blurb: 'ديك رومي خفيف، فاصولياء كثيرة، قاعدة طماطم عميقة. النوع الذي يصبح أحسن بليلة.' },
  'lo-usda-honey-shrimp': { title: 'روبيان العسل والثوم', blurb: 'أسرع من التوصيل. لزج، لامع، يُقدّم فوق الأرز مع أي خضرة عندك.' },
  'lo-usda-risotto': { title: 'ريزوتو الفطر والسبانخ', blurb: 'الطاهي الصبور يأخذ مكافأة كريمية. حرّك، تذوّق، حرّك مرة أخرى. المطبخ يفوح كمطعم إيطالي صغير.' },
  'lo-usda-yogurt-chicken': { title: 'دجاج الزبادي اليوناني المشوي', blurb: 'تتبيلة بثلاث مكونات تردّ بالنضارة. الفكرة كلها أن يبقى ليلة بالثلاجة.' },
  'lo-usda-stuffed-peppers': { title: 'فلفل محشي بالكينوا', blurb: 'فلفل مقسوم، محشي بكينوا وفاصولياء، مخبوز حتى تتفحم الحواف. طعام راحة نباتي.' },
  'lo-usda-banana-bread': { title: 'خبز الموز بالقمح الكامل', blurb: 'رغيف لاستخدام الموز الذي نسيته. قمح كامل للقوام، جوز للقرمشة.' },
  'lo-usda-sweet-potato-hash': { title: 'بطاطا حلوة للفطور', blurb: 'مقلاة تصنع برانش نهاية الأسبوع من ثلاث خضار. أضف بيضة لو جاد.' },
  'lo-beeton-shepherds-pie': { title: 'فطيرة الراعي', blurb: 'كلاسيكية السيدة بيتون، مُحدّثة بلطف. غطاء من البطاطا المهروسة على لحم خروف مطبوخ ببطء.' },
  'lo-fanny-baked-beans': { title: 'فاصولياء بوسطن المخبوزة', blurb: 'طريقة فاني فارمر من 1896، منخفضة وبطيئة. دبس، لحم خنزير مالح، وبعد ظهر سبت طويل.' },
  'lo-fanny-gingerbread': { title: 'خبز الزنجبيل الطري', blurb: 'وصفة فاني فارمر من 1896. الدبس يعطي العمق، الزنجبيل يعطي اللكمة. أحسن في يوم خبزه.' },
  'lo-beeton-rice-pudding': { title: 'بودينغ الأرز التقليدي', blurb: 'بودينغ السيدة بيتون المخبوز ببطء من 1861. ثلاث مكونات، لتر حليب، وصبر.' },
  'lo-fanny-scalloped-potatoes': { title: 'بطاطا مرصوفة بالكريمة', blurb: 'مخبوز بطاطا مرصوفة من فاني فارمر 1896. قشطة، زبدة، ملح، ووقت على حرارة منخفضة.' },
  'lo-fanny-bread-pudding': { title: 'بودينغ الخبز', blurb: 'استخدام من 1896 للخبز الجاف. منقوع بالكاسترد، مرشوش بالزبيب، مخبوز حتى يجمد بقمة مقرمشة.' },
  'lo-beeton-trifle': { title: 'ترايفل إنجليزي', blurb: 'حلوى السيدة بيتون المطبقة من 1861. كيك منقوع بالشيري، كاسترد، توت، وقشطة. السر الصبر.' },
};
