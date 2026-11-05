import { fieldClassName } from './Field'

export default function SelectField({ id, label, note, options, placeholder, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="flex flex-wrap items-baseline gap-x-2 text-xs text-muted">
        <span className="font-medium text-ink">{label}</span>
        {note && <span>· {note}</span>}
      </label>

      <select id={id} className={`${fieldClassName} mt-2 appearance-none`} {...props}>
        {/* An empty value rather than no option at all: a profile that has
            never been filled has to be representable. */}
        <option value="">{placeholder}</option>
        {options.map(({ value, label: optionLabel }) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  )
}
