import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowUpRight,
  BookOpen,
  Coffee,
  Globe,
  Map,
  Newspaper,
  Sparkles,
  Star,
  Tv,
  Utensils,
} from 'lucide-react';
import { searchRecipes } from '../api';
import {
  ARAB_CHANNELS,
  ARAB_COOKBOOKS,
  ARAB_REGIONS,
  ARAB_SITES,
  ARAB_SPICES,
  FAMOUS_DISHES,
  HERITAGE_NOTES,
  type ArabRegion,
} from '../data/arab-cuisine';
import RecipeCard from '../components/RecipeCard';
import RecipeImage from '../components/RecipeImage';
import ArchiveReader from '../components/ArchiveReader';

const HERO_STATS = [
  { value: '8', label: 'Regions' },
  { value: `${FAMOUS_DISHES.length}`, label: 'Iconic dishes' },
  { value: `${ARAB_CHANNELS.length}`, label: 'Channels' },
  { value: `${ARAB_COOKBOOKS.length}`, label: 'Cookbooks' },
];

/**
 * Wikipedia REST summary API returns a thumbnail.source URL for the article's
 * lead image, when one exists. Cached forever per title (each dish title is
 * stable). Lets us show real, freely-licensed photos without an API key.
 */
function useWikiImage(title: string | undefined) {
  return useQuery({
    queryKey: ['wiki-image', title],
    enabled: !!title,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    queryFn: async () => {
      if (!title) return undefined;
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
      const res = await fetch(url);
      if (!res.ok) return undefined;
      const json = await res.json();
      return (json.originalimage?.source as string | undefined) ?? (json.thumbnail?.source as string | undefined);
    },
  });
}

function DishImage({ title, alt, className }: { title: string; alt: string; className?: string }) {
  const { data: src } = useWikiImage(title);
  return <RecipeImage src={src} alt={alt} className={className} />;
}

