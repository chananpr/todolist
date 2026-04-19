import { Link } from 'react-router-dom';
import {
  Mail,
  Globe,
  Calendar,
  Users,
  Briefcase,
  Activity as ActivityIcon,
  Zap,
  ExternalLink,
  Circle
} from 'lucide-react';
import { Drawer, Badge } from '../../../shared/ui';
import type { Employee } from '../../../shared/data/employees';

interface EmployeeDetailDrawerProps {
  employee: Employee | null;
  onClose: () => void;
}

export function EmployeeDetailDrawer({ employee, onClose }: EmployeeDetailDrawerProps) {
  if (!employee) return null;

  const workloadColor =
    employee.workload >= 80
      ? 'bg-rose-500'
      : employee.workload >= 60
        ? 'bg-amber-500'
        : 'bg-emerald-500';

  return (
    <Drawer open={!!employee} onClose={onClose} title={employee.name}>
      <div className="space-y-6 px-6 py-5">
        {/* Header: avatar + name + title */}
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-lg font-bold text-white shadow-soft">
            {employee.initial}
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">{employee.name}</h3>
            <p className="text-sm text-slate-500">{employee.title}</p>
          </div>
        </div>

        {/* Meta row */}
        <div className="space-y-2 rounded-lg bg-slate-50 px-4 py-3 text-sm">
          <MetaRow icon={Users} label="Team" value={employee.team} />
          <MetaRow icon={Mail} label="Email" value={employee.email} />
          <MetaRow icon={Globe} label="Timezone" value={employee.timezone} />
          <MetaRow icon={Calendar} label="Joined" value={formatDate(employee.joinedAt)} />
        </div>

        {/* Workload */}
        <section>
          <SectionHeader icon={Zap} title="Workload" trailing={`${employee.workload}%`} />
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              data-testid="workload-bar"
              className={`h-full rounded-full transition-all ${workloadColor}`}
              style={{ width: `${employee.workload}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {employee.activeTasks} active {employee.activeTasks === 1 ? 'task' : 'tasks'}
          </p>
        </section>

        {/* Active projects */}
        <section>
          <SectionHeader icon={Briefcase} title="Projects" trailing={String(employee.currentProjects.length)} />
          <ul className="mt-2 space-y-1" data-testid="project-list">
            {employee.currentProjects.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700"
              >
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section>
          <SectionHeader icon={Zap} title="Skills" />
          <div className="mt-2 flex flex-wrap gap-2" data-testid="skills-list">
            {employee.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </section>

        {/* Recent activity */}
        {employee.recentActivity.length > 0 && (
          <section>
            <SectionHeader icon={ActivityIcon} title="Recent Activity" />
            <ul className="mt-2 space-y-2" data-testid="activity-list">
              {employee.recentActivity.map((a) => (
                <li key={a.id} className="flex items-start gap-2 text-xs text-slate-500">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                  <div>
                    <span className="text-slate-700">{a.event}</span>
                    <span className="ml-1 text-slate-400">{formatRelative(a.at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Full page link */}
        <div className="border-t border-slate-100 pt-4">
          <Link
            to={`/teams/${employee.id}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Open full profile
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </Drawer>
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
