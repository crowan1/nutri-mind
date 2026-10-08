import { useEffect, useRef, useState } from 'react'

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], self) => {
        if (!entry.isIntersecting) return
        setShown(true)
        // Once is enough: the animation should not replay on every pass.
        self.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px' },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      {...rest}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
