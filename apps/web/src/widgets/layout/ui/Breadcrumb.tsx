import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getBreadcrumbChain, type RouteNode } from '../../../shared/config/sitemap';

/**
 * Renders the route ancestor chain for the current URL, derived from
 * sitemap.ts.
 *
 * Label rule:
 *   - If the node's stored pattern ends with a `:param` placeholder,
 *     show the URL segment at that position (e.g. `/projects/:id` at
 *     URL `/projects/phoenix-2026` → "phoenix-2026").
 *   - Otherwise, show `node.label`.
 *
 * A route may have params mid-path but a literal last segment
 * (e.g. `/projects/:id/board`). Those still show their label.
 */
export function Breadcrumb() {
  const { pathname } = useLocation();
  const chain = getBreadcrumbChain(pathname);

  if (chain.length <= 1) return null;

  const urlSegments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
      {chain.map((node, index) => {
        const isLast = index === chain.length - 1;
        const label = labelFor(node, urlSegments);
        const isParamTail = endsWithParam(node);
        return (
          <span key={node.path} className="inline-flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3 w-3 text-slate-300" />}
            {isLast ? (
              <span className="text-slate-700" aria-current="page">
                {label}
              </span>
            ) : isParamTail ? (
              // Can't link to a raw pattern; show as plain text
              <span className="text-slate-500">{label}</span>
            ) : (
              <Link to={node.path} className="text-slate-500 transition hover:text-primary-600">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

function endsWithParam(node: RouteNode): boolean {
  const tail = node.path.split('/').filter(Boolean).pop();
  return tail ? tail.startsWith(':') : false;
}

function labelFor(node: RouteNode, urlSegments: string[]): string {
  if (!endsWithParam(node)) return node.label;
  const depth = node.path.split('/').filter(Boolean).length;
  return urlSegments[depth - 1] ?? node.label;
}
