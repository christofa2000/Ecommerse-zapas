/**
 * Helpers para interactuar con la API de productos del backend
 */

import { apiFetch } from './client';
import type { Product } from '@/lib/products/sample';

/**
 * Tipo Product del backend (alineado con la respuesta de la API)
 */
export interface ApiProduct {
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
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * Respuesta del listado de productos
 */
export interface ProductsListResponse {
  data: ApiProduct[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Respuesta del detalle de producto
 */
export interface ProductDetailResponse {
  data: ApiProduct;
}

/**
 * Parámetros para obtener productos
 */
export interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  search?: string;
}

/**
 * Obtiene el listado de productos con filtros y paginación
 * 
 * @param params - Parámetros de búsqueda y paginación
 * @returns Listado de productos con metadata de paginación
 */
export async function getProducts(
  params: GetProductsParams = {},
): Promise<ProductsListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.append('page', params.page.toString());
  }
  if (params.limit !== undefined) {
    searchParams.append('limit', params.limit.toString());
  }
  if (params.category) {
    searchParams.append('category', params.category);
  }
  if (params.brand) {
    searchParams.append('brand', params.brand);
  }
  if (params.minPrice !== undefined) {
    searchParams.append('minPrice', params.minPrice.toString());
  }
  if (params.maxPrice !== undefined) {
    searchParams.append('maxPrice', params.maxPrice.toString());
  }
  if (params.size) {
    searchParams.append('size', params.size);
  }
  if (params.color) {
    searchParams.append('color', params.color);
  }
  if (params.search) {
    searchParams.append('search', params.search);
  }

  const queryString = searchParams.toString();
  const path = `/products${queryString ? `?${queryString}` : ''}`;

  return apiFetch<ProductsListResponse>(path, {
    revalidate: 60, // Revalidar cada 60 segundos
  });
}

/**
 * Obtiene un producto por su slug
 * 
 * @param slug - Slug del producto
 * @returns Detalle del producto
 */
export async function getProductBySlug(
  slug: string,
): Promise<ProductDetailResponse> {
  return apiFetch<ProductDetailResponse>(`/products/slug/${slug}`, {
    revalidate: 60, // Revalidar cada 60 segundos
  });
}

/**
 * Adapta un producto de la API al formato del frontend
 * 
 * @param apiProduct - Producto de la API
 * @returns Producto en formato del frontend
 */
export function adaptApiProductToFrontend(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    slug: apiProduct.slug,
    name: apiProduct.name,
    price: apiProduct.price,
    originalPrice: undefined, // No disponible en el backend por ahora
    image: apiProduct.image || '/images/zapas-blancas.png', // Fallback
    images: apiProduct.images.length > 0 ? apiProduct.images : [apiProduct.image || '/images/zapas-blancas.png'],
    badges: [], // No disponible en el backend por ahora
    description: apiProduct.description || '',
    sizes: apiProduct.sizes,
    colors: apiProduct.colors,
    category: apiProduct.category || 'unisex',
    gender: undefined, // No disponible en el backend por ahora
    inStock: apiProduct.stock > 0,
    stock: apiProduct.sizes.reduce((acc, size) => {
      // Distribuir el stock total entre los talles disponibles
      acc[size] = Math.floor(apiProduct.stock / apiProduct.sizes.length);
      return acc;
    }, {} as Record<string, number>),
    materials: undefined, // No disponible en el backend por ahora
    features: undefined, // No disponible en el backend por ahora
  };
}

