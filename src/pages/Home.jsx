import { useState, useEffect, useRef } from 'react'
import DiveCurve from '../components/DiveCurve'

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
  return (
    <div style={{ padding: '10px 12px 14px', fontFamily: 'Inter, sans-serif' }}>
      <h3 style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 17, color: C.ivory, margin: '2px 0 10px' }}>
        Mes plongées
      </h3>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        {[['PLONGÉES', '12'], ['CUMULÉ', '5h30'], ['MAX', '50m']].map(([l, v]) => (
          <div key={l} style={{ flex: 1, background: C.surface, borderRadius: 9, padding: '5px 3px', textAlign: 'center' }}>
            <div style={{ fontSize: 6, color: C.muted, letterSpacing: '0.12em', marginBottom: 2 }}>{l}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.ivory }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 9, overflow: 'hidden' }}>
        {['Tout', 'Mer', 'Lac', '3 derniers mois'].map((f, i) => (
          <span key={f} style={{
            fontSize: 7.5, padding: '2px 7px', borderRadius: 10,
            background: i === 0 ? C.coral : C.surface,
            color: i === 0 ? '#fff' : C.muted,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>{f}</span>
        ))}
      </div>

      {/* Dive entries */}
      {[
        { num: '001', site: 'Gk',        date: '9 JUIN 2026', d: '50m', t: '99min' },
        { num: '002', site: 'Marseille', date: '2 JUIN 2026', d: '32m', t: '45min' },
      ].map(({ num, site, date, d, t }) => (
        <div key={num} style={{
          background: C.surface, borderRadius: 10, padding: '7px 9px',
          marginBottom: 5, display: 'flex', alignItems: 'center',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 6.5, color: C.muted }}>N° {num}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.ivory }}>{site}</div>
            <div style={{ fontSize: 7, color: C.muted }}>{date}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: C.coral, fontWeight: 600 }}>{d} · {t}</div>
            <span style={{
              fontSize: 7, color: C.cyan, border: `1px solid ${C.cyan}`,
              borderRadius: 3, padding: '1px 4px', display: 'inline-block', marginTop: 2,
            }}>LOISIR</span>
          </div>
        </div>
      ))}

      {/* FAB */}
      <div style={{
        width: 30, height: 30, borderRadius: '50%', background: C.coral,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginLeft: 'auto', marginTop: 6,
        boxShadow: `0 4px 14px rgba(232,132,90,0.5)`,
        fontSize: 18, color: '#fff', lineHeight: 1,
      }}>+</div>
    </div>
  )
}

