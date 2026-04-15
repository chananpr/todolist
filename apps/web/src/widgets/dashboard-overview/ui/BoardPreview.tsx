import { motion } from 'framer-motion';
import type { DashboardBoardLane } from '@taskforge/contracts';
import { GripVertical, Layers } from 'lucide-react';

interface BoardPreviewProps {
  lanes: DashboardBoardLane[];
  loading?: boolean;
  error?: string | null;
}

function getLaneAccent(key: string) {
  switch (key) {
    case 'backlog':
      return 'bg-slate-500';
    case 'todo':
      return 'bg-primary-400';
    case 'in_progress':
      return 'bg-primary-500';
    case 'review':
      return 'bg-sky-400';
    case 'done':
      return 'bg-blue-700';
    case 'cancelled':
      return 'bg-slate-300';
    default:
      return 'bg-primary-300';
  }
}

export function BoardPreview({ lanes, loading = false, error }: BoardPreviewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[32px] border border-primary-100/80 bg-white/88 p-6 shadow-panel lg:p-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-white text-primary-700 shadow-soft">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600">Live Workflow</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">Delivery Board</h3>
          </div>
        </div>
        <p className="hidden text-sm font-medium text-slate-400 lg:block">Drag and drop lanes with audit-safe movement history</p>
      </div>

      {error ? (
        <div className="rounded-[28px] border border-rose-200 bg-rose-50/80 p-6 text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-4">
        {lanes.map((lane, laneIndex) => (
          <div key={lane.title} className="rounded-[28px] border border-primary-100/70 bg-gradient-to-b from-primary-50/45 to-white p-4">
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${getLaneAccent(lane.key)}`} />
                <h4 className="text-sm font-bold text-slate-700">{lane.title}</h4>
              </div>
              <span className="text-[10px] font-bold text-slate-400">{lane.cards.length}</span>
            </div>

            <div className="space-y-4">
              {lane.cards.length === 0 && !loading ? (
                <div className="rounded-2xl border border-dashed border-primary-100 bg-white/70 p-4 text-sm font-medium text-slate-400">
                  No tasks in this column.
                </div>
              ) : null}

              {lane.cards.map((card, cardIndex) => (
                <motion.article
                  key={card.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + laneIndex * 0.06 + cardIndex * 0.04 }}
                  whileHover={{ y: -4, shadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  className="group relative cursor-grab active:cursor-grabbing rounded-2xl border border-primary-100/80 bg-white p-4 shadow-soft transition-all"
                >
                  <div className="absolute inset-x-0 top-0 h-16 rounded-t-2xl bg-gradient-to-br from-primary-50 via-primary-50/60 to-white" />
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative z-10">
                      <p className="text-sm font-bold text-slate-800 transition-colors group-hover:text-primary-600">{card.title}</p>
                      <p className="mt-1.5 text-xs font-medium text-slate-400">
                        {card.taskCode} · Priority {card.priority} · {Math.round(card.progressPercent)}%
                      </p>
                    </div>
                    <GripVertical className="relative z-10 mt-1 h-4 w-4 text-primary-200 group-hover:text-primary-400" />
                  </div>
                  
                  <div className="relative z-10 mt-5 flex items-center justify-between">
                    <div className="rounded-full border border-primary-100 bg-primary-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-700">
                      Project #{card.projectId}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary-700/70">
                      {card.dueDate ? new Date(card.dueDate).toLocaleDateString() : 'No due date'}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        ))}
        </div>
      )}
    </motion.section>
  );
}
