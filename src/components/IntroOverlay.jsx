import { useEffect, useState } from 'react'

// Rupture de surface : la vague du logo se dessine, le palier
// corail apparaît, puis le voile se lève vers le haut comme
// quand on bascule sous l'eau. Une fois par session, < 2 s.
export default function IntroOverlay() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try {
      return !sessionStorage.getItem('palier-intro')
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (!show) return
    try {
      sessionStorage.setItem('palier-intro', '1')
    } catch { /* navigation privée */ }
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setShow(false)
      document.body.style.overflow = ''
    }, 2050)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [show])

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-palier-abyss flex flex-col items-center justify-center gap-7"
      style={{ animation: 'intro-lift 0.7s cubic-bezier(0.7, 0, 0.3, 1) 1.35s forwards' }}
      aria-hidden="true"
    >
      <svg width="190" height="110" viewBox="0 0 200 110" fill="none">
        {/* Vague turquoise */}
        <path
          d="M12 38 C42 8 62 8 92 38 C122 68 142 68 172 38"
          stroke="#5FBFAE"
          strokeWidth="9"
          strokeLinecap="round"
          style={{
            strokeDasharray: 260,
            strokeDashoffset: 260,
            animation: 'intro-draw 0.85s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards',
          }}
        />
        {/* Palier corail pointillé */}
        <path
          d="M14 86 H170"
          stroke="#E8845A"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="16 14"
          style={{
            opacity: 0,
            animation: 'rise 0.5s ease 0.75s forwards',
          }}
        />
        {/* Point du palier */}
        <circle
          cx="92"
          cy="86"
          r="11"
          fill="#E8845A"
          style={{
            transform: 'scale(0)',
            transformOrigin: '92px 86px',
            animation: 'intro-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 1s forwards',
          }}
        />
      </svg>

      <span
        className="font-mono text-sm text-palier-ivory"
        style={{
          opacity: 0,
          animation: 'intro-fade 0.7s ease 0.55s forwards',
        }}
      >
        PALIER
      </span>
    </div>
  )
}
