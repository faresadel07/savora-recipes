import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Pause, Play, Shuffle, Sparkles, X } from 'lucide-react';
import { SHORT_CATEGORIES, SHORTS, type ShortCategory, type ShortVideo } from '../data/shorts-library';
import YouTubeShortPlayer from '../components/YouTubeShortPlayer';
import { useTranslation } from '../i18n';

type Filter = 'all' | ShortCategory;

const PAGE_SIZE = 24;

function useHeroStats() {
  const { t } = useTranslation();
  return [
    { value: `${SHORTS.length}`, label: t('shortsPage.statShorts') },
    { value: `${SHORT_CATEGORIES.length}`, label: t('shortsPage.statCategories') },
    { value: '9:16', label: t('shortsPage.statPortrait') },
    { value: '∞', label: t('shortsPage.statScroll') },
  ];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function ShortThumbCard({ short, onOpen }: { short: ShortVideo; onOpen: () => void }) {
  const cat = SHORT_CATEGORIES.find((c) => c.id === short.category);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl bg-ink-900 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]"
    >
      <img
        src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
        onError={(e) => {
          const t = e.currentTarget;
          if (!t.src.includes('mqdefault')) t.src = `https://img.youtube.com/vi/${short.id}/mqdefault.jpg`;
        }}
        alt=""
        loading="lazy"
        // YouTube hqdefault is 480x360. For 9:16 we center-crop with object-cover.
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent" />
      {cat && (
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-cream-50/90 px-2.5 py-1 text-[10px] font-medium tracking-tight text-ink-900 backdrop-blur">
          <span>{cat.emoji}</span>
          {cat.name}
        </span>
      )}
      <span className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-cream-50/90 text-ink-900 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
        <Play className="h-3.5 w-3.5 translate-x-0.5 fill-current" />
      </span>
    </button>
  );
}

interface PlayerModalProps {
  shorts: ShortVideo[];
  startIndex: number;
  onClose: () => void;
}

function PlayerModal({ shorts, startIndex, onClose }: PlayerModalProps) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(startIndex);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Lock the body scroll while the modal is open so the back-page does not
  // scroll behind us.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Track which short is in view so we only mount three iframes total
  // (current, next, previous). Anything further uses the still thumbnail.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            if (Number.isFinite(i)) setIndex(i);
          }
        }
      },
      { root, threshold: [0.5, 0.75] },
    );
    root.querySelectorAll<HTMLElement>('[data-index]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [shorts]);

  // Esc to close, arrow keys to navigate.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'j') {
        document.querySelector<HTMLElement>(`[data-index="${index + 1}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'k') {
        document.querySelector<HTMLElement>(`[data-index="${index - 1}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onClose]);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(`[data-index="${startIndex}"]`);
    el?.scrollIntoView({ block: 'start' });
  }, [startIndex]);

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-ink-900/95 backdrop-blur-md">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream-50/90 text-ink-900 backdrop-blur transition-colors hover:bg-cream-50"
        aria-label={t('shortsPage.close')}
      >
        <X className="h-4 w-4" />
      </button>

      <div
        ref={containerRef}
        className="hide-scrollbar h-full w-full snap-y snap-mandatory overflow-y-auto"
      >
        {shorts.map((s, i) => {
          const distance = Math.abs(i - index);
          const showIframe = distance <= 1;
          return (
            <div
              key={`${s.id}-${i}`}
              data-index={i}
              className="flex h-full w-full snap-start items-center justify-center px-2 py-4 md:px-6"
            >
              <YouTubeShortPlayer
                key={s.id}
                videoId={s.id}
                active={showIframe && i === index}
                className="aspect-[9/16] h-full max-h-[88vh] w-auto max-w-full rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              />
              {!(showIframe && i === index) && distance > 1 && null}
            </div>
          );
        })}
      </div>

      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] tracking-tight text-cream-100/60">
        {t('shortsPage.indexOf', { i: index + 1, n: shorts.length })}
      </p>
    </div>
  );
}

