import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function TeamsPage() {
  const route = findRouteByPattern('/teams')!;
  return <RouteScaffold route={route} leading={<Breadcrumb />} />;
}
