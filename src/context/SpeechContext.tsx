import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  isSpeechSupported,
  pickVoice,
  speak as speakText,
  stopSpeaking,
  waitForVoices,
} from '../services/speechService';

interface SpeechContextValue {
  supported: boolean;
  hasNativeVoice: boolean | null;
  speakingText: string | null;
  speak: (text: string) => void;
  stop: () => void;
}

export const SpeechContext = createContext<SpeechContextValue | null>(null);

export function SpeechProvider({ children }: { children: ReactNode }) {
  const supported = isSpeechSupported();
  const [hasNativeVoice, setHasNativeVoice] = useState<boolean | null>(null);
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  useEffect(() => {
    if (!supported) return;
    let active = true;
    waitForVoices().then(() => {
      if (active) setHasNativeVoice(Boolean(pickVoice()));
    });
    return () => {
      active = false;
      stopSpeaking();
    };
  }, [supported]);

  const stop = useCallback(() => {
    stopSpeaking();
    setSpeakingText(null);
  }, []);

  const speak = useCallback((text: string) => {
    setSpeakingText(text);
    speakText(text, {
      onEnd: () => setSpeakingText((current) => (current === text ? null : current)),
    });
  }, []);

  const value = useMemo(
    () => ({ supported, hasNativeVoice, speakingText, speak, stop }),
    [supported, hasNativeVoice, speakingText, speak, stop],
  );

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
}
