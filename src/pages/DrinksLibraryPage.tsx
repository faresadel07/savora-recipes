import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import {
  ArrowUpRight,
  Coffee,
  GlassWater,
  MapPin,
  Play,
  Search,
  Snowflake,
  Sparkles,
  Sun,
  Utensils,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  DRINK_CATEGORIES,
  DRINKS,
  FEATURED_DRINKS,
  type Drink,
  type DrinkCategory,
  type DrinkTemp,
} from '../data/drinks-library';

type CategoryFilter = 'all' | DrinkCategory;
type TempFilter = 'all' | DrinkTemp;

function useCategoryFilters() {
  const { t } = useTranslation();
  const list: { id: CategoryFilter; name: string }[] = [
    { id: 'all', name: t('drinksPage.allCategories') },
    ...DRINK_CATEGORIES.map((c) => ({ id: c.id as CategoryFilter, name: c.name })),
  ];
  return list;
}

function useTempFilters() {
  const { t } = useTranslation();
  const list: { id: TempFilter; name: string; icon: LucideIcon }[] = [
    { id: 'all', name: t('drinksPage.tempAll'), icon: GlassWater },
    { id: 'hot', name: t('drinksPage.tempHot'), icon: Sun },
    { id: 'cold', name: t('drinksPage.tempCold'), icon: Snowflake },
  ];
  return list;
}

function useHeroStats() {
  const { t } = useTranslation();
  return [
    { value: `${DRINKS.length}`, label: t('drinksPage.statDrinks') },
    { value: `${DRINKS.filter((d) => d.temp === 'hot').length}`, label: t('drinksPage.statHot') },
    { value: `${DRINKS.filter((d) => d.temp === 'cold').length}`, label: t('drinksPage.statCold') },
    { value: `${DRINK_CATEGORIES.length}`, label: t('drinksPage.statCategories') },
  ];
}

function YoutubeLite({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className="group absolute inset-0 flex items-center justify-center overflow-hidden bg-ink-900"
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        onLoad={(e) => {
          const t = e.currentTarget;
          if (t.naturalWidth > 120) return;
          if (t.src.includes('maxresdefault')) {
            t.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
          } else if (t.src.includes('sddefault')) {
            t.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }
        }}
        onError={(e) => {
          const t = e.currentTarget;
          if (t.src.includes('maxresdefault')) {
            t.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
          } else if (t.src.includes('sddefault')) {
            t.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }
        }}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-ink-900/10" />
      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-cream-50/95 text-ink-900 shadow-2xl transition-transform group-hover:scale-110 md:h-20 md:w-20">
        <Play className="h-7 w-7 translate-x-0.5 fill-current md:h-8 md:w-8" strokeWidth={1.5} />
      </span>
    </button>
  );
}

function TempPill({ temp }: { temp: DrinkTemp }) {
  const { t } = useTranslation();
  if (temp === 'hot') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-terracotta-500/15 px-2.5 py-1 text-[11px] font-medium tracking-tight text-terracotta-600">
        <Sun className="h-3 w-3" /> {t('drinksPage.tempHot')}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sage-50 px-2.5 py-1 text-[11px] font-medium tracking-tight text-sage-700">
      <Snowflake className="h-3 w-3" /> {t('drinksPage.tempCold')}
    </span>
  );
}

