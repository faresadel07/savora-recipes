/**
 * Ingredient nutrition database. Values are per 100 grams of the raw or
 * cooked ingredient, sourced from USDA FoodData Central and verified
 * against a handful of cross references.
 *
 * Each entry exposes the macros the recipe pages care about:
 *   - calories (kcal)
 *   - protein  (g)
 *   - carbs    (g)
 *   - fat      (g)
 *
 * The key is a lowercase, alias friendly token. The matcher in
 * nutrition-calculator.ts walks an ingredient line and tries to find
 * the best matching key inside it. Add more aliases as needed; longer
 * phrases first because the matcher tries the longest substring first.
 */

export interface Macro {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const NUTRITION_DB: Record<string, Macro> = {
  // ===== Proteins (meat, poultry, fish) =====
  'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  'chicken thigh': { calories: 209, protein: 26, carbs: 0, fat: 11 },
  'chicken thighs': { calories: 209, protein: 26, carbs: 0, fat: 11 },
  'chicken wings': { calories: 203, protein: 30.5, carbs: 0, fat: 8.1 },
  'chicken': { calories: 189, protein: 27, carbs: 0, fat: 8 },
  'beef mince': { calories: 254, protein: 26, carbs: 0, fat: 17 },
  'ground beef': { calories: 254, protein: 26, carbs: 0, fat: 17 },
  'beef': { calories: 250, protein: 26, carbs: 0, fat: 15 },
  'lamb shoulder': { calories: 282, protein: 25, carbs: 0, fat: 21 },
  'lamb shank': { calories: 234, protein: 26, carbs: 0, fat: 14 },
  'lamb': { calories: 258, protein: 25, carbs: 0, fat: 18 },
  'pork': { calories: 242, protein: 27, carbs: 0, fat: 14 },
  'bacon': { calories: 541, protein: 37, carbs: 1.4, fat: 42 },
  'ham': { calories: 145, protein: 21, carbs: 1.5, fat: 6 },
  'turkey': { calories: 189, protein: 29, carbs: 0, fat: 7 },
  'ground turkey': { calories: 235, protein: 27, carbs: 0, fat: 13 },
  'duck': { calories: 337, protein: 19, carbs: 0, fat: 28 },
  'sausage': { calories: 301, protein: 12, carbs: 1.4, fat: 27 },
  'salmon': { calories: 208, protein: 20, carbs: 0, fat: 13 },
  'tuna': { calories: 132, protein: 28, carbs: 0, fat: 1 },
  'cod': { calories: 82, protein: 18, carbs: 0, fat: 0.7 },
  'shrimp': { calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
  'prawn': { calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
  'prawns': { calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
  'sardines': { calories: 208, protein: 24, carbs: 0, fat: 11 },
  'mackerel': { calories: 305, protein: 19, carbs: 0, fat: 25 },
  'sea bass': { calories: 124, protein: 23, carbs: 0, fat: 2.6 },
  'fish': { calories: 130, protein: 21, carbs: 0, fat: 5 },
  'tilapia': { calories: 96, protein: 20, carbs: 0, fat: 1.7 },

  // ===== Eggs and dairy =====
  'eggs': { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  'egg': { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  'egg whites': { calories: 52, protein: 11, carbs: 0.7, fat: 0.2 },
  'egg yolk': { calories: 322, protein: 16, carbs: 3.6, fat: 27 },
  'butter': { calories: 717, protein: 0.9, carbs: 0.1, fat: 81 },
  'ghee': { calories: 900, protein: 0, carbs: 0, fat: 100 },
  'milk': { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 },
  'whole milk': { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 },
  'skim milk': { calories: 35, protein: 3.4, carbs: 5, fat: 0.2 },
  'cream': { calories: 345, protein: 2.1, carbs: 2.8, fat: 37 },
  'heavy cream': { calories: 345, protein: 2.1, carbs: 2.8, fat: 37 },
  'sour cream': { calories: 198, protein: 2.4, carbs: 4.6, fat: 19 },
  'yogurt': { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  'greek yogurt': { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  'labneh': { calories: 135, protein: 8, carbs: 4, fat: 9 },
  'mozzarella': { calories: 280, protein: 28, carbs: 3.1, fat: 17 },
  'parmesan': { calories: 431, protein: 38, carbs: 4.1, fat: 29 },
  'cheddar': { calories: 404, protein: 25, carbs: 1.3, fat: 33 },
  'feta': { calories: 264, protein: 14, carbs: 4.1, fat: 21 },
  'halloumi': { calories: 321, protein: 22, carbs: 2.2, fat: 25 },
  'ricotta': { calories: 174, protein: 11, carbs: 3, fat: 13 },
  'cream cheese': { calories: 342, protein: 6, carbs: 4.1, fat: 34 },
  'cheese': { calories: 350, protein: 22, carbs: 2.5, fat: 28 },

  // ===== Grains, pasta, bread =====
  'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  'basmati rice': { calories: 121, protein: 3, carbs: 25, fat: 0.4 },
  'brown rice': { calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
  'pasta': { calories: 131, protein: 5, carbs: 25, fat: 1.1 },
  'spaghetti': { calories: 131, protein: 5, carbs: 25, fat: 1.1 },
  'noodles': { calories: 138, protein: 4.5, carbs: 25, fat: 2.1 },
  'bread': { calories: 265, protein: 9, carbs: 49, fat: 3.2 },
  'pita': { calories: 275, protein: 9, carbs: 56, fat: 1.2 },
  'flour': { calories: 364, protein: 10, carbs: 76, fat: 1 },
  'all-purpose flour': { calories: 364, protein: 10, carbs: 76, fat: 1 },
  'whole wheat flour': { calories: 340, protein: 13, carbs: 72, fat: 2.5 },
  'cornmeal': { calories: 384, protein: 8.5, carbs: 79, fat: 4 },
  'oats': { calories: 389, protein: 17, carbs: 66, fat: 7 },
  'bulgur': { calories: 83, protein: 3.1, carbs: 19, fat: 0.2 },
  'couscous': { calories: 112, protein: 3.8, carbs: 23, fat: 0.2 },
  'quinoa': { calories: 120, protein: 4.4, carbs: 21, fat: 1.9 },
  'tortilla': { calories: 218, protein: 5.7, carbs: 36, fat: 5.7 },
  'breadcrumbs': { calories: 395, protein: 13, carbs: 72, fat: 5.3 },

  // ===== Legumes =====
  'chickpeas': { calories: 164, protein: 9, carbs: 27, fat: 2.6 },
  'lentils': { calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  'red lentils': { calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  'black beans': { calories: 132, protein: 9, carbs: 24, fat: 0.5 },
  'kidney beans': { calories: 127, protein: 8.7, carbs: 23, fat: 0.5 },
  'navy beans': { calories: 140, protein: 8.2, carbs: 26, fat: 0.6 },
  'white beans': { calories: 139, protein: 9.7, carbs: 25, fat: 0.4 },
  'fava beans': { calories: 110, protein: 8, carbs: 19, fat: 0.4 },
  'beans': { calories: 132, protein: 9, carbs: 24, fat: 0.5 },
  'soybeans': { calories: 173, protein: 17, carbs: 10, fat: 9 },
  'tofu': { calories: 76, protein: 8, carbs: 1.9, fat: 4.8 },

  // ===== Vegetables =====
  'tomato': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  'tomatoes': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  'cherry tomatoes': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  'tomato paste': { calories: 82, protein: 4.3, carbs: 19, fat: 0.5 },
  'onion': { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
  'onions': { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
  'red onion': { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
  'shallot': { calories: 72, protein: 2.5, carbs: 17, fat: 0.1 },
  'garlic': { calories: 149, protein: 6.4, carbs: 33, fat: 0.5 },
  'ginger': { calories: 80, protein: 1.8, carbs: 18, fat: 0.8 },
  'potato': { calories: 77, protein: 2, carbs: 17, fat: 0.1 },
  'potatoes': { calories: 77, protein: 2, carbs: 17, fat: 0.1 },
  'sweet potato': { calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  'carrot': { calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  'carrots': { calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  'celery': { calories: 16, protein: 0.7, carbs: 3, fat: 0.2 },
  'bell pepper': { calories: 31, protein: 1, carbs: 6, fat: 0.3 },
  'peppers': { calories: 31, protein: 1, carbs: 6, fat: 0.3 },
  'chili': { calories: 40, protein: 1.9, carbs: 9, fat: 0.4 },
  'eggplant': { calories: 25, protein: 1, carbs: 6, fat: 0.2 },
  'aubergine': { calories: 25, protein: 1, carbs: 6, fat: 0.2 },
  'zucchini': { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3 },
  'courgette': { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3 },
  'cucumber': { calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1 },
  'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  'kale': { calories: 49, protein: 4.3, carbs: 9, fat: 0.9 },
  'lettuce': { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2 },
  'cabbage': { calories: 25, protein: 1.3, carbs: 6, fat: 0.1 },
  'broccoli': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  'cauliflower': { calories: 25, protein: 1.9, carbs: 5, fat: 0.3 },
  'mushroom': { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3 },
  'mushrooms': { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3 },
  'okra': { calories: 33, protein: 1.9, carbs: 7, fat: 0.2 },
  'green beans': { calories: 31, protein: 1.8, carbs: 7, fat: 0.2 },
  'peas': { calories: 81, protein: 5.4, carbs: 14, fat: 0.4 },
  'corn': { calories: 86, protein: 3.3, carbs: 19, fat: 1.4 },
  'asparagus': { calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1 },
  'avocado': { calories: 160, protein: 2, carbs: 9, fat: 15 },
  'olives': { calories: 115, protein: 0.8, carbs: 6.3, fat: 11 },
  'kalamata olives': { calories: 115, protein: 0.8, carbs: 6.3, fat: 11 },
  'parsley': { calories: 36, protein: 3, carbs: 6.3, fat: 0.8 },
  'mint': { calories: 70, protein: 3.8, carbs: 15, fat: 0.9 },
  'coriander': { calories: 23, protein: 2.1, carbs: 3.7, fat: 0.5 },
  'cilantro': { calories: 23, protein: 2.1, carbs: 3.7, fat: 0.5 },
  'basil': { calories: 23, protein: 3.2, carbs: 2.7, fat: 0.6 },

  // ===== Fruits =====
  'apple': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  'banana': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  'orange': { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  'lemon': { calories: 29, protein: 1.1, carbs: 9.3, fat: 0.3 },
  'lime': { calories: 30, protein: 0.7, carbs: 11, fat: 0.2 },
  'strawberries': { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
  'blueberries': { calories: 57, protein: 0.7, carbs: 14, fat: 0.3 },
  'raspberries': { calories: 52, protein: 1.2, carbs: 12, fat: 0.7 },
  'grapes': { calories: 69, protein: 0.7, carbs: 18, fat: 0.2 },
  'pomegranate': { calories: 83, protein: 1.7, carbs: 19, fat: 1.2 },
  'mango': { calories: 60, protein: 0.8, carbs: 15, fat: 0.4 },
  'pineapple': { calories: 50, protein: 0.5, carbs: 13, fat: 0.1 },
  'dates': { calories: 282, protein: 2.5, carbs: 75, fat: 0.4 },
  'raisins': { calories: 299, protein: 3.1, carbs: 79, fat: 0.5 },

  // ===== Nuts and seeds =====
  'almonds': { calories: 579, protein: 21, carbs: 22, fat: 50 },
  'walnuts': { calories: 654, protein: 15, carbs: 14, fat: 65 },
  'pistachios': { calories: 560, protein: 20, carbs: 28, fat: 45 },
  'cashews': { calories: 553, protein: 18, carbs: 30, fat: 44 },
  'pine nuts': { calories: 673, protein: 14, carbs: 13, fat: 68 },
  'sesame seeds': { calories: 573, protein: 18, carbs: 23, fat: 50 },
  'sunflower seeds': { calories: 584, protein: 21, carbs: 20, fat: 51 },
  'peanuts': { calories: 567, protein: 26, carbs: 16, fat: 49 },
  'peanut butter': { calories: 588, protein: 25, carbs: 20, fat: 50 },

  // ===== Oils, fats, sauces =====
  'olive oil': { calories: 884, protein: 0, carbs: 0, fat: 100 },
  'vegetable oil': { calories: 884, protein: 0, carbs: 0, fat: 100 },
  'sunflower oil': { calories: 884, protein: 0, carbs: 0, fat: 100 },
  'sesame oil': { calories: 884, protein: 0, carbs: 0, fat: 100 },
  'coconut oil': { calories: 862, protein: 0, carbs: 0, fat: 100 },
  'oil': { calories: 884, protein: 0, carbs: 0, fat: 100 },
  'mayonnaise': { calories: 680, protein: 0.9, carbs: 0.6, fat: 75 },
  'soy sauce': { calories: 53, protein: 8, carbs: 4.9, fat: 0.6 },
  'tahini': { calories: 595, protein: 17, carbs: 21, fat: 54 },
  'tomato sauce': { calories: 29, protein: 1.6, carbs: 7, fat: 0.2 },
  'vinegar': { calories: 18, protein: 0, carbs: 0.9, fat: 0 },
  'mustard': { calories: 66, protein: 4.4, carbs: 5.8, fat: 4 },
  'ketchup': { calories: 112, protein: 1.7, carbs: 27, fat: 0.4 },
  'hummus': { calories: 166, protein: 7.9, carbs: 14, fat: 9.6 },

  // ===== Sugars and sweeteners =====
  'sugar': { calories: 387, protein: 0, carbs: 100, fat: 0 },
  'brown sugar': { calories: 380, protein: 0.1, carbs: 98, fat: 0 },
  'honey': { calories: 304, protein: 0.3, carbs: 82, fat: 0 },
  'maple syrup': { calories: 260, protein: 0, carbs: 67, fat: 0.2 },
  'molasses': { calories: 290, protein: 0, carbs: 75, fat: 0.1 },

  // ===== Chocolate =====
  'chocolate': { calories: 546, protein: 4.9, carbs: 61, fat: 31 },
  'dark chocolate': { calories: 598, protein: 7.8, carbs: 46, fat: 43 },
  'cocoa': { calories: 228, protein: 20, carbs: 58, fat: 14 },
  'cocoa powder': { calories: 228, protein: 20, carbs: 58, fat: 14 },

  // ===== Liquids (per 100ml) =====
  'water': { calories: 0, protein: 0, carbs: 0, fat: 0 },
  'broth': { calories: 7, protein: 1, carbs: 0.6, fat: 0.1 },
  'stock': { calories: 7, protein: 1, carbs: 0.6, fat: 0.1 },
  'wine': { calories: 83, protein: 0.1, carbs: 2.6, fat: 0 },
  'beer': { calories: 43, protein: 0.5, carbs: 3.6, fat: 0 },

  // ===== Spices and minor ingredients (small typical amounts) =====
  'salt': { calories: 0, protein: 0, carbs: 0, fat: 0 },
  'pepper': { calories: 251, protein: 10, carbs: 64, fat: 3.3 },
  'cumin': { calories: 375, protein: 18, carbs: 44, fat: 22 },
  'cinnamon': { calories: 247, protein: 4, carbs: 81, fat: 1.2 },
  'turmeric': { calories: 354, protein: 8, carbs: 65, fat: 10 },
  'paprika': { calories: 282, protein: 14, carbs: 54, fat: 13 },
  'cardamom': { calories: 311, protein: 11, carbs: 68, fat: 7 },
  'baking powder': { calories: 53, protein: 0, carbs: 28, fat: 0 },
  'baking soda': { calories: 0, protein: 0, carbs: 0, fat: 0 },
  'yeast': { calories: 295, protein: 38, carbs: 35, fat: 4.6 },
  'vanilla': { calories: 288, protein: 0.1, carbs: 13, fat: 0.1 },
};
