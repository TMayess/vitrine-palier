import { useRef } from 'react'
import { usePrefersReducedMotion, useInView, useCountUp } from '../hooks'
import DepthBackground from '../components/DepthBackground'
import ParticleField from '../components/ParticleField'
import DepthGauge from '../components/DepthGauge'
import IntroOverlay from '../components/IntroOverlay'
import DiveCurve from '../components/DiveCurve'
import screen1 from '../assets/ecrant 1.jpeg'
import screen2 from '../assets/ecrant 2.jpeg'
import screen3 from '../assets/ecrant 3.jpeg'
import screen4 from '../assets/ecrant 4.jpeg'
import screen5 from '../assets/ecrant 5.jpeg'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.palier.app'

// ── Données ──────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    src: screen1,
    alt: 'Écran journal de plongées de Palier',
    depth: 12,
    accent: '#E8845A',
    title: 'Ton journal de bord',
    desc: 'Enregistre chaque plongée : site, profondeur, durée, température, visibilité, équipier. Un logbook complet, toujours dans ta poche.',
    specs: ['PROFONDEUR', 'DURÉE', 'VISIBILITÉ', 'BINÔME'],
  },
  {
    src: screen2,
    alt: 'Écran carte des spots de Palier',
    depth: 18,
    accent: '#4A90D9',
    title: "Tous tes spots en un coup d'œil",
    desc: 'Visualise tes sites de plongée sur une carte interactive. Météo marine en temps réel : vent, vagues, houle, coefficients de marée.',
    specs: ['VENT', 'HOULE', 'MARÉES', 'SPOTS'],
  },
  {
    src: screen3,
    alt: 'Écran statistiques de Palier',
    depth: 25,
    accent: '#00C9B1',
    title: 'Mesure ta progression',
    desc: "Courbes de profondeur, records personnels, cumuls de temps sous l'eau. Tes données, visualisées mois par mois.",
    specs: ['COURBES', 'RECORDS', 'CUMULS'],
  },
  {
    src: screen4,
    alt: 'Écran gestion du matériel de Palier',
    depth: 32,
    accent: '#C99B6A',
    title: 'Gère ton matériel',
    desc: "Inventorie tes pièces d'équipement, crée des configurations pour chaque type de plongée, organise tes contacts et équipes.",
    specs: ['ÉQUIPEMENT', 'CONFIGS', 'CONTACTS'],
  },
  {
    src: screen5,
    alt: 'Écran profil et certifications de Palier',
    depth: 40,
    accent: '#5FBFAE',
    title: 'Ton carnet de certifications',
    desc: "Stocke tes certifications, consulte ton ancienneté, personnalise l'application. Ton profil de plongeur, centralisé.",
    specs: ['CERTIFICATIONS', 'ANCIENNETÉ', 'THÈME'],
  },
]

const MARQUEE_ITEMS = [
  'JOURNAL DE BORD',
  'CARTE DES SPOTS',
  'MÉTÉO MARINE',
  'STATISTIQUES',
  'MATÉRIEL',
  'CERTIFICATIONS',
  '100% OFFLINE',
  '0 ABONNEMENT',
]

// ── Badge Google Play ────────────────────────────────────────────────────────

function PlayStoreBadge() {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Télécharger Palier sur Google Play"
      className="inline-flex items-center gap-3.5 bg-palier-ivory text-palier-navy px-6 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(95,191,174,0.3)]"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3.18 23.76c.37.21.8.22 1.18.04L16.81 12 4.36.2C3.98.02 3.55.03 3.18.24 2.47.65 2 1.43 2 2.28v19.44c0 .85.47 1.63 1.18 2.04z" />
        <path d="M20.49 10.65L17.7 9.1 14.62 12l3.08 2.9 2.79-1.55c.8-.44 1.28-1.22 1.28-2.1 0-.88-.48-1.66-1.28-2.1z" opacity=".55" />
        <path d="M4.36 23.8L16.1 13.22 17.7 14.9 4.88 23.98c-.19.12-.34.18-.52.18z" opacity=".38" />
        <path d="M4.36.2L17.7 9.1 16.1 10.78 4.36.2z" opacity=".75" />
      </svg>
      <span className="text-left font-mono">
        <span className="block text-[9px] tracking-[0.18em] opacity-60">DISPONIBLE SUR</span>
        <span className="block text-sm font-bold tracking-wide leading-tight">Google Play</span>
      </span>
    </a>
  )
}

