import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './auth.repository';
import type {
  RegisterInput,
  LoginInput,
  RegisterResponse,
  LoginResponse,
  ProfileResponse,
  AuthUser,
} from './auth.schemas';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Registra un nuevo usuario
   * TODO: Implementar lógica de registro
   */
  async register(input: RegisterInput): Promise<RegisterResponse> {
    // Verificar si el email ya existe
    const existingUser = await this.authRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Crear usuario
    const user = await this.authRepository.create({
      email: input.email,
      password: hashedPassword,
      firstName: input.firstName ?? null,
      lastName: input.lastName ?? null,
    });

    return {
      user,
    };
  }

  /**
   * Autentica un usuario y devuelve JWT
   * TODO: Implementar lógica de login
   */
  async login(input: LoginInput): Promise<LoginResponse> {
    // Buscar usuario con password
    const userWithPassword = await this.authRepository.findByEmailWithPassword(input.email);
    if (!userWithPassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(input.password, userWithPassword.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Obtener datos completos del usuario (sin password)
    const user = await this.authRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Error al obtener datos del usuario');
    }

    // Generar JWT
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user,
    };
  }

  /**
   * Obtiene el perfil del usuario autenticado
   * TODO: Implementar lógica de perfil
   */
  async getProfile(userId: string): Promise<ProfileResponse> {
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return {
      data: user,
    };
  }
}




