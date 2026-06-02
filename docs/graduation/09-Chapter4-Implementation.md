# Chapter 4. Implementation

## 4.1 Introduction

This chapter describes the implementation of Zaytoun. It begins with the technology stack and the rationale behind each choice, then walks through the project structure, the main implementation tasks, the problems encountered during development, and the production deployment. The chapter focuses on the practical engineering decisions that turned the analysis and design of Chapter 3 into a working, deployed product.

## 4.2 Technology Stack

The technology stack was selected with three priorities in mind: a short feedback loop during development, a small runtime footprint in production, and a low operational burden once deployed. The full stack is summarized in Table 4.1.

**Table 4.1 Frontend technology stack**

| Layer | Technology | Reason |
|---|---|---|
| Language | TypeScript | Static typing, refactor safety, IDE support |
| UI framework | React 19 | Mature ecosystem, hook based composition |
| Build tool | Vite | Fast dev server, ESM based, modern output |
| Styling | Tailwind CSS | Utility first, design tokens, fast iteration |
| Routing | React Router v6 | Standard client side routing |
| Data fetching | TanStack Query | Caching, retries, stale time, devtools |
| Fuzzy search | Fuse.js | Lightweight, configurable, no server needed |
| PDF export | jsPDF (dynamic import) | Client side PDF, lazy loaded |
| Voice input | Web Speech API | Native to modern browsers |
| Icons | lucide-react v1 | Tree shaken icons, consistent style |
| Fonts | Inter Variable, IBM Plex Sans Arabic | High quality LTR and RTL fonts |
| PWA | vite-plugin-pwa | Service worker generation, manifest |
| Hosting | Vercel | Free tier, fast global edge, easy domain |
| Domain | Spaceship (zaytoun.online) | Custom domain to avoid regional SNI blocks |
| External API | Spoonacular | Established recipe API with free tier |
| Embedded media | YouTube (lite embed) | Public videos, no API key needed |

The decision to avoid a backend was made deliberately. A backend would have added significant operational burden (database, hosting, security, backups) without solving any user facing problem that could not be solved equally well with static data and local storage.

## 4.3 Project Structure

The source code is organized into small, focused folders inside `src/`:

* `src/components/` contains shared UI components: Header, Footer, Layout, SmartSearchInput, MacroCalculator, RecipeCard, ChefCard, MarketCard, FilmCard, DrinkCard, LessonCard, and supporting primitives.
* `src/pages/` contains one file per top level route: HomePage, RecipesPage, ArabCuisinePage, FilmsPage, AcademyPage, MarketsPage, ChefsPage, DrinksPage, ShortsLibraryPage, FitnessPage, FavoritesPage, AboutPage, and the recipe and lesson detail pages.
* `src/data/` contains typed static datasets: `local-recipes.ts`, `arab-cuisine.ts`, `food-films.ts`, `skills-academy.ts`, `world-markets.ts`, `chef-hall.ts`, `drinks-library.ts`, and `shorts-library.ts`. Each file exports both the data and the typed metadata.
* `src/api/` contains the API client and the local fallback. `api/index.ts` is the single entry point that merges Spoonacular results with local recipes.
* `src/lib/` contains utility modules: `search-i18n.ts`, `universal-search.ts`, `format.ts`, and theme and language helpers.
* `src/i18n/` contains the translations file with English and Arabic keys.
* `src/styles/` and `src/index.css` define the global styles, font imports, and dark mode utility overrides.
* `src/types/` contains shared TypeScript types.

This structure scales linearly with the number of content libraries. Adding a new library is a self contained change: a new data file, optionally a new route, and an addition to the universal search index.

## 4.4 Implementation Tasks

The implementation work was carried out as a sequence of tasks. Table 4.2 summarizes the content library sizes at submission time.

**Table 4.2 Content library item counts**

| Library | Items |
|---|---|
| Local recipes (fallback set) | over 50 |
| Arab cuisine dishes | over 20 |
| Food films and documentaries | over 30 |
| Academy lessons | over 40 |
| Learning paths | 6 |
| World markets | over 20 |
| Chef hall | 40 |
| Drinks (hot and cold) | over 20 |
| Short videos | over 2,200 |
| Short categories | 40 |

The following subsections describe the most significant implementation tasks.

### 4.4.1 Smart Search

The smart search is one of the central features of the platform. It lives in the header and is reusable across three variants (desktop pill, mobile drawer, and standalone page).

The implementation lives in three files. The first, `src/lib/search-i18n.ts`, defines a curated Arabic to English term dictionary with over 250 entries, a normalizeArabic helper that strips diacritics and unifies common letter variants (alef, hamza, taa marbouta), a containsArabic helper, an ENGLISH_SYNONYMS map (for example aubergine and eggplant), and the main translateQuery function that returns both the original and translated form of a query.

