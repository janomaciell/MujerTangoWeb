import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCE_DIR = path.join(__dirname, '../public/web-mentana')

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.webp', '.avif', '.png', '.gif', '.JPG', '.JPEG'])

function outPngName(file) {
  const { name, ext } = path.parse(file)
  const baseTarget = `${name}.png`
  if (ext.toLowerCase() === '.png') return null
  return baseTarget
}

async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Directory not found: ${SOURCE_DIR}`)
    process.exit(1)
  }

  const files = fs.readdirSync(SOURCE_DIR).filter(f => IMAGE_EXT.has(path.extname(f)))

  console.log(`Converting images in ${SOURCE_DIR} to PNG...`)

  for (const file of files) {
    const outName = outPngName(file)
    if (!outName) continue

    const input = path.join(SOURCE_DIR, file)
    const output = path.join(SOURCE_DIR, outName)
    
    await sharp(input).png({ compressionLevel: 9 }).toFile(output)
    console.log(`✓ Converted: ${file} → ${outName}`)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
