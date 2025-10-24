import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "p-wool-runner",
    slug: "wool-runner",
    name: "Wool Runner",
    price: 129,
    badges: ["más vendido", "sostenible"],
    description:
      "Zapatilla versátil de lana merino, transpirable y cómoda para cualquier ocasión.",
    category: "running",
    colors: ["olive", "charcoal"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    inStock: true,
    stock: 42,

    images: [
      "/images/products/wool-runner/1.jpg",
      "/images/products/wool-runner/2.jpg",
      "/images/products/wool-runner/3.jpg",
    ],
    image: "/images/products/wool-runner/1.jpg",
    alt: "Wool Runner — color olive",
  },
  {
    id: "p-tree-skipper",
    slug: "tree-skipper",
    name: "Tree Skipper",
    price: 119,
    badges: ["nuevo"],
    description:
      "Zapatilla minimalista inspirada en la naturaleza, ideal para caminar.",
    category: "casual",
    colors: ["verde", "beige", "negro"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    inStock: true,
    stock: 35,

    images: [
      "/images/products/tree-skipper/1.jpg",
      "/images/products/tree-skipper/2.jpg",
      "/images/products/tree-skipper/3.jpg",
    ],
    image: "/images/products/tree-skipper/1.jpg",
    alt: "Tree Skipper — color verde",
  },
  {
    id: "p-tree-dasher",
    slug: "tree-dasher",
    name: "Tree Dasher",
    price: 159,
    badges: ["más vendido"],
    description:
      "Zapatilla de running de alto rendimiento con materiales sostenibles.",
    category: "running",
    colors: ["negro", "blanco", "azul"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    inStock: true,
    stock: 28,

    images: [
      "/images/products/tree-dasher/1.jpg",
      "/images/products/tree-dasher/2.jpg",
    ],
    image: "/images/products/tree-dasher/1.jpg",
    alt: "Tree Dasher — color negro",
  },
  {
    id: "p-tree-breezer",
    slug: "tree-breezer",
    name: "Tree Breezer",
    price: 109,
    badges: ["nuevo", "sostenible"],
    description: "Zapatilla ligera y transpirable, perfecta para el verano.",
    category: "casual",
    colors: ["blanco", "rosa", "amarillo"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    inStock: true,
    stock: 22,

    images: ["/images/products/tree-breezer/1.jpg"],
    image: "/images/products/tree-breezer/1.jpg",
    alt: "Tree Breezer — color blanco",
  },
  {
    id: "p-runner-mizzle",
    slug: "runner-mizzle",
    name: "Runner Mizzle",
    price: 149,
    badges: ["más vendido"],
    description: "Zapatilla resistente al agua, ideal para días lluviosos.",
    category: "running",
    colors: ["negro", "gris", "verde"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    inStock: true,
    stock: 31,

    images: [
      "/images/products/runner-mizzle/1.jpg",
      "/images/products/runner-mizzle/2.jpg",
    ],
    image: "/images/products/runner-mizzle/1.jpg",
    alt: "Runner Mizzle — color negro",
  },
  {
    id: "p-tree-flyer",
    slug: "tree-flyer",
    name: "Tree Flyer",
    price: 169,
    badges: ["nuevo"],
    description: "Zapatilla de running premium con máxima amortiguación.",
    category: "running",
    colors: ["azul", "negro", "blanco"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    inStock: true,
    stock: 15,

    images: [
      "/images/products/tree-flyer/1.jpg",
      "/images/products/tree-flyer/2.jpg",
    ],
    image: "/images/products/tree-flyer/1.jpg",
    alt: "Tree Flyer — color azul",
  },
  {
    id: "p-wool-runner-mizzle",
    slug: "wool-runner-mizzle",
    name: "Wool Runner Mizzle",
    price: 159,
    badges: ["sostenible"],
    description: "Zapatilla de lana resistente al agua, cómoda y sostenible.",
    category: "casual",
    colors: ["gris", "negro", "azul"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    inStock: true,
    stock: 18,

    images: ["/images/products/wool-runner-mizzle/1.jpg"],
    image: "/images/products/wool-runner-mizzle/1.jpg",
    alt: "Wool Runner Mizzle — color gris",
  },
  {
    id: "p-tree-skipper-mizzle",
    slug: "tree-skipper-mizzle",
    name: "Tree Skipper Mizzle",
    price: 129,
    badges: ["más vendido", "sostenible"],
    description:
      "Zapatilla minimalista resistente al agua, perfecta para cualquier clima.",
    category: "casual",
    colors: ["verde", "gris", "negro"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    inStock: true,
    stock: 25,

    images: [
      "/images/products/tree-skipper-mizzle/1.jpg",
      "/images/products/tree-skipper-mizzle/2.jpg",
    ],
    image: "/images/products/tree-skipper-mizzle/1.jpg",
    alt: "Tree Skipper Mizzle — color verde",
  },
  {
    id: "p-runner-mizzle-plus",
    slug: "runner-mizzle-plus",
    name: "Runner Mizzle Plus",
    price: 179,
    badges: ["nuevo"],
    description:
      "Zapatilla de running resistente al agua con tecnología avanzada.",
    category: "running",
    colors: ["negro", "azul", "verde"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    inStock: true,
    stock: 12,

    images: [
      "/images/products/runner-mizzle-plus/1.jpg",
      "/images/products/runner-mizzle-plus/2.jpg",
    ],
    image: "/images/products/runner-mizzle-plus/1.jpg",
    alt: "Runner Mizzle Plus — color negro",
  },
];

export function getFeaturedProducts(limit = 8) {
  return products
    .filter((product) => product.badges.includes("más vendido"))
    .slice(0, limit);
}

export function getProductsByCategory(category: string) {
  return products.filter((product) => product.category === category);
}

export function getAllSlugs() {
  return products.map((p) => p.slug);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}
