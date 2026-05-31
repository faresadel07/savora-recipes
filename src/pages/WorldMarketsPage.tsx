import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, MapPin, Play, Search, ShoppingBag, Sparkles, X } from 'lucide-react';
import {
  MARKET_REGIONS,
  WORLD_MARKETS,
  FEATURED_MARKETS,
  type FoodMarket,
  type MarketRegion,
} from '../data/world-markets';

type RegionFilter = 'all' | MarketRegion;

const REGION_FILTERS: { id: RegionFilter; name: string }[] = [
  { id: 'all', name: 'All markets' },
  ...MARKET_REGIONS.map((r) => ({ id: r.id as RegionFilter, name: r.name })),
];

const HERO_STATS = [
  { value: `${WORLD_MARKETS.length}`, label: 'Markets' },
  { value: `${new Set(WORLD_MARKETS.map((m) => m.country)).size}`, label: 'Countries' },
  { value: `${MARKET_REGIONS.length}`, label: 'Regions' },
  { value: `${Math.min(...WORLD_MARKETS.map((m) => m.yearFounded ?? 9999))}`, label: 'Oldest year' },
];

function YoutubeLite({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
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
          if (t.naturalWidth <= 120 && !t.src.includes('sddefault')) {
            t.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
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

function MarketCard({ market }: { market: FoodMarket }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-video bg-ink-900">
        <YoutubeLite videoId={market.videoId} title={market.name} />
        {market.yearFounded && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream-50/95 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-900 backdrop-blur">
            <Clock className="h-3 w-3" /> Since {market.yearFounded}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="inline-flex items-center gap-1.5 text-xs tracking-tight text-ink-400">
          <MapPin className="h-3 w-3" />
          {market.city}, {market.country}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight md:text-2xl">
          {market.name}
        </h3>
        {market.nameLocal && (
          <p className="mt-1 text-base font-medium tracking-tight text-ink-500">{market.nameLocal}</p>
        )}
        <p className="mt-3 text-sm tracking-tight text-ink-500">{market.marketType}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-600">{market.blurb}</p>

        <div className="mt-5">
          <p className="text-[12px] font-semibold tracking-tight text-ink-900">Signature foods</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {market.signatureFoods.map((food) => (
              <span
                key={food}
                className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-700"
              >
                {food}
              </span>
            ))}
          </div>
        </div>

        <details className="group/details mt-5 border-t border-ink-100 pt-4">
          <summary className="cursor-pointer list-none text-[12px] font-semibold tracking-tight text-ink-900 hover:text-gold-600">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              History
              <span className="text-ink-400 transition-transform group-open/details:rotate-90">›</span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">{market.history}</p>
        </details>
      </div>
    </article>
  );
}

function MarketHeroCard({ market }: { market: FoodMarket }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-ink-900 text-cream-50 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
      <div className="relative aspect-[16/9] md:aspect-[16/7]">
        <YoutubeLite videoId={market.videoId} title={market.name} />
      </div>
      <div className="p-6 md:p-8">
        <p className="inline-flex items-center gap-1.5 text-xs tracking-tight text-cream-100/70">
          <MapPin className="h-3 w-3" />
          {market.city}, {market.country}
          {market.yearFounded && <span className="ml-2">Since {market.yearFounded}</span>}
        </p>
        <h3 className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tighter">
          {market.name}
        </h3>
        {market.nameLocal && (
          <p className="mt-1 text-lg font-medium tracking-tight text-gold-400">{market.nameLocal}</p>
        )}
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cream-100/80 md:text-base">
          {market.blurb}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {market.signatureFoods.slice(0, 5).map((food) => (
            <span
              key={food}
              className="rounded-full border border-cream-50/20 bg-cream-50/5 px-2.5 py-1 text-[11px] font-medium tracking-tight text-cream-100/90"
            >
              {food}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function WorldMarketsPage() {
  const [region, setRegion] = useState<RegionFilter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WORLD_MARKETS.filter((m) => {
      if (region !== 'all' && m.region !== region) return false;
      if (!q) return true;
      const haystack = [
        m.name,
        m.nameLocal ?? '',
        m.city,
        m.country,
        m.blurb,
        m.history,
        ...m.signatureFoods,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [region, query]);

  const showRegionGroups = region === 'all' && !query;
  const featured = FEATURED_MARKETS[0];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-cream-50 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container-wide relative z-10">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tighter text-ink-900">
                Markets of the world.
                <br />
                <span className="text-gold-600">{WORLD_MARKETS.length} food cathedrals, one atlas.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
                A travelogue of the world's most famous food markets, from the
                tuna auction at Toyosu to the spice lanes of Khan El-Khalili,
                from Borough Market to Jemaa el-Fnaa. Every market has a video
                tour from a real food traveler, the founding year, signature
                foods, and the long story of how it became what it is.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#atlas"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Open the atlas
                </a>
                <a
                  href="#region-middle-east"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
                >
                  Middle East first
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
                {FEATURED_MARKETS.slice(0, 4).map((m, i) => (
                  <a
                    key={m.id}
                    href="#atlas"
                    onClick={() => setRegion(m.region)}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${m.videoId}/maxresdefault.jpg`}
                      onLoad={(e) => {
                        const t = e.currentTarget;
                        if (t.naturalWidth <= 120 && !t.src.includes('sddefault')) {
                          t.src = `https://img.youtube.com/vi/${m.videoId}/sddefault.jpg`;
                        }
                      }}
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (t.src.includes('maxresdefault')) {
                          t.src = `https://img.youtube.com/vi/${m.videoId}/sddefault.jpg`;
                        } else if (t.src.includes('sddefault')) {
                          t.src = `https://img.youtube.com/vi/${m.videoId}/hqdefault.jpg`;
                        }
                      }}
                      alt={m.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="text-[9px] font-medium tracking-tight text-gold-400">
                        {m.city}, {m.country}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold tracking-tight text-cream-50">
                        {m.name}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-terracotta-500/15 blur-3xl" />
      </section>

      {/* ============ FEATURED MARKET ============ */}
      {featured && (
        <section className="border-t border-ink-100 py-12 md:py-16">
          <div className="container-wide">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
                Stall of the day
              </h2>
              <p className="text-sm tracking-tight text-ink-500">One market, walked end to end</p>
            </div>
            <MarketHeroCard market={featured} />
          </div>
        </section>
      )}

      {/* ============ ATLAS ============ */}
      <section id="atlas" className="border-t border-ink-100 bg-cream-100/40 py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                The atlas
              </h2>
              <p className="mt-2 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
                {WORLD_MARKETS.length} markets across {MARKET_REGIONS.length} regions. Search by city, country, or
                signature dish.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city, dish, market"
                className="w-full rounded-full border border-ink-200 bg-cream-50 py-3 pl-11 pr-10 text-sm tracking-tight text-ink-900 placeholder:text-ink-400 focus:border-ink-900 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-900"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="mb-10 flex flex-wrap gap-2">
            {REGION_FILTERS.map((r) => {
              const isActive = region === r.id;
              const count =
                r.id === 'all'
                  ? WORLD_MARKETS.length
                  : WORLD_MARKETS.filter((m) => m.region === r.id).length;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRegion(r.id)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                    isActive
                      ? 'border-ink-900 bg-ink-900 text-cream-50'
                      : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                  }`}
                >
                  {r.name}
                  <span className={`ml-2 text-[11px] ${isActive ? 'text-cream-100/60' : 'text-ink-400'}`}>
                    {count}
                  </span>
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
                        <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
                          {reg.name}
                        </h3>
                        <p className="mt-1 text-sm tracking-tight text-ink-500">{reg.tagline}</p>
                      </div>
                      <p className="text-sm tracking-tight text-ink-500">{items.length} markets</p>
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
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
              <p className="text-base text-ink-600">No markets match that search.</p>
              <button
                type="button"
                onClick={() => {
                  setRegion('all');
                  setQuery('');
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2 text-sm font-medium tracking-tight text-ink-900 hover:border-ink-900"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((m) => (
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
            <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mx-auto mt-6 max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">
            Every great cuisine has a market behind it.
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-100/70 md:text-base">
            Walking a market is half of learning a kitchen. Save these tours and watch
            one a week.
          </p>
          <Link
            to="/films"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-gold-400"
          >
            Watch the film library
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
