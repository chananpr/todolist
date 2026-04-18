import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function SecurityPage() {
  const route = findRouteByPattern('/security')!;
  return <RouteScaffold route={route} leading={<Breadcrumb />} />;
}
