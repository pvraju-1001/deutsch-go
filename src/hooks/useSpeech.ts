import { useContext } from 'react';
import { SpeechContext } from '../context/SpeechContext';

export function useSpeech() {
  const context = useContext(SpeechContext);
  if (!context) throw new Error('useSpeech must be used inside <SpeechProvider>');
  return context;
}
