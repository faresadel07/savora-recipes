# Chapter 1. Introduction

## 1.1 Overview

Zaytoun is a web platform developed as a graduation project in the Department of Computer Information Systems at the Hashemite University. The project addresses the way users in the Arab region discover, learn about, and engage with food content online. Rather than producing yet another recipe list, the platform combines several content categories that are usually scattered across different websites into one cohesive product. These categories include practical recipes, regional Arab dishes, food films and documentaries, structured cooking lessons, an atlas of food markets around the world, a hall of notable chefs, a drinks library covering hot and cold beverages, and a vertical short video feed inspired by modern social platforms.

The platform is implemented as a single page application using a modern frontend stack centered on React, TypeScript, and Tailwind CSS. It uses the Spoonacular API for the main recipe catalogue, while curated content libraries are stored as typed static datasets that ship as part of the application bundle. Users access the platform through any modern browser at the production domain zaytoun.online, which is also installable as a progressive web app.

Zaytoun is designed to be visually clean, fast on mobile devices, accessible in both English and Arabic, and respectful of the user's time. There are no popups, no advertising scripts, and no third party tracking cookies. The interface follows a soft editorial style with generous whitespace, typography based on a system font stack, and a controlled color palette built around cream, ink, terracotta, and sage tones.

## 1.2 Project Motivation

Food is one of the most searched topics on the internet. According to several published analyses of search engine trends, recipe queries consistently rank among the most common categories of consumer search, especially during evening hours and weekends when people plan meals. Despite this volume, the websites that dominate global recipe search results share recurring problems. They are crowded with advertising, slow to load, and oriented almost exclusively toward western cuisines. Mobile users in the Arab region in particular experience these issues more sharply, because the pages are often heavier than the average mobile data plan can comfortably load.

Arabic content on these platforms is also limited. Famous regional dishes such as mansaf, mlukhiyeh, maqluba, and koshary are either missing, presented inaccurately, or buried beneath similarly named dishes. Where Arabic platforms do exist, such as Shahiya or Fatafeat, the focus is narrower, the design has not been refreshed in years, and the search experience does not handle Arabic diacritics or transliterations well.

On a personal level, the motivation for this project also came from spending time in the kitchen during late nights and noticing how much friction there was between a vague idea (for example, "I want something fast with chicken and rice") and an actual cooking decision. Existing platforms forced the user through advertising heavy landing pages, long autobiographical introductions, and unrelated suggestions before reaching the recipe itself. The goal of Zaytoun is to remove that friction and present food content the way one would expect a well edited magazine to present it.

There is also an educational angle. Many young Arab users do not know much about classical regional dishes outside their own city, and the available online documentaries are scattered across YouTube channels with no curation. A platform that brings together recipes, regional context, films, and structured lessons in one place fills a real gap.

## 1.3 Problem Statement

The problems that this project addresses can be expressed in the following statements:

1. Existing recipe websites are visually overloaded, slow on mobile networks, and aggressive with advertising and pop ups, which damages the cooking experience instead of supporting it.

2. Major platforms do not give Arab cuisine the depth it deserves. Regional dishes from Jordan, Palestine, Egypt, the Levant, the Gulf, and North Africa are either absent or treated as exotic curiosities.

3. Search tools on these platforms do not understand Arabic input, do not handle transliteration, and rarely return useful results when a query contains diacritics or alternative spellings.

4. There is no widely used platform that combines recipes, regional cuisine context, food documentaries, structured cooking lessons, markets, chefs, drinks, and short videos in one continuous experience. Users must currently jump between Google, YouTube, Instagram, and Wikipedia to assemble that knowledge themselves.

5. Most cooking platforms do not include a built in tool for calculating daily macronutrient targets, which is increasingly important for users who track their nutrition.

6. Documentation, attribution, and editorial integrity around food content are weak on most aggregator sites, so users cannot easily evaluate the credibility of a recipe or a claim about a dish.

Taken together, these problems define a clear opportunity for a single, fast, editorial style web platform that respects the user, handles Arabic content properly, and treats food as a serious cultural domain.

## 1.4 Project Aim and Objectives

The aim of the project is to design, implement, and deploy a complete web platform that delivers a unified, fast, mobile friendly, and culturally aware food discovery experience, with first class support for both Arabic and English content.

To achieve this aim, the project sets the following objectives:

1. **Recipe discovery.** Provide a searchable, filterable recipe catalogue powered by a reliable external recipe API, with optional offline access to a curated subset.

2. **Arab cuisine library.** Maintain a typed, hand curated library of well known dishes from across the Arab world, each with ingredients, steps, and a verified video reference.

