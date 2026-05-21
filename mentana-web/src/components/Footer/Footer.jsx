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
                <a href="https://www.instagram.com/mariajosementana/" target="_blank" rel="noopener noreferrer" className={styles.social}>Instagram</a>
                <a href="https://www.youtube.com/user/mariajosementana" target="_blank" rel="noopener noreferrer" className={styles.social}>YouTube</a>
                <a href="https://mariajosementana.blogspot.com/" target="_blank" rel="noopener noreferrer" className={styles.social}>Blog</a>
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
