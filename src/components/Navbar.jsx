import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.palier.app'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `font-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
      isActive ? 'text-palier-ivory' : 'text-palier-muted hover:text-palier-ivory'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-palier-navy/70 backdrop-blur-md border-b border-palier-ivory/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Palier — accueil">
          <img
            src={logo}
            alt=""
            className="w-8 h-8 rounded-md object-cover"
          />
          <span className="font-mono text-sm tracking-[0.35em] text-palier-ivory group-hover:text-palier-teal transition-colors">
            PALIER
          </span>
        </Link>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/privacy" className={linkClass}>Confidentialité</NavLink>
          <NavLink to="/terms" className={linkClass}>Conditions</NavLink>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-palier-coral/60 text-palier-coral hover:bg-palier-coral hover:text-palier-navy transition-colors"
          >
            Télécharger ↗
          </a>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
        >
          <span className={`block w-6 h-0.5 bg-palier-ivory transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-palier-ivory transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-palier-ivory transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Menu mobile */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-52 bg-palier-navy/90 backdrop-blur-md' : 'max-h-0'}`}>
        <div className="border-b border-palier-ivory/10 px-6 pb-5 pt-2 flex flex-col gap-4">
          <NavLink to="/privacy" className={linkClass} onClick={() => setIsOpen(false)}>Confidentialité</NavLink>
          <NavLink to="/terms" className={linkClass} onClick={() => setIsOpen(false)}>Conditions</NavLink>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-palier-coral/60 text-palier-coral text-center"
            onClick={() => setIsOpen(false)}
          >
            Télécharger ↗
          </a>
        </div>
      </div>
    </header>
  )
}
