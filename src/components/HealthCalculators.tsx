import { useState } from 'react';
import { Activity, Dumbbell, Heart, Scale, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n';
import {
  bmi,
  bodyFatUsNavy,
  idealWeight,
  oneRepMax,
  RM_PERCENTAGES,
  type Sex,
} from '../lib/health-calculators';

type Tab = 'bmi' | 'ideal' | '1rm' | 'bodyfat';

const TABS: { id: Tab; labelEn: string; labelAr: string; icon: typeof Heart }[] = [
  { id: 'bmi',     labelEn: 'BMI',          labelAr: 'مؤشر كتلة الجسم', icon: Scale },
  { id: 'ideal',   labelEn: 'Ideal weight', labelAr: 'الوزن المثالي',  icon: Heart },
  { id: '1rm',     labelEn: 'One-rep max',  labelAr: 'الحد الأقصى',    icon: Dumbbell },
  { id: 'bodyfat', labelEn: 'Body fat',     labelAr: 'نسبة الدهون',     icon: Activity },
];

export default function HealthCalculators() {
  const { language, t } = useTranslation();
  const isAr = language === 'ar';
  const [tab, setTab] = useState<Tab>('bmi');

  return (
    <section className="container-wide mt-16 md:mt-20">
      <div className="mb-8">
        <p className="eyebrow mb-3 inline-flex items-center gap-2">
          <Sparkles className="h-3 w-3" strokeWidth={2} />
          {t('health.eyebrow')}
        </p>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
          {t('health.title')}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500 md:text-base">
          {t('health.subtitle')}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((tabInfo) => {
          const Icon = tabInfo.icon;
          const active = tab === tabInfo.id;
          return (
            <button
              key={tabInfo.id}
              type="button"
              onClick={() => setTab(tabInfo.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium tracking-tight transition-colors ${
                active
                  ? 'border-ink-900 bg-ink-900 text-cream-50'
                  : 'border-ink-100 bg-cream-50 text-ink-700 hover:border-ink-300'
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              {isAr ? tabInfo.labelAr : tabInfo.labelEn}
            </button>
          );
        })}
      </div>

      {tab === 'bmi'     && <BMICalculator isAr={isAr} />}
      {tab === 'ideal'   && <IdealWeightCalculator isAr={isAr} />}
      {tab === '1rm'     && <OneRMCalculator isAr={isAr} />}
      {tab === 'bodyfat' && <BodyFatCalculator isAr={isAr} />}
    </section>
  );
}

// ============================================================
// BMI
// ============================================================

function BMICalculator({ isAr }: { isAr: boolean }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const result = bmi(Number(weight), Number(height));

  const categoryColors: Record<string, string> = {
    'underweight': 'bg-sage-100 text-sage-600',
    'healthy':     'bg-sage-500 text-cream-50',
    'overweight':  'bg-gold-400 text-ink-900',
    'obese-1':     'bg-terracotta-400 text-cream-50',
    'obese-2':     'bg-terracotta-500 text-cream-50',
    'obese-3':     'bg-terracotta-700 text-cream-50',
  };

  const categoryLabels: Record<string, { en: string; ar: string }> = {
    'underweight': { en: 'Underweight',  ar: 'وزن ناقص' },
    'healthy':     { en: 'Healthy',      ar: 'صحي' },
    'overweight':  { en: 'Overweight',   ar: 'زيادة وزن' },
    'obese-1':     { en: 'Obese class 1', ar: 'سمنة درجة 1' },
    'obese-2':     { en: 'Obese class 2', ar: 'سمنة درجة 2' },
    'obese-3':     { en: 'Obese class 3', ar: 'سمنة درجة 3' },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6">
        <h3 className="mb-4 text-base font-semibold tracking-tight text-ink-900">
          {isAr ? 'أدخل القياسات' : 'Enter measurements'}
        </h3>
        <div className="space-y-4">
          <Input label={isAr ? 'الوزن (كغ)' : 'Weight (kg)'} value={weight} onChange={setWeight} placeholder="70" />
          <Input label={isAr ? 'الطول (سم)' : 'Height (cm)'} value={height} onChange={setHeight} placeholder="175" />
        </div>
      </div>
      <div className="rounded-3xl bg-ink-900 p-6 text-cream-50">
        <p className="text-[11px] font-medium uppercase tracking-widest text-cream-100/60">
          {isAr ? 'النتيجة' : 'Result'}
        </p>
        {result ? (
          <>
            <div className="mt-3 text-5xl font-semibold tracking-tighter">{result.value}</div>
            <div className={`mt-3 inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${categoryColors[result.category]}`}>
              {isAr ? categoryLabels[result.category].ar : categoryLabels[result.category].en}
            </div>
            <div className="mt-6 border-t border-cream-100/15 pt-4 text-xs text-cream-100/60">
              {isAr ? 'النطاق الصحي لطولك:' : 'Healthy range for your height:'}
              <div className="mt-1 text-sm text-cream-50">
                {result.healthyMinKg} – {result.healthyMaxKg} kg
              </div>
            </div>
          </>
        ) : (
          <p className="mt-3 text-sm text-cream-100/50">
            {isAr ? 'أدخل الوزن والطول' : 'Enter weight and height'}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Ideal Weight
// ============================================================

function IdealWeightCalculator({ isAr }: { isAr: boolean }) {
  const [sex, setSex] = useState<Sex>('male');
  const [height, setHeight] = useState('');
  const result = idealWeight(sex, Number(height));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6">
        <h3 className="mb-4 text-base font-semibold tracking-tight text-ink-900">
          {isAr ? 'أدخل القياسات' : 'Enter measurements'}
        </h3>
        <div className="space-y-4">
          <ToggleRow
            label={isAr ? 'الجنس' : 'Sex'}
            value={sex}
            options={[
              { v: 'male' as Sex,   label: isAr ? 'ذكر' : 'Male' },
              { v: 'female' as Sex, label: isAr ? 'أنثى' : 'Female' },
            ]}
            onChange={setSex}
          />
          <Input label={isAr ? 'الطول (سم)' : 'Height (cm)'} value={height} onChange={setHeight} placeholder="175" />
        </div>
      </div>
      <div className="rounded-3xl bg-ink-900 p-6 text-cream-50">
        <p className="text-[11px] font-medium uppercase tracking-widest text-cream-100/60">
          {isAr ? 'متوسط النتائج' : 'Average result'}
        </p>
        {result ? (
          <>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tighter">{result.averageKg}</span>
              <span className="text-base text-cream-100/55">kg</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
              <Cell label="Devine"   value={`${result.devine} kg`} />
              <Cell label="Robinson" value={`${result.robinson} kg`} />
              <Cell label="Miller"   value={`${result.miller} kg`} />
              <Cell label="Hamwi"    value={`${result.hamwi} kg`} />
            </div>
          </>
        ) : (
          <p className="mt-3 text-sm text-cream-100/50">
            {isAr ? 'أدخل الطول' : 'Enter height'}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// One-Rep Max
// ============================================================

function OneRMCalculator({ isAr }: { isAr: boolean }) {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('5');
  const result = oneRepMax(Number(weight), Number(reps));

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6 lg:col-span-1">
        <h3 className="mb-4 text-base font-semibold tracking-tight text-ink-900">
          {isAr ? 'أدخل آخر تمرين' : 'Last set performed'}
        </h3>
        <div className="space-y-4">
          <Input label={isAr ? 'الوزن (كغ)' : 'Weight (kg)'} value={weight} onChange={setWeight} placeholder="100" />
          <Input label={isAr ? 'عدد التكرارات' : 'Reps'} value={reps} onChange={setReps} placeholder="5" />
        </div>
      </div>
      <div className="rounded-3xl bg-ink-900 p-6 text-cream-50 lg:col-span-2">
        <p className="text-[11px] font-medium uppercase tracking-widest text-cream-100/60">
          {isAr ? 'الحد الأقصى المقدّر' : 'Estimated 1RM'}
        </p>
        {result ? (
          <>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tighter">{result.averageKg}</span>
              <span className="text-base text-cream-100/55">kg</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Cell label="Epley"    value={`${result.epley} kg`} />
              <Cell label="Brzycki"  value={`${result.brzycki} kg`} />
              <Cell label="Lombardi" value={`${result.lombardi} kg`} />
              <Cell label="Wathen"   value={`${result.wathen} kg`} />
            </div>
            <div className="mt-6 border-t border-cream-100/15 pt-4">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-cream-100/60">
                {isAr ? 'جدول النسب للتمرين' : 'Set planning percentages'}
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-xs md:grid-cols-3">
                {RM_PERCENTAGES.map((p) => (
                  <div key={p.pct} className="rounded-lg bg-cream-100/5 p-2">
                    <div className="font-semibold">{Math.round(result.averageKg * p.pct)} kg</div>
                    <div className="text-cream-100/55">{p.reps} reps</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="mt-3 text-sm text-cream-100/50">
            {isAr ? 'أدخل الوزن والعدد' : 'Enter weight and reps'}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Body Fat (US Navy)
// ============================================================

function BodyFatCalculator({ isAr }: { isAr: boolean }) {
  const [sex, setSex] = useState<Sex>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const result = bodyFatUsNavy(sex, Number(weight), Number(height), Number(neck), Number(waist), Number(hip));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6">
        <h3 className="mb-4 text-base font-semibold tracking-tight text-ink-900">
          {isAr ? 'القياسات (طريقة البحرية)' : 'Measurements (US Navy method)'}
        </h3>
        <div className="space-y-4">
          <ToggleRow
            label={isAr ? 'الجنس' : 'Sex'}
            value={sex}
            options={[
              { v: 'male' as Sex,   label: isAr ? 'ذكر' : 'Male' },
              { v: 'female' as Sex, label: isAr ? 'أنثى' : 'Female' },
            ]}
            onChange={setSex}
          />
          <Input label={isAr ? 'الوزن (كغ)' : 'Weight (kg)'}  value={weight} onChange={setWeight} placeholder="75" />
          <Input label={isAr ? 'الطول (سم)' : 'Height (cm)'} value={height} onChange={setHeight} placeholder="175" />
          <Input label={isAr ? 'محيط الرقبة (سم)' : 'Neck circumference (cm)'} value={neck}  onChange={setNeck}  placeholder="38" />
          <Input label={isAr ? 'محيط الخصر (سم)' : 'Waist circumference (cm)'} value={waist} onChange={setWaist} placeholder="85" />
          {sex === 'female' && (
            <Input label={isAr ? 'محيط الورك (سم)' : 'Hip circumference (cm)'} value={hip}   onChange={setHip}   placeholder="95" />
          )}
        </div>
      </div>
      <div className="rounded-3xl bg-ink-900 p-6 text-cream-50">
        <p className="text-[11px] font-medium uppercase tracking-widest text-cream-100/60">
          {isAr ? 'نسبة الدهون' : 'Body fat percentage'}
        </p>
        {result ? (
          <>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tighter">{result.percent}</span>
              <span className="text-base text-cream-100/55">%</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <Cell label={isAr ? 'كتلة الدهون' : 'Fat mass'} value={`${result.fatMassKg} kg`} />
              <Cell label={isAr ? 'الكتلة الصافية' : 'Lean mass'} value={`${result.leanMassKg} kg`} />
            </div>
          </>
        ) : (
          <p className="mt-3 text-sm text-cream-100/50">
            {isAr ? 'املأ كل الحقول' : 'Fill all fields'}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Shared
// ============================================================

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (s: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-ink-500">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink-100 bg-cream-50 px-4 py-2.5 text-sm tracking-tight text-ink-900 placeholder:text-ink-300 focus:border-ink-900 focus:outline-none"
      />
    </div>
  );
}

function ToggleRow<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { v: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-ink-500">{label}</label>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.v}
            type="button"
            onClick={() => onChange(opt.v)}
            className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium tracking-tight transition-colors ${
              value === opt.v
                ? 'border-ink-900 bg-ink-900 text-cream-50'
                : 'border-ink-100 bg-cream-50 text-ink-900 hover:border-ink-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream-100/5 p-3">
      <div className="text-[10px] font-medium uppercase tracking-widest text-cream-100/55">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}
