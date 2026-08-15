import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './BiographyPage.module.css'
import { useLang, t } from '../../context/LangContext'
import { siteImages, assetUrl } from '../../data/images.js'

gsap.registerPlugin(ScrollTrigger)

const distIds = ['dist-personalidad', 'dist-academica']

const BASE = 'https://pub-1a8e9e1898cd4579ab1dee0eb1fedb88.r2.dev/artistas-hover'

const LOCAL = '/NuevasImagenes'

const mastersAndCollabs = [
  { name: 'Osvaldo Pugliese',             img: `${BASE}/OSVALGO PUGLIESE.png` },
  { name: 'Juanjo Domínguez',             img: assetUrl('artistas-hover/Juanjo-dominguez.jpeg') },
  { name: 'Astor Piazzolla',              img: `${LOCAL}/IMG-20260803-WA0181.jpg.jpeg` },
  { name: 'Tita Merello',                 img: `${LOCAL}/7 TITA MERELLO- BEBA BIDART.jpg.jpeg` },
  { name: 'Nelly Omar',                   img: `${LOCAL}/IMG-20260803-WA0170.jpeg` },
  { name: 'Rubén Juárez',                 img: assetUrl('artistas-hover/ruben-juarez.jpeg') },
  { name: 'Estrella Morente',             img: assetUrl('artistas-hover/estrella-morente.jpeg') },
  { name: 'Mercedes Sosa',                img: assetUrl('artistas-hover/mercedes-sosa.jpeg') },
  { name: 'Raúl Lavié',                   img: assetUrl('artistas-hover/LAVIE.JPG.jpeg') },
  { name: 'Horacio Ferrer',               img: `${BASE}/HORACIO FERRER.png` },
  { name: 'Mariano Mores',                img: `${BASE}/12 MARIANO MORES.png` },
  { name: 'Leopoldo Federico',            img: assetUrl('artistas-hover/leopoldofederico.jpeg') },
  { name: 'Raúl Garello',                 img: `${BASE}/RAUL GARELLO.png` },
  { name: 'Floreal Ruiz',                 img: `${LOCAL}/C Floreal Ruiz.jpeg` },
  { name: 'Néstor Marconi',               img: `${BASE}/JAPON92 NESTOR MARCONI.png` },
  { name: 'Sexteto Mayor',                img: `${LOCAL}/IMG-20260803-WA0172.jpeg` },
  { name: 'Atilio Stampone',              img: `${LOCAL}/Stampone, Federico Rivas Buono.jpg.jpeg` },
  { name: 'Litto Nebbia',                 img: `${BASE}/014 LITTO NEBIA.png` },
  { name: 'Mercedes Simone',              img: `${LOCAL}/5 MERCEDES SIMONE.jpg.jpeg` },
  { name: 'Ernesto Baffa',                img: `${LOCAL}/BAFFA ERNESTO.jpg.jpeg` },
  { name: 'Osvaldo Berlingeri',           img: `${BASE}/3548 OSVALDO BERLINGERI.png` },
  { name: 'Orquesta Sinfónica Venezuela', img: `${BASE}/SINFONICA VENEZUELA.png` },
  { name: 'Filarmónica de Mendoza',       img: `${LOCAL}/DSC_0837.JPG.jpeg` },
  { name: 'Orquesta Nacional "Juan de Dios Filiberto"', img: `${LOCAL}/Screenshot_20260811_110511_Adobe Acrobat.jpeg` },
]

