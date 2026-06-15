import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChefHat, Globe, Play, PlayCircle, Sparkles, Tv, Utensils } from 'lucide-react';
import { getRandomRecipes } from '../api';
import type { Recipe } from '../types/recipe';
import { COOKING_CHANNELS } from '../data/cooking-channels';
import { useTranslation } from '../i18n';
import { CHANNEL_AR } from '../i18n/data-translations';
import RecipeImage from '../components/RecipeImage';
import ErrorState from '../components/ErrorState';

function extractYid(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
  } catch {
    /* */
  }
  return null;
}

function youtubePoster(url: string): string | null {
  const id = extractYid(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export default function VideosPage() {
  const { t } = useTranslation();
  const videosQ = useQuery({
    queryKey: ['videos', 'pool-v2'],
    queryFn: async () => {
      // Cast a wide net; most TheMealDB recipes have video walkthroughs, so
      // pulling 45 random typically nets 35+ with usable YouTube URLs.
      const batch = await getRandomRecipes(45);
      const withVideo = batch.filter((r) => Boolean(r.youtube));
      // Dedupe by id just in case
      const seen = new Set<string>();
      return withVideo.filter((r) => (seen.has(r.id) ? false : (seen.add(r.id), true)));
    },
    staleTime: 1000 * 60 * 30,
  });

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-900 py-12 text-cream-50 md:py-20">
        <div className="container-wide relative z-10">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-6">
              <p className="eyebrow mb-4 inline-flex items-center gap-2 text-cream-100/70">
                <PlayCircle className="h-3 w-3" /> {t('videos.eyebrow')}
              </p>
              <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-tighter">
                {t('videos.title1')}
                <br />
                <span className="text-terracotta-400">{t('videos.title2')}</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-cream-100/80 sm:text-[17px]">
                {t('videos.body')}
              </p>

              <div className="mt-6 grid max-w-md grid-cols-3 gap-3">
                <VideoStat top={videosQ.data ? String(videosQ.data.length) : '...'} bottom={t('common.videos')} />
                <VideoStat top={String(COOKING_CHANNELS.length)} bottom={t('common.channels')} />
                <VideoStat top={t('common.free')} bottom={t('common.freeAlways')} />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-cream-50/15 bg-cream-50/5 px-4 py-2 text-[12px] tracking-tight text-cream-100/80 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta-400" />
                  {videosQ.data ? t('videos.libraryReady') : t('videos.loadingLibrary')}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cream-50/15 bg-cream-50/5 px-4 py-2 text-[12px] tracking-tight text-cream-100/80 backdrop-blur-sm">
                  <Sparkles className="h-3 w-3" />
                  {t('videos.shuffledDaily')}
                </div>
              </div>
            </div>

            <div className="md:col-span-6">
              {videosQ.isLoading || !videosQ.data ? (
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-video animate-pulse rounded-2xl bg-cream-50/10" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {videosQ.data.slice(0, 4).map((r) => {
                    const poster = r.youtube ? youtubePoster(r.youtube) : null;
                    return (
                      <Link
                        key={r.id}
                        to={`/recipe/${r.id}`}
                        className="group relative block aspect-video overflow-hidden rounded-2xl bg-cream-50/5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-1"
                      >
                        <RecipeImage src={poster ?? r.image} alt={r.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                        <div className="absolute inset-0 grid place-items-center">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-50/90 text-ink-900 backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                            <Play className="ms-0.5 h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-2.5">
                          <p className="line-clamp-1 text-[11px] font-semibold tracking-tight text-cream-50">
                            {r.title}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -end-32 -top-32 h-96 w-96 rounded-full bg-terracotta-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -start-32 h-96 w-96 rounded-full bg-gold-500/12 blur-3xl" />
      </section>

      {/* RECIPE VIDEOS */}
      <section className="container-wide py-14 md:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow mb-3">{t('videos.todaysSelection')}</p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
              {t('videos.recipesWithVideo')}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => videosQ.refetch()}
            disabled={videosQ.isFetching}
            className="inline-flex items-center gap-2 rounded-full border border-ink-900 px-4 py-2 text-[13px] font-medium tracking-tight transition-colors hover:bg-ink-900 hover:text-cream-50 disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t('videos.shuffleLibrary')}
          </button>
        </div>

        {videosQ.isLoading && <VideoGridSkeleton />}
        {videosQ.isError && <ErrorState error={videosQ.error} onRetry={() => videosQ.refetch()} />}
        {videosQ.data && videosQ.data.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{t('videos.noVideos')}</h3>
            <p className="mt-2.5 text-sm tracking-tight text-ink-400">{t('videos.tryAgainSoon')}</p>
            <button type="button" onClick={() => videosQ.refetch()} className="btn-outline mt-6">
              {t('videos.reloadLibrary')}
            </button>
          </div>
        )}
        {videosQ.data && videosQ.data.length > 0 && (
          <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videosQ.data.map((r, i) => (
              <VideoCard key={r.id} recipe={r} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* COOKING CHANNELS */}
      <section className="border-t border-ink-100 bg-cream-100/50 py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-10 grid items-end gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <p className="eyebrow mb-3 inline-flex items-center gap-2">
                <Tv className="h-3 w-3 text-terracotta-500" /> {t('videos.channelsEyebrow')}
              </p>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                {t('videos.channelsTitle1')}
                <span className="text-terracotta-500"> {t('videos.channelsTitle2')}</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">
                {t('videos.channelsBody')}
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="grid grid-cols-3 gap-3">
                <ChannelStat top={String(COOKING_CHANNELS.length)} bottom={t('common.channels')} />
                <ChannelStat top="100%" bottom={t('common.free')} />
                <ChannelStat top="∞" bottom={t('videos.statHours')} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {COOKING_CHANNELS.map((c, i) => (
              <ChannelCard key={c.id} channel={c} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function VideoCard({ recipe, index }: { recipe: Recipe; index: number }) {
  const poster = recipe.youtube ? youtubePoster(recipe.youtube) : null;

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'backwards' }}
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink-900">
        <RecipeImage
          src={poster ?? recipe.image}
          alt={recipe.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-ink-900/10 to-ink-900/20 transition-colors group-hover:via-ink-900/0" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-cream-50/95 text-ink-900 shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:scale-110">
            <Play className="ms-0.5 h-5 w-5" fill="currentColor" strokeWidth={0} />
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-ink-400">
          {recipe.area && (
            <span className="inline-flex items-center gap-1">
              <Globe className="h-3 w-3" /> {recipe.area}
            </span>
          )}
          {recipe.area && recipe.category && <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />}
          {recipe.category && (
            <span className="inline-flex items-center gap-1">
              <Utensils className="h-3 w-3" /> {recipe.category}
            </span>
          )}
        </div>
        <h3 className="text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-terracotta-500 md:text-lg">
          {recipe.title}
        </h3>
      </div>
    </Link>
  );
}

function ChannelCard({ channel: c, index }: { channel: typeof COOKING_CHANNELS[number]; index: number }) {
  const { language } = useTranslation();
  const ar = CHANNEL_AR[c.id];

  const accentBg =
    c.accent === 'terracotta' ? 'bg-terracotta-50 text-terracotta-600'
    : c.accent === 'sage' ? 'bg-sage-50 text-sage-600'
    : c.accent === 'gold' ? 'bg-cream-200 text-gold-600'
    : 'bg-ink-50 text-ink-600';

  const vibeLabel = language === 'ar' && ar?.vibeLabel
    ? ar.vibeLabel
    : c.vibe === 'science' ? 'Cooking science'
    : c.vibe === 'baking' ? 'Baking'
    : c.vibe === 'budget' ? 'Budget cooking'
    : c.vibe === 'global' ? 'Global'
    : c.vibe === 'modern' ? 'Modern home cooking'
    : 'Classic';

  const blurb = language === 'ar' && ar?.blurb ? ar.blurb : c.blurb;

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
          <ChefHat className="h-4 w-4" strokeWidth={1.8} />
        </div>
        <ArrowUpRight className="h-4 w-4 text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-ink-400">{vibeLabel}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-terracotta-500 md:text-xl">
          {c.name}
        </h3>
        <p className="mt-0.5 text-[11px] tracking-tight text-ink-400">{c.handle}</p>
      </div>

      <p className="mt-auto text-sm leading-relaxed text-ink-600">{blurb}</p>

      <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-ink-400">
        <Tv className="h-3 w-3" /> Open on YouTube{/* link text intentionally English: it's a brand name */}
      </div>
    </a>
  );
}

function VideoStat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-2xl border border-cream-50/15 bg-cream-50/5 p-3 text-center backdrop-blur-sm">
      <p className="text-xl font-bold tracking-tighter text-cream-50 md:text-2xl">{top}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-cream-100/60">{bottom}</p>
    </div>
  );
}

function ChannelStat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-cream-50 p-3 text-center">
      <p className="text-xl font-bold tracking-tighter text-ink-900 md:text-2xl">{top}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-400">{bottom}</p>
    </div>
  );
}

function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-video rounded-2xl bg-cream-200" />
          <div className="mt-4 h-3 w-1/3 rounded-full bg-cream-200" />
          <div className="mt-3 h-5 w-5/6 rounded bg-cream-200" />
        </div>
      ))}
    </div>
  );
}
