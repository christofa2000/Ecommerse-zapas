import { z } from 'zod';

// Schema para registro de usuario
export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  firstName: z.string().min(1, 'El nombre es requerido').optional(),
  lastName: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

// Schema para login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Tipo para respuesta de registro/login (sin password)
export type AuthUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// Tipo para respuesta de login (incluye token)
export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

// Tipo para respuesta de registro
export type RegisterResponse = {
  user: AuthUser;
};

// Tipo para respuesta de perfil
export type ProfileResponse = {
  data: AuthUser;
};




