import type { Request, Response } from 'express';
import { ok } from '../../../shared/http/api-response.js';
import { TasksService } from '../domain/tasks.service.js';

export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  async list(req: Request, res: Response) {
    const items = await this.tasksService.listTasks();
    return res.json(ok({ items }, req.requestId));
  }

  async today(req: Request, res: Response) {
    const items = await this.tasksService.listTasksDueToday();
    return res.json(ok({ items, mode: 'today' }, req.requestId));
  }
}
