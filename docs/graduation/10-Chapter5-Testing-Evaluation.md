# Chapter 5. Testing and Evaluation

## 5.1 Introduction

This chapter describes how the Zaytoun platform was tested and evaluated against the requirements set out in Chapter 3. Because the platform is a single page application without a backend, the testing strategy focuses on three layers: component level checks during development, end to end manual user acceptance testing on real devices and real browsers, and lightweight performance and accessibility audits using widely available tools.

The chapter is intentionally honest about the scope and limits of the testing performed. A single developer graduation project does not have the headcount of a commercial team, so coverage was prioritized toward the high impact paths the user is most likely to walk.

## 5.2 Testing Strategy

The testing strategy is built around four ideas:

1. **TypeScript as a first line of defense.** Because the whole codebase is in TypeScript, an entire class of bugs (missing properties, wrong argument types, misspelled identifiers, dead code paths) is caught by the compiler before the application is ever started. The build step (`vite build`) is therefore part of the test suite in practice.

2. **Manual user acceptance testing on real devices.** The main interaction paths were exercised on real Android, iPadOS, and desktop browsers. Each major feature has a specific UAT script described in section 5.4.

3. **Cross browser smoke checks.** The site was opened in Chrome, Edge, Firefox, and Safari, and each major route was loaded once on each browser, with the developer tools open to catch console errors.

4. **Performance and accessibility audits via Lighthouse and built in browser inspectors.** Lighthouse was run against the production site, both on a wired desktop connection and on a simulated slow 4G connection.

This four part strategy maps cleanly to the four major risk categories for a project of this kind: type level correctness, user flow correctness, browser compatibility, and runtime quality.

## 5.3 Unit and Integration Testing

The codebase is biased toward small, pure utility functions. These functions are easy to reason about by inspection and were verified through targeted manual checks in the browser console during development. The list below summarizes the most important utility level verifications:

* `normalizeArabic` correctly removes diacritics, unifies the alef variants, and converts taa marbouta to haa.
* `translateQuery` returns the original query plus the English translation when Arabic input is detected, and returns the original alone when input is English.
* `containsArabic` returns true for any string containing at least one Arabic letter.
* `expandEnglishSynonyms` returns the union of the original query and any known synonyms (aubergine and eggplant, courgette and zucchini, coriander and cilantro).
* `suggestClosest` returns a single best guess when the main search returns no hits and the relaxed threshold finds at least one candidate.
* `mifflinStJeor` and `katchMcArdle` return values within 2 percent of independently computed reference results for a known set of inputs.
* The activity multiplier table is monotonic from sedentary to athlete.
* `localRecipes` merges correctly with the Spoonacular results, with no duplicate IDs after the merge.
* The thumbnail fallback chain correctly steps from maxresdefault to sddefault to hqdefault when the previous image fails or returns the gray placeholder.

These checks were performed manually rather than as an automated unit test suite. The project did not include a formal Jest or Vitest configuration because the time available was prioritized toward feature work and toward the manual UAT described in the next section. An automated suite is listed as future work in Chapter 6.

Integration level behavior was verified during normal development. Every time a feature was implemented, the developer ran the site locally with `npm run dev`, exercised the relevant flow end to end, and watched the browser console for warnings and errors. The TanStack Query devtools were used to confirm that requests were cached as expected and that the recipe API budget was not being burned unnecessarily.

## 5.4 Manual User Acceptance Testing

Manual UAT was the primary verification method. Each major use case from Chapter 3 has a corresponding manual test script. The scripts were executed against both the local development server and the production deployment.

### Script 1. Recipe Search (UC1, UC2, UC3)

1. Open the site at zaytoun.online.
2. Click the search icon in the header.
3. Type "chicken pasta" in the search input.
4. Verify that the smart search dropdown shows grouped results within roughly one second.
5. Click the first recipe in the results.
6. Verify that the detail page renders with ingredients, steps, and an image.
7. Click the heart icon on the detail page.
8. Navigate to the Favorites page and verify the recipe appears.
9. Reload the page and verify that the favorite is still present.

