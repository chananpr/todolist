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
