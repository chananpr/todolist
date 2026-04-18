import { useParams } from 'react-router-dom';
import { RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

export function MetricPage() {
  const { metric } = useParams<{ metric: string }>();
  const route = findRouteByPattern('/kpi/:metric')!;
  return (
    <RouteScaffold
      route={route}
      title={metric ? `Metric — ${metric}` : route.label}
      leading={<Breadcrumb />}
    />
  );
}
