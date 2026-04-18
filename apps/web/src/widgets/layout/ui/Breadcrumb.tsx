import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getBreadcrumbChain } from '../../../shared/config/sitemap';

/**
 * Renders the route ancestor chain for the current URL, derived from
 * sitemap.ts. Detail routes with `:id` show the raw segment from the
 * URL (e.g. "/projects/demo" renders "Projects → demo").
 */
export function Breadcrumb() {
  const { pathname } = useLocation();
  const chain = getBreadcrumbChain(pathname);

  if (chain.length <= 1) return null;

  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
      {chain.map((node, index) => {
        const isLast = index === chain.length - 1;
        // For detail routes, replace the :param label with the actual URL segment
        const label = node.isDetail && segments[index - 1] ? segments[index - 1] : node.label;
        return (
          <span key={node.path} className="inline-flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3 w-3 text-slate-300" />}
            {isLast ? (
              <span className="text-slate-700" aria-current="page">
                {label}
              </span>
            ) : node.isDetail ? (
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
