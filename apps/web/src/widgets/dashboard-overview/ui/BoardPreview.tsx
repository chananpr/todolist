import { motion } from 'framer-motion';
import { GripVertical, Layers } from 'lucide-react';
import { lanes } from '../../../shared/data/dashboard';

export function BoardPreview() {
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

      <div className="grid gap-6 xl:grid-cols-4">
        {lanes.map((lane, laneIndex) => (
          <div key={lane.title} className="rounded-[28px] border border-primary-100/70 bg-gradient-to-b from-primary-50/45 to-white p-4">
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${lane.accent}`} />
                <h4 className="text-sm font-bold text-slate-700">{lane.title}</h4>
              </div>
              <span className="text-[10px] font-bold text-slate-400">{lane.cards.length}</span>
            </div>

            <div className="space-y-4">
              {lane.cards.map((card, cardIndex) => (
                <motion.article
                  key={card.title}
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
                      <p className="mt-1.5 text-xs font-medium text-slate-400">{card.meta}</p>
                    </div>
                    <GripVertical className="relative z-10 mt-1 h-4 w-4 text-primary-200 group-hover:text-primary-400" />
                  </div>
                  
                  <div className="relative z-10 mt-5 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-primary-100 to-primary-50 shadow-sm" />
                      ))}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary-700/70">{card.assignee}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
