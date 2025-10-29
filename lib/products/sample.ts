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
  gender?: "hombre" | "mujer" | "ninos" | "unisex";
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
      "/images/zapas-blancas2.png",
      "/images/blancas2.png",
      "/images/blancas-piernas.jpg",
      "/images/blancas-fondo-rojo.jpg",
    ],
    badges: ["más vendido", "sostenible"],
    description:
      "Zapatilla de running cómoda y sostenible, perfecta para el día a día.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Natural", "Blanco", "Gris"],
    category: "running",
    gender: "unisex",
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
    image: "/images/mujer3.png",
    images: ["/images/mujer4.png", "/images/4/mujer.png"],
    badges: ["nuevo"],
    description:
      "Zapatilla minimalista inspirada en la naturaleza, ideal para caminar.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Verde", "Beige", "Negro"],
    category: "casual",
    gender: "mujer",
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
    id: "6",
    slug: "runner-mizzle",
    name: "Runner Mizzle",
    price: 14900,
    image: "/images/rojas-nike.jpg",
    images: ["/images/rojas-piernas.jpg"],
    badges: ["más vendido"],
    description: "Zapatilla resistente al agua, ideal para días lluviosos.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Negro", "Gris", "Verde"],
    category: "running",
    gender: "hombre",
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
    image: "/images/niños.png",
    images: ["/images/niños2.png", "/images/4/niño.png"],
    badges: ["nuevo"],
    description: "Zapatilla de running premium con máxima amortiguación.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Azul", "Negro", "Blanco"],
    category: "running",
    gender: "hombre",
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
    gender: "mujer",
    inStock: true,
    stock: { "38": 4, "39": 6, "40": 9, "41": 12, "42": 8, "43": 5, "44": 2 },
    materials: ["Lana merino", "Caucho natural", "Tela impermeable"],
    features: ["Impermeable", "Antibacteriana", "Sostenible"],
  },
  {
    id: "10",
    slug: "runner-mizzle-plus",
    name: "Runner Mizzle Plus",
    price: 17900,
    image: "/images/rojas-nike.jpg",
    images: ["/images/rojas-piernas.jpg"],
    badges: ["nuevo"],
    description:
      "Zapatilla de running resistente al agua con tecnología avanzada.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Negro", "Azul", "Verde"],
    category: "running",
    gender: "hombre",
    inStock: true,
    stock: { "38": 1, "39": 3, "40": 5, "41": 7, "42": 4, "43": 2, "44": 1 },
    materials: ["Eucalipto", "Caucho natural", "Tela impermeable"],
    features: ["Tecnología avanzada", "Impermeable", "Alto rendimiento"],
  },
  {
    id: "11",
    slug: "runner-hombre-premium",
    name: "Runner Hombre Premium",
    price: 16900,
    image: "/images/hombre5.png",
    images: ["/images/4/hombre.png"],
    badges: ["nuevo", "más vendido"],
    description: "Zapatilla de running premium para hombre, estilo y confort.",
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["Negro", "Azul", "Gris"],
    category: "running",
    gender: "hombre",
    inStock: true,
    stock: { "39": 8, "40": 12, "41": 15, "42": 18, "43": 10, "44": 5 },
    materials: ["Eucalipto", "Caucho natural", "Tela reciclada"],
    features: ["Premium", "Alto rendimiento", "Duradera"],
  },
  {
    id: "12",
    slug: "tree-runner-mujer",
    name: "Tree Runner Mujer",
    price: 13900,
    image: "/images/mujer3.png",
    images: ["/images/mujer4.png", "/images/4/mujer.png"],
    badges: ["sostenible", "más vendido"],
    description: "Zapatilla sostenible para mujer, cómoda y elegante.",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Rosa", "Blanco", "Verde"],
    category: "casual",
    gender: "mujer",
    inStock: true,
    stock: { "36": 5, "37": 9, "38": 12, "39": 14, "40": 11, "41": 7 },
    materials: ["Eucalipto", "Caucho natural", "Algodón orgánico"],
    features: ["Sostenible", "Elegante", "Transpirable"],
  },
  {
    id: "13",
    slug: "runner-ninos",
    name: "Runner Niños",
    price: 9900,
    image: "/images/niños.png",
    images: ["/images/niños2.png", "/images/4/niño.png"],
    badges: ["nuevo"],
    description:
      "Zapatilla cómoda y divertida para niños, diseñada para jugar.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Azul", "Rojo", "Amarillo", "Verde"],
    category: "running",
    gender: "ninos",
    inStock: true,
    stock: { "28": 10, "30": 14, "32": 15, "34": 12, "36": 9 },
    materials: ["Caucho natural", "Tela reciclada"],
    features: ["Cómoda", "Divertida", "Sostenible"],
  },
  {
    id: "14",
    slug: "runner-rosa",
    name: "Runner Rosa",
    price: 13400,
    image: "/images/rosa.png",
    images: ["/images/blancas-fondo-rojo.jpg", "/images/zapas-blancas4.png"],
    badges: ["nuevo"],
    description:
      "Zapatilla en tono rosa, elegante y versátil para cualquier ocasión.",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Rosa", "Blanco", "Beige"],
    category: "casual",
    gender: "mujer",
    inStock: true,
    stock: { "38": 6, "39": 10, "40": 12, "41": 15, "42": 9, "43": 5 },
    materials: ["Eucalipto", "Caucho natural", "Algodón orgánico"],
    features: ["Elegante", "Cómoda", "Versátil"],
  },
  {
    id: "15",
    slug: "runner-violeta",
    name: "Runner Violeta",
    price: 13900,
    image: "/images/violeta.png",
    images: ["/images/celestes.png", "/images/celestes2.png"],
    badges: ["nuevo", "sostenible"],
    description:
      "Zapatilla en tono violeta, única y sostenible, perfecta para el día a día.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Violeta", "Celeste", "Blanco"],
    category: "casual",
    gender: "unisex",
    inStock: true,
    stock: { "38": 5, "39": 8, "40": 11, "41": 13, "42": 9, "43": 6, "44": 3 },
    materials: ["Eucalipto", "Caucho natural", "Tela reciclada"],
    features: ["Única", "Sostenible", "Unisex"],
  },
  {
    id: "16",
    slug: "runner-amarillo",
    name: "Runner Amarillo",
    price: 12900,
    image: "/images/amarillo.png",
    images: ["/images/zapas-blancas4.png", "/images/blancas-piernas.jpg"],
    badges: ["nuevo"],
    description: "Zapatilla en tono amarillo vibrante, ideal para destacar.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Amarillo", "Blanco", "Negro"],
    category: "running",
    gender: "unisex",
    inStock: true,
    stock: { "38": 4, "39": 7, "40": 10, "41": 12, "42": 8, "43": 5, "44": 2 },
    materials: ["Eucalipto", "Caucho natural", "Tela reciclada"],
    features: ["Vibrante", "Destacada", "Cómoda"],
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
