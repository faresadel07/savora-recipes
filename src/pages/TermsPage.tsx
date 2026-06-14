import { Link } from 'react-router-dom';
import { FileText, Scale, Shield } from 'lucide-react';
import { useTranslation } from '../i18n';

const SECTIONS = [
  's1', // Acceptance
  's2', // Description
  's3', // Use at own risk (recipes/health)
  's4', // Intellectual property
  's5', // Acceptable use
  's6', // Third party content (YouTube, Spoonacular)
  's7', // Donations (Ko-fi)
  's8', // Disclaimer
  's9', // Limitation of liability
  's10', // Changes
  's11', // Governing law
  's12', // Contact
];

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <div>
      {/* HERO */}
      <section className="bg-cream-50 pt-10 pb-16 md:pt-16 md:pb-20">
        <div className="container-narrow text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
            <Scale className="h-3 w-3" />
            {t('terms.eyebrow')}
          </p>
          <h1 className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tighter text-ink-900">
            {t('terms.title1')}
            <br />
            <span className="text-terracotta-500">{t('terms.title2')}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-600 md:text-lg">
            {t('terms.subtitle')}
          </p>
          <p className="mx-auto mt-4 text-[11px] uppercase tracking-widest text-ink-400">
            {t('terms.lastUpdated')}
          </p>
        </div>
      </section>

      {/* INTRO CARD */}
      <section className="container-wide -mt-4 md:-mt-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-ink-100 bg-cream-100/60 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-terracotta-50 text-terracotta-500">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                {t('terms.introEyebrow')}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-900 md:text-[17px]">
                {t('terms.intro')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERED SECTIONS */}
      <section className="container-narrow mt-16 md:mt-24 space-y-12">
        {SECTIONS.map((key, i) => (
          <div key={key}>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-2xl font-bold tracking-tighter text-terracotta-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="text-[clamp(1.4rem,2.5vw,1.75rem)] font-semibold leading-tight tracking-tighter text-ink-900">
                {t(`terms.${key}Title`)}
              </h2>
            </div>
            <p className="mt-4 pl-10 text-[15px] leading-relaxed text-ink-600 md:text-[17px]">
              {t(`terms.${key}Body`)}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="container-narrow mt-20 py-16 text-center md:mt-28 md:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
          {t('terms.ctaEyebrow')}
        </p>
        <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-ink-900 md:text-3xl">
          {t('terms.ctaQuote')}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/privacy" className="btn-primary">
            {t('terms.ctaPrivacy')}
            <Shield className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
