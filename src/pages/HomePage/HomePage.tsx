import ui from '../../data/ui.json';
import { SpeechNotice } from '../../components/common/SpeechNotice';
import { StatusMessage } from '../../components/common/StatusMessage';
import { DayNavigation } from '../../components/day/DayNavigation';
import { LevelContentGate } from '../../components/level/LevelContentGate';
import { WordOfTheDay } from '../../components/word/WordOfTheDay';
import { useLevel } from '../../hooks/useLevel';
import { getNeighbours, resolveEntryForDate } from '../../services/contentService';
import type { WordEntry } from '../../types';
import { formatLongDate, todayISO } from '../../utils/date';
import { format } from '../../utils/format';
import styles from '../pages.module.css';

function TodayContent({ entries, levelId }: { entries: WordEntry[]; levelId: string }) {
  const today = todayISO();
  const resolved = resolveEntryForDate(entries, today);
  if (!resolved) return null;
  const { entry, isExact } = resolved;
  const { previous, next } = getNeighbours(entries, entry.date);

  return (
    <>
      {!isExact && (
        <StatusMessage variant="info">
          {format(ui.home.nearestNotice, { today: formatLongDate(today), date: formatLongDate(entry.date) })}
        </StatusMessage>
      )}
      <WordOfTheDay entry={entry} levelId={levelId} />
      <DayNavigation previous={previous} next={next} />
    </>
  );
}

export function HomePage() {
  const { level } = useLevel();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>{ui.home.eyebrow}</p>
        <p className={styles.lead}>{ui.app.tagline}</p>
      </header>
      <SpeechNotice />
      <LevelContentGate>{(entries) => <TodayContent entries={entries} levelId={level.id} />}</LevelContentGate>
    </div>
  );
}
