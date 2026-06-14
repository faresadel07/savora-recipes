/**
 * Static educational + reference content for the Fitness page.
 * All facts come from USDA, NIH dietary guidelines, and peer-reviewed
 * sports nutrition literature — public information.
 */

// ============ PROTEIN 101 — educational paragraphs ============

export interface ProteinTopic {
  id: string;
  title: string;
  body: string;
  highlight?: string;
  source: string;
}

export const PROTEIN_101: ProteinTopic[] = [
  {
    id: 'how-much',
    title: 'How much protein do you actually need?',
    body: 'For sedentary adults, 0.8g of protein per kilogram of body weight is enough to prevent deficiency. For people who train regularly, the picture changes. Strength athletes benefit from 1.6 to 2.2g per kilogram per day. Endurance athletes do well at 1.2 to 1.6g. Older adults and those in a calorie deficit lean toward the higher end of the range.',
    highlight: '1.6 to 2.2g per kg of body weight for active people',
    source: 'International Society of Sports Nutrition (ISSN) Position Stand, 2017',
  },
  {
    id: 'timing',
    title: 'Does protein timing matter?',
    body: 'Total daily protein matters more than exact timing, but spreading intake across 3 to 5 meals of 20 to 40g each appears to maximize muscle protein synthesis. The "anabolic window" after training is wider than once thought — anywhere from one to several hours. Pre-bed casein (or any slow-digesting protein) supports overnight muscle repair.',
    highlight: '20 to 40g per meal, 3 to 5 times a day',
    source: 'Schoenfeld & Aragon, Journal of the International Society of Sports Nutrition, 2018',
  },
  {
    id: 'sources',
    title: 'Animal vs plant protein',
    body: 'Animal proteins (eggs, dairy, meat, fish) are complete: they contain all nine essential amino acids in usable amounts. Most plant proteins lack one or two essential amino acids, but combining sources (rice + beans, hummus + bread, soy + grain) easily closes the gap. Plant eaters generally need 5 to 10% more total protein to match animal-source results.',
    highlight: 'Plant-based works — just hit ~10% more total protein',
    source: 'Mariotti & Gardner, Nutrients, 2019',
  },
  {
    id: 'quality',
    title: 'Whey vs casein vs plant protein',
    body: 'Whey digests fast (peaks at ~90 minutes) and is great around training. Casein digests slowly (over 6 to 8 hours), making it ideal before sleep. Plant proteins like soy isolate match whey for muscle response when matched for leucine content. Pea protein performs nearly as well. Blends of plant sources outperform single-source plant proteins.',
    highlight: 'Whey post-workout, casein at night, plant blends anytime',
    source: 'Phillips et al., Nutrients, 2016',
  },
  {
    id: 'around-workout',
    title: 'What to eat around training',
    body: 'Two hours before training, eat a balanced meal with slow carbs and a moderate amount of protein (around 25 to 30g). For early workouts, a small fast-digesting meal 30 to 60 minutes before works well — banana, oats, whey shake. Post-workout, prioritize 30 to 40g of fast protein and some carbs within two hours of finishing.',
    highlight: '25g protein 2 hours before, 30 to 40g protein within 2 hours after',
    source: 'Kerksick et al., Journal of the International Society of Sports Nutrition, 2017',
  },
  {
    id: 'fiber-and-fats',
    title: "Don't ignore fiber and fats",
    body: 'A protein-heavy diet without fiber is hard on digestion and longer-term metabolic health. Aim for 25 to 38g of fiber daily from vegetables, fruits, beans, and whole grains. Healthy fats (omega-3s especially from fatty fish, nuts, olive oil) keep hormones working properly. Athletes need around 1g of fat per kg of body weight, minimum.',
    highlight: 'Fiber: 25 to 38g/day. Fats: at least 1g/kg of body weight',
    source: 'US Dietary Guidelines for Americans, 2020-2025',
  },
  {
    id: 'ramadan-bulking',
    title: 'How to bulk or maintain during Ramadan',
    body: 'Two protein-heavy meals — Iftar and Suhoor — are enough to hit a daily protein target. Front-load carbs and fluids at Iftar, then a slow-digesting protein at Suhoor (Greek yogurt, cottage cheese, eggs). Schedule training 60 to 90 minutes before Iftar so you can refuel immediately. Avoid heavy lifting at Suhoor: the body is depleted, the day is starting.',
    highlight: 'Hit 0.8 to 1g of protein per pound across Iftar and Suhoor. Train just before Iftar.',
    source: 'Trabelsi et al., Sports Nutrition for Ramadan, 2018',
  },
  {
    id: 'creatine-101',
    title: 'Creatine monohydrate is the safest, most researched supplement',
    body: 'Creatine monohydrate is the most studied sports supplement in history. 3 to 5g daily, taken at any time, raises muscle phosphocreatine stores so you can produce slightly more force per set. Effects are visible within 4 to 6 weeks: about 1 to 2kg lean muscle gain and 5 to 15 percent strength improvement. Safe for healthy kidneys per 200+ trials. Halal versions are widely available.',
    highlight: '3 to 5g per day, any time. Halal monohydrate is cheapest and identical to expensive blends.',
    source: 'Kreider et al., Journal of the International Society of Sports Nutrition, 2017',
  },
  {
    id: 'cut-without-losing-muscle',
    title: 'Cut without losing muscle: 4 rules',
    body: 'During a cut, drop calories by 300 to 500 per day (not more). Keep protein above 1g per pound of body weight to spare lean tissue. Lift heavy at least 3 times per week — strength training tells the body to keep the muscle it has. Sleep 7 to 9 hours nightly: poor sleep doubles muscle loss in a deficit. The result: 0.4 to 0.7kg fat loss per week with no strength drop.',
    highlight: 'Deficit 300 to 500 kcal · Protein 1g/lb · Lift 3x/week · Sleep 7 to 9 hours',
    source: 'Helms et al., Evidence-Based Recommendations for Natural Bodybuilding, 2014',
  },
  {
    id: 'sleep-and-recovery',
    title: 'Sleep is the most underrated training variable',
    body: 'Growth hormone peaks during deep sleep. Most muscle protein synthesis happens in the night. Athletes who sleep less than 6 hours nightly recover 30 percent slower and lose 60 percent more muscle in a deficit. Practical rule: protect 7 to 9 hours of dark, cool, quiet sleep. Caffeine cut-off 8 hours before bed. Phone out of the bedroom.',
    highlight: '7 to 9 hours, dark and cool. Caffeine cut-off 8 hours pre-bed.',
    source: 'Walker, Why We Sleep, and Dattilo et al., Medical Hypotheses, 2011',
  },
  {
    id: 'progressive-overload',
    title: 'Progressive overload: the only rule that grows muscle',
    body: 'A muscle only grows when forced past what it already does. Each week, add weight, reps, or a quality set. If last week was 60kg bench for 8 reps, this week try 60 for 9 or 62.5 for 8. Without progression, you maintain. Track it in a notes app: exercise, weight, reps, RPE. Without writing it down, you will not see the trend.',
    highlight: 'Add weight, reps, or sets each week. Track every session.',
    source: 'Schoenfeld, The M.A.X. Muscle Plan, 2013',
  },
];

