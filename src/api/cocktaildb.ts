import type { Recipe, RecipeSummary, Ingredient } from '../types/recipe';

/**
 * TheCocktailDB adapter. Same author as TheMealDB, same JSON shape after
 * a normalization pass at build time (see scripts/fetch-cocktaildb.py and
 * build-cocktaildb-cache.cjs). The cache file ships pre-flattened with
 * nutrition (calories, protein, carbs, fat) already calculated by the
 * site's own nutrition calculator, so the runtime adapter only needs to
 * adapt fields and never to compute anything.
 */

export interface CocktailCacheEntry {
  id: string; // already prefixed with "cdb-"
  title: string;
  image: string;
  category: string;
  iba: string;
  alcoholic: string;
  glass: string;
  tags: string;
  servings: number;
  minutes: number;
  instructions: string;
  ingredients: Ingredient[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

let cachePromise: Promise<CocktailCacheEntry[]> | null = null;
function loadCache(): Promise<CocktailCacheEntry[]> {
  if (!cachePromise) {
    cachePromise = import('../data/cocktaildb-cache.json').then(
      (m) => m.default as CocktailCacheEntry[],
    );
  }
  return cachePromise;
}

function adaptSteps(instr?: string): string[] {
  if (!instr) return [];
  // Cocktail instructions are typically a single paragraph. Split on
  // sentence-final punctuation so we still get numbered steps in the UI.
  return instr
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function adaptSummary(c: CocktailCacheEntry): RecipeSummary {
  return {
    id: c.id,
    source: 'local', // routes through getLocalRecipe-like lookup
    title: c.title,
    image: c.image,
    category: c.category || undefined,
    area: c.alcoholic || undefined,
    servings: c.servings,
    readyInMinutes: c.minutes,
  };
}

function adaptFull(c: CocktailCacheEntry): Recipe {
  return {
    ...adaptSummary(c),
    instructions: c.instructions || undefined,
    steps: adaptSteps(c.instructions),
    ingredients: c.ingredients,
    tags: c.tags
      ? c.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : undefined,
  };
}

// ============================================================
// Public API
// ============================================================

export async function cdbAllSummaries(): Promise<RecipeSummary[]> {
  const cache = await loadCache();
  return cache.map(adaptSummary);
}

export async function cdbRandom(): Promise<Recipe | null> {
  const cache = await loadCache();
  if (!cache.length) return null;
  const pick = cache[Math.floor(Math.random() * cache.length)];
  return adaptFull(pick);
}

export async function cdbLookup(id: string): Promise<Recipe | null> {
  const cache = await loadCache();
  const fullId = id.startsWith('cdb-') ? id : `cdb-${id}`;
  const found = cache.find((c) => c.id === fullId);
  return found ? adaptFull(found) : null;
}

export async function cdbSearchByName(query: string): Promise<RecipeSummary[]> {
  const cache = await loadCache();
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return cache
    .filter((c) => c.title.toLowerCase().includes(q))
    .map(adaptSummary);
}

export async function cdbSearchByIngredient(ingredient: string): Promise<RecipeSummary[]> {
  const cache = await loadCache();
  const q = ingredient.trim().toLowerCase();
  if (!q) return [];
  return cache
    .filter((c) => c.ingredients.some((i) => i.name.toLowerCase().includes(q)))
    .map(adaptSummary);
}

export async function cdbFilterByAlcoholic(alcoholic: boolean): Promise<RecipeSummary[]> {
  const cache = await loadCache();
  return cache
    .filter((c) =>
      alcoholic
        ? c.alcoholic.toLowerCase().includes('alcoholic') &&
          !c.alcoholic.toLowerCase().includes('non')
        : c.alcoholic.toLowerCase().includes('non') ||
          c.alcoholic.toLowerCase().includes('optional'),
    )
    .map(adaptSummary);
}

export async function cdbNutritionLookup(id: string): Promise<{
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
} | null> {
  const cache = await loadCache();
  const fullId = id.startsWith('cdb-') ? id : `cdb-${id}`;
  const found = cache.find((c) => c.id === fullId);
  if (!found) return null;
  return {
    calories: found.calories,
    protein: found.protein,
    carbs: found.carbs,
    fat: found.fat,
    confidence: found.confidence,
  };
}
