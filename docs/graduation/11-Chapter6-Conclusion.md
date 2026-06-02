# Chapter 6. Conclusion and Future Work

## 6.1 Conclusion

This graduation project set out to address a real and observable gap in the food content landscape: mainstream recipe sites are heavily monetized, slow on mobile networks, weak on Arabic, and shallow on regional cuisine, while existing Arabic platforms have not kept pace with modern design and search expectations. Zaytoun was designed and built as a single page web platform that combines recipe discovery, Arab cuisine, food films, structured lessons, market and chef libraries, drinks, and a short video feed into one cohesive experience, with first class support for both Arabic and English.

The platform was implemented over the course of one academic year using a modern, type safe frontend stack centered on React, TypeScript, Vite, and Tailwind CSS, with TanStack Query for data fetching, Fuse.js for fuzzy search, jsPDF for client side document export, and the progressive web app pattern for offline friendly behavior. Recipe data is served through the Spoonacular API with a curated local fallback, while editorial libraries are maintained as typed static datasets that ship with the build.

By the end of the implementation phase the platform was deployed to production at zaytoun.online and verified against twenty defined use cases on multiple browsers and devices, including devices on Jordanian mobile networks. The smart search component supports Arabic input, fuzzy matching, voice queries, recent and suggested chips, and a "did you mean" fallback. The macro calculator implements the Mifflin St Jeor and Katch McArdle formulas and produces a downloadable PDF. The shorts library contains over two thousand verified short videos across forty categories. The interface follows a single editorial design system across all pages, with no advertising and no third party tracking.

In short, the project achieved each of the objectives stated in Chapter 1. The result is a production grade web platform that is faster, cleaner, and more culturally relevant than the public alternatives reviewed in Chapter 2.

## 6.2 Strengths

The following aspects of the project worked particularly well and are worth highlighting:

1. **Editorial design.** The single visual design system, with a controlled color palette and a quiet typography stack, gives the site a magazine like feel that distinguishes it from the cluttered alternatives.

2. **Smart search.** The combination of an Arabic to English term lexicon, Fuse.js fuzzy matching, English synonyms, voice input, recent and suggested chips, and the "did you mean" fallback gives the search a level of polish that is not common even on much larger platforms.

3. **Bilingual experience.** Full Arabic right to left support, including an Arabic optimized font and translated navigation, was treated as a first class concern rather than an afterthought.

4. **No backend, low operational burden.** The decision to ship curated content as typed static data and to keep user state in local storage means the platform has zero server side maintenance overhead once deployed.

5. **Mobile first performance.** The lite YouTube embed pattern, code splitting, dynamic imports, dynamic viewport height, and the scrollbar gutter handling combine to make the site smooth on real mobile devices.

6. **Production grade deployment.** The custom domain, the SPA rewrite, the Open Graph metadata, the share image generator, and the manual cross device testing represent a level of operational seriousness that is rare in undergraduate projects.

7. **Content breadth.** With over two thousand short videos, dozens of regional dishes, films, lessons, markets, chefs, and drinks, the platform delivers a meaningful amount of curated content rather than a shell.

## 6.3 Weaknesses

The project also has limitations that should be acknowledged honestly:

1. **No automated test suite.** Unit and integration testing was performed manually during development. A formal Vitest or Jest configuration with snapshot and behavioral tests is not yet present.

2. **No backend, no user accounts.** Favorites, progress, and preferences live only on the device. A user who switches devices loses their state.

3. **No content management interface.** Adding a new dish, film, or lesson requires editing the source code and redeploying. There is no admin panel.

4. **Recipe API budget.** The free Spoonacular tier allows only 150 requests per day, which constrains how aggressively the recipe search can be exercised in a real production setting.

5. **No professional editorial review.** The curated libraries were assembled by a single developer. A professional food editor or a regional historian would likely refine the content further.

6. **Limited analytics.** Because no tracking is used, the platform owner has limited insight into how the site is actually used, beyond direct user feedback.

7. **Single language pair.** The site supports English and Arabic only. Other major languages (French, Turkish, Urdu) are not yet handled.

## 6.4 Future Work

A number of natural extensions to the project are possible and recommended:

1. **Automated test suite.** Add Vitest with unit tests for the utility modules in `src/lib/`, snapshot tests for the main React components, and at least one end to end test using Playwright to walk the home page, the recipe detail page, and the macro calculator.

2. **User accounts and cloud sync.** Add an optional account layer (for example, using Clerk or Supabase Auth) that lets users sync favorites, progress, and macros across devices, while preserving the no account default for casual visitors.

3. **Content management panel.** Build a small admin interface for the project owner to add, edit, and curate content libraries without redeploying. This would lower the barrier to keeping the libraries fresh.

4. **Self hosted recipe data.** Reduce dependence on the Spoonacular API by indexing public recipe corpora and serving them through a self hosted search backend, lifting the daily request budget entirely.

5. **More languages.** Extend the i18n layer to French and Turkish, both of which are widely spoken in the broader food ecosystem of the region. Each language would require both translated UI strings and translated dish names in the smart search lexicon.

6. **Personalized recommendations.** Use the local favorites and the local viewing history to recommend recipes, dishes, and shorts. The personalization can run entirely on the device, preserving the no tracking guarantee.

7. **Cook along mode.** Implement a dedicated cook along view that uses the Wake Lock API to keep the screen on, reads steps out loud using the Web Speech API speech synthesis, and includes a simple kitchen timer panel.

8. **Shopping list and meal planning.** Allow users to add ingredients to a shopping list and to plan meals across a week, with carryover handling for partially used ingredients.

9. **Community features.** Add an optional comments section per recipe and per dish, with light moderation tools. This would require a backend layer but would also create a sense of community.

10. **Mobile app shell.** Consider a thin React Native or Capacitor wrapper for the iOS and Android stores, while keeping the web platform as the source of truth.

11. **Editorial partnerships.** Reach out to food writers, historians, and chefs in the region for guest essays and curated lists, especially for the Arab cuisine and films libraries. This would elevate the platform from a personal project to a regional reference.

12. **Accessibility deep audit.** Engage an accessibility specialist to perform a full audit and produce a remediation list, especially around the modal player and the macro calculator form.

These extensions, taken together, would move Zaytoun from a strong graduation project to a sustainable consumer product. Each one is well scoped and could be implemented incrementally without disturbing the current architecture.

This concludes the report. The project demonstrates that it is possible, even within the constraints of a single developer graduation project, to ship a real, deployed, culturally aware web platform that respects the user, handles Arabic content properly, and treats food as a serious editorial domain.
