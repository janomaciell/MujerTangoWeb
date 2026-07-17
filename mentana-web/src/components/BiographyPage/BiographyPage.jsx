import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './BiographyPage.module.css'
import { useLang, t } from '../../context/LangContext'
import { siteImages } from '../../data/images.js'

gsap.registerPlugin(ScrollTrigger)

const distIds = ['dist-personalidad', 'dist-academica']

const mastersAndCollabs = [
  { name: 'Roberto "Polaco" Goyeneche',  img: null },
  { name: 'Osvaldo Pugliese',             img: null },
  { name: 'Edmundo Rivero',               img: null },
  { name: 'Tita Merello',                 img: null },
  { name: 'Nelly Omar',                   img: null },
  { name: 'Horacio Ferrer',               img: null },
  { name: 'Mariano Mores',                img: null },
  { name: 'Leopoldo Federico',            img: null },
  { name: 'Raúl Garello',                 img: null },
  { name: 'Floreal Ruiz',                 img: null },
  { name: 'Osvaldo Piro',                 img: null },
  { name: 'Néstor Marconi',               img: null },
  { name: 'Sexteto Mayor',                img: null },
  { name: 'Atilio Stampone',              img: null },
  { name: 'Litto Nebbia',                 img: null },
  { name: 'Simón Díaz',                   img: null },
  { name: 'Osvaldo Berlingeri',           img: null },
  { name: 'Orquesta Sinfónica Venezuela', img: null },
  { name: 'Sinfónica de Salta',           img: null },
  { name: 'Filarmónica de Mendoza',       img: null },
  { name: 'Orquesta Nacional "Juan de Dios Filiberto"', img: null },
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
  const [expanded, setExpanded] = useState(false)

  return (
    <span className={`bpage-tags-anim ${styles.collabTagWrapper}`}>
      <span
        className={`${styles.collabTag} ${img ? styles.collabTagHasImg : ''}`}
        onClick={() => img && setExpanded(prev => !prev)}
        role={img ? 'button' : undefined}
        tabIndex={img ? 0 : undefined}
        onKeyDown={img ? (e) => e.key === 'Enter' && setExpanded(prev => !prev) : undefined}
      >
        {name}
        {img && <span className={styles.collabTagDot} aria-hidden="true" />}
        {/* Desktop hover tooltip */}
        {img && (
          <span className={styles.collabTooltip} aria-hidden="true">
            <img src={img} alt={name} className={styles.collabTooltipImg} />
          </span>
        )}
        {/* Placeholder shown when no image yet — desktop only hint */}
        {!img && (
          <span className={styles.collabTooltip} aria-hidden="true">
            <span className={styles.collabTooltipPlaceholder}>
              <span className={styles.collabTooltipPlaceholderIcon}>📷</span>
              <span className={styles.collabTooltipPlaceholderText}>{name}</span>
            </span>
          </span>
        )}
      </span>
      {/* Mobile expand panel */}
      {expanded && (
        <span className={styles.collabExpanded} role="region" aria-label={name}>
          {img ? (
            <img src={img} alt={name} className={styles.collabExpandedImg} />
          ) : (
            <span className={styles.collabExpandedPlaceholder}>
              <span className={styles.collabExpandedPlaceholderIcon}>📷</span>
              <span className={styles.collabExpandedPlaceholderText}>Imagen próximamente</span>
            </span>
          )}
        </span>
      )}
    </span>
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
        .fromTo('.bpage-rule-top', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' })
        .fromTo('.bpage-hero-bg',    { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.4')
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
        <div className={`bpage-rule-top ${styles.ruleTop}`} />
        
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