function DrinkCard({ drink }: { drink: Drink }) {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  const name = isAr && drink.nameAr ? drink.nameAr : drink.name;
  const sub = isAr ? drink.name : drink.nameAr;
  const origin = isAr && drink.originAr ? drink.originAr : drink.origin;
  const story = isAr && drink.storyAr ? drink.storyAr : drink.story;
  const ingredients = isAr && drink.ingredientsAr ? drink.ingredientsAr : drink.ingredients;
  const steps = isAr && drink.stepsAr ? drink.stepsAr : drink.steps;
  return (
    <article
      id={`drink-${drink.id}`}
      className="group flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
    >
      <div className="relative aspect-video bg-ink-900">
        <YoutubeLite videoId={drink.videoId} title={name} />
        <div className="absolute start-3 top-3">
          <TempPill temp={drink.temp} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="inline-flex items-center gap-1.5 text-xs tracking-tight text-ink-400">
          <MapPin className="h-3 w-3" />
          {origin}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight md:text-2xl">{name}</h3>
        {sub && (
          <p className="mt-1 text-base font-medium tracking-tight text-ink-500">{sub}</p>
        )}
        <p className="mt-4 text-sm leading-relaxed text-ink-600">{story}</p>

        <details className="group/details mt-5 border-t border-ink-100 pt-4">
          <summary className="cursor-pointer list-none text-[12px] font-semibold tracking-tight text-ink-900 hover:text-gold-600">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" /> {isAr ? 'الوصفة والطريقة' : 'Recipe and method'}
              <span className="text-ink-400 transition-transform group-open/details:rotate-90">›</span>
            </span>
          </summary>
          <div className="mt-4 grid gap-5 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-400">
                <Sparkles className="h-3 w-3" /> {isAr ? 'المكوّنات' : 'Ingredients'}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-700">
                {ingredients.map((ing) => (
                  <li key={ing} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold-500" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-7">
              <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-400">
                <Utensils className="h-3 w-3" /> {isAr ? 'الطريقة' : 'Method'}
              </p>
              <ol className="mt-3 space-y-3 text-sm leading-relaxed text-ink-700">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-ink-900 text-[11px] font-semibold text-cream-50">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </details>
      </div>
    </article>
  );
}

function DrinkHeroCard({ drink }: { drink: Drink }) {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  const heroName = isAr && drink.nameAr ? drink.nameAr : drink.name;
  const heroSub = isAr ? drink.name : drink.nameAr;
  const heroOrigin = isAr && drink.originAr ? drink.originAr : drink.origin;
  const heroStory = isAr && drink.storyAr ? drink.storyAr : drink.story;
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-ink-900 text-cream-50 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
      <div className="relative aspect-[16/9] md:aspect-[16/7]">
        <YoutubeLite videoId={drink.videoId} title={heroName} />
        <div className="absolute start-4 top-4">
          <TempPill temp={drink.temp} />
        </div>
      </div>
      <div className="p-6 md:p-8">
        <p className="inline-flex items-center gap-1.5 text-xs tracking-tight text-cream-100/70">
          <MapPin className="h-3 w-3" />
          {heroOrigin}
        </p>
        <h3 className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tighter">
          {heroName}
        </h3>
        {heroSub && (
          <p className="mt-1 text-lg font-medium tracking-tight text-gold-400">{heroSub}</p>
        )}
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cream-100/85 md:text-base">{heroStory}</p>
      </div>
    </article>
  );
}

export default function DrinksLibraryPage() {
  const { t } = useTranslation();
  const CATEGORY_FILTERS = useCategoryFilters();
  const TEMP_FILTERS = useTempFilters();
  const HERO_STATS = useHeroStats();
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [temp, setTemp] = useState<TempFilter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DRINKS.filter((d) => {
      if (category !== 'all' && d.category !== category) return false;
      if (temp !== 'all' && d.temp !== temp) return false;
      if (!q) return true;
      const haystack = [d.name, d.nameAr ?? '', d.origin, d.story, ...d.ingredients].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [category, temp, query]);

  const showCategoryGroups = category === 'all' && temp === 'all' && !query;
  const featured = FEATURED_DRINKS[0];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-cream-50 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container-wide relative z-10">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tighter text-ink-900">
                {t('drinksPage.title1')}
                <br />
                <span className="text-gold-600">
                  {t('drinksPage.title2', { n: DRINKS.length })}
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
                {t('drinksPage.body', { n: DRINKS.length })}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#library"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
                >
                  <Coffee className="h-3.5 w-3.5" />
                  {t('drinksPage.ctaOpenLibrary')}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setTemp('cold');
                    setCategory('all');
                    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
                >
                  <Snowflake className="h-3.5 w-3.5" />
                  {t('drinksPage.ctaColdFirst')}
                </button>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-4 gap-2">
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-ink-100 bg-cream-50 p-3 text-center">
                    <p className="text-xl font-bold tracking-tighter text-ink-900 md:text-2xl">{s.value}</p>
                    <p className="mt-1 text-xs tracking-tight text-ink-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {[FEATURED_DRINKS[0], DRINKS.find((d) => d.id === 'moroccan-mint-tea'), DRINKS.find((d) => d.id === 'vietnamese-iced-coffee'), DRINKS.find((d) => d.id === 'jallab')]
                  .filter((d): d is Drink => Boolean(d))
                  .map((d, i) => (
                    <a
                      key={d.id}
                      href={`#drink-${d.id}`}
                      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${d.videoId}/maxresdefault.jpg`}
                        onLoad={(e) => {
                          const t = e.currentTarget;
                          if (t.naturalWidth > 120) return;
                          if (t.src.includes('maxresdefault')) {
                            t.src = `https://img.youtube.com/vi/${d.videoId}/sddefault.jpg`;
                          } else if (t.src.includes('sddefault')) {
                            t.src = `https://img.youtube.com/vi/${d.videoId}/hqdefault.jpg`;
                          }
                        }}
                        onError={(e) => {
                          const t = e.currentTarget;
                          if (t.src.includes('maxresdefault')) {
                            t.src = `https://img.youtube.com/vi/${d.videoId}/sddefault.jpg`;
                          } else if (t.src.includes('sddefault')) {
                            t.src = `https://img.youtube.com/vi/${d.videoId}/hqdefault.jpg`;
                          }
                        }}
                        alt={d.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3.5">
                        <p className="text-[9px] font-medium tracking-tight text-gold-400">
                          {d.temp === 'hot' ? t('drinksPage.tempHot') : t('drinksPage.tempCold')} · {d.origin.split('.')[0]}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm font-semibold tracking-tight text-cream-50">{d.name}</p>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -end-32 -top-32 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -start-32 h-96 w-96 rounded-full bg-terracotta-500/15 blur-3xl" />
      </section>

      {/* ============ FEATURED DRINK ============ */}
      {featured && (
        <section className="border-t border-ink-100 py-12 md:py-16">
          <div className="container-wide">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
                {t('drinksPage.todaysPour')}
              </h2>
              <p className="text-sm tracking-tight text-ink-500">{t('drinksPage.todaysPourSub')}</p>
            </div>
            <DrinkHeroCard drink={featured} />
          </div>
        </section>
      )}

      {/* ============ LIBRARY ============ */}
      <section id="library" className="border-t border-ink-100 bg-cream-100/40 py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                {t('drinksPage.cellarTitle')}
              </h2>
              <p className="mt-2 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
                {t('drinksPage.cellarBody', { n: DRINKS.length, m: DRINK_CATEGORIES.length })}
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('drinksPage.searchPlaceholder')}
                className="w-full rounded-full border border-ink-200 bg-cream-50 py-3 ps-11 pe-10 text-sm tracking-tight text-ink-900 placeholder:text-ink-400 focus:border-ink-900 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute end-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-900"
                  aria-label={t('drinksPage.clearSearch')}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {TEMP_FILTERS.map((tf) => {
              const isActive = temp === tf.id;
              const Icon = tf.icon;
              return (
                <button
                  key={tf.id}
                  type="button"
                  onClick={() => setTemp(tf.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                    isActive
                      ? 'border-ink-900 bg-ink-900 text-cream-50'
                      : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tf.name}
                </button>
              );
            })}
          </div>

          <div className="mb-10 flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((c) => {
              const isActive = category === c.id;
              const count =
                c.id === 'all' ? DRINKS.length : DRINKS.filter((d) => d.category === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium tracking-tight transition-colors ${
                    isActive
                      ? 'border-gold-600 bg-gold-500/15 text-gold-700'
                      : 'border-ink-100 bg-cream-50 text-ink-500 hover:border-ink-900 hover:text-ink-900'
                  }`}
                >
                  {c.name}
                  <span className={`ms-2 text-[11px] ${isActive ? 'text-gold-600' : 'text-ink-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {showCategoryGroups ? (
            <div className="space-y-16 md:space-y-20">
              {DRINK_CATEGORIES.map((cat) => {
                const items = DRINKS.filter((d) => d.category === cat.id);
                if (items.length === 0) return null;
                return (
                  <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">
                    <div className="mb-6 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
                          {cat.name}
                        </h3>
                        <p className="mt-1 text-sm tracking-tight text-ink-500">{cat.tagline}</p>
                      </div>
                      <p className="text-sm tracking-tight text-ink-500">{t('drinksPage.nDrinks', { n: items.length })}</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {items.map((d) => (
                        <DrinkCard key={d.id} drink={d} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
              <p className="text-base text-ink-600">{t('drinksPage.emptyTitle')}</p>
              <button
                type="button"
                onClick={() => {
                  setCategory('all');
                  setTemp('all');
                  setQuery('');
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2 text-sm font-medium tracking-tight text-ink-900 hover:border-ink-900"
              >
                {t('drinksPage.resetFilters')}
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((d) => (
                <DrinkCard key={d.id} drink={d} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ MOCKTAIL CATALOG ============ */}
      <MocktailCatalog />

      {/* ============ CLOSING ============ */}
      <section className="container-wide pb-20 pt-16">
        <div className="overflow-hidden rounded-3xl bg-ink-900 px-7 py-14 text-center text-cream-50 md:px-16 md:py-20">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500/25 text-gold-400">
            <GlassWater className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mx-auto mt-6 max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">
            {t('drinksPage.closingTitle')}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-100/70 md:text-base">
            {t('drinksPage.closingBody')}
          </p>
          <Link
            to="/arab-cuisine"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-gold-400"
          >
            {t('drinksPage.closingCta')}
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// MocktailCatalog: surface the 40 non-alcoholic cocktails from
// TheCocktailDB cache as a grid below the curated editorial drinks.
// ============================================================

import cocktails from '../data/cocktaildb-cache.json';

interface CocktailEntry {
  id: string;
  title: string;
  image: string;
  category: string;
  calories: number;
}

function MocktailCatalog() {
  const { t } = useTranslation();
  const list = cocktails as CocktailEntry[];
  if (!list.length) return null;
  return (
    <section className="container-wide pt-20">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3 inline-flex items-center gap-2">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            {t('drinksPage.mocktailEyebrow')}
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
            {t('drinksPage.mocktailTitle')}
          </h2>
          <p className="mt-2 max-w-xl text-sm tracking-tight text-ink-500 md:text-base">
            {t('drinksPage.mocktailBody')}
          </p>
        </div>
        <p className="text-sm tracking-tight text-ink-500">{t('drinksPage.nMocktails', { n: list.length })}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <Link
            key={c.id}
            to={`/recipe/${c.id}`}
            className="group flex overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 transition-shadow hover:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.15)]"
          >
            <div className="relative aspect-square w-32 flex-shrink-0 overflow-hidden bg-cream-200 md:w-36">
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1 p-4">
              <p className="text-[10px] font-medium uppercase tracking-widest text-terracotta-500">
                {c.category}
              </p>
              <h3 className="text-base font-semibold leading-snug tracking-tight text-ink-900 group-hover:text-terracotta-500">
                {c.title}
              </h3>
              <p className="text-xs tracking-tight text-ink-500">{t('drinksPage.kcalPerServing', { n: c.calories })}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
