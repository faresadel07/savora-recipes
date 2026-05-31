import type { SearchFilters } from '../types/recipe';

export interface Collection {
  slug: string;
  title: string;
  blurb: string;
  filters: SearchFilters;
  accent: 'terracotta' | 'sage' | 'gold' | 'ink';
}

export const EDITOR_COLLECTIONS: Collection[] = [
  {
    slug: 'pasta-night',
    title: 'Pasta night',
    blurb: 'Twirled, tossed, baked. The cure for a long day.',
    filters: { category: 'Pasta', number: 6 },
    accent: 'terracotta',
  },
  {
    slug: 'seafood',
    title: 'From the sea',
    blurb: 'Light, bright, and ready for a glass of white.',
    filters: { category: 'Seafood', number: 6 },
    accent: 'sage',
  },
  {
    slug: 'weekend-baking',
    title: 'Weekend baking',
    blurb: 'Slow mornings deserve fresh sweetness.',
    filters: { category: 'Dessert', number: 6 },
    accent: 'gold',
  },
];

export const HOMEPAGE_STATS = [
  { value: '∞', label: 'Recipes' },
  { value: '24', label: 'World cuisines' },
  { value: '100%', label: 'Always free' },
  { value: '0', label: 'Sign-up needed' },
];
