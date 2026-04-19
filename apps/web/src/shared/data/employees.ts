import type { Activity } from './types';

export interface Employee {
  id: string;
  name: string;
  initial: string;
  title: string;
  team: string;
  workload: number; // 0-100
  activeTasks: number;
  currentProjects: string[];
  skills: string[];
  joinedAt: string; // ISO date
  email: string;
  timezone: string;
  recentActivity: Activity[];
}

export const EMPLOYEES: Employee[] = [
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    initial: 'AR',
    title: 'Tech Lead',
    team: 'Platform',
    workload: 85,
    activeTasks: 4,
    currentProjects: ['Phoenix launch 2026', 'Ops resilience hardening'],
    skills: ['System design', 'Go', 'Kubernetes', 'Incident response'],
    joinedAt: '2022-03-15',
    email: 'alex.rivera@taskforge.io',
    timezone: 'America/Los_Angeles',
    recentActivity: [
      { id: 'ea-1', event: 'completed subtask: Define routing resolution strategy', actor: 'Alex Rivera', at: '2026-04-13T17:00:00Z' },
      { id: 'ea-2', event: 'changed priority on PHX-105 to urgent', actor: 'Alex Rivera', at: '2026-04-11T11:30:00Z' },
      { id: 'ea-3', event: 'moved PHX-101 to in_progress', actor: 'Alex Rivera', at: '2026-04-10T08:00:00Z' },
      { id: 'ea-4', event: 'closed OPS-402 Incident drill Q2', actor: 'Alex Rivera', at: '2026-04-15T16:00:00Z' }
    ]
  },
  {
    id: 'mika-chen',
    name: 'Mika Chen',
    initial: 'MC',
    title: 'Senior Backend Engineer',
    team: 'Platform',
    workload: 92,
    activeTasks: 5,
    currentProjects: ['Phoenix launch 2026', 'Atlas migration'],
    skills: ['Node.js', 'TypeScript', 'Event sourcing', 'Stripe integrations'],
    joinedAt: '2023-01-10',
    email: 'mika.chen@taskforge.io',
    timezone: 'America/New_York',
    recentActivity: [
      { id: 'ea-5', event: 'moved PHX-102 to review', actor: 'Mika Chen', at: '2026-04-16T09:00:00Z' },
      { id: 'ea-6', event: 'completed subtask: Implement legacy queue writer', actor: 'Mika Chen', at: '2026-04-16T12:00:00Z' },
      { id: 'ea-7', event: 'commented on ATL-201 dual-write latency', actor: 'Mika Chen', at: '2026-04-17T11:00:00Z' },
      { id: 'ea-8', event: 'moved ATL-201 to in_progress', actor: 'Mika Chen', at: '2026-04-12T08:00:00Z' }
    ]
  },
  {
    id: 'priya-n',
    name: 'Priya N.',
    initial: 'PN',
    title: 'Product Manager',
    team: 'Product',
    workload: 68,
    activeTasks: 3,
    currentProjects: ['Phoenix launch 2026', 'Northstar analytics'],
    skills: ['Roadmap planning', 'Stakeholder management', 'Data analysis', 'Figma'],
    joinedAt: '2023-06-20',
    email: 'priya.n@taskforge.io',
    timezone: 'Asia/Kolkata',
    recentActivity: [
      { id: 'ea-9', event: 'added spike for wildcard cert provisioning to backlog', actor: 'Priya N.', at: '2026-04-15T09:00:00Z' },
      { id: 'ea-10', event: 'assigned PHX-101 to Alex Rivera', actor: 'Priya N.', at: '2026-04-09T16:00:00Z' },
      { id: 'ea-11', event: 'moved NST-301 to in_progress', actor: 'Priya N.', at: '2026-04-14T10:00:00Z' }
    ]
  },
  {
    id: 'jordan-lee',
    name: 'Jordan Lee',
    initial: 'JL',
    title: 'SRE / DevOps Lead',
    team: 'Infrastructure',
    workload: 74,
    activeTasks: 3,
    currentProjects: ['Ops resilience hardening', 'Phoenix launch 2026', 'Northstar analytics'],
    skills: ['Terraform', 'AWS', 'Observability', 'CI/CD', 'Docker'],
    joinedAt: '2022-11-01',
    email: 'jordan.lee@taskforge.io',
    timezone: 'America/Chicago',
    recentActivity: [
      { id: 'ea-12', event: 'commented on PHX-102 about checkout.session.completed', actor: 'Jordan Lee', at: '2026-04-16T11:00:00Z' },
      { id: 'ea-13', event: 'closed OPS-401 Synthetic login probe', actor: 'Jordan Lee', at: '2026-04-10T17:00:00Z' },
      { id: 'ea-14', event: 'closed PHX-108 Legacy endpoint deprecation notice', actor: 'Jordan Lee', at: '2026-04-20T09:00:00Z' }
    ]
  },
  {
    id: 'sofia-m',
    name: 'Sofia M.',
    initial: 'SM',
    title: 'Frontend Engineer',
    team: 'Product',
    workload: 55,
    activeTasks: 2,
    currentProjects: ['Customer onboarding v2', 'Atlas migration'],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Accessibility', 'Storybook'],
    joinedAt: '2024-02-14',
    email: 'sofia.m@taskforge.io',
    timezone: 'Europe/Madrid',
    recentActivity: [
      { id: 'ea-15', event: 'flagged dependency on ATL-201 for ATL-203', actor: 'Sofia M.', at: '2026-04-18T08:15:00Z' },
      { id: 'ea-16', event: 'created ATL-203 Cutover rollback runbook', actor: 'Sofia M.', at: '2026-04-12T14:00:00Z' }
    ]
  },
  {
    id: 'ravi-p',
    name: 'Ravi P.',
    initial: 'RP',
    title: 'Senior Backend Engineer',
    team: 'Platform',
    workload: 47,
    activeTasks: 2,
    currentProjects: ['Atlas migration', 'Customer onboarding v2'],
    skills: ['Python', 'MySQL', 'Redis', 'Data migration', 'Performance tuning'],
    joinedAt: '2023-09-05',
    email: 'ravi.p@taskforge.io',
    timezone: 'Asia/Kolkata',
    recentActivity: [
      { id: 'ea-17', event: 'moved ATL-202 to review', actor: 'Ravi P.', at: '2026-04-17T09:30:00Z' },
      { id: 'ea-18', event: 'commented on ATL-201 latency budget', actor: 'Ravi P.', at: '2026-04-17T09:30:00Z' },
      { id: 'ea-19', event: 'closed ARC — Archive sunset project completed', actor: 'Ravi P.', at: '2026-03-20T16:00:00Z' }
    ]
  },
  {
    id: 'taylor-nguyen',
    name: 'Taylor Nguyen',
    initial: 'TN',
    title: 'QA Engineer',
    team: 'Quality',
    workload: 60,
    activeTasks: 3,
    currentProjects: ['Phoenix launch 2026', 'Atlas migration'],
    skills: ['Test automation', 'Playwright', 'API testing', 'Performance testing'],
    joinedAt: '2024-06-10',
    email: 'taylor.nguyen@taskforge.io',
    timezone: 'America/Los_Angeles',
    recentActivity: [
      { id: 'ea-20', event: 'created test suite for tenant routing layer', actor: 'Taylor Nguyen', at: '2026-04-16T14:00:00Z' },
      { id: 'ea-21', event: 'reported regression in billing webhook handler', actor: 'Taylor Nguyen', at: '2026-04-15T11:30:00Z' }
    ]
  },
  {
    id: 'casey-brooks',
    name: 'Casey Brooks',
    initial: 'CB',
    title: 'Designer',
    team: 'Product',
    workload: 40,
    activeTasks: 1,
    currentProjects: ['Customer onboarding v2'],
    skills: ['UI/UX design', 'Figma', 'Design systems', 'User research', 'Prototyping'],
    joinedAt: '2024-08-22',
    email: 'casey.brooks@taskforge.io',
    timezone: 'Europe/London',
    recentActivity: [
      { id: 'ea-22', event: 'shared onboarding flow mockups for review', actor: 'Casey Brooks', at: '2026-04-17T10:00:00Z' },
      { id: 'ea-23', event: 'updated design tokens for billing comparison page', actor: 'Casey Brooks', at: '2026-04-14T15:00:00Z' }
    ]
  }
];

export function findEmployee(id: string): Employee | undefined {
  return EMPLOYEES.find((e) => e.id === id);
}
