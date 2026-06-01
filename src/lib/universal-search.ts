/**
 * Universal search: one Fuse.js query against every library on the site at
 * once. The index is built lazily on first use (dynamic imports for each
 * data file so the homepage does not pay the cost) and cached forever.
 */
import Fuse, { type IFuseOptions } from 'fuse.js';

export type SearchResultType = 'recipe' | 'arab-dish' | 'film' | 'chef' | 'skill' | 'market' | 'drink';

export interface UniversalResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  image?: string;
  href: string;
  searchText: string;
}

const FUSE_OPTS: IFuseOptions<UniversalResult> = {
  keys: [
    { name: 'title', weight: 0.6 },
    { name: 'searchText', weight: 0.4 },
  ],
  threshold: 0.4,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

interface IndexBundle {
  recipes: Fuse<UniversalResult>;
  arab: Fuse<UniversalResult>;
  film: Fuse<UniversalResult>;
  chef: Fuse<UniversalResult>;
  skill: Fuse<UniversalResult>;
  market: Fuse<UniversalResult>;
  drink: Fuse<UniversalResult>;
  // Source arrays kept around for the "Did you mean?" fuzzy fallback so we
  // do not have to peek at Fuse internals.
  allItems: UniversalResult[];
}

let cached: IndexBundle | null = null;
let buildPromise: Promise<IndexBundle> | null = null;

interface RawMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  [key: string]: string | null | undefined;
}

export function loadUniversalIndex(): Promise<IndexBundle> {
  if (cached) return Promise.resolve(cached);
  if (buildPromise) return buildPromise;

  buildPromise = (async () => {
    const [mealdbMod, arabMod, filmsMod, chefsMod, skillsMod, marketsMod, drinksMod] = await Promise.all([
      import('../data/mealdb-cache.json'),
      import('../data/arab-cuisine'),
      import('../data/food-films'),
      import('../data/chef-hall'),
      import('../data/skills-academy'),
      import('../data/world-markets'),
      import('../data/drinks-library'),
    ]);

    const meals: RawMeal[] = (mealdbMod.default as { meals: RawMeal[] }).meals ?? [];
    const recipes: UniversalResult[] = meals.map((r) => {
      // Collect ingredient names for ingredient-level search ("tomato" → all
      // recipes that contain tomato).
      const ingredients: string[] = [];
      for (let i = 1; i <= 20; i++) {
        const name = r[`strIngredient${i}`];
        if (name && typeof name === 'string' && name.trim()) ingredients.push(name.trim());
      }
      return {
        id: r.idMeal,
        type: 'recipe',
        title: r.strMeal,
        subtitle: [r.strArea, r.strCategory].filter(Boolean).join(' · '),
        image: r.strMealThumb,
        href: `/recipe/mdb-${r.idMeal}`,
        searchText: [r.strMeal, r.strArea, r.strCategory, ingredients.join(' ')].filter(Boolean).join(' '),
      };
    });

    const arabDishes: UniversalResult[] = [...arabMod.FAMOUS_DISHES, ...arabMod.PALESTINIAN_DISHES].map((d) => ({
      id: d.id,
      type: 'arab-dish',
      title: d.name,
      subtitle: `${d.nameAr} · ${d.origin}`,
      image: `https://img.youtube.com/vi/${d.videoId}/hqdefault.jpg`,
      href: `/arab-cuisine#dish-${d.id}`,
      searchText: [d.name, d.nameAr, d.origin, d.story, d.ingredients.join(' ')].filter(Boolean).join(' '),
    }));

    const films: UniversalResult[] = filmsMod.FOOD_FILMS.map((f) => ({
      id: f.id,
      type: 'film',
      title: f.title,
      subtitle: [f.series, f.channel].filter(Boolean).join(' · '),
      image: `https://img.youtube.com/vi/${f.videoId}/hqdefault.jpg`,
      href: '/films',
      searchText: [f.title, f.series ?? '', f.channel, f.region ?? '', f.blurb].join(' '),
    }));

    const chefs: UniversalResult[] = chefsMod.CHEFS.map((c) => ({
      id: c.id,
      type: 'chef',
      title: c.name,
      subtitle: `${c.nationality} · ${c.cuisine}`,
      image: `https://img.youtube.com/vi/${c.videoId}/hqdefault.jpg`,
      href: '/chefs',
      searchText: [
        c.name,
        c.nationality,
        c.cuisine,
        c.philosophy,
        c.bio,
        ...(c.restaurants ?? []),
        ...(c.books ?? []),
      ].join(' '),
    }));

    const skills: UniversalResult[] = skillsMod.COOKING_SKILLS.map((s) => ({
      id: s.id,
      type: 'skill',
      title: s.name,
      subtitle: `${s.channel} · ${s.level}`,
      image: `https://img.youtube.com/vi/${s.videoId}/hqdefault.jpg`,
      href: '/academy',
      searchText: [s.name, s.channel, s.description, s.whenToUse, s.commonMistake ?? ''].join(' '),
    }));

    const markets: UniversalResult[] = marketsMod.WORLD_MARKETS.map((m) => ({
      id: m.id,
      type: 'market',
      title: m.name,
      subtitle: `${m.city}, ${m.country}`,
      image: `https://img.youtube.com/vi/${m.videoId}/hqdefault.jpg`,
      href: '/markets',
      searchText: [
        m.name,
        m.nameLocal ?? '',
        m.city,
        m.country,
        m.blurb,
        m.history,
        ...m.signatureFoods,
      ].join(' '),
    }));

    const drinks: UniversalResult[] = drinksMod.DRINKS.map((d) => ({
      id: d.id,
      type: 'drink',
      title: d.name,
      subtitle: `${d.temp === 'hot' ? 'Hot' : 'Cold'} · ${d.origin.split('.')[0]}`,
      image: `https://img.youtube.com/vi/${d.videoId}/hqdefault.jpg`,
      href: `/drinks#drink-${d.id}`,
      searchText: [d.name, d.nameAr ?? '', d.origin, d.story, ...d.ingredients].join(' '),
    }));

    cached = {
      recipes: new Fuse(recipes, FUSE_OPTS),
      arab: new Fuse(arabDishes, FUSE_OPTS),
      film: new Fuse(films, FUSE_OPTS),
      chef: new Fuse(chefs, FUSE_OPTS),
      skill: new Fuse(skills, FUSE_OPTS),
      market: new Fuse(markets, FUSE_OPTS),
      drink: new Fuse(drinks, FUSE_OPTS),
      allItems: [...recipes, ...arabDishes, ...films, ...chefs, ...skills, ...markets, ...drinks],
    };
    return cached;
  })();

  return buildPromise;
}

