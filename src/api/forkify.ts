import axios from 'axios';
import type { Recipe, RecipeSummary, Ingredient } from '../types/recipe';

const BASE = 'https://forkify-api.jonas.io/api/v2';

interface ForkifyRecipeRaw {
  id: string;
  title: string;
  publisher: string;
  source_url?: string;
  image_url: string;
  servings?: number;
  cooking_time?: number;
  ingredients?: { quantity: number | null; unit: string; description: string }[];
}

const client = axios.create({ baseURL: BASE, timeout: 12_000 });

function adaptSummary(r: ForkifyRecipeRaw): RecipeSummary {
  return {
    id: `fk-${r.id}`,
    source: 'forkify',
    title: r.title,
    image: r.image_url,
    publisher: r.publisher,
    readyInMinutes: r.cooking_time,
    servings: r.servings,
  };
}

function adaptIngredients(items?: ForkifyRecipeRaw['ingredients']): Ingredient[] {
  if (!items) return [];
  return items.map((i) => {
    const qty = i.quantity ? String(i.quantity) : '';
    const measure = [qty, i.unit].filter(Boolean).join(' ').trim();
    return {
      name: i.description,
      measure: measure || undefined,
      original: measure ? `${measure} ${i.description}` : i.description,
    };
  });
}

function adaptFull(r: ForkifyRecipeRaw): Recipe {
  return {
    ...adaptSummary(r),
    ingredients: adaptIngredients(r.ingredients),
    sourceUrl: r.source_url,
    sourceName: r.publisher,
  };
}

export async function fkSearch(query: string, page = 1): Promise<{ results: RecipeSummary[]; total: number }> {
  try {
    const { data } = await client.get<{ status: string; results: number; data: { recipes: ForkifyRecipeRaw[] } }>(
      '/recipes',
      { params: { search: query, page } },
    );
    return {
      results: (data.data.recipes ?? []).map(adaptSummary),
      total: data.results ?? 0,
    };
  } catch {
    return { results: [], total: 0 };
  }
}

export async function fkLookup(id: string): Promise<Recipe | null> {
  try {
    const rawId = id.startsWith('fk-') ? id.slice(3) : id;
    const { data } = await client.get<{ status: string; data: { recipe: ForkifyRecipeRaw } }>(`/recipes/${rawId}`);
    return data.data?.recipe ? adaptFull(data.data.recipe) : null;
  } catch {
    return null;
  }
}
