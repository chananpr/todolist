export interface ProjectListItem {
  id: number;
  projectCode: string;
  projectName: string;
  status: string;
  priority: string;
  progressPercent: number;
  dueDate: string;
}

export class ProjectsRepository {
  async list(): Promise<ProjectListItem[]> {
    return [
      {
        id: 1,
        projectCode: 'PRJ-24001',
        projectName: 'Enterprise Workflow Rollout',
        status: 'active',
        priority: 'high',
        progressPercent: 64,
        dueDate: '2026-06-30'
      }
    ];
  }
}
