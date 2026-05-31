/**
 * The Skills Academy is a curated curriculum of cooking techniques. Every
 * entry is a short, focused video tutorial from a credible YouTube channel
 * (Epicurious, Bon Appétit, NYT-style chefs, J. Kenji López-Alt, Jacques
 * Pépin, King Arthur Baking, Food Wishes, Gordon Ramsay, etc.) that teaches
 * one technique properly. Grouped by category and skill level so a beginner
 * can build a foundation and an experienced cook can drill weak spots.
 */

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export type SkillCategory =
  | 'knife'
  | 'meat'
  | 'fish'
  | 'dough'
  | 'sauce'
  | 'egg'
  | 'vegetable'
  | 'stock'
  | 'heat'
  | 'rice';

export interface CookingSkill {
  id: string;
  name: string;
  channel: string;
  videoId: string;
  category: SkillCategory;
  level: SkillLevel;
  runtime?: string;
  description: string;
  whenToUse: string;
  commonMistake?: string;
  featured?: boolean;
}

export const SKILL_CATEGORIES: { id: SkillCategory; name: string; tagline: string }[] = [
  { id: 'knife', name: 'Knife skills', tagline: 'The first thing every kitchen rewards.' },
  { id: 'egg', name: 'Eggs', tagline: 'The fastest way to spot a real cook.' },
  { id: 'vegetable', name: 'Vegetables', tagline: 'Heat, salt, time, repeat.' },
  { id: 'meat', name: 'Meat and poultry', tagline: 'Butchery and brining at home.' },
  { id: 'fish', name: 'Fish and seafood', tagline: 'A clean fillet is a quiet kind of mastery.' },
  { id: 'dough', name: 'Dough and bread', tagline: 'Flour and water under your hands.' },
  { id: 'sauce', name: 'Sauces and emulsions', tagline: 'The glue that holds dinner together.' },
  { id: 'stock', name: 'Stocks and bases', tagline: 'Build flavor before you start cooking.' },
  { id: 'rice', name: 'Rice', tagline: 'The grain that feeds half the planet.' },
  { id: 'heat', name: 'Heat and sear', tagline: 'Crust, color, char, and the science behind them.' },
];

export const LEVEL_META: Record<SkillLevel, { name: string; bg: string; text: string }> = {
  beginner: { name: 'Beginner', bg: 'bg-sage-50', text: 'text-sage-700' },
  intermediate: { name: 'Intermediate', bg: 'bg-gold-500/15', text: 'text-gold-700' },
  advanced: { name: 'Advanced', bg: 'bg-terracotta-50', text: 'text-terracotta-600' },
};

