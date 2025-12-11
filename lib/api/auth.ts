/**
 * Helpers para interactuar con la API de autenticación del backend
 */

import { apiFetch } from './client';

/**
 * Tipo de usuario autenticado (alineado con la respuesta del backend)
 */
export interface AuthUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * Input para registro
 */
export interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Respuesta de registro
 */
export interface RegisterResponse {
  user: AuthUser;
}

/**
 * Input para login
 */
export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Respuesta de login
 */
export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

/**
 * Respuesta de perfil
 */
export interface ProfileResponse {
  data: AuthUser;
}

/**
 * Registra un nuevo usuario
 * 
 * @param input - Datos del usuario a registrar
 * @returns Datos del usuario registrado
 * @throws Error si el email ya existe o hay un error de validación
 */
export async function register(input: RegisterInput): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: input,
  });
}

/**
 * Autentica un usuario y obtiene el token JWT
 * 
 * @param input - Credenciales de login
 * @returns Token de acceso y datos del usuario
 * @throws Error si las credenciales son inválidas
 */
export async function login(input: LoginInput): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: input,
  });
}

/**
 * Obtiene el perfil del usuario autenticado
 * 
 * @param accessToken - Token JWT del usuario
 * @returns Datos del perfil del usuario
 * @throws Error si el token es inválido o expirado
 */
export async function getProfile(accessToken: string): Promise<ProfileResponse> {
  return apiFetch<ProfileResponse>('/auth/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}




