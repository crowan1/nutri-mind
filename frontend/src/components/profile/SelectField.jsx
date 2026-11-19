import { fieldClassName, FieldLabel } from './Field'

export default function SelectField({ id, label, note, options, placeholder, ...props }) {
  return (
    <div>
      <FieldLabel id={id} label={label} note={note} />

      <select id={id} className={`${fieldClassName} mt-1.5 appearance-none`} {...props}>
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
