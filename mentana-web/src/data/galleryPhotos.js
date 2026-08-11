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
  'PAQUITO-D-RIVERA.png',
  'VITTORIOGASMAN.png',
  'maria_jose_mentana-70.png',
  'img-12.png',
  'img-0173.png',
  'tito-lusiardo-guillermo-fernandez.png',
  'img-0313.png',
  'img-0783.png',
  'img-9833-2.png',
  'MJM.png',
  'MJM3.png',
]

/** Fotos locales con path directo (en /public) */
const localPhotos = [
  {
    id: 'gal-filarmonica-mendoza',
    src: '/NuevasImagenes/DSC_0837.JPG.jpeg',
    alt: {
      es: 'Filarmónica de Mendoza — María José Mentana',
      en: 'Philharmonic of Mendoza — María José Mentana',
    },
  },
  {
    id: 'gal-wa0183',
    src: '/NuevasImagenes/IMG-20260803-WA0183.jpg.jpeg',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-wa0181',
    src: '/NuevasImagenes/IMG-20260803-WA0181.jpg.jpeg',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-wa0186',
    src: '/NuevasImagenes/IMG-20260803-WA0186.jpg.jpeg',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-wa0179',
    src: '/NuevasImagenes/IMG-20260803-WA0179.jpeg',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-wa0185',
    src: '/NuevasImagenes/IMG-20260803-WA0185.jpg.jpeg',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-wa0184',
    src: '/NuevasImagenes/IMG-20260803-WA0184.jpg.jpeg',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-wa0180',
    src: '/NuevasImagenes/IMG-20260803-WA0180.jpeg',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-wa0168',
    src: '/NuevasImagenes/IMG-20260803-WA0168.jpg.jpeg',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
  {
    id: 'gal-wa0169',
    src: '/NuevasImagenes/IMG-20260803-WA0169.jpg.jpeg',
    alt: { es: 'Fotografía — María José Mentana', en: 'Photo — María José Mentana' },
  },
]

export const photos = [
  ...webMentanaPngFiles.map(makePhoto),
  ...localPhotos,
]
