// Labelled on/off row. The control is a real button carrying aria-pressed, so
// the whole row — title, caption and track — is one tab stop.
export default function Switch({ label, caption, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className="flex w-full items-center justify-between gap-4 text-left"
    >
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink">{label}</span>
        {caption && <span className="mt-0.5 block text-xs text-muted">{caption}</span>}
      </span>

      <span
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 motion-reduce:transition-none ${
          checked ? 'bg-brand' : 'bg-line'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 motion-reduce:transition-none ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  )
}