3. **Editorial content.** Provide curated libraries for food films, learning paths, food markets, chefs, drinks, and short videos that together form an editorial experience comparable to a quality food magazine.

4. **Smart search.** Implement a search component that supports fuzzy matching, Arabic and English input, voice queries, recent and suggested queries, and a "did you mean" fallback when no direct match is found.

5. **Bilingual interface.** Deliver a full English and Arabic interface, including right to left layout, an Arabic optimized font, and translated navigation.

6. **Fitness support.** Provide a macronutrient calculator that uses standard scientific formulas (Mifflin St Jeor and Katch McArdle) and exports its output as a PDF.

7. **Modern web standards.** Build the platform as a progressive web app, installable to the device home screen, with sensible caching of static assets and offline fallbacks.

8. **Custom domain and production deployment.** Publish the platform under a real custom domain (zaytoun.online) and verify it on real desktop and mobile devices, including devices on Jordanian mobile networks.

9. **Editorial standards.** Apply a single typography system, a controlled color palette, generous spacing, and a quiet interface that respects the user's attention. No advertising, no tracking scripts, no aggressive pop ups.

10. **Documentation.** Produce a complete academic report describing the analysis, design, implementation, testing, and conclusions of the project.

## 1.5 Project Functionality

The platform exposes the following major areas, each accessible from the global navigation and the home page:

* **Home.** Editorial landing page that introduces the platform, features the recipe of the day, and surfaces a curated trio of a learning path, a food film, and a chef.

* **Recipes.** Searchable and filterable catalogue of recipes, including dietary tags, cuisine tags, and a favorites system stored locally on the device.

* **Arab Cuisine.** A library of regional dishes from across the Arab world, including Palestinian, Jordanian, Egyptian, Levantine, Gulf, and North African dishes, each with full ingredients, steps, and a verified video reference.

* **Films.** A library of food documentaries and series, presented as a magazine grid with director, year, and synopsis. Each entry links to its video source.

* **Academy.** A learning section with curated lessons, structured learning paths, level metadata, and a progress tracker stored on the device.

* **Markets.** An atlas of food markets around the world, with location, specialty, and an embedded video tour.

* **Chefs.** A hall of notable chefs grouped by region, with nationality, signature dish, and a representative video.

* **Drinks.** A library of hot and cold drinks, including coffee, tea, sahlab, and traditional Arab beverages, each with ingredients and a video reference.

* **Shorts.** A vertical short video feed with scroll snap behavior, category filters, and an in app player modal, used for fun and quick discovery.

* **Fitness.** A page that contains a macronutrient calculator and curated fitness video channels, plus structured goal based plans.

* **Search.** A global smart search component, accessible from the header, that performs universal search across all libraries with Arabic, English, voice, and "did you mean" support.

* **Settings.** Theme toggle (light and dark), language toggle (English and Arabic), cookies preferences, and a clear local data action.

The features above form the core of the project. A high level platform map is given in Figure 1.1.

## 1.6 Project Results

By the end of the implementation phase, the platform was deployed to production at zaytoun.online and tested on multiple devices. The following high level results were achieved:

1. The recipe catalogue serves recipes through the Spoonacular API and falls back gracefully when the API is rate limited.

2. The Arab cuisine library contains regional dishes with full ingredients, steps, and verified videos.

3. The films library contains more than thirty food documentaries with verified video references.

4. The academy contains lessons grouped into learning paths.

5. The markets library covers more than twenty food markets around the world.

6. The chef hall contains forty chefs grouped into six regions.

7. The drinks library contains more than twenty drinks across hot and cold categories.

8. The shorts library contains thousands of verified short videos across forty categories, including the special "car eating" subcategory requested by the project owner.

9. The smart search component supports Arabic and English input, voice search, fuzzy matching, recent and suggested queries, and a "did you mean" fallback.

10. The macronutrient calculator computes daily targets and exports the results as a PDF.

11. The platform is installable as a progressive web app and works offline for already visited pages.

12. The platform is deployed under a custom domain, with a working SPA rewrite, working Open Graph metadata, and a working share image.

13. The user interface follows a single design system across all pages, with full Arabic right to left support.

## 1.7 Report Structure

The remainder of this report is organized as follows. Chapter 2 surveys existing food platforms and identifies the gaps that motivated Zaytoun. Chapter 3 presents the analysis and design of the system, including stakeholders, use cases, non functional requirements, constraints, and architecture. Chapter 4 details the implementation, the technology stack, and the problems encountered during development. Chapter 5 describes the testing and evaluation strategy. Chapter 6 concludes the report and outlines future work.
