/**
 * Meal Plan Generator.
 *
 * Builds a multi-day meal plan that hits user macro targets using
 * weighted random sampling with a scoring function. Inspired by the
 * pin / regenerate UX of Strongr Fastr and the constraint-based
 * approach of Eat This Much. Open source, zero runtime dependencies,
 * pure functions so it runs anywhere and is trivial to test.
 *
 * Source recipes: the 50 hand-authored fitness recipes (the only
 * library on the site with explicit macros per serving). Future
 * versions can extend to the full catalog once macros are computed
 * for every recipe via the nutrition calculator.
 */

import { FITNESS_RECIPES, type FitnessRecipe } from '../data/fitness-recipes';

// ============================================================
// TYPES
// ============================================================

export type DietFlag =
  | 'halal'        // no pork, no alcohol (always on for Zaytoun)
  | 'vegetarian'
  | 'vegan'
  | 'dairy-free'
  | 'gluten-free'
  | 'nut-free'
  | 'egg-free';

/** A coarse protein source classification used by the swap-by-protein
 *  feature and the same-day-variety scorer. Detected at runtime from
 *  the recipe's title and ingredient list. */
export type ProteinSource = 'chicken' | 'beef' | 'fish' | 'pork' | 'plant' | 'egg' | 'dairy' | 'mixed';

export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack-1' | 'snack-2';

export interface MacroTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealPreferences {
  mealsPerDay: 3 | 4 | 5;
  days: 1 | 3 | 7;
  diet: DietFlag[];
  maxMinutesPerMeal?: number;
}

export interface PlannedMeal {
  slot: MealSlot;
  recipe: FitnessRecipe;
  /** Multiplier on the recipe's base serving size. 1.0 means as written. */
  portion: number;
  /** Macros after scaling by portion. */
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  /** When true, regenerate cycles should not replace this slot. */
  pinned: boolean;
}

export interface PlannedDay {
  index: number;        // 0-based day index in the plan
  meals: PlannedMeal[];
  totals: MacroTargets; // sum of the day's meals
  diff: MacroTargets;   // signed delta vs the user's target
}

export interface MealPlan {
  generatedAt: number;
  targets: MacroTargets;
  preferences: MealPreferences;
  days: PlannedDay[];
  /** Average daily score (lower is better). Useful for "regenerate until happy". */
  score: number;
}

// ============================================================
// DIET TAGGING (runtime detection)
// ============================================================

const PORK_KEYWORDS = [
  'pork', 'bacon', 'ham ', 'prosciutto', 'pancetta', 'guanciale', 'sausage',
  'chorizo', 'salami', 'pepperoni',
];
const MEAT_KEYWORDS = [
  ...PORK_KEYWORDS,
  'beef', 'lamb', 'mutton', 'chicken', 'turkey', 'duck', 'rabbit', 'goat',
  'venison', 'veal', 'liver', 'oxtail', 'fish', 'salmon', 'tuna', 'cod',
  'shrimp', 'prawn', 'crab', 'lobster', 'tilapia', 'mackerel', 'sardine',
  'anchovy', 'oyster', 'clam', 'mussel', 'squid', 'octopus',
];
const DAIRY_KEYWORDS = [
  'milk', 'cheese', 'cheddar', 'feta', 'paneer', 'mozzarella', 'parmesan',
  'parmigiano', 'pecorino', 'gruyere', 'ricotta', 'cottage cheese', 'yogurt',
  'yoghurt', 'cream', 'butter', 'ghee', 'whey', 'casein', 'lactose',
];
const GLUTEN_KEYWORDS = [
  'flour', 'wheat', 'bread', 'pasta', 'noodle', 'tortilla', 'pita', 'naan',
  'bagel', 'roll', 'bun', 'crouton', 'cracker', 'cereal', 'oat', 'oats',
  'barley', 'rye', 'couscous', 'bulgur', 'farro', 'semolina', 'pretzel',
  'soy sauce',
];
const NUT_KEYWORDS = [
  'almond', 'cashew', 'walnut', 'pecan', 'hazelnut', 'pistachio', 'macadamia',
  'peanut', 'brazil nut', 'pine nut',
];
const EGG_KEYWORDS = [
  'egg ', 'eggs', 'omelette', 'omelet', 'meringue', 'mayonnaise',
];

