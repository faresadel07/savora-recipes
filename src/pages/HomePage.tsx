import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, ChefHat, Film, GlassWater, Globe2, GraduationCap, Heart, MapPin, PlayCircle, Sparkles, Star, Timer, Utensils } from 'lucide-react';
import { getRandomRecipe, getRandomRecipes, searchRecipes } from '../api';
import { FAMOUS_DISHES, PALESTINIAN_DISHES } from '../data/arab-cuisine';
import { FOOD_FILMS, FEATURED_FILMS } from '../data/food-films';
import { COOKING_SKILLS, LEARNING_PATHS } from '../data/skills-academy';
import { WORLD_MARKETS, FEATURED_MARKETS } from '../data/world-markets';
import { CHEFS, FEATURED_CHEFS } from '../data/chef-hall';
import { DRINKS, FEATURED_DRINKS } from '../data/drinks-library';
import { HOME_CATEGORIES, WORLD_CUISINES } from '../lib/constants';
import { useCollections } from '../hooks/useCollections';
import { useTranslation } from '../i18n';
import { CUISINE_AR } from '../i18n/data-translations';
import RecipeCard from '../components/RecipeCard';
import RecipeImage from '../components/RecipeImage';
import { RecipeGridSkeleton } from '../components/Skeleton';
import ErrorState from '../components/ErrorState';

const CATEGORY_DESCRIPTIONS_AR: Record<string, string> = {
  breakfast: 'صباحات هادئة، أطباق مشمسة.',
  chicken: 'المفضل لأيام الأسبوع، من كل مطبخ.',
  pasta: 'شكل الراحة.',
  seafood: 'طازج من الساحل.',
  vegetarian: 'نباتي، ليس عادياً.',
  dessert: 'نهاية صغيرة حلوة.',
};

const CATEGORY_LABELS_AR: Record<string, string> = {
  breakfast: 'الفطور',
  chicken: 'الدجاج',
  pasta: 'الباستا',
  seafood: 'المأكولات البحرية',
  vegetarian: 'النباتي',
  dessert: 'الحلويات',
};

const COLLECTION_LABELS_AR: Record<string, { title: string; blurb: string }> = {
  'pasta-night': { title: 'ليلة الباستا', blurb: 'ملفوفة، مقلبة، مخبوزة. علاج لليوم الطويل.' },
  'seafood': { title: 'من البحر', blurb: 'خفيف، مشرق، وجاهز لكأس نبيذ أبيض.' },
  'weekend-baking': { title: 'خبيز نهاية الأسبوع', blurb: 'الصباحات البطيئة تستحق حلاوة طازجة.' },
};

