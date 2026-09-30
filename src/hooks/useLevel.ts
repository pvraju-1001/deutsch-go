import { useContext } from 'react';
import { LevelContext } from '../context/LevelContext';

export function useLevel() {
  const context = useContext(LevelContext);
  if (!context) throw new Error('useLevel must be used inside <LevelProvider>');
  return context;
}
