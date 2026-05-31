import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomRecipe } from '../api';
import { LOCAL_RECIPES } from '../data/local-recipes';

/**
 * Surprise-me: navigates to a random recipe. We weight the choice toward
 * TheMealDB random (huge pool) but fall back to a local recipe instantly if
 * the API is slow or offline.
 */
export function useSurpriseRecipe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const surprise = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Fire MealDB random with a short timeout. Whichever resolves first wins.
      const remotePromise = getRandomRecipe();
      const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500));
      const remoteOrTimeout = await Promise.race([remotePromise.catch(() => null), timeout]);

      if (remoteOrTimeout && remoteOrTimeout.id) {
        navigate(`/recipe/${remoteOrTimeout.id}`);
      } else {
        const r = LOCAL_RECIPES[Math.floor(Math.random() * LOCAL_RECIPES.length)];
        navigate(`/recipe/${r.id}`);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, navigate]);

  return { surprise, loading };
}
