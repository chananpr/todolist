import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function RolesPage() {
  const route = findRouteByPattern('/security/roles')!;
  return <RouteScaffold route={route} leading={<Breadcrumb />} />;
}
