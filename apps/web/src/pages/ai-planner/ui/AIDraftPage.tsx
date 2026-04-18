import { useParams } from 'react-router-dom';
import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function AIDraftPage() {
  const { id } = useParams<{ id: string }>();
  const route = findRouteByPattern('/ai-planner/:id')!;
  return (
    <RouteScaffold
      route={route}
      title={id ? `Draft ${id}` : route.label}
      leading={<Breadcrumb />}
    />
  );
}
