export function SpeakerIcon({ active = false }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" opacity={active ? 1 : 0.85} />
      {active && <path d="M18.5 5.5a9 9 0 0 1 0 13" />}
    </svg>
  );
}
