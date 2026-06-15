import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChefHat, MapPin, Sparkles, Star, Utensils } from 'lucide-react';
import { useTranslation } from '../i18n';
import MichelinDetailModal from '../components/MichelinDetailModal';
import {
  MICHELIN_REGIONS,
  MICHELIN_RESTAURANTS,
  FEATURED_MICHELIN,
  ARAB_WORLD_MICHELIN,
  COUNT_BY_STARS,
  type MichelinRestaurant,
  type MichelinRegion,
} from '../data/michelin-restaurants';

type StarsFilter = 'all' | '3' | '2' | '1';
type RegionFilter = 'all' | MichelinRegion;

function StarsBadge({ stars }: { stars: 1 | 2 | 3 }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: stars }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current text-gold-500" strokeWidth={1.5} />
      ))}
    </span>
  );
}

/**
 * Restaurant image tile. The whole card is clickable to open the detail
 * modal which carries the video search, Wikipedia link, and full info.
 */
function RestaurantImage({ image, alt }: { image?: string; alt: string }) {
  return (
    <>
      {image ? (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-800 via-ink-900 to-terracotta-900">
          <ChefHat className="h-12 w-12 text-cream-50/30" strokeWidth={1} />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <span className="rounded-full bg-cream-50/95 px-3 py-1 text-[10px] font-medium tracking-tight text-ink-900 backdrop-blur">
          View details
        </span>
      </div>
    </>
  );
}

function RestaurantCard({ restaurant, onOpen }: { restaurant: MichelinRestaurant; onOpen: () => void }) {
  const { t, pl, language } = useTranslation();
  const isAr = language === 'ar';
  const name = isAr ? restaurant.nameAr : restaurant.name;
  const city = isAr ? restaurant.cityAr : restaurant.city;
  const country = isAr ? restaurant.countryAr : restaurant.country;
  const chef = pl(restaurant.chef, restaurant.chefAr);
  const cuisine = isAr ? restaurant.cuisineAr : restaurant.cuisine;
  const story = pl(restaurant.story, restaurant.storyAr);
  const dishes = isAr && restaurant.signatureDishesAr ? restaurant.signatureDishesAr : restaurant.signatureDishes;

  return (
    <article
      id={`m-${restaurant.id}`}
      className="group flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={isAr ? `افتح تفاصيل ${name}` : `Open details for ${name}`}
        className="relative aspect-video w-full overflow-hidden bg-ink-900"
      >
        <RestaurantImage image={restaurant.image} alt={name} />

        {/* Stars badge */}
        <span className="pointer-events-none absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/85 px-2.5 py-1 text-[11px] font-semibold tracking-tight text-cream-50 backdrop-blur">
          <StarsBadge stars={restaurant.stars} />
          {restaurant.starsSince && (
            <span className="text-cream-100/70">{restaurant.starsSince}</span>
          )}
        </span>

        {/* Halal / Arab world badges */}
        <div className="pointer-events-none absolute end-3 top-3 flex flex-col items-end gap-1.5">
          {restaurant.isHalalFriendly && (
            <span className="rounded-full bg-sage-500 px-2.5 py-1 text-[10px] font-semibold tracking-tight text-cream-50 backdrop-blur">
              {t('michelin.halalBadge')}
            </span>
          )}
          {restaurant.isInArabWorld && (
            <span className="rounded-full bg-terracotta-500 px-2.5 py-1 text-[10px] font-semibold tracking-tight text-cream-50 backdrop-blur">
              {t('michelin.arabWorldBadge')}
            </span>
          )}
        </div>
      </button>

      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 flex-col p-5 text-start md:p-6"
      >
        <p className="inline-flex items-center gap-1.5 text-xs tracking-tight text-ink-400">
          <MapPin className="h-3 w-3" />
          {city}, {country}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight md:text-2xl">{name}</h3>
        <p className="mt-1 text-sm tracking-tight text-gold-600">{cuisine}</p>

        <p className="mt-3 inline-flex items-center gap-1.5 text-xs tracking-tight text-ink-500">
          <ChefHat className="h-3 w-3" />
          {chef}
        </p>

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-600">{story}</p>

        {dishes && dishes.length > 0 && (
          <div className="mt-5">
            <p className="text-[12px] font-semibold tracking-tight text-ink-900">{t('michelin.dishesLabel')}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {dishes.slice(0, 4).map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-700"
                >
                  {d}
                </span>
              ))}
              {dishes.length > 4 && (
                <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-500">
                  +{dishes.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        <span className="mt-5 inline-flex items-center gap-1 self-start text-[11px] font-medium tracking-tight text-terracotta-500">
          {isAr ? 'اضغط للتفاصيل' : 'Click for details'}
          <ArrowUpRight className="rtl-flip h-3 w-3" />
        </span>
      </button>
    </article>
  );
}

export default function MichelinPage() {
  const { t, language } = useTranslation();
  const isAr = language === 'ar';
  const [stars, setStars] = useState<StarsFilter>('all');
  const [region, setRegion] = useState<RegionFilter>('all');
  const [openRestaurant, setOpenRestaurant] = useState<MichelinRestaurant | null>(null);

  const filtered = useMemo(() => {
    return MICHELIN_RESTAURANTS.filter((r) => {
      if (stars !== 'all' && String(r.stars) !== stars) return false;
      if (region !== 'all' && r.region !== region) return false;
      return true;
    });
  }, [stars, region]);

  const threeStars = filtered.filter((r) => r.stars === 3);
  const twoStars = filtered.filter((r) => r.stars === 2);
  const oneStars = filtered.filter((r) => r.stars === 1);

  return (
    <div>
      {/* ============ HERO — editorial-magazine layout ============ */}
      <section className="relative overflow-hidden bg-cream-50">
        {/* Soft gold orbs in the corners */}
        <div className="pointer-events-none absolute -end-32 -top-32 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -start-32 h-96 w-96 rounded-full bg-terracotta-500/15 blur-3xl" />

        <div className="container-wide relative z-10 grid items-center gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-20">
          {/* Left — title + body + CTAs */}
          <div className="md:col-span-7">
            <p className="eyebrow mb-5 inline-flex items-center gap-2 text-gold-600">
              <Star className="h-3 w-3 fill-current" strokeWidth={2} />
              {t('michelin.eyebrow')}
            </p>
            <h1 className="text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.95] tracking-tighter text-ink-900">
              {t('michelin.title1')}{' '}
              <span className="text-gold-600">{t('michelin.title2')}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-ink-600 sm:text-base md:text-lg">
              {t('michelin.body')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#three-stars"
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-gold-600"
              >
                <Star className="h-3.5 w-3.5 fill-current" />
                {t('michelin.ctaStart')}
              </a>
              <a
                href="#arab-world"
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
              >
                {t('michelin.ctaArabWorld')}
              </a>
            </div>

            {/* Stat cards — clean row of four */}
            <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-3 max-w-2xl">
              {[
                { value: `${COUNT_BY_STARS.three}`, label: t('michelin.statThreeStars'), accent: 'gold' },
                { value: `${COUNT_BY_STARS.two}`,   label: t('michelin.statTwoStars'),   accent: 'gold' },
                { value: `${COUNT_BY_STARS.one}`,   label: t('michelin.statOneStar'),    accent: 'gold' },
                { value: `${new Set(MICHELIN_RESTAURANTS.map((r) => r.country)).size}`, label: t('michelin.statCountries'), accent: 'ink' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-ink-100 bg-cream-50 p-3.5 text-center md:p-4">
                  <p className={`text-2xl font-bold tracking-tighter md:text-3xl ${s.accent === 'gold' ? 'text-gold-600' : 'text-ink-900'}`}>
                    {s.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-ink-500 md:text-[11px]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 2x2 featured grid */}
          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {FEATURED_MICHELIN.filter((r) => r.image).slice(0, 4).map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setOpenRestaurant(r)}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <img
                    src={r.image}
                    alt={r.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-start">
                    <div className="mb-1">
                      <StarsBadge stars={r.stars} />
                    </div>
                    <p className="text-[10px] font-medium tracking-tight text-gold-400">
                      {isAr ? r.cityAr : r.city}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold tracking-tight text-cream-50">
                      {isAr ? r.nameAr : r.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FILTERS — sticky band ============ */}
      <section className="sticky top-[72px] z-20 border-y border-ink-100 bg-cream-50/95 py-5 backdrop-blur md:top-[80px]">
        <div className="container-wide">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Stars filter — primary */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden text-[11px] font-medium uppercase tracking-widest text-ink-400 md:inline">
                {isAr ? 'النجوم:' : 'Stars:'}
              </span>
              {([
                { id: 'all' as StarsFilter, label: t('michelin.allStars') },
                { id: '3' as StarsFilter, label: '★★★' },
                { id: '2' as StarsFilter, label: '★★' },
                { id: '1' as StarsFilter, label: '★' },
              ]).map((b) => {
                const isActive = stars === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setStars(b.id)}
                    className={`rounded-full border px-4 py-2 text-[13px] font-semibold tracking-tight transition-colors ${
                      isActive
                        ? 'border-ink-900 bg-ink-900 text-gold-400'
                        : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>

            {/* Region filter — secondary */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden text-[11px] font-medium uppercase tracking-widest text-ink-400 md:inline">
                {isAr ? 'المنطقة:' : 'Region:'}
              </span>
              {([
                { id: 'all' as RegionFilter, name: t('michelin.allRegions') },
                ...MICHELIN_REGIONS.map((r) => ({ id: r.id as RegionFilter, name: isAr ? r.nameAr : r.name })),
              ]).map((b) => {
                const isActive = region === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setRegion(b.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium tracking-tight transition-colors ${
                      isActive
                        ? 'border-gold-600 bg-gold-500/15 text-gold-700'
                        : 'border-ink-200 bg-cream-50 text-ink-500 hover:border-ink-900 hover:text-ink-900'
                    }`}
                  >
                    {b.name}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-3 text-[12px] tracking-tight text-ink-400">{t('michelin.nResults', { n: filtered.length })}</p>
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="container-wide py-20">
          <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
            <p className="text-base text-ink-600">{t('michelin.emptyTitle')}</p>
            <button
              type="button"
              onClick={() => {
                setStars('all');
                setRegion('all');
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2 text-sm font-medium tracking-tight text-ink-900 hover:border-ink-900"
            >
              {t('michelin.resetFilters')}
            </button>
          </div>
        </section>
      ) : (
        <>
          {/* ============ THREE STARS ============ */}
          {threeStars.length > 0 && (
            <section id="three-stars" className="container-wide py-12 md:py-20">
              <div className="mb-10">
                <p className="eyebrow mb-3 inline-flex items-center gap-2 text-gold-600">
                  <Star className="h-3 w-3 fill-current" strokeWidth={2} />
                  <Star className="h-3 w-3 fill-current" strokeWidth={2} />
                  <Star className="h-3 w-3 fill-current" strokeWidth={2} />
                </p>
                <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                  {t('michelin.threeStarsTitle')}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">{t('michelin.threeStarsBody')}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {threeStars.map((r) => (
                  <RestaurantCard key={r.id} restaurant={r} onOpen={() => setOpenRestaurant(r)} />
                ))}
              </div>
            </section>
          )}

          {/* ============ ARAB WORLD SPOTLIGHT ============ */}
          {region === 'all' && stars === 'all' && (
            <section id="arab-world" className="border-y border-ink-100 bg-gradient-to-b from-terracotta-50/40 to-cream-100/40 py-12 md:py-20">
              <div className="container-wide">
                <div className="mb-10">
                  <p className="eyebrow mb-3 inline-flex items-center gap-2 text-terracotta-500">
                    <Sparkles className="h-3 w-3" strokeWidth={2} />
                    <span>{t('michelin.arabWorldBadge')}</span>
                  </p>
                  <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                    {t('michelin.arabWorldTitle')}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">{t('michelin.arabWorldBody')}</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {ARAB_WORLD_MICHELIN.map((r) => (
                    <RestaurantCard key={r.id} restaurant={r} onOpen={() => setOpenRestaurant(r)} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ============ TWO STARS ============ */}
          {twoStars.length > 0 && (
            <section className="container-wide py-12 md:py-20">
              <div className="mb-10">
                <p className="eyebrow mb-3 inline-flex items-center gap-2 text-gold-600">
                  <Star className="h-3 w-3 fill-current" strokeWidth={2} />
                  <Star className="h-3 w-3 fill-current" strokeWidth={2} />
                </p>
                <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                  {t('michelin.twoStarsTitle')}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">{t('michelin.twoStarsBody')}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {twoStars.map((r) => (
                  <RestaurantCard key={r.id} restaurant={r} onOpen={() => setOpenRestaurant(r)} />
                ))}
              </div>
            </section>
          )}

          {/* ============ ONE STAR ============ */}
          {oneStars.length > 0 && (
            <section className="border-t border-ink-100 bg-cream-100/40 py-12 md:py-20">
              <div className="container-wide">
                <div className="mb-10">
                  <p className="eyebrow mb-3 inline-flex items-center gap-2 text-gold-600">
                    <Star className="h-3 w-3 fill-current" strokeWidth={2} />
                  </p>
                  <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                    {t('michelin.oneStarTitle')}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">{t('michelin.oneStarBody')}</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {oneStars.map((r) => (
                    <RestaurantCard key={r.id} restaurant={r} onOpen={() => setOpenRestaurant(r)} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ============ CLOSING ============ */}
      <section className="container-wide pb-20 pt-16">
        <div className="overflow-hidden rounded-3xl bg-ink-900 px-7 py-14 text-center text-cream-50 md:px-16 md:py-20">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500/25 text-gold-400">
            <Utensils className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mx-auto mt-6 max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">
            {t('michelin.closingTitle')}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-100/70 md:text-base">
            {t('michelin.closingBody')}
          </p>
          <Link
            to="/markets"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-gold-400"
          >
            {t('michelin.closingCta')}
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Detail modal — opens when a card is clicked. Carries the YouTube
          search button, the Wikipedia link, the full story, and dishes. */}
      <MichelinDetailModal restaurant={openRestaurant} onClose={() => setOpenRestaurant(null)} />
    </div>
  );
}
