import { useEffect, useState } from 'react'

// The bar fills from zero on arrival instead of appearing already drawn:
// the number means "how far you are", and watching it travel there is what
// makes a half-filled profile feel worth finishing.
export default function CompletionMeter({ percent }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // One frame of delay. Setting the final width in the same commit as the
    // mount gives the browser nothing to animate from.
    const frame = requestAnimationFrame(() => setWidth(percent))
    return () => cancelAnimationFrame(frame)
  }, [percent])

  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium text-ink">Profil complété</p>
        <p className="text-sm font-bold text-brand">{percent}%</p>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progression du remplissage du profil"
        className="mt-3 h-2 overflow-hidden rounded-full bg-line/70"
      >
        <span
          style={{ width: `${width}%` }}
          className="block h-full rounded-full bg-brand transition-[width] duration-1000 ease-out motion-reduce:transition-none"
        />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        Un profil complet améliore la pertinence de vos recettes et alertes anti-gaspi.
      </p>
    </div>
  )
}
