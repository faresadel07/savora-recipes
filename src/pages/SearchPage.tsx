import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ChevronDown, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchRecipes } from '../api';
import { MEALDB_AREAS, MEALDB_CATEGORIES } from '../lib/constants';
import { LOCAL_RECIPES } from '../data/local-recipes';
import { useTranslation } from '../i18n';
import { expandEnglishSynonyms, translateQuery } from '../lib/search-i18n';
import RecipeCard from '../components/RecipeCard';
import RecipeImage from '../components/RecipeImage';
import SmartSearchInput from '../components/SmartSearchInput';
import { RecipeGridSkeleton } from '../components/Skeleton';
import ErrorState from '../components/ErrorState';

const TRENDING = [
  { label: 'salmon', q: 'salmon' },
  { label: 'pasta', q: 'pasta' },
  { label: 'chicken', q: 'chicken' },
  { label: 'chocolate', q: 'chocolate' },
  { label: 'soup', q: 'soup' },
  { label: 'tacos', q: 'tacos' },
];

const QUICK_CUISINES = [
  { label: 'Italian', area: 'Italian' },
  { label: 'Japanese', area: 'Japanese' },
  { label: 'Mexican', area: 'Mexican' },
  { label: 'Moroccan', area: 'Moroccan' },
];

const PEEK_RECIPES = LOCAL_RECIPES.slice(0, 4);

const PAGE = 12;

