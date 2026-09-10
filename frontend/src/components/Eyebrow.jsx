// Le petit intitule vert au-dessus des titres de section.
export default function Eyebrow({ children, className = '' }) {
  return (
    <p className={`text-xs font-medium tracking-[0.18em] text-brand ${className}`}>{children}</p>
  )
}
