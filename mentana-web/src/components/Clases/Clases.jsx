import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import styles from './Clases.module.css'
import { useLang, t } from '../../context/LangContext'

gsap.registerPlugin(ScrollTrigger)

// ── EmailJS credentials (reutilizamos el mismo servicio que Contact) ──
const EMAILJS_SERVICE_ID  = 'service_u8tw2g2'
const EMAILJS_TEMPLATE_ID = 'template_clases01'   // <-- creá este template en EmailJS
const EMAILJS_PUBLIC_KEY  = '4AxbLxrmW38UjVKHN'

const WHATSAPP_NUMBER = '5491100000000'  // <-- reemplazá con el número real

// Íconos inline SVG
function IconWind() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  )
}

function IconHeart() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function IconMusic() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function IconMic() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="8" y1="22" x2="16" y2="22"/>
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function IconUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Clases() {
  const sectionRef  = useRef(null)
  const formRef     = useRef(null)
  const [form, setForm]     = useState({ nombre: '', email: '', turno: '', mensaje: '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const { lang } = useLang()
  const c = t.clases
  const genreIcons = [<IconWind key="wind" />, <IconHeart key="heart" />, <IconMusic key="music" />]

  // ── GSAP animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.clases-header', {
        opacity: 0, y: 50, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: '.clases-header', start: 'top 85%', toggleActions: 'play none none none' },
      })

      // Genre cards
      gsap.from('.genre-card-wrapper', {
        opacity: 0, y: 60, scale: 0.95, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.genres-grid', start: 'top 82%', toggleActions: 'play none none none' },
      })

      // Schedule block
      gsap.from('.schedule-block', {
        opacity: 0, x: -40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.schedule-block', start: 'top 85%', toggleActions: 'play none none none' },
      })
      gsap.from('.schedule-badge', {
        opacity: 0, x: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.schedule-block', start: 'top 85%', toggleActions: 'play none none none' },
      })

      // CTA / form area
      gsap.from('.cta-block', {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-block', start: 'top 88%', toggleActions: 'play none none none' },
      })

      // Decorative lines
      gsap.fromTo('.clases-rule',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.6, ease: 'expo.inOut',
          scrollTrigger: { trigger: '.clases-rule', start: 'top 90%', toggleActions: 'play none none none' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // ── Handlers ──
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleFocus = (e) => {
    const label = e.target.parentElement.querySelector(`.${styles.fieldLabel}`)
    if (label) gsap.to(label, { y: -22, scale: 0.8, color: 'var(--accent-light)', duration: 0.35, ease: 'power3.out' })
  }

  const handleBlur = (e) => {
    if (!e.target.value) {
      const label = e.target.parentElement.querySelector(`.${styles.fieldLabel}`)
      if (label) gsap.to(label, { y: 0, scale: 1, color: 'rgba(245,243,239,0.35)', duration: 0.35, ease: 'power3.out' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus('done')
        gsap.fromTo('.clases-success', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' })
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
        setStatus('error')
      })
  }

  const whatsappMsg = encodeURIComponent(
    lang === 'es'
      ? '¡Hola! Me gustaría inscribirme a las clases de canto con María José Mentana.'
      : 'Hello! I would like to enroll in singing classes with María José Mentana.'
  )
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`

  return (
    <section className={styles.section} id="clases" ref={sectionRef}>
      {/* ── Fondo decorativo ── */}
      <div className={styles.bgPattern} aria-hidden="true" />

      <div className="container">

        {/* ── HEADER ── */}
        <div className={`clases-header ${styles.header}`}>
          <span className="section-label">{c.sectionLabel[lang]}</span>
          <h2 className={styles.heading}
            dangerouslySetInnerHTML={{ __html: c.headingTitle[lang] }}
          />
          <div className={`clases-rule ${styles.rule}`} />
          <p className={styles.headerSub}>{c.headerSub[lang]}</p>
        </div>

        {/* ── TARJETAS DE GÉNERO ── */}
        <div className={`genres-grid ${styles.genresGrid}`}>
          {c.genres.map((genre, i) => (
            <div key={i} className="genre-card-wrapper">
              <article className={styles.genreCard} id={`genre-card-${i}`}>
                <div className={styles.genreIcon}>{genreIcons[i]}</div>
                <h3 className={styles.genreTitle}>{genre.title[lang]}</h3>
                <p className={styles.genreDesc}>{genre.desc[lang]}</p>
                <div className={styles.genreAccent} aria-hidden="true" />
              </article>
            </div>
          ))}
        </div>

        <hr className={`clases-rule ${styles.fullRule}`} />

        {/* ── HORARIOS ── */}
        <div className={styles.scheduleWrapper}>
          <div className={`schedule-block ${styles.scheduleInfo}`}>
            <span className="section-label">{c.scheduleLabel[lang]}</span>
            <h3 className={styles.scheduleTitle}
              dangerouslySetInnerHTML={{ __html: c.scheduleTitle[lang] }}
            />
            <p className={styles.scheduleSub}>{c.scheduleSub[lang]}</p>

            <ul className={styles.shiftList}>
              {c.shifts.map((shift, i) => (
                <li key={i} className={`${styles.shiftItem} ${shift.new ? styles.shiftNew : ''}`}>
                  <span className={styles.shiftDot} aria-hidden="true" />
                  <div>
                    <span className={styles.shiftTime}>
                      <IconClock /> {shift.time}
                    </span>
                    <span>
                      {shift.new ? (
                        <em className={styles.newBadge}>{c.newShift[lang]}</em>
                      ) : null}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}><IconUsers /> {c.studentsLine[lang]}</span>
              <span className={styles.metaItem}><IconMapPin /> {c.location[lang]}</span>
            </div>
          </div>

          {/* Badge cupos limitados */}
          <div className={`schedule-badge ${styles.scheduleBadge}`}>
            <div className={styles.badgeInner}>
              <div className={styles.badgeIcon}><IconMic /></div>
              <p className={styles.badgeTitle}>{c.badge.title[lang]}</p>
              <p className={styles.badgeText}>{c.badge.text[lang]}</p>
              <div className={styles.badgePill}>{c.badge.pill[lang]}</div>
            </div>
          </div>
        </div>

        <hr className={`clases-rule ${styles.fullRule}`} />

        {/* ── CTA + FORM ── */}
        <div className={`cta-block ${styles.ctaWrapper}`}>
          <div className={styles.ctaInfo}>
            <span className="section-label">{c.ctaLabel[lang]}</span>
            <h3 className={styles.ctaTitle}
              dangerouslySetInnerHTML={{ __html: c.ctaTitle[lang] }}
            />
            <p className={styles.ctaSub}>{c.ctaSub[lang]}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-clases-whatsapp"
              className={styles.whatsappBtn}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              {c.ctaWhatsApp[lang]}
            </a>
            <a
              href="mailto:info@mariajosementana.com"
              id="btn-clases-email"
              className={styles.emailLink}
            >
              info@mariajosementana.com ↗
            </a>
          </div>

          {/* ── Formulario de inscripción ── */}
          <div className={styles.formWrapper}>
            {status === 'done' ? (
              <div className={`clases-success ${styles.successMsg}`}>
                <div className={styles.successIcon}>✓</div>
                <h4>{c.form.successTitle[lang]}</h4>
                <p>{c.form.successSub[lang]}</p>
                <button
                  className={styles.resetBtn}
                  onClick={() => { setStatus('idle'); setForm({ nombre: '', email: '', turno: '', mensaje: '' }) }}
                >
                  {c.form.again[lang]}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className={styles.form} id="form-clases" noValidate>
                <p className={styles.formTitle}>{c.form.title[lang]}</p>

                {status === 'error' && (
                  <p className={styles.errorMsg}>{c.form.error[lang]}</p>
                )}

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label htmlFor="clases-nombre" className={styles.fieldLabel}>{c.form.nombre[lang]}</label>
                    <input
                      id="clases-nombre" name="nombre" type="text"
                      value={form.nombre} onChange={handleChange}
                      onFocus={handleFocus} onBlur={handleBlur}
                      className={styles.input} required autoComplete="name"
                    />
                    <div className={styles.focusLine} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="clases-email" className={styles.fieldLabel}>Email</label>
                    <input
                      id="clases-email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      onFocus={handleFocus} onBlur={handleBlur}
                      className={styles.input} required autoComplete="email"
                    />
                    <div className={styles.focusLine} />
                  </div>
                </div>

                {/* Selector de turno */}
                <div className={styles.field}>
                  <label htmlFor="clases-turno" className={styles.fieldLabel}>{c.form.turno[lang]}</label>
                  <select
                    id="clases-turno" name="turno"
                    value={form.turno} onChange={handleChange}
                    className={`${styles.input} ${styles.select}`} required
                  >
                    <option value="" disabled>{c.form.turnoPlaceholder[lang]}</option>
                    <option value="turno-manana">{c.form.turnoManana[lang]}</option>
                    <option value="turno-tarde">{c.form.turnoTarde[lang]}</option>
                    <option value="ambos">{c.form.turnoAmbos[lang]}</option>
                  </select>
                  <div className={styles.focusLine} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="clases-mensaje" className={styles.fieldLabel}>{c.form.mensaje[lang]}</label>
                  <textarea
                    id="clases-mensaje" name="mensaje"
                    value={form.mensaje} onChange={handleChange}
                    onFocus={handleFocus} onBlur={handleBlur}
                    className={`${styles.input} ${styles.textarea}`}
                    rows={3}
                  />
                  <div className={styles.focusLine} />
                </div>

                <button
                  type="submit"
                  id="btn-clases-submit"
                  className={styles.submitBtn}
                  disabled={status === 'sending'}
                >
                  <span>{status === 'sending' ? c.form.sending[lang] : c.form.send[lang]}</span>
                  <span className={styles.submitArrow}>→</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
