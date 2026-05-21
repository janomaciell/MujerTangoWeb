import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Contact.module.css'
import { useLang, t } from '../../context/LangContext'

gsap.registerPlugin(ScrollTrigger)

export default function Contact({ asPage = false }) {
  const sectionRef = useRef(null)
  const formRef    = useRef(null)
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const { lang }            = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (asPage) {
        gsap.from('.contact-header', {
          opacity: 0, y: 40, duration: 1.2, ease: 'power4.out', delay: 0.15,
        })
        gsap.from('.contact-col', {
          opacity: 0, y: 30, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.35,
        })
        gsap.fromTo('.contact-line',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.5, ease: 'expo.inOut', delay: 0.3 }
        )
      } else {
        gsap.from('.contact-header', {
          opacity: 0, y: 40, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: '.contact-header', start: 'top 85%', toggleActions: 'play none none none' }
        })
        gsap.from('.contact-col', {
          opacity: 0, y: 30, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-grid', start: 'top 80%', toggleActions: 'play none none none' }
        })
        gsap.fromTo('.contact-line',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.5, ease: 'expo.inOut',
            scrollTrigger: { trigger: '.contact-line', start: 'top 90%', toggleActions: 'play none none none' } }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [asPage])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleFocus = (e) => {
    const label = e.target.parentElement.querySelector(`.${styles.fieldLabel}`)
    if (label) gsap.to(label, { y: -24, scale: 0.82, color: '#b8953a', duration: 0.4, ease: 'power3.out' })
  }

  const handleBlur = (e) => {
    if (!e.target.value) {
      const label = e.target.parentElement.querySelector(`.${styles.fieldLabel}`)
      if (label) gsap.to(label, { y: 0, scale: 1, color: 'rgba(10,9,6,0.4)', duration: 0.4, ease: 'power3.out' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Replace with EmailJS: npm install @emailjs/browser
    // import emailjs from '@emailjs/browser'
    // emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', formRef.current, 'PUBLIC_KEY')
    setTimeout(() => {
      setStatus('done')
      gsap.fromTo('.success-content', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' })
    }, 1500)
  }

  const ct = t.contact
  const f  = ct.fields

  return (
    <section className={styles.section} id={asPage ? undefined : 'contacto'} ref={sectionRef}>
      <div className="container">
        <div className="contact-header" style={{ textAlign: 'center', marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <span className="section-label">{ct.sectionLabel[lang]}</span>
          <h2>{ct.heading[lang]}</h2>
          <div className="section-divider" style={{ background: 'var(--gold)', opacity: 0.4 }} />
          <p>{ct.sub[lang]}</p>
        </div>

        <div className={`contact-line ${styles.divider}`} />

        <div className={`contact-grid ${styles.grid}`}>
          <div className={`contact-col ${styles.infoCol}`}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>{ct.emailLabel[lang]}</span>
              <a href="mailto:info@mariajosementana.com" className={styles.emailLink} id="link-email">
                info@mariajosementana.com
              </a>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>{ct.location[lang]}</span>
              <p className={styles.infoValue}>San Isidro, Buenos Aires<br />Argentina</p>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>{ct.social[lang]}</span>
              <div className={styles.socials}>
                <a href="https://www.instagram.com/mariajosementana/" target="_blank" rel="noopener noreferrer" id="contact-instagram" className={styles.socialLink}>
                  Instagram <span className={styles.socialArrow}>↗</span>
                </a>
                <a href="https://www.youtube.com/user/mariajosementana" target="_blank" rel="noopener noreferrer" id="contact-youtube" className={styles.socialLink}>
                  YouTube <span className={styles.socialArrow}>↗</span>
                </a>
                <a href="https://mariajosementana.blogspot.com/" target="_blank" rel="noopener noreferrer" id="contact-blog" className={styles.socialLink}>
                  {ct.blog[lang]} <span className={styles.socialArrow}>↗</span>
                </a>
              </div>
            </div>
            <blockquote className={styles.sideQuote}>{ct.quote[lang]}</blockquote>
          </div>

          <div className={`contact-col ${styles.formCol}`}>
            {status === 'done' ? (
              <div className={`${styles.successMsg} success-content`}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>{ct.success.title[lang]}</h3>
                <p className={styles.successSub}>{ct.success.sub[lang]}</p>
                <button className={styles.resetBtn} onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}>
                  {ct.success.again[lang]}
                </button>
              </div>
            ) : (
              <form ref={formRef} className={styles.form} onSubmit={handleSubmit} id="form-contact" noValidate>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label htmlFor="contact-name" className={styles.fieldLabel}>{f.name[lang]}</label>
                    <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={styles.input} required autoComplete="name" />
                    <div className={styles.focusLine} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.fieldLabel}>Email</label>
                    <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={styles.input} required autoComplete="email" />
                    <div className={styles.focusLine} />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-subject" className={styles.fieldLabel}>{f.subject[lang]}</label>
                  <input id="contact-subject" name="subject" type="text" value={form.subject} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={styles.input} required />
                  <div className={styles.focusLine} />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-message" className={styles.fieldLabel}>{f.message[lang]}</label>
                  <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={`${styles.input} ${styles.textarea}`} required rows={1} />
                  <div className={styles.focusLine} />
                </div>
                <button type="submit" id="btn-contact-submit" className={styles.submitBtn} disabled={status === 'sending'}>
                  <span>{status === 'sending' ? f.sending[lang] : f.send[lang]}</span>
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
