/**
 * sync-r2.mjs — Sincroniza public/ con Cloudflare R2
 *
 * 1. Lista todos los objetos en R2
 * 2. Sube los archivos locales que no están en R2 (o que cambiaron)
 * 3. Borra en R2 los objetos que ya no existen localmente
 *
 * Uso:
 *   node scripts/sync-r2.mjs --dry-run   → solo muestra lo que haría
 *   node scripts/sync-r2.mjs             → sincroniza de verdad
 */
import 'dotenv/config'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'
import { createReadStream, readdirSync, statSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT    = path.join(__dirname, '..')
const PUBLIC  = path.join(ROOT, 'public')

const MIME = {
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.mov':  'video/quicktime',
  '.mp4':  'video/mp4',
  '.ico':  'image/x-icon',
}

const dryRun = process.argv.includes('--dry-run')

// ── Helpers ────────────────────────────────────────────────────────────────

function requireEnv(name) {
  const v = process.env[name]
  if (!v) throw new Error(`Falta la variable de entorno: ${name}`)
  return v
}

/** Recorre recursivamente un directorio y devuelve lista de paths absolutos */
function walk(dir, acc = []) {
  let entries
  try { entries = readdirSync(dir) } catch { return acc }
  for (const name of entries) {
    const full = path.join(dir, name)
    try {
      if (statSync(full).isDirectory()) walk(full, acc)
      else acc.push(full)
    } catch { /* skip */ }
  }
  return acc
}

/** Convierte un path absoluto dentro de public/ → key de R2 */
function toKey(absPath) {
  return path.relative(PUBLIC, absPath).replace(/\\/g, '/')
}

/** Recopila todos los archivos de image/video en public/ */
function collectLocalFiles() {
  const all = walk(PUBLIC)
  return all.filter(f => {
    const ext = path.extname(f).toLowerCase()
    return !!MIME[ext]
  })
}

/** Lista TODOS los objetos del bucket (paginado) */
async function listAllR2Objects(client, bucket) {
  const keys = []
  let continuationToken = undefined
  do {
    const cmd = new ListObjectsV2Command({
      Bucket: bucket,
      ContinuationToken: continuationToken,
    })
    const resp = await client.send(cmd)
    for (const obj of resp.Contents ?? []) {
      keys.push(obj.Key)
    }
    continuationToken = resp.IsTruncated ? resp.NextContinuationToken : undefined
  } while (continuationToken)
  return keys
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const accountId       = requireEnv('R2_ACCOUNT_ID')
  const accessKeyId     = requireEnv('R2_ACCESS_KEY_ID')
  const secretAccessKey = requireEnv('R2_SECRET_ACCESS_KEY')
  const bucket          = requireEnv('R2_BUCKET_NAME')
  const endpoint        = process.env.R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`

  const client = new S3Client({
    region: 'auto',
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  })

  console.log(dryRun ? '🔍 MODO DRY-RUN (sin cambios reales)' : '🚀 Sincronizando con R2...')
  console.log(`Bucket : ${bucket}`)
  console.log(`Endpoint: ${endpoint}\n`)

  // 1. Recopilar archivos locales
  const localFiles = collectLocalFiles()
  const localKeys  = new Set(localFiles.map(toKey))

  console.log(`📁 Archivos locales en public/: ${localFiles.length}`)

  // 2. Listar objetos en R2
  console.log('📡 Listando objetos en R2...')
  const r2Keys = await listAllR2Objects(client, bucket)
  const r2Set  = new Set(r2Keys)
  console.log(`☁️  Objetos en R2: ${r2Keys.length}\n`)

  // 3. Calcular diff
  const toUpload = localFiles.filter(f => !r2Set.has(toKey(f)))
  const toDelete = r2Keys.filter(k => !localKeys.has(k))

  console.log(`⬆️  Para subir  : ${toUpload.length} archivo(s)`)
  console.log(`🗑️  Para borrar : ${toDelete.length} objeto(s) en R2\n`)

  // 4. Subir archivos nuevos/faltantes
  let uploadOk = 0, uploadFail = 0
  for (const filePath of toUpload) {
    const key = toKey(filePath)
    const ext = path.extname(filePath).toLowerCase()
    const contentType = MIME[ext]

    if (dryRun) {
      console.log(`[upload] ${key}`)
      uploadOk++
      continue
    }
    try {
      await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: createReadStream(filePath),
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }))
      console.log(`✅ subido: ${key}`)
      uploadOk++
    } catch (err) {
      console.error(`❌ error subiendo ${key}:`, err.message)
      uploadFail++
    }
  }

  // 5. Borrar objetos que ya no existen localmente
  let deleteOk = 0, deleteFail = 0
  for (const key of toDelete) {
    if (dryRun) {
      console.log(`[delete] ${key}`)
      deleteOk++
      continue
    }
    try {
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
      console.log(`🗑️  borrado: ${key}`)
      deleteOk++
    } catch (err) {
      console.error(`❌ error borrando ${key}:`, err.message)
      deleteFail++
    }
  }

  // 6. Resumen
  console.log('\n──────────────────────────────')
  console.log(`✅ Subidos : ${uploadOk}  ❌ Errores: ${uploadFail}`)
  console.log(`🗑️  Borrados: ${deleteOk}  ❌ Errores: ${deleteFail}`)
  if (dryRun) console.log('\n(dry-run: ningún cambio fue aplicado)')

  if (uploadFail + deleteFail > 0) process.exit(1)
}

main().catch(err => {
  console.error(err.message || err)
  process.exit(1)
})
