import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Award,
  ChefHat,
  Clock,
  MapPin,
  Play,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Utensils,
  X,
} from 'lucide-react';
import { useTranslation } from '../i18n';
import {
  MARKET_REGIONS,
  WORLD_MARKETS,
  FEATURED_MARKETS,
  type FoodMarket,
  type MarketRegion,
} from '../data/world-markets';
import {
  CITY_REGIONS,
  FOOD_CITIES,
  FEATURED_CITIES,
  type FoodCity,
  type CityVideo,
  type CityRegion,
} from '../data/food-cities';
import {
  RESTAURANT_TYPES,
  FAMOUS_RESTAURANTS,
  FEATURED_RESTAURANTS,
  type FamousRestaurant,
  type RestaurantType,
} from '../data/famous-restaurants';

type RegionFilter = 'all' | MarketRegion;

function useRegionFilters() {
  const { t } = useTranslation();
  const list: { id: RegionFilter; name: string }[] = [
    { id: 'all', name: t('markets.allMarkets') },
    ...MARKET_REGIONS.map((r) => ({ id: r.id as RegionFilter, name: r.name })),
  ];
  return list;
}

function useHeroStats() {
  const { t } = useTranslation();
  const totalVideos = FOOD_CITIES.reduce((sum, c) => sum + c.videos.length, 0);
  return [
    { value: `${FOOD_CITIES.length}`, label: t('markets.statCities') },
    { value: `${FAMOUS_RESTAURANTS.length}`, label: t('markets.statRestaurants') },
    { value: `${WORLD_MARKETS.length}`, label: t('markets.statMarkets') },
    { value: `${totalVideos}+`, label: t('markets.statVideos') },
  ];
}

/**
 * Video tile that always works. The thumbnail prefers the explicit
 * Wikipedia image (when provided), then falls back through YouTube's
 * own thumbnail variants. Clicking the tile opens a YouTube search for
 * the supplied query in a new tab — never an inline embed — because
 * embedded videos go dead the moment a creator unlists or restricts
 * embedding, and YouTube search always returns live results.
 */
function YoutubeLite({
  videoId,
  title,
  searchQuery,
  fallbackImage,
}: {
  videoId?: string;
  title: string;
  searchQuery: string;
  fallbackImage?: string;
}) {
  const primarySrc = fallbackImage
    ?? (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '');
  const href = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Watch ${title} on YouTube`}
      className="group absolute inset-0 flex items-center justify-center overflow-hidden bg-ink-900"
    >
      {primarySrc && (
        <img
          src={primarySrc}
          onLoad={(e) => {
            if (fallbackImage) return;
            if (!videoId) return;
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
            if (fallbackImage && videoId && !t.src.includes('youtube.com')) {
              t.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              return;
            }
            if (videoId && t.src.includes('maxresdefault')) {
              t.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
            } else if (videoId && t.src.includes('sddefault')) {
              t.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }
          }}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-ink-900/15" />
      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-cream-50/95 text-ink-900 shadow-2xl transition-transform group-hover:scale-110 md:h-20 md:w-20">
        <Play className="h-7 w-7 translate-x-0.5 fill-current md:h-8 md:w-8" strokeWidth={1.5} />
      </span>
      <span className="absolute bottom-3 inline-flex items-center gap-1 rounded-full bg-ink-900/85 px-2.5 py-1 text-[10px] font-medium tracking-tight text-cream-50 backdrop-blur transition-opacity group-hover:opacity-100 md:opacity-0">
        Watch on YouTube
      </span>
    </a>
  );
}

// ============ CITY CARD ============

function CityVideoTab({ video, isActive, onClick, label }: { video: CityVideo; isActive: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-tight transition-colors ${
        isActive ? 'border-ink-900 bg-ink-900 text-cream-50' : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
      }`}
    >
      {label}
    </button>
  );
}

