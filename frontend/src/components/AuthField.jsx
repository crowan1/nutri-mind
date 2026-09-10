export default function AuthField({ id, label, error, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        className="mt-2 w-full rounded-lg border border-line bg-page px-4 py-3 text-base text-ink outline-none transition placeholder:text-base placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
        {...props}
      />
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
    </div>
  )
}
