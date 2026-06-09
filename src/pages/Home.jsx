import DiveCurve from '../components/DiveCurve'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.palier.app'

const FEATURES = [
  {
    title: 'Enregistrement complet',
    description: 'Site, profondeur, durée, température, visibilité, équipier — tout ce qui compte après la remontée.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: 'Courbe de profil',
    description: 'Visualisez chaque plongée sous forme de courbe de profondeur — comme sur un vrai ordinateur de plongée.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: 'Statistiques personnelles',
    description: "Nombre de plongées, profondeur maximale, temps total sous l'eau. Votre progression en un coup d'œil.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: '100% Offline',
    description: "Pas de connexion ? Aucun problème. Palier fonctionne en local grâce à Isar, et se synchronise quand vous revenez à la surface.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
]

const STATS = [
  { value: '∞', label: 'Plongées enregistrables' },
  { value: '100%', label: 'Offline-first' },
  { value: '0€', label: 'Abonnement requis' },
]

const SCREENS = [
  {
    label: 'Mes plongées',
    accent: 'linear-gradient(180deg, rgba(0,212,255,0.08) 0%, rgba(0,212,255,0.02) 100%)',
  },
  {
    label: 'Profil de plongée',
    accent: 'linear-gradient(180deg, rgba(0,212,255,0.15) 0%, rgba(13,27,42,0.5) 100%)',
  },
  {
    label: 'Statistiques',
    accent: 'linear-gradient(180deg, rgba(255,107,107,0.08) 0%, rgba(0,212,255,0.05) 100%)',
  },
  {
    label: 'Nouvelle plongée',
    accent: 'linear-gradient(180deg, rgba(245,240,232,0.04) 0%, rgba(0,212,255,0.06) 100%)',
  },
]

function PlayStoreBadge({ variant = 'dark' }) {
  const bg = variant === 'dark' ? 'bg-black' : 'bg-white'
  const text = variant === 'dark' ? 'text-white' : 'text-black'
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 ${bg} ${text} px-5 py-3 rounded-xl border border-white/20 hover:opacity-80 transition-opacity`}
      aria-label="Télécharger Palier sur Google Play"
    >
      {/* Play Store icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3.18 23.76c.37.21.8.22 1.18.04L16.81 12 4.36.2C3.98.02 3.55.03 3.18.24 2.47.65 2 1.43 2 2.28v19.44c0 .85.47 1.63 1.18 2.04z"/>
        <path d="M20.49 10.65L17.7 9.1 14.62 12l3.08 2.9 2.79-1.55c.8-.44 1.28-1.22 1.28-2.1 0-.88-.48-1.66-1.28-2.1z" opacity=".6"/>
        <path d="M4.36 23.8L16.1 13.22 17.7 14.9 4.88 23.98c-.19.12-.34.18-.52.18-.01 0-.01 0 0-.36z" opacity=".4"/>
        <path d="M4.36.2L17.7 9.1 16.1 10.78 4.36.2z" opacity=".8"/>
      </svg>
      <div className="text-left">
        <div className="text-xs opacity-70">Disponible sur</div>
        <div className="text-sm font-semibold leading-tight">Google Play</div>
      </div>
    </a>
  )
}

function PhoneMockup() {
  return (
    <svg
      viewBox="0 0 280 520"
      className="w-48 md:w-64 drop-shadow-2xl"
      aria-label="Aperçu de l'application Palier"
      role="img"
    >
      {/* Phone frame */}
      <rect x="4" y="4" width="272" height="512" rx="36" fill="#0D1B2A" stroke="#00D4FF" strokeOpacity="0.3" strokeWidth="1.5" />
      <rect x="12" y="12" width="256" height="496" rx="30" fill="#0A1520" />

      {/* Notch */}
      <rect x="100" y="14" width="80" height="8" rx="4" fill="#0D1B2A" />

      {/* Screen content — simule l'UI de l'app */}
      {/* Header */}
      <rect x="20" y="42" width="120" height="10" rx="5" fill="#F5F0E8" opacity="0.9" />
      <rect x="20" y="57" width="80" height="6" rx="3" fill="#8A9BB0" opacity="0.6" />

      {/* Stats row */}
      <rect x="20" y="80" width="72" height="50" rx="8" fill="#0D1B2A" stroke="#00D4FF" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="104" y="80" width="72" height="50" rx="8" fill="#0D1B2A" stroke="#00D4FF" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="188" y="80" width="72" height="50" rx="8" fill="#0D1B2A" stroke="#00D4FF" strokeOpacity="0.2" strokeWidth="1" />
      <text x="56" y="111" textAnchor="middle" fill="#00D4FF" fontSize="16" fontWeight="bold">12</text>
      <text x="56" y="122" textAnchor="middle" fill="#8A9BB0" fontSize="7">plongées</text>
      <text x="140" y="111" textAnchor="middle" fill="#00D4FF" fontSize="16" fontWeight="bold">38m</text>
      <text x="140" y="122" textAnchor="middle" fill="#8A9BB0" fontSize="7">max</text>
      <text x="224" y="111" textAnchor="middle" fill="#00D4FF" fontSize="16" fontWeight="bold">8h</text>
      <text x="224" y="122" textAnchor="middle" fill="#8A9BB0" fontSize="7">total</text>

      {/* Dive curve mini */}
      <rect x="20" y="145" width="240" height="80" rx="8" fill="#0D1B2A" stroke="#00D4FF" strokeOpacity="0.15" strokeWidth="1" />
      <polyline
        points="30,210 60,195 90,165 140,175 180,190 200,170 240,185 250,190"
        fill="none"
        stroke="#00D4FF"
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />

      {/* Dive log entries */}
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(20, ${242 + i * 56})`}>
          <rect width="240" height="48" rx="8" fill="#0D1B2A" stroke="#8A9BB0" strokeOpacity="0.15" strokeWidth="1" />
          <rect x="12" y="12" width="60" height="6" rx="3" fill="#F5F0E8" opacity="0.8" />
          <rect x="12" y="24" width="40" height="5" rx="2.5" fill="#8A9BB0" opacity="0.5" />
          <rect x="180" y="16" width="48" height="8" rx="4" fill="#FF6B6B" opacity={0.3 + i * 0.2} />
        </g>
      ))}
    </svg>
  )
}