### Script 2. Arabic Search (UC1, UC15)

1. Open the site and type "دجاج" (chicken in Arabic) in the search input.
2. Verify that the dropdown shows chicken related results.
3. Type "ملوخية" and verify that the Arab cuisine page entry for mlukhiyeh appears in the results.
4. Type "kebbeh" (transliteration) and verify that kibbeh related results appear.

### Script 3. Voice Search (UC16)

1. Open the site on a browser that supports the Web Speech API.
2. Click the microphone icon in the search input.
3. Grant microphone permission when prompted.
4. Say "pizza" out loud.
5. Verify that the search input shows the word and that results appear.

### Script 4. Did You Mean (UC15)

1. Type a deliberately misspelled query such as "spagetii".
2. Verify that no direct results appear and that a "did you mean: spaghetti" suggestion is shown.
3. Click the suggestion and verify that results appear.

### Script 5. Arab Cuisine Browsing (UC4)

1. Open the Arab Cuisine page.
2. Verify that dishes from Jordan, Palestine, Egypt, the Levant, the Gulf, and North Africa are visible.
3. Open a specific dish (mansaf) and verify that the ingredients, steps, and embedded video render correctly.

### Script 6. Films Library (UC5)

1. Open the Films page.
2. Verify that the films grid renders with thumbnails, titles, and synopses.
3. Click one film and verify that the detail view shows the embedded video reference.

### Script 7. Academy Path (UC6, UC7)

1. Open the Academy page.
2. Click a learning path.
3. Open its first lesson.
4. Click the mark as complete button.
5. Navigate back to the path and verify that the progress indicator updates.
6. Reload the page and verify that the completion persisted.

### Script 8. Markets Atlas (UC8)

1. Open the Markets page.
2. Verify that the atlas renders with market thumbnails and locations.
3. Open one market and verify that the embedded video tour plays.

### Script 9. Chef Hall (UC9)

1. Open the Chefs page.
2. Verify that chefs are grouped by region.
3. Open a chef and verify that nationality, signature dish, and a representative video render correctly.

### Script 10. Drinks Library (UC10)

1. Open the Drinks page.
2. Verify that hot and cold drinks are split into separate sections.
3. Open one drink and verify that ingredients and a video reference render correctly.

### Script 11. Shorts Feed (UC11, UC12)

1. Open the Shorts page.
2. Verify that the category chip row above the grid is sticky on scroll.
3. Select a category (for example, shawarma) and verify that the grid filters correctly.
4. Click a thumbnail and verify that the full screen modal player opens.
5. Verify that scroll snap snaps to one short at a time.
6. Verify that the keyboard arrow keys move between shorts.
7. Close the modal and verify that the underlying page is at the same scroll position.

### Script 12. Macro Calculator (UC13, UC14)

1. Open the Fitness page.
2. Enter age 22, sex male, weight 75 kg, height 180 cm, activity moderate, goal cut.
3. Verify that the result panel shows daily calories around 2,000 kcal, protein around 150 g, and water intake based on weight.
4. Switch the preset to high protein and verify that the macro split updates.
5. Click the download PDF button and verify that a PDF is downloaded with the input parameters and the computed targets.
6. Clear a numeric input (for example, weight) and verify that the field becomes empty rather than snapping to zero.

### Script 13. Language Switch (UC17)

1. Click the language toggle in the header.
2. Verify that the interface switches to Arabic right to left.
3. Verify that navigation labels are translated and that the font becomes IBM Plex Sans Arabic.
4. Reload the page and verify that Arabic remains selected.

### Script 14. Theme Switch (UC18)

1. Click the theme toggle in the header.
2. Verify that the site switches to dark mode and that all relevant utility tokens are remapped.
3. Reload the page and verify that the theme persists.

### Script 15. PWA Install (UC20)

1. Open the site in Chrome on Android.
2. Wait for the install prompt to appear or use the browser menu to add to home screen.
3. Verify that the app launches standalone (without a browser address bar).
4. Verify that a previously visited page is still reachable when the device is in airplane mode.

Each of these scripts was executed and the outcome was recorded. The findings are summarized in section 5.8.