export default function HomePage() {
  const { t, language } = useTranslation();
  const hero = useQuery({
    queryKey: ['random-hero'],
    queryFn: () => getRandomRecipe(),
  });

  const homepageStats = [
    { value: '700+', label: t('home.statRecipes') },
    { value: '24', label: t('home.statCuisines') },
    { value: '100%', label: t('common.freeAlways') },
    { value: '0', label: t('home.statSignUp') },
  ];

  const bento = useQuery({
    queryKey: ['bento'],
    queryFn: () => getRandomRecipes(5),
  });

  const popular = useQuery({
    queryKey: ['search', 'popular'],
    queryFn: () => searchRecipes({ category: 'Chicken', number: 6 }),
  });

  const collections = useCollections();

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative">
        <div className="container-wide pt-5 md:pt-8">
          <div className="grid items-stretch gap-6 md:grid-cols-12 md:gap-8">
            <div className="flex flex-col justify-between md:col-span-5">
              <div>
                <p className="eyebrow mb-5 inline-flex items-center gap-2">
                  <Sparkles className="h-3 w-3" strokeWidth={2} />
                  {t('home.eyebrowTodaysPick')}
                </p>
                <h1 className="text-[clamp(2.5rem,6vw,5.25rem)] font-bold leading-[0.98] tracking-tighter">
                  {t('home.heroTitle1')}
                  <span className="text-terracotta-500"> {t('home.heroBeautifully')}</span>
                  <br />
                  {t('home.heroEatSlowly')}
                </h1>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink-600 sm:text-[17px]">
                  {t('home.heroBody')}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/recipes" className="btn-primary">
                    {t('home.exploreRecipes')}
                    <ArrowUpRight className="h-4 w-4 rtl-flip" />
                  </Link>
                  <Link to="/category/chicken" className="btn-outline">
                    {t('home.browseChicken')}
                  </Link>
                </div>
              </div>

              <div className="mt-8 hidden border-t border-ink-100 pt-6 lg:block">
                <p className="eyebrow mb-4">{t('home.alsoOnTheMenu')}</p>
                <div className="space-y-3">
                  {bento.data?.slice(0, 2).map((r) => (
                    <Link key={r.id} to={`/recipe/${r.id}`} className="group flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-none overflow-hidden rounded-lg bg-cream-200">
                        <RecipeImage src={r.image} alt={r.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium tracking-tight transition-colors group-hover:text-terracotta-500">
                          {r.title}
                        </p>
                        <p className="text-[11px] uppercase tracking-widest text-ink-400">
                          {r.area || r.category}
                        </p>
                      </div>
                      <ArrowUpRight className="rtl-flip h-3.5 w-3.5 flex-none text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-terracotta-500" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              {hero.isLoading && <div className="aspect-[4/5] animate-pulse rounded-2xl bg-cream-200 md:aspect-[5/4]" />}
              {hero.data && (
                <Link to={`/recipe/${hero.data.id}`} className="group relative block h-full overflow-hidden rounded-2xl">
                  <div className="relative h-full min-h-[420px] md:min-h-[540px]">
                    <RecipeImage src={hero.data.image} alt={hero.data.title} eager className="absolute inset-0 h-full w-full object-cover animate-slow-zoom" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/15 to-transparent" />
                  {hero.data.youtube && (
                    <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-cream-50/90 px-3 py-1.5 text-[11px] font-medium tracking-tight text-ink-900 backdrop-blur-md">
                      <PlayCircle className="h-3.5 w-3.5" />
                      {language === 'ar' ? 'وصفة بالفيديو' : 'Video recipe'}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <p className="eyebrow mb-2 text-cream-100/80">
                      {t('home.featuredToday')} · {hero.data.area || hero.data.category}
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tighter text-cream-50 md:text-3xl lg:text-4xl">
                      {hero.data.title}
                    </h2>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs tracking-tight text-cream-100/80">
                      {hero.data.category && (
                        <>
                          <span className="inline-flex items-center gap-1.5">
                            <Utensils className="h-3 w-3" />
                            {hero.data.category}
                          </span>
                          <span className="h-0.5 w-0.5 rounded-full bg-cream-100/60" />
                        </>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <Timer className="h-3 w-3" />
                        {t('home.stepCount', { n: hero.data.steps?.length ?? 0 })}
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mt-14 md:mt-20">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-y-8 border-y border-ink-100 py-10 md:grid-cols-4">
            {homepageStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold tracking-tighter text-ink-900 md:text-4xl">{s.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-widest text-ink-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE ZAYTOUN - showcase the major sections */}
      <SectionsShowcase language={language} />

      {/* RECIPE OF THE DAY */}
      <RecipeOfTheDay language={language} />

      {/* FEATURED LEARNING PATH + EDITOR'S PICK FILM */}
      <FeaturedTrio language={language} />

      {/* BENTO */}
      <section className="mt-20 md:mt-28">
        <div className="container-wide">
          <SectionHead eyebrow={t('home.featuredEyebrow')} title={t('home.featuredTitle')} link={{ to: '/recipes', label: t('common.seeAll') }} />

          {bento.isLoading && (
            <div
              className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
              style={{ gridAutoRows: '260px' }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`animate-pulse rounded-2xl bg-cream-200 ${
                    i === 0 ? 'col-span-2 md:row-span-2' : ''
                  }`}
                />
              ))}
            </div>
          )}
          {bento.isError && <ErrorState error={bento.error} onRetry={() => bento.refetch()} />}
          {bento.data && (
            <div
              className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
              style={{ gridAutoRows: '260px' }}
            >
              {bento.data.slice(0, 5).map((r, i) => (
                <BentoTile key={r.id} recipe={r} large={i === 0} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mt-24 md:mt-32">
        <div className="container-wide">
          <SectionHead eyebrow={t('home.categoriesEyebrow')} title={t('home.categoriesTitle')} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {HOME_CATEGORIES.map((cat, i) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-cream-100 p-5 transition-all duration-500 hover:bg-ink-900 hover:text-cream-50 md:p-6"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className={`mb-10 h-2 w-2 rounded-full ${
                  cat.accent === 'terracotta' ? 'bg-terracotta-500'
                  : cat.accent === 'sage' ? 'bg-sage-500'
                  : cat.accent === 'gold' ? 'bg-gold-500'
                  : 'bg-ink-900 group-hover:bg-terracotta-500'
                }`} />
                <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                  {language === 'ar' ? (CATEGORY_LABELS_AR[cat.slug] ?? cat.label) : cat.label}
                </h3>
                <p className="mt-1 text-xs leading-snug opacity-60">
                  {language === 'ar' ? (CATEGORY_DESCRIPTIONS_AR[cat.slug] ?? cat.description) : cat.description}
                </p>
                <ArrowUpRight className="rtl-flip absolute right-4 top-4 h-3.5 w-3.5 -translate-y-0.5 translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="mt-24 md:mt-32">
        <div className="container-wide">
          <SectionHead eyebrow={t('home.collectionsEyebrow')} title={t('home.collectionsTitle')} />
          {collections.isLoading && (
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] rounded-2xl bg-cream-200" />
                  <div className="mt-5 h-6 w-3/4 rounded bg-cream-200" />
                </div>
              ))}
            </div>
          )}
          {collections.data && (
            <div className="grid gap-6 md:grid-cols-3">
              {collections.data.map((c, ci) => {
                const accent = c.collection.accent;
                const bg = accent === 'terracotta' ? 'bg-terracotta-500' : accent === 'sage' ? 'bg-sage-500' : accent === 'gold' ? 'bg-gold-500' : 'bg-ink-900';
                const filters = c.collection.filters;
                const linkParams = new URLSearchParams();
                if (filters.category) linkParams.set('category', filters.category);
                if (filters.area) linkParams.set('area', filters.area);
                if (filters.query) linkParams.set('q', filters.query);
                return (
                  <Link
                    key={c.collection.slug}
                    to={`/recipes?${linkParams.toString()}`}
                    className="group relative overflow-hidden rounded-2xl bg-ink-900 text-cream-50"
                    style={{ animationDelay: `${ci * 80}ms` }}
                  >
                    <div className="relative aspect-[4/5]">
                      {c.recipes[0] && (
                        <RecipeImage src={c.recipes[0].image} alt={c.collection.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className={`inline-flex items-center gap-1.5 rounded-full ${bg} px-2.5 py-1 text-[10px] uppercase tracking-widest`}>{t('home.collection')}</span>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tighter md:text-3xl">
                        {language === 'ar' ? (COLLECTION_LABELS_AR[c.collection.slug]?.title ?? c.collection.title) : c.collection.title}
                      </h3>
                      <p className="mt-2 text-sm text-cream-100/80">
                        {language === 'ar' ? (COLLECTION_LABELS_AR[c.collection.slug]?.blurb ?? c.collection.blurb) : c.collection.blurb}
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-[13px] font-medium tracking-tight">
                        <span>{t('home.viewRecipes', { n: c.recipes.length })}</span>
                        <ArrowUpRight className="rtl-flip h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CUISINES */}
      <section className="mt-24 md:mt-32">
        <div className="container-wide">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3 inline-flex items-center gap-2">
                <Globe2 className="h-3 w-3" strokeWidth={2} /> {t('home.cuisinesEyebrow')}
              </p>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                {t('home.cuisinesTitle1')}
                <span className="text-terracotta-500"> {t('home.cuisinesTitle2')}</span>
              </h2>
              <p className="mt-3 max-w-md text-sm text-ink-400 sm:text-base">
                {t('home.cuisinesBody')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:gap-3 lg:grid-cols-6">
            {WORLD_CUISINES.map((c, i) => (
              <Link
                key={c.key}
                to={`/recipes?area=${encodeURIComponent(c.area)}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-xl p-4 transition-all duration-500 hover:-translate-y-0.5 ${
                  c.tone === 'dark' ? 'bg-ink-900 text-cream-50 hover:bg-terracotta-500'
                  : c.tone === 'warm' ? 'bg-terracotta-50 text-ink-900 hover:bg-terracotta-500 hover:text-cream-50'
                  : c.tone === 'green' ? 'bg-sage-50 text-ink-900 hover:bg-sage-500 hover:text-cream-50'
                  : 'bg-cream-100 text-ink-900 hover:bg-gold-500 hover:text-cream-50'
                }`}
                style={{ animationDelay: `${i * 20}ms` }}
              >
                <p className="text-[10px] uppercase tracking-widest opacity-60">
                  {language === 'ar' ? (CUISINE_AR[c.key]?.region ?? c.region) : c.region}
                </p>
                <div className="mt-6 flex items-end justify-between">
                  <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                    {language === 'ar' ? (CUISINE_AR[c.key]?.label ?? c.label) : c.label}
                  </h3>
                  <ArrowUpRight className="rtl-flip h-3.5 w-3.5 -translate-y-0.5 translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="mt-24 md:mt-32">
        <div className="container-wide">
          <SectionHead eyebrow={t('home.popularEyebrow')} title={t('home.popularTitle')} />
          {popular.isLoading && <RecipeGridSkeleton count={6} />}
          {popular.isError && <ErrorState error={popular.error} onRetry={() => popular.refetch()} />}
          {popular.data && (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:gap-y-14">
              {popular.data.results.slice(0, 6).map((r, i) => (
                <RecipeCard key={r.id} recipe={r} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* DONATE */}
      <section className="mt-24 md:mt-32">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-terracotta-500 via-terracotta-600 to-ink-900 px-7 py-14 text-cream-50 md:px-14 md:py-20">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="eyebrow mb-4 inline-flex items-center gap-2 text-cream-100/80">
                  <Heart className="h-3 w-3" fill="currentColor" /> {t('home.donateEyebrow')}
                </p>
                <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-tight tracking-tighter">
                  {t('home.donateTitle1')}
                  <br />
                  {t('home.donateTitle2')}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-cream-100/85 sm:text-base">
                  {t('home.donateBody')}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <Heart className="h-4 w-4" />
                    {t('home.donateNow')}
                  </Link>
                  <Link to="/donate" className="inline-flex items-center gap-2 rounded-full border border-cream-50/40 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-all hover:bg-cream-50/10">
                    {t('home.learnMore')}
                    <ArrowUpRight className="rtl-flip h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <DonateStat top="$3" bottom={t('home.buysACoffee')} />
                <DonateStat top="$10" bottom={t('home.oneMonthHosting')} />
                <DonateStat top="$25" bottom={t('home.weekendOfDev')} />
                <DonateStat top="∞" bottom={t('home.recipesStayFree')} />
              </div>
            </div>

            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cream-50/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cream-50/10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 md:mt-32">
        <div className="container-wide">
          <div className="overflow-hidden rounded-3xl bg-ink-900 px-7 py-14 text-center text-cream-50 md:px-16 md:py-20">
            <p className="eyebrow mb-4 text-cream-100/60">{t('home.ctaEyebrow')}</p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-tight tracking-tighter">
              {t('home.ctaTitle1')}
              <span className="text-terracotta-400"> {t('home.ctaTitle2')}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm text-cream-100/70 sm:text-base">
              {t('home.ctaBody')}
            </p>
            <Link to="/recipes" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink-900 transition-all hover:bg-terracotta-500 hover:text-cream-50">
              {t('home.startExploring')}
              <ArrowUpRight className="rtl-flip h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ eyebrow, title, link }: { eyebrow: string; title: string; link?: { to: string; label: string } }) {
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="hidden text-[13px] font-medium tracking-tight link-underline sm:inline-block">
          {link.label} →
        </Link>
      )}
    </div>
  );
}

function BentoTile({ recipe, large, index }: { recipe: { id: string; title: string; image: string; area?: string; category?: string }; large?: boolean; index: number }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className={`group relative block h-full overflow-hidden rounded-2xl bg-cream-200 ${large ? 'col-span-2 md:row-span-2' : ''}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <RecipeImage src={recipe.image} alt={recipe.title} eager={index < 4} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-[1.06]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/15 to-transparent" />
      <div className={`absolute inset-x-0 bottom-0 ${large ? 'p-6 md:p-7' : 'p-4'}`}>
        {(recipe.area || recipe.category) && (
          <p className="mb-2 text-[10px] uppercase tracking-widest text-cream-100/70">
            {recipe.area || recipe.category}
          </p>
        )}
        <h3 className={`font-semibold leading-tight tracking-tighter text-cream-50 ${large ? 'text-2xl md:text-4xl' : 'text-sm md:text-base'}`}>
          {recipe.title}
        </h3>
      </div>
    </Link>
  );
}

function DonateStat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-2xl border border-cream-50/15 bg-cream-50/5 p-5 backdrop-blur-sm">
      <p className="text-2xl font-bold tracking-tighter text-cream-50 md:text-3xl">{top}</p>
      <p className="mt-1.5 text-xs tracking-tight text-cream-100/75">{bottom}</p>
    </div>
  );
}

// ============================================================
// SECTIONS SHOWCASE  five big cards leading to each major page
// ============================================================
const SHOWCASE_SECTIONS = [
  {
    to: '/arab-cuisine',
    titleEn: 'Arab Cuisine',
    titleAr: 'المطبخ العربي',
    blurbEn: '23 heritage recipes, embedded videos, full ingredients, methods, and a dedicated Palestinian kitchen.',
    blurbAr: '23 وصفة تراثية مع الفيديوهات والمكونات وقسم خاص للمطبخ الفلسطيني.',
    stat: () => `${FAMOUS_DISHES.length + PALESTINIAN_DISHES.length} recipes`,
    statAr: () => `${FAMOUS_DISHES.length + PALESTINIAN_DISHES.length} وصفة`,
    icon: Star,
    accent: 'sage' as const,
    imageVideoId: () => FAMOUS_DISHES[1]?.videoId,
  },
  {
    to: '/films',
    titleEn: 'Film Library',
    titleAr: 'مكتبة الأفلام',
    blurbEn: 'Curated documentaries from Netflix, National Geographic, PBS, UNESCO, and the best independent food channels.',
    blurbAr: 'أفلام وثائقية مختارة من Netflix و National Geographic و PBS و UNESCO وأفضل قنوات الطعام المستقلة.',
    stat: () => `${FOOD_FILMS.length} films`,
    statAr: () => `${FOOD_FILMS.length} فيلم`,
    icon: Film,
    accent: 'gold' as const,
    imageVideoId: () => FEATURED_FILMS[0]?.videoId,
  },
  {
    to: '/academy',
    titleEn: 'Skills Academy',
    titleAr: 'أكاديمية المهارات',
    blurbEn: '40 masterclass lessons in six learning paths. Jacques Pépin, Kenji, Epicurious. Your progress saves on this device.',
    blurbAr: '40 درساً تقنياً في ستة مسارات تعلّم. باسبين، كنجي، إبيكيوريوس. تقدّمك محفوظ على جهازك.',
    stat: () => `${COOKING_SKILLS.length} lessons · ${LEARNING_PATHS.length} paths`,
    statAr: () => `${COOKING_SKILLS.length} درساً · ${LEARNING_PATHS.length} مسار`,
    icon: GraduationCap,
    accent: 'terracotta' as const,
    imageVideoId: () => COOKING_SKILLS.find((s) => s.featured)?.videoId,
  },
  {
    to: '/markets',
    titleEn: 'World Markets',
    titleAr: 'أسواق العالم',
    blurbEn: 'A travelogue of 26 famous food markets, from Khan El-Khalili to Borough Market, each with a video tour and history.',
    blurbAr: 'رحلة في 26 سوقاً شهيراً للطعام، من خان الخليلي إلى بورو ماركت، مع جولة فيديو لكل سوق.',
    stat: () => `${WORLD_MARKETS.length} markets`,
    statAr: () => `${WORLD_MARKETS.length} سوقاً`,
    icon: MapPin,
    accent: 'gold' as const,
    imageVideoId: () => FEATURED_MARKETS[0]?.videoId,
  },
  {
    to: '/chefs',
    titleEn: 'Chef Hall',
    titleAr: 'قاعة الشيفات',
    blurbEn: 'Portraits of the people behind the plate. Ottolenghi to Pépin, Bottura to Bayless. A philosophy, a bio, a video for each.',
    blurbAr: 'صور الشخصيات اللي وراء الطبق. أوتولينغي وباسبين وبوتورا وغيرهم. فلسفة وسيرة وفيديو لكل شيف.',
    stat: () => `${CHEFS.length} chefs`,
    statAr: () => `${CHEFS.length} شيفاً`,
    icon: ChefHat,
    accent: 'sage' as const,
    imageVideoId: () => FEATURED_CHEFS[0]?.videoId,
  },
  {
    to: '/drinks',
    titleEn: 'Drinks Library',
    titleAr: 'مكتبة المشروبات',
    blurbEn: 'Hot and cold drinks from around the world. Arabic coffee, Vietnamese ca phe, Moroccan mint tea, jallab, karkadeh, and many more.',
    blurbAr: 'مشروبات ساخنة وباردة من كل العالم. قهوة عربية، فيتنامية، شاي بالنعنع مغربي، جلاب، كركديه، وأكثر.',
    stat: () => `${DRINKS.length} drinks`,
    statAr: () => `${DRINKS.length} مشروب`,
    icon: GlassWater,
    accent: 'gold' as const,
    imageVideoId: () => FEATURED_DRINKS[0]?.videoId,
  },
  {
    to: '/library',
    titleEn: 'Cookbook Library',
    titleAr: 'مكتبة الكتب',
    blurbEn: 'Public-domain cookbooks hosted on Internet Archive. Read inside the site, full pages, no downloads required.',
    blurbAr: 'كتب طبخ بالمجال العام مستضافة على Internet Archive. اقرأها داخل الموقع، صفحات كاملة، بدون تحميل.',
    stat: () => 'Read in place',
    statAr: () => 'اقرأ مباشرة',
    icon: BookOpen,
    accent: 'terracotta' as const,
    imageVideoId: () => undefined,
    imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=1200&h=900&fit=crop&q=80',
  },
];

function ShowcaseImage({ videoId, imageUrl }: { videoId?: string; imageUrl?: string }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
    );
  }
  if (!videoId) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cream-200 to-cream-300">
        <BookOpen className="h-16 w-16 text-ink-300" strokeWidth={1.5} />
      </div>
    );
  }
  return (
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
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
    />
  );
}

function SectionsShowcase({ language }: { language: string }) {
  const accentBar = {
    sage: 'bg-sage-500',
    gold: 'bg-gold-500',
    terracotta: 'bg-terracotta-500',
  };
  return (
    <section className="mt-20 md:mt-28">
      <div className="container-wide">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
            {language === 'ar' ? 'استكشف زيتون.' : 'Explore Zaytoun.'}
          </h2>
          <p className="mt-3 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
            {language === 'ar'
              ? 'ستّ مكتبات منتقاة بعناية. اختر من وين بدّك تبدأ.'
              : 'Six curated libraries. Pick where you want to begin.'}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SHOWCASE_SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
              >
                <div className={`absolute inset-x-0 top-0 h-1 ${accentBar[s.accent]}`} />
                <div className="relative aspect-video bg-cream-200">
                  <ShowcaseImage videoId={s.imageVideoId()} imageUrl={('imageUrl' in s ? s.imageUrl : undefined) as string | undefined} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
                  <div className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-cream-50/95 text-ink-900 backdrop-blur">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-xs font-medium tracking-tight text-gold-600">
                    {language === 'ar' ? s.statAr() : s.stat()}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                    {language === 'ar' ? s.titleAr : s.titleEn}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    {language === 'ar' ? s.blurbAr : s.blurbEn}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors group-hover:text-terracotta-500">
                    {language === 'ar' ? 'افتح' : 'Open'}
                    <ArrowUpRight className="rtl-flip h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// RECIPE OF THE DAY  rotates daily based on day of year
// ============================================================
function RecipeOfTheDay({ language }: { language: string }) {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const allDishes = [...FAMOUS_DISHES, ...PALESTINIAN_DISHES];
  const todays = allDishes[dayOfYear % allDishes.length];
  if (!todays) return null;

  return (
    <section className="mt-20 md:mt-28">
      <div className="container-wide">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
            {language === 'ar' ? 'وصفة اليوم.' : "Today's dish."}
          </h2>
          <Link
            to="/arab-cuisine"
            className="inline-flex items-center gap-1 text-sm font-medium tracking-tight text-ink-500 hover:text-ink-900"
          >
            {language === 'ar' ? 'كل الوصفات' : 'All dishes'}
            <ArrowUpRight className="rtl-flip h-3.5 w-3.5" />
          </Link>
        </div>

        <Link
          to={`/arab-cuisine#dish-${todays.id}`}
          className="group relative grid gap-6 overflow-hidden rounded-3xl bg-ink-900 text-cream-50 transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] md:grid-cols-2"
        >
          <div className="relative aspect-video bg-ink-800 md:aspect-auto">
            <ShowcaseImage videoId={todays.videoId} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-[11px] font-medium tracking-tight text-gold-400">
              {language === 'ar' ? 'وصفة اليوم' : 'Today'}
            </p>
            <h3 className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
              {todays.name}
            </h3>
            <p className="mt-1 text-xl font-medium tracking-tight text-gold-400">{todays.nameAr}</p>
            <p className="mt-4 text-sm leading-relaxed text-cream-100/80 md:text-base">{todays.story}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream-50 px-5 py-2.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors group-hover:bg-gold-400">
              {language === 'ar' ? 'افتح الوصفة' : 'Open the recipe'}
              <ArrowUpRight className="rtl-flip h-3.5 w-3.5" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED TRIO  Path + Film + Chef hero strip
// ============================================================
function FeaturedTrio({ language }: { language: string }) {
  const path = LEARNING_PATHS[0];
  const film = FEATURED_FILMS[0];
  const chef = FEATURED_CHEFS[0];
  if (!path || !film || !chef) return null;
  // Pull the first lesson's thumbnail to give the Path card a real image
  // instead of an empty top half.
  const firstLesson = COOKING_SKILLS.find((s) => s.id === path.skillIds[0]);

  return (
    <section className="mt-20 md:mt-28">
      <div className="container-wide">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
            {language === 'ar' ? 'مقترحات هذا الأسبوع.' : 'This week, three picks.'}
          </h2>
          <p className="mt-3 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
            {language === 'ar'
              ? 'مسار للتعلّم، فيلم للمشاهدة، شيف للقاء. خصوصاً لو ما عندك فكرة من وين تبدا.'
              : 'A path to learn, a film to watch, a chef to meet. Especially if you do not know where to begin.'}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Path card */}
          <Link
            to="/academy#paths"
            className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
          >
            <div className="relative aspect-video bg-cream-200">
              <ShowcaseImage videoId={firstLesson?.videoId} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
              <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-cream-50/95 px-2.5 py-1 text-[11px] font-medium tracking-tight text-gold-700 backdrop-blur">
                <Sparkles className="h-3 w-3" /> {language === 'ar' ? 'مسار تعلّم' : 'Learning path'}
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{path.name}</h3>
              <p className="mt-1 text-sm italic tracking-tight text-ink-500">{path.goal}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{path.blurb}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors group-hover:text-terracotta-500">
                {language === 'ar' ? 'ابدأ المسار' : 'Start the path'}
                <ArrowUpRight className="rtl-flip h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>

          {/* Film card */}
          <Link
            to="/films"
            className="group relative flex flex-col overflow-hidden rounded-3xl bg-ink-900 text-cream-50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]"
          >
            <div className="relative aspect-video bg-ink-800">
              <ShowcaseImage videoId={film.videoId} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-500/25 px-2.5 py-1 text-[11px] font-medium tracking-tight text-gold-400">
                <Film className="h-3 w-3" /> {language === 'ar' ? "اختيار المحرّر" : "Editor's pick"}
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">{film.title}</h3>
              <p className="mt-1 text-sm tracking-tight text-cream-100/70">{film.channel}{film.runtime ? ` · ${film.runtime}` : ''}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-100/80">{film.blurb}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium tracking-tight text-cream-50 transition-colors group-hover:text-gold-400">
                {language === 'ar' ? 'شاهد الآن' : 'Watch now'}
                <ArrowUpRight className="rtl-flip h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>

          {/* Chef card */}
          <Link
            to="/chefs"
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
          >
            <div className="relative aspect-video bg-ink-900">
              <ShowcaseImage videoId={chef.videoId} />
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sage-50 px-2.5 py-1 text-[11px] font-medium tracking-tight text-sage-700">
                <ChefHat className="h-3 w-3" /> {language === 'ar' ? 'شيف الأسبوع' : 'Chef portrait'}
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">{chef.name}</h3>
              <p className="mt-1 text-sm tracking-tight text-ink-500">{chef.nationality} · {chef.cuisine}</p>
              <p className="mt-3 flex-1 border-l-2 border-gold-500/40 pl-3 text-sm italic leading-relaxed text-ink-600">
                "{chef.philosophy}"
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors group-hover:text-terracotta-500">
                {language === 'ar' ? 'افتح القاعة' : 'Open the hall'}
                <ArrowUpRight className="rtl-flip h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