const CHICKEN_KEYWORDS = ['chicken', 'turkey', 'poultry', 'shawarma'];
const BEEF_KEYWORDS    = ['beef', 'steak', 'ribeye', 'bulgogi', 'lamb', 'mutton', 'kofta', 'kibbeh', 'mansaf'];
const FISH_KEYWORDS    = ['fish', 'salmon', 'tuna', 'tilapia', 'cod', 'shrimp', 'prawn', 'crab', 'lobster', 'tilapia', 'sea bass', 'halibut', 'sardine', 'anchovy'];
const PLANT_PROTEIN    = ['tofu', 'tempeh', 'seitan', 'lentil', 'chickpea', 'edamame', 'bean', 'pea protein', 'plant protein', 'quinoa'];
const EGG_PRIMARY      = ['egg ', 'eggs', 'omelette', 'omelet', 'frittata', 'shakshuka', 'menemen', 'tamago'];
const DAIRY_PRIMARY    = ['yogurt', 'labneh', 'cottage cheese', 'paneer', 'ricotta', 'cheese'];

function hayContains(hay: string, needles: string[]): boolean {
  for (const n of needles) {
    if (hay.includes(n)) return true;
  }
  return false;
}

/**
 * Best-guess protein source label for a recipe. Used to spread protein
 * variety across the day and to power the "swap by protein" button.
 * Order of checks favors meat first because most recipes that contain
 * chicken AND yogurt should be classified as chicken.
 */
export function detectProteinSource(recipe: FitnessRecipe): ProteinSource {
  const hay = (
    recipe.title + ' ' +
    recipe.ingredients.join(' ') + ' ' +
    recipe.steps.join(' ')
  ).toLowerCase();

  if (hayContains(hay, FISH_KEYWORDS))    return 'fish';
  if (hayContains(hay, CHICKEN_KEYWORDS)) return 'chicken';
  if (hayContains(hay, BEEF_KEYWORDS))    return 'beef';
  if (hayContains(hay, PORK_KEYWORDS))    return 'pork';
  if (hayContains(hay, EGG_PRIMARY))      return 'egg';
  if (hayContains(hay, PLANT_PROTEIN))    return 'plant';
  if (hayContains(hay, DAIRY_PRIMARY))    return 'dairy';
  return 'mixed';
}

/**
 * Inspect a recipe and return the diet flags it satisfies. A flag means
 * the recipe is COMPATIBLE with that diet (e.g., "vegetarian" means it
 * does not contain meat).
 */
export function detectDietFlags(recipe: FitnessRecipe): Set<DietFlag> {
  const hay = (
    recipe.title + ' ' +
    (recipe.blurb ?? '') + ' ' +
    recipe.ingredients.join(' ') + ' ' +
    recipe.steps.join(' ')
  ).toLowerCase();

  const flags = new Set<DietFlag>();

  // Halal is the project default: pork is excluded everywhere already,
  // but we still scan ingredients to be sure.
  if (!hayContains(hay, PORK_KEYWORDS)) {
    flags.add('halal');
  }

  const hasMeat = hayContains(hay, MEAT_KEYWORDS);
  const hasDairy = hayContains(hay, DAIRY_KEYWORDS);
  const hasEgg = hayContains(hay, EGG_KEYWORDS);
  const hasGluten = hayContains(hay, GLUTEN_KEYWORDS);
  const hasNuts = hayContains(hay, NUT_KEYWORDS);

  if (!hasMeat) flags.add('vegetarian');
  if (!hasMeat && !hasDairy && !hasEgg) flags.add('vegan');
  if (!hasDairy) flags.add('dairy-free');
  if (!hasGluten) flags.add('gluten-free');
  if (!hasNuts) flags.add('nut-free');
  if (!hasEgg) flags.add('egg-free');

  return flags;
}

// ============================================================
// SLOT CONFIG
// ============================================================

/**
 * Calorie ratios per meal. Indexed by mealsPerDay then by slot order.
 * Slot order goes Breakfast, Lunch, Dinner, then Snacks fill in.
 */
