import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Beef,
  Bookmark,
  Check,
  Download,
  Droplet,
  Droplets,
  HelpCircle,
  Wheat,
} from 'lucide-react';

type Sex = 'male' | 'female';
type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Goal = 'cut' | 'maintain' | 'bulk';
type Unit = 'metric' | 'imperial';
type Split = 'standard' | 'high-protein' | 'keto';

const STORAGE_KEY = 'zaytoun:macros:v1';

const ACTIVITY_MULTIPLIER: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const ACTIVITY_BONUS_ML: Record<Activity, number> = {
  sedentary: 0,
  light: 350,
  moderate: 600,
  active: 900,
  very_active: 1200,
};

const GOAL_ADJUST: Record<Goal, number> = {
  cut: -500,
  maintain: 0,
  bulk: 400,
};

const SPLIT_PROTEIN_PER_KG: Record<Split, Record<Goal, number>> = {
  standard: { cut: 2.2, maintain: 1.8, bulk: 2.0 },
  'high-protein': { cut: 2.6, maintain: 2.2, bulk: 2.4 },
  keto: { cut: 1.8, maintain: 1.6, bulk: 1.8 },
};

const SPLIT_FAT_PCT: Record<Split, number> = {
  standard: 0.27,
  'high-protein': 0.25,
  keto: 0.7,
};

interface BoundsResult {
  min: number;
  max: number;
  unit: string;
  label: string;
}

const BOUNDS: Record<'age' | 'weight-metric' | 'weight-imperial' | 'height-metric' | 'height-imperial' | 'bodyfat', BoundsResult> = {
  age: { min: 14, max: 90, unit: 'years', label: 'Age' },
  'weight-metric': { min: 30, max: 250, unit: 'kg', label: 'Weight' },
  'weight-imperial': { min: 66, max: 550, unit: 'lb', label: 'Weight' },
  'height-metric': { min: 120, max: 230, unit: 'cm', label: 'Height' },
  'height-imperial': { min: 47, max: 90, unit: 'in', label: 'Height' },
  bodyfat: { min: 3, max: 60, unit: '%', label: 'Body fat' },
};

function mifflinStJeor(sex: Sex, weightKg: number, heightCm: number, age: number) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(sex === 'male' ? base + 5 : base - 161);
}

function katchMcArdle(weightKg: number, bodyFatPct: number) {
  const lbm = weightKg * (1 - bodyFatPct / 100);
  return Math.round(370 + 21.6 * lbm);
}

interface SavedMacros {
  sex: Sex;
  unit: Unit;
  age: string;
  weight: string;
  height: string;
  bodyFat: string;
  activity: Activity;
  split: Split;
}

function loadSaved(): Partial<SavedMacros> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<SavedMacros>) : {};
  } catch {
    return {};
  }
}

interface Props {
  /** When provided, the goal is controlled by the parent so the Goal Plans
   *  section and the Calculator stay in sync. */
  goal?: Goal;
  onGoalChange?: (g: Goal) => void;
}