function CityCard({ city }: { city: FoodCity }) {
  const { t, pl, language } = useTranslation();
  const isAr = language === 'ar';
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const activeVideo = city.videos[activeVideoIdx];

  const labels: Record<string, string> = {
    street: t('markets.cityVideoStreet'),
    restaurants: t('markets.cityVideoRestaurants'),
    market: t('markets.cityVideoMarket'),
    signature: t('markets.cityVideoSignature'),
  };

  const blurb = pl(city.blurb, city.blurbAr);
  const name = isAr ? city.nameAr : city.name;
  const country = isAr ? city.countryAr : city.country;
  const dishes = isAr && city.signatureDishesAr ? city.signatureDishesAr : city.signatureDishes;

  // Search hint per category. Always returns relevant live results on
  // YouTube. For the signature tab we steer toward the city's most
  // famous dish when we know one.
  const searchTerms: Record<string, string> = {
    street: 'street food',
    restaurants: 'food tour',
    market: 'market tour',
    signature: city.signatureDishes[0] ?? 'food',
  };
  const activeCategoryTerm = activeVideo ? (searchTerms[activeVideo.category] ?? 'food') : 'food';
  const ytSearchQuery = `${city.name} ${activeCategoryTerm}`;

  return (
    <article id={`city-${city.id}`} className="group flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-video bg-ink-900">
        {activeVideo && (
          <YoutubeLite
            key={activeVideo.videoId}
            videoId={activeVideo.videoId}
            title={activeVideo.title}
            searchQuery={ytSearchQuery}
            fallbackImage={city.image}
          />
        )}
        <span className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream-50/95 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-900 backdrop-blur">
          {t('markets.cityVideosLabel', { n: city.videos.length })}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="inline-flex items-center gap-1.5 text-xs tracking-tight text-ink-400">
          <MapPin className="h-3 w-3" />
          {country}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight md:text-2xl">{name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{blurb}</p>

        <div className="mt-5 grid grid-cols-2 gap-1.5 md:grid-cols-4">
          {city.videos.map((v, i) => (
            <CityVideoTab
              key={i}
              video={v}
              isActive={i === activeVideoIdx}
              onClick={() => setActiveVideoIdx(i)}
              label={labels[v.category] ?? v.category}
            />
          ))}
        </div>

        {dishes && dishes.length > 0 && (
          <div className="mt-5">
            <p className="text-[12px] font-semibold tracking-tight text-ink-900">{t('markets.citySignatureDishes')}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {dishes.map((d) => (
                <span key={d} className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-700">{d}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

// ============ RESTAURANT CARD ============

function RestaurantCard({ restaurant }: { restaurant: FamousRestaurant }) {
  const { t, pl, language } = useTranslation();
  const isAr = language === 'ar';
  const name = isAr ? restaurant.nameAr : restaurant.name;
  const city = isAr ? restaurant.cityAr : restaurant.city;
  const country = isAr ? restaurant.countryAr : restaurant.country;
  const cuisine = isAr ? restaurant.cuisineAr : restaurant.cuisine;
  const story = pl(restaurant.story, restaurant.storyAr);
  const dishes = isAr && restaurant.signatureDishesAr ? restaurant.signatureDishesAr : restaurant.signatureDishes;

  return (
    <article id={`r-${restaurant.id}`} className="group flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-video bg-ink-900">
        <YoutubeLite
          videoId={restaurant.videoId}
          title={restaurant.name}
          searchQuery={`${restaurant.name} ${restaurant.city} restaurant`}
          fallbackImage={restaurant.image}
        />
        {restaurant.yearFounded && (
          <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream-50/95 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-900 backdrop-blur">
            <Clock className="h-3 w-3" /> {t('markets.restaurantSince')} {restaurant.yearFounded}
          </span>
        )}
        {restaurant.michelinStars != null && restaurant.michelinStars > 0 && (
          <span className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold-500 px-2.5 py-1 text-[11px] font-semibold tracking-tight text-ink-900 backdrop-blur">
            <Star className="h-3 w-3 fill-current" /> {t('markets.restaurantMichelin', { n: restaurant.michelinStars })}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="inline-flex items-center gap-1.5 text-xs tracking-tight text-ink-400">
          <MapPin className="h-3 w-3" />
          {city}, {country}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight md:text-2xl">{name}</h3>
        <p className="mt-1 text-sm tracking-tight text-gold-600">{cuisine}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-600">{story}</p>

        {dishes && dishes.length > 0 && (
          <div className="mt-5">
            <p className="text-[12px] font-semibold tracking-tight text-ink-900">{t('markets.restaurantDishes')}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {dishes.map((d) => (
                <span key={d} className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-700">{d}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

// ============ MARKET CARD (preserved) ============

function MarketCard({ market }: { market: FoodMarket }) {
  const { pl, language } = useTranslation();
  const isAr = language === 'ar';
  const marketType = pl(market.marketType, market.marketTypeAr);
  const blurb = pl(market.blurb, market.blurbAr);
  const history = pl(market.history, market.historyAr);
  const foods = isAr && market.signatureFoodsAr ? market.signatureFoodsAr : market.signatureFoods;
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-video bg-ink-900">
        <YoutubeLite
          videoId={market.videoId}
          title={market.name}
          searchQuery={`${market.name} ${market.city} market tour`}
        />
        {market.yearFounded && (
          <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream-50/95 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-900 backdrop-blur">
            <Clock className="h-3 w-3" /> {isAr ? 'منذ' : 'Since'} {market.yearFounded}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="inline-flex items-center gap-1.5 text-xs tracking-tight text-ink-400">
          <MapPin className="h-3 w-3" />
          {market.city}, {market.country}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight md:text-2xl">{market.name}</h3>
        {market.nameLocal && <p className="mt-1 text-base font-medium tracking-tight text-ink-500">{market.nameLocal}</p>}
        <p className="mt-3 text-sm tracking-tight text-ink-500">{marketType}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-600">{blurb}</p>

        <div className="mt-5">
          <p className="text-[12px] font-semibold tracking-tight text-ink-900">{isAr ? 'الأكلات الشهيرة' : 'Signature foods'}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {foods.map((food) => (
              <span key={food} className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-700">{food}</span>
            ))}
          </div>
        </div>

        <details className="group/details mt-5 border-t border-ink-100 pt-4">
          <summary className="cursor-pointer list-none text-[12px] font-semibold tracking-tight text-ink-900 hover:text-gold-600">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              {isAr ? 'التاريخ' : 'History'}
              <span className="text-ink-400 transition-transform group-open/details:rotate-90">›</span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">{history}</p>
        </details>
      </div>
    </article>
  );
}

// ============ MAIN PAGE ============

export default function WorldMarketsPage() {
  const { t, language } = useTranslation();
  const isAr = language === 'ar';
  const REGION_FILTERS = useRegionFilters();
  const HERO_STATS = useHeroStats();

  // Markets section state (kept)
  const [region, setRegion] = useState<RegionFilter>('all');
  const [query, setQuery] = useState('');

  // Cities section state
  const [cityRegion, setCityRegion] = useState<'all' | CityRegion>('all');

  // Restaurants section state
  const [restaurantType, setRestaurantType] = useState<'all' | RestaurantType>('all');

  const filteredMarkets = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WORLD_MARKETS.filter((m) => {
      if (region !== 'all' && m.region !== region) return false;
      if (!q) return true;
      const haystack = [m.name, m.nameLocal ?? '', m.city, m.country, m.blurb, m.history, ...m.signatureFoods].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [region, query]);

  const filteredCities = useMemo(() => {
    return cityRegion === 'all' ? FOOD_CITIES : FOOD_CITIES.filter((c) => c.region === cityRegion);
  }, [cityRegion]);

  const filteredRestaurants = useMemo(() => {
    return restaurantType === 'all' ? FAMOUS_RESTAURANTS : FAMOUS_RESTAURANTS.filter((r) => r.type === restaurantType);
  }, [restaurantType]);

  const showRegionGroups = region === 'all' && !query;
  const featuredMarket = FEATURED_MARKETS[0];
  const featuredRestaurant = FEATURED_RESTAURANTS[0];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-cream-50 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container-wide relative z-10">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tighter text-ink-900">
                {t('markets.title1')}
                <br />
                <span className="text-gold-600">
                  {t('markets.title2', { c: FOOD_CITIES.length, r: FAMOUS_RESTAURANTS.length, m: WORLD_MARKETS.length })}
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">{t('markets.body')}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#cities" className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {t('markets.ctaOpenAtlas')}
                </a>
                <a href="#city-new-york" className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900">
                  {t('markets.ctaStartNewYork')}
                </a>
                <a href="#city-tokyo" className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900">
                  {t('markets.ctaStartTokyo')}
                </a>
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
                {FEATURED_CITIES.slice(0, 4).map((c, i) => {
                  const firstVideo = c.videos[0];
                  const src = c.image ?? (firstVideo ? `https://img.youtube.com/vi/${firstVideo.videoId}/maxresdefault.jpg` : '');
                  return (
                    <a
                      key={c.id}
                      href={`#city-${c.id}`}
                      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <img
                        src={src}
                        onError={(e) => {
                          const t = e.currentTarget;
                          if (firstVideo && !t.src.includes('youtube.com')) {
                            t.src = `https://img.youtube.com/vi/${firstVideo.videoId}/hqdefault.jpg`;
                          }
                        }}
                        alt={c.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3.5">
                        <p className="text-[9px] font-medium tracking-tight text-gold-400">
                          {isAr ? c.countryAr : c.country}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm font-semibold tracking-tight text-cream-50">
                          {isAr ? c.nameAr : c.name}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -end-32 -top-32 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -start-32 h-96 w-96 rounded-full bg-terracotta-500/15 blur-3xl" />
      </section>

      {/* ============ FEATURED RESTAURANT (eyebrow) ============ */}
      {featuredRestaurant && (
        <section className="border-t border-ink-100 py-12 md:py-16">
          <div className="container-wide">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <p className="eyebrow inline-flex items-center gap-2 text-terracotta-500">
                <Award className="h-3 w-3" strokeWidth={2} />
                {isAr ? 'مطعم اليوم' : 'Restaurant of the day'}
              </p>
              <p className="text-sm tracking-tight text-ink-500">{isAr ? 'مطعم واحد، بعمق' : 'One restaurant, deeply'}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <RestaurantCard restaurant={featuredRestaurant} />
              <RestaurantCard restaurant={FEATURED_RESTAURANTS[1] ?? FAMOUS_RESTAURANTS[1]} />
            </div>
          </div>
        </section>
      )}

      {/* ============ FOOD CITIES ============ */}
      <section id="cities" className="border-y border-ink-100 bg-cream-100/40 py-12 md:py-20">
        <div className="container-wide">
          <p className="eyebrow mb-3 inline-flex items-center gap-2 text-gold-600">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            {t('markets.citiesEyebrow')}
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
            {t('markets.citiesTitle')}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">{t('markets.citiesBody')}</p>

          <div className="mb-10 mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCityRegion('all')}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                cityRegion === 'all' ? 'border-ink-900 bg-ink-900 text-cream-50' : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
              }`}
            >
              {t('markets.allMarkets')}
              <span className={`ms-2 text-[11px] ${cityRegion === 'all' ? 'text-cream-100/60' : 'text-ink-400'}`}>{FOOD_CITIES.length}</span>
            </button>
            {CITY_REGIONS.map((r) => {
              const count = FOOD_CITIES.filter((c) => c.region === r.id).length;
              const isActive = cityRegion === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setCityRegion(r.id)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                    isActive ? 'border-ink-900 bg-ink-900 text-cream-50' : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                  }`}
                >
                  {isAr ? r.nameAr : r.name}
                  <span className={`ms-2 text-[11px] ${isActive ? 'text-cream-100/60' : 'text-ink-400'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAMOUS RESTAURANTS ============ */}
      <section id="restaurants" className="container-wide py-12 md:py-20">
        <p className="eyebrow mb-3 inline-flex items-center gap-2 text-terracotta-500">
          <ChefHat className="h-3 w-3" strokeWidth={2} />
          {t('markets.restaurantsEyebrow')}
        </p>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">{t('markets.restaurantsTitle')}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">{t('markets.restaurantsBody')}</p>

        <div className="mb-10 mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRestaurantType('all')}
            className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
              restaurantType === 'all' ? 'border-ink-900 bg-ink-900 text-cream-50' : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
            }`}
          >
            {t('markets.allMarkets')}
            <span className={`ms-2 text-[11px] ${restaurantType === 'all' ? 'text-cream-100/60' : 'text-ink-400'}`}>{FAMOUS_RESTAURANTS.length}</span>
          </button>
          {RESTAURANT_TYPES.map((r) => {
            const count = FAMOUS_RESTAURANTS.filter((res) => res.type === r.id).length;
            const isActive = restaurantType === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRestaurantType(r.id)}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                  isActive ? 'border-ink-900 bg-ink-900 text-cream-50' : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                }`}
              >
                {isAr ? r.nameAr : r.name}
                <span className={`ms-2 text-[11px] ${isActive ? 'text-cream-100/60' : 'text-ink-400'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRestaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      {/* ============ FEATURED MARKET ============ */}
      {featuredMarket && (
        <section className="border-t border-ink-100 py-12 md:py-16">
          <div className="container-wide">
            <p className="eyebrow mb-3 inline-flex items-center gap-2 text-sage-600">
              <ShoppingBag className="h-3 w-3" strokeWidth={2} />
              {t('markets.marketsEyebrow')}
            </p>
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
                {t('markets.stallOfTheDay')}
              </h2>
              <p className="text-sm tracking-tight text-ink-500">{t('markets.stallOfTheDaySub')}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <MarketCard market={featuredMarket} />
              {FEATURED_MARKETS[1] && <MarketCard market={FEATURED_MARKETS[1]} />}
            </div>
          </div>
        </section>
      )}

      {/* ============ MARKETS ATLAS (preserved) ============ */}
      <section id="atlas" className="border-t border-ink-100 bg-cream-100/40 py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                {t('markets.atlasTitle')}
              </h2>
              <p className="mt-2 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
                {t('markets.atlasBody', { n: WORLD_MARKETS.length, m: MARKET_REGIONS.length })}
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('markets.searchPlaceholder')}
                className="w-full rounded-full border border-ink-200 bg-cream-50 py-3 ps-11 pe-10 text-sm tracking-tight text-ink-900 placeholder:text-ink-400 focus:border-ink-900 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute end-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-900"
                  aria-label={t('markets.clearSearch')}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="mb-10 flex flex-wrap gap-2">
            {REGION_FILTERS.map((r) => {
              const isActive = region === r.id;
              const count = r.id === 'all' ? WORLD_MARKETS.length : WORLD_MARKETS.filter((m) => m.region === r.id).length;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRegion(r.id)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                    isActive ? 'border-ink-900 bg-ink-900 text-cream-50' : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                  }`}
                >
                  {r.name}
                  <span className={`ms-2 text-[11px] ${isActive ? 'text-cream-100/60' : 'text-ink-400'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          {showRegionGroups ? (
            <div className="space-y-16 md:space-y-20">
              {MARKET_REGIONS.map((reg) => {
                const items = WORLD_MARKETS.filter((m) => m.region === reg.id);
                if (items.length === 0) return null;
                return (
                  <div key={reg.id} id={`region-${reg.id}`} className="scroll-mt-24">
                    <div className="mb-6 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">{reg.name}</h3>
                        <p className="mt-1 text-sm tracking-tight text-ink-500">{reg.tagline}</p>
                      </div>
                      <p className="text-sm tracking-tight text-ink-500">{t('markets.nMarkets', { n: items.length })}</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {items.map((m) => (
                        <MarketCard key={m.id} market={m} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : filteredMarkets.length === 0 ? (
            <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
              <p className="text-base text-ink-600">{t('markets.emptyTitle')}</p>
              <button
                type="button"
                onClick={() => {
                  setRegion('all');
                  setQuery('');
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2 text-sm font-medium tracking-tight text-ink-900 hover:border-ink-900"
              >
                {t('markets.resetFilters')}
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredMarkets.map((m) => (
                <MarketCard key={m.id} market={m} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="container-wide pb-20 pt-16">
        <div className="overflow-hidden rounded-3xl bg-ink-900 px-7 py-14 text-center text-cream-50 md:px-16 md:py-20">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500/25 text-gold-400">
            <Utensils className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mx-auto mt-6 max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">
            {t('markets.closingTitle')}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-100/70 md:text-base">
            {t('markets.closingBody')}
          </p>
          <Link to="/films" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-gold-400">
            {t('markets.closingCta')}
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
