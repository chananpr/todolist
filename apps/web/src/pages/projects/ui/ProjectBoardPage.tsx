import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowLeft, TriangleAlert, Clock, CircleAlert } from 'lucide-react';
import { Button, Card, RouteScaffold } from '../../../shared/ui';
import { findRouteByPattern } from '../../../shared/config/sitemap';
import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';
import {
  findProject,
  tasksForProject,
  TASK_BOARD_COLUMNS,
  type Task
} from '../../../shared/data/projects';
import type { TaskBoardColumn, Priority } from '@taskforge/contracts';

const LANE_LABELS: Record<TaskBoardColumn, string> = {
  backlog: 'Backlog',
  todo: 'To do',
  in_progress: 'In progress',
  review: 'Review',
  done: 'Done',
  cancelled: 'Cancelled'
};

export function ProjectBoardPage() {
  const { id } = useParams<{ id: string }>();
  const route = findRouteByPattern('/projects/:id/board')!;
  const project = id ? findProject(id) : undefined;
  const initialTasks = useMemo(() => (id ? tasksForProject(id) : []), [id]);

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const byLane = useMemo(() => {
    const groups = Object.fromEntries(
      TASK_BOARD_COLUMNS.map((c) => [c, [] as Task[]])
    ) as Record<TaskBoardColumn, Task[]>;
    for (const t of tasks) groups[t.status].push(t);
    return groups;
  }, [tasks]);

  function handleDragStart(event: DragStartEvent) {
    setActiveTaskId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTaskId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // The `over` target is either a lane container (its id == lane key)
    // or another task (its id == task id — we read data.sortable.containerId)
    const overLane = (TASK_BOARD_COLUMNS as readonly string[]).includes(overId)
      ? (overId as TaskBoardColumn)
      : (over.data.current?.sortable?.containerId as TaskBoardColumn | undefined);

    if (!overLane) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === activeId && t.status !== overLane ? { ...t, status: overLane } : t))
    );
  }

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

  const activeTask = tasks.find((t) => t.id === activeTaskId) ?? null;

  return (
    <RouteScaffold
      route={route}
      title={`Board — ${project.name}`}
      leading={<Breadcrumb />}
      headerAction={
        <Link to={`/projects/${project.id}`}>
          <Button variant="secondary" icon={ArrowLeft}>
            Overview
          </Button>
        </Link>
      }
    >
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
          {TASK_BOARD_COLUMNS.map((lane) => (
            <Lane key={lane} lane={lane} tasks={byLane[lane]} />
          ))}
        </div>

        <DragOverlay>{activeTask ? <TaskCard task={activeTask} isOverlay /> : null}</DragOverlay>
      </DndContext>
    </RouteScaffold>
  );
}

function Lane({ lane, tasks }: { lane: TaskBoardColumn; tasks: Task[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: lane });
  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border p-3 transition-colors ${
        isOver ? 'border-primary-300 bg-primary-50/60' : 'border-slate-100 bg-slate-50/70'
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          {LANE_LABELS[lane]}
        </p>
        <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-slate-600 shadow-soft">
          {tasks.length}
        </span>
      </div>

      <SortableContext id={lane} items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex min-h-[80px] flex-col gap-2">
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-200 bg-white/40 p-3 text-center text-[11px] text-slate-400">
              Drop tasks here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableTaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} />
    </div>
  );
}

function TaskCard({ task, isOverlay = false }: { task: Task; isOverlay?: boolean }) {
  const priorityDot: Record<Priority, string> = {
    low: 'bg-slate-300',
    medium: 'bg-amber-500',
    high: 'bg-rose-500',
    urgent: 'bg-rose-600'
  };
  const showUrgent = task.priority === 'urgent';

  return (
    <article
      className={`cursor-grab select-none rounded-lg border border-slate-100 bg-white p-3 shadow-soft transition ${
        isOverlay ? 'rotate-1 shadow-hover' : 'hover:-translate-y-0.5 hover:shadow-hover'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[10px] font-semibold text-slate-400">{task.taskCode}</p>
          <p className="mt-0.5 text-sm font-semibold leading-5 text-slate-900">{task.title}</p>
        </div>
        <span
          title={task.priority}
          className={`mt-1 inline-flex h-2 w-2 shrink-0 rounded-full ${priorityDot[task.priority]}`}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <div className="inline-flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-[9px] font-bold text-white">
            {task.assignee.initial}
          </span>
          <span>{task.assignee.name.split(' ')[0]}</span>
        </div>
        <div className="flex items-center gap-2">
          {task.dueDate && (
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Clock className="h-3 w-3" />
              {formatShort(task.dueDate)}
            </span>
          )}
          {task.priority === 'high' && <TriangleAlert className="h-3.5 w-3.5 text-rose-500" />}
          {showUrgent && <CircleAlert className="h-3.5 w-3.5 text-rose-600" />}
        </div>
      </div>
    </article>
  );
}

function formatShort(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
}
