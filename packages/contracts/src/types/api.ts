export interface ApiMeta {
  requestId?: string;
}

export interface ApiSuccess<T> {
  data: T;
  meta?: ApiMeta;
}

export interface DashboardMetric {
  activeProjects: number;
  dueToday: number;
  overdue: number;
  reviewQueue: number;
}

export interface DashboardBoardCard {
  id: number;
  taskCode: string;
  title: string;
  priority: string;
  progressPercent: number;
  projectId: number;
  dueDate: string | null;
}

export interface DashboardBoardLane {
  key: string;
  title: string;
  count: number;
  cards: DashboardBoardCard[];
}

export interface DashboardLoadItem {
  name: string;
  load: number;
  tasks: number;
}

export interface DashboardOverview {
  metrics: DashboardMetric;
  lanes: DashboardBoardLane[];
  signals: string[];
  load: DashboardLoadItem[];
  recentActivity: string[];
}

export interface ProjectSummary {
  id: number;
  projectCode: string;
  projectName: string;
  status: string;
  priority: string;
  progressPercent: number;
  dueDate: string | null;
}
