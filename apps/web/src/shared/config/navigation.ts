import type { LucideIcon } from 'lucide-react';
import { BarChart3, BrainCircuit, Briefcase, LayoutDashboard, ShieldCheck, Users } from 'lucide-react';

export interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
  eyebrow: string;
  summary: string;
  highlights: string[];
}

export const primaryNavigation: NavigationItem[] = [
  {
    label: 'Overview',
    path: '/',
    icon: LayoutDashboard,
    eyebrow: 'Overview',
    summary: 'High-level operational view of project flow, KPI health, workload pressure, and AI-generated recommendations.',
    highlights: [
      'Monitor the command-center view with headline delivery metrics and execution status.',
      'Review board health, review queue pressure, and signals that may affect deadlines.',
      'Use this route as the landing area for cross-functional operations monitoring.'
    ]
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: Briefcase,
    eyebrow: 'Project Delivery',
    summary: 'Project surfaces should help teams move from portfolio visibility into execution detail, ownership, milestone tracking, and status governance.',
    highlights: [
      'Show project list, current status, owners, milestone progress, and risk visibility.',
      'Prepare the route for drill-down into project detail, audit history, and delivery coordination.',
      'Keep project-level actions separate from generic dashboard widgets to preserve route clarity.'
    ]
  },
  {
    label: 'AI Planner',
    path: '/ai-planner',
    icon: BrainCircuit,
    eyebrow: 'AI Workflow',
    summary: 'The AI planner area should present prompt-driven planning output, structured recommendations, review states, and safe apply flows.',
    highlights: [
      'Display AI-generated plans as reviewable drafts instead of silently applying changes.',
      'Expose risks, suggested assignees, date constraints, and approval checkpoints clearly.',
      'Align frontend output with backend validation and schema-enforced AI responses.'
    ]
  },
  {
    label: 'Teams',
    path: '/teams',
    icon: Users,
    eyebrow: 'People Operations',
    summary: 'Team views should show capacity, collaboration load, staffing alignment, and which groups own current delivery pressure.',
    highlights: [
      'Surface team-level task volume, workload balance, and operational ownership.',
      'Keep people and org views distinct from task execution widgets for cleaner information architecture.',
      'Use this route for team directories, membership context, and assignment planning.'
    ]
  },
  {
    label: 'KPI',
    path: '/kpi',
    icon: BarChart3,
    eyebrow: 'Performance Analytics',
    summary: 'KPI screens should focus on trend visibility, performance interpretation, and decision-ready indicators instead of raw charts only.',
    highlights: [
      'Show leading and lagging indicators with clear narrative context.',
      'Support drill-down from top-line health into team and employee performance slices.',
      'Keep KPI components reusable but route composition explicit to avoid analytics sprawl.'
    ]
  },
  {
    label: 'Security',
    path: '/security',
    icon: ShieldCheck,
    eyebrow: 'Security & Audit',
    summary: 'Security-facing workflows should make permissions, audit trails, review actions, and compliance-sensitive changes easy to inspect.',
    highlights: [
      'Use this route for permission visibility, audit events, and sensitive action review surfaces.',
      'Preserve enterprise trust signals through explicit status, actor, and timeline presentation.',
      'Keep compliance-adjacent UI deliberate and traceable rather than buried inside generic settings screens.'
    ]
  }
];
