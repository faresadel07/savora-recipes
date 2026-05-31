import type { Recipe as SchemaRecipe, WithContext } from 'schema-dts';
import type { Recipe } from '../types/recipe';

/**
 * Build a schema.org Recipe JSON-LD object. Search engines use this for
 * rich snippets (image, cook time, rating, ingredient list in results).
 */
export function buildRecipeSchema(r: Recipe, pageUrl: string): WithContext<SchemaRecipe> {
  const ingredients = (r.ingredients ?? []).map((i) =>
    [i.measure, i.name].filter(Boolean).join(' ').trim(),
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: r.title,
    image: r.image ? [r.image] : undefined,
    description: r.title,
    recipeCategory: r.category,
    recipeCuisine: r.area,
    recipeIngredient: ingredients,
    recipeInstructions: (r.steps ?? []).map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      text: step,
    })),
    keywords: r.tags?.join(', '),
    author: r.publisher
      ? {
          '@type': 'Organization',
          name: r.publisher,
        }
      : undefined,
    video: r.youtube
      ? {
          '@type': 'VideoObject',
          name: r.title,
          description: `Video guide for ${r.title}`,
          thumbnailUrl: r.image,
          contentUrl: r.youtube,
          uploadDate: new Date().toISOString().slice(0, 10),
        }
      : undefined,
    mainEntityOfPage: pageUrl,
  } as WithContext<SchemaRecipe>;
}

/**
 * Imperatively inject (or replace) the JSON-LD script tag in <head>.
 * Cleaned up on unmount via the returned function.
 */
export function injectSchema(schema: object, id = 'recipe-schema'): () => void {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);

  return () => {
    const el = document.getElementById(id);
    if (el) el.remove();
  };
}
