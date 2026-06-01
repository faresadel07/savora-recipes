/**
 * The Film Library is a curated catalog of professional food documentaries,
 * chef profiles, and travel-food films. Every entry has been verified to exist
 * on YouTube via oEmbed; the host channel and length are noted so we can
 * present a real "watch the masters" experience without scraping or hosting
 * video ourselves.
 *
 * Sources are organized by category. Where the official source is a streaming
 * service (Netflix, PBS, National Geographic, CNN, DW, BBC, Al Jazeera),
 * we link to the channel's own YouTube upload of the trailer or full episode.
 */

export type FilmCategory =
  | 'chef-profile'
  | 'travel'
  | 'history'
  | 'science'
  | 'culture';

export interface FoodFilm {
  id: string;
  title: string;
  series?: string;       // e.g. "Chef's Table", "Parts Unknown", "Tasting History"
  channel: string;       // Official YouTube channel that hosts it
  year?: number;
  runtime?: string;      // approximate, human-readable
  category: FilmCategory;
  region?: string;       // where the food/chef is rooted
  blurb: string;
  videoId: string;
  featured?: boolean;    // pin to top of category
  titleAr?: string;
  blurbAr?: string;
}

export const FILM_CATEGORIES: { id: FilmCategory; name: string; tagline: string }[] = [
  {
    id: 'chef-profile',
    name: 'Chef profiles',
    tagline: 'The men and women rewriting the rules of the table.',
  },
  {
    id: 'travel',
    name: 'Travel and food',
    tagline: 'Following a plate around the world.',
  },
  {
    id: 'history',
    name: 'Food history',
    tagline: 'A thousand years of recipes, cooked again.',
  },
  {
    id: 'science',
    name: 'Food science',
    tagline: 'The why behind every technique.',
  },
  {
    id: 'culture',
    name: 'Cultural heritage',
    tagline: 'A single dish as the lens on a whole people.',
  },
];

