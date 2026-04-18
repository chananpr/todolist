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

export interface Subtask {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
}

export interface Comment {
  id: string;
  author: { name: string; initial: string };
  body: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  event: string;
  actor: string;
  at: string;
}

export interface Task {
  id: string;
  projectId: string;
  taskCode: string;
  title: string;
  description?: string;
  status: TaskBoardColumn;
  priority: Priority;
  assignee: { name: string; initial: string };
  dueDate: string | null;
  subtasks?: Subtask[];
  comments?: Comment[];
  activity?: Activity[];
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
  task('phoenix-2026', 'PHX-101', 'Design tenant routing layer', 'in_progress', 'high', 'AR', '2026-05-02', {
    description: 'Design and implement the tenant routing layer that maps incoming requests to the correct tenant workspace based on subdomain or path prefix.',
    subtasks: [
      { id: 'st-1', title: 'Define routing resolution strategy', status: 'done' },
      { id: 'st-2', title: 'Implement subdomain-to-tenant mapper', status: 'in_progress' },
      { id: 'st-3', title: 'Add path-prefix fallback resolver', status: 'in_progress' },
      { id: 'st-4', title: 'Write integration tests for multi-tenant routing', status: 'todo' }
    ],
    comments: [
      { id: 'c-1', author: { name: 'Mika Chen', initial: 'MC' }, body: 'Should we support custom domains in v1 or defer to a follow-up?', createdAt: '2026-04-14T10:30:00Z' },
      { id: 'c-2', author: { name: 'Alex Rivera', initial: 'AR' }, body: 'Custom domains deferred to v1.1 — let\'s keep scope tight for launch.', createdAt: '2026-04-14T14:15:00Z' },
      { id: 'c-3', author: { name: 'Priya N.', initial: 'PN' }, body: 'Added a spike for wildcard cert provisioning in the backlog.', createdAt: '2026-04-15T09:00:00Z' }
    ],
    activity: [
      { id: 'a-1', event: 'status_changed: todo → in_progress', actor: 'Alex Rivera', at: '2026-04-10T08:00:00Z' },
      { id: 'a-2', event: 'assigned to Alex Rivera', actor: 'Priya N.', at: '2026-04-09T16:00:00Z' },
      { id: 'a-3', event: 'priority_changed: medium → high', actor: 'Alex Rivera', at: '2026-04-11T11:30:00Z' },
      { id: 'a-4', event: 'commented', actor: 'Mika Chen', at: '2026-04-14T10:30:00Z' },
      { id: 'a-5', event: 'subtask completed: Define routing resolution strategy', actor: 'Alex Rivera', at: '2026-04-13T17:00:00Z' }
    ]
  }),
  task('phoenix-2026', 'PHX-102', 'Stripe billing webhook handler', 'review', 'high', 'MC', '2026-05-06', {
    description: 'Implement webhook endpoint that processes Stripe billing events (subscription created, updated, cancelled, payment failed) and syncs state to our billing service.',
    subtasks: [
      { id: 'st-5', title: 'Set up Stripe webhook signature verification', status: 'done' },
      { id: 'st-6', title: 'Handle subscription lifecycle events', status: 'done' },
      { id: 'st-7', title: 'Handle payment failure + retry logic', status: 'in_progress' },
      { id: 'st-8', title: 'Add idempotency key tracking', status: 'done' },
      { id: 'st-9', title: 'End-to-end test with Stripe test clock', status: 'todo' }
    ],
    comments: [
      { id: 'c-4', author: { name: 'Jordan Lee', initial: 'JL' }, body: 'Make sure we handle `checkout.session.completed` for new signups too.', createdAt: '2026-04-16T11:00:00Z' },
      { id: 'c-5', author: { name: 'Mika Chen', initial: 'MC' }, body: 'Good catch — added it to the handler map. Also logging all unhandled event types for observability.', createdAt: '2026-04-16T13:45:00Z' }
    ],
    activity: [
      { id: 'a-6', event: 'status_changed: in_progress → review', actor: 'Mika Chen', at: '2026-04-16T09:00:00Z' },
      { id: 'a-7', event: 'assigned to Mika Chen', actor: 'Alex Rivera', at: '2026-04-08T10:00:00Z' },
      { id: 'a-8', event: 'commented', actor: 'Jordan Lee', at: '2026-04-16T11:00:00Z' }
    ]
  }),
  task('phoenix-2026', 'PHX-103', 'Draft upgrade comms plan', 'backlog', 'medium', 'PN', null),
  task('phoenix-2026', 'PHX-104', 'Feature flag kill switch UI', 'todo', 'medium', 'JL', '2026-05-12'),
  task('phoenix-2026', 'PHX-105', 'Load test routing under 50k tenants', 'todo', 'urgent', 'AR', '2026-05-04'),
  task('phoenix-2026', 'PHX-106', 'Update API rate limits for enterprise tier', 'in_progress', 'medium', 'MC', '2026-05-10'),
  task('phoenix-2026', 'PHX-107', 'Migration guide for self-hosted customers', 'review', 'medium', 'PN', '2026-05-18'),
  task('phoenix-2026', 'PHX-108', 'Legacy endpoint deprecation notice', 'done', 'low', 'JL', '2026-04-20'),
  task('phoenix-2026', 'PHX-109', 'Admin console audit log filter', 'backlog', 'low', 'AR', null),
  task('phoenix-2026', 'PHX-110', 'Billing plan comparison page refresh', 'todo', 'medium', 'PN', '2026-05-25'),