export default function Home() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-palier-navy flex items-center overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(0,212,255,0.06) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
          {/* Left: text */}
          <div className="flex flex-col gap-8">
            <p className="text-palier-cyan text-sm font-medium tracking-widest uppercase">
              Carnet de plongée
            </p>
            <h1 className="font-display italic text-5xl md:text-6xl lg:text-7xl text-palier-ivory leading-tight">
              Chaque plongée mérite d'être racontée.
            </h1>
            <p className="text-palier-muted text-lg leading-relaxed max-w-md">
              Palier est votre logbook de plongée, toujours disponible — même sans connexion. Enregistrez, analysez, revivez.
            </p>
            <div className="flex flex-wrap gap-4">
              <PlayStoreBadge variant="dark" />
            </div>
          </div>

          {/* Right: phone mockup */}
          <div className="flex justify-center md:justify-end">
            <PhoneMockup />
          </div>
        </div>

        {/* DiveCurve at bottom */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <DiveCurve />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-[#0A1520] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display italic text-4xl md:text-5xl text-palier-ivory text-center mb-4">
            Tout ce qu'il faut pour un vrai logbook.
          </h2>
          <p className="text-palier-muted text-center mb-16 max-w-xl mx-auto">
            Conçu pour le terrain. Fonctionnel même à 40 mètres de profondeur de réseau.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(f => (
              <div
                key={f.title}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-palier-cyan/10 bg-palier-navy hover:border-palier-cyan/30 transition-colors"
              >
                <div className="w-10 h-10 text-palier-cyan" aria-hidden="true">
                  {f.icon}
                </div>
                <h3 className="text-palier-ivory font-medium text-base">{f.title}</h3>
                <p className="text-palier-muted text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-palier-navy">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {STATS.map(s => (
              <div key={s.value} className="flex flex-col gap-2">
                <span className="font-body text-5xl font-semibold text-palier-cyan tabular-nums">
                  {s.value}
                </span>
                <span className="text-palier-muted text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCREENSHOTS ── */}
      <section className="py-24 bg-[#0A1520] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display italic text-4xl md:text-5xl text-palier-ivory text-center mb-4">
            L'interface pensée pour le plongeur.
          </h2>
          <p className="text-palier-muted text-center mb-16 max-w-xl mx-auto">
            Sombre, lisible, épurée. Palier ne vous distrait pas — il capture.
          </p>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-6 px-6 md:overflow-visible md:grid md:grid-cols-4 md:mx-0 md:px-0">
            {SCREENS.map(s => (
              <div
                key={s.label}
                className="flex-none snap-center w-48 md:w-auto flex flex-col items-center gap-4"
              >
                <div className="w-48 h-80 rounded-3xl border border-palier-cyan/20 bg-palier-navy flex flex-col overflow-hidden">
                  {/* Screen header notch */}
                  <div className="h-1 w-16 rounded-full bg-palier-navy mx-auto mt-3" />
                  <div className="flex-1 p-4 flex flex-col gap-3">
                    <div className="h-4 w-24 rounded bg-palier-ivory/80" />
                    <div className="h-3 w-16 rounded bg-palier-muted/50" />
                    <div
                      className="flex-1 rounded-lg mt-2"
                      style={{ background: s.accent }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <span className="text-palier-muted text-xs text-center">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 bg-palier-coral">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-8">
          <h2 className="font-display italic text-4xl md:text-5xl text-palier-ivory leading-tight">
            Commence ton logbook aujourd'hui.
          </h2>
          <p className="text-palier-ivory/80 text-lg">
            Gratuit. Sans abonnement. Toujours avec toi.
          </p>
          <PlayStoreBadge variant="dark" />
        </div>
      </section>
    </main>
  )
}
