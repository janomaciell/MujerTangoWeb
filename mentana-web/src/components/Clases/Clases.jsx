import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Clases.module.css'
import { useLang, t } from '../../context/LangContext'

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_NUMBER = '5491132102983'

const CLASS_PHOTOS = [
  '/web-mentana/1.png',
  '/web-mentana/2.png',
  '/web-mentana/3.png',
  '/web-mentana/4.png',
  '/web-mentana/5.png',
  '/web-mentana/6.png',
  '/web-mentana/7.png',
  '/web-mentana/8.png',
  '/web-mentana/9.png',
  '/web-mentana/10.png',
  '/web-mentana/11.png',
  '/web-mentana/img1.png',
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
    }, 4500)
    return () => clearInterval(autoplayRef.current)
  }, [])

  const pauseAutoplay = () => clearInterval(autoplayRef.current)
  const resumeAutoplay = () => {
    clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % CLASS_PHOTOS.length)
    }, 4500)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro
      gsap.from(['.clases-kicker', '.clases-h1', '.clases-lead'], {
        opacity: 0,
        y: 28,
        duration: 1,
        stagger: 0.18,
        ease: 'power3.out',
      })

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
      ? '¡Hola! Me gustaría inscribirme a las clases de canto con María José Mentana.'
      : 'Hello! I would like to enroll in singing classes with María José Mentana.'
  )
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`

  return (
    <main className={styles.page} ref={containerRef}>
      <div className={styles.bgPattern} aria-hidden="true" />

      {/* ── 1. INTRO HERO ── */}
      <section className={styles.introSection}>
        <div className={`container container--narrow ${styles.introInner}`}>
          <span className={`${styles.kicker} clases-kicker`}>
            {lang === 'es' ? 'Formación Vocal' : 'Vocal Training'}
          </span>
          <h1 className={`${styles.mainTitle} clases-h1`}>{c.title[lang]}</h1>
          <p className={`${styles.mainLead} clases-lead`}>{c.subtitle[lang]}</p>
          <div className={styles.titleRule} />
        </div>
      </section>

      {/* ── 2. FILOSOFÍA — split layout ── */}
      <section className={`${styles.philosophySection} clases-phil`}>
        <div className="container">
          <div className={styles.philosophySplit}>
            <div className={`${styles.philText} clases-phil-text`}>
              <h2 className={styles.sectionHeading}>
                {lang === 'es' ? 'La voz como instrumento de vida' : 'The voice as an instrument of life'}
              </h2>
              <div className={styles.accentBar} />
              <p className={styles.philParagraph}>{c.intro1[lang]}</p>
              <p className={styles.philParagraph}>{c.intro2[lang]}</p>
            </div>
            <div className={`${styles.philImageWrap} clases-phil-img`}>
              <img
                src="/web-mentana/img1.png"
                alt={lang === 'es' ? 'María José Mentana enseñando' : 'María José Mentana teaching'}
                className={styles.philImage}
              />
              <div className={styles.philImageCaption}>
                {lang === 'es' ? 'Más de 55 años de experiencia interpretativa' : 'Over 55 years of performance experience'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. GALERÍA — carrusel deslizante ── */}
      <section className={`${styles.gallerySection} clases-gallery`}>
        <div className={styles.carouselHeader}>
          <span className={styles.sectionLabel}>
            {lang === 'es' ? 'El espacio' : 'The space'}
          </span>
          <h2 className={styles.sectionHeading}>
            {lang === 'es' ? 'Así son las clases' : 'What the classes look like'}
          </h2>
          <p className={styles.sectionSub}>
            {lang === 'es'
              ? 'Un entorno cálido, personal y orientado a la transformación vocal.'
              : 'A warm, personal environment focused on vocal transformation.'}
          </p>
        </div>

        {/* Main slide */}
        <div
          className={styles.carouselStage}
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          aria-label={lang === 'es' ? 'Galería de clases' : 'Class gallery'}
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
                  alt={lang === 'es' ? `Clase de canto ${idx + 1}` : `Singing class ${idx + 1}`}
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
                <span className={styles.offerNumber}>{ROMAN[i]}</span>
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

      {/* ── 6. CLOSING QUOTE + CTA ── */}
      <section className={`${styles.ctaSection} clases-cta`}>
        <div className="container container--narrow">
          <blockquote className={styles.closingQuote}>
            <p className={styles.closingLine1}>{c.closing1[lang]}</p>
            <p className={styles.closingLine2}>{c.closing2[lang]}</p>
          </blockquote>

          <div className={styles.ctaBlock}>
            <p className={styles.ctaLabel}>{c.reserveLabel[lang]}</p>
            <div className={styles.ctaLinks}>
              <Link to="/contacto" className={styles.ctaPrimary} id="clases-link-contacto">
                {c.contactLink[lang]}
              </Link>
              <a
                href="mailto:info@mariajosementana.com"
                className={styles.ctaSecondary}
                id="clases-link-email"
              >
                Email
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
                id="clases-link-whatsapp"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
