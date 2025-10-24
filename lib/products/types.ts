export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  badges: string[];
  description: string;
  category: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  stock: number | Record<string, number>;

  images: string[]; // siempre "/images/..."
  image: string; // alias de images[0]
  alt: string;
  features?: string[];
  materials?: string[];
};
