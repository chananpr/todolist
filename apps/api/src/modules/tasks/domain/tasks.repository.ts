import { Op } from 'sequelize';
import { Task } from './task.model.js';

export interface TaskListItem {
  id: number;
  taskCode: string;
  title: string;
  boardColumn: string;
  priority: string;
  dueDate: string | null;
  projectId: number;
  progressPercent: number;
}

export class TasksRepository {
  async list() {
    const tasks = await Task.findAll({
      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC']
      ]
    });

    return tasks.map((task) => ({
      id: task.id,
      taskCode: task.taskCode,
      title: task.title,
      boardColumn: task.boardColumnKey,
      priority: task.priority,
      dueDate: task.dueDate?.toISOString() ?? null,
      projectId: task.projectId,
      progressPercent: Number(task.progressPercent)
    }));
  }

  async listDueToday() {
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);

    const tasks = await Task.findAll({
      where: {
        dueDate: {
          [Op.gte]: start,
          [Op.lt]: end
        }
      },
      order: [
        ['dueDate', 'ASC'],
        ['id', 'ASC']
      ]
    });

    return tasks.map((task) => ({
      id: task.id,
      taskCode: task.taskCode,
      title: task.title,
      boardColumn: task.boardColumnKey,
      priority: task.priority,
      dueDate: task.dueDate?.toISOString() ?? null,
      projectId: task.projectId,
      progressPercent: Number(task.progressPercent)
    }));
  }
}
