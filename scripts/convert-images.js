import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const assetsDir = './src/assets'

const images = [
  'profile-light.png',
  'profile-dark.png',
  'profile-light-v1.png',
  'profile-dark-v1.png'
]

async function convertToWebP() {
  for (const image of images) {
    const inputPath = path.join(assetsDir, image)
    const outputPath = path.join(assetsDir, image.replace('.png', '.webp'))
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${image} not found, skipping...`)
      continue
    }

    try {
      const inputSize = fs.statSync(inputPath).size / 1024
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath)
      
      const outputSize = fs.statSync(outputPath).size / 1024
      const savings = ((1 - outputSize / inputSize) * 100).toFixed(1)
      console.log(`✅ ${image} → ${image.replace('.png', '.webp')} (${savings}% smaller)`)
    } catch (err) {
      console.error(`❌ Error converting ${image}:`, err.message)
    }
  }
}

convertToWebP()
