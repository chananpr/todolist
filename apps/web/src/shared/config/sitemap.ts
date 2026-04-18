import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BrainCircuit,
  Briefcase,
  LayoutDashboard,
  ShieldCheck,
  Users
} from 'lucide-react';

/**
 * Single source of truth for the web app's route structure.
 *
 * Mirrors design/sitemap.md. When you add, remove, or rename a route,
 * update this file AND design/sitemap.md together.
 *
 * Consumed by:
 *   - apps/web/src/shared/config/navigation.ts   (sidebar nav)
 *   - apps/web/src/app/router.tsx                (route registration)
 *   - widgets/layout/ui/Breadcrumb.tsx           (breadcrumb trail)
 */

export type Role = 'public' | 'member' | 'manager' | 'admin';

/** Access hierarchy: public < member < manager < admin */
export const ROLE_LEVEL: Record<Role, number> = {
  public: 0,
  member: 1,
  manager: 2,
  admin: 3
};

/** Top-level IA groups (see design/sitemap.md > IA flow) */
export type RouteGroup = 'execute' | 'plan' | 'people' | 'measure' | 'govern' | 'system';

export interface RouteNode {
  /** URL pattern, e.g. `/projects` or `/projects/:id/board` */
  path: string;
  /** Short label used in sidebar and breadcrumb */
  label: string;
  /** Eyebrow shown above the page title */
  eyebrow: string;
  /** One-line summary shown under the page title */
  summary: string;
  /** Minimum role required to access this route */
  minRole: Role;
  /** Icon shown in sidebar (top-level routes only) */
  icon?: LucideIcon;
  /** Focus bullets shown on scaffold pages */
  highlights?: string[];
  /** Nested routes */
  children?: RouteNode[];
  /** Include in sidebar navigation */
  showInNav?: boolean;
  /** Route contains URL params (e.g. `:id`) */
  isDetail?: boolean;
  /** IA grouping */
  group?: RouteGroup;
}

export const sitemap: RouteNode[] = [
  {
    path: '/login',
    label: 'Login',
    eyebrow: 'Authentication',
    summary: 'Sign-in surface for members, managers, and admins before entering the command center.',
    minRole: 'public',
    showInNav: false,
    group: 'system'
  },
  {
    path: '/',
    label: 'Overview',
    eyebrow: 'Overview',
    summary:
      'High-level operational view of project flow, KPI health, workload pressure, and AI-generated recommendations.',
    minRole: 'member',
    icon: LayoutDashboard,
    showInNav: true,
    group: 'execute',
    highlights: [
      'Monitor the command-center view with headline delivery metrics and execution status.',
      'Review board health, review queue pressure, and signals that may affect deadlines.',
      'Use this route as the landing area for cross-functional operations monitoring.'
    ]
  },
  {
    path: '/projects',
    label: 'Projects',
    eyebrow: 'Project Delivery',
    summary:
      'Project surfaces should help teams move from portfolio visibility into execution detail, ownership, milestone tracking, and status governance.',
    minRole: 'member',
    icon: Briefcase,
    showInNav: true,
    group: 'execute',
    highlights: [
      'Show project list, current status, owners, milestone progress, and risk visibility.',
      'Prepare the route for drill-down into project detail, audit history, and delivery coordination.',
      'Keep project-level actions separate from generic dashboard widgets to preserve route clarity.'
    ],
    children: [
      {
        path: '/projects/:id',
        label: 'Project Detail',
        eyebrow: 'Project',
        summary:
          'Single project view with milestones, team allocation, risk badges, and delivery timeline.',
        minRole: 'member',
        isDetail: true,
        group: 'execute',
        children: [
          {
            path: '/projects/:id/board',
            label: 'Kanban Board',
            eyebrow: 'Execution',
            summary:
              'Drag-and-drop kanban lanes for the active project with status transitions and drop feedback.',
            minRole: 'member',
            isDetail: true,
            group: 'execute'
          }
        ]
      }
    ]
  },
  {
    path: '/ai-planner',
    label: 'AI Planner',
    eyebrow: 'AI Workflow',
    summary:
      'The AI planner area should present prompt-driven planning output, structured recommendations, review states, and safe apply flows.',
    minRole: 'manager',
    icon: BrainCircuit,
    showInNav: true,
    group: 'plan',
    highlights: [
      'Display AI-generated plans as reviewable drafts instead of silently applying changes.',
      'Expose risks, suggested assignees, date constraints, and approval checkpoints clearly.',
      'Align frontend output with backend validation and schema-enforced AI responses.'
    ],
    children: [
      {
        path: '/ai-planner/:id',
        label: 'Draft Review',
        eyebrow: 'AI Draft',
        summary:
          'Review a single AI-generated plan with timeline, risks, suggested owners, and apply controls.',
        minRole: 'manager',
        isDetail: true,
        group: 'plan'
      }
    ]
  },
  {
    path: '/teams',
    label: 'Teams',
    eyebrow: 'People Operations',
    summary:
      'Team views should show capacity, collaboration load, staffing alignment, and which groups own current delivery pressure.',
    minRole: 'manager',
    icon: Users,
    showInNav: true,
    group: 'people',
    highlights: [
      'Surface team-level task volume, workload balance, and operational ownership.',
      'Keep people and org views distinct from task execution widgets for cleaner information architecture.',
      'Use this route for team directories, membership context, and assignment planning.'
    ],
    children: [
      {
        path: '/teams/:id',
        label: 'Employee Profile',
        eyebrow: 'People',
        summary:
          'Individual workload view with active tasks, history feed, and capacity trend.',
        minRole: 'manager',
        isDetail: true,
        group: 'people'
      }
    ]
  },
  {
    path: '/kpi',
    label: 'KPI',
    eyebrow: 'Performance Analytics',
    summary:
      'KPI screens should focus on trend visibility, performance interpretation, and decision-ready indicators instead of raw charts only.',
    minRole: 'manager',
    icon: BarChart3,
    showInNav: true,
    group: 'measure',
    highlights: [
      'Show leading and lagging indicators with clear narrative context.',
      'Support drill-down from top-line health into team and employee performance slices.',
      'Keep KPI components reusable but route composition explicit to avoid analytics sprawl.'
    ],
    children: [
      {
        path: '/kpi/:metric',
        label: 'Metric Drilldown',
        eyebrow: 'Metric',
        summary:
          'Timeseries detail for a single metric with breakdown, cohort slices, and comparison ranges.',
        minRole: 'manager',
        isDetail: true,
        group: 'measure'
      }
    ]
  },
  {
    path: '/security',
    label: 'Security',
    eyebrow: 'Security & Audit',
    summary:
      'Security-facing workflows should make permissions, audit trails, review actions, and compliance-sensitive changes easy to inspect.',
    minRole: 'admin',
    icon: ShieldCheck,
    showInNav: true,
    group: 'govern',
    highlights: [
      'Use this route for permission visibility, audit events, and sensitive action review surfaces.',
      'Preserve enterprise trust signals through explicit status, actor, and timeline presentation.',
      'Keep compliance-adjacent UI deliberate and traceable rather than buried inside generic settings screens.'
    ],
    children: [
      {
        path: '/security/roles',
        label: 'Roles & Permissions',
        eyebrow: 'Access Control',
        summary:
          'Role matrix and permission assignment across every domain module with audit-friendly diffs.',
        minRole: 'admin',
        group: 'govern'
      },
      {
        path: '/security/audit',
        label: 'Audit Log',
        eyebrow: 'Audit',
        summary:
          'Chronological event timeline for sensitive actions with actor, target, and filter rail.',
        minRole: 'admin',
        group: 'govern'
      }
    ]
  },
  {
    path: '/theme-showcase',
    label: 'Theme Showcase',
    eyebrow: 'Design System',
    summary: 'Dev-only catalog of tokens, primitives, and motion guidance.',
    minRole: 'member',
    showInNav: false,
    group: 'system'
  }
];

