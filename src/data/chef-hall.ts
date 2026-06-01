/**
 * The Chef Hall. Curated profiles of the world's most influential chefs,
 * each paired with one verified video (interview, masterclass, or signature
 * dish). Sources include Netflix Chef's Table, MasterClass, PBS, Bon
 * Appétit, CBS Sunday Morning, Channel 4 News, NPR, TED, afikra, and 50
 * Best official YouTube uploads.
 */

export type ChefRegion =
  | 'middle-east'
  | 'mediterranean'
  | 'british'
  | 'americas'
  | 'asia'
  | 'nordic';

export interface Chef {
  id: string;
  name: string;
  nationality: string;
  cuisine: string;
  region: ChefRegion;
  restaurants?: string[];
  books?: string[];
  philosophy: string;
  bio: string;
  videoId: string;
  channel: string;
  featured?: boolean;
}

export const CHEF_REGIONS: { id: ChefRegion; name: string; tagline: string }[] = [
  { id: 'middle-east', name: 'Middle East', tagline: 'Olive oil, sumac, and the long memory of a region.' },
  { id: 'mediterranean', name: 'Mediterranean', tagline: 'France, Italy, Spain, and the warm sea between them.' },
  { id: 'british', name: 'British Isles', tagline: 'The kitchen that taught the world to braise and bake.' },
  { id: 'americas', name: 'Americas', tagline: 'From Oaxaca to Manhattan, every culture lives in one kitchen.' },
  { id: 'asia', name: 'Asia', tagline: 'Tradition and precision from Tokyo to Bangkok.' },
  { id: 'nordic', name: 'Nordic', tagline: 'Foraged moss, fermented herring, and a new world cuisine.' },
];

