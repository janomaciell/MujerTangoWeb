const ASSETS_BASE = (import.meta.env.VITE_ASSETS_BASE_URL || '').replace(/\/$/, '')

export function assetUrl(publicPath) {
  const path = publicPath.startsWith('/') ? publicPath.slice(1) : publicPath
  const encoded = path.split('/').filter(Boolean).map(encodeURIComponent).join('/')
  if (!ASSETS_BASE) return `/${encoded}`
  return `${ASSETS_BASE}/${encoded}`
}

export const FORMATOS_X_FOLDER = 'FORMATOS X'
export const PNG_FOLDER = 'retratos'
export const WEB_MENTANA_FOLDER = 'web-mentana'

export function formatosXPath(file) {
  return assetUrl(`images/${FORMATOS_X_FOLDER}/${file}`)
}

export function pngPath(file) {
  return assetUrl(`images/${PNG_FOLDER}/${file}`)
}

export function webMentanaPath(file) {
  return assetUrl(`${WEB_MENTANA_FOLDER}/${file}`)
}

export function coverPath(file) {
  return assetUrl(`portadas/${file}`)
}

export const SITE_FAVICON = '/Logo.png'

export const siteImages = {
  hero:          assetUrl('Fondo GALERIA.webp'),
  aboutQuote:    assetUrl('biografia2.webp'),
  biographyHero: webMentanaPath('MARIA-Biografia.webp'),
  logo:          '/Logo.png',
  logoHero:      '/logo-maria.png',
  biographyBg:   assetUrl('fondo-contacto.webp'),
  galleryBg:     '/maria-home.webp',
  discographyBg: assetUrl('FondoDiscografia.webp'),
  classesBg:     assetUrl('FondoClases.webp'),
  contactBg:     assetUrl('maria-contacto-pc.jpeg'),
  contactBgMobile: assetUrl('maria-contactomobile.jpeg'),
  videoHome:     assetUrl('videohome.mp4'),
  videoHomeMobile: assetUrl('maria-video-mobile.mp4'),
}

export const usesRemoteAssets = Boolean(ASSETS_BASE)