import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { DashboardPage } from '../pages/dashboard/ui/DashboardPage';
import { ThemeShowcasePage } from '../pages/theme-showcase/ui/ThemeShowcasePage';
import { LoginPage } from '../pages/login/ui/LoginPage';
import { ProjectsListPage } from '../pages/projects/ui/ProjectsListPage';
import { ProjectDetailPage } from '../pages/projects/ui/ProjectDetailPage';
import { ProjectBoardPage } from '../pages/projects/ui/ProjectBoardPage';
import { AIPlannerPage } from '../pages/ai-planner/ui/AIPlannerPage';
import { AIDraftPage } from '../pages/ai-planner/ui/AIDraftPage';
import { TeamsPage } from '../pages/teams/ui/TeamsPage';
import { EmployeePage } from '../pages/teams/ui/EmployeePage';
import { KPIPage } from '../pages/kpi/ui/KPIPage';
import { MetricPage } from '../pages/kpi/ui/MetricPage';
import { SecurityPage } from '../pages/security/ui/SecurityPage';
import { RolesPage } from '../pages/security/ui/RolesPage';
import { AuditPage } from '../pages/security/ui/AuditPage';
import { NotFoundPage } from '../pages/not-found/ui/NotFoundPage';

/**
 * Routes mirror apps/web/src/shared/config/sitemap.ts.
 * When you add a route, update sitemap.ts FIRST, then register the
 * page module here. The sidebar, breadcrumb, and any future role gate
 * will pick up the new entry from sitemap.ts automatically.
 */
export const router = createBrowserRouter([
  // Standalone surfaces (no AppShell chrome)
  {
    path: '/login',
    element: <LoginPage />
  },

  // App shell surfaces
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },

      { path: 'projects', element: <ProjectsListPage /> },
      { path: 'projects/:id', element: <ProjectDetailPage /> },
      { path: 'projects/:id/board', element: <ProjectBoardPage /> },

      { path: 'ai-planner', element: <AIPlannerPage /> },
      { path: 'ai-planner/:id', element: <AIDraftPage /> },

      { path: 'teams', element: <TeamsPage /> },
      { path: 'teams/:id', element: <EmployeePage /> },

      { path: 'kpi', element: <KPIPage /> },
      { path: 'kpi/:metric', element: <MetricPage /> },

      { path: 'security', element: <SecurityPage /> },
      { path: 'security/roles', element: <RolesPage /> },
      { path: 'security/audit', element: <AuditPage /> },

      { path: 'theme-showcase', element: <ThemeShowcasePage /> }
    ]
  },

  // Catch-all
  { path: '*', element: <NotFoundPage /> }
]);
