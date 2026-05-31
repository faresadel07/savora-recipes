/**
 * Cooking magazines and journals — two flavors:
 *  1. ARCHIVE_MAGAZINES: public-domain magazines hosted on Internet Archive,
 *     embeddable in full inside Savora via the BookReader iframe.
 *  2. MODERN_SITES: living cooking magazines/sites that are free to read at
 *     their own URL. We link out (linking is unrestricted).
 *
 * Cover thumbnails come from `archive.org/services/img/{id}`, which always
 * resolves to either the real cover or a tasteful fallback.
 */

export interface ArchiveMagazine {
  id: string;
  title: string;
  issue: string;
  year: number;
  blurb: string;
  archiveId: string;
  detailUrl: string;
  embedUrl: string;
  coverUrl: string;
  fallbackSearchUrl: string;
  era: 'Victorian' | 'Edwardian' | 'Progressive' | 'Modern';
  accent: 'terracotta' | 'sage' | 'gold' | 'ink';
}

function arch(archiveId: string): Pick<ArchiveMagazine, 'archiveId' | 'detailUrl' | 'embedUrl' | 'coverUrl'> {
  return {
    archiveId,
    detailUrl: `https://archive.org/details/${archiveId}`,
    embedUrl: `https://archive.org/embed/${archiveId}`,
    coverUrl: `https://archive.org/services/img/${archiveId}`,
  };
}

export const ARCHIVE_MAGAZINES: ArchiveMagazine[] = [
  {
    id: 'boston-cooking-school-1896',
    title: 'The Boston Cooking-School Cook Book',
    issue: 'First edition',
    year: 1896,
    blurb:
      'The book that gave Americans level measuring spoons. Fannie Farmer\'s spare, accurate prose changed home cooking forever.',
    ...arch('bostoncookingsch00farm'),
    fallbackSearchUrl: 'https://archive.org/search?query=boston+cooking+school+cookbook+farmer',
    era: 'Victorian',
    accent: 'terracotta',
  },
  {
    id: 'mrs-beeton-1861',
    title: 'The Book of Household Management',
    issue: 'Isabella Beeton, first edition',
    year: 1861,
    blurb:
      'A thousand recipes and a thousand opinions on running a household. The Victorian cooking world in one volume.',
    ...arch('bookofhouseholdm0000mrsi'),
    fallbackSearchUrl: 'https://archive.org/search?query=mrs+beeton+book+household+management',
    era: 'Victorian',
    accent: 'ink',
  },
  {
    id: 'white-house-1887',
    title: 'The White House Cook Book',
    issue: 'Ziemann & Gillette edition',
    year: 1887,
    blurb:
      'Recipes from a presidential chef paired with chapters on table service and what to do when a fire breaks out.',
    ...arch('whitehousecookbo00ziem'),
    fallbackSearchUrl: 'https://archive.org/search?query=white+house+cook+book+ziemann',
    era: 'Victorian',
    accent: 'gold',
  },
  {
    id: 'inglenook-1911',
    title: 'The Inglenook Cook Book',
    issue: 'Brethren community edition',
    year: 1911,
    blurb:
      'Plainspoken Brethren home cooking submitted by readers of a religious magazine. Pickles, pies, and pot-lucks.',
    ...arch('inglenookcookboo00unse'),
    fallbackSearchUrl: 'https://archive.org/search?query=inglenook+cook+book',
    era: 'Edwardian',
    accent: 'sage',
  },
  {
    id: 'settlement-1903',
    title: 'The Settlement Cook Book',
    issue: 'First edition',
    year: 1903,
    blurb:
      'A Milwaukee settlement house cookbook that became one of America\'s best-loved community cookbooks. Jewish home cooking at its core.',
    ...arch('settlementcookbo00kand'),
    fallbackSearchUrl: 'https://archive.org/search?query=settlement+cook+book+kander',
    era: 'Edwardian',
    accent: 'terracotta',
  },
  {
    id: 'rumford-1908',
    title: 'The Rumford Complete Cook Book',
    issue: 'Wallace edition',
    year: 1908,
    blurb:
      'A turn-of-the-century classic of plain home baking. Soda biscuits, johnnycakes, and the rise of the chemical leavener.',
    ...arch('rumfordcompletec00wall'),
    fallbackSearchUrl: 'https://archive.org/search?query=rumford+complete+cook+book',
    era: 'Edwardian',
    accent: 'gold',
  },
  {
    id: 'american-cookery-1796',
    title: 'American Cookery',
    issue: 'Amelia Simmons, first American cookbook',
    year: 1796,
    blurb:
      'The first cookbook written by an American, for Americans. Includes the first printed recipes for cornmeal pudding, spruce beer, and pumpkin pie.',
    ...arch('american-cookery-by-amelia-simmons'),
    fallbackSearchUrl: 'https://archive.org/search?query=american+cookery+amelia+simmons',
    era: 'Victorian',
    accent: 'ink',
  },
  {
    id: 'choice-cookery-1889',
    title: 'Choice Cookery',
    issue: 'Owen edition',
    year: 1889,
    blurb:
      'Catherine Owen\'s sharp, plainspoken guide for "small families and slender means." Charming, opinionated, useful.',
    ...arch('choicecookery00owenrich'),
    fallbackSearchUrl: 'https://archive.org/search?query=choice+cookery+catherine+owen',
    era: 'Victorian',
    accent: 'sage',
  },
];

