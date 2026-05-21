import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LangProvider } from './context/LangContext'

// Layout
import Header   from './components/Header/Header'
import Footer   from './components/Footer/Footer'
import Cursor   from './components/Cursor/Cursor'

// Home sections
import Hero        from './components/Hero/Hero'
import About       from './components/About/About'
import Biography   from './components/Biography/Biography'
import Discography from './components/Discography/Discography'
import Press       from './components/Press/Press'
import Videos      from './components/Videos/Videos'
import Music       from './components/Music/Music'

// Pages
import GalleryPage   from './components/Gallery/Gallery'
import BiographyPage from './components/BiographyPage/BiographyPage'
import ContactPage   from './components/ContactPage/ContactPage'

import './styles/globals.css'

gsap.registerPlugin(ScrollTrigger)

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Biography />
      <Discography />
      <Press />
      <Videos />
      <Music />
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
        <Cursor />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<main><GalleryPage /></main>} />
          <Route path="/biografia" element={<main><BiographyPage /></main>} />
          <Route path="/contacto" element={<main><ContactPage /></main>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LangProvider>
  )
}
