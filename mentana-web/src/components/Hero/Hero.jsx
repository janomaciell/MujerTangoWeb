import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Hero.module.css'
import { siteImages } from '../../data/images.js'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 })

      tl.fromTo('.hero-portrait',
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      )
      tl.fromTo(
        ['.hero-logo', '.word-maria', '.word-mentana'],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
        '-=0.75'
      )

      gsap.to('.hero-inner', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '55% top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="hero" ref={sectionRef}>

      {/* Foto full-bleed */}
      <div className={`hero-portrait ${styles.portrait}`}>
        <img
          src={siteImages.hero}
          alt="María José Mentana"
          className={styles.portraitImg}
        />
        <div className={styles.portraitFade} aria-hidden="true" />
      </div>

      {/* Contenido superpuesto */}
      <div className={`hero-inner ${styles.inner}`}>
        <div className={styles.leftPanel}>
          <div className={styles.titleBlock}>

            {/* Logo */}
            <div className={styles.overflow}>
              <img src={siteImages.logo} alt="Logo" className={`hero-logo ${styles.heroLogo}`} />
            </div>

            {/* "Maria Jose" — una línea, script, sin recorte */}
            <div className={styles.overflow}>
              <span className={`word-maria ${styles.word} ${styles.wordMaria}`}>
                María José
              </span>
            </div>

            {/* "MENTANA" */}
            <div className={styles.overflow}>
              <span className={`word-mentana ${styles.word} ${styles.wordMentana}`}>
                Mentana
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}