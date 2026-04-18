import { Layers, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../../../shared/ui';

/**
 * Standalone login surface. Rendered outside AppLayout so there's no
 * sidebar/header chrome. Auth logic is not wired yet — this scaffold
 * only establishes the visual + form skeleton.
 */
export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-mist p-6">
      <Card variant="panel" className="w-full max-w-md space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-200/80">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-slate-900">TaskForge</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary-600">
              Enterprise Layer
            </p>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary-600">Sign in</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to access projects, KPI dashboards, and AI planning.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <label className="block text-sm font-medium">
            <span className="text-slate-700">Email</span>
            <input
              type="email"
              required
              className="mt-1 h-10 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
              placeholder="you@company.com"
            />
          </label>
          <label className="block text-sm font-medium">
            <span className="text-slate-700">Password</span>
            <input
              type="password"
              required
              className="mt-1 h-10 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
              placeholder="••••••••"
            />
          </label>
          <Button type="submit" variant="primary" size="lg" icon={LogIn} className="w-full">
            Sign in
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500">
          <Link to="/" className="font-semibold text-primary-600 hover:text-primary-700">
            ← Back to overview
          </Link>
        </div>
      </Card>
    </div>
  );
}
