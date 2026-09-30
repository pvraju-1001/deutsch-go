import type { WordEntry } from '../../types';
import { GrammarPanel } from './GrammarPanel';
import { SentenceList } from './SentenceList';
import { WordCard } from './WordCard';
import styles from './WordOfTheDay.module.css';

export function WordOfTheDay({ entry, levelId }: { entry: WordEntry; levelId: string }) {
  return (
    <div className={styles.layout}>
      <div className={styles.aside}>
        <WordCard entry={entry} levelId={levelId} />
        <GrammarPanel grammar={entry.grammar} />
      </div>
      <SentenceList sentences={entry.sentences} />
    </div>
  );
}