The second, `src/lib/universal-search.ts`, defines Fuse indices per content type and a flat all items array. It exposes a search function that runs each Fuse index over the input and returns grouped results, and a suggestClosest function that runs the same indices with a relaxed threshold to support the did you mean feature.

The third, `src/components/SmartSearchInput.tsx`, is the React component. It owns the input state, debounces user input, opens a dropdown panel with grouped results, supports voice input through the Web Speech API (with automatic language detection), shows recent and suggested chips when the input is empty, and shows a did you mean card when no direct match is found. Recent searches are persisted under the `zaytoun:recent-searches` key.

### 4.4.2 Universal Content Libraries

Each curated content library is a TypeScript file that exports a typed array. The shorts library is the largest, with over 2,200 entries across 40 categories.

To keep the TypeScript compiler from running into the "type instantiation is excessively deep" issue (TS2590), the category field on each short was typed as `string` rather than as the union of 40 literal categories. The category constants array remains strictly typed, which is what the filter UI relies on.

Each short carries an id, a title, a thumbnail URL, a category, an optional creator handle, and an optional duration. Thumbnails are fetched at runtime from YouTube using the standard `img.youtube.com/vi/<id>/<size>.jpg` pattern, with a maxresdefault to sddefault to hqdefault fallback chain that detects YouTube's gray placeholder by checking the loaded image's natural width.

### 4.4.3 Shorts Feed Player

The shorts feed is rendered as a CSS grid of square thumbnails with a category chip row above it. When the user opens a short, a modal full screen player takes over. The player uses CSS scroll snap on the y axis to deliver a TikTok style snap behavior, and an IntersectionObserver to track which short is currently visible.

To balance smooth scrolling against memory usage, the player keeps a sliding window of three iframes around the current short. As the user scrolls, iframes outside the window are unmounted. Keyboard arrow keys and a swipe gesture both move the focus.

A small detail worth noting is that opening the player locks the body scroll by setting `document.body.style.overflow = 'hidden'` and restores the previous value when the modal closes, to avoid the common bug where the underlying page scrolls behind the modal.

### 4.4.4 Macro Calculator

The macro calculator is a form on the Fitness page. It accepts age, sex, weight (kg), height (cm), activity level (sedentary to athlete), body fat percentage (optional), and a goal (cut, maintain, bulk).

If body fat percentage is provided, the system uses the Katch McArdle formula. Otherwise, it falls back to Mifflin St Jeor. The activity multiplier ranges from 1.2 (sedentary) to 1.9 (athlete). The goal adjustment is minus 20 percent for cut, zero for maintain, and plus 15 percent for bulk. The macro split follows a preset (standard 40/30/30, high protein 40/40/20, or keto 5/35/60), with protein in grams per kilogram clamped to a sensible minimum.

The result panel shows daily calories, protein in grams, carbohydrate in grams, fat in grams, and a recommended water intake based on weight and activity. A download button dynamically imports jsPDF and produces a PDF with the calculated targets and the input parameters.

The form uses string state for each input rather than numeric state. This avoids the well known issue where clearing a numeric input snaps the value back to 0 because `Number(e.target.value)` of an empty string is 0. Each field has a visible label, a placeholder, and a small validation message that appears only when the input is invalid and the field has been touched.

### 4.4.5 Recipe Catalogue with API Fallback

The recipe catalogue is powered by Spoonacular. The free plan permits 150 requests per day. To stay within budget, all queries are cached aggressively in TanStack Query with a long stale time, and the entry point `src/api/index.ts` merges API results with the curated local recipe set.

When the API call fails (rate limit, network error, or simply offline), the merge function returns only the local recipes and a small banner explains the situation. From the user's perspective the page never breaks, even when the API is unavailable.

### 4.4.6 Bilingual Interface

All navigation labels and shared strings are stored in `src/i18n/translations.ts` as a flat key map with English and Arabic values. The language helper toggles the `lang` and `dir` attributes on the html element, switches between Inter and IBM Plex Sans Arabic fonts via CSS variables, and persists the choice in local storage.

Right to left support is implemented with native CSS logical properties where possible and a `.rtl-flip` utility for directional icons such as arrows.

### 4.4.7 Theme System

The theme system uses a `.dark` class on the html element. The Tailwind configuration extends a palette with cream, ink, terracotta, and sage tokens. Dark mode is implemented as a set of utility overrides in `src/index.css` that map light tokens to their dark equivalents, so existing class names continue to work without adding `dark:` variants on hundreds of elements.

### 4.4.8 Progressive Web App

The site is registered as a progressive web app via vite-plugin-pwa. The service worker uses a NetworkFirst strategy for HTML and a CacheFirst strategy for static assets. The manifest defines an Olive themed icon set and the standalone display mode.

