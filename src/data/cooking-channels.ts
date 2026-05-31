/**
 * A curated shelf of public cooking channels on YouTube. We link out; we don't
 * embed individual videos here, which keeps the list resilient when single
 * videos get taken down or made private.
 *
 * All channels are public, free to watch, and chosen for the quality of their
 * teaching. Add or remove freely.
 */

export interface CookingChannel {
  id: string;
  name: string;
  handle: string;
  url: string;
  blurb: string;
  vibe: 'classic' | 'modern' | 'science' | 'baking' | 'budget' | 'global';
  accent: 'terracotta' | 'sage' | 'gold' | 'ink';
}

export const COOKING_CHANNELS: CookingChannel[] = [
  {
    id: 'bonappetit',
    name: 'Bon Appétit',
    handle: '@bonappetit',
    url: 'https://www.youtube.com/@bonappetit',
    blurb: 'The test kitchen behind the magazine. Glossy production, real cooking, every cuisine.',
    vibe: 'modern',
    accent: 'terracotta',
  },
  {
    id: 'americas-test-kitchen',
    name: "America's Test Kitchen",
    handle: '@AmericasTestKitchen',
    url: 'https://www.youtube.com/@AmericasTestKitchen',
    blurb: 'Recipes tested fifty different ways. If you ever wondered "but why?", they answer.',
    vibe: 'science',
    accent: 'ink',
  },
  {
    id: 'babish',
    name: 'Babish Culinary Universe',
    handle: '@babishculinaryuniverse',
    url: 'https://www.youtube.com/@babishculinaryuniverse',
    blurb: 'The dishes you saw in movies, recreated faithfully. Plus a deeply patient "Basics" series.',
    vibe: 'modern',
    accent: 'gold',
  },
  {
    id: 'adam-ragusea',
    name: 'Adam Ragusea',
    handle: '@aragusea',
    url: 'https://www.youtube.com/@aragusea',
    blurb: 'A journalism professor who happens to cook. Every video answers a "why does this work" question.',
    vibe: 'science',
    accent: 'sage',
  },
  {
    id: 'joshua-weissman',
    name: 'Joshua Weissman',
    handle: '@JoshuaWeissman',
    url: 'https://www.youtube.com/@JoshuaWeissman',
    blurb: 'Bold home cooking, demanding standards, "But Better" remakes of fast food.',
    vibe: 'modern',
    accent: 'terracotta',
  },
  {
    id: 'food-wishes',
    name: 'Food Wishes (Chef John)',
    handle: '@foodwishes',
    url: 'https://www.youtube.com/@foodwishes',
    blurb: 'Two thousand recipes, one cheerful narrator. The internet\'s most beloved cooking teacher.',
    vibe: 'classic',
    accent: 'gold',
  },
  {
    id: 'nyt-cooking',
    name: 'NYT Cooking',
    handle: '@NYTCooking',
    url: 'https://www.youtube.com/@NYTCooking',
    blurb: 'Tutorials with the writers behind the recipes. Mark Bittman, Samin Nosrat, Eric Kim.',
    vibe: 'classic',
    accent: 'ink',
  },
  {
    id: 'king-arthur',
    name: 'King Arthur Baking',
    handle: '@KingArthurBakingCompany',
    url: 'https://www.youtube.com/@KingArthurBakingCompany',
    blurb: 'America\'s oldest flour company teaching everything from sourdough to laminated dough.',
    vibe: 'baking',
    accent: 'gold',
  },
  {
    id: 'helen-rennie',
    name: 'Helen Rennie',
    handle: '@HelenRennie',
    url: 'https://www.youtube.com/@HelenRennie',
    blurb: 'A culinary instructor explaining technique without the noise. Like a private lesson.',
    vibe: 'science',
    accent: 'sage',
  },
  {
    id: 'brian-lagerstrom',
    name: 'Brian Lagerstrom',
    handle: '@BrianLagerstrom',
    url: 'https://www.youtube.com/@BrianLagerstrom',
    blurb: 'A former restaurant chef cooking modern dinners that scale to weeknights.',
    vibe: 'modern',
    accent: 'terracotta',
  },
  {
    id: 'internet-shaquille',
    name: 'Internet Shaquille',
    handle: '@internetshaquille',
    url: 'https://www.youtube.com/@internetshaquille',
    blurb: 'Practical cooking advice in two-minute videos. The thinking person\'s lazy gourmet.',
    vibe: 'budget',
    accent: 'ink',
  },
  {
    id: 'sorted-food',
    name: 'Sorted Food',
    handle: '@SortedFood',
    url: 'https://www.youtube.com/@SortedFood',
    blurb: 'Five British friends cooking together. Equal parts entertainment and useful technique.',
    vibe: 'global',
    accent: 'sage',
  },
];
