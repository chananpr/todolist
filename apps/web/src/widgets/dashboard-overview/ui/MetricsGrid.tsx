import { motion } from 'framer-motion';
import { metrics } from '../../../shared/data/dashboard';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MetricsGrid() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
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
              metric.delta.startsWith('+') ? 'bg-white text-primary-700 shadow-soft' : 'bg-slate-900 text-white shadow-soft'
            }`}>
              {metric.delta.startsWith('+') ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            </div>
          </div>
          
          <div className="relative z-10 mt-8 flex items-baseline gap-2">
            <h2 className="font-display text-4xl font-bold text-slate-900">{metric.value}</h2>
            <span className={`text-xs font-bold ${
              metric.delta.startsWith('+') ? 'text-primary-700' : 'text-slate-700'
            }`}>
              {metric.delta}
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
      ))}
    </section>
  );
}