// ============ MACRO CHEAT SHEET ============

export interface ProteinSource {
  food: string;
  serving: string;
  protein: number;
  cal: number;
  category: 'meat' | 'fish' | 'dairy' | 'eggs' | 'plant' | 'supplement';
}

export const PROTEIN_SOURCES: ProteinSource[] = [
  // Meat
  { food: 'Chicken breast, cooked', serving: '100g', protein: 31, cal: 165, category: 'meat' },
  { food: 'Chicken thigh, cooked', serving: '100g', protein: 26, cal: 209, category: 'meat' },
  { food: 'Lean ground beef (93/7)', serving: '100g', protein: 22, cal: 152, category: 'meat' },
  { food: 'Sirloin steak', serving: '100g', protein: 29, cal: 206, category: 'meat' },
  { food: 'Pork tenderloin', serving: '100g', protein: 26, cal: 143, category: 'meat' },
  { food: 'Turkey breast', serving: '100g', protein: 29, cal: 135, category: 'meat' },

  // Fish
  { food: 'Salmon, baked', serving: '100g', protein: 25, cal: 208, category: 'fish' },
  { food: 'Tuna, canned in water', serving: '100g', protein: 26, cal: 116, category: 'fish' },
  { food: 'Cod, baked', serving: '100g', protein: 23, cal: 105, category: 'fish' },
  { food: 'Shrimp, cooked', serving: '100g', protein: 24, cal: 99, category: 'fish' },
  { food: 'Tilapia', serving: '100g', protein: 26, cal: 128, category: 'fish' },
  { food: 'Sardines, canned', serving: '100g', protein: 25, cal: 208, category: 'fish' },

  // Eggs
  { food: 'Whole egg', serving: '1 large', protein: 6, cal: 72, category: 'eggs' },
  { food: 'Egg white', serving: '1 large', protein: 4, cal: 17, category: 'eggs' },

  // Dairy
  { food: 'Greek yogurt, nonfat', serving: '170g', protein: 17, cal: 100, category: 'dairy' },
  { food: 'Cottage cheese, low-fat', serving: '100g', protein: 11, cal: 72, category: 'dairy' },
  { food: 'Skim milk', serving: '240ml', protein: 8, cal: 86, category: 'dairy' },
  { food: 'Cheddar cheese', serving: '28g', protein: 7, cal: 113, category: 'dairy' },
  { food: 'String cheese', serving: '1 stick', protein: 7, cal: 80, category: 'dairy' },
  { food: 'Kefir, low-fat', serving: '240ml', protein: 11, cal: 110, category: 'dairy' },

  // Plant
  { food: 'Tofu, firm', serving: '100g', protein: 17, cal: 144, category: 'plant' },
  { food: 'Tempeh', serving: '100g', protein: 19, cal: 192, category: 'plant' },
  { food: 'Edamame, shelled', serving: '100g', protein: 11, cal: 121, category: 'plant' },
  { food: 'Lentils, cooked', serving: '100g', protein: 9, cal: 116, category: 'plant' },
  { food: 'Black beans, cooked', serving: '100g', protein: 9, cal: 132, category: 'plant' },
  { food: 'Chickpeas, cooked', serving: '100g', protein: 9, cal: 164, category: 'plant' },
  { food: 'Quinoa, cooked', serving: '100g', protein: 4, cal: 120, category: 'plant' },
  { food: 'Peanut butter', serving: '32g', protein: 8, cal: 188, category: 'plant' },
  { food: 'Almonds', serving: '28g', protein: 6, cal: 164, category: 'plant' },
  { food: 'Chia seeds', serving: '28g', protein: 5, cal: 138, category: 'plant' },
  { food: 'Hemp seeds', serving: '28g', protein: 10, cal: 166, category: 'plant' },

  // Supplements
  { food: 'Whey protein isolate', serving: '30g scoop', protein: 25, cal: 110, category: 'supplement' },
  { food: 'Casein protein', serving: '30g scoop', protein: 24, cal: 120, category: 'supplement' },
  { food: 'Plant protein blend', serving: '30g scoop', protein: 22, cal: 130, category: 'supplement' },
];