  // Atlas migration
  task('atlas-migration', 'ATL-201', 'Dual-write event producer', 'in_progress', 'urgent', 'MC', '2026-04-25', {
    description: 'Implement a dual-write event producer that publishes domain events to both the legacy message queue and the new event pipeline simultaneously, ensuring zero data loss during the migration window.',
    subtasks: [
      { id: 'st-10', title: 'Create event adapter interface', status: 'done' },
      { id: 'st-11', title: 'Implement legacy queue writer', status: 'done' },
      { id: 'st-12', title: 'Implement new pipeline writer', status: 'in_progress' },
      { id: 'st-13', title: 'Add consistency checker between outputs', status: 'todo' },
      { id: 'st-14', title: 'Load test dual-write under production volume', status: 'todo' }
    ],
    comments: [
      { id: 'c-6', author: { name: 'Ravi P.', initial: 'RP' }, body: 'Latency budget is 50ms per write — are we tracking p99 for the dual path?', createdAt: '2026-04-17T09:30:00Z' },
      { id: 'c-7', author: { name: 'Mika Chen', initial: 'MC' }, body: 'Yes, added histogram metrics. Current p99 is 38ms in staging — well within budget.', createdAt: '2026-04-17T11:00:00Z' },
      { id: 'c-8', author: { name: 'Sofia M.', initial: 'SM' }, body: 'The rollback runbook (ATL-203) depends on this landing first. Flagging the dependency.', createdAt: '2026-04-18T08:15:00Z' }
    ],
    activity: [
      { id: 'a-9', event: 'status_changed: todo → in_progress', actor: 'Mika Chen', at: '2026-04-12T08:00:00Z' },
      { id: 'a-10', event: 'priority_changed: high → urgent', actor: 'Alex Rivera', at: '2026-04-15T14:00:00Z' },
      { id: 'a-11', event: 'commented', actor: 'Ravi P.', at: '2026-04-17T09:30:00Z' },
      { id: 'a-12', event: 'subtask completed: Create event adapter interface', actor: 'Mika Chen', at: '2026-04-14T16:00:00Z' },
      { id: 'a-13', event: 'subtask completed: Implement legacy queue writer', actor: 'Mika Chen', at: '2026-04-16T12:00:00Z' }
    ]
  }),
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
  dueDate: string | null,
  detail?: Pick<Task, 'description' | 'subtasks' | 'comments' | 'activity'>
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
    dueDate,
    ...detail
  };
}

export function findProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function tasksForProject(projectId: string): Task[] {
  return TASKS.filter((t) => t.projectId === projectId);
}

export { TASK_BOARD_COLUMNS, PROJECT_STATUSES, PRIORITIES };
