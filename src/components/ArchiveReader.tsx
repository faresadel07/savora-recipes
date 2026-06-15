import { useState } from 'react';
import { BookOpen, ExternalLink, Maximize2, X } from 'lucide-react';
import { useTranslation } from '../i18n';

interface Props {
  embedUrl: string;
  detailUrl: string;
  title: string;
}

/**
 * Lite Internet Archive BookReader embed. Renders a "Read inside" button up
 * front; only injects the (heavy) iframe once the user opts in. Includes a
 * fullscreen modal for distraction-free reading.
 */
export default function ArchiveReader({ embedUrl, detailUrl, title }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  if (!open) {
    return (
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-[12px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
        >
          <BookOpen className="h-3.5 w-3.5" />
          {t('magazines.readInside')}
        </button>
        <a
          href={detailUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-cream-50 px-4 py-2 text-[12px] font-medium tracking-tight text-ink-700 transition-colors hover:border-ink-900"
        >
          {t('magazines.archivePage')}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 overflow-hidden rounded-2xl border border-ink-100 bg-ink-900">
        <div className="flex items-center justify-between gap-2 border-b border-ink-100/10 bg-cream-50 px-4 py-2.5">
          <p className="truncate text-[12px] font-medium tracking-tight text-ink-700">{title}</p>
          <div className="flex flex-none items-center gap-1">
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="grid h-7 w-7 place-items-center rounded-full text-ink-600 transition-colors hover:bg-ink-900 hover:text-cream-50"
              aria-label={t('common.openFullscreen')}
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-full text-ink-600 transition-colors hover:bg-ink-900 hover:text-cream-50"
              aria-label={t('common.closeReader')}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="fullscreen"
          className="h-[480px] w-full md:h-[560px]"
        />
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/85 p-4 backdrop-blur-sm md:p-8" role="dialog" aria-modal="true">
          <div className="relative h-full w-full max-w-6xl overflow-hidden rounded-3xl bg-ink-900">
            <div className="absolute end-3 top-3 z-10 flex items-center gap-1">
              <a
                href={detailUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-cream-50/90 px-3 py-1.5 text-[11px] font-medium tracking-tight text-ink-900 backdrop-blur-md transition-colors hover:bg-cream-50"
              >
                {t('magazines.archivePage')}
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                type="button"
                onClick={() => setFullscreen(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-cream-50/90 text-ink-900 backdrop-blur-md transition-colors hover:bg-cream-50"
                aria-label={t('common.closeFullscreen')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <iframe
              src={embedUrl}
              title={title}
              allow="fullscreen"
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
