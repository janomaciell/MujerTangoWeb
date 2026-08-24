import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './DiscographyPage.module.css'
import { useLang, t } from '../../context/LangContext'
import { coverPath, siteImages } from '../../data/images.js'

gsap.registerPlugin(ScrollTrigger)

const albums = [

  {
    id: 'mujer-tango',
    title: 'Mujer Tango',
    year: '2025',
    spotifyUrl: 'https://open.spotify.com/album/5YCNlW3zw9gr8jFSyCtl7a',
    cover: coverPath('MUJERTANGO.webp'),
  },
  {
    id: 'cien-troilos',
    title: 'CienTroilos',
    year: '2014',
    spotifyUrl: 'https://open.spotify.com/album/3TvrHvdAHn3tLcDAI1CFxo',
    cover: coverPath('CIENTROILOS1.webp'),
  },
  {
    id: '40-anos',
    title: '40 Años con el Tango',
    year: '2010',
    spotifyUrl: 'https://open.spotify.com/album/0iMl33blt5w3Gstdbef9rQ',
    cover: coverPath('40ANOSCONELTANGO.webp'),
  },
  {
    id: 'por-amor',
    title: 'Por Amor a Buenos Aires',
    spotifyUrl: 'https://open.spotify.com/album/5hGISsthWo2ddeiAdw5aVW',
    cover: coverPath('PORAMORABUENOSAIRES.webp'),
  },
  {
    id: 'vuelvo-al-sur',
    title: 'Vuelvo al Sur',
    spotifyUrl: 'https://open.spotify.com/album/7CkmoSwiFO4vtKdEZX8F2s',
    cover: coverPath('VUELVOALSUR.webp'),
  },
  {
    id: 'una-piba',
    title: 'Una Piba y un Tango',
    spotifyUrl: 'https://open.spotify.com/album/3RkgbwVZUvPBEiZA4u3rHS',
    cover: coverPath('UNAPIBAYUNTANGO.webp'),
  },
  {
    id: 'pastora',
    title: 'Pastora',
    spotifyUrl: 'https://open.spotify.com/album/4wkN22Cq0Lx6YR7YQAt4CA',
    cover: coverPath('SINGLES.webp'),
  },
    {
    id: 'envivo',
    title: 'En Vivo',
    spotifyUrl: 'https://open.spotify.com/album/5NcePDMz7z5DAQFBufA71r',
    cover: coverPath('ENVIVO.webp'),
  },
  {
    id: 'una-piba-single',
    title: 'Una Piba y un Tango (Single)',
    spotifyUrl: 'https://open.spotify.com/album/7voCmpwKdUUZoWdD0tvP3V',
    cover: coverPath('UNAPIBAYUNTANGOSINGLE.webp'),
  }
]

export default function DiscographyPage() {
  const sectionRef = useRef(null)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.2 })
      heroTl
        .fromTo('.disc-hero-bg', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' })
        .fromTo('.disc-hero-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.6')
      gsap.from('.disc-album-card-wrapper', {
        opacity: 0, y: 60, scale: 0.94,
        duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.disc-grid',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.page} ref={sectionRef} id="discografia">
      {/* Geometric decorators */}
      <div className={styles.geo1} aria-hidden="true" />
      <div className={styles.geo2} aria-hidden="true" />
      <div className={styles.geo3} aria-hidden="true" />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        {/* Background Full-bleed */}
        <div className={`disc-hero-bg ${styles.portrait}`}>
          <img
            src={siteImages.discographyBg}
            alt={lang === 'es' ? 'Discografía' : 'Discography'}
            className={styles.portraitImg}
          />
          <div className={styles.portraitFade} aria-hidden="true" />
        </div>

        {/* Content stacked on top & aligned to the right */}
        <div className={styles.heroInner}>
          <div className={`disc-hero-text ${styles.heroContent}`}>
            <span className="section-label">{t.discography.sectionLabel[lang]}</span>
            <h1
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: t.discography.headingTitle[lang] }}
            />
            <p className={styles.subtitle}>{t.discography.headerSub[lang]}</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={`disc-grid ${styles.grid}`}>
          {albums.map((album) => (
            <div key={album.id} className="disc-album-card-wrapper">
              <a
                href={album.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`disc-${album.id}`}
                className={styles.card}
                aria-label={`${album.title} — abrir en Spotify`}
              >
              <div className={styles.coverWrap}>
                <img
                  src={album.cover}
                  alt={`${album.title} — portada`}
                  className={styles.coverImg}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement.classList.add(styles.coverFallback)
                  }}
                />
                <div className={styles.overlay} aria-hidden="true">
                  <svg className={styles.spotifyIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  <span className={styles.overlayText}>
                    {lang === 'es' ? 'Escuchar en Spotify' : 'Listen on Spotify'}
                  </span>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <h2 className={styles.albumTitle}>{album.title}</h2>
                {album.year && <span className={styles.albumYear}>{album.year}</span>}
              </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
