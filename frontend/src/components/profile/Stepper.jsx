// Small integer picked with two buttons. A number input would work, but the
// household size is read and nudged far more often than it is typed, and the
// spinner arrows are tiny targets.
export default function Stepper({ id, label, value, min = 1, max = 20, onChange }) {
  const clamp = (next) => Math.min(max, Math.max(min, next))

  return (
    <div>
      <span id={id} className="block text-xs font-medium text-ink">
        {label}
      </span>

      <div
        role="group"
        aria-labelledby={id}
        className="mt-2 inline-flex items-center gap-1 rounded-xl border border-line bg-white p-1"
      >
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= min}
          aria-label="Retirer une personne"
          className="size-9 rounded-lg text-lg leading-none text-muted transition duration-200 hover:bg-mint hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
        >
          −
        </button>

        <span aria-live="polite" className="w-10 text-center text-sm font-semibold text-ink">
          {value}
        </span>

        <button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= max}
          aria-label="Ajouter une personne"
          className="size-9 rounded-lg text-lg leading-none text-muted transition duration-200 hover:bg-mint hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
        >
          +
        </button>
      </div>
    </div>
  )
}
