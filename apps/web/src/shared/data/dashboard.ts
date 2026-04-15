export const metrics = [
  { label: 'Active Projects', value: '24', delta: '+6%', tone: 'from-emerald-400/20 to-teal-300/5' },
  { label: 'Tasks Due Today', value: '38', delta: '+12%', tone: 'from-orange-400/25 to-amber-200/5' },
  { label: 'Review Queue', value: '14', delta: '-3%', tone: 'from-sky-400/25 to-cyan-200/5' },
  { label: 'KPI Health', value: '91%', delta: '+2.1%', tone: 'from-fuchsia-400/15 to-rose-300/5' }
];

export const lanes = [
  {
    title: 'Backlog',
    accent: 'bg-slate-400',
    cards: [
      { title: 'HR role permission matrix', meta: '12 subtasks', assignee: 'People Ops' },
      { title: 'AI weekly planning template', meta: 'Prompt revision', assignee: 'Ops AI' }
    ]
  },
  {
    title: 'In Progress',
    accent: 'bg-amber-400',
    cards: [
      { title: 'Finance cost evidence flow', meta: 'Due in 2 days', assignee: 'Finance PM' },
      { title: 'Project dashboard aggregation', meta: '64% complete', assignee: 'Platform' }
    ]
  },
  {
    title: 'Review',
    accent: 'bg-cyan-300',
    cards: [
      { title: 'Task reassignment policy', meta: 'Awaiting director signoff', assignee: 'Operations' }
    ]
  },
  {
    title: 'Done',
    accent: 'bg-emerald-400',
    cards: [
      { title: 'Employee activation audit trail', meta: 'Delivered today', assignee: 'Security' }
    ]
  }
];

export const aiSignals = [
  'Recommend splitting mobile QA into a separate task stream',
  'Delay risk detected for ERP integration due to high reviewer load',
  'Reassign design review to Team Delta to reduce deadline pressure'
];

export const teamLoad = [
  { name: 'Engineering', load: 74, tasks: 41 },
  { name: 'Operations', load: 59, tasks: 27 },
  { name: 'Finance', load: 43, tasks: 11 },
  { name: 'HR', load: 68, tasks: 19 }
];

export const recentActivity = [
  'AI generated 8 tasks for Q3 Onboarding Revamp',
  'Task moved from Review to Done by Narin C.',
  'Budget evidence uploaded for Office Expansion project',
  'KPI snapshot recalculated for Product Team A'
];
