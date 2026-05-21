import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Gallery.module.css'
import { useLang, t } from '../../context/LangContext'
import { photos } from '../../data/galleryPhotos'

gsap.registerPlugin(ScrollTrigger)

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null)
  const sectionRef  = useRef(null)
  const lightboxRef = useRef(null)
  const { lang }    = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-header-el', {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.08, ease: 'power2.out', delay: 0.2
      })
      gsap.from('.gal-item', {
        opacity: 0, y: 30, duration: 0.7,
        stagger: { each: 0.04, from: 'start' },
        ease: 'power2.out',
        scrollTrigger: { trigger: '.gal-grid', start: 'top 88%', toggleActions: 'play none none none' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (lightbox === null) return
    const handleKey = (e) => {
      if (e.key === 'Escape')      setLightbox(null)
      if (e.key === 'ArrowRight')  setLightbox(l => (l + 1) % photos.length)
      if (e.key === 'ArrowLeft')   setLightbox(l => (l - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  return (
    <div className={styles.page} ref={sectionRef}>

      <div className={styles.header}>
        <span className={`gallery-header-el section-label`}>{t.gallery.sectionLabel[lang]}</span>
        <h1
          className={`gallery-header-el ${styles.title}`}
          dangerouslySetInnerHTML={{ __html: t.gallery.headingTitle[lang] }}
        />
        <p className={`gallery-header-el ${styles.subtitle}`}>{t.gallery.subtitle[lang]}</p>
      </div>

      <div className={`gal-grid ${styles.grid}`}>
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            id={photo.id}
            className={`gal-item ${styles.item}`}
            onClick={() => setLightbox(i)}
            aria-label={`${t.gallery.ariaView[lang]} ${photo.alt[lang]}`}
          >
            <div className={styles.imgWrap}>
              <img
                src={photo.src}
                alt={photo.alt[lang]}
                className={styles.img}
                loading="lazy"
                decoding="async"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className={styles.placeholder} style={{ display: 'none' }}>
                <span className={styles.placeholderIcon}>◈</span>
                <span className={styles.placeholderText}>{photo.alt[lang]}</span>
              </div>
              <div className={styles.overlay}>
                <span className={styles.overlayPlus}>+</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className={styles.count}>
        <span>{photos.length} {t.gallery.count[lang]}</span>
      </div>

      {lightbox !== null && (
        <div
          ref={lightboxRef}
          className={styles.lightbox}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.imageViewer[lang]}
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setLightbox(null)}
            aria-label={t.gallery.closeAria[lang]}
          >
            <span>✕</span>
          </button>

          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <img
              key={lightbox}
              src={photos[lightbox].src}
              alt={photos[lightbox].alt[lang]}
              className={styles.lightboxImg}
              onError={e => { e.target.style.opacity = 0 }}
            />
            <div className={styles.lightboxCaption}>
              <p className={styles.lightboxAlt}>{photos[lightbox].alt[lang]}</p>
              <span className={styles.lightboxCount}>{lightbox + 1} / {photos.length}</span>
            </div>
          </div>

          <div className={styles.lightboxNav}>
            <button
              className={styles.navBtn}
              onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + photos.length) % photos.length) }}
              aria-label={t.gallery.prevAria[lang]}
            >‹</button>
            <button
              className={styles.navBtn}
              onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % photos.length) }}
              aria-label={t.gallery.nextAria[lang]}
            >›</button>
          </div>
        </div>
      )}
    </div>
  )
}
