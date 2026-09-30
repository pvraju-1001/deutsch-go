import type { ReactNode } from 'react';
import ui from '../../data/ui.json';
import { useLevel } from '../../hooks/useLevel';
import { useLevelEntries } from '../../hooks/useLevelEntries';
import type { WordEntry } from '../../types';
import { format } from '../../utils/format';
import { StatusMessage } from '../common/StatusMessage';

interface LevelContentGateProps {
  children: (entries: WordEntry[]) => ReactNode;
}

/** Handles loading, error, empty and "coming soon" states for the selected level. */
export function LevelContentGate({ children }: LevelContentGateProps) {
  const { level } = useLevel();
  const state = useLevelEntries(level);

  if (!level.available) {
    return (
      <StatusMessage centered title={format(ui.status.comingSoonTitle, { level: level.id })}>
        {ui.status.comingSoonText}
      </StatusMessage>
    );
  }
  if (state.status === 'loading') return <StatusMessage centered>{ui.status.loading}</StatusMessage>;
  if (state.status === 'error') return <StatusMessage variant="error">{ui.status.error}</StatusMessage>;
  if (state.data.length === 0) return <StatusMessage centered>{ui.status.empty}</StatusMessage>;
  return <>{children(state.data)}</>;
}
