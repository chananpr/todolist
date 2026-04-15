export const PROJECT_STATUSES = ['draft', 'active', 'completed', 'cancelled'] as const;
export const TASK_STATUSES = ['backlog', 'todo', 'in_progress', 'review', 'done', 'blocked', 'cancelled'] as const;
export const TASK_BOARD_COLUMNS = ['backlog', 'todo', 'in_progress', 'review', 'done', 'cancelled'] as const;
export const SUBTASK_STATUSES = ['todo', 'in_progress', 'done', 'cancelled'] as const;
export const PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;
