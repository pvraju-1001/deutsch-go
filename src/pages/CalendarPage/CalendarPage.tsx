import ui from '../../data/ui.json';
import { CalendarMonth } from '../../components/calendar/CalendarMonth';
import { LevelContentGate } from '../../components/level/LevelContentGate';
import type { WordEntry } from '../../types';
import { todayISO } from '../../utils/date';
import styles from '../pages.module.css';

function groupByMonth(entries: WordEntry[]): [string, WordEntry[]][] {
  const months = new Map<string, WordEntry[]>();
  for (const entry of entries) {
    const key = entry.date.slice(0, 7);
    months.set(key, [...(months.get(key) ?? []), entry]);
  }
  return [...months.entries()];
}

export function CalendarPage() {
  const today = todayISO();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1 className={styles.title}>{ui.calendar.title}</h1>
        <p className={styles.lead}>{ui.calendar.subtitle}</p>
      </header>
      <LevelContentGate>
        {(entries) =>
          groupByMonth(entries).map(([monthKey, monthEntries]) => (
            <CalendarMonth key={monthKey} monthKey={monthKey} entries={monthEntries} today={today} />
          ))
        }
      </LevelContentGate>
    </div>
  );
}
