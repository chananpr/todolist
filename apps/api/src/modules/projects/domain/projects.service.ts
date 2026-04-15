import { ProjectsRepository } from './projects.repository.js';

export class ProjectsService {
  constructor(private readonly repository: ProjectsRepository) {}

  listProjects() {
    return this.repository.list();
  }
}
