import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function ProjectsListPage() {
  const route = findRouteByPattern('/projects')!;
  return <RouteScaffold route={route} leading={<Breadcrumb />} />;
}
