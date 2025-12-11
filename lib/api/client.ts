/**
 * Cliente de API reutilizable para comunicarse con el backend NestJS
 * 
 * TODO: Para autenticación con cookies httpOnly:
 * - Crear Route Handlers en Next.js que actúen como proxy
 * - Los Route Handlers pueden setear cookies httpOnly
 * - Los Server Components pueden leer cookies directamente
 * - Esto elimina la necesidad de pasar tokens manualmente
 * 
 * Nota: Para endpoints que requieren autenticación, el token debe pasarse
 * en el header Authorization: Bearer <token>
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Opciones de fetch para Server Components
 */
interface ApiFetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  revalidate?: number; // Para Next.js revalidation
}

/**
 * Realiza una petición fetch al backend con manejo de errores
 * 
 * @param path - Ruta relativa del endpoint (ej: '/products')
 * @param options - Opciones de fetch (body se serializa automáticamente a JSON)
 * @returns Promise con los datos parseados
 * @throws Error descriptivo si la petición falla
 */
export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { body, revalidate, ...fetchOptions } = options;

  const url = `${API_BASE_URL}${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  const config: RequestInit = {
    ...fetchOptions,
    headers,
    // Para Server Components, usar next revalidation
    next: revalidate ? { revalidate } : undefined,
  };

  // Serializar body a JSON si existe
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      // Intentar parsear el error del backend
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Si no se puede parsear, usar el mensaje por defecto
      }
      throw new Error(errorMessage);
    }

    // Parsear respuesta JSON
    const data = await response.json();
    return data as T;
  } catch (error) {
    // Mejorar mensajes de error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error desconocido al realizar la petición');
  }
}

