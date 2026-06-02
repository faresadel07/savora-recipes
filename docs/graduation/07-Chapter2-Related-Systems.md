# Chapter 2. Related Existing Systems

## 2.1 Introduction

This chapter reviews the most widely used recipe and food discovery platforms on the modern web, examines their strengths and weaknesses, and identifies the gaps that Zaytoun aims to fill. The review covers both global English language platforms and Arabic platforms that target the Middle East and North Africa region. The chapter ends with a comparison table and a description of the overall solution approach taken by Zaytoun.

The purpose of the review is not to dismiss existing platforms. Several of them are excellent products that have shaped the way users think about cooking content on the web. The review focuses instead on the specific aspects in which they fall short for the target audience of this project, which is a young Arab user with a mobile device, an unreliable mobile data plan, and an interest in both global and regional cuisine.

## 2.2 Existing Systems

### 2.2.1 Allrecipes

Allrecipes is one of the oldest and most popular community driven recipe websites in the United States. It contains millions of user submitted recipes with reviews and photographs. Its strengths include the size of its catalogue, the depth of its community ratings, and the broad coverage of common American dishes.

Its weaknesses are well known. The site is heavily monetized through advertising, including video pre rolls, banner ads, and interstitial overlays. Pages are slow to load on a typical mobile connection, often exceeding several megabytes per page. The catalogue is heavily skewed toward American cuisine, so dishes from Jordan, Palestine, or Egypt are either missing or represented by a single low quality submission. The search engine does not handle Arabic input at all and offers limited fuzzy matching for English queries with typos.

### 2.2.2 Tasty by BuzzFeed

Tasty is a recipe brand operated by BuzzFeed. It is best known for its short overhead cooking videos that became popular on social media. Its strengths are the visual style of its videos, the clarity of its recipe steps, and the strength of its content marketing on platforms such as Facebook and Instagram.

Its weaknesses are that it focuses on viral content rather than depth. Recipes are often simplified to the point of inaccuracy, and the platform pays very little attention to regional culinary heritage outside of a handful of "world food" features. The site is also tightly integrated with BuzzFeed's advertising and tracking infrastructure, which weighs the pages down. Arabic support is essentially absent.

### 2.2.3 Yummly

Yummly is a recipe aggregator that focuses on personalized recommendations. Its strengths include a clean visual style, an inventory based search ("what do I have in my fridge"), and integration with smart kitchen appliances.

Its weaknesses include heavy reliance on user account creation, a recommendation system that quickly becomes repetitive, and a strong bias toward American and European recipes. The platform also depends on a paid premium tier for some of its features, which limits its usefulness for casual visitors. Arabic content is rare and not well indexed.

### 2.2.4 BBC Good Food

BBC Good Food is a British recipe site with strong editorial standards and high quality photography. Its strengths include reliable testing of recipes, clear instructions, and a generally clean interface. It is one of the more trustworthy English language recipe destinations.

Its weaknesses are that it remains a regional brand. Coverage of Middle Eastern cuisine is shallow and often filtered through a British lens. Pages still load a number of advertising scripts. There is no Arabic version of the site.

### 2.2.5 Shahiya and Fatafeat

Shahiya and Fatafeat are two of the better known Arabic language food platforms. Shahiya is part of a regional digital media group and has a recipe catalogue oriented toward home cooks in the Gulf and Levant. Fatafeat is associated with the Fatafeat television channel and combines recipes with chef profiles and video content.

Their strengths include native Arabic content, regional dish coverage, and integration with regional television shows. Their weaknesses include outdated visual design, slow mobile pages, heavy advertising, and limited search capability. Neither platform offers a unified experience that combines recipes, films, lessons, markets, and chefs in the way Zaytoun does, and neither provides a smart search that fuses Arabic and English queries.

## 2.3 Overall Problems with Existing Systems

The review of the platforms above highlights a set of recurring problems:

| Problem | Description | Affected platforms |
|---|---|---|
| Heavy advertising | Pages contain multiple ad scripts that slow loading and damage the reading experience | Allrecipes, Tasty, Yummly, BBC Good Food, Shahiya, Fatafeat |
| Poor mobile performance | Pages exceed several megabytes and are slow on regional mobile networks | Allrecipes, Tasty, Shahiya, Fatafeat |
| Weak Arabic support | Search does not handle Arabic, diacritics, or transliteration | Allrecipes, Tasty, Yummly, BBC Good Food |
| Shallow regional coverage | Arab cuisine treated as exotic or omitted entirely | Allrecipes, Tasty, Yummly, BBC Good Food |
| Outdated design | Visual style has not been refreshed in years | Shahiya, Fatafeat |
| Fragmented experience | Recipes, films, lessons, markets, and chefs are split across separate sites | All reviewed platforms |
| No personal tools | No on site macronutrient calculator integrated with recipe content | All reviewed platforms |
| Tracking and pop ups | Aggressive tracking cookies and pop up overlays | Allrecipes, Tasty, Yummly, Shahiya, Fatafeat |

These problems define the gap that Zaytoun aims to close.

**Table 2.1 Feature comparison of reviewed platforms**

| Feature | Allrecipes | Tasty | Yummly | BBC Good Food | Shahiya | Fatafeat | Zaytoun |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Recipe catalogue | yes | yes | yes | yes | yes | yes | yes |
| Arab cuisine depth | low | low | low | low | medium | medium | high |
| Arabic UI | no | no | no | no | yes | yes | yes |
| Smart search | basic | basic | medium | basic | basic | basic | advanced |
| Voice search | no | no | no | no | no | no | yes |
| Food films library | no | no | no | no | no | no | yes |
| Structured lessons | no | no | no | no | no | no | yes |
| Markets atlas | no | no | no | no | no | no | yes |
| Chef hall | partial | no | no | partial | partial | yes | yes |
| Drinks library | partial | no | partial | partial | partial | partial | yes |
| Vertical shorts feed | no | partial | no | no | no | no | yes |
| Macronutrient calculator | no | no | partial | no | no | no | yes |
| Progressive web app | no | no | no | no | no | no | yes |
| No advertising | no | no | no | no | no | no | yes |

## 2.4 Overall Solution Approach

Based on the review above, the overall solution approach taken by Zaytoun follows seven principles:

1. **One platform, many libraries.** Combine recipes, regional cuisine, films, lessons, markets, chefs, drinks, and shorts in a single application that shares a single design language and a single search index.

2. **Mobile first performance.** Treat mobile devices on regional networks as the primary target. Use a modern build pipeline (Vite) that produces small, code split JavaScript bundles. Use the progressive web app pattern to cache visited pages and serve them quickly on repeat visits.

3. **First class Arabic.** Implement full Arabic right to left layout, an Arabic optimized typeface, and an Arabic to English translation lexicon inside the search component. Treat Arabic as a first class language rather than a translation layer.

4. **Smart search.** Use Fuse.js for fuzzy matching and combine it with a curated Arabic to English term dictionary, an English synonyms map, a "did you mean" fallback, recent and suggested chips, and voice input through the Web Speech API.

5. **Editorial standards.** Maintain a clean magazine style visual design with generous whitespace and quiet typography. Do not run advertising, tracking, or pop ups. Curate content libraries by hand to maintain quality.

6. **Personal tools.** Include practical tools that the cooking audience actually uses, such as a macronutrient calculator with PDF export, favorites stored locally, and a learning progress tracker.

7. **Production grade deployment.** Deploy under a real custom domain (zaytoun.online), with correct Open Graph metadata, a working share image, an SPA rewrite for client side routes, and a service worker that handles updates safely.

These principles guide every analysis, design, and implementation decision described in the remainder of this report.
