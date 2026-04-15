import type { DashboardMetric } from '@taskforge/contracts';

export class DashboardService {
  getOverview(): DashboardMetric {
    return {
      activeProjects: 12,
      dueToday: 18,
      overdue: 7,
      reviewQueue: 9
    };
  }
}
