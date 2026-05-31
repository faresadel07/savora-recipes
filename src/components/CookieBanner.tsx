import { useEffect, useState } from 'react';
import { Check, Cookie } from 'lucide-react';

const STORAGE_KEY = 'zaytoun:cookies:accepted';

/**
 * Minimal, editorial cookie banner. Zaytoun stores preferences (theme,
 * favorites, learning progress, newsletter email) in localStorage only, and
 * does not load any third-party tracking. The banner therefore exists more
 * as a courteous notice than as a real consent gate. It shows once, persists
 * the acknowledgement, and slides up on first visit.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      /* private mode etc. — fall through and show */
    }
    // Tiny delay so the banner does not race the page paint.
    const t = window.setTimeout(() => {
      setMounted(true);
      // Two frames later, animate in.
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, 600);
    return () => window.clearTimeout(t);
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
    window.setTimeout(() => setMounted(false), 350);
  }

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      className={`pointer-events-none fixed inset-x-3 bottom-3 z-[60] flex justify-center transition-all duration-300 md:inset-x-auto md:right-6 md:bottom-6 md:justify-end ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-ink-100 bg-cream-50 px-5 py-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)] backdrop-blur md:px-6 md:py-5">
        <div className="flex items-start gap-3.5">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gold-500/15 text-gold-700">
            <Cookie className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold tracking-tight text-ink-900">A small note on cookies</p>
            <p className="mt-1.5 text-[13px] leading-relaxed tracking-tight text-ink-600">
              Zaytoun stores your theme, favorites, and learning progress on this
              device. No third-party tracking, no analytics, no ads.
            </p>
            <div className="mt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={accept}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-[12px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
