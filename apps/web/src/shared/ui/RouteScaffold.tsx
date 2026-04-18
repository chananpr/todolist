import type { ReactNode } from 'react';
import { Wrench } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { EmptyState } from './EmptyState';
import type { RouteNode } from '../config/sitemap';

export interface RouteScaffoldProps {
  route: RouteNode;
  /** Optional override for the page title (useful when a detail page wants to show the entity name) */
  title?: string;
  /** Slot above the PageHeader (e.g. Breadcrumb) */
  leading?: ReactNode;
  /** Slot inside the PageHeader's action area */
  headerAction?: ReactNode;
  /** Main body — when provided, replaces the "not yet implemented" empty state */
  children?: ReactNode;
}

/**
 * Canonical page template. Every route SHOULD start with this wrapper
 * so that the hero rhythm, spacing, and empty-state pattern stay
 * consistent across the app.
 *
 * When a widget author implements a real page, they replace
 * `children` but keep `PageHeader` + the vertical rhythm intact.
 */
export function RouteScaffold({
  route,
  title,
  leading,
  headerAction,
  children
}: RouteScaffoldProps) {
  return (
    <div className="space-y-6 pb-8">
      {leading && <div>{leading}</div>}
      <PageHeader
        eyebrow={route.eyebrow}
        title={title ?? route.label}
        summary={route.summary}
        action={headerAction}
      />
      {children ?? (
        <EmptyState
          icon={Wrench}
          title="ยังไม่เริ่มพัฒนา"
          description={`หน้านี้ (${route.path}) เป็น scaffold — widget และ data flow ของ route จะถูกเติมในรอบถัดไป`}
        />
      )}
    </div>
  );
}
