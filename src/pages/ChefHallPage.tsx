import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, BookOpen, ChefHat, MapPin, Play, Search, Sparkles, Utensils, X } from 'lucide-react';
import {
  CHEF_REGIONS,
  CHEFS,
  FEATURED_CHEFS,
  type Chef,
  type ChefRegion,
} from '../data/chef-hall';

type RegionFilter = 'all' | ChefRegion;

const REGION_FILTERS: { id: RegionFilter; name: string }[] = [
  { id: 'all', name: 'All chefs' },
  ...CHEF_REGIONS.map((r) => ({ id: r.id as RegionFilter, name: r.name })),
];

const HERO_STATS = [
  { value: `${CHEFS.length}`, label: 'Chefs' },
  { value: `${new Set(CHEFS.map((c) => c.cuisine)).size}`, label: 'Cuisines' },
  { value: `${CHEF_REGIONS.length}`, label: 'Regions' },
  { value: `${CHEFS.reduce((sum, c) => sum + (c.restaurants?.length ?? 0), 0)}`, label: 'Restaurants' },
];

function YoutubeLite({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
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
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-ink-900/10" />
      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-cream-50/95 text-ink-900 shadow-2xl transition-transform group-hover:scale-110 md:h-20 md:w-20">
        <Play className="h-7 w-7 translate-x-0.5 fill-current md:h-8 md:w-8" strokeWidth={1.5} />
      </span>
    </button>
  );
}

