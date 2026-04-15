import type { Request, Response } from 'express';
import { ok } from '../../shared/http/api-response.js';

export class HealthController {
  getHealth(req: Request, res: Response) {
    return res.json(
      ok(
        {
          status: 'ok',
          service: 'taskforge-api',
          timestamp: new Date().toISOString()
        },
        req.requestId
      )
    );
  }
}