export const COOKING_SKILLS: CookingSkill[] = [
  // ===================== KNIFE SKILLS =====================
  {
    id: 'epicurious-9-knife',
    name: 'Nine essential knife skills',
    channel: 'Epicurious',
    videoId: 'YrHpeEwk_-U',
    category: 'knife',
    level: 'beginner',
    runtime: '20 min',
    description:
      "A complete starter guide that covers the grip, the rocking motion, slicing, dicing, julienne, brunoise, chiffonade, mincing, and chopping in one focused lesson.",
    whenToUse: 'Start here. Every recipe in the world becomes easier once these nine movements are second nature.',
    commonMistake: 'Holding the knife like a hammer. The grip is a pinch at the bolster, not a fist on the handle.',
    featured: true,
  },
  {
    id: 'ramsay-onion',
    name: 'Dicing an onion',
    channel: 'Gordon Ramsay',
    videoId: 'dCGS067s0zo',
    category: 'knife',
    level: 'beginner',
    runtime: '3 min',
    description:
      "Gordon Ramsay's 60-second method for a perfectly diced onion. Root left on, vertical cuts, horizontal cuts, then crosswise. Even cubes, no tears.",
    whenToUse: 'Almost every savory recipe starts here. Practice on a single onion every day until it is automatic.',
    commonMistake: 'Cutting through the root. Leave it intact so the onion holds together while you dice.',
  },
  {
    id: 'wired-garlic',
    name: 'Mincing garlic the chef way',
    channel: 'WIRED',
    videoId: '96BnM63Un7A',
    category: 'knife',
    level: 'beginner',
    runtime: '4 min',
    description:
      "Gordon Ramsay answers WIRED viewer questions on mincing. The smash-with-flat-blade trick, salt to grip the cutting board, and a rocking knife to get a paste.",
    whenToUse: 'When a recipe says minced garlic. Crushed-then-minced gives more flavor than pressed.',
  },
  {
    id: 'brunoise-michelin',
    name: 'Brunoise like a Michelin chef',
    channel: 'Calming Cuisine',
    videoId: 'hmQm_a-QFjc',
    category: 'knife',
    level: 'intermediate',
    runtime: '5 min',
    description:
      "Perfect 2 mm dice. The Michelin-grade brunoise that turns soups, sauces, and stuffings into restaurant-level texture.",
    whenToUse: 'Stocks, consommés, sauce bases. When the diced ingredient should disappear into the dish.',
    commonMistake: 'Rushing the slabs. The cut is only as even as the very first lengthwise slice.',
  },
  {
    id: 'julienne-poppy',
    name: 'Julienne in 30 seconds',
    channel: 'Poppy Cooks',
    videoId: 'rNX9x2583GY',
    category: 'knife',
    level: 'beginner',
    runtime: '1 min',
    description:
      "Poppy O'Toole's quick tip on the matchstick cut. Slabs first, stack them, then strips. Clean and fast.",
    whenToUse: 'Stir-fries, slaws, garnishes, anywhere you want a tender bite that cooks in seconds.',
  },
  {
    id: 'chiffonade-basil',
    name: 'Chiffonade for fresh herbs',
    channel: 'Jessica Gavin',
    videoId: '4e9RtbX8Bv8',
    category: 'knife',
    level: 'beginner',
    runtime: '3 min',
    description:
      "The cigar roll. Stack the basil leaves shiny side up, roll tight, slice across with a sharp knife. Ribbon-thin shreds in seconds.",
    whenToUse: 'Basil over pasta, mint over fruit, sage in butter, any tender herb you want as a garnish.',
    commonMistake: 'A dull blade bruises basil black. Use the sharpest knife you have, no exceptions.',
  },
  {
    id: 'sharpen-whetstone',
    name: 'Sharpening a knife on a whetstone',
    channel: 'TheRenderQ',
    videoId: 'h6faatE8b9Q',
    category: 'knife',
    level: 'intermediate',
    runtime: '12 min',
    description:
      "Step-by-step on a wet stone. Soaking, the 17-degree angle, alternating sides, finishing on the strop. Turn a dull blade razor-sharp in 15 minutes.",
    whenToUse: 'Once a month for regular kitchen use, more often if you cook every day.',
    commonMistake: 'Pressing too hard. The stone does the cutting, your job is just to hold the angle.',
  },

  // ===================== EGGS =====================
  {
    id: 'pepin-omelet-pbs',
    name: 'Jacques Pépin\'s French omelet',
    channel: 'American Masters PBS',
    videoId: 'X1XoCQm5JSQ',
    category: 'egg',
    level: 'intermediate',
    runtime: '6 min',
    description:
      "The legend himself, on the most famous two-minute dish in French cooking. PBS American Masters captured the master at work: classic and country styles, both in one lesson.",
    whenToUse: 'When you want to show someone you actually know how to cook.',
    commonMistake: 'Heat too low. The omelet needs aggressive heat and constant motion, not gentle cooking.',
    featured: true,
  },
  {
    id: 'pepin-omelet-wapo',
    name: 'Jacques Pépin demonstrates the omelet',
    channel: 'Washington Post',
    videoId: 'bQ9ggm8cLII',
    category: 'egg',
    level: 'intermediate',
    runtime: '4 min',
    description:
      "A second masterclass on the same dish, filmed by the Washington Post. Different angle, different camera, same hands. Watch them both side by side.",
    whenToUse: 'After the first lesson, to drill the wrist flick at the finish.',
  },
  {
    id: 'egg-timing-test',
    name: 'Boiled egg timing test, 4 to 10 minutes',
    channel: 'Cooking With Ehsan',
    videoId: '4wdXEUO3h6Q',
    category: 'egg',
    level: 'beginner',
    runtime: '6 min',
    description:
      "Six identical eggs boiled at one-minute intervals, then sliced open side by side. The clearest visual of how time changes a boiled egg.",
    whenToUse: 'Save the chart in your phone. Match your eggs to the minute you want.',
  },

  // ===================== VEGETABLES =====================
  {
    id: 'caramelize-onions-fn',
    name: 'Caramelize onions like a pro',
    channel: 'Food Network',
    videoId: 'v-bhA0GcoLM',
    category: 'vegetable',
    level: 'beginner',
    runtime: '5 min',
    description:
      "Food Network breaks down the 45-minute slow cook that turns raw onions into a deep brown, jammy, sweet foundation for soups, dips, and burgers.",
    whenToUse: 'French onion soup, smash burgers, dips. Anything where onion should taste like dessert and savory at once.',
    commonMistake: 'Heat too high. Real caramelization is a slow Maillard reaction, not a fast char.',
  },
  {
    id: 'roast-veg-ethan',
    name: 'Perfect roasted vegetables',
    channel: 'Ethan Chlebowski',
    videoId: 'TomGub3ir2M',
    category: 'vegetable',
    level: 'beginner',
    runtime: '8 min',
    description:
      "Four tips that fix the most common roasted vegetable problems: too soft, no color, uneven, soggy. Heat, fat, spacing, contact.",
    whenToUse: 'Every weeknight. The most reliable way to make any vegetable taste like a restaurant cooked it.',
    featured: true,
  },
  {
    id: 'blanch-veg',
    name: 'Blanching vegetables',
    channel: "Kelly's Clean Kitchen",
    videoId: 'CIzyDDL8zxg',
    category: 'vegetable',
    level: 'beginner',
    runtime: '3 min',
    description:
      "Boil, ice bath, drain. The two-step that sets vegetable color, stops the cooking exactly when you want, and prepares them for freezing or finishing later.",
    whenToUse: 'Green beans, broccoli, asparagus, before you sauté or freeze. Also for peeling tomatoes.',
  },

  // ===================== MEAT =====================
  {
    id: 'break-chicken-jw',
    name: 'Break down a whole chicken',
    channel: 'Joshua Weissman',
    videoId: 'nECKJvv56_w',
    category: 'meat',
    level: 'intermediate',
    runtime: '8 min',
    description:
      "Eight cuts from one bird: two legs, two thighs, two breasts, two wings, plus the back for stock. The single skill that saves the most money per year.",
    whenToUse: 'Every time you buy a whole chicken (which should be every week). Two meals from one $10 bird.',
  },
  {
    id: 'spatchcock-chicken',
    name: 'Spatchcock a chicken',
    channel: 'J. Kenji López-Alt',
    videoId: 'bbqZJZOUM6I',
    category: 'meat',
    level: 'intermediate',
    runtime: '12 min',
    description:
      "Kenji on how to remove the backbone and flatten the bird. The result roasts in 35 minutes instead of 90 and gets crisp skin all over. The single biggest upgrade to home-roasted chicken.",
    whenToUse: 'Roast chicken in less than an hour. Better than rotisserie.',
    featured: true,
  },
  {
    id: 'french-lamb-rack',
    name: 'French a rack of lamb',
    channel: 'Blue Flame Kitchen',
    videoId: '5n-dao-xF88',
    category: 'meat',
    level: 'advanced',
    runtime: '7 min',
    description:
      "Cleaning rib bones for the elegant, restaurant-style presentation. Knife work that looks like a magic trick once you see how the cuts line up.",
    whenToUse: 'Holiday roasts, dinner parties, the moment you want to look like you trained in a Michelin kitchen.',
  },
  {
    id: 'butchers-knot',
    name: 'The butcher\'s knot',
    channel: 'Andy Cooks',
    videoId: '6Tbj7mZqF1I',
    category: 'meat',
    level: 'intermediate',
    runtime: '3 min',
    description:
      "The slip-knot that holds a roast in shape during cooking. Andy Cooks demonstrates the single-handed tie that real butchers use to truss in seconds.",
    whenToUse: 'Tying any roast (beef, pork, lamb, stuffed chicken). Even cooking, prettier slice.',
  },
  {
    id: 'dry-brine-turkey',
    name: 'Dry brining a turkey',
    channel: 'Bon Appétit',
    videoId: 'us86_srmkow',
    category: 'meat',
    level: 'intermediate',
    runtime: '7 min',
    description:
      "Salt the bird, leave it uncovered in the fridge for 24 to 48 hours. The skin dries out, the seasoning goes deep, and the result outperforms any wet brine.",
    whenToUse: 'Holiday turkey, large chicken, pork shoulder, anything you want to be juicy and crisp at once.',
  },
  {
    id: 'wet-brine-chicken-andy',
    name: 'Wet brining chicken',
    channel: 'Andy Cooks',
    videoId: 'mxEomSn8v-I',
    category: 'meat',
    level: 'beginner',
    runtime: '5 min',
    description:
      "Salt, sugar, water, time. The classic wet brine that keeps lean white meat from drying out, with the ratios any home cook can remember.",
    whenToUse: 'Pork chops, chicken breast, anything lean you plan to grill or roast.',
  },

  // ===================== FISH =====================
  {
    id: 'epicurious-fillet-every-fish',
    name: 'Fillet every fish',
    channel: 'Epicurious',
    videoId: 'wcueSXGueJs',
    category: 'fish',
    level: 'advanced',
    runtime: '25 min',
    description:
      "Method Mastery: one chef demonstrates how to fillet salmon, bass, trout, snapper, mackerel, sole, halibut, and more. The most complete fish butchery video on the internet.",
    whenToUse: 'Save it. Pull it up the next time you buy a whole fish and want to do it justice.',
    featured: true,
  },
  {
    id: 'scale-fish-gbc',
    name: 'Scaling a fish',
    channel: 'Great British Chefs',
    videoId: '2V1ZJzQtq-Q',
    category: 'fish',
    level: 'beginner',
    runtime: '2 min',
    description:
      "Tail to head, against the grain, in a bag if you can to keep scales from flying. The first thing every whole fish needs before anything else.",
    whenToUse: 'Whole fish recipes, especially Mediterranean and Levantine dishes like masgouf and sayadieh.',
  },
  {
    id: 'shuck-oyster-atk',
    name: 'Shucking oysters',
    channel: "America's Test Kitchen",
    videoId: 'n_YPxcF1ta4',
    category: 'fish',
    level: 'intermediate',
    runtime: '2 min',
    description:
      "America's Test Kitchen 60-second tip. The hinge, the twist, the cut under the muscle. Safe and clean, no bleeding fingers.",
    whenToUse: 'Special occasions. Cheaper than restaurants, better when fresh.',
    commonMistake: 'Aiming the knife at your palm. Never. Use a towel and keep the blade angled away.',
  },
  {
    id: 'devein-shrimp',
    name: 'Devein shrimp four ways',
    channel: 'Souped Up Recipes',
    videoId: 'G2_NvKLh0o0',
    category: 'fish',
    level: 'beginner',
    runtime: '4 min',
    description:
      "Four methods of removing the digestive tract from shrimp, including one that does not require opening the back. Pick the one that fits your dish.",
    whenToUse: 'Every shrimp recipe. Cleaner taste, better presentation.',
  },

  // ===================== DOUGH AND BREAD =====================
  {
    id: 'knead-by-hand',
    name: 'Knead bread dough by hand',
    channel: 'ChainBaker',
    videoId: 'T8FK5apuL40',
    category: 'dough',
    level: 'beginner',
    runtime: '8 min',
    description:
      "Detailed instructions on the slap and fold technique that develops gluten by hand. Visual cues for when the dough is ready, with troubleshooting along the way.",
    whenToUse: 'Any bread or pizza dough. No stand mixer required.',
    commonMistake: 'Adding too much flour because the dough is sticky. Wet dough makes airy bread; trust the process.',
  },
  {
    id: 'score-sourdough',
    name: 'Score a sourdough loaf',
    channel: 'Keep it Sweet Kitchen',
    videoId: '7-zkw1za588',
    category: 'dough',
    level: 'intermediate',
    runtime: '3 min',
    description:
      "The cut that controls how the loaf opens in the oven. Angle, depth, single-slash technique. The difference between bread that looks home-baked and bread that looks bakery-baked.",
    whenToUse: 'Right before the dough goes in the oven. A cold blade through cold dough.',
  },
  {
    id: 'baguette-shape-king-arthur',
    name: 'Shaping a baguette',
    channel: 'King Arthur Baking',
    videoId: 'IRDL3lPQSkc',
    category: 'dough',
    level: 'advanced',
    runtime: '4 min',
    description:
      "King Arthur Baking on the pre-shape, the rest, and the final taper that gives a baguette its iconic shape. Hands-on from a working bread school.",
    whenToUse: 'Homemade baguettes. Once mastered, it transfers to ciabatta, batard, and any long loaf.',
  },
  {
    id: 'pizza-stretch-epicurious',
    name: 'Hand-stretch pizza dough like a pro',
    channel: 'Epicurious',
    videoId: 'IHY3X7fY6bY',
    category: 'dough',
    level: 'intermediate',
    runtime: '5 min',
    description:
      "Pizza pro shows the floured table technique, the knuckle stretch, the gentle pull. No rolling pin, ever.",
    whenToUse: 'Friday night pizza. Better crust than anything store-bought.',
    commonMistake: 'Using a rolling pin. It crushes the gas bubbles that make a real pizza crust airy.',
    featured: true,
  },
  {
    id: 'fresh-pasta-queen',
    name: 'Making fresh pasta from scratch',
    channel: 'The Pasta Queen',
    videoId: 'kIRY3Ef7xRY',
    category: 'dough',
    level: 'beginner',
    runtime: '8 min',
    description:
      "Italian style: just flour and eggs. The fountain method on the counter, kneading by hand, resting, rolling out. The shape is up to you.",
    whenToUse: 'A free Sunday. Once made, pasta freezes well in nests.',
  },
  {
    id: 'croissant-lamination',
    name: 'Croissant lamination',
    channel: 'Bake Toujours',
    videoId: 'oftDm1OVqhM',
    category: 'dough',
    level: 'advanced',
    runtime: '5 min',
    description:
      "The folding process that builds the 81-layer croissant. The book fold, the letter fold, the rest between each turn. Patience and a cold kitchen.",
    whenToUse: 'When you want bakery-level pastries at home and have a free weekend.',
  },

  // ===================== SAUCES =====================
  {
    id: 'beurre-blanc-fw',
    name: 'Beurre blanc, the French butter sauce',
    channel: 'Food Wishes',
    videoId: '84zkT4FIaOk',
    category: 'sauce',
    level: 'intermediate',
    runtime: '6 min',
    description:
      "Chef John on the classic shallot-wine-butter emulsion. The technique that makes any white fish taste like a Michelin-restaurant entrée.",
    whenToUse: 'Pan-seared fish, scallops, asparagus. Anything that wants a luxurious, silky finish.',
  },
  {
    id: 'mayonnaise-epicurious',
    name: 'Mayonnaise from scratch',
    channel: 'Epicurious',
    videoId: 'MsOtWt66A9s',
    category: 'sauce',
    level: 'beginner',
    runtime: '8 min',
    description:
      "Epicurious on the classic egg-yolk emulsion. Slow drizzle of oil, constant whisking, the moment it transforms from liquid to creamy. The grandmother of all mother sauces.",
    whenToUse: 'Once made fresh, the difference vs jarred is stark. Foundation for aioli, tartar, remoulade.',
    commonMistake: 'Pouring oil too fast. The emulsion breaks instantly; start with a thread, then increase.',
  },
  {
    id: 'vinaigrette-ina',
    name: 'Vinaigrette like a pro',
    channel: 'Ina Garten',
    videoId: '1Yr0MpBsHmk',
    category: 'sauce',
    level: 'beginner',
    runtime: '4 min',
    description:
      "Ina Garten on the 3:1 oil to vinegar ratio, Dijon as the emulsifier, slow whisk. The dressing that fits any salad on Earth.",
    whenToUse: 'Every salad. Make a jar of it for the week and shake before serving.',
  },
  {
    id: 'aioli-ben',
    name: 'Garlic aioli',
    channel: 'Ben Goshawk',
    videoId: 'De9ZBqQfmyY',
    category: 'sauce',
    level: 'beginner',
    runtime: '3 min',
    description:
      "Mayonnaise plus a heavy dose of pounded garlic. The Mediterranean cousin that turns roasted potatoes, fried fish, and grilled meat into a meal.",
    whenToUse: 'Bread, fries, vegetables, sandwiches. The condiment that makes everything better.',
  },

  // ===================== STOCKS AND BASES =====================
  {
    id: 'bone-broth-food52',
    name: 'Bone broth at home',
    channel: 'Food52',
    videoId: 'hknfWkgOlUY',
    category: 'stock',
    level: 'beginner',
    runtime: '7 min',
    description:
      "Roast the bones, simmer 12 hours, cool, skim. Food52 walks through the long-simmer broth that powers winter soups and stews.",
    whenToUse: 'Pho, ramen, beef noodle soup, French onion. Any dish where the broth itself is the star.',
  },
  {
    id: 'sofrito-italian',
    name: 'Italian soffritto',
    channel: 'Massimo Capra',
    videoId: 'wOqw9HSdQns',
    category: 'stock',
    level: 'beginner',
    runtime: '4 min',
    description:
      "Onion, carrot, celery, slow-cooked in olive oil until silky. The flavor base under risottos, ragù, and most Italian sauces.",
    whenToUse: 'Build the first ten minutes of nearly every Italian recipe around this.',
    featured: true,
  },
  {
    id: 'fast-caramel-jw',
    name: 'Fast caramelized onions',
    channel: 'Joshua Weissman',
    videoId: 'bO0bf6aI8CY',
    category: 'stock',
    level: 'beginner',
    runtime: '4 min',
    description:
      "Joshua Weissman on the 20-minute shortcut that gets you to deep caramelization without an hour of stirring. Baking soda, controlled water adds, high heat.",
    whenToUse: 'Weeknight smash burgers, quick French onion soup, mid-week pasta.',
  },

  // ===================== HEAT AND SEAR =====================
  {
    id: 'kenji-reverse-sear',
    name: 'Reverse-sear steak',
    channel: 'J. Kenji López-Alt',
    videoId: 'Azarsj8xlBk',
    category: 'heat',
    level: 'intermediate',
    runtime: '15 min',
    description:
      "Kenji argues the reverse sear is still the best way to cook a steak. Low oven first, blazing sear last. Perfectly even pink edge to edge, every time.",
    whenToUse: 'Thick steaks (over an inch). The thicker the steak, the bigger the advantage over a hot pan.',
    featured: true,
  },
  {
    id: 'kenji-salt-steak',
    name: 'Why you wait after salting steak',
    channel: 'J. Kenji López-Alt',
    videoId: 'i5qb5gcyw8s',
    category: 'heat',
    level: 'intermediate',
    runtime: '6 min',
    description:
      "Kenji on what salt does on the surface of meat in the 0 to 60 minute window. There is a worst time to salt, and most home cooks land right in it.",
    whenToUse: 'Every time you cook a steak, chop, or cutlet. Knowing the timing changes the whole result.',
  },

  // ===================== RICE =====================
  {
    id: 'perfect-rice-tasty',
    name: 'Perfect rice every time',
    channel: 'Tasty',
    videoId: 'Xx7sxWI9FNI',
    category: 'rice',
    level: 'beginner',
    runtime: '5 min',
    description:
      "Tasty on the absorption method that delivers fluffy rice without a rice cooker. Water ratio, salt, lid, rest. Four steps, one perfect pot.",
    whenToUse: 'Every rice dish, including Arab dishes like maqluba, kabsa, mansaf.',
    commonMistake: 'Lifting the lid mid-cook. Trust the timer and the smell.',
  },
  {
    id: 'wash-rice-zojirushi',
    name: 'Washing rice the proper way',
    channel: 'Zojirushi America',
    videoId: '_WQt1EUpnt8',
    category: 'rice',
    level: 'beginner',
    runtime: '1 min',
    description:
      "The Japanese rice-cooker company shows how to rinse rice until the water runs nearly clear. Removes excess starch and prevents gluey grains.",
    whenToUse: 'Sushi rice, basmati, jasmine, short-grain. Any rice that should stay separate.',
  },
];

