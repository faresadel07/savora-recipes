import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Flame, Search, Sliders, Sparkles, X } from 'lucide-react';
import { useTranslation } from '../i18n';
import { FITNESS_RECIPES, type FitnessRecipe } from '../data/fitness-recipes';

interface Range {
  min: number;
  max: number;
}

interface Filters {
  calories: Range;
  protein: Range;
  carbs: Range;
  fat: Range;
  maxMinutes: number;
  category: 'any' | FitnessRecipe['category'];
}

const DEFAULTS: Filters = {
  calories:   { min: 0,    max: 1500 },
  protein:    { min: 0,    max: 100 },
  carbs:      { min: 0,    max: 200 },
  fat:        { min: 0,    max: 60 },
  maxMinutes: 120,
  category:   'any',
};

const CATEGORY_OPTIONS: { id: Filters['category']; en: string; ar: string }[] = [
  { id: 'any',          en: 'Any',          ar: 'الكل' },
  { id: 'breakfast',    en: 'Breakfast',    ar: 'فطور' },
  { id: 'bulk',         en: 'Bulking',      ar: 'تضخيم' },
  { id: 'lean',         en: 'Lean',         ar: 'تنشيف' },
  { id: 'post-workout', en: 'Post workout', ar: 'بعد التمرين' },
  { id: 'snack',        en: 'Snack',        ar: 'سناك' },
  { id: 'mealprep',     en: 'Meal prep',    ar: 'تحضير وجبات' },
];

