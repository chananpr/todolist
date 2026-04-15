import { Router } from 'express';
import { ProjectsController } from './projects.controller.js';
import { ProjectsRepository } from '../domain/projects.repository.js';
import { ProjectsService } from '../domain/projects.service.js';
import { asyncHandler } from '../../../shared/utils/async-handler.js';
import { requirePermission } from '../../../shared/middlewares/require-permission.js';

const controller = new ProjectsController(new ProjectsService(new ProjectsRepository()));

export const projectsRouter = Router();
projectsRouter.get('/', asyncHandler(controller.list.bind(controller)));
projectsRouter.post('/', requirePermission('project.create'), asyncHandler(controller.create.bind(controller)));
