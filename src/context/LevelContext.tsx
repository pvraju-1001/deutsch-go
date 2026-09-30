import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import config from '../data/config.json';
import { findLevel, getLevels } from '../services/contentService';
import type { LevelWithAvailability } from '../types';

interface LevelContextValue {
  levels: LevelWithAvailability[];
  level: LevelWithAvailability;
  setLevelId: (id: string) => void;
}

export const LevelContext = createContext<LevelContextValue | null>(null);

const storageKey = config.storageKeys.level;

function readStoredLevel(): string | null {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function initialLevelId(): string {
  const stored = readStoredLevel();
  if (stored && findLevel(stored)) return stored;
  return config.defaultLevel;
}

export function LevelProvider({ children }: { children: ReactNode }) {
  const levels = useMemo(getLevels, []);
  const [levelId, setLevelIdState] = useState(initialLevelId);

  const setLevelId = useCallback((id: string) => {
    setLevelIdState(id);
    try {
      window.localStorage.setItem(storageKey, id);
    } catch {
      /* storage unavailable: keep in memory only */
    }
  }, []);

  const level = levels.find((l) => l.id === levelId) ?? levels[0];
  const value = useMemo(() => ({ levels, level, setLevelId }), [levels, level, setLevelId]);

  return <LevelContext.Provider value={value}>{children}</LevelContext.Provider>;
}
