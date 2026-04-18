import type { HTMLAttributes, ReactNode } from 'react';

type CardVariant = 'default' | 'panel' | 'flat';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children?: ReactNode;
}

const VARIANT: Record<CardVariant, string> = {
  /** Solid white card — default surface for lists, metrics, content blocks */
  default: 'rounded-xl border border-slate-100 bg-white p-6 shadow-soft',
  /** Translucent blurred panel — hero, modal, drawer */
  panel: 'rounded-2xl glass-panel p-6',
  /** No shadow, minimal chrome — compact inline card */
  flat: 'rounded-xl bg-white p-6'
};

/** See design/components.html > Card variants */
export function Card({ variant = 'default', className = '', children, ...rest }: CardProps) {
  return (
    <div className={`${VARIANT[variant]} ${className}`} {...rest}>
      {children}
    </div>
  );
}
