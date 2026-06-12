import { useRef, useEffect } from 'react'

export default function DiveCurve({ className = '' }) {
  const pathRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      path.style.strokeDasharray = 'none'
      path.style.strokeDashoffset = '0'
      return
    }

    path.style.strokeDasharray = '3000'
    path.style.strokeDashoffset = '3000'

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        path.style.transition = 'stroke-dashoffset 1.8s ease-in-out'
        path.style.strokeDashoffset = '0'
      })
    })
  }, [])

  return (
    <svg
      viewBox="0 0 1200 180"
      className={`w-full ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Dive profile: surface → rapid descent → depth plateau → gradual ascent → deco stop → surface */}
      <path
        ref={pathRef}
        d="
          M0,20
          C60,20 90,20 130,155
          C160,158 200,160 350,160
          C500,160 540,160 580,140
          C620,120 650,40 700,25
          C730,15 760,15 800,60
          C830,60 860,60 890,60
          C920,60 960,20 1050,18
          C1100,16 1150,18 1200,18
        "
        stroke="#5FBFAE"
        strokeOpacity="0.38"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
