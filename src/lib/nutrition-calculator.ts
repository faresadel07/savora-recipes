/**
 * Per-recipe nutrition estimator.
 *
 * Given a list of ingredient lines and a servings count, estimate calories
 * and macros per serving by:
 *   1. Parsing each line into { quantity, unit, name }.
 *   2. Converting the quantity + unit into grams (or millilitres, treated
 *      the same way for our purposes).
 *   3. Looking the ingredient name up in NUTRITION_DB.
 *   4. Multiplying the per-100g values by the line's gram weight.
 *   5. Summing across the recipe and dividing by the number of servings.
 *
 * The result is an estimate, not a clinical figure. Lines we cannot parse
 * are skipped silently so the result is conservative.
 */

import { NUTRITION_DB, type Macro } from '../data/nutrition-db';
import type { Ingredient } from '../types/recipe';

export interface NutritionEstimate extends Macro {
  /** Total grams of ingredients matched (for the whole recipe). */
  matchedGrams: number;
  /** Number of ingredient lines matched. */
  matchedItems: number;
  /** Number of ingredient lines we could not parse or match. */
  unmatchedItems: number;
}

// ---------- Unit conversion ----------

// Approximate gram weights for kitchen unit volumes. Real density varies by
// ingredient. Good enough for an estimator.
const UNIT_TO_GRAMS: Record<string, number> = {
  // Mass (already grams).
  g: 1,
  gram: 1,
  grams: 1,
  gr: 1,
  kg: 1000,
  kilo: 1000,
  kilogram: 1000,
  kilograms: 1000,
  oz: 28.35,
  ounce: 28.35,
  ounces: 28.35,
  lb: 453.59,
  pound: 453.59,
  pounds: 453.59,

  // Volumes treated as grams under a "water density" assumption.
  ml: 1,
  millilitre: 1,
  millilitres: 1,
  milliliter: 1,
  milliliters: 1,
  l: 1000,
  litre: 1000,
  litres: 1000,
  liter: 1000,
  liters: 1000,

  // Common kitchen volumes (US).
  cup: 240,
  cups: 240,
  c: 240,
  tablespoon: 15,
  tablespoons: 15,
  tbsp: 15,
  tbs: 15,
  teaspoon: 5,
  teaspoons: 5,
  tsp: 5,

  // Pinches.
  pinch: 0.5,
  pinches: 0.5,
  dash: 0.5,
  dashes: 0.5,
};

// Words to strip from the ingredient name before lookup.
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'of', 'or', 'and', 'with', 'for',
  'fresh', 'dried', 'ground', 'chopped', 'sliced', 'minced',
  'diced', 'grated', 'crushed', 'cubed', 'whole', 'large',
  'medium', 'small', 'extra', 'free', 'range', 'organic',
  'thinly', 'finely', 'coarsely', 'roughly',
  'to', 'taste', 'for', 'serving', 'optional', 'about',
  'approximately', 'roughly',
]);

// Parse a vulgar fraction, mixed number, or plain decimal at the start of
// the line. Returns [quantity, rest] or [null, line].
function parseQuantity(line: string): [number | null, string] {
  const trimmed = line.trim();

  // Mixed number like "1 1/2"
  let m = trimmed.match(/^(\d+)\s+(\d+)\/(\d+)\b/);
  if (m) {
    const whole = parseInt(m[1], 10);
    const num = parseInt(m[2], 10);
    const den = parseInt(m[3], 10);
    return [whole + num / den, trimmed.slice(m[0].length)];
  }
  // Plain fraction like "1/2"
  m = trimmed.match(/^(\d+)\/(\d+)\b/);
  if (m) {
    const num = parseInt(m[1], 10);
    const den = parseInt(m[2], 10);
    if (den > 0) return [num / den, trimmed.slice(m[0].length)];
  }
  // Range like "2 to 3" or "2-3" → use the midpoint
  m = trimmed.match(/^(\d+(?:\.\d+)?)\s*(?:to|-|–)\s*(\d+(?:\.\d+)?)\b/);
  if (m) {
    const a = parseFloat(m[1]);
    const b = parseFloat(m[2]);
    return [(a + b) / 2, trimmed.slice(m[0].length)];
  }
  // Plain decimal or integer
  m = trimmed.match(/^(\d+(?:\.\d+)?)\b/);
  if (m) {
    return [parseFloat(m[1]), trimmed.slice(m[0].length)];
  }
  return [null, trimmed];
}

