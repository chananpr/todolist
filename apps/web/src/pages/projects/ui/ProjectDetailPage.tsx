import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Users } from 'lucide-react';
import { Button, Card, RouteScaffold, SectionTitle } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';
import { findProject, tasksForProject } from '../../../shared/data/projects';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const route = findRouteByPattern('/projects/:id')!;
  const project = id ? findProject(id) : undefined;

  if (!project) {
    return (
      <RouteScaffold route={route} leading={<Breadcrumb />}>
        <Card className="text-center">
          <p className="font-semibold text-slate-900">Project not found</p>
          <p className="mt-1 text-sm text-slate-500">
            No project matches <code>{id}</code>.
          </p>
          <Link to="/projects" className="mt-4 inline-block">
            <Button variant="secondary" icon={ArrowLeft}>
              Back to projects
            </Button>
          </Link>
        </Card>
      </RouteScaffold>
    );
  }

  const tasks = tasksForProject(project.id);
  const countByStatus = tasks.reduce<Record<string, number>>((acc, t) => {
    acc[t.status] = (acc[t.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <RouteScaffold
      route={route}
      title={project.name}
      leading={<Breadcrumb />}
      headerAction={
        <Link to={`/projects/${project.id}/board`}>
          <Button variant="primary" icon={ArrowUpRight} iconPosition="right">
            Open Board
          </Button>
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-600">
            Overview
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-slate-900">
            {project.summary}
          </h2>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <Metric label="Progress" value={`${project.progress}%`} />
            <Metric label="Due" value={formatDate(project.dueDate)} />
            <Metric label="Status" value={project.status} capitalize />
          </div>

          <div className="mt-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              Task pipeline
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(countByStatus).map(([status, count]) => (
                <span
                  key={status}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"
                >
                  {status.replace('_', ' ')} · {count}
                </span>
              ))}
              {tasks.length === 0 && (
                <span className="text-xs text-slate-500">No tasks yet — create the first one.</span>
              )}
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Team" title={`${project.team.length} people`} />
          <ul className="mt-4 space-y-3">
            {project.team.map((member) => (
              <li key={member.name} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-xs font-bold text-white shadow-soft">
                  {member.initial}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-500">
                    {member.name === project.owner.name ? 'Project owner' : 'Contributor'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-slate-100 pt-4">
            <Button variant="ghost" size="sm" icon={Users}>
              Manage access
            </Button>
          </div>
        </Card>
      </div>
    </RouteScaffold>
  );
}

function Metric({ label, value, capitalize }: { label: string; value: string; capitalize?: boolean }) {
  return (
    <div className="rounded-xl bg-primary-50/50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-600">{label}</p>
      <p className={`mt-1 font-display text-xl font-semibold text-slate-900 ${capitalize ? 'capitalize' : ''}`}>
        {value}
      </p>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}
