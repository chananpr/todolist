import { motion } from 'framer-motion';
import { metrics } from '../../../shared/data/dashboard';

export function MetricsGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.article
          key={metric.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.08 }}
          className={`overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br ${metric.tone} p-5 shadow-panel backdrop-blur-xl`}
        >
          <p className="text-sm text-sand/65">{metric.label}</p>
          <div className="mt-7 flex items-end justify-between">
            <h2 className="font-display text-4xl font-bold text-white">{metric.value}</h2>
            <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-sm font-semibold text-mint">
              {metric.delta}
            </span>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
