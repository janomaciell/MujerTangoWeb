/**
 * Sube public/images y public/portadas a Cloudflare R2 (API compatible con S3).
 *
 * Uso:
 *   cp .env.example .env   # completar credenciales
 *   npm run r2:upload:dry  # simular
 *   npm run r2:upload      # subir
 */
import 'dotenv/config'
import { createReadStream, readdirSync, statSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const { join, relative, extname } = path
const ROOT = join(__dirname, '..')
const PUBLIC = join(ROOT, 'public')
const UPLOAD_DIRS = ['images', 'portadas', 'web-mentana']

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
}

const dryRun = process.argv.includes('--dry-run')
const pngOnly = !process.argv.includes('--all-formats')

function requireEnv(name) {
  const v = process.env[name]
  if (!v) throw new Error(`Falta la variable de entorno ${name} en .env`)
  return v
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, acc)
    else acc.push(full)
  }
  return acc
}

function collectFiles() {
  const files = []
  
  // Scan files directly in the root of public
  try {
    for (const name of readdirSync(PUBLIC)) {
      const full = join(PUBLIC, name)
      if (!statSync(full).isDirectory()) {
        files.push(full)
      }
    }
  } catch (err) {
    console.warn('Error al leer el directorio public:', err.message)
  }

  // Scan subdirectories
  for (const sub of UPLOAD_DIRS) {
    const base = join(PUBLIC, sub)
    try {
      walk(base, files)
    } catch {
      console.warn(`No existe ${base}, se omite.`)
    }
  }
  return files.filter(f => {
    const ext = extname(f).toLowerCase()
    if (!MIME[ext]) return false
    if (pngOnly && ext !== '.png') return false
    return true
  })
}

async function main() {
  const files = collectFiles()
  if (files.length === 0) {
    console.log('No hay archivos para subir.')
    return
  }

  let client = null
  let bucket = process.env.R2_BUCKET_NAME || '(sin configurar)'

  if (!dryRun) {
    const accountId = requireEnv('R2_ACCOUNT_ID')
    const accessKeyId = requireEnv('R2_ACCESS_KEY_ID')
    const secretAccessKey = requireEnv('R2_SECRET_ACCESS_KEY')
    bucket = requireEnv('R2_BUCKET_NAME')
    const endpoint =
      process.env.R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`
    client = new S3Client({
      region: 'auto',
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
    })
  }

  const manifest = []
  let ok = 0
  let fail = 0

  console.log(
    dryRun ? '--- MODO SIMULACIÓN (dry-run) ---' : '--- Subiendo a R2 ---',
  )
  console.log(`Bucket: ${bucket}`)
  console.log(`Archivos: ${files.length} (${pngOnly ? 'solo .png' : 'todos los formatos de imagen'})\n`)

  for (const filePath of files) {
    const key = relative(PUBLIC, filePath).replace(/\\/g, '/')
    const ext = extname(filePath).toLowerCase()
    const contentType = MIME[ext]

    if (dryRun) {
      console.log(`[dry] ${key}`)
      manifest.push({ key, local: filePath })
      ok++
      continue
    }

    try {
      await client?.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: createReadStream(filePath),
          ContentType: contentType,
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      )
      console.log(`✓ ${key}`)
      manifest.push({ key, contentType })
      ok++
    } catch (err) {
      console.error(`✗ ${key}:`, err.message)
      fail++
    }
  }

  const manifestPath = join(ROOT, 'scripts', 'r2-manifest.json')
  writeFileSync(manifestPath, JSON.stringify({ uploadedAt: new Date().toISOString(), bucket, files: manifest }, null, 2))

  console.log(`\nListo: ${ok} archivos${fail ? `, ${fail} errores` : ''}.`)
  console.log(`Manifiesto: scripts/r2-manifest.json`)

  if (!process.env.VITE_ASSETS_BASE_URL) {
    console.log(
      '\n⚠ Definí VITE_ASSETS_BASE_URL en .env (URL pública del bucket) y volvé a hacer npm run build.',
    )
  }

  if (fail > 0) process.exit(1)
}

main().catch(err => {
  console.error(err.message || err)
  process.exit(1)
})