/* ───────────────────────── helpers ───────────────────────── */

/** Flatten sitemap tree into a depth-first list of all routes. */
export function flattenSitemap(nodes: RouteNode[] = sitemap): RouteNode[] {
  const out: RouteNode[] = [];
  const walk = (list: RouteNode[]) => {
    for (const node of list) {
      out.push(node);
      if (node.children) walk(node.children);
    }
  };
  walk(nodes);
  return out;
}

/** Top-level routes that should appear in the sidebar (in declaration order). */
export function getNavRoutes(): RouteNode[] {
  return sitemap.filter((node) => node.showInNav === true);
}

/**
 * Find a route node by URL, matching literal paths AND param patterns.
 * e.g. `/projects/abc-123` matches the stored pattern `/projects/:id`.
 */
export function findRouteByPath(url: string): RouteNode | undefined {
  const normalized = url.split('?')[0].split('#')[0] || '/';
  return flattenSitemap().find((node) => matchesPattern(node.path, normalized));
}

/**
 * Find a route node by its stored pattern (exact string match). Use
 * this from a page module that statically knows its pattern, e.g.
 * `findRouteByPattern('/projects/:id')`.
 */
export function findRouteByPattern(pattern: string): RouteNode | undefined {
  return flattenSitemap().find((node) => node.path === pattern);
}

/** Return ancestor chain for a URL, root first, matched route last. */
export function getBreadcrumbChain(url: string): RouteNode[] {
  const normalized = url.split('?')[0].split('#')[0] || '/';
  const chain: RouteNode[] = [];
  const walk = (nodes: RouteNode[]): boolean => {
    for (const node of nodes) {
      chain.push(node);
      if (matchesPattern(node.path, normalized)) return true;
      if (node.children && walk(node.children)) return true;
      chain.pop();
    }
    return false;
  };
  walk(sitemap);
  return chain;
}

/** Whether the given role has access to a route's minimum role. */
export function isAccessible(role: Role, route: RouteNode): boolean {
  return ROLE_LEVEL[role] >= ROLE_LEVEL[route.minRole];
}

/** Convert a stored pattern like `/projects/:id/board` to a RegExp. */
function patternToRegex(pattern: string): RegExp {
  const source = pattern
    .split('/')
    .map((segment) => (segment.startsWith(':') ? '[^/]+' : escapeRegex(segment)))
    .join('/');
  return new RegExp(`^${source}$`);
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchesPattern(pattern: string, url: string): boolean {
  return patternToRegex(pattern).test(url);
}
