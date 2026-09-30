import ui from '../../data/ui.json';
import { useSpeech } from '../../hooks/useSpeech';
import { StatusMessage } from './StatusMessage';

/** Warns the learner when audio can't sound native on this device. */
export function SpeechNotice() {
  const { supported, hasNativeVoice } = useSpeech();
  if (!supported) return <StatusMessage variant="info">{ui.speech.unsupported}</StatusMessage>;
  if (hasNativeVoice === false) return <StatusMessage variant="info">{ui.speech.noGermanVoice}</StatusMessage>;
  return null;
}
