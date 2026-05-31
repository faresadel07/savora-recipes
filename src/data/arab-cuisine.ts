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
      "The Nile valley's kitchen, koshari from the streets of Cairo, molokhia simmered in chicken broth, ful medames eaten at dawn before fasting.",
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
  ingredients: string[];
  steps: string[];
  videoId: string; // YouTube ID. Thumbnail at img.youtube.com/vi/{id}/maxresdefault.jpg; embed at youtube.com/embed/{id}
}

export const FAMOUS_DISHES: ArabDish[] = [
  {
    id: 'hummus',
    name: 'Hummus',
    nameAr: 'حمص',
    origin: 'Levant. Disputed origin, beloved everywhere.',
    story:
      "The earliest written recipe for a chickpea purée appears in the 13th-century Cairo cookbook Kitab Wasf al-At'ima al-Mu'tada. Today's tahini-rich version probably crystallized in early-20th-century Damascus and Beirut. Argued over more than any other dish on Earth.",
    ingredients: [
      '2 cups cooked chickpeas (canned ok, but peel skins for silkiness)',
      '1/3 cup good tahini (Lebanese or Palestinian)',
      '1/4 cup fresh lemon juice',
      '2 garlic cloves',
      '1/2 tsp salt, 1/4 tsp cumin',
      '4 to 6 tbsp ice water',
      'Olive oil and sumac for finishing',
    ],
    steps: [
      'In a food processor, blend tahini with lemon juice and garlic for 1 full minute until pale and creamy.',
      'Add salt and cumin, then warm chickpeas. Blend 2 minutes.',
      'With motor running, stream in ice water 1 tbsp at a time until silky and fluffy.',
      'Spread on a wide plate, swirl, top with olive oil, sumac, parsley. Eat warm with pita.',
    ],
    videoId: 'l2ZPk_AxWqU',
  },
  {
    id: 'mansaf',
    name: 'Mansaf',
    nameAr: 'منسف',
    origin: 'Jordan, Bedouin tradition.',
    story:
      "Lamb cooked in fermented dried yogurt (jameed), served on a bed of rice over thin shrak bread, all on a communal platter. The national dish of Jordan and an act of hospitality. Guests are expected to eat with their right hand, standing.",
    ingredients: [
      '1 kg lamb shoulder, on the bone, cut into pieces',
      '500 g jameed (or 1 kg thick yogurt with starch as substitute)',
      '3 cups long-grain or basmati rice',
      'Shrak or markook flatbread',
      '1 large onion, 4 cardamom pods, 2 bay leaves, allspice',
      '1/2 cup toasted slivered almonds and pine nuts',
      'Salt, ghee, fresh parsley',
    ],
    steps: [
      'Boil lamb with onion, cardamom, bay, allspice and salt. Skim foam. Simmer 90 minutes until tender. Reserve broth.',
      'Soak jameed overnight, then blend smooth. In a wide pot, whisk jameed with 4 cups warm broth. Bring to a gentle simmer, stirring one direction only so it does not split. Add the lamb, cook 30 minutes.',
      'Cook rice in lamb broth with a knob of ghee until fluffy.',
      'Lay shrak bread on a platter. Ladle a little jameed sauce over to soften. Pile rice on top, then lamb. Pour more sauce over. Crown with toasted nuts and parsley.',
    ],
    videoId: 'EFyMIQNjkec',
  },
  {
    id: 'kabsa',
    name: 'Kabsa',
    nameAr: 'كبسة',
    origin: 'Saudi Arabia, Najd region.',
    story:
      "Rice cooked in spiced broth with chicken or lamb, dried lime giving it a sour smokiness. The national dish of Saudi Arabia. Every family has a slightly different bezar (spice mix) handed down.",
    ingredients: [
      '1 whole chicken, cut into 8 pieces',
      '2 cups basmati rice, soaked 30 minutes',
      '1 large onion, 4 garlic cloves, 2 tomatoes',
      '2 tbsp tomato paste',
      '2 dried limes (loomi), pierced',
      'Kabsa spice: black lime, cardamom, cinnamon, cloves, black pepper, nutmeg, paprika, bay leaf',
      'Toasted almonds and raisins to garnish',
    ],
    steps: [
      'Sauté onion until soft, add garlic, then chicken pieces. Brown lightly.',
      'Add tomatoes, tomato paste, kabsa spices and loomi. Cook 5 minutes.',
      'Pour in 4 cups water, simmer 30 minutes until chicken is tender. Lift chicken out and broil to crisp the skin.',
      'Strain broth. Cook drained rice in 3 cups of the broth, low heat, lid on, 18 minutes. Rest 10 minutes.',
      'Mound rice on a platter, lay chicken on top, scatter almonds and raisins.',
    ],
    videoId: 'myH7KinE7X0',
  },
  {
    id: 'maqluba',
    name: 'Maqluba',
    nameAr: 'مقلوبة',
    origin: 'Palestine, Levant.',
    story:
      "Its name means 'upside down'. Built in a pot with meat at the bottom, then fried eggplant or cauliflower, then spiced rice. Flipped onto a platter at the table. A medieval dish first recorded in 13th-century Aleppo.",
    ingredients: [
      '700 g chicken or lamb pieces',
      '1 large eggplant, sliced into rounds',
      '1 cauliflower, broken into florets',
      '2 cups basmati rice, soaked 30 minutes',
      '1 onion, baharat, allspice, cinnamon stick, cardamom',
      'Toasted pine nuts and parsley to garnish',
    ],
    steps: [
      'Salt eggplant 20 minutes, pat dry, fry in oil until golden. Fry cauliflower until golden. Drain.',
      'Brown meat with onion and whole spices. Add water to cover, simmer 30 minutes. Reserve broth.',
      'In a wide pot, layer in this order: meat at the bottom, then eggplant, then cauliflower, then drained spiced rice.',
      'Pour hot broth to just cover the rice. Cover. Cook on low 35 to 40 minutes until rice is done. Rest 15 minutes.',
      'Place a platter on top of the pot, flip in one confident motion. Lift the pot. Scatter pine nuts and parsley.',
    ],
    videoId: 'ZvXVHVD4ypU',
  },
  {
    id: 'koshari',
    name: 'Koshari',
    nameAr: 'كشري',
    origin: 'Egypt, Cairo street food.',
    story:
      "Rice, lentils, macaroni, chickpeas, fried onions, garlic-vinegar sauce, tomato sauce. A wild stack with Italian, Indian, and Arab roots, born in 19th-century Cairo and now Egypt's most beloved street food.",
    ingredients: [
      '1 cup short-grain rice',
      '1 cup brown or green lentils',
      '1 cup small pasta (ditalini or elbow), 1/2 cup vermicelli',
      '1 can chickpeas, drained',
      '3 onions, sliced thin (for crispy onions)',
      'Tomato sauce: 1 can tomatoes, 4 garlic cloves, cumin, chili',
      "Da'a (garlic vinegar): white vinegar, garlic, cumin",
    ],
    steps: [
      'Fry sliced onions in oil over medium heat until deep amber. Drain on paper, save the oil.',
      'Boil lentils until tender, drain. Cook rice with toasted vermicelli using the onion oil. Boil pasta separately.',
      "Make tomato sauce: sauté garlic and cumin in onion oil, add tomatoes, simmer 15 minutes. Add a splash of vinegar to brighten. Make da'a: warm vinegar with garlic and cumin briefly.",
      "Build the bowl: rice layer, then lentils, then pasta, then chickpeas. Spoon tomato sauce over. Crown with crispy onions. Pass the da'a at the table.",
    ],
    videoId: 'y0d2ZMZBW4Y',
  },
  {
    id: 'falafel',
    name: 'Falafel',
    nameAr: 'فلافل',
    origin: 'Egypt (chickpea) and Levant (fava).',
    story:
      "Fried herb-and-bean fritters. Egyptian ta'meya is made with fava beans, the Levantine version with chickpeas. Likely an Egyptian Coptic dish that spread north. Now eaten in pita with tahini wherever Arab kitchens went.",
    ingredients: [
      '1 cup dried chickpeas, soaked overnight (do not cook, do not skip the overnight soak)',
      '1 small onion, 4 garlic cloves',
      '1 cup parsley, 1/2 cup cilantro, 1/4 cup dill',
      '1 tsp cumin, 1 tsp coriander, 1/2 tsp cardamom, 1 tsp salt',
      '1/2 tsp baking soda, sesame seeds for coating',
      'Neutral oil for deep frying',
    ],
    steps: [
      'Drain chickpeas well. In a food processor, pulse chickpeas, onion, garlic, herbs and spices until coarse but holding together. Do not over-blend.',
      'Rest in the fridge 1 hour for the flavors to settle.',
      'Just before frying, mix in baking soda. Shape into walnut-size balls (a falafel scoop is ideal), press sesame seeds on top.',
      'Deep-fry at 175°C until deep golden, about 4 minutes. Drain. Eat right away in warm pita with tahini, tomato, pickles.',
    ],
    videoId: 'NZcWedPKysk',
  },
  {
    id: 'tabbouleh',
    name: 'Tabbouleh',
    nameAr: 'تبولة',
    origin: 'Lebanon and Syria, mountain villages.',
    story:
      "Parsley, mint, tomato, bulgur, lemon, olive oil. More herb than salad. Comes from the mountain villages of Lebanon and Syria where parsley grew wild and bulgur stored well through winter.",
    ingredients: [
      '4 bunches flat-leaf parsley',
      '1 small bunch mint',
      '4 ripe tomatoes',
      '6 spring onions',
      '1/3 cup fine bulgur (#1)',
      '1/3 cup fresh lemon juice, 1/2 cup good olive oil',
      'Salt, allspice, romaine leaves for scooping',
    ],
    steps: [
      'Rinse and very thoroughly dry the parsley and mint. Chop them as finely as you can with a sharp knife (a food processor bruises the leaves).',
      'Dice tomatoes small, salt them lightly. Mince spring onions.',
      'Soak bulgur in the tomato juices for 10 minutes (no water).',
      'Combine all in a bowl. Dress with lemon, olive oil, salt and a pinch of allspice. Toss gently. Rest 10 minutes. Serve cool with romaine leaves.',
    ],
    videoId: 'tj7HF_iMO5U',
  },
  {
    id: 'shawarma',
    name: 'Shawarma',
    nameAr: 'شاورما',
    origin: 'Ottoman roots, Levantine evolution.',
    story:
      "The Arabic name comes from the Turkish çevirme, meaning 'turning'. Vertical-spit roasted meat, shaved off into pita with tomato, pickles, garlic sauce. The Levantine evolution of the Ottoman döner.",
    ingredients: [
      '1 kg boneless chicken thighs, skin on if possible',
      'Marinade: 1 cup yogurt, juice of 2 lemons, 4 crushed garlic cloves, 3 tbsp olive oil',
      'Shawarma spice: 2 tsp baharat, 1 tsp cumin, 1 tsp paprika, 1 tsp turmeric, 1/2 tsp cinnamon, salt',
      'Pita or saj bread',
      'Toum (garlic sauce), pickled cucumber, sliced tomato, parsley',
    ],
    steps: [
      'Mix marinade with all spices. Coat chicken well and refrigerate at least 4 hours, ideally overnight.',
      'Stack the marinated thighs on a vertical or horizontal skewer, or just spread on a tray. Roast at 220°C for 35 to 40 minutes. Flip once. The edges should char.',
      'Rest 5 minutes, then slice thin against the grain.',
      'Warm pita, spread with toum, fill with chicken, tomato, pickles. Wrap tight and toast on a dry pan 1 minute per side.',
    ],
    videoId: '1PlAsc-YOu0',
  },
  {
    id: 'manakish',
    name: 'Manakish',
    nameAr: 'مناقيش',
    origin: 'Levant, daily bread.',
    story:
      "Round flatbread topped with za'atar and olive oil, or akkawi cheese, or spiced ground meat. The Levantine pizza. Baked at neighborhood bakeries since dawn, eaten standing up with sweet tea.",
    ingredients: [
      'Dough: 500 g bread flour, 1 tsp instant yeast, 1 tsp sugar, 1 tsp salt, 2 tbsp olive oil, 300 ml warm water',
      "Za'atar paste: 1/2 cup za'atar blend whisked with 1/2 cup good olive oil",
      'Optional: shredded akkawi or mozzarella cheese',
    ],
    steps: [
      'Mix dough until smooth, knead 8 minutes. Cover, rise 1 hour at room temperature.',
      'Divide into 8 balls. Rest 10 minutes. Roll or stretch each into a 15 cm round, slightly thicker at the edges.',
      "Spread a generous tablespoon of za'atar paste on each round. For cheese manakish, top half with shredded cheese.",
      'Bake at 250°C on a preheated stone or steel for 6 to 8 minutes until the base is crisp. Eat warm.',
    ],
    videoId: '08oqM3IurHU',
  },
  {
    id: 'tagine',
    name: 'Tagine',
    nameAr: 'طاجين',
    origin: 'Morocco, Maghreb.',
    story:
      "Named after the conical clay pot it cooks in. Chicken with preserved lemon and olives, lamb with prunes and almonds, beef with quince. The same vessel, infinite combinations. Cooked low over coals for hours.",
    ingredients: [
      '1 whole chicken, jointed (or 1 kg lamb shoulder cubed)',
      '2 onions sliced, 4 garlic cloves',
      '1 preserved lemon, rinsed and chopped',
      '1 cup green olives',
      '1 tsp turmeric, 1 tsp cumin, 1 tsp ginger, pinch saffron, 1 tsp ras el hanout',
      '1 bunch cilantro and parsley tied together',
      '3 tbsp olive oil, salt',
    ],
    steps: [
      'In a tagine or Dutch oven, sweat onions in olive oil 10 minutes. Add garlic and spices, cook 1 minute.',
      'Add chicken, brown lightly. Bury the herb bundle in the pot. Add 1 cup water and a pinch of salt.',
      'Cover. Simmer on very low heat 45 minutes for chicken, 90 for lamb.',
      'Add preserved lemon and olives. Uncover and reduce sauce 10 more minutes. Discard herb bundle. Serve with bread.',
    ],
    videoId: 'nZPaNd2S8Dw',
  },
  {
    id: 'shakshuka',
    name: 'Shakshuka',
    nameAr: 'شكشوكة',
    origin: 'Tunisia, spread across the Maghreb and Levant.',
    story:
      "Eggs poached in a spiced tomato and pepper sauce. Tunisian in origin, spread across the Maghreb and Levant. Best eaten straight from the pan with crusty bread.",
    ingredients: [
      '3 tbsp olive oil',
      '1 onion, 1 red bell pepper, 4 garlic cloves',
      '1 can (400 g) whole peeled tomatoes',
      '1 tsp cumin, 1 tsp sweet paprika, 1 tsp harissa (more if you like heat)',
      '4 to 6 eggs',
      'Crumbled feta, parsley, warm bread',
    ],
    steps: [
      'Sauté onion and pepper in olive oil 10 minutes until soft. Add garlic, cumin, paprika, harissa. Cook 1 minute.',
      'Crush tomatoes by hand into the pan. Salt. Simmer 15 minutes until thick and brick-red.',
      'Make wells in the sauce with a spoon. Crack an egg into each well. Cover and cook 4 to 6 minutes until whites set but yolks stay runny.',
      'Scatter feta and parsley. Bring the pan to the table with warm bread.',
    ],
    videoId: 'FUXpoUG_cXk',
  },
  {
    id: 'molokhia',
    name: 'Molokhia',
    nameAr: 'ملوخية',
    origin: 'Egypt, Pharaonic origin.',
    story:
      "Jew's mallow leaves simmered with chicken or rabbit broth. The recipe is at least 4,000 years old. The dish was sacred to ancient Egyptians and remains the national green soup of Egypt today.",
    ingredients: [
      '500 g molokhia leaves (fresh, dried, or frozen)',
      '1 whole chicken, plus aromatics (onion, cardamom, bay)',
      '6 garlic cloves',
      '1 tbsp ground coriander',
      '2 tbsp ghee',
      'Juice of 1 lemon, salt',
      'White rice and Egyptian bread to serve',
    ],
    steps: [
      'Make broth: simmer chicken with whole onion, cardamom, bay leaf and salt for 1 hour. Strain. Keep 6 cups of broth.',
      'Add finely chopped molokhia leaves to the simmering broth. Cook 10 minutes (do not boil hard).',
      'Crush garlic with coriander and a pinch of salt. Fry in hot ghee until aromatic, about 30 seconds. This is the takleya.',
      'Pour the sizzling takleya into the molokhia. Add lemon. Adjust salt. Serve over rice with shredded chicken on the side.',
    ],
    videoId: 'UezZBJ-voEs',
  },
  {
    id: 'kunafa',
    name: 'Kunafa',
    nameAr: 'كنافة',
    origin: 'Levant, Palestinian Nablus.',
    story:
      "Shredded pastry over melted cheese, soaked in sugar syrup, dusted with crushed pistachios. The Palestinian city of Nablus is its undisputed capital. Eaten hot, ideally between two friends.",
    ingredients: [
      '500 g kataifi (shredded phyllo)',
      '500 g akkawi cheese (or low-moisture mozzarella, soaked 2 hours to remove salt)',
      '200 g ghee or clarified butter',
      'A few drops orange food color (optional)',
      'Sugar syrup (atter): 2 cups sugar, 1 cup water, 1 tsp lemon juice, 1 tsp rose or orange blossom water',
      'Crushed pistachios for finishing',
    ],
    steps: [
      'Make syrup first: simmer sugar, water, lemon for 10 minutes. Stir in rose water. Cool completely.',
      'Pull the kataifi apart with your fingers into a wide bowl. Pour warm ghee over it, work it through every strand.',
      'Press half into a round buttered pan, very compact. Drain the cheese, spread evenly. Top with remaining kataifi, press flat.',
      'Bake at 200°C for 25 minutes until the base is deep gold. Run a knife around the edge. Flip onto a platter while hot.',
      'Pour cold syrup over the hot kunafa immediately, edge to center. Crown with pistachios. Slice and serve at once.',
    ],
    videoId: 'ysCdsPuTD4o',
  },
  {
    id: 'baklava',
    name: 'Baklava',
    nameAr: 'بقلاوة',
    origin: 'Ottoman palace kitchens, Arab world.',
    story:
      "Layered phyllo, ground nuts, butter, syrup. Refined in the Ottoman palace kitchens of Topkapı. Today every Arab city has its own version. Damascus heavy with pistachios, Aleppo soaked in rose water.",
    ingredients: [
      '500 g phyllo dough, thawed',
      '300 g walnuts or pistachios, finely chopped',
      '250 g unsalted butter, melted and clarified',
      '1 tsp ground cinnamon',
      'Syrup: 2 cups sugar, 1 cup water, 1 tbsp lemon juice, 2 tbsp rose water',
    ],
    steps: [
      'Make syrup first: simmer sugar, water, lemon for 10 minutes. Add rose water. Cool completely.',
      'Mix nuts with cinnamon.',
      'Brush a baking tray with butter. Lay 10 sheets of phyllo, brushing each with butter. Spread half the nut mixture. Lay 6 more sheets, more nuts, then 10 sheets to finish.',
      'Score the top into diamonds with a sharp knife (do not cut through). Bake at 175°C for 40 minutes until deep gold.',
      'The moment it comes out, pour the cold syrup over the hot baklava. Listen for the hiss. Rest 4 hours before serving.',
    ],
    videoId: 'VI7Bj1_P99Q',
  },
  {
    id: 'arabic-coffee',
    name: 'Arabic Coffee',
    nameAr: 'القهوة العربية',
    origin: 'Yemen, 15th century, then across Arabia.',
    story:
      "The first coffee houses in history opened in 15th-century Yemeni Sufi monasteries. Pale-roasted beans ground with cardamom, brewed in a dallah, served in tiny finjān cups. UNESCO Intangible Cultural Heritage.",
    ingredients: [
      '3 tbsp lightly roasted Arabic coffee, ground fine',
      '4 cups water',
      '6 green cardamom pods, lightly crushed',
      'Pinch of saffron threads',
      '2 cloves (Gulf style, optional)',
      'Dates and dried apricots to serve',
    ],
    steps: [
      'Bring water to a boil in a small pot or dallah. Add the coffee, lower the heat, simmer 10 minutes.',
      'Take off the heat. Let the grounds settle 2 minutes.',
      'Pour through a fine strainer back into the cleaned dallah. Add cardamom, saffron and cloves.',
      'Return to a low heat for 5 minutes. Do not let it boil. Pour into small finjān cups, no more than a third full. Always serve with dates.',
    ],
    videoId: 'PhewVEF_0AA',
  },
  {
    id: 'fattoush',
    name: 'Fattoush',
    nameAr: 'فتوش',
    origin: 'Levant, peasant origins.',
    story:
      "A salad of mixed vegetables and torn toasted khubz bread, dressed with pomegranate molasses and sumac. Born as a peasant way to use stale flatbread. Now found on every Levantine mezze table.",
    ingredients: [
      '2 pita breads, day-old is perfect',
      '1 head romaine, 1 cucumber, 2 tomatoes, 1 small bunch radishes',
      '4 spring onions, 1 cup parsley, 1/2 cup mint',
      'Dressing: 3 tbsp lemon juice, 2 tbsp pomegranate molasses, 1 garlic clove crushed, 1 tsp sumac, 6 tbsp olive oil, salt',
    ],
    steps: [
      'Tear pita into pieces, toss with olive oil and sumac, bake at 200°C until crisp, about 8 minutes.',
      'Chop all vegetables into bite-size pieces. Tear the herbs.',
      'Whisk dressing in a small bowl until thick. Taste and adjust the lemon to molasses balance.',
      'Combine vegetables in a wide bowl, dress, toss. Add the crisp pita last so it stays crunchy. Eat right away.',
    ],
    videoId: 'iE8ZyoBxFsE',
  },
  {
    id: 'mahshi',
    name: 'Mahshi',
    nameAr: 'محشي',
    origin: 'Egypt and Levant.',
    story:
      "The art of stuffing. Grape leaves, cabbage, zucchini, peppers, eggplants, filled with spiced rice and sometimes ground lamb. An afternoon of careful rolling for a single shared platter.",
    ingredients: [
      '500 g grape leaves (jarred is fine, rinsed)',
      'Filling: 1 cup short-grain rice, 250 g ground lamb (optional), 1 tomato finely diced, 1 onion, 1/2 cup parsley, 1/4 cup mint, 1 tsp baharat, salt',
      'For the pot: 2 sliced tomatoes, 4 garlic cloves',
      'Juice of 2 lemons, olive oil',
    ],
    steps: [
      'Mix filling ingredients in a bowl with 3 tbsp olive oil.',
      'Lay a grape leaf vein-side up. Place 1 tsp filling near the stem. Fold sides in, roll tight into a small cigar. Repeat (this takes an hour, do it with company).',
      'Line a pot with tomato slices and garlic. Pack the rolled leaves in close, in tight rows.',
      'Pour over 2 cups water mixed with lemon juice and 3 tbsp olive oil. Place an inverted plate on top to keep them packed. Cover.',
      'Simmer 45 minutes until rice is tender. Rest 15 minutes. Flip onto a platter or serve from the pot with yogurt.',
    ],
    videoId: 'G7OLFDL63J4',
  },
  {
    id: 'masgouf',
    name: 'Masgouf',
    nameAr: 'مسكوف',
    origin: 'Iraq, Tigris and Euphrates.',
    story:
      "Carp from the rivers, butterflied and slow-grilled vertically over an open fire of date palm wood, seasoned with tamarind and turmeric. The national dish of Iraq, with roots in Sumerian times.",
    ingredients: [
      'One 2 kg whole carp, sea bass or barramundi',
      '2 tbsp tamarind paste',
      '1 tsp turmeric, 1 tsp curry powder, 1 tsp baharat',
      '3 tbsp olive oil, 1 tbsp salt',
      'Sliced onion, tomato, fresh lemon, flatbread to serve',
    ],
    steps: [
      'Butterfly the fish from the back, leaving the belly skin attached. Open it flat, scrape any blood line.',
      'Mix tamarind, turmeric, curry, baharat, oil and salt into a paste. Rub all over the flesh side.',
      "Traditional way: skewer the fish flesh-side toward a wood fire, vertical, cook 30 to 40 minutes until smoke perfumes it. Home version: grill flesh-up over high heat 15 minutes, then skin-side down on the coals or a hot pan 5 minutes to crisp.",
      'Slide onto a platter. Serve with onion, tomato, lemon and warm flatbread.',
    ],
    videoId: 'WOxGZwtsq9g',
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
    blurb: 'Mansaf, magluba, kibbeh, the Jordanian table done by a local cook.',
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
    blurb: 'Aleppine and Damascene classics, kibbeh nayyeh, muhammara, the famed kebab Hindi.',
    region: 'Syria',
    accent: 'gold',
  },
  {
    id: 'palestinian-food',
    name: 'Palestinian Food',
    nameAr: 'الطعام الفلسطيني',
    handle: '@PalestinianFood',
    url: 'https://www.youtube.com/@PalestinianFood',
    blurb: 'Maqluba, musakhan, kunafa Nabulsia, the kitchen of villages from Jerusalem to Nablus.',
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
    blurb: 'A traveling tour of the Arab kitchen, Gulf to Levant, breakfast to dessert.',
    ...arch('tasteofarabia0000park'),
  },
  {
    id: 'arabian-nights-cookbook',
    title: 'The Arabian Nights Cookbook',
    author: 'Habeeb Salloum',
    year: 2010,
    blurb: 'Homestyle recipes from across the Arab world, lamb kebabs, baba ghanouj, classic mezze.',
    ...arch('arabiannightscoo0000sall'),
  },
  {
    id: 'cardamom-lime',
    title: 'Cardamom and Lime',
    author: 'Saleh Sallam Al-Hashimi',
    year: 2008,
    blurb: "Recipes from the Arabian Gulf, Saudi, Emirati, Kuwaiti, Bahraini, Qatari, Omani.",
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
    blurb: 'A regional tour of Arab cuisine, five countries, five distinct kitchens, one shared heritage.',
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
    description: '"Top of the shop", the best spices a merchant has, blended together. 20+ ingredients including rose buds.',
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
    description: 'Whole dried limes, pierced and added to stews, where they release a smoky-sour funk.',
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
      "Coffee was first cultivated in Yemeni Sufi monasteries in the 15th century to keep monks awake during night prayers. From there it spread to Mecca, then Cairo, then Istanbul, then the world. The dallah, the long-spouted Arabian coffee pot, is older than the United States.",
  },
  {
    title: 'Bread is never thrown away',
    body:
      "Old khubz is reborn as fattoush, fatta, tharid, or simply softened with milk for breakfast. Bread holds religious weight, dropping it on the floor warrants picking it up and kissing it before placing it somewhere clean.",
  },
  {
    title: 'The spice trade ran through Arab hands',
    body:
      "For a thousand years, Arab merchants moved pepper, cinnamon, ginger, and cloves from India and Southeast Asia to Europe through the ports of Aden, Basra, and Alexandria. That trade shaped the world's cuisines, and made Arab kitchens encyclopedias of spice.",
  },
  {
    title: 'Andalusia preserved what was lost',
    body:
      "When the Arabs ruled Spain for eight centuries, their cooking absorbed Iberian and North African flavors. The anonymous 13th-century Andalusian cookbook records recipes that vanished from the Arab East, almond-thickened sauces, sweet-savory meat dishes, and rose-water sweets that now seem distinctly Spanish.",
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
