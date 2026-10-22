// Grey block standing in for content that has not arrived. The shimmer is
// decorative, so it is hidden from assistive technology: the surrounding
// region announces the loading state once, instead of every placeholder
// shouting it.
export default function Skeleton({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`block animate-shimmer rounded-md bg-line/60 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent)] bg-[length:300%_100%] motion-reduce:animate-none ${className}`}
    />
  )
}
