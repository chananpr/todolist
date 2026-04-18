import { useParams } from 'react-router-dom';
import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function EmployeePage() {
  const { id } = useParams<{ id: string }>();
  const route = findRouteByPattern('/teams/:id')!;
  return (
    <RouteScaffold
      route={route}
      title={id ? `Employee ${id}` : route.label}
      leading={<Breadcrumb />}
    />
  );
}
