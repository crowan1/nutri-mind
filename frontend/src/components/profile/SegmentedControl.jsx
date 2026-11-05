// Three mutually exclusive values that fit on one line — the cooking level.
// A select would hide two of the three behind a click for no gain.
export default function SegmentedControl({ label, options, value, onChange }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-xl border border-line bg-page p-1"
    >
      {options.map(({ value: option, label: optionLabel }) => {
        const active = value === option

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={`rounded-lg px-4 py-2 text-xs font-medium transition duration-200 motion-reduce:transition-none ${
              active ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            {optionLabel}
          </button>
        )
      })}
    </div>
  )
}