export const CHEFS: Chef[] = [
  // ===================== MIDDLE EAST =====================
  {
    id: 'ottolenghi',
    name: 'Yotam Ottolenghi',
    nationality: 'British',
    cuisine: 'Modern Middle Eastern',
    region: 'middle-east',
    restaurants: ['Ottolenghi Spitalfields', 'NOPI', 'Rovi'],
    books: ['Jerusalem', 'Plenty', 'Simple', 'Falastin (with Tamimi)'],
    philosophy:
      "Vegetables are not a supporting cast. They are the lead.",
    bio: "The chef who rewrote how the West cooks vegetables. Ottolenghi's books made za'atar, sumac, pomegranate molasses, and tahini household ingredients across the English-speaking world. Born in Jerusalem, trained in Paris, settled in London, and built a small culinary empire by treating vegetables with the seriousness others reserve for meat.",
    videoId: 'SaQ8OEj2DDw',
    channel: 'Jewish News',
    featured: true,
  },
  {
    id: 'sami-tamimi',
    name: 'Sami Tamimi',
    nationality: 'Palestinian',
    cuisine: 'Palestinian',
    region: 'middle-east',
    restaurants: ['Ottolenghi (co-founder)'],
    books: ['Jerusalem (with Ottolenghi)', 'Falastin'],
    philosophy:
      "Food is how we keep a country alive when its borders try to take it away.",
    bio: "Born in East Jerusalem, Sami Tamimi co-founded the Ottolenghi delis in London and wrote Falastin, the definitive English-language Palestinian cookbook. A chef whose entire career is also an act of cultural preservation.",
    videoId: '83KKfYofZlo',
    channel: 'Channel 4 News',
  },
  {
    id: 'anissa-helou',
    name: 'Anissa Helou',
    nationality: 'Lebanese-Syrian',
    cuisine: 'Levantine and Pan-Arab',
    region: 'middle-east',
    books: ['Lebanese Cuisine', 'Feast: Food of the Islamic World', 'Sweet Middle East'],
    philosophy:
      "Recipe books are time capsules. The trick is to keep opening them.",
    bio: "The doyenne of Arab cookbook writing in English. Anissa Helou's books have documented the food of the Islamic world from Morocco to Indonesia, with the rigor of a historian and the warmth of a grandmother. A frequent collaborator with TASTE, Al Jazeera, and BBC Food.",
    videoId: 'KiLKVFWDjNk',
    channel: 'Qatar America Institute',
  },
  {
    id: 'reem-kassis',
    name: 'Reem Kassis',
    nationality: 'Palestinian',
    cuisine: 'Palestinian heritage cooking',
    region: 'middle-east',
    books: ['The Palestinian Table', 'The Arabesque Table'],
    philosophy:
      "There is no single Arab cuisine. There are dozens, and that is the point.",
    bio: "An award-winning Palestinian writer whose two cookbooks place recipes inside the larger story of identity, displacement, and inheritance. Her work has appeared in the Washington Post, the Guardian, and the New York Times.",
    videoId: 'breku9C2wHA',
    channel: 'afikra',
  },
  {
    id: 'joudie-kalla',
    name: 'Joudie Kalla',
    nationality: 'Palestinian',
    cuisine: 'Palestinian',
    region: 'middle-east',
    restaurants: ['Baity Kitchen (London)'],
    books: ['Palestine on a Plate', 'Baladi'],
    philosophy:
      "I want everyone to taste what my grandmother cooked, and to ask the obvious next question.",
    bio: "London-based Palestinian chef whose pop-ups and books made village Palestinian cooking visible to a generation of British and Arab diaspora readers. Cooked at El Bulli early in her career; returned to her family's kitchen for the rest of it.",
    videoId: 'I1pexF8i6r4',
    channel: 'The Enlightenment Podcast',
  },
  {
    id: 'claudia-roden',
    name: 'Claudia Roden',
    nationality: 'Egyptian-British',
    cuisine: 'Middle Eastern and Sephardic',
    region: 'middle-east',
    books: ['A Book of Middle Eastern Food', 'The New Book of Middle Eastern Food', 'The Book of Jewish Food'],
    philosophy:
      "A recipe is a piece of history that you happen to be able to eat.",
    bio: "Cairo-born, London-based, the founding figure of English-language Middle Eastern cookbook writing. Her 1968 first edition opened the door for every Arab and Sephardic cuisine that followed.",
    videoId: 'is7IJgibSxE',
    channel: 'TEDx',
  },
  {
    id: 'nawal-nasrallah',
    name: 'Nawal Nasrallah',
    nationality: 'Iraqi-American',
    cuisine: 'Iraqi heritage',
    region: 'middle-east',
    books: ['Delights from the Garden of Eden', 'Annals of the Caliphs Kitchens'],
    philosophy:
      "Iraqi food is not a national cuisine. It is a 4,000-year archive of cuisines.",
    bio: "Translator of medieval Arabic culinary manuscripts and the foremost living scholar of Iraqi food history. Her work bridges 10th-century Baghdad and the modern Iraqi diaspora kitchen.",
    videoId: 'O7yCSMiCHSg',
    channel: 'afikra',
  },

  // ===================== MEDITERRANEAN =====================
  {
    id: 'massimo-bottura',
    name: 'Massimo Bottura',
    nationality: 'Italian',
    cuisine: 'Modern Italian',
    region: 'mediterranean',
    restaurants: ['Osteria Francescana (Modena)', 'Refettorio Ambrosiano'],
    books: ['Never Trust a Skinny Italian Chef', 'Bread is Gold'],
    philosophy:
      "Tradition is a starting line, not a finish line.",
    bio: "The Modenese three-Michelin-star chef whose Osteria Francescana was twice voted the world's best restaurant. Co-founded Food for Soul, a nonprofit that turns surplus food into dignified meals for those who need them.",
    videoId: '1pY6IvkQm2Q',
    channel: 'Netflix',
    featured: true,
  },
  {
    id: 'lidia-bastianich',
    name: 'Lidia Bastianich',
    nationality: 'Italian-American',
    cuisine: 'Regional Italian',
    region: 'mediterranean',
    restaurants: ['Felidia', 'Becco', 'Esca'],
    books: ['Lidias Italy', 'Lidias Mastering the Art of Italian Cuisine'],
    philosophy:
      "Italian food is the food of grandmothers. Hold onto that and you cannot go wrong.",
    bio: "PBS's most beloved Italian cooking host and one of the most respected restaurateurs in New York. Bastianich's cooking is regional Italy distilled, with the simple authority of a woman who learned it in her own kitchen first.",
    videoId: 'SnoEhb9lNMI',
    channel: 'PBS Food',
  },
  {
    id: 'alain-ducasse',
    name: 'Alain Ducasse',
    nationality: 'French',
    cuisine: 'Haute French',
    region: 'mediterranean',
    restaurants: ['Le Louis XV (Monaco)', 'Alain Ducasse au Plaza Athénée'],
    books: ['Grand Livre de Cuisine', 'Nature: Simple, Healthy, Good'],
    philosophy:
      "The best chef is the one who steps back and lets the produce speak.",
    bio: "The first chef ever to hold three Michelin stars at three restaurants on three continents at the same time. Ducasse's empire of haute French cuisine spans Monaco, Paris, Tokyo, London, and beyond.",
    videoId: 'IDxIqqi2now',
    channel: 'Hello French',
  },
  {
    id: 'pierre-herme',
    name: 'Pierre Hermé',
    nationality: 'French',
    cuisine: 'Patisserie',
    region: 'mediterranean',
    restaurants: ['Pierre Hermé (Paris, Tokyo, London)'],
    books: ['Macarons', 'Pierre Hermés Pastries'],
    philosophy:
      "Pastry is architecture. Calculate the proportions, then make it beautiful.",
    bio: "The pastry chef Vogue called Picasso of Pastry. Hermé rewrote what a macaron could taste like, from rose-litchi to chocolate-foie gras, and built a global pastry boutique from a single Tokyo shop.",
    videoId: 'tvwtmaHWzDY',
    channel: 'PastryClass',
  },
  {
    id: 'daniel-boulud',
    name: 'Daniel Boulud',
    nationality: 'French-American',
    cuisine: 'Modern French',
    region: 'mediterranean',
    restaurants: ['Daniel', 'Café Boulud', 'db Bistro Moderne'],
    books: ['Daniels Dish', 'Letters to a Young Chef'],
    philosophy:
      "Respect the season, respect the producer, respect the guest. In that order.",
    bio: "Lyon-trained, New York-based, Boulud has been a pillar of French fine dining in America for four decades. His DBGB and Daniel set the standard for how a French chef can adapt without diluting.",
    videoId: 'Aw-uhwr64IE',
    channel: 'GourmetPhile',
  },
  {
    id: 'eric-ripert',
    name: 'Éric Ripert',
    nationality: 'French',
    cuisine: 'Seafood',
    region: 'mediterranean',
    restaurants: ['Le Bernardin (NYC)'],
    books: ['Avec Eric', '32 Yolks'],
    philosophy:
      "The fish is the star. Everything else is a frame around it.",
    bio: "Chef and co-owner of Le Bernardin, the only restaurant in New York to hold four stars from the New York Times for 32 consecutive years. Ripert is the world's foremost authority on cooking fish.",
    videoId: 'Lrn2AONZyCM',
    channel: 'Bon Appétit',
  },
  {
    id: 'marco-pierre-white',
    name: 'Marco Pierre White',
    nationality: 'British',
    cuisine: 'British / French',
    region: 'mediterranean',
    restaurants: ['Harveys', 'The Restaurant Marco Pierre White'],
    books: ['White Heat'],
    philosophy:
      "Cook the dish you love, the way you love it. The rest is noise.",
    bio: "The youngest chef ever to win three Michelin stars at 33. Trained Gordon Ramsay and a generation of British chefs. Walked away from his stars at 38 because he could not bear to be judged any longer.",
    videoId: '30MeweA_jjg',
    channel: 'PopCultureMoments',
  },
  {
    id: 'ferran-adria',
    name: 'Ferran Adrià',
    nationality: 'Spanish',
    cuisine: 'Avant-garde / Molecular',
    region: 'mediterranean',
    restaurants: ['El Bulli (closed 2011)'],
    books: ['A Day at elBulli', 'The Family Meal'],
    philosophy:
      "Creativity is not making something new. It is finding the question no one else asked.",
    bio: "The chef who broke the rules of cuisine in the 21st century. El Bulli held three Michelin stars and was voted the best restaurant in the world five times before Adrià closed it to turn it into a research foundation.",
    videoId: 'WoHKFEq-zCw',
    channel: 'wocomoCOOK',
  },
  {
    id: 'jose-andres',
    name: 'José Andrés',
    nationality: 'Spanish-American',
    cuisine: 'Spanish',
    region: 'mediterranean',
    restaurants: ['Jaleo', 'minibar', 'The Bazaar'],
    books: ['Made in Spain', 'Vegetables Unleashed'],
    philosophy:
      "Food is a universal right. Treat it as one and the politics follow.",
    bio: "Chef, restaurateur, and humanitarian. Andrés brought Spanish tapas to America in the 1990s, then founded World Central Kitchen, a nonprofit that has served tens of millions of meals in disaster zones from Haiti to Gaza.",
    videoId: '-eYaSwwmGl4',
    channel: 'National Geographic',
  },
  {
    id: 'francis-mallmann',
    name: 'Francis Mallmann',
    nationality: 'Argentine',
    cuisine: 'Fire cooking, Argentine',
    region: 'mediterranean',
    restaurants: ['Patagonia Sur (Buenos Aires)'],
    books: ['Seven Fires', 'Mallmann on Fire'],
    philosophy:
      "Fire is the oldest kitchen, and still the best one.",
    bio: "The Patagonian master of open-fire cooking. Mallmann lives between three remote Argentine outposts and cooks meat, vegetables, and bread over wood and embers. Featured in the first season of Netflix's Chef's Table.",
    videoId: '-fnIO1z2Wwk',
    channel: 'YesChef',
  },

  // ===================== BRITISH ISLES =====================
  {
    id: 'jacques-pepin',
    name: 'Jacques Pépin',
    nationality: 'French-American',
    cuisine: 'Classical French',
    region: 'british',
    restaurants: ['Le Pavillon (NYC, 1959)'],
    books: ['La Technique', 'The Apprentice'],
    philosophy:
      "The knife is the most important tool in the kitchen. Learn the knife and the rest follows.",
    bio: "Personal chef to three French heads of state before age 30, then PBS's most beloved cooking teacher for the next half century. Pépin's omelet videos and his book La Technique are the foundational texts of modern American home cooking.",
    videoId: 'De0SiZHf2oU',
    channel: 'KQED',
    featured: true,
  },
  {
    id: 'gordon-ramsay',
    name: 'Gordon Ramsay',
    nationality: 'British',
    cuisine: 'Modern British / French',
    region: 'british',
    restaurants: ['Restaurant Gordon Ramsay (London)', 'Pétrus', 'Hells Kitchen'],
    books: ['Roasting in Hells Kitchen', 'Gordon Ramsays Healthy, Lean & Fit'],
    philosophy:
      "Cooking is about discipline, not drama. The drama is for television.",
    bio: "Trained by Marco Pierre White and Joël Robuchon, Ramsay holds 17 Michelin stars across his restaurant group. The reality TV persona is a character; the chef is one of the most technically rigorous in the world.",
    videoId: 'AFHEb85Jw2M',
    channel: 'MasterClass',
  },
  {
    id: 'jamie-oliver',
    name: 'Jamie Oliver',
    nationality: 'British',
    cuisine: 'Modern British',
    region: 'british',
    restaurants: ['Jamies Italian'],
    books: ['The Naked Chef', '30-Minute Meals', '5 Ingredients'],
    philosophy:
      "Anyone can cook. Take the fear out of the kitchen and watch what happens.",
    bio: "The Essex chef whose 1999 BBC series made home cooking suddenly cool in Britain again. His campaigns reformed school dinners across the UK and pushed sugar tax legislation through parliament.",
    videoId: '78Qgxm38ejI',
    channel: 'Jamie Oliver TV',
  },
  {
    id: 'heston-blumenthal',
    name: 'Heston Blumenthal',
    nationality: 'British',
    cuisine: 'Experimental / Molecular',
    region: 'british',
    restaurants: ['The Fat Duck (Bray)', 'Dinner by Heston'],
    books: ['Heston Blumenthal at Home', 'In Search of Perfection'],
    philosophy:
      "If a recipe has always been done one way, that is exactly the question to ask.",
    bio: "Self-taught British chef whose Fat Duck holds three Michelin stars and serves dishes like Sound of the Sea, eaten with headphones. Pioneered multi-sensory dining and changed what a fine-dining tasting menu could be.",
    videoId: 'FjGfqezhuU4',
    channel: '50 Best',
  },
  {
    id: 'nadiya-hussain',
    name: 'Nadiya Hussain',
    nationality: 'British-Bangladeshi',
    cuisine: 'Home baking and family cooking',
    region: 'british',
    books: ['Nadiyas Kitchen', 'Nadiyas Family Favourites', 'Time to Eat'],
    philosophy:
      "Cook for the people you love. Everything else is just performance.",
    bio: "The Bake Off winner who became a national treasure. Hussain's BBC shows reframed British home cooking through her Bangladeshi heritage, and her cookbooks have helped make Bengali ingredients standard in British pantries.",
    videoId: 'IDBAuTHZ_MM',
    channel: 'BBC',
  },
  {
    id: 'tom-kerridge',
    name: 'Tom Kerridge',
    nationality: 'British',
    cuisine: 'Modern British pub',
    region: 'british',
    restaurants: ['The Hand & Flowers (Marlow)'],
    books: ['Tom Kerridges Best Ever Dishes', 'Lose Weight for Good'],
    philosophy:
      "A great pub kitchen and a great fine-dining kitchen are doing the same thing.",
    bio: "The first ever pub chef to win two Michelin stars at The Hand & Flowers. Kerridge's TV series have made hearty, technical British pub cooking accessible to a generation of home cooks.",
    videoId: 'ZyqYq7TIOqY',
    channel: 'Food TV',
  },
  {
    id: 'rick-stein',
    name: 'Rick Stein',
    nationality: 'British',
    cuisine: 'Seafood and world cooking',
    region: 'british',
    restaurants: ['The Seafood Restaurant (Padstow)'],
    books: ['Rick Steins Long Weekends', 'Rick Steins India'],
    philosophy:
      "Travel is the spice. Bring the dishes home; do not change the destination.",
    bio: "The Cornish chef and broadcaster whose travel-food series for the BBC have shaped how the English-speaking world understands regional cuisines, from Cornwall to Vietnam.",
    videoId: 'MA49pIGWt_o',
    channel: 'Life of Joe & Jordan',
  },
  {
    id: 'nigella-lawson',
    name: 'Nigella Lawson',
    nationality: 'British',
    cuisine: 'Home cooking',
    region: 'british',
    books: ['How to Eat', 'How to Be a Domestic Goddess', 'Cook, Eat, Repeat'],
    philosophy:
      "Cook to please yourself first. Pleasing others is a side effect.",
    bio: "Cookbook writer and broadcaster whose books defined British home cooking for two decades. Lawson's writing about food is read like literature; her recipes are cooked on weeknights from London to Sydney.",
    videoId: 'Y0NJSVCHQ_w',
    channel: 'Good Housekeeping UK',
  },
  {
    id: 'asma-khan',
    name: 'Asma Khan',
    nationality: 'Indian-British',
    cuisine: 'Indian (Mughlai)',
    region: 'british',
    restaurants: ['Darjeeling Express (London)'],
    books: ['Asmas Indian Kitchen', 'Ammu'],
    philosophy:
      "The cook is as important as the recipe. Both belong to the same heritage.",
    bio: "Born into a royal Bengali family in Kolkata. Khan's London restaurant Darjeeling Express is powered entirely by an all-female kitchen of home cooks. The first British chef ever featured on Netflix's Chef's Table.",
    videoId: 'Cki3E_0TRdY',
    channel: 'TOPJAW',
  },

  // ===================== AMERICAS =====================
  {
    id: 'thomas-keller',
    name: 'Thomas Keller',
    nationality: 'American',
    cuisine: 'New American / French',
    region: 'americas',
    restaurants: ['The French Laundry', 'Per Se', 'Bouchon'],
    books: ['The French Laundry Cookbook', 'Ad Hoc at Home'],
    philosophy:
      "A great chef takes the simplest thing and makes it the best version of itself.",
    bio: "The first American chef to be awarded three Michelin stars at two restaurants simultaneously. Keller's Yountville and New York kitchens have trained more leading American chefs than any other.",
    videoId: 'HOjYk2UpTM0',
    channel: 'MasterClass',
  },
  {
    id: 'alice-waters',
    name: 'Alice Waters',
    nationality: 'American',
    cuisine: 'Californian, farm-to-table',
    region: 'americas',
    restaurants: ['Chez Panisse (Berkeley)'],
    books: ['The Art of Simple Food', 'Chez Panisse Vegetables'],
    philosophy:
      "Eat what is in season, grown nearby, by people you trust. Then keep cooking.",
    bio: "Founder of Chez Panisse and the godmother of American farm-to-table cooking. Waters's Edible Schoolyard project has been replicated in over 6,000 schools worldwide.",
    videoId: 'C9IX3x12PLE',
    channel: 'Brief But Spectacular',
  },
  {
    id: 'ina-garten',
    name: 'Ina Garten',
    nationality: 'American',
    cuisine: 'American home cooking',
    region: 'americas',
    books: ['The Barefoot Contessa Cookbook', 'Cooking for Jeffrey', 'Modern Comfort Food'],
    philosophy:
      "If you have great ingredients, you do not have to do much.",
    bio: "The Barefoot Contessa. Garten's Food Network show and bestselling cookbooks have made East Hampton's relaxed home cooking style the de facto standard of American entertaining.",
    videoId: 'mscypfHJGwo',
    channel: 'Food Network',
  },
  {
    id: 'bobby-flay',
    name: 'Bobby Flay',
    nationality: 'American',
    cuisine: 'Southwestern, grilling',
    region: 'americas',
    restaurants: ['Mesa Grill', 'Bar Americain'],
    books: ['Bobby Flays Mesa Grill Cookbook', 'Bobby Flay Fit'],
    philosophy:
      "Heat and acid. Get those two right and the dish takes care of itself.",
    bio: "New York chef whose Mesa Grill defined modern American Southwestern cuisine in the 1990s. Flay's grilling and chili expertise have made him one of the most recognizable American chefs on television.",
    videoId: 'I1MjwhkBQn0',
    channel: 'BBQ Channel',
  },
  {
    id: 'rick-bayless',
    name: 'Rick Bayless',
    nationality: 'American',
    cuisine: 'Regional Mexican',
    region: 'americas',
    restaurants: ['Frontera Grill', 'Topolobampo (Chicago)'],
    books: ['Authentic Mexican', 'Mexico: One Plate at a Time'],
    philosophy:
      "Regional Mexican is one of the world's three great cuisines. Treat it that way.",
    bio: "Chicago chef and PBS host who has done more than any other to teach Americans real regional Mexican cooking. His 25-year PBS series, restaurants, and books are the gold standard.",
    videoId: '5KZr7tASvfw',
    channel: 'Rick Bayless',
  },
  {
    id: 'wolfgang-puck',
    name: 'Wolfgang Puck',
    nationality: 'Austrian-American',
    cuisine: 'Californian, Austrian',
    region: 'americas',
    restaurants: ['Spago', 'Cut'],
    books: ['Wolfgang Pucks Modern French Cooking'],
    philosophy:
      "Simple food, perfectly executed, in beautiful surroundings. The rest is decoration.",
    bio: "The Austrian chef who put Los Angeles on the global culinary map. Puck's Spago invented the California pizza, and his Beverly Hills restaurant has been at the center of Hollywood dining for 40 years.",
    videoId: '9_v_smgvzEM',
    channel: 'MasterClass',
  },
  {
    id: 'david-chang',
    name: 'David Chang',
    nationality: 'Korean-American',
    cuisine: 'Asian fusion',
    region: 'americas',
    restaurants: ['Momofuku Noodle Bar', 'Ssäm Bar', 'Ko'],
    books: ['Momofuku', 'Eat a Peach'],
    philosophy:
      "Authenticity is a story. Deliciousness is the only thing that matters.",
    bio: "The Korean-American chef whose Momofuku restaurants rewrote how New York thought about Asian food. Hosts Ugly Delicious on Netflix and the Dave Chang Show podcast.",
    videoId: 'pN_XItALHmM',
    channel: 'Netflix',
  },
  {
    id: 'samin-nosrat',
    name: 'Samin Nosrat',
    nationality: 'Iranian-American',
    cuisine: 'World techniques',
    region: 'americas',
    books: ['Salt Fat Acid Heat'],
    philosophy:
      "Every dish in the world is some balance of salt, fat, acid, and heat. Learn those four and you can cook anything.",
    bio: "Trained at Chez Panisse. Nosrat's book and Netflix series Salt Fat Acid Heat reframed how home cooks understand recipes. Her food writing in the New York Times has won a James Beard Award.",
    videoId: '2oKbs4jAf7M',
    channel: 'Netflix',
  },
  {
    id: 'joshua-weissman',
    name: 'Joshua Weissman',
    nationality: 'American',
    cuisine: 'Internet cooking',
    region: 'americas',
    books: ['An Unapologetic Cookbook', 'Texture Over Taste'],
    philosophy:
      "Make it better than the restaurant. There is nothing they do that you cannot do at home.",
    bio: "The YouTube chef whose But Better series rebuilt fast-food classics from scratch. Weissman's relentless, high-production-value videos have made him one of the most-watched cooking voices on the internet.",
    videoId: 'VylU-ueLA_g',
    channel: 'Architectural Digest',
  },
  {
    id: 'marcus-samuelsson',
    name: 'Marcus Samuelsson',
    nationality: 'Ethiopian-Swedish-American',
    cuisine: 'Pan-African, Scandinavian',
    region: 'americas',
    restaurants: ['Red Rooster (Harlem)', 'Aquavit'],
    books: ['Yes, Chef', 'The Rise'],
    philosophy:
      "Cooking is how a city remembers itself. Make sure every voice is in the pot.",
    bio: "Born in Ethiopia, adopted to Sweden, working in Harlem. Samuelsson's Red Rooster celebrates the African diaspora's contribution to American cuisine. The youngest chef ever to receive a three-star New York Times review.",
    videoId: '-lJiJTeslF0',
    channel: 'Fork the People',
  },
  {
    id: 'kwame-onwuachi',
    name: 'Kwame Onwuachi',
    nationality: 'American (Nigerian heritage)',
    cuisine: 'Afro-Caribbean, Pan-African',
    region: 'americas',
    restaurants: ['Tatiana (New York)'],
    books: ['Notes from a Young Black Chef', 'My America'],
    philosophy:
      "The food of the African diaspora is American food. Cook it that way.",
    bio: "Bronx-born chef whose New York restaurant Tatiana was named the New York Times' best new restaurant of 2023. Onwuachi's memoir traced his journey through Caribbean kitchens, Per Se, and back to his own table.",
    videoId: 'Co-SRNUEKBs',
    channel: '50 Best',
  },
  {
    id: 'dominique-crenn',
    name: 'Dominique Crenn',
    nationality: 'French-American',
    cuisine: 'New French, plant-forward',
    region: 'americas',
    restaurants: ['Atelier Crenn', 'Petit Crenn'],
    books: ['Atelier Crenn: Metamorphosis of Taste', 'Rebel Chef'],
    philosophy:
      "A menu is a poem. A meal is the reading.",
    bio: "The first female chef in the United States to earn three Michelin stars. Crenn's Atelier Crenn is one of the most lyrical restaurants in San Francisco; she also became one of the few chefs to remove meat from a three-star menu.",
    videoId: 'cLshKazkzMs',
    channel: 'CBS Sunday Morning',
  },

  // ===================== ASIA =====================
  {
    id: 'niki-nakayama',
    name: 'Niki Nakayama',
    nationality: 'Japanese-American',
    cuisine: 'Kaiseki',
    region: 'asia',
    restaurants: ['n/naka (Los Angeles)'],
    philosophy:
      "Kaiseki is a conversation between season, ingredient, and guest. Nothing else belongs.",
    bio: "Featured in the first season of Netflix's Chef's Table. Nakayama's n/naka is the most acclaimed kaiseki restaurant in the United States, a 13-course meditation on Japanese seasonality.",
    videoId: 'IX9dd14GyKg',
    channel: 'Netflix',
  },
  {
    id: 'madhur-jaffrey',
    name: 'Madhur Jaffrey',
    nationality: 'Indian-British',
    cuisine: 'Indian',
    region: 'asia',
    books: ['An Invitation to Indian Cooking', 'Madhur Jaffreys World Vegetarian'],
    philosophy:
      "Indian food is twenty cuisines pretending to be one. Learn the twenty.",
    bio: "The Indian actress turned cookbook writer who introduced Indian cooking to Britain and America in the 1970s. Awarded a CBE for services to cookery. Now teaches an Indian cooking MasterClass.",
    videoId: 'XJUp2LHTXaU',
    channel: 'MasterClass',
  },
  {
    id: 'gaggan-anand',
    name: 'Gaggan Anand',
    nationality: 'Indian',
    cuisine: 'Progressive Indian',
    region: 'asia',
    restaurants: ['Gaggan Anand (Bangkok)'],
    philosophy:
      "Take Indian food, throw away the rules, keep the soul.",
    bio: "Calcutta-born, Bangkok-based. Anand's restaurant was four-times voted the best in Asia. His Indian tasting menus are deconstructed, ironic, and rigorous all at once.",
    videoId: 'PONuoBHDx6s',
    channel: 'NDTV Food',
  },
  {
    id: 'padma-lakshmi',
    name: 'Padma Lakshmi',
    nationality: 'Indian-American',
    cuisine: 'Indian, global',
    region: 'asia',
    books: ['Easy Exotic', 'Tangy, Tart, Hot & Sweet', 'Tomatoes for Neela'],
    philosophy:
      "Food is the most honest way to tell the story of who lives in a place.",
    bio: "Cookbook writer, longtime Top Chef host, and creator of Taste the Nation on Hulu, which explores immigrant cuisines across America. Lakshmi's writing on Indian cuisine and identity has reshaped American food media.",
    videoId: 'VEUutcTqcno',
    channel: 'NPR',
  },

  // ===================== NORDIC =====================
  {
    id: 'rene-redzepi',
    name: 'René Redzepi',
    nationality: 'Danish-Macedonian',
    cuisine: 'New Nordic',
    region: 'nordic',
    restaurants: ['Noma (Copenhagen)'],
    books: ['Noma: Time and Place', 'The Noma Guide to Fermentation'],
    philosophy:
      "If you cannot find it in your own region, do not put it on the plate.",
    bio: "The chef who launched the New Nordic movement. Redzepi's Noma has been voted World's Best Restaurant five times. Co-founder of MAD, a nonprofit that hosts the world's most ambitious chef conferences.",
    videoId: 'HGKzwgoyVp0',
    channel: '50 Best',
  },
  {
    id: 'magnus-nilsson',
    name: 'Magnus Nilsson',
    nationality: 'Swedish',
    cuisine: 'Hyper-local Nordic',
    region: 'nordic',
    restaurants: ['Fäviken (closed 2019)'],
    books: ['Fäviken', 'The Nordic Cookbook', 'The Nordic Baking Book'],
    philosophy:
      "Use what is around you. If it is around you in only a small window, use it then.",
    bio: "The Jämtland chef whose Fäviken restaurant in a remote Swedish forest served twelve diners a night a tasting menu of foraged moss, cured meats, and hyper-local produce. Closed Fäviken in 2019 to write and forage.",
    videoId: 'OU32g8miTa0',
    channel: 'What Makes a Great Chef',
  },
];

export const FEATURED_CHEFS: Chef[] = CHEFS.filter((c) => c.featured);

export function chefsForRegion(r: ChefRegion): Chef[] {
  return CHEFS.filter((c) => c.region === r);
}
