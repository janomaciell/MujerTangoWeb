import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Hero.module.css'
import { useLang, t } from '../../context/LangContext'
import { siteImages } from '../../data/images.js'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const { lang }   = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo('.hero-rule-top',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }
      )
      tl.fromTo('.hero-portrait',
        { opacity: 0 },
        { opacity: 1, duration: 1.1, ease: 'power2.out' },
        '-=0.5'
      )
      tl.fromTo(['.word-maria', '.word-jose', '.word-mentana'],
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
        '-=0.8'
      )
      tl.fromTo(['.hero-meta', '.hero-rule-bottom', '.hero-scroll'],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' },
        '-=0.5'
      )

      gsap.to('.hero-inner', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '55% top',
          end: 'bottom top',
          scrub: 0.8,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="hero" ref={sectionRef}>
      <div className={`hero-portrait ${styles.portrait}`}>
        <img
          src={siteImages.hero}
          alt="María José Mentana"
          className={styles.portraitImg}
        />
        <div className={styles.portraitFade} aria-hidden="true" />
      </div>

      <div className={`hero-inner ${styles.inner}`}>
        <div className={`hero-rule-top ${styles.ruleTop}`} />

        <div className={styles.leftPanel}>
          <div className={`hero-title-block ${styles.titleBlock}`}>
            <div className={styles.overflow}><span className={`word-maria ${styles.word} ${styles.wordMaria}`}>María</span></div>
            <div className={styles.overflow}><span className={`word-jose ${styles.word} ${styles.wordJose}`}>José</span></div>
            <div className={styles.overflow}><span className={`word-mentana ${styles.word} ${styles.wordMentana}`}>Mentana</span></div>
          </div>

          <div className={styles.bottomBlock}>
            <div className={styles.meta}>
              <span className={`hero-meta ${styles.metaItem}`}>
                <span className={styles.metaDot}>◆</span> {t.hero.meta1[lang]}
              </span>
              <span className={`hero-meta ${styles.metaItem}`}>
                <span className={styles.metaDot}>◆</span> {t.hero.meta2[lang]}
              </span>
              <span className={`hero-meta ${styles.metaItem} ${styles.metaGold}`}>
                {t.hero.metaGold[lang]}
              </span>
            </div>

            <div className={`hero-scroll ${styles.scrollIndicator}`}>
              <span className={styles.scrollLabel}>{t.hero.scroll[lang]}</span>
              <span className={styles.scrollDot} aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className={`hero-rule-bottom ${styles.ruleBottom}`} />
      </div>
    </section>
  )
}
