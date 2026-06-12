import { useEffect, useRef } from 'react'

// Neige marine : particules dérivant lentement vers la surface,
// avec un léger balancement sinusoïdal. Canvas unique, pausé quand
// l'onglet est caché, désactivé en prefers-reduced-motion.
export default function ParticleField({ density = 64 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let w = 0
    let h = 0
    let raf = null
    let t = 0

    const resize = () => {
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }
    resize()

    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (0.5 + Math.random() * 1.7) * dpr,
      speed: (0.12 + Math.random() * 0.45) * dpr,
      alpha: 0.04 + Math.random() * 0.13,
      phase: Math.random() * Math.PI * 2,
      sway: (1.5 + Math.random() * 4) * dpr,
    }))

    const tick = () => {
      t += 0.006
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.y -= p.speed
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        const x = p.x + Math.sin(t * 2 + p.phase) * p.sway
        ctx.beginPath()
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240, 237, 232, ${p.alpha})`
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf)
        raf = null
      } else if (!raf) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  )
}
