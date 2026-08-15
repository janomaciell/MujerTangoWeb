import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Clases.module.css'
import { useLang, t } from '../../context/LangContext'
import { siteImages } from '../../data/images.js'

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_NUMBER = '5491132102983'

const CLASS_PHOTOS = [
  '/web-mentana/3.png',
  '/web-mentana/4.png',
  '/web-mentana/7.png',
  '/web-mentana/clase-copia-de-8d2ebb1d-ffed-43b5-95ec-a2df455dc145.png',
]

const ROMAN = ['I', 'II', 'III', 'IV']

export default function Clases() {
  const containerRef = useRef(null)
  const { lang } = useLang()
  const c = t.clases

  // ── Carousel state ──
  const [activeIdx, setActiveIdx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const autoplayRef = useRef(null)

  const goTo = useCallback((idx) => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIdx((idx + CLASS_PHOTOS.length) % CLASS_PHOTOS.length)
    setTimeout(() => setIsAnimating(false), 620)
  }, [isAnimating])

  const goPrev = useCallback(() => goTo(activeIdx - 1), [activeIdx, goTo])
  const goNext = useCallback(() => goTo(activeIdx + 1), [activeIdx, goTo])

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % CLASS_PHOTOS.length)
    }, 3375)
    return () => clearInterval(autoplayRef.current)
  }, [])

  const pauseAutoplay = () => clearInterval(autoplayRef.current)
  const resumeAutoplay = () => {
    clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % CLASS_PHOTOS.length)
    }, 3375)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro
      const heroTl = gsap.timeline({ delay: 0.2 })
      heroTl
        .fromTo('.clases-hero-bg', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' })
        .fromTo(['.clases-kicker', '.clases-h1', '.clases-lead'], {
          opacity: 0,
          y: 20,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        }, '-=0.6')

      // Philosophy split
      gsap.from('.clases-phil-text', {
        opacity: 0,
        x: -30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.clases-phil', start: 'top 82%' },
      })
      gsap.from('.clases-phil-img', {
        opacity: 0,
        x: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.clases-phil', start: 'top 82%' },
      })

      // Gallery
      gsap.from('.clases-photo', {
        opacity: 0,
        scale: 0.93,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.clases-gallery', start: 'top 82%' },
      })

      // Offer cards
      gsap.from('.clases-offer-card', {
        opacity: 0,
        y: 36,
        duration: 0.7,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.clases-offers', start: 'top 82%' },
      })

      // Audience + CTA
      gsap.from(['.clases-audience', '.clases-cta'], {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.clases-audience', start: 'top 85%' },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  // keyboard nav for carousel
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  const whatsappMsg = encodeURIComponent(
    lang === 'es'
      ? '¡Hola! Me gustaría consultar por las clases de canto con María José Mentana.'
      : 'Hello! I would like to inquire about singing classes with María José Mentana.'
  )
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`

  return (
    <main className={styles.page} ref={containerRef}>
      <div className={styles.bgPattern} aria-hidden="true" />

      {/* ── 1. INTRO HERO ── */}
      <section className={styles.hero}>
        {/* Background Full-bleed */}
        <div className={`clases-hero-bg ${styles.portrait}`}>
          <img
            src={siteImages.classesBg}
            alt={lang === 'es' ? 'Clases de Canto' : 'Singing Classes'}
            className={styles.portraitImg}
          />
          <div className={styles.portraitFade} aria-hidden="true" />
        </div>

        {/* Content stacked on top & aligned to the right */}
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={`clases-kicker section-label`}>
              {lang === 'es' ? 'Formación Vocal' : 'Vocal Training'}
            </span>
            <h1 className={`clases-h1 ${styles.title}`}>{c.title[lang]}</h1>
            <p className={`clases-lead ${styles.subtitle}`}>{c.subtitle[lang]}</p>
          </div>
        </div>
      </section>

      {/* ── 2. FILOSOFÍA — split layout ── */}
      <section className={`${styles.philosophySection} clases-phil`}>
        <div className="container">
          <div className={styles.philosophySplit}>
            <div className={`${styles.philText} clases-phil-text`}>
              <h2 className={styles.sectionHeading}>
                {lang === 'es' ? 'Técnica e Interpretación' : 'Technique & Interpretation'}
              </h2>
              <div className={styles.accentBar} />
              <p className={styles.philParagraph}>{c.intro1[lang]}</p>
              <p className={styles.philParagraph}>{c.intro2[lang]}</p>
            </div>
            <div className={`${styles.philImageWrap} clases-phil-img`}>
              <img
                src="/web-mentana/img1.png"
                alt={lang === 'es' ? 'Clases de canto' : 'Singing lessons'}
                className={styles.philImage}
              />
              <div className={styles.philImageCaption}>
                {lang === 'es' ? 'Más de 55 años de experiencia docente y escénica' : 'Over 55 years of teaching and stage experience'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. GALERÍA — carrusel deslizante ── */}
      <section className={`${styles.gallerySection} clases-gallery`}>
        <div className={styles.carouselHeader}>
          <span className={styles.sectionLabel}>
            {lang === 'es' ? 'Experiencia' : 'Experience'}
          </span>
          <h2 className={styles.sectionHeading}>
            {lang === 'es' ? 'Clases y Seminarios' : 'Classes & Seminars'}
          </h2>
          <p className={styles.sectionSub}>
            {lang === 'es'
              ? 'Imágenes de clases, seminarios y momentos junto a alumnos y cantantes.'
              : 'Images from classes, seminars, and moments with students and singers.'}
          </p>
        </div>

        {/* Main slide */}
        <div
          className={styles.carouselStage}
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          aria-label={lang === 'es' ? 'Galería de presentaciones' : 'Performance gallery'}
          aria-roledescription="carousel"
        >
          {/* Slides */}
          <div className={styles.slidesTrack}>
            {CLASS_PHOTOS.map((src, idx) => (
              <div
                key={idx}
                className={`${styles.slide} ${idx === activeIdx ? styles.slideActive : ''}`}
                aria-hidden={idx !== activeIdx}
              >
                <img
                  src={src}
                  alt={lang === 'es' ? `Presentación ${idx + 1}` : `Performance ${idx + 1}`}
                  className={styles.slideImg}
                  loading={idx <= 1 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

          {/* Arrow navigation */}
          <button
            className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
            onClick={goPrev}
            aria-label={lang === 'es' ? 'Anterior' : 'Previous'}
            id="clases-carousel-prev"
          >
            ‹
          </button>
          <button
            className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
            onClick={goNext}
            aria-label={lang === 'es' ? 'Siguiente' : 'Next'}
            id="clases-carousel-next"
          >
            ›
          </button>

          {/* Counter */}
          <div className={styles.carouselCounter}>
            <span className={styles.carouselCountCurrent}>{String(activeIdx + 1).padStart(2, '0')}</span>
            <span className={styles.carouselCountSep}>/</span>
            <span className={styles.carouselCountTotal}>{String(CLASS_PHOTOS.length).padStart(2, '0')}</span>
          </div>

          {/* Progress bar */}
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((activeIdx + 1) / CLASS_PHOTOS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Dot indicators */}
        <div className={styles.dotsRow} role="tablist">
          {CLASS_PHOTOS.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === activeIdx ? styles.dotActive : ''}`}
              onClick={() => { pauseAutoplay(); goTo(idx); resumeAutoplay() }}
              role="tab"
              aria-selected={idx === activeIdx}
              aria-label={`Foto ${idx + 1}`}
              id={`clases-dot-${idx + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail strip */}
        <div className={styles.thumbStrip}>
          {CLASS_PHOTOS.map((src, idx) => (
            <button
              key={idx}
              className={`${styles.thumbBtn} ${idx === activeIdx ? styles.thumbBtnActive : ''}`}
              onClick={() => { pauseAutoplay(); goTo(idx); resumeAutoplay() }}
              aria-label={`Foto ${idx + 1}`}
              id={`clases-thumb-${idx + 1}`}
            >
              <img src={src} alt="" className={styles.thumbBtnImg} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {/* ── 4. MODALIDADES — tarjetas numeradas ── */}
      <section className={`${styles.offersSection} clases-offers`}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>
              {lang === 'es' ? 'Modalidades' : 'Formats'}
            </span>
            <h2 className={styles.sectionHeading}>{c.offerTitle[lang]}</h2>
          </header>

          <div className={styles.offersGrid}>
            {c.offers.map((offer, i) => (
              <article
                key={i}
                className={`${styles.offerCard} clases-offer-card`}
                id={`clases-offer-${i + 1}`}
              >
                <span className={styles.offerNumber}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.offerCardBody}>
                  <h3 className={styles.offerCardTitle}>{offer.title[lang]}</h3>
                  <p className={styles.offerCardDesc}>{offer.desc[lang]}</p>
                </div>
                <div className={styles.offerCardArrow} aria-hidden="true">→</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PARA QUIÉN ── */}
      <section className={`${styles.audienceSection} clases-audience`}>
        <div className={`container container--narrow`}>
          <div className={styles.audienceInner}>
            <h2 className={styles.audienceTitle}>
              {lang === 'es' ? '¿Para quién?' : 'Who is it for?'}
            </h2>
            <div className={styles.audienceLines}>
              <p className={styles.audienceLine}>{c.audience1[lang]}</p>
              <span className={styles.audienceDivider} aria-hidden="true" />
              <p className={styles.audienceLine}>{c.audience2[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CLOSING QUOTE ── */}
      <section className={`${styles.ctaSection} clases-cta`}>
        <div className="container container--narrow">
          <blockquote className={styles.closingQuote}>
            <p className={styles.closingLine1}>{c.closing1[lang]}</p>
            <p className={styles.closingLine2}>{c.closing2[lang]}</p>
          </blockquote>
        </div>
      </section>

    </main>
  )
}
