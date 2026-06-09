import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-palier-cyan/15 bg-palier-navy">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">

        <span className="font-display text-palier-ivory tracking-[0.3em] text-sm font-semibold">
          PALIER
        </span>

        <nav className="flex items-center gap-6 text-sm text-palier-muted">
          <Link to="/privacy" className="hover:text-palier-ivory transition-colors">
            Confidentialité
          </Link>
          <Link to="/terms" className="hover:text-palier-ivory transition-colors">
            Conditions
          </Link>
          <a
            href="mailto:privacy@palier.app"
            className="hover:text-palier-ivory transition-colors"
          >
            privacy@palier.app
          </a>
        </nav>

        <p className="text-palier-muted text-xs">
          © 2026 Palier. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