// ============ WORKOUT MEAL CATEGORIES ============

export interface WorkoutMealIdea {
  title: string;
  body: string;
  protein: string;
}

export const PRE_WORKOUT: WorkoutMealIdea[] = [
  { title: 'Oatmeal with whey and banana', body: '1 cup oats, 1 scoop whey, 1 banana, almond milk. Eat 60 to 90 minutes before training.', protein: '~30g protein' },
  { title: 'Greek yogurt bowl', body: '1 cup nonfat Greek yogurt, 1/3 cup granola, berries, honey.', protein: '~25g protein' },
  { title: 'Egg whites + toast', body: '5 egg whites + 1 whole egg, 2 slices whole-grain toast, avocado.', protein: '~28g protein' },
  { title: 'Rice cakes with PB and whey', body: '2 rice cakes, 2 tbsp peanut butter, 1 scoop whey on the side.', protein: '~30g protein' },
  { title: 'Smoothie: banana, whey, milk', body: 'Quickest option. 1 banana, 1 scoop whey, 1 cup skim milk.', protein: '~32g protein' },
  { title: 'Cottage cheese with fruit', body: '1 cup low-fat cottage cheese, pineapple chunks, dash of cinnamon.', protein: '~28g protein' },
];

export const POST_WORKOUT: WorkoutMealIdea[] = [
  { title: 'Whey shake with banana', body: '1 to 2 scoops whey, 1 banana, water or milk. Drink within 30 minutes.', protein: '~30 to 50g' },
  { title: 'Grilled chicken with rice', body: '200g chicken breast, 1 cup white rice, steamed broccoli.', protein: '~60g protein' },
  { title: 'Tuna pasta', body: '1 can tuna, 1 cup cooked pasta, olive oil, lemon, peas.', protein: '~40g protein' },
  { title: 'Salmon bowl', body: '180g salmon, 1 cup rice, edamame, soy sauce, sesame.', protein: '~50g protein' },
  { title: 'Egg + sweet potato hash', body: '4 whole eggs, 1 medium sweet potato cubed, bell peppers, onion.', protein: '~28g protein' },
  { title: 'Lean ground beef and rice', body: '170g 93/7 ground beef, 1 cup rice, sauteed spinach.', protein: '~50g protein' },
];

