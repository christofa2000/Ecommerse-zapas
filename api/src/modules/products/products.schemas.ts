import { z } from 'zod';

// Schema para validar query params del listado
export const getProductsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  search: z.string().optional(),
});

export type GetProductsQuery = z.infer<typeof getProductsQuerySchema>;

// Schema para validar params de detalle
export const getProductParamsSchema = z.object({
  id: z.string().cuid(),
});

export type GetProductParams = z.infer<typeof getProductParamsSchema>;

// Tipo de dominio Product (derivado de Prisma)
export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image: string | null;
  images: string[];
  brand: string | null;
  category: string | null;
  sizes: string[];
  colors: string[];
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Tipo para respuesta de listado
export type ProductsListResponse = {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Tipo para respuesta de detalle
export type ProductDetailResponse = {
  data: Product;
};






