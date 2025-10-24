import { existsSync } from "fs";
import { join } from "path";
import { sampleProducts } from "../lib/products/sample";

// Función para verificar si una ruta es válida
function isValidImagePath(path: string): boolean {
  return (
    !path.includes("!w") && !path.includes(" ") && path.startsWith("/images/")
  );
}

console.log("🔍 Verificando imágenes de productos...\n");

const missingImages: string[] = [];
const invalidPaths: string[] = [];

for (const product of sampleProducts) {
  console.log(`📦 ${product.name} (${product.slug})`);

  // Verificar imagen principal
  if (!isValidImagePath(product.image)) {
    invalidPaths.push(product.image);
    console.log(`  ⚠️  Ruta principal inválida: ${product.image}`);
  } else {
    const mainImagePath = join(process.cwd(), "public", product.image);
    if (!existsSync(mainImagePath)) {
      missingImages.push(product.image);
      console.log(`  ❌ Imagen principal faltante: ${product.image}`);
    } else {
      console.log(`  ✅ Imagen principal: ${product.image}`);
    }
  }

  // Verificar imágenes adicionales
  if (product.images) {
    for (const image of product.images) {
      const imagePath = join(process.cwd(), "public", image);
      if (!existsSync(imagePath)) {
        missingImages.push(image);
        console.log(`  ❌ Imagen adicional faltante: ${image}`);
      } else {
        console.log(`  ✅ Imagen adicional: ${image}`);
      }

      // Detectar fragmentos inválidos
      if (!isValidImagePath(image)) {
        invalidPaths.push(image);
        console.log(`  ⚠️  Ruta inválida detectada: ${image}`);
      }
    }
  }

  console.log("");
}

console.log("📊 Resumen:");
console.log(`  Total productos: ${sampleProducts.length}`);
console.log(`  Imágenes faltantes: ${missingImages.length}`);
console.log(`  Rutas inválidas: ${invalidPaths.length}`);

if (missingImages.length > 0) {
  console.log("\n❌ Imágenes faltantes:");
  missingImages.forEach((img) => console.log(`  - ${img}`));
}

if (invalidPaths.length > 0) {
  console.log("\n⚠️  Rutas inválidas:");
  invalidPaths.forEach((path) => console.log(`  - ${path}`));
}

if (missingImages.length === 0 && invalidPaths.length === 0) {
  console.log("\n✅ Todas las imágenes están correctas!");
} else {
  console.log("\n🔧 Se requieren correcciones.");
  process.exit(1);
}
