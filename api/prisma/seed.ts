import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed de productos para la base de datos
 * 
 * IMPORTANTE: Este seed usa `upsert` basado en `slug`, lo que significa:
 * - Si un producto con el mismo slug ya existe, se ACTUALIZA (no se duplica)
 * - Si no existe, se CREA
 * - Los productos existentes con otros slugs NO se eliminan
 * 
 * Para ejecutar: npm run prisma:seed
 */
async function main() {
  console.log('🌱 Iniciando seed de productos...');

  // Catálogo completo de productos
  // Nota: Los slugs deben ser únicos. Si cambias un slug, se creará un nuevo producto.
  const products = [
    {
      name: 'Zapatillas Sostenibles Clásicas',
      slug: 'zapatillas-sostenibles-clasicas',
      description: 'Zapatillas cómodas y sostenibles, perfectas para el día a día.',
      price: 89.99,
      image: '/images/zapas-blancas.png',
      images: [
        '/images/zapas-blancas.png',
        '/images/zapas-blancas2.png',
        '/images/blancas2.png',
        '/images/blancas-piernas.jpg',
      ],
      brand: 'Zapatillas',
      category: 'unisex',
      sizes: ['38', '39', '40', '41', '42', '43', '44'],
      colors: ['blanco', 'negro', 'gris'],
      stock: 50,
      isActive: true,
    },
    {
      name: 'Zapatillas Running Eco',
      slug: 'zapatillas-running-eco',
      description: 'Ideal para correr, fabricadas con materiales reciclados.',
      price: 119.99,
      image: '/images/running-eco.jpg',
      images: ['/images/running-eco.jpg'],
      brand: 'Zapatillas',
      category: 'running',
      sizes: ['39', '40', '41', '42', '43', '44', '45'],
      colors: ['azul', 'negro', 'verde'],
      stock: 30,
      isActive: true,
    },
    {
      name: 'Zapatillas Urbanas Minimalistas',
      slug: 'zapatillas-urbanas-minimalistas',
      description: 'Diseño minimalista para la ciudad, 100% veganas.',
      price: 95.99,
      image: '/images/urbanas-minimalistas.jpg',
      images: ['/images/urbanas-minimalistas.jpg'],
      brand: 'Zapatillas',
      category: 'casual',
      sizes: ['36', '37', '38', '39', '40', '41', '42'],
      colors: ['beige', 'blanco', 'negro'],
      stock: 25,
      isActive: true,
    },
    {
      name: 'Runner Natural',
      slug: 'runner-natural',
      description: 'Zapatilla de running cómoda y sostenible, perfecta para el día a día.',
      price: 129.00,
      image: '/images/zapas-blancas.png',
      images: [
        '/images/zapas-blancas2.png',
        '/images/blancas2.png',
        '/images/blancas-piernas.jpg',
        '/images/blancas-fondo-rojo.jpg',
      ],
      brand: 'Zapatillas',
      category: 'running',
      sizes: ['38', '39', '40', '41', '42', '43', '44'],
      colors: ['Natural', 'Blanco', 'Gris'],
      stock: 60,
      isActive: true,
    },
    {
      name: 'Tree Skipper',
      slug: 'tree-skipper',
      description: 'Zapatilla minimalista inspirada en la naturaleza, ideal para caminar.',
      price: 119.00,
      image: '/images/mujer3.png',
      images: ['/images/mujer4.png'],
      brand: 'Zapatillas',
      category: 'casual',
      sizes: ['38', '39', '40', '41', '42', '43', '44'],
      colors: ['Verde', 'Beige', 'Negro'],
      stock: 40,
      isActive: true,
    },
    {
      name: 'Runner Mizzle',
      slug: 'runner-mizzle',
      description: 'Zapatilla resistente al agua, ideal para días lluviosos.',
      price: 149.00,
      image: '/images/rojas-nike.jpg',
      images: ['/images/rojas-piernas.jpg'],
      brand: 'Zapatillas',
      category: 'running',
      sizes: ['38', '39', '40', '41', '42', '43', '44'],
      colors: ['Negro', 'Gris', 'Verde'],
      stock: 35,
      isActive: true,
    },
    {
      name: 'Tree Flyer',
      slug: 'tree-flyer',
      description: 'Zapatilla de running premium con máxima amortiguación.',
      price: 169.00,
      image: '/images/niños.png',
      images: ['/images/niños2.png'],
      brand: 'Zapatillas',
      category: 'running',
      sizes: ['38', '39', '40', '41', '42', '43', '44'],
      colors: ['Azul', 'Negro', 'Blanco'],
      stock: 20,
      isActive: true,
    },
    {
      name: 'Wool Runner Mizzle',
      slug: 'wool-runner-mizzle',
      description: 'Zapatilla de lana resistente al agua, cómoda y sostenible.',
      price: 159.00,
      image: '/images/negras.png',
      images: ['/images/lona-fondo-oscuro.jpg'],
      brand: 'Zapatillas',
      category: 'casual',
      sizes: ['38', '39', '40', '41', '42', '43', '44'],
      colors: ['Gris', 'Negro', 'Azul'],
      stock: 30,
      isActive: true,
    },
  ];

  let created = 0;
  let updated = 0;

  // Usar upsert para cada producto basado en slug
  // Esto asegura que no se dupliquen productos y que se actualicen si ya existen
  for (const product of products) {
    const existing = await prisma.product.findUnique({
      where: { slug: product.slug },
    });

    if (existing) {
      // Actualizar producto existente
      await prisma.product.update({
        where: { slug: product.slug },
        data: product,
      });
      updated++;
      console.log(`  ✓ Actualizado: ${product.name} (${product.slug})`);
    } else {
      // Crear nuevo producto
      await prisma.product.create({
        data: product,
      });
      created++;
      console.log(`  + Creado: ${product.name} (${product.slug})`);
    }
  }

  console.log(`\n✅ Seed completado:`);
  console.log(`   - Productos creados: ${created}`);
  console.log(`   - Productos actualizados: ${updated}`);
  console.log(`   - Total procesados: ${products.length}`);
  console.log(`\n💡 Nota: Los productos existentes con otros slugs NO se eliminaron.`);
  console.log(`   Para ver todos los productos, usa: npx prisma studio`);
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
