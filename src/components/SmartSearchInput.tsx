import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { Languages, Search, X } from 'lucide-react';
import { containsArabic, translateQuery, translationLabel } from '../lib/search-i18n';
import RecipeImage from './RecipeImage';

interface RawMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
}

interface CacheShape {
  meals: RawMeal[];
}

interface Suggestion {
  id: string;
  title: string;
  image: string;
  meta?: string;
}

let cachedFuse: Fuse<Suggestion> | null = null;
let cachedSuggestions: Suggestion[] = [];
let loadPromise: Promise<void> | null = null;

const FUSE_OPTS: IFuseOptions<Suggestion> = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'meta', weight: 0.2 },
    { name: 'id', weight: 0.1 },
  ],
  threshold: 0.4,
  minMatchCharLength: 2,
  ignoreLocation: true,
  includeScore: false,
};

function loadCache(): Promise<void> {
  if (cachedFuse) return Promise.resolve();
  if (!loadPromise) {
    loadPromise = import('../data/mealdb-cache.json').then((m) => {
      const shape = m.default as CacheShape;
      cachedSuggestions = shape.meals.map((r) => ({
        id: r.idMeal,
        title: r.strMeal,
        image: r.strMealThumb,
        meta: [r.strArea, r.strCategory].filter(Boolean).join(' · '),
      }));
      cachedFuse = new Fuse(cachedSuggestions, FUSE_OPTS);
    });
  }
  return loadPromise;
}

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: (translatedQuery: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  variant?: 'default' | 'large' | 'header';
  onClose?: () => void;
}

/**
 * One search input that does three things at once: fuzzy match against the
 * local recipe cache via Fuse.js (typo tolerance), translate Arabic terms
 * to English on the fly, and show suggestions inline as the user types.
 */
export default function SmartSearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search recipes',
  autoFocus,
  variant = 'default',
  onClose,
}: Props) {
  const [open, setOpen] = useState(false);
  const [debounced, setDebounced] = useState(value);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [cacheReady, setCacheReady] = useState(Boolean(cachedFuse));
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Eagerly trigger the cache load on first focus, not on every input change.
  function ensureCache() {
    if (!cachedFuse) {
      void loadCache().then(() => setCacheReady(true));
    }
  }

  // Click outside closes the dropdown.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // Debounce input by 140ms so we don't fuse-search on every keystroke.
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), 140);
    return () => window.clearTimeout(id);
  }, [value]);

  const translated = useMemo(() => translateQuery(debounced.trim()), [debounced]);
  const arabicLabel = useMemo(() => translationLabel(value.trim()), [value]);

  const suggestions = useMemo<Suggestion[]>(() => {
    if (!cacheReady || !cachedFuse) return [];
    const query = translated || debounced;
    if (!query || query.length < 2) return [];
    const hits = cachedFuse.search(query, { limit: 7 });
    return hits.map((h) => h.item);
  }, [cacheReady, translated, debounced]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  function handleSubmit(q: string) {
    const finalQ = translateQuery(q.trim());
    if (!finalQ) return;
    setOpen(false);
    onClose?.();
    if (onSubmit) onSubmit(finalQ);
    else navigate(`/recipes?q=${encodeURIComponent(finalQ)}`);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(suggestions.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(-1, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        const s = suggestions[activeIndex];
        setOpen(false);
        onClose?.();
        navigate(`/recipe/mdb-${s.id}`);
      } else {
        handleSubmit(value);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  const isLarge = variant === 'large';
  const isHeader = variant === 'header';

  const inputClass = isLarge
    ? 'w-full bg-transparent text-lg font-medium tracking-tight placeholder:text-ink-400/70 focus:outline-none md:text-2xl'
    : isHeader
    ? 'flex-1 bg-transparent text-base tracking-tight placeholder:text-ink-400 focus:outline-none md:text-lg'
    : 'flex-1 bg-transparent py-1 text-[15px] placeholder:text-ink-400 focus:outline-none';

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
          onKeyDown={handleKey}
          autoFocus={autoFocus}
          placeholder={placeholder}
          dir="auto"
          autoComplete="off"
          spellCheck={false}
          className={inputClass}
          aria-autocomplete="list"
          aria-expanded={open && suggestions.length > 0}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="rounded-full p-1 text-ink-400 hover:text-ink-900"
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

      {/* Arabic translation hint */}
      {arabicLabel && value.trim().length > 0 && (
        <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] tracking-tight text-ink-500">
          <Languages className="h-3.5 w-3.5" />
          {containsArabic(value) ? (
            <>
              <span>Searching as</span>
              <span className="rounded-full bg-cream-100 px-2 py-0.5 font-medium text-ink-900">{arabicLabel}</span>
            </>
          ) : null}
        </p>
      )}

      {open && suggestions.length > 0 && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.22)]"
        >
          <ul className="max-h-[420px] overflow-y-auto py-2">
            {suggestions.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={s.id} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => {
                      setOpen(false);
                      onClose?.();
                      navigate(`/recipe/mdb-${s.id}`);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      isActive ? 'bg-ink-100' : 'hover:bg-ink-50'
                    }`}
                  >
                    <div className="relative h-10 w-10 flex-none overflow-hidden rounded-lg bg-cream-200">
                      <RecipeImage src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium tracking-tight text-ink-900">{s.title}</p>
                      {s.meta && (
                        <p className="truncate text-[11px] tracking-tight text-ink-400">{s.meta}</p>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => handleSubmit(value)}
            className="block w-full border-t border-ink-100 bg-cream-100/60 px-4 py-2.5 text-left text-[12px] font-medium tracking-tight text-ink-700 transition-colors hover:bg-ink-100"
          >
            See all results for{' '}
            <span className="font-semibold text-ink-900">
              {translateQuery(value.trim()) || value}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
