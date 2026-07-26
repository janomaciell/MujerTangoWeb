import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCE_DIR = path.join(__dirname, '../public/ARTISTAS XRA HOVER')
const OUT_DIR = path.join(__dirname, '../public/artistas-hover')

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.webp', '.avif', '.png', '.gif', '.JPG', '.JPEG', '.JPG'])

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const files = fs.readdirSync(SOURCE_DIR).filter(f => IMAGE_EXT.has(path.extname(f)))

  console.log(`Encontrados ${files.length} archivos en "${SOURCE_DIR}"`)

  for (const file of files) {
    const input = path.join(SOURCE_DIR, file)
    const baseName = path.parse(file).name
    const outName = `${baseName}.png`
    const output = path.join(OUT_DIR, outName)

    try {
      await sharp(input).png({ compressionLevel: 8 }).toFile(output)
      console.log(`✓ ${file} → artistas-hover/${outName}`)
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`)
    }
  }

  console.log('\nConversión completa. Archivos guardados en public/artistas-hover/')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
