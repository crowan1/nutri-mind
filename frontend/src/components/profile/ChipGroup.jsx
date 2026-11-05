// Pill list used for the diet (one choice) and the allergens (several). The
// two share everything but the toggle rule, so `multiple` is the only switch.
//
// Rendered as a group of toggle buttons rather than radios or checkboxes: the
// pills carry their own state through aria-pressed, which is what a screen
// reader announces, and no hidden input has to be kept in sync.
export default function ChipGroup({ label, options, value, multiple = false, onChange }) {
  const selected = multiple ? (value ?? []) : [value].filter(Boolean)

  const toggle = (option) => {
    if (!multiple) {
      // Picking the active pill again clears the choice: there is no other way
      // back to "not set" once something has been chosen.
      onChange(value === option ? null : option)
      return
    }

    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option],
    )
  }

  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map(({ value: option, label: optionLabel }) => {
        const active = selected.includes(option)

        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            aria-pressed={active}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition duration-200 active:scale-95 motion-reduce:transition-none ${
              active
                ? 'border-brand bg-brand-soft text-brand'
                : 'border-line bg-white text-muted hover:border-brand/40 hover:text-ink'
            }`}
          >
            {optionLabel}
          </button>
        )
      })}
    </div>
  )
}
