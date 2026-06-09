import DiveCurve from '../components/DiveCurve'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.palier.app'

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
    </main>
  )
}
