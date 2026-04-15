import { Router } from 'express';
import { healthRouter } from '../modules/health/health.routes.js';
import { authRouter } from '../modules/auth/http/auth.routes.js';
import { employeesRouter } from '../modules/employees/http/employees.routes.js';
import { projectsRouter } from '../modules/projects/http/projects.routes.js';
import { tasksRouter } from '../modules/tasks/http/tasks.routes.js';
import { aiRouter } from '../modules/ai/http/ai.routes.js';
import { dashboardRouter } from '../modules/dashboard/http/dashboard.routes.js';

export function registerRoutes() {
  const router = Router();

  router.use('/health', healthRouter);
  router.use('/auth', authRouter);
  router.use('/employees', employeesRouter);
  router.use('/projects', projectsRouter);
  router.use('/tasks', tasksRouter);
  router.use('/ai', aiRouter);
  router.use('/dashboard', dashboardRouter);

  return router;
}
