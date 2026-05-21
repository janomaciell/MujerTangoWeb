import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import styles from './Header.module.css'
import { useLang, t } from '../../context/LangContext'
import { siteImages } from '../../data/images.js'

export default function Header() {
  const headerRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang }       = useLang()
  const location = useLocation()

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 1.2, delay: 1.2, ease: 'power3.out',
        onComplete: () => gsap.set(headerRef.current, { clearProps: 'y' }) }
    )
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const links = [
    { label: lang === 'es' ? 'La Artista'  : 'The Artist',  id: 'artista',     to: '/#nosotros'    },
    { label: lang === 'es' ? 'Biografía'   : 'Biography',   id: 'biografia',   to: '/biografia'    },
    { label: lang === 'es' ? 'Trayectoria' : 'Career',      id: 'trayectoria', to: '/#biografia'   },
    { label: lang === 'es' ? 'Discografía' : 'Discography', id: 'disco',       to: '/#discografia' },
    { label: lang === 'es' ? 'Galería'     : 'Gallery',     id: 'galeria',     to: '/galeria'      },
    { label: lang === 'es' ? 'Videos'      : 'Videos',      id: 'videos',      to: '/#videos'      },
    { label: lang === 'es' ? 'Música'      : 'Music',       id: 'musica',      to: '/#musica'      },
    { label: lang === 'es' ? 'Contacto'    : 'Contact',     id: 'contacto',    to: '/contacto'     },
  ]

  const desktopLinks = links.filter(l => ['biografia', 'galeria', 'contacto'].includes(l.id))

  const handleAnchor = (e, to) => {
    if (to.startsWith('/#')) {
      e.preventDefault()
      const id = to.slice(2)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const LanguageToggle = ({ toggleRef, idPrefix = '' }) => (
    <div className={styles.langToggle}>
      <div ref={toggleRef} className={styles.toggleIndicator} />
      <button id={`${idPrefix}btn-lang-es`} className={`${styles.langBtn} ${lang === 'es' ? styles.langActive : ''}`} onClick={() => setLang('es')}>ES</button>
      <button id={`${idPrefix}btn-lang-en`} className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`} onClick={() => setLang('en')}>EN</button>
    </div>
  )

  const toggleDesktopRef = useRef(null)
  const toggleMobileRef  = useRef(null)

  useEffect(() => {
    const targets = [toggleDesktopRef.current, toggleMobileRef.current].filter(Boolean)
    if (targets.length > 0) {
      gsap.to(targets, { x: lang === 'en' ? '100%' : '0%', duration: 0.5, ease: 'expo.out' })
    }
  }, [lang])

  return (
    <header ref={headerRef} className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} id="nav-logo">
          <img src={siteImages.logo} alt="María José Mentana" className={styles.logoImg} />
        </Link>

        <div className={styles.rightGroup}>
          <nav className={styles.nav} aria-label="Navegación principal">
            {desktopLinks.map(link => (
              <Link key={link.id} to={link.to} id={`nav-${link.id}`} className={styles.navLink} onClick={e => handleAnchor(e, link.to)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <LanguageToggle toggleRef={toggleDesktopRef} idPrefix="desktop-" />

          <button className={styles.burger} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" aria-expanded={menuOpen} id="btn-menu-toggle">
            <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineOpen1 : ''}`} />
            <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineOpen2 : ''}`} />
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} aria-hidden={!menuOpen}>
        <nav className={styles.mobileNav}>
          {links.map((link, i) => (
            <Link key={link.id} to={link.to} id={`mob-${link.id}`} className={styles.mobileNavLink}
              style={{ transitionDelay: menuOpen ? `${i * 0.06}s` : '0s' }}
              onClick={e => handleAnchor(e, link.to)}
            >
              <span className={styles.mobileNavNum}>{String(i + 1).padStart(2, '0')}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileLang}>
          <LanguageToggle toggleRef={toggleMobileRef} idPrefix="mobile-" />
        </div>
      </div>
    </header>
  )
}
