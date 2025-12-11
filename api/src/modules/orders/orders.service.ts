import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import type {
  CreateOrderInput,
  CreateOrderResponse,
  GetOrderParams,
  OrderDetailResponse,
  GetOrdersQuery,
  OrdersListResponse,
} from './orders.schemas';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  /**
   * Crea una nueva orden (checkout)
   */
  async createOrder(
    userId: string,
    input: CreateOrderInput,
  ): Promise<CreateOrderResponse> {
    // Validar que todos los productos existan y estén activos
    const productIds = input.items.map((item) => item.productId);
    const products = await this.ordersRepository.findProductsByIds(productIds);

    // Verificar que todos los productos fueron encontrados
    if (products.length !== productIds.length) {
      const foundIds = new Set(products.map((p) => p.id));
      const missingIds = productIds.filter((id) => !foundIds.has(id));
      throw new BadRequestException(
        `Productos no encontrados: ${missingIds.join(', ')}`,
      );
    }

    // Verificar que todos los productos estén activos
    const inactiveProducts = products.filter((p) => !p.isActive);
    if (inactiveProducts.length > 0) {
      throw new BadRequestException(
        `Productos inactivos: ${inactiveProducts.map((p) => p.name).join(', ')}`,
      );
    }

    // Crear un mapa de productos para acceso rápido
    const productMap = new Map(
      products.map((p) => [p.id, { price: p.price, name: p.name }]),
    );

    // Calcular total de la orden
    let total = 0;
    const orderItems = input.items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new BadRequestException(
          `Producto ${item.productId} no encontrado`,
        );
      }

      const itemPrice = product.price * item.quantity;
      total += itemPrice;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price, // Precio unitario al momento de la compra
      };
    });

    // Crear la orden
    const order = await this.ordersRepository.createOrder({
      userId,
      total,
      shippingAddress: input.shippingAddress,
      paymentMethod: input.paymentMethod,
      items: orderItems,
    });

    return {
      data: order,
    };
  }

  /**
   * Obtiene una orden por ID (solo si pertenece al usuario)
   */
  async getOrderById(
    userId: string,
    params: GetOrderParams,
  ): Promise<OrderDetailResponse> {
    const order = await this.ordersRepository.findByIdForUser(
      params.id,
      userId,
    );

    if (!order) {
      throw new NotFoundException(
        `Orden con ID ${params.id} no encontrada`,
      );
    }

    return {
      data: order,
    };
  }

  /**
   * Obtiene todas las órdenes del usuario (historial)
   */
  async getUserOrders(
    userId: string,
    query: GetOrdersQuery,
  ): Promise<OrdersListResponse> {
    const { orders, total } = await this.ordersRepository.findAllForUser(
      userId,
      query,
    );
    const { page, limit } = query;
    const totalPages = Math.ceil(total / limit);

    return {
      data: orders,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }
}




