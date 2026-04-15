import type { Request, Response } from 'express';
import { ok } from '../../shared/http/api-response.js';
import { databaseRuntimeState } from '../../infrastructure/database/runtime-state.js';

export class HealthController {
  getHealth(req: Request, res: Response) {
    return res.json(
      ok(
        {
          status: databaseRuntimeState.degraded ? 'degraded' : 'ok',
          service: 'taskforge-api',
          timestamp: new Date().toISOString(),
          database: {
            connected: databaseRuntimeState.connected,
            degraded: databaseRuntimeState.degraded,
            checkedAt: databaseRuntimeState.checkedAt,
            lastError: databaseRuntimeState.lastError
          }
        },
        req.requestId
      )
    );
  }
}
