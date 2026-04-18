import type { ReactNode } from 'react';

export interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  /** Trailing slot (e.g. "See all" link, filter chip, count badge) */
  trailing?: ReactNode;
  className?: string;
}

/**
 * Small header used above a group of widgets/cards. Keeps rhythm
 * consistent with PageHeader but is lighter weight.
 */
export function SectionTitle({ eyebrow, title, trailing, className = '' }: SectionTitleProps) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div>
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-600">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          {title}
        </h2>
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}
