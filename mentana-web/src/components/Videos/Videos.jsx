import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Videos.module.css'
import { useLang, t } from '../../context/LangContext'

gsap.registerPlugin(ScrollTrigger)

export default function Videos() {
  const [active, setActive] = useState(null)
  const sectionRef = useRef(null)
  const { lang }   = useLang()
  const videos     = t.videos.list

  const getYoutubeId = (url) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const header = section.querySelector('.vid-header')
      const featured = section.querySelector('.vid-featured')
      const grid = section.querySelector('.vid-grid')
      const cards = section.querySelectorAll('.vid-card')

      const scrollDefaults = { once: true, toggleActions: 'play none none none' }

      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: header, start: 'top 88%', ...scrollDefaults },
          }
        )
      }

      if (featured) {
        gsap.fromTo(
          featured,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: featured, start: 'top 88%', ...scrollDefaults },
          }
        )
      }

      if (cards.length && grid) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: grid, start: 'top 88%', ...scrollDefaults },
          }
        )
      }
    }, sectionRef)

    const refresh = () => ScrollTrigger.refresh()
    refresh()
    const timer = setTimeout(refresh, 400)
    window.addEventListener('load', refresh)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [])

  const handlePlay = (i) => {
    setActive(i)
    document.querySelector('.vid-player-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const featured = active !== null ? videos[active] : videos[0]

  return (
    <section className={styles.section} id="videos" ref={sectionRef}>
      <div className="container">
        <div className="vid-header section-header">
          <span className="section-label">{t.videos.sectionLabel[lang]}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t.videos.headingTitle[lang] }} />
          <div className="section-divider" />
          <p>{t.videos.headerSub[lang]}</p>
        </div>

        <div className={`vid-featured vid-player-wrap ${styles.featured}`}>
          <div className={styles.featuredInner}>
            {featured.placeholder ? (
              <div className={styles.placeholder}>
                <div className={styles.placeholderIcon}>▶</div>
                <p className={styles.placeholderTitle}>{featured.title}</p>
                <p className={styles.placeholderSub}>{t.videos.comingSoon[lang]}</p>
              </div>
            ) : (
              <iframe
                key={featured.id}
                title={featured.title}
                src={`https://www.youtube.com/embed/${getYoutubeId(featured.url)}?autoplay=${active !== null ? 1 : 0}&rel=0&modestbranding=1&color=white`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.iframe}
              />
            )}
          </div>
          <div className={styles.featuredMeta}>
            <h3 className={styles.featuredTitle}>{featured.title}</h3>
            <span className={styles.featuredSub}>{featured.subtitle[lang]}</span>
          </div>
        </div>

        <div className={`vid-grid ${styles.grid}`}>
          {videos.map((v, i) => (
            <button
              key={v.id}
              id={v.id}
              className={`vid-card ${styles.card} ${i === (active ?? 0) ? styles.cardActive : ''}`}
              onClick={() => handlePlay(i)}
              aria-label={`${t.videos.playAria[lang]} ${v.title}`}
            >
              <div className={styles.thumb}>
                <div className={styles.thumbInner}>
                  {getYoutubeId(v.url) ? (
                    <img
                      src={`https://img.youtube.com/vi/${getYoutubeId(v.url)}/mqdefault.jpg`}
                      alt={v.title}
                      className={styles.thumbImg}
                    />
                  ) : (
                    <span className={styles.thumbIcon}>
                      {i === (active ?? 0) ? '■' : '▶'}
                    </span>
                  )}
                </div>
                <div className={styles.thumbOverlay} />
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.cardNum}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.cardText}>
                  <p className={styles.cardTitle}>{v.title}</p>
                  <p className={styles.cardSub}>{v.subtitle[lang]}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.channelLink}>
          <a
            href="https://www.youtube.com/user/mariajosementana"
            target="_blank"
            rel="noopener noreferrer"
            id="link-youtube-channel"
            className={styles.channelBtn}
          >
            <span>{t.videos.channelBtn[lang]}</span>
            <span className={styles.channelArrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
