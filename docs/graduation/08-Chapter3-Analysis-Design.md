# Chapter 3. Analysis and Design

## 3.1 Introduction

This chapter presents the analysis and design of the Zaytoun platform. It begins with the identification of stakeholders, then lists the functional and non functional requirements, the use case diagram and its descriptions, the constraints under which the system is built, and finally the system architecture and data model. The chapter follows the structure recommended by the Department of Computer Information Systems for graduation projects.

The analysis was conducted iteratively. Early use cases were drafted before implementation, refined as the application took shape, and finalized once the production deployment had been verified on real devices. This iterative approach is appropriate for a single developer project where the analyst and the implementer are the same person.

## 3.2 Stakeholders

A stakeholder is any party who is affected by the system or who can affect it. For Zaytoun, stakeholders are grouped into primary stakeholders, who interact with the platform directly, and secondary stakeholders, who are indirectly affected.

### 3.2.1 Primary Stakeholders

1. **Home cooks.** The largest user group. They visit the site to find a recipe, compare options, follow steps, and save favorites for later.

2. **Arab cuisine enthusiasts.** Users who specifically look for regional Arab dishes with accurate ingredients, steps, and context.

3. **Casual food viewers.** Users who visit for entertainment, browse the films library, scroll the shorts feed, or read about chefs and markets.

4. **Fitness conscious users.** Users who want to calculate their daily macronutrient targets and use the fitness section of the platform.

5. **Cooking learners.** Users who want to follow structured lessons through the academy, track their progress, and improve specific techniques.

6. **The developer.** As the sole developer and maintainer, the project owner is also a stakeholder, since the system must be maintainable, modular, and reasonable to extend.

7. **The supervisor and examination committee.** They are stakeholders in the academic sense, evaluating the work against the standards of the Department of Computer Information Systems.

### 3.2.2 Secondary Stakeholders

1. **Content owners.** YouTube channels and creators whose public videos are embedded as references in the curated libraries.

2. **External API providers.** Spoonacular, whose recipe API powers the main recipe catalogue.

3. **Hosting providers.** Vercel, which hosts the platform, and Spaceship, which provides the custom domain.

4. **The Department of Computer Information Systems.** The academic department under which the project is evaluated.

5. **Future users.** People who may extend, fork, or contribute to the project after submission.

## 3.3 Functional Requirements

The functional requirements describe what the system shall do. They are derived from the project objectives in Chapter 1 and the gaps identified in Chapter 2.

**Table 3.1 Functional requirements summary**

| ID | Requirement |
|---|---|
| FR1 | The system shall allow the user to search recipes by name, ingredient, cuisine, and dietary tag. |
| FR2 | The system shall display detailed recipe pages with ingredients, steps, nutrition, and a video reference where available. |
| FR3 | The system shall allow the user to mark a recipe as a favorite and persist favorites locally on the device. |
| FR4 | The system shall display a library of Arab dishes with full ingredients, steps, and verified video references. |
| FR5 | The system shall display a library of food films and documentaries with director, year, synopsis, and a video link. |
| FR6 | The system shall provide an academy section with curated lessons, learning paths, and a local progress tracker. |
| FR7 | The system shall display an atlas of food markets, each with location, specialty, and a video tour. |
| FR8 | The system shall display a hall of chefs grouped by region, with nationality, signature dish, and a representative video. |
| FR9 | The system shall display a library of drinks across hot and cold categories. |
| FR10 | The system shall provide a vertical scroll snap short video feed with category filters and an in app player modal. |
| FR11 | The system shall provide a macronutrient calculator that computes daily targets and exports them as PDF. |
| FR12 | The system shall provide a smart global search component with fuzzy matching, Arabic and English input, voice input, recent and suggested queries, and a did you mean fallback. |
| FR13 | The system shall provide an Arabic right to left interface and an English left to right interface, selectable by the user. |
| FR14 | The system shall offer a light and dark theme, selectable by the user and persisted on the device. |
| FR15 | The system shall function as an installable progressive web app with offline access to previously visited pages. |
| FR16 | The system shall handle client side routing for all internal links without server round trips. |
| FR17 | The system shall expose correct Open Graph and Twitter Card metadata for social sharing. |
| FR18 | The system shall not run advertising scripts, tracking cookies, or analytics that violate the user's privacy. |
| FR19 | The system shall display content even when the recipe API is rate limited, by falling back to a curated local catalogue. |
| FR20 | The system shall provide a cookies preference banner and allow the user to reset stored preferences. |

