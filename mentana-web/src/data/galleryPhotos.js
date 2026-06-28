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
  'MJM.png', 'MJM3.png',
  'MIRTA-LEGRAND-COLEGAS.png', 'MORES.png',
  'PAQUITO-D-RIVERA.png', 'Stampone-Federico-Rivas-Buono.png',
  'VITTORIOGASMAN.png', 'maria_jose_mentana-70.png',
  'talleres-fotos.png', 'talleresfotos.png'
]

export const photos = webMentanaPngFiles.map(makePhoto)
