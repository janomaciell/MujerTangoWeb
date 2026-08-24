/**
 * Optimiza los assets de /public para poder servirlos desde el hosting propio.
 *
 *  - Convierte imagenes a WebP (calidad 82, lado maximo 2000px)
 *  - Convierte los videos .MOV (HEVC) a .mp4 (H.264) con ffmpeg
 *  - Reescribe automaticamente todas las referencias en src/ e index.html
 *  - Guarda los originales intactos en  assets-originales/
 *
 * Uso:  node scripts/optimize-assets.mjs [--dry]
 */
import sharp from 'sharp'
import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const DRY = process.argv.includes('--dry')

const ROOT       = process.cwd()
const PUBLIC_DIR = path.join(ROOT, 'public')
const BACKUP_DIR = path.join(ROOT, 'assets-originales')
const SRC_DIRS   = [path.join(ROOT, 'src')]
const EXTRA_FILES = [path.join(ROOT, 'index.html')]

// Archivos que NO se tocan (favicons y logos que deben seguir siendo png/ico)
const SKIP = new Set(['Logo.png', 'logo-maria.png', 'logo-maria.ico', '.htaccess', '_redirects'])

const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.JPG', '.JPEG', '.PNG', '.webp'])
const VID_EXT = new Set(['.mov', '.MOV', '.mp4'])

const MAX_SIDE = 2000
const QUALITY  = 82

/** Lista recursiva de archivos dentro de public/ */
function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else acc.push(full)
  }
  return acc
}

/** Copia el original a assets-originales/ conservando la estructura */
function backup(file) {
  const rel  = path.relative(PUBLIC_DIR, file)
  const dest = path.join(BACKUP_DIR, rel)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  if (!fs.existsSync(dest)) fs.copyFileSync(file, dest)
}

const mb = (n) => (n / 1024 / 1024).toFixed(2) + ' MB'

// ---------------------------------------------------------------- imagenes
const renames = []          // { from: '9.png', to: '9.webp' }
let beforeTotal = 0, afterTotal = 0

const files = walk(PUBLIC_DIR)

for (const file of files) {
  const name = path.basename(file)
  const ext  = path.extname(file)
  if (SKIP.has(name)) continue
  if (!IMG_EXT.has(ext)) continue

  const outFile = file.slice(0, -ext.length) + '.webp'
  const sizeIn  = fs.statSync(file).size
  beforeTotal += sizeIn

  if (DRY) { console.log(`  [dry] ${name} -> ${path.basename(outFile)}`); continue }

  try {
    const meta = await sharp(file).metadata()
    const needsResize = Math.max(meta.width || 0, meta.height || 0) > MAX_SIDE

    await sharp(file)
      .rotate()                                   // respeta la orientacion EXIF
      .resize(needsResize ? { width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true } : undefined)
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outFile + '.tmp')

    fs.renameSync(outFile + '.tmp', outFile)
    const sizeOut = fs.statSync(outFile).size
    afterTotal += sizeOut

    backup(file)
    if (path.resolve(outFile) !== path.resolve(file)) fs.unlinkSync(file)

    renames.push({ from: name, to: path.basename(outFile) })
    console.log(`  ${mb(sizeIn).padStart(9)} -> ${mb(sizeOut).padStart(9)}   ${name}`)
  } catch (err) {
    console.error(`  !! ERROR con ${name}: ${err.message}`)
  }
}

// ---------------------------------------------------------------- videos
for (const file of files) {
  const name = path.basename(file)
  const ext  = path.extname(file)
  if (!VID_EXT.has(ext) || ext.toLowerCase() === '.mp4') continue

  const outFile = file.slice(0, -ext.length) + '.mp4'
  const sizeIn  = fs.statSync(file).size
  beforeTotal += sizeIn

  if (DRY) { console.log(`  [dry] ${name} -> ${path.basename(outFile)}`); continue }

  try {
    // H.264 alto perfil = reproducible en todos los navegadores.
    // Sin audio: el <video> del hero va en muted, el audio solo sumaba peso.
    execFileSync('ffmpeg', [
      '-y', '-i', file,
      '-an',
      '-vf', "scale='min(1080,iw)':-2",
      '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.0',
      '-crf', '28', '-preset', 'slow', '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      outFile,
    ], { stdio: ['ignore', 'ignore', 'ignore'] })

    const sizeOut = fs.statSync(outFile).size
    afterTotal += sizeOut

    backup(file)
    fs.unlinkSync(file)

    renames.push({ from: name, to: path.basename(outFile) })
    console.log(`  ${mb(sizeIn).padStart(9)} -> ${mb(sizeOut).padStart(9)}   ${name}`)
  } catch (err) {
    console.error(`  !! ERROR con ${name}: ${err.message}`)
  }
}

if (DRY) { console.log('\n(dry run: no se modifico nada)'); process.exit(0) }

// ------------------------------------------------- reescribir referencias
const codeFiles = []
for (const d of SRC_DIRS) walk(d, codeFiles)
codeFiles.push(...EXTRA_FILES)

/**
 * Reemplaza el nombre de archivo solo cuando arranca justo despues de "/" o de
 * una comilla. Asi "1.png" nunca pisa el final de "11.png".
 */
function replaceFilename(text, from, to) {
  const boundary = new Set(['/', "'", '"', '`'])
  let out = ''
  let i = 0
  for (;;) {
    const idx = text.indexOf(from, i)
    if (idx === -1) { out += text.slice(i); return out }
    const prev = idx > 0 ? text[idx - 1] : ''
    out += text.slice(i, idx) + (boundary.has(prev) ? to : from)
    i = idx + from.length
  }
}

let touched = 0

for (const cf of codeFiles) {
  if (!/\.(jsx?|tsx?|css|html)$/.test(cf)) continue
  let text = fs.readFileSync(cf, 'utf8')
  const before = text
  for (const { from, to } of renames) {
    text = replaceFilename(text, from, to)
  }
  if (text !== before) { fs.writeFileSync(cf, text); touched++; console.log(`  actualizado: ${path.relative(ROOT, cf)}`) }
}

console.log(`\nRESUMEN`)
console.log(`  archivos convertidos : ${renames.length}`)
console.log(`  archivos de codigo   : ${touched}`)
console.log(`  antes  : ${mb(beforeTotal)}`)
console.log(`  despues: ${mb(afterTotal)}`)
console.log(`  originales guardados en: assets-originales/`)
