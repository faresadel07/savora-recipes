# Appendices

## Appendix A. Selected Source Code Listings

This appendix contains a small selection of representative source code listings from the Zaytoun codebase. The full source code is available in the project repository on the developer's local machine. The selection focuses on modules that illustrate the central technical ideas described in Chapter 4.

### A.1 Arabic Search Normalization (`src/lib/search-i18n.ts`)

```ts
const DIACRITICS = /[ً-ٰٟ]/g;

export function normalizeArabic(input: string): string {
  return input
    .normalize('NFKD')
    .replace(DIACRITICS, '')
    .replace(/[إأآا]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .trim()
    .toLowerCase();
}

export function containsArabic(input: string): boolean {
  return /[؀-ۿ]/.test(input);
}

export function translateQuery(input: string): { original: string; english: string | null } {
  const trimmed = input.trim();
  if (!trimmed) return { original: '', english: null };
  if (!containsArabic(trimmed)) {
    return { original: trimmed, english: null };
  }
  const normalized = normalizeArabic(trimmed);
  const english = AR_TO_EN[normalized] ?? null;
  return { original: trimmed, english };
}
```

### A.2 Macronutrient Calculation Core (`src/components/MacroCalculator.tsx`)

```ts
function mifflinStJeor(args: { weight: number; height: number; age: number; sex: Sex }): number {
  const { weight, height, age, sex } = args;
  const base = 10 * weight + 6.25 * height - 5 * age;
  return sex === 'male' ? base + 5 : base - 161;
}

function katchMcArdle(args: { weight: number; bodyFatPct: number }): number {
  const { weight, bodyFatPct } = args;
  const lbm = weight * (1 - bodyFatPct / 100);
  return 370 + 21.6 * lbm;
}

const ACTIVITY_MULTIPLIERS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
};

const GOAL_ADJUSTMENTS: Record<Goal, number> = {
  cut: 0.8,
  maintain: 1.0,
  bulk: 1.15,
};
```

### A.3 Universal Search Setup (`src/lib/universal-search.ts`)

```ts
const RECIPE_INDEX = new Fuse(localRecipes, {
  keys: ['title', 'cuisines', 'dietary', 'summary'],
  threshold: 0.35,
  ignoreLocation: true,
});

const ARAB_INDEX = new Fuse(arabCuisine, {
  keys: ['name', 'region', 'ingredients'],
  threshold: 0.35,
});

const SUGGEST_INDEX = new Fuse(allItems, {
  keys: ['title', 'name'],
  threshold: 0.55,
  ignoreLocation: true,
});

export function suggestClosest(query: string): string | null {
  const hit = SUGGEST_INDEX.search(query, { limit: 1 })[0];
  return hit ? (hit.item.title ?? hit.item.name ?? null) : null;
}
```

### A.4 SPA Rewrite (`vercel.json`)

```json
{
  "rewrites": [
    { "source": "/((?!.*\\.).*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

### A.5 Service Worker Registration (`vite.config.ts`)

```ts
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/i\.ytimg\.com\//,
        handler: 'CacheFirst',
        options: { cacheName: 'youtube-thumbs', expiration: { maxAgeSeconds: 60 * 60 * 24 * 7 } },
      },
      {
        urlPattern: ({ request }) => request.mode === 'navigate',
        handler: 'NetworkFirst',
        options: { cacheName: 'html', networkTimeoutSeconds: 5 },
      },
    ],
  },
  manifest: {
    name: 'Zaytoun',
    short_name: 'Zaytoun',
    theme_color: '#1f1c18',
    background_color: '#fbf6ef',
    display: 'standalone',
    start_url: '/',
  },
});
```

## Appendix B. Sample Screenshots

This appendix lists the screenshots referenced from the report. The actual image files are stored in the `docs/graduation/screenshots/` folder of the project repository.

| File | Description |
|---|---|
| home-desktop.png | Home page on a desktop browser at 1440 px width |
| home-mobile.png | Home page on a mobile browser at 390 px width |
| recipe-detail.png | Recipe detail page with ingredients, steps, and embedded video |
| arab-cuisine-mansaf.png | Arab Cuisine detail page for mansaf |
| smart-search-arabic.png | Smart search dropdown with Arabic input |
| shorts-feed.png | Shorts feed grid with category chips and the in app player open |
| macro-calculator.png | Macro calculator results panel and PDF download button |
| films-grid.png | Food films library magazine grid |
| academy-path.png | Academy learning path with progress indicator |
| chef-hall.png | Chef hall grid grouped by region |
| markets-atlas.png | World markets atlas |
| drinks-library.png | Drinks library split into hot and cold sections |
| dark-mode-home.png | Home page in dark theme |
| pwa-install.png | Progressive web app install prompt on Android |
| lighthouse-mobile.png | Lighthouse audit results on simulated slow 4G |

## Appendix C. Repository and Deployment Information

| Item | Value |
|---|---|
| Project name | Zaytoun |
| Production URL | https://zaytoun.online |
| Local development command | npm run dev |
| Production build command | npm run build |
| Hosting provider | Vercel |
| Domain registrar | Spaceship |
| External recipe API | Spoonacular |
| Source repository location | C:\Users\ViVoBooK\Desktop\recipe-app on the developer's machine |
| Default branch | main |

## Appendix D. Glossary

| Term | Definition |
|---|---|
| BMR | Basal Metabolic Rate. The number of calories the body burns at complete rest. |
| Mifflin St Jeor | A standard formula for estimating BMR using weight, height, age, and sex. |
| Katch McArdle | A BMR formula that uses lean body mass, more accurate when body fat percentage is known. |
| SPA | Single Page Application. A web app that loads one HTML page and updates the view via JavaScript. |
| PWA | Progressive Web App. A web app that uses modern browser features (service workers, manifest) to be installable and offline capable. |
| SNI | Server Name Indication. The TLS extension that lets a server host multiple HTTPS sites on one IP. Some ISPs block traffic based on it. |
| RTL | Right to left, the writing direction used by Arabic. |
| Fuzzy search | A search method that finds matches even when the query contains typos or partial words. |
| Lite embed | A pattern that displays a static thumbnail in place of a heavy iframe until the user clicks play. |
| dvh | A CSS unit equal to one percent of the dynamic viewport height, which adapts to browser UI changes on mobile. |
