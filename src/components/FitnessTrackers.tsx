import { useEffect, useMemo, useState } from 'react';
import { Droplet, Flame, Minus, Plus, Sparkles, Trash2, X } from 'lucide-react';
import { useTranslation } from '../i18n';
import {
  addCup,
  addMacroEntry,
  bumpStreak,
  getHydrationToday,
  getMacroLogToday,
  getStreak,
  removeCup,
  removeMacroEntry,
  setHydrationGoal,
  sumMacros,
  type HydrationEntry,
  type MacroLogEntry,
  type StreakState,
} from '../lib/fitness-trackers';
import type { MacroTargetsSnapshot } from './MacroCalculator';

interface Props {
  /** When the user has a meal plan target, we show progress vs target. */
  targets?: MacroTargetsSnapshot | null;
}

export default function FitnessTrackers({ targets }: Props) {
  const { language, t } = useTranslation();
  const isAr = language === 'ar';

  const [hydration, setHydration] = useState<HydrationEntry>(() => getHydrationToday(8));
  const [macroLog, setMacroLog] = useState<MacroLogEntry[]>(() => getMacroLogToday());
  const [streak, setStreak] = useState<StreakState>(() => getStreak());
  const [showLogger, setShowLogger] = useState(false);

  // Refresh once on mount in case the page survived a midnight rollover.
  useEffect(() => {
    setHydration(getHydrationToday(8));
    setMacroLog(getMacroLogToday());
    setStreak(getStreak());
  }, []);

  const totals = useMemo(() => sumMacros(macroLog), [macroLog]);

  function handleAddCup() {
    setHydration(addCup());
    setStreak(bumpStreak());
  }

  function handleRemoveCup() {
    setHydration(removeCup());
  }

  function handleAddMacro(entry: Omit<MacroLogEntry, 'date' | 'timestamp'>) {
    addMacroEntry(entry);
    setMacroLog(getMacroLogToday());
    setStreak(bumpStreak());
    setShowLogger(false);
  }

  function handleRemoveMacro(ts: number) {
    removeMacroEntry(ts);
    setMacroLog(getMacroLogToday());
  }

  function handleGoalChange(g: number) {
    setHydrationGoal(g);
    setHydration({ ...hydration, goal: g });
  }

  return (
    <section className="container-wide mt-16 md:mt-20">
      <div className="mb-8">
        <p className="eyebrow mb-3 inline-flex items-center gap-2">
          <Sparkles className="h-3 w-3" strokeWidth={2} />
          {t('trackers.eyebrow')}
        </p>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
          {t('trackers.title')}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500 md:text-base">
          {t('trackers.subtitle')}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hydration */}
        <HydrationCard
          hydration={hydration}
          isAr={isAr}
          onAdd={handleAddCup}
          onRemove={handleRemoveCup}
          onGoalChange={handleGoalChange}
        />

        {/* Streak */}
        <StreakCard streak={streak} isAr={isAr} />

        {/* Macro log */}
        <MacroLogCard
          totals={totals}
          targets={targets ?? null}
          entries={macroLog}
          isAr={isAr}
          onAddOpen={() => setShowLogger(true)}
          onRemove={handleRemoveMacro}
        />
      </div>

      {showLogger && (
        <MacroLoggerModal
          isAr={isAr}
          targets={targets ?? null}
          totals={totals}
          onClose={() => setShowLogger(false)}
          onAdd={handleAddMacro}
        />
      )}
    </section>
  );
}

// ============================================================
// Hydration card with 8 visible cups
// ============================================================

