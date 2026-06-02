import { useState } from 'react';
import { Quote } from 'lucide-react';
import { CHEF_QUOTES, type ChefQuote } from '../data/chef-quotes';
import { useTranslation } from '../i18n';

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// Five paired gradient combos keep the row varied without looking random.
// Picked by stable hash of the chef id so each chef always gets the same
// pair, which keeps the layout consistent across page reloads.
const GRADIENT_PAIRS = [
  ['from-terracotta-500', 'to-gold-500'],
  ['from-sage-500', 'to-sage-600'],
  ['from-ink-700', 'to-ink-900'],
  ['from-gold-500', 'to-terracotta-500'],
  ['from-terracotta-400', 'to-terracotta-700'],
] as const;

function pickGradient(id: string): readonly [string, string] {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return GRADIENT_PAIRS[Math.abs(hash) % GRADIENT_PAIRS.length];
}

function PortraitAvatar({ quote, isAr }: { quote: ChefQuote; isAr: boolean }) {
  const [failed, setFailed] = useState(false);
  const label = isAr ? quote.nameAr : quote.name;
  const [from, to] = pickGradient(quote.id);

  if (failed) {
    return (
      <div
        aria-label={label}
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${from} ${to} font-display text-lg font-semibold tracking-tight text-cream-50 shadow-sm ring-1 ring-ink-900/5 md:h-20 md:w-20 md:text-xl`}
      >
        {initials(quote.name)}
      </div>
    );
  }

  return (
    <img
      src={`/chefs/${quote.portrait}`}
      alt={label}
      width={80}
      height={80}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-16 w-16 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-ink-900/5 md:h-20 md:w-20"
    />
  );
}

function QuoteCard({ quote }: { quote: ChefQuote }) {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  const text = isAr ? quote.quoteAr : quote.quote;
  const name = isAr ? quote.nameAr : quote.name;
  const role = isAr ? quote.roleAr : quote.role;

  return (
    <article className="relative w-[88vw] max-w-[480px] shrink-0 snap-start overflow-hidden rounded-2xl border border-ink-900/8 bg-cream-50 p-5 shadow-sm transition-shadow hover:shadow-md md:w-[480px] md:p-6">
      <Quote className="rtl-flip absolute end-4 top-4 h-7 w-7 text-cream-300" strokeWidth={1.5} />
      <div className="flex items-start gap-4">
        <PortraitAvatar quote={quote} isAr={isAr} />
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] italic leading-snug text-ink-900 md:text-base">
            {text}
          </p>
          <div className="mt-3 border-t border-ink-900/10 pt-3">
            <p className="text-sm font-semibold tracking-tight text-ink-900">{name}</p>
            <p className="mt-0.5 text-xs text-ink-500">{role}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ChefQuotesMarquee() {
  const { t } = useTranslation();

  return (
    <section className="mt-20 md:mt-28">
      <div className="container-wide">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 inline-flex items-center gap-2">
              <Quote className="rtl-flip h-3 w-3" strokeWidth={2} />
              {t('home.quotesEyebrow')}
            </p>
            <h2 className="text-3xl font-semibold tracking-tighter text-ink-900 md:text-4xl">
              {t('home.quotesTitle')}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-500 md:text-base">
              {t('home.quotesSubtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-4 md:gap-5 md:px-8"
          style={{ scrollPaddingInline: '1.5rem' }}
        >
          {CHEF_QUOTES.map((q) => (
            <QuoteCard key={q.id} quote={q} />
          ))}
          <div className="shrink-0 ps-2" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
