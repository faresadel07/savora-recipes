import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  ChefHat,
  Clock,
  Download,
  Filter,
  Lock,
  Pin,
  PinOff,
  RefreshCw,
  Replace,
  Sparkles,
  ThumbsDown,
  Trash2,
  Utensils,
} from 'lucide-react';
import { useTranslation } from '../i18n';
import {
  dislikeAndSwap,
  generateMealPlan,
  regenerateAll,
  regenerateSlot,
  swapSlotByProtein,
  togglePinned,
  type DietFlag,
  type MealPlan,
  type MealSlot,
  type PlannedDay,
  type PlannedMeal,
  type ProteinSource,
  SLOT_LABEL_AR,
  SLOT_LABEL_EN,
  DIET_LABEL_AR,
  DIET_LABEL_EN,
} from '../lib/meal-plan-generator';
import { exportMealPlanPDF } from '../lib/meal-plan-pdf';
import type { MacroTargetsSnapshot } from './MacroCalculator';

interface Props {
  targets: MacroTargetsSnapshot;
}

const STORAGE_KEY = 'zaytoun:mealplan:v1';

const DIET_OPTIONS: DietFlag[] = ['vegetarian', 'vegan', 'dairy-free', 'gluten-free', 'nut-free', 'egg-free'];

const DAY_NAMES_EN = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
const DAY_NAMES_AR = ['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7'];

