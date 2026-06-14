/**
 * Thin typed wrapper around the YouTube IFrame Player API.
 *
 * The official YouTube IFrame Player API is the only way to call
 * `unMute()` on a video at runtime. Raw iframe URL parameters can set
 * `mute=1` but they cannot toggle mute after the player has loaded.
 *
 * This module owns:
 *   - lazy script load of the iframe_api.js bundle
 *   - a single Promise that resolves when the API is ready
 *   - a typed factory for new players
 *
 * The script is MIT licensed when used as embedded YouTube. Free for
 * any site, no key required.
 */

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  setVolume(v: number): void;
  getVolume(): number;
  getCurrentTime(): number;
  getDuration(): number;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  loadVideoById(videoId: string): void;
  destroy(): void;
  getPlayerState(): number;
}

export interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

export const YT_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

interface YTNamespace {
  Player: new (
    elementOrId: HTMLElement | string,
    options: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: YTPlayerEvent) => void;
        onStateChange?: (e: YTPlayerEvent) => void;
        onError?: (e: YTPlayerEvent) => void;
      };
    },
  ) => YTPlayer;
}

let apiPromise: Promise<YTNamespace> | null = null;

/**
 * Load the YouTube IFrame API once for the page. Subsequent callers
 * await the same promise so we never inject the script twice.
 */
export function loadYouTubeAPI(): Promise<YTNamespace> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('YouTube API requires a browser'));
  }
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previousHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousHandler) previousHandler();
      if (window.YT?.Player) resolve(window.YT);
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.appendChild(script);
  });
  return apiPromise;
}

export interface CreatePlayerOptions {
  videoId: string;
  container: HTMLElement;
  startMuted?: boolean;
  loop?: boolean;
  onReady?: (player: YTPlayer) => void;
  onStateChange?: (state: number, player: YTPlayer) => void;
  onError?: (code: number) => void;
}

export async function createPlayer(opts: CreatePlayerOptions): Promise<YTPlayer> {
  const YT = await loadYouTubeAPI();
  return new Promise((resolve) => {
    const playerVars: Record<string, string | number> = {
      autoplay: 1,
      // Audio support: when startMuted is false we still pass mute=0
      // but autoplay will only succeed if the audio context has been
      // unlocked by a prior user gesture. Callers should unMute()
      // explicitly inside the onReady callback when applicable.
      mute: opts.startMuted ? 1 : 0,
      controls: 0,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
      playsinline: 1,
      loop: opts.loop ? 1 : 0,
      iv_load_policy: 3,
      fs: 0,
      cc_load_policy: 0,
    };
    if (opts.loop) playerVars.playlist = opts.videoId;
    new YT.Player(opts.container, {
      videoId: opts.videoId,
      width: '100%',
      height: '100%',
      playerVars,
      events: {
        onReady: (e) => {
          opts.onReady?.(e.target);
          resolve(e.target);
        },
        onStateChange: (e) => opts.onStateChange?.(e.data, e.target),
        onError: (e) => opts.onError?.(e.data),
      },
    });
  });
}