export const FOOD_FILMS: FoodFilm[] = [
  // ===================== CHEF PROFILES =====================
  {
    id: 'massimo-bottura',
    title: "Massimo Bottura",
    series: "Chef's Table",
    channel: 'Netflix',
    year: 2015,
    runtime: '50 min',
    category: 'chef-profile',
    region: 'Modena, Italy',
    blurb:
      "The Modenese three-star chef who turned a humble Italian trattoria into Osteria Francescana, voted the world's best restaurant. A meditation on how grief, music, and tortellini can become one art form.",
    titleAr: 'Massimo Bottura',
    blurbAr: 'Modenese three-star chef who turned humble Italian trattoria into Osteria Francescana, voted world\'s best restaurant. meditation on how grief, music, و tortellini can become one art form.',
    videoId: '1pY6IvkQm2Q',
    featured: true,
  },
  {
    id: 'noma-redzepi',
    title: 'Inside Noma, the World\'s Best Restaurant',
    channel: '50 Best',
    year: 2021,
    runtime: '12 min',
    category: 'chef-profile',
    region: 'Copenhagen, Denmark',
    blurb:
      "A tour of René Redzepi's Noma in Copenhagen, voted World's Best Restaurant five times. The kitchen that rewrote the rules of Scandinavian fine dining and birthed the modern foraging movement.",
    titleAr: 'Inside Noma, World\'s Best Restaurant',
    blurbAr: 'tour of René Redzepi\'s Noma in Copenhagen, voted World\'s Best Restaurant five times. kitchen that rewrote rules of Scandinavian fine dining و birthed modern foraging movement.',
    videoId: 'HGKzwgoyVp0',
  },
  {
    id: 'dominique-crenn',
    title: 'Dominique Crenn, the Rebel Chef',
    channel: 'CBS Sunday Morning',
    year: 2021,
    runtime: '8 min',
    category: 'chef-profile',
    region: 'San Francisco, USA',
    blurb:
      "The first female chef in the United States to earn three Michelin stars. A short documentary on the philosophy behind Atelier Crenn and the personal story that shaped it.",
    titleAr: 'Dominique Crenn, Rebel Chef',
    blurbAr: 'first female chef in United States to earn three Michelin stars. short documentary on philosophy behind Atelier Crenn و personal story that shaped it.',
    videoId: 'cLshKazkzMs',
  },
  {
    id: 'asma-khan',
    title: 'Asma Khan and Darjeeling Express',
    channel: 'TOPJAW',
    year: 2023,
    runtime: '14 min',
    category: 'chef-profile',
    region: 'London, UK',
    blurb:
      "The Indian chef who built a London restaurant powered entirely by an all-female kitchen of home cooks. A profile on the philosophy, the food, and why grandmothers cook differently.",
    titleAr: 'Asma Khan و Darjeeling Express',
    blurbAr: 'Indian chef who built London restaurant powered entirely by all-female kitchen of home cooks. profile on philosophy, food, و why grandmothers اطبخ differently.',
    videoId: 'Cki3E_0TRdY',
  },
  {
    id: 'salt-fat-acid-heat',
    title: 'Salt Fat Acid Heat: Trailer',
    series: 'Salt Fat Acid Heat',
    channel: 'Netflix',
    year: 2018,
    runtime: '3 min',
    category: 'chef-profile',
    region: 'Worldwide',
    blurb:
      "Samin Nosrat travels to Italy, Japan, Mexico, and California to teach the four elements that make every dish work. Based on her landmark cookbook, this is the most influential food show of the past decade.",
    titleAr: 'ملح Fat Acid سخن: Trailer',
    blurbAr: 'Samin Nosrat travels to Italy, Japan, Mexico, و California to teach four elements that make every dish work. Based on her landmark cookbook, this is most influential food show of past decade.',
    videoId: '2oKbs4jAf7M',
  },
  {
    id: 'jiro-sushi',
    title: 'Jiro Dreams of Sushi',
    channel: 'Netflix',
    year: 2011,
    runtime: '3 min',
    category: 'chef-profile',
    region: 'Tokyo, Japan',
    blurb:
      "A short introduction to the legendary Sukiyabashi Jiro and the 85-year-old man behind it. The full documentary is on Netflix; this is the trailer for the film that changed how the world looks at one chef in one tiny basement restaurant.",
    titleAr: 'Jiro Dreams of Sushi',
    blurbAr: 'short introduction to legendary Sukiyabashi Jiro و 85-year-old man behind it. full documentary is on Netflix; this is trailer لمدة film that changed how world looks at one chef in one tiny basement restaurant.',
    videoId: '8R02NE050Jk',
  },
  {
    id: 'joshua-weissman-kitchen',
    title: "Inside Joshua Weissman's Minimalist Home",
    channel: 'Architectural Digest',
    year: 2023,
    runtime: '12 min',
    category: 'chef-profile',
    region: 'Austin, Texas',
    blurb:
      "The YouTube chef takes Architectural Digest through the minimalist kitchen he built from the ground up. A look at how a serious home cook designs their workspace.",
    titleAr: 'Inside Joshua Weissman\'s Minimalist Home',
    blurbAr: 'YouTube chef takes Architectural Digest through minimalist kitchen he built from مطحون up. look at how serious home اطبخ designs their workspace.',
    videoId: 'VylU-ueLA_g',
  },
  {
    id: 'babish-studio',
    title: "Inside Binging With Babish's Brooklyn Studio",
    channel: 'Architectural Digest',
    year: 2022,
    runtime: '11 min',
    category: 'chef-profile',
    region: 'Brooklyn, USA',
    blurb:
      "Andrew Rea (Babish) tours his Brooklyn home and studio: the kitchen that produces the internet's favorite recreations of fictional foods from movies and TV.",
    titleAr: 'Inside Binging مع Babish\'s Brooklyn Studio',
    blurbAr: 'Andrew Rea (Babish) tours his Brooklyn home و studio: kitchen that produces internet\'s favorite recreations of fictional foods from movies و TV.',
    videoId: 'ua0-5FZ2Eww',
  },

  // ===================== TRAVEL AND FOOD =====================
  {
    id: 'bourdain-beirut',
    title: 'Anthony Bourdain in Beirut',
    series: 'Parts Unknown',
    channel: 'Banijay Documentaries',
    year: 2015,
    runtime: '42 min',
    category: 'travel',
    region: 'Beirut, Lebanon',
    blurb:
      "A full Parts Unknown episode. Bourdain returns to Beirut, the city he first fell for in 2006, eating kibbeh and lamb, hearing the impossible questions every visitor leaves with. S05 E08.",
    titleAr: 'Anthony Bourdain in Beirut',
    blurbAr: 'full Parts Unknown episode. Bourdain returns to Beirut, city he first fell لمدة in 2006, eating kibbeh و لحم خروف, hearing impossible questions every visitor leaves مع. S05 E08.',
    videoId: '1LptZ9E4ZG4',
    featured: true,
  },
  {
    id: 'bourdain-jerusalem',
    title: 'Anthony Bourdain in Jerusalem',
    series: 'Parts Unknown',
    channel: 'Banijay Documentaries',
    year: 2013,
    runtime: '42 min',
    category: 'travel',
    region: 'Jerusalem',
    blurb:
      "A full-length episode of Parts Unknown. Bourdain eats his way through Jerusalem and the West Bank, asking impossible questions through plates of hummus, lamb, and bread.",
    titleAr: 'Anthony Bourdain in Jerusalem',
    blurbAr: 'full-length episode of Parts Unknown. Bourdain eats his way through Jerusalem و West Bank, asking impossible questions through plates of hummus, لحم خروف, و خبز.',
    videoId: '95pFZJRmLjw',
  },
  {
    id: 'bourdain-tokyo',
    title: 'Anthony Bourdain in Tokyo',
    series: 'Parts Unknown',
    channel: 'Banijay Documentaries',
    year: 2013,
    runtime: '42 min',
    category: 'travel',
    region: 'Tokyo, Japan',
    blurb:
      "Bourdain's love letter to Tokyo: sushi, ramen, neon, and the kind of devotion to a single craft that the city specializes in. A full Parts Unknown episode.",
    titleAr: 'Anthony Bourdain in Tokyo',
    blurbAr: 'Bourdain\'s love letter to Tokyo: sushi, ramen, neon, و kind of devotion to single craft that city specializes in. full Parts Unknown episode.',
    videoId: 'py6ZQ5RczdQ',
  },
  {
    id: 'ramsay-peru',
    title: "Peru's Sacred Valley with Gordon Ramsay",
    series: 'Uncharted',
    channel: 'National Geographic',
    year: 2019,
    runtime: '45 min',
    category: 'travel',
    region: 'Sacred Valley, Peru',
    blurb:
      "A full episode of Uncharted. Ramsay travels the Peruvian Andes to learn Andean cooking from Virgilio Martínez of Central, the world's number-one restaurant. National Geographic's official upload.",
    titleAr: 'Peru\'s Sacred Valley مع Gordon Ramsay',
    blurbAr: 'full episode of Uncharted. Ramsay travels Peruvian Andes to learn Andean cooking from Virgilio Martínez of Central, world\'s number-one restaurant. National Geographic\'s official upload.',
    videoId: '4fVjsSiAYZ8',
  },
  {
    id: 'ramsay-oaxaca',
    title: 'Holy Mexico: Oaxaca with Gordon Ramsay',
    series: 'Uncharted',
    channel: 'National Geographic',
    year: 2020,
    runtime: '45 min',
    category: 'travel',
    region: 'Oaxaca, Mexico',
    blurb:
      "A full episode in the home of mole, mezcal, and chapulines. Ramsay sources ingredients from Zapotec markets and cooks against a local chef. National Geographic upload.",
    titleAr: 'Holy Mexico: Oaxaca مع Gordon Ramsay',
    blurbAr: 'full episode in home of mole, mezcal, و chapulines. Ramsay sources ingredients from Zapotec markets و cooks against local chef. National Geographic upload.',
    videoId: 'up8BUFWtRhM',
  },
  {
    id: 'street-food-asia',
    title: 'Street Food: Asia',
    channel: 'Netflix',
    year: 2019,
    runtime: '3 min',
    category: 'travel',
    region: 'Asia',
    blurb:
      "The trailer for Netflix's series on the families who feed cities from carts and stalls. Each episode is a portrait of one vendor in one city: their hands, their pots, their inherited recipes.",
    titleAr: 'Street Food: Asia',
    blurbAr: 'trailer لمدة Netflix\'s series on families who feed cities from carts و stalls. Each episode is portrait of one vendor in one city: their hands, their pots, their inherited recipes.',
    videoId: 'eI_LjETc_Ak',
  },
  {
    id: 'mark-wiens-egypt',
    title: 'Ultimate Egyptian Street Food Tour',
    channel: 'Mark Wiens',
    year: 2022,
    runtime: '25 min',
    category: 'travel',
    region: 'Cairo, Egypt',
    blurb:
      "Mark Wiens spends a full day eating his way through Cairo: koshari, mahshi, foul, kofta, sugar cane juice, and ten kinds of bread. A cinematic introduction to Egyptian street food.",
    titleAr: 'Ultimate Egyptian Street Food Tour',
    blurbAr: 'Mark Wiens spends full يوم eating his way through Cairo: koshari, mahshi, foul, kofta, سكر cane juice, و ten kinds of خبز. cinematic introduction to Egyptian street food.',
    videoId: 'pIwCc7RuaQU',
  },
  {
    id: 'jay-fai-bangkok',
    title: 'Jay Fai: Michelin Crab Omelet in Bangkok',
    channel: 'Mark Wiens',
    year: 2018,
    runtime: '15 min',
    category: 'travel',
    region: 'Bangkok, Thailand',
    blurb:
      "The 70-year-old grandmother who earned a Michelin star cooking in welder's goggles over a charcoal wok. Mark Wiens watches her work the line and tastes the famous crab omelet.",
    titleAr: 'Jay Fai: Michelin Crab Omelet in Bangkok',
    blurbAr: '70-year-old grandmother who earned Michelin star cooking in welder\'s goggles over charcoal wok. Mark Wiens watches her work line و tastes famous crab omelet.',
    videoId: 'vv8LUSqT3JQ',
  },

  // ===================== FOOD HISTORY =====================
  {
    id: 'medieval-breakfast',
    title: 'Breakfast in the Middle Ages',
    series: 'Tasting History',
    channel: 'Tasting History with Max Miller',
    year: 2022,
    runtime: '15 min',
    category: 'history',
    region: 'Medieval Europe',
    blurb:
      "Max Miller cooks a real medieval breakfast from period sources and explains how the meal disappeared for centuries before coming back. History as kitchen science.",
    titleAr: 'Breakfast in Middle Ages',
    blurbAr: 'Max Miller cooks real medieval breakfast from period sources و explains how meal disappeared لمدة centuries before coming back. History as kitchen science.',
    videoId: 'R4F7OuFsaMY',
    featured: true,
  },
  {
    id: 'medieval-gingerbread',
    title: 'Medieval Gingerbread',
    series: 'Tasting History',
    channel: 'Tasting History with Max Miller',
    year: 2021,
    runtime: '15 min',
    category: 'history',
    region: 'Medieval Europe',
    blurb:
      "The dense, sticky, spice-bomb cake that fed crusaders and kings. Max recreates a 14th-century recipe and walks through the slow trade route that brought ginger from China to a London kitchen.",
    titleAr: 'Medieval Gingerbread',
    blurbAr: 'dense, sticky, spice-bomb cake that fed crusaders و kings. Max recreates 14th-century recipe و walks through slow trade route that brought زنجبيل from China to London kitchen.',
    videoId: 'ZyvcYJYebTQ',
  },
  {
    id: 'medieval-tavern',
    title: 'Eating in a Medieval Tavern',
    series: 'Tasting History',
    channel: 'Tasting History with Max Miller',
    year: 2022,
    runtime: '20 min',
    category: 'history',
    region: 'Medieval Europe',
    blurb:
      "What you would actually eat and drink if you walked into a tavern in 1380. From the bread on the table to the ale in the cup, with a recipe cooked from the originals.",
    titleAr: 'Eating in Medieval Tavern',
    blurbAr: 'What you would actually eat و drink if you walked into tavern in 1380. From خبز on table to ale in كوب, مع recipe cooked from originals.',
    videoId: 'jq-D_73TfLI',
  },
  {
    id: 'roman-centurion',
    title: 'Feeding a Roman Centurion',
    series: 'Tasting History',
    channel: 'Tasting History with Max Miller',
    year: 2021,
    runtime: '15 min',
    category: 'history',
    region: 'Ancient Rome',
    blurb:
      "Pork and puls, the porridge that powered the Roman army for centuries. Max cooks a real Roman recipe and explains how a single grain ration built an empire.",
    titleAr: 'Feeding Roman Centurion',
    blurbAr: 'Pork و puls, porridge that powered Roman army لمدة centuries. Max cooks real Roman recipe و explains how single grain ration built empire.',
    videoId: '1fDKx1CgcXs',
  },
  {
    id: 'augustus-cheese',
    title: 'Cheese for Emperor Augustus',
    series: 'Tasting History',
    channel: 'Tasting History with Max Miller',
    year: 2022,
    runtime: '17 min',
    category: 'history',
    region: 'Ancient Rome',
    blurb:
      "A handmade Roman cheese recipe served to Caesar Augustus himself. The earliest documented cheesemaking, recreated step by step.",
    titleAr: 'جبنة لمدة Emperor Augustus',
    blurbAr: 'handmade Roman جبنة recipe served to Caesar Augustus himself. earliest documented cheesemaking, recreated step by step.',
    videoId: 'U9134Rs_0co',
  },
  {
    id: 'townsends-beef-stew',
    title: 'An 18th Century Beef Stew',
    channel: 'Townsends',
    year: 2017,
    runtime: '12 min',
    category: 'history',
    region: 'Colonial America',
    blurb:
      "The Townsend family cooks an authentic colonial American beef stew over a real wood fire in period clothing. The series that pioneered historical cooking on YouTube.",
    titleAr: '18th Century لحم بقر Stew',
    blurbAr: 'Townsend family cooks authentic colonial American لحم بقر stew over real wood fire in period clothing. series that pioneered historical cooking on YouTube.',
    videoId: 'CK9Tcnb8JYA',
  },
  {
    id: 'townsends-bread',
    title: 'How to Bake Bread at Home (18th c.)',
    channel: 'Townsends',
    year: 2014,
    runtime: '10 min',
    category: 'history',
    region: 'Colonial America',
    blurb:
      "A complete colonial-era bread recipe baked in a brick oven heated with hardwood. Practical history for anyone curious about pre-industrial baking.",
    titleAr: 'How to اخبز خبز at Home (18th c.)',
    blurbAr: 'complete colonial-era خبز recipe baked in brick oven heated مع hardwood. Practical history لمدة anyone curious حوالي pre-industrial baking.',
    videoId: 'Rbk7ypiwNwc',
  },

  // ===================== FOOD SCIENCE =====================
  {
    id: 'kenji-amatriciana',
    title: 'Food Lab Basics: Bucatini Amatriciana (POV)',
    channel: 'J. Kenji López-Alt',
    year: 2020,
    runtime: '12 min',
    category: 'science',
    region: 'Italy',
    blurb:
      "Filmed from the chef's point of view as he cooks one of Rome's classic pastas. Kenji explains every move: why he renders guanciale slowly, why the pasta water matters, why the cheese goes in last.",
    titleAr: 'Food Lab Basics: Bucatini Amatriciana (POV)',
    blurbAr: 'Filmed from chef\'s point of view as he cooks one of Rome\'s classic pastas. Kenji explains every move: why he renders guanciale slowly, why باستا ماء matters, why جبنة goes in last.',
    videoId: '0SxlESaak_Q',
    featured: true,
  },
  {
    id: 'kenji-omelet',
    title: 'Food Lab Basics: The French Omelet (POV)',
    channel: 'J. Kenji López-Alt',
    year: 2020,
    runtime: '8 min',
    category: 'science',
    region: 'France',
    blurb:
      "The world's hardest two-minute dish, broken down move by move. Kenji on heat control, butter, the wrist flick, and the texture difference between a French and American omelet.",
    titleAr: 'Food Lab Basics: French Omelet (POV)',
    blurbAr: 'world\'s hardest two-دقيقة dish, broken down move by move. Kenji on سخن control, زبدة, wrist flick, و texture difference between French و American omelet.',
    videoId: '0eUedeTH_aI',
  },
  {
    id: 'atk-maillard',
    title: 'Searing with Authority: The Maillard Reaction',
    series: 'Test Kitchen Boot Camp',
    channel: "America's Test Kitchen",
    year: 2021,
    runtime: '14 min',
    category: 'science',
    region: 'Worldwide',
    blurb:
      "America's Test Kitchen explains the most important reaction in cooking. Why food browns, what it tastes like, and how to get the most out of it every time you turn on a pan.",
    titleAr: 'Searing مع Authority: Maillard Reaction',
    blurbAr: 'America\'s Test Kitchen explains most important reaction in cooking. Why food browns, what it tastes like, و how to get most out of it every time you turn on pan.',
    videoId: 'hv06fg5oElI',
  },
  {
    id: 'ragusea-steak',
    title: 'How Adam Really Cooks Steak',
    channel: 'Adam Ragusea',
    year: 2020,
    runtime: '12 min',
    category: 'science',
    region: 'Worldwide',
    blurb:
      "The food scientist explains what he actually does at home, not what makes a tidy demo: dry brine, lower heat, fat rotation, and why resting is sometimes overrated.",
    titleAr: 'How Adam Really Cooks Steak',
    blurbAr: 'food scientist explains what he actually does at home, not what makes tidy demo: dry brine, lower سخن, fat rotation, و why resting is sometimes overrated.',
    videoId: 'Wy6kZm-lC4g',
  },
  {
    id: 'ragusea-bread',
    title: 'Why Modern Sandwich Bread Is Different',
    channel: 'Adam Ragusea',
    year: 2020,
    runtime: '15 min',
    category: 'science',
    region: 'USA',
    blurb:
      "A food-history-meets-food-science investigation: why supermarket sandwich bread feels nothing like the bread Europe has eaten for two thousand years, and what that means for taste, nutrition, and the body.",
    titleAr: 'Why Modern Sandwich خبز Is Different',
    blurbAr: 'food-history-meets-food-science investigation: why supermarket sandwich خبز feels nothing like خبز Europe has eaten لمدة two thousand years, و what that means لمدة تذوّق, nutrition, و body.',
    videoId: 'i3sP2jwG9jc',
  },

  // ===================== CULTURAL HERITAGE =====================
  {
    id: 'unesco-arabic-coffee',
    title: 'Arabic Coffee: A Symbol of Generosity',
    channel: 'UNESCO',
    year: 2015,
    runtime: '5 min',
    category: 'culture',
    region: 'Arabian Peninsula',
    blurb:
      "UNESCO's own film on the Intangible Cultural Heritage of Arabic coffee. From the green bean to the dallah pot to the protocol of who is served first, all in five minutes.",
    titleAr: 'Arabic Coffee: Symbol of Generosity',
    blurbAr: 'UNESCO\'s own film on Intangible Cultural Heritage of Arabic coffee. From خضار ورقية فاصوليا to dallah pot to protocol of who is served first, all in five دقيقة.',
    videoId: 'cf4u5UavkKQ',
    featured: true,
  },
  {
    id: 'pbs-mansaf',
    title: 'Mansaf: A Jordanian and Palestinian Dish',
    series: 'The Grocery List Show',
    channel: 'Independent Lens (PBS)',
    year: 2023,
    runtime: '10 min',
    category: 'culture',
    region: 'Jordan and Palestine',
    blurb:
      "PBS examines Mansaf as a Jordanian and Palestinian heritage dish: the jameed, the lamb, the shrak bread, and what eating from a single communal platter has meant for centuries.",
    titleAr: 'Mansaf: Jordanian و Palestinian Dish',
    blurbAr: 'PBS examines Mansaf as Jordanian و Palestinian heritage dish: جميد, لحم خروف, shrak خبز, و what eating from single communal platter has meant لمدة centuries.',
    videoId: 'TveRFxYLA5Q',
  },
  {
    id: 'dw-olive-oil',
    title: 'Why Olive Oil Is Being Security Tagged',
    channel: 'DW Documentary',
    year: 2024,
    runtime: '42 min',
    category: 'culture',
    region: 'Mediterranean',
    blurb:
      "A long-form DW Documentary on the global olive oil crisis: drought, fraud, theft, and what it means when bottles of Italian extra virgin start being locked behind security tags in supermarkets.",
    titleAr: 'Why زيت زيتون Is Being Security Tagged',
    blurbAr: 'long-form DW Documentary on global زيت زيتون crisis: drought, fraud, theft, و what it means when bottles of Italian extra virgin start being locked behind security tags in supermarkets.',
    videoId: 'ziKDHQxAiLg',
  },
  {
    id: 'somm-doc',
    title: 'SOMM: The Master Sommelier Exam',
    channel: 'Rotten Tomatoes Indie',
    year: 2013,
    runtime: '2 min',
    category: 'culture',
    region: 'Worldwide',
    blurb:
      "Trailer for the documentary about the brutal Master Sommelier exam, where candidates must blind-taste, identify, and describe wines from anywhere in the world. The film that turned wine into a thriller.",
    titleAr: 'SOMM: Master Sommelier Exam',
    blurbAr: 'Trailer لمدة documentary حوالي brutal Master Sommelier exam, where candidates must blind-تذوّق, identify, و describe wines from anywhere in world. film that turned خل into thriller.',
    videoId: 'cw0PR3zm4z8',
  },
  {
    id: 'pasta-grannies',
    title: '104-Year-Old Nonna Makes Tagliatelle',
    channel: 'Pasta Grannies',
    year: 2019,
    runtime: '6 min',
    category: 'culture',
    region: 'Emilia-Romagna, Italy',
    blurb:
      "Vicki Bennison's series visits Italian grandmothers and films them making pasta exactly as their mothers and grandmothers did. This episode: a 104-year-old nonna rolling tagliatelle by hand.",
    titleAr: '104-Year-Old Nonna Makes Tagliatelle',
    blurbAr: 'Vicki Bennison\'s series visits Italian grandmothers و films them making باستا exactly as their mothers و grandmothers did. This episode: 104-year-old nonna rolling tagliatelle by hand.',
    videoId: 'L1KSSc5IU84',
  },
  {
    id: 'dw-baguette',
    title: 'Why The French Eat 30 Million Baguettes A Day',
    series: 'Food Secrets',
    channel: 'DW Food',
    year: 2023,
    runtime: '15 min',
    category: 'culture',
    region: 'France',
    blurb:
      "DW Food unpacks the daily ritual of the French baguette: the 1993 bread decree, the artisan boulangers, the four ingredients, and the protected method that defines a real baguette de tradition.",
    titleAr: 'Why French Eat 30 Million Baguettes يوم',
    blurbAr: 'DW Food unpacks daily ritual of French baguette: 1993 خبز decree, artisan boulangers, four ingredients, و protected method that defines real baguette de tradition.',
    videoId: 'KURH-UeAN8A',
  },
  {
    id: 'insider-baguette',
    title: 'How French Baguettes Are Made in Paris',
    series: 'Regional Eats',
    channel: 'Insider Food',
    year: 2022,
    runtime: '14 min',
    category: 'culture',
    region: 'Paris, France',
    blurb:
      "Insider Food spends a night with a Paris boulanger, from the 3 a.m. mix through the proof, the slash, and the bake. The shape, the crackle, and the inside-the-loaf airy lattice explained.",
    titleAr: 'How French Baguettes Are Made in Paris',
    blurbAr: 'Insider Food spends night مع Paris boulanger, from 3 .m. اخلط through proof, slash, و اخبز. shape, crackle, و inside--loaf airy lattice explained.',
    videoId: 'ffgZP-ZKKtI',
  },
  {
    id: 'insider-jamon',
    title: 'Why Spanish Iberian Ham Is the World\'s Most Expensive Cured Meat',
    series: 'Regional Eats',
    channel: 'Insider Food',
    year: 2021,
    runtime: '12 min',
    category: 'culture',
    region: 'Extremadura, Spain',
    blurb:
      "From the acorn-fed black-hoof pigs of the Spanish dehesa to the four-year curing rooms of Jabugo. Every step that turns a leg of pork into the most prized cured meat on earth.",
    titleAr: 'Why Spanish Iberian Ham Is World\'s Most Expensive Cured Meat',
    blurbAr: 'From acorn-fed black-hoof pigs of Spanish dehesa to four-year curing rooms of Jabugo. Every step that turns فخذة of pork into most prized cured meat on earth.',
    videoId: '1xcqXBGv5DM',
  },
  {
    id: 'pbs-franklin-brisket',
    title: 'Making The Perfect Brisket with Aaron Franklin',
    series: 'BBQ with Franklin',
    channel: 'PBS Food',
    year: 2014,
    runtime: '25 min',
    category: 'culture',
    region: 'Austin, Texas',
    blurb:
      "A full PBS episode with the most respected pitmaster in America. Aaron Franklin trims, seasons, smokes, and rests a brisket exactly the way his Austin barbecue joint serves four-hour-line customers.",
    titleAr: 'Making Perfect Brisket مع Aaron Franklin',
    blurbAr: 'full PBS episode مع most respected pitmaster in America. Aaron Franklin trims, seasons, smokes, و rests brisket exactly way his Austin barbecue joint serves four-ساعة-line customers.',
    videoId: 'nu4p3l6LuyI',
  },
  {
    id: 'kimchi-traditional',
    title: 'How Traditional Kimchi Is Made',
    channel: 'Silent Roots',
    year: 2022,
    runtime: '10 min',
    category: 'culture',
    region: 'Korea',
    blurb:
      "A quiet, near-wordless film of a Korean family making kimchi for winter the traditional way: napa cabbages, salt, gochugaru, the communal preparation called kimjang.",
    titleAr: 'How Traditional Kimchi Is Made',
    blurbAr: 'quiet, near-wordless film of Korean family making kimchi لمدة winter traditional way: napa cabbages, ملح, gochugaru, communal preparation called kimjang.',
    videoId: 'KMyOd0qLzzM',
  },
  {
    id: 'sushi-training',
    title: 'Becoming a Sushi Chef in Japan',
    channel: 'Nippon Nibbles',
    year: 2023,
    runtime: '12 min',
    category: 'culture',
    region: 'Japan',
    blurb:
      "The unforgiving training of a Japanese sushi apprentice: years of just polishing rice, then years of just slicing fish. What it takes to one day stand behind a Tokyo counter.",
    titleAr: 'Becoming Sushi Chef in Japan',
    blurbAr: 'unforgiving training of Japanese sushi apprentice: years of just polishing أرز, then years of just slicing سمك. What it takes to one يوم stand behind Tokyo counter.',
    videoId: 'BFNnfUyclNU',
  },
  {
    id: 'metate-mole',
    title: 'Preserving a Cooking Tool Older Than Civilization',
    series: 'Still Standing',
    channel: 'Business Insider',
    year: 2023,
    runtime: '13 min',
    category: 'culture',
    region: 'Oaxaca, Mexico',
    blurb:
      "A Zapotec chef in Oaxaca is fighting to keep the metate alive, the volcanic stone grinder used to make mole. Business Insider profiles the man and the tool that has not changed in 8,000 years.",
    titleAr: 'Preserving Cooking Tool Older Than Civilization',
    blurbAr: 'Zapotec chef in Oaxaca is fighting to keep metate alive, volcanic stone grinder used to make mole. Business Insider profiles man و tool that has not changed in 8,000 years.',
    videoId: 'ajwxJrhBzx8',
  },
];

export function filmsForCategory(cat: FilmCategory): FoodFilm[] {
  return FOOD_FILMS.filter((f) => f.category === cat);
}

export const FEATURED_FILMS: FoodFilm[] = FOOD_FILMS.filter((f) => f.featured);
