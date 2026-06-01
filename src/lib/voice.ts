/**
 * Web Speech API wrapper for reading instructions aloud. Browser native, no
 * dependencies. Auto-detects Arabic content and picks the best matching voice.
 */

export function isVoiceSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function containsArabic(text: string): boolean {
  return /[؀-ۿ]/.test(text);
}

function pickVoice(text: string): SpeechSynthesisVoice | undefined {
  if (!isVoiceSupported()) return undefined;
  const voices = window.speechSynthesis.getVoices();
  const isArabic = containsArabic(text);

  if (isArabic) {
    return (
      voices.find((v) => /ar-SA/i.test(v.lang) && /Majed|Tarik|Maged/i.test(v.name)) ||
      voices.find((v) => /ar-SA/i.test(v.lang)) ||
      voices.find((v) => /ar-EG|ar-JO|ar-AE/i.test(v.lang)) ||
      voices.find((v) => /^ar[-_]/i.test(v.lang)) ||
      voices[0]
    );
  }

  return (
    voices.find((v) => /en-US/i.test(v.lang) && /Samantha|Google|Natural|Aria/i.test(v.name)) ||
    voices.find((v) => /en-US/i.test(v.lang)) ||
    voices.find((v) => /^en[-_]/i.test(v.lang)) ||
    voices[0]
  );
}

export interface VoiceController {
  speak(text: string): void;
  pause(): void;
  resume(): void;
  stop(): void;
  onState(cb: (state: VoiceState) => void): void;
}

export type VoiceState = 'idle' | 'speaking' | 'paused';

export function createVoiceController(): VoiceController {
  let listeners: ((s: VoiceState) => void)[] = [];
  function emit(s: VoiceState) {
    listeners.forEach((l) => l(s));
  }

  return {
    speak(text: string) {
      if (!isVoiceSupported()) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice(text);
      if (v) u.voice = v;
      u.lang = containsArabic(text) ? 'ar-SA' : 'en-US';
      u.rate = 0.95;
      u.pitch = 1;
      u.onstart = () => emit('speaking');
      u.onend = () => emit('idle');
      u.onerror = () => emit('idle');
      u.onpause = () => emit('paused');
      u.onresume = () => emit('speaking');
      window.speechSynthesis.speak(u);
    },
    pause() {
      if (!isVoiceSupported()) return;
      window.speechSynthesis.pause();
      emit('paused');
    },
    resume() {
      if (!isVoiceSupported()) return;
      window.speechSynthesis.resume();
      emit('speaking');
    },
    stop() {
      if (!isVoiceSupported()) return;
      window.speechSynthesis.cancel();
      emit('idle');
    },
    onState(cb) {
      listeners.push(cb);
    },
  };
}
