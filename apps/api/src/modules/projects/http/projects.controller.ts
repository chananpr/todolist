import type { Request, Response } from 'express';
import { ok } from '../../../shared/http/api-response.js';
import { ProjectsService } from '../domain/projects.service.js';

export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  async list(req: Request, res: Response) {
    const items = await this.projectsService.listProjects();
    return res.json(ok({ items }, req.requestId));
  }

  async create(req: Request, res: Response) {
    const project = await this.projectsService.createProject(req.body);
    return res.status(201).json(ok({ project }, req.requestId));
  }
}
