import { useState, useEffect, useRef } from 'react'
import DiveCurve from '../components/DiveCurve'
import logo from '../assets/logo.png'
import screen1 from '../assets/ecrant 1.jpeg'
import screen2 from '../assets/ecrant 2.jpeg'
import screen3 from '../assets/ecrant 3.jpeg'
import screen4 from '../assets/ecrant 4.jpeg'
import screen5 from '../assets/ecrant 5.jpeg'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.palier.app'

// ── Design tokens (extraits des screenshots réels) ──────────────────────────
const C = {
  dark:    '#0B1520',
  surface: '#111D2C',
  card:    '#162233',
  coral:   '#E8845A',
  cyan:    '#00C9B1',
  ivory:   '#F0EDE8',
  muted:   '#6B7D8E',
  border:  'rgba(240, 237, 232, 0.07)',
}

// ── Hooks ────────────────────────────────────────────────────────────────────

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = (e) => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return reduced
}

function useInView(threshold = 0.13) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCountUp(target, inView, duration = 1700) {
  const [value, setValue] = useState(0)
  const started = useRef(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    if (reduced || target === 0) { setValue(target); return }
    let t0 = null
    let raf
    const step = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, reduced])

  return value
}

// ── Play Store Badge ─────────────────────────────────────────────────────────

function PlayStoreBadge() {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Télécharger Palier sur Google Play"
      className="ps-badge"
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill={C.ivory} aria-hidden="true">
        <path d="M3.18 23.76c.37.21.8.22 1.18.04L16.81 12 4.36.2C3.98.02 3.55.03 3.18.24 2.47.65 2 1.43 2 2.28v19.44c0 .85.47 1.63 1.18 2.04z"/>
        <path d="M20.49 10.65L17.7 9.1 14.62 12l3.08 2.9 2.79-1.55c.8-.44 1.28-1.22 1.28-2.1 0-.88-.48-1.66-1.28-2.1z" opacity=".55"/>
        <path d="M4.36 23.8L16.1 13.22 17.7 14.9 4.88 23.98c-.19.12-.34.18-.52.18z" opacity=".38"/>
        <path d="M4.36.2L17.7 9.1 16.1 10.78 4.36.2z" opacity=".75"/>
      </svg>
      <div>
        <div style={{ fontSize: 9.5, opacity: 0.55, letterSpacing: '0.06em', lineHeight: 1 }}>Disponible sur</div>
        <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>Google Play</div>
      </div>
    </a>
  )
}

// ── Phone Frame ──────────────────────────────────────────────────────────────

function PhoneFrame({ children, reversed = false }) {
  const [hovered, setHovered] = useState(false)
  const reduced = usePrefersReducedMotion()

  const tilt = !reduced && hovered
    ? `perspective(900px) rotateY(${reversed ? -7 : 7}deg) rotateX(2.5deg) scale(1.025)`
    : 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transform: tilt, transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)', flexShrink: 0 }}
    >
      <div style={{
        width: 216,
        borderRadius: 38,
        background: '#06111C',
        border: '1.5px solid rgba(240,237,232,0.1)',
        boxShadow: `0 48px 96px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.04)`,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)',
          width: 54, height: 6, borderRadius: 4, background: '#0B1520', zIndex: 20,
        }} aria-hidden="true" />
        {/* Status bar */}
        <div style={{
          height: 26, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '0 16px 3px', fontSize: 7.5, color: C.muted, fontFamily: 'Inter, sans-serif',
        }} aria-hidden="true">
          <span>9:41</span>
          <span>●●● WiFi</span>
        </div>
        {/* Screen */}
        <div style={{ background: C.dark }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Screen Mockups ───────────────────────────────────────────────────────────

function ScreenDives() {
  return <img src={screen1} alt="Écran journal de plongées" style={{ width: '100%', display: 'block' }} />
}

function ScreenMap() {
  return <img src={screen2} alt="Écran carte des spots" style={{ width: '100%', display: 'block' }} />
}

function ScreenStats() {
  return <img src={screen3} alt="Écran statistiques" style={{ width: '100%', display: 'block' }} />
}

function ScreenKit() {
  return <img src={screen4} alt="Écran gestion du kit" style={{ width: '100%', display: 'block' }} />
}

function ScreenProfile() {
  return <img src={screen5} alt="Écran profil" style={{ width: '100%', display: 'block' }} />
}

// ── Features data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    Screen: ScreenDives,
    title: 'Ton journal de bord',
    desc: 'Enregistre chaque plongée : site, profondeur, durée, température, visibilité, équipier. Un logbook complet, toujours dans ta poche.',
    accent: C.coral,
  },
  {
    Screen: ScreenMap,
    title: "Tous tes spots en un coup d'œil",
    desc: 'Visualise tes sites de plongée sur une carte interactive. Météo marine en temps réel : vent, vagues, houle, coefficients de marée.',
    accent: '#4A90D9',
  },
  {
    Screen: ScreenStats,
    title: 'Mesure ta progression',
    desc: "Courbes de profondeur, records personnels, cumuls de temps sous l'eau. Tes données, visualisées mois par mois.",
    accent: C.cyan,
  },
  {
    Screen: ScreenKit,
    title: 'Gère ton matériel',
    desc: "Inventorie tes pièces d'équipement, crée des configurations pour chaque type de plongée, organise tes contacts et équipes.",
    accent: '#A07850',
  },
  {
    Screen: ScreenProfile,
    title: 'Ton carnet de certifications',
    desc: "Stocke tes certifications, consulte ton ancienneté, personnalise l'application. Ton profil de plongeur, centralisé.",
    accent: C.coral,
  },
]

