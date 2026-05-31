import { useEffect, useState } from 'react';
import { Download, WifiOff, X } from 'lucide-react';
import { useTranslation } from '../i18n';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'savora:install-dismissed:v1';

export default function InstallPrompt() {
  const { language } = useTranslation();
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [offline, setOffline] = useState(typeof navigator !== 'undefined' && !navigator.onLine);

  useEffect(() => {
    function onBeforeInstall(e: Event) {
      e.preventDefault();
      const stored = localStorage.getItem(DISMISS_KEY);
      // Honor the user's "not now" for 7 days.
      if (stored && Date.now() - Number(stored) < 7 * 24 * 60 * 60 * 1000) return;
      setEvent(e as BeforeInstallPromptEvent);
      setVisible(true);
    }
    function onOnline() { setOffline(false); }
    function onOffline() { setOffline(true); }

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  async function install() {
    if (!event) return;
    await event.prompt();
    await event.userChoice;
    setEvent(null);
    setVisible(false);
  }

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  }

  return (
    <>
      {/* Offline indicator: small pill that floats top */}
      {offline && (
        <div className="fixed left-1/2 top-3 z-50 -translate-x-1/2 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-[12px] font-medium tracking-tight text-cream-50 shadow-2xl">
            <WifiOff className="h-3.5 w-3.5" />
            {language === 'ar' ? 'بدون نت — تشتغل من الذاكرة' : 'Offline — running from cache'}
          </div>
        </div>
      )}

      {/* Install prompt */}
      {visible && event && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-fade-up">
          <div className="overflow-hidden rounded-2xl bg-ink-900 text-cream-50 shadow-2xl">
            <div className="flex items-start gap-3 p-4">
              <div className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-terracotta-500">
                <Download className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold tracking-tight">
                  {language === 'ar' ? 'ثبّت زيتون على جهازك' : 'Install Zaytoun'}
                </p>
                <p className="mt-0.5 text-[12px] text-cream-100/70">
                  {language === 'ar'
                    ? 'تجربة كأبليكيشن حقيقي. تشتغل بدون نت.'
                    : 'App-like experience. Works offline.'}
                </p>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="grid h-7 w-7 flex-none place-items-center rounded-full text-cream-100/60 hover:bg-cream-50/10 hover:text-cream-50"
                aria-label={language === 'ar' ? 'إغلاق' : 'Dismiss'}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={install}
              className="flex w-full items-center justify-center gap-2 bg-terracotta-500 py-2.5 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-600"
            >
              <Download className="h-3.5 w-3.5" />
              {language === 'ar' ? 'ثبّت الآن' : 'Install now'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
