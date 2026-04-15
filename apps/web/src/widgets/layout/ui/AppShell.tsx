import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { primaryNavigation } from '../../../shared/config/navigation';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden text-sand">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:px-8">
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden w-72 flex-col rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur-xl lg:flex"
        >
          <div>
            <p className="font-display text-2xl font-bold tracking-tight text-sand">TaskForge</p>
            <p className="mt-2 text-sm text-sand/60">Enterprise command layer for work orchestration.</p>
          </div>

          <nav className="mt-10 space-y-2">
            {primaryNavigation.map(({ label, icon: Icon }, index) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * index }}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                  index === 0 ? 'bg-white/10 text-white' : 'text-sand/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-semibold">{label}</span>
              </motion.button>
            ))}
          </nav>

          <div className="mt-auto rounded-[28px] border border-emerald-300/20 bg-gradient-to-br from-emerald-300/15 via-emerald-200/5 to-transparent p-5">
            <p className="text-sm font-semibold text-white">AI workload guardrail</p>
            <p className="mt-2 text-sm leading-6 text-sand/65">
              3 project streams are approaching deadline pressure. Review AI allocation recommendations.
            </p>
          </div>
        </motion.aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
