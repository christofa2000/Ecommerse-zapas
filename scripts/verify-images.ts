import fs from "fs";
import path from "path";
import { sampleProducts } from "../lib/products/sample";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");

interface ImageCheckResult {
  productId: string;
  productName: string;
  missingImages: string[];
  invalidImages: string[];
}

function checkImageExists(imagePath: string): boolean {
  // Skip API placeholders
  if (imagePath.startsWith("/api/placeholder/")) {
    return true;
  }

  const fullPath = path.join(PUBLIC_DIR, imagePath);
  return fs.existsSync(fullPath);
}

function verifyProductImages(product: any): ImageCheckResult {
  const result: ImageCheckResult = {
    productId: product.id,
    productName: product.name,
    missingImages: [],
    invalidImages: [],
  };

  // Check main image
  if (product.image && !checkImageExists(product.image)) {
    result.missingImages.push(product.image);
  }

  // Check additional images
  if (product.images) {
    for (const image of product.images) {
      if (!checkImageExists(image)) {
        result.missingImages.push(image);
      }
    }
  }

  return result;
}

function verifyOGImages(): string[] {
  const ogDir = path.join(IMAGES_DIR, "og");
  const requiredOGImages = ["home.jpg", "products.jpg"];

  const missingOGImages: string[] = [];

  for (const ogImage of requiredOGImages) {
    const ogPath = path.join(ogDir, ogImage);
    if (!fs.existsSync(ogPath)) {
      missingOGImages.push(`/images/og/${ogImage}`);
    }
  }

  return missingOGImages;
}

function main() {
  console.log("🔍 Verificando imágenes...\n");

  const results: ImageCheckResult[] = [];
  let totalMissingImages = 0;
  let totalInvalidImages = 0;

  // Check product images
  for (const product of sampleProducts) {
    const result = verifyProductImages(product);
    if (result.missingImages.length > 0 || result.invalidImages.length > 0) {
      results.push(result);
      totalMissingImages += result.missingImages.length;
      totalInvalidImages += result.invalidImages.length;
    }
  }

  // Check OG images
  const missingOGImages = verifyOGImages();
  totalMissingImages += missingOGImages.length;

  // Report results
  if (results.length === 0 && missingOGImages.length === 0) {
    console.log("✅ Todas las imágenes están presentes y son válidas.");
    process.exit(0);
  }

  console.log("❌ Se encontraron problemas con las imágenes:\n");

  if (results.length > 0) {
    console.log("📦 Imágenes de productos faltantes:");
    for (const result of results) {
      console.log(
        `\n  Producto: ${result.productName} (ID: ${result.productId})`
      );
      if (result.missingImages.length > 0) {
        console.log("  Imágenes faltantes:");
        for (const image of result.missingImages) {
          console.log(`    - ${image}`);
        }
      }
      if (result.invalidImages.length > 0) {
        console.log("  Imágenes inválidas:");
        for (const image of result.invalidImages) {
          console.log(`    - ${image}`);
        }
      }
    }
  }

  if (missingOGImages.length > 0) {
    console.log("\n🖼️  Imágenes OG faltantes:");
    for (const image of missingOGImages) {
      console.log(`  - ${image}`);
    }
  }

  console.log(`\n📊 Resumen:`);
  console.log(`  - Imágenes de productos faltantes: ${totalMissingImages}`);
  console.log(`  - Imágenes inválidas: ${totalInvalidImages}`);
  console.log(`  - Imágenes OG faltantes: ${missingOGImages.length}`);
  console.log(
    `  - Total de problemas: ${
      totalMissingImages + totalInvalidImages + missingOGImages.length
    }`
  );

  console.log("\n💡 Para solucionar estos problemas:");
  console.log(
    "  1. Asegúrate de que todas las imágenes estén en la carpeta public/images/"
  );
  console.log(
    "  2. Verifica que las rutas en sampleProducts coincidan con los archivos reales"
  );
  console.log("  3. Crea las imágenes OG faltantes en public/images/og/");

  process.exit(1);
}

if (require.main === module) {
  main();
}

export { verifyOGImages, verifyProductImages };