export const RECOVERY_MEALS: WorkoutMealIdea[] = [
  { title: 'Greek yogurt + casein blend', body: '1 cup Greek yogurt + 1/2 scoop casein, mixed berries, walnuts. Eat before bed.', protein: '~35g slow-release' },
  { title: 'Cottage cheese with nuts', body: '1 cup cottage cheese, handful of almonds, cinnamon, drizzle of honey.', protein: '~30g protein, slow' },
  { title: 'Chicken bone broth + eggs', body: '300ml broth, 2 hard-boiled eggs, salt, pepper. Collagen-rich for joints.', protein: '~25g protein' },
  { title: 'Tart cherry juice + casein shake', body: 'Casein shake with 200ml tart cherry juice. Reduces muscle soreness.', protein: '~25g protein' },
  { title: 'Salmon with sweet potato', body: '150g salmon, baked sweet potato, asparagus. Omega-3s + slow carbs.', protein: '~40g protein' },
  { title: 'Lentil + chicken soup', body: 'Hearty soup with shredded chicken, lentils, carrots, herbs.', protein: '~35g protein' },
];

// ============ MEAL PREP IDEAS ============

export interface MealPrepIdea {
  title: string;
  body: string;
  yield: string;
  storage: string;
}

export const MEAL_PREP: MealPrepIdea[] = [
  {
    title: 'Sheet-pan chicken + veg',
    body: 'Marinate 1.5 kg chicken thighs in yogurt-lemon-garlic. Roast on two sheet pans with broccoli, peppers, sweet potato cubes at 425F for 25 minutes.',
    yield: '5 servings · 40g protein each',
    storage: '5 days refrigerated · 2 months frozen',
  },
  {
    title: 'Mason jar overnight oats',
    body: '5 jars: 1/2 cup oats + 1/2 cup milk + 1/4 cup Greek yogurt + 1 tbsp chia + 1 scoop whey. Top with different fruit each day.',
    yield: '5 breakfasts · 30g protein each',
    storage: '5 days refrigerated',
  },
  {
    title: 'Big batch ground turkey chili',
    body: '1 kg lean ground turkey + 2 cans beans + 1 can tomatoes + spices in one pot. Portion into containers with rice or eat straight.',
    yield: '6 servings · 35g protein each',
    storage: '4 days refrigerated · 3 months frozen',
  },
  {
    title: 'Hard-boiled eggs by the dozen',
    body: 'Boil 12 eggs Sunday. Grab 2 to 3 each morning. Pre-peeled and stored in cold water in a sealed container.',
    yield: '12 eggs · 6g protein each',
    storage: '7 days refrigerated',
  },
  {
    title: 'Salmon foil packets',
    body: 'Wrap 5 salmon fillets individually in foil with lemon, dill, asparagus. Freeze raw; bake one at a time as needed.',
    yield: '5 servings · 35g protein each',
    storage: '2 months frozen',
  },
];

// ============ GOAL-BASED PLANS ============

export interface GoalPlan {
  id: 'cut' | 'bulk' | 'maintain';
  title: string;
  blurb: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
  sampleDay: { meal: string; food: string; macros: string }[];
}

