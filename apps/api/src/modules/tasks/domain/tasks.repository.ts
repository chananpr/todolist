export interface TaskListItem {
  id: number;
  taskCode: string;
  title: string;
  boardColumn: string;
  priority: string;
  dueDate: string;
  assignees: string[];
}

export class TasksRepository {
  async list() {
    const items: TaskListItem[] = [
      {
        id: 1,
        taskCode: 'TSK-50001',
        title: 'Build task audit event stream',
        boardColumn: 'in_progress',
        priority: 'high',
        dueDate: '2026-04-22T18:00:00+07:00',
        assignees: ['Platform', 'Security']
      }
    ];

    return items;
  }
}
