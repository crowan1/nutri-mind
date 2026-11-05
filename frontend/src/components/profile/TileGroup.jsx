// Grid of selectable cards, used for the goals and for the kitchen equipment.
// Bigger than a pill because each entry carries a caption or has to stay
// scannable at a glance; the dot in the corner is what says "on".
export default function TileGroup({ label, options, value, onChange, columns }) {
  const selected = value ?? []

  const toggle = (option) =>
    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option],
    )

  return (
    <div role="group" aria-label={label} className={`grid gap-3 ${columns}`}>
      {options.map(({ value: option, label: optionLabel, caption, icon: Icon, tone }) => {
        const active = selected.includes(option)

        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            aria-pressed={active}
            className={`rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none ${
              active
                ? 'border-brand bg-brand-soft/40'
                : 'border-line bg-white hover:border-brand/40'
            }`}
          >
            <span className="flex items-start justify-between gap-2">
              <span
                className={`flex size-9 items-center justify-center rounded-xl transition-colors duration-200 motion-reduce:transition-none ${
                  active ? 'bg-brand text-white' : (tone ?? 'bg-mint text-muted')
                }`}
              >
                <Icon className="size-5" />
              </span>
              <span
                className={`mt-1 block size-2.5 rounded-full transition duration-200 motion-reduce:transition-none ${
                  active ? 'scale-100 bg-brand opacity-100' : 'scale-50 opacity-0'
                }`}
              />
            </span>

            <span className="mt-3 block text-sm font-medium text-ink">{optionLabel}</span>
            {caption && <span className="mt-1 block text-xs text-muted">{caption}</span>}
          </button>
        )
      })}
    </div>
  )
}
