/**
 * Shared UI primitives.
 *
 * When building a new page or widget, reuse from here BEFORE creating a
 * new component. If you need a variant that doesn't exist, extend the
 * existing primitive rather than forking a sibling component.
 *
 * Design reference: design/components.html, design/tokens.md
 */

export { Badge } from './Badge';
export { Button, type ButtonProps } from './Button';
export { Card, type CardProps } from './Card';
export { PageHeader, type PageHeaderProps } from './PageHeader';
export { SectionTitle, type SectionTitleProps } from './SectionTitle';
export { EmptyState, type EmptyStateProps } from './EmptyState';
export { RouteScaffold, type RouteScaffoldProps } from './RouteScaffold';
