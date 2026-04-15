# AI Agent Guide

This repository is a portfolio-oriented full-stack monorepo for an enterprise task management platform named TaskForge Enterprise.

Use this file as the first-stop context when an AI agent needs to understand the repo before making changes.

## Monorepo Layout

```text
.
├── apps
│   ├── api
│   └── web
├── packages
│   └── contracts
├── docs
├── package.json
└── docker-compose.yml
```

## Workspace Responsibilities

- `apps/api`: Express + TypeScript backend
- `apps/web`: React + Vite frontend
- `packages/contracts`: shared constants and transport-safe types
- `docs`: architecture and product design references

## Current Product State

- The backend is a structured scaffold with domain modules and a small set of working endpoints.
- The frontend currently focuses on a dashboard experience and uses local mock data.
- AI planning exists as a scaffold and schema-validation path, not yet a real provider integration flow.
- This repo is designed to show architecture quality, code organization, and extensibility.

## High-Signal Entry Points

- Backend bootstrap: `apps/api/src/server.ts`
- Backend app assembly: `apps/api/src/app/create-app.ts`
- Backend route registration: `apps/api/src/app/register-routes.ts`
- Frontend entry: `apps/web/src/main.tsx`
- Frontend router: `apps/web/src/app/router.tsx`
- Shared package entry: `packages/contracts/src/index.ts`

## Backend Shape

Backend code is organized by domain and transport boundary:

```text
apps/api/src/
  app/
  bootstrap/
  config/
  infrastructure/
  modules/
  shared/
```

Rules:
- Keep controllers thin.
- Put business rules in `modules/*/domain`.
- Keep HTTP-specific logic in `modules/*/http`.
- Put cross-domain helpers in `shared`, not feature-specific code.
- Register new routes in `apps/api/src/app/register-routes.ts`.

## Frontend Shape

Frontend code follows route/page/widget separation:

```text
apps/web/src/
  app/
  pages/
  widgets/
  shared/
```

Rules:
- Put route-level screens in `pages`.
- Put reusable page sections in `widgets`.
- Put generic UI, config, data, and helpers in `shared`.
- Avoid placing business-specific UI in `shared`.

## Shared Contracts

Use `packages/contracts` for types or constants that must be shared across frontend and backend.

Examples:
- permissions
- workflow statuses
- API response shapes
- dashboard DTOs

## How To Add Features Safely

### Backend
1. Add or extend a domain under `apps/api/src/modules/<domain>`.
2. Keep service and repository logic in `domain/`.
3. Add controller and routes in `http/`.
4. Register the router in `apps/api/src/app/register-routes.ts`.
5. If types are shared with the client, move them into `packages/contracts`.

### Frontend
1. Add a new route in `apps/web/src/app/router.tsx`.
2. Create the route screen under `pages/`.
3. Extract reusable sections into `widgets/`.
4. Keep generic helpers and design primitives in `shared/`.
5. If a UI contract mirrors backend data, prefer importing shared types from `packages/contracts`.

## Validation Commands

Run from repo root:

```bash
npm run typecheck
npm run build
```

For local infrastructure:

```bash
docker compose up -d
```

## Environment Notes

- `.env.example` uses MySQL on port `3307`
- Redis runs on port `6379`
- API default port is `4000`
- Web dev server default is `5173`

If MySQL fails to boot after image/config changes, the existing Docker volume may be stale. Recreate with:

```bash
docker compose down -v
docker compose up -d
```

## Documentation Index

- `docs/02-system-architecture.md`
- `docs/06-ai-planner.md`
- `docs/08-api-design.md`
- `docs/09-frontend-experience.md`
- `docs/14-codebase-structure.md`

## Important Constraints

- Do not assume every documented feature is fully implemented.
- The current frontend is mostly static and mock-driven.
- The current backend has a real structure but still contains scaffold implementations.
- Prefer preserving the current architecture style over introducing a new pattern.