export default function ShortsLibraryPage() {
  const { t } = useTranslation();
  const HERO_STATS = useHeroStats();
  const [filter, setFilter] = useState<Filter>('all');
  const [shuffled, setShuffled] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE * 2);
  const [playerStart, setPlayerStart] = useState<number | null>(null);

  // The full deck filtered by current category. We do a shuffle on demand;
  // a stable order otherwise so the list does not jump on every re-render.
  const deck = useMemo(() => {
    const list = filter === 'all' ? SHORTS : SHORTS.filter((s) => s.category === filter);
    return shuffled ? shuffle(list) : list;
  }, [filter, shuffled]);

  // Reset visible window when the deck changes.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE * 2);
  }, [filter, shuffled]);

  // Infinite scroll: load more when the sentinel near the bottom is in view.
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisibleCount((c) => Math.min(deck.length, c + PAGE_SIZE));
          }
        }
      },
      { rootMargin: '600px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [deck.length]);

  const visible = deck.slice(0, visibleCount);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-cream-50 pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="container-wide relative z-10">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tighter text-ink-900">
                {t('shortsPage.title1')}
                <br />
                <span className="text-gold-600">{t('shortsPage.title2', { n: SHORTS.length.toLocaleString() })}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
                {t('shortsPage.body')}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShuffled(true);
                    setPlayerStart(0);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
                >
                  <Shuffle className="h-3.5 w-3.5" />
                  {t('shortsPage.ctaRandomFeed')}
                </button>
                <button
                  type="button"
                  onClick={() => setShuffled((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {shuffled ? t('shortsPage.ctaSortByCategory') : t('shortsPage.ctaShuffle')}
                </button>
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
                {deck.slice(0, 4).map((s, i) => (
                  <button
                    key={`${s.id}-hero-${i}`}
                    type="button"
                    onClick={() => setPlayerStart(i)}
                    className="group relative block aspect-[9/16] overflow-hidden rounded-2xl bg-ink-900 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${s.id}/hqdefault.jpg`}
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (!t.src.includes('mqdefault')) t.src = `https://img.youtube.com/vi/${s.id}/mqdefault.jpg`;
                      }}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
                    <span className="absolute inset-0 grid place-items-center text-cream-50/95 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-10 w-10 fill-current" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-terracotta-500/15 blur-3xl" />
      </section>

      {/* ============ CATEGORY FILTER ============ */}
      <section className="sticky top-[72px] z-20 border-y border-ink-100 bg-cream-50/95 backdrop-blur-md md:top-[80px]">
        <div className="container-wide overflow-x-auto py-3">
          <div className="hide-scrollbar flex w-max items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                filter === 'all'
                  ? 'border-ink-900 bg-ink-900 text-cream-50'
                  : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
              }`}
            >
              {t('shortsPage.allCount', { n: SHORTS.length.toLocaleString() })}
            </button>
            {SHORT_CATEGORIES.map((c) => {
              const count = SHORTS.filter((s) => s.category === c.id).length;
              if (count === 0) return null;
              const isActive = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilter(c.id)}
                  className={`inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-[12px] font-medium tracking-tight transition-colors ${
                    isActive
                      ? 'border-ink-900 bg-ink-900 text-cream-50'
                      : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                  }`}
                >
                  <span>{c.emoji}</span>
                  {c.name}
                  <span className={`text-[11px] ${isActive ? 'text-cream-100/60' : 'text-ink-400'}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ GRID ============ */}
      <section className="container-wide py-10 md:py-14">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {visible.map((s, i) => (
            <ShortThumbCard key={`${s.id}-${i}`} short={s} onOpen={() => setPlayerStart(i)} />
          ))}
        </div>

        {visibleCount < deck.length && (
          <div ref={sentinelRef} className="mt-8 grid place-items-center py-6 text-sm tracking-tight text-ink-400">
            {t('shortsPage.loadingMore')}
          </div>
        )}

        {visibleCount >= deck.length && deck.length > 0 && (
          <p className="mt-10 text-center text-sm tracking-tight text-ink-400">
            {filter === 'all'
              ? t('shortsPage.endOfFeedAll')
              : t('shortsPage.endOfFeed', { name: SHORT_CATEGORIES.find((c) => c.id === filter)?.name ?? '' })}
          </p>
        )}

        {deck.length === 0 && (
          <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
            <p className="text-base text-ink-600">{t('shortsPage.emptyCategory')}</p>
          </div>
        )}
      </section>

      {/* ============ CLOSING ============ */}
      <section className="container-wide pb-16 pt-4">
        <div className="overflow-hidden rounded-3xl bg-ink-900 px-7 py-12 text-center text-cream-50 md:px-16 md:py-16">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500/25 text-gold-400">
            <Pause className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mx-auto mt-6 max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">
            {t('shortsPage.closingTitle')}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-100/70 md:text-base">
            {t('shortsPage.closingBody')}
          </p>
          <Link
            to="/recipes"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-gold-400"
          >
            {t('shortsPage.closingCta')}
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>

      {playerStart !== null && (
        <PlayerModal shorts={visible} startIndex={playerStart} onClose={() => setPlayerStart(null)} />
      )}
    </div>
  );
}
