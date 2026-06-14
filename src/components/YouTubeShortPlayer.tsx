import { useEffect, useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { useAudioUnlock } from '../hooks/useAudioUnlock';
import { createPlayer, YT_STATE, type YTPlayer } from '../lib/youtube-iframe-api';

interface Props {
  videoId: string;
  /** When false, the iframe is not mounted yet; only a thumbnail shows. */
  active: boolean;
  className?: string;
}

/**
 * Vertical short video player built on the YouTube IFrame Player API.
 *
 * Behavior:
 *   - On mount, loads the player MUTED so autoplay never gets blocked.
 *   - The very first time the user taps anywhere inside the player, we
 *     call player.unMute() inside the gesture handler. The browser's
 *     audio policy then trusts the page for the rest of the tab, and
 *     useAudioUnlock persists the intent to localStorage so subsequent
 *     videos and visits start with sound.
 *   - Single tap pauses/plays.
 *   - The Sound toggle in the top-right syncs with the actual player
 *     mute state, not just the unlock flag.
 *   - A thin progress bar tracks current time.
 */
export default function YouTubeShortPlayer({ videoId, active, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [audioUnlocked, unlockAudio] = useAudioUnlock();
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0); // 0..1
  const [showTapHint, setShowTapHint] = useState(false);
  const [errored, setErrored] = useState(false);
  const audioUnlockedRef = useRef(audioUnlocked);
  audioUnlockedRef.current = audioUnlocked;

  // Mount the player only when this short is active so we keep the DOM
  // light. Calling destroy() when active flips false releases iframe
  // resources for offscreen items.
  useEffect(() => {
    if (!active) {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          /* swallow YT destroy noise */
        }
        playerRef.current = null;
      }
      return;
    }

    if (!containerRef.current) return;
    let cancelled = false;
    setErrored(false);

    // Cleared inner before mounting so YT can drop its iframe in place.
    containerRef.current.innerHTML = '';
    const slot = document.createElement('div');
    slot.style.width = '100%';
    slot.style.height = '100%';
    containerRef.current.appendChild(slot);

    createPlayer({
      videoId,
      container: slot,
      startMuted: true,
      loop: true,
      onReady: (p) => {
        if (cancelled) {
          try { p.destroy(); } catch { /* ignore */ }
          return;
        }
        playerRef.current = p;
        // If audio is already unlocked from a previous interaction,
        // unmute immediately so the first short on the page sings.
        if (audioUnlockedRef.current) {
          try {
            p.unMute();
            p.setVolume(85);
            setMuted(false);
          } catch {
            /* some embeds reject unmute pre-state; user can tap. */
          }
        } else {
          setShowTapHint(true);
        }
        try { p.playVideo(); } catch { /* ignore */ }
      },
      onStateChange: (state) => {
        if (cancelled) return;
        if (state === YT_STATE.PLAYING) setPlaying(true);
        if (state === YT_STATE.PAUSED) setPlaying(false);
        if (state === YT_STATE.ENDED) setPlaying(false);
      },
      onError: () => setErrored(true),
    }).catch(() => setErrored(true));

    return () => {
      cancelled = true;
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch { /* ignore */ }
        playerRef.current = null;
      }
    };
  }, [active, videoId]);

  // Sample the player's currentTime every 250ms while playing so the
  // progress bar tracks accurately without a heavy onTime event.
  useEffect(() => {
    if (!active || !playing) return;
    let raf = 0;
    let lastTick = 0;
    function tick(now: number) {
      raf = requestAnimationFrame(tick);
      if (now - lastTick < 250) return;
      lastTick = now;
      const p = playerRef.current;
      if (!p) return;
      try {
        const dur = p.getDuration();
        const cur = p.getCurrentTime();
        if (dur > 0) setProgress(Math.min(1, cur / dur));
      } catch {
        /* ignore */
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, playing]);

  function handleSurfaceClick() {
    // First tap on the player unlocks audio for the whole session.
    const p = playerRef.current;
    if (!p) return;
    if (!audioUnlocked) {
      try {
        p.unMute();
        p.setVolume(85);
      } catch {
        /* ignore */
      }
      setMuted(false);
      unlockAudio();
      setShowTapHint(false);
      return;
    }
    // Subsequent taps toggle play/pause.
    try {
      if (playing) p.pauseVideo();
      else p.playVideo();
    } catch {
      /* ignore */
    }
  }

  function handleMuteClick(e: React.MouseEvent) {
    e.stopPropagation();
    const p = playerRef.current;
    if (!p) return;
    try {
      if (p.isMuted()) {
        p.unMute();
        p.setVolume(85);
        setMuted(false);
        if (!audioUnlocked) unlockAudio();
      } else {
        p.mute();
        setMuted(true);
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <div className={`relative overflow-hidden bg-ink-900 ${className}`}>
      {/* The YouTube player drops its iframe in here. */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Static thumbnail underneath: makes the placeholder for an
          unmounted short look intentional instead of black. */}
      {!active && (
        <img
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}

      {/* Click capture surface (transparent). Must be below the controls. */}
      {active && !errored && (
        <button
          type="button"
          onClick={handleSurfaceClick}
          className="absolute inset-0 z-20"
          aria-label={playing ? 'Pause' : 'Play'}
        />
      )}

      {/* Centered play icon overlay when paused. */}
      {active && !playing && !errored && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-ink-900/60 text-cream-50 backdrop-blur">
            <Play className="h-9 w-9 translate-x-0.5 fill-current" strokeWidth={1.5} />
          </div>
        </div>
      )}

      {/* Sound toggle button. */}
      {active && !errored && (
        <button
          type="button"
          onClick={handleMuteClick}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="absolute end-3 top-3 z-40 grid h-10 w-10 place-items-center rounded-full bg-ink-900/70 text-cream-50 backdrop-blur transition-colors hover:bg-ink-900/90"
        >
          {muted ? <VolumeX className="h-4 w-4" strokeWidth={2} /> : <Volume2 className="h-4 w-4" strokeWidth={2} />}
        </button>
      )}

      {/* Tap-to-unmute hint banner, only on the very first short the
          user encounters before they have unlocked audio. */}
      {active && showTapHint && muted && (
        <div className="pointer-events-none absolute inset-x-0 top-3 z-30 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink-900/70 px-4 py-2 text-xs font-medium text-cream-50 backdrop-blur">
            <Volume2 className="h-3.5 w-3.5" strokeWidth={2} />
            Tap to turn sound on
          </div>
        </div>
      )}

      {/* Progress bar pinned to the bottom. */}
      {active && !errored && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-1 bg-cream-50/10">
          <div
            className="h-full bg-terracotta-500 transition-[width] duration-200"
            style={{ width: `${(progress * 100).toFixed(1)}%` }}
          />
        </div>
      )}

      {errored && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-ink-900/95 text-center text-cream-100/70">
          <div>
            <p className="text-sm font-medium">Video unavailable</p>
            <p className="mt-1 text-xs text-cream-100/40">Swipe to the next short</p>
          </div>
        </div>
      )}
    </div>
  );
}
