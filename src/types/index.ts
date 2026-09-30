export interface Level {
  id: string;
  name: string;
  description: string;
  contentFolder: string;
}

export interface LevelWithAvailability extends Level {
  available: boolean;
}

export interface Sentence {
  de: string;
  en: string;
}

export interface GrammarRow {
  label: string;
  value: string;
}

export interface Grammar {
  article?: string;
  plural?: string;
  table?: {
    title: string;
    rows: GrammarRow[];
  };
  note?: string;
}

export interface WordEntry {
  id: string;
  date: string;
  word: string;
  translation: string;
  partOfSpeech: string;
  grammar: Grammar;
  sentences: Sentence[];
}

export interface LevelContent {
  level: string;
  month: string;
  entries: WordEntry[];
}

export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'ready'; data: T };