export default function RecipeMacroFilter() {
  const { language, t } = useTranslation();
  const isAr = language === 'ar';
  const [filters, setFilters] = useState<Filters>(DEFAULTS);

  const results = useMemo(() => {
    return FITNESS_RECIPES.filter((r) => {
      if (filters.category !== 'any' && r.category !== filters.category) return false;
      if (r.minutes > filters.maxMinutes) return false;
      if (r.calories < filters.calories.min || r.calories > filters.calories.max) return false;
      if (r.protein < filters.protein.min || r.protein > filters.protein.max) return false;
      if (r.carbs < filters.carbs.min || r.carbs > filters.carbs.max) return false;
      if (r.fat < filters.fat.min || r.fat > filters.fat.max) return false;
      return true;
    });
  }, [filters]);

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  function reset() {
    setFilters(DEFAULTS);
  }

  return (
    <section className="container-wide mt-16 md:mt-20">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3 inline-flex items-center gap-2">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            {t('macroFilter.eyebrow')}
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
            {t('macroFilter.title')}
          </h2>
          <p className="mt-2 max-w-xl text-sm tracking-tight text-ink-500 md:text-base">
            {t('macroFilter.subtitle')}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-cream-50 px-4 py-2 text-xs font-medium text-ink-700 hover:border-ink-300"
        >
          <X className="h-3 w-3" strokeWidth={2} />
          {isAr ? 'إعادة ضبط' : 'Reset'}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* ===== Filters ===== */}
        <aside className="rounded-3xl border border-ink-100 bg-cream-50 p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-900">
            <Sliders className="h-4 w-4" strokeWidth={2} />
            {isAr ? 'الفلاتر' : 'Filters'}
          </div>

          {/* Category */}
          <div className="mb-5">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-ink-500">
              {isAr ? 'الفئة' : 'Category'}
            </p>
            <select
              value={filters.category}
              onChange={(e) => update('category', e.target.value as Filters['category'])}
              className="w-full rounded-xl border border-ink-100 bg-cream-50 px-3 py-2 text-sm focus:border-ink-900 focus:outline-none"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {isAr ? c.ar : c.en}
                </option>
              ))}
            </select>
          </div>

          <RangeSlider
            label={isAr ? 'السعرات (kcal)' : 'Calories (kcal)'}
            range={filters.calories}
            absMax={1800}
            step={50}
            onChange={(r) => update('calories', r)}
          />
          <RangeSlider
            label={isAr ? 'البروتين (g)' : 'Protein (g)'}
            range={filters.protein}
            absMax={120}
            step={5}
            onChange={(r) => update('protein', r)}
          />
          <RangeSlider
            label={isAr ? 'الكاربس (g)' : 'Carbs (g)'}
            range={filters.carbs}
            absMax={250}
            step={5}
            onChange={(r) => update('carbs', r)}
          />
          <RangeSlider
            label={isAr ? 'الدهون (g)' : 'Fat (g)'}
            range={filters.fat}
            absMax={80}
            step={2}
            onChange={(r) => update('fat', r)}
          />

          <div className="mb-2">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-ink-500">
              <Clock className="mr-1 inline h-3 w-3" strokeWidth={2} />
              {isAr ? `أقصى وقت: ${filters.maxMinutes} د` : `Max time: ${filters.maxMinutes} min`}
            </p>
            <input
              type="range"
              min={5}
              max={180}
              step={5}
              value={filters.maxMinutes}
              onChange={(e) => update('maxMinutes', Number(e.target.value))}
              className="w-full accent-ink-900"
            />
          </div>
        </aside>

        {/* ===== Results ===== */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-ink-700">
              {isAr ? `${results.length} وصفة` : `${results.length} recipes`}
            </p>
          </div>
          {results.length === 0 ? (
            <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
              <Search className="mx-auto h-8 w-8 text-ink-300" strokeWidth={1.5} />
              <p className="mt-3 text-base text-ink-600">
                {isAr ? 'لا توجد وصفات تطابق الفلاتر' : 'No recipes match these filters'}
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2 text-sm font-medium text-ink-900 hover:border-ink-900"
              >
                {isAr ? 'إعادة الضبط' : 'Reset filters'}
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.slice(0, 24).map((r) => (
                <RecipeMacroCard key={r.id} recipe={r} isAr={isAr} />
              ))}
            </div>
          )}
          {results.length > 24 && (
            <p className="mt-4 text-center text-xs text-ink-500">
              {isAr ? `يعرض 24 من ${results.length}. ضيّق الفلاتر لرؤية المزيد.` : `Showing 24 of ${results.length}. Tighten filters to see more.`}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function RangeSlider({ label, range, absMax, step, onChange }: { label: string; range: Range; absMax: number; step: number; onChange: (r: Range) => void }) {
  return (
    <div className="mb-5">
      <p className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-widest text-ink-500">
        <span>{label}</span>
        <span className="font-normal normal-case tracking-tight text-ink-700">
          {range.min} – {range.max}
        </span>
      </p>
      <div className="flex gap-2">
        <input
          type="number"
          value={range.min}
          step={step}
          min={0}
          max={range.max}
          onChange={(e) => onChange({ ...range, min: Math.max(0, Math.min(range.max, Number(e.target.value))) })}
          className="w-20 rounded-lg border border-ink-100 bg-cream-50 px-2 py-1 text-xs"
        />
        <input
          type="range"
          min={0}
          max={absMax}
          step={step}
          value={range.max}
          onChange={(e) => onChange({ ...range, max: Math.max(range.min, Number(e.target.value)) })}
          className="flex-1 accent-ink-900"
        />
        <input
          type="number"
          value={range.max}
          step={step}
          min={range.min}
          max={absMax}
          onChange={(e) => onChange({ ...range, max: Math.max(range.min, Math.min(absMax, Number(e.target.value))) })}
          className="w-20 rounded-lg border border-ink-100 bg-cream-50 px-2 py-1 text-xs"
        />
      </div>
    </div>
  );
}

function RecipeMacroCard({ recipe, isAr }: { recipe: FitnessRecipe; isAr: boolean }) {
  const title = isAr ? recipe.titleAr : recipe.title;
  return (
    <Link
      to={`/recipe/fr-${recipe.id}`}
      className="group overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 transition-shadow hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-cream-200">
        <img
          src={recipe.image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-ink-900">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-ink-500">
          <span className="inline-flex items-center gap-0.5">
            <Clock className="h-3 w-3" strokeWidth={2} /> {recipe.minutes}m
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Flame className="h-3 w-3" strokeWidth={2} /> {recipe.calories}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
          <span className="rounded-full bg-terracotta-50 px-2 py-0.5 text-terracotta-500">
            P {recipe.protein}g
          </span>
          <span className="rounded-full bg-gold-400/20 px-2 py-0.5 text-gold-600">
            C {recipe.carbs}g
          </span>
          <span className="rounded-full bg-sage-50 px-2 py-0.5 text-sage-600">
            F {recipe.fat}g
          </span>
        </div>
      </div>
    </Link>
  );
}
