import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Music.module.css'
import { useLang, t } from '../../context/LangContext'

gsap.registerPlugin(ScrollTrigger)

const albums = [
  { title: 'Mujer Tango', year: '2025', spotifyId: '5YCNlW3zw9gr8jFSyCtl7a' },
]

export default function Music() {
  const sectionRef = useRef(null)
  const { lang }   = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.music-header', {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.music-header', start: 'top 82%', toggleActions: 'play none none none' }
      })
      gsap.from('.music-embed', {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' }
      })
      gsap.from('.music-link', {
        opacity: 0, y: 20, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.music-links', start: 'top 85%', toggleActions: 'play none none none' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="musica" ref={sectionRef}>
      <div className={styles.bg} aria-hidden="true" />
      <div className="container container--narrow">
        <div className="music-header section-header">
          <span className="section-label">{t.music.sectionLabel[lang]}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t.music.headingTitle[lang] }} />
          <div className="section-divider" />
          <p style={{ whiteSpace: 'pre-line' }}>{t.music.headerSub[lang]}</p>
        </div>

        {albums.map(album => (
          <div key={album.title} className={`music-embed ${styles.embedWrap}`}>
            <div className={styles.embedLabel}>
              <span className={styles.embedAlbumTitle}>{album.title}</span>
              <span className={styles.embedYear}>{album.year}</span>
            </div>
            <div className={styles.embedFrame}>
              <iframe
                title={`${album.title} en Spotify`}
                src={`https://open.spotify.com/embed/album/${album.spotifyId}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        ))}

        <div className={`music-links ${styles.links}`}>
          <span className={styles.linksLabel}>{t.music.availableOn[lang]}</span>
          <div className={styles.linksRow}>
            <a href="https://open.spotify.com/album/5YCNlW3zw9gr8jFSyCtl7a" target="_blank" rel="noopener noreferrer" id="link-spotify" className={`music-link ${styles.linkBtn}`}>
              <span className={styles.linkIcon}>♫</span> Spotify
            </a>
            <a href="https://www.youtube.com/user/mariajosementana" target="_blank" rel="noopener noreferrer" id="link-youtube-music" className={`music-link ${styles.linkBtn}`}>
              <span className={styles.linkIcon}>▶</span> YouTube
            </a>
            <a href="https://mariajosementana.blogspot.com/" target="_blank" rel="noopener noreferrer" id="link-blog-music" className={`music-link ${styles.linkBtn}`}>
              <span className={styles.linkIcon}>◈</span> {t.music.blogText[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
