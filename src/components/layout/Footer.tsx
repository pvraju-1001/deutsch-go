import ui from '../../data/ui.json';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>{ui.app.tagline}</p>
        <p>{ui.app.footer}</p>
      </div>
    </footer>
  );
}
