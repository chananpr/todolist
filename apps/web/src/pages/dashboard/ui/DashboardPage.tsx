import { HeroPanel } from '../../../widgets/dashboard-overview/ui/HeroPanel';
import { MetricsGrid } from '../../../widgets/dashboard-overview/ui/MetricsGrid';
import { BoardPreview } from '../../../widgets/dashboard-overview/ui/BoardPreview';
import { SignalsPanel } from '../../../widgets/dashboard-overview/ui/SignalsPanel';
import { AppShell } from '../../../widgets/layout/ui/AppShell';

export function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6 pb-8">
        <HeroPanel />
        <MetricsGrid />
        <BoardPreview />
        <SignalsPanel />
      </div>
    </AppShell>
  );
}