function HydrationCard({
  hydration,
  isAr,
  onAdd,
  onRemove,
  onGoalChange,
}: {
  hydration: HydrationEntry;
  isAr: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onGoalChange: (g: number) => void;
}) {
  const cups = Array.from({ length: hydration.goal });
  const pct = Math.min(100, (hydration.cups / hydration.goal) * 100);
  return (
    <article className="rounded-3xl border border-ink-100 bg-cream-50 p-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplet className="h-4 w-4 text-sage-500" strokeWidth={2} />
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
            {isAr ? 'الترطيب اليوم' : 'Hydration today'}
          </p>
        </div>
        <select
          value={hydration.goal}
          onChange={(e) => onGoalChange(Number(e.target.value))}
          aria-label="Daily goal"
          className="rounded-full border border-ink-100 bg-cream-100 px-3 py-1 text-xs tracking-tight text-ink-700 focus:outline-none"
        >
          {[6, 8, 10, 12].map((g) => (
            <option key={g} value={g}>
              {isAr ? `هدف ${g}` : `Goal ${g}`}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-5xl font-semibold tracking-tighter text-ink-900">{hydration.cups}</span>
        <span className="text-base text-ink-500">/ {hydration.goal} {isAr ? 'كاسات' : 'cups'}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cream-200">
        <div className="h-full bg-sage-500 transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {cups.map((_, i) => {
          const filled = i < hydration.cups;
          return (
            <button
              key={i}
              type="button"
              onClick={() => (i < hydration.cups ? onRemove() : onAdd())}
              aria-label={filled ? 'Remove cup' : 'Add cup'}
              className={`grid h-10 w-10 place-items-center rounded-full border transition-all ${
                filled
                  ? 'border-sage-500 bg-sage-500 text-cream-50 shadow-sm'
                  : 'border-ink-100 bg-cream-50 text-ink-300 hover:border-sage-500 hover:text-sage-500'
              }`}
            >
              <Droplet className="h-4 w-4" strokeWidth={2} fill={filled ? 'currentColor' : 'none'} />
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={onRemove}
          disabled={hydration.cups === 0}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-ink-100 bg-cream-50 px-4 py-2 text-xs font-medium text-ink-700 transition-colors hover:border-ink-300 disabled:opacity-40"
        >
          <Minus className="h-3 w-3" strokeWidth={2} />
          {isAr ? 'كاسة' : 'Cup'}
        </button>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-xs font-medium text-cream-50 hover:bg-terracotta-500"
        >
          <Plus className="h-3 w-3" strokeWidth={2} />
          {isAr ? 'كاسة' : 'Cup'}
        </button>
      </div>
    </article>
  );
}

// ============================================================
// Streak card
// ============================================================

function StreakCard({ streak, isAr }: { streak: StreakState; isAr: boolean }) {
  return (
    <article className="overflow-hidden rounded-3xl bg-ink-900 p-6 text-cream-50">
      <div className="flex items-center gap-2">
        <Flame className="h-4 w-4 text-terracotta-400" strokeWidth={2} />
        <p className="text-xs font-semibold uppercase tracking-widest text-cream-100/60">
          {isAr ? 'سلسلة الأيام' : 'Daily streak'}
        </p>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-5xl font-semibold tracking-tighter">{streak.current}</span>
        <span className="text-base text-cream-100/55">{isAr ? 'يوم' : 'days'}</span>
      </div>

      <p className="mt-3 text-sm text-cream-100/70">
        {streak.current === 0
          ? (isAr ? 'سجّل أي شي اليوم لتبدأ السلسلة.' : 'Log anything today to begin your streak.')
          : (isAr ? 'سجّل شي بكرا للحفاظ على سلسلتك.' : 'Log tomorrow to keep your streak alive.')}
      </p>

      <div className="mt-6 border-t border-cream-100/15 pt-4">
        <p className="text-[11px] font-medium uppercase tracking-widest text-cream-100/55">
          {isAr ? 'أطول سلسلة' : 'Longest streak'}
        </p>
        <p className="mt-1 text-2xl font-semibold tracking-tighter">{streak.longest} {isAr ? 'يوم' : 'days'}</p>
      </div>
    </article>
  );
}

// ============================================================
// Macro log card
// ============================================================

function MacroLogCard({
  totals,
  targets,
  entries,
  isAr,
  onAddOpen,
  onRemove,
}: {
  totals: { calories: number; protein: number; carbs: number; fat: number };
  targets: MacroTargetsSnapshot | null;
  entries: MacroLogEntry[];
  isAr: boolean;
  onAddOpen: () => void;
  onRemove: (ts: number) => void;
}) {
  return (
    <article className="rounded-3xl border border-ink-100 bg-cream-50 p-6">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
          {isAr ? 'تسجيل اليوم' : "Today's log"}
        </p>
        <button
          type="button"
          onClick={onAddOpen}
          className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 hover:bg-terracotta-500"
        >
          <Plus className="h-3 w-3" strokeWidth={2.5} />
          {isAr ? 'سجّل وجبة' : 'Log meal'}
        </button>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-5xl font-semibold tracking-tighter text-ink-900">{totals.calories}</span>
        <span className="text-base text-ink-500">
          {targets ? `/ ${targets.calories} ${isAr ? 'سعرة' : 'kcal'}` : `${isAr ? 'سعرة' : 'kcal'}`}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <MacroProgress label={isAr ? 'بروتين' : 'Protein'} value={totals.protein} target={targets?.protein} color="bg-terracotta-500" />
        <MacroProgress label={isAr ? 'كاربس' : 'Carbs'}    value={totals.carbs}   target={targets?.carbs}   color="bg-gold-500" />
        <MacroProgress label={isAr ? 'دهون' : 'Fat'}       value={totals.fat}     target={targets?.fat}     color="bg-sage-500" />
      </div>

      {entries.length > 0 && (
        <div className="mt-5 border-t border-ink-100 pt-4">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-ink-500">
            {isAr ? `${entries.length} وجبة` : `${entries.length} entries`}
          </p>
          <ul className="space-y-1.5">
            {entries.slice(-4).map((e) => (
              <li key={e.timestamp} className="flex items-center justify-between gap-2 text-xs">
                <span className="truncate text-ink-700">{e.name}</span>
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-ink-900">{e.calories} kcal</span>
                  <button
                    type="button"
                    onClick={() => onRemove(e.timestamp)}
                    className="text-ink-300 hover:text-terracotta-500"
                    aria-label="Remove entry"
                  >
                    <Trash2 className="h-3 w-3" strokeWidth={2} />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function MacroProgress({ label, value, target, color }: { label: string; value: number; target?: number; color: string }) {
  const pct = target && target > 0 ? Math.min(110, Math.round((value / target) * 100)) : 0;
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px] tracking-tight text-ink-700">
        <span>{label}</span>
        <span>
          {Math.round(value)}g{target ? ` / ${Math.round(target)}g` : ''}
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-cream-200">
        <div className={`h-full ${color}`} style={{ width: `${pct}%`, transition: 'width 300ms ease-out' }} />
      </div>
    </div>
  );
}

// ============================================================
// Macro logger modal
// ============================================================

function MacroLoggerModal({
  isAr,
  targets,
  totals,
  onAdd,
  onClose,
}: {
  isAr: boolean;
  targets: MacroTargetsSnapshot | null;
  totals: { calories: number; protein: number; carbs: number; fat: number };
  onAdd: (entry: Omit<MacroLogEntry, 'date' | 'timestamp'>) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const remaining = targets
    ? {
        calories: Math.max(0, targets.calories - totals.calories),
        protein: Math.max(0, targets.protein - totals.protein),
        carbs: Math.max(0, targets.carbs - totals.carbs),
        fat: Math.max(0, targets.fat - totals.fat),
      }
    : null;

  function submit() {
    if (!name.trim()) return;
    onAdd({
      name: name.trim(),
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    });
  }

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-ink-900/80 p-4 backdrop-blur-md">
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-3xl bg-cream-50 p-6">
        <button type="button" onClick={onClose} className="absolute end-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-cream-100 text-ink-700 hover:bg-cream-200" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
        <h3 className="text-lg font-semibold tracking-tighter text-ink-900">
          {isAr ? 'سجّل وجبة' : 'Log a meal'}
        </h3>
        <p className="mt-1 text-xs text-ink-500">
          {remaining
            ? (isAr
                ? `متبقي اليوم: ${remaining.calories} kcal · P ${Math.round(remaining.protein)}g · C ${Math.round(remaining.carbs)}g · F ${Math.round(remaining.fat)}g`
                : `Remaining today: ${remaining.calories} kcal · P ${Math.round(remaining.protein)}g · C ${Math.round(remaining.carbs)}g · F ${Math.round(remaining.fat)}g`)
            : (isAr ? 'أكمل الحاسبة لرؤية المتبقي.' : 'Complete the calculator to see remaining.')}
        </p>

        <div className="mt-5 space-y-3">
          <Input label={isAr ? 'الاسم' : 'Name'} value={name} onChange={setName} placeholder={isAr ? 'دجاج مشوي' : 'Grilled chicken'} type="text" />
          <Input label={isAr ? 'سعرات' : 'Calories'} value={calories} onChange={setCalories} placeholder="420" />
          <div className="grid grid-cols-3 gap-2">
            <Input label={isAr ? 'P' : 'P'} value={protein} onChange={setProtein} placeholder="35" />
            <Input label={isAr ? 'C' : 'C'} value={carbs} onChange={setCarbs} placeholder="40" />
            <Input label={isAr ? 'F' : 'F'} value={fat} onChange={setFat} placeholder="12" />
          </div>
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={!name.trim()}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta-500 px-5 py-3 text-sm font-medium text-cream-50 hover:bg-terracotta-600 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" strokeWidth={2.2} />
          {isAr ? 'إضافة' : 'Add to log'}
        </button>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = 'number' }: { label: string; value: string; onChange: (s: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-ink-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink-100 bg-cream-50 px-3 py-2 text-sm tracking-tight text-ink-900 placeholder:text-ink-300 focus:border-ink-900 focus:outline-none"
      />
    </div>
  );
}
