import { useEffect } from 'react'
import Contact from '../Contact/Contact'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.page}>
      <Contact asPage />
    </div>
  )
}
