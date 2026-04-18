import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children?: ReactNode;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 text-white shadow-soft hover:bg-primary-700 active:scale-[0.98] disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none',
  secondary:
    'bg-white border border-primary-200 text-primary-700 hover:bg-primary-50 active:scale-[0.98] disabled:border-slate-200 disabled:text-slate-400',
  ghost:
    'text-primary-600 hover:bg-primary-50 active:scale-[0.98] disabled:text-slate-400',
  danger:
    'bg-rose-600 text-white shadow-soft hover:bg-rose-700 active:scale-[0.98] disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none'
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5',
  md: 'h-10 px-4 text-sm gap-2 [&_svg]:h-4 [&_svg]:w-4',
  lg: 'h-12 px-6 text-base gap-2 [&_svg]:h-5 [&_svg]:w-5'
};

/**
 * Primary interactive element. Follow design/tokens.md:
 *   - rounded-md
 *   - font-semibold
 *   - motion ≤ 150ms (hover/active)
 *   - colors only from palette (primary/slate/rose)
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    loading,
    disabled,
    className = '',
    children,
    ...rest
  },
  ref
) {
  const iconNode = Icon ? <Icon aria-hidden /> : null;
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-md font-semibold transition duration-150 ease-out disabled:cursor-not-allowed ${SIZE[size]} ${VARIANT[variant]} ${className}`}
      {...rest}
    >
      {iconPosition === 'left' && iconNode}
      {loading ? <span className="animate-pulse">…</span> : children}
      {iconPosition === 'right' && iconNode}
    </button>
  );
});
