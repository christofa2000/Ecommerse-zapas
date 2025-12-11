import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthUser } from '../auth/auth.schemas';
import {
  createOrderSchema,
  getOrderParamsSchema,
  getOrdersQuerySchema,
  type CreateOrderInput,
  type GetOrderParams,
  type GetOrdersQuery,
} from './orders.schemas';

@Controller('orders')
@UseGuards(JwtAuthGuard) // Todos los endpoints requieren autenticación
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() body: unknown,
    @CurrentUser() user: AuthUser,
  ) {
    // Validar input con Zod
    const validatedInput = createOrderSchema.parse(body) as CreateOrderInput;
    return this.ordersService.createOrder(user.id, validatedInput);
  }

  @Get(':id')
  async getOrderById(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
  ) {
    // Validar params con Zod
    const validatedParams = getOrderParamsSchema.parse({ id });
    return this.ordersService.getOrderById(user.id, validatedParams);
  }

  @Get()
  async getUserOrders(
    @Query() query: unknown,
    @CurrentUser() user: AuthUser,
  ) {
    // Validar query params con Zod
    const validatedQuery = getOrdersQuerySchema.parse(query) as GetOrdersQuery;
    return this.ordersService.getUserOrders(user.id, validatedQuery);
  }
}




