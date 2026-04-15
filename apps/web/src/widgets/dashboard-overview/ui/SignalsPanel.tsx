import { motion } from 'framer-motion';
import type { DashboardLoadItem } from '@taskforge/contracts';
import { AlertCircle, Bot, Zap, History } from 'lucide-react';

interface SignalsPanelProps {
  signals: string[];
  load: DashboardLoadItem[];
  recentActivity: string[];
  loading?: boolean;
  error?: string | null;
}

export function SignalsPanel({ signals, load, recentActivity, loading = false, error }: SignalsPanelProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[32px] border border-primary-100/80 bg-white/90 p-6 shadow-panel lg:p-8"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-white text-primary-700 shadow-soft">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600">AI Intelligence</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">Strategic Recommendations</h3>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {signals.length === 0 && !loading ? (
            <div className="rounded-2xl border border-dashed border-primary-100 bg-gradient-to-r from-primary-50/60 to-white p-4 text-sm font-medium text-slate-400">
              No live recommendations yet. Add projects and tasks to generate operational signals.
            </div>
          ) : null}

          {signals.map((signal, index) => (
            <motion.div
              key={signal}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.07 }}
              className="flex items-start gap-4 rounded-2xl border border-primary-100/70 bg-gradient-to-r from-primary-50/60 to-white p-4 transition-colors hover:border-primary-200"
            >
              <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white shadow-soft">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-600" />
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-600">{signal}</p>
            </motion.div>
          ))}
        </div>
      </motion.article>

      <div className="grid gap-6">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[32px] border border-primary-100/80 bg-white/90 p-6 shadow-panel"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-white text-primary-700 shadow-soft">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Resource Management</p>
              <h3 className="mt-1 font-display text-xl font-bold text-slate-900">Workflow Load</h3>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {load.length === 0 && !loading ? (
              <div className="rounded-2xl border border-dashed border-primary-100 bg-white/70 p-4 text-sm font-medium text-slate-400">
                No task distribution available yet.
              </div>
            ) : null}

            {load.map((team) => (
              <div key={team.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">{team.name}</span>
                  <span className="text-xs font-bold text-slate-400">{team.load}%</span>
                </div>
                <div className="h-2 rounded-full bg-primary-100/70">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${team.load}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className={`h-2 rounded-full ${
                      team.load > 80 ? 'bg-slate-900' : 'bg-gradient-to-r from-primary-500 to-primary-700'
                    }`}
                  />
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <AlertCircle className={`h-3 w-3 ${team.load > 80 ? 'text-slate-700' : 'text-primary-300'}`} />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{team.tasks} active tasks</p>
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[32px] border border-primary-100/80 bg-white/90 p-6 shadow-panel"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-white text-primary-700 shadow-soft">
              <History className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Activity Logs</p>
              <h3 className="mt-1 font-display text-xl font-bold text-slate-900">Operational Timeline</h3>
            </div>
          </div>

          <ul className="mt-8 space-y-4">
            {error ? (
              <li className="text-sm font-medium text-rose-600">{error}</li>
            ) : null}

            {recentActivity.length === 0 && !loading && !error ? (
              <li className="text-sm font-medium text-slate-400">No recent database activity yet.</li>
            ) : null}

            {recentActivity.map((item, i) => (
              <li key={i} className="relative flex items-center gap-3 pl-4 before:absolute before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary-300">
                <span className="text-sm font-medium text-slate-500">{item}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>
    </section>
  );
}
