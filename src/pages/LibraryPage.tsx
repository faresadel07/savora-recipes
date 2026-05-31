import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Clock, Leaf, ShieldCheck, Users } from 'lucide-react';
import { LOCAL_RECIPES, listLocalRecipes } from '../data/local-recipes';
import { useTranslation } from '../i18n';
import { LOCAL_RECIPE_AR } from '../i18n/data-translations';
import RecipeImage from '../components/RecipeImage';

const VINTAGE = listLocalRecipes('vintage');
const USDA = listLocalRecipes('usda');

// Cards we'll fan out in the hero. Mix from both collections.
const HERO_STACK = [
  LOCAL_RECIPES.find((r) => r.id === 'lo-fanny-lemon-pie')!,
  LOCAL_RECIPES.find((r) => r.id === 'lo-usda-tacos')!,
  LOCAL_RECIPES.find((r) => r.id === 'lo-fanny-brown-bread')!,
  LOCAL_RECIPES.find((r) => r.id === 'lo-usda-salmon')!,
];

export default function LibraryPage() {
  const { t } = useTranslation();
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream-100 py-12 md:py-20">
        <div className="container-wide relative z-10">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6">
              <p className="eyebrow mb-4 inline-flex items-center gap-2">
                <BookOpen className="h-3 w-3" /> {t('library.eyebrow')}
              </p>
              <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-tighter">
                {t('library.title1')}
                <br />
                <span className="text-terracotta-500">{t('library.title2')}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:text-[17px]">
                {t('library.body')}
              </p>

              <div className="mt-6 grid max-w-md grid-cols-3 gap-3">
                <Stat top={`${LOCAL_RECIPES.length}`} bottom={t('library.statRecipes')} />
                <Stat top={`${USDA.length}`} bottom={t('library.statUsda')} />
                <Stat top={`${VINTAGE.length}`} bottom={t('library.statVintage')} />
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-4 py-2 text-[12px] tracking-tight text-ink-600">
                <ShieldCheck className="h-3.5 w-3.5 text-sage-600" />
                {t('library.publicDomainBadge')}
              </div>
            </div>

            {/* Right side: fanned-out cookbook stack */}
            <div className="md:col-span-6">
              <div className="relative mx-auto grid h-[440px] max-w-md grid-cols-2 grid-rows-2 gap-3 md:h-[520px]">
                {HERO_STACK.map((r, i) => (
                  <Link
                    key={r.id}
                    to={`/recipe/${r.id}`}
                    className="group relative block overflow-hidden rounded-2xl bg-cream-50 shadow-[0_24px_60px_-25px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1 hover:rotate-0"
                    style={{
                      transform: `rotate(${i === 0 ? '-2.5deg' : i === 1 ? '2deg' : i === 2 ? '1.5deg' : '-2deg'})`,
                      animationDelay: `${i * 80}ms`,
                    }}
                  >
                    <RecipeImage
                      src={r.image}
                      alt={r.title}
                      eager
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[9px] uppercase tracking-widest text-cream-100/80">
                        {r.collection === 'usda' ? 'USDA' : `${r.publisher?.match(/\d{4}/)?.[0] ?? ''}`}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold leading-tight tracking-tight text-cream-50 md:text-base">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative paper texture */}
        <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-terracotta-500/8 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-gold-500/8 blur-3xl" />
      </section>

      {/* USDA */}
      <section className="bg-sage-50 py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-10 grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-3 inline-flex items-center gap-2">
                <Leaf className="h-3 w-3" /> {t('library.usdaEyebrow')}
              </p>
              <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-tighter">
                {t('library.usdaTitle1')}<br />
                <span className="text-sage-600">{t('library.usdaTitle2')}</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-600 sm:text-base">
                {t('library.usdaBody')}
              </p>
            </div>

            <div className="md:col-span-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {USDA.map((r, i) => (
                  <RecipeShelfCard key={r.id} recipe={r} accent="sage" index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VINTAGE */}
      <section className="container-wide py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow mb-3">{t('library.vintageEyebrow')}</p>
            <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-tighter">
              {t('library.vintageTitle1')}<br />
              <span className="text-terracotta-500">{t('library.vintageTitle2')}</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-600 sm:text-base">
              {t('library.vintageBody')}
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {VINTAGE.map((r, i) => (
                <RecipeShelfCard key={r.id} recipe={r} accent="terracotta" index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROVENANCE NOTE */}
      <section className="container-wide pb-20">
        <div className="rounded-3xl bg-cream-100 p-8 text-center md:p-12">
          <p className="eyebrow mb-3">{t('library.aboutEyebrow')}</p>
          <h3 className="mx-auto max-w-3xl text-2xl font-semibold leading-tight tracking-tighter md:text-3xl">
            {t('library.aboutTitle')}
          </h3>
          <p className="mx-auto mt-4 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
            {t('library.aboutBody')}
          </p>
        </div>
      </section>
    </div>
  );
}

function Stat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-cream-50 p-3.5 text-center">
      <p className="text-2xl font-bold tracking-tighter text-ink-900 md:text-3xl">{top}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-400">{bottom}</p>
    </div>
  );
}

function RecipeShelfCard({
  recipe,
  accent,
  index,
}: {
  recipe: ReturnType<typeof listLocalRecipes>[number];
  accent: 'sage' | 'terracotta';
  index: number;
}) {
  const { language } = useTranslation();
  const ar = LOCAL_RECIPE_AR[recipe.id];
  const title = language === 'ar' && ar?.title ? ar.title : recipe.title;
  const blurb = language === 'ar' && ar?.blurb ? ar.blurb : recipe.blurb;

  const accentClass =
    accent === 'sage' ? 'group-hover:text-sage-600' : 'group-hover:text-terracotta-500';

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group relative flex flex-col gap-4 rounded-2xl bg-cream-50 p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream-200">
        <RecipeImage
          src={recipe.image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className={`text-lg font-semibold leading-snug tracking-tight transition-colors md:text-xl ${accentClass}`}>
            {title}
          </h3>
          <ArrowUpRight className="rtl-flip h-4 w-4 flex-none text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{blurb}</p>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-widest text-ink-400">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" /> {recipe.readyInMinutes} min
        </span>
        <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />
        <span className="inline-flex items-center gap-1">
          <Users className="h-3 w-3" /> {recipe.servings}
        </span>
        <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />
        <span className="truncate">{recipe.publisher}</span>
      </div>
    </Link>
  );
}
