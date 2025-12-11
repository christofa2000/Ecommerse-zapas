import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import type { GetProductsQuery, Product } from './products.schemas';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(query: GetProductsQuery): Promise<{ products: Product[]; total: number }> {
    const { page, limit, category, brand, minPrice, maxPrice, size, color, search } = query;
    const skip = (page - 1) * limit;

    // Construir filtros dinámicos
    const where: Prisma.ProductWhereInput = {
      isActive: true,
    };

    if (category) {
      where.category = category;
    }

    if (brand) {
      where.brand = brand;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }

    if (size) {
      where.sizes = {
        has: size,
      };
    }

    if (color) {
      where.colors = {
        has: color,
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    // Convertir Decimal a number para la respuesta
    const productsWithNumberPrice = products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));

    return {
      products: productsWithNumberPrice as Product[],
      total,
    };
  }

  async findOne(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return null;
    }

    // Convertir Decimal a number
    return {
      ...product,
      price: Number(product.price),
    } as Product;
  }

  async findOneBySlug(slug: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return null;
    }

    // Convertir Decimal a number
    return {
      ...product,
      price: Number(product.price),
    } as Product;
  }
}






