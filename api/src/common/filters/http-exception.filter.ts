import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';
    let errors: unknown = undefined;

    // Manejar errores de Zod (validación)
    if (exception instanceof ZodError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Error de validación';
      errors = exception.issues.map((err: ZodIssue) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
    }
    // Manejar excepciones HTTP de NestJS
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message = (responseObj.message as string) || message;
        errors = responseObj.errors;
      }
    }
    // Manejar otros errores
    else if (exception instanceof Error) {
      message = exception.message;
    }

    // Log del error (en producción, usar un logger apropiado)
    if (status >= 500) {
      console.error('Error interno:', {
        path: request.url,
        method: request.method,
        error: exception instanceof Error ? exception.stack : exception,
      });
    }

    response.status(status).json({
      statusCode: status,
      message,
      ...(errors ? { errors } : {}),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}



