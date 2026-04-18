import { useParams } from 'react-router-dom';
import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const route = findRouteByPattern('/projects/:id')!;
  return (
    <RouteScaffold
      route={route}
      title={id ? `Project ${id}` : route.label}
      leading={<Breadcrumb />}
    />
  );
}
