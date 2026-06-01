import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Database,
  Eye,
  Globe,
  Lock,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import { useTranslation } from '../i18n';

const PRINCIPLES = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    titleKey: 'privacy.p1Title',
    bodyKey: 'privacy.p1Body',
    accent: 'sage',
  },
  {
    icon: <Eye className="h-5 w-5" />,
    titleKey: 'privacy.p2Title',
    bodyKey: 'privacy.p2Body',
    accent: 'terracotta',
  },
  {
    icon: <Database className="h-5 w-5" />,
    titleKey: 'privacy.p3Title',
    bodyKey: 'privacy.p3Body',
    accent: 'gold',
  },
];

const STORAGE_ITEMS = [
  { keyName: 'zaytoun:theme', purpose: 'privacy.storeTheme' },
  { keyName: 'zaytoun:language', purpose: 'privacy.storeLang' },
  { keyName: 'zaytoun:favorites', purpose: 'privacy.storeFavs' },
  { keyName: 'zaytoun:academy:watched', purpose: 'privacy.storeProgress' },
  { keyName: 'zaytoun:macros:v1', purpose: 'privacy.storeMacros' },
  { keyName: 'zaytoun:search:recent', purpose: 'privacy.storeRecent' },
  { keyName: 'zaytoun:cookies:accepted', purpose: 'privacy.storeCookie' },
];

