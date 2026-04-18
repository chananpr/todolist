import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  summary?: string;
  /** Action slot on the right (Button, link, badge group, etc.) */
  action?: ReactNode;
  className?: string;
}

/**
 * Standard page-top section: eyebrow → title → summary, with optional
 * action slot on the right. Pattern pulled from the original
 * WorkspacePage hero so all pages share the same introductory rhythm.
 */
export function PageHeader({ eyebrow, title, summary, action, className = '' }: PageHeaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      className={`overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 shadow-panel ${className}`}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary-600">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h1>
          {summary && (
            <p className="mt-5 text-base leading-8 text-slate-600">{summary}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </motion.section>
  );
}