export interface ModernSite {
  id: string;
  name: string;
  url: string;
  blurb: string;
  region: string;
  free: 'fully free' | 'mostly free' | 'some free';
  category: 'general' | 'baking' | 'global' | 'healthy' | 'science' | 'community';
  accent: 'terracotta' | 'sage' | 'gold' | 'ink';
}

export const MODERN_SITES: ModernSite[] = [
  {
    id: 'bbc-good-food',
    name: 'BBC Good Food',
    url: 'https://www.bbcgoodfood.com/',
    blurb: 'The biggest free recipe site in the UK. Test kitchen quality, magazine writing.',
    region: 'United Kingdom',
    free: 'fully free',
    category: 'general',
    accent: 'terracotta',
  },
  {
    id: 'eatingwell',
    name: 'EatingWell',
    url: 'https://www.eatingwell.com/',
    blurb: 'A nutrition-led magazine and site. Recipes that pay attention to what is in them.',
    region: 'United States',
    free: 'fully free',
    category: 'healthy',
    accent: 'sage',
  },
  {
    id: 'serious-eats',
    name: 'Serious Eats',
    url: 'https://www.seriouseats.com/',
    blurb: 'The Kenji López-Alt school of cooking. Deeply tested, scientifically argued.',
    region: 'United States',
    free: 'fully free',
    category: 'science',
    accent: 'ink',
  },
  {
    id: 'food52',
    name: 'Food52',
    url: 'https://food52.com/',
    blurb: 'A community-driven food site. Crowd-sourced recipes plus its own editorial test kitchen.',
    region: 'United States',
    free: 'fully free',
    category: 'community',
    accent: 'gold',
  },
  {
    id: 'king-arthur',
    name: 'King Arthur Baking',
    url: 'https://www.kingarthurbaking.com/',
    blurb: 'America\'s oldest flour company runs a free baking school. Sourdough to scones.',
    region: 'United States',
    free: 'fully free',
    category: 'baking',
    accent: 'gold',
  },
  {
    id: 'nyt-cooking',
    name: 'NYT Cooking',
    url: 'https://cooking.nytimes.com/',
    blurb: 'The newspaper\'s recipe vault. A subset is free without subscription.',
    region: 'United States',
    free: 'some free',
    category: 'general',
    accent: 'ink',
  },
  {
    id: 'smitten-kitchen',
    name: 'Smitten Kitchen',
    url: 'https://smittenkitchen.com/',
    blurb: 'Deb Perelman\'s home-tested classics. Cookbook-quality writing on a free blog.',
    region: 'United States',
    free: 'fully free',
    category: 'general',
    accent: 'terracotta',
  },
  {
    id: 'half-baked-harvest',
    name: 'Half Baked Harvest',
    url: 'https://www.halfbakedharvest.com/',
    blurb: 'Tieghan Gerard\'s seasonal cooking. Lush photography, full-flavor recipes.',
    region: 'United States',
    free: 'fully free',
    category: 'general',
    accent: 'gold',
  },
  {
    id: 'the-kitchn',
    name: 'The Kitchn',
    url: 'https://www.thekitchn.com/',
    blurb: 'Daily cooking-as-life writing. Recipes plus the small skills nobody teaches.',
    region: 'United States',
    free: 'fully free',
    category: 'general',
    accent: 'sage',
  },
  {
    id: 'cookie-and-kate',
    name: 'Cookie and Kate',
    url: 'https://cookieandkate.com/',
    blurb: 'Kate Taylor\'s vegetarian cooking. Plant-first food with broad appeal.',
    region: 'United States',
    free: 'fully free',
    category: 'healthy',
    accent: 'sage',
  },
  {
    id: 'olive-magazine',
    name: 'Olive Magazine',
    url: 'https://www.olivemagazine.com/',
    blurb: 'A British food and travel magazine with a generous free archive.',
    region: 'United Kingdom',
    free: 'mostly free',
    category: 'global',
    accent: 'sage',
  },
  {
    id: 'taste',
    name: 'Taste.com.au',
    url: 'https://www.taste.com.au/',
    blurb: 'Australia\'s most-read recipe site. Family cooking, weeknight pace.',
    region: 'Australia',
    free: 'fully free',
    category: 'general',
    accent: 'terracotta',
  },
];
