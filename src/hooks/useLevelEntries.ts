import { useEffect, useState } from 'react';
import { loadLevelEntries } from '../services/contentService';
import type { LevelWithAvailability, LoadState, WordEntry } from '../types';

/** Loads all word entries for the given level. */
export function useLevelEntries(level: LevelWithAvailability): LoadState<WordEntry[]> {
  const [state, setState] = useState<LoadState<WordEntry[]>>({ status: 'loading' });

  useEffect(() => {
    if (!level.available) {
      setState({ status: 'ready', data: [] });
      return;
    }
    let active = true;
    setState({ status: 'loading' });
    loadLevelEntries(level)
      .then((data) => active && setState({ status: 'ready', data }))
      .catch((error: Error) => active && setState({ status: 'error', error }));
    return () => {
      active = false;
    };
  }, [level]);

  return state;
}