export const FEATURED_SKILLS: CookingSkill[] = COOKING_SKILLS.filter((s) => s.featured);

export function skillsForCategory(c: SkillCategory): CookingSkill[] {
  return COOKING_SKILLS.filter((s) => s.category === c);
}

/**
 * Curated learning paths. Each path is a hand-picked sequence of lessons that
 * build on each other, like a single-week curriculum. Watch them in order.
 */
export interface LearningPath {
  id: string;
  name: string;
  blurb: string;
  goal: string;
  accent: 'gold' | 'sage' | 'terracotta';
  skillIds: string[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'foundations',
    name: 'Foundations',
    blurb:
      "If you only ever learn five things, learn these. Knife grip, onion, garlic, omelet, egg timing. After these, every recipe becomes easier.",
    goal: 'The five fundamentals every cook needs.',
    accent: 'gold',
    skillIds: ['epicurious-9-knife', 'ramsay-onion', 'wired-garlic', 'pepin-omelet-pbs', 'egg-timing-test'],
  },
  {
    id: 'sunday-roast',
    name: 'The Sunday roast',
    blurb:
      "Buy one whole chicken on Saturday. By Sunday lunch you have a perfectly browned bird with crisp skin everywhere. Four lessons to nail it.",
    goal: 'A perfect Sunday roast chicken.',
    accent: 'terracotta',
    skillIds: ['break-chicken-jw', 'spatchcock-chicken', 'dry-brine-turkey', 'kenji-reverse-sear'],
  },
  {
    id: 'bread-week',
    name: 'Bread week',
    blurb:
      "From a bag of flour to a real baguette in four steps. Start with the hand-kneading lesson; finish with the King Arthur Baking shape.",
    goal: 'Real bread from your own oven.',
    accent: 'gold',
    skillIds: ['knead-by-hand', 'score-sourdough', 'baguette-shape-king-arthur', 'pizza-stretch-epicurious'],
  },
  {
    id: 'sauce-master',
    name: 'Sauce master',
    blurb:
      "Mayonnaise teaches the principle, vinaigrette teaches the proportion, beurre blanc teaches the patience. Aioli puts them together.",
    goal: 'Four mother emulsions, one weekend.',
    accent: 'sage',
    skillIds: ['mayonnaise-epicurious', 'vinaigrette-ina', 'beurre-blanc-fw', 'aioli-ben'],
  },
  {
    id: 'knife-sharp',
    name: 'Knife sharp',
    blurb:
      "A sharper knife saves more time than any other kitchen upgrade. Five lessons that turn a slow chopper into a kitchen athlete.",
    goal: 'Become invisible behind the cutting board.',
    accent: 'terracotta',
    skillIds: ['epicurious-9-knife', 'ramsay-onion', 'julienne-poppy', 'chiffonade-basil', 'sharpen-whetstone'],
  },
  {
    id: 'mediterranean-basics',
    name: 'Mediterranean basics',
    blurb:
      "Build a sofrito, caramelize onions, roast vegetables right, dress them with a real aioli. This is dinner four nights a week.",
    goal: 'Dinner anywhere on the Mediterranean coast.',
    accent: 'sage',
    skillIds: ['sofrito-italian', 'caramelize-onions-fn', 'roast-veg-ethan', 'aioli-ben'],
  },
];

export function pathTotalMinutes(path: LearningPath): number {
  return path.skillIds.reduce((sum, sid) => {
    const s = COOKING_SKILLS.find((x) => x.id === sid);
    if (!s?.runtime) return sum;
    const m = parseInt(s.runtime.match(/\d+/)?.[0] ?? '0', 10);
    return sum + (Number.isFinite(m) ? m : 0);
  }, 0);
}

export function categoryTotalMinutes(c: SkillCategory): number {
  return COOKING_SKILLS.filter((s) => s.category === c).reduce((sum, s) => {
    if (!s.runtime) return sum;
    const m = parseInt(s.runtime.match(/\d+/)?.[0] ?? '0', 10);
    return sum + (Number.isFinite(m) ? m : 0);
  }, 0);
}
