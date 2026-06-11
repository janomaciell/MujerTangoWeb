import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Clases.module.css'
import { useLang, t } from '../../context/LangContext'

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_NUMBER = '5491100000000' // <-- reemplazá con el número real si es necesario

export default function Clases() {
  const containerRef = useRef(null)
  const { lang } = useLang()
  const c = t.clases

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animations
      gsap.from('.animate-fade', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      })

      // Staggered list fade in
      gsap.from('.animate-item', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.offers-list',
          start: 'top 85%',
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const whatsappMsg = encodeURIComponent(
    lang === 'es'
      ? '¡Hola! Me gustaría inscribirme a las clases de canto con María José Mentana.'
      : 'Hello! I would like to enroll in singing classes with María José Mentana.'
  )
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`

  return (
    <section className={styles.section} ref={containerRef}>
      {/* Background pattern */}
      <div className={styles.bgPattern} aria-hidden="true" />

      <div className="container container--narrow">
        <div className={styles.contentWrapper}>
          
          {/* Header */}
          <header className={`${styles.header} animate-fade`}>
            <h1 className={styles.title}>{c.title[lang]}</h1>
            <p className={styles.subtitle}>{c.subtitle[lang]}</p>
            <div className={styles.rule} />
          </header>

          {/* Intro Narrative */}
          <div className={`${styles.narrative} animate-fade`}>
            <p className={styles.paragraph}>{c.intro1[lang]}</p>
            <p className={styles.paragraph}>{c.intro2[lang]}</p>
          </div>

          {/* Offers Section */}
          <div className={`${styles.offersSection} animate-fade`}>
            <h2 className={styles.offersTitle}>{c.offerTitle[lang]}</h2>
            <ul className={`${styles.offersList} offers-list`}>
              {c.offers.map((offer, i) => (
                <li key={i} className={`${styles.offerItem} animate-item`}>
                  <span className={styles.offerDot} aria-hidden="true" />
                  <div className={styles.offerText}>
                    <strong className={styles.offerItemTitle}>{offer.title[lang]}</strong>
                    <span className={styles.offerSeparator}> — </span>
                    <span className={styles.offerDesc}>{offer.desc[lang]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience */}
          <div className={`${styles.audience} animate-fade`}>
            <p className={styles.paragraph}>{c.audience1[lang]}</p>
            <p className={styles.paragraph}>{c.audience2[lang]}</p>
          </div>

          {/* Closing Quote */}
          <blockquote className={`${styles.closingQuote} animate-fade`}>
            <p className={styles.closingLine}>{c.closing1[lang]}</p>
            <p className={styles.closingLine}>{c.closing2[lang]}</p>
          </blockquote>

          {/* CTA Footer */}
          <footer className={`${styles.ctaFooter} animate-fade`}>
            <div className={styles.reserveContainer}>
              <span className={styles.reserveText}>{c.reserveLabel[lang]}</span>
              <div className={styles.linksRow}>
                <Link to="/contacto" className={styles.linkButton} id="clases-link-contacto">
                  {c.contactLink[lang]}
                </Link>
                <span className={styles.divider}>/</span>
                <a href="mailto:info@mariajosementana.com" className={styles.linkButton} id="clases-link-email">
                  Email
                </a>
                <span className={styles.divider}>/</span>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.linkButton} id="clases-link-whatsapp">
                  WhatsApp
                </a>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </section>
  )
}
