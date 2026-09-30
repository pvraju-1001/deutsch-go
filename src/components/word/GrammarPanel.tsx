import ui from '../../data/ui.json';
import type { Grammar } from '../../types';
import styles from './GrammarPanel.module.css';

export function GrammarPanel({ grammar }: { grammar: Grammar }) {
  const facts = [
    { label: ui.word.article, value: grammar.article },
    { label: ui.word.plural, value: grammar.plural },
  ].filter((fact) => fact.value);

  if (facts.length === 0 && !grammar.table && !grammar.note) return null;

  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>{ui.word.grammarTitle}</h2>

      {facts.length > 0 && (
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd lang="de">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {grammar.table && (
        <>
          <h3 className={styles.tableTitle}>{grammar.table.title}</h3>
          <table className={styles.table}>
            <tbody>
              {grammar.table.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" lang="de">{row.label}</th>
                  <td lang="de">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {grammar.note && (
        <p className={styles.note}>
          <strong>{ui.word.note}:</strong> {grammar.note}
        </p>
      )}
    </section>
  );
}