## 3.4 Use Case Diagram

The actors interacting with the system are:

1. **Visitor.** Any user who opens the platform in a browser. All features of the platform are available to the visitor without registration.

2. **Returning user.** A visitor who has previously used the platform on the same device, so that their favorites, theme, language, and progress are restored from local storage.

3. **External API.** Spoonacular, which is invoked indirectly when the user performs a recipe search.

4. **External video platform.** YouTube, which serves the embedded videos referenced from the curated libraries.

Figure 3.1 (see attached diagrams folder) shows the use case diagram. The main use cases are:

| Use Case ID | Use Case Name |
|---|---|
| UC1 | Search recipes |
| UC2 | View recipe details |
| UC3 | Save and remove favorite |
| UC4 | Browse Arab cuisine library |
| UC5 | Browse food films library |
| UC6 | Follow a learning path |
| UC7 | Mark a lesson as complete |
| UC8 | Browse markets atlas |
| UC9 | Browse chef hall |
| UC10 | Browse drinks library |
| UC11 | Browse shorts feed |
| UC12 | Filter shorts by category |
| UC13 | Calculate macros |
| UC14 | Export macros as PDF |
| UC15 | Use smart search globally |
| UC16 | Use voice search |
| UC17 | Switch language |
| UC18 | Switch theme |
| UC19 | Accept or reset cookies preferences |
| UC20 | Install as a progressive web app |

## 3.5 Use Case Descriptions

The following sections describe the most important use cases in detail. Each description includes the action performed, the precondition, the post condition, and at least one alternative flow.

### UC1. Search Recipes

* **Action.** The user types a query into the global search input. The system performs a fuzzy search across the recipe catalogue and curated libraries and displays grouped results.
* **Precondition.** The user has opened the platform in a modern browser with network connectivity.
* **Post condition.** A list of matching results is shown, grouped by content type, with a "did you mean" suggestion if no direct match is found.
* **Alternative flow.** If the query contains Arabic text, the system translates the query to English using its internal lexicon and performs the search using both the original and the translated text. If the recipe API is rate limited, only curated results are shown and a small notice explains the situation.

### UC2. View Recipe Details

* **Action.** The user clicks a recipe card. The system fetches detailed information for the recipe and renders the recipe detail page.
* **Precondition.** A search has been performed or the user has navigated directly to a recipe URL.
* **Post condition.** The recipe detail page is rendered with ingredients, steps, and a video reference if available.
* **Alternative flow.** If the recipe detail fetch fails, the system renders a friendly error state with a retry button.

### UC3. Save and Remove Favorite

* **Action.** The user toggles the heart icon on a recipe card or detail page. The recipe identifier is added to or removed from the favorites list stored locally.
* **Precondition.** A recipe is displayed and the user has interacted with its card or detail page.
* **Post condition.** The favorites list in local storage is updated. The favorites page reflects the change immediately.
* **Alternative flow.** If local storage is disabled (private browsing mode), the system shows the favorite as toggled in memory but warns that it will not persist.

### UC4. Browse Arab Cuisine Library

* **Action.** The user navigates to the Arab Cuisine page. The system renders a grid of dishes, each with name, region, ingredients summary, and a thumbnail.
* **Precondition.** The user opens the Arab Cuisine route.
* **Post condition.** The library is visible and individual dishes can be opened for full details.
* **Alternative flow.** The user filters by region or by dietary tag, and the grid updates without a page reload.

### UC5. Browse Food Films Library

* **Action.** The user navigates to the Films page. The system renders a magazine style grid of food documentaries.
* **Precondition.** The user opens the Films route.
* **Post condition.** The library is visible and individual films can be opened for full details.
* **Alternative flow.** The user filters by year or by topic.

