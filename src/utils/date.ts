import config from '../data/config.json';

/** Parses a `YYYY-MM-DD` string as a local date (avoids UTC shifts). */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function formatLongDate(iso: string): string {
  return new Intl.DateTimeFormat(config.displayLocale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parseISODate(iso));
}

export function formatMonth(monthKey: string): string {
  return new Intl.DateTimeFormat(config.displayLocale, { month: 'long', year: 'numeric' }).format(
    parseISODate(`${monthKey}-01`),
  );
}

export function isValidISODate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && toISODate(parseISODate(value)) === value;
}