export const GOAL_PLANS: GoalPlan[] = [
  {
    id: 'cut',
    title: 'Cut (fat loss)',
    blurb: 'Steady deficit of around 500 kcal under maintenance. High protein to spare muscle. Cardio kept moderate.',
    calories: '~1800 kcal',
    protein: '180g (2.0g/kg)',
    carbs: '170g',
    fats: '50g',
    sampleDay: [
      { meal: 'Breakfast', food: '4 egg whites + 1 whole egg + spinach + 1 slice toast', macros: '30g protein · 320 kcal' },
      { meal: 'Snack', food: 'Greek yogurt + berries', macros: '20g · 150 kcal' },
      { meal: 'Lunch', food: '170g grilled chicken + 1 cup rice + salad', macros: '50g · 500 kcal' },
      { meal: 'Pre-workout', food: '1 banana + 1 scoop whey', macros: '25g · 220 kcal' },
      { meal: 'Dinner', food: '170g salmon + roasted vegetables', macros: '40g · 480 kcal' },
      { meal: 'Before bed', food: 'Casein shake + 10 almonds', macros: '25g · 200 kcal' },
    ],
  },
  {
    id: 'maintain',
    title: 'Maintain',
    blurb: 'Eat at maintenance. Keep protein high, train consistently. Best for body recomposition over time.',
    calories: '~2400 kcal',
    protein: '180g (2.0g/kg)',
    carbs: '270g',
    fats: '70g',
    sampleDay: [
      { meal: 'Breakfast', food: 'Oatmeal + whey + banana + peanut butter', macros: '35g protein · 550 kcal' },
      { meal: 'Snack', food: 'Cottage cheese + pineapple', macros: '25g · 200 kcal' },
      { meal: 'Lunch', food: '200g chicken + 1.5 cup rice + avocado + veg', macros: '55g · 700 kcal' },
      { meal: 'Pre-workout', food: 'Rice cakes + jam + whey shake', macros: '30g · 350 kcal' },
      { meal: 'Dinner', food: '200g lean beef + sweet potato + greens', macros: '50g · 600 kcal' },
    ],
  },
  {
    id: 'bulk',
    title: 'Bulk (muscle gain)',
    blurb: 'Surplus of 300 to 500 kcal. Carbs go up to fuel heavy lifting and recovery. Train hard, eat with intent.',
    calories: '~3000 kcal',
    protein: '200g (2.2g/kg)',
    carbs: '380g',
    fats: '90g',
    sampleDay: [
      { meal: 'Breakfast', food: '4 whole eggs + 2 slices toast + butter + avocado', macros: '35g protein · 650 kcal' },
      { meal: 'Snack', food: 'Trail mix + protein bar', macros: '25g · 400 kcal' },
      { meal: 'Lunch', food: '250g chicken + 2 cups rice + olive oil + veg', macros: '70g · 900 kcal' },
      { meal: 'Pre-workout', food: 'Banana + oats + whey', macros: '35g · 450 kcal' },
      { meal: 'Dinner', food: '250g salmon + pasta + sauce + bread', macros: '60g · 950 kcal' },
      { meal: 'Before bed', food: 'Greek yogurt + casein + almonds + honey', macros: '40g · 350 kcal' },
    ],
  },
];

// ============ PROTEIN DRINKS & SHAKES ============

export interface DrinkRecipe {
  title: string;
  ingredients: string;
  protein: string;
  vibe: 'pre' | 'post' | 'anytime' | 'meal-replace';
}