function ChefCard({ chef }: { chef: Chef }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-video bg-ink-900">
        <YoutubeLite videoId={chef.videoId} title={chef.name} />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="inline-flex items-center gap-1.5 text-xs tracking-tight text-ink-400">
          <MapPin className="h-3 w-3" />
          {chef.nationality}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight md:text-2xl">{chef.name}</h3>
        <p className="mt-1 text-sm tracking-tight text-gold-600">{chef.cuisine}</p>
        <p className="mt-4 border-l-2 border-gold-500/40 pl-3 text-sm italic leading-relaxed text-ink-600">
          "{chef.philosophy}"
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-600">{chef.bio}</p>

        {chef.restaurants && chef.restaurants.length > 0 && (
          <div className="mt-5">
            <p className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-tight text-ink-900">
              <Utensils className="h-3 w-3" /> Restaurants
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {chef.restaurants.map((r) => (
                <span
                  key={r}
                  className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-700"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}

        {chef.books && chef.books.length > 0 && (
          <div className="mt-4">
            <p className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-tight text-ink-900">
              <BookOpen className="h-3 w-3" /> Books
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {chef.books.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-ink-200 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-700"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function ChefHeroCard({ chef }: { chef: Chef }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-ink-900 text-cream-50 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
      <div className="relative aspect-[16/9] md:aspect-[16/7]">
        <YoutubeLite videoId={chef.videoId} title={chef.name} />
      </div>
      <div className="p-6 md:p-8">
        <p className="inline-flex items-center gap-1.5 text-xs tracking-tight text-cream-100/70">
          <MapPin className="h-3 w-3" />
          {chef.nationality}
          <span className="ml-2 text-gold-400">{chef.cuisine}</span>
        </p>
        <h3 className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tighter">
          {chef.name}
        </h3>
        <p className="mt-4 max-w-3xl border-l-2 border-gold-400 pl-4 text-base italic leading-relaxed text-cream-100/90 md:text-lg">
          "{chef.philosophy}"
        </p>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-cream-100/80 md:text-base">{chef.bio}</p>
      </div>
    </article>
  );
}

export default function ChefHallPage() {
  const [region, setRegion] = useState<RegionFilter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CHEFS.filter((c) => {
      if (region !== 'all' && c.region !== region) return false;
      if (!q) return true;
      const haystack = [
        c.name,
        c.nationality,
        c.cuisine,
        c.philosophy,
        c.bio,
        ...(c.restaurants ?? []),
        ...(c.books ?? []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [region, query]);

  const showRegionGroups = region === 'all' && !query;
  const featured = FEATURED_CHEFS[0];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-cream-50 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container-wide relative z-10">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tighter text-ink-900">
                The Chef Hall.
                <br />
                <span className="text-gold-600">{CHEFS.length} portraits of the people behind the plate.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
                A hall of portraits of the most important chefs alive (and a few
                who are no longer). Each has a verified video, a philosophy in
                one line, a working bio, the restaurants they cook in, and the
                books they wrote. From Ottolenghi to Ottolenghi's grandmother;
                from Pépin to Pujol.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#hall"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
                >
                  <ChefHat className="h-3.5 w-3.5" />
                  Enter the hall
                </a>
                <a
                  href="#region-middle-east"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
                >
                  Arab chefs first
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
                {FEATURED_CHEFS.slice(0, 4).map((c, i) => (
                  <a
                    key={c.id}
                    href="#hall"
                    onClick={() => setRegion(c.region)}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${c.videoId}/maxresdefault.jpg`}
                      onLoad={(e) => {
                        const t = e.currentTarget;
                        if (t.naturalWidth > 120) return;
                        if (t.src.includes('maxresdefault')) {
                          t.src = `https://img.youtube.com/vi/${c.videoId}/sddefault.jpg`;
                        } else if (t.src.includes('sddefault')) {
                          t.src = `https://img.youtube.com/vi/${c.videoId}/hqdefault.jpg`;
                        }
                      }}
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (t.src.includes('maxresdefault')) {
                          t.src = `https://img.youtube.com/vi/${c.videoId}/sddefault.jpg`;
                        } else if (t.src.includes('sddefault')) {
                          t.src = `https://img.youtube.com/vi/${c.videoId}/hqdefault.jpg`;
                        }
                      }}
                      alt={c.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="text-[9px] font-medium tracking-tight text-gold-400">{c.nationality}</p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold tracking-tight text-cream-50">{c.name}</p>
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

      {/* ============ FEATURED CHEF ============ */}
      {featured && (
        <section className="border-t border-ink-100 py-12 md:py-16">
          <div className="container-wide">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
                Portrait of the day
              </h2>
              <p className="inline-flex items-center gap-1.5 text-sm tracking-tight text-ink-500">
                <Award className="h-3.5 w-3.5" /> One chef, deeply
              </p>
            </div>
            <ChefHeroCard chef={featured} />
          </div>
        </section>
      )}

      {/* ============ HALL ============ */}
      <section id="hall" className="border-t border-ink-100 bg-cream-100/40 py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                The hall
              </h2>
              <p className="mt-2 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
                {CHEFS.length} chef portraits across {CHEF_REGIONS.length} regions. Search by chef, restaurant, cookbook,
                or cuisine.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chef, restaurant, book"
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
                  ? CHEFS.length
                  : CHEFS.filter((c) => c.region === r.id).length;
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
              {CHEF_REGIONS.map((reg) => {
                const items = CHEFS.filter((c) => c.region === reg.id);
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
                      <p className="text-sm tracking-tight text-ink-500">{items.length} chefs</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {items.map((c) => (
                        <ChefCard key={c.id} chef={c} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
              <p className="text-base text-ink-600">No chefs match that search.</p>
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
              {filtered.map((c) => (
                <ChefCard key={c.id} chef={c} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="container-wide pb-20 pt-16">
        <div className="overflow-hidden rounded-3xl bg-ink-900 px-7 py-14 text-center text-cream-50 md:px-16 md:py-20">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500/25 text-gold-400">
            <ChefHat className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mx-auto mt-6 max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">
            Every great recipe was first cooked by someone, somewhere.
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-100/70 md:text-base">
            The hall keeps growing. If a chef belongs here, send the name.
          </p>
          <Link
            to="/films"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-gold-400"
          >
            <Sparkles className="h-4 w-4" />
            Watch the film library
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
