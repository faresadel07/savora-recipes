import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ChefHat,
  Clock,
  Film,
  GraduationCap,
  Languages,
  Lightbulb,
  MapPin,
  Mic,
  Search,
  Sparkles,
  Star,
  Utensils,
  X,
  type LucideIcon,
} from 'lucide-react';
import { containsArabic, expandEnglishSynonyms, translateQuery, translationLabel } from '../lib/search-i18n';
import {
  loadUniversalIndex,
  searchUniversal,
  suggestClosest,
  SUGGESTED_QUERIES,
  type GroupedResults,
  type SearchResultType,
  type UniversalResult,
} from '../lib/universal-search';

const RECENT_KEY = 'zaytoun:search:recent';

const TYPE_META: Record<SearchResultType, { label: string; icon: LucideIcon }> = {
  recipe: { label: 'Recipes', icon: Utensils },
  'arab-dish': { label: 'Arab Cuisine', icon: Star },
  film: { label: 'Films', icon: Film },
  chef: { label: 'Chefs', icon: ChefHat },
  skill: { label: 'Skills', icon: GraduationCap },
  market: { label: 'Markets', icon: MapPin },
};

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: (translatedQuery: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  variant?: 'default' | 'large' | 'header';
  onClose?: () => void;
}

function loadRecent(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.slice(0, 8) : [];
  } catch {
    return [];
  }
}

