# Frontend Agent Guide

This folder contains the TaskForge frontend application.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Vitest + React Testing Library

## Source Layout

```text
apps/web/src/
  app/
    AppLayout.tsx
    router.tsx
  pages/
    dashboard/ui/
    login/ui/
    projects/ui/              # ProjectsListPage, ProjectDetailPage, ProjectBoardPage
    ai-planner/ui/            # AIPlannerPage, AIDraftPage
    teams/ui/                 # TeamsPage, EmployeePage
    kpi/ui/                   # KPIPage, MetricPage
    security/ui/              # SecurityPage, RolesPage, AuditPage
    theme-showcase/ui/
    not-found/ui/
  widgets/
    dashboard-overview/ui/
    layout/ui/                # AppShell, Breadcrumb
  shared/
    api/
    config/
      navigation.ts           # derived from sitemap.ts
      sitemap.ts              # ← route source of truth
    data/
    lib/
    styles/
      index.css               # Tailwind base + glass-panel / glass-card utilities
    ui/                       # primitives — reuse first!
  test/
    setup.ts                  # Vitest/RTL setup
```

## Foundations AI Must Reuse

### 1. Sitemap (source of truth)

- **File:** `src/shared/config/sitemap.ts`
- **Mirror doc:** `design/sitemap.md`
- **Rule:** When you add, remove, or rename a route, update `sitemap.ts` **and** `design/sitemap.md` in the same change. A structural test locks the list of paths.
- **Derived consumers:** `navigation.ts` (sidebar), `Breadcrumb.tsx`, any future role gate.
- **Helpers:** `findRouteByPath(url)`, `findRouteByPattern(pattern)`, `getBreadcrumbChain(url)`, `getNavRoutes()`, `isAccessible(role, route)`

### 2. UI primitives (`src/shared/ui/`)

Reuse **before** hand-rolling markup:

| Primitive | Use for |
| --- | --- |
| `Button` | All clickable actions. Variants: `primary`/`secondary`/`ghost`/`danger`. Sizes: `sm`/`md`/`lg`. Accepts `icon` + `loading`. |
| `Card` | Panel surface. Variants: `default` (white+shadow), `panel` (glass), `flat`. |
| `PageHeader` | Route hero — `eyebrow`, `title`, `summary`, optional `action` slot. |
| `SectionTitle` | Group header above widget rows. Optional `trailing` link. |
| `EmptyState` | No-content surface. Icon + title + description + action. |
| `RouteScaffold` | **Canonical page template** — wraps PageHeader + optional leading (breadcrumb) + body/empty-state. |
| `Badge` | Status chip with uppercase tracking. |

Import from the barrel: `import { Button, Card, RouteScaffold } from '@/shared/ui'`

### 3. Design tokens

- Colors, typography, shadow, radius, motion live in `tailwind.config.ts`.
- Mirror: `design/tokens.md` (human-readable) and `design/tokens.html` (visual).
- **Rule:** Do not use colors outside the `primary-*` / `brand-*` / semantic (`emerald`/`amber`/`rose`/`sky`/`slate`) palette.
- **Motion:** Keep interaction animations under **250ms**.

### 4. Glass utilities (`shared/styles/index.css`)

- `.glass-panel` — hero/drawer/modal (stronger blur + panel shadow)
- `.glass-card` — dashboard surface (lighter)

## Conventions

- Add new routes in `sitemap.ts` FIRST, then register the page module in `src/app/router.tsx`
- Put route screens under `src/pages/<domain>/ui/`
- Put reusable route sections under `src/widgets/`
- Keep generic UI atoms in `src/shared/ui/` — no domain-specific UI here
- Keep static mock data or temporary demo data in `src/shared/data/`
- Every new route/component that reads navigation, params, or location **must** derive from `sitemap.ts` when possible

## Scaffold-to-feature recipe

Every non-dashboard route ships as a `RouteScaffold`-wrapped placeholder. To turn it into a real page:

```tsx
// Before (scaffold):
export function ProjectsListPage() {
  const route = findRouteByPattern('/projects')!;
  return <RouteScaffold route={route} leading={<Breadcrumb />} />;
}

// After (real body):
export function ProjectsListPage() {
  const route = findRouteByPattern('/projects')!;
  return (
    <RouteScaffold
      route={route}
      leading={<Breadcrumb />}
      headerAction={<Button icon={Plus}>New Project</Button>}
    >
      <SectionTitle title="Active" trailing={<Link to="?status=done">See done</Link>} />
      <Card>…</Card>
    </RouteScaffold>
  );
}
```

- Do NOT remove `RouteScaffold`. Keep the hero rhythm consistent.
- Do NOT re-implement the PageHeader — pass `headerAction` instead.

## Testing

- Framework: **Vitest** (node + jsdom) + **React Testing Library** + `user-event`
- Setup: `src/test/setup.ts` auto-cleans DOM after each test
- **Prefer testing:**
  - pure logic in `shared/config/*` (e.g. sitemap helpers)
  - primitive API contracts (`Button` variants, `Card` classes)
  - page-level behavior that pulls from sitemap (`RouteScaffold`, `Breadcrumb`)
- **Skip testing:** purely visual presentational markup with no logic
- Put tests next to their subject: `Button.tsx` ↔ `Button.test.tsx`
- Router-dependent tests use `<MemoryRouter initialEntries={[path]}>`

## Where To Edit By Intent

| Intent | Path |
| --- | --- |
| new route | `shared/config/sitemap.ts` **+** `design/sitemap.md` **+** `app/router.tsx` **+** `pages/<domain>/ui/<Name>Page.tsx` |
| change shell / header / sidebar | `widgets/layout/ui/AppShell.tsx` |
| change breadcrumb behavior | `widgets/layout/ui/Breadcrumb.tsx` + its test |
| design primitives | `shared/ui/*` — add test next to it |
| shared helpers | `shared/lib/*` |
| tokens | `tailwind.config.ts` **+** `design/tokens.md` **+** `design/tokens.html` |

## Safe Change Rules

- Do not move business-specific UI into `shared`
- Do not add API-coupled types directly in the web app if they belong in `packages/contracts`
- Do not edit `design/*.html` without also updating the matching `*.md` sibling
- Preserve the current design direction unless the task is explicitly a redesign
- Motion must stay ≤ 250ms for interactions

## Validation

Run from repo root:

```bash
npm run typecheck          # all 3 workspaces
npm run test -w apps/web   # 48 tests
npm run build              # vite production build
```

Single-file watch mode:

```bash
npm run test:watch -w apps/web
```
