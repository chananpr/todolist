import type { Request, Response } from 'express';
import { ok } from '../../../shared/http/api-response.js';
import { DashboardService } from '../domain/dashboard.service.js';

export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  getOverview(req: Request, res: Response) {
    return res.json(ok({ metrics: this.dashboardService.getOverview() }, req.requestId));
  }
}