const SLOT_PLANS: Record<3 | 4 | 5, { slot: MealSlot; ratio: number }[]> = {
  3: [
    { slot: 'breakfast', ratio: 0.30 },
    { slot: 'lunch',     ratio: 0.40 },
    { slot: 'dinner',    ratio: 0.30 },
  ],
  4: [
    { slot: 'breakfast', ratio: 0.25 },
    { slot: 'lunch',     ratio: 0.35 },
    { slot: 'dinner',    ratio: 0.25 },
    { slot: 'snack-1',   ratio: 0.15 },
  ],
  5: [
    { slot: 'breakfast', ratio: 0.22 },
    { slot: 'lunch',     ratio: 0.28 },
    { slot: 'dinner',    ratio: 0.25 },
    { slot: 'snack-1',   ratio: 0.13 },
    { slot: 'snack-2',   ratio: 0.12 },
  ],
};

/**
 * Which recipe categories belong to which slot. Multiple categories can
 * map to the same slot so the planner has variety to choose from.
 */
const SLOT_CATEGORIES: Record<MealSlot, FitnessRecipe['category'][]> = {
  breakfast: ['breakfast'],
  lunch:     ['bulk', 'mealprep', 'lean'],
  dinner:    ['lean', 'mealprep', 'bulk', 'post-workout'],
  'snack-1': ['snack', 'post-workout'],
  'snack-2': ['snack'],
};

// ============================================================
// FILTERING + SCORING
// ============================================================

interface Candidate {
  recipe: FitnessRecipe;
  flags: Set<DietFlag>;
  protein: ProteinSource;
}

let CANDIDATES: Candidate[] | null = null;
function getCandidates(): Candidate[] {
  if (!CANDIDATES) {
    CANDIDATES = FITNESS_RECIPES.map((r) => ({
      recipe: r,
      flags: detectDietFlags(r),
      protein: detectProteinSource(r),
    }));
  }
  return CANDIDATES;
}

const DISLIKE_KEY = 'zaytoun:mealplan:disliked:v1';

