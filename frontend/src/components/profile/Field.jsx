// Shared by every text-like control of the profile so the form reads as one
// surface rather than a stack of differently sized boxes.
export const fieldClassName =
  'w-full rounded-xl border border-line bg-page px-4 py-3 text-sm text-ink outline-none transition duration-200 placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20 motion-reduce:transition-none'

// `suffix` is the unit printed inside the box (cm, kg, € / sem.). It sits on
// top of the input rather than beside it so the grid columns stay aligned
// whether or not a field carries one. `action` is a control shown opposite the
// label, kept outside it: a button inside a <label> would also focus the input.
export default function Field({ id, label, note, hint, suffix, locked, action, ...props }) {
  return (
    <div>
      <div className="flex min-h-7 items-center justify-between gap-2">
        <label htmlFor={id} className="flex flex-wrap items-baseline gap-x-2 text-xs text-muted">
          <span className="font-medium text-ink">{label}</span>
          {note && <span>· {note}</span>}
        </label>
        {action}
      </div>

      <div className="relative mt-1.5">
        <input
          id={id}
          disabled={locked}
          className={`${fieldClassName} ${suffix ? 'pr-12' : ''} ${
            locked ? 'cursor-not-allowed text-muted' : ''
          }`}
          {...props}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs text-muted">
            {suffix}
          </span>
        )}
      </div>

      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
    </div>
  )
}
