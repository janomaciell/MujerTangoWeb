/**
 * URLs de imágenes: local (/public) o CDN R2 si VITE_ASSETS_BASE_URL está definida.
 * Ej. VITE_ASSETS_BASE_URL=https://pub-xxxx.r2.dev
 */
const ASSETS_BASE = (import.meta.env.VITE_ASSETS_BASE_URL || '').replace(/\/$/, '')

export function assetUrl(publicPath) {
  const path = publicPath.startsWith('/') ? publicPath.slice(1) : publicPath
  const encoded = path.split('/').filter(Boolean).map(encodeURIComponent).join('/')
  if (!ASSETS_BASE) return `/${encoded}`
  return `${ASSETS_BASE}/${encoded}`
}

export const FORMATOS_X_FOLDER = 'FORMATOS X'
export const PNG_FOLDER = 'FORMATO PNG'

export function formatosXPath(file) {
  return assetUrl(`images/${FORMATOS_X_FOLDER}/${file}`)
}

export function pngPath(file) {
  return assetUrl(`images/${PNG_FOLDER}/${file}`)
}

export function coverPath(file) {
  return assetUrl(`portadas/${file}`)
}

export const siteImages = {
  hero: pngPath('img10.png'),
  aboutQuote: formatosXPath('img21.png'),
  biographyHero: formatosXPath('img01.png'),
  logo: formatosXPath('img02.png'),
}

/** true cuando el build usa el CDN (R2) en lugar de /public */
export const usesRemoteAssets = Boolean(ASSETS_BASE)
