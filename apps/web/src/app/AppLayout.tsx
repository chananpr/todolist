import { Outlet } from 'react-router-dom';
import { AppShell } from '../widgets/layout/ui/AppShell';

export function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
