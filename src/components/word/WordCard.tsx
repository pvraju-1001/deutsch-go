import ui from '../../data/ui.json';
import type { WordEntry } from '../../types';
import { formatLongDate } from '../../utils/date';
import { SpeakButton } from '../common/SpeakButton';
import styles from './WordCard.module.css';

const partsOfSpeech: Record<string, string> = ui.word.partsOfSpeech;

export function WordCard({ entry, levelId }: { entry: WordEntry; levelId: string }) {
  const { article } = entry.grammar;
  const spoken = article ? `${article} ${entry.word}` : entry.word;

  return (
    <section className={styles.card} aria-labelledby={`word-${entry.id}`}>
      <div className={styles.meta}>
        <span className={styles.badge}>{levelId}</span>
        <span className={styles.badge}>{partsOfSpeech[entry.partOfSpeech] ?? entry.partOfSpeech}</span>
        <time className={styles.date} dateTime={entry.date}>
          {formatLongDate(entry.date)}
        </time>
      </div>
      <div className={styles.row}>
        <h1 className={styles.word} id={`word-${entry.id}`} lang="de">
          {article && <span className={styles.article}>{article}</span>}
          {entry.word}
        </h1>
        <SpeakButton text={spoken} size="lg" />
      </div>
      <p className={styles.translation}>{entry.translation}</p>
    </section>
  );
}
