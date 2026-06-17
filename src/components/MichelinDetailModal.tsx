import { useEffect } from 'react';
import { ChefHat, ExternalLink, MapPin, PlayCircle, Star, X } from 'lucide-react';
import { useTranslation } from '../i18n';
import type { MichelinRestaurant } from '../data/michelin-restaurants';
import MichelinCover, { hasUniqueImage } from './MichelinCover';

interface Props {
  restaurant: MichelinRestaurant | null;
  onClose: () => void;
}

export default function MichelinDetailModal({ restaurant, onClose }: Props) {
  const { t, pl, language } = useTranslation();
  const isAr = language === 'ar';

  // Lock body scroll while open and let Esc dismiss.
  useEffect(() => {
    if (!restaurant) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [restaurant, onClose]);

  if (!restaurant) return null;

  const name = isAr ? restaurant.nameAr : restaurant.name;
  const city = isAr ? restaurant.cityAr : restaurant.city;
  const country = isAr ? restaurant.countryAr : restaurant.country;
  const chef = pl(restaurant.chef, restaurant.chefAr);
  const cuisine = isAr ? restaurant.cuisineAr : restaurant.cuisine;
  const story = pl(restaurant.story, restaurant.storyAr);
  const dishes = isAr && restaurant.signatureDishesAr ? restaurant.signatureDishesAr : restaurant.signatureDishes;

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(restaurant.name + ' ' + restaurant.city + ' michelin')}`;
  const wikipediaUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(restaurant.name + ' ' + restaurant.city)}`;
  const michelinGuideUrl = `https://guide.michelin.com/en/search?q=${encodeURIComponent(restaurant.name)}`;
  const showTitleOverlay = hasUniqueImage(restaurant);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={name}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/85 p-3 backdrop-blur-sm md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-cream-50 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t('common.close')}
          className="absolute end-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-cream-50/95 text-ink-900 shadow-lg backdrop-blur transition-colors hover:bg-cream-50"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hero region — image or typographic cover. Video playback is
            delegated to YouTube to guarantee a working result every time. */}
        <div className="relative aspect-[16/9] overflow-hidden bg-ink-900">
          <MichelinCover restaurant={restaurant} isAr={isAr} size="hero" />
          {showTitleOverlay && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
          )}

          {/* Stars overlay */}
          <div className="pointer-events-none absolute start-5 top-5 flex items-center gap-1.5 rounded-full bg-ink-900/85 px-3 py-1.5 text-[12px] font-semibold text-cream-50 backdrop-blur">
            {Array.from({ length: restaurant.stars }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current text-gold-500" />
            ))}
            {restaurant.starsSince && (
              <span className="ms-1 text-cream-100/70">{isAr ? 'منذ' : 'since'} {restaurant.starsSince}</span>
            )}
          </div>

          {/* Halal / Arab world badges */}
          <div className="pointer-events-none absolute end-16 top-5 flex flex-col items-end gap-1.5">
            {restaurant.isHalalFriendly && (
              <span className="rounded-full bg-sage-500 px-3 py-1 text-[11px] font-semibold text-cream-50 backdrop-blur">
                {t('michelin.halalBadge')}
              </span>
            )}
            {restaurant.isInArabWorld && (
              <span className="rounded-full bg-terracotta-500 px-3 py-1 text-[11px] font-semibold text-cream-50 backdrop-blur">
                {t('michelin.arabWorldBadge')}
              </span>
            )}
          </div>

          {/* Title overlay only over real photographs — the typographic
              cover already shows the title in large display type. */}
          {showTitleOverlay && (
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="inline-flex items-center gap-1.5 text-[12px] tracking-tight text-cream-50/85">
                <MapPin className="h-3 w-3" />
                {city}, {country}
              </p>
              <h2 className="mt-2 text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-tight tracking-tighter text-cream-50">
                {name}
              </h2>
              <p className="mt-1 text-sm font-medium text-gold-400">{cuisine}</p>
            </div>
          )}

          {/* Watch on YouTube — opens a fresh search in a new tab. Always
              returns relevant working videos, regardless of which clip is
              up at any given moment. */}
          <a
            href={youtubeSearchUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={isAr ? 'شاهد على يوتيوب' : 'Watch on YouTube'}
            className="group absolute end-6 bottom-6 inline-flex items-center gap-2.5 rounded-full bg-cream-50 px-5 py-3 text-[13px] font-medium tracking-tight text-ink-900 shadow-2xl backdrop-blur transition-all hover:bg-gold-400"
          >
            <PlayCircle className="h-5 w-5 fill-ink-900 text-cream-50" strokeWidth={2} />
            {isAr ? 'شاهد على يوتيوب' : 'Watch on YouTube'}
          </a>
        </div>

        {/* Body — chef, story, dishes */}
        <div className="p-6 md:p-8">
          {/* Chef block */}
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-ink-100 bg-cream-100/40 p-4">
            <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-ink-900 text-cream-50">
              <ChefHat className="h-4 w-4" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-ink-400">{t('michelin.chefLabel')}</p>
              <p className="text-base font-semibold tracking-tight text-ink-900">{chef}</p>
            </div>
          </div>

          {/* Story */}
          <div className="mb-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">
              {isAr ? 'القصة' : 'The story'}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{story}</p>
          </div>

          {/* Signature dishes */}
          {dishes && dishes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">
                {t('michelin.dishesLabel')}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {dishes.map((d) => (
                  <span
                    key={d}
                    className="rounded-full bg-cream-100 px-3.5 py-1.5 text-[12px] font-medium tracking-tight text-ink-700"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* External info links — only Wikipedia and Michelin Guide. Video
              plays inline above, no need for an external YouTube button. */}
          <div className="grid gap-2.5 border-t border-ink-100 pt-6 sm:grid-cols-2">
            <a
              href={wikipediaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-5 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {isAr ? 'اقرأ على ويكيبيديا' : 'Read on Wikipedia'}
            </a>
            <a
              href={michelinGuideUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-500 bg-gold-500/10 px-5 py-3 text-[13px] font-medium tracking-tight text-gold-700 transition-colors hover:bg-gold-500/20"
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              {isAr ? 'صفحة دليل ميشلان' : 'Michelin Guide entry'}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
