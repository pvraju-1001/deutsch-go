import ui from '../../data/ui.json';
import { useSpeech } from '../../hooks/useSpeech';
import { format } from '../../utils/format';
import { SpeakerIcon } from './SpeakerIcon';
import styles from './SpeakButton.module.css';

interface SpeakButtonProps {
  text: string;
  size?: 'sm' | 'lg';
}

export function SpeakButton({ text, size = 'sm' }: SpeakButtonProps) {
  const { supported, speakingText, speak, stop } = useSpeech();
  const isActive = speakingText === text;
  const label = format(ui.word.listen, { text });

  return (
    <button
      type="button"
      className={`${styles.button} ${styles[size]} ${isActive ? styles.active : ''}`}
      onClick={() => (isActive ? stop() : speak(text))}
      disabled={!supported}
      aria-label={label}
      aria-pressed={isActive}
      title={label}
    >
      <SpeakerIcon active={isActive} />
    </button>
  );
}
