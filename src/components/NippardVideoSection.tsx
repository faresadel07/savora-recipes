import { useMemo, useState } from 'react';
import { Clock, ExternalLink, Play, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n';
import {
  NIPPARD_CATEGORY_LABEL_AR,
  NIPPARD_CATEGORY_LABEL_EN,
  NIPPARD_VIDEOS,
  type NippardCategory,
  type NippardVideo,
} from '../data/nippard-videos';

const CATEGORIES: NippardCategory[] = ['push', 'pull', 'legs', 'full-body', 'warmup', 'best'];

export default function NippardVideoSection() {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  const [tab, setTab] = useState<NippardCategory>('full-body');
  const [openVideo, setOpenVideo] = useState<NippardVideo | null>(null);

  const filtered = useMemo(() => NIPPARD_VIDEOS.filter((v) => v.category === tab), [tab]);

  return (
    <section id="nippard" className="border-y border-ink-100 bg-cream-100/40 py-16 md:py-24">
      <div className="container-wide">
        <div className="mb-8">
          <p className="eyebrow mb-3 inline-flex items-center gap-2">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            {isAr ? 'منهجية علمية' : 'Science-based methodology'}
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
            {isAr ? '12 فيديو من Jeff Nippard.' : '12 Jeff Nippard videos, hand picked.'}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500 md:text-base">
            {isAr
              ? 'أكثر مدرب هايبرتروفي علمي شهرة بالإنترنت. كل فيديو مختار بعناية ليغطي جانباً من منهجيته: من حجم العضلات الأسبوعي إلى اختيار التمارين إلى تقنية كل رفعة.'
              : 'The most popular science-based hypertrophy coach online. Each video is curated to cover a piece of his methodology: weekly muscle volume, exercise selection, lift technique.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setTab(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium tracking-tight transition-colors ${
                tab === cat
                  ? 'border-ink-900 bg-ink-900 text-cream-50'
                  : 'border-ink-100 bg-cream-50 text-ink-700 hover:border-ink-300'
              }`}
            >
              {isAr ? NIPPARD_CATEGORY_LABEL_AR[cat] : NIPPARD_CATEGORY_LABEL_EN[cat]}
            </button>
          ))}
        </div>

        {/* Video cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((v) => (
            <VideoCard key={v.id} video={v} isAr={isAr} onOpen={() => setOpenVideo(v)} />
          ))}
        </div>

        <p className="mt-8 text-xs text-ink-500">
          <a href="https://www.youtube.com/@JeffNippard" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
            {isAr ? 'القناة الرسمية لـ Jeff Nippard' : "Visit Jeff Nippard's channel"}
            <ExternalLink className="h-3 w-3" strokeWidth={2} />
          </a>
        </p>
      </div>

      {openVideo && <VideoModal video={openVideo} isAr={isAr} onClose={() => setOpenVideo(null)} />}
    </section>
  );
}

function VideoCard({ video, isAr, onOpen }: { video: NippardVideo; isAr: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 text-start transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-ink-900">
        <img
          src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-ink-900/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-cream-50 text-ink-900">
            <Play className="h-5 w-5 translate-x-0.5 fill-current" strokeWidth={1.5} />
          </div>
        </div>
        <span className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink-900/90 px-2.5 py-1 text-[10px] font-medium text-cream-50 backdrop-blur">
          <Clock className="h-3 w-3" strokeWidth={2} />
          {video.duration}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight text-ink-900 group-hover:text-terracotta-500">
          {isAr ? video.titleAr : video.title}
        </h3>
        <p className="line-clamp-3 text-xs leading-relaxed text-ink-500">
          {isAr ? video.blurbAr : video.blurb}
        </p>
      </div>
    </button>
  );
}

function VideoModal({ video, isAr, onClose }: { video: NippardVideo; isAr: boolean; onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-ink-900/95 p-4 backdrop-blur-md">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl">
        <div className="aspect-video overflow-hidden rounded-2xl bg-ink-900">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        <div className="mt-4 rounded-2xl bg-cream-50 p-5">
          <h3 className="text-lg font-semibold tracking-tighter text-ink-900">
            {isAr ? video.titleAr : video.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            {isAr ? video.blurbAr : video.blurb}
          </p>
          <button type="button" onClick={onClose} className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-100 px-4 py-2 text-xs font-medium text-ink-700 hover:border-ink-300">
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