/** Return the user's persisted list of disliked recipe ids. */
export function loadDisliked(): Set<string> {
  if (typeof localStorage === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DISLIKE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

/** Permanently block a recipe id from appearing in future plans. */
export function dislikeRecipe(recipeId: string): void {
  if (typeof localStorage === 'undefined') return;
  const set = loadDisliked();
  set.add(recipeId);
  try {
    localStorage.setItem(DISLIKE_KEY, JSON.stringify([...set]));
  } catch {
    // ignore quota errors
  }
}

/** Un-block a previously disliked recipe id. */
export function undislikeRecipe(recipeId: string): void {
  if (typeof localStorage === 'undefined') return;
  const set = loadDisliked();
  set.delete(recipeId);
  try {
    localStorage.setItem(DISLIKE_KEY, JSON.stringify([...set]));
  } catch {
    // ignore
  }
}

function passesDiet(candidate: Candidate, requested: DietFlag[]): boolean {
  for (const flag of requested) {
    if (!candidate.flags.has(flag)) return false;
  }
  return true;
}

function passesTime(recipe: FitnessRecipe, maxMinutes?: number): boolean {
  if (!maxMinutes) return true;
  return recipe.minutes <= maxMinutes;
}

/**
 * Score a candidate meal at a chosen portion size.
 * Lower is better. 0 means a perfect fit on every macro.
 *
 * Calories get the heaviest weight because they're the user's headline
 * target. Protein has a 1.5x weight because most users care about it
 * more than carbs / fat. Out-of-range portions get a penalty.
 */
function scoreMeal(
  recipe: FitnessRecipe,
  portion: number,
  target: MacroTargets,
): number {
  const calDiff = Math.abs(recipe.calories * portion - target.calories);
  const proteinDiff = Math.abs(recipe.protein * portion - target.protein);
  const carbDiff = Math.abs(recipe.carbs * portion - target.carbs);
  const fatDiff = Math.abs(recipe.fat * portion - target.fat);

  // Portion penalty kicks in outside the comfortable range [0.7, 1.5].
  let portionPenalty = 0;
  if (portion < 0.7) portionPenalty = (0.7 - portion) * 200;
  else if (portion > 1.5) portionPenalty = (portion - 1.5) * 200;

  return calDiff * 1.0 + proteinDiff * 1.5 + carbDiff * 0.5 + fatDiff * 1.0 + portionPenalty;
}

interface PickOptions {
  slot: MealSlot;
  target: MacroTargets;
  diet: DietFlag[];
  maxMinutes?: number;
  recentRecipeIds: Set<string>;
  /** Recipe ids the user has permanently blocked. */
  disliked?: Set<string>;
  /** Protein sources already used today; reused sources cost more score. */
  proteinsUsedToday?: Set<ProteinSource>;
  /** When set, only candidates with this protein source are eligible. */
  requireProtein?: ProteinSource;
  iterations?: number;
}

interface PickResult {
  recipe: FitnessRecipe;
  portion: number;
  score: number;
}

/**
 * Monte-Carlo pick: iterate the candidate pool, try a portion that
 * scales the recipe's calories close to the slot target, and keep the
 * best scoring combination. Repetition penalty discourages reusing the
 * same recipe across consecutive days.
 */
function pickMealForSlot(opts: PickOptions): PickResult | null {
  const iterations = opts.iterations ?? 300;
  const cats = SLOT_CATEGORIES[opts.slot];
  const disliked = opts.disliked ?? new Set<string>();
  const proteinsUsed = opts.proteinsUsedToday ?? new Set<ProteinSource>();

  const pool = getCandidates().filter(
    (c) =>
      cats.includes(c.recipe.category) &&
      passesDiet(c, opts.diet) &&
      passesTime(c.recipe, opts.maxMinutes) &&
      !disliked.has(c.recipe.id) &&
      (opts.requireProtein ? c.protein === opts.requireProtein : true),
  );
  if (pool.length === 0) return null;

  let best: PickResult | null = null;

  for (let i = 0; i < iterations; i++) {
    const candidate = pool[Math.floor(Math.random() * pool.length)];
    const recipe = candidate.recipe;

    // Calculate a portion that brings calories within striking distance
    // of the slot target, then jitter by 10 percent for variety.
    let portion = opts.target.calories / Math.max(1, recipe.calories);
    portion *= 0.9 + Math.random() * 0.2;
    portion = clamp(portion, 0.5, 2.0);
    // Round to two decimals so the UI doesn't show 1.0837 servings.
    portion = Math.round(portion * 4) / 4; // snap to 0.25 multiples

    let s = scoreMeal(recipe, portion, opts.target);
    if (opts.recentRecipeIds.has(recipe.id)) s += 600; // strong dislike for repeats
    if (proteinsUsed.has(candidate.protein) && candidate.protein !== 'mixed') {
      s += 250; // soft penalty for repeating the same protein source same day
    }

    if (!best || s < best.score) {
      best = { recipe, portion, score: s };
    }
  }

  return best;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// ============================================================
// PUBLIC API
// ============================================================

/**
 * Compute the slot allocation for a single day, taking into account
 * any pinned meals (their macros count against the daily target before
 * the rest of the day is generated).
 */
function buildDay(
  index: number,
  targets: MacroTargets,
  preferences: MealPreferences,
  pinnedForDay: Map<MealSlot, PlannedMeal>,
  recentRecipeIds: Set<string>,
  disliked: Set<string> = loadDisliked(),
): PlannedDay {
  const slots = SLOT_PLANS[preferences.mealsPerDay];
  const proteinsUsedToday = new Set<ProteinSource>();
  const candByRecipe = new Map(getCandidates().map((c) => [c.recipe.id, c]));

  // Pinned meals: count their protein toward the day's variety budget.
  for (const meal of pinnedForDay.values()) {
    const c = candByRecipe.get(meal.recipe.id);
    if (c) proteinsUsedToday.add(c.protein);
  }

  // Subtract pinned macros from the day's target before allocating.
  let remainingCal = targets.calories;
  let remainingP = targets.protein;
  let remainingC = targets.carbs;
  let remainingF = targets.fat;
  for (const meal of pinnedForDay.values()) {
    remainingCal -= meal.calories;
    remainingP -= meal.protein;
    remainingC -= meal.carbs;
    remainingF -= meal.fat;
  }

  const totalRemainingRatio = slots.reduce(
    (acc, s) => (pinnedForDay.has(s.slot) ? acc : acc + s.ratio),
    0,
  );

  const meals: PlannedMeal[] = [];

  for (const slotDef of slots) {
    const pinned = pinnedForDay.get(slotDef.slot);
    if (pinned) {
      meals.push(pinned);
      continue;
    }

    const shareOfRemaining = totalRemainingRatio > 0
      ? slotDef.ratio / totalRemainingRatio
      : slotDef.ratio;

    const slotTarget: MacroTargets = {
      calories: Math.max(150, Math.round(remainingCal * shareOfRemaining)),
      protein: Math.max(5, Math.round(remainingP * shareOfRemaining)),
      carbs: Math.max(0, Math.round(remainingC * shareOfRemaining)),
      fat: Math.max(0, Math.round(remainingF * shareOfRemaining)),
    };

    const pick = pickMealForSlot({
      slot: slotDef.slot,
      target: slotTarget,
      diet: preferences.diet,
      maxMinutes: preferences.maxMinutesPerMeal,
      recentRecipeIds,
      disliked,
      proteinsUsedToday,
    });

    if (!pick) {
      // No recipe matches the constraints. Skip and let the totals show
      // a gap — the UI will surface this as a warning.
      continue;
    }

    const meal: PlannedMeal = {
      slot: slotDef.slot,
      recipe: pick.recipe,
      portion: pick.portion,
      calories: Math.round(pick.recipe.calories * pick.portion),
      protein: Math.round(pick.recipe.protein * pick.portion * 10) / 10,
      carbs: Math.round(pick.recipe.carbs * pick.portion * 10) / 10,
      fat: Math.round(pick.recipe.fat * pick.portion * 10) / 10,
      pinned: false,
    };
    meals.push(meal);
    recentRecipeIds.add(meal.recipe.id);
    const cand = candByRecipe.get(meal.recipe.id);
    if (cand && cand.protein !== 'mixed') proteinsUsedToday.add(cand.protein);
  }

  const totals: MacroTargets = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  const diff: MacroTargets = {
    calories: totals.calories - targets.calories,
    protein: Math.round((totals.protein - targets.protein) * 10) / 10,
    carbs: Math.round((totals.carbs - targets.carbs) * 10) / 10,
    fat: Math.round((totals.fat - targets.fat) * 10) / 10,
  };

  return { index, meals, totals, diff };
}

/** Generate a brand-new plan from scratch. */
export function generateMealPlan(
  targets: MacroTargets,
  preferences: MealPreferences,
): MealPlan {
  const days: PlannedDay[] = [];
  const recentIds = new Set<string>();
  // Forget the recent set every 3 days so a 7-day plan can re-use a
  // good breakfast on Day 5.
  for (let i = 0; i < preferences.days; i++) {
    if (i % 3 === 0) recentIds.clear();
    const day = buildDay(i, targets, preferences, new Map(), recentIds);
    days.push(day);
  }

  const score = days.reduce(
    (acc, d) =>
      acc +
      Math.abs(d.diff.calories) +
      Math.abs(d.diff.protein) * 1.5 +
      Math.abs(d.diff.carbs) * 0.5 +
      Math.abs(d.diff.fat),
    0,
  ) / Math.max(1, days.length);

  return {
    generatedAt: Date.now(),
    targets,
    preferences,
    days,
    score: Math.round(score),
  };
}

/** Re-roll a single slot on one day, leaving everything else untouched. */
export function regenerateSlot(
  plan: MealPlan,
  dayIndex: number,
  slot: MealSlot,
): MealPlan {
  const updatedDays = plan.days.map((d) => {
    if (d.index !== dayIndex) return d;
    const pinnedMap = new Map<MealSlot, PlannedMeal>();
    for (const meal of d.meals) {
      if (meal.slot !== slot) pinnedMap.set(meal.slot, meal);
    }
    // Avoid the recipes that already appear on this day.
    const recent = new Set(d.meals.map((m) => m.recipe.id));
    return buildDay(d.index, plan.targets, plan.preferences, pinnedMap, recent);
  });

  return { ...plan, days: updatedDays };
}

/** Toggle a slot's pinned flag. Pinned meals survive Regenerate-all. */
export function togglePinned(
  plan: MealPlan,
  dayIndex: number,
  slot: MealSlot,
): MealPlan {
  return {
    ...plan,
    days: plan.days.map((d) => {
      if (d.index !== dayIndex) return d;
      return {
        ...d,
        meals: d.meals.map((m) =>
          m.slot === slot ? { ...m, pinned: !m.pinned } : m,
        ),
      };
    }),
  };
}

/** Swap a single slot for a recipe whose primary protein matches the
 *  requested source (chicken / beef / fish / plant / etc.). Pinned and
 *  disliked recipes are respected. Returns the original plan unchanged
 *  if no recipe matches the criteria.
 */
export function swapSlotByProtein(
  plan: MealPlan,
  dayIndex: number,
  slot: MealSlot,
  protein: ProteinSource,
): MealPlan {
  const day = plan.days.find((d) => d.index === dayIndex);
  if (!day) return plan;

  // Recompute the slot's calorie target from the day's allocation.
  const slotDef = SLOT_PLANS[plan.preferences.mealsPerDay].find((s) => s.slot === slot);
  if (!slotDef) return plan;

  const slotTarget: MacroTargets = {
    calories: Math.round(plan.targets.calories * slotDef.ratio),
    protein: Math.round(plan.targets.protein * slotDef.ratio),
    carbs: Math.round(plan.targets.carbs * slotDef.ratio),
    fat: Math.round(plan.targets.fat * slotDef.ratio),
  };

  const pick = pickMealForSlot({
    slot,
    target: slotTarget,
    diet: plan.preferences.diet,
    maxMinutes: plan.preferences.maxMinutesPerMeal,
    recentRecipeIds: new Set(day.meals.map((m) => m.recipe.id)),
    disliked: loadDisliked(),
    requireProtein: protein,
    iterations: 200,
  });

  if (!pick) return plan;

  const replacementMeal: PlannedMeal = {
    slot,
    recipe: pick.recipe,
    portion: pick.portion,
    calories: Math.round(pick.recipe.calories * pick.portion),
    protein: Math.round(pick.recipe.protein * pick.portion * 10) / 10,
    carbs: Math.round(pick.recipe.carbs * pick.portion * 10) / 10,
    fat: Math.round(pick.recipe.fat * pick.portion * 10) / 10,
    pinned: false,
  };

  const updatedMeals = day.meals.map((m) => (m.slot === slot ? replacementMeal : m));
  const totals = updatedMeals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
  const diff: MacroTargets = {
    calories: totals.calories - plan.targets.calories,
    protein: Math.round((totals.protein - plan.targets.protein) * 10) / 10,
    carbs: Math.round((totals.carbs - plan.targets.carbs) * 10) / 10,
    fat: Math.round((totals.fat - plan.targets.fat) * 10) / 10,
  };

  return {
    ...plan,
    days: plan.days.map((d) =>
      d.index === dayIndex ? { ...d, meals: updatedMeals, totals, diff } : d,
    ),
  };
}

/** Dislike a meal AND swap it for a different recipe in one step.
 *  Combines the dislike persistence with regenerateSlot.
 */
export function dislikeAndSwap(
  plan: MealPlan,
  dayIndex: number,
  slot: MealSlot,
): MealPlan {
  const day = plan.days.find((d) => d.index === dayIndex);
  const target = day?.meals.find((m) => m.slot === slot);
  if (target) dislikeRecipe(target.recipe.id);
  return regenerateSlot(plan, dayIndex, slot);
}

/** Regenerate every non-pinned slot. */
export function regenerateAll(plan: MealPlan): MealPlan {
  const updatedDays = plan.days.map((d) => {
    const pinnedMap = new Map<MealSlot, PlannedMeal>();
    for (const meal of d.meals) {
      if (meal.pinned) pinnedMap.set(meal.slot, meal);
    }
    return buildDay(d.index, plan.targets, plan.preferences, pinnedMap, new Set());
  });
  return { ...plan, days: updatedDays };
}

// ============================================================
// CONSTANTS for the UI layer
// ============================================================

export const SLOT_LABEL_EN: Record<MealSlot, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  'snack-1': 'Snack 1',
  'snack-2': 'Snack 2',
};

export const SLOT_LABEL_AR: Record<MealSlot, string> = {
  breakfast: 'الفطور',
  lunch: 'الغداء',
  dinner: 'العشاء',
  'snack-1': 'وجبة خفيفة 1',
  'snack-2': 'وجبة خفيفة 2',
};

export const DIET_LABEL_EN: Record<DietFlag, string> = {
  halal: 'Halal',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  'dairy-free': 'Dairy free',
  'gluten-free': 'Gluten free',
  'nut-free': 'Nut free',
  'egg-free': 'Egg free',
};

export const DIET_LABEL_AR: Record<DietFlag, string> = {
  halal: 'حلال',
  vegetarian: 'نباتي',
  vegan: 'نباتي صرف',
  'dairy-free': 'بدون ألبان',
  'gluten-free': 'بدون غلوتين',
  'nut-free': 'بدون مكسرات',
  'egg-free': 'بدون بيض',
};
