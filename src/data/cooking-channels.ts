/**
 * A curated shelf of public cooking channels on YouTube. We link out; we don't
 * embed individual videos here, which keeps the list resilient when single
 * videos get taken down or made private.
 *
 * All channels are public, free to watch, and chosen for the quality of their
 * teaching. Add or remove freely.
 */

export interface CookingChannel {
  id: string;
  name: string;
  nameAr?: string;
  handle: string;
  url: string;
  blurb: string;
  blurbAr?: string;
  vibe: 'classic' | 'modern' | 'science' | 'baking' | 'budget' | 'global';
  accent: 'terracotta' | 'sage' | 'gold' | 'ink';
}

export const COOKING_CHANNELS: CookingChannel[] = [
  {
    id: 'bonappetit',
    name: 'Bon Appétit',
    handle: '@bonappetit',
    url: 'https://www.youtube.com/@bonappetit',
    blurb: 'The test kitchen behind the magazine. Glossy production, real cooking, every cuisine.',
    vibe: 'modern',
    accent: 'terracotta',
    nameAr: 'شهية طيبة',
    blurbAr: 'المطبخ الاختباري خلف المجلة. إنتاج لامع، طبخ حقيقي، كل المأكولات.',
  },
  {
    id: 'americas-test-kitchen',
    name: "America's Test Kitchen",
    handle: '@AmericasTestKitchen',
    url: 'https://www.youtube.com/@AmericasTestKitchen',
    blurb: 'Recipes tested fifty different ways. If you ever wondered "but why?", they answer.',
    vibe: 'science',
    accent: 'ink',
    nameAr: 'مطبخ الاختبار الأمريكي',
    blurbAr: 'وصفات مجربة بخمسين طريقة مختلفة. إذا تساءلت يومًا "ولكن لماذا؟"، فسيجيبونك.',
  },
  {
    id: 'babish',
    name: 'Babish Culinary Universe',
    handle: '@babishculinaryuniverse',
    url: 'https://www.youtube.com/@babishculinaryuniverse',
    blurb: 'The dishes you saw in movies, recreated faithfully. Plus a deeply patient "Basics" series.',
    vibe: 'modern',
    accent: 'gold',
    nameAr: 'عالم بابيش للطهي',
    blurbAr: 'الأطباق التي شاهدتها في الأفلام، تم إعادة صنعها بأمانة. بالإضافة إلى سلسلة "الأساسيات" التي تتسم بالصبر العميق.',
  },
  {
    id: 'adam-ragusea',
    name: 'Adam Ragusea',
    handle: '@aragusea',
    url: 'https://www.youtube.com/@aragusea',
    blurb: 'A journalism professor who happens to cook. Every video answers a "why does this work" question.',
    vibe: 'science',
    accent: 'sage',
    nameAr: 'آدم راغوسيا',
    blurbAr: 'أستاذ الصحافة الذي يحدث لطهي الطعام. يجيب كل فيديو على سؤال "لماذا يعمل هذا".',
  },
  {
    id: 'joshua-weissman',
    name: 'Joshua Weissman',
    handle: '@JoshuaWeissman',
    url: 'https://www.youtube.com/@JoshuaWeissman',
    blurb: 'Bold home cooking, demanding standards, "But Better" remakes of fast food.',
    vibe: 'modern',
    accent: 'terracotta',
    nameAr: 'جوشوا وايزمان',
    blurbAr: 'طهي منزلي جريء، ومعايير متطلبة، "لكن أفضل" يعيد صنع الوجبات السريعة.',
  },
  {
    id: 'food-wishes',
    name: 'Food Wishes (Chef John)',
    handle: '@foodwishes',
    url: 'https://www.youtube.com/@foodwishes',
    blurb: 'Two thousand recipes, one cheerful narrator. The internet\'s most beloved cooking teacher.',
    vibe: 'classic',
    accent: 'gold',
    nameAr: 'رغبات الطعام (الشيف جون)',
    blurbAr: 'ألفي وصفة، وراوي واحد مرح. مدرس الطبخ الأكثر شعبية على الإنترنت.',
  },
  {
    id: 'nyt-cooking',
    name: 'NYT Cooking',
    handle: '@NYTCooking',
    url: 'https://www.youtube.com/@NYTCooking',
    blurb: 'Tutorials with the writers behind the recipes. Mark Bittman, Samin Nosrat, Eric Kim.',
    vibe: 'classic',
    accent: 'ink',
    nameAr: 'نيويورك تايمز الطبخ',
    blurbAr: 'دروس مع الكتاب وراء الوصفات. مارك بيتمان، سامين نصرت، إريك كيم.',
  },
  {
    id: 'king-arthur',
    name: 'King Arthur Baking',
    handle: '@KingArthurBakingCompany',
    url: 'https://www.youtube.com/@KingArthurBakingCompany',
    blurb: 'America\'s oldest flour company teaching everything from sourdough to laminated dough.',
    vibe: 'baking',
    accent: 'gold',
    nameAr: 'الملك آرثر بيكينج',
    blurbAr: 'أقدم شركة دقيق في أمريكا تقوم بتدريس كل شيء بدءًا من العجين المخمر وحتى العجين الرقائقي.',
  },
  {
    id: 'helen-rennie',
    name: 'Helen Rennie',
    handle: '@HelenRennie',
    url: 'https://www.youtube.com/@HelenRennie',
    blurb: 'A culinary instructor explaining technique without the noise. Like a private lesson.',
    vibe: 'science',
    accent: 'sage',
    nameAr: 'هيلين ريني',
    blurbAr: 'مدرب طهي يشرح التقنية بدون ضوضاء. مثل الدرس الخصوصي.',
  },
  {
    id: 'brian-lagerstrom',
    name: 'Brian Lagerstrom',
    handle: '@BrianLagerstrom',
    url: 'https://www.youtube.com/@BrianLagerstrom',
    blurb: 'A former restaurant chef cooking modern dinners that scale to weeknights.',
    vibe: 'modern',
    accent: 'terracotta',
    nameAr: 'بريان لاجرستروم',
    blurbAr: 'طاهٍ سابق في مطعم يقوم بإعداد وجبات العشاء الحديثة التي تمتد حتى ليالي نهاية الأسبوع.',
  },
  {
    id: 'internet-shaquille',
    name: 'Internet Shaquille',
    handle: '@internetshaquille',
    url: 'https://www.youtube.com/@internetshaquille',
    blurb: 'Practical cooking advice in two-minute videos. The thinking person\'s lazy gourmet.',
    vibe: 'budget',
    accent: 'ink',
    nameAr: 'الإنترنت شاكيل',
    blurbAr: 'نصائح عملية للطهي في فيديو مدته دقيقتين. الذواقة كسول الشخص المفكر.',
  },
  {
    id: 'sorted-food',
    name: 'Sorted Food',
    handle: '@SortedFood',
    url: 'https://www.youtube.com/@SortedFood',
    blurb: 'Five British friends cooking together. Equal parts entertainment and useful technique.',
    vibe: 'global',
    accent: 'sage',
    nameAr: 'الطعام المصنف',
    blurbAr: 'خمسة أصدقاء بريطانيين يطبخون معًا. ترفيه متساوي الأجزاء وتقنية مفيدة.',
  },
];
