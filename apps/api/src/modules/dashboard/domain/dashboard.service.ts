import { Op } from 'sequelize';
import type { DashboardBoardLane, DashboardLoadItem, DashboardMetric, DashboardOverview } from '@taskforge/contracts';
import { TASK_BOARD_COLUMNS } from '@taskforge/contracts';
import { Project } from '../../projects/domain/project.model.js';
import { Task } from '../../tasks/domain/task.model.js';
import { Employee } from '../../employees/domain/employee.model.js';

function startOfUtcDay() {
  const value = new Date();
  value.setUTCHours(0, 0, 0, 0);
  return value;
}

function formatLaneTitle(key: string) {
  return key
    .split('_')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export class DashboardService {
  async getOverview(): Promise<DashboardOverview> {
    const todayStart = startOfUtcDay();
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setUTCDate(tomorrowStart.getUTCDate() + 1);

    const [activeProjects, dueToday, overdue, reviewQueue, tasks, latestProjects, latestTasks, latestEmployees] = await Promise.all([
      Project.count({ where: { statusCode: 'active' } }),
      Task.count({
        where: {
          dueDate: {
            [Op.gte]: todayStart,
            [Op.lt]: tomorrowStart
          }
        }
      }),
      Task.count({
        where: {
          dueDate: {
            [Op.lt]: todayStart
          },
          statusCode: {
            [Op.notIn]: ['done', 'cancelled']
          }
        }
      }),
      Task.count({
        where: {
          boardColumnKey: 'review'
        }
      }),
      Task.findAll({
        order: [
          ['createdAt', 'DESC'],
          ['id', 'DESC']
        ]
      }),
      Project.findAll({ order: [['createdAt', 'DESC']], limit: 3 }),
      Task.findAll({ order: [['createdAt', 'DESC']], limit: 3 }),
      Employee.findAll({ order: [['createdAt', 'DESC']], limit: 3 })
    ]);

    const metrics: DashboardMetric = {
      activeProjects,
      dueToday,
      overdue,
      reviewQueue
    };

    const lanes: DashboardBoardLane[] = TASK_BOARD_COLUMNS.map((columnKey) => {
      const columnTasks = tasks.filter((task) => task.boardColumnKey === columnKey);

      return {
        key: columnKey,
        title: formatLaneTitle(columnKey),
        count: columnTasks.length,
        cards: columnTasks.slice(0, 5).map((task) => ({
          id: task.id,
          taskCode: task.taskCode,
          title: task.title,
          priority: task.priority,
          progressPercent: Number(task.progressPercent),
          projectId: task.projectId,
          dueDate: task.dueDate?.toISOString() ?? null
        }))
      };
    });

    const totalTasks = tasks.length;
    const load: DashboardLoadItem[] = lanes
      .filter((lane) => lane.count > 0)
      .map((lane) => ({
        name: lane.title,
        tasks: lane.count,
        load: totalTasks === 0 ? 0 : Math.round((lane.count / totalTasks) * 100)
      }));

    const signals = [
      overdue > 0 ? `${overdue} task${overdue === 1 ? '' : 's'} are overdue and need intervention.` : null,
      reviewQueue > 0 ? `${reviewQueue} task${reviewQueue === 1 ? '' : 's'} are waiting in review.` : null,
      activeProjects === 0 ? 'No active projects found in the database yet.' : null,
      dueToday === 0 ? 'No tasks are due today.' : null
    ].filter((value): value is string => Boolean(value));

    const recentActivity = [
      ...latestProjects.map((project) => ({
        createdAt: project.createdAt.getTime(),
        message: `Project ${project.projectCode} created: ${project.projectName}`
      })),
      ...latestTasks.map((task) => ({
        createdAt: task.createdAt.getTime(),
        message: `Task ${task.taskCode} created in project #${task.projectId}: ${task.title}`
      })),
      ...latestEmployees.map((employee) => ({
        createdAt: employee.createdAt.getTime(),
        message: `Employee ${employee.employeeCode} added: ${employee.firstName} ${employee.lastName}`.trim()
      }))
    ]
      .sort((left, right) => right.createdAt - left.createdAt)
      .slice(0, 6)
      .map((item) => item.message);

    return {
      metrics,
      lanes,
      signals,
      load,
      recentActivity
    };
  }
}
