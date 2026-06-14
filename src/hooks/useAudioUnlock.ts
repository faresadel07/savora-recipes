/**
 * useAudioUnlock — global session state for whether the user has
 * unlocked autoplay-with-sound at least once.
 *
 * Why this exists:
 *   Browsers block autoplay-with-sound until the user makes a "user
 *   gesture" (click, tap, key press). Once any element on the page
 *   triggers a successful unMute() inside a user-gesture handler, the
 *   browser remembers that the page is allowed to play sound for the
 *   rest of the tab session. We persist the user's intent across tabs
 *   in localStorage so the very first interaction on /shorts unlocks
 *   audio for every subsequent video, including return visits.
 *
 * Note: Safari resets gesture trust on every navigation, so we always
 * gate the first unMute() behind a real click/touch handler anyway.
 */
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'zaytoun:shorts:audio-unlocked:v1';
const SUBSCRIBERS = new Set<(unlocked: boolean) => void>();
let CURRENT: boolean = false;

function readInitial(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

CURRENT = readInitial();

function emit(value: boolean) {
  CURRENT = value;
  for (const fn of SUBSCRIBERS) fn(value);
}

/**
 * Returns [unlocked, unlock]. Calling `unlock()` from inside a user
 * gesture handler flips the flag globally so every other short on the
 * page can rely on audio being available.
 */
export function useAudioUnlock(): [boolean, () => void] {
  const [unlocked, setUnlocked] = useState<boolean>(CURRENT);

  useEffect(() => {
    SUBSCRIBERS.add(setUnlocked);
    return () => {
      SUBSCRIBERS.delete(setUnlocked);
    };
  }, []);

  const unlock = useCallback(() => {
    if (CURRENT) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // storage full or blocked — flag still propagates in memory.
    }
    emit(true);
  }, []);

  return [unlocked, unlock];
}

/** Reset the unlock flag. Used by the "Mute by default" preference. */
export function resetAudioUnlock(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  emit(false);
}
