/**
 * The Drinks Library. Curated cold and hot drinks from across the world,
 * each with a verified video tutorial, bilingual name, ingredients, and a
 * step-by-step method. From Arabic coffee in a dallah to Vietnamese iced
 * coffee through a phin to Limonana with crushed mint.
 */

export type DrinkTemp = 'hot' | 'cold';

export type DrinkCategory =
  | 'coffee'
  | 'tea'
  | 'traditional'
  | 'smoothie'
  | 'lemonade'
  | 'specialty';

export interface Drink {
  id: string;
  name: string;
  nameAr?: string;
  temp: DrinkTemp;
  category: DrinkCategory;
  origin: string;
  story: string;
  ingredients: string[];
  steps: string[];
  videoId: string;
  channel: string;
  featured?: boolean;
  originAr?: string;
  storyAr?: string;
  ingredientsAr?: string[];
  stepsAr?: string[];
}

export const DRINK_CATEGORIES: { id: DrinkCategory; name: string; tagline: string }[] = [
  { id: 'coffee', name: 'Coffee', tagline: 'Hot and iced. Every grind, every ratio.' },
  { id: 'tea', name: 'Tea', tagline: 'From matcha to mint, leaves steeped right.' },
  { id: 'traditional', name: 'Traditional', tagline: 'Heritage drinks from Ramadan tables and beyond.' },
  { id: 'smoothie', name: 'Smoothies', tagline: 'Thick, fresh, no sugar needed.' },
  { id: 'lemonade', name: 'Lemonades', tagline: 'Cold weather is no excuse.' },
  { id: 'specialty', name: 'Specialty', tagline: 'Hot chocolate, sahlab, agua fresca, boba.' },
];

