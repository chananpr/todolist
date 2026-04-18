# 18 — AI Playbook

Step-by-step recipes for the most common AI-assisted tasks in this repo. Each recipe lists the files to touch, in order, and the convention to follow.

If none of these recipes match your task, fall back to `AGENTS.md` + the specific workspace `AGENTS.md` (`apps/web/AGENTS.md`, `apps/api/AGENTS.md`).

---

## Recipe 1 — Add a new frontend route

Use when: a new page is listed in `design/sitemap.md` but not yet registered in the app.

**Order of edits:**
1. `apps/web/src/shared/config/sitemap.ts` — add a `RouteNode` (literal path, label, eyebrow, summary, minRole, optional `icon` for nav, optional `children`)
2. `design/sitemap.md` — add the route to the Mermaid graph and inventory table
3. `apps/web/src/pages/<domain>/ui/<Name>Page.tsx` — minimal scaffold:
   ```tsx
   import { RouteScaffold } from '../../../shared/ui';
   import { findRouteByPattern } from '../../../shared/config/sitemap';
   import { Breadcrumb } from '../../../widgets/layout/ui/Breadcrumb';

   export function <Name>Page() {
     const route = findRouteByPattern('/<path>')!;
     return <RouteScaffold route={route} leading={<Breadcrumb />} />;
   }
   ```
4. `apps/web/src/app/router.tsx` — import and register the element
5. Add at least one test (pattern in `Breadcrumb.test.tsx` using `MemoryRouter`)
6. Run `npm run typecheck && npm run test -w apps/web`

**Gotchas:**
- If the route has `:param`, use `useParams` + pass `title={\`... \${param}\`}` to `RouteScaffold`
- If the route needs a detail-in-overlay (like Task Drawer), don't give it a URL — handle it as a component inside the parent route
- Detail routes with a literal tail segment (e.g. `/projects/:id/board`) still use their `label` in breadcrumb; only `:param` tails show the URL segment

---

## Recipe 2 — Add a new reusable UI primitive

Use when: a pattern is repeated in 3+ places and isn't yet covered by the existing primitives.

**Order of edits:**
1. Check `apps/web/src/shared/ui/index.ts` — does an existing primitive cover it with a new variant or prop? If yes, extend it.
2. If new:
   - File: `apps/web/src/shared/ui/<Name>.tsx`
   - Props interface exported alongside the component
   - Accept `className` to let callers compose
   - Use `forwardRef` only when the primitive wraps a form control or needs imperative focus
   - Colors only from palette; motion ≤ 250ms
3. Add `export { <Name>, type <Name>Props } from './<Name>'` to the barrel
4. Test: `apps/web/src/shared/ui/<Name>.test.tsx` — cover the variant matrix, click/disabled, className merge
5. Update `design/components.html` + `design/components.md` with the new primitive
6. Run `npm run test -w apps/web`

---

## Recipe 3 — Add a new backend endpoint

Use when: a new REST operation is needed under `/api/v1/<domain>`.

**Order of edits:**
1. `apps/api/src/modules/<domain>/domain/*.service.ts` — business rule
2. `apps/api/src/modules/<domain>/domain/*.repository.ts` — persistence (if new model)
3. `apps/api/src/modules/<domain>/http/*.controller.ts` — request parsing (zod), call service, wrap with `ok(data, req.requestId)`
4. `apps/api/src/modules/<domain>/http/*.routes.ts` — wire controller to router
5. If the domain is new, `apps/api/src/app/register-routes.ts` — `router.use('/<domain>', <domain>Router)`
6. If the response type is shared with web: add interface to `packages/contracts/src/types/api.ts` (the `postinstall` rebuilds `dist/` automatically)
7. Integration test (pattern in `apps/api/src/app/create-app.test.ts`):
   ```ts
   const res = await request(app).get('/api/v1/<path>');
   expect(res.status).toBe(200);
   expect(res.body.data).toMatchObject({ ... });
   ```
8. Run `npm run typecheck && npm run test -w apps/api`

**Gotchas:**
- Never import from `bootstrap/server.ts` in a test — that starts listening + hits MySQL
- Import `createApp` **inside** `beforeAll` so the env module evaluates after `test/setup.ts` runs
- Keep controllers thin. If a controller is doing business logic, move it to the service

---

## Recipe 4 — Add a shared contract type

Use when: a type needs to be imported from both `apps/web` and `apps/api`.

**Order of edits:**
1. `packages/contracts/src/types/api.ts` — add the interface
2. Already exported via `packages/contracts/src/index.ts`
3. Run `npm run build -w @taskforge/contracts` (or `npm install` which triggers `postinstall`)
4. Import anywhere: `import type { <Name> } from '@taskforge/contracts'`

**Never** duplicate a contract type inside a workspace — single source.

---

## Recipe 5 — Add a role guard

Use when: a route should be blocked for users below a certain role.

**Current state:** role data exists on every route in `sitemap.ts` (`minRole`). Runtime enforcement is **not yet wired**.

**When implementing:**
1. Create `apps/web/src/app/RoleGate.tsx` that reads the current user's role (from a future auth context), finds the matched route via `findRouteByPath(useLocation().pathname)`, and calls `isAccessible(role, route)`
2. Wrap `<Outlet />` in `AppLayout.tsx` with `<RoleGate>` so every shell route is gated
3. Redirect unauthorized users to `/login` or an `AccessDeniedPage`
4. Tests: mock the auth context in MemoryRouter + assert redirect

---

## Recipe 6 — Migrate a scaffold page to real content

Use when: a scaffold route (shows `EmptyState` "ยังไม่เริ่มพัฒนา") needs a real implementation.

**Rules:**
- **Keep** the `RouteScaffold` wrapper — don't replace it with your own hero
- **Keep** the `leading={<Breadcrumb />}` slot
- Replace `children` with your widgets composed from `shared/ui` primitives
- Add `headerAction` if the page has a primary CTA (e.g. "New Project")
- Extract reusable page sections to `widgets/<domain>-*/ui/` (not `shared/ui`)

**Example transformation:** see `apps/web/AGENTS.md` → "Scaffold-to-feature recipe"

---

## Global rules (apply to every recipe)

- **Design tokens are authoritative.** Colors from palette only. Motion ≤ 250ms. Typography from `Space Grotesk` (display) + `Manrope` (body).
- **Sitemap is authoritative.** Update `sitemap.ts` **and** `design/sitemap.md` together. Structural test will fail if paths drift.
- **Reuse before re-invent.** Check `shared/ui` and `shared/config` before creating new primitives or duplicate data.
- **Tests next to the code.** `Foo.ts` ↔ `Foo.test.ts`. Integration tests under the feature they cover.
- **Validation before finishing:** run `npm run typecheck && npm run test` locally. CI runs the same.
- **No new business UI in `shared/ui`.** That folder is only for neutral primitives.