// ── Téléphone (tilt 3D + flottaison) ─────────────────────────────────────────

function PhoneShowcase({ src, alt, accent, floatDelay = 0 }) {
  const tiltRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  const handleMove = (e) => {
    if (reduced) return
    const el = tiltRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1100px) rotateY(${(px * 16).toFixed(2)}deg) rotateX(${(-py * 12).toFixed(2)}deg) scale(1.02)`
  }

  const handleLeave = () => {
    const el = tiltRef.current
    if (el) el.style.transform = 'perspective(1100px) rotateY(0deg) rotateX(0deg) scale(1)'
  }

  return (
    <div
      className="relative"
      style={{ animation: reduced ? 'none' : `floaty 7s ease-in-out ${floatDelay}s infinite` }}
    >
      {/* Halo de couleur */}
      <div
        className="absolute -inset-12 rounded-full blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}30 0%, transparent 65%)` }}
        aria-hidden="true"
      />
      <div
        ref={tiltRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative w-[228px] sm:w-[252px] rounded-[42px] border border-palier-ivory/10 bg-[#06111C] p-[7px]"
        style={{
          transition: 'transform 0.22s ease-out',
          boxShadow: '0 50px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        <div className="relative rounded-[35px] overflow-hidden">
          <img src={src} alt={alt} className="w-full block" loading="lazy" />
          {/* Reflet d'écran */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.07) 48%, transparent 62%)',
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}

// ── Marqueur de palier (règle graduée) ───────────────────────────────────────

function PalierMarker({ index, depth }) {
  const { ref, inView } = useInView(0.5)
  return (
    <div ref={ref} className={`flex items-center gap-5 reveal ${inView ? 'in' : ''}`}>
      <span className="font-mono text-[10px] tracking-[0.35em] text-palier-coral whitespace-nowrap">
        PALIER {String(index).padStart(2, '0')}
      </span>
      <div className="ruler flex-1" aria-hidden="true" />
      <span className="font-mono text-[10px] tracking-[0.35em] text-palier-muted whitespace-nowrap">
        −{depth} M
      </span>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────

const TITLE_WORDS = ['Chaque', 'plongée', 'mérite', "d'être"]

function HeroSection({ delayBase }) {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Ligne de surface scintillante */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(95,191,174,0.55) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 7s linear infinite',
        }}
        aria-hidden="true"
      />

      {/* Rayons de lumière */}
      <div
        className="absolute -top-1/4 left-[22%] w-[32%] h-[150%] blur-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(95,191,174,0.10), transparent 55%)',
          animation: 'ray-sway 9s ease-in-out infinite alternate',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-1/4 left-[56%] w-[22%] h-[140%] blur-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(232,132,90,0.06), transparent 50%)',
          animation: 'ray-sway 12s ease-in-out infinite alternate-reverse',
        }}
        aria-hidden="true"
      />

      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-28 pt-10 max-w-5xl mx-auto w-full">
        <p
          className="font-mono text-[10px] sm:text-[11px] tracking-[0.45em] text-palier-teal mb-8"
          style={{ animation: `rise 0.9s cubic-bezier(0.2, 0.65, 0.2, 1) ${delayBase}s both` }}
        >
          [ SURFACE · 0 M ]
        </p>

        <h1 className="font-display italic text-palier-ivory leading-[1.05] tracking-[-0.01em] text-[clamp(2.9rem,8vw,6.3rem)] mb-9">
          {TITLE_WORDS.map((word, i) => (
            <span
              key={word}
              className="inline-block"
              style={{
                animation: `rise 0.95s cubic-bezier(0.2, 0.65, 0.2, 1) ${delayBase + 0.12 + i * 0.09}s both`,
              }}
            >
              {word}&nbsp;
            </span>
          ))}
          <span
            className="inline-block text-palier-coral"
            style={{
              animation: `rise 0.95s cubic-bezier(0.2, 0.65, 0.2, 1) ${delayBase + 0.12 + TITLE_WORDS.length * 0.09}s both`,
            }}
          >
            racontée.
          </span>
        </h1>

        <p
          className="font-mono text-[11px] sm:text-xs tracking-[0.3em] text-palier-muted mb-12"
          style={{ animation: `rise 0.9s cubic-bezier(0.2, 0.65, 0.2, 1) ${delayBase + 0.65}s both` }}
        >
          LOGBOOK DE PLONGÉE · OFFLINE · SANS ABONNEMENT
        </p>

        <div style={{ animation: `rise 0.9s cubic-bezier(0.2, 0.65, 0.2, 1) ${delayBase + 0.8}s both` }}>
          <PlayStoreBadge />
        </div>
      </div>

      {/* Invitation à descendre */}
      <button
        type="button"
        onClick={() => document.getElementById('palier-01')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group"
        style={{ animation: `rise 0.9s ease ${delayBase + 1.1}s both` }}
        aria-label="Descendre vers le premier palier"
      >
        <span className="font-mono text-[9px] tracking-[0.45em] text-palier-muted group-hover:text-palier-teal transition-colors">
          DESCENDRE
        </span>
        <span className="relative block w-px h-9 bg-palier-ivory/15 overflow-hidden">
          <span
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-palier-coral"
            style={{ animation: 'cue-drop 1.8s ease-in-out infinite' }}
          />
        </span>
      </button>

      {/* Profil de plongée */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <DiveCurve />
      </div>
    </section>
  )
}