export const DRINKS: DrinkRecipe[] = [
  {
    title: 'Chocolate peanut butter shake',
    ingredients: '1 scoop chocolate whey, 1 tbsp peanut butter, 1 banana, 1 cup milk, ice',
    protein: '35g',
    vibe: 'post',
  },
  {
    title: 'Berry blast smoothie',
    ingredients: '1 scoop vanilla whey, 1 cup mixed berries, 1/2 cup Greek yogurt, water, ice',
    protein: '40g',
    vibe: 'post',
  },
  {
    title: 'Green protein smoothie',
    ingredients: '1 scoop vanilla whey, 1 cup spinach, 1 banana, 1 tbsp almond butter, almond milk',
    protein: '30g',
    vibe: 'anytime',
  },
  {
    title: 'Iced coffee protein',
    ingredients: '1 cup cold brew, 1 scoop chocolate whey, splash of milk, ice. Shake hard.',
    protein: '25g',
    vibe: 'pre',
  },
  {
    title: 'Banana cream pie shake',
    ingredients: '1 scoop vanilla whey, 1 banana, 1/2 cup cottage cheese, milk, dash of nutmeg',
    protein: '40g',
    vibe: 'meal-replace',
  },
  {
    title: 'Tropical mango shake',
    ingredients: '1 scoop vanilla whey, 1 cup mango chunks, 1/2 cup pineapple, coconut water',
    protein: '28g',
    vibe: 'pre',
  },
  {
    title: 'Casein bedtime pudding',
    ingredients: '1 scoop casein, 1/3 cup water (not milk). Whisk until pudding-like. Top with berries.',
    protein: '25g',
    vibe: 'post',
  },
  {
    title: 'Mocha protein latte',
    ingredients: '1 shot espresso, 1 scoop chocolate whey, 1 cup steamed milk, sweetener',
    protein: '28g',
    vibe: 'anytime',
  },
  {
    title: 'Pumpkin pie shake',
    ingredients: '1 scoop vanilla whey, 1/4 cup pumpkin puree, milk, cinnamon, nutmeg, ice',
    protein: '28g',
    vibe: 'anytime',
  },
  {
    title: 'Strawberry cheesecake shake',
    ingredients: '1 scoop vanilla whey, 1/2 cup cottage cheese, 1 cup strawberries, milk, ice',
    protein: '40g',
    vibe: 'meal-replace',
  },
  {
    title: 'Oats and whey blend',
    ingredients: '1 cup milk, 1/3 cup raw oats, 1 scoop whey, 1 banana. Blend smooth.',
    protein: '40g',
    vibe: 'pre',
  },
  {
    title: 'Plant-based berry shake',
    ingredients: '1 scoop pea protein, 1 cup mixed berries, 1 tbsp chia, almond milk',
    protein: '25g',
    vibe: 'anytime',
  },
  {
    title: 'Cinnamon roll shake',
    ingredients: '1 scoop vanilla whey, 1/2 cup cottage cheese, milk, cinnamon, vanilla, brown sugar substitute',
    protein: '35g',
    vibe: 'anytime',
  },
  {
    title: 'Greek frappe',
    ingredients: '1 scoop chocolate whey, 1/2 cup nonfat Greek yogurt, cold coffee, ice. Frothy.',
    protein: '40g',
    vibe: 'pre',
  },
  {
    title: 'Tart cherry recovery',
    ingredients: '1 scoop casein, 1/2 cup tart cherry juice, 1/2 cup milk, ice',
    protein: '25g',
    vibe: 'post',
  },
];

// ============ HEALTHY SNACKS ============

export interface SnackIdea {
  title: string;
  body: string;
  protein: string;
}

export const SNACKS: SnackIdea[] = [
  { title: 'Greek yogurt parfait', body: '1 cup nonfat Greek yogurt, granola, berries, honey.', protein: '20g' },
  { title: 'Cottage cheese with peaches', body: '1 cup low-fat cottage cheese, sliced peaches, drizzle of honey.', protein: '28g' },
  { title: 'Hard-boiled eggs + cheese', body: '2 hard-boiled eggs, 1 string cheese, an apple.', protein: '22g' },
  { title: 'Turkey + cheese rollups', body: '4 slices turkey, 2 slices cheese, mustard, optional pickle.', protein: '25g' },
  { title: 'Apple + peanut butter', body: '1 apple sliced, 2 tbsp natural peanut butter.', protein: '8g' },
  { title: 'Edamame', body: '1 cup steamed edamame, sea salt.', protein: '17g' },
  { title: 'Tuna on cucumber slices', body: '1 can tuna mixed with Greek yogurt + dill, on thick cucumber rounds.', protein: '28g' },
  { title: 'Cottage cheese with cherry tomatoes', body: '1 cup cottage cheese, halved tomatoes, basil, black pepper.', protein: '28g' },
  { title: 'Chocolate protein mug cake', body: '1 scoop chocolate whey, 1 egg, 1 tbsp cocoa, 1 tsp baking powder. Microwave 60 sec.', protein: '30g' },
  { title: 'Skyr with berries', body: '1 cup Icelandic skyr, fresh berries, cinnamon.', protein: '22g' },
  { title: 'Beef jerky + nuts', body: '30g jerky, small handful of almonds.', protein: '20g' },
  { title: 'Cheese + crackers', body: '2 oz cheddar, whole-grain crackers, apple slices.', protein: '14g' },
  { title: 'Smoked salmon on rice cake', body: '2 rice cakes, 60g smoked salmon, cream cheese, capers.', protein: '20g' },
  { title: 'Chickpea snack', body: 'Roasted chickpeas with smoked paprika and olive oil.', protein: '12g' },
  { title: 'Egg muffins', body: '6 whole eggs, spinach, bell peppers, baked in muffin tin at 350F for 20 min. Make 6.', protein: '6g each' },
  { title: 'Protein oat bites', body: 'Oats, peanut butter, honey, whey powder, mini chocolate chips. Roll into balls.', protein: '8g per bite' },
  { title: 'Greek yogurt bark', body: 'Spread sweetened yogurt on a sheet, top with berries and granola, freeze, break.', protein: '15g per piece' },
  { title: 'Quinoa salad with feta', body: '1 cup cooked quinoa, feta, tomato, cucumber, lemon, olive oil.', protein: '14g' },
  { title: 'Bell peppers with hummus', body: 'Bell pepper sticks, 1/3 cup hummus, sprinkle of seeds.', protein: '10g' },
  { title: 'Tempeh bites', body: 'Cubed tempeh, marinated in soy and ginger, baked or pan-fried.', protein: '20g per portion' },
];

