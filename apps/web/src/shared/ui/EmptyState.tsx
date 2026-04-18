import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  /** Action slot (Button, link, etc.) */
  action?: ReactNode;
  className?: string;
}

/**
 * Placeholder surface used when a page/section has no content yet,
 * or when a scaffold route is awaiting implementation.
 * Pattern: dashed border primary-200, bg-primary-50/40, centered.
 */
export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/40 p-10 text-center ${className}`}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-soft">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 font-display text-lg font-semibold text-slate-900">{title}</p>
      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      )}
      {action && <div className="mt-5 inline-flex">{action}</div>}
    </div>
  );
}