// ── Sections ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="ph-hero-section"
      style={{ minHeight: '100vh', background: C.dark, position: 'relative', overflow: 'hidden' }}
    >
      {/* Lueurs ambiantes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 50% 40% at 68% 36%, rgba(232,132,90,0.09) 0%, transparent 60%)` }}
        aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 38% 45% at 18% 62%, rgba(0,201,177,0.05) 0%, transparent 55%)` }}
        aria-hidden="true" />

      <div style={{
        maxWidth: 1080, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', minHeight: '100vh',
      }}>
        <div className="ph-hero-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr auto',
          gap: 72, alignItems: 'center', width: '100%',
          paddingTop: 80, paddingBottom: 100,
        }}>
          {/* Texte */}
          <div>
            <p style={{
              fontSize: 11, letterSpacing: '0.22em', color: C.coral,
              textTransform: 'uppercase', marginBottom: 20,
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
            }}>Logbook de plongée</p>

            <h1 style={{
              fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
              fontSize: 'clamp(2.6rem, 4.5vw, 4.2rem)', lineHeight: 1.1,
              color: C.ivory, margin: '0 0 20px', letterSpacing: '-0.01em',
            }}>
              Chaque plongée mérite d'être racontée.
            </h1>

            <p style={{
              fontSize: 17, color: C.muted, lineHeight: 1.75,
              margin: '0 0 38px', fontFamily: 'Inter, sans-serif', maxWidth: 420,
            }}>
              Logbook de plongée. Offline. Sans abonnement.
            </p>

            <PlayStoreBadge />
          </div>

          {/* Logo hero */}
          <div className="ph-hero-phone" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} alt="Palier" style={{ width: 280, height: 280, objectFit: 'contain', mixBlendMode: 'screen' }} />
          </div>
        </div>
      </div>

      {/* Courbe de profil animée */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} aria-hidden="true">
        <DiveCurve />
      </div>
    </section>
  )
}

function FeatureRow({ feature, index }) {
  const { ref, inView } = useInView(0.1)
  const reversed = index % 2 !== 0
  const { Screen, title, desc, accent } = feature

  return (
    <div
      ref={ref}
      className="ph-feature-row"
      style={{
        display: 'flex',
        flexDirection: reversed ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: 68,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(38px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <PhoneFrame reversed={reversed}>
          <Screen />
        </PhoneFrame>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Ligne accent */}
        <div style={{ width: 30, height: 3, borderRadius: 2, background: accent, marginBottom: 20 }} aria-hidden="true" />
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
          fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)', color: C.ivory,
          margin: '0 0 14px', lineHeight: 1.2,
        }}>{title}</h2>
        <p style={{
          fontSize: 16, color: C.muted, lineHeight: 1.8,
          fontFamily: 'Inter, sans-serif', margin: 0, maxWidth: 420,
        }}>{desc}</p>
      </div>
    </div>
  )
}

