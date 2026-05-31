import { useMemo, useState } from 'react';
import { Beef, Wheat, Droplet } from 'lucide-react';

type Sex = 'male' | 'female';
type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Goal = 'cut' | 'maintain' | 'bulk';

const ACTIVITY_MULTIPLIER: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const GOAL_ADJUST: Record<Goal, number> = {
  cut: -500,
  maintain: 0,
  bulk: 400,
};

const GOAL_PROTEIN_PER_KG: Record<Goal, number> = {
  cut: 2.2,
  maintain: 1.8,
  bulk: 2.0,
};

function mifflinStJeor(sex: Sex, weightKg: number, heightCm: number, age: number) {
  // Mifflin-St Jeor — the most accurate BMR formula for adults today.
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(sex === 'male' ? base + 5 : base - 161);
}

export default function MacroCalculator() {
  const [sex, setSex] = useState<Sex>('male');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(178);
  const [age, setAge] = useState(28);
  const [activity, setActivity] = useState<Activity>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');

  const result = useMemo(() => {
    const weightKg = unit === 'metric' ? weight : weight * 0.453592;
    const heightCm = unit === 'metric' ? height : height * 2.54;
    if (weightKg < 30 || heightCm < 100 || age < 14) return null;

    const bmr = mifflinStJeor(sex, weightKg, heightCm, age);
    const tdee = Math.round(bmr * ACTIVITY_MULTIPLIER[activity]);
    const targetCal = Math.max(1200, tdee + GOAL_ADJUST[goal]);
    const proteinG = Math.round(weightKg * GOAL_PROTEIN_PER_KG[goal]);
    const fatG = Math.round((targetCal * 0.27) / 9);
    const carbsG = Math.max(0, Math.round((targetCal - proteinG * 4 - fatG * 9) / 4));

    return { bmr, tdee, targetCal, proteinG, fatG, carbsG };
  }, [sex, unit, weight, height, age, activity, goal]);

  return (
    <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6 md:p-8">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        {/* INPUTS */}
        <div className="md:col-span-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Field label="Sex">
              <div className="grid grid-cols-2 rounded-full border border-ink-100 p-1 text-[12px] font-medium tracking-tight">
                {(['male', 'female'] as Sex[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSex(s)}
                    className={`rounded-full px-3 py-1.5 transition-colors ${sex === s ? 'bg-ink-900 text-cream-50' : 'text-ink-600 hover:text-ink-900'}`}
                  >
                    {s === 'male' ? 'Male' : 'Female'}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Units">
              <div className="grid grid-cols-2 rounded-full border border-ink-100 p-1 text-[12px] font-medium tracking-tight">
                {(['metric', 'imperial'] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className={`rounded-full px-3 py-1.5 transition-colors ${unit === u ? 'bg-ink-900 text-cream-50' : 'text-ink-600 hover:text-ink-900'}`}
                  >
                    {u === 'metric' ? 'Metric' : 'Imperial'}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Age (years)">
              <NumberInput value={age} onChange={setAge} min={14} max={90} />
            </Field>
            <Field label={`Weight (${unit === 'metric' ? 'kg' : 'lb'})`}>
              <NumberInput value={weight} onChange={setWeight} min={30} max={400} />
            </Field>
            <Field label={`Height (${unit === 'metric' ? 'cm' : 'in'})`}>
              <NumberInput value={height} onChange={setHeight} min={100} max={250} />
            </Field>
            <Field label="Activity">
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value as Activity)}
                className="w-full rounded-full border border-ink-100 bg-cream-50 px-4 py-2 text-[13px] tracking-tight focus:border-ink-900 focus:outline-none"
              >
                <option value="sedentary">Sedentary (desk)</option>
                <option value="light">Light (1-3 days/wk)</option>
                <option value="moderate">Moderate (3-5 days/wk)</option>
                <option value="active">Active (6-7 days/wk)</option>
                <option value="very_active">Very active (2x/day)</option>
              </select>
            </Field>
          </div>

          <div className="mt-5">
            <p className="eyebrow mb-2">Goal</p>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: 'cut', label: 'Cut', sub: '-500 kcal' },
                { id: 'maintain', label: 'Maintain', sub: '±0' },
                { id: 'bulk', label: 'Bulk', sub: '+400 kcal' },
              ] as { id: Goal; label: string; sub: string }[]).map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
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
        </div>

        {/* RESULTS */}
        <div className="md:col-span-5">
          <div className="rounded-3xl bg-ink-900 p-6 text-cream-50">
            {!result ? (
              <p className="text-sm tracking-tight text-cream-100/70">Enter your details to calculate.</p>
            ) : (
              <>
                <p className="eyebrow text-cream-100/60">Daily target</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tighter">{result.targetCal.toLocaleString()}</span>
                  <span className="text-sm tracking-tight text-cream-100/70">kcal</span>
                </div>
                <p className="mt-1 text-[11px] tracking-tight text-cream-100/50">
                  BMR {result.bmr.toLocaleString()} · TDEE {result.tdee.toLocaleString()}
                </p>

                <div className="mt-6 space-y-3">
                  <MacroBar icon={<Beef className="h-4 w-4" />} label="Protein" value={result.proteinG} unit="g" color="terracotta" max={result.proteinG * 1.3} />
                  <MacroBar icon={<Wheat className="h-4 w-4" />} label="Carbs" value={result.carbsG} unit="g" color="gold" max={result.carbsG * 1.3} />
                  <MacroBar icon={<Droplet className="h-4 w-4" />} label="Fats" value={result.fatG} unit="g" color="sage" max={result.fatG * 1.3} />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-cream-50/15 pt-5 text-center">
                  <Stat label="Protein cal" value={`${result.proteinG * 4}`} />
                  <Stat label="Carbs cal" value={`${result.carbsG * 4}`} />
                  <Stat label="Fat cal" value={`${result.fatG * 9}`} />
                </div>
              </>
            )}
          </div>
          <p className="mt-3 text-[11px] tracking-tight text-ink-400">
            Based on Mifflin-St Jeor. A useful starting point, not a prescription. Adjust over 2 weeks by watching the scale.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      {children}
    </div>
  );
}

function NumberInput({ value, onChange, min, max }: { value: number; onChange: (n: number) => void; min: number; max: number }) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full rounded-full border border-ink-100 bg-cream-50 px-4 py-2 text-[13px] tabular-nums tracking-tight focus:border-ink-900 focus:outline-none"
    />
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
