# Backend Agent Guide

This folder contains the TaskForge backend application.

## Stack

- Node.js
- Express
- TypeScript
- Sequelize
- Zod
- Pino

## Source Layout

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
  modules/
    ai/
    auth/
    dashboard/
    employees/
    health/
    projects/
    tasks/
  shared/
    errors/
    http/
    middlewares/
    types/
    utils/
```

## Request Lifecycle

1. `src/server.ts` imports `bootstrap/server.ts`
2. `bootstrap/server.ts` authenticates Sequelize and starts Express
3. `app/create-app.ts` wires middleware and mounts `/api/v1`
4. `app/register-routes.ts` attaches feature routers
5. each module handles transport in `http/` and logic in `domain/`

## Existing Routes

- `/health`
- `/auth`
- `/employees`
- `/projects`
- `/tasks`
- `/ai`
- `/dashboard`

## Conventions

- Keep controllers small and request-focused
- Put orchestration and business rules in services
- Put persistence access in repositories
- Use `ok(...)` from `shared/http/api-response.ts` for successful responses
- Use shared middleware for permission, auth mock, not-found, and error handling

## Current Implementation Reality

- `health` is a simple working endpoint
- `tasks` currently returns scaffold data from repository code
- `ai` currently returns schema-validated draft output, not a live provider call
- several domains are structured for scale first, with incremental implementation behind the interfaces

## Safe Change Rules

- Add new domain code under `modules/<domain>`
- Avoid cross-domain imports from one module's `http` layer into another module's `domain` layer
- Put reusable helpers in `shared` only if they are truly cross-domain
- Put DB and logging wiring in `infrastructure`, not inside feature modules
- If backend data must be shared with the web app, move the type into `packages/contracts`

## Where To Edit By Intent

- new endpoint: `modules/<domain>/http/*.routes.ts`, controller, service, route registration
- business rule: `modules/<domain>/domain/*.service.ts`
- persistence: `modules/<domain>/domain/*.repository.ts` or `*.model.ts`
- middleware behavior: `shared/middlewares/*`
- app-wide startup: `app/*`, `bootstrap/*`, `config/*`, `infrastructure/*`

## Validation

Run from repo root:

```bash
npm run typecheck
npm run build
```