export const DRINKS: Drink[] = [
  // ===================== HOT COFFEE =====================
  {
    id: 'arabic-coffee',
    name: 'Arabic Coffee',
    nameAr: 'القهوة العربية',
    temp: 'hot',
    category: 'coffee',
    origin: 'Arabian Peninsula. UNESCO Intangible Cultural Heritage.',
    story:
      "The first coffee houses on earth opened in 15th-century Yemeni Sufi monasteries. Pale-roasted beans ground with cardamom, brewed in a dallah, poured in tiny finjān cups, served with dates. Hospitality made liquid.",
    ingredients: [
      '3 tbsp lightly roasted Arabic coffee, ground fine',
      '4 cups water',
      '6 green cardamom pods, lightly crushed',
      'Pinch of saffron threads',
      '2 cloves (optional, Gulf style)',
      'Dates to serve',
    ],
    steps: [
      'Bring water to a boil. Add the coffee, lower to a simmer, cook 10 minutes.',
      'Take off the heat. Let the grounds settle 2 minutes.',
      'Pour through a fine strainer back into a clean dallah. Add cardamom, saffron, cloves.',
      'Return to low heat for 5 minutes. Do not boil.',
      'Pour into small finjān cups, no more than a third full. Always serve with dates.',
    ],
    originAr: 'الخليج، السعودية، الأردن.',
    storyAr:
      "قهوة محمّصة فاتحة معطّرة بالهيل، تُسكب من دلّة نحاسية في فناجين صغيرة. ركن الضيافة في كل البيوت العربية، تُقدَّم مع التمر.",
    ingredientsAr: [
      '3 ملعقة كبيرة lightly roasted Arabic coffee, مطحون fine',
      '4 كوب ماء',
      '6 خضار ورقية هيل pods, lightly مهروسة',
      'Pinch of زعفران threads',
      '2 قرنفل (اختياري, Gulf style)',
      'تمر to قدّم',
    ],
    stepsAr: [
      'Bring ماء to اسلق. أضف coffee, lower to اغلِ على نار هادئة, اطبخ 10 دقيقة.',
      'Take off سخن. Let grounds settle 2 دقيقة.',
      'اسكب through fine strainer back into clean dallah. أضف هيل, زعفران, قرنفل.',
      'أعد to low سخن لمدة 5 دقيقة. Do not اسلق.',
      'اسكب into صغير finjān كوب, no more than third full. Always قدّم مع تمر.',
    ],
    videoId: 'PhewVEF_0AA',
    channel: 'The Bite with Jackie',
    featured: true,
  },
  {
    id: 'turkish-coffee',
    name: 'Turkish Coffee',
    nameAr: 'القهوة التركية',
    temp: 'hot',
    category: 'coffee',
    origin: 'Türkiye. UNESCO Intangible Cultural Heritage.',
    story:
      "Finely ground beans, water, sugar, all simmered together in a copper cezve. The foam (kaymak) on top is the mark of a proper cup. Traditionally served with a glass of water and a piece of Turkish delight.",
    ingredients: [
      '1 heaping tsp finely ground Turkish coffee per cup',
      '1 cup of water (use the demitasse for measure)',
      'Sugar to taste: none (sade), light (az), medium (orta), or sweet (şekerli)',
      'Optional: 1 cardamom pod',
    ],
    steps: [
      'Put cold water and sugar in the cezve. Heat over a low flame until sugar dissolves.',
      'Off the heat, add the coffee. Do not stir yet. Let the coffee rest on top for 30 seconds.',
      'Now stir gently once, then return to very low heat.',
      'Watch carefully. As foam rises, pour a little into each cup (foam first, this is essential).',
      'Return the cezve to the heat. Just before it boils over a second time, pour the rest. Serve immediately, foam intact.',
    ],
    originAr: 'تركيا، الشام، الخليج.',
    storyAr:
      "قهوة مطحونة ناعمة جداً تُغلى في ركوة نحاسية حتى ترغّى. الراسب في القاع للقراءة. عمر العادة ثلاث قرون.",
    ingredientsAr: [
      '1 heaping ملعقة صغيرة finely مطحون Turkish coffee per كوب',
      '1 كوب of ماء (use demitasse لمدة measure)',
      'سكر to تذوّق: none (sade), light (az), متوسّط (orta), أو حلو (şekerli)',
      'اختياري: 1 هيل pod',
    ],
    stepsAr: [
      'Put بارد ماء و سكر in cezve. سخن over low flame حتى سكر dissolves.',
      'Off سخن, أضف coffee. Do not قلّب yet. Let coffee rest on top لمدة 30 ثانية.',
      'Now قلّب gently once, then أعد to very low سخن.',
      'Watch carefully. As foam rises, اسكب little into each كوب (foam first, this is essential).',
      'أعد cezve to سخن. Just before it boils over ثانية time, اسكب rest. قدّم immediately, foam intact.',
    ],
    videoId: 'gj7Nnn7ycho',
    channel: 'Insider',
  },
  {
    id: 'espresso',
    name: 'Espresso',
    nameAr: 'إسبريسو',
    temp: 'hot',
    category: 'coffee',
    origin: 'Italy.',
    story:
      "Twenty-five seconds of 9-bar pressure through dark Italian beans. The shot is short, intense, topped with a hazel crema. Every other coffee drink in the Italian repertoire begins here.",
    ingredients: [
      '18 to 21 g freshly ground espresso beans (medium-fine)',
      '36 to 42 g espresso shot (1:2 ratio)',
      'Filtered water at 93 to 95°C',
      'A clean, properly warmed cup',
    ],
    steps: [
      'Grind beans immediately before brewing. The grind should clump slightly when squeezed.',
      'Distribute and tamp evenly with 15 kg of pressure. Level matters more than force.',
      'Lock the portafilter in and start the shot immediately to avoid pre-heating the puck.',
      'A good shot takes 25 to 30 seconds, with a slow honey-like pour that turns from dark to gold to pale.',
      'Drink within 30 seconds. The crema fades fast.',
    ],
    originAr: 'إيطاليا، نابولي وميلانو.',
    storyAr:
      "جوهر القهوة في كأس صغير. ضغط 9 جوّ يخرج العطر والقوام الكريمي. أساس كل القهوة الإيطالية.",
    ingredientsAr: [
      '18 to 21 جرام freshly مطحون espresso فاصوليا (متوسّط-fine)',
      '36 to 42 جرام espresso shot (1:2 ratio)',
      'Filtered ماء at 93 to 95 درجة',
      'clean, properly warmed كوب',
    ],
    stepsAr: [
      'Grind فاصوليا immediately before brewing. grind should clump slightly when squeezed.',
      'Distribute و tamp evenly مع 15 كيلو of pressure. Level matters more than force.',
      'Lock portafilter in و start shot immediately to avoid pre-heating puck.',
      'good shot takes 25 to 30 ثانية, مع slow عسل-like اسكب that turns from dark to gold to pale.',
      'Drink within 30 ثانية. crema fades fast.',
    ],
    videoId: 'NShimEnXxNg',
    channel: 'Tanner Colson',
  },
  {
    id: 'latte-art',
    name: 'Café Latte (with art)',
    nameAr: 'لاتيه',
    temp: 'hot',
    category: 'coffee',
    origin: 'Italian-American.',
    story:
      "One part espresso, two to three parts steamed milk, a layer of microfoam on top. Pour technique turns the foam into art: heart, rosetta, tulip. The Italian classic that became the world's most ordered coffee drink.",
    ingredients: [
      'Double espresso shot (36 g out of 18 g in)',
      '180 ml cold whole milk (fresh, not UHT)',
      'A steam wand and a metal pitcher',
    ],
    steps: [
      'Pull the espresso into a 6 oz cup. Don\'t walk away.',
      'Steam the milk: tip stretched 2-3 seconds (you should hear a soft hiss), then submerge to spin and heat to 60-65°C.',
      'Tap the pitcher on the counter, swirl it, until the foam looks glossy like wet paint.',
      'Pour high into the cup first to fill, then drop close to the surface to lay the foam pattern.',
      'Move the pitcher gently side to side to draw the rosetta, then cut through to finish the stem.',
    ],
    originAr: 'Italian-American.',
    storyAr:
      "One part espresso, two to three parts steamed milk, a layer of microfoam on top. Pour technique turns the foam into art: heart, rosetta, tulip. The Italian classic that became the world's most ordered coffee drink.",
    ingredientsAr: [
      'Double espresso shot (36 جرام out of 18 جرام in)',
      '180 مل بارد كاملة حليب (طازج, not UHT)',
      'بخّر wand و metal pitcher',
    ],
    stepsAr: [
      'Pull espresso into 6 oz كوب. Don\'t walk away.',
      'بخّر حليب: tip stretched 2-3 ثانية (you should hear طري hiss), then submerge to spin و سخن to 60-65 درجة.',
      'Tap pitcher on counter, swirl it, حتى foam looks glossy like wet paint.',
      'اسكب high into كوب first to fill, then أسقط close to surface to lay foam pattern.',
      'Move pitcher gently side to side to draw rosetta, then cut through to finish stem.',
    ],
    videoId: 'ex79wHkVBxE',
    channel: 'subminimal',
  },
  {
    id: 'vietnamese-coffee',
    name: 'Cà Phê Sữa Nóng',
    nameAr: 'قهوة فيتنامية',
    temp: 'hot',
    category: 'coffee',
    origin: 'Vietnam.',
    story:
      "French press technique met Robusta beans and sweetened condensed milk during the colonial era. The result is a sweet, slow-drip ritual: a phin filter sits on top of the glass, the drip takes 3 to 5 minutes, you stir at the end.",
    ingredients: [
      '15 g coarse Vietnamese coffee (Trung Nguyen, Café du Monde)',
      '2 to 3 tbsp sweetened condensed milk',
      '90 ml boiling water',
      'A phin filter',
    ],
    steps: [
      'Add condensed milk to the bottom of the glass.',
      'Add coffee to the phin, level it, press the gravity-insert lightly.',
      'Pour 20 ml of boiling water, wait 30 seconds for the bloom.',
      'Pour the remaining water in. The drip should take 4 to 5 minutes total. If faster, press the insert tighter.',
      'Lift the phin, stir well to combine the condensed milk and coffee, drink hot.',
    ],
    originAr: 'فيتنام.',
    storyAr:
      "قهوة قطّارة فيتنامية فوق طبقة من الحليب المكثّف. تُسكب فوق ثلج. حلوة ومرّة معاً.",
    ingredientsAr: [
      '15 جرام coarse Vietnamese coffee (Trung Nguyen, Café du Monde)',
      '2 to 3 ملعقة كبيرة sweetened condensed حليب',
      '90 مل boiling ماء',
      'phin filter',
    ],
    stepsAr: [
      'أضف condensed حليب to bottom of glass.',
      'أضف coffee to phin, level it, اضغط gravity-insert lightly.',
      'اسكب 20 مل of boiling ماء, wait 30 ثانية لمدة bloom.',
      'اسكب remaining ماء in. drip should take 4 to 5 دقيقة total. If faster, اضغط insert tighter.',
      'ارفع phin, قلّب well to امزج condensed حليب و coffee, drink حار.',
    ],
    videoId: 'B6p4XUYRHt0',
    channel: 'Liz Happybeans',
  },

  // ===================== HOT TEA =====================
  {
    id: 'moroccan-mint-tea',
    name: 'Moroccan Mint Tea',
    nameAr: 'أتاي بالنعنع',
    temp: 'hot',
    category: 'tea',
    origin: 'Morocco.',
    story:
      "Green Chinese gunpowder tea, a bouquet of fresh spearmint, and three sugars. The pour is the spectacle: from a height to aerate, three rounds back into the pot to ensure each glass tastes the same. The first round is bitter as death, the second sweet as life, the third gentle as love.",
    ingredients: [
      '2 tbsp Chinese gunpowder green tea',
      '1 large bunch fresh spearmint',
      '4 to 6 tbsp sugar (to taste)',
      '1 liter boiling water',
      'A traditional Moroccan teapot (berrad)',
    ],
    steps: [
      'Rinse the tea: pour boiling water on the tea in the pot, swirl, and discard. This wakes the leaves and removes bitterness.',
      'Stuff the pot with mint sprigs and sugar.',
      'Fill with boiling water. Steep 4 to 5 minutes.',
      'Pour a small glass, then pour it back into the pot. Repeat 3 times to mix.',
      'Pour from high above the glass to make a foam crown. Drink while watching it bubble.',
    ],
    originAr: 'Morocco.',
    storyAr:
      "Green Chinese gunpowder tea, a bouquet of fresh spearmint, and three sugars. The pour is the spectacle: from a height to aerate, three rounds back into the pot to ensure each glass tastes the same. The first round is bitter as death, the second sweet as life, the third gentle as love.",
    ingredientsAr: [
      '2 ملعقة كبيرة Chinese gunpowder خضار ورقية tea',
      '1 كبير bunch طازج spearmint',
      '4 to 6 ملعقة كبيرة سكر (to تذوّق)',
      '1 liter boiling ماء',
      'traditional Moroccan teapot (berrad)',
    ],
    stepsAr: [
      'اشطف tea: اسكب boiling ماء on tea in pot, swirl, و discard. This wakes leaves و removes bitterness.',
      'Stuff pot مع نعنع sprigs و سكر.',
      'Fill مع boiling ماء. Steep 4 to 5 دقيقة.',
      'اسكب صغير glass, then اسكب it back into pot. كرّر 3 times to اخلط.',
      'اسكب from high above glass to make foam crown. Drink while watching it bubble.',
    ],
    videoId: '6Fk04CSbE6w',
    channel: 'Moribyan',
    featured: true,
  },
  {
    id: 'karak-chai',
    name: 'Karak Chai',
    nameAr: 'كرك',
    temp: 'hot',
    category: 'tea',
    origin: 'Arabian Gulf (Indian-Pakistani roots).',
    story:
      "Strong black tea, evaporated milk, sugar, cardamom and saffron, simmered to a deep mahogany. Sold from street stalls all over the Gulf for less than a dollar, drunk at every hour. The Gulf's signature drink.",
    ingredients: [
      '4 cups water',
      '4 black tea bags (or 3 tbsp loose Assam)',
      '1 cup evaporated milk',
      '4 tbsp sugar (to taste)',
      '4 green cardamom pods, crushed',
      'Pinch of saffron (optional)',
    ],
    steps: [
      'Bring water to a boil. Add tea and cardamom. Boil 4 to 5 minutes (strong tea is the point).',
      'Add evaporated milk and sugar. Simmer for 3 more minutes, stirring.',
      'Add saffron. Cook 1 more minute.',
      'Pour through a fine strainer into small glasses. Drink while still steaming.',
    ],
    originAr: 'Arabian Gulf (Indian-Pakistani roots).',
    storyAr:
      "Strong black tea, evaporated milk, sugar, cardamom and saffron, simmered to a deep mahogany. Sold from street stalls all over the Gulf for less than a dollar, drunk at every hour. The Gulf's signature drink.",
    ingredientsAr: [
      '4 كوب ماء',
      '4 black tea bags (أو 3 ملعقة كبيرة loose Assam)',
      '1 كوب evaporated حليب',
      '4 ملعقة كبيرة سكر (to تذوّق)',
      '4 خضار ورقية هيل pods, مهروسة',
      'Pinch of زعفران (اختياري)',
    ],
    stepsAr: [
      'Bring ماء to اسلق. أضف tea و هيل. اسلق 4 to 5 دقيقة (strong tea is point).',
      'أضف evaporated حليب و سكر. اغلِ على نار هادئة لمدة 3 more دقيقة, stirring.',
      'أضف زعفران. اطبخ 1 more دقيقة.',
      'اسكب through fine strainer into صغير glasses. Drink while still steaming.',
    ],
    videoId: 'tjNEL6j2GsE',
    channel: "Melter's World",
  },
  {
    id: 'masala-chai',
    name: 'Masala Chai',
    nameAr: 'شاي مسالا',
    temp: 'hot',
    category: 'tea',
    origin: 'India.',
    story:
      "India's daily ritual: black tea brewed with whole spices, ginger, milk, and a generous amount of sugar. Every household has its own ratio; every chai wallah on every corner has his own secret.",
    ingredients: [
      '2 cups water',
      '2 cups whole milk',
      '4 black tea bags or 2 tbsp Assam loose',
      '4 tbsp sugar',
      '1 inch fresh ginger, grated',
      'Whole spices: 4 cardamom pods, 4 cloves, 1 cinnamon stick, 1 star anise, 6 black peppercorns',
    ],
    steps: [
      'Crush the whole spices roughly in a mortar.',
      'Bring water, spices, and ginger to a boil. Simmer 5 minutes.',
      'Add the tea, simmer 2 more minutes.',
      'Add milk and sugar. Simmer until just below boiling, 3 to 4 minutes (you want the milk to thicken slightly).',
      'Strain into cups. Drink with biscuits at 4 p.m. or any other time.',
    ],
    originAr: 'الهند، البنغال.',
    storyAr:
      "شاي أسود يُغلى مع توابل كاملة وزنجبيل وحليب وكثير من السكر. لكل بيت نسبته الخاصة، ولكل بائع شاي على كل ناصية سرّه.",
    ingredientsAr: [
      '2 كوب ماء',
      '2 كوب كاملة حليب',
      '4 black tea bags أو 2 ملعقة كبيرة Assam loose',
      '4 ملعقة كبيرة سكر',
      '1 inch طازج زنجبيل, مبشور',
      'كاملة spices: 4 هيل pods, 4 قرنفل, 1 قرفة stick, 1 star anise, 6 black peppercorns',
    ],
    stepsAr: [
      'اهرس كاملة spices roughly in mortar.',
      'Bring ماء, spices, و زنجبيل to اسلق. اغلِ على نار هادئة 5 دقيقة.',
      'أضف tea, اغلِ على نار هادئة 2 more دقيقة.',
      'أضف حليب و سكر. اغلِ على نار هادئة حتى just below boiling, 3 to 4 دقيقة (you want حليب to thicken slightly).',
      'Strain into كوب. Drink مع biscuits at 4 p.m. أو any other time.',
    ],
    videoId: '8fQAxZahx_U',
    channel: 'Food with Chetna',
  },
  {
    id: 'matcha',
    name: 'Matcha',
    nameAr: 'ماتشا',
    temp: 'hot',
    category: 'tea',
    origin: 'Japan.',
    story:
      "Powdered shade-grown green tea, whisked with hot water to a jade foam. The tea ceremony (chanoyu) elevates it to philosophy; the home version is a 90-second ritual that quiets the morning.",
    ingredients: [
      '1 to 2 tsp ceremonial-grade matcha (about 2 g)',
      '70 ml water at 75°C (not boiling)',
      'A bamboo whisk (chasen) and a wide bowl (chawan)',
    ],
    steps: [
      'Sift the matcha through a small fine strainer into the bowl. This removes clumps.',
      'Pour in the warm water (not boiling, or the matcha turns bitter).',
      'Whisk in a fast W or M motion (not circular) until a frothy layer forms on top, about 15 seconds.',
      'Drink straight from the bowl while the foam is alive.',
    ],
    originAr: 'اليابان، مطبخ الزن.',
    storyAr:
      "مسحوق شاي أخضر مخفوق بالماء الساخن حتى يرغّى. تقليد بوذي عمره قرون. مذاق نباتي حلو خفيف.",
    ingredientsAr: [
      '1 to 2 ملعقة صغيرة ceremonial-grade matcha (حوالي 2 جرام)',
      '70 مل ماء at 75 درجة (not boiling)',
      'bamboo اخفق (chasen) و wide bowl (chawan)',
    ],
    stepsAr: [
      'انخل matcha through صغير fine strainer into bowl. This removes clumps.',
      'اسكب in دافئ ماء (not boiling, أو matcha turns bitter).',
      'اخفق in fast W أو M motion (not circular) حتى frothy layer forms on top, حوالي 15 ثانية.',
      'Drink straight from bowl while foam is alive.',
    ],
    videoId: 'fSvGAUf9Hzk',
    channel: 'Green Caffeine',
  },
  {
    id: 'yansoon',
    name: 'Yansoon',
    nameAr: 'يانسون',
    temp: 'hot',
    category: 'tea',
    origin: 'Egypt and the Levant.',
    story:
      "Whole anise seeds steeped to a pale gold tea, served sweet and warming. Eaten by new mothers to encourage milk, drunk on cold evenings to settle the stomach. The smell alone is medicine.",
    ingredients: [
      '1 tbsp whole anise seeds (yansoon)',
      '3 cups water',
      'Sugar to taste',
      'Optional: a few raisins or pine nuts to float on top',
    ],
    steps: [
      'Crush the anise seeds lightly in a mortar to release the oils.',
      'Bring water to a boil. Add seeds. Reduce to a simmer for 10 minutes.',
      'Strain into a cup. Sweeten to taste.',
      'Float a few raisins or pine nuts for the traditional finish.',
    ],
    originAr: 'Egypt and the Levant.',
    storyAr:
      "Whole anise seeds steeped to a pale gold tea, served sweet and warming. Eaten by new mothers to encourage milk, drunk on cold evenings to settle the stomach. The smell alone is medicine.",
    ingredientsAr: [
      '1 ملعقة كبيرة كاملة anise seeds (yansoon)',
      '3 كوب ماء',
      'سكر to تذوّق',
      'اختياري: few زبيب أو صنوبر to float on top',
    ],
    stepsAr: [
      'اهرس anise seeds lightly in mortar to release oils.',
      'Bring ماء to اسلق. أضف seeds. Reduce to اغلِ على نار هادئة لمدة 10 دقيقة.',
      'Strain into كوب. Sweeten to تذوّق.',
      'Float few زبيب أو صنوبر لمدة traditional finish.',
    ],
    videoId: 'szv4qc15H38',
    channel: 'Muhammed the Egyptian Cook',
  },
  {
    id: 'karkadeh-hot',
    name: 'Karkadeh (hot)',
    nameAr: 'كركديه ساخن',
    temp: 'hot',
    category: 'tea',
    origin: 'Egypt and Sudan.',
    story:
      "Dried hibiscus calyces simmered to a deep red tea. Drunk hot in winter, served cold at the Ramadan iftar. The national drink of Sudan; the welcome drink at every Egyptian Nubian home.",
    ingredients: [
      '1 cup dried hibiscus (karkadeh)',
      '5 cups water',
      'Sugar to taste (4 to 6 tbsp)',
      'Optional: cinnamon stick, clove, mint',
    ],
    steps: [
      'Rinse the hibiscus briefly under cold water.',
      'Add to a pot with water (and optional spices). Bring to a boil, then simmer 10 minutes.',
      'Strain through a fine sieve into a teapot. Add sugar while still hot, stir to dissolve.',
      'Drink hot in winter; refrigerate for iced karkadeh in summer.',
    ],
    originAr: 'Egypt and Sudan.',
    storyAr:
      "Dried hibiscus calyces simmered to a deep red tea. Drunk hot in winter, served cold at the Ramadan iftar. The national drink of Sudan; the welcome drink at every Egyptian Nubian home.",
    ingredientsAr: [
      '1 كوب مجفّف hibiscus (karkadeh)',
      '5 كوب ماء',
      'سكر to تذوّق (4 to 6 ملعقة كبيرة)',
      'اختياري: قرفة stick, قرنفل, نعنع',
    ],
    stepsAr: [
      'اشطف hibiscus briefly under بارد ماء.',
      'أضف to pot مع ماء (و اختياري spices). اغلِ على نار قوية, then اغلِ على نار هادئة 10 دقيقة.',
      'Strain through fine sieve into teapot. أضف سكر while still حار, قلّب to dissolve.',
      'Drink حار in winter; ضع في الثلاجة لمدة iced karkadeh in summer.',
    ],
    videoId: 'FKaZSANDn2E',
    channel: 'Kamal Barista',
  },

  // ===================== HOT SPECIALTY =====================
  {
    id: 'hot-chocolate',
    name: 'Italian Hot Chocolate',
    nameAr: 'شوكولاتة ساخنة',
    temp: 'hot',
    category: 'specialty',
    origin: 'Italy.',
    story:
      "Italian hot chocolate is closer to a thick pudding than a drink. Real dark chocolate, milk, cornstarch, and a slow whisk over low heat. Spoonable, intense, served in small cups with a dollop of cream.",
    ingredients: [
      '200 g dark chocolate (70% cacao), chopped',
      '500 ml whole milk',
      '2 tbsp cornstarch',
      '2 tbsp sugar (less if chocolate is sweet)',
      '1 tsp vanilla extract',
      'Whipped cream to top',
    ],
    steps: [
      'Whisk cornstarch and sugar with 100 ml cold milk until smooth.',
      'Warm the remaining milk in a saucepan over medium heat. Add chopped chocolate. Stir until melted.',
      'Pour in the cornstarch slurry while whisking. Continue whisking until thick, 4 to 5 minutes.',
      'Add vanilla. Pour into small cups. Top with whipped cream. Eat with a small spoon.',
    ],
    originAr: 'المكسيك والإسبان قديماً، عالمي حديثاً.',
    storyAr:
      "كاكاو مرّ يُذاب في حليب ساخن مع سكر. النسخة الإسبانية كثيفة جداً، يُغمَس فيها التشيرّوس.",
    ingredientsAr: [
      '200 جرام dark chocolate (70% cacao), مقطّع',
      '500 مل كاملة حليب',
      '2 ملعقة كبيرة نشا',
      '2 ملعقة كبيرة سكر (less if chocolate is حلو)',
      '1 ملعقة صغيرة vanilla extract',
      'Whipped كريمة to top',
    ],
    stepsAr: [
      'اخفق نشا و سكر مع 100 مل بارد حليب حتى smooth.',
      'دافئ remaining حليب in saucepan over متوسّط سخن. أضف مقطّع chocolate. قلّب حتى مذوّبة.',
      'اسكب in نشا slurry while whisking. Continue whisking حتى سميك, 4 to 5 دقيقة.',
      'أضف vanilla. اسكب into صغير كوب. Top مع whipped كريمة. Eat مع صغير spoon.',
    ],
    videoId: 'kRBzdOMH4P4',
    channel: 'The Cooking Foodie',
  },
  {
    id: 'sahlab',
    name: 'Sahlab',
    nameAr: 'سحلب',
    temp: 'hot',
    category: 'specialty',
    origin: 'Levant. The winter drink of Damascus and Beirut.',
    story:
      "A thick, milky orchid-root drink, served piping hot and dusted with cinnamon, pistachios, and coconut. Sold from street carts in cold-weather Levantine cities, drunk by everyone from kids to grandfathers.",
    ingredients: [
      '4 cups whole milk',
      '4 tbsp sugar',
      '3 tbsp cornstarch (or 2 tbsp real sahlab powder)',
      '1 tsp orange blossom water or rose water',
      'To top: cinnamon, crushed pistachios, shredded coconut',
    ],
    steps: [
      'Whisk cornstarch and sugar with 1 cup of cold milk until smooth.',
      'Bring the remaining 3 cups of milk to a gentle simmer.',
      'Pour the cornstarch slurry in slowly, whisking constantly.',
      'Keep whisking 5 to 7 minutes until thick enough to coat a spoon.',
      'Stir in the orange blossom water. Pour into mugs. Top with cinnamon, pistachios, coconut.',
    ],
    originAr: 'بلاد الشام، تركيا، مصر.',
    storyAr:
      "مشروب ساخن قوامه كريمي من مسحوق درنات الأوركيد، أو من النشا. يُقدَّم بالقرفة والمكسرات. مشروب الشتاء بامتياز.",
    ingredientsAr: [
      '4 كوب كاملة حليب',
      '4 ملعقة كبيرة سكر',
      '3 ملعقة كبيرة نشا (أو 2 ملعقة كبيرة real sahlab powder)',
      '1 ملعقة صغيرة برتقال blossom ماء أو ماء ورد',
      'To top: قرفة, مهروسة فستق, shredded coconut',
    ],
    stepsAr: [
      'اخفق نشا و سكر مع 1 كوب of بارد حليب حتى smooth.',
      'Bring remaining 3 كوب of حليب to gentle اغلِ على نار هادئة.',
      'اسكب نشا slurry in slowly, whisking constantly.',
      'Keep whisking 5 to 7 دقيقة حتى سميك enough to coat spoon.',
      'قلّب in برتقال blossom ماء. اسكب into mugs. Top مع قرفة, فستق, coconut.',
    ],
    videoId: 'QQoksMXj20w',
    channel: 'GoldenGully',
  },

  // ===================== COLD COFFEE =====================
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    nameAr: 'لاتيه مثلج',
    temp: 'cold',
    category: 'coffee',
    origin: 'American café culture.',
    story:
      "Two parts cold milk, one part chilled espresso, plenty of ice. The lazy, summery cousin of the cappuccino, designed to keep its temperature in 35°C weather.",
    ingredients: [
      'Double espresso shot, freshly pulled (or 60 ml of strong cold coffee)',
      '180 ml cold whole milk',
      'A glass full of ice',
      'Optional: vanilla syrup or simple syrup, to taste',
    ],
    steps: [
      'Fill a tall glass with ice cubes (more is better, less dilution as it melts).',
      'Pour the cold milk over the ice.',
      'Add syrup if using, stir into the milk.',
      'Slowly pour the espresso shot over the back of a spoon to layer it on top.',
      'Stir before drinking, or sip layered for the first taste.',
    ],
    originAr: 'American café culture.',
    storyAr:
      "Two parts cold milk, one part chilled espresso, plenty of ice. The lazy, summery cousin of the cappuccino, designed to keep its temperature in 35°C weather.",
    ingredientsAr: [
      'Double espresso shot, freshly pulled (أو 60 مل of strong بارد coffee)',
      '180 مل بارد كاملة حليب',
      'glass full of ice',
      'اختياري: vanilla syrup أو simple syrup, to تذوّق',
    ],
    stepsAr: [
      'Fill tall glass مع ice cubes (more is better, less dilution as it melts).',
      'اسكب بارد حليب over ice.',
      'أضف syrup إن استخدمت, قلّب into حليب.',
      'Slowly اسكب espresso shot over back of spoon to layer it on top.',
      'قلّب before drinking, أو sip layered لمدة first تذوّق.',
    ],
    videoId: '88gyJZoTjUc',
    channel: 'kl_tolea',
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew Coffee',
    nameAr: 'كولد بريو',
    temp: 'cold',
    category: 'coffee',
    origin: 'Japanese kyoto-style + American craft.',
    story:
      "Coarse-ground coffee steeped in cold water for 12 to 18 hours. The slow extraction pulls out chocolate, caramel, low-acid notes and leaves the bitter compounds behind. Strong, smooth, surprisingly low in caffeine per ounce.",
    ingredients: [
      '1 cup coarsely ground coffee (like sea salt)',
      '4 cups cold filtered water',
      'A mason jar or carafe',
      'A fine-mesh strainer plus cheesecloth or coffee filter',
    ],
    steps: [
      'Combine grounds and water in the jar. Stir until all grounds are wet.',
      'Cover. Refrigerate 12 to 18 hours (16 is the sweet spot for most beans).',
      'Strain through cheesecloth or a coffee filter into a clean jar. Discard the grounds.',
      'The result is a concentrate. Dilute 1:1 with water or milk to taste. Pour over ice.',
      'Keeps in the fridge for 2 weeks.',
    ],
    originAr: 'Japanese kyoto-style + American craft.',
    storyAr:
      "Coarse-ground coffee steeped in cold water for 12 to 18 hours. The slow extraction pulls out chocolate, caramel, low-acid notes and leaves the bitter compounds behind. Strong, smooth, surprisingly low in caffeine per ounce.",
    ingredientsAr: [
      '1 كوب coarsely مطحون coffee (like sea ملح)',
      '4 كوب بارد filtered ماء',
      'mason jar أو carafe',
      'fine-mesh strainer plus cheesecloth أو coffee filter',
    ],
    stepsAr: [
      'امزج grounds و ماء in jar. قلّب حتى all grounds are wet.',
      'غطِّ. ضع في الثلاجة 12 to 18 ساعة (16 is حلو spot لمدة most فاصوليا).',
      'Strain through cheesecloth أو coffee filter into clean jar. Discard grounds.',
      'result is concentrate. Dilute 1:1 مع ماء أو حليب to تذوّق. اسكب over ice.',
      'Keeps in fridge لمدة 2 weeks.',
    ],
    videoId: 'MWa-WNG3KAM',
    channel: 'Starbucks Coffee',
  },
  {
    id: 'vietnamese-iced-coffee',
    name: 'Cà Phê Sữa Đá',
    nameAr: 'قهوة فيتنامية مثلجة',
    temp: 'cold',
    category: 'coffee',
    origin: 'Vietnam.',
    story:
      "Hot Vietnamese coffee drips through the phin onto sweetened condensed milk, then gets poured over a tall glass of ice. The result is a milkshake-strength caffeine bomb that powered Saigon mornings for generations.",
    ingredients: [
      '15 g coarse Vietnamese coffee',
      '3 tbsp sweetened condensed milk',
      '90 ml boiling water',
      'A tall glass full of ice',
      'A phin filter',
    ],
    steps: [
      'Put condensed milk in a small glass under the phin.',
      'Add coffee to the phin, level, gently press the gravity-insert.',
      'Bloom with 20 ml boiling water. Wait 30 seconds.',
      'Pour the rest of the water in. Wait 4 to 5 minutes for the drip to finish.',
      'Stir well to combine. Pour over a glass of ice. Drink fast.',
    ],
    originAr: 'Vietnam.',
    storyAr:
      "Hot Vietnamese coffee drips through the phin onto sweetened condensed milk, then gets poured over a tall glass of ice. The result is a milkshake-strength caffeine bomb that powered Saigon mornings for generations.",
    ingredientsAr: [
      '15 جرام coarse Vietnamese coffee',
      '3 ملعقة كبيرة sweetened condensed حليب',
      '90 مل boiling ماء',
      'tall glass full of ice',
      'phin filter',
    ],
    stepsAr: [
      'Put condensed حليب in صغير glass under phin.',
      'أضف coffee to phin, level, gently اضغط gravity-insert.',
      'Bloom مع 20 مل boiling ماء. Wait 30 ثانية.',
      'اسكب rest of ماء in. Wait 4 to 5 دقيقة لمدة drip to finish.',
      'قلّب well to امزج. اسكب over glass of ice. Drink fast.',
    ],
    videoId: 'YCycY6GZQbY',
    channel: 'Ethan Rode',
    featured: true,
  },

  // ===================== TRADITIONAL COLD =====================
  {
    id: 'limonana',
    name: 'Limonana',
    nameAr: 'ليمون بالنعنع',
    temp: 'cold',
    category: 'lemonade',
    origin: 'Levant.',
    story:
      "Lemonade blended with a bushel of fresh mint, ice, sugar. The mint turns the drink minty green and the slush turns the lemonade into a frozen treat. The Levant's signature summer drink.",
    ingredients: [
      '4 lemons, juiced (about 1 cup juice)',
      '4 cups cold water',
      '1 large bunch fresh mint (leaves picked, about 2 packed cups)',
      '4 to 6 tbsp sugar',
      '2 cups ice',
    ],
    steps: [
      'Combine half the lemon juice, sugar, water, mint, and 1 cup of ice in a blender.',
      'Blend on high for 30 seconds until the mint disappears and the liquid is frothy green.',
      'Strain through a fine sieve into a pitcher (optional, some prefer with the bits).',
      'Add the remaining lemon juice, water, and ice. Stir.',
      'Pour into tall glasses. Top with a mint sprig.',
    ],
    originAr: 'Levant.',
    storyAr:
      "Lemonade blended with a bushel of fresh mint, ice, sugar. The mint turns the drink minty green and the slush turns the lemonade into a frozen treat. The Levant's signature summer drink.",
    ingredientsAr: [
      '4 lemons, juiced (حوالي 1 كوب juice)',
      '4 كوب بارد ماء',
      '1 كبير bunch طازج نعنع (leaves picked, حوالي 2 packed كوب)',
      '4 to 6 ملعقة كبيرة سكر',
      '2 كوب ice',
    ],
    stepsAr: [
      'امزج half ليمون juice, سكر, ماء, نعنع, و 1 كوب of ice in blender.',
      'اخلط في الخلاط on high لمدة 30 ثانية حتى نعنع disappears و liquid is frothy خضار ورقية.',
      'Strain through fine sieve into pitcher (اختياري, some prefer مع bits).',
      'أضف remaining ليمون juice, ماء, و ice. قلّب.',
      'اسكب into tall glasses. Top مع نعنع sprig.',
    ],
    videoId: 'IYSQiunuEyI',
    channel: 'Connie Kazan',
  },
  {
    id: 'lemonade-classic',
    name: 'Fresh Lemonade',
    nameAr: 'عصير ليمون',
    temp: 'cold',
    category: 'lemonade',
    origin: 'Worldwide. The universal summer drink.',
    story:
      "Fresh lemon juice, water, sugar, ice. The trick is the syrup: dissolve the sugar in warm water before adding cold water and lemon, otherwise it sits at the bottom of the glass and the top tastes sour.",
    ingredients: [
      '1 cup fresh lemon juice (about 5 to 6 lemons)',
      '6 cups cold water',
      '1 cup sugar',
      '1 cup hot water (to dissolve the sugar)',
      'Ice and lemon slices',
    ],
    steps: [
      'In a pitcher, dissolve sugar in the hot water completely. This is your simple syrup.',
      'Add lemon juice and cold water. Stir.',
      'Taste and adjust: more lemon for sour, more sugar for sweet.',
      'Refrigerate 30 minutes to chill, then pour over ice with a lemon slice.',
    ],
    originAr: 'Worldwide. The universal summer drink.',
    storyAr:
      "Fresh lemon juice, water, sugar, ice. The trick is the syrup: dissolve the sugar in warm water before adding cold water and lemon, otherwise it sits at the bottom of the glass and the top tastes sour.",
    ingredientsAr: [
      '1 كوب طازج ليمون juice (حوالي 5 to 6 lemons)',
      '6 كوب بارد ماء',
      '1 كوب سكر',
      '1 كوب حار ماء (to dissolve سكر)',
      'Ice و ليمون slices',
    ],
    stepsAr: [
      'In pitcher, dissolve سكر in حار ماء completely. This is your simple syrup.',
      'أضف ليمون juice و بارد ماء. قلّب.',
      'تذوّق و adjust: more ليمون لمدة حامض, more سكر لمدة حلو.',
      'ضع في الثلاجة 30 دقيقة to برّد في الثلاجة, then اسكب over ice مع ليمون قطّع شرائح.',
    ],
    videoId: '1BwGLKkUIOk',
    channel: 'Nick DiGiovanni',
  },
  {
    id: 'tamr-hindi',
    name: 'Tamr Hindi (Tamarind Drink)',
    nameAr: 'تمر هندي',
    temp: 'cold',
    category: 'traditional',
    origin: 'Levant and Egypt. The classic Ramadan iftar drink.',
    story:
      "Tamarind pulp soaked, strained, sweetened, cooled. The taste is fruity-sour-sweet, and it cools the body fast after a long fasting day. Sold by Damascus street vendors from a giant brass back-mounted vessel with built-in cups.",
    ingredients: [
      '200 g tamarind paste (or seedless tamarind block)',
      '6 cups warm water (for soaking)',
      '4 cups cold water (to dilute)',
      '6 to 8 tbsp sugar (to taste)',
      'Ice',
      'Optional: a pinch of rose water',
    ],
    steps: [
      'Break tamarind into pieces. Soak in warm water for 30 minutes, occasionally crushing with a spoon.',
      'Strain through a fine sieve, pressing all the pulp through. Discard the fibers and seeds.',
      'Add sugar to the still-warm strained liquid, stir to dissolve.',
      'Add cold water to dilute, adjust sweetness, optionally add rose water.',
      'Chill at least 2 hours. Pour over ice.',
    ],
    originAr: 'Levant and Egypt. The classic Ramadan iftar drink.',
    storyAr:
      "Tamarind pulp soaked, strained, sweetened, cooled. The taste is fruity-sour-sweet, and it cools the body fast after a long fasting day. Sold by Damascus street vendors from a giant brass back-mounted vessel with built-in cups.",
    ingredientsAr: [
      '200 جرام tamarind paste (أو seedless tamarind block)',
      '6 كوب دافئ ماء (لمدة soaking)',
      '4 كوب بارد ماء (to dilute)',
      '6 to 8 ملعقة كبيرة سكر (to تذوّق)',
      'Ice',
      'اختياري: pinch of ماء ورد',
    ],
    stepsAr: [
      'Break tamarind into pieces. انقع in دافئ ماء لمدة 30 دقيقة, occasionally crushing مع spoon.',
      'Strain through fine sieve, pressing all pulp through. Discard fibers و seeds.',
      'أضف سكر to still-دافئ strained liquid, قلّب to dissolve.',
      'أضف بارد ماء to dilute, adjust sweetness, optionally أضف ماء ورد.',
      'برّد في الثلاجة at least 2 ساعة. اسكب over ice.',
    ],
    videoId: '71WOEiouvSY',
    channel: 'Shanaz Rafiq',
  },
  {
    id: 'jallab',
    name: 'Jallab',
    nameAr: 'جلاب',
    temp: 'cold',
    category: 'traditional',
    origin: 'Levant.',
    story:
      "Date molasses, grape molasses, rose water, ice, and a crown of pine nuts and raisins floating on top. The drink looks like liquid amber. The pine nuts swell as they soak and become a treat at the bottom of the glass.",
    ingredients: [
      '3 tbsp date molasses (dibs)',
      '1 tbsp grape molasses (or substitute with more date molasses)',
      '1 tsp rose water',
      '1 cup cold water',
      'A handful of crushed ice',
      'To top: 1 tbsp pine nuts, 1 tbsp golden raisins',
    ],
    steps: [
      'Soak the pine nuts and raisins in a little water for 10 minutes so they plump up.',
      'In a tall glass, stir the date and grape molasses into cold water until fully dissolved.',
      'Add rose water and crushed ice.',
      'Top with the soaked pine nuts and raisins. The combination of the cold sweet liquid and the chewy nuts is the whole point.',
    ],
    originAr: 'بلاد الشام، رمضان.',
    storyAr:
      "دبس تمر ودبس عنب مخفّفان بماء الورد والصنوبر والثلج المجروش. مشروب الإفطار التقليدي في رمضان.",
    ingredientsAr: [
      '3 ملعقة كبيرة تمر دبس (dibs)',
      '1 ملعقة كبيرة grape دبس (أو substitute مع more تمر دبس)',
      '1 ملعقة صغيرة ماء ورد',
      '1 كوب بارد ماء',
      'handful of مهروسة ice',
      'To top: 1 ملعقة كبيرة صنوبر, 1 ملعقة كبيرة ذهبي زبيب',
    ],
    stepsAr: [
      'انقع صنوبر و زبيب in little ماء لمدة 10 دقيقة so they plump up.',
      'In tall glass, قلّب تمر و grape دبس into بارد ماء حتى fully dissolved.',
      'أضف ماء ورد و مهروسة ice.',
      'Top مع soaked صنوبر و زبيب. combination of بارد حلو liquid و chewy nuts is كاملة point.',
    ],
    videoId: 'IBe-cFUO8ps',
    channel: 'Summers Homemade Meals',
  },
  {
    id: 'ayran',
    name: 'Ayran',
    nameAr: 'عيران',
    temp: 'cold',
    category: 'traditional',
    origin: 'Türkiye. The national drink.',
    story:
      "Plain yogurt, water, salt, whisked to a foamy froth. Drunk with kebabs, drunk at lunch, drunk after exercise. Replaces water in summer. Cheap, healthy, and absolutely refreshing.",
    ingredients: [
      '2 cups thick plain yogurt (Turkish or Greek)',
      '2 cups cold water (or sparkling)',
      '1/2 tsp salt (to taste)',
      'Ice cubes',
      'Optional: a few mint leaves',
    ],
    steps: [
      'Whisk yogurt vigorously in a bowl until smooth and lump-free.',
      'Whisk in the cold water gradually. The texture should be like buttermilk.',
      'Add salt to taste. It should taste mildly salty, not bland.',
      'Pour over ice in tall glasses. Top with mint if using.',
    ],
    originAr: 'Türkiye. The national drink.',
    storyAr:
      "Plain yogurt, water, salt, whisked to a foamy froth. Drunk with kebabs, drunk at lunch, drunk after exercise. Replaces water in summer. Cheap, healthy, and absolutely refreshing.",
    ingredientsAr: [
      '2 كوب سميك plain لبن (Turkish أو Greek)',
      '2 كوب بارد ماء (أو sparkling)',
      '1/2 ملعقة صغيرة ملح (to تذوّق)',
      'Ice cubes',
      'اختياري: few نعنع leaves',
    ],
    stepsAr: [
      'اخفق لبن vigorously في وعاء حتى smooth و lump-free.',
      'اخفق in بارد ماء gradually. texture should be like buttermilk.',
      'أضف ملح to تذوّق. It should تذوّق mildly salty, not bland.',
      'اسكب over ice in tall glasses. Top مع نعنع إن استخدمت.',
    ],
    videoId: 'XSAKGapI47M',
    channel: 'Hilltop Recipes',
  },
  {
    id: 'karkadeh-cold',
    name: 'Karkadeh (iced)',
    nameAr: 'كركديه بارد',
    temp: 'cold',
    category: 'traditional',
    origin: 'Egypt.',
    story:
      "The same dried hibiscus drink as the hot version, brewed strong and chilled. Pour it over crushed ice during a 40°C Cairo afternoon, and the world starts to make sense again. The classic iftar drink of Ramadan.",
    ingredients: [
      '1 cup dried hibiscus (karkadeh)',
      '5 cups water',
      '6 to 8 tbsp sugar (to taste)',
      'Ice and lemon slices',
    ],
    steps: [
      'Boil water, add hibiscus, simmer 10 minutes.',
      'Strain into a pitcher while hot. Add sugar, stir to dissolve.',
      'Cool to room temperature, then refrigerate at least 4 hours.',
      'Pour over a tall glass full of ice. Add a slice of lemon.',
    ],
    originAr: 'Egypt.',
    storyAr:
      "The same dried hibiscus drink as the hot version, brewed strong and chilled. Pour it over crushed ice during a 40°C Cairo afternoon, and the world starts to make sense again. The classic iftar drink of Ramadan.",
    ingredientsAr: [
      '1 كوب مجفّف hibiscus (karkadeh)',
      '5 كوب ماء',
      '6 to 8 ملعقة كبيرة سكر (to تذوّق)',
      'Ice و ليمون slices',
    ],
    stepsAr: [
      'اسلق ماء, أضف hibiscus, اغلِ على نار هادئة 10 دقيقة.',
      'Strain into pitcher while حار. أضف سكر, قلّب to dissolve.',
      'برّد to room temperature, then ضع في الثلاجة at least 4 ساعة.',
      'اسكب over tall glass full of ice. أضف قطّع شرائح of ليمون.',
    ],
    videoId: 'xhEd7z2In5w',
    channel: 'The Golden Balance',
  },
  {
    id: 'qamar-al-din',
    name: 'Qamar al-Din',
    nameAr: 'قمر الدين',
    temp: 'cold',
    category: 'traditional',
    origin: 'Syria, Egypt, the Levant. A Ramadan signature.',
    story:
      "Sheets of dried apricot paste soaked in water until they dissolve into a thick orange nectar. The name means 'moon of the religion', a reference to the start of Ramadan. The drink itself is so concentrated in fruit it tastes like apricot summarized.",
    ingredients: [
      '250 g qamar al-din sheets (Syrian dried apricot paste)',
      '4 cups warm water',
      '3 tbsp sugar (less if the paste is sweet enough)',
      '1 tsp orange blossom water',
      'Ice',
      'Optional: pine nuts to garnish',
    ],
    steps: [
      'Tear the qamar al-din into small pieces. Soak in warm water for 4 hours or overnight.',
      'Blend until completely smooth.',
      'Strain through a fine sieve to remove any fibers.',
      'Add sugar and orange blossom water. Adjust thickness with more cold water if too dense.',
      'Refrigerate 2 hours. Pour over ice. Top with pine nuts.',
    ],
    originAr: 'Syria, Egypt, the Levant. A Ramadan signature.',
    storyAr:
      "Sheets of dried apricot paste soaked in water until they dissolve into a thick orange nectar. The name means 'moon of the religion', a reference to the start of Ramadan. The drink itself is so concentrated in fruit it tastes like apricot summarized.",
    ingredientsAr: [
      '250 جرام qamar al-din sheets (Syrian مجفّف apricot paste)',
      '4 كوب دافئ ماء',
      '3 ملعقة كبيرة سكر (less if paste is حلو enough)',
      '1 ملعقة صغيرة برتقال blossom ماء',
      'Ice',
      'اختياري: صنوبر to زيّن',
    ],
    stepsAr: [
      'Tear qamar al-din into صغير pieces. انقع in دافئ ماء لمدة 4 ساعة أو overnight.',
      'اخلط في الخلاط حتى completely smooth.',
      'Strain through fine sieve to ارفع any fibers.',
      'أضف سكر و برتقال blossom ماء. Adjust thickness مع more بارد ماء if too dense.',
      'ضع في الثلاجة 2 ساعة. اسكب over ice. Top مع صنوبر.',
    ],
    videoId: 'C_6B_B3ZQUI',
    channel: 'Muhammed the Egyptian Cook',
  },
  {
    id: 'sobia',
    name: 'Sobia',
    nameAr: 'سوبيا',
    temp: 'cold',
    category: 'traditional',
    origin: 'Egypt and Saudi Arabia.',
    story:
      "A milky white drink of soaked coconut, rice, milk, sugar, and vanilla. Cool, creamy, served by Cairo street vendors during Ramadan with a sprinkle of cinnamon. The Saudi version drops the milk and uses bread instead.",
    ingredients: [
      '1/2 cup short-grain rice, soaked overnight',
      '1/2 cup desiccated coconut',
      '4 cups whole milk',
      '4 cups cold water',
      '6 tbsp sugar (or to taste)',
      '1 tsp vanilla',
      'Cinnamon to top',
    ],
    steps: [
      'Drain the soaked rice. Add to a blender with the coconut, water, and 2 cups of milk.',
      'Blend until completely smooth, 2 minutes.',
      'Strain through a fine cloth or fine sieve into a pitcher, pressing out all the liquid.',
      'Stir in remaining milk, sugar, vanilla. Refrigerate 4 hours.',
      'Pour into glasses, sprinkle cinnamon on top.',
    ],
    originAr: 'Egypt and Saudi Arabia.',
    storyAr:
      "A milky white drink of soaked coconut, rice, milk, sugar, and vanilla. Cool, creamy, served by Cairo street vendors during Ramadan with a sprinkle of cinnamon. The Saudi version drops the milk and uses bread instead.",
    ingredientsAr: [
      '1/2 كوب short-grain أرز, soaked overnight',
      '1/2 كوب desiccated coconut',
      '4 كوب كاملة حليب',
      '4 كوب بارد ماء',
      '6 ملعقة كبيرة سكر (أو to تذوّق)',
      '1 ملعقة صغيرة vanilla',
      'قرفة to top',
    ],
    stepsAr: [
      'صفِّ soaked أرز. أضف to blender مع coconut, ماء, و 2 كوب of حليب.',
      'اخلط في الخلاط حتى completely smooth, 2 دقيقة.',
      'Strain through fine cloth أو fine sieve into pitcher, pressing out all liquid.',
      'قلّب in remaining حليب, سكر, vanilla. ضع في الثلاجة 4 ساعة.',
      'اسكب into glasses, رشّ قرفة on top.',
    ],
    videoId: 'XLjoQPFb3fE',
    channel: 'The Cook Girl',
  },
  {
    id: 'doogh',
    name: 'Doogh',
    nameAr: 'دوغ',
    temp: 'cold',
    category: 'traditional',
    origin: 'Iran.',
    story:
      "The Persian cousin of ayran: thick yogurt, sparkling water, dried mint, sometimes a pinch of black pepper. Salty-tangy, served alongside Persian rice dishes like kebab koobideh.",
    ingredients: [
      '1 cup thick plain yogurt',
      '2 cups cold sparkling water',
      '1 tsp dried mint',
      '1/2 tsp salt',
      'Optional: a few fresh mint leaves, a tiny pinch of black pepper',
    ],
    steps: [
      'Whisk yogurt until smooth.',
      'Slowly add sparkling water while whisking gently (do not over-mix or you lose the fizz).',
      'Stir in dried mint and salt.',
      'Pour over ice in tall glasses. Garnish with fresh mint.',
    ],
    originAr: 'Iran.',
    storyAr:
      "The Persian cousin of ayran: thick yogurt, sparkling water, dried mint, sometimes a pinch of black pepper. Salty-tangy, served alongside Persian rice dishes like kebab koobideh.",
    ingredientsAr: [
      '1 كوب سميك plain لبن',
      '2 كوب بارد sparkling ماء',
      '1 ملعقة صغيرة مجفّف نعنع',
      '1/2 ملعقة صغيرة ملح',
      'اختياري: few طازج نعنع leaves, tiny pinch of black فلفل',
    ],
    stepsAr: [
      'اخفق لبن حتى smooth.',
      'Slowly أضف sparkling ماء while whisking gently (do not over-اخلط أو you lose fizz).',
      'قلّب in مجفّف نعنع و ملح.',
      'اسكب over ice in tall glasses. زيّن مع طازج نعنع.',
    ],
    videoId: '1veaCs1NXlA',
    channel: 'Cooking With Yousef',
  },

  // ===================== SMOOTHIES =====================
  {
    id: 'mango-smoothie',
    name: 'Mango Smoothie',
    nameAr: 'عصير مانجو',
    temp: 'cold',
    category: 'smoothie',
    origin: 'Tropical. Indian lassi roots.',
    story:
      "Two ripe mangoes, frozen banana, a splash of milk or coconut water, a touch of honey. The result is so thick a spoon stands up in it. The mango must be in season; otherwise use frozen.",
    ingredients: [
      '2 ripe mangoes (or 2 cups frozen mango)',
      '1 frozen banana',
      '1/2 cup milk or coconut water',
      '1/2 cup yogurt (optional, for thicker)',
      '1 tbsp honey (optional)',
      'Squeeze of lime',
    ],
    steps: [
      'Peel and cube the mangoes. (If using fresh, freeze them first for 1 hour, this makes the texture so much better.)',
      'Blend mango, banana, milk, yogurt on high until completely smooth.',
      'Add honey to taste and a squeeze of lime to brighten.',
      'Pour into a tall glass. Top with a few extra mango cubes.',
    ],
    originAr: 'Tropical. Indian lassi roots.',
    storyAr:
      "Two ripe mangoes, frozen banana, a splash of milk or coconut water, a touch of honey. The result is so thick a spoon stands up in it. The mango must be in season; otherwise use frozen.",
    ingredientsAr: [
      '2 ripe mangoes (أو 2 كوب frozen mango)',
      '1 frozen موز',
      '1/2 كوب حليب أو coconut ماء',
      '1/2 كوب لبن (اختياري, لمدة thicker)',
      '1 ملعقة كبيرة عسل (اختياري)',
      'اعصر of lime',
    ],
    stepsAr: [
      'قشّر و cube mangoes. (إن استخدمت طازج, freeze them first لمدة 1 ساعة, this makes texture so much better.)',
      'اخلط في الخلاط mango, موز, حليب, لبن on high حتى completely smooth.',
      'أضف عسل to تذوّق و اعصر of lime to brighten.',
      'اسكب into tall glass. Top مع few extra mango cubes.',
    ],
    videoId: 'BFn3y-na_rk',
    channel: 'smoothieflip',
  },
  {
    id: 'watermelon-agua-fresca',
    name: 'Watermelon Agua Fresca',
    nameAr: 'عصير بطيخ',
    temp: 'cold',
    category: 'smoothie',
    origin: 'Mexico.',
    story:
      "Pureed watermelon, lime, a little sugar, water. Strained for crystal clarity, served in tall glasses over ice. The drink that powers Mexican afternoons.",
    ingredients: [
      '6 cups cubed watermelon (seedless)',
      '1 cup cold water',
      'Juice of 1 lime',
      '2 to 3 tbsp sugar (or to taste)',
      'A few mint leaves',
      'Ice',
    ],
    steps: [
      'Blend watermelon and water on high until completely smooth.',
      'Strain through a fine sieve into a pitcher (or skip if you like pulp).',
      'Add lime juice and sugar to taste. Stir to dissolve.',
      'Refrigerate at least 1 hour. Pour over ice. Garnish with mint.',
    ],
    originAr: 'Mexico.',
    storyAr:
      "Pureed watermelon, lime, a little sugar, water. Strained for crystal clarity, served in tall glasses over ice. The drink that powers Mexican afternoons.",
    ingredientsAr: [
      '6 كوب cubed watermelon (seedless)',
      '1 كوب بارد ماء',
      'عصير 1 lime',
      '2 to 3 ملعقة كبيرة سكر (أو to تذوّق)',
      'few نعنع leaves',
      'Ice',
    ],
    stepsAr: [
      'اخلط في الخلاط watermelon و ماء on high حتى completely smooth.',
      'Strain through fine sieve into pitcher (أو skip if you like pulp).',
      'أضف lime juice و سكر to تذوّق. قلّب to dissolve.',
      'ضع في الثلاجة at least 1 ساعة. اسكب over ice. زيّن مع نعنع.',
    ],
    videoId: '3Dj5NdexWqQ',
    channel: 'Dinner Ideas',
  },

  // ===================== SPECIALTY COLD =====================
  {
    id: 'boba-milk-tea',
    name: 'Boba Milk Tea',
    nameAr: 'بوبا',
    temp: 'cold',
    category: 'specialty',
    origin: 'Taiwan.',
    story:
      "Black tea, sweetened milk, chewy tapioca pearls. Invented in Taichung in the 1980s, now a global phenomenon. The pearls must be chewy but never crunchy, and the wide straw is essential.",
    ingredients: [
      '1/3 cup dried tapioca pearls',
      '2 black tea bags',
      '2 cups water',
      '1/2 cup whole milk',
      '2 tbsp brown sugar syrup (boil 1:1 brown sugar and water for 5 min)',
      'Ice',
    ],
    steps: [
      'Boil tapioca pearls in plenty of water for 20 to 25 minutes, until completely chewy. Drain.',
      'Soak the cooked pearls in brown sugar syrup for 10 minutes.',
      'Brew strong tea with the 2 tea bags in 2 cups boiling water, 5 minutes. Cool.',
      'In a tall glass: 3 tbsp pearls + brown sugar syrup, fill with ice, pour milk over, pour cold tea on top.',
      'Stir well before drinking. Wide straw.',
    ],
    originAr: 'Taiwan.',
    storyAr:
      "Black tea, sweetened milk, chewy tapioca pearls. Invented in Taichung in the 1980s, now a global phenomenon. The pearls must be chewy but never crunchy, and the wide straw is essential.",
    ingredientsAr: [
      '1/3 كوب مجفّف tapioca pearls',
      '2 black tea bags',
      '2 كوب ماء',
      '1/2 كوب كاملة حليب',
      '2 ملعقة كبيرة حمّر سكر syrup (اسلق 1:1 حمّر سكر و ماء لمدة 5 دقيقة)',
      'Ice',
    ],
    stepsAr: [
      'اسلق tapioca pearls in plenty of ماء لمدة 20 to 25 دقيقة, حتى completely chewy. صفِّ.',
      'انقع cooked pearls in حمّر سكر syrup لمدة 10 دقيقة.',
      'Brew strong tea مع 2 tea bags in 2 كوب boiling ماء, 5 دقيقة. برّد.',
      'In tall glass: 3 ملعقة كبيرة pearls + حمّر سكر syrup, fill مع ice, اسكب حليب over, اسكب بارد tea on top.',
      'قلّب well before drinking. Wide straw.',
    ],
    videoId: 'pjykSYFQMkc',
    channel: 'SarapChannel',
  },
];

export const FEATURED_DRINKS: Drink[] = DRINKS.filter((d) => d.featured);

export function drinksForCategory(c: DrinkCategory): Drink[] {
  return DRINKS.filter((d) => d.category === c);
}

export function drinksForTemp(t: DrinkTemp): Drink[] {
  return DRINKS.filter((d) => d.temp === t);
}
