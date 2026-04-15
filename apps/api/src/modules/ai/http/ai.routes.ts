import { Router } from 'express';
import { AiController } from './ai.controller.js';
import { AiPlannerService } from '../domain/ai-planner.service.js';
import { requirePermission } from '../../../shared/middlewares/require-permission.js';

const controller = new AiController(new AiPlannerService());

export const aiRouter = Router();
aiRouter.post('/projects/:id/generate-plan', requirePermission('ai.plan.generate'), controller.generateProjectPlan.bind(controller));
