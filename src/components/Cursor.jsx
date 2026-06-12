import { useEffect, useRef } from 'react'

// Curseur bulle + ping sonar au clic. Desktop uniquement
// (pointer: fine), désactivé en prefers-reduced-motion.
export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    document.documentElement.classList.add('has-cursor')
    ring.style.display = 'block'
    dot.style.display = 'block'

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf = null

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate(${x}px, ${y}px)`
    }

    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }

    const isInteractive = (el) =>
      el.closest?.('a, button, [role="button"], input, textarea, select')

    const onOver = (e) => {
      if (isInteractive(e.target)) ring.classList.add('cursor-hover')
    }
    const onOut = (e) => {
      if (isInteractive(e.target)) ring.classList.remove('cursor-hover')
    }

    const onClick = (e) => {
      const ping = document.createElement('span')
      ping.className = 'sonar-ping'
      ping.style.left = `${e.clientX}px`
      ping.style.top = `${e.clientY}px`
      document.body.appendChild(ping)
      ping.addEventListener('animationend', () => ping.remove())
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    document.addEventListener('click', onClick)
    raf = requestAnimationFrame(loop)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-layer" style={{ display: 'none' }} aria-hidden="true">
        <div className="cursor-ring-inner" />
      </div>
      <div ref={dotRef} className="cursor-layer" style={{ display: 'none' }} aria-hidden="true">
        <div className="cursor-dot-inner" />
      </div>
    </>
  )
}
