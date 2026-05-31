import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, Sparkles, Trash2 } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useTranslation } from '../i18n';
import RecipeCard from '../components/RecipeCard';
import RecipeImage from '../components/RecipeImage';
import { LOCAL_RECIPES } from '../data/local-recipes';

const SUGGEST = LOCAL_RECIPES.slice(0, 4);

export default function FavoritesPage() {
  const { t } = useTranslation();
  const { favorites, clear } = useFavorites();
  const empty = favorites.length === 0;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream-100 py-12 md:py-20">
        <div className="container-wide relative z-10">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4 inline-flex items-center gap-2">
                <Heart className="h-3 w-3" fill="currentColor" /> {t('favorites.eyebrow')}
              </p>
              <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-tighter">
                {empty ? (
                  <>
                    {t('favorites.titleEmpty1')}<br />
                    <span className="text-terracotta-500">{t('favorites.titleEmpty2')}</span>
                  </>
                ) : (
                  <>
                    {favorites.length === 1 ? t('favorites.titleSavedOne1') : t('favorites.titleSaved1', { n: favorites.length })}<br />
                    <span className="text-terracotta-500">{t('favorites.titleSaved2')}</span>
                  </>
                )}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:text-[17px]">
                {empty ? t('favorites.bodyEmpty') : t('favorites.bodyFilled')}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/recipes" className="btn-primary">
                  {t('favorites.browseRecipes')}
                  <ArrowUpRight className="rtl-flip h-4 w-4" />
                </Link>
                {!empty && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(t('favorites.confirmClear'))) clear();
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-4 py-2 text-[13px] tracking-tight text-ink-600 transition-colors hover:border-terracotta-500 hover:text-terracotta-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {t('favorites.clearAll')}
                  </button>
                )}
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-4 py-2 text-[12px] tracking-tight text-ink-600">
                <Sparkles className="h-3 w-3 text-sage-600" />
                {empty ? t('favorites.badge') : t('favorites.badgeFilled')}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {(empty ? SUGGEST : favorites.slice(0, 4)).map((r) => (
                  <Link
                    key={r.id}
                    to={`/recipe/${r.id}`}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-cream-50 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:-translate-y-1"
                  >
                    <RecipeImage src={r.image} alt={r.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent" />
                    {empty && (
                      <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-cream-50/95 px-2 py-1 text-[9px] font-medium uppercase tracking-widest text-ink-600">
                        {t('favorites.tryThis')}
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="text-[10px] uppercase tracking-widest text-cream-100/75">
                        {r.category || r.area || 'Recipe'}
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-tight tracking-tight text-cream-50">
                        {r.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {!empty && favorites.length > 4 && (
                <p className="mt-4 text-center text-xs tracking-tight text-ink-400">
                  {t('favorites.plusMoreBelow', { n: favorites.length - 4 })}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FULL LIST OR EMPTY-STATE CTA */}
      <section className="container-wide py-14 md:py-20">
        {empty ? (
          <div className="mx-auto max-w-3xl rounded-3xl bg-cream-100 p-10 text-center md:p-14">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-terracotta-50 text-terracotta-500">
              <Heart className="h-6 w-6" strokeWidth={1.6} />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">{t('favorites.noFavorites')}</h3>
            <p className="mx-auto mt-3 max-w-md text-sm tracking-tight text-ink-400">
              {t('favorites.noFavoritesBody')}
            </p>
            <Link to="/library" className="btn-primary mt-7">
              {t('favorites.openLibrary')}
              <ArrowUpRight className="rtl-flip h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <p className="eyebrow mb-3">{t('favorites.savedTitle')}</p>
            <h2 className="mb-10 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight">
              {t('favorites.everyRecipe')}
            </h2>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-14 xl:grid-cols-4">
              {favorites.map((r, i) => (
                <RecipeCard key={r.id} recipe={r} index={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