export default function MealPlanPanel({ targets }: Props) {
  const { language, t } = useTranslation();
  const isAr = language === 'ar';

  // Preferences (user inputs).
  const [mealsPerDay, setMealsPerDay] = useState<3 | 4 | 5>(3);
  const [days, setDays] = useState<1 | 3 | 7>(1);
  const [diet, setDiet] = useState<DietFlag[]>(['halal']);
  const [maxMinutes, setMaxMinutes] = useState<number | null>(null);

  // Result.
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const [busy, setBusy] = useState(false);
  const [pdfBusy, setPdfBusy] = useState<'en' | 'ar' | null>(null);
  const [optionsOpen, setOptionsOpen] = useState(false);

  // Restore any saved plan on mount so the panel survives a refresh.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as MealPlan;
        if (saved && saved.days && saved.days.length > 0) {
          setPlan(saved);
          setMealsPerDay(saved.preferences.mealsPerDay);
          setDays(saved.preferences.days);
          setDiet(saved.preferences.diet);
          setMaxMinutes(saved.preferences.maxMinutesPerMeal ?? null);
        }
      }
    } catch {
      // ignore corrupted state
    }
  }, []);

  // Persist on every plan change.
  useEffect(() => {
    if (!plan) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch {
      // storage full, ignore
    }
  }, [plan]);

  const handleGenerate = useCallback(() => {
    setBusy(true);
    // Defer with rAF so the button can show a busy state before the
    // (sync) algorithm kicks off. 300 iterations per slot is fast.
    requestAnimationFrame(() => {
      const newPlan = generateMealPlan(
        {
          calories: targets.calories,
          protein: targets.protein,
          carbs: targets.carbs,
          fat: targets.fat,
        },
        {
          mealsPerDay,
          days,
          diet,
          maxMinutesPerMeal: maxMinutes ?? undefined,
        },
      );
      setPlan(newPlan);
      setBusy(false);
      setOptionsOpen(false);
    });
  }, [targets, mealsPerDay, days, diet, maxMinutes]);

  const handleRegenAll = useCallback(() => {
    if (!plan) return;
    setBusy(true);
    requestAnimationFrame(() => {
      setPlan(regenerateAll(plan));
      setBusy(false);
    });
  }, [plan]);

  const handleRegenSlot = useCallback(
    (dayIndex: number, slot: MealSlot) => {
      if (!plan) return;
      setPlan(regenerateSlot(plan, dayIndex, slot));
    },
    [plan],
  );

  const handleTogglePin = useCallback(
    (dayIndex: number, slot: MealSlot) => {
      if (!plan) return;
      setPlan(togglePinned(plan, dayIndex, slot));
    },
    [plan],
  );

  const handleDislikeSwap = useCallback(
    (dayIndex: number, slot: MealSlot) => {
      if (!plan) return;
      setPlan(dislikeAndSwap(plan, dayIndex, slot));
    },
    [plan],
  );

  const handleSwapByProtein = useCallback(
    (dayIndex: number, slot: MealSlot, protein: ProteinSource) => {
      if (!plan) return;
      setPlan(swapSlotByProtein(plan, dayIndex, slot, protein));
    },
    [plan],
  );

  const handleClear = useCallback(() => {
    setPlan(null);
    setOptionsOpen(true);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const handleDownloadPdf = useCallback(
    async (lang: 'en' | 'ar') => {
      if (!plan) return;
      setPdfBusy(lang);
      try {
        await exportMealPlanPDF(plan, lang);
      } catch (e) {
        console.error('PDF export failed', e);
      } finally {
        setPdfBusy(null);
      }
    },
    [plan],
  );

  function toggleDiet(flag: DietFlag) {
    setDiet((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag],
    );
  }

  return (
    <div className="mt-12">
      {/* ============ HEADER + CTA ============ */}
      <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="eyebrow mb-3 inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              {t('mealplan.eyebrow')}
            </p>
            <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter text-ink-900">
              {t('mealplan.title')}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500 md:text-base">
              {t('mealplan.subtitle')}
            </p>
          </div>
          {!plan && (
            <button
              type="button"
              onClick={() => setOptionsOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
            >
              <ChefHat className="h-4 w-4" strokeWidth={2} />
              {t('mealplan.cta')}
            </button>
          )}
        </div>

        {/* ============ QUICK START PRESETS ============ */}
        {!plan && (
          <div className="mt-7 border-t border-ink-100 pt-7">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-ink-500">
              {isAr ? 'بداية سريعة' : 'Quick start'}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {(
                [
                  { id: 'lean3',   labelEn: 'Lean 3 day',    labelAr: 'تنشيف 3 أيام',   blurbEn: '4 meals · cut',    blurbAr: '4 وجبات · تنشيف', mealsPerDay: 4 as const, days: 3 as const, emoji: '🥗' },
                  { id: 'bulk7',   labelEn: 'Bulk 7 day',    labelAr: 'تضخيم 7 أيام',   blurbEn: '5 meals · gain',    blurbAr: '5 وجبات · تضخيم', mealsPerDay: 5 as const, days: 7 as const, emoji: '🥩' },
                  { id: 'maint3',  labelEn: 'Maintain 3 day', labelAr: 'محافظة 3 أيام', blurbEn: '3 meals · balance', blurbAr: '3 وجبات · توازن', mealsPerDay: 3 as const, days: 3 as const, emoji: '⚖️' },
                ] as const
              ).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setMealsPerDay(preset.mealsPerDay);
                    setDays(preset.days);
                    setDiet(['halal']);
                    setMaxMinutes(null);
                    // Defer so state flushes before generate fires.
                    setTimeout(() => handleGenerate(), 50);
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 p-5 text-start transition-all hover:border-ink-900 hover:shadow-md"
                >
                  <div className="text-2xl">{preset.emoji}</div>
                  <div className="mt-3 text-base font-semibold tracking-tight text-ink-900">
                    {isAr ? preset.labelAr : preset.labelEn}
                  </div>
                  <div className="mt-1 text-xs tracking-tight text-ink-500">
                    {isAr ? preset.blurbAr : preset.blurbEn}
                  </div>
                  <div className="absolute end-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cream-100 text-ink-300 transition-colors group-hover:bg-ink-900 group-hover:text-cream-50">
                    →
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============ OPTIONS PANEL ============ */}
        {(optionsOpen || !plan) && (
          <div className="mt-7 grid gap-6 border-t border-ink-100 pt-7 md:grid-cols-2">
            {/* Meals per day */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-ink-500">
                {t('mealplan.mealsPerDay')}
              </p>
              <div className="flex gap-2">
                {[3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setMealsPerDay(n as 3 | 4 | 5)}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-medium tracking-tight transition-colors ${
                      mealsPerDay === n
                        ? 'border-ink-900 bg-ink-900 text-cream-50'
                        : 'border-ink-100 bg-cream-50 text-ink-900 hover:border-ink-300'
                    }`}
                  >
                    {n} {t('mealplan.meals')}
                  </button>
                ))}
              </div>
            </div>

            {/* Days */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-ink-500">
                {t('mealplan.days')}
              </p>
              <div className="flex gap-2">
                {([1, 3, 7] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-medium tracking-tight transition-colors ${
                      days === d
                        ? 'border-ink-900 bg-ink-900 text-cream-50'
                        : 'border-ink-100 bg-cream-50 text-ink-900 hover:border-ink-300'
                    }`}
                  >
                    {d} {d === 1 ? t('mealplan.day') : t('mealplan.daysLabel')}
                  </button>
                ))}
              </div>
            </div>

            {/* Time cap */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-ink-500">
                <Clock className="me-1 inline h-3 w-3" strokeWidth={2} />
                {t('mealplan.timeCap')}
              </p>
              <div className="flex gap-2">
                {[
                  { v: null,  label: t('mealplan.any') },
                  { v: 30,    label: '≤ 30 min' },
                  { v: 15,    label: '≤ 15 min' },
                ].map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMaxMinutes(opt.v)}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-medium tracking-tight transition-colors ${
                      maxMinutes === opt.v
                        ? 'border-ink-900 bg-ink-900 text-cream-50'
                        : 'border-ink-100 bg-cream-50 text-ink-900 hover:border-ink-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Diet flags */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-ink-500">
                <Filter className="me-1 inline h-3 w-3" strokeWidth={2} />
                {t('mealplan.dietFlags')}
              </p>
              <div className="flex flex-wrap gap-2">
                {/* Halal is always on, shown as a non-clickable chip */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1.5 text-xs font-medium text-sage-600">
                  <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                  {isAr ? DIET_LABEL_AR.halal : DIET_LABEL_EN.halal}
                </span>
                {DIET_OPTIONS.map((flag) => {
                  const active = diet.includes(flag);
                  return (
                    <button
                      key={flag}
                      type="button"
                      onClick={() => toggleDiet(flag)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium tracking-tight transition-colors ${
                        active
                          ? 'border-ink-900 bg-ink-900 text-cream-50'
                          : 'border-ink-100 bg-cream-50 text-ink-700 hover:border-ink-300'
                      }`}
                    >
                      {isAr ? DIET_LABEL_AR[flag] : DIET_LABEL_EN[flag]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta-500 px-7 py-4 text-base font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-600 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
              >
                {busy ? (
                  <RefreshCw className="h-4 w-4 animate-spin" strokeWidth={2} />
                ) : (
                  <Sparkles className="h-4 w-4" strokeWidth={2} />
                )}
                {busy ? t('mealplan.generating') : t('mealplan.generate')}
              </button>
            </div>
          </div>
        )}

        {/* ============ RESULT TOOLBAR ============ */}
        {plan && (
          <div className="mt-7 flex flex-col gap-3 border-t border-ink-100 pt-7 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink-100 px-3 py-1.5 text-xs font-medium text-ink-700">
                <Calendar className="h-3 w-3" strokeWidth={2} />
                {plan.preferences.days} {plan.preferences.days === 1 ? t('mealplan.day') : t('mealplan.daysLabel')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-ink-100 px-3 py-1.5 text-xs font-medium text-ink-700">
                <Utensils className="h-3 w-3" strokeWidth={2} />
                {plan.preferences.mealsPerDay} {t('mealplan.meals')}
              </span>
              <button
                type="button"
                onClick={() => setOptionsOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-cream-50 px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-ink-300"
              >
                <Filter className="h-3 w-3" strokeWidth={2} />
                {t('mealplan.adjust')}
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRegenAll}
                disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-cream-50 px-4 py-2 text-xs font-medium text-ink-700 hover:border-ink-900 disabled:opacity-60"
              >
                <RefreshCw className={`h-3 w-3 ${busy ? 'animate-spin' : ''}`} strokeWidth={2} />
                {t('mealplan.regenAll')}
              </button>
              <button
                type="button"
                onClick={() => handleDownloadPdf('en')}
                disabled={pdfBusy !== null}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-xs font-medium text-cream-50 hover:bg-terracotta-500 disabled:opacity-60"
              >
                <Download className="h-3 w-3" strokeWidth={2} />
                {pdfBusy === 'en' ? '...' : 'PDF · EN'}
              </button>
              <button
                type="button"
                onClick={() => handleDownloadPdf('ar')}
                disabled={pdfBusy !== null}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-xs font-medium text-cream-50 hover:bg-terracotta-500 disabled:opacity-60"
              >
                <Download className="h-3 w-3" strokeWidth={2} />
                {pdfBusy === 'ar' ? '...' : 'PDF · AR'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-cream-50 px-4 py-2 text-xs font-medium text-ink-500 hover:border-terracotta-500 hover:text-terracotta-500"
              >
                <Trash2 className="h-3 w-3" strokeWidth={2} />
                {t('mealplan.clear')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============ DAY CARDS ============ */}
      {plan && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {plan.days.map((day) => (
            <DayCard
              key={day.index}
              day={day}
              targets={plan.targets}
              dayLabel={isAr ? DAY_NAMES_AR[day.index] : DAY_NAMES_EN[day.index]}
              isAr={isAr}
              onRegenSlot={(slot) => handleRegenSlot(day.index, slot)}
              onTogglePin={(slot) => handleTogglePin(day.index, slot)}
              onDislikeSwap={(slot) => handleDislikeSwap(day.index, slot)}
              onSwapByProtein={(slot, protein) => handleSwapByProtein(day.index, slot, protein)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Day Card
// ============================================================

function DayCard({
  day,
  targets,
  dayLabel,
  isAr,
  onRegenSlot,
  onTogglePin,
  onDislikeSwap,
  onSwapByProtein,
}: {
  day: PlannedDay;
  targets: { calories: number; protein: number; carbs: number; fat: number };
  dayLabel: string;
  isAr: boolean;
  onRegenSlot: (slot: MealSlot) => void;
  onTogglePin: (slot: MealSlot) => void;
  onDislikeSwap: (slot: MealSlot) => void;
  onSwapByProtein: (slot: MealSlot, protein: ProteinSource) => void;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-ink-100 bg-cream-50">
      {/* ===== Header ===== */}
      <header className="bg-ink-900 px-6 py-5 text-cream-50">
        <p className="text-xs font-medium uppercase tracking-widest text-cream-100/60">{dayLabel}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-semibold tracking-tighter">{day.totals.calories.toLocaleString()}</span>
          <span className="text-sm text-cream-100/60">/ {targets.calories.toLocaleString()} kcal</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <MacroBar label="P" value={day.totals.protein} target={targets.protein} color="bg-terracotta-500" />
          <MacroBar label="C" value={day.totals.carbs} target={targets.carbs} color="bg-gold-500" />
          <MacroBar label="F" value={day.totals.fat} target={targets.fat} color="bg-sage-500" />
        </div>
      </header>

      {/* ===== Meals ===== */}
      <div className="divide-y divide-ink-100">
        {day.meals.map((meal) => (
          <MealRow
            key={meal.slot}
            meal={meal}
            isAr={isAr}
            onRegen={() => onRegenSlot(meal.slot)}
            onTogglePin={() => onTogglePin(meal.slot)}
            onDislikeSwap={() => onDislikeSwap(meal.slot)}
            onSwapByProtein={(p) => onSwapByProtein(meal.slot, p)}
          />
        ))}
      </div>
    </article>
  );
}

function MacroBar({
  label,
  value,
  target,
  color,
}: {
  label: string;
  value: number;
  target: number;
  color: string;
}) {
  const pct = target > 0 ? Math.min(110, Math.round((value / target) * 100)) : 0;
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-[11px] tracking-tight text-cream-100/80">
        <span className="font-semibold">{label}</span>
        <span>
          {Math.round(value)}/{Math.round(target)}g
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-cream-100/15">
        <div
          className={`h-full ${color}`}
          style={{ width: `${pct}%`, transition: 'width 300ms ease-out' }}
        />
      </div>
    </div>
  );
}

function MealRow({
  meal,
  isAr,
  onRegen,
  onTogglePin,
  onDislikeSwap,
  onSwapByProtein,
}: {
  meal: PlannedMeal;
  isAr: boolean;
  onRegen: () => void;
  onTogglePin: () => void;
  onDislikeSwap: () => void;
  onSwapByProtein: (p: ProteinSource) => void;
}) {
  const [proteinMenuOpen, setProteinMenuOpen] = useState(false);
  const proteinOptions: { id: ProteinSource; label: string; labelAr: string; emoji: string }[] = [
    { id: 'chicken', label: 'Chicken', labelAr: 'دجاج', emoji: '🐔' },
    { id: 'beef',    label: 'Beef',    labelAr: 'لحم',  emoji: '🥩' },
    { id: 'fish',    label: 'Fish',    labelAr: 'سمك',  emoji: '🐟' },
    { id: 'plant',   label: 'Plant',   labelAr: 'نباتي', emoji: '🌱' },
    { id: 'egg',     label: 'Egg',     labelAr: 'بيض',  emoji: '🥚' },
    { id: 'dairy',   label: 'Dairy',   labelAr: 'ألبان', emoji: '🥛' },
  ];
  const slotLabel = isAr ? SLOT_LABEL_AR[meal.slot] : SLOT_LABEL_EN[meal.slot];
  const title = isAr ? meal.recipe.titleAr : meal.recipe.title;
  return (
    <div className="flex items-stretch gap-4 px-4 py-4 md:px-6">
      <Link
        to={`/recipe/fr-${meal.recipe.id}`}
        className="relative flex-shrink-0 overflow-hidden rounded-xl"
        aria-label={title}
      >
        <img
          src={meal.recipe.image}
          alt={title}
          loading="lazy"
          className="h-20 w-20 object-cover md:h-24 md:w-24"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-terracotta-500">
          {slotLabel}
        </p>
        <h4 className="mt-0.5 truncate text-base font-semibold tracking-tight text-ink-900">
          {title}
        </h4>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" strokeWidth={2} /> {meal.recipe.minutes} min
          </span>
          <span>×{meal.portion.toFixed(2)} {isAr ? 'حصة' : 'serving'}{meal.portion === 1 ? '' : 's'}</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="rounded-full bg-cream-100 px-2 py-0.5 font-semibold text-ink-900">{meal.calories} kcal</span>
          <span className="rounded-full bg-terracotta-50 px-2 py-0.5 text-terracotta-500">P {meal.protein}g</span>
          <span className="rounded-full bg-gold-400/20 px-2 py-0.5 text-gold-600">C {meal.carbs}g</span>
          <span className="rounded-full bg-sage-50 px-2 py-0.5 text-sage-600">F {meal.fat}g</span>
        </div>
      </div>
      <div className="relative flex flex-col items-center gap-1.5">
        <button
          type="button"
          onClick={onTogglePin}
          aria-label={meal.pinned ? 'Unpin meal' : 'Pin meal'}
          className={`grid h-8 w-8 place-items-center rounded-full border transition-colors ${
            meal.pinned
              ? 'border-terracotta-500 bg-terracotta-500 text-cream-50'
              : 'border-ink-100 bg-cream-50 text-ink-500 hover:border-ink-300'
          }`}
        >
          {meal.pinned ? <Pin className="h-3.5 w-3.5" strokeWidth={2.2} /> : <PinOff className="h-3.5 w-3.5" strokeWidth={2.2} />}
        </button>
        <button
          type="button"
          onClick={onRegen}
          disabled={meal.pinned}
          aria-label="Regenerate this meal"
          title={meal.pinned ? 'Unpin first to regenerate' : 'Regenerate this meal'}
          className="grid h-8 w-8 place-items-center rounded-full border border-ink-100 bg-cream-50 text-ink-500 transition-colors hover:border-ink-300 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {meal.pinned ? <Lock className="h-3.5 w-3.5" strokeWidth={2.2} /> : <RefreshCw className="h-3.5 w-3.5" strokeWidth={2.2} />}
        </button>
        <button
          type="button"
          onClick={() => setProteinMenuOpen((v) => !v)}
          disabled={meal.pinned}
          aria-label="Swap by protein"
          title="Swap by protein source"
          className="grid h-8 w-8 place-items-center rounded-full border border-ink-100 bg-cream-50 text-ink-500 transition-colors hover:border-ink-300 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Replace className="h-3.5 w-3.5" strokeWidth={2.2} />
        </button>
        <button
          type="button"
          onClick={onDislikeSwap}
          disabled={meal.pinned}
          aria-label="Dislike and swap"
          title="Permanently dislike this recipe and swap it"
          className="grid h-8 w-8 place-items-center rounded-full border border-ink-100 bg-cream-50 text-ink-500 transition-colors hover:border-terracotta-500 hover:text-terracotta-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ThumbsDown className="h-3.5 w-3.5" strokeWidth={2.2} />
        </button>
        {proteinMenuOpen && (
          <div className="absolute end-10 top-0 z-30 w-44 overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 shadow-lg">
            <div className="border-b border-ink-100 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-ink-500">
              {isAr ? 'بدّل لـ' : 'Swap to'}
            </div>
            {proteinOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setProteinMenuOpen(false);
                  onSwapByProtein(opt.id);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-start text-sm tracking-tight text-ink-700 hover:bg-cream-100"
              >
                <span className="text-base">{opt.emoji}</span>
                {isAr ? opt.labelAr : opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
