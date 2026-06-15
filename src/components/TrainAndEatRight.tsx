import { Link } from 'react-router-dom';
import { ArrowUpRight, Calculator, ClipboardList, Dumbbell, Flame, Sparkles, Utensils } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function TrainAndEatRight() {
  const { language } = useTranslation();
  const isAr = language === 'ar';

  const cards: {
    icon: typeof Dumbbell;
    titleEn: string;
    titleAr: string;
    bodyEn: string;
    bodyAr: string;
    to: string;
    accent: string;
    valueEn: string;
    valueAr: string;
  }[] = [
    {
      icon: ClipboardList,
      titleEn: 'Workout programs',
      titleAr: 'برامج التمرين',
      bodyEn: 'PPL, Upper/Lower, 5/3/1, Arnold split. Downloadable PDF, English and Arabic.',
      bodyAr: 'بوش بل ليجز، علوي/سفلي، 5/3/1، تقسيم أرنولد. تنزيل PDF بالعربية والإنجليزية.',
      to: '/workouts#programs',
      accent: 'bg-terracotta-500/15 text-terracotta-400',
      valueEn: '13 ready programs',
      valueAr: '13 برنامج جاهز',
    },
    {
      icon: Dumbbell,
      titleEn: 'Exercise library',
      titleAr: 'مكتبة التمارين',
      bodyEn: 'Sorted by muscle, equipment, and difficulty. Public domain images and step instructions for every move.',
      bodyAr: 'مرتبة بالعضلة والمعدّات والصعوبة. صور public domain وتعليمات لكل تمرين.',
      to: '/workouts',
      accent: 'bg-sage-500/15 text-sage-400',
      valueEn: '873 exercises',
      valueAr: '873 تمرين',
    },
    {
      icon: Utensils,
      titleEn: 'Meal plan builder',
      titleAr: 'موّلد جدول الوجبات',
      bodyEn: 'Enter your macros, get a halal day plan with pin and swap controls, then export it to PDF.',
      bodyAr: 'أدخل ماكروزك، احصل على جدول يوم حلال مع تثبيت وتبديل، ثم نزّله PDF.',
      to: '/fitness#calculator',
      accent: 'bg-gold-500/15 text-gold-400',
      valueEn: '319 fitness recipes',
      valueAr: '319 وصفة فيتنس',
    },
    {
      icon: Calculator,
      titleEn: 'Health calculators',
      titleAr: 'الحاسبات الصحية',
      bodyEn: 'BMI, ideal weight, TDEE, one-rep max, body fat, water intake, plate math, macro splits. All offline.',
      bodyAr: 'مؤشر الكتلة، الوزن المثالي، TDEE، الحد الأقصى، الدهون، الماء، البلت، تقسيم الماكروز.',
      to: '/fitness#calculator',
      accent: 'bg-cream-50/10 text-cream-50',
      valueEn: '7 calculators',
      valueAr: '7 حاسبات',
    },
  ];

  return (
    <section className="container-wide mt-24 md:mt-32">
      <div className="overflow-hidden rounded-3xl bg-ink-900 text-cream-50 md:rounded-[2rem]">
        {/* ===== Hero band ===== */}
        <div className="px-7 pb-2 pt-12 md:px-12 md:pb-4 md:pt-16">
          <p className="eyebrow mb-4 inline-flex items-center gap-2 text-gold-400">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            {isAr ? 'تدرّب + كُل بصواب' : 'Train + Eat Right'}
          </p>
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tighter">
            {isAr ? 'ابنِ الجسم وغذِّ الجسم.' : 'Build the body. Fuel the body.'}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream-100/70 md:text-lg">
            {isAr
              ? 'الصفحة اللي ما تلاقيها بالمواقع الثانية: تمارين، برامج جيم، جداول وجبات حلال، حاسبات احترافية. كله مفتوح المصدر ومجاني للأبد.'
              : 'The page you will not find on other recipe sites: workouts, gym programs, halal meal plans, professional calculators. All open source, all free forever.'}
          </p>
        </div>

        {/* ===== 4 cards ===== */}
        <div className="grid gap-4 px-7 py-10 md:grid-cols-2 md:gap-5 md:px-12 md:py-14 xl:grid-cols-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.titleEn}
                to={c.to}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-cream-50/10 bg-cream-50/5 p-5 transition-all hover:border-cream-50/30 hover:bg-cream-50/10"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={`grid h-11 w-11 place-items-center rounded-xl ${c.accent} backdrop-blur`}>
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <ArrowUpRight className="rtl-flip h-4 w-4 text-cream-100/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream-50" strokeWidth={2} />
                </div>
                <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight">
                  {isAr ? c.titleAr : c.titleEn}
                </h3>
                <p className="text-xs leading-relaxed text-cream-100/65 md:text-[13px]">
                  {isAr ? c.bodyAr : c.bodyEn}
                </p>
                <p className="mt-auto pt-2 text-[11px] font-medium uppercase tracking-widest text-gold-400">
                  {isAr ? c.valueAr : c.valueEn}
                </p>
              </Link>
            );
          })}
        </div>

        {/* ===== Bottom CTA row ===== */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cream-50/10 px-7 py-6 md:px-12">
          <p className="text-xs text-cream-100/55">
            {isAr
              ? 'مبني على Jeff Nippard و r/Fitness و Renaissance Periodization. صفر إعلانات، صفر اشتراكات.'
              : 'Built on Jeff Nippard, r/Fitness, and Renaissance Periodization. No ads, no subscriptions.'}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/workouts"
              className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-medium text-cream-50 hover:bg-terracotta-600"
            >
              <Dumbbell className="h-3.5 w-3.5" strokeWidth={2} />
              {isAr ? 'افتح الجيم' : 'Open the gym'}
            </Link>
            <Link
              to="/fitness"
              className="inline-flex items-center gap-1.5 rounded-full border border-cream-50/20 px-5 py-2.5 text-sm font-medium text-cream-50 hover:border-cream-50/50"
            >
              <Flame className="h-3.5 w-3.5" strokeWidth={2} />
              {isAr ? 'افتح الفيتنس' : 'Open fitness'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
