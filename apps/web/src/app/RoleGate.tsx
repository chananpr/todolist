import { Outlet, useLocation, Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { findRouteByPath, isAccessible } from '../shared/config/sitemap';
import { EmptyState } from '../shared/ui';
import { useAuth } from './AuthContext';

export function RoleGate() {
  const { pathname } = useLocation();
  const { currentRole } = useAuth();
  const route = findRouteByPath(pathname);

  // Route not in sitemap — let React Router handle 404
  if (!route) {
    return <Outlet />;
  }

  if (!isAccessible(currentRole, route)) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Access Denied"
        description={`This page requires the "${route.minRole}" role. You are currently signed in as "${currentRole}".`}
        action={
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition duration-150 hover:bg-primary-700 active:scale-[0.98]"
          >
            Back to Overview
          </Link>
        }
      />
    );
  }

  return <Outlet />;
}
