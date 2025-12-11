import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
// Módulos de dominio (se implementarán en siguientes iteraciones)
// import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    HealthModule,
    ProductsModule,
    AuthModule,
    OrdersModule,
    // UsersModule,
  ],
})
export class AppModule {}