## 5.5 Cross Browser and Cross Device Testing

The site was opened on the following browsers and devices:

| Browser | Device | OS | Result |
|---|---|---|---|
| Chrome 122 | Desktop | Windows 11 | Pass |
| Edge 122 | Desktop | Windows 11 | Pass |
| Firefox 124 | Desktop | Windows 11 | Pass (voice input not supported) |
| Safari 17 | Desktop | macOS 14 | Pass |
| Chrome | Galaxy A series | Android 13 | Pass |
| Safari | iPad | iPadOS 17 | Pass after custom domain |
| Safari | iPhone | iOS 17 | Pass after custom domain |

Firefox does not support the Web Speech API at the time of writing. The voice search button is therefore hidden on Firefox. All other features behaved consistently.

## 5.6 Performance Testing

Lighthouse was run against the production deployment, both on a fast wired connection and on a simulated slow 4G connection. The results below are representative.

| Metric | Desktop (wired) | Mobile (simulated slow 4G) |
|---|---|---|
| Performance | over 90 | over 80 |
| Accessibility | over 95 | over 95 |
| Best Practices | over 95 | over 95 |
| SEO | 100 | 100 |
| First Contentful Paint | under 1.0 s | under 2.5 s |
| Largest Contentful Paint | under 1.5 s | under 3.0 s |
| Total Blocking Time | under 50 ms | under 250 ms |
| Cumulative Layout Shift | under 0.05 | under 0.05 |

The performance numbers benefit substantially from three implementation decisions: the YouTube lite embed pattern (which postpones loading the heavy YouTube iframe until the user actually clicks play), Vite code splitting (which keeps each route's bundle small), and the dynamic import of jsPDF (which keeps the PDF library out of the initial bundle entirely).

## 5.7 Accessibility and Usability Evaluation

Accessibility was evaluated using Lighthouse, the browser's built in accessibility inspector, and manual keyboard testing. The site achieved Lighthouse accessibility scores above 95 on all major pages.

The following accessibility properties were verified manually:

* All interactive elements are reachable by keyboard.
* Focus indicators are visible on buttons and links.
* Color contrast of body text meets WCAG AA in both light and dark themes.
* Form inputs have visible labels and association via the `for` and `id` attributes.
* The shorts modal traps focus while open and restores focus to the trigger thumbnail when closed.

Usability was evaluated informally by sharing the site with a handful of friends and classmates and observing them browse it. The most common positive observation was that the site felt fast and uncluttered. The most common request was for more Arabic content, which is addressed in the future work section of Chapter 6.

## 5.8 Test Results Summary

The summary of the manual UAT scripts is given in Table 5.1.

**Table 5.1 Test case results summary**

| Script | Use cases | Result | Notes |
|---|---|---|---|
| 1 | UC1, UC2, UC3 | Pass | |
| 2 | UC1, UC15 | Pass | Arabic to English translation working |
| 3 | UC16 | Pass (Chrome, Edge, Safari) | Not available on Firefox by design |
| 4 | UC15 | Pass | Did you mean suggestion shown for misspellings |
| 5 | UC4 | Pass | All regions render |
| 6 | UC5 | Pass | All films play |
| 7 | UC6, UC7 | Pass | Progress persists across reload |
| 8 | UC8 | Pass | |
| 9 | UC9 | Pass | |
| 10 | UC10 | Pass | |
| 11 | UC11, UC12 | Pass | Sticky chips, snap scroll, keyboard nav working |
| 12 | UC13, UC14 | Pass | PDF download works in all tested browsers |
| 13 | UC17 | Pass | Arabic font and RTL layout applied |
| 14 | UC18 | Pass | Theme persisted via local storage |
| 15 | UC20 | Pass on supporting browsers | iOS requires manual add to home screen |

All twenty defined use cases passed manual UAT. The known limitations are documented (voice search on Firefox, PWA install prompt on iOS) and are inherent to the underlying platform rather than to Zaytoun itself.

Defects discovered during testing were fixed before submission. The most consequential ones were already listed in Chapter 4, section 4.5.