export default function ArabCuisinePage() {
  const [activeRegion, setActiveRegion] = useState<ArabRegion>(ARAB_REGIONS[0]);

  const regionRecipesQ = useQuery({
    queryKey: ['arab-region', activeRegion.searchArea ?? activeRegion.id],
    queryFn: async () => {
      if (!activeRegion.searchArea) return { results: [], total: 0 };
      return searchRecipes({ area: activeRegion.searchArea, number: 9 });
    },
    enabled: Boolean(activeRegion.searchArea),
  });

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-ink-900 py-16 text-cream-50 md:py-24">
        <div className="container-wide relative z-10">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-cream-100/70">
                <Globe className="h-3 w-3" /> A thousand years at one table
              </p>
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tighter">
                The Arab table.
                <br />
                <span className="text-gold-400">From the Atlantic to Oman.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream-100/80 sm:text-lg">
                Eight kitchens, eighteen iconic dishes, ten public-archive
                cookbooks, seventeen YouTube channels, and the spice cabinet
                that powered them. A cuisine that fed caliphs, traveled the
                Silk Road, lived in Andalusia for eight centuries, and now
                belongs to anyone who pulls up a chair.
              </p>

              <div className="mt-7 grid max-w-md grid-cols-4 gap-2">
                {HERO_STATS.map((s) => (
                  <DarkStat key={s.label} top={s.value} bottom={s.label} />
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {FAMOUS_DISHES.slice(0, 4).map((d, i) => (
                  <a
                    key={d.id}
                    href={`#dish-${d.id}`}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink-800 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:-translate-y-1"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <DishImage title={d.wiki} alt={d.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="text-[9px] uppercase tracking-widest text-cream-100/70">{d.nameAr}</p>
                      <p className="mt-1 text-sm font-semibold tracking-tight text-cream-50">{d.name}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-terracotta-500/20 blur-3xl" />
      </section>

      {/* ============ REGIONS ============ */}
      <section id="regions" className="container-wide py-16 md:py-24">
        <SectionHead
          icon={<Map className="h-3 w-3" />}
          eyebrow="By region"
          title="Eight kitchens, one heritage."
          body="The Arab world is not one cuisine — it's a constellation. From the olive groves of the Levant to the spice ports of Oman, each region speaks its own dialect of the same language."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {ARAB_REGIONS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setActiveRegion(r)}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                activeRegion.id === r.id
                  ? 'border-ink-900 bg-ink-900 text-cream-50'
                  : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
              }`}
            >
              {r.name}
              <span className="ml-2 text-[10px] opacity-60">{r.nameAr}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-widest text-ink-400">{activeRegion.nameAr}</p>
            <h3 className="mt-2 text-[clamp(1.875rem,3.5vw,3rem)] font-semibold leading-tight tracking-tighter">{activeRegion.name}</h3>
            <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">{activeRegion.blurb}</p>

            <div className="mt-7">
              <p className="text-[11px] uppercase tracking-widest text-ink-400">Signature dishes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeRegion.signatureDishes.map((d) => (
                  <span key={d} className="rounded-full bg-cream-100 px-3 py-1.5 text-[12px] font-medium tracking-tight text-ink-700">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-widest text-ink-400">Spice cabinet</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeRegion.signatureSpices.map((s) => (
                  <span
                    key={s}
                    className={`rounded-full border px-3 py-1.5 text-[12px] font-medium tracking-tight ${
                      activeRegion.accent === 'sage'
                        ? 'border-sage-500/30 bg-sage-50 text-sage-600'
                        : activeRegion.accent === 'gold'
                        ? 'border-gold-500/30 bg-cream-200 text-gold-600'
                        : activeRegion.accent === 'terracotta'
                        ? 'border-terracotta-500/30 bg-terracotta-50 text-terracotta-600'
                        : 'border-ink-200 bg-cream-100 text-ink-700'
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            {regionRecipesQ.data && regionRecipesQ.data.results.length > 0 ? (
              <>
                <p className="mb-4 text-[11px] uppercase tracking-widest text-ink-400">Recipes from our library</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
                  {regionRecipesQ.data.results.slice(0, 9).map((r, i) => (
                    <RecipeCard key={r.id} recipe={r} index={i} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-ink-100 bg-cream-50 p-8">
                <p className="text-[11px] uppercase tracking-widest text-ink-400">In the kitchen</p>
                <h4 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
                  These dishes live in the cookbooks and channels below.
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Our recipe API doesn't catalog every Arab region yet. Scroll
                  down to the cookbooks for written recipes and the channels
                  for video walkthroughs.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ FAMOUS DISHES ============ */}
      <section id="dishes" className="border-y border-ink-100 bg-cream-100/40 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            icon={<Utensils className="h-3 w-3" />}
            eyebrow="The stories"
            title="Eighteen dishes you should know."
            body="Each one has a place of birth, a slow-cooked history, and a community that still argues over the right recipe."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {FAMOUS_DISHES.map((d, i) => (
              <article
                key={d.id}
                id={`dish-${d.id}`}
                className="grid gap-5 rounded-3xl border border-ink-100 bg-cream-50 p-6 sm:grid-cols-[180px_1fr] md:p-7"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream-200">
                  <DishImage title={d.wiki} alt={d.name} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[11px] uppercase tracking-widest text-ink-400">{d.origin}</p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                    {d.name} <span className="ml-2 text-base font-medium text-ink-400">{d.nameAr}</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{d.story}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SPICES ============ */}
      <section id="spices" className="container-wide py-16 md:py-24">
        <SectionHead
          icon={<Sparkles className="h-3 w-3" />}
          eyebrow="The spice cabinet"
          title="Nine spices that built a cuisine."
          body="Memorize this short list and you can read any Arab recipe. The whole Arab kitchen is variations on these aromatics."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ARAB_SPICES.map((s) => (
            <article key={s.name} className="rounded-2xl border border-ink-100 bg-cream-50 p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight">{s.name}</h3>
                <span className="text-base font-medium text-ink-400">{s.nameAr}</span>
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-400">{s.origin}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">{s.description}</p>
              <p className="mt-4 border-t border-ink-100 pt-4 text-[12px] tracking-tight text-ink-500">
                <span className="font-semibold uppercase tracking-widest text-ink-700">Use it:</span>{' '}
                {s.uses}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ============ COOKBOOKS ============ */}
      <section id="cookbooks" className="border-y border-ink-100 bg-cream-100/40 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            icon={<BookOpen className="h-3 w-3" />}
            eyebrow="The archive"
            title="Ten cookbooks, read in place."
            body="Ten Arab-cuisine cookbooks hosted on Internet Archive. Open the reader and turn the pages right here, without leaving the site."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {ARAB_COOKBOOKS.map((b, i) => (
              <article
                key={b.id}
                className="flex flex-col gap-5 rounded-3xl border border-ink-100 bg-cream-50 p-6 md:flex-row md:p-7"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <a href={b.detailUrl} target="_blank" rel="noreferrer" className="relative block aspect-[3/4] w-full flex-none overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] md:w-44">
                  <RecipeImage src={b.coverUrl} alt={b.title} className="absolute inset-0 h-full w-full object-cover" />
                </a>
                <div className="flex flex-1 flex-col">
                  <p className="text-[11px] uppercase tracking-widest text-ink-400">Published {b.year}</p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight md:text-2xl">{b.title}</h3>
                  <p className="mt-1 text-[12px] tracking-tight text-ink-400">{b.author}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-600">{b.blurb}</p>
                  <ArchiveReader embedUrl={b.embedUrl} detailUrl={b.detailUrl} title={b.title} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HERITAGE NOTES ============ */}
      <section id="heritage" className="container-wide py-16 md:py-24">
        <SectionHead
          icon={<Coffee className="h-3 w-3" />}
          eyebrow="Things worth knowing"
          title="Six notes on heritage."
          body="The Arab kitchen carries a long memory. Six short notes that help explain why dishes taste the way they do."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {HERITAGE_NOTES.map((note, i) => (
            <article key={note.title} className="rounded-3xl border border-ink-100 bg-cream-50 p-7" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-gold-500/15 text-gold-600">
                  <Star className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold leading-snug tracking-tight md:text-xl">{note.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{note.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ CHANNELS ============ */}
      <section id="channels" className="border-y border-ink-100 bg-cream-100/40 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            icon={<Tv className="h-3 w-3" />}
            eyebrow="Watch the kitchens"
            title="Seventeen Arab cooking channels."
            body="Hand-picked YouTube channels covering Levantine, Egyptian, Maghrebi, Gulf, and pan-Arab cooking. All free, all public."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ARAB_CHANNELS.map((c, i) => (
              <ChannelCard key={c.id} channel={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ MODERN SITES ============ */}
      <section id="sites" className="container-wide py-16 md:py-24">
        <SectionHead
          icon={<Newspaper className="h-3 w-3" />}
          eyebrow="Modern writers"
          title="Where Arab chefs publish online."
          body="Five contemporary Arab and Arab-diaspora cooks whose websites and books are worth the bookmark."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ARAB_SITES.map((s, i) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-ink-100 bg-cream-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-gold-600">
                  {s.name}
                </h3>
                <ArrowUpRight className="rtl-flip h-4 w-4 flex-none text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{s.blurb}</p>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-ink-400">
                {s.language === 'ar' ? 'Arabic' : s.language === 'en' ? 'English' : 'Bilingual'}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="container-wide pb-20">
        <div className="overflow-hidden rounded-3xl bg-ink-900 px-7 py-14 text-center text-cream-50 md:px-16 md:py-20">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500/25 text-gold-400">
            <Coffee className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mx-auto mt-6 max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">
            "Coffee is in two cups. The first is for the host, the second for the guest. Drink slowly and stay a while."
          </h3>
          <p className="mt-4 text-[12px] uppercase tracking-widest text-cream-100/60">— Bedouin saying</p>
          <Link to="/recipes" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-gold-400">
            Browse all recipes
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ eyebrow, title, body, icon }: { eyebrow: string; title: string; body?: string; icon?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-ink-400">
        {icon} {eyebrow}
      </p>
      <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">{title}</h2>
      {body && <p className="mt-3 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">{body}</p>}
    </div>
  );
}

function DarkStat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-2xl border border-cream-50/15 bg-cream-50/5 p-3 text-center backdrop-blur-sm">
      <p className="text-xl font-bold tracking-tighter text-cream-50 md:text-2xl">{top}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-cream-100/60">{bottom}</p>
    </div>
  );
}

function ChannelCard({ channel: c, index }: { channel: (typeof ARAB_CHANNELS)[number]; index: number }) {
  const accentBg =
    c.accent === 'terracotta' ? 'bg-terracotta-50 text-terracotta-600'
    : c.accent === 'sage' ? 'bg-sage-50 text-sage-600'
    : c.accent === 'gold' ? 'bg-cream-200 text-gold-600'
    : 'bg-ink-50 text-ink-600';

  return (
    <a
      href={c.url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col gap-4 rounded-2xl border border-ink-100 bg-cream-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${accentBg}`}>
          <Coffee className="h-4 w-4" strokeWidth={1.8} />
        </div>
        <ArrowUpRight className="rtl-flip h-4 w-4 text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-ink-400">{c.region}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-gold-600 md:text-xl">
          {c.name}
        </h3>
        {c.nameAr && <p className="mt-0.5 text-[13px] tracking-tight text-ink-500">{c.nameAr}</p>}
        <p className="mt-0.5 text-[11px] tracking-tight text-ink-400">{c.handle}</p>
      </div>

      <p className="mt-auto text-sm leading-relaxed text-ink-600">{c.blurb}</p>

      <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-ink-400">
        <Tv className="h-3 w-3" /> Open on YouTube
      </div>
    </a>
  );
}
