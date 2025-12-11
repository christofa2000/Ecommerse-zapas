import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { registerSchema, loginSchema, type RegisterInput, type LoginInput, type AuthUser } from './auth.schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: unknown) {
    // Validar input con Zod
    const validatedInput = registerSchema.parse(body) as RegisterInput;
    return this.authService.register(validatedInput);
  }

  @Post('login')
  async login(@Body() body: unknown) {
    // Validar input con Zod
    const validatedInput = loginSchema.parse(body) as LoginInput;
    return this.authService.login(validatedInput);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: AuthUser) {
    // El usuario ya viene completo desde el guard (JwtStrategy)
    // Devolvemos directamente el perfil
    return this.authService.getProfile(user.id);
  }
}

