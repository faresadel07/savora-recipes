import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowUpRight,
  Beef,
  BookOpen,
  Calendar,
  ChefHat,
  Coffee,
  Flame,
  GlassWater,
  Heart,
  Repeat,
  ShoppingBasket,
  Sparkles,
  Tv,
  Zap,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { searchRecipes } from '../api';
import { FITNESS_CHANNELS } from '../data/fitness-channels';
import {
  DRINKS,
  GOAL_PLANS,
  MEAL_PREP,
  POST_WORKOUT,
  PRE_WORKOUT,
  PROTEIN_101,
  PROTEIN_BOOSTS,
  PROTEIN_SOURCES,
  RECOVERY_MEALS,
  SNACKS,
} from '../data/fitness-content';
import RecipeCard from '../components/RecipeCard';
import MacroCalculator from '../components/MacroCalculator';
import FitnessRecipeCard from '../components/FitnessRecipeCard';
import FitnessRecipeModal from '../components/FitnessRecipeModal';
import {
  FITNESS_RECIPES,
  FITNESS_RECIPE_CATEGORIES,
  type FitnessRecipe,
  type FitnessRecipeCategory,
} from '../data/fitness-recipes';
import { useTranslation } from '../i18n';

const PROTEIN_CATEGORIES = ['Chicken', 'Seafood', 'Beef', 'Lamb', 'Pork'] as const;

const HERO_STATS = [
  { value: '700+', label: 'Recipes' },
  { value: `${FITNESS_CHANNELS.length}`, label: 'Channels' },
  { value: `${GOAL_PLANS.length}`, label: 'Goal plans' },
  { value: 'Free', label: 'Always' },
];