export default function MacroCalculator({ goal: controlledGoal, onGoalChange }: Props) {
  const initial = loadSaved();

  const [sex, setSex] = useState<Sex>(initial.sex ?? 'male');
  const [unit, setUnit] = useState<Unit>(initial.unit ?? 'metric');
  const [age, setAge] = useState<string>(initial.age ?? '');
  const [weight, setWeight] = useState<string>(initial.weight ?? '');
  const [height, setHeight] = useState<string>(initial.height ?? '');
  const [bodyFat, setBodyFat] = useState<string>(initial.bodyFat ?? '');
  const [activity, setActivity] = useState<Activity>(initial.activity ?? 'moderate');
  const [internalGoal, setInternalGoal] = useState<Goal>('maintain');
  const [split, setSplit] = useState<Split>(initial.split ?? 'standard');
  const [savedMsg, setSavedMsg] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  const goal = controlledGoal ?? internalGoal;
  function setGoal(g: Goal) {
    if (onGoalChange) onGoalChange(g);
    else setInternalGoal(g);
  }

  const ageNum = age ? Number(age) : NaN;
  const weightNum = weight ? Number(weight) : NaN;
  const heightNum = height ? Number(height) : NaN;
  const bodyFatNum = bodyFat ? Number(bodyFat) : NaN;

  const ageBounds = BOUNDS.age;
  const weightBounds = unit === 'metric' ? BOUNDS['weight-metric'] : BOUNDS['weight-imperial'];
  const heightBounds = unit === 'metric' ? BOUNDS['height-metric'] : BOUNDS['height-imperial'];
  const bodyFatBounds = BOUNDS.bodyfat;

  const ageError = age && (isNaN(ageNum) || ageNum < ageBounds.min || ageNum > ageBounds.max);
  const weightError = weight && (isNaN(weightNum) || weightNum < weightBounds.min || weightNum > weightBounds.max);
  const heightError = height && (isNaN(heightNum) || heightNum < heightBounds.min || heightNum > heightBounds.max);
  const bodyFatError = bodyFat && (isNaN(bodyFatNum) || bodyFatNum < bodyFatBounds.min || bodyFatNum > bodyFatBounds.max);

  const result = useMemo(() => {
    if (!age || !weight || !height) return null;
    if (ageError || weightError || heightError) return null;

    const weightKg = unit === 'metric' ? weightNum : weightNum * 0.453592;
    const heightCm = unit === 'metric' ? heightNum : heightNum * 2.54;

    const useKatch = bodyFat && !bodyFatError && bodyFatNum >= bodyFatBounds.min && bodyFatNum <= bodyFatBounds.max;
    const bmr = useKatch ? katchMcArdle(weightKg, bodyFatNum) : mifflinStJeor(sex, weightKg, heightCm, ageNum);
    const tdee = Math.round(bmr * ACTIVITY_MULTIPLIER[activity]);
    const targetCal = Math.max(1200, tdee + GOAL_ADJUST[goal]);
    const proteinG = Math.round(weightKg * SPLIT_PROTEIN_PER_KG[split][goal]);
    const fatPct = SPLIT_FAT_PCT[split];
    const fatG = Math.round((targetCal * fatPct) / 9);
    const carbsG = Math.max(0, Math.round((targetCal - proteinG * 4 - fatG * 9) / 4));
    const waterMl = Math.round(weightKg * 35 + ACTIVITY_BONUS_ML[activity]);

    return {
      bmr,
      tdee,
      targetCal,
      proteinG,
      fatG,
      carbsG,
      waterMl,
      method: useKatch ? 'Katch-McArdle' : 'Mifflin-St Jeor',
      weightKg,
      heightCm,
    };
  }, [age, weight, height, bodyFat, sex, unit, activity, goal, split, ageNum, weightNum, heightNum, bodyFatNum, ageError, weightError, heightError, bodyFatError, bodyFatBounds.min, bodyFatBounds.max]);

  // Debounced auto-save on every meaningful change once we have valid input.
  const saveTimer = useRef<number | null>(null);
  useEffect(() => {
    if (!age || !weight || !height) return;
    if (ageError || weightError || heightError) return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        const payload: SavedMacros = { sex, unit, age, weight, height, bodyFat, activity, split };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        setSavedMsg(true);
        window.setTimeout(() => setSavedMsg(false), 1400);
      } catch {
        /* ignore */
      }
    }, 700);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [sex, unit, age, weight, height, bodyFat, activity, split, ageError, weightError, heightError]);

  async function handleDownloadPDF() {
    if (!result) return;
    setPdfBusy(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const MARGIN = 56;
      const W = doc.internal.pageSize.getWidth() - MARGIN * 2;
      let y = MARGIN;

      const writeLine = (text: string, size: number, weight: 'normal' | 'bold' = 'normal', spaceAfter = 6) => {
        doc.setFont('helvetica', weight);
        doc.setFontSize(size);
        const lines = doc.splitTextToSize(text, W);
        for (const ln of lines) {
          if (y > doc.internal.pageSize.getHeight() - MARGIN) {
            doc.addPage();
            y = MARGIN;
          }
          doc.text(ln, MARGIN, y);
          y += size + 2;
        }
        y += spaceAfter;
      };

      writeLine('Your Daily Macros', 28, 'bold', 4);
      writeLine(new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), 11, 'normal', 18);

      doc.setDrawColor(220);
      doc.line(MARGIN, y, MARGIN + W, y);
      y += 18;

      writeLine('YOUR INPUTS', 11, 'bold', 4);
      writeLine(`Sex:    ${sex === 'male' ? 'Male' : 'Female'}`, 11, 'normal', 2);
      writeLine(`Age:    ${age} years`, 11, 'normal', 2);
      writeLine(`Weight: ${weight} ${unit === 'metric' ? 'kg' : 'lb'}`, 11, 'normal', 2);
      writeLine(`Height: ${height} ${unit === 'metric' ? 'cm' : 'in'}`, 11, 'normal', 2);
      if (bodyFat && !bodyFatError) writeLine(`Body fat: ${bodyFat}%`, 11, 'normal', 2);
      writeLine(`Activity: ${activity.replace('_', ' ')}`, 11, 'normal', 2);
      writeLine(`Goal: ${goal}`, 11, 'normal', 2);
      writeLine(`Macro split: ${split}`, 11, 'normal', 14);

      writeLine('YOUR TARGETS', 11, 'bold', 4);
      writeLine(`BMR:  ${result.bmr.toLocaleString()} kcal (basal rate, ${result.method})`, 11, 'normal', 2);
      writeLine(`TDEE: ${result.tdee.toLocaleString()} kcal (after activity multiplier)`, 11, 'normal', 2);
      writeLine(`Daily target: ${result.targetCal.toLocaleString()} kcal`, 14, 'bold', 12);

      writeLine(`Protein: ${result.proteinG} g  (${result.proteinG * 4} kcal)`, 11, 'normal', 2);
      writeLine(`Carbs:   ${result.carbsG} g  (${result.carbsG * 4} kcal)`, 11, 'normal', 2);
      writeLine(`Fats:    ${result.fatG} g  (${result.fatG * 9} kcal)`, 11, 'normal', 14);

      writeLine(`Water target: ${(result.waterMl / 1000).toFixed(1)} L`, 11, 'bold', 14);

      writeLine('A useful starting point, not a prescription. Adjust over 2 weeks by watching the scale and how you feel in training.', 9, 'normal', 2);
      writeLine('From Zaytoun.', 9, 'normal');

      doc.save('zaytoun-macros.pdf');
    } finally {
      setPdfBusy(false);
    }
  }

  return (
    <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6 md:p-8">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        {/* INPUTS */}
        <div className="md:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Sex">
              <SegmentedToggle
                value={sex}
                onChange={setSex}
                options={[{ id: 'male', label: 'Male' }, { id: 'female', label: 'Female' }]}
              />
            </Field>
            <Field label="Units">
              <SegmentedToggle
                value={unit}
                onChange={setUnit}
                options={[{ id: 'metric', label: 'Metric' }, { id: 'imperial', label: 'Imperial' }]}
              />
            </Field>

            <Field
              label="Age"
              hint="years"
              error={ageError ? `Must be between ${ageBounds.min} and ${ageBounds.max}` : null}
            >
              <NumberInput
                value={age}
                onChange={setAge}
                placeholder="28"
                error={Boolean(ageError)}
              />
            </Field>

            <Field
              label={`Weight (${weightBounds.unit})`}
              hint={`${weightBounds.min} to ${weightBounds.max} ${weightBounds.unit}`}
              error={weightError ? `Must be between ${weightBounds.min} and ${weightBounds.max} ${weightBounds.unit}` : null}
            >
              <NumberInput
                value={weight}
                onChange={setWeight}
                placeholder={unit === 'metric' ? '75' : '165'}
                error={Boolean(weightError)}
              />
            </Field>

            <Field
              label={`Height (${heightBounds.unit})`}
              hint={`${heightBounds.min} to ${heightBounds.max} ${heightBounds.unit}`}
              error={heightError ? `Must be between ${heightBounds.min} and ${heightBounds.max} ${heightBounds.unit}` : null}
            >
              <NumberInput
                value={height}
                onChange={setHeight}
                placeholder={unit === 'metric' ? '178' : '70'}
                error={Boolean(heightError)}
              />
            </Field>

            <Field
              label="Body fat (optional)"
              hint="for Katch-McArdle"
              tooltip="If you know your body-fat percentage, we use the Katch-McArdle formula which is more accurate than Mifflin-St Jeor."
              error={bodyFatError ? `Must be between ${bodyFatBounds.min} and ${bodyFatBounds.max}%` : null}
            >
              <NumberInput
                value={bodyFat}
                onChange={setBodyFat}
                placeholder="leave empty"
                error={Boolean(bodyFatError)}
              />
            </Field>

            <Field label="Activity level" tooltip="How many times a week you train. Sedentary = desk job, no exercise. Very active = two-a-days." className="sm:col-span-2">
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value as Activity)}
                className="w-full rounded-full border border-ink-200 bg-cream-50 px-4 py-2.5 text-[14px] tracking-tight focus:border-ink-900 focus:outline-none"
              >
                <option value="sedentary">Sedentary (desk job, no exercise)</option>
                <option value="light">Light (1 to 3 days a week)</option>
                <option value="moderate">Moderate (3 to 5 days a week)</option>
                <option value="active">Active (6 to 7 days a week)</option>
                <option value="very_active">Very active (2x a day, or heavy labor)</option>
              </select>
            </Field>
          </div>

          <div className="mt-6">
            <Label>Goal</Label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: 'cut', label: 'Cut', sub: '−500 kcal' },
                { id: 'maintain', label: 'Maintain', sub: '±0' },
                { id: 'bulk', label: 'Bulk', sub: '+400 kcal' },
              ] as { id: Goal; label: string; sub: string }[]).map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                    goal === g.id
                      ? 'border-ink-900 bg-ink-900 text-cream-50'
                      : 'border-ink-100 bg-cream-50 text-ink-700 hover:border-ink-900'
                  }`}
                >
                  <p className="text-sm font-semibold tracking-tight">{g.label}</p>
                  <p className="mt-0.5 text-[11px] tracking-tight opacity-70">{g.sub}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Label tooltip="Standard mixes protein, carbs, and fats. High Protein bumps protein for hard-trainers. Keto keeps carbs near zero.">Macro split</Label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: 'standard', label: 'Standard', sub: 'Balanced' },
                { id: 'high-protein', label: 'High Protein', sub: '2.2 to 2.6g/kg' },
                { id: 'keto', label: 'Keto', sub: '70% fat' },
              ] as { id: Split; label: string; sub: string }[]).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSplit(s.id)}
                  className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                    split === s.id
                      ? 'border-gold-600 bg-gold-500/15 text-gold-700'
                      : 'border-ink-100 bg-cream-50 text-ink-700 hover:border-ink-900'
                  }`}
                >
                  <p className="text-sm font-semibold tracking-tight">{s.label}</p>
                  <p className="mt-0.5 text-[11px] tracking-tight opacity-70">{s.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="md:col-span-5">
          <div className="rounded-3xl bg-ink-900 p-6 text-cream-50">
            {!result ? (
              <EmptyState />
            ) : (
              <>
                <p className="text-[11px] font-medium uppercase tracking-widest text-cream-100/60">Daily target</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tighter">{result.targetCal.toLocaleString()}</span>
                  <span className="text-sm tracking-tight text-cream-100/70">kcal</span>
                </div>
                <p className="mt-2 text-[11px] tracking-tight text-cream-100/50">
                  <span title="Basal metabolic rate, the calories you burn just being alive.">BMR</span>{' '}
                  {result.bmr.toLocaleString()}
                  {' · '}
                  <span title="Total daily energy expenditure: BMR multiplied by your activity factor.">TDEE</span>{' '}
                  {result.tdee.toLocaleString()}
                  <span className="ml-2 text-cream-100/35">({result.method})</span>
                </p>

                <div className="mt-6 space-y-3">
                  <MacroBar icon={<Beef className="h-4 w-4" />} label="Protein" value={result.proteinG} unit="g" color="terracotta" max={result.proteinG * 1.3} />
                  <MacroBar icon={<Wheat className="h-4 w-4" />} label="Carbs" value={result.carbsG} unit="g" color="gold" max={Math.max(1, result.carbsG * 1.3)} />
                  <MacroBar icon={<Droplet className="h-4 w-4" />} label="Fats" value={result.fatG} unit="g" color="sage" max={result.fatG * 1.3} />
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-cream-50/15 pt-5 text-center">
                  <Stat label="Protein cal" value={`${result.proteinG * 4}`} />
                  <Stat label="Carbs cal" value={`${result.carbsG * 4}`} />
                  <Stat label="Fat cal" value={`${result.fatG * 9}`} />
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-cream-50/15 bg-cream-50/5 px-4 py-3">
                  <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-tight text-cream-50">
                    <Droplets className="h-4 w-4 text-sage-300" />
                    Water target
                  </span>
                  <span className="text-base font-semibold tracking-tight text-cream-50">
                    {(result.waterMl / 1000).toFixed(1)} L
                    <span className="ml-1 text-[10px] tracking-tight text-cream-100/60">({result.waterMl} ml)</span>
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-cream-50/15 pt-5">
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    disabled={pdfBusy}
                    className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-4 py-2 text-[12px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-gold-400 disabled:opacity-60"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {pdfBusy ? 'Building PDF' : 'Download PDF'}
                  </button>
                  {savedMsg ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-400/20 px-3.5 py-2 text-[12px] font-medium tracking-tight text-sage-300">
                      <Check className="h-3.5 w-3.5" /> Saved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cream-50/15 px-3.5 py-2 text-[12px] font-medium tracking-tight text-cream-100/70">
                      <Bookmark className="h-3.5 w-3.5" /> Saved on this device
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <p className="mt-3 text-[11px] tracking-tight text-ink-400">
            Based on Mifflin-St Jeor (or Katch-McArdle if you provide body fat). A useful starting point, not a
            prescription. Adjust over 2 weeks by watching the scale and how you feel in training.
          </p>
        </div>
      </div>
    </div>
  );
}

// ===================== Form sub-components =====================

function Label({ children, tooltip }: { children: React.ReactNode; tooltip?: string }) {
  return (
    <p className="mb-2 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-tight text-ink-900">
      {children}
      {tooltip && (
        <span
          className="inline-grid h-4 w-4 cursor-help place-items-center rounded-full bg-ink-100 text-ink-500"
          title={tooltip}
        >
          <HelpCircle className="h-3 w-3" strokeWidth={1.8} />
        </span>
      )}
    </p>
  );
}

function Field({
  label,
  hint,
  error,
  tooltip,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string | null | false;
  tooltip?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <Label tooltip={tooltip}>{label}</Label>
        {hint && !error && (
          <span className="text-[11px] tracking-tight text-ink-400">{hint}</span>
        )}
      </div>
      {children}
      {error && (
        <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] tracking-tight text-terracotta-500">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: boolean;
}) {
  return (
    <input
      type="text"
      inputMode="decimal"
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        // Only digits, one dot, and an empty string. Lets the user clear the
        // field without it snapping back to 0.
        const v = e.target.value.replace(/[^0-9.]/g, '');
        // Disallow more than one dot
        const parts = v.split('.');
        const cleaned = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : v;
        onChange(cleaned);
      }}
      className={`w-full rounded-full border bg-cream-50 px-4 py-2.5 text-[14px] tabular-nums tracking-tight focus:outline-none ${
        error
          ? 'border-terracotta-500 focus:border-terracotta-500'
          : 'border-ink-200 focus:border-ink-900'
      }`}
    />
  );
}

function SegmentedToggle<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 rounded-full border border-ink-200 p-1 text-[13px] font-medium tracking-tight">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`rounded-full px-3 py-2 transition-colors ${
            value === o.id ? 'bg-ink-900 text-cream-50' : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-cream-50/10 text-gold-400">
        <Beef className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <h4 className="mt-4 text-base font-semibold tracking-tight text-cream-50">
        Fill in age, weight, and height
      </h4>
      <p className="mt-1.5 max-w-[16rem] text-sm tracking-tight text-cream-100/60">
        Add body fat for a more accurate read. Everything saves on this device automatically.
      </p>
    </div>
  );
}

function MacroBar({ icon, label, value, unit, color, max }: { icon: React.ReactNode; label: string; value: number; unit: string; color: 'terracotta' | 'gold' | 'sage'; max: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const bg = color === 'terracotta' ? 'bg-terracotta-500' : color === 'gold' ? 'bg-gold-500' : 'bg-sage-500';
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium tracking-tight text-cream-50">
          {icon} {label}
        </span>
        <span className="text-sm font-semibold tracking-tighter text-cream-50">
          {value} <span className="text-[10px] opacity-70">{unit}</span>
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-cream-50/10">
        <div className={`h-full ${bg} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold tracking-tighter text-cream-50">{value}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-widest text-cream-100/50">{label}</p>
    </div>
  );
}
