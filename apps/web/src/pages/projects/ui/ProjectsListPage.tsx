import { Link } from 'react-router-dom';
import { Plus, ArrowUpRight, TriangleAlert, Circle } from 'lucide-react';
import { Button, Card, RouteScaffold, SectionTitle } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';
import { PROJECTS, type Project, type RiskLevel } from '../../../shared/data/projects';

export function ProjectsListPage() {
  const route = findRouteByPattern('/projects')!;
  const active = PROJECTS.filter((p) => p.status === 'active');
  const other = PROJECTS.filter((p) => p.status !== 'active');

  return (
    <RouteScaffold
      route={route}
      leading={<Breadcrumb />}
      headerAction={
        <Button variant="primary" icon={Plus}>
          New Project
        </Button>
      }
    >
      <div className="space-y-3">
        <SectionTitle eyebrow="Portfolio" title={`Active (${active.length})`} />
        <Card className="overflow-hidden p-0">
          <ProjectsTable rows={active} />
        </Card>
      </div>

      {other.length > 0 && (
        <div className="mt-8 space-y-3">
          <SectionTitle eyebrow="Archive" title="Draft · Completed · Cancelled" />
          <Card className="overflow-hidden p-0">
            <ProjectsTable rows={other} dimmed />
          </Card>
        </div>
      )}
    </RouteScaffold>
  );
}

function ProjectsTable({ rows, dimmed = false }: { rows: Project[]; dimmed?: boolean }) {
  return (
    <table className="w-full text-sm">
      <thead className="border-b border-slate-100 bg-slate-50/80 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        <tr>
          <th className="px-5 py-3">Project</th>
          <th className="px-5 py-3">Status</th>
          <th className="px-5 py-3">Owner</th>
          <th className="px-5 py-3">Progress</th>
          <th className="px-5 py-3">Due</th>
          <th className="px-5 py-3">Risk</th>
          <th className="px-5 py-3 text-right"></th>
        </tr>
      </thead>
      <tbody className={dimmed ? 'text-slate-500' : 'text-slate-800'}>
        {rows.map((p) => (
          <tr
            key={p.id}
            className="border-b border-slate-100 transition-colors last:border-0 hover:bg-primary-50/40"
          >
            <td className="px-5 py-4">
              <div className="font-semibold text-slate-900">
                <Link to={`/projects/${p.id}`} className="transition hover:text-primary-700">
                  {p.name}
                </Link>
              </div>
              <div className="mt-0.5 font-mono text-[11px] text-slate-400">{p.code}</div>
            </td>
            <td className="px-5 py-4">
              <StatusChip status={p.status} />
            </td>
            <td className="px-5 py-4">
              <Avatar name={p.owner.name} initial={p.owner.initial} />
            </td>
            <td className="px-5 py-4">
              <ProgressBar value={p.progress} />
            </td>
            <td className="px-5 py-4 tabular-nums">{formatDate(p.dueDate)}</td>
            <td className="px-5 py-4">
              <RiskBadge level={p.risk} />
            </td>
            <td className="px-5 py-4 text-right">
              <Link
                to={`/projects/${p.id}/board`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 transition hover:text-primary-700"
              >
                Board
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function StatusChip({ status }: { status: Project['status'] }) {
  const styles: Record<Project['status'], string> = {
    active: 'bg-emerald-100 text-emerald-700',
    draft: 'bg-slate-100 text-slate-600',
    completed: 'bg-primary-100 text-primary-700',
    cancelled: 'bg-rose-100 text-rose-700'
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}>
      <Circle className="h-1.5 w-1.5 fill-current" />
      {status}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-semibold tabular-nums text-slate-600">{value}%</span>
    </div>
  );
}

function RiskBadge({ level }: { level: RiskLevel }) {
  const styles: Record<RiskLevel, string> = {
    low: 'bg-slate-100 text-slate-500',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-rose-100 text-rose-700'
  };
  const showIcon = level !== 'low';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[level]}`}>
      {showIcon && <TriangleAlert className="h-3 w-3" />}
      {level}
    </span>
  );
}

function Avatar({ name, initial }: { name: string; initial: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-[10px] font-bold text-white shadow-soft">
        {initial}
      </span>
      <span className="text-xs font-medium text-slate-700">{name}</span>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}