export default function SearchPage() {
  const { t, language } = useTranslation();
  const [params, setParams] = useSearchParams();
  const [draftQuery, setDraftQuery] = useState(params.get('q') ?? '');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const query = params.get('q') ?? '';
  const category = params.get('category') ?? '';
  const area = params.get('area') ?? '';
  const page = Number(params.get('page') ?? '1');

  useEffect(() => {
    setDraftQuery(query);
  }, [query]);

  const filters = useMemo(
    () => ({
      // Translate Arabic to English and expand English synonyms at the API
      // boundary. So aubergine → aubergine + eggplant, فلافل → falafel.
      query: query ? expandEnglishSynonyms(translateQuery(query)) : undefined,
      category: category || undefined,
      area: area || undefined,
      offset: (page - 1) * PAGE,
      number: PAGE,
    }),
    [query, category, area, page],
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['search', filters],
    queryFn: () => searchRecipes(filters),
    placeholderData: keepPreviousData,
  });

  function update(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value && value.trim()) next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setParams(next);
  }

  function clearAll() {
    setParams(new URLSearchParams());
    setDraftQuery('');
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE)) : 0;
  const hasFilters = Boolean(query || category || area);

  return (
    <div>
      <section className="border-b border-ink-100 bg-cream-100/50 py-10 md:py-16">
        <div className="container-wide">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="eyebrow mb-3">{t('search.eyebrow')}</p>
              <h1 className="text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-tighter">
                {t('search.title1')}
                <span className="text-terracotta-500"> {t('search.title2')}</span>
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-600 sm:text-[17px]">
                {t('search.body')}
              </p>

              <div className="mt-7">
                <SmartSearchInput
                  value={draftQuery}
                  onChange={setDraftQuery}
                  onSubmit={(translated) => update('q', translated)}
                  placeholder={t('common.searchPlaceholder')}
                  variant="large"
                />
              </div>

              <div className="mt-7 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-ink-400">{t('search.trending')}</span>
                  {TRENDING.map((t) => (
                    <button
                      key={t.q}
                      type="button"
                      onClick={() => {
                        setDraftQuery(t.label);
                        update('q', t.q);
                      }}
                      className="rounded-full bg-cream-50 px-3 py-1.5 text-[12px] font-medium tracking-tight text-ink-700 transition-colors hover:bg-ink-900 hover:text-cream-50"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-ink-400">{t('search.cuisines')}</span>
                  {QUICK_CUISINES.map((c) => (
                    <button
                      key={c.area}
                      type="button"
                      onClick={() => update('area', c.area)}
                      className="rounded-full border border-ink-100 bg-cream-50 px-3 py-1.5 text-[12px] font-medium tracking-tight text-ink-700 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-cream-50"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {PEEK_RECIPES.map((r, i) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const lr = r as any;
                  const peekTitle = language === 'ar' ? (lr.titleAr || r.title) : r.title;
                  const peekCategory = language === 'ar' ? (lr.categoryAr || r.category) : r.category;
                  return (
                    <Link
                      key={r.id}
                      to={`/recipe/${r.id}`}
                      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:-translate-y-1"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <RecipeImage
                        src={r.image}
                        alt={peekTitle}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3.5">
                        <p className="text-[10px] uppercase tracking-widest text-cream-100/75">
                          {peekCategory}
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-tight tracking-tight text-cream-50">
                          {peekTitle}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide py-10 md:py-14">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-ink-900 px-4 py-2 text-[13px] font-medium tracking-tight hover:bg-ink-900 hover:text-cream-50"
          >
            <Filter className="h-3.5 w-3.5" />
            {t('common.filters')}
            {hasFilters && (
              <span className="rounded-full bg-terracotta-500 px-1.5 py-0.5 text-[10px] font-semibold text-cream-50">
                ON
              </span>
            )}
          </button>

          <p className="text-xs tracking-tight text-ink-400">
            {data ? t('search.n_recipes', { n: data.total.toLocaleString() }) : '·'}
          </p>
        </div>

        {filtersOpen && (
          <div className="mb-10 rounded-2xl border border-ink-100 bg-cream-50 p-6 md:p-7 animate-fade-in">
            <div className="grid gap-5 md:grid-cols-2">
              <FilterSelect label={t('common.category')} value={category} options={MEALDB_CATEGORIES} onChange={(v) => update('category', v)} anyLabel={t('common.any')} />
              <FilterSelect label={t('common.cuisine')} value={area} options={MEALDB_AREAS} onChange={(v) => update('area', v)} anyLabel={t('common.any')} />
            </div>
            {hasFilters && (
              <button type="button" onClick={clearAll} className="mt-5 text-xs tracking-tight text-terracotta-500 hover:underline">
                {t('common.clearAllFilters')}
              </button>
            )}
          </div>
        )}

        {hasFilters && !filtersOpen && (
          <div className="mb-8 flex flex-wrap gap-2">
            {[
              query && { k: 'q', label: `"${query}"` },
              category && { k: 'category', label: category },
              area && { k: 'area', label: area },
            ]
              .filter((x): x is { k: string; label: string } => Boolean(x))
              .map((chip) => (
                <button
                  key={chip.k}
                  type="button"
                  onClick={() => update(chip.k, null)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3 py-1 text-xs tracking-tight text-cream-50 hover:bg-terracotta-500"
                >
                  {chip.label}
                  <X className="h-3 w-3" />
                </button>
              ))}
          </div>
        )}

        {isLoading && <RecipeGridSkeleton count={12} />}
        {isError && <ErrorState error={error} onRetry={() => refetch()} />}
        {data && data.results.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{t('search.nothingFound')}</h3>
            <p className="mt-2.5 text-sm tracking-tight text-ink-400">{t('search.nothingFoundBody')}</p>
            <button type="button" onClick={clearAll} className="btn-outline mt-7">
              {t('common.reset')}
            </button>
          </div>
        )}
        {data && data.results.length > 0 && (
          <div className={`grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-14 xl:grid-cols-4 ${isFetching ? 'opacity-60' : ''} transition-opacity`}>
            {data.results.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} index={i} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => update('page', String(Math.max(1, page - 1)))}
              disabled={page <= 1}
              className="rounded-full border border-ink-100 px-4 py-2 text-[13px] tracking-tight disabled:opacity-30 enabled:hover:border-ink-900"
            >
              ← {t('common.prev')}
            </button>
            <span className="px-4 text-[13px] tracking-tight text-ink-600">
              {t('common.page')} {page} {t('common.of')} {totalPages}
            </span>
            <button
              type="button"
              onClick={() => update('page', String(Math.min(totalPages, page + 1)))}
              disabled={page >= totalPages}
              className="rounded-full border border-ink-100 px-4 py-2 text-[13px] tracking-tight disabled:opacity-30 enabled:hover:border-ink-900"
            >
              {t('common.next')} →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  anyLabel: string;
}

function FilterSelect({ label, value, options, onChange, anyLabel }: FilterSelectProps) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-full border border-ink-100 bg-cream-50 py-2.5 pl-4 pr-9 text-[13px] tracking-tight focus:border-ink-900 focus:outline-none"
        >
          <option value="">{anyLabel}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
      </div>
    </div>
  );
}
