import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../errors/http-error.js';
import { logger } from '../../infrastructure/logging/logger.js';

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(422).json({
      error: 'validation_error',
      message: 'Request validation failed',
      details: err.flatten(),
      requestId: req.requestId
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: 'http_error',
      message: err.message,
      details: err.details,
      requestId: req.requestId
    });
  }

  logger.error({ err, requestId: req.requestId }, 'Unhandled API error');
  return res.status(500).json({
    error: 'internal_server_error',
    message: 'Unexpected server error',
    requestId: req.requestId
  });
}
