import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './auth.repository';
import type { AuthUser } from './auth.schemas';

/**
 * Payload del JWT (lo que se guarda en el token)
 */
export interface JwtPayload {
  sub: string; // User ID
  email: string;
}

/**
 * Estrategia JWT para Passport
 * Extrae el token del header Authorization y valida que sea válido
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret-change-in-production',
    });
  }

  /**
   * Valida el payload del JWT y devuelve el usuario completo desde la BD
   * Este método se ejecuta automáticamente cuando el token es válido
   * El resultado se adjunta a request.user
   */
  async validate(payload: JwtPayload): Promise<AuthUser> {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException('Token inválido');
    }

    // Obtener el usuario completo desde la base de datos
    const user = await this.authRepository.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
  }
}

