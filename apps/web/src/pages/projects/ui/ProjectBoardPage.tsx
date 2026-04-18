import { useParams } from 'react-router-dom';
import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function ProjectBoardPage() {
  const { id } = useParams<{ id: string }>();
  const route = findRouteByPattern('/projects/:id/board')!;
  return (
    <RouteScaffold
      route={route}
      title={id ? `Board — ${id}` : route.label}
      leading={<Breadcrumb />}
    />
  );
}
