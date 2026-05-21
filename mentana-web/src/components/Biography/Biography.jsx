import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Biography.module.css'
import { useLang, t } from '../../context/LangContext'

gsap.registerPlugin(ScrollTrigger)

export default function Biography() {
  const sectionRef   = useRef(null)
  const trackRef     = useRef(null)
  const containerRef = useRef(null)
  const { lang }     = useLang()

  const milestones = t.biography.milestones

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current
        const items = track.querySelectorAll('.milestone-card')
        const getScrollDist = () => track.scrollWidth - window.innerWidth + 200

        const tl = gsap.to(track, {
          x: () => -getScrollDist(),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${getScrollDist()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          }
        })

        items.forEach((card) => {
          gsap.from(card, {
            opacity: 0.3,
            y: 20,
            duration: 0.6,
            ease: 'sine.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left 100%',
              end: 'left 70%',
              scrub: true,
            }
          })
        })
      })

      mm.add('(max-width: 767px)', () => {
        const track = trackRef.current
        const items = track.querySelectorAll('.milestone-card')

        gsap.fromTo('.biog-line-mobile',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: track,
              start: 'top 40%',
              end: 'bottom 60%',
              scrub: true,
            }
          }
        )

        items.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            x: -15,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none none',
            }
          })
        })
      })

      gsap.from('.biog-header', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="biografia" ref={sectionRef}>
      <div className={`biog-header ${styles.header}`}>
        <div className="container">
          <span className="section-label">{t.biography.sectionLabel[lang]}</span>
          <h2
            className={styles.headerTitle}
            dangerouslySetInnerHTML={{ __html: t.biography.headingTitle[lang] }}
          />
          <p className={styles.headerSub}>{t.biography.headerSub[lang]}</p>
        </div>
      </div>

      <div className={styles.pinContainer} ref={containerRef}>
        <div className={styles.track} ref={trackRef}>
          <div className={styles.trackStart}>
            <span className={styles.trackDecor}>1970 → 2025</span>
          </div>

          <div className={`biog-line-mobile ${styles.lineMobile}`} />

          {milestones.map((m, i) => (
            <article
              key={m.year}
              className={`milestone-card ${i === milestones.length - 1 ? 'milestone-last' : ''} ${styles.card}`}
            >
              <div className={styles.cardYear}>{m.year}</div>
              <span className={styles.cardEra}>{m.era[lang]}</span>
              <h3 className={styles.cardTitle}>{m.title[lang]}</h3>
              <p className={styles.cardText}>{m.text[lang]}</p>
              <span className={styles.cardDetail}>
                <span className={styles.cardDot}>◆</span> {m.detail[lang]}
              </span>
              {i < milestones.length - 1 && (
                <div className={styles.connector} aria-hidden="true" />
              )}
            </article>
          ))}
        </div>
      </div>

      <div className={styles.closing}>
        <div className="container">
          <blockquote className={styles.quote}>
            <p>{t.biography.quoteText[lang]}</p>
            <cite>{t.biography.quoteCite[lang]}</cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
