import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import styles from './Header.module.css'
import { useLang } from '../../context/LangContext'
import { siteImages } from '../../data/images.js'

export default function Header() {
  const headerRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang } = useLang()
  const location = useLocation()

  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const mobile = window.matchMedia('(max-width: 900px)').matches
    gsap.fromTo(
      el,
      mobile ? { opacity: 0 } : { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: mobile ? 0.5 : 1.2,
        delay: mobile ? 0.15 : 1.2,
        ease: 'power3.out',
        clearProps: 'transform',
      },
    )

    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const links = [
    { label: lang === 'es' ? 'Discografía' : 'Discography', id: 'disco',     to: '/discografia' },
    { label: lang === 'es' ? 'Biografía'   : 'Biography',   id: 'biografia', to: '/biografia'   },
    { label: lang === 'es' ? 'Galería'     : 'Gallery',     id: 'galeria',   to: '/galeria'     },
    { label: lang === 'es' ? 'Clases'      : 'Classes',     id: 'clases',    to: '/clases'      },
    { label: lang === 'es' ? 'Contacto'    : 'Contact',     id: 'contacto',  to: '/contacto'    },
  ]

  const desktopLinks = links

  const handleAnchor = (e, to) => {
    if (to.startsWith('/#')) {
      e.preventDefault()
      const id = to.slice(2)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const toggleRef = useRef(null)

  useEffect(() => {
    if (toggleRef.current) {
      gsap.to(toggleRef.current, {
        x: lang === 'en' ? '100%' : '0%',
        duration: 0.5,
        ease: 'expo.out',
      })
    }
  }, [lang])

  const LanguageToggle = () => (
    <div className={styles.langToggle}>
      <div ref={toggleRef} className={styles.toggleIndicator} />
      <button
        type="button"
        id="btn-lang-es"
        className={`${styles.langBtn} ${lang === 'es' ? styles.langActive : ''}`}
        onClick={() => setLang('es')}
      >
        ES
      </button>
      <button
        type="button"
        id="btn-lang-en"
        className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>
  )

  const mobileMenu = menuOpen
    ? createPortal(
        <div
          className={`${styles.mobileMenu} ${styles.mobileMenuOpen}`}
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'es' ? 'Menú de navegación' : 'Navigation menu'}
        >
          <div className={styles.mobileMenuInner}>
            <nav className={styles.mobileNav}>
              {links.map((link, i) => (
                <Link
                  key={link.id}
                  to={link.to}
                  id={`mob-${link.id}`}
                  className={styles.mobileNavLink}
                  style={{ transitionDelay: `${i * 0.05}s` }}
                  onClick={e => handleAnchor(e, link.to)}
                >
                  <span className={styles.mobileNavNum}>{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>,
        document.body,
      )
    : null

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''}`}
      >
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} id="nav-logo" onClick={() => setMenuOpen(false)}>
            <img src={siteImages.logo} alt="María José Mentana" className={styles.logoImg} />
          </Link>

          <div className={styles.rightGroup}>
            <nav className={styles.nav} aria-label="Navegación principal">
              {desktopLinks.map(link => (
                <Link
                  key={link.id}
                  to={link.to}
                  id={`nav-${link.id}`}
                  className={styles.navLink}
                  onClick={e => handleAnchor(e, link.to)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <LanguageToggle />

            <button
              type="button"
              className={styles.burger}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? (lang === 'es' ? 'Cerrar menú' : 'Close menu') : (lang === 'es' ? 'Abrir menú' : 'Open menu')}
              aria-expanded={menuOpen}
              id="btn-menu-toggle"
            >
              <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineOpen1 : ''}`} />
              <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineOpen2 : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  )
}
