import { z } from 'zod';
import { ProjectsRepository, type ProjectListItem } from './projects.repository.js';

const createProjectSchema = z.object({
  projectName: z.string().trim().min(1).max(200),
  statusCode: z.string().trim().min(1).max(30).optional(),
  priority: z.string().trim().min(1).max(20).optional(),
  progressPercent: z.number().min(0).max(100).optional(),
  dueDate: z.string().date().nullable().optional()
});

const FALLBACK_PROJECTS: ProjectListItem[] = [
  {
    id: 1,
    projectCode: 'PRJ-00001',
    projectName: 'Phoenix launch 2026',
    status: 'active',
    priority: 'high',
    progressPercent: 72,
    dueDate: '2026-06-30'
  },
  {
    id: 2,
    projectCode: 'PRJ-00002',
    projectName: 'Atlas migration',
    status: 'active',
    priority: 'urgent',
    progressPercent: 44,
    dueDate: '2026-05-15'
  },
  {
    id: 3,
    projectCode: 'PRJ-00003',
    projectName: 'Northstar analytics',
    status: 'active',
    priority: 'medium',
    progressPercent: 58,
    dueDate: '2026-07-22'
  },
  {
    id: 4,
    projectCode: 'PRJ-00004',
    projectName: 'Ops resilience hardening',
    status: 'active',
    priority: 'medium',
    progressPercent: 81,
    dueDate: '2026-04-30'
  },
  {
    id: 5,
    projectCode: 'PRJ-00005',
    projectName: 'Customer onboarding v2',
    status: 'draft',
    priority: 'low',
    progressPercent: 12,
    dueDate: '2026-09-10'
  }
];

export class ProjectsService {
  constructor(private readonly repository: ProjectsRepository) {}

  async listProjects(): Promise<ProjectListItem[]> {
    try {
      return await this.repository.list();
    } catch {
      return FALLBACK_PROJECTS;
    }
  }

  createProject(input: unknown) {
    const payload = createProjectSchema.parse(input);
    return this.repository.create(payload);
  }
}
