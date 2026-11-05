import Reveal from '../Reveal'

// One titled block of the profile form. Every section looks the same on
// purpose: an icon, a heading, a line saying what the setting actually
// changes, then the controls.
export default function ProfileCard({ icon: Icon, title, description, delay = 0, children }) {
  return (
    <Reveal
      as="section"
      delay={delay}
      className="rounded-2xl border border-line bg-white p-5 sm:p-6"
    >
      <div className="flex items-start gap-3.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
          <Icon className="size-5" />
        </span>

        <div className="min-w-0 pt-0.5">
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          <p className="mt-1 text-xs text-muted">{description}</p>
        </div>
      </div>

      <div className="mt-5">{children}</div>
    </Reveal>
  )
}
