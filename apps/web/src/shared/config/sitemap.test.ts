import { describe, expect, it } from 'vitest';
import {
  ROLE_LEVEL,
  findRouteByPath,
  findRouteByPattern,
  flattenSitemap,
  getBreadcrumbChain,
  getNavRoutes,
  isAccessible,
  sitemap
} from './sitemap';

describe('sitemap structure', () => {
  it('includes every route declared in design/sitemap.md', () => {
    const paths = flattenSitemap().map((node) => node.path).sort();
    expect(paths).toEqual(
      [
        '/',
        '/ai-planner',
        '/ai-planner/:id',
        '/kpi',
        '/kpi/:metric',
        '/login',
        '/projects',
        '/projects/:id',
        '/projects/:id/board',
        '/security',
        '/security/audit',
        '/security/roles',
        '/teams',
        '/teams/:id',
        '/theme-showcase'
      ].sort()
    );
  });

  it('gives every route a label, eyebrow, summary, and minRole', () => {
    for (const node of flattenSitemap()) {
      expect(node.label, `${node.path} label`).toBeTruthy();
      expect(node.eyebrow, `${node.path} eyebrow`).toBeTruthy();
      expect(node.summary, `${node.path} summary`).toBeTruthy();
      expect(node.minRole, `${node.path} minRole`).toBeTruthy();
    }
  });

  it('requires an icon for every nav-visible route', () => {
    for (const node of getNavRoutes()) {
      expect(node.icon, `${node.path} must have an icon to appear in nav`).toBeDefined();
    }
  });
});

describe('getNavRoutes', () => {
  it('returns only routes with showInNav=true in declaration order', () => {
    const navPaths = getNavRoutes().map((n) => n.path);
    expect(navPaths).toEqual(['/', '/projects', '/ai-planner', '/teams', '/kpi', '/security']);
  });

  it('excludes login and theme-showcase from the sidebar', () => {
    const navPaths = getNavRoutes().map((n) => n.path);
    expect(navPaths).not.toContain('/login');
    expect(navPaths).not.toContain('/theme-showcase');
  });
});

describe('findRouteByPath', () => {
  it('matches literal top-level paths', () => {
    expect(findRouteByPath('/')?.label).toBe('Overview');
    expect(findRouteByPath('/projects')?.label).toBe('Projects');
    expect(findRouteByPath('/security')?.label).toBe('Security');
  });

  it('resolves detail URLs against their stored :param pattern', () => {
    expect(findRouteByPath('/projects/abc-123')?.path).toBe('/projects/:id');
    expect(findRouteByPath('/projects/abc-123/board')?.path).toBe('/projects/:id/board');
    expect(findRouteByPath('/kpi/throughput')?.path).toBe('/kpi/:metric');
    expect(findRouteByPath('/teams/alex')?.path).toBe('/teams/:id');
  });

  it('strips query strings and hashes before matching', () => {
    expect(findRouteByPath('/projects?filter=active')?.path).toBe('/projects');
    expect(findRouteByPath('/projects#section')?.path).toBe('/projects');
  });

  it('returns undefined for unknown paths', () => {
    expect(findRouteByPath('/does-not-exist')).toBeUndefined();
    expect(findRouteByPath('/projects/abc/extra')).toBeUndefined();
  });
});

describe('findRouteByPattern', () => {
  it('matches the exact stored pattern string', () => {
    expect(findRouteByPattern('/projects/:id')?.label).toBe('Project Detail');
    expect(findRouteByPattern('/security/audit')?.label).toBe('Audit Log');
  });

  it('does not match a URL against a pattern', () => {
    // pattern lookup is literal, not URL-aware
    expect(findRouteByPattern('/projects/abc')).toBeUndefined();
  });
});

describe('getBreadcrumbChain', () => {
  it('returns root-first chain ending at the matched route', () => {
    const chain = getBreadcrumbChain('/projects/demo/board').map((n) => n.path);
    expect(chain).toEqual(['/projects', '/projects/:id', '/projects/:id/board']);
  });

  it('returns single-entry chain for top-level routes', () => {
    expect(getBreadcrumbChain('/').map((n) => n.path)).toEqual(['/']);
    expect(getBreadcrumbChain('/kpi').map((n) => n.path)).toEqual(['/kpi']);
  });

  it('returns empty chain for unknown paths', () => {
    expect(getBreadcrumbChain('/nope')).toEqual([]);
  });
});

describe('role access', () => {
  it('orders roles public < member < manager < admin', () => {
    expect(ROLE_LEVEL.public).toBeLessThan(ROLE_LEVEL.member);
    expect(ROLE_LEVEL.member).toBeLessThan(ROLE_LEVEL.manager);
    expect(ROLE_LEVEL.manager).toBeLessThan(ROLE_LEVEL.admin);
  });

  it('grants members access to member-level routes', () => {
    const projects = findRouteByPath('/projects')!;
    expect(isAccessible('member', projects)).toBe(true);
    expect(isAccessible('manager', projects)).toBe(true);
    expect(isAccessible('admin', projects)).toBe(true);
  });

  it('blocks members from manager-only routes', () => {
    const kpi = findRouteByPath('/kpi')!;
    expect(isAccessible('member', kpi)).toBe(false);
    expect(isAccessible('manager', kpi)).toBe(true);
  });

  it('blocks non-admins from admin-only security routes', () => {
    const audit = findRouteByPath('/security/audit')!;
    expect(isAccessible('member', audit)).toBe(false);
    expect(isAccessible('manager', audit)).toBe(false);
    expect(isAccessible('admin', audit)).toBe(true);
  });

  it('allows anyone public on the login route', () => {
    const login = sitemap.find((r) => r.path === '/login')!;
    expect(isAccessible('public', login)).toBe(true);
    expect(isAccessible('admin', login)).toBe(true);
  });
});
