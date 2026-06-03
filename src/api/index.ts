import type { Recipe, RecipeSummary, SearchFilters, SearchResponse } from '../types/recipe';
import {
  mdbAllSummaries,
  mdbFilterByArea,
  mdbFilterByCategory,
  mdbLookup,
  mdbRandom,
  mdbRandomMany,
  mdbSearchByIngredient,
  mdbSearchByName,
} from './mealdb';
import { fkLookup, fkSearch } from './forkify';
import {
  cdbAllSummaries,
  cdbLookup,
  cdbSearchByIngredient,
  cdbSearchByName,
} from './cocktaildb';
import { LOCAL_RECIPES, getLocalRecipe } from '../data/local-recipes';
import { FITNESS_RECIPES, type FitnessRecipe } from '../data/fitness-recipes';

function adaptFitnessRecipe(r: FitnessRecipe): Recipe {
  return {
    id: `fr-${r.id}`,
    source: 'local',
    title: r.title,
    image: r.image,
    category: r.category,
    area: 'Fitness',
    publisher: 'Zaytoun Editorial',
    sourceName: 'Zaytoun Fitness',
    sourceUrl: `https://www.zaytoun.online/fitness#${r.id}`,
    servings: r.servings,
    readyInMinutes: r.minutes,
    instructions: r.steps.join(' '),
    steps: r.steps,
    ingredients: r.ingredients.map((line) => ({ name: line, original: line })),
    tags: [r.category, 'fitness'],
    youtube: r.videoId || undefined,
  };
}

/**
 * Friendly error so UI can show a consistent error state.
 */
export class RecipeApiError extends Error {
  kind: 'network' | 'not-found' | 'unknown';
  constructor(message: string, kind: RecipeApiError['kind'] = 'unknown') {
    super(message);
    this.kind = kind;
  }
}

/**
 * Get a single random recipe (rich, with steps + YouTube).
 */
export async function getRandomRecipe(): Promise<Recipe> {
  try {
    const r = await mdbRandom();
    if (!r) throw new RecipeApiError('No random recipe returned', 'not-found');
    return r;
  } catch (e) {
    if (e instanceof RecipeApiError) throw e;
    throw new RecipeApiError(String(e), 'network');
  }
}

/**
 * Get N random recipes (best effort, dedup'd).
 */
export async function getRandomRecipes(count: number): Promise<Recipe[]> {
  try {
    return await mdbRandomMany(count);
  } catch (e) {
    throw new RecipeApiError(String(e), 'network');
  }
}

/**
 * Detail lookup. Routes by id prefix.
 */
export async function getRecipeById(id: string): Promise<Recipe> {
  try {
    // Any locally-bundled recipe: USDA, vintage, world classics, sauces.
    // They all live inside LOCAL_RECIPES and getLocalRecipe finds them by id.
    if (id.startsWith('lo-') || id.startsWith('wc-') || id.startsWith('sa-')) {
      const r = getLocalRecipe(id);
      if (!r) throw new RecipeApiError('Recipe not found', 'not-found');
      return r;
    }
    if (id.startsWith('fr-')) {
      const bare = id.slice(3);
      const fr = FITNESS_RECIPES.find((r) => r.id === bare);
      if (!fr) throw new RecipeApiError('Recipe not found', 'not-found');
      return adaptFitnessRecipe(fr);
    }
    if (id.startsWith('fk-')) {
      const r = await fkLookup(id);
      if (!r) throw new RecipeApiError('Recipe not found', 'not-found');
      return r;
    }
    if (id.startsWith('cdb-')) {
      const r = await cdbLookup(id);
      if (!r) throw new RecipeApiError('Recipe not found', 'not-found');
      return r;
    }
    const r = await mdbLookup(id);
    if (!r) throw new RecipeApiError('Recipe not found', 'not-found');
    return r;
  } catch (e) {
    if (e instanceof RecipeApiError) throw e;
    throw new RecipeApiError(String(e), 'network');
  }
}

/**
 * Search: combines TheMealDB (richer, has steps) with Forkify (huge corpus, basic data).
 * TheMealDB results come first so users see fully-detailed recipes at the top.
 */