// Pull a unit token out of the line, return the unit (lowercase) or null.
function parseUnit(line: string): [string | null, string] {
  const trimmed = line.trim();
  const m = trimmed.match(/^([a-zA-Z]+)\b/);
  if (!m) return [null, trimmed];
  const candidate = m[1].toLowerCase();
  if (UNIT_TO_GRAMS[candidate] !== undefined) {
    return [candidate, trimmed.slice(m[0].length)];
  }
  return [null, trimmed];
}

// Pick the best NUTRITION_DB key that appears inside the ingredient name.
// Longest-key-first so "olive oil" wins over "oil".
let SORTED_KEYS: string[] | null = null;
function getSortedKeys(): string[] {
  if (!SORTED_KEYS) {
    SORTED_KEYS = Object.keys(NUTRITION_DB).sort((a, b) => b.length - a.length);
  }
  return SORTED_KEYS;
}

function findNutritionKey(text: string): string | null {
  const cleaned = text
    .toLowerCase()
    .replace(/[,()'.]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOP_WORDS.has(w))
    .join(' ');
  for (const key of getSortedKeys()) {
    if (cleaned.includes(key)) return key;
  }
  return null;
}

// ---------- Public API ----------

/**
 * Parse an ingredient line into a gram weight estimate.
 *
 * Returns null when we cannot find a quantity, unit, or matching DB key.
 */
export function estimateLineGrams(line: string): {
  grams: number;
  key: string;
} | null {
  let remaining = line.trim();
  const [qty, afterQty] = parseQuantity(remaining);
  if (qty === null) return null;
  remaining = afterQty;
  const [unit, afterUnit] = parseUnit(remaining);
  remaining = afterUnit;
  const key = findNutritionKey(remaining);
  if (!key) return null;

  const gramsPerUnit = unit ? UNIT_TO_GRAMS[unit] : null;
  let grams: number;
  if (gramsPerUnit !== null && gramsPerUnit !== undefined) {
    grams = qty * gramsPerUnit;
  } else {
    // No unit means "N pieces of X". Use a typical piece weight by ingredient
    // category. Fall back to 80g per piece (e.g. one medium egg, one banana).
    const PIECE_WEIGHTS: Record<string, number> = {
      egg: 50, eggs: 50,
      tomato: 120, tomatoes: 120,
      onion: 110, onions: 110,
      potato: 200, potatoes: 200,
      carrot: 60, carrots: 60,
      lemon: 65, lime: 65,
      apple: 180, banana: 120, orange: 130,
      garlic: 3,
      pita: 60,
      tortilla: 30,
    };
    grams = qty * (PIECE_WEIGHTS[key] ?? 80);
  }
  return { grams, key };
}

export function calculateRecipeNutrition(
  ingredients: Ingredient[] | string[],
  servings: number,
): NutritionEstimate {
  const lines = ingredients
    .map((i) => (typeof i === 'string' ? i : i.original || ''))
    .filter(Boolean);

  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalGrams = 0;
  let matched = 0;
  let unmatched = 0;

  for (const line of lines) {
    const est = estimateLineGrams(line);
    if (!est) {
      unmatched += 1;
      continue;
    }
    const per100 = NUTRITION_DB[est.key];
    if (!per100) {
      unmatched += 1;
      continue;
    }
    const factor = est.grams / 100;
    totalCalories += per100.calories * factor;
    totalProtein += per100.protein * factor;
    totalCarbs += per100.carbs * factor;
    totalFat += per100.fat * factor;
    totalGrams += est.grams;
    matched += 1;
  }

  const denom = Math.max(1, servings);
  return {
    calories: Math.round(totalCalories / denom),
    protein: Math.round((totalProtein / denom) * 10) / 10,
    carbs: Math.round((totalCarbs / denom) * 10) / 10,
    fat: Math.round((totalFat / denom) * 10) / 10,
    matchedGrams: Math.round(totalGrams),
    matchedItems: matched,
    unmatchedItems: unmatched,
  };
}

/**
 * Returns the confidence of the estimate as a fraction of matched lines.
 * Higher means more ingredients were recognized.
 */
export function nutritionConfidence(est: NutritionEstimate): number {
  const total = est.matchedItems + est.unmatchedItems;
  if (total === 0) return 0;
  return est.matchedItems / total;
}
