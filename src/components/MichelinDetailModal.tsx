import { useEffect } from 'react';
import { ChefHat, ExternalLink, MapPin, PlayCircle, Star, X } from 'lucide-react';
import { useTranslation } from '../i18n';
import type { MichelinRestaurant } from '../data/michelin-restaurants';

interface Props {
  restaurant: MichelinRestaurant | null;
  onClose: () => void;
}

export default function MichelinDetailModal({ restaurant, onClose }: Props) {
  const { t, pl, language } = useTranslation();
  const isAr = language === 'ar';

  // Lock body scroll while modal is open and let Esc dismiss.
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

  const youtubeSearchQuery = encodeURIComponent(`${restaurant.name} ${restaurant.city} restaurant tour`);
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${youtubeSearchQuery}`;
  const wikipediaUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(restaurant.name + ' ' + restaurant.city)}`;
  const michelinGuideUrl = `https://guide.michelin.com/en/search?q=${encodeURIComponent(restaurant.name)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={name}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/85 p-4 backdrop-blur-sm md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-cream-50 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t('common.close')}
          className="absolute end-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream-50/95 text-ink-900 shadow-lg backdrop-blur transition-colors hover:bg-cream-50"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hero image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-ink-900">
          {restaurant.image ? (
            <img
              src={restaurant.image}
              alt={name}
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-800 via-ink-900 to-terracotta-900">
              <ChefHat className="h-16 w-16 text-cream-50/30" strokeWidth={1} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />

          {/* Stars overlay */}
          <div className="absolute start-5 top-5 flex items-center gap-1.5 rounded-full bg-ink-900/85 px-3 py-1.5 text-[12px] font-semibold text-cream-50 backdrop-blur">
            {Array.from({ length: restaurant.stars }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current text-gold-500" />
            ))}
            {restaurant.starsSince && <span className="ms-1 text-cream-100/70">{isAr ? 'منذ' : 'since'} {restaurant.starsSince}</span>}
          </div>

          {/* Badges */}
          <div className="absolute end-5 top-16 flex flex-col items-end gap-1.5">
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

          {/* Title overlaid on bottom */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="inline-flex items-center gap-1.5 text-[12px] tracking-tight text-cream-50/80">
              <MapPin className="h-3 w-3" />
              {city}, {country}
            </p>
            <h2 className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-tighter text-cream-50">
              {name}
            </h2>
            <p className="mt-1 text-sm font-medium text-gold-400">{cuisine}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {/* Chef */}
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-ink-100 bg-cream-100/40 p-4">
            <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-ink-900 text-cream-50">
              <ChefHat className="h-4 w-4" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-ink-400">{t('michelin.chefLabel')}</p>
              <p className="text-base font-semibold tracking-tight text-ink-900">{chef}</p>
            </div>
          </div>

          {/* Story */}
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-ink-400">
              {isAr ? 'القصة' : 'The story'}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{story}</p>
          </div>

          {/* Signature dishes */}
          {dishes && dishes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-ink-400">
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

          {/* Action buttons */}
          <div className="grid gap-2.5 border-t border-ink-100 pt-6 sm:grid-cols-3">
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta-500 px-5 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-600"
            >
              <PlayCircle className="h-3.5 w-3.5" />
              {isAr ? 'فيديوهات على يوتيوب' : 'Videos on YouTube'}
            </a>
            <a
              href={wikipediaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-5 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {isAr ? 'ويكيبيديا' : 'Wikipedia'}
            </a>
            <a
              href={michelinGuideUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-500 bg-gold-500/10 px-5 py-3 text-[13px] font-medium tracking-tight text-gold-700 transition-colors hover:bg-gold-500/20"
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              {isAr ? 'دليل ميشلان' : 'Michelin Guide'}
            </a>
          </div>

          <p className="mt-4 text-[11px] tracking-tight text-ink-400">
            {isAr
              ? 'اضغط على أحد الأزرار لفتح فيديوهات وصور وتفاصيل أكثر عن المطعم.'
              : 'Tap a button to open more videos, photos, and details about this restaurant.'}
          </p>
        </div>
      </div>
    </div>
  );
}