The service worker registration is configured with `skipWaiting` and `clientsClaim`, so a new version of the site takes effect on the next navigation.

### 4.4.9 Routing and Scroll Management

Routing is handled by React Router v6. The Layout component wraps every route with the global Header and Footer, and includes a ScrollManager that handles hash navigation. When the user navigates to a URL containing a hash, ScrollManager polls up to twenty times at eighty millisecond intervals to find the target element, then scrolls it into view. This is necessary because lazy loaded sections may not yet be in the DOM when the navigation completes.

### 4.4.10 Production Deployment

The site is deployed on Vercel, with a custom domain `zaytoun.online` purchased from Spaceship. A `vercel.json` file rewrites all non file routes to `/index.html` so client side routes resolve correctly. Cache headers are configured for the static asset folders.

The Open Graph image is generated by `scripts/generate-og-image.mjs` using Sharp. It produces a 1200 by 630 image with the Olive logo circle and the Zaytoun brand text, which is referenced from `index.html` via the `og:image` meta tag.

## 4.5 Problems Encountered and Solutions

Several non trivial problems arose during implementation. The most significant ones are listed in Table 4.3 and described below.

**Table 4.3 Problems encountered and applied fixes**

| Problem | Root cause | Fix |
|---|---|---|
| ISP blocked default Vercel subdomain | Jordanian mobile ISP blocks `*.vercel.app` at SNI level | Purchased custom domain `zaytoun.online`, pointed A and CNAME to Vercel |
| 404 on internal route `/drinks` | SPA needs server side rewrite, plus stale service worker | Added `vercel.json` rewrite, bumped SW version |
| Sticky header broke after CSS change | `overflow-y: scroll` on `html` and `overflow-x: clip` on `body` interfere with sticky | Replaced clip with `max-width: 100vw`, used `scrollbar-gutter: stable` |
| Horizontal page shake on mobile scroll | Staggered translate Y animation on recipe cards plus vh changes from iOS Safari URL bar | Removed the animation, switched to `min-h-[100dvh]` |
| Missing translation key `nav.supportSavora` | Site was rebranded to Zaytoun but a header call site still used the old key | Renamed key to `nav.supportZaytoun` and updated all call sites |
| Black Open Graph share image, em-dashes in metadata | OG image not generated, metadata copy contained em-dashes | Wrote `generate-og-image.mjs`, replaced em-dashes with periods in `index.html` |
| YouTube thumbnail showed gray placeholder | maxresdefault returns a 120 by 90 gray image when missing, never triggering onError | onLoad handler checks `naturalWidth <= 120` and falls back through sd then hq |
| Specific broken YouTube IDs | Some referenced YouTube videos were removed by their owners | Replaced the affected videos with verified alternatives |
| TS2590 union type too complex | Shorts category as a 40 literal union times 2,200 entries triggered TypeScript depth limit | Loosened the shorts category type to `string`; kept the SHORT_CATEGORIES const strict |
| Macro calculator inputs reset to 0 on clear | `Number('')` is 0 in JavaScript | Switched the inputs to string state with explicit number parsing on submit |
| Macro calculator labels invisible | The site wide `.eyebrow` class has `display: none !important` for editorial reasons | Replaced eyebrow labels with a dedicated `Label` component |
| `/files` cache mismatch after deploy | Service worker still served the previous build | NetworkFirst strategy for HTML, plus bumped cache version on each deploy |
| Hash deep links scrolled to top | The target element was not in the DOM yet when navigation completed | ScrollManager polls for the element up to 20 attempts at 80 ms intervals |

Each of these problems was resolved before the production cut. The lessons learned are recorded here both for the academic record and as a reference for any future maintainer.

## 4.6 Deployment

The deployment pipeline is intentionally simple. The repository is connected to Vercel through a GitHub integration. Every push to the `main` branch triggers a build (`vite build`) and a production deployment. Preview deployments are created for branches, but the project owner controls promotion to production manually.

The DNS configuration uses a Spaceship account. The apex record points `@` to Vercel's expanded apex IP, and a CNAME record points `www` to the Vercel DNS hostname. SSL certificates are managed automatically by Vercel.

After the first production deployment the site was tested on the following devices and networks:

* Desktop on Edge, Chrome, and Firefox (Windows 11) on a wired connection.
* Desktop on Safari (macOS) through a borrowed laptop.
* Mobile on Chrome (Android) on a Jordanian mobile network.
* Mobile on Safari (iPad) on a Jordanian mobile network.

The desktop and Android tests passed immediately. The iPad on the mobile network initially failed with `ERR_CONNECTION_RESET`, which was traced to the SNI block on `*.vercel.app`. After moving to the custom `zaytoun.online` domain, the iPad test also passed.
