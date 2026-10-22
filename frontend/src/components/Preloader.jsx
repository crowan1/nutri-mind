import { useEffect, useRef, useState } from 'react'

import { useAuth } from '../context/AuthContext'

// A session check that resolves in 80 ms does not need a preloader: making one
// appear and vanish that fast reads as a glitch. Nothing is drawn until the
// wait is long enough to be worth acknowledging.
const APPEARANCE_DELAY = 220

// The bar eases towards this value and never reaches it on its own. Only the
// session actually resolving takes it to 100, so it never claims progress that
// has not happened.
const CEILING = 92

// Per-millisecond rates, applied as 1 - exp(-rate * dt) so the easing is the
// same whether the display runs at 60 or 144 Hz.
//
// Two regimes rather than one curve. A single exponential cannot be both quick
// off the mark and slow later: tuned for a long wait it crawls at 40% after six
// seconds, tuned for a short one it parks near the ceiling within two. So the
// bar covers the first stretch briskly — most sessions resolve in there — then
// drops to a crawl it never quite finishes, which is the honest shape of a wait
// whose length is unknown.
const HANDOVER = 70
const EAGER_RATE = 0.0022
const CRAWL_RATE = 0.00025
const FINISH_RATE = 0.022

// Everything after the session resolves is time the user pays for a wait that
// is already over, so the exit is kept to 650 ms total. HOLD still covers the
// worst-case climb to 100 — 225 ms, from the lowest value the bar can be at
// when a fast session lands — so the number is never cut off mid-count.
const HOLD = 250
const FADE = 400

const WORDMARK = "Nutri'Mind"
const LETTER_STAGGER = 70

// Where each letter starts before it lands: x, y, rotation. Hand-placed rather
// than random so the scatter is the same on every load and stays tunable.
const SCATTER = [
  ['-2.5rem', '-1.8rem', '-22deg'],
  ['1.8rem', '2.2rem', '16deg'],
  ['-1.2rem', '2.6rem', '28deg'],
  ['2.6rem', '-2.1rem', '-14deg'],
  ['-2.8rem', '1.4rem', '20deg'],
  ['0.9rem', '-2.7rem', '-26deg'],
  ['2.2rem', '1.9rem', '12deg'],
  ['-1.9rem', '-2.4rem', '24deg'],
  ['1.4rem', '2.8rem', '-18deg'],
  ['-2.3rem', '-1.1rem', '18deg'],
]

export default function Preloader() {
  const { busy } = useAuth()

  const [shown, setShown] = useState(false)
  const [exiting, setExiting] = useState(false)

  const fillRef = useRef(null)
  const labelRef = useRef(null)
  const progress = useRef(0)

  // Arms on every busy spell, not just the first: the same panel covers the
  // opening session check, signing in and signing up. The bar is rewound here
  // rather than on the way out, so a spell that ends before the threshold
  // leaves nothing behind to clean up.
  useEffect(() => {
    if (!busy) return

    const timer = setTimeout(() => {
      progress.current = 0
      setExiting(false)
      setShown(true)
    }, APPEARANCE_DELAY)

    return () => clearTimeout(timer)
  }, [busy])

  // The bar is driven straight onto the DOM from a rAF loop rather than through
  // React state. Two reasons: a state update per frame would re-render the
  // whole panel sixty times a second, and a CSS width transition would be
  // chasing a value that moves faster than it can settle, leaving the bar
  // permanently behind the number.
  useEffect(() => {
    if (!shown) return

    let frame
    let previous = performance.now()

    const step = (now) => {
      // Capped so a backgrounded tab does not resume with one enormous jump.
      const elapsed = Math.min(now - previous, 120)
      previous = now

      const waiting = busy
      const target = waiting ? CEILING : 100
      const rate = waiting
        ? progress.current < HANDOVER
          ? EAGER_RATE
          : CRAWL_RATE
        : FINISH_RATE

      progress.current += (target - progress.current) * (1 - Math.exp(-rate * elapsed))

      if (fillRef.current) fillRef.current.style.width = `${progress.current.toFixed(2)}%`
      if (labelRef.current) labelRef.current.textContent = String(Math.round(progress.current))

      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [busy, shown])

  useEffect(() => {
    if (busy || !shown) return

    const out = setTimeout(() => setExiting(true), HOLD)
    const done = setTimeout(() => {
      setShown(false)
      setExiting(false)
    }, HOLD + FADE)

    return () => {
      clearTimeout(out)
      clearTimeout(done)
    }
  }, [busy, shown])

  // Mounted from the moment the app goes busy so the panel can fade in rather
  // than cut in, and kept until the exit has played out. A spell shorter than
  // the threshold never sets `shown`, so this collapses straight back to null
  // and nothing is drawn.
  if (!busy && !shown && !exiting) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Chargement"
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center gap-12 bg-night transition-opacity duration-[400ms] motion-reduce:transition-none ${
        shown && !exiting ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* The contents mount only once the panel is on screen, so the entrance
          plays in full instead of being half over by the time it fades in. */}
      {shown && (
        <>
          <div className="flex items-center gap-4">
            <span
              className="flex size-14 animate-mark-in items-center justify-center motion-reduce:animate-none"
              style={{ animationDelay: `${WORDMARK.length * LETTER_STAGGER + 120}ms` }}
            >
              <img src="/favicon.svg" alt="" width="56" height="56" className="size-14" />
            </span>

            {/* Each letter is its own box so it can travel independently. The
                word is given to assistive tech once, on the wrapper. */}
            <p
              aria-label={WORDMARK}
              className="flex text-4xl font-extrabold tracking-tight text-page sm:text-5xl"
            >
              {WORDMARK.split('').map((letter, index) => {
                const [x, y, r] = SCATTER[index % SCATTER.length]

                return (
                  <span
                    key={`${letter}-${index}`}
                    aria-hidden="true"
                    className="inline-block animate-letter-in motion-reduce:animate-none"
                    style={{
                      '--letter-x': x,
                      '--letter-y': y,
                      '--letter-r': r,
                      animationDelay: `${index * LETTER_STAGGER}ms`,
                    }}
                  >
                    {letter}
                  </span>
                )
              })}
            </p>
          </div>

          {/* Hidden from assistive tech on purpose: the number changes every
              frame, and the panel above already announces the wait once. */}
          <div aria-hidden="true" className="flex w-64 flex-col items-center gap-3">
            <p className="text-2xl font-extrabold tabular-nums text-page">
              <span ref={labelRef}>0</span>
              <span className="ml-1 text-sm font-bold text-page/50">%</span>
            </p>

            <span className="relative h-[3px] w-full rounded-full bg-page/15">
              <span
                ref={fillRef}
                style={{ width: '0%' }}
                className="absolute inset-y-0 left-0 rounded-full bg-page"
              >
                {/* Sweep along the filled part, so the bar reads as working
                    rather than as a static block that happens to grow. */}
                <span className="absolute inset-0 animate-shimmer rounded-full bg-[linear-gradient(90deg,transparent,rgba(22,163,74,0.5),transparent)] bg-[length:300%_100%] motion-reduce:animate-none" />

                {/* Glow riding the leading edge. It sits half outside the fill
                    so the head keeps a soft edge instead of a hard cut. */}
                <span className="absolute top-1/2 right-0 size-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-page blur-[3px] motion-reduce:hidden" />
              </span>
            </span>
          </div>
        </>
      )}
    </div>
  )
}
