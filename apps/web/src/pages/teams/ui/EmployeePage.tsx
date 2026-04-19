import { useParams, Link } from 'react-router-dom';
import {
  Mail,
  Globe,
  Calendar,
  Users,
  Briefcase,
  Activity as ActivityIcon,
  Zap,
  ArrowLeft,
  Circle
} from 'lucide-react';
import { RouteScaffold, Card, Badge, Button } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';
import { findEmployee } from '../../../shared/data/employees';

export function EmployeePage() {
  const { id } = useParams<{ id: string }>();
  const route = findRouteByPattern('/teams/:id')!;
  const employee = id ? findEmployee(id) : undefined;

  if (!employee) {
    return (
      <RouteScaffold route={route} leading={<Breadcrumb />}>
        <Card className="text-center">
          <p className="font-semibold text-slate-900">Employee not found</p>
          <p className="mt-1 text-sm text-slate-500">
            No employee matches <code>{id}</code>.
          </p>
          <Link to="/teams" className="mt-4 inline-block">
            <Button variant="secondary" icon={ArrowLeft}>Back to teams</Button>
          </Link>
        </Card>
      </RouteScaffold>
    );
  }

  const workloadColor =
    employee.workload >= 80
      ? 'bg-rose-500'
      : employee.workload >= 60
        ? 'bg-amber-500'
        : 'bg-emerald-500';

  return (
    <RouteScaffold
      route={route}
      title={employee.name}
      leading={<Breadcrumb />}
      headerAction={
        <Link to="/teams">
          <Button variant="secondary" icon={ArrowLeft}>All members</Button>
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: profile card */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-2xl font-bold text-white shadow-soft">
              {employee.initial}
            </span>
            <h3 className="mt-4 font-display text-xl font-bold text-slate-900">{employee.name}</h3>
            <p className="text-sm text-slate-500">{employee.title}</p>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <MetaRow icon={Users} label="Team" value={employee.team} />
            <MetaRow icon={Mail} label="Email" value={employee.email} />
            <MetaRow icon={Globe} label="Timezone" value={employee.timezone} />
            <MetaRow icon={Calendar} label="Joined" value={formatDate(employee.joinedAt)} />
          </div>

          {/* Skills */}
          <div className="mt-6">
            <SectionHeader icon={Zap} title="Skills" />
            <div className="mt-2 flex flex-wrap gap-2">
              {employee.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Right column: workload + projects + activity */}
        <div className="space-y-6 lg:col-span-2">
          {/* Workload */}
          <Card>
            <SectionHeader icon={Zap} title="Workload" trailing={`${employee.workload}%`} />
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all ${workloadColor}`}
                style={{ width: `${employee.workload}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-slate-500">
              {employee.activeTasks} active {employee.activeTasks === 1 ? 'task' : 'tasks'}
            </p>
          </Card>

          {/* Active projects */}
          <Card>
            <SectionHeader icon={Briefcase} title="Projects" trailing={String(employee.currentProjects.length)} />
            <ul className="mt-3 space-y-2">
              {employee.currentProjects.map((p) => (
                <li key={p} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                  {p}
                </li>
              ))}
            </ul>
          </Card>

          {/* Recent activity */}
          {employee.recentActivity.length > 0 && (
            <Card>
              <SectionHeader icon={ActivityIcon} title="Recent Activity" />
              <ul className="mt-3 space-y-3">
                {employee.recentActivity.map((a) => (
                  <li key={a.id} className="flex items-start gap-2 text-sm text-slate-500">
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-300" />
                    <div>
                      <span className="text-slate-700">{a.event}</span>
                      <span className="ml-1 text-slate-400">{formatRelative(a.at)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </RouteScaffold>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  trailing
}: {
  icon: typeof Circle;
  title: string;
  trailing?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-slate-400" />
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{title}</span>
      {trailing && (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
          {trailing}
        </span>
      )}
    </div>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Circle;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-slate-400" />
      <span className="w-20 shrink-0 text-xs font-semibold text-slate-500">{label}</span>
      <span className="text-sm text-slate-700">{value}</span>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
}
