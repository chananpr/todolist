export const PROJECT_STATUSES = ['draft', 'active', 'completed', 'cancelled'] as const;
export const TASK_STATUSES = ['backlog', 'todo', 'in_progress', 'review', 'done', 'blocked', 'cancelled'] as const;
export const TASK_BOARD_COLUMNS = ['backlog', 'todo', 'in_progress', 'review', 'done', 'cancelled'] as const;
export const SUBTASK_STATUSES = ['todo', 'in_progress', 'done', 'cancelled'] as const;
export const PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;

export type ProjectStatus = typeof PROJECT_STATUSES[number];
export type TaskStatus = typeof TASK_STATUSES[number];
export type TaskBoardColumn = typeof TASK_BOARD_COLUMNS[number];
export type SubtaskStatus = typeof SUBTASK_STATUSES[number];
export type Priority = typeof PRIORITIES[number];
