import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard JWT que protege rutas requiriendo un token válido
 * 
 * Uso:
 * @UseGuards(JwtAuthGuard)
 * @Get('profile')
 * async getProfile(@CurrentUser() user: AuthUser) { ... }
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Maneja errores de autenticación
   */
  handleRequest<TUser = unknown>(
    err: Error | null,
    user: TUser | false,
    info: Error | string | undefined,
  ): TUser {
    if (err || !user || info) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
    return user;
  }
}

