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

const masters = [
  'Roberto "Polaco" Goyeneche', 'Osvaldo Pugliese', 'Edmundo Rivero',
  'Néstor Marconi', 'Horacio Salgán', 'Leopoldo Federico', 'Roberto Rufino',
  'Tita Merello', 'Nelly Omar', 'Mercedes Simone',
  'Horacio Ferrer', 'Mariano Mores', 'Atilio Stampone', 'Osvaldo Piro',
]

const chapters = [
  { years: '1970–1975', eraKey: 'era1', titleKey: 'title1', textKey: 'text1', locationKey: 'loc1' },
  { years: '1976–1983', eraKey: 'era2', titleKey: 'title2', textKey: 'text2', locationKey: 'loc2' },
  { years: '1984–1989', eraKey: 'era3', titleKey: 'title3', textKey: 'text3', locationKey: 'loc3' },
  { years: '1990–2005', eraKey: 'era4', titleKey: 'title4', textKey: 'text4', locationKey: 'loc4' },
  { years: '2008–2019', eraKey: 'era5', titleKey: 'title5', textKey: 'text5', locationKey: 'loc5' },
  { years: '2020–2026', eraKey: 'era6', titleKey: 'title6', textKey: 'text6', locationKey: 'loc6' },
]

const distIds        = ['dist-personalidad', 'dist-academica', 'dist-venezuela', 'dist-uruguay']
const collaborations = [
  'Osvaldo Piro', 'Néstor Marconi', 'Mariano Mores', 'Sexteto Mayor',
  'Orquesta Sinfónica de Venezuela', 'Orquesta Sinfónica de Colombia',
  'Orquesta Sinfónica de Salta', 'Orquesta Nacional "Juan de Dios Filiberto"',
  'Orquesta del Tango de Buenos Aires', 'Atilio Stampone',
  'Litto Nebbia', 'Horacio Ferrer', 'Miguel Ángel Zotto', 'Simón Díaz',
]

