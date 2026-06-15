import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Droplets, Filter, Flame, Salad, Search, Sparkles, X } from 'lucide-react';
import { SAUCES } from '../data/sauces';
import RecipeImage from '../components/RecipeImage';
import { useTranslation } from '../i18n';

type SauceCategory = 'all' | 'Sauce' | 'Dip' | 'Condiment' | 'Dressing' | 'Marinade';

function SauceCard({ sauce }: { sauce: (typeof SAUCES)[number] }) {
  const { t, pl } = useTranslation();
  const title = pl(sauce.title, sauce.titleAr);
  const blurb = pl(sauce.blurb, sauce.blurbAr);
  return (
    <Link
      to={`/recipe/${sauce.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 transition-shadow hover:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.15)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
        <RecipeImage
          src={sauce.image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream-50/95 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-900 backdrop-blur">
          {sauce.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[11px] font-medium uppercase tracking-widest text-terracotta-500">
          {sauce.area}
        </p>
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink-900 group-hover:text-terracotta-500">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-ink-500 line-clamp-2">{blurb}</p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs tracking-tight text-ink-300">
          <span>{sauce.readyInMinutes} {t('sauces.minLabel')}</span>
          <span className="h-1 w-1 rounded-full bg-ink-200" />
          <span>{sauce.servings} {t('sauces.servingsLabel')}</span>
        </div>
      </div>
    </Link>
  );
}

export default function SaucesLibraryPage() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<SauceCategory>('all');
  const [query, setQuery] = useState('');

  const CATEGORY_OPTIONS: { id: SauceCategory; label: string; icon: typeof Sparkles }[] = [
    { id: 'all',       label: t('sauces.catAll'),        icon: Sparkles },
    { id: 'Sauce',     label: t('sauces.catSauces'),     icon: Droplets },
    { id: 'Dip',       label: t('sauces.catDips'),       icon: Salad },
    { id: 'Condiment', label: t('sauces.catCondiments'), icon: Flame },
    { id: 'Dressing',  label: t('sauces.catDressings'),  icon: Filter },
    { id: 'Marinade',  label: t('sauces.catMarinades'),  icon: ChefHat },
  ];

  const counts = useMemo(() => {
    const map: Record<SauceCategory, number> = {
      all: SAUCES.length, Sauce: 0, Dip: 0, Condiment: 0, Dressing: 0, Marinade: 0,
    };
    for (const s of SAUCES) {
      const cat = s.category;
      if (cat && cat in map) map[cat as SauceCategory]++;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAUCES.filter((s) => {
      if (category !== 'all' && s.category !== category) return false;
      if (q) {
        const hay = `${s.title} ${s.blurb} ${s.area} ${s.tags?.join(' ') ?? ''} ${s.ingredients?.map((i) => i.name).join(' ') ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [category, query]);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-ink-900 text-cream-50">
        <div className="container-wide py-16 md:py-24">
          <p className="eyebrow mb-5 inline-flex items-center gap-2 text-gold-400">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            {t('sauces.eyebrow')}
          </p>
          <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tighter">
            {t('sauces.title')}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/70 md:text-lg">
            {t('sauces.body')}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { value: `${SAUCES.length}`, label: t('sauces.statSauces') },
              { value: '9', label: t('sauces.statCuisines') },
              { value: '5', label: t('sauces.statCategories') },
              { value: '100%', label: t('sauces.statNoAlcohol') },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-cream-50/15 bg-cream-50/5 p-4 backdrop-blur-sm">
                <p className="text-3xl font-semibold tracking-tighter md:text-4xl">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-cream-100/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FILTERS + GRID ============ */}
      <section className="container-wide py-16 md:py-20">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
              {t('sauces.sectionTitle')}
            </h2>
            <p className="mt-2 max-w-xl text-sm tracking-tight text-ink-500 md:text-base">
              {t('sauces.sectionBody')}
            </p>
          </div>
          <div className="relative md:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('sauces.searchPlaceholder')}
              className="w-full rounded-full border border-ink-100 bg-cream-50 py-3 pl-11 pr-10 text-sm tracking-tight text-ink-900 placeholder:text-ink-300 focus:border-ink-900 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={t('sauces.clear')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-300 hover:bg-ink-100 hover:text-ink-900"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = category === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setCategory(opt.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium tracking-tight transition-colors ${
                  active
                    ? 'border-ink-900 bg-ink-900 text-cream-50'
                    : 'border-ink-100 bg-cream-50 text-ink-900 hover:border-ink-300'
                }`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                {opt.label}
                <span className={`text-xs ${active ? 'text-cream-100/70' : 'text-ink-300'}`}>
                  {counts[opt.id]}
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
            <p className="text-base text-ink-600">{t('sauces.emptyTitle')}</p>
            <button
              type="button"
              onClick={() => {
                setCategory('all');
                setQuery('');
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2 text-sm font-medium tracking-tight text-ink-900 hover:border-ink-900"
            >
              {t('sauces.resetFilters')}
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((s) => (
              <SauceCard key={s.id} sauce={s} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
