# DeutschGo

Learn one everyday German word a day, with 5 useful example sentences, English translations and native pronunciation.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build
```

## Pronunciation

Audio uses the browser **Web Speech API** with a `de-DE` voice (e.g. Google Deutsch, Microsoft Katja/Conrad, Apple Anna).
Voice, rate and pitch are configured in `src/data/config.json`. All speech logic lives in
`src/services/speechService.ts`, so it can be swapped for a cloud TTS provider later without touching components.

## Folder structure

```
src/
├── data/                     # ALL content & text — nothing is hard-coded in components
│   ├── config.json           # default level, locale, speech settings, storage keys
│   ├── ui.json               # every UI label / message
│   ├── levels.json           # A1–C2 definitions
│   └── levels/
│       └── a1/2026-10.json   # A1 words for October 2026 (31 days × 5 sentences)
├── types/                    # TypeScript models for the JSON
├── services/                 # contentService (loading, date resolution), speechService (TTS)
├── context/                  # LevelContext (selected level), SpeechContext (playback state)
├── hooks/                    # useLevel, useSpeech, useLevelEntries
├── utils/                    # date + string formatting helpers
├── components/
│   ├── common/               # SpeakButton, StatusMessage, SpeechNotice, icons
│   ├── layout/               # AppLayout, Header, Footer
│   ├── level/                # LevelSelector, LevelContentGate
│   ├── word/                 # WordOfTheDay, WordCard, GrammarPanel, SentenceList
│   ├── calendar/             # CalendarMonth
│   └── day/                  # DayNavigation
├── pages/                    # HomePage, DayPage, CalendarPage, NotFoundPage
└── styles/global.css         # design tokens (light + dark), base styles
```

## Routes

| Path               | Page                                                              |
| ------------------ | ----------------------------------------------------------------- |
| `/`                | Today's word (falls back to the nearest available day)            |
| `/day/2026-10-15`  | Word for a specific date                                          |
| `/calendar`        | Month view of all words for the selected level                    |

## Adding content

**New month for an existing level:** drop a file such as `src/data/levels/a1/2026-11.json` using the same schema.
It is picked up automatically.

**New level (e.g. A2):** add JSON files under `src/data/levels/a2/`. The `contentFolder` for A2 is already
declared in `levels.json`. A level shows as "coming soon" until its folder contains at least one file.

### Entry schema

```jsonc
{
  "level": "A1",
  "month": "2026-10",
  "entries": [
    {
      "id": "a1-2026-10-03",
      "date": "2026-10-03",
      "word": "Wasser",
      "translation": "water",
      "partOfSpeech": "noun",          // key into ui.json → word.partsOfSpeech
      "grammar": {
        "article": "das",              // optional
        "plural": "—",                 // optional
        "table": {                     // optional (conjugation, comparison, …)
          "title": "Präsens (present tense)",
          "rows": [{ "label": "ich", "value": "gehe" }]
        },
        "note": "…"                    // optional
      },
      "sentences": [{ "de": "Das Wasser ist kalt.", "en": "The water is cold." }]
    }
  ]
}
```

## Deployment note

The app uses clean URLs (`BrowserRouter`). On static hosts, configure a fallback that serves
`index.html` for unknown paths (Netlify `_redirects`, Vercel rewrites, etc.).
