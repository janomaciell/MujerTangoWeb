import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Footer.module.css'
import { useLang, t } from '../../context/LangContext'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const { lang }  = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-el', {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 88%', toggleActions: 'play none none none' }
      })
      gsap.to('.marquee-track', {
        xPercent: -50, ease: 'none', duration: 18, repeat: -1,
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const year = new Date().getFullYear()
  const ft   = t.footer

  return (
    <footer className={styles.footer} id="footer" ref={footerRef}>
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={`marquee-track ${styles.marqueeTrack}`}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className={styles.marqueeItem}>
              María José Mentana <span className={styles.marqueeSep}>◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            <div className={`footer-el ${styles.signature}`}>
              <span className={styles.sigName}>María José</span>
              <span className={styles.sigSurname}>Mentana</span>
              <p className={styles.sigTagline}>{ft.tagline[lang]}</p>
            </div>

            <nav className={`footer-el ${styles.nav}`} aria-label="Footer nav">
              <span className={styles.navHeading}>{ft.sections[lang]}</span>
              {ft.links.map(link => (
                <Link key={link.to} to={link.to} className={styles.navLink}>{link[lang]}</Link>
              ))}
            </nav>

            <div className={`footer-el ${styles.contact}`}>
              <span className={styles.navHeading}>{ft.contact[lang]}</span>
              <a href="mailto:info@mariajosementana.com" className={styles.email}>info@mariajosementana.com</a>
              <div className={styles.socials}>
                <a
                  href="https://www.instagram.com/mariajosementana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/mariajosetangos/?locale=es_LA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/user/mariajosementana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
                <a
                  href="https://open.spotify.com/artist/0RQtI5ALj0KN8knNE6aBA0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Spotify"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.076-.336.135-.668.47-.744 3.856-.88 7.15-.5 9.822 1.135.295.178.387.563.205.854zm1.224-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.66-1.11 8.225-.567 11.346 1.35.367.226.487.707.258 1.068zm.105-2.81c-3.26-1.937-8.634-2.115-11.722-1.177-.5.15-1.025-.13-1.177-.628-.15-.5.13-1.025.628-1.177 3.564-1.08 9.49-.877 13.246 1.35.45.267.6.844.333 1.294-.267.45-.844.6-1.294.333z"/>
                  </svg>
                </a>
              </div>
              <p className={styles.location}>San Isidro, Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <span className={`footer-el ${styles.copy}`}>
              © {year} María José Mentana. {ft.copy[lang]}
            </span>
            <button className={`footer-el ${styles.backTop}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={ft.backTop[lang]}>
              {ft.backTop[lang]}
            </button>
            <span className={`footer-el ${styles.credit}`}>
              Sitio por <a href="https://clyra.studio" target="_blank" rel="noopener noreferrer">Clyra Studio</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
