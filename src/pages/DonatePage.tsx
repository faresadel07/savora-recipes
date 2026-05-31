import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Coffee, Heart, Server, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n';

const TIERS = [
  {
    nameKey: 'donate.tier1Name',
    amount: '$3',
    blurbKey: 'donate.tier1Body',
    href: 'https://www.buymeacoffee.com/savora',
    accent: 'terracotta',
    icon: <Coffee className="h-5 w-5" />,
  },
  {
    nameKey: 'donate.tier2Name',
    amount: '$10',
    blurbKey: 'donate.tier2Body',
    href: 'https://www.buymeacoffee.com/savora',
    accent: 'sage',
    icon: <Server className="h-5 w-5" />,
  },
  {
    nameKey: 'donate.tier3Name',
    amount: '$25',
    blurbKey: 'donate.tier3Body',
    href: 'https://www.buymeacoffee.com/savora',
    accent: 'gold',
    icon: <Sparkles className="h-5 w-5" />,
  },
];

function HeroStat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-2xl border border-cream-50/15 bg-cream-50/5 p-3 text-center backdrop-blur-sm">
      <p className="text-xl font-bold tracking-tighter text-cream-50 md:text-2xl">{top}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-cream-100/60">{bottom}</p>
    </div>
  );
}

export default function DonatePage() {
  const { t, tArray } = useTranslation();
  const fundsList = tArray('donate.fundsList');
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-900 py-14 text-cream-50 md:py-20">
        <div className="container-wide relative z-10">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="eyebrow mb-5 inline-flex items-center gap-2 text-cream-100/70">
                <Heart className="h-3 w-3" fill="currentColor" /> {t('donate.eyebrow')}
              </p>
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tighter">
                {t('donate.title1')}
                <br />
                <span className="text-terracotta-400">{t('donate.title2')}</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-cream-100/80 sm:text-lg">
                {t('donate.body')}
              </p>

              <div className="mt-7 grid max-w-md grid-cols-3 gap-3">
                <HeroStat top="0" bottom={t('donate.ads')} />
                <HeroStat top="0" bottom={t('donate.trackers')} />
                <HeroStat top="100%" bottom={t('donate.toDev')} />
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-3xl border border-cream-50/15 bg-cream-50/5 p-7 backdrop-blur-sm">
                <p className="eyebrow text-cream-100/60">{t('donate.whatItPaysFor')}</p>
                <ul className="mt-5 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-terracotta-400" />
                    <div>
                      <p className="text-sm font-medium tracking-tight text-cream-50">{t('donate.hostingCdn')}</p>
                      <p className="text-xs text-cream-100/70">{t('donate.hostingCdnBody')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold-400" />
                    <div>
                      <p className="text-sm font-medium tracking-tight text-cream-50">{t('donate.domain')}</p>
                      <p className="text-xs text-cream-100/70">{t('donate.domainBody')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-sage-400" />
                    <div>
                      <p className="text-sm font-medium tracking-tight text-cream-50">{t('donate.featuresRecipes')}</p>
                      <p className="text-xs text-cream-100/70">{t('donate.featuresRecipesBody')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cream-50" />
                    <div>
                      <p className="text-sm font-medium tracking-tight text-cream-50">{t('donate.coffee')}</p>
                      <p className="text-xs text-cream-100/70">{t('donate.coffeeBody')}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-terracotta-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
      </section>

      {/* TIERS */}
      <section className="container-wide -mt-12 md:-mt-16">
        <div className="grid gap-5 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <a
              key={tier.nameKey}
              href={tier.href}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col rounded-3xl border border-ink-100 bg-cream-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className={`mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full ${
                  tier.accent === 'terracotta'
                    ? 'bg-terracotta-50 text-terracotta-500'
                    : tier.accent === 'sage'
                    ? 'bg-sage-50 text-sage-600'
                    : 'bg-cream-200 text-gold-600'
                }`}
              >
                {tier.icon}
              </div>
              <p className="text-[11px] uppercase tracking-widest text-ink-400">{t(tier.nameKey)}</p>
              <p className="mt-2 text-5xl font-bold tracking-tighter text-ink-900">{tier.amount}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-600">{t(tier.blurbKey)}</p>
              <div className="mt-7 inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-ink-900">
                {t('donate.sendViaCoffee')}
                <ArrowUpRight className="rtl-flip h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* OTHER WAYS */}
      <section className="container-wide mt-20 md:mt-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <p className="eyebrow mb-3">{t('donate.fundsEyebrow')}</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tighter">
              {t('donate.fundsTitle1')}
              <span className="text-terracotta-500"> {t('donate.fundsTitle2')}</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
              {t('donate.fundsBody')}
            </p>
          </div>

          <div className="md:col-span-7">
            <ul className="space-y-3">
              {fundsList.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-cream-50 px-5 py-4 transition-colors hover:border-ink-900"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-sage-50 text-sage-600">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-[15px] tracking-tight text-ink-900">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OTHER METHODS */}
      <section className="container-wide mt-20 md:mt-28">
        <div className="rounded-3xl bg-cream-100 p-8 md:p-12">
          <p className="eyebrow mb-3">{t('donate.otherEyebrow')}</p>
          <h3 className="text-2xl font-semibold tracking-tighter md:text-3xl">
            {t('donate.otherTitle')}
          </h3>
          <p className="mt-3 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
            {t('donate.otherBody')}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://www.paypal.me/savora"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              {t('donate.paypal')}
              <ArrowUpRight className="rtl-flip h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/sponsors/savora"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              {t('donate.githubSponsors')}
              <ArrowUpRight className="rtl-flip h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:hello@zaytoun.app"
              className="btn-outline"
            >
              {t('donate.emailUs')}
            </a>
          </div>
        </div>
      </section>

      {/* THANK YOU */}
      <section className="container-narrow mt-20 py-16 text-center md:mt-28 md:py-24">
        <p className="eyebrow mb-5">{t('donate.thanksEyebrow')}</p>
        <p className="text-2xl font-medium leading-snug tracking-tight text-ink-900 md:text-3xl">
          {t('donate.thanksQuote')}
        </p>
        <Link to="/recipes" className="btn-primary mt-9">
          {t('favorites.browseRecipes')}
          <ArrowUpRight className="rtl-flip h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
