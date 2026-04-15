import { Router } from 'express';
import { DashboardController } from './dashboard.controller.js';
import { DashboardService } from '../domain/dashboard.service.js';
import { asyncHandler } from '../../../shared/utils/async-handler.js';

const controller = new DashboardController(new DashboardService());

export const dashboardRouter = Router();
dashboardRouter.get('/overview', asyncHandler(controller.getOverview.bind(controller)));
