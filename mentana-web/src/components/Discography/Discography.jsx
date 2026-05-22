import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Discography.module.css'
import { useLang, t } from '../../context/LangContext'

gsap.registerPlugin(ScrollTrigger)

export default function Discography() {
  const sectionRef = useRef(null)
  const { lang }   = useLang()
  const albums     = t.discography.albums

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.disc-header', {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.disc-header', start: 'top 80%', toggleActions: 'play none none none' }
      })

      gsap.from('.disc-card', {
        opacity: 0, y: 80, rotateX: 8,
        transformOrigin: 'top center',
        duration: 1,
        stagger: { each: 0.1, from: 'start' },
        ease: 'power3.out',
        scrollTrigger: { trigger: '.disc-grid', start: 'top 78%', toggleActions: 'play none none none' }
      })

      gsap.to('.disc-gold-line', {
        backgroundPosition: '200% center',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="discografia" ref={sectionRef}>
      <div className={`disc-gold-line ${styles.goldLine}`} />

      <div className="container">
        <div className="disc-header section-header">
          <span className="section-label">{t.discography.sectionLabel[lang]}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t.discography.headingTitle[lang] }} />
          <div className="section-divider" />
          <p>{t.discography.headerSub[lang]}</p>
        </div>

        <div className={`disc-grid ${styles.grid}`}>
          {albums.map((a) => (
            <article
              key={a.id}
              id={`disc-${a.id}`}
              className={`disc-card ${styles.card} ${a.isLatest ? styles.cardLatest : ''}`}
            >
              <div className={styles.ornament} aria-hidden="true">
                <div className={styles.ornamentInner}>
                  <span className={styles.ornamentIcon}>♪</span>
                  <div className={styles.ornamentRing} />
                </div>
              </div>

              <div
                className={`${styles.yearBadge} ${!a.year ? styles.yearBadgeEmpty : ''}`}
                aria-hidden={!a.year}
              >
                {a.year || '\u00a0'}
              </div>

              <div className={styles.cover}>
                {a.cover ? (
                  <img
                    src={a.cover}
                    alt={`${a.title} — portada`}
                    className={styles.coverImg}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className={styles.coverInner}>
                    <span className={styles.coverTitle}>{a.title}</span>
                    <span className={styles.coverSub}>{a.location[lang]}</span>
                  </div>
                )}
              </div>

              <div className={styles.info}>
                <h3 className={styles.albumTitle}>{a.title}</h3>
                <p className={styles.note}>{a.note[lang]}</p>

                <ul className={styles.tracks}>
                  {a.tracks.map((track, i) => (
                    <li key={i} className={styles.track}>
                      <span className={styles.trackNum}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={styles.trackName}>{track}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {a.isLatest && (
                <div className={styles.latestBadge}>{t.discography.latestBadge[lang]}</div>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className={`disc-gold-line ${styles.goldLine}`} />
    </section>
  )
}