### UC6. Follow a Learning Path

* **Action.** The user opens the Academy page, selects a learning path, and proceeds to its first lesson.
* **Precondition.** The user opens the Academy route.
* **Post condition.** The first lesson of the selected path is displayed.
* **Alternative flow.** The user resumes a previously started path. The system reads the local progress and opens the next unfinished lesson.

### UC7. Mark a Lesson as Complete

* **Action.** The user clicks the "mark as complete" button on a lesson page. The system writes the completion to local storage.
* **Precondition.** A lesson is open.
* **Post condition.** The lesson is marked as complete in the local progress map. The path progress indicator is updated.
* **Alternative flow.** The user unchecks a previously completed lesson. The completion is removed.

### UC8. Browse Markets Atlas

* **Action.** The user navigates to the Markets page. The system renders an atlas of food markets with location, specialty, and a video tour.
* **Precondition.** The user opens the Markets route.
* **Post condition.** The atlas is visible and individual markets can be opened.
* **Alternative flow.** The user filters by region.

### UC9. Browse Chef Hall

* **Action.** The user navigates to the Chefs page. The system renders a grid of chefs grouped by region.
* **Precondition.** The user opens the Chefs route.
* **Post condition.** The grid is visible and individual chefs can be opened.
* **Alternative flow.** The user filters by region or by signature cuisine.

### UC10. Browse Drinks Library

* **Action.** The user navigates to the Drinks page. The system renders the drinks library across hot and cold categories.
* **Precondition.** The user opens the Drinks route.
* **Post condition.** The library is visible and individual drinks can be opened.
* **Alternative flow.** The user filters by category or by warm versus cold.

### UC11. Browse Shorts Feed

* **Action.** The user navigates to the Shorts page. The system renders a vertical scroll snap feed of short videos.
* **Precondition.** The user opens the Shorts route.
* **Post condition.** Short videos can be played in an in app modal.
* **Alternative flow.** The user uses keyboard arrows to navigate the feed.

### UC12. Filter Shorts by Category

* **Action.** The user selects one of the category chips above the shorts grid. The system filters the visible shorts.
* **Precondition.** The shorts page is open.
* **Post condition.** Only shorts belonging to the selected category are visible.
* **Alternative flow.** The user resets the filter.

### UC13. Calculate Macros

* **Action.** The user enters age, sex, weight, height, activity level, body fat percentage (optional), and goal. The system computes basal metabolic rate using Mifflin St Jeor (or Katch McArdle if body fat percent is provided), applies the activity multiplier, applies the goal adjustment, and computes carbohydrate, protein, and fat targets.
* **Precondition.** The user has opened the Fitness page.
* **Post condition.** The macros panel displays daily calories, protein, carbohydrate, fat, and water.
* **Alternative flow.** The user selects a preset (standard, high protein, keto) and the macro split is adjusted accordingly.

### UC14. Export Macros as PDF

* **Action.** The user clicks the "download PDF" button on the macro calculator. The system dynamically imports jsPDF and produces a downloadable PDF.
* **Precondition.** Macros have been calculated.
* **Post condition.** The browser triggers a file download.
* **Alternative flow.** The dynamic import fails because the user is offline. The button is disabled and a tooltip explains the situation.

### UC15. Use Smart Search Globally

* **Action.** The user opens the header search and types a query. The system performs a universal search across all content libraries.
* **Precondition.** The user is on any page of the platform.
* **Post condition.** A grouped results dropdown is shown with results from recipes, Arab cuisine, films, academy, markets, chefs, and drinks.
* **Alternative flow.** No direct match is found. The system displays a "did you mean" suggestion based on a relaxed fuzzy threshold.

### UC16. Use Voice Search

* **Action.** The user clicks the microphone icon inside the search input. The system requests microphone permission, captures a voice query through the Web Speech API, and runs the resulting text through the smart search.
* **Precondition.** The browser supports the Web Speech API and the user grants microphone permission.
* **Post condition.** Search results are shown.
* **Alternative flow.** Permission is denied or the API is not supported. The microphone icon is hidden or disabled with a tooltip explanation.

