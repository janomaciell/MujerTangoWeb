import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Press.module.css'
import { useLang, t } from '../../context/LangContext'

gsap.registerPlugin(ScrollTrigger)

const collaborations = [
  'Osvaldo Piro', 'Néstor Marconi', 'Mariano Mores', 'Sexteto Mayor',
  'Orquesta Sinfónica de Venezuela', 'Orquesta Nacional "Juan de Dios Filiberto"',
  'Atilio Stampone',
]

const distIds = ['dist-personalidad', 'dist-academica', 'dist-venezuela', 'dist-uruguay']

export default function Press() {
  const sectionRef = useRef(null)
  const { lang }   = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dist-item', {
        x: -40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.dist-col', start: 'top 80%', toggleActions: 'play none none none' }
      })
      gsap.from('.collab-tag', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: '.collab-col', start: 'top 82%', toggleActions: 'play none none none' }
      })
      gsap.from('.stat-item', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-row', start: 'top 85%', toggleActions: 'play none none none' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const stats = [
    { number: '+50', label: t.press.stats.years[lang]      },
    { number: '3',   label: t.press.stats.continents[lang] },
    { number: '65+', label: t.press.stats.cities[lang]     },
  ]

  return (
    <section className={styles.section} id="prensa" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.press.sectionLabel[lang]}</span>
          <h2>{t.press.heading[lang]}</h2>
          <div className="section-divider" />
          <p>{t.press.subheading[lang]}</p>
        </div>

        <div className={styles.mainGrid}>
          <div className={`dist-col ${styles.col}`}>
            <h3 className={styles.colHeading}>{t.press.distinctions[lang]}</h3>
            <div className={styles.distList}>
              {t.press.dists.map((d, i) => (
                <div key={distIds[i]} id={distIds[i]} className={`dist-item ${styles.distCard}`}>
                  <span className={styles.distStar}>★</span>
                  <div className={styles.distBody}>
                    <p className={styles.distTitle}>{d[lang]}</p>
                    <p className={styles.distOrg}>{t.press.orgs[i][lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`collab-col ${styles.col}`}>
            <h3 className={styles.colHeading}>{t.press.actedWith[lang]}</h3>
            <div className={styles.collabList}>
              {collaborations.map(c => (
                <span key={c} className={`collab-tag ${styles.collabTag}`}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={`stats-row ${styles.statsRow}`}>
          {stats.map(s => (
            <div key={s.label} className={`stat-item ${styles.statItem}`}>
              <span className={styles.statNum}>{s.number}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
