import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { AuthUser } from './auth.schemas';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca un usuario por email
   */
  async findByEmail(email: string): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        phone: true,
        address: true,
        city: true,
        country: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return null;
    }

    // Excluir password del resultado
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as AuthUser;
  }

  /**
   * Busca un usuario por email incluyendo password (para validación en login)
   */
  async findByEmailWithPassword(email: string): Promise<{ id: string; email: string; password: string } | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    return user;
  }

  /**
   * Crea un nuevo usuario
   */
  async create(data: {
    email: string;
    password: string;
    firstName?: string | null;
    lastName?: string | null;
  }): Promise<AuthUser> {
    const user = await this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        address: true,
        city: true,
        country: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user as AuthUser;
  }

  /**
   * Busca un usuario por ID (para perfil)
   */
  async findById(id: string): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        address: true,
        city: true,
        country: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user as AuthUser;
  }
}




