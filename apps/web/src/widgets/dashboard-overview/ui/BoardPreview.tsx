import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { lanes } from '../../../shared/data/dashboard';

export function BoardPreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-panel backdrop-blur-xl"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-sand/50">Live Workflow</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white">Delivery Board</h3>
        </div>
        <p className="text-sm text-sand/60">Drag and drop lanes with audit-safe movement history</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {lanes.map((lane, laneIndex) => (
          <div key={lane.title} className="rounded-[28px] border border-white/10 bg-night/50 p-4">
            <div className="mb-4 flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full ${lane.accent}`} />
              <h4 className="text-sm font-semibold text-white">{lane.title}</h4>
            </div>

            <div className="space-y-3">
              {lane.cards.map((card, cardIndex) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + laneIndex * 0.06 + cardIndex * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{card.title}</p>
                      <p className="mt-2 text-sm text-sand/60">{card.meta}</p>
                    </div>
                    <GripVertical className="mt-1 h-4 w-4 text-sand/30" />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.24em] text-sand/40">{card.assignee}</p>
                </motion.article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
