import { useEffect, useState } from 'react';
import type { DashboardOverview } from '@taskforge/contracts';
import { HeroPanel } from '../../../widgets/dashboard-overview/ui/HeroPanel';
import { MetricsGrid } from '../../../widgets/dashboard-overview/ui/MetricsGrid';
import { BoardPreview } from '../../../widgets/dashboard-overview/ui/BoardPreview';
import { SignalsPanel } from '../../../widgets/dashboard-overview/ui/SignalsPanel';
import { fetchDashboardOverview } from '../../../shared/api/dashboard';

export function DashboardPage() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetchDashboardOverview(controller.signal)
      .then((payload) => {
        setOverview(payload);
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        setError(reason instanceof Error ? reason.message : 'Failed to load dashboard overview');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="space-y-6 pb-8">
      <HeroPanel />
      <MetricsGrid metrics={overview?.metrics} loading={loading} />
      <BoardPreview lanes={overview?.lanes ?? []} loading={loading} error={error} />
      <SignalsPanel
        signals={overview?.signals ?? []}
        load={overview?.load ?? []}
        recentActivity={overview?.recentActivity ?? []}
        loading={loading}
        error={error}
      />
    </div>
  );
}
