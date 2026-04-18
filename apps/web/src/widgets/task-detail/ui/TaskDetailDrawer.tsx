import { useState } from 'react';
import {
  Circle,
  Clock,
  TriangleAlert,
  CircleAlert,
  CheckCircle2,
  CircleDot,
  MessageSquare,
  ListChecks,
  Activity as ActivityIcon,
  Send
} from 'lucide-react';
import { Drawer, Badge, Button } from '../../../shared/ui';
import type { Task, Subtask } from '../../../shared/data/projects';
import type { Priority } from '@taskforge/contracts';

interface TaskDetailDrawerProps {
  task: Task | null;
  onClose: () => void;
}

const PRIORITY_STYLES: Record<Priority, string> = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
  urgent: 'bg-rose-200 text-rose-800'
};

const STATUS_STYLES: Record<string, string> = {
  backlog: 'bg-slate-100 text-slate-600',
  todo: 'bg-sky-100 text-sky-700',
  in_progress: 'bg-amber-100 text-amber-700',
  review: 'bg-violet-100 text-violet-700',
  done: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-rose-100 text-rose-600'
};

const SUBTASK_ICON: Record<Subtask['status'], typeof Circle> = {
  todo: Circle,
  in_progress: CircleDot,
  done: CheckCircle2
};

export function TaskDetailDrawer({ task, onClose }: TaskDetailDrawerProps) {
  const [commentText, setCommentText] = useState('');

  if (!task) return null;

  return (
    <Drawer open={!!task} onClose={onClose} title={task.taskCode}>
      <div className="space-y-6 px-6 py-5">
        {/* Header: title + chips */}
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">{task.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[task.status] ?? STATUS_STYLES.backlog}`}
            >
              {task.status.replace('_', ' ')}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_STYLES[task.priority]}`}
            >
              {task.priority === 'high' && <TriangleAlert className="h-3 w-3" />}
              {task.priority === 'urgent' && <CircleAlert className="h-3 w-3" />}
              {task.priority}
            </span>
            <Badge>{task.projectId}</Badge>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 rounded-lg bg-slate-50 px-4 py-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-[10px] font-bold text-white shadow-soft">
              {task.assignee.initial}
            </span>
            <span className="font-medium text-slate-700">{task.assignee.name}</span>
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="h-4 w-4" />
              <span className="tabular-nums">{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {task.description && (
          <section>
            <SectionHeader icon={MessageSquare} title="Description" />
            <p className="mt-2 text-sm leading-6 text-slate-600">{task.description}</p>
          </section>
        )}

        {/* Subtasks */}
        {task.subtasks && task.subtasks.length > 0 && (
          <section>
            <SectionHeader
              icon={ListChecks}
              title="Subtasks"
              trailing={`${task.subtasks.filter((s) => s.status === 'done').length}/${task.subtasks.length}`}
            />
            <ul className="mt-2 space-y-1" data-testid="subtask-list">
              {task.subtasks.map((st) => {
                const Icon = SUBTASK_ICON[st.status];
                return (
                  <li key={st.id} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm">
                    <Icon
                      className={`h-4 w-4 ${
                        st.status === 'done'
                          ? 'text-emerald-500'
                          : st.status === 'in_progress'
                            ? 'text-amber-500'
                            : 'text-slate-300'
                      }`}
                    />
                    <span
                      className={
                        st.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-700'
                      }
                    >
                      {st.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Comments */}
        {task.comments && task.comments.length > 0 && (
          <section>
            <SectionHeader icon={MessageSquare} title="Comments" trailing={String(task.comments.length)} />
            <div className="mt-2 space-y-3">
              {task.comments.map((c) => (
                <div key={c.id} className="rounded-lg border border-slate-100 bg-white p-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-[8px] font-bold text-white">
                      {c.author.initial}
                    </span>
                    <span className="font-semibold text-slate-700">{c.author.name}</span>
                    <span className="text-slate-400">{formatRelative(c.createdAt)}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-5 text-slate-600">{c.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Add comment */}
        <section>
          <div className="flex gap-2">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              rows={2}
              className="flex-1 resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-200"
            />
            <Button variant="primary" size="sm" icon={Send} disabled={!commentText.trim()}>
              Send
            </Button>
          </div>
        </section>

        {/* Activity */}
        {task.activity && task.activity.length > 0 && (
          <section>
            <SectionHeader icon={ActivityIcon} title="Activity" />
            <ul className="mt-2 space-y-2">
              {task.activity.map((a) => (
                <li key={a.id} className="flex items-start gap-2 text-xs text-slate-500">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                  <div>
                    <span className="font-medium text-slate-700">{a.actor}</span>{' '}
                    <span>{a.event}</span>
                    <span className="ml-1 text-slate-400">{formatRelative(a.at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
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
