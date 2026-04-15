import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Activity, ShieldCheck } from 'lucide-react';

export function HeroPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[36px] border border-primary-100/80 bg-[linear-gradient(140deg,#eff6ff_0%,#dbeafe_38%,#2563eb_100%)] p-8 shadow-panel lg:p-12"
    >
      <div className="absolute inset-y-0 right-0 w-[44%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.34),transparent_58%)]" />
      <div className="absolute -left-10 -top-12 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
      <div className="absolute bottom-0 right-8 h-56 w-56 rounded-full bg-primary-300/25 blur-3xl" />
      
      <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/55 px-4 py-1.5 backdrop-blur-md"
          >
            <Activity className="h-4 w-4 text-primary-700" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-900">Operations Command Center</span>
          </motion.div>
          
          <h1 className="mt-8 font-display text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
            Blue-chip workflow design for <span className="text-primary-700">AI-guided</span> execution.
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            TaskForge connects project execution, employee performance, and AI planning in one polished command surface built around blue-and-white operational clarity.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="group flex items-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
              Open Control Panel
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-100 bg-white/70">
                <ShieldCheck className="h-5 w-5 text-primary-700" />
              </div>
              <p className="text-sm font-medium text-slate-700">Audit-safe execution history</p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative w-full lg:w-[410px]"
        >
          <div className="rounded-[32px] border border-white/70 bg-white/78 p-8 shadow-2xl shadow-primary-300/20 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-200">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600">AI Plan Draft</p>
                  <p className="text-base font-bold text-slate-900">Website Replatform 2026</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 rounded-[24px] border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-primary-50/50 p-5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Generation Progress</span>
                <span className="text-primary-700">92%</span>
              </div>
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-primary-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '92%' }}
                  transition={{ delay: 0.8, duration: 1.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-800"
                />
              </div>
              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-white bg-white/90 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recommended Focus</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">Stabilize review queue before milestone lock.</p>
                </div>
                <div className="rounded-2xl border border-white bg-white/90 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Suggested Action</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">Shift QA planning into a separate execution stream.</p>
                </div>
              </div>
            </div>
            
            <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 py-4 text-sm font-bold text-white shadow-lg shadow-primary-200/70 transition-all hover:translate-y-[-2px] hover:shadow-hover">
              Open Generated Execution Plan
            </button>
          </div>
          
          <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary-700 shadow-lg shadow-primary-200">
            <Activity className="h-5 w-5" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
