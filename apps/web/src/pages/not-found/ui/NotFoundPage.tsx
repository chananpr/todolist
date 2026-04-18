import { Link, useLocation } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { Button, Card } from '../../../shared/ui';

export function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-mist p-6">
      <Card variant="panel" className="w-full max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-soft">
          <Compass className="h-6 w-6" />
        </div>
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.24em] text-primary-600">404</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-slate-900">Route not found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The path <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">{pathname}</code>{' '}
          isn't registered in the sitemap.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <Button variant="primary" icon={Home}>
            Back to Overview
          </Button>
        </Link>
      </Card>
    </div>
  );
}