### UC17. Switch Language

* **Action.** The user clicks the language toggle. The system switches between English left to right and Arabic right to left layout.
* **Precondition.** The user is on any page of the platform.
* **Post condition.** All navigation labels, headings, and supported strings switch to the selected language. The chosen language is persisted in local storage.
* **Alternative flow.** The user toggles back. The previous language is restored.

### UC18. Switch Theme

* **Action.** The user clicks the theme toggle. The system switches between light and dark theme.
* **Precondition.** The user is on any page of the platform.
* **Post condition.** The site colors are updated and the chosen theme is persisted in local storage.
* **Alternative flow.** The user resets local data. The theme returns to light by default.

### UC19. Accept or Reset Cookies Preferences

* **Action.** On first visit, the cookies banner is displayed. The user can accept or reject. Returning users can reset their preference from the footer.
* **Precondition.** The user opens the platform.
* **Post condition.** The cookies preference is stored in local storage and the banner is hidden until reset.
* **Alternative flow.** The user resets cookies preferences from the footer.

### UC20. Install as a Progressive Web App

* **Action.** The browser detects that the site meets the progressive web app criteria and offers an install prompt. The user accepts.
* **Precondition.** The user is on a supporting browser and has not already installed the app.
* **Post condition.** A standalone icon is added to the device home screen and the app can be launched in a window without browser chrome.
* **Alternative flow.** The browser does not support progressive web app install (for example, certain iOS versions). The user adds the site manually from the share sheet.

## 3.6 Non Functional Requirements

Non functional requirements describe how the system shall behave rather than what it shall do. They are grouped into execution qualities (observable at runtime) and evolution qualities (observable during development and maintenance).

### 3.6.1 Execution Qualities

1. **Performance.** The first contentful paint on a mid range mobile device on a 4G connection shall not exceed three seconds. The site uses code splitting, dynamic imports, and a YouTube lite embed pattern to keep the initial bundle small.

2. **Mobile friendliness.** The site shall be fully usable on screens as small as 360 pixels wide. All layouts are responsive and use a dynamic viewport height to avoid the iOS Safari URL bar issue.

3. **Availability.** The site shall be available 99% of the time, in line with the underlying Vercel uptime guarantee for hobby projects.

4. **Usability.** The site shall use a single design system, with consistent typography, color tokens, and spacing scale. Navigation shall not require more than two clicks to reach any major section.

5. **Accessibility.** Interactive elements shall be reachable by keyboard. Images shall have alt text where it adds value. Color contrast in the default theme shall meet WCAG AA for body text.

6. **Internationalization.** The site shall present a complete Arabic right to left layout when Arabic is selected. Fonts and spacing shall remain visually consistent in both directions.

7. **Privacy.** The site shall not run third party advertising or tracking scripts. The only data stored is user preferences and favorites, all in local storage on the device.

8. **Security.** The site shall avoid using innerHTML with user input and shall sanitize content embedded from external sources where applicable. API keys shall not be embedded in the client bundle.

### 3.6.2 Evolution Qualities

1. **Maintainability.** Code shall be organized into small, focused modules. TypeScript shall be used throughout to catch errors at compile time.

2. **Testability.** Pure functions and utility modules shall be testable in isolation. UI components shall be small enough to be visually inspected.

3. **Extensibility.** Adding a new content library shall require only a typed dataset file and a new route. The smart search index shall be extensible without modifying the search component.

4. **Portability.** The site shall run on any modern browser. The build output shall be a set of static assets that can be hosted on any static host.

5. **Documentation.** The codebase shall be self explanatory through clear naming and small components. A high level README and this graduation report shall describe the overall structure.

**Table 3.2 Non functional requirements summary**