export default function BiographyPage() {
  const pageRef  = useRef(null)
  const { lang } = useLang()
  const bp       = t.biographyPage

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Hero
      const heroTl = gsap.timeline({ delay: 0.2 })
      heroTl
        .fromTo('.bpage-rule-top', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' })
        .fromTo('.bpage-hero-label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .fromTo('.bpage-hero-title', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.3')
        .fromTo('.bpage-hero-sub',   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .fromTo('.bpage-hero-img',   { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, '-=0.6')

      // Stats
      gsap.from('.bpage-stat', {
        opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.bpage-stats', start: 'top 85%', toggleActions: 'play none none none' }
      })

      // Intro
      gsap.from('.bpage-intro-text', {
        opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.bpage-intro', start: 'top 82%', toggleActions: 'play none none none' }
      })

      // Chapter cards
      gsap.utils.toArray('.bpage-chapter').forEach(el => {
        gsap.from(el, {
          opacity: 0, y: 40, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        })
      })

      // Timeline line
      gsap.fromTo('.bpage-timeline-line',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: '.bpage-chapters', start: 'top 60%', end: 'bottom 40%', scrub: true } }
      )

      // Masters tags
      gsap.from('.bpage-master-tag', {
        opacity: 0, y: 16, duration: 0.5, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: { trigger: '.bpage-masters', start: 'top 85%', toggleActions: 'play none none none' }
      })

      // Distinctions
      gsap.from('.bpage-dist-item', {
        x: -40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.bpage-dist-col', start: 'top 80%', toggleActions: 'play none none none' }
      })

      // Collab tags
      gsap.from('.bpage-collab-tag', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: '.bpage-collab-col', start: 'top 82%', toggleActions: 'play none none none' }
      })

      // Section headers
      gsap.utils.toArray('.bpage-section-header').forEach(el => {
        gsap.from(el, {
          opacity: 0, y: 24, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        })
      })

      // Voice & teaching
      gsap.from('.bpage-voice-text', {
        opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.bpage-voice', start: 'top 85%', toggleActions: 'play none none none' }
      })
      gsap.from('.bpage-teach-item', {
        opacity: 0, x: -20, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.bpage-teaching', start: 'top 85%', toggleActions: 'play none none none' }
      })

      // Gold shimmer
      gsap.to('.bpage-gold-line', {
        backgroundPosition: '200% center', ease: 'none',
        scrollTrigger: { trigger: pageRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      })

    }, pageRef)

    return () => ctx.revert()
  }, [])

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
              dangerouslySetInnerHTML={{ __html: bp.heroTitle[lang] }}
            />
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

      {/* ── INTRO ── */}
      <section className={`bpage-intro ${styles.intro}`}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introLeft}>
              <span className="section-label">{bp.introLabel[lang]}</span>
              <h2 className={styles.introTitle} dangerouslySetInnerHTML={{ __html: bp.introTitle[lang] }} />
            </div>
            <div className={styles.introRight}>
              <p className={`bpage-intro-text ${styles.introPara}`}>{bp.introPara1[lang]}</p>
              <p className={`bpage-intro-text ${styles.introPara}`}>{bp.introPara2[lang]}</p>
              <p className={`bpage-intro-text ${styles.introPara}`}>{bp.introPara3[lang]}</p>
              <blockquote className={`bpage-intro-text ${styles.introQuote}`}>
                <p>{bp.introQuote[lang]}</p>
                <cite>{bp.introQuoteCite[lang]}</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <div className={`bpage-gold-line ${styles.goldLine}`} />

      {/* ── CHAPTERS ── */}
      <section className={`bpage-chapters ${styles.chapters}`}>
        <div className="container">
          <div className={`bpage-section-header section-header`} style={{ textAlign:'left', marginBottom:'clamp(3rem,6vw,5rem)' }}>
            <span className="section-label">{bp.chaptersLabel[lang]}</span>
            <h2 dangerouslySetInnerHTML={{ __html: bp.chaptersTitle[lang] }} />
          </div>

          <div className={styles.chaptersLayout}>
            <div className={`bpage-timeline-line ${styles.timelineLine}`} />
            <div className={styles.chaptersList}>
              {chapters.map((ch) => (
                <article key={ch.years} className={`bpage-chapter ${styles.chapter}`}>
                  <div className={styles.chapterYears}>{ch.years}</div>
                  <div className={styles.chapterCard}>
                    <span className={styles.chapterEra}>{bp[ch.eraKey][lang]}</span>
                    <h3 className={styles.chapterTitle}>{bp[ch.titleKey][lang]}</h3>
                    <p className={styles.chapterText}>{bp[ch.textKey][lang]}</p>
                    <span className={styles.chapterLoc}>
                      <span className={styles.chapterDot}>◆</span> {bp[ch.locationKey][lang]}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={`bpage-gold-line ${styles.goldLine}`} />

      {/* ── MAESTROS ── */}
      <section className={`bpage-masters ${styles.mastersSection}`}>
        <div className="container">
          <div className={`bpage-section-header section-header`}>
            <span className="section-label">{bp.mastersLabel[lang]}</span>
            <h2 dangerouslySetInnerHTML={{ __html: bp.mastersTitle[lang] }} />
            <div className="section-divider" />
            <p>{bp.mastersSub[lang]}</p>
          </div>
          <div className={styles.mastersGrid}>
            {masters.map(m => (
              <span key={m} className={`bpage-master-tag ${styles.masterTag}`}>{m}</span>
            ))}
          </div>
          <div className={styles.mastersQuote}>
            <blockquote>
              <p>{bp.mastersQuote[lang]}</p>
              <cite>{bp.mastersQuoteCite[lang]}</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <div className={`bpage-gold-line ${styles.goldLine}`} />

      {/* ── VOZ Y TÉCNICA ── */}
      <section className={`bpage-voice ${styles.voiceSection}`}>
        <div className="container">
          <div className={styles.voiceGrid}>
            <div className={styles.voiceLeft}>
              <span className="section-label">{bp.voiceLabel[lang]}</span>
              <h2 className={styles.voiceTitle} dangerouslySetInnerHTML={{ __html: bp.voiceTitle[lang] }} />
              <div className={styles.voiceAccent} />
            </div>
            <div className={styles.voiceRight}>
              <p className={`bpage-voice-text ${styles.voicePara}`}>{bp.voicePara1[lang]}</p>
              <p className={`bpage-voice-text ${styles.voicePara}`}>{bp.voicePara2[lang]}</p>
              <div className={`bpage-voice-text ${styles.voiceTraits}`}>
                {bp.voiceTraits[lang].map(tr => (
                  <span key={tr} className={styles.voiceTrait}>
                    <span className={styles.voiceTraitDot}>◆</span> {tr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`bpage-gold-line ${styles.goldLine}`} />

      {/* ── DOCENCIA ── */}
      <section className={`bpage-teaching ${styles.teachingSection}`}>
        <div className="container">
          <div className={`bpage-section-header section-header`}>
            <span className="section-label">{bp.teachLabel[lang]}</span>
            <h2 dangerouslySetInnerHTML={{ __html: bp.teachTitle[lang] }} />
            <div className="section-divider" />
            <p>{bp.teachSub[lang]}</p>
          </div>
          <div className={styles.teachGrid}>
            {bp.teachItems[lang].map((item, i) => (
              <div key={i} className={`bpage-teach-item ${styles.teachItem}`}>
                <span className={styles.teachNum}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.teachBody}>
                  <h3 className={styles.teachItemTitle}>{item.title}</h3>
                  <p className={styles.teachItemText}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`bpage-gold-line ${styles.goldLine}`} />

      {/* ── RECONOCIMIENTOS ── */}
      <section className={styles.recognitionSection}>
        <div className="container">
          <div className={`bpage-section-header section-header`}>
            <span className="section-label">{t.press.sectionLabel[lang]}</span>
            <h2>{t.press.heading[lang]}</h2>
            <div className="section-divider" />
            <p>{t.press.subheading[lang]}</p>
          </div>

          <div className={styles.recognitionGrid}>
            <div className={`bpage-dist-col ${styles.distCol}`}>
              <h3 className={styles.recColHeading}>{t.press.distinctions[lang]}</h3>
              <div className={styles.distList}>
                {t.press.dists.map((d, i) => (
                  <div key={distIds[i]} id={distIds[i]} className={`bpage-dist-item ${styles.distCard}`}>
                    <span className={styles.distStar}>★</span>
                    <div className={styles.distBody}>
                      <p className={styles.distTitle}>{d[lang]}</p>
                      <p className={styles.distOrg}>{t.press.orgs[i][lang]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`bpage-collab-col ${styles.collabCol}`}>
              <h3 className={styles.recColHeading}>{t.press.actedWith[lang]}</h3>
              <div className={styles.collabList}>
                {collaborations.map(c => (
                  <span key={c} className={`bpage-collab-tag ${styles.collabTag}`}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.recStats}>
            {[
              { num: '+50', label: t.press.stats.years[lang]      },
              { num: '3',   label: t.press.stats.continents[lang] },
              { num: '65+', label: t.press.stats.cities[lang]     },
            ].map(s => (
              <div key={s.label} className={`bpage-stat ${styles.recStatItem}`}>
                <span className={styles.recStatNum}>{s.num}</span>
                <span className={styles.recStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`bpage-gold-line ${styles.goldLine}`} />

      {/* ── CLOSING QUOTE ── */}
      <section className={styles.closingSection}>
        <div className="container">
          <blockquote className={styles.closingQuote}>
            <p>{bp.closingQuote[lang]}</p>
            <cite>{bp.closingCite[lang]}</cite>
          </blockquote>
        </div>
      </section>

    </div>
  )
}
