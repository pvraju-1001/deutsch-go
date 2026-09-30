import levelsData from '../data/levels.json';
import type { Level, LevelContent, LevelWithAvailability, WordEntry } from '../types';

/**
 * Every JSON file in `data/levels/<folder>/` is picked up automatically.
 * Adding a level only needs a new folder of JSON files — no code changes.
 */
const contentModules = import.meta.glob<LevelContent>('../data/levels/*/*.json', {
  import: 'default',
});

function filesForFolder(folder: string): string[] {
  const prefix = `../data/levels/${folder}/`;
  return Object.keys(contentModules)
    .filter((path) => path.startsWith(prefix))
    .sort();
}

export function getLevels(): LevelWithAvailability[] {
  return (levelsData as Level[]).map((level) => ({
    ...level,
    available: filesForFolder(level.contentFolder).length > 0,
  }));
}

export function findLevel(levelId: string): LevelWithAvailability | undefined {
  return getLevels().find((level) => level.id === levelId);
}

const cache = new Map<string, Promise<WordEntry[]>>();

/** Loads and merges every content file of a level, sorted by date. */
export function loadLevelEntries(level: Level): Promise<WordEntry[]> {
  let pending = cache.get(level.id);
  if (!pending) {
    pending = Promise.all(filesForFolder(level.contentFolder).map((path) => contentModules[path]()))
      .then((files) =>
        files.flatMap((file) => file.entries).sort((a, b) => a.date.localeCompare(b.date)),
      )
      .catch((error: unknown) => {
        cache.delete(level.id);
        throw error;
      });
    cache.set(level.id, pending);
  }
  return pending;
}

/**
 * Returns the entry for `date`, or the nearest available one:
 * before the first entry → first, after the last → last, inside a gap → the previous entry.
 */
export function resolveEntryForDate(
  entries: WordEntry[],
  date: string,
): { entry: WordEntry; isExact: boolean } | undefined {
  if (entries.length === 0) return undefined;
  const exact = entries.find((e) => e.date === date);
  if (exact) return { entry: exact, isExact: true };
  const previous = entries.filter((e) => e.date < date).at(-1);
  return { entry: previous ?? entries[0], isExact: false };
}

export function getNeighbours(entries: WordEntry[], date: string) {
  const index = entries.findIndex((e) => e.date === date);
  return {
    previous: index > 0 ? entries[index - 1] : undefined,
    next: index >= 0 && index < entries.length - 1 ? entries[index + 1] : undefined,
  };
}
