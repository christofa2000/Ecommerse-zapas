import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import type { Order, OrderItem, GetOrdersQuery } from './orders.schemas';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea una nueva orden con sus items
   */
  async createOrder(data: {
    userId: string;
    total: number;
    shippingAddress?: string | null;
    paymentMethod?: string | null;
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>;
  }): Promise<Order> {
    // Crear orden con items en una transacción
    const order = await this.prisma.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Transformar a formato de respuesta
    return this.mapOrderToResponse(order);
  }

  /**
   * Busca una orden por ID que pertenezca al usuario
   */
  async findByIdForUser(orderId: string, userId: string): Promise<Order | null> {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return null;
    }

    return this.mapOrderToResponse(order);
  }

  /**
   * Obtiene todas las órdenes de un usuario con paginación
   */
  async findAllForUser(
    userId: string,
    query: GetOrdersQuery,
  ): Promise<{ orders: Order[]; total: number }> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where: {
          userId,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.order.count({
        where: {
          userId,
        },
      }),
    ]);

    return {
      orders: orders.map((order) => this.mapOrderToResponse(order)),
      total,
    };
  }

  /**
   * Busca múltiples productos por IDs
   */
  async findProductsByIds(productIds: string[]): Promise<
    Array<{
      id: string;
      price: number;
      isActive: boolean;
      name: string;
    }>
  > {
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        price: true,
        isActive: true,
        name: true,
      },
    });

    return products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));
  }

  /**
   * Mapea una orden de Prisma al formato de respuesta
   */
  private mapOrderToResponse(order: Prisma.OrderGetPayload<{
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true;
            };
          };
        };
      };
    };
  }>): Order {
    return {
      id: order.id,
      userId: order.userId,
      status: order.status,
      total: Number(order.total),
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        price: Number(item.price),
        createdAt: item.createdAt,
      })),
    };
  }
}