export interface GroupedResults {
  recipes: UniversalResult[];
  arab: UniversalResult[];
  films: UniversalResult[];
  chefs: UniversalResult[];
  skills: UniversalResult[];
  markets: UniversalResult[];
  drinks: UniversalResult[];
  total: number;
}

export function searchUniversal(query: string, limitPerType = 3): GroupedResults | null {
  if (!cached) return null;
  if (!query || query.length < 2) {
    return { recipes: [], arab: [], films: [], chefs: [], skills: [], markets: [], drinks: [], total: 0 };
  }
  const recipes = cached.recipes.search(query, { limit: limitPerType + 1 }).map((h) => h.item);
  const arab = cached.arab.search(query, { limit: limitPerType }).map((h) => h.item);
  const films = cached.film.search(query, { limit: limitPerType }).map((h) => h.item);
  const chefs = cached.chef.search(query, { limit: limitPerType }).map((h) => h.item);
  const skills = cached.skill.search(query, { limit: limitPerType }).map((h) => h.item);
  const markets = cached.market.search(query, { limit: limitPerType }).map((h) => h.item);
  const drinks = cached.drink.search(query, { limit: limitPerType }).map((h) => h.item);
  return {
    recipes,
    arab,
    films,
    chefs,
    skills,
    markets,
    drinks,
    total: recipes.length + arab.length + films.length + chefs.length + skills.length + markets.length + drinks.length,
  };
}

/**
 * Used when the strict search returned zero hits. Re-runs with a much
 * looser threshold to find the single closest title, used for "Did you
 * mean...?" suggestions.
 */
let looseFuseCache: Fuse<UniversalResult> | null = null;

export function suggestClosest(query: string): UniversalResult | null {
  if (!cached || !query || query.length < 2) return null;
  if (!looseFuseCache) {
    looseFuseCache = new Fuse(cached.allItems, { ...FUSE_OPTS, threshold: 0.7 });
  }
  const hits = looseFuseCache.search(query, { limit: 1 });
  return hits.length > 0 ? hits[0].item : null;
}

// Suggested chips shown when the search box is empty. Hand-picked.
export const SUGGESTED_QUERIES: { en: string; ar: string }[] = [
  { en: 'hummus', ar: 'حمص' },
  { en: 'mansaf', ar: 'منسف' },
  { en: 'pizza', ar: 'بيتزا' },
  { en: 'chicken', ar: 'دجاج' },
  { en: 'pasta', ar: 'باستا' },
  { en: 'falafel', ar: 'فلافل' },
  { en: 'kabsa', ar: 'كبسة' },
  { en: 'dessert', ar: 'حلويات' },
];
