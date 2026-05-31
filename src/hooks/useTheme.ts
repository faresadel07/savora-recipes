import { useCallback, useState } from 'react';

export type Theme = 'light' | 'dark';

const KEY = 'savora:theme:v1';

function resolveInitial(): Theme {
  if (typeof window === 'undefined') return 'light';
  // Light is the default. Dark only kicks in when the user explicitly
  // chooses it with the toggle. We deliberately ignore the OS
  // prefers-color-scheme setting per the owner's request.
  const stored = localStorage.getItem(KEY) as Theme | null;
  return stored === 'dark' ? 'dark' : 'light';
}

function applyTheme(t: Theme) {
  const root = document.documentElement;
  if (t === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const initial = resolveInitial();
    applyTheme(initial);
    return initial;
  });

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(KEY, next);
    setThemeState(next);
    applyTheme(next);
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return { theme, setTheme, toggle };
}
