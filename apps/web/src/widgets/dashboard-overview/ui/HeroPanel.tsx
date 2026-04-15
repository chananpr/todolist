import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '../../../shared/ui/Badge';

export function HeroPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(99,242,213,0.17),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-panel backdrop-blur-xl"
    >
      <div className="absolute right-10 top-8 h-40 w-40 rounded-full bg-ember/20 blur-3xl" />
      <div className="absolute bottom-8 right-28 h-24 w-24 rounded-full bg-mint/15 blur-2xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Badge>Operations Command Center</Badge>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
            Plan, assign, and measure execution with AI-native workflow control.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-sand/70 md:text-lg">
            TaskForge connects project execution, employee performance, audit trails, and AI planning in one production-focused workspace.
          </p>
        </div>

        <div className="grid gap-3 rounded-[28px] border border-white/10 bg-night/50 p-4 lg:min-w-[320px]">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-sand/50">AI plan draft</p>
              <p className="mt-1 text-sm font-semibold text-white">Website Replatform 2026</p>
            </div>
            <Sparkles className="h-5 w-5 text-mint" />
          </div>
          <button className="group inline-flex items-center justify-between rounded-2xl bg-sand px-4 py-3 text-sm font-bold text-night transition hover:translate-y-[-1px]">
            Open generated execution plan
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
