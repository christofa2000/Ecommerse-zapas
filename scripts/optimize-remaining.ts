import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";
import { existsSync } from "fs";

const publicDir = join(process.cwd(), "public");
const imagesDir = join(publicDir, "images");

async function optimizeIfNeeded(imagePath: string): Promise<void> {
  const ext = extname(imagePath);
  const baseName = basename(imagePath, ext);
  const dir = join(imagesDir, "..", imagePath.replace(publicDir, "").replace(basename(imagePath), ""));
  
  const webpPath = join(dir, `${baseName}.webp`);
  const avifPath = join(dir, `${baseName}.avif`);

  if (existsSync(webpPath) && existsSync(avifPath)) {
    return; // Ya optimizada
  }

  try {
    const originalSize = (await stat(imagePath)).size;
    const metadata = await sharp(imagePath).metadata();
    
    let width = metadata.width || 1920;
    let height = metadata.height || 1920;
    
    if (width > 1920 || height > 1920) {
      const ratio = Math.min(1920 / width, 1920 / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    if (!existsSync(webpPath)) {
      await sharp(imagePath)
        .resize(width, height, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(webpPath);
    }

    if (!existsSync(avifPath)) {
      await sharp(imagePath)
        .resize(width, height, { fit: "inside", withoutEnlargement: true })
        .avif({ quality: 80 })
        .toFile(avifPath);
    }

    const webpSize = (await stat(webpPath)).size;
    const avifSize = (await stat(avifPath)).size;
    const savings = ((originalSize - avifSize) / originalSize) * 100;

    console.log(`✅ ${basename(imagePath)} - ${(originalSize / 1024).toFixed(2)} KiB → ${(avifSize / 1024).toFixed(2)} KiB (${savings.toFixed(1)}% ahorro)`);
  } catch (error) {
    console.error(`❌ Error: ${imagePath}`, error);
  }
}

async function main() {
  const images = [
    "images/violeta.png",
    "images/rosa.png",
    "images/zapas-blancas4.png",
    "images/niños2.png",
    "images/niños.png",
    "images/zapas-blancas.png",
    "images/rojas2.png",
    "images/zapas-blancas2.png",
    "images/nike-grandes.jpg",
    "images/rojas-nike.jpg",
    "images/rojas-piernas.jpg",
  ];

  console.log("🚀 Optimizando imágenes restantes...\n");

  for (const img of images) {
    const fullPath = join(publicDir, img);
    if (existsSync(fullPath)) {
      await optimizeIfNeeded(fullPath);
    }
  }

  console.log("\n✅ Completado!");
}

main().catch(console.error);


