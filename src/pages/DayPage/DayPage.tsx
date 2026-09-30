import { Link, useParams } from 'react-router-dom';
import ui from '../../data/ui.json';
import { SpeechNotice } from '../../components/common/SpeechNotice';
import { StatusMessage } from '../../components/common/StatusMessage';
import { DayNavigation } from '../../components/day/DayNavigation';
import { LevelContentGate } from '../../components/level/LevelContentGate';
import { WordOfTheDay } from '../../components/word/WordOfTheDay';
import { useLevel } from '../../hooks/useLevel';
import { getNeighbours } from '../../services/contentService';
import type { WordEntry } from '../../types';
import { formatLongDate, isValidISODate } from '../../utils/date';
import { format } from '../../utils/format';
import styles from '../pages.module.css';

function DayContent({ entries, date, levelId }: { entries: WordEntry[]; date: string; levelId: string }) {
  const entry = entries.find((e) => e.date === date);

  if (!entry) {
    return (
      <StatusMessage centered>
        <p>
          {format(ui.day.notFound, {
            level: levelId,
            date: isValidISODate(date) ? formatLongDate(date) : date,
          })}
        </p>
        <Link to="/calendar" className={styles.button}>
          {ui.nav.calendar}
        </Link>
      </StatusMessage>
    );
  }

  const { previous, next } = getNeighbours(entries, entry.date);
  return (
    <>
      <WordOfTheDay entry={entry} levelId={levelId} />
      <DayNavigation previous={previous} next={next} />
    </>
  );
}

export function DayPage() {
  const { date = '' } = useParams();
  const { level } = useLevel();

  return (
    <div className={styles.page}>
      <SpeechNotice />
      <LevelContentGate>
        {(entries) => <DayContent entries={entries} date={date} levelId={level.id} />}
      </LevelContentGate>
    </div>
  );
}
