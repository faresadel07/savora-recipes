/**
 * Recipe source. We use a string id prefix (`mdb-` or `fk-`) so the rest of the
 * app stays source-agnostic and routes stay simple.
 */
export type RecipeSource = 'mealdb' | 'forkify' | 'local';

export interface RecipeSummary {
  id: string;
  source: RecipeSource;
  title: string;
  image: string;
  category?: string;
  area?: string;
  readyInMinutes?: number;
  servings?: number;
  publisher?: string;
}

export interface Ingredient {
  name: string;
  measure?: string;
  original: string;
}

export interface Recipe extends RecipeSummary {
  instructions?: string;
  steps?: string[];
  ingredients?: Ingredient[];
  tags?: string[];
  youtube?: string;
  sourceUrl?: string;
  sourceName?: string;
}

export interface SearchResponse {
  results: RecipeSummary[];
  total: number;
}

export type SortOption = 'popularity' | 'name';

export interface SearchFilters {
  query?: string;
  category?: string;
  area?: string;
  number?: number;
  offset?: number;
  sort?: SortOption;
}
