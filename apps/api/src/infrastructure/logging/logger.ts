import pino from 'pino';
import { env } from '../../config/env.js';

export const logger = pino({
  name: env.APP_NAME,
  level: env.NODE_ENV === 'production' ? 'info' : 'debug'
});
