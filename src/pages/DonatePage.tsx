import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Check,
  Coffee,
  Heart,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from '../i18n';

const KOFI_USER = 'zaytoun';
const KOFI_ONCE = `https://ko-fi.com/${KOFI_USER}`;
const KOFI_MONTHLY = `https://ko-fi.com/${KOFI_USER}/tiers`;

const PRESET_AMOUNTS = [3, 5, 10, 25];

type Frequency = 'once' | 'monthly';
type AmountChoice = number | 'custom';

function HeroStat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-cream-50 p-3 text-center">
      <p className="text-xl font-bold tracking-tighter text-ink-900 md:text-2xl">{top}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-400">{bottom}</p>
    </div>
  );
}

export default function DonatePage() {
  const { t, tArray, isRtl } = useTranslation();
  const fundsList = tArray('donate.fundsList');

  const [frequency, setFrequency] = useState<Frequency>('once');
  const [choice, setChoice] = useState<AmountChoice>(5);
  const [customAmount, setCustomAmount] = useState('');

  const finalAmount = useMemo(() => {
    if (choice === 'custom') {
      const parsed = parseInt(customAmount, 10);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    }
    return choice;
  }, [choice, customAmount]);

  const canSubmit = finalAmount > 0;
  const kofiUrl = frequency === 'monthly' ? KOFI_MONTHLY : KOFI_ONCE;

  const buttonLabel = t(
    frequency === 'monthly' ? 'donate.supportButtonMonthly' : 'donate.supportButton',
    { amount: `$${finalAmount || '...'}` },
  );

  return (
    <div>
      {/* DONATION WIDGET HERO */}
      <section className="bg-cream-50 pt-10 pb-16 md:pt-16 md:pb-20">
        <div className="container-narrow">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
              <Heart className="h-3 w-3" fill="currentColor" />
              {t('donate.eyebrow')}
            </p>
            <h1 className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tighter text-ink-900">
              {t('donate.title1')}
              <br />
              <span className="text-terracotta-500">{t('donate.title2')}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-600 md:text-lg">
              {t('donate.body')}
            </p>
          </div>

          {/* The widget card */}
          <div className="mx-auto mt-12 max-w-2xl rounded-[28px] border border-ink-100 bg-cream-100/60 p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] md:p-8">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                {t('donate.widgetTitle')}
              </p>
            </div>

            {/* Frequency toggle */}
            <div className="mt-5 flex justify-center">
              <div className="inline-flex rounded-full border border-ink-100 bg-cream-50 p-1">
                <button
                  type="button"
                  onClick={() => setFrequency('once')}
                  aria-pressed={frequency === 'once'}
                  className={`rounded-full px-6 py-2 text-[13px] font-medium tracking-tight transition-all duration-300 ${
                    frequency === 'once'
                      ? 'bg-ink-900 text-cream-50'
                      : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {t('donate.freqOnce')}
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  aria-pressed={frequency === 'monthly'}
                  className={`rounded-full px-6 py-2 text-[13px] font-medium tracking-tight transition-all duration-300 ${
                    frequency === 'monthly'
                      ? 'bg-ink-900 text-cream-50'
                      : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {t('donate.freqMonthly')}
                </button>
              </div>
            </div>

            {/* Amount cards */}
            <div className="mt-7 grid grid-cols-3 gap-3 md:grid-cols-5">
              {PRESET_AMOUNTS.map((amount) => {
                const active = choice === amount;
                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setChoice(amount)}
                    aria-pressed={active}
                    className={`relative rounded-2xl border-2 py-4 transition-all duration-300 ${
                      active
                        ? 'border-terracotta-500 bg-terracotta-50'
                        : 'border-ink-100 bg-cream-50 hover:-translate-y-0.5 hover:border-ink-300'
                    }`}
                  >
                    <p
                      className={`text-2xl font-bold tracking-tighter ${
                        active ? 'text-terracotta-600' : 'text-ink-900'
                      }`}
                    >
                      ${amount}
                    </p>
                    {frequency === 'monthly' && (
                      <p className="mt-0.5 text-[10px] tracking-tight text-ink-400">
                        {t('donate.perMonth')}
                      </p>
                    )}
                  </button>
                );
              })}
              {/* Custom */}
              <button
                type="button"
                onClick={() => setChoice('custom')}
                aria-pressed={choice === 'custom'}
                className={`relative col-span-3 rounded-2xl border-2 py-4 transition-all duration-300 md:col-span-1 ${
                  choice === 'custom'
                    ? 'border-terracotta-500 bg-terracotta-50'
                    : 'border-ink-100 bg-cream-50 hover:-translate-y-0.5 hover:border-ink-300'
                }`}
              >
                <p
                  className={`text-sm font-semibold tracking-tight ${
                    choice === 'custom' ? 'text-terracotta-600' : 'text-ink-900'
                  }`}
                >
                  {t('donate.custom')}
                </p>
              </button>
            </div>

            {/* Custom amount input */}
            {choice === 'custom' && (
              <div className="mx-auto mt-4 max-w-xs">
                <div className="relative">
                  <span
                    className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-lg font-medium text-ink-500 ${
                      isRtl ? 'right-5' : 'left-5'
                    }`}
                  >
                    $
                  </span>
                  <input
                    type="number"
                    min={1}
                    inputMode="numeric"
                    placeholder={t('donate.customPlaceholder')}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className={`w-full rounded-full border-2 border-ink-100 bg-cream-50 py-3 text-center text-lg font-semibold tracking-tight text-ink-900 transition-colors focus:border-terracotta-500 focus:outline-none ${
                      isRtl ? 'pr-10 pl-5' : 'pl-10 pr-5'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* CTA */}
            <a
              href={canSubmit ? kofiUrl : undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!canSubmit}
              onClick={(e) => {
                if (!canSubmit) e.preventDefault();
              }}
              className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-[14px] font-semibold tracking-tight transition-all duration-300 ${
                canSubmit
                  ? 'bg-ink-900 text-cream-50 hover:bg-terracotta-500 active:scale-[0.99]'
                  : 'cursor-not-allowed bg-ink-100 text-ink-400'
              }`}
            >
              {buttonLabel}
              <ArrowUpRight className="rtl-flip h-4 w-4" />
            </a>

            {/* Security note */}
            <p className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] tracking-tight text-ink-500">
              <ShieldCheck className="h-3.5 w-3.5 text-sage-600" />
              {t('donate.secureNote')}
            </p>
          </div>

          {/* Stat strip */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3">
            <HeroStat top="0" bottom={t('donate.ads')} />
            <HeroStat top="0" bottom={t('donate.trackers')} />
            <HeroStat top="100%" bottom={t('donate.toDev')} />
          </div>
        </div>
      </section>

      {/* WHAT IT PAYS FOR */}
      <section className="bg-ink-900 py-16 text-cream-50 md:py-24">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-400">
                {t('donate.whatItPaysFor')}
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tighter">
                {t('donate.whatItPaysFor')}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-cream-100/70 sm:text-base">
                {t('donate.body')}
              </p>
            </div>

            <div className="md:col-span-7">
              <ul className="space-y-4">
                <li className="flex items-start gap-4 rounded-2xl border border-cream-50/10 bg-cream-50/5 p-5 backdrop-blur-sm">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-terracotta-500/15 text-terracotta-400">
                    <Server className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-cream-50">
                      {t('donate.hostingCdn')}
                    </p>
                    <p className="mt-1 text-xs text-cream-100/70">{t('donate.hostingCdnBody')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 rounded-2xl border border-cream-50/10 bg-cream-50/5 p-5 backdrop-blur-sm">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-sage-500/20 text-sage-400">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-cream-50">
                      {t('donate.featuresRecipes')}
                    </p>
                    <p className="mt-1 text-xs text-cream-100/70">
                      {t('donate.featuresRecipesBody')}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 rounded-2xl border border-cream-50/10 bg-cream-50/5 p-5 backdrop-blur-sm">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-cream-50/15 text-cream-50">
                    <Coffee className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-cream-50">
                      {t('donate.coffee')}
                    </p>
                    <p className="mt-1 text-xs text-cream-100/70">{t('donate.coffeeBody')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDS LIST */}
      <section className="container-wide mt-20 md:mt-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
              {t('donate.fundsEyebrow')}
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tighter text-ink-900">
              {t('donate.fundsTitle1')}
              <span className="text-terracotta-500"> {t('donate.fundsTitle2')}</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
              {t('donate.fundsBody')}
            </p>
          </div>

          <div className="md:col-span-7">
            <ul className="space-y-3">
              {fundsList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-cream-50 px-5 py-4 transition-colors hover:border-ink-900"
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
            {t('donate.otherEyebrow')}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tighter md:text-3xl">
            {t('donate.otherTitle')}
          </h3>
          <p className="mt-3 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
            {t('donate.otherBody')}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={KOFI_ONCE} target="_blank" rel="noreferrer" className="btn-primary">
              {t('donate.openKofi')}
              <ArrowUpRight className="rtl-flip h-3.5 w-3.5" />
            </a>
            <a href="mailto:miggajigga6767@gmail.com" className="btn-outline">
              {t('donate.emailUs')}
            </a>
          </div>
        </div>
      </section>

      {/* THANK YOU */}
      <section className="container-narrow mt-20 py-16 text-center md:mt-28 md:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
          {t('donate.thanksEyebrow')}
        </p>
        <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-ink-900 md:text-3xl">
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
