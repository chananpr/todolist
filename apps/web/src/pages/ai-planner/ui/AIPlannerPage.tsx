import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function AIPlannerPage() {
  const route = findRouteByPattern('/ai-planner')!;
  return <RouteScaffold route={route} leading={<Breadcrumb />} />;
}
