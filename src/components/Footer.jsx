import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-palier-ivory/10">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="w-7 h-7 rounded-md object-cover" />
            <span className="font-mono text-xs tracking-[0.35em] text-palier-ivory">
              PALIER
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] tracking-[0.15em] uppercase text-palier-muted">
            <Link to="/privacy" className="hover:text-palier-ivory transition-colors">
              Confidentialité
            </Link>
            <Link to="/terms" className="hover:text-palier-ivory transition-colors">
              Conditions
            </Link>
            <a href="mailto:privacy@palier.app" className="hover:text-palier-ivory transition-colors normal-case tracking-normal">
              privacy@palier.app
            </a>
          </nav>

          <p className="font-mono text-[10px] tracking-[0.1em] text-palier-muted">
            © 2026 PALIER
          </p>
        </div>

        <p className="font-mono text-[10px] tracking-[0.3em] text-palier-muted/60 text-center uppercase">
          Conçu en surface — pensé pour le fond
        </p>
      </div>
    </footer>
  )
}
