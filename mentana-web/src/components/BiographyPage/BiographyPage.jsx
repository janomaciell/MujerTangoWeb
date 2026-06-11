import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './BiographyPage.module.css'
import { useLang, t } from '../../context/LangContext'
import { siteImages } from '../../data/images.js'

gsap.registerPlugin(ScrollTrigger)

const statsData = [
  { num: '+55', key: 'years'      },
  { num: '3',   key: 'continents' },
  { num: '97',  key: 'concerts'   },
  { num: '10+', key: 'albums'     },
]

const distIds = ['dist-personalidad', 'dist-academica', 'dist-venezuela', 'dist-uruguay']

const mastersAndCollabs = [
  'Roberto "Polaco" Goyeneche', 'Osvaldo Pugliese', 'Edmundo Rivero',
  'Tita Merello', 'Nelly Omar', 'Horacio Ferrer', 'Mariano Mores',
  'Leopoldo Federico', 'Raúl Garello', 'Floreal Ruiz', 'Osvaldo Piro',
  'Néstor Marconi', 'Sexteto Mayor', 'Atilio Stampone', 'Litto Nebbia',
  'Simón Díaz', 'Orquesta Sinfónica de Venezuela', 'Orquesta Nacional "Juan de Dios Filiberto"'
]

function QuoteText({ lang }) {
  const { una, rest, emphasis } = t.about.quote
  const restText = rest[lang]
  const highlight = emphasis[lang]
  const idx = restText.indexOf(highlight)

  if (idx === -1) {
    return (
      <p className={styles.quoteRest}>
        {restText}
      </p>
    )
  }

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
        .fromTo('.bpage-hero-label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .fromTo('.bpage-hero-title', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.3')
        .fromTo('.bpage-hero-sub',   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .fromTo('.bpage-hero-img',   { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, '-=0.6')

      // Stats
      gsap.from('.bpage-stat', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.bpage-stats', start: 'top 85%', toggleActions: 'play none none none' }
      })

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

      // Quote Block Animation
      gsap.from('.bpage-quote-anim', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bpage-quote-section',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
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
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className="bpage-hero-label section-label">{bp.sectionLabel[lang]}</span>
            <h1
              className={`bpage-hero-title ${styles.heroTitle}`}
            >
              {bp.heroTitle[lang]}
            </h1>
            <p className={`bpage-hero-sub ${styles.heroSub}`}>{bp.heroSub[lang]}</p>
          </div>

          <div className={`bpage-hero-img ${styles.heroImgWrap}`}>
            <img src={siteImages.biographyHero} alt="María José Mentana" className={styles.heroImg} />
            <div className={styles.heroImgGradient} />
            <div className={styles.heroImgBorn}>
              <span className={styles.heroImgBornLabel}>{bp.bornLabel[lang]}</span>
              <span className={styles.heroImgBornVal}>31 · 01 · 1961</span>
              <span className={styles.heroImgBornPlace}>San Isidro, Buenos Aires</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className={`bpage-stats ${styles.statsBar}`}>
        <div className="container">
          <div className={styles.statsGrid}>
            {statsData.map(s => (
              <div key={s.key} className={`bpage-stat ${styles.statItem}`}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{bp.stats[s.key][lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            </div>
          </div>
        </div>
      </section>

      <div className={`bpage-gold-line ${styles.goldLine}`} />

      {/* ── QUOTE SECTION ── */}
      <section className={`bpage-quote-section ${styles.quoteSection}`}>
        <div className="container">
          <div className={styles.quoteBlock}>
            <blockquote className={`bpage-quote-anim ${styles.quote}`}>
              <span className={styles.quoteUna}>{t.about.quote.una[lang]}</span>
              <QuoteText lang={lang} />
            </blockquote>

            <figure className={`bpage-quote-anim ${styles.quoteFigure}`}>
              <div className={styles.quoteImageWrap}>
                <img
                  src={siteImages.aboutQuote}
                  alt="María José Mentana"
                  className={styles.quoteImage}
                  loading="lazy"
                />
              </div>
            </figure>
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
                {mastersAndCollabs.map(name => (
                  <span key={name} className={`bpage-tags-anim ${styles.collabTag}`}>
                    {name}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
