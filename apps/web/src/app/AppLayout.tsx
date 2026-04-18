import { AppShell } from '../widgets/layout/ui/AppShell';
import { AuthProvider } from './AuthContext';
import { RoleGate } from './RoleGate';

export function AppLayout() {
  return (
    <AuthProvider>
      <AppShell>
        <RoleGate />
      </AppShell>
    </AuthProvider>
  );
}
