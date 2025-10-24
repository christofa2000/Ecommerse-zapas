export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  badges: ("nuevo" | "más vendido" | "sostenible")[];
  description: string;
  sizes: string[];
  colors: string[];
  category: string;
  inStock: boolean;
  stock: Record<string, number>; // size -> quantity
  materials?: string[];
  features?: string[];
}

export const sampleProducts: Product[] = [
  {
    id: "1",
    slug: "runner-natural",
    name: "Runner Natural",
    price: 12900,
    originalPrice: 14900,
    image: "/images/zapas-blancas.png",
    images: [
      "/images/blancas2.png",
      "/images/blancas-piernas.jpg",
      "/images/blancas-fondo-rojo.jpg",
      "/images/zapas-blancas2.png",
    ],
    badges: ["más vendido", "sostenible"],
    description:
      "Zapatilla de running cómoda y sostenible, perfecta para el día a día.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Natural", "Blanco", "Gris"],
    category: "running",
    inStock: true,
    stock: {
      "38": 5,
      "39": 8,
      "40": 12,
      "41": 15,
      "42": 10,
      "43": 7,
      "44": 3,
    },
    materials: ["Lana merino", "Caucho natural", "Tela reciclada"],
    features: ["Transpirable", "Antibacteriana", "Fácil de limpiar"],
  },
  {
    id: "2",
    slug: "tree-skipper",
    name: "Tree Skipper",
    price: 11900,
    image: "/images/negras.png",
    images: [
      "/images/lona-fondo-oscuro.jpg",
      "/images/nike-fondo-artistico.jpg",
      "/images/nike-grandes.jpg",
    ],
    badges: ["nuevo"],
    description:
      "Zapatilla minimalista inspirada en la naturaleza, ideal para caminar.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Verde", "Beige", "Negro"],
    category: "casual",
    inStock: true,
    stock: {
      "38": 3,
      "39": 6,
      "40": 9,
      "41": 11,
      "42": 8,
      "43": 4,
      "44": 2,
    },
    materials: ["Eucalipto", "Caucho natural", "Algodón orgánico"],
    features: ["Minimalista", "Ligera", "Vegana"],
  },
  {
    id: "3",
    slug: "wool-runner",
    name: "Wool Runner",
    price: 13900,
    image: "/images/azules2.png",
    images: [
      "/images/celestes.png",
      "/images/celestes2.png!w700wp",
      "/images/celestes4.png",
    ],
    badges: ["sostenible"],
    description:
      "Zapatilla de lana merino, transpirable y cómoda para cualquier ocasión.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Gris", "Azul", "Verde"],
    category: "casual",
    inStock: true,
    stock: {
      "38": 4,
      "39": 7,
      "40": 10,
      "41": 13,
      "42": 9,
      "43": 5,
      "44": 2,
    },
    materials: ["Lana merino", "Caucho natural", "Algodón orgánico"],
    features: ["Transpirable", "Antibacteriana", "Fácil de limpiar"],
  },
  {
    id: "4",
    slug: "tree-dasher",
    name: "Tree Dasher",
    price: 15900,
    image: "/images/rojas.png",
    images: ["/images/rojas2.png", "/images/rojas3.png"],
    badges: ["más vendido"],
    description:
      "Zapatilla de running de alto rendimiento con materiales sostenibles.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Negro", "Blanco", "Azul"],
    category: "running",
    inStock: true,
    stock: { "38": 6, "39": 9, "40": 12, "41": 15, "42": 11, "43": 8, "44": 4 },
    materials: ["Eucalipto", "Caucho natural", "Tela reciclada"],
    features: ["Alto rendimiento", "Transpirable", "Duradera"],
  },
  {
    id: "5",
    slug: "tree-breezer",
    name: "Tree Breezer",
    price: 10900,
    image: "/images/rojas4.png",
    images: ["/images/rojas-piernas.jpg"],
    badges: ["nuevo", "sostenible"],
    description: "Zapatilla ligera y transpirable, perfecta para el verano.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Blanco", "Rosa", "Amarillo"],
    category: "casual",
    inStock: true,
    stock: { "38": 3, "39": 5, "40": 8, "41": 10, "42": 7, "43": 4, "44": 2 },
    materials: ["Eucalipto", "Caucho natural", "Tela reciclada"],
    features: ["Ligera", "Transpirable", "Veraniega"],
  },
  {
    id: "6",
    slug: "runner-mizzle",
    name: "Runner Mizzle",
    price: 14900,
    image: "/images/rojas-nike.jpg",
    images: ["/images/rojas-piernas.jpg", "/images/rojas.png"],
    badges: ["más vendido"],
    description: "Zapatilla resistente al agua, ideal para días lluviosos.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Negro", "Gris", "Verde"],
    category: "running",
    inStock: true,
    stock: { "38": 5, "39": 8, "40": 11, "41": 14, "42": 10, "43": 6, "44": 3 },
    materials: ["Eucalipto", "Caucho natural", "Tela impermeable"],
    features: ["Impermeable", "Transpirable", "Duradera"],
  },
  {
    id: "7",
    slug: "tree-flyer",
    name: "Tree Flyer",
    price: 16900,
    image: "/images/zapas-blancas.png",
    images: ["/images/blancas2.png", "/images/blancas-piernas.jpg"],
    badges: ["nuevo"],
    description: "Zapatilla de running premium con máxima amortiguación.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Azul", "Negro", "Blanco"],
    category: "running",
    inStock: true,
    stock: { "38": 2, "39": 4, "40": 6, "41": 8, "42": 5, "43": 3, "44": 1 },
    materials: ["Eucalipto", "Caucho natural", "Tela reciclada"],
    features: ["Premium", "Máxima amortiguación", "Alto rendimiento"],
  },
  {
    id: "8",
    slug: "wool-runner-mizzle",
    name: "Wool Runner Mizzle",
    price: 15900,
    image: "/images/negras.png",
    images: ["/images/lona-fondo-oscuro.jpg"],
    badges: ["sostenible"],
    description: "Zapatilla de lana resistente al agua, cómoda y sostenible.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Gris", "Negro", "Azul"],
    category: "casual",
    inStock: true,
    stock: { "38": 4, "39": 6, "40": 9, "41": 12, "42": 8, "43": 5, "44": 2 },
    materials: ["Lana merino", "Caucho natural", "Tela impermeable"],
    features: ["Impermeable", "Antibacteriana", "Sostenible"],
  },
  {
    id: "9",
    slug: "tree-skipper-mizzle",
    name: "Tree Skipper Mizzle",
    price: 12900,
    image: "/images/azules2.png",
    images: ["/images/celestes.png", "/images/celestes4.png"],
    badges: ["más vendido", "sostenible"],
    description:
      "Zapatilla minimalista resistente al agua, perfecta para cualquier clima.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Verde", "Gris", "Negro"],
    category: "casual",
    inStock: true,
    stock: { "38": 6, "39": 9, "40": 12, "41": 15, "42": 11, "43": 7, "44": 4 },
    materials: ["Eucalipto", "Caucho natural", "Tela impermeable"],
    features: ["Minimalista", "Impermeable", "Sostenible"],
  },
  {
    id: "10",
    slug: "runner-mizzle-plus",
    name: "Runner Mizzle Plus",
    price: 17900,
    image: "/images/rojas-nike.jpg",
    images: ["/images/rojas-piernas.jpg", "/images/rojas2.png"],
    badges: ["nuevo"],
    description:
      "Zapatilla de running resistente al agua con tecnología avanzada.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Negro", "Azul", "Verde"],
    category: "running",
    inStock: true,
    stock: { "38": 1, "39": 3, "40": 5, "41": 7, "42": 4, "43": 2, "44": 1 },
    materials: ["Eucalipto", "Caucho natural", "Tela impermeable"],
    features: ["Tecnología avanzada", "Impermeable", "Alto rendimiento"],
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return sampleProducts.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return sampleProducts.filter((product) => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return sampleProducts.filter((product) =>
    product.badges.includes("más vendido")
  );
};