function FeaturesSection() {
  return (
    <section style={{ background: C.dark, padding: '120px 24px' }}>
      <div style={{ maxWidth: 1050, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 96 }}>
        {FEATURES.map((f, i) => (
          <FeatureRow key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}

function MetricCard({ target, suffix, label, desc }) {
  const { ref, inView } = useInView(0.45)
  const value = useCountUp(target, inView)

  return (
    <div
      ref={ref}
      className="ph-metric-card"
      style={{
        padding: '52px 32px', textAlign: 'center',
        borderRight: `1px solid ${C.border}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
      }}
    >
      <div style={{
        fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
        fontSize: 'clamp(3rem, 5.5vw, 5.2rem)', color: C.ivory,
        lineHeight: 1, marginBottom: 12, letterSpacing: '-0.02em',
      }}>
        {value}{suffix}
      </div>
      <div style={{
        fontSize: 10.5, color: C.coral, letterSpacing: '0.2em',
        textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
        marginBottom: 8, fontWeight: 500,
      }}>{label}</div>
      <div style={{ fontSize: 13, color: C.muted, fontFamily: 'Inter, sans-serif', lineHeight: 1.55 }}>
        {desc}
      </div>
    </div>
  )
}

function MetricsSection() {
  return (
    <section style={{
      background: C.surface,
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div
        className="ph-metrics-grid"
        style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}
      >
        <MetricCard target={100} suffix="%" label="Offline"     desc="Fonctionne sans connexion internet" />
        <MetricCard target={0}   suffix=" €" label="Abonnement" desc="Gratuit, pour toujours" />
        <MetricCard target={5}   suffix=""   label="Modules"    desc="Plongées · Carte · Stats · Kit · Profil" />
      </div>
    </section>
  )
}

function CTASection() {
  const { ref, inView } = useInView()
  return (
    <section style={{ background: C.surface, padding: '120px 24px', textAlign: 'center' }}>
      <div
        ref={ref}
        style={{
          maxWidth: 560, margin: '0 auto',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <p style={{
          fontSize: 10.5, color: C.coral, letterSpacing: '0.22em', textTransform: 'uppercase',
          marginBottom: 20, fontFamily: 'Inter, sans-serif', fontWeight: 500,
        }}>Disponible sur Google Play</p>

        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
          fontSize: 'clamp(2.1rem, 3.5vw, 3.2rem)', color: C.ivory,
          margin: '0 0 14px', lineHeight: 1.2,
        }}>
          Commence ton logbook aujourd'hui.
        </h2>

        <p style={{
          fontSize: 16, color: C.muted, marginBottom: 40,
          fontFamily: 'Inter, sans-serif', lineHeight: 1.65,
        }}>
          Gratuit. Sans abonnement. Toujours avec toi.
        </p>

        <PlayStoreBadge />
      </div>
    </section>
  )
}

// ── Styles (scoped à Home) ────────────────────────────────────────────────────

const PAGE_STYLES = `
  .ps-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: #000;
    color: #F0EDE8;
    padding: 13px 22px;
    border-radius: 14px;
    border: 1px solid rgba(240,237,232,0.13);
    text-decoration: none;
    font-family: Inter, sans-serif;
    transition: opacity 0.18s, transform 0.18s;
  }
  .ps-badge:hover { opacity: 0.82; transform: translateY(-1px); }

  @keyframes ph-pulse {
    0%   { box-shadow: 0 0 0 0   rgba(232,132,90,0.75); }
    70%  { box-shadow: 0 0 0 10px rgba(232,132,90,0);   }
    100% { box-shadow: 0 0 0 0   rgba(232,132,90,0);   }
  }
  .map-marker div { animation: ph-pulse 2.3s infinite; }

  @media (max-width: 860px) {
    .ph-hero-grid {
      grid-template-columns: 1fr !important;
      text-align: center !important;
      gap: 48px !important;
      padding-top: 96px !important;
      padding-bottom: 120px !important;
    }
    .ph-hero-phone { display: flex; justify-content: center; }
    .ph-feature-row {
      flex-direction: column !important;
      gap: 44px !important;
      align-items: center !important;
    }
    .ph-metrics-grid {
      grid-template-columns: 1fr !important;
    }
    .ph-metric-card {
      border-right: none !important;
      border-bottom: 1px solid rgba(240,237,232,0.07) !important;
      padding: 40px 24px !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .map-marker div { animation: none !important; }
  }
`

// ── Export ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <style>{PAGE_STYLES}</style>
      <main>
        <HeroSection />
        <FeaturesSection />
        <MetricsSection />
        <CTASection />
      </main>
    </>
  )
}
