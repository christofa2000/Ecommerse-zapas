/**
 * Helpers para interactuar con la API de órdenes del backend
 */

import { apiFetch } from './client';

/**
 * Input para crear una orden (alineado con el backend)
 */
export interface CreateOrderInput {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress?: string;
  paymentMethod?: 'card' | 'transfer' | 'cash';
}

/**
 * Item de orden en la respuesta
 */
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number; // Precio al momento de la compra
  createdAt: string; // ISO date string
}

/**
 * Orden completa
 */
export interface Order {
  id: string;
  userId: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  shippingAddress: string | null;
  paymentMethod: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  items: OrderItem[];
}

/**
 * Respuesta de creación de orden
 */
export interface CreateOrderResponse {
  data: Order;
}

/**
 * Respuesta de detalle de orden
 */
export interface OrderDetailResponse {
  data: Order;
}

/**
 * Respuesta de listado de órdenes
 */
export interface OrdersListResponse {
  data: Order[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Parámetros para obtener listado de órdenes
 */
export interface GetOrdersParams {
  page?: number;
  limit?: number;
}

/**
 * Crea una nueva orden (checkout)
 * 
 * @param input - Datos de la orden a crear
 * @param accessToken - Token JWT del usuario autenticado
 * @returns Orden creada
 * @throws Error si falla la creación o el token es inválido
 */
export async function createOrder(
  input: CreateOrderInput,
  accessToken: string,
): Promise<CreateOrderResponse> {
  return apiFetch<CreateOrderResponse>('/orders', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: input,
  });
}

/**
 * Obtiene el listado de órdenes del usuario autenticado
 * 
 * @param accessToken - Token JWT del usuario autenticado
 * @param params - Parámetros de paginación
 * @returns Listado de órdenes con metadata
 */
export async function getOrders(
  accessToken: string,
  params: GetOrdersParams = {},
): Promise<OrdersListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.append('page', params.page.toString());
  }
  if (params.limit !== undefined) {
    searchParams.append('limit', params.limit.toString());
  }

  const queryString = searchParams.toString();
  const path = `/orders${queryString ? `?${queryString}` : ''}`;

  return apiFetch<OrdersListResponse>(path, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

/**
 * Obtiene el detalle de una orden por ID
 * 
 * @param orderId - ID de la orden
 * @param accessToken - Token JWT del usuario autenticado
 * @returns Detalle de la orden
 */
export async function getOrderById(
  orderId: string,
  accessToken: string,
): Promise<OrderDetailResponse> {
  return apiFetch<OrderDetailResponse>(`/orders/${orderId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}




