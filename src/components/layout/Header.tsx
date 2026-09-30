import { Link, NavLink } from 'react-router-dom';
import ui from '../../data/ui.json';
import { LevelSelector } from '../level/LevelSelector';
import styles from './Header.module.css';

const navItems = [
  { to: '/', label: ui.nav.today, end: true },
  { to: '/calendar', label: ui.nav.calendar, end: false },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.flag} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          {ui.app.name}
        </Link>
        <div className={styles.controls}>
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <LevelSelector />
        </div>
      </div>
    </header>
  );
}
