import axios from 'axios';
import type { Recipe, RecipeSummary, Ingredient } from '../types/recipe';

const BASE = 'https://www.themealdb.com/api/json/v1/1';

interface MealRaw {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strTags?: string | null;
  strYoutube?: string | null;
  strSource?: string | null;
  [key: string]: string | null | undefined;
}

interface CacheShape {
  meals: MealRaw[];
  fetchedAt: string;
}

/**
 * Arabic translation cache, keyed by MealDB idMeal. Each entry mirrors the
 * MealDB shape but with title / category / area / instructions and the
 * ingredient + step arrays all pre-translated by the build-time script.
 * Loading this is optional: we only fetch when the user is in Arabic mode.
 */
export interface MealArEntry {
  idMeal: string;
  title: string;
  category: string;
  area: string;
  country?: string;
  instructions: string;
  steps: string[];
  ingredients: { index: number; name: string; measure?: string; original: string }[];
}

type MealArMap = Record<string, MealArEntry>;

const client = axios.create({ baseURL: BASE, timeout: 12_000 });

/**
 * Lazy-loaded local cache of every TheMealDB recipe. Fetched once at build
 * time via `node scripts/fetch-mealdb.mjs`. Vite code-splits the JSON into
 * its own chunk so it only ships when the recipe layer actually needs it.
 */
let cachePromise: Promise<CacheShape> | null = null;
function loadCache(): Promise<CacheShape> {
  if (!cachePromise) {
    cachePromise = import('../data/mealdb-cache.json').then((m) => m.default as CacheShape);
  }
  return cachePromise;
}

let arCachePromise: Promise<MealArMap> | null = null;
function loadArCache(): Promise<MealArMap> {
  if (!arCachePromise) {
    arCachePromise = import('../data/mealdb-cache-ar.json')
      .then((m) => m.default as MealArMap)
      .catch(() => ({} as MealArMap));
  }
  return arCachePromise;
}

export async function mdbArLookup(idOrPrefixedId: string): Promise<MealArEntry | null> {
  const numericId = idOrPrefixedId.startsWith('mdb-')
    ? idOrPrefixedId.slice(4)
    : idOrPrefixedId;
  const map = await loadArCache();
  return map[numericId] ?? null;
}

export async function mdbArTitle(idOrPrefixedId: string): Promise<string | null> {
  const entry = await mdbArLookup(idOrPrefixedId);
  return entry?.title ?? null;
}

function adaptSummary(m: MealRaw): RecipeSummary {
  return {
    id: `mdb-${m.idMeal}`,
    source: 'mealdb',
    title: m.strMeal,
    image: m.strMealThumb,
    category: m.strCategory || undefined,
    area: m.strArea || undefined,
  };
}

function adaptIngredients(m: MealRaw): Ingredient[] {
  const list: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = (m[`strIngredient${i}`] as string | null | undefined)?.trim();
    const measure = (m[`strMeasure${i}`] as string | null | undefined)?.trim();
    if (name) {
      list.push({
        name,
        measure: measure || undefined,
        original: measure ? `${measure} ${name}` : name,
      });
    }
  }
  return list;
}

function adaptSteps(instr?: string): string[] {
  if (!instr) return [];
  return instr
    .split(/\r?\n|\r/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function adaptFull(m: MealRaw): Recipe {
  const steps = adaptSteps(m.strInstructions);
  return {
    ...adaptSummary(m),
    instructions: m.strInstructions || undefined,
    steps,
    ingredients: adaptIngredients(m),
    tags: m.strTags ? m.strTags.split(',').map((t) => t.trim()).filter(Boolean) : undefined,
    youtube: m.strYoutube || undefined,
    sourceUrl: m.strSource || undefined,
    sourceName: m.strSource ? safeHostname(m.strSource) : undefined,
  };
}

function safeHostname(url: string): string | undefined {
  try { return new URL(url).hostname.replace('www.', ''); } catch { return undefined; }
}

// --------- public functions (cache-first) ---------

export async function mdbRandom(): Promise<Recipe | null> {
  const { meals } = await loadCache();
  if (!meals.length) return null;
  const pick = meals[Math.floor(Math.random() * meals.length)];
  return adaptFull(pick);
}

export async function mdbRandomMany(count: number): Promise<Recipe[]> {
  const { meals } = await loadCache();
  if (meals.length === 0) return [];
  // Shuffle a copy and take `count`.
  const pool = [...meals];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).map(adaptFull);
}

export async function mdbLookup(id: string): Promise<Recipe | null> {
  const numericId = id.startsWith('mdb-') ? id.slice(4) : id;
  const { meals } = await loadCache();
  const local = meals.find((m) => m.idMeal === numericId);
  if (local) return adaptFull(local);
  // Live fallback: a recipe added to TheMealDB after our snapshot.
  try {
    const { data } = await client.get<{ meals: MealRaw[] | null }>('/lookup.php', { params: { i: numericId } });
    return data.meals?.[0] ? adaptFull(data.meals[0]) : null;
  } catch {
    return null;
  }
}

export async function mdbSearchByName(query: string): Promise<RecipeSummary[]> {
  const { meals } = await loadCache();
  const q = query.trim().toLowerCase();
  return meals
    .filter((m) => m.strMeal.toLowerCase().includes(q))
    .map(adaptSummary);
}

export async function mdbSearchByIngredient(ingredient: string): Promise<RecipeSummary[]> {
  const { meals } = await loadCache();
  const q = ingredient.trim().toLowerCase();
  return meals
    .filter((m) => {
      for (let i = 1; i <= 20; i++) {
        const name = (m[`strIngredient${i}`] as string | null | undefined)?.trim().toLowerCase();
        if (name && name.includes(q)) return true;
      }
      return false;
    })
    .map(adaptSummary);
}

export async function mdbFilterByCategory(category: string): Promise<RecipeSummary[]> {
  const { meals } = await loadCache();
  const q = category.trim().toLowerCase();
  return meals
    .filter((m) => (m.strCategory ?? '').toLowerCase() === q)
    .map(adaptSummary);
}

export async function mdbFilterByArea(area: string): Promise<RecipeSummary[]> {
  const { meals } = await loadCache();
  const q = area.trim().toLowerCase();
  return meals
    .filter((m) => (m.strArea ?? '').toLowerCase() === q)
    .map(adaptSummary);
}

/**
 * Return summaries for every cached MealDB recipe. Used by the default
 * "browse everything" view when the user has not entered a search query
 * or selected a filter.
 */
export async function mdbAllSummaries(): Promise<RecipeSummary[]> {
  const { meals } = await loadCache();
  return meals.map(adaptSummary);
}

export async function mdbCategories(): Promise<{ name: string; description: string; image: string }[]> {
  // Categories metadata only — the live endpoint is tiny.
  try {
    const { data } = await client.get<{ categories: { strCategory: string; strCategoryDescription: string; strCategoryThumb: string }[] }>('/categories.php');
    return data.categories.map((c) => ({
      name: c.strCategory,
      description: c.strCategoryDescription,
      image: c.strCategoryThumb,
    }));
  } catch {
    return [];
  }
}
