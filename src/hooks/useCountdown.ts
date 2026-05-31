import { useCallback, useEffect, useRef, useState } from 'react';

export function useCountdown() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const targetRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  }, []);

  const start = useCallback((seed: number) => {
    targetRef.current = Date.now() + seed * 1000;
    setSeconds(seed);
    setRunning(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (!targetRef.current) return;
      const remaining = Math.max(0, Math.round((targetRef.current - Date.now()) / 1000));
      setSeconds(remaining);
      if (remaining <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setRunning(false);
        try {
          // Soft chime via Web Audio so we don't need an asset
          const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.frequency.value = 880;
          g.gain.value = 0.15;
          o.connect(g).connect(ctx.destination);
          o.start();
          setTimeout(() => {
            o.frequency.value = 660;
            setTimeout(() => o.stop(), 350);
          }, 350);
        } catch { /* ignore */ }
      }
    }, 250);
  }, []);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { seconds, running, start, stop };
}
