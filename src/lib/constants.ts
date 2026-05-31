/**
 * TheMealDB categories (exact strings the API expects).
 */
export const MEALDB_CATEGORIES = [
  'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'Lamb',
  'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter',
  'Vegan', 'Vegetarian',
];

/**
 * TheMealDB areas / cuisines (exact strings).
 */
export const MEALDB_AREAS = [
  'American', 'British', 'Canadian', 'Chinese', 'Croatian', 'Dutch',
  'Egyptian', 'Filipino', 'French', 'Greek', 'Indian', 'Irish',
  'Italian', 'Jamaican', 'Japanese', 'Kenyan', 'Malaysian', 'Mexican',
  'Moroccan', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Thai',
  'Tunisian', 'Turkish', 'Ukrainian', 'Uruguayan', 'Vietnamese',
];

export interface CategoryCard {
  slug: string;
  label: string;
  category: string;
  description: string;
  accent: 'terracotta' | 'sage' | 'gold' | 'ink';
}

export const HOME_CATEGORIES: CategoryCard[] = [
  { slug: 'breakfast', label: 'Breakfast', category: 'Breakfast', description: 'Slow mornings, sunny plates.', accent: 'gold' },
  { slug: 'chicken', label: 'Chicken', category: 'Chicken', description: 'Weeknight favorite, every cuisine.', accent: 'terracotta' },
  { slug: 'pasta', label: 'Pasta', category: 'Pasta', description: 'The shape of comfort.', accent: 'terracotta' },
  { slug: 'seafood', label: 'Seafood', category: 'Seafood', description: 'Fresh from the coast.', accent: 'sage' },
  { slug: 'vegetarian', label: 'Vegetarian', category: 'Vegetarian', description: 'Plant-forward, never plain.', accent: 'sage' },
  { slug: 'dessert', label: 'Desserts', category: 'Dessert', description: 'A small, sweet ending.', accent: 'gold' },
];

export interface WorldCuisine {
  key: string;
  label: string;
  region: string;
  area: string;
  tone: 'warm' | 'green' | 'gold' | 'dark';
}

export const WORLD_CUISINES: WorldCuisine[] = [
  { key: 'italian', label: 'Italian', region: 'Europe', area: 'Italian', tone: 'warm' },
  { key: 'french', label: 'French', region: 'Europe', area: 'French', tone: 'dark' },
  { key: 'spanish', label: 'Spanish', region: 'Europe', area: 'Spanish', tone: 'warm' },
  { key: 'greek', label: 'Greek', region: 'Mediterranean', area: 'Greek', tone: 'green' },
  { key: 'turkish', label: 'Turkish', region: 'Anatolia', area: 'Turkish', tone: 'warm' },
  { key: 'moroccan', label: 'Moroccan', region: 'North Africa', area: 'Moroccan', tone: 'gold' },
  { key: 'egyptian', label: 'Egyptian', region: 'North Africa', area: 'Egyptian', tone: 'gold' },
  { key: 'tunisian', label: 'Tunisian', region: 'North Africa', area: 'Tunisian', tone: 'warm' },
  { key: 'kenyan', label: 'Kenyan', region: 'East Africa', area: 'Kenyan', tone: 'green' },
  { key: 'indian', label: 'Indian', region: 'South Asia', area: 'Indian', tone: 'warm' },
  { key: 'thai', label: 'Thai', region: 'Southeast Asia', area: 'Thai', tone: 'green' },
  { key: 'vietnamese', label: 'Vietnamese', region: 'Southeast Asia', area: 'Vietnamese', tone: 'green' },
  { key: 'malaysian', label: 'Malaysian', region: 'Southeast Asia', area: 'Malaysian', tone: 'gold' },
  { key: 'filipino', label: 'Filipino', region: 'Southeast Asia', area: 'Filipino', tone: 'warm' },
  { key: 'chinese', label: 'Chinese', region: 'East Asia', area: 'Chinese', tone: 'warm' },
  { key: 'japanese', label: 'Japanese', region: 'East Asia', area: 'Japanese', tone: 'dark' },
  { key: 'mexican', label: 'Mexican', region: 'Latin America', area: 'Mexican', tone: 'warm' },
  { key: 'jamaican', label: 'Jamaican', region: 'Caribbean', area: 'Jamaican', tone: 'green' },
  { key: 'uruguayan', label: 'Uruguayan', region: 'Latin America', area: 'Uruguayan', tone: 'green' },
  { key: 'american', label: 'American', region: 'Americas', area: 'American', tone: 'dark' },
  { key: 'canadian', label: 'Canadian', region: 'Americas', area: 'Canadian', tone: 'dark' },
  { key: 'british', label: 'British', region: 'British Isles', area: 'British', tone: 'dark' },
  { key: 'irish', label: 'Irish', region: 'British Isles', area: 'Irish', tone: 'green' },
  { key: 'dutch', label: 'Dutch', region: 'Northern Europe', area: 'Dutch', tone: 'dark' },
];
