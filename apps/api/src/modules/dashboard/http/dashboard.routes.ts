import { Router } from 'express';
import { DashboardController } from './dashboard.controller.js';
import { DashboardService } from '../domain/dashboard.service.js';

const controller = new DashboardController(new DashboardService());

export const dashboardRouter = Router();
dashboardRouter.get('/overview', controller.getOverview.bind(controller));
