import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Code2,
  Coffee,
  Flame,
  Heart,
  MapPin,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { useTranslation } from '../i18n';

const STACK = [
  'React 19',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'TanStack Query',
  'Fuse.js',
  'jsPDF',
  'Web Speech API',
  'PWA',
  'Vercel',
];

const PRINCIPLES = [
  {
    icon: <Flame className="h-5 w-5" />,
    titleKey: 'about.principle1Title',
    bodyKey: 'about.principle1Body',
    accent: 'terracotta',
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    titleKey: 'about.principle2Title',
    bodyKey: 'about.principle2Body',
    accent: 'sage',
  },
  {
    icon: <Utensils className="h-5 w-5" />,
    titleKey: 'about.principle3Title',
    bodyKey: 'about.principle3Body',
    accent: 'gold',
  },
];

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-cream-50 px-4 py-3 text-center">
      <p className="text-2xl font-bold tracking-tighter text-ink-900 md:text-3xl">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-400">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  const { t, tArray } = useTranslation();
  const storyParas = tArray('about.storyParagraphs');

  return (
    <div>
      {/* HERO */}
      <section className="bg-cream-50 pt-10 pb-16 md:pt-16 md:pb-20">
        <div className="container-narrow text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
            {t('about.eyebrow')}
          </p>
          <h1 className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tighter text-ink-900">
            {t('about.title1')}
            <br />
            <span className="text-terracotta-500">{t('about.title2')}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-600 md:text-lg">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* AUTHOR PANEL */}
      <section className="container-wide -mt-4 md:-mt-6">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-ink-100 bg-cream-100/60 p-7 md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
            {/* Avatar */}
            <div className="relative grid h-24 w-24 flex-none place-items-center rounded-full bg-ink-900 md:h-28 md:w-28">
              <span className="text-3xl font-bold tracking-tighter text-cream-50 md:text-4xl">
                FH
              </span>
              <span className="absolute -right-1 -bottom-1 grid h-8 w-8 place-items-center rounded-full border-2 border-cream-50 bg-terracotta-500">
                <Heart className="h-3.5 w-3.5 text-cream-50" fill="currentColor" />
              </span>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                {t('about.authorLabel')}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tighter text-ink-900 md:text-3xl">
                Faris Hamdan
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-600">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-terracotta-500" />
                  {t('about.location')}
                </span>
                <span className="text-ink-300">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-sage-600" />
                  {t('about.role')}
                </span>
                <span className="text-ink-300">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Coffee className="h-3.5 w-3.5 text-ink-500" />
                  {t('about.passion')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="container-narrow mt-16 md:mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
          {t('about.storyEyebrow')}
        </p>
        <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tighter text-ink-900">
          {t('about.storyTitle')}
        </h2>
        <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-ink-600 md:text-[17px]">
          {storyParas.map((paragraph, i) => (
            <p
              key={i}
              className={i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-terracotta-500' : ''}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-ink-900 mt-20 py-16 text-cream-50 md:mt-28 md:py-24">
        <div className="container-wide">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-400">
              {t('about.principlesEyebrow')}
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tighter">
              {t('about.principlesTitle')}
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.titleKey}
                className="rounded-3xl border border-cream-50/10 bg-cream-50/5 p-7 backdrop-blur-sm"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
                    principle.accent === 'terracotta'
                      ? 'bg-terracotta-500/15 text-terracotta-400'
                      : principle.accent === 'sage'
                      ? 'bg-sage-500/20 text-sage-400'
                      : 'bg-cream-50/15 text-cream-50'
                  }`}
                >
                  {principle.icon}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-cream-50">
                  {t(principle.titleKey)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-100/75">
                  {t(principle.bodyKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-narrow mt-20 md:mt-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
          {t('about.statsEyebrow')}
        </p>
        <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tighter text-ink-900">
          {t('about.statsTitle')}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCell value="8" label={t('about.statLibraries')} />
          <StatCell value="2,200+" label={t('about.statShorts')} />
          <StatCell value="40+" label={t('about.statLessons')} />
          <StatCell value="0" label={t('about.statAds')} />
        </div>
      </section>

      {/* TECH STACK */}
      <section className="container-wide mt-20 md:mt-28">
        <div className="rounded-3xl bg-cream-100 p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
                {t('about.stackEyebrow')}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tighter text-ink-900 md:text-3xl">
                {t('about.stackTitle')}
              </h2>
              <p className="mt-3 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
                {t('about.stackBody')}
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="flex flex-wrap gap-2">
                {STACK.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border border-ink-200 bg-cream-50 px-4 py-2 text-[13px] font-medium tracking-tight text-ink-900"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-narrow mt-20 py-16 text-center md:mt-28 md:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
          {t('about.ctaEyebrow')}
        </p>
        <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-ink-900 md:text-3xl">
          {t('about.ctaQuote')}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/donate" className="btn-primary">
            {t('about.ctaSupport')}
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
