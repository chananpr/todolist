import type { Request, Response } from 'express';
import { ok } from '../../../shared/http/api-response.js';
import { DashboardService } from '../domain/dashboard.service.js';

export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  async getOverview(req: Request, res: Response) {
    const overview = await this.dashboardService.getOverview();
    return res.json(ok(overview, req.requestId));
  }
}
