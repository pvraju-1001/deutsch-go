import ui from '../../data/ui.json';
import type { Sentence } from '../../types';
import { SpeakButton } from '../common/SpeakButton';
import styles from './SentenceList.module.css';

export function SentenceList({ sentences }: { sentences: Sentence[] }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{ui.word.sentencesTitle}</h2>
      <ol className={styles.list}>
        {sentences.map((sentence) => (
          <li key={sentence.de} className={styles.item}>
            <div>
              <p className={styles.german} lang="de">{sentence.de}</p>
              <p className={styles.english}>{sentence.en}</p>
            </div>
            <SpeakButton text={sentence.de} />
          </li>
        ))}
      </ol>
    </section>
  );
}
