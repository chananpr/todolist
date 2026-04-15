import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { DashboardPage } from '../pages/dashboard/ui/DashboardPage';
import { WorkspacePage } from '../pages/workspace/ui/WorkspacePage';
import { ThemeShowcasePage } from '../pages/theme-showcase/ui/ThemeShowcasePage';
import { primaryNavigation } from '../shared/config/navigation';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'theme-showcase',
        element: <ThemeShowcasePage />
      },
      ...primaryNavigation
        .filter((item) => item.path !== '/')
        .map((item) => ({
          path: item.path.slice(1),
          element: (
            <WorkspacePage
              eyebrow={item.eyebrow}
              title={item.label}
              summary={item.summary}
              highlights={item.highlights}
            />
          )
        }))
    ]
  }
]);
