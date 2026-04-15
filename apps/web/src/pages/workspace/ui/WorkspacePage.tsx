import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkspacePageProps {
  eyebrow: string;
  title: string;
  summary: string;
  highlights: string[];
}

export function WorkspacePage({ eyebrow, title, summary, highlights }: WorkspacePageProps) {
  return (
    <div className="space-y-6 pb-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-panel"
      >
        <div className="grid gap-8 p-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary-600">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{summary}</p>
          </div>

          <div className="rounded-[28px] border border-primary-100 bg-primary-50/70 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-soft">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Route Ready</p>
                <p className="text-xs leading-5 text-slate-500">Sidebar navigation now resolves to a real route.</p>
              </div>
            </div>
            <Link
              to="/"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-primary-700"
            >
              Back to Overview
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-6 xl:grid-cols-3">
        {highlights.map((item, index) => (
          <motion.article
            key={item}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Implementation Focus {index + 1}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