| ID | Quality | Target |
|---|---|---|
| NFR1 | Performance (FCP) | Under 3 seconds on 4G mid range device |
| NFR2 | Mobile width | 360 px or wider |
| NFR3 | Availability | 99% |
| NFR4 | Accessibility | WCAG AA body text contrast |
| NFR5 | Internationalization | Full Arabic RTL |
| NFR6 | Privacy | No third party tracking |
| NFR7 | Maintainability | TypeScript throughout |
| NFR8 | Extensibility | New library in less than one day |

## 3.7 Constraints

The project operates under the following constraints:

1. **Single developer.** The project is implemented and maintained by one person. Scope is limited to what can be reasonably built and verified in one academic year.

2. **No paid infrastructure.** The project uses free hosting (Vercel hobby plan) and free or paid only at the lowest tier API services (Spoonacular free plan with a 150 request per day limit).

3. **Recipe API budget.** The free Spoonacular tier is limited to 150 requests per day. The platform must cache results aggressively and fall back to curated local content when the budget is exhausted.

4. **No backend database.** All curated content ships as typed static data inside the client bundle. User preferences are stored in browser local storage. There is no central database to maintain.

5. **No advertising.** As a matter of editorial principle, no advertising or tracking scripts are loaded.

6. **Bilingual interface.** The system must support both English and Arabic. Adding a third language would require a noticeable refactor.

7. **Browser support.** The system targets modern evergreen browsers (recent Chrome, Edge, Safari, Firefox). It is not expected to work on Internet Explorer.

8. **Regional network conditions.** The system must remain usable on Jordanian mobile networks, which sometimes block specific domains at the SNI level. This influenced the decision to deploy under a custom domain rather than the default Vercel subdomain.

## 3.8 System Architecture

Zaytoun follows a client heavy architecture. The browser is the application runtime. The server (Vercel) only serves static assets and rewrites unknown routes to the application entry point. External APIs (Spoonacular and YouTube) are accessed directly from the browser through HTTPS.

The high level architecture is shown in Figure 3.2. The main layers are:

1. **Presentation layer.** React components organized by route and by reusable UI primitives. Routing is handled by React Router v6.

2. **Data layer.** TanStack Query manages remote data fetching, caching, retries, and stale time. Local storage handles user preferences and favorites.

3. **Search layer.** A universal search module wraps Fuse.js indices over the curated libraries. A translation lexicon and a synonym map normalize input queries.

4. **Content layer.** Typed static datasets define recipes (local set), Arab cuisine, films, lessons, markets, chefs, drinks, and shorts. Each entry references its source video where applicable.

5. **External services.** The Spoonacular API powers the global recipe catalogue. YouTube serves embedded videos through standard iframe embeds with the lite embed pattern to reduce initial load.

The data flow for a recipe search is shown in Figure 3.3. The user types a query into the smart search input, the input is normalized and translated if needed, and three parallel paths run: the curated libraries are queried through Fuse indices, the recipe API is called through TanStack Query, and the recent queries history is updated.

## 3.9 Data Model

Because the platform has no backend database, the data model is split into two parts: typed static datasets that ship with the build, and browser side persisted state.

Typed static datasets follow the structure shown in Figure 3.4. Each library defines its own item type and a metadata constant. For example, the shorts library exposes a SHORT_CATEGORIES constant and a SHORTS array of items, where each item has an id, a title, a thumbnail URL, a duration, a category, and an optional creator handle. The recipe library defines a LocalRecipe type with id, title, image, summary, ingredients, steps, cuisines, dietary tags, and source. The Arab cuisine library, films, academy, markets, chefs, and drinks each follow similar patterns.

Browser side persisted state lives in local storage under a small set of namespaced keys:

* `zaytoun:theme` for the selected theme.
* `zaytoun:language` for the selected language.
* `zaytoun:favorites` for the array of recipe IDs marked as favorite.
* `zaytoun:academy:progress` for the map of lesson IDs to a completed boolean.
* `zaytoun:macros:v1` for the most recent macro calculator inputs and results.
* `zaytoun:recent-searches` for the array of recent search queries.
* `zaytoun:cookies` for the cookies preference value.

This minimalist data model is intentional. It keeps the platform stateless on the server, removes the need for a database, and lets the user clear their data at any time by clearing site data in the browser.
