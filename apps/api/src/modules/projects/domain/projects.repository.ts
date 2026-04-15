import { Project } from './project.model.js';

export interface ProjectListItem {
  id: number;
  projectCode: string;
  projectName: string;
  status: string;
  priority: string;
  progressPercent: number;
  dueDate: string | null;
}

export interface CreateProjectInput {
  projectName: string;
  statusCode?: string;
  priority?: string;
  progressPercent?: number;
  dueDate?: string | null;
}

export class ProjectsRepository {
  async list(): Promise<ProjectListItem[]> {
    const projects = await Project.findAll({
      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC']
      ]
    });

    return projects.map((project) => ({
      id: project.id,
      projectCode: project.projectCode,
      projectName: project.projectName,
      status: project.statusCode,
      priority: project.priority,
      progressPercent: Number(project.progressPercent),
      dueDate: project.dueDate ? new Date(project.dueDate).toISOString().slice(0, 10) : null
    }));
  }

  async create(input: CreateProjectInput): Promise<ProjectListItem> {
    const latestProject = await Project.findOne({
      order: [['id', 'DESC']]
    });
    const nextSequence = (latestProject?.id ?? 0) + 1;

    const project = await Project.create({
      projectCode: `PRJ-${String(nextSequence).padStart(5, '0')}`,
      projectName: input.projectName,
      statusCode: input.statusCode ?? 'draft',
      priority: input.priority ?? 'medium',
      progressPercent: input.progressPercent ?? 0,
      dueDate: input.dueDate ? new Date(input.dueDate) : null
    });

    return {
      id: project.id,
      projectCode: project.projectCode,
      projectName: project.projectName,
      status: project.statusCode,
      priority: project.priority,
      progressPercent: Number(project.progressPercent),
      dueDate: project.dueDate ? new Date(project.dueDate).toISOString().slice(0, 10) : null
    };
  }
}
