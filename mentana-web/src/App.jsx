import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LangProvider } from './context/LangContext'

// Layout
import Header      from './components/Header/Header'
import Footer      from './components/Footer/Footer'
import Cursor      from './components/Cursor/Cursor'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

// Home sections
import Hero   from './components/Hero/Hero'
import About  from './components/About/About'
import Videos from './components/Videos/Videos'
import Music   from './components/Music/Music'
import Clases  from './components/Clases/Clases'

// Pages
import DiscographyPage from './components/DiscographyPage/DiscographyPage'
import GalleryPage     from './components/Gallery/Gallery'
import BiographyPage   from './components/BiographyPage/BiographyPage'
import ContactPage     from './components/ContactPage/ContactPage'

import './styles/globals.css'

gsap.registerPlugin(ScrollTrigger)

function Home() {
  return (
    <main>
      <Hero />

    </main>
  )
}

export default function App() {
  useEffect(() => {
    ScrollTrigger.defaults({
      markers: false,
      limitCallbacks: true,
    })
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
    }
    return () => { ScrollTrigger.killAll() }
  }, [])

  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Cursor />
        <Header />
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/discografia" element={<main><DiscographyPage /></main>} />
          <Route path="/galeria"     element={<main><GalleryPage /></main>} />
          <Route path="/biografia"   element={<main><BiographyPage /></main>} />
          <Route path="/contacto"    element={<main><ContactPage /></main>} />
          <Route path="/clases"      element={<main><Clases /></main>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LangProvider>
  )
}
