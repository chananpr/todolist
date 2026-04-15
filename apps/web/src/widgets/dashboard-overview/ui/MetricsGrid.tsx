import { motion } from 'framer-motion';
import type { DashboardMetric } from '@taskforge/contracts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsGridProps {
  metrics?: DashboardMetric;
  loading?: boolean;
}

const metricCards = [
  { label: 'Active Projects', key: 'activeProjects', tone: 'from-primary-300/45 via-primary-100/40 to-white' },
  { label: 'Tasks Due Today', key: 'dueToday', tone: 'from-sky-300/45 via-primary-50/60 to-white' },
  { label: 'Review Queue', key: 'reviewQueue', tone: 'from-indigo-300/35 via-primary-100/35 to-white' },
  { label: 'Overdue Tasks', key: 'overdue', tone: 'from-blue-300/35 via-primary-100/40 to-white' }
] as const;

export function MetricsGrid({ metrics, loading = false }: MetricsGridProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metricCards.map((metric, index) => {
        const value = metrics?.[metric.key] ?? 0;
        const delta = loading ? '...' : value > 0 ? `${value}` : '0';

        return (
        <motion.article
          key={metric.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="group relative overflow-hidden rounded-[28px] border border-primary-100/80 bg-white/90 p-6 shadow-soft transition-all hover:shadow-hover"
        >
          <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${metric.tone}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.72),transparent_32%)]" />
          <div className="flex items-center justify-between">
            <p className="relative z-10 text-sm font-bold text-slate-500">{metric.label}</p>
            <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-xl ${
              value > 0 ? 'bg-white text-primary-700 shadow-soft' : 'bg-slate-900 text-white shadow-soft'
            }`}>
              {value > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            </div>
          </div>
          
          <div className="relative z-10 mt-8 flex items-baseline gap-2">
            <h2 className="font-display text-4xl font-bold text-slate-900">{loading ? '...' : value}</h2>
            <span className={`text-xs font-bold ${
              value > 0 ? 'text-primary-700' : 'text-slate-700'
            }`}>
              {delta}
            </span>
          </div>

          <div className="relative z-10 mt-6 h-1.5 w-full overflow-hidden rounded-full bg-primary-100/80">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800"
            />
          </div>
          
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent group-hover:animate-shimmer" />
        </motion.article>
        );
      })}
    </section>
  );
}
