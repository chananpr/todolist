import {
  PROJECT_STATUSES,
  TASK_BOARD_COLUMNS,
  PRIORITIES,
  type ProjectStatus,
  type TaskBoardColumn,
  type Priority
} from '@taskforge/contracts';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface Project {
  id: string;
  code: string;
  name: string;
  status: ProjectStatus;
  owner: { name: string; initial: string };
  team: { name: string; initial: string }[];
  progress: number; // 0-100
  dueDate: string; // ISO date
  risk: RiskLevel;
  summary: string;
}

export interface Task {
  id: string;
  projectId: string;
  taskCode: string;
  title: string;
  status: TaskBoardColumn;
  priority: Priority;
  assignee: { name: string; initial: string };
  dueDate: string | null;
}

export const PROJECTS: Project[] = [
  {
    id: 'phoenix-2026',
    code: 'PHX',
    name: 'Phoenix launch 2026',
    status: 'active',
    owner: { name: 'Alex Rivera', initial: 'AR' },
    team: [
      { name: 'Alex Rivera', initial: 'AR' },
      { name: 'Mika Chen', initial: 'MC' },
      { name: 'Priya N.', initial: 'PN' },
      { name: 'Jordan Lee', initial: 'JL' }
    ],
    progress: 72,
    dueDate: '2026-06-30',
    risk: 'medium',
    summary: 'Ship multi-tenant workspace routing and billing gate for the Phoenix release.'
  },
  {
    id: 'atlas-migration',
    code: 'ATL',
    name: 'Atlas migration',
    status: 'active',
    owner: { name: 'Mika Chen', initial: 'MC' },
    team: [
      { name: 'Mika Chen', initial: 'MC' },
      { name: 'Ravi P.', initial: 'RP' },
      { name: 'Sofia M.', initial: 'SM' }
    ],
    progress: 44,
    dueDate: '2026-05-15',
    risk: 'high',
    summary: 'Move legacy Atlas services to the new event pipeline without downtime.'
  },
  {
    id: 'northstar-analytics',
    code: 'NST',
    name: 'Northstar analytics',
    status: 'active',
    owner: { name: 'Priya N.', initial: 'PN' },
    team: [
      { name: 'Priya N.', initial: 'PN' },
      { name: 'Jordan Lee', initial: 'JL' }
    ],
    progress: 58,
    dueDate: '2026-07-22',
    risk: 'low',
    summary: 'Executive KPI dashboard with narrative context and drill-downs.'
  },
  {
    id: 'ops-resilience',
    code: 'OPS',
    name: 'Ops resilience hardening',
    status: 'active',
    owner: { name: 'Jordan Lee', initial: 'JL' },
    team: [
      { name: 'Jordan Lee', initial: 'JL' },
      { name: 'Alex Rivera', initial: 'AR' }
    ],
    progress: 81,
    dueDate: '2026-04-30',
    risk: 'low',
    summary: 'Incident runbook automation + synthetic monitoring for tier-1 surfaces.'
  },
  {
    id: 'customer-onboard-v2',
    code: 'CO2',
    name: 'Customer onboarding v2',
    status: 'draft',
    owner: { name: 'Sofia M.', initial: 'SM' },
    team: [
      { name: 'Sofia M.', initial: 'SM' },
      { name: 'Ravi P.', initial: 'RP' }
    ],
    progress: 12,
    dueDate: '2026-09-10',
    risk: 'medium',
    summary: 'Rewrite onboarding funnel with contextual checklists and usage signals.'
  },
  {
    id: 'archive-sunset',
    code: 'ARC',
    name: 'Archive sunset',
    status: 'completed',
    owner: { name: 'Ravi P.', initial: 'RP' },
    team: [
      { name: 'Ravi P.', initial: 'RP' },
      { name: 'Mika Chen', initial: 'MC' }
    ],
    progress: 100,
    dueDate: '2026-03-20',
    risk: 'low',
    summary: 'Decommission legacy archive service and migrate read-path consumers.'
  }
];

/** A decent spread of tasks across phoenix-2026 + atlas-migration so the board feels alive. */
export const TASKS: Task[] = [
  // Phoenix launch tasks
  task('phoenix-2026', 'PHX-101', 'Design tenant routing layer', 'in_progress', 'high', 'AR', '2026-05-02'),
  task('phoenix-2026', 'PHX-102', 'Stripe billing webhook handler', 'review', 'high', 'MC', '2026-05-06'),
  task('phoenix-2026', 'PHX-103', 'Draft upgrade comms plan', 'backlog', 'medium', 'PN', null),
  task('phoenix-2026', 'PHX-104', 'Feature flag kill switch UI', 'todo', 'medium', 'JL', '2026-05-12'),
  task('phoenix-2026', 'PHX-105', 'Load test routing under 50k tenants', 'todo', 'urgent', 'AR', '2026-05-04'),
  task('phoenix-2026', 'PHX-106', 'Update API rate limits for enterprise tier', 'in_progress', 'medium', 'MC', '2026-05-10'),
  task('phoenix-2026', 'PHX-107', 'Migration guide for self-hosted customers', 'review', 'medium', 'PN', '2026-05-18'),
  task('phoenix-2026', 'PHX-108', 'Legacy endpoint deprecation notice', 'done', 'low', 'JL', '2026-04-20'),
  task('phoenix-2026', 'PHX-109', 'Admin console audit log filter', 'backlog', 'low', 'AR', null),
  task('phoenix-2026', 'PHX-110', 'Billing plan comparison page refresh', 'todo', 'medium', 'PN', '2026-05-25'),

  // Atlas migration
  task('atlas-migration', 'ATL-201', 'Dual-write event producer', 'in_progress', 'urgent', 'MC', '2026-04-25'),
  task('atlas-migration', 'ATL-202', 'Shadow-read validation harness', 'review', 'high', 'RP', '2026-04-28'),
  task('atlas-migration', 'ATL-203', 'Cutover rollback runbook', 'backlog', 'high', 'SM', null),
  task('atlas-migration', 'ATL-204', 'Atlas client SDK version freeze', 'todo', 'medium', 'MC', '2026-05-02'),

  // Northstar + Ops spread
  task('northstar-analytics', 'NST-301', 'Wire TimescaleDB writer', 'in_progress', 'high', 'PN', '2026-05-30'),
  task('northstar-analytics', 'NST-302', 'KPI drilldown component', 'todo', 'medium', 'JL', null),
  task('ops-resilience', 'OPS-401', 'Synthetic login probe', 'done', 'medium', 'JL', '2026-04-10'),
  task('ops-resilience', 'OPS-402', 'Incident drill Q2', 'done', 'low', 'AR', '2026-04-15')
];

function task(
  projectId: string,
  taskCode: string,
  title: string,
  status: TaskBoardColumn,
  priority: Priority,
  initial: string,
  dueDate: string | null
): Task {
  const nameByInitial: Record<string, string> = {
    AR: 'Alex Rivera',
    MC: 'Mika Chen',
    PN: 'Priya N.',
    JL: 'Jordan Lee',
    SM: 'Sofia M.',
    RP: 'Ravi P.'
  };
  return {
    id: taskCode.toLowerCase(),
    projectId,
    taskCode,
    title,
    status,
    priority,
    assignee: { name: nameByInitial[initial] ?? initial, initial },
    dueDate
  };
}

export function findProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function tasksForProject(projectId: string): Task[] {
  return TASKS.filter((t) => t.projectId === projectId);
}

export { TASK_BOARD_COLUMNS, PROJECT_STATUSES, PRIORITIES };
