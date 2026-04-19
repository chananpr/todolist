import { useState } from 'react';
import { RouteScaffold, Card, SectionTitle } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';
import { EMPLOYEES, findEmployee } from '../../../shared/data/employees';
import { EmployeeDetailDrawer } from '../../../widgets/employee-detail/ui/EmployeeDetailDrawer';

export function TeamsPage() {
  const route = findRouteByPattern('/teams')!;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <RouteScaffold route={route} leading={<Breadcrumb />}>
      <SectionTitle
        eyebrow="Directory"
        title="All Members"
        trailing={
          <span className="text-sm text-slate-500">{EMPLOYEES.length} people</span>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {EMPLOYEES.map((emp) => {
          const workloadColor =
            emp.workload >= 80
              ? 'bg-rose-500'
              : emp.workload >= 60
                ? 'bg-amber-500'
                : 'bg-emerald-500';

          return (
            <Card
              key={emp.id}
              className="cursor-pointer transition hover:-translate-y-0.5 hover:shadow-hover"
              onClick={() => setSelectedId(emp.id)}
              data-testid={`employee-card-${emp.id}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white shadow-soft">
                  {emp.initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold text-slate-900">{emp.name}</p>
                  <p className="truncate text-xs text-slate-500">{emp.title}</p>
                </div>
              </div>

              {/* Workload bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Workload</span>
                  <span className="tabular-nums font-semibold">{emp.workload}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all ${workloadColor}`}
                    style={{ width: `${emp.workload}%` }}
                  />
                </div>
              </div>

              {/* Active tasks */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{emp.activeTasks} active {emp.activeTasks === 1 ? 'task' : 'tasks'}</span>
                <span className="font-medium text-slate-400">{emp.team}</span>
              </div>
            </Card>
          );
        })}
      </div>

      <EmployeeDetailDrawer
        employee={selectedId ? findEmployee(selectedId) ?? null : null}
        onClose={() => setSelectedId(null)}
      />
    </RouteScaffold>
  );
}
