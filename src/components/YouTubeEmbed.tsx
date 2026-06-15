import { useState } from 'react';
import { Play } from 'lucide-react';
import { useTranslation } from '../i18n';

interface Props {
  url: string;
  title: string;
  thumbnail?: string;
}

function extractVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return v;
      const parts = u.pathname.split('/');
      const embedIdx = parts.indexOf('embed');
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Lite YouTube embed: shows a poster + play button, defers the real iframe
 * until the user clicks. Saves bandwidth and avoids the YouTube cookie banner
 * on first load.
 */
export default function YouTubeEmbed({ url, title, thumbnail }: Props) {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(false);
  const videoId = extractVideoId(url);

  if (!videoId) return null;

  const poster = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-ink-900">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-ink-900/30 transition-colors group-hover:bg-ink-900/50" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-cream-50 text-ink-900 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-active:scale-95">
              <Play className="ms-1 h-8 w-8" fill="currentColor" strokeWidth={0} />
            </span>
          </div>
          <div className="absolute bottom-0 start-0 end-0 p-5 text-start md:p-7">
            <p className="text-[11px] uppercase tracking-widest text-cream-100/80">{t('recipe.watchTheRecipe')}</p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-cream-50 md:text-xl">{title}</p>
          </div>
        </button>
      )}
    </div>
  );
}
