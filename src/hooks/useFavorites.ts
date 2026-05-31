import { useCallback, useEffect, useState } from 'react';
import type { RecipeSource, RecipeSummary } from '../types/recipe';

const KEY = 'savora:favorites:v2'; // v2 -- ids are strings now

type StoredFavorite = {
  id: string;
  source: RecipeSource;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  category?: string;
  area?: string;
};

function read(): StoredFavorite[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredFavorite[]) : [];
  } catch {
    return [];
  }
}

function write(items: StoredFavorite[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('savora:favorites-changed'));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<StoredFavorite[]>(() => read());

  useEffect(() => {
    const onChange = () => setFavorites(read());
    window.addEventListener('savora:favorites-changed', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('savora:favorites-changed', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((r) => r.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback((recipe: RecipeSummary) => {
    const current = read();
    const exists = current.some((r) => r.id === recipe.id);
    const next = exists
      ? current.filter((r) => r.id !== recipe.id)
      : [
          {
            id: recipe.id,
            source: recipe.source,
            title: recipe.title,
            image: recipe.image,
            readyInMinutes: recipe.readyInMinutes,
            servings: recipe.servings,
            category: recipe.category,
            area: recipe.area,
          },
          ...current,
        ];
    write(next);
  }, []);

  const clear = useCallback(() => write([]), []);

  return { favorites, isFavorite, toggleFavorite, clear };
}