export default function FitnessPage() {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  const [activeCategory, setActiveCategory] = useState<(typeof PROTEIN_CATEGORIES)[number]>('Chicken');
  const [drinkFilter, setDrinkFilter] = useState<'all' | 'pre' | 'post' | 'anytime' | 'meal-replace'>('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'meat' | 'fish' | 'dairy' | 'eggs' | 'plant' | 'supplement'>('all');
  const [activePlan, setActivePlan] = useState<'cut' | 'maintain' | 'bulk'>('maintain');
  const [workoutTab, setWorkoutTab] = useState<'pre' | 'post' | 'recovery'>('pre');
  const [fitnessCat, setFitnessCat] = useState<'all' | FitnessRecipeCategory>('all');
  const [openRecipe, setOpenRecipe] = useState<FitnessRecipe | null>(null);

  const filteredFitnessRecipes = useMemo(
    () => (fitnessCat === 'all' ? FITNESS_RECIPES : FITNESS_RECIPES.filter((r) => r.category === fitnessCat)),
    [fitnessCat],
  );

  const recipesQ = useQuery({
    queryKey: ['fitness-recipes', activeCategory],
    queryFn: () => searchRecipes({ category: activeCategory, number: 12 }),
  });

  const filteredDrinks = useMemo(
    () => (drinkFilter === 'all' ? DRINKS : DRINKS.filter((d) => d.vibe === drinkFilter)),
    [drinkFilter],
  );

  const filteredSources = useMemo(
    () => (sourceFilter === 'all' ? PROTEIN_SOURCES : PROTEIN_SOURCES.filter((s) => s.category === sourceFilter)),
    [sourceFilter],
  );

  const currentPlan = GOAL_PLANS.find((p) => p.id === activePlan)!;
  const workoutMeals = workoutTab === 'pre' ? PRE_WORKOUT : workoutTab === 'post' ? POST_WORKOUT : RECOVERY_MEALS;

  return (
    <div>
      {/* ============ HERO (light, matches other pages) ============ */}
      <section className="relative overflow-hidden bg-cream-50 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container-wide relative z-10">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tighter text-ink-900">
                Fuel your body.
                <br />
                <span className="text-sage-600">Eat with intention.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">
                A no-nonsense library for athletes, lifters, and anyone who treats
                food as part of training. Macro-balanced recipes, meal plans,
                workout-timed meals, and the cleanest fitness channels on YouTube.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#calculator" className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-sage-600">
                  <Flame className="h-4 w-4" />
                  Calculate my macros
                </a>
                <a href="#plans" className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900">
                  Pick a goal plan
                  <ArrowUpRight className="rtl-flip h-3.5 w-3.5" />
                </a>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-4 gap-2">
                {HERO_STATS.map((s) => (
                  <LightStat key={s.label} top={s.value} bottom={s.label} />
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Beef className="h-5 w-5" />, label: '1.6 to 2.2g', sub: 'protein per kg' },
                  { icon: <Coffee className="h-5 w-5" />, label: '20 to 40g', sub: 'per meal' },
                  { icon: <Zap className="h-5 w-5" />, label: '2 hours', sub: 'pre-workout window' },
                  { icon: <Heart className="h-5 w-5" />, label: '25 to 38g', sub: 'fiber daily' },
                ].map((c) => (
                  <div key={c.sub} className="rounded-2xl border border-ink-100 bg-cream-50 p-5">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-50 text-sage-600">
                      {c.icon}
                    </div>
                    <p className="mt-4 text-xl font-bold tracking-tighter text-ink-900 md:text-2xl">{c.label}</p>
                    <p className="mt-1 text-[12px] tracking-tight text-ink-500">{c.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sage-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-terracotta-500/10 blur-3xl" />
      </section>

      {/* ============ FITNESS RECIPE LIBRARY (curated, 50+ entries) ============ */}
      <section id="recipes" className="container-wide py-16 md:py-24">
        <SectionHead
          eyebrow={isAr ? 'مكتبة الفتنس' : 'Fitness recipe library'}
          icon={<Beef className="h-3 w-3" />}
          title={isAr ? `${FITNESS_RECIPES.length} وصفة عالية البروتين.` : `${FITNESS_RECIPES.length} high-protein recipes.`}
          body={
            isAr
              ? 'كل وصفة تشمل المكوّنات الكاملة والخطوات والماكروز وفيديو تحضير لبعضها. حمّل أي وصفة كـPDF أو شاركها برابط.'
              : 'Every recipe ships with full ingredients, step-by-step method, exact macros, and a technique video on many of them. Download as PDF or share by link.'
          }
        />

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFitnessCat('all')}
            className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
              fitnessCat === 'all'
                ? 'border-ink-900 bg-ink-900 text-cream-50'
                : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
            }`}
          >
            {isAr ? `الكل (${FITNESS_RECIPES.length})` : `All (${FITNESS_RECIPES.length})`}
          </button>
          {FITNESS_RECIPE_CATEGORIES.map((cat) => {
            const count = FITNESS_RECIPES.filter((r) => r.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFitnessCat(cat.id)}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                  fitnessCat === cat.id
                    ? 'border-ink-900 bg-ink-900 text-cream-50'
                    : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                }`}
              >
                {isAr ? cat.nameAr : cat.nameEn} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {filteredFitnessRecipes.map((r, i) => (
            <FitnessRecipeCard key={r.id} recipe={r} onOpen={setOpenRecipe} index={i} />
          ))}
        </div>

        {/* MealDB protein category strip - kept as supplementary "more recipes" */}
        <div className="mt-20 border-t border-ink-100 pt-16">
          <SectionHead
            eyebrow={isAr ? 'من مكتبة الوصفات' : 'From the main library'}
            icon={<Sparkles className="h-3 w-3" />}
            title={isAr ? 'وصفات إضافية حسب البروتين.' : 'More protein-rich ideas.'}
            body={
              isAr
                ? 'مزيد من الوصفات من مكتبتنا الكاملة، مصنّفة حسب نوع البروتين.'
                : 'More ideas from the full Zaytoun catalogue, grouped by protein source.'
            }
          />

          <div className="mb-8 flex flex-wrap gap-2">
            {PROTEIN_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                  activeCategory === cat
                    ? 'border-ink-900 bg-ink-900 text-cream-50'
                    : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {recipesQ.isLoading && (
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] rounded-2xl bg-cream-200" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-cream-200" />
                </div>
              ))}
            </div>
          )}
          {recipesQ.data && (
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
              {recipesQ.data.results.slice(0, 8).map((r, i) => (
                <RecipeCard key={r.id} recipe={r} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for fitness recipe detail */}
      <FitnessRecipeModal recipe={openRecipe} onClose={() => setOpenRecipe(null)} />

      {/* ============ WORKOUT MEALS ============ */}
      <section id="workout" className="border-y border-ink-100 bg-cream-100/40 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            eyebrow="Timed for training"
            icon={<Zap className="h-3 w-3" />}
            title="Workout meals."
            body="Ideas tailored to when you train. Eat for energy before, repair after, and recover overnight."
          />

          <div className="mb-8 inline-flex rounded-full border border-ink-100 bg-cream-50 p-1">
            {([
              { id: 'pre', label: 'Pre-workout', icon: <Zap className="h-3.5 w-3.5" /> },
              { id: 'post', label: 'Post-workout', icon: <Beef className="h-3.5 w-3.5" /> },
              { id: 'recovery', label: 'Recovery', icon: <Heart className="h-3.5 w-3.5" /> },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setWorkoutTab(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                  workoutTab === tab.id
                    ? 'bg-ink-900 text-cream-50'
                    : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workoutMeals.map((m, i) => (
              <article
                key={`${m.title}-${i}`}
                className="rounded-2xl border border-ink-100 bg-cream-50 p-6 transition-colors hover:border-ink-900"
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-sage-600">{m.protein}</p>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight md:text-xl">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MEAL PREP ============ */}
      <section id="mealprep" className="container-wide py-16 md:py-24">
        <SectionHead
          eyebrow="Sunday afternoon"
          icon={<ShoppingBasket className="h-3 w-3" />}
          title="Meal prep ideas."
          body="Big batches that store well. One cook session, five days of macro-balanced food."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MEAL_PREP.map((m) => (
            <article key={m.title} className="rounded-2xl border border-ink-100 bg-cream-50 p-6 transition-colors hover:border-ink-900">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-50 text-sage-600">
                <ShoppingBasket className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight md:text-xl">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{m.body}</p>
              <div className="mt-5 space-y-1.5 border-t border-ink-100 pt-4 text-[12px] tracking-tight text-ink-400">
                <p><strong className="text-ink-700">Yield:</strong> {m.yield}</p>
                <p><strong className="text-ink-700">Stores:</strong> {m.storage}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ GOAL PLANS ============ */}
      <section id="plans" className="border-y border-ink-100 bg-cream-100/40 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            eyebrow="Pick your goal"
            icon={<Calendar className="h-3 w-3" />}
            title="Goal-based plans."
            body="A starting point — not a prescription. Adjust over weeks by watching the scale and how you feel in training."
          />

          <div className="mb-8 grid grid-cols-3 gap-3">
            {GOAL_PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePlan(p.id)}
                className={`rounded-2xl border p-5 text-left transition-all ${
                  activePlan === p.id
                    ? 'border-ink-900 bg-ink-900 text-cream-50'
                    : 'border-ink-100 bg-cream-50 text-ink-700 hover:border-ink-900'
                }`}
              >
                <p className="text-lg font-semibold tracking-tight md:text-xl">{p.title}</p>
                <p className={`mt-1 text-[12px] tracking-tight ${activePlan === p.id ? 'text-cream-100/70' : 'text-ink-400'}`}>
                  {p.calories}
                </p>
              </button>
            ))}
          </div>

          <div className="rounded-3xl bg-cream-50 p-6 md:p-8">
            <div className="grid items-start gap-8 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{currentPlan.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{currentPlan.blurb}</p>
                <div className="mt-6 space-y-3">
                  <MacroLine icon={<Flame className="h-4 w-4" />} label="Daily calories" value={currentPlan.calories} />
                  <MacroLine icon={<Beef className="h-4 w-4" />} label="Protein" value={currentPlan.protein} />
                  <MacroLine icon={<Activity className="h-4 w-4" />} label="Carbs" value={currentPlan.carbs} />
                  <MacroLine icon={<Heart className="h-4 w-4" />} label="Fats" value={currentPlan.fats} />
                </div>
              </div>

              <div className="md:col-span-8">
                <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-ink-500">Sample day</p>
                <ul className="space-y-3">
                  {currentPlan.sampleDay.map((m, i) => (
                    <li key={i} className="grid gap-2 rounded-2xl border border-ink-100 p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                      <span className="text-[10px] uppercase tracking-widest text-ink-400">{m.meal}</span>
                      <p className="text-sm tracking-tight text-ink-900">{m.food}</p>
                      <span className="text-[11px] tracking-tight text-sage-600 sm:text-right">{m.macros}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MACRO CALCULATOR ============ */}
      <section id="calculator" className="container-wide py-16 md:py-24">
        <SectionHead
          eyebrow="Personal targets"
          icon={<Flame className="h-3 w-3" />}
          title="Calculate your macros."
          body="A starting estimate based on the Mifflin-St Jeor equation, the most validated BMR formula for adults today. Adjust over 2 weeks by watching the scale."
        />
        <MacroCalculator goal={activePlan} onGoalChange={setActivePlan} />
      </section>

      {/* ============ MACRO CHEAT SHEET ============ */}
      <section className="border-y border-ink-100 bg-cream-100/40 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            eyebrow="Quick reference"
            icon={<BookOpen className="h-3 w-3" />}
            title="Protein source cheat sheet."
            body="Common foods, sorted by category. Memorize a handful and you can build a meal plan in your head."
          />

          <div className="mb-6 flex flex-wrap gap-2">
            {(['all', 'meat', 'fish', 'dairy', 'eggs', 'plant', 'supplement'] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSourceFilter(c)}
                className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium capitalize tracking-tight transition-colors ${
                  sourceFilter === c
                    ? 'border-ink-900 bg-ink-900 text-cream-50'
                    : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                }`}
              >
                {c === 'all' ? 'All' : c}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl border border-ink-100 bg-cream-50">
            <div className="grid grid-cols-[1fr_80px_60px_60px] gap-2 border-b border-ink-100 bg-cream-100/60 px-5 py-3 text-[10px] font-medium uppercase tracking-widest text-ink-400 sm:grid-cols-[1fr_120px_80px_80px]">
              <span>Food</span>
              <span>Serving</span>
              <span className="text-right">Protein</span>
              <span className="text-right">Calories</span>
            </div>
            <ul className="divide-y divide-ink-100">
              {filteredSources.map((s) => (
                <li key={s.food} className="grid grid-cols-[1fr_80px_60px_60px] gap-2 px-5 py-3 text-sm tracking-tight sm:grid-cols-[1fr_120px_80px_80px]">
                  <span className="font-medium text-ink-900">{s.food}</span>
                  <span className="text-ink-500">{s.serving}</span>
                  <span className="text-right font-semibold text-sage-600 tabular-nums">{s.protein}g</span>
                  <span className="text-right text-ink-500 tabular-nums">{s.cal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ DRINKS & SHAKES ============ */}
      <section id="drinks" className="container-wide py-16 md:py-24">
        <SectionHead
          eyebrow="Drink your protein"
          icon={<GlassWater className="h-3 w-3" />}
          title="Protein drinks and shakes."
          body="Fifteen blends across the day — pre-workout fuel, post-workout repair, slow-release before bed."
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {([
            { id: 'all', label: 'All' },
            { id: 'pre', label: 'Pre-workout' },
            { id: 'post', label: 'Post-workout' },
            { id: 'anytime', label: 'Anytime' },
            { id: 'meal-replace', label: 'Meal replacement' },
          ] as const).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setDrinkFilter(c.id)}
              className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium tracking-tight transition-colors ${
                drinkFilter === c.id
                  ? 'border-ink-900 bg-ink-900 text-cream-50'
                  : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDrinks.map((d, i) => (
            <article
              key={`${d.title}-${i}`}
              className="rounded-2xl border border-ink-100 bg-cream-50 p-6 transition-colors hover:border-ink-900"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold leading-snug tracking-tight md:text-xl">{d.title}</h3>
                <span className="inline-flex flex-none items-center rounded-full bg-sage-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-sage-600">
                  {d.protein}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{d.ingredients}</p>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-ink-400">{d.vibe.replace('-', ' ')}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ============ SNACKS ============ */}
      <section className="border-y border-ink-100 bg-cream-100/40 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            eyebrow="Between meals"
            icon={<Coffee className="h-3 w-3" />}
            title="High-protein snacks."
            body="Twenty no-cook or near-no-cook ideas. Keep two or three on rotation and your protein totals will quietly take care of themselves."
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SNACKS.map((s, i) => (
              <article
                key={`${s.title}-${i}`}
                className="rounded-2xl border border-ink-100 bg-cream-50 p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-sage-600">{s.protein}</p>
                <h3 className="mt-2.5 text-base font-semibold leading-snug tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SMART SUBSTITUTIONS ============ */}
      <section className="container-wide py-16 md:py-24">
        <SectionHead
          eyebrow="Quiet upgrades"
          icon={<Repeat className="h-3 w-3" />}
          title="Boost any recipe."
          body="Fifteen one-for-one swaps that quietly bump protein without changing how a recipe tastes."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {PROTEIN_BOOSTS.map((b, i) => (
            <article key={i} className="rounded-2xl border border-ink-100 bg-cream-50 p-6">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-sage-50 text-sage-600">
                  <Repeat className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-tight tracking-tight text-ink-900">
                    <span className="text-sage-600">{b.swap}</span>{' '}
                    {b.for_ !== '—' && (
                      <>
                        instead of <span className="text-ink-500">{b.for_}</span>
                      </>
                    )}
                  </p>
                  <p className="mt-1 text-[12px] font-medium uppercase tracking-widest text-terracotta-500">{b.extra}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">{b.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ============ PROTEIN 101 ============ */}
      <section id="protein" className="border-y border-ink-100 bg-cream-100/40 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            eyebrow="The science, briefly"
            icon={<BookOpen className="h-3 w-3" />}
            title="Protein 101."
            body="Six topics that answer the questions every trainee eventually asks. Each cites peer-reviewed sports nutrition research."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {PROTEIN_101.map((topic, i) => (
              <article
                key={topic.id}
                className="rounded-3xl border border-ink-100 bg-cream-50 p-7 md:p-8"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold leading-snug tracking-tight md:text-2xl">{topic.title}</h3>
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-sage-50 text-sage-600">
                    <BookOpen className="h-4 w-4" />
                  </span>
                </div>
                {topic.highlight && (
                  <p className="mt-5 rounded-2xl bg-sage-50 px-4 py-3 text-sm font-medium leading-relaxed tracking-tight text-sage-600">
                    {topic.highlight}
                  </p>
                )}
                <p className="mt-5 text-sm leading-relaxed text-ink-600">{topic.body}</p>
                <p className="mt-5 text-[11px] tracking-tight text-ink-400">— {topic.source}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FITNESS CHANNELS ============ */}
      <section className="container-wide py-16 md:py-24">
        <SectionHead
          eyebrow="Cooks who lift"
          icon={<Tv className="h-3 w-3" />}
          title="Fitness cooking channels."
          body="A short shelf of YouTube channels worth following. Each one earns its place — no random TikTok-bait recipes."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FITNESS_CHANNELS.map((c, i) => (
            <FitnessChannelCard key={c.id} channel={c} index={i} />
          ))}
        </div>
      </section>

      {/* ============ CLOSING NOTE ============ */}
      <section className="container-wide pb-20">
        <div className="rounded-3xl bg-ink-900 px-7 py-14 text-center text-cream-50 md:px-16 md:py-20">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage-400/20 text-sage-400">
            <Sparkles className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mx-auto mt-6 max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">
            Consistency beats perfection. Hit your protein, train hard, sleep enough. The rest sorts itself out.
          </h3>
          <Link to="/recipes" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-sage-400 hover:text-ink-900">
            Browse all recipes
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ title, body }: { eyebrow?: string; title: string; body?: string; icon?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">{title}</h2>
      {body && <p className="mt-3 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">{body}</p>}
    </div>
  );
}

function LightStat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-cream-50 p-3 text-center">
      <p className="text-xl font-bold tracking-tighter text-ink-900 md:text-2xl">{top}</p>
      <p className="mt-1 text-xs tracking-tight text-ink-500">{bottom}</p>
    </div>
  );
}

function MacroLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-100 py-2 last:border-none">
      <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-tight text-ink-500">
        {icon} {label}
      </span>
      <span className="text-sm font-semibold tracking-tight text-ink-900">{value}</span>
    </div>
  );
}

function FitnessChannelCard({ channel: c, index }: { channel: (typeof FITNESS_CHANNELS)[number]; index: number }) {
  const accentBg =
    c.accent === 'terracotta' ? 'bg-terracotta-50 text-terracotta-600'
    : c.accent === 'sage' ? 'bg-sage-50 text-sage-600'
    : c.accent === 'gold' ? 'bg-cream-200 text-gold-600'
    : 'bg-ink-50 text-ink-600';

  const vibeLabel =
    c.vibe === 'protein' ? 'Protein focus'
    : c.vibe === 'science' ? 'Science-based'
    : c.vibe === 'plant' ? 'Plant-based'
    : c.vibe === 'meal-prep' ? 'Meal prep'
    : 'Cutting / fat loss';

  return (
    <a
      href={c.url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col gap-4 rounded-2xl border border-ink-100 bg-cream-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${accentBg}`}>
          <ChefHat className="h-4 w-4" strokeWidth={1.8} />
        </div>
        <ArrowUpRight className="rtl-flip h-4 w-4 text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-ink-400">{vibeLabel}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-sage-600 md:text-xl">
          {c.name}
        </h3>
        <p className="mt-0.5 text-[11px] tracking-tight text-ink-400">{c.handle}</p>
      </div>

      <p className="mt-auto text-sm leading-relaxed text-ink-600">{c.blurb}</p>

      <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-ink-400">
        <Tv className="h-3 w-3" /> Open on YouTube
      </div>
    </a>
  );
}
