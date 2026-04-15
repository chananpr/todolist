import { createApp } from '../app/create-app.js';
import { env } from '../config/env.js';
import { sequelize } from '../infrastructure/database/sequelize.js';
import { logger } from '../infrastructure/logging/logger.js';
import { databaseRuntimeState } from '../infrastructure/database/runtime-state.js';
import '../infrastructure/database/register-models.js';

const app = createApp();

async function bootstrap() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(env.NODE_ENV === 'production' ? undefined : { alter: true });
    databaseRuntimeState.connected = true;
    databaseRuntimeState.degraded = false;
    databaseRuntimeState.lastError = null;
    databaseRuntimeState.checkedAt = new Date().toISOString();
    logger.info('MySQL connection established');
  } catch (error) {
    databaseRuntimeState.connected = false;
    databaseRuntimeState.degraded = true;
    databaseRuntimeState.lastError = error instanceof Error ? error.message : 'Unknown database error';
    databaseRuntimeState.checkedAt = new Date().toISOString();

    if (env.ALLOW_DEGRADED_START) {
      logger.warn({ err: error }, 'Database unavailable, starting API in degraded mode');
    } else {
      logger.error({ err: error }, 'Failed to bootstrap API');
      process.exit(1);
    }
  }

  app.listen(env.PORT, () => {
    logger.info({ port: env.PORT, degraded: databaseRuntimeState.degraded }, 'TaskForge API listening');
  });
}

bootstrap().catch((error) => {
  logger.error({ err: error }, 'Fatal bootstrap failure');
  process.exit(1);
});
