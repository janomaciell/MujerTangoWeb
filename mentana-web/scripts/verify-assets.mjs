/**
 * Recorre src/ e index.html buscando rutas de assets ("/algo/archivo.ext")
 * y verifica que cada una exista de verdad dentro de public/.
 * Sirve para detectar imagenes rotas ANTES de subir al hosting.
 *
 * Uso:  node scripts/verify-assets.mjs
 */
import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const PUBLIC_DIR = path.join(ROOT, 'public')

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full, acc)
    else acc.push(full)
  }
  return acc
}

const codeFiles = walk(path.join(ROOT, 'src')).concat([path.join(ROOT, 'index.html')])
  .filter((f) => /\.(jsx?|tsx?|css|html)$/.test(f))

// Extensiones de assets que nos interesan
const ASSET_RE = /['"`/]([^'"`\n]*?\.(png|jpe?g|webp|gif|svg|ico|mp4|mov|webm))(?=['"`])/gi

const missing = []
const ok = new Set()

for (const f of codeFiles) {
  const text = fs.readFileSync(f, 'utf8')
  for (const m of text.matchAll(ASSET_RE)) {
    let ref = m[1]
    if (/^https?:/i.test(ref) || ref.startsWith('data:')) continue

    // Las rutas armadas con template literals llegan como "${BASE}/foto.webp".
    // Sacamos el ${...} y buscamos el archivo en todas las carpetas posibles.
    const isTemplate = ref.includes('${')
    if (isTemplate) ref = ref.replace(/^\$\{[^}]*\}\/?/, '')
    if (ref.includes('${')) continue   // interpolacion en el medio: no se puede resolver

    const FOLDERS = ['', 'web-mentana/', 'artistas-hover/', 'NuevasImagenes/', 'portadas/']
    const candidates = !isTemplate && ref.includes('/')
      ? [ref]
      : FOLDERS.map((d) => d + ref)

    const found = candidates.some((c) => fs.existsSync(path.join(PUBLIC_DIR, c.replace(/^\//, ''))))
    if (found) ok.add(ref)
    else missing.push({ ref, file: path.relative(ROOT, f) })
  }
}

console.log(`Referencias de assets encontradas y OK : ${ok.size}`)
if (missing.length === 0) {
  console.log('\n✅ No hay referencias rotas. Todo lo que el codigo pide existe en public/.')
} else {
  console.log(`\n❌ ${missing.length} referencias ROTAS:\n`)
  for (const m of missing) console.log(`   ${m.ref}\n      <- ${m.file}`)
  process.exitCode = 1
}

// Archivos en public/ que nadie referencia (peso muerto)
const publicFiles = walk(PUBLIC_DIR).map((f) => path.relative(PUBLIC_DIR, f).split(path.sep).join('/'))
const allText = codeFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n')
const unused = publicFiles.filter((rel) => {
  const base = path.basename(rel)
  return !allText.includes(base) && !['.htaccess', '_redirects'].includes(base)
})
if (unused.length) {
  console.log(`\nℹ  ${unused.length} archivos en public/ que el codigo no usa:`)
  for (const u of unused) console.log(`   ${u}`)
}
