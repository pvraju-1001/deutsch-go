import { Link } from 'react-router-dom';
import ui from '../../data/ui.json';
import { StatusMessage } from '../../components/common/StatusMessage';
import styles from '../pages.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <StatusMessage centered title={ui.notFound.title}>
        <p>{ui.notFound.text}</p>
        <Link to="/" className={styles.button}>
          {ui.notFound.back}
        </Link>
      </StatusMessage>
    </div>
  );
}
