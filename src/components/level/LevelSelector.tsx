import { useId } from 'react';
import ui from '../../data/ui.json';
import { useLevel } from '../../hooks/useLevel';
import styles from './LevelSelector.module.css';

export function LevelSelector() {
  const { levels, level, setLevelId } = useLevel();
  const id = useId();

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {ui.levelSelector.label}
      </label>
      <select
        id={id}
        className={styles.select}
        value={level.id}
        onChange={(event) => setLevelId(event.target.value)}
      >
        {levels.map((l) => (
          <option key={l.id} value={l.id}>
            {l.id} · {l.name}
            {l.available ? '' : ` (${ui.levelSelector.comingSoon})`}
          </option>
        ))}
      </select>
    </div>
  );
}
