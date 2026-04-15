import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from '../config/env.js';
import { logger } from '../infrastructure/logging/logger.js';
import { registerRoutes } from './register-routes.js';
import { requestContext } from '../shared/http/request-context.js';
import { mockAuth } from '../shared/middlewares/mock-auth.js';
import { errorHandler } from '../shared/middlewares/error-handler.js';
import { notFoundHandler } from '../shared/middlewares/not-found-handler.js';
import { ok } from '../shared/http/api-response.js';

export function createApp() {
  const app = express();

  app.use(requestContext);
  app.use((req, _res, next) => {
    logger.info(
      {
        requestId: req.requestId,
        method: req.method,
        path: req.path
      },
      'Incoming request'
    );
    next();
  });
  app.use(
    cors({
      origin: env.WEB_ORIGIN,
      credentials: true
    })
  );
  app.use(helmet());
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(mockAuth);

  app.get('/', (req, res) => {
    res.json(
      ok(
        {
          name: env.APP_NAME,
          version: '0.1.0',
          apiBasePath: '/api/v1'
        },
        req.requestId
      )
    );
  });

  app.use('/api/v1', registerRoutes());
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
