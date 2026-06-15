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
import { useTranslation } from '../i18n';

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

export interface MacroTargetsSnapshot {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  bmr: number;
  tdee: number;
  waterMl: number;
}

interface Props {
  /** When provided, the goal is controlled by the parent so the Goal Plans
   *  section and the Calculator stay in sync. */
  goal?: Goal;
  onGoalChange?: (g: Goal) => void;
  /** Fires whenever the calculator produces fresh targets, including the
   *  initial result. Parents use it to mount the Meal Plan panel below. */
  onTargetsComputed?: (snapshot: MacroTargetsSnapshot | null) => void;
}

export default function MacroCalculator({ goal: controlledGoal, onGoalChange, onTargetsComputed }: Props) {
  const { t } = useTranslation();
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

  // Expose the freshly computed targets to the parent so it can mount a
  // Meal Plan generator below the Calculator. Fires with null when input
  // is incomplete so the parent can hide the meal plan section.
  useEffect(() => {
    if (!onTargetsComputed) return;
    if (!result) {
      onTargetsComputed(null);
      return;
    }
    onTargetsComputed({
      calories: result.targetCal,
      protein: result.proteinG,
      carbs: result.carbsG,
      fat: result.fatG,
      bmr: result.bmr,
      tdee: result.tdee,
      waterMl: result.waterMl,
    });
  }, [result, onTargetsComputed]);

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
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      const isAr = typeof document !== 'undefined' && document.documentElement.lang === 'ar';
      const fontStack = isAr
        ? "'IBM Plex Sans Arabic', 'Geeza Pro', 'Segoe UI Arabic', system-ui, sans-serif"
        : "'Inter', 'SF Pro Text', system-ui, sans-serif";
      const labels = isAr
        ? {
            title: 'الماكروز اليومية',
            inputs: 'بياناتك',
            sex: 'الجنس',
            male: 'ذكر',
            female: 'أنثى',
            age: 'العمر',
            years: 'سنة',
            weight: 'الوزن',
            height: 'الطول',
            bodyFat: 'نسبة الدهون',
            activity: 'مستوى النشاط',
            goal: 'الهدف',
            split: 'توزيع الماكروز',
            targets: 'أهدافك',
            bmr: 'معدّل الأيض الأساسي',
            bmrSuffix: 'كيلوكالوري',
            method: 'الطريقة',
            tdee: 'الإنفاق الكلي',
            tdeeSuffix: 'كيلوكالوري بعد ضرب النشاط',
            dailyTarget: 'الهدف اليومي',
            kcal: 'كيلوكالوري',
            protein: 'بروتين',
            carbs: 'كربوهيدرات',
            fats: 'دهون',
            grams: 'جرام',
            water: 'الماء',
            liters: 'لتر',
            disclaimer: 'نقطة بداية مفيدة، ليست وصفة طبية. عدّل خلال أسبوعين بمراقبة الميزان وكيف تشعر في التمرين.',
            from: 'من زيتون',
          }
        : {
            title: 'Your Daily Macros',
            inputs: 'YOUR INPUTS',
            sex: 'Sex',
            male: 'Male',
            female: 'Female',
            age: 'Age',
            years: 'years',
            weight: 'Weight',
            height: 'Height',
            bodyFat: 'Body fat',
            activity: 'Activity',
            goal: 'Goal',
            split: 'Macro split',
            targets: 'YOUR TARGETS',
            bmr: 'BMR',
            bmrSuffix: 'kcal',
            method: 'method',
            tdee: 'TDEE',
            tdeeSuffix: 'kcal after activity multiplier',
            dailyTarget: 'Daily target',
            kcal: 'kcal',
            protein: 'Protein',
            carbs: 'Carbs',
            fats: 'Fats',
            grams: 'g',
            water: 'Water target',
            liters: 'L',
            disclaimer:
              'A useful starting point, not a prescription. Adjust over 2 weeks by watching the scale and how you feel in training.',
            from: 'From Zaytoun',
          };

      const today = new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const escape = (s: string) =>
        s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const row = (label: string, value: string) =>
        `<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #efeae0; font-size:14px;">
          <span style="color:#6c655c;">${escape(label)}</span>
          <span style="color:#1f1c18; font-weight:600;">${escape(value)}</span>
        </div>`;

      const container = document.createElement('div');
      container.style.cssText = [
        'position: fixed',
        'top: -10000px',
        'left: 0',
        'width: 780px',
        'padding: 56px 48px',
        'background: #fbf9f4',
        'color: #1f1c18',
        `font-family: ${fontStack}`,
        `direction: ${isAr ? 'rtl' : 'ltr'}`,
        `text-align: ${isAr ? 'right' : 'left'}`,
      ].join('; ');

      container.innerHTML = `
        <h1 style="font-size: 42px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 4px; color: #1f1c18; line-height: 1.05;">
          ${escape(labels.title)}
        </h1>
        <p style="font-size: 13px; color: #9a948a; margin: 0 0 26px;">${escape(today)}</p>
        <hr style="border: none; border-top: 1px solid #e6dfd1; margin: 0 0 24px;">

        <h2 style="font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #b8632e; margin: 0 0 10px;">
          ${escape(labels.inputs)}
        </h2>
        <div style="margin-bottom: 32px;">
          ${row(labels.sex, sex === 'male' ? labels.male : labels.female)}
          ${row(labels.age, `${age} ${labels.years}`)}
          ${row(labels.weight, `${weight} ${unit === 'metric' ? 'kg' : 'lb'}`)}
          ${row(labels.height, `${height} ${unit === 'metric' ? 'cm' : 'in'}`)}
          ${bodyFat && !bodyFatError ? row(labels.bodyFat, `${bodyFat}%`) : ''}
          ${row(labels.activity, activity.replace('_', ' '))}
          ${row(labels.goal, goal)}
          ${row(labels.split, split)}
        </div>

        <h2 style="font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #b8632e; margin: 0 0 10px;">
          ${escape(labels.targets)}
        </h2>
        <div>
          ${row(labels.bmr, `${result.bmr.toLocaleString()} ${labels.bmrSuffix} (${labels.method}: ${result.method})`)}
          ${row(labels.tdee, `${result.tdee.toLocaleString()} ${labels.tdeeSuffix}`)}
        </div>

        <div style="margin: 28px 0; padding: 24px; border-radius: 18px; background: #1f1c18; color: #fbf9f4; text-align: center;">
          <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #b8632e;">${escape(labels.dailyTarget)}</p>
          <p style="margin: 0; font-size: 44px; font-weight: 700; letter-spacing: -0.02em;">
            ${result.targetCal.toLocaleString()} <span style="font-size: 18px; color: #d9d1c2;">${escape(labels.kcal)}</span>
          </p>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 28px;">
          <div style="padding: 18px; border-radius: 14px; background: #fff;">
            <p style="margin: 0; font-size: 11px; color: #b8632e; letter-spacing: 0.16em; text-transform: uppercase;">${escape(labels.protein)}</p>
            <p style="margin: 6px 0 0; font-size: 26px; font-weight: 700;">${result.proteinG}<span style="font-size: 14px; color: #6c655c;"> ${escape(labels.grams)}</span></p>
            <p style="margin: 4px 0 0; font-size: 11px; color: #9a948a;">${result.proteinG * 4} ${escape(labels.kcal)}</p>
          </div>
          <div style="padding: 18px; border-radius: 14px; background: #fff;">
            <p style="margin: 0; font-size: 11px; color: #7a9362; letter-spacing: 0.16em; text-transform: uppercase;">${escape(labels.carbs)}</p>
            <p style="margin: 6px 0 0; font-size: 26px; font-weight: 700;">${result.carbsG}<span style="font-size: 14px; color: #6c655c;"> ${escape(labels.grams)}</span></p>
            <p style="margin: 4px 0 0; font-size: 11px; color: #9a948a;">${result.carbsG * 4} ${escape(labels.kcal)}</p>
          </div>
          <div style="padding: 18px; border-radius: 14px; background: #fff;">
            <p style="margin: 0; font-size: 11px; color: #c89a3a; letter-spacing: 0.16em; text-transform: uppercase;">${escape(labels.fats)}</p>
            <p style="margin: 6px 0 0; font-size: 26px; font-weight: 700;">${result.fatG}<span style="font-size: 14px; color: #6c655c;"> ${escape(labels.grams)}</span></p>
            <p style="margin: 4px 0 0; font-size: 11px; color: #9a948a;">${result.fatG * 9} ${escape(labels.kcal)}</p>
          </div>
        </div>

        <div style="padding: 14px 18px; border-radius: 12px; background: #eef3ea; color: #4a5d3a; font-size: 14px; margin-bottom: 24px;">
          <strong>${escape(labels.water)}:</strong> ${(result.waterMl / 1000).toFixed(1)} ${escape(labels.liters)}
        </div>

        <hr style="border: none; border-top: 1px solid #e6dfd1; margin: 0 0 14px;">
        <p style="font-size: 11px; color: #9a948a; line-height: 1.6; margin: 0 0 6px;">
          ${escape(labels.disclaimer)}
        </p>
        <p style="font-size: 11px; color: #9a948a; margin: 0;">
          ${escape(labels.from)} · zaytoun.online
        </p>
      `;

      document.body.appendChild(container);
      try {
        const canvas = await html2canvas(container, {
          backgroundColor: '#fbf9f4',
          scale: 2,
          useCORS: true,
          logging: false,
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const ratio = canvas.width / canvas.height;
        const m = 28;
        let imgW = pageW - m * 2;
        let imgH = imgW / ratio;
        if (imgH > pageH - m * 2) {
          imgH = pageH - m * 2;
          imgW = imgH * ratio;
        }
        pdf.addImage(imgData, 'JPEG', (pageW - imgW) / 2, m, imgW, imgH);
        pdf.save('zaytoun-macros.pdf');
      } finally {
        document.body.removeChild(container);
      }
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
            <Field label={t('macros.sex')}>
              <SegmentedToggle
                value={sex}
                onChange={setSex}
                options={[{ id: 'male', label: t('macros.male') }, { id: 'female', label: t('macros.female') }]}
              />
            </Field>
            <Field label={t('macros.units')}>
              <SegmentedToggle
                value={unit}
                onChange={setUnit}
                options={[{ id: 'metric', label: t('macros.metric') }, { id: 'imperial', label: t('macros.imperial') }]}
              />
            </Field>

            <Field
              label={t('macros.age')}
              hint={t('macros.years')}
              error={ageError ? t('macros.rangeBetween', { min: ageBounds.min, max: ageBounds.max }) : null}
            >
              <NumberInput
                value={age}
                onChange={setAge}
                placeholder="28"
                error={Boolean(ageError)}
              />
            </Field>

            <Field
              label={`${t('macros.weight')} (${weightBounds.unit})`}
              hint={t('macros.hintRange', { min: weightBounds.min, max: weightBounds.max, unit: weightBounds.unit })}
              error={weightError ? t('macros.rangeBetweenUnit', { min: weightBounds.min, max: weightBounds.max, unit: weightBounds.unit }) : null}
            >
              <NumberInput
                value={weight}
                onChange={setWeight}
                placeholder={unit === 'metric' ? '75' : '165'}
                error={Boolean(weightError)}
              />
            </Field>

            <Field
              label={`${t('macros.height')} (${heightBounds.unit})`}
              hint={t('macros.hintRange', { min: heightBounds.min, max: heightBounds.max, unit: heightBounds.unit })}
              error={heightError ? t('macros.rangeBetweenUnit', { min: heightBounds.min, max: heightBounds.max, unit: heightBounds.unit }) : null}
            >
              <NumberInput
                value={height}
                onChange={setHeight}
                placeholder={unit === 'metric' ? '178' : '70'}
                error={Boolean(heightError)}
              />
            </Field>

            <Field
              label={t('macros.bodyFatLabel')}
              hint={t('macros.bodyFatHint')}
              tooltip={t('macros.bodyFatTooltip')}
              error={bodyFatError ? t('macros.rangeBetweenPercent', { min: bodyFatBounds.min, max: bodyFatBounds.max }) : null}
            >
              <NumberInput
                value={bodyFat}
                onChange={setBodyFat}
                placeholder={t('macros.bodyFatPlaceholder')}
                error={Boolean(bodyFatError)}
              />
            </Field>

            <Field label={t('macros.activity')} tooltip={t('macros.activityTooltip')} className="sm:col-span-2">
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value as Activity)}
                className="w-full rounded-full border border-ink-200 bg-cream-50 px-4 py-2.5 text-[14px] tracking-tight focus:border-ink-900 focus:outline-none"
              >
                <option value="sedentary">{t('macros.activitySedentary')}</option>
                <option value="light">{t('macros.activityLight')}</option>
                <option value="moderate">{t('macros.activityModerate')}</option>
                <option value="active">{t('macros.activityActive')}</option>
                <option value="very_active">{t('macros.activityVeryActive')}</option>
              </select>
            </Field>
          </div>

          <div className="mt-6">
            <Label>{t('macros.goal')}</Label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: 'cut', label: t('macros.goalCut'), sub: t('macros.goalCutSub') },
                { id: 'maintain', label: t('macros.goalMaintain'), sub: t('macros.goalMaintainSub') },
                { id: 'bulk', label: t('macros.goalBulk'), sub: t('macros.goalBulkSub') },
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
            <Label tooltip={t('macros.macroSplitTooltip')}>{t('macros.macroSplit')}</Label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: 'standard', label: t('macros.splitStandard'), sub: t('macros.splitStandardSub') },
                { id: 'high-protein', label: t('macros.splitHighProtein'), sub: t('macros.splitHighProteinSub') },
                { id: 'keto', label: t('macros.splitKeto'), sub: t('macros.splitKetoSub') },
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
                <p className="text-[11px] font-medium uppercase tracking-widest text-cream-100/60">{t('macros.dailyTarget')}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tighter">{result.targetCal.toLocaleString()}</span>
                  <span className="text-sm tracking-tight text-cream-100/70">{t('macros.kcal')}</span>
                </div>
                <p className="mt-2 text-[11px] tracking-tight text-cream-100/50">
                  <span title={t('macros.bmrTooltip')}>{t('macros.bmrLabel')}</span>{' '}
                  {result.bmr.toLocaleString()}
                  {' · '}
                  <span title={t('macros.tdeeTooltip')}>{t('macros.tdeeLabel')}</span>{' '}
                  {result.tdee.toLocaleString()}
                  <span className="ml-2 text-cream-100/35">({result.method})</span>
                </p>

                <div className="mt-6 space-y-3">
                  <MacroBar icon={<Beef className="h-4 w-4" />} label={t('macros.proteinLabel')} value={result.proteinG} unit={t('macros.gramsShort')} color="terracotta" max={result.proteinG * 1.3} />
                  <MacroBar icon={<Wheat className="h-4 w-4" />} label={t('macros.carbsLabel')} value={result.carbsG} unit={t('macros.gramsShort')} color="gold" max={Math.max(1, result.carbsG * 1.3)} />
                  <MacroBar icon={<Droplet className="h-4 w-4" />} label={t('macros.fatsLabel')} value={result.fatG} unit={t('macros.gramsShort')} color="sage" max={result.fatG * 1.3} />
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-cream-50/15 pt-5 text-center">
                  <Stat label={t('macros.proteinCal')} value={`${result.proteinG * 4}`} />
                  <Stat label={t('macros.carbsCal')} value={`${result.carbsG * 4}`} />
                  <Stat label={t('macros.fatCal')} value={`${result.fatG * 9}`} />
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-cream-50/15 bg-cream-50/5 px-4 py-3">
                  <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-tight text-cream-50">
                    <Droplets className="h-4 w-4 text-sage-300" />
                    {t('macros.waterTarget')}
                  </span>
                  <span className="text-base font-semibold tracking-tight text-cream-50">
                    {(result.waterMl / 1000).toFixed(1)} {t('macros.liters')}
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
                    {pdfBusy ? t('macros.buildingPdf') : t('macros.downloadPdf')}
                  </button>
                  {savedMsg ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-400/20 px-3.5 py-2 text-[12px] font-medium tracking-tight text-sage-300">
                      <Check className="h-3.5 w-3.5" /> {t('macros.savedShort')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cream-50/15 px-3.5 py-2 text-[12px] font-medium tracking-tight text-cream-100/70">
                      <Bookmark className="h-3.5 w-3.5" /> {t('macros.savedOnThisDevice')}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <p className="mt-3 text-[11px] tracking-tight text-ink-400">
            {t('macros.disclaimer')}
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
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-cream-50/10 text-gold-400">
        <Beef className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <h4 className="mt-4 text-base font-semibold tracking-tight text-cream-50">
        {t('macros.emptyTitle')}
      </h4>
      <p className="mt-1.5 max-w-[16rem] text-sm tracking-tight text-cream-100/60">
        {t('macros.emptyBody')}
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
