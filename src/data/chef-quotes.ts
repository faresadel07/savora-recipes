/**
 * Famous short quotes from world-renowned chefs and Arab cookbook writers.
 * Displayed on the home page as a horizontal scroll of testimonial-style
 * cards, modeled after the "featured comments" carousels YouTube creators
 * use. Each entry pairs a verified or widely-attributed quote with the
 * speaker's name, role, and a portrait at /public/chefs/{id}.jpg.
 *
 * Portraits are sourced from Wikimedia Commons (CC / public domain) via
 * the helper script C:\tmp\download-chef-portraits.py. If a portrait file
 * is missing, the card falls back to a typographic monogram.
 */

export interface ChefQuote {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  quote: string;
  quoteAr: string;
  /** Filename in /public/chefs/, e.g. 'julia-child.jpg'. */
  portrait: string;
}

export const CHEF_QUOTES: ChefQuote[] = [
  {
    id: 'julia-child',
    name: 'Julia Child',
    nameAr: 'جوليا تشايلد',
    role: 'American chef and author',
    roleAr: 'شيف وكاتبة أمريكية',
    quote: 'People who love to eat are always the best people.',
    quoteAr: 'الناس الذين يحبون الطعام هم دائماً أفضل الناس.',
    portrait: 'julia-child.jpg',
  },
  {
    id: 'massimo-bottura',
    name: 'Massimo Bottura',
    nameAr: 'ماسيمو بوتورا',
    role: 'Chef, Osteria Francescana',
    roleAr: 'شيف، أوستيريا فرانتشيسكانا',
    quote: 'Tradition is innovation that has succeeded.',
    quoteAr: 'التقليد هو الابتكار الذي نجح.',
    portrait: 'massimo-bottura.jpg',
  },
  {
    id: 'anthony-bourdain',
    name: 'Anthony Bourdain',
    nameAr: 'أنتوني بوردين',
    role: 'Chef and writer',
    roleAr: 'شيف وكاتب',
    quote: 'Travel changes you. It should change you, and leave marks on you.',
    quoteAr: 'السفر يغيّرك. يجب أن يغيّرك، وأن يترك أثره عليك.',
    portrait: 'anthony-bourdain.jpg',
  },
  {
    id: 'alice-waters',
    name: 'Alice Waters',
    nameAr: 'أليس ووترز',
    role: 'Founder, Chez Panisse',
    roleAr: 'مؤسِّسة مطعم شي بانيس',
    quote: 'Let things taste of what they are.',
    quoteAr: 'دع الأشياء تكون بطعم ذاتها.',
    portrait: 'alice-waters.jpg',
  },
  {
    id: 'jacques-pepin',
    name: 'Jacques Pépin',
    nameAr: 'جاك بيبان',
    role: 'French master chef',
    roleAr: 'شيف فرنسي',
    quote: 'Cooking done with care is an act of love.',
    quoteAr: 'الطبخ بعناية فعل من أفعال الحب.',
    portrait: 'jacques-pepin.jpg',
  },
  {
    id: 'auguste-escoffier',
    name: 'Auguste Escoffier',
    nameAr: 'أوغست إسكوفييه',
    role: 'Father of modern French cuisine',
    roleAr: 'مؤسِّس المطبخ الفرنسي الحديث',
    quote: 'Good food is the foundation of genuine happiness.',
    quoteAr: 'الطعام الجيد أساس السعادة الحقيقية.',
    portrait: 'auguste-escoffier.jpg',
  },
  {
    id: 'marco-pierre-white',
    name: 'Marco Pierre White',
    nameAr: 'ماركو بيير وايت',
    role: 'British chef and restaurateur',
    roleAr: 'شيف ومالك مطاعم بريطاني',
    quote: 'Mother Nature is the true artist. Our role is to honor her work.',
    quoteAr: 'الطبيعة هي الفنّان الحقيقي. دورنا أن نُكرم عملها.',
    portrait: 'marco-pierre-white.jpg',
  },
  {
    id: 'thomas-keller',
    name: 'Thomas Keller',
    nameAr: 'توماس كيلر',
    role: 'Chef, The French Laundry',
    roleAr: 'شيف، ذا فرنش لوندري',
    quote: 'A recipe has no soul. You as the cook must bring soul to it.',
    quoteAr: 'الوصفة بلا روح. أنت الطبّاخ من يمنحها الروح.',
    portrait: 'thomas-keller.jpg',
  },
  {
    id: 'jose-andres',
    name: 'José Andrés',
    nameAr: 'خوسيه أندريس',
    role: 'Chef, founder of World Central Kitchen',
    roleAr: 'شيف، مؤسِّس وورلد سنترال كيتشن',
    quote: 'Food is everything. Food is family, food is identity.',
    quoteAr: 'الطعام هو كل شيء. الطعام عائلة، الطعام هويّة.',
    portrait: 'jose-andres.jpg',
  },
  {
    id: 'yotam-ottolenghi',
    name: 'Yotam Ottolenghi',
    nameAr: 'يوتام أوتولينغي',
    role: 'Chef and author',
    roleAr: 'شيف وكاتب',
    quote: 'Vegetables are not a supporting cast. They are the lead.',
    quoteAr: 'الخضار ليست دور ثانوي. هي البطل.',
    portrait: 'yotam-ottolenghi.jpg',
  },
  {
    id: 'sami-tamimi',
    name: 'Sami Tamimi',
    nameAr: 'سامي التميمي',
    role: 'Palestinian chef, author of Falastin',
    roleAr: 'شيف فلسطيني، مؤلِّف فلسطين',
    quote: 'Food is how we keep a country alive when its borders try to take it away.',
    quoteAr: 'الطعام هو كيف نُبقي وطناً حيّاً حين تحاول الحدود أن تأخذه منا.',
    portrait: 'sami-tamimi.jpg',
  },
  {
    id: 'reem-kassis',
    name: 'Reem Kassis',
    nameAr: 'ريم قسيس',
    role: 'Palestinian author, The Palestinian Table',
    roleAr: 'كاتبة فلسطينية، الطاولة الفلسطينية',
    quote: 'There is no single Arab cuisine. There are dozens, and that is the point.',
    quoteAr: 'لا يوجد مطبخ عربي واحد. هناك العشرات، وهذا هو جوهر الأمر.',
    portrait: 'reem-kassis.jpg',
  },
];
