import { TasksRepository } from './tasks.repository.js';

export class TasksService {
  constructor(private readonly repository: TasksRepository) {}

  listTasks() {
    return this.repository.list();
  }
}