// ── Bandeau défilant ─────────────────────────────────────────────────────────

function Marquee() {
  const half = (key) => (
    <div key={key} className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="flex items-center font-mono text-[10px] tracking-[0.35em] text-palier-muted">
          <span className="px-7">{item}</span>
          <span className="text-palier-coral" aria-hidden="true">·</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="relative border-y border-palier-ivory/10 py-4 overflow-hidden" aria-hidden="true">
      <div className="flex w-max" style={{ animation: 'marquee 38s linear infinite' }}>
        {half(0)}
        {half(1)}
      </div>
    </div>
  )
}

// ── Sections de paliers (features) ───────────────────────────────────────────

function FeatureSection({ feature, index }) {
  const { ref, inView } = useInView(0.16)
  const reversed = index % 2 !== 0
  const { src, alt, depth, accent, title, desc, specs } = feature

  return (
    <section id={`palier-${String(index + 1).padStart(2, '0')}`} className="px-6 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <PalierMarker index={index + 1} depth={depth} />

        <div
          ref={ref}
          className={`mt-14 flex flex-col items-center gap-14 md:gap-24 ${
            reversed ? 'md:flex-row-reverse' : 'md:flex-row'
          }`}
        >
          <div className={`shrink-0 ${reversed ? 'reveal-right' : 'reveal-left'} ${inView ? 'in' : ''}`}>
            <PhoneShowcase src={src} alt={alt} accent={accent} floatDelay={index * 0.9} />
          </div>

          <div className={`relative flex-1 min-w-0 reveal ${inView ? 'in' : ''}`} style={{ transitionDelay: '0.12s' }}>
            {/* Profondeur fantôme */}
            <span
              className="absolute -top-16 -left-2 font-display italic text-[6.5rem] sm:text-[8rem] leading-none text-palier-ivory/[0.045] select-none pointer-events-none"
              aria-hidden="true"
            >
              −{depth}
            </span>

            <div
              className="h-[3px] w-12 rounded mb-7"
              style={{
                background: accent,
                transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.8s cubic-bezier(0.2, 0.65, 0.2, 1) 0.25s',
              }}
              aria-hidden="true"
            />

            <h2 className="font-display italic text-palier-ivory text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.15] mb-5">
              {title}
            </h2>

            <p className="font-mono text-[13px] sm:text-sm text-palier-muted leading-[1.9] max-w-md">
              {desc}
            </p>

            <div className="flex flex-wrap gap-2 mt-8">
              {specs.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[9px] tracking-[0.22em] px-3.5 py-1.5 rounded-full border border-palier-ivory/15 text-palier-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Console (ordinateur de bord) ─────────────────────────────────────────────

function Readout({ target, suffix, label, sub }) {
  const { ref, inView } = useInView(0.45)
  const value = useCountUp(target, inView)

  return (
    <div ref={ref} className={`px-8 py-12 text-center reveal ${inView ? 'in' : ''}`}>
      <div className="font-mono text-5xl md:text-6xl text-palier-cyan tracking-tight mb-4">
        {value}
        {suffix}
        <span
          className="inline-block w-[3px] h-[0.85em] bg-palier-cyan/70 ml-2 align-baseline"
          style={{ animation: 'blink 1.3s steps(1) infinite' }}
          aria-hidden="true"
        />
      </div>
      <div className="font-mono text-[10px] tracking-[0.3em] text-palier-coral mb-3">{label}</div>
      <div className="font-mono text-[11px] text-palier-muted leading-relaxed">{sub}</div>
    </div>
  )
}

function ConsoleSection() {
  const { ref, inView } = useInView(0.2)

  return (
    <section className="px-6 py-24 sm:py-32">
      <div ref={ref} className={`max-w-4xl mx-auto reveal ${inView ? 'in' : ''}`}>
        <div className="border border-palier-ivory/10 rounded-2xl bg-palier-deep/40 backdrop-blur-sm overflow-hidden">
          {/* Barre de titre */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-palier-ivory/10">
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full bg-palier-coral"
                style={{ animation: 'blink 1.6s steps(1) infinite' }}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] tracking-[0.3em] text-palier-ivory">
                ORDINATEUR DE BORD
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-palier-muted">
              FOND · −42 M
            </span>
          </div>

          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-palier-ivory/10">
            <Readout target={100} suffix=" %" label="OFFLINE" sub="Fonctionne sans connexion internet" />
            <Readout target={0} suffix=" €" label="ABONNEMENT" sub="Gratuit, pour toujours" />
            <Readout target={5} suffix="" label="MODULES" sub="Plongées · Carte · Stats · Kit · Profil" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Remontée (CTA final) ─────────────────────────────────────────────────────

function AscentCTA() {
  const { ref, inView } = useInView(0.25)

  return (
    <section className="relative px-6 pt-32 pb-40 overflow-hidden">
      {/* Lumière de surface qui revient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(95,191,174,0.13) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div ref={ref} className={`relative max-w-2xl mx-auto text-center reveal ${inView ? 'in' : ''}`}>
        <p className="font-mono text-[10px] tracking-[0.45em] text-palier-teal mb-8">
          [ PALIER DE SÉCURITÉ · −3 M ]
        </p>

        <h2 className="font-display italic text-palier-ivory text-[clamp(2.4rem,5vw,4rem)] leading-[1.1] mb-6">
          Commence ton logbook aujourd'hui.
        </h2>

        <p className="font-mono text-[11px] tracking-[0.3em] text-palier-muted mb-14">
          GRATUIT · OFFLINE · SANS ABONNEMENT
        </p>

        {/* Badge entouré d'échos sonar */}
        <div className="relative inline-block">
          <span
            className="absolute -inset-2 rounded-[22px] border border-palier-coral/40 pointer-events-none"
            style={{ animation: 'pulse-ring 2.6s ease-out infinite' }}
            aria-hidden="true"
          />
          <span
            className="absolute -inset-2 rounded-[22px] border border-palier-coral/40 pointer-events-none"
            style={{ animation: 'pulse-ring 2.6s ease-out 1.3s infinite' }}
            aria-hidden="true"
          />
          <PlayStoreBadge />
        </div>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const reduced = usePrefersReducedMotion()
  const introPlaying = (() => {
    if (typeof window === 'undefined' || reduced) return false
    try {
      return !sessionStorage.getItem('palier-intro')
    } catch {
      return false
    }
  })()
  const delayBase = introPlaying ? 1.45 : 0.15

  return (
    <>
      <IntroOverlay />
      <DepthBackground />
      <ParticleField />
      <DepthGauge />

      <main className="relative z-10">
        <HeroSection delayBase={delayBase} />
        <Marquee />
        {FEATURES.map((f, i) => (
          <FeatureSection key={f.title} feature={f} index={i} />
        ))}
        <ConsoleSection />
        <AscentCTA />
      </main>
    </>
  )
}
