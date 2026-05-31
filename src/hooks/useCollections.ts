import { useQuery } from '@tanstack/react-query';
import { searchRecipes } from '../api';
import { EDITOR_COLLECTIONS } from '../lib/collections';

export function useCollections() {
  return useQuery({
    queryKey: ['collections', 'editor'],
    queryFn: async () => {
      const results = await Promise.all(
        EDITOR_COLLECTIONS.map((c) =>
          searchRecipes(c.filters).then((r) => ({
            collection: c,
            recipes: r.results,
          })),
        ),
      );
      return results;
    },
  });
}
