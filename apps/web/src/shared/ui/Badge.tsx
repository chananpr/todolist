import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary-100 bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary-700 shadow-soft">
      {children}
    </span>
  );
}
