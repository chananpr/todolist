import { Router } from 'express';
import { TasksController } from './tasks.controller.js';
import { TasksRepository } from '../domain/tasks.repository.js';
import { TasksService } from '../domain/tasks.service.js';
import { asyncHandler } from '../../../shared/utils/async-handler.js';

const controller = new TasksController(new TasksService(new TasksRepository()));

export const tasksRouter = Router();
tasksRouter.get('/', asyncHandler(controller.list.bind(controller)));
tasksRouter.get('/today', asyncHandler(controller.today.bind(controller)));
