import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function AuditPage() {
  const route = findRouteByPattern('/security/audit')!;
  return <RouteScaffold route={route} leading={<Breadcrumb />} />;
}