// ============ PROTEIN BOOST SUBSTITUTIONS ============

export interface BoostSubstitution {
  swap: string;
  for_: string;
  extra: string;
  note: string;
}

export const PROTEIN_BOOSTS: BoostSubstitution[] = [
  { swap: 'Greek yogurt', for_: 'sour cream or mayo', extra: '+8g per 1/4 cup', note: 'Works in dressings, dips, baked potatoes, and soups.' },
  { swap: 'Cottage cheese', for_: 'ricotta', extra: '+10g per 1/2 cup', note: 'Blend until smooth and use 1-for-1 in baking or lasagna.' },
  { swap: 'Whole-wheat pasta', for_: 'regular pasta', extra: '+3g per serving', note: 'Or try chickpea/lentil pasta for +15g per serving.' },
  { swap: 'Egg whites added to oats', for_: 'plain oats', extra: '+8g per 2 whites', note: 'Whisk in during cooking. Doubles the oat\'s protein.' },
  { swap: 'Whey in baking', for_: 'flour, partially', extra: '+15g per cup baked good', note: 'Replace up to 1/3 of flour in muffins, pancakes, cookies.' },
  { swap: 'Quinoa', for_: 'rice', extra: '+3g per 1/2 cup', note: 'Great for grain bowls and stuffings.' },
  { swap: 'Black beans pureed in brownies', for_: 'half the flour', extra: '+10g per pan', note: 'No one will taste them. Promise.' },
  { swap: 'Edamame instead of green peas', for_: 'peas', extra: '+8g per cup', note: 'Same texture, dramatically more protein.' },
  { swap: 'Hemp seeds on everything', for_: '—', extra: '+10g per 3 tbsp', note: 'Salads, yogurt, oats, smoothies. Mild nutty flavor.' },
  { swap: 'Lentils in spaghetti sauce', for_: 'some of the ground meat', extra: '+8g per 1/2 cup added', note: 'Stretches meat, adds fiber, blends invisibly.' },
  { swap: 'Tofu crumbles in scrambles', for_: 'eggs, partially', extra: '+10g per 1/2 cup', note: 'Replace half the eggs with crumbled firm tofu.' },
  { swap: 'Bone broth instead of water', for_: 'cooking liquid', extra: '+10g per cup', note: 'Cook rice, quinoa, or pasta in it. Free protein.' },
  { swap: 'Chickpea flour in pancakes', for_: 'all-purpose flour, partially', extra: '+5g per pancake', note: 'Adds nuttiness and structure. 25% swap is invisible.' },
  { swap: 'Powdered peanut butter (PB2)', for_: 'regular PB in shakes', extra: 'Same protein, 75% less fat', note: 'Great when you want flavor without calories.' },
  { swap: 'Nutritional yeast', for_: 'parmesan cheese', extra: '+4g per 2 tbsp', note: 'Plus B12 and a cheesy flavor. Great on popcorn and pasta.' },
];