export async function searchRecipes(filters: SearchFilters = {}): Promise<SearchResponse> {
  const query = filters.query?.trim();

  // Filter-based browse (category or area). Forkify can't filter, so MealDB only.
  if (filters.category) {
    try {
      const meals = await mdbFilterByCategory(filters.category);
      return paginate(sortResults(meals, filters.sort), filters);
    } catch (e) {
      throw new RecipeApiError(String(e), 'network');
    }
  }

  if (filters.area) {
    try {
      const meals = await mdbFilterByArea(filters.area);
      return paginate(sortResults(meals, filters.sort), filters);
    } catch (e) {
      throw new RecipeApiError(String(e), 'network');
    }
  }

  if (!query) {
    // No filters at all: surface the whole catalogue. The cached MealDB ships
    // ~668 recipes plus the local hand-curated set, so we have plenty to
    // paginate through. Local recipes first since they are richest.
    try {
      const [all, cocktails] = await Promise.all([
        mdbAllSummaries(),
        cdbAllSummaries().catch(() => [] as RecipeSummary[]),
      ]);
      const localSummaries: RecipeSummary[] = LOCAL_RECIPES.map((r) => ({
        id: r.id,
        source: r.source,
        title: r.title,
        image: r.image,
        category: r.category,
        area: r.area,
      }));
      const seen = new Set<string>();
      const merged: RecipeSummary[] = [];
      for (const r of [...localSummaries, ...all, ...cocktails]) {
        if (!seen.has(r.id)) {
          seen.add(r.id);
          merged.push(r);
        }
      }
      return paginate(sortResults(merged, filters.sort), filters);
    } catch (e) {
      throw new RecipeApiError(String(e), 'network');
    }
  }

  // Free-text search: local matches first, then MealDB by name + ingredient, then Forkify
  try {
    const lc = query.toLowerCase();
    const localHits: RecipeSummary[] = LOCAL_RECIPES.filter((r) => {
      return (
        r.title.toLowerCase().includes(lc) ||
        r.category?.toLowerCase().includes(lc) ||
        r.area?.toLowerCase().includes(lc) ||
        r.tags?.some((t) => t.toLowerCase().includes(lc)) ||
        r.ingredients?.some((i) => i.name.toLowerCase().includes(lc))
      );
    });

    const [byName, byIngredient, cdbName, cdbIng, fk] = await Promise.all([
      mdbSearchByName(query).catch(() => [] as RecipeSummary[]),
      mdbSearchByIngredient(query).catch(() => [] as RecipeSummary[]),
      cdbSearchByName(query).catch(() => [] as RecipeSummary[]),
      cdbSearchByIngredient(query).catch(() => [] as RecipeSummary[]),
      fkSearch(query, Math.max(1, Math.floor((filters.offset ?? 0) / 12) + 1)).catch(() => ({
        results: [] as RecipeSummary[],
        total: 0,
      })),
    ]);

    const merged: RecipeSummary[] = [];
    const seen = new Set<string>();
    for (const r of [...localHits, ...byName, ...byIngredient, ...cdbName, ...cdbIng, ...fk.results]) {
      if (!seen.has(r.id)) {
        seen.add(r.id);
        merged.push(r);
      }
    }

    return paginate(sortResults(merged, filters.sort), filters);
  } catch (e) {
    throw new RecipeApiError(String(e), 'network');
  }
}

function sortResults(items: RecipeSummary[], sort?: SearchFilters['sort']): RecipeSummary[] {
  if (sort === 'name') {
    return [...items].sort((a, b) => a.title.localeCompare(b.title));
  }
  return items;
}

function paginate(items: RecipeSummary[], filters: SearchFilters): SearchResponse {
  const offset = filters.offset ?? 0;
  const number = filters.number ?? 12;
  return {
    results: items.slice(offset, offset + number),
    total: items.length,
  };
}

/**
 * "Similar" recipes by sharing category (best signal we have in MealDB).
 */
export async function getSimilarRecipes(recipe: { category?: string; id: string }, count = 4): Promise<RecipeSummary[]> {
  if (!recipe.category) return [];
  try {
    const meals = await mdbFilterByCategory(recipe.category);
    return meals.filter((m) => m.id !== recipe.id).slice(0, count);
  } catch {
    return [];
  }
}

export { mdbCategories } from './mealdb';