const THIRD_PARTIES = [
  { name: 'TheMealDB', purpose: 'privacy.tpMealDb', url: 'https://www.themealdb.com' },
  { name: 'Forkify', purpose: 'privacy.tpForkify', url: 'https://forkify-api.jonas.io' },
  { name: 'YouTube (nocookie)', purpose: 'privacy.tpYouTube', url: 'https://www.youtube.com' },
  { name: 'Unsplash', purpose: 'privacy.tpUnsplash', url: 'https://unsplash.com' },
  { name: 'Internet Archive', purpose: 'privacy.tpArchive', url: 'https://archive.org' },
  { name: 'Ko-fi', purpose: 'privacy.tpKofi', url: 'https://ko-fi.com' },
  { name: 'Vercel', purpose: 'privacy.tpVercel', url: 'https://vercel.com' },
];

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div>
      {/* HERO */}
      <section className="bg-cream-50 pt-10 pb-16 md:pt-16 md:pb-20">
        <div className="container-narrow text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
            <Shield className="h-3 w-3" />
            {t('privacy.eyebrow')}
          </p>
          <h1 className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tighter text-ink-900">
            {t('privacy.title1')}
            <br />
            <span className="text-terracotta-500">{t('privacy.title2')}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-600 md:text-lg">
            {t('privacy.subtitle')}
          </p>
          <p className="mx-auto mt-4 text-[11px] uppercase tracking-widest text-ink-400">
            {t('privacy.lastUpdated')}
          </p>
        </div>
      </section>

      {/* THREE PRINCIPLES */}
      <section className="container-wide -mt-4 md:-mt-6">
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div
              key={p.titleKey}
              className="rounded-3xl border border-ink-100 bg-cream-50 p-6 md:p-7"
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-full ${
                  p.accent === 'terracotta'
                    ? 'bg-terracotta-50 text-terracotta-500'
                    : p.accent === 'sage'
                    ? 'bg-sage-50 text-sage-600'
                    : 'bg-cream-200 text-gold-600'
                }`}
              >
                {p.icon}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-900">
                {t(p.titleKey)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{t(p.bodyKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 1: WHAT WE STORE */}
      <section className="container-narrow mt-16 md:mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
          {t('privacy.s1Eyebrow')}
        </p>
        <h2 className="mt-3 text-[clamp(1.8rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tighter text-ink-900">
          {t('privacy.s1Title')}
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-600 md:text-[17px]">
          {t('privacy.s1Body')}
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100">
          <div className="grid grid-cols-12 bg-ink-900 px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-cream-50">
            <div className="col-span-5">{t('privacy.storeKey')}</div>
            <div className="col-span-7">{t('privacy.storePurpose')}</div>
          </div>
          {STORAGE_ITEMS.map((item, i) => (
            <div
              key={item.keyName}
              className={`grid grid-cols-12 px-5 py-3 text-sm ${
                i % 2 === 0 ? 'bg-cream-50' : 'bg-cream-100/50'
              }`}
            >
              <div className="col-span-5 font-mono text-[12px] text-ink-700">{item.keyName}</div>
              <div className="col-span-7 text-ink-600">{t(item.purpose)}</div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm text-ink-500">{t('privacy.s1Clear')}</p>
      </section>

      {/* SECTION 2: WHAT WE DON'T DO */}
      <section className="bg-ink-900 mt-20 py-16 text-cream-50 md:mt-28 md:py-24">
        <div className="container-narrow">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-400">
            {t('privacy.s2Eyebrow')}
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tighter">
            {t('privacy.s2Title')}
          </h2>
          <ul className="mt-7 space-y-4">
            {['s2L1', 's2L2', 's2L3', 's2L4', 's2L5', 's2L6'].map((k) => (
              <li
                key={k}
                className="flex items-start gap-3 rounded-2xl border border-cream-50/10 bg-cream-50/5 p-5 backdrop-blur-sm"
              >
                <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-terracotta-400" />
                <p className="text-sm leading-relaxed text-cream-100/90 md:text-base">
                  {t(`privacy.${k}`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 3: THIRD PARTIES */}
      <section className="container-narrow mt-20 md:mt-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
          {t('privacy.s3Eyebrow')}
        </p>
        <h2 className="mt-3 text-[clamp(1.8rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tighter text-ink-900">
          {t('privacy.s3Title')}
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-600 md:text-[17px]">
          {t('privacy.s3Body')}
        </p>

        <ul className="mt-8 space-y-3">
          {THIRD_PARTIES.map((tp) => (
            <li
              key={tp.name}
              className="flex items-start justify-between gap-4 rounded-2xl border border-ink-100 bg-cream-50 px-5 py-4"
            >
              <div>
                <p className="text-base font-semibold tracking-tight text-ink-900">{tp.name}</p>
                <p className="mt-1 text-sm text-ink-600">{t(tp.purpose)}</p>
              </div>
              <a
                href={tp.url}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 flex-none place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
                aria-label={`Visit ${tp.name}`}
              >
                <ArrowUpRight className="rtl-flip h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 4: SECURITY */}
      <section className="container-narrow mt-20 md:mt-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
          {t('privacy.s4Eyebrow')}
        </p>
        <h2 className="mt-3 text-[clamp(1.8rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tighter text-ink-900">
          {t('privacy.s4Title')}
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-600 md:text-[17px]">
          {t('privacy.s4Body')}
        </p>
        <ul className="mt-6 space-y-2 text-sm text-ink-600">
          {['s4L1', 's4L2', 's4L3', 's4L4', 's4L5'].map((k) => (
            <li key={k} className="flex items-start gap-3">
              <Lock className="mt-1 h-3.5 w-3.5 flex-none text-sage-600" />
              <span>{t(`privacy.${k}`)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 5: CHILDREN + RIGHTS + CHANGES */}
      <section className="container-narrow mt-20 md:mt-28 space-y-12">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
            {t('privacy.s5Eyebrow')}
          </p>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-tighter text-ink-900">
            {t('privacy.s5Title')}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-600 md:text-[17px]">
            {t('privacy.s5Body')}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
            {t('privacy.s6Eyebrow')}
          </p>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-tighter text-ink-900">
            {t('privacy.s6Title')}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-600 md:text-[17px]">
            {t('privacy.s6Body')}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
            {t('privacy.s7Eyebrow')}
          </p>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-tighter text-ink-900">
            {t('privacy.s7Title')}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-600 md:text-[17px]">
            {t('privacy.s7Body')}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container-narrow mt-20 py-16 text-center md:mt-28 md:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
          {t('privacy.ctaEyebrow')}
        </p>
        <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-ink-900 md:text-3xl">
          {t('privacy.ctaQuote')}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact" className="btn-primary">
            {t('privacy.ctaContact')}
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
          <Link to="/terms" className="btn-outline">
            {t('privacy.ctaTerms')}
            <Globe className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
