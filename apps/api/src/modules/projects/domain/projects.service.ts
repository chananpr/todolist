import { z } from 'zod';
import { ProjectsRepository } from './projects.repository.js';

const createProjectSchema = z.object({
  projectName: z.string().trim().min(1).max(200),
  statusCode: z.string().trim().min(1).max(30).optional(),
  priority: z.string().trim().min(1).max(20).optional(),
  progressPercent: z.number().min(0).max(100).optional(),
  dueDate: z.string().date().nullable().optional()
});

export class ProjectsService {
  constructor(private readonly repository: ProjectsRepository) {}

  listProjects() {
    return this.repository.list();
  }

  createProject(input: unknown) {
    const payload = createProjectSchema.parse(input);
    return this.repository.create(payload);
  }
}
