import type { Request, Response } from 'express';
import { ok } from '../../../shared/http/api-response.js';
import { AiPlannerService } from '../domain/ai-planner.service.js';

export class AiController {
  constructor(private readonly aiPlannerService: AiPlannerService) {}

  generateProjectPlan(req: Request, res: Response) {
    const projectId = Number(req.params.id);
    const plan = this.aiPlannerService.generateDraftPlan(projectId);
    return res.json(ok({ projectId, mode: 'draft', plan }, req.requestId));
  }
}
