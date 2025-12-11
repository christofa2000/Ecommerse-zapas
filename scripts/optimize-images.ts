import sharp from "sharp";
import { readdir, stat, mkdir } from "fs/promises";
import { join, extname, dirname, basename } from "path";
import { existsSync } from "fs";

interface OptimizeOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * Optimiza una imagen convirtiéndola a WebP y AVIF
 */
async function optimizeImage(
  inputPath: string,
  outputDir: string,
  options: OptimizeOptions = {}
): Promise<void> {
  const { quality = 85, maxWidth = 1920, maxHeight = 1920 } = options;

  try {
    const ext = extname(inputPath);
    const baseName = basename(inputPath, ext);
    const relativeDir = dirname(inputPath.replace(join(process.cwd(), "public"), ""));

    // Crear directorio de salida si no existe
    const outputBaseDir = join(outputDir, relativeDir);
    await mkdir(outputBaseDir, { recursive: true });

    // Verificar si ya existen versiones optimizadas
    const webpPath = join(outputBaseDir, `${baseName}.webp`);
    const avifPath = join(outputBaseDir, `${baseName}.avif`);
    
    if (existsSync(webpPath) && existsSync(avifPath)) {
      console.log(`⏭️  ${basename(inputPath)} - Ya optimizada, saltando...`);
      return;
    }

    // Leer metadata de la imagen original
    const metadata = await sharp(inputPath).metadata();
    const originalSize = (await stat(inputPath)).size;

    // Calcular dimensiones optimizadas manteniendo aspect ratio
    let width = metadata.width || maxWidth;
    let height = metadata.height || maxHeight;

    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    // Generar WebP (solo si no existe)
    if (!existsSync(webpPath)) {
      await sharp(inputPath)
      .resize(width, height, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality })
      .toFile(webpPath);
    }

    const webpSize = (await stat(webpPath)).size;
    const webpSavings = ((originalSize - webpSize) / originalSize) * 100;

    // Generar AVIF (solo si no existe)
    if (!existsSync(avifPath)) {
      await sharp(inputPath)
      .resize(width, height, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .avif({ quality: quality - 5 }) // AVIF es más eficiente, usar calidad ligeramente menor
      .toFile(avifPath);
    }

    const avifSize = (await stat(avifPath)).size;
    const avifSavings = ((originalSize - avifSize) / originalSize) * 100;

    console.log(`✅ ${basename(inputPath)}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KiB`);
    console.log(`   WebP: ${(webpSize / 1024).toFixed(2)} KiB (${webpSavings.toFixed(1)}% ahorro)`);
    console.log(`   AVIF: ${(avifSize / 1024).toFixed(2)} KiB (${avifSavings.toFixed(1)}% ahorro)`);
    console.log(`   Dimensiones: ${width}x${height}`);
  } catch (error) {
    console.error(`❌ Error optimizando ${inputPath}:`, error);
    throw error;
  }
}

/**
 * Busca todas las imágenes en un directorio recursivamente
 */
async function findImages(
  dir: string,
  extensions: string[] = [".png", ".jpg", ".jpeg"]
): Promise<string[]> {
  const images: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // Ignorar node_modules y otros directorios
      if (!entry.name.startsWith(".") && entry.name !== "node_modules") {
        const subImages = await findImages(fullPath, extensions);
        images.push(...subImages);
      }
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        images.push(fullPath);
      }
    }
  }

  return images;
}

/**
 * Función principal
 */
async function main() {
  const publicDir = join(process.cwd(), "public");
  const videoDir = join(publicDir, "video");
  const imagesDir = join(publicDir, "images");

  console.log("🚀 Iniciando optimización de imágenes...\n");

  // Directorios específicos a optimizar (los más críticos según Lighthouse)
  const targetDirs = [
    { path: videoDir, name: "video", maxWidth: 1920, maxHeight: 1080 },
    { path: imagesDir, name: "images", maxWidth: 1920, maxHeight: 1920 },
  ];

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;

  for (const { path, name, maxWidth, maxHeight } of targetDirs) {
    if (!existsSync(path)) {
      console.log(`⚠️  Directorio ${name} no existe, saltando...\n`);
      continue;
    }

    console.log(`📁 Procesando directorio: ${name}/`);
    const images = await findImages(path);

    if (images.length === 0) {
      console.log(`   No se encontraron imágenes en ${name}/\n`);
      continue;
    }

    for (const imagePath of images) {
      try {
        const stats = await stat(imagePath);
        totalOriginalSize += stats.size;

        // Optimizar imagen
        await optimizeImage(imagePath, publicDir, {
          quality: 85,
          maxWidth,
          maxHeight,
        });

        // Calcular tamaño optimizado (usar AVIF como referencia)
        const ext = extname(imagePath);
        const baseName = basename(imagePath, ext);
        const relativeDir = dirname(imagePath.replace(publicDir, ""));
        const avifPath = join(publicDir, relativeDir, `${baseName}.avif`);

        if (existsSync(avifPath)) {
          const avifStats = await stat(avifPath);
          totalOptimizedSize += avifStats.size;
        }

        processedCount++;
        console.log("");
      } catch (error) {
        console.error(`   Error procesando ${imagePath}:`, error);
      }
    }
  }

  // Resumen
  console.log("\n📊 Resumen de optimización:");
  console.log(`   Imágenes procesadas: ${processedCount}`);
  console.log(`   Tamaño original: ${(totalOriginalSize / 1024).toFixed(2)} KiB`);
  console.log(`   Tamaño optimizado (AVIF): ${(totalOptimizedSize / 1024).toFixed(2)} KiB`);
  console.log(
    `   Ahorro estimado: ${((totalOriginalSize - totalOptimizedSize) / 1024).toFixed(2)} KiB (${(((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1)}%)`
  );
  console.log("\n✅ Optimización completada!");
  console.log("\n💡 Nota: Las imágenes optimizadas están en los mismos directorios que las originales.");
  console.log("   Next.js Image automáticamente servirá WebP/AVIF cuando estén disponibles.");
}

main().catch((error) => {
  console.error("❌ Error fatal:", error);
  process.exit(1);
});

