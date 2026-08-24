import { webMentanaPath } from './images.js'

function photoNum(file) {
  const base = file.replace(/\.[^.]+$/, '')
  if (base.includes('-webp')) return base.replace('-webp', '') + ' (variante)'
  if (base.includes('-jpg')) return base.replace('-jpg', '') + ' (variante)'
  const match = base.match(/(\d+)/)
  return match ? match[1] : base
}

function makePhoto(file) {
  const num = photoNum(file)
  const id = file.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  return {
    id: `gal-${id}`,
    src: webMentanaPath(file),
    alt: {
      es: `Fotografía ${num} — María José Mentana`,
      en: `Photo ${num} — María José Mentana`,
    },
  }
}

/** Galería: todas las fotos de web-mentana, convertidas a .png */
const webMentanaPngFiles = [
  'PAQUITO-D-RIVERA.webp',
  'maria_jose_mentana-70.webp',
  'VITTORIOGASMAN.webp',
  'img-0173.webp',
  'MJM.webp',
]

/** Fotos locales con path directo (en /public) */
const localPhotos = [
  {
    id: 'gal-caantando9',
    src: '/NuevasImagenes/caantando9.webp',
    alt: { es: 'María José Mentana cantando a los 9 años', en: 'María José Mentana singing at age 9' },
  },
  {
    id: 'gal-filarmonica-mendoza',
    src: '/NuevasImagenes/DSC_0837.JPG.webp',
    alt: {
      es: 'Filarmónica de Mendoza — María José Mentana',
      en: 'Philharmonic of Mendoza — María José Mentana',
    },
  },
  {
    id: 'gal-imagenn-maria',
    src: '/NuevasImagenes/imagenn-maria.webp',
    alt: { es: 'María José Mentana', en: 'María José Mentana' },
  },
  {
    id: 'gal-jairo',
    src: '/NuevasImagenes/JAIRO.webp',
    alt: { es: 'Jairo con María José Mentana', en: 'Jairo with María José Mentana' },
  },
  {
    id: 'gal-ana-conde',
    src: '/NuevasImagenes/MARIA JOSE Horizontal ANA CONDE.jpg.webp',
    alt: { es: 'María José Mentana — Fotografía por Ana Conde', en: 'María José Mentana — Photo by Ana Conde' },
  },
  {
    id: 'gal-wa0169',
    src: '/NuevasImagenes/IMG-20260803-WA0169.jpg.webp',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-wa0184',
    src: '/NuevasImagenes/IMG-20260803-WA0184.jpg.webp',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-24',
    src: '/NuevasImagenes/24.webp',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-wa0179',
    src: '/NuevasImagenes/IMG-20260803-WA0179.webp',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-imagen-8anos',
    src: '/NuevasImagenes/imagen-8anos.webp',
    alt: { es: 'María José Mentana a los 8 años', en: 'María José Mentana at age 8' },
  },
  {
    id: 'gal-pierre-richard-piro',
    src: '/NuevasImagenes/PIERRE RICHARD -PIRO.jpg.webp',
    alt: { es: 'Pierre Richard y Osvaldo Piro con María José Mentana', en: 'Pierre Richard and Osvaldo Piro with María José Mentana' },
  },
]

const photoWa20250514 = {
  id: 'gal-wa-2025-05-14',
  src: '/NuevasImagenes/WhatsApp Image 2025-05-14 at 16.10.15.webp',
  alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
}

const photoImagenDiario = {
  id: 'gal-imagen-diario',
  src: '/NuevasImagenes/imagen-diario.webp',
  alt: { es: 'Nota de prensa — María José Mentana', en: 'Press note — María José Mentana' },
}

// Nuevas imágenes para posiciones 1 y 6
const photoGaleria1 = {
  id: 'gal-galeria-1',
  src: '/NuevasImagenes/galeria 1.webp',
  alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
}

const photoGaleria6 = {
  id: 'gal-galeria-6',
  src: '/NuevasImagenes/galeria 6.webp',
  alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
}

const webPhotos = webMentanaPngFiles.map(makePhoto)

export const photos = [
  photoGaleria1,       // posición 1 → galeria 1.jpeg
  photoWa20250514,
  webPhotos[1],
  webPhotos[2],
  photoImagenDiario,
  photoGaleria6,       // posición 6 → galeria 6.jpeg
  ...webPhotos.slice(4),
  ...localPhotos,
]
