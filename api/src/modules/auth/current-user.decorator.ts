import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthUser } from './auth.schemas';

/**
 * Decorador para extraer el usuario autenticado del request
 * 
 * Uso:
 * @Get('profile')
 * async getProfile(@CurrentUser() user: AuthUser) {
 *   // user contiene los datos del usuario autenticado
 * }
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthUser }>();
    const user = request.user;

    if (!user) {
      throw new Error('Usuario no encontrado en el request. Asegúrate de usar @UseGuards(JwtAuthGuard)');
    }

    return user;
  },
);




