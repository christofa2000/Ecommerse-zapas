import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  getProductsQuerySchema,
  getProductParamsSchema,
  type GetProductsQuery,
  type GetProductParams,
} from './products.schemas';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query() query: unknown) {
    // Validar y parsear query params con Zod
    const validatedQuery = getProductsQuerySchema.parse(query);
    return this.productsService.findAll(validatedQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Validar params con Zod
    const validatedParams = getProductParamsSchema.parse({ id });
    return this.productsService.findOne(validatedParams);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }
}