function QuoteText({ lang }) {
  const { una, rest, emphasis } = t.about.quote
  const restText = rest[lang]
  const highlight = emphasis[lang]
  const idx = restText.indexOf(highlight)




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

function CollabTag({ name, img }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const openModal = useCallback(() => {
    setMobileOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setMobileOpen(false)
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') openModal()
    if (e.key === 'Escape') closeModal()
  }, [openModal, closeModal])

  return (
    <>
      <span className={`bpage-tags-anim ${styles.collabTagWrapper}`}>
        <span
          className={`${styles.collabTag} ${img ? styles.collabTagHasImg : ''}`}
          onClick={img ? openModal : undefined}
          role={img ? 'button' : undefined}
          tabIndex={img ? 0 : undefined}
          onKeyDown={img ? handleKeyDown : undefined}
          aria-haspopup={img ? 'dialog' : undefined}
        >
          {name}
          {img && <span className={styles.collabTagDot} aria-hidden="true" />}

          {/* Desktop hover card — solo si tiene imagen */}
          {img && (
            <span className={styles.collabTooltip} aria-hidden="true">
              <img src={img} alt={name} className={styles.collabTooltipImg} />
              <span className={styles.collabTooltipName}>{name}</span>
            </span>
          )}
        </span>
      </span>

      {/* Mobile modal overlay */}
      {mobileOpen && (
        <div
          className={styles.mobileModalOverlay}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={name}
        >
          <div
            className={styles.mobileModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.mobileModalClose}
              onClick={closeModal}
              aria-label="Cerrar"
            >
              ✕
            </button>
            {img ? (
              <img src={img} alt={name} className={styles.mobileModalImg} />
            ) : (
              <div className={styles.mobileModalPlaceholder}>
                <span style={{ fontSize: '2.5rem', opacity: 0.3 }}>📷</span>
                <span style={{ fontSize: '0.85rem', color: 'rgba(245,247,255,0.4)', letterSpacing: '0.06em' }}>Imagen próximamente</span>
              </div>
            )}
            <p className={styles.mobileModalName}>{name}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default function BiographyPage() {
  const pageRef = useRef(null)
  const counterRef = useRef(null)
  const { lang } = useLang()
  const bp = t.biographyPage

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const heroTl = gsap.timeline({ delay: 0.2 })
      heroTl
        .fromTo('.bpage-hero-bg',    { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' })
        .fromTo('.bpage-hero-sub',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')



      // Experience Counter Animation
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

      // Paragraphs Animation
      gsap.from('.about-para', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.bpage-body',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })



      // Honors & Collaborations
      gsap.from('.bpage-tags-anim', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.bpage-tags-section',
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      })

      // Gold Shimmer lines
      gsap.to('.bpage-gold-line', {
        backgroundPosition: '200% center',
        ease: 'none',
        scrollTrigger: { trigger: pageRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      })

    }, pageRef)

    return () => ctx.revert()
  }, [])

  const yearsLines = t.about.yearsLabel[lang].split('\n')

  return (
    <div className={styles.page} ref={pageRef}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        {/* Foto full-bleed */}
        <div className={`bpage-hero-bg ${styles.portrait}`}>
          <img
            src={siteImages.biographyBg}
            alt="María José Mentana"
            className={styles.portraitImg}
          />
          <div className={styles.portraitFade} aria-hidden="true" />
        </div>

        {/* Contenido centrado/alineado */}
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className="bpage-hero-sub section-label">{bp.sectionLabel[lang]}</span>
            <h1
              className={`bpage-hero-sub ${styles.title}`}
              dangerouslySetInnerHTML={{ __html: bp.heroTitle[lang] }}
            />
            <p className={`bpage-hero-sub ${styles.subtitle}`}>{bp.heroSub[lang]}</p>
          </div>
        </div>
      </section>



      <div className={`bpage-gold-line ${styles.goldLine}`} />

      {/* ── BIOGRAPHY TEXT (ABOUT PARAGRAPHS) ── */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={`bpage-body ${styles.body}`}>
            <div className={styles.bodyText}>
              {t.about.paragraphs.map((p, idx) => (
                <p key={idx} className={`about-para ${idx === 0 ? styles.lead : styles.para}`}>
                  {p[lang]}
                </p>
              ))}
            </div>

            <div className={`about-para ${styles.counterBlock}`}>
              <div className={styles.counterRow}>
                <span ref={counterRef} className={styles.counterNum} aria-live="polite">0+</span>
                <span className={styles.counterLabel}>
                  {yearsLines[0]}<br />{yearsLines[1]}
                </span>
              </div>

              {/* Imagen abajo de los números */}
              <div className={styles.counterImageWrap}>
                <img
                  src={siteImages.aboutQuote}
                  alt="María José Mentana"
                  className={styles.counterImage}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`bpage-gold-line ${styles.goldLine}`} />

      {/* ── SIMPLIFIED HONORS & COLLABORATIONS ── */}
      <section className={`bpage-tags-section ${styles.tagsSection}`}>
        <div className="container">
          <div className={styles.tagsLayout}>
            
            {/* Column 1: Reconocimientos */}
            <div className={styles.tagsCol}>
              <h2 className={`bpage-tags-anim ${styles.tagsColTitle}`}>{t.press.distinctions[lang]}</h2>
              <div className={styles.distList}>
                {t.press.dists.map((d, i) => (
                  <div key={distIds[i]} className={`bpage-tags-anim ${styles.distCard}`}>
                    <span className={styles.distStar}>★</span>
                    <div className={styles.distBody}>
                      <span className={styles.distTitle}>{d[lang]}</span>
                      <span className={styles.distOrg}>{t.press.orgs[i][lang]}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`bpage-tags-anim ${styles.distImgWrap}`}>
                <img
                  src={`${LOCAL}/IMG-20260803-WA0187.jpeg`}
                  alt={lang === 'es' ? 'Distinción — María José Mentana' : 'Distinction — María José Mentana'}
                  className={styles.distImg}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Column 2: Maestros y Colaboraciones */}
            <div className={styles.tagsCol}>
              <h2 className={`bpage-tags-anim ${styles.tagsColTitle}`}>{lang === 'es' ? 'Maestros y Colaboradores' : 'Mentors & Collaborators'}</h2>
              <div className={styles.collabList}>
                {mastersAndCollabs.map(({ name, img }) => (
                  <CollabTag key={name} name={name} img={img} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
