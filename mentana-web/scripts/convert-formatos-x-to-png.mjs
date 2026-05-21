import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCE_DIR = path.join(__dirname, '../public/images/FORMATOS X')

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.webp', '.avif', '.png', '.gif', '.JPG', '.JPEG'])

function outPngName(file) {
  const { name, ext } = path.parse(file)
  const baseTarget = `${name}.png`
  if (ext.toLowerCase() === '.png') return null
  const targetPath = path.join(SOURCE_DIR, baseTarget)
  if (fs.existsSync(targetPath)) {
    const tag = ext.replace(/^\./, '').toLowerCase()
    return `${name}-${tag}.png`
  }
  return baseTarget
}

async function main() {
  const files = fs.readdirSync(SOURCE_DIR).filter(f => IMAGE_EXT.has(path.extname(f)))

  for (const file of files) {
    const outName = outPngName(file)
    if (!outName) continue

    const input = path.join(SOURCE_DIR, file)
    const output = path.join(SOURCE_DIR, outName)
    await sharp(input).png({ compressionLevel: 9 }).toFile(output)
    console.log(`${file} → ${outName}`)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
