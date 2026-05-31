import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Film, Play, Search, X } from 'lucide-react';
import {
  FILM_CATEGORIES,
  FOOD_FILMS,
  FEATURED_FILMS,
  type FilmCategory,
  type FoodFilm,
} from '../data/food-films';

type FilterId = 'all' | FilmCategory;

const FILTERS: { id: FilterId; name: string }[] = [
  { id: 'all', name: 'All films' },
  ...FILM_CATEGORIES.map((c) => ({ id: c.id as FilterId, name: c.name })),
];

function uniqueChannels() {
  return new Set(FOOD_FILMS.map((f) => f.channel)).size;
}

const HERO_STATS = [
  { value: `${FOOD_FILMS.length}`, label: 'Films' },
  { value: `${uniqueChannels()}`, label: 'Channels' },
  { value: `${FILM_CATEGORIES.length}`, label: 'Categories' },
  { value: `${new Set(FOOD_FILMS.map((f) => f.region).filter(Boolean)).size}`, label: 'Regions' },
];

/**
 * Lite YouTube embed: shows the maxres thumbnail until the user clicks,
 * then swaps in the iframe with autoplay. Keeps the page fast even with
 * 40+ videos on a single route.
 */
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
        onError={(e) => {
          const t = e.currentTarget;
          if (!t.src.includes('hqdefault')) t.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
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

function FilmCard({ film }: { film: FoodFilm }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-video bg-ink-900">
        <YoutubeLite videoId={film.videoId} title={film.title} />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-tight text-ink-400">
          <span className="font-medium text-ink-700">{film.channel}</span>
          {film.year && <span>{film.year}</span>}
          {film.runtime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {film.runtime}
            </span>
          )}
        </div>
        {film.series && (
          <p className="mt-2 text-[12px] font-medium tracking-tight text-gold-600">{film.series}</p>
        )}
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight md:text-xl">
          {film.title}
        </h3>
        {film.region && (
          <p className="mt-1 text-sm tracking-tight text-ink-500">{film.region}</p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{film.blurb}</p>
      </div>
    </article>
  );
}

function FilmHeroCard({ film }: { film: FoodFilm }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-ink-900 text-cream-50 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
      <div className="relative aspect-[16/9] md:aspect-[16/7]">
        <YoutubeLite videoId={film.videoId} title={film.title} />
      </div>
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-tight text-cream-100/70">
          <span className="font-medium text-gold-400">{film.channel}</span>
          {film.year && <span>{film.year}</span>}
          {film.runtime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {film.runtime}
            </span>
          )}
          {film.region && <span>{film.region}</span>}
        </div>
        {film.series && (
          <p className="mt-3 text-sm font-medium tracking-tight text-gold-400">{film.series}</p>
        )}
        <h3 className="mt-1 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-tighter">
          {film.title}
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cream-100/80 md:text-base">
          {film.blurb}
        </p>
      </div>
    </article>
  );
}

export default function FilmLibraryPage() {
  const [filter, setFilter] = useState<FilterId>('all');
  const [query, setQuery] = useState('');

  const filteredFilms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FOOD_FILMS.filter((f) => {
      if (filter !== 'all' && f.category !== filter) return false;
      if (!q) return true;
      const haystack = [
        f.title,
        f.channel,
        f.series ?? '',
        f.region ?? '',
        f.blurb,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query]);

  const showCategoryGroups = filter === 'all' && !query;
  const featured = FEATURED_FILMS[0];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-cream-50 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container-wide relative z-10">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tighter text-ink-900">
                Watch the masters.
                <br />
                <span className="text-gold-600">Forty-two films, one library.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
                A curated library of professional food films from Netflix,
                National Geographic, PBS, CNN, DW, UNESCO, and the best
                independent food channels on YouTube. Chef profiles, travel
                docs, food history, food science, and cultural deep dives.
                Press play and watch inside the site.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#library"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
                >
                  <Film className="h-3.5 w-3.5" />
                  Browse the library
                </a>
                {FILM_CATEGORIES.slice(0, 2).map((c) => (
                  <a
                    key={c.id}
                    href={`#cat-${c.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
                  >
                    {c.name}
                  </a>
                ))}
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
                {FEATURED_FILMS.slice(0, 4).map((f, i) => (
                  <a
                    key={f.id}
                    href="#library"
                    onClick={() => setFilter(f.category)}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${f.videoId}/maxresdefault.jpg`}
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (!t.src.includes('hqdefault')) t.src = `https://img.youtube.com/vi/${f.videoId}/hqdefault.jpg`;
                      }}
                      alt={f.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="text-[9px] font-medium tracking-tight text-gold-400">{f.channel}</p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold tracking-tight text-cream-50">{f.title}</p>
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

      {/* ============ FEATURED FILM ============ */}
      {featured && (
        <section className="border-t border-ink-100 py-12 md:py-16">
          <div className="container-wide">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
                Editor's pick
              </h2>
              <p className="text-sm tracking-tight text-ink-500">One film, watched in full</p>
            </div>
            <FilmHeroCard film={featured} />
          </div>
        </section>
      )}

      {/* ============ LIBRARY ============ */}
      <section id="library" className="border-t border-ink-100 bg-cream-100/40 py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                The library
              </h2>
              <p className="mt-2 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
                {FOOD_FILMS.length} films across {FILM_CATEGORIES.length} categories. Filter, search, and play any of
                them right inside the page.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search film, chef, or country"
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
            {FILTERS.map((f) => {
              const isActive = filter === f.id;
              const count = f.id === 'all' ? FOOD_FILMS.length : FOOD_FILMS.filter((film) => film.category === f.id).length;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                    isActive
                      ? 'border-ink-900 bg-ink-900 text-cream-50'
                      : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                  }`}
                >
                  {f.name}
                  <span className={`ml-2 text-[11px] ${isActive ? 'text-cream-100/60' : 'text-ink-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {showCategoryGroups ? (
            <div className="space-y-16 md:space-y-20">
              {FILM_CATEGORIES.map((cat) => {
                const items = FOOD_FILMS.filter((f) => f.category === cat.id);
                if (items.length === 0) return null;
                return (
                  <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">
                    <div className="mb-6 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
                          {cat.name}
                        </h3>
                        <p className="mt-1 text-sm tracking-tight text-ink-500">{cat.tagline}</p>
                      </div>
                      <p className="text-sm tracking-tight text-ink-500">{items.length} films</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((f) => (
                        <FilmCard key={f.id} film={f} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : filteredFilms.length === 0 ? (
            <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
              <p className="text-base text-ink-600">No films match that search.</p>
              <button
                type="button"
                onClick={() => {
                  setFilter('all');
                  setQuery('');
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2 text-sm font-medium tracking-tight text-ink-900 hover:border-ink-900"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFilms.map((f) => (
                <FilmCard key={f.id} film={f} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="container-wide pb-20 pt-16">
        <div className="overflow-hidden rounded-3xl bg-ink-900 px-7 py-14 text-center text-cream-50 md:px-16 md:py-20">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500/25 text-gold-400">
            <Film className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mx-auto mt-6 max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">
            Cook better by watching the people who do it best.
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-cream-100/70 md:text-base">
            More films get added every month. If there is a documentary you think
            belongs here, send it in.
          </p>
          <Link
            to="/recipes"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-gold-400"
          >
            Browse all recipes
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
