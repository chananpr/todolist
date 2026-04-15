# 14 Codebase Structure

## Goal
The repository layout should support parallel work across backend, frontend, platform, and AI integration teams without forcing everyone into the same folders.

## Monorepo layout
```text
apps/
  api/
  web/
packages/
  contracts/
docs/
```

## API layout
```text
apps/api/src/
  app/
    create-app.ts
    register-routes.ts
  bootstrap/
    server.ts
  config/
    env.ts
  infrastructure/
    database/
    logging/
  shared/
    errors/
    http/
    middlewares/
    types/
    utils/
  modules/
    auth/
      domain/
      http/
    employees/
      domain/
      http/
    projects/
      domain/
      http/
    tasks/
      domain/
      http/
    ai/
      domain/
      http/
    dashboard/
      domain/
      http/
```

### Why this works
- `modules/*` gives each business domain a clear ownership boundary
- `domain/` is where service, repository, entity, and business logic live
- `http/` isolates controllers, routes, request schemas, and transport concerns
- `shared/` is only for cross-domain utilities, never business-specific code
- `infrastructure/` isolates DB, logging, queue, and external system wiring

## Web layout
```text
apps/web/src/
  app/
    App.tsx
    router.tsx
  pages/
    dashboard/ui/
  widgets/
    dashboard-overview/ui/
    layout/ui/
  features/
  shared/
    config/
    data/
    lib/
    styles/
    ui/
```

### Why this works
- `pages/` owns route-level screens
- `widgets/` owns large composable page sections
- `features/` is reserved for reusable business interactions such as task create, task assign, AI apply plan, employee reset password
- `shared/` contains neutral primitives such as UI atoms, style tokens, mock data, and utilities

## Packages
`packages/contracts` is reserved for shared constants and transport-safe types used by both backend and frontend.

Examples:
- workflow status constants
- permission codes
- API response envelopes
- dashboard DTOs

## Team ownership suggestion
- Platform team: `apps/api/src/infrastructure`, auth, RBAC, observability
- HR/Org team: `apps/api/src/modules/employees`, department/team modules
- Delivery team: `apps/api/src/modules/projects`, `tasks`, workflow engine
- AI team: `apps/api/src/modules/ai`, prompt templates, validation pipelines
- Frontend team: `apps/web/src/pages`, `widgets`, `features`
- Shared architecture owners: `packages/contracts`, repo standards, linting, CI

## Rules to keep the codebase healthy
- do not import from one module's `http` folder into another module's `domain` folder
- keep framework code out of reusable domain services where possible
- put cross-team contracts into `packages/contracts`, not random local constants files
- prefer adding a new feature under its domain instead of growing a shared misc folder
