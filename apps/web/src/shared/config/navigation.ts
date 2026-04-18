import type { LucideIcon } from 'lucide-react';
import { getNavRoutes, type RouteNode } from './sitemap';

/**
 * Sidebar navigation items. Derived from sitemap.ts — add or reorder
 * nav items by editing sitemap.ts, not here.
 */
export interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
  eyebrow: string;
  summary: string;
  highlights: string[];
}

function toNavigationItem(route: RouteNode): NavigationItem {
  if (!route.icon) {
    throw new Error(`sitemap: route "${route.path}" is marked showInNav but has no icon`);
  }
  return {
    label: route.label,
    path: route.path,
    icon: route.icon,
    eyebrow: route.eyebrow,
    summary: route.summary,
    highlights: route.highlights ?? []
  };
}

export const primaryNavigation: NavigationItem[] = getNavRoutes().map(toNavigationItem);
