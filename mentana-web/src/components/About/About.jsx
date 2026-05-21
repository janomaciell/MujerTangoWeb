import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'
import { useLang, t } from '../../context/LangContext'
import { siteImages } from '../../data/images.js'

gsap.registerPlugin(ScrollTrigger)

function QuoteText({ lang }) {
  const { una, rest, emphasis } = t.about.quote
  const restText = rest[lang]
  const highlight = emphasis[lang]
  const idx = restText.indexOf(highlight)

  if (idx === -1) {
    return (
      <p className={styles.quoteRest}>
        {restText}
      </p>
    )
  }

  const before = restText.slice(0, idx)
  const after = restText.slice(idx + highlight.length)

  return (
    <p className={styles.quoteRest}>
      {before}
      <em className={styles.quoteEmphasis}>{highlight}</em>
      {after}
    </p>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const counterRef = useRef(null)
  const { lang }   = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { val: 0 }
      gsap.to(counter, {
        val: 55,
        duration: 2,
        ease: 'power2.out',
        snap: { val: 1 },
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate() {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.round(counter.val)}+`
          }
        },
      })

      gsap.from('.about-para', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.about-quote-block > *', {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-quote-block',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const yearsLines = t.about.yearsLabel[lang].split('\n')

  return (
    <section className={styles.section} id="nosotros" ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={`about-para ${styles.heading}`}>{t.about.heading[lang]}</h2>
        </div>

        <div className={styles.body}>
          <div className={styles.bodyText}>
            <p className={`about-para ${styles.lead}`}>{t.about.lead[lang]}</p>
            <p className={`about-para ${styles.para}`}>{t.about.para[lang]}</p>
          </div>

          <div className={`about-para ${styles.counterBlock}`}>
            <div className={styles.counterRow}>
              <span ref={counterRef} className={styles.counterNum} aria-live="polite">0+</span>
              <span className={styles.counterLabel}>
                {yearsLines[0]}<br />{yearsLines[1]}
              </span>
            </div>
          </div>
        </div>

        <div className={`about-quote-block ${styles.quoteBlock}`}>
          <blockquote className={`about-para ${styles.quote}`}>
            <span className={styles.quoteUna}>{t.about.quote.una[lang]}</span>
            <QuoteText lang={lang} />
          </blockquote>

          <figure className={`about-para ${styles.quoteFigure}`}>
            <div className={styles.quoteImageWrap}>
              <img
                src={siteImages.aboutQuote}
                alt="María José Mentana"
                className={styles.quoteImage}
                loading="lazy"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
