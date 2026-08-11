import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Hero.module.css'
import { siteImages } from '../../data/images.js'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const [isVideoMobile, setIsVideoMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsVideoMobile(mediaQuery.matches)

    const handler = (e) => setIsVideoMobile(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 })

      tl.fromTo('.hero-portrait',
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      )
      tl.fromTo(
        '.hero-logo',
        { yPercent: 30, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        '-=0.75'
      )

      gsap.to('.hero-inner', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '55% top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="hero" ref={sectionRef}>

      {/* Video full-bleed */}
      <div className={`hero-portrait ${styles.portrait}`}>
        <video
          key={isVideoMobile ? 'mobile' : 'desktop'}
          src={isVideoMobile ? siteImages.videoHomeMobile : siteImages.videoHome}
          autoPlay
          loop
          muted
          playsInline
          className={styles.portraitImg}
        />
        <div className={styles.portraitFade} aria-hidden="true" />
      </div>

      {/* Contenido superpuesto */}
      <div className={`hero-inner ${styles.inner}`}>
        <div className={styles.leftPanel}>
          <div className={styles.titleBlock}>
            {/* Logo mjm — logo clásico con fondo transparente */}
            <div className={styles.overflow}>
              <img src={siteImages.logoHero} alt="María José Mentana" className={`hero-logo ${styles.heroLogo}`} />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}