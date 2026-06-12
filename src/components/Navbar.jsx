import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.palier.app'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? 'text-palier-ivory' : 'text-palier-muted hover:text-palier-ivory'}`

  return (
    <header className="sticky top-0 z-50 bg-palier-navy/95 backdrop-blur-sm border-b border-palier-cyan/15">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="font-display font-semibold text-xl text-palier-ivory tracking-[0.3em] hover:text-palier-cyan transition-colors"
        >
          PALIER
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/privacy" className={linkClass}>Confidentialité</NavLink>
          <NavLink to="/terms" className={linkClass}>Conditions</NavLink>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-palier-cyan text-palier-navy text-sm font-medium px-5 py-2 rounded-full hover:bg-palier-cyan/80 transition-colors"
          >
            Télécharger
          </a>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setIsOpen(o => !o)}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
        >
          <span className={`block w-6 h-0.5 bg-palier-ivory transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-palier-ivory transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-palier-ivory transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48' : 'max-h-0'}`}>
        <div className="border-b border-palier-cyan/15 px-6 pb-5 flex flex-col gap-4">
          <NavLink to="/privacy" className={linkClass} onClick={() => setIsOpen(false)}>Confidentialité</NavLink>
          <NavLink to="/terms" className={linkClass} onClick={() => setIsOpen(false)}>Conditions</NavLink>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-palier-cyan text-palier-navy text-sm font-medium px-5 py-2 rounded-full text-center"
            onClick={() => setIsOpen(false)}
          >
            Télécharger
          </a>
        </div>
      </div>
    </header>
  )
}
