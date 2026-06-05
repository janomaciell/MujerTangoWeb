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
    { label: lang === 'es' ? 'Biografía'   : 'Biography',   id: 'biografia', to: '/biografia'   },
    { label: lang === 'es' ? 'Galería'     : 'Gallery',     id: 'galeria',   to: '/galeria'     },
    { label: lang === 'es' ? 'Discografía' : 'Discography', id: 'disco',     to: '/discografia' },
    { label: lang === 'es' ? 'Clases'      : 'Classes',     id: 'clases',    to: '/clases'      },
    { label: lang === 'es' ? 'Contacto'    : 'Contact',     id: 'contacto',  to: '/contacto'    },
  ]

  const socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/mariajosementana/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/mariajosetangos/?locale=es_LA',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/user/mariajosementana',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      )
    },
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/artist/0RQtI5ALj0KN8knNE6aBA0',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.076-.336.135-.668.47-.744 3.856-.88 7.15-.5 9.822 1.135.295.178.387.563.205.854zm1.224-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.66-1.11 8.225-.567 11.346 1.35.367.226.487.707.258 1.068zm.105-2.81c-3.26-1.937-8.634-2.115-11.722-1.177-.5.15-1.025-.13-1.177-.628-.15-.5.13-1.025.628-1.177 3.564-1.08 9.49-.877 13.246 1.35.45.267.6.844.333 1.294-.267.45-.844.6-1.294.333z"/>
        </svg>
      )
    }
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
            
            <div className={styles.mobileSocials}>
              {socials.map((soc, i) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileSocialLink}
                  style={{ transitionDelay: `${(links.length + i) * 0.05}s` }}
                  aria-label={soc.name}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
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

            <div className={styles.socials}>
              {socials.map(soc => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={soc.name}
                >
                  {soc.icon}
                </a>
              ))}
            </div>

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
