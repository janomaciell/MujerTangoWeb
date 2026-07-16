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
  'img-ferrer.png',
  'img-0173.png',
  'stampone.png',
  'Stampone-Federico-Rivas-Buono.png',
  'tito-lusiardo-guillermo-fernandez.png',
  'img-0313.png',
  'img-0783.png',
  'img-9833-2.png',
  'MJM.png',
  'MJM3.png',
  'dsc-0842.png',
]

export const photos = webMentanaPngFiles.map(makePhoto)
