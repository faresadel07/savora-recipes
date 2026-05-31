import { useEffect, useState } from 'react';
import { translations, type Translations } from './translations';

export type Language = 'en' | 'ar';

const STORAGE_KEY = 'savora:language:v1';

type Listener = (lang: Language) => void;
const listeners = new Set<Listener>();

function readInitial(): Language {
  if (typeof window === 'undefined') return 'en';
  // Arabic UI toggle is temporarily hidden because recipe content from the
  // public APIs is still English-only. Force English so anyone who picked
  // Arabic earlier doesn't get stuck with a half-translated experience.
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === 'ar') localStorage.removeItem(STORAGE_KEY);
  if (stored === 'en') return stored;
  return 'en';
}

function applyToDocument(lang: Language) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

let currentLanguage: Language = readInitial();
if (typeof window !== 'undefined') applyToDocument(currentLanguage);

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  applyToDocument(lang);
  listeners.forEach((l) => l(lang));
}

export function getLanguage(): Language {
  return currentLanguage;
}

export function useLanguage() {
  const [lang, setLang] = useState<Language>(currentLanguage);
  useEffect(() => {
    const fn = (l: Language) => setLang(l);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  return {
    language: lang,
    setLanguage,
    toggle: () => setLanguage(lang === 'ar' ? 'en' : 'ar'),
    isRtl: lang === 'ar',
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function lookup(obj: any, path: string): any {
  return path.split('.').reduce((acc, p) => (acc == null ? undefined : acc[p]), obj);
}

function interpolate(text: string, vars?: Record<string, string | number>): string {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

/**
 * Translation hook. `t('home.heroBody')` looks up the current language's
 * tree. Falls back to English, then to the key itself.
 */
export function useTranslation() {
  const { language, setLanguage, toggle, isRtl } = useLanguage();

  function t(key: string, vars?: Record<string, string | number>): string {
    const value = lookup(translations[language], key) ?? lookup(translations.en, key);
    if (typeof value === 'string') return interpolate(value, vars);
    if (Array.isArray(value)) return value.join(' ');
    return key;
  }

  function tArray(key: string): string[] {
    const value = lookup(translations[language], key) ?? lookup(translations.en, key);
    return Array.isArray(value) ? value : [];
  }

  function tObject<T = Translations>(key: string): T | undefined {
    return lookup(translations[language], key) as T | undefined;
  }

  return { t, tArray, tObject, language, setLanguage, toggle, isRtl };
}