function pushRecent(q: string) {
  if (typeof window === 'undefined' || !q.trim()) return;
  try {
    const cur = loadRecent();
    const next = [q, ...cur.filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, 8);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

function clearRecent() {
  try {
    localStorage.removeItem(RECENT_KEY);
  } catch {
    /* ignore */
  }
}

interface VoiceState {
  supported: boolean;
  active: boolean;
}

export default function SmartSearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search recipes, chefs, films',
  autoFocus,
  variant = 'default',
  onClose,
}: Props) {
  const [open, setOpen] = useState(false);
  const [debounced, setDebounced] = useState(value);
  const [cacheReady, setCacheReady] = useState(false);
  const [recent, setRecent] = useState<string[]>(() => loadRecent());
  const [voice, setVoice] = useState<VoiceState>(() => {
    const supported =
      typeof window !== 'undefined' &&
      !!((window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition);
    return { supported, active: false };
  });
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<unknown>(null);

  // Lazy-load the universal Fuse index the first time the user focuses the
  // search field, not on app boot.
  function ensureCache() {
    if (cacheReady) return;
    void loadUniversalIndex().then(() => setCacheReady(true));
  }

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), 140);
    return () => window.clearTimeout(id);
  }, [value]);

  const translated = useMemo(() => translateQuery(debounced.trim()), [debounced]);
  const expanded = useMemo(() => expandEnglishSynonyms(translated || debounced.trim()), [translated, debounced]);
  const arabicHint = useMemo(() => translationLabel(value.trim()), [value]);

  const grouped = useMemo<GroupedResults | null>(() => {
    if (!cacheReady) return null;
    const q = expanded;
    if (!q || q.length < 2) return null;
    return searchUniversal(q, 3);
  }, [cacheReady, expanded]);

  const didYouMean = useMemo<UniversalResult | null>(() => {
    if (!cacheReady) return null;
    if (!debounced.trim() || debounced.trim().length < 2) return null;
    if (grouped && grouped.total > 0) return null;
    return suggestClosest(expanded);
  }, [cacheReady, grouped, expanded, debounced]);

  function handleSubmit(q: string) {
    const finalQ = translateQuery(q.trim());
    if (!finalQ) return;
    pushRecent(q.trim());
    setRecent(loadRecent());
    setOpen(false);
    onClose?.();
    if (onSubmit) onSubmit(finalQ);
    else navigate(`/recipes?q=${encodeURIComponent(finalQ)}`);
  }

  function navigateToResult(r: UniversalResult) {
    pushRecent(value.trim() || r.title);
    setRecent(loadRecent());
    setOpen(false);
    onClose?.();
    navigate(r.href);
  }

  function startVoice() {
    if (!voice.supported || voice.active) return;
    type SR = {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      onresult: ((ev: { results: { 0: { 0: { transcript: string } } } & { length: number } }) => void) | null;
      onerror: (() => void) | null;
      onend: (() => void) | null;
      start: () => void;
      stop: () => void;
    };
    const Ctor =
      (window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SR }).webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = containsArabic(value) || document.documentElement.lang === 'ar' ? 'ar-JO' : 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (ev) => {
      const transcript = ev.results[0][0].transcript;
      onChange(transcript);
      setOpen(true);
    };
    rec.onend = () => setVoice((v) => ({ ...v, active: false }));
    rec.onerror = () => setVoice((v) => ({ ...v, active: false }));
    recognitionRef.current = rec;
    rec.start();
    setVoice((v) => ({ ...v, active: true }));
  }

  function stopVoice() {
    const rec = recognitionRef.current as { stop: () => void } | null;
    if (rec?.stop) rec.stop();
    setVoice((v) => ({ ...v, active: false }));
  }

  const isLarge = variant === 'large';

  const inputClass = isLarge
    ? 'w-full bg-transparent text-lg font-medium tracking-tight placeholder:text-ink-400/70 focus:outline-none md:text-2xl'
    : variant === 'header'
    ? 'flex-1 bg-transparent text-base tracking-tight placeholder:text-ink-400 focus:outline-none md:text-lg'
    : 'flex-1 bg-transparent py-1 text-[15px] placeholder:text-ink-400 focus:outline-none';

  const dropdownVisible = open;
  const showEmptyState = dropdownVisible && (!value || value.trim().length < 2);
  const showResults = dropdownVisible && grouped && grouped.total > 0;
  const showDidYouMean = dropdownVisible && didYouMean && (!grouped || grouped.total === 0) && value.trim().length >= 2;

  return (
    <div ref={wrapRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(value);
        }}
        className={`flex items-center gap-3 ${isLarge ? 'border-b border-ink-900 pb-2.5' : ''}`}
      >
        <Search className={`flex-none text-ink-400 ${isLarge ? 'h-5 w-5' : 'h-4 w-4'}`} strokeWidth={1.8} />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            ensureCache();
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false);
              inputRef.current?.blur();
            }
          }}
          autoFocus={autoFocus}
          placeholder={placeholder}
          dir="auto"
          autoComplete="off"
          spellCheck={false}
          className={inputClass}
          aria-expanded={dropdownVisible}
        />

        {voice.supported && (
          <button
            type="button"
            onClick={voice.active ? stopVoice : startVoice}
            aria-label={voice.active ? 'Stop voice search' : 'Voice search'}
            title={voice.active ? 'Listening, click to stop' : 'Voice search'}
            className={`flex-none rounded-full p-1.5 transition-colors ${
              voice.active ? 'bg-terracotta-500 text-cream-50' : 'text-ink-400 hover:text-ink-900'
            }`}
          >
            <Mic className={`${voice.active ? 'animate-pulse' : ''} ${isLarge ? 'h-5 w-5' : 'h-4 w-4'}`} strokeWidth={1.8} />
          </button>
        )}

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="flex-none rounded-full p-1 text-ink-400 hover:text-ink-900"
            aria-label="Clear search"
          >
            <X className={isLarge ? 'h-5 w-5' : 'h-4 w-4'} />
          </button>
        )}

        {isLarge && (
          <button type="submit" className="btn-primary !py-2 !px-5">
            Search
          </button>
        )}
      </form>

      {arabicHint && value.trim().length > 0 && (
        <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] tracking-tight text-ink-500">
          <Languages className="h-3.5 w-3.5" />
          Searching as
          <span className="rounded-full bg-cream-100 px-2 py-0.5 font-medium text-ink-900">{arabicHint}</span>
        </p>
      )}

      {dropdownVisible && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.22)]"
        >
          <div className="max-h-[460px] overflow-y-auto">
            {/* EMPTY STATE: recent + suggested */}
            {showEmptyState && (
              <div className="p-4">
                {recent.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-400">
                        <Clock className="h-3 w-3" /> Recent
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          clearRecent();
                          setRecent([]);
                        }}
                        className="text-[11px] tracking-tight text-ink-400 hover:text-ink-900"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {recent.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => {
                            onChange(r);
                            setOpen(true);
                            inputRef.current?.focus();
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-cream-50 px-3 py-1.5 text-[12px] font-medium tracking-tight text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-400">
                    <Sparkles className="h-3 w-3" /> Try
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {SUGGESTED_QUERIES.map((s) => (
                      <button
                        key={s.en}
                        type="button"
                        onClick={() => {
                          onChange(s.en);
                          setOpen(true);
                          inputRef.current?.focus();
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1.5 text-[12px] font-medium tracking-tight text-ink-700 transition-colors hover:bg-ink-900 hover:text-cream-50"
                      >
                        {s.en} <span className="text-ink-400">{s.ar}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DID YOU MEAN */}
            {showDidYouMean && didYouMean && (
              <div className="p-4">
                <div className="rounded-2xl border border-gold-500/30 bg-gold-500/10 p-4">
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gold-700">
                    <Lightbulb className="h-3 w-3" /> Did you mean?
                  </p>
                  <button
                    type="button"
                    onClick={() => navigateToResult(didYouMean)}
                    className="mt-3 flex w-full items-center gap-3 rounded-xl bg-cream-50 p-3 text-left transition-colors hover:bg-cream-100"
                  >
                    <div className="relative h-10 w-10 flex-none overflow-hidden rounded-lg bg-cream-200">
                      {didYouMean.image && (
                        <img
                          src={didYouMean.image}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold tracking-tight text-ink-900">{didYouMean.title}</p>
                      {didYouMean.subtitle && (
                        <p className="truncate text-[11px] tracking-tight text-ink-500">{didYouMean.subtitle}</p>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* GROUPED RESULTS */}
            {showResults && grouped && (
              <div className="py-2">
                {(
                  [
                    ['recipes', grouped.recipes],
                    ['arab', grouped.arab],
                    ['films', grouped.films],
                    ['chefs', grouped.chefs],
                    ['skills', grouped.skills],
                    ['markets', grouped.markets],
                  ] as const
                ).map(([key, items]) => {
                  if (items.length === 0) return null;
                  const meta = TYPE_META[items[0].type];
                  const Icon = meta.icon;
                  return (
                    <div key={key} className="mb-1">
                      <p className="px-4 pt-2 pb-1 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-ink-400">
                        <Icon className="h-3 w-3" />
                        {meta.label}
                        <span className="text-ink-300">·</span>
                        <span className="font-normal normal-case tracking-tight">{items.length}</span>
                      </p>
                      <ul>
                        {items.map((r) => (
                          <li key={`${r.type}-${r.id}`}>
                            <button
                              type="button"
                              onClick={() => navigateToResult(r)}
                              className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-ink-50"
                            >
                              <div className="relative h-10 w-10 flex-none overflow-hidden rounded-lg bg-cream-200">
                                {r.image && (
                                  <img
                                    src={r.image}
                                    alt=""
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover"
                                    onError={(e) => {
                                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium tracking-tight text-ink-900">{r.title}</p>
                                {r.subtitle && (
                                  <p className="truncate text-[11px] tracking-tight text-ink-400">{r.subtitle}</p>
                                )}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {(showResults || (showDidYouMean && !showResults)) && (
            <button
              type="button"
              onClick={() => handleSubmit(value)}
              className="block w-full border-t border-ink-100 bg-cream-100/60 px-4 py-2.5 text-left text-[12px] font-medium tracking-tight text-ink-700 transition-colors hover:bg-ink-100"
            >
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="h-3 w-3" />
                See all recipe results for{' '}
                <span className="font-semibold text-ink-900">{expanded || value}</span>
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
