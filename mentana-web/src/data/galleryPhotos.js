import { formatosXPath } from './images.js'

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
    id: `fmt-${id}`,
    src: formatosXPath(file),
    alt: {
      es: `Fotografía ${num} — María José Mentana`,
      en: `Photo ${num} — María José Mentana`,
    },
  }
}

/** Galería: todas las fotos de FORMATOS X, ya convertidas a .png */
const formatosXPngFiles = [
  'img01.png', 'img02.png', 'img03.png', 'img04.png', 'img05.png',
  'img06.png', 'img07.png', 'img08.png', 'img11.png', 'img12.png',
  'img13.png', 'img14.png', 'img15.png', 'img16.png', 'img17.png',
  'img18.png', 'img18-webp.png', 'img19.png', 'img20.png', 'img21.png',
  'img22.png', 'img23.png', 'img24.png', 'img25.png', 'img26.png',
  'img27.png', 'img28.png', 'img28-jpg.png', 'img29.png', 'img30.png',
  'img31.png', 'img33.png', 'imig32.png',
]

export const photos = formatosXPngFiles.map(makePhoto)
