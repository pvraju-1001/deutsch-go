import config from '../data/config.json';

/**
 * Thin wrapper around the browser Web Speech API.
 * Swap this module to move to a cloud TTS provider later.
 */
const { lang, rate, pitch, preferredVoiceKeywords } = config.speech;

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function languageVoices(): SpeechSynthesisVoice[] {
  const base = lang.split('-')[0].toLowerCase();
  return window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.replace('_', '-').toLowerCase().startsWith(base));
}

/** Picks the most natural-sounding voice for the configured language. */
export function pickVoice(): SpeechSynthesisVoice | undefined {
  if (!isSpeechSupported()) return undefined;
  const voices = languageVoices();
  const score = (voice: SpeechSynthesisVoice) => {
    let points = voice.lang.replace('_', '-').toLowerCase() === lang.toLowerCase() ? 10 : 0;
    const keywordIndex = preferredVoiceKeywords.findIndex((keyword) => voice.name.includes(keyword));
    if (keywordIndex >= 0) points += preferredVoiceKeywords.length - keywordIndex;
    return points;
  };
  return [...voices].sort((a, b) => score(b) - score(a))[0];
}

/** Resolves once the browser has loaded its voice list (it loads asynchronously). */
export function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!isSpeechSupported()) return Promise.resolve([]);
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  if (voices.length > 0) return Promise.resolve(voices);
  return new Promise((resolve) => {
    const done = () => {
      synth.removeEventListener('voiceschanged', done);
      resolve(synth.getVoices());
    };
    synth.addEventListener('voiceschanged', done);
    window.setTimeout(done, 2000);
  });
}

export interface SpeakHandlers {
  onStart?: () => void;
  onEnd?: () => void;
}

export function speak(text: string, handlers: SpeakHandlers = {}): void {
  if (!isSpeechSupported()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = pitch;
  const voice = pickVoice();
  if (voice) utterance.voice = voice;
  utterance.onstart = () => handlers.onStart?.();
  utterance.onend = () => handlers.onEnd?.();
  utterance.onerror = () => handlers.onEnd?.();
  synth.speak(utterance);
}

export function stopSpeaking(): void {
  if (isSpeechSupported()) window.speechSynthesis.cancel();
}
