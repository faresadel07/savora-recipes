import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChefHat, Sparkles } from 'lucide-react';
import { searchRecipes } from '../api';
import { HOME_CATEGORIES } from '../lib/constants';
import { useTranslation } from '../i18n';
import RecipeCard from '../components/RecipeCard';
import RecipeImage from '../components/RecipeImage';
import { RecipeGridSkeleton } from '../components/Skeleton';
import ErrorState from '../components/ErrorState';

const LABELS_AR: Record<string, string> = {
  breakfast: 'الفطور',
  chicken: 'الدجاج',
  pasta: 'الباستا',
  seafood: 'المأكولات البحرية',
  vegetarian: 'النباتي',
  dessert: 'الحلويات',
};

const DESCRIPTIONS_AR: Record<string, string> = {
  breakfast: 'صباحات هادئة، أطباق مشمسة.',
  chicken: 'المفضل لأيام الأسبوع، من كل مطبخ.',
  pasta: 'شكل الراحة.',
  seafood: 'طازج من الساحل.',
  vegetarian: 'نباتي، ليس عادياً.',
  dessert: 'نهاية صغيرة حلوة.',
};

export default function CategoryPage() {
  const { t, language } = useTranslation();
  const { slug = '' } = useParams<{ slug: string }>();
  const category = HOME_CATEGORIES.find((c) => c.slug === slug);
  const apiCategory = category?.category ?? slug.replace('-', ' ');
  const label = language === 'ar' && LABELS_AR[slug]
    ? LABELS_AR[slug]
    : category?.label ?? slug.replace('-', ' ');
  const description = language === 'ar' && DESCRIPTIONS_AR[slug]
    ? DESCRIPTIONS_AR[slug]
    : category?.description;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['category', apiCategory],
    queryFn: () => searchRecipes({ category: apiCategory, number: 60 }),
    placeholderData: keepPreviousData,
  });

  const previewRecipes = data?.results.slice(0, 4) ?? [];

  return (
    <div>
      <section className="relative overflow-hidden bg-ink-900 py-12 text-cream-50 md:py-20">
        <div className="container-wide relative z-10">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Link to="/" className="link-underline text-[13px] tracking-tight text-cream-100/70">
                <ArrowLeft className="rtl-flip mr-1 inline h-3.5 w-3.5" /> {t('common.home')}
              </Link>
              <p className="eyebrow mt-7 inline-flex items-center gap-2 text-cream-100/60">
                <ChefHat className="h-3 w-3" /> {t('category.eyebrow')}
              </p>
              <h1 className="mt-2.5 text-[clamp(2.5rem,6vw,5rem)] font-bold capitalize leading-[0.98] tracking-tighter">
                {label}<span className="text-terracotta-400">.</span>
              </h1>
              {description && (
                <p className="mt-5 max-w-md text-base tracking-tight text-cream-100/75 sm:text-lg">
                  {description}
                </p>
              )}

              {data && (
                <div className="mt-7 grid max-w-md grid-cols-3 gap-3">
                  <DarkStat top={String(data.total)} bottom={t('common.recipes')} />
                  <DarkStat top={String(previewRecipes.filter((r) => r.area).length || data.total)} bottom={t('common.cuisines')} />
                  <DarkStat top="∞" bottom={t('category.free')} />
                </div>
              )}

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-cream-50/20 bg-cream-50/5 px-4 py-2 text-[12px] tracking-tight text-cream-100/80 backdrop-blur-sm">
                <Sparkles className="h-3 w-3" />
                {t('category.sortedByPopularity')}
              </div>
            </div>

            {/* Right-side preview mosaic */}
            <div className="md:col-span-5">
              {previewRecipes.length === 0 && isLoading && (
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-square animate-pulse rounded-2xl bg-cream-50/10" />
                  ))}
                </div>
              )}
              {previewRecipes.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {previewRecipes.map((r) => (
                    <Link
                      key={r.id}
                      to={`/recipe/${r.id}`}
                      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink-800 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-1"
                    >
                      <RecipeImage src={r.image} alt={r.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/15 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3.5">
                        <p className="text-[10px] uppercase tracking-widest text-cream-100/75">{r.area || r.category}</p>
                        <p className="mt-1 text-sm font-semibold leading-tight tracking-tight text-cream-50">
                          {r.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-terracotta-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
      </section>

      <section className="container-wide py-12 md:py-20">
        {isLoading && <RecipeGridSkeleton count={12} />}
        {isError && <ErrorState error={error} onRetry={() => refetch()} />}
        {data && (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-14 xl:grid-cols-4">
            {data.results.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function DarkStat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-2xl border border-cream-50/15 bg-cream-50/5 p-3 text-center backdrop-blur-sm">
      <p className="text-xl font-bold tracking-tighter text-cream-50 md:text-2xl">{top}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-cream-100/60">{bottom}</p>
    </div>
  );
}
