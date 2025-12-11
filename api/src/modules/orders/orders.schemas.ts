import { z } from 'zod';

/**
 * Schema para crear una orden (POST /orders)
 */
export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().cuid('ID de producto inválido'),
        quantity: z.number().int().positive('La cantidad debe ser mayor a 0'),
      }),
    )
    .min(1, 'Debe incluir al menos un producto'),
  shippingAddress: z.string().min(1, 'La dirección de envío es requerida').optional(),
  paymentMethod: z
    .enum(['card', 'transfer', 'cash'], {
      message: 'Método de pago inválido. Debe ser: card, transfer o cash',
    })
    .optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

/**
 * Schema para validar params de detalle de orden
 */
export const getOrderParamsSchema = z.object({
  id: z.string().cuid('ID de orden inválido'),
});

export type GetOrderParams = z.infer<typeof getOrderParamsSchema>;

/**
 * Schema para query params del listado de órdenes
 */
export const getOrdersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
});

export type GetOrdersQuery = z.infer<typeof getOrdersQuerySchema>;

/**
 * Tipo de Item de Orden (para respuestas)
 */
export type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number; // Precio al momento de la compra
  createdAt: Date;
};

/**
 * Tipo de Orden (para respuestas)
 */
export type Order = {
  id: string;
  userId: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  shippingAddress: string | null;
  paymentMethod: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
};

/**
 * Respuesta de creación de orden
 */
export type CreateOrderResponse = {
  data: Order;
};

/**
 * Respuesta de detalle de orden
 */
export type OrderDetailResponse = {
  data: Order;
};

/**
 * Respuesta de listado de órdenes
 */
export type OrdersListResponse = {
  data: Order[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