function ScreenMap() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div style={{ padding: '10px 12px 6px' }}>
        <h3 style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 17, color: C.ivory, margin: 0 }}>
          Carte
        </h3>
      </div>

      {/* Map tile */}
      <div style={{
        margin: '0 8px', height: 185, borderRadius: 14, overflow: 'hidden',
        background: '#0A2038', position: 'relative',
      }}>
        {/* Pseudo-carte : grille + trait de côte */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.28 }}>
          {[40, 80, 120, 160].map(y => <line key={y} x1="0" y1={y} x2="220" y2={y} stroke={C.muted} strokeWidth="0.5" />)}
          {[44, 88, 132, 176].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" stroke={C.muted} strokeWidth="0.5" />)}
          <path d="M0,65 Q35,50 72,80 Q110,110 155,90 Q180,80 220,100"
            stroke={C.muted} strokeWidth="1.5" fill="none" strokeDasharray="5,3" />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(130deg, rgba(0,100,200,0.22) 0%, transparent 55%)',
        }} />
        {/* Markers avec pulse */}
        <div className="map-marker" style={{ position: 'absolute', top: '36%', left: '35%' }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: C.coral }} />
        </div>
        <div className="map-marker" style={{ position: 'absolute', top: '58%', left: '60%' }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: C.coral, animationDelay: '1.1s' }} />
        </div>
      </div>

      {/* Bottom sheet météo */}
      <div style={{ margin: '6px 8px 10px', background: C.surface, borderRadius: 12, padding: '9px 10px' }}>
        {/* Onglets temporels */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 7 }}>
          {['Maintenant', "Aujourd'hui", 'Demain'].map((t, i) => (
            <span key={t} style={{
              fontSize: 7.5, padding: '2px 5px', borderRadius: 8,
              background: i === 0 ? C.coral : 'transparent',
              color: i === 0 ? '#fff' : C.muted,
              border: i !== 0 ? `1px solid rgba(107,125,142,0.22)` : 'none',
            }}>{t}</span>
          ))}
        </div>
        {/* Données météo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          {[['🌡', '24°', 'TEMP'], ['💨', '10 km/h', 'VENT'], ['🌊', '0.1 m', 'VAGUES']].map(([ic, v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12 }}>{ic}</div>
              <div style={{ fontSize: 9, color: C.ivory, fontWeight: 600 }}>{v}</div>
              <div style={{ fontSize: 6.5, color: C.muted, letterSpacing: '0.08em' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ScreenStats() {
  return (
    <div style={{ padding: '10px 12px 14px', fontFamily: 'Inter, sans-serif' }}>
      <h3 style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 17, color: C.ivory, margin: '2px 0 9px' }}>
        Stats
      </h3>

      {/* KPIs 2×2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 8 }}>
        {[['PLONGÉES', '12'], ['CUMULÉ', '5h30'], ['MAX', '50m'], ['MOY', '32m']].map(([l, v]) => (
          <div key={l} style={{ background: C.surface, borderRadius: 8, padding: '5px 7px' }}>
            <div style={{ fontSize: 6, color: C.muted, letterSpacing: '0.1em', marginBottom: 2 }}>{l}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.ivory }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Navigation mois */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <span style={{ color: C.muted, fontSize: 12, padding: '0 4px' }}>‹</span>
        <span style={{ fontSize: 10, color: C.ivory, fontWeight: 500 }}>juin 2026</span>
        <span style={{ color: C.muted, fontSize: 12, padding: '0 4px' }}>›</span>
      </div>

      {/* Scatter plot SVG */}
      <div style={{ background: C.surface, borderRadius: 10, padding: '8px 6px 5px', marginBottom: 8 }}>
        <svg viewBox="0 0 190 78" width="100%" aria-label="Courbe de profondeur juin 2026">
          {[20, 42, 64].map(y => <line key={y} x1="18" y1={y} x2="188" y2={y} stroke={C.border} strokeWidth="0.7" />)}
          {[['0m', 3, 20], ['25m', 3, 42], ['50m', 3, 64]].map(([l, x, y]) => (
            <text key={l} x={x} y={y + 3} fontSize="5.5" fill={C.muted}>{l}</text>
          ))}
          {/* Points de données — y plus élevé = plus profond */}
          {[[32,42],[55,30],[80,53],[108,36],[135,63],[158,40]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 4 ? 5.5 : 3.5}
              fill={i === 4 ? C.coral : C.card}
              stroke={i === 4 ? C.coral : C.muted}
              strokeWidth="1.5"
            />
          ))}
          <text x="135" y="75" fontSize="6" fill={C.coral} textAnchor="middle">-50m</text>
        </svg>
      </div>

      {/* Records */}
      <div style={{ fontSize: 7.5, color: C.muted, letterSpacing: '0.1em', marginBottom: 4 }}>RECORDS</div>
      <div style={{ display: 'flex', gap: 4 }}>
        {[['+ PROFONDE', '50m · Gk'], ['+ LONGUE', '99min · Gk']].map(([l, v]) => (
          <div key={l} style={{ flex: 1, background: C.surface, borderRadius: 7, padding: '4px 6px' }}>
            <div style={{ fontSize: 6.5, color: C.muted, letterSpacing: '0.07em' }}>{l}</div>
            <div style={{ fontSize: 9, color: C.ivory, fontWeight: 600, marginTop: 1 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScreenKit() {
  return (
    <div style={{ padding: '10px 12px 14px', fontFamily: 'Inter, sans-serif' }}>
      <h3 style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 17, color: C.ivory, margin: '2px 0 14px' }}>
        Kit
      </h3>
      {['MES PIÈCES', 'MES CONFIGURATIONS', 'MES CONTACTS', 'MES ÉQUIPES'].map(title => (
        <div key={title} style={{ marginBottom: 11 }}>
          <div style={{ fontSize: 7, color: C.muted, letterSpacing: '0.12em', marginBottom: 5 }}>{title}</div>
          <div style={{
            borderRadius: 9, padding: '7px 10px',
            border: `1.5px dashed rgba(107,125,142,0.28)`,
            display: 'flex', alignItems: 'center', gap: 7,
          }}>
            <span style={{ color: C.coral, fontSize: 14, lineHeight: 1, fontWeight: 300 }}>+</span>
            <span style={{ color: C.muted, fontSize: 8.5 }}>Ajouter</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function ScreenProfile() {
  return (
    <div style={{ padding: '10px 12px 14px', fontFamily: 'Inter, sans-serif' }}>
      <h3 style={{ fontFamily: '"Cormorant Garamond",serif', fontStyle: 'italic', fontSize: 17, color: C.ivory, margin: '2px 0 12px' }}>
        Profil
      </h3>
      {/* Avatar cerclé corail */}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%', background: C.surface,
          border: `2.5px solid ${C.coral}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 7px', fontSize: 16, fontWeight: 700, color: C.ivory,
        }}>JK</div>
        <div style={{ fontSize: 11, fontWeight: 600, color: C.ivory, marginBottom: 2 }}>Jordan K.</div>
        <div style={{ fontSize: 8.5, color: C.muted }}>Plongeur depuis 2020</div>
      </div>
      {/* Certification */}
      <div style={{ background: C.surface, borderRadius: 9, padding: '7px 9px', marginBottom: 8 }}>
        <div style={{ fontSize: 6.5, color: C.muted, letterSpacing: '0.1em', marginBottom: 3 }}>CERTIFICATION</div>
        <div style={{ fontSize: 11, color: C.ivory, fontWeight: 600 }}>DJFJJD</div>
        <div style={{ fontSize: 8, color: C.muted }}>Niveau 2 · 2022</div>
      </div>
      {/* Préférences */}
      {[['Mode sombre', '●'], ['Langue', 'FR']].map(([label, val]) => (
        <div key={label} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '5px 0', borderBottom: `1px solid ${C.border}`,
        }}>
          <span style={{ fontSize: 9.5, color: C.ivory }}>{label}</span>
          <span style={{ fontSize: 9.5, color: C.coral, fontWeight: 600 }}>{val}</span>
        </div>
      ))}
      <div style={{ fontSize: 7.5, color: C.muted, textAlign: 'center', marginTop: 9 }}>v1.0.0</div>
    </div>
  )
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

          {/* Mockup téléphone */}
          <div className="ph-hero-phone">
            <PhoneFrame>
              <ScreenDives />
            </PhoneFrame>
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
