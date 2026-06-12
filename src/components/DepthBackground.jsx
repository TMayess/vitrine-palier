import { useEffect, useRef } from 'react'
import { scrollProgress } from '../lib/depth'

// Le fond s'assombrit à mesure qu'on descend, puis ré-éclaircit
// pendant la remontée finale. Interpolation RGB entre paliers de
// couleur, écrite directement sur le DOM (zéro re-render).
const STOPS = [
  [0.0,  [14, 28, 43]],
  [0.32, [10, 20, 31]],
  [0.62, [6, 13, 21]],
  [0.84, [3, 8, 13]],
  [1.0,  [13, 27, 41]],
]

function colorAt(p) {
  let lo = STOPS[0]
  let hi = STOPS[STOPS.length - 1]
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (p >= STOPS[i][0] && p <= STOPS[i + 1][0]) {
      lo = STOPS[i]
      hi = STOPS[i + 1]
      break
    }
  }
  const span = hi[0] - lo[0] || 1
  const t = (p - lo[0]) / span
  const c = lo[1].map((v, i) => Math.round(v + (hi[1][i] - v) * t))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}

export default function DepthBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = null
    const update = () => {
      raf = null
      el.style.backgroundColor = colorAt(scrollProgress())
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: 'rgb(14, 28, 43)' }}
      aria-hidden="true"
    >
      {/* Lueurs ambiantes fixes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 38% at 70% 8%, rgba(95,191,174,0.07) 0%, transparent 60%),' +
            'radial-gradient(ellipse 45% 40% at 12% 55%, rgba(232,132,90,0.04) 0%, transparent 55%)',
        }}
      />
    </div>
  )
}
