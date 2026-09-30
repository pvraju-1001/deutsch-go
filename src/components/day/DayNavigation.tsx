import { Link } from 'react-router-dom';
import ui from '../../data/ui.json';
import type { WordEntry } from '../../types';
import styles from './DayNavigation.module.css';

interface DayNavigationProps {
  previous?: WordEntry;
  next?: WordEntry;
}

export function DayNavigation({ previous, next }: DayNavigationProps) {
  return (
    <nav className={styles.nav} aria-label={ui.day.navigationLabel}>
      {previous ? (
        <Link to={`/day/${previous.date}`} className={styles.link}>
          <span className={styles.direction}>← {ui.day.previous}</span>
          <span className={styles.word} lang="de">{previous.word}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={`/day/${next.date}`} className={`${styles.link} ${styles.next}`}>
          <span className={styles.direction}>{ui.day.next} →</span>
          <span className={styles.word} lang="de">{next.word}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
