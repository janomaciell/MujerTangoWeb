import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Contact from '../Contact/Contact'
import styles from './ContactPage.module.css'
import { useLang, t } from '../../context/LangContext'
import { siteImages } from '../../data/images.js'

export default function ContactPage() {
  const containerRef = useRef(null)
  const { lang } = useLang()
  const ct = t.contact

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.2 })
      heroTl
        .fromTo('.contact-hero-bg', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' })
        .fromTo('.contact-hero-el', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.6')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.page} ref={containerRef}>
      
      {/* ── HERO ── */}
      <section className={styles.hero}>
        {/* Background Full-bleed */}
        <div className={`contact-hero-bg ${styles.portrait}`}>
          <img
            src={siteImages.contactBg}
            alt={lang === 'es' ? 'Contacto' : 'Contact'}
            className={styles.portraitImg}
          />
          <div className={styles.portraitFade} aria-hidden="true" />
        </div>

        {/* Content stacked on top & aligned to the right */}
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className="contact-hero-el section-label">{ct.sectionLabel[lang]}</span>
            <h1 className={`contact-hero-el ${styles.title}`}>{ct.heading[lang]}</h1>
            <p className={`contact-hero-el ${styles.subtitle}`}>{ct.sub[lang]}</p>
          </div>
        </div>
      </section>

      <Contact asPage />
    </div>
  )
}
