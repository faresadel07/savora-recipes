/**
 * Curated YouTube channels focused on fitness cooking, high-protein meals,
 * and sports nutrition. Same shape as the regular cooking channels — we link
 * out, we don't embed individual videos.
 */

export interface FitnessChannel {
  id: string;
  name: string;
  handle: string;
  url: string;
  blurb: string;
  vibe: 'protein' | 'science' | 'plant' | 'meal-prep' | 'cutting';
  accent: 'terracotta' | 'sage' | 'gold' | 'ink';
}

export const FITNESS_CHANNELS: FitnessChannel[] = [
  {
    id: 'the-protein-chef',
    name: 'The Protein Chef',
    handle: '@TheProteinChef',
    url: 'https://www.youtube.com/@TheProteinChef',
    blurb: 'Every recipe is engineered around macros. The original high-protein cooking channel.',
    vibe: 'protein',
    accent: 'terracotta',
  },
  {
    id: 'jeff-nippard',
    name: 'Jeff Nippard',
    handle: '@JeffNippard',
    url: 'https://www.youtube.com/@JeffNippard',
    blurb: 'A pro natural bodybuilder explaining training and nutrition with published research behind every claim.',
    vibe: 'science',
    accent: 'ink',
  },
  {
    id: 'mike-diamonds',
    name: 'Mike Diamonds',
    handle: '@MikeDiamonds',
    url: 'https://www.youtube.com/@MikeDiamonds',
    blurb: 'A doctor who lifts. Aesthetic recipes with full macro breakdowns and meal-prep speed.',
    vibe: 'protein',
    accent: 'terracotta',
  },
  {
    id: 'sean-nalewanyj',
    name: 'Sean Nalewanyj',
    handle: '@SeanNal',
    url: 'https://www.youtube.com/@SeanNal',
    blurb: 'Twenty years of natural bodybuilding turned into honest, sciency content. No hype.',
    vibe: 'science',
    accent: 'sage',
  },
  {
    id: 'pick-up-limes',
    name: 'Pick Up Limes',
    handle: '@PickUpLimes',
    url: 'https://www.youtube.com/@PickUpLimes',
    blurb: 'A registered dietitian making plant-based meals that hit your protein targets without supplements.',
    vibe: 'plant',
    accent: 'sage',
  },
  {
    id: 'whitney-erd',
    name: 'Whitney Erd',
    handle: '@WhitneyErd',
    url: 'https://www.youtube.com/@WhitneyErd',
    blurb: 'High-protein meals you actually want to eat. Strong macro discipline, zero pretension.',
    vibe: 'protein',
    accent: 'gold',
  },
  {
    id: 'mr-make-it-happen',
    name: 'Mr Make It Happen',
    handle: '@MrMakeitHappen',
    url: 'https://www.youtube.com/@MrMakeitHappen',
    blurb: 'Soul-food classics rebuilt to be healthier without losing the comfort. Master of flavor balance.',
    vibe: 'protein',
    accent: 'terracotta',
  },
  {
    id: 'joanna-soh',
    name: 'Joanna Soh',
    handle: '@JoannaSohOfficial',
    url: 'https://www.youtube.com/@JoannaSohOfficial',
    blurb: 'Meal prep, fitness, and workout pairings in one channel. Practical for busy weekdays.',
    vibe: 'meal-prep',
    accent: 'sage',
  },
  {
    id: 'fitmencook',
    name: 'FitMenCook',
    handle: '@FitMenCook',
    url: 'https://www.youtube.com/@FitMenCook',
    blurb: 'Kevin Curry\'s archive of macro-friendly meals. Big variety, big servings.',
    vibe: 'protein',
    accent: 'ink',
  },
  {
    id: 'athlean-x',
    name: 'Athlean-X (Recipes)',
    handle: '@athleanx',
    url: 'https://www.youtube.com/@athleanx',
    blurb: 'A trainer of pro athletes. Mostly workouts, but his nutrition videos are gold.',
    vibe: 'science',
    accent: 'ink',
  },
  {
    id: 'sculpted-vegan',
    name: 'The Sculpted Vegan',
    handle: '@TheSculptedVegan',
    url: 'https://www.youtube.com/@TheSculptedVegan',
    blurb: 'Plant-based recipes built to support real muscle building. Macro-balanced and tasty.',
    vibe: 'plant',
    accent: 'sage',
  },
  {
    id: 'mind-over-munch',
    name: 'Mind Over Munch',
    handle: '@MindOverMunch',
    url: 'https://www.youtube.com/@MindOverMunch',
    blurb: 'Alyssia Sheikh on meal-prep, intermittent fasting, and budget healthy cooking.',
    vibe: 'meal-prep',
    accent: 'gold',
  },
];
