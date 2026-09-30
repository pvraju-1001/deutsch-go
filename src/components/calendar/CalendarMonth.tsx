import { Link } from 'react-router-dom';
import config from '../../data/config.json';
import ui from '../../data/ui.json';
import type { WordEntry } from '../../types';
import { formatLongDate, formatMonth, parseISODate, toISODate } from '../../utils/date';
import { format } from '../../utils/format';
import styles from './CalendarMonth.module.css';

interface CalendarMonthProps {
  monthKey: string;
  entries: WordEntry[];
  today: string;
}

export function CalendarMonth({ monthKey, entries, today }: CalendarMonthProps) {
  const { weekStartsOn } = config.calendar;
  const weekdays = [...ui.calendar.weekdays.slice(weekStartsOn), ...ui.calendar.weekdays.slice(0, weekStartsOn)];
  const byDate = new Map(entries.map((entry) => [entry.date, entry]));

  const first = parseISODate(`${monthKey}-01`);
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const leadingBlanks = (first.getDay() - weekStartsOn + 7) % 7;
  const days = Array.from({ length: daysInMonth }, (_, i) =>
    toISODate(new Date(first.getFullYear(), first.getMonth(), i + 1)),
  );

  return (
    <section className={styles.month}>
      <header className={styles.header}>
        <h2 className={styles.title}>{formatMonth(monthKey)}</h2>
        <span className={styles.count}>{format(ui.calendar.wordCount, { count: entries.length })}</span>
      </header>

      {/* Grid view (tablet and up) */}
      <div className={styles.grid}>
        {weekdays.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
        {Array.from({ length: leadingBlanks }, (_, i) => (
          <div key={`blank-${i}`} aria-hidden="true" />
        ))}
        {days.map((date) => {
          const entry = byDate.get(date);
          const dayNumber = parseISODate(date).getDate();
          const isToday = date === today;
          if (!entry) {
            return (
              <div key={date} className={`${styles.cell} ${styles.empty}`}>
                <span className={styles.dayNumber}>{dayNumber}</span>
              </div>
            );
          }
          return (
            <Link
              key={date}
              to={`/day/${date}`}
              className={`${styles.cell} ${isToday ? styles.today : ''}`}
              aria-label={`${formatLongDate(date)}: ${entry.word}`}
            >
              <span className={styles.dayNumber}>{dayNumber}</span>
              <span className={styles.word} lang="de">{entry.word}</span>
            </Link>
          );
        })}
      </div>

      {/* List view (phones) */}
      <ul className={styles.list}>
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link to={`/day/${entry.date}`} className={`${styles.listItem} ${entry.date === today ? styles.today : ''}`}>
              <span className={styles.listDate}>
                <strong>{parseISODate(entry.date).getDate()}</strong>
                <small>{weekdays[(parseISODate(entry.date).getDay() - weekStartsOn + 7) % 7]}</small>
              </span>
              <span className={styles.listText}>
                <span className={styles.listWord} lang="de">
                  {entry.grammar.article ? `${entry.grammar.article} ` : ''}
                  {entry.word}
                </span>
                <span className={styles.listTranslation}>{entry.translation}</span>
              </span>
              {entry.date === today && <span className={styles.todayBadge}>{ui.calendar.today}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
