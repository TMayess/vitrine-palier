import { useEffect, useRef } from 'react'
import { scrollProgress, MAX_DEPTH } from '../lib/depth'

// Profondimètre HUD : rail vertical gradué à droite (desktop) et
// pastille de profondeur (mobile). Lié au scroll, mis à jour via
// refs DOM directes pour rester à 60 fps sans re-render React.
// La boule suit la PROGRESSION du scroll (toujours vers le bas),
// tandis que le texte affiche la profondeur réelle (avec remontée finale).
export default function DepthGauge() {
  const readoutRef = useRef(null)
  const chipRef = useRef(null)
  const needleRef = useRef(null)

  useEffect(() => {
    let raf = null
    const update = () => {
      raf = null
      const progress = scrollProgress()
      // Profondeur linéaire 0 → MAX_DEPTH, toujours croissante avec le scroll
      const depth = progress * MAX_DEPTH
      const label = `−${depth.toFixed(1)} M`
      if (readoutRef.current) readoutRef.current.textContent = label
      if (chipRef.current) chipRef.current.textContent = label
      if (needleRef.current) {
        needleRef.current.style.top = `${progress * 100}%`
      }
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
    <>
      {/* Rail desktop */}
      <div
        className="hidden lg:flex fixed right-7 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.35em] text-palier-muted">
          SURFACE
        </span>

        <div className="relative h-[44vh] w-px bg-palier-ivory/15">
          {/* Graduations tous les ~10 m */}
          {[0, 25, 50, 75, 100].map((pct) => (
            <span
              key={pct}
              className="absolute right-0 w-2.5 h-px bg-palier-ivory/30"
              style={{ top: `${pct}%` }}
            />
          ))}
          {[12.5, 37.5, 62.5, 87.5].map((pct) => (
            <span
              key={pct}
              className="absolute right-0 w-1.5 h-px bg-palier-ivory/15"
              style={{ top: `${pct}%` }}
            />
          ))}
          {/* Aiguille */}
          <span
            ref={needleRef}
            className="absolute -left-[4.5px] w-[10px] h-[10px] rounded-full bg-palier-coral transition-[top] duration-150 ease-out"
            style={{
              top: '0%',
              boxShadow: '0 0 12px rgba(232,132,90,0.8)',
            }}
          />
        </div>

        <span className="font-mono text-[9px] tracking-[0.35em] text-palier-muted">
          FOND
        </span>

        <div
          ref={readoutRef}
          className="font-mono text-[11px] tracking-[0.15em] text-palier-cyan border border-palier-ivory/15 bg-palier-navy/60 backdrop-blur-sm py-1.5 rounded w-[96px] text-center"
        >
          −0.0 M
        </div>
      </div>

      {/* Pastille mobile */}
      <div
        ref={chipRef}
        className="lg:hidden fixed bottom-4 right-4 z-40 font-mono text-[10px] tracking-[0.15em] text-palier-cyan border border-palier-ivory/15 bg-palier-navy/70 backdrop-blur-sm py-1.5 rounded w-[96px] text-center pointer-events-none select-none"
        aria-hidden="true"
      >
        −0.0 M
      </div>
    </>
  )
}
