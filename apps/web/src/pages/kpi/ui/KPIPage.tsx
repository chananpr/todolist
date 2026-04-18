import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function KPIPage() {
  const route = findRouteByPattern('/kpi')!;
  return <RouteScaffold route={route} leading={<Breadcrumb />} />;
}
