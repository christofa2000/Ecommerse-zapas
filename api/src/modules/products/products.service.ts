import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import type {
  GetProductsQuery,
  GetProductParams,
  ProductsListResponse,
  ProductDetailResponse,
} from './products.schemas';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(query: GetProductsQuery): Promise<ProductsListResponse> {
    const { products, total } = await this.productsRepository.findMany(query);
    const { page, limit } = query;
    const totalPages = Math.ceil(total / limit);

    return {
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findOne(params: GetProductParams): Promise<ProductDetailResponse> {
    const product = await this.productsRepository.findOne(params.id);

    if (!product) {
      throw new NotFoundException(`Producto con ID ${params.id} no encontrado`);
    }

    return {
      data: product,
    };
  }

  async findBySlug(slug: string): Promise<ProductDetailResponse> {
    const product = await this.productsRepository.findOneBySlug(slug);

    if (!product) {
      throw new NotFoundException(`Producto con slug "${slug}" no encontrado`);
    }

    return {
      data: product,
    };
  }
}






