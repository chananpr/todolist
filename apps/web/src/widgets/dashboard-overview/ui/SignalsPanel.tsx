import { motion } from 'framer-motion';
import { AlertTriangle, Bot, TrendingUp } from 'lucide-react';
import { aiSignals, recentActivity, teamLoad } from '../../../shared/data/dashboard';

export function SignalsPanel() {
  return (
    <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-panel backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-mint/15 p-3 text-mint">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-sand/50">AI Signals</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-white">Planning Recommendations</h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {aiSignals.map((signal, index) => (
            <motion.div
              key={signal}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.07 }}
              className="rounded-3xl border border-white/10 bg-night/40 p-4"
            >
              <p className="text-sm leading-7 text-sand/80">{signal}</p>
            </motion.div>
          ))}
        </div>
      </motion.article>

      <div className="grid gap-4">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-panel backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-ember/15 p-3 text-ember">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-sand/50">Team Capacity</p>
              <h3 className="mt-1 font-display text-xl font-bold text-white">Current Load</h3>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {teamLoad.map((team) => (
              <div key={team.name}>
                <div className="mb-2 flex items-center justify-between text-sm text-sand/70">
                  <span>{team.name}</span>
                  <span>{team.load}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5">
                  <div className="h-2 rounded-full bg-gradient-to-r from-mint to-emerald-300" style={{ width: `${team.load}%` }} />
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-sand/35">{team.tasks} active tasks</p>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-panel backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-yellow-400/15 p-3 text-yellow-300">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-sand/50">Recent Activity</p>
              <h3 className="mt-1 font-display text-xl font-bold text-white">Operational Timeline</h3>
            </div>
          </div>

          <ul className="mt-5 space-y-3">
            {recentActivity.map((item) => (
              <li key={item} className="rounded-3xl border border-white/10 bg-night/40 px-4 py-3 text-sm text-sand/75">
                {item}
              </li>
            ))}
          </ul>
        </motion.article>
      </div>
    </section>
  );
}
