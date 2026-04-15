import { createApp } from '../app/create-app.js';
import { env } from '../config/env.js';
import { sequelize } from '../infrastructure/database/sequelize.js';
import { logger } from '../infrastructure/logging/logger.js';

const app = createApp();

async function bootstrap() {
  await sequelize.authenticate();
  logger.info('MySQL connection established');

  app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, 'TaskForge API listening');
  });
}

bootstrap().catch((error) => {
  logger.error({ err: error }, 'Failed to bootstrap API');
  process.exit(1);
});
