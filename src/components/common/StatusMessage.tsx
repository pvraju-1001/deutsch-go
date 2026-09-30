import type { ReactNode } from 'react';
import styles from './StatusMessage.module.css';

interface StatusMessageProps {
  variant?: 'neutral' | 'info' | 'error';
  title?: string;
  centered?: boolean;
  children?: ReactNode;
}

export function StatusMessage({ variant = 'neutral', title, centered, children }: StatusMessageProps) {
  return (
    <div
      className={`${styles.box} ${variant !== 'neutral' ? styles[variant] : ''} ${centered ? styles.center : ''}`}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </div>
  );
}
