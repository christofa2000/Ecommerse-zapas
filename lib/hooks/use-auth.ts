"use client";

/**
 * Hook simple para manejar el estado de autenticación
 * 
 * TODO: Migrar a cookies httpOnly para mayor seguridad
 * - El token JWT actualmente se guarda en localStorage (vulnerable a XSS)
 * - Objetivo final: usar cookies httpOnly con Server Actions o Route Handlers
 * - Esto requiere:
 *   1. Crear Route Handler en Next.js que haga login y setee cookie httpOnly
 *   2. Usar Server Actions para obtener el usuario desde el servidor
 *   3. Eliminar el uso de localStorage para el token
 * 
 * Tradeoff actual (localStorage):
 * - ✅ Simple de implementar
 * - ✅ Funciona en Client Components
 * - ❌ Vulnerable a XSS (scripts maliciosos pueden leer el token)
 * - ❌ No se puede acceder desde Server Components
 * 
 * Solución futura (cookies httpOnly):
 * - ✅ Seguro contra XSS (cookie no accesible desde JavaScript)
 * - ✅ Accesible desde Server Components
 * - ✅ Mejor para SSR y SEO
 * - ❌ Requiere más configuración (Route Handlers, Server Actions)
 */

import { useState, useEffect, useCallback } from 'react';
import type { AuthUser } from '@/lib/api/auth';

const TOKEN_STORAGE_KEY = 'auth_token';
const USER_STORAGE_KEY = 'auth_user';

/**
 * Hook para manejar autenticación
 */
export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar token y usuario desde localStorage al montar
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as AuthUser);
      } catch {
        // Si hay error parseando, limpiar
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  /**
   * Guarda el token y usuario en localStorage
   */
  const setAuth = useCallback((newToken: string, newUser: AuthUser) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  /**
   * Limpia el token y usuario (logout)
   */
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  /**
   * Verifica si el usuario está autenticado
   */
  const isAuthenticated = token !== null && user !== null;

  return {
    token,
    user,
    isLoading,
    isAuthenticated,
    setAuth,
    logout,
  };
}




