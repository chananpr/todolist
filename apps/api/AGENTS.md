# Backend Agent Guide

This folder contains the TaskForge backend application.

## Stack

- Node.js (ESM + NodeNext module resolution)
- Express
- TypeScript
- Sequelize
- Zod
- Pino
- Vitest + supertest

## Source Layout

```text
apps/api/src/
  app/
    create-app.ts             # Express assembly, testable standalone
    register-routes.ts        # mounts feature routers under /api/v1
  bootstrap/
    server.ts                 # DB authenticate + listen (NOT run in tests)
  config/
    env.ts                    # zod-validated env
  infrastructure/
    database/
    logging/
  modules/
    ai/ · auth/ · dashboard/ · employees/ · health/ · projects/ · tasks/
      http/                   # controllers + routers
      domain/                 # services + repositories
  shared/
    errors/ · http/ · middlewares/ · types/ · utils/
  test/
    setup.ts                  # Vitest setup: fills required env secrets
```

## Request Lifecycle

1. `src/server.ts` → `bootstrap/server.ts`
2. `bootstrap/server.ts` authenticates Sequelize and calls `app.listen`
3. `app/create-app.ts` wires middleware and mounts `/api/v1`
4. `app/register-routes.ts` attaches feature routers
5. Each module: transport in `http/`, logic in `domain/`

## Existing Routes

- `GET  /`                    service info
- `GET  /api/v1/health`
- `/api/v1/auth`
- `/api/v1/employees`
- `/api/v1/projects`
- `/api/v1/tasks`
- `/api/v1/ai`
- `/api/v1/dashboard`

## Conventions

- Controllers stay thin — request parsing + response shaping only
- Business rules live in `modules/<domain>/domain/*.service.ts`
- Persistence lives in `modules/<domain>/domain/*.repository.ts` or `*.model.ts`
- Every success response uses `ok(data, req.requestId)` from `shared/http/api-response.ts`
- Every module exports its Express router as `<domain>Router`

## Testing

### Framework
- **Vitest 2** in node environment
- **supertest** for in-process Express integration tests
- `pool: 'forks'` + `singleFork: true` so tests don't race on env or listeners

### Setup
`src/test/setup.ts` fills the zod-required secrets (`JWT_SECRET`,
`SESSION_SECRET`, `AI_API_KEY`) and forces `ALLOW_DEGRADED_START=true`,
so `createApp()` can be imported without MySQL or Redis running.

### Writing a new test
- Prefer integration tests via `supertest(createApp())` — import `createApp` lazily inside `beforeAll` to avoid evaluating the env module before setup runs
- Put tests next to the subject: `auth.service.ts` ↔ `auth.service.test.ts`
- Unit-test pure helpers directly (`api-response.test.ts` pattern)
- Do NOT import from `bootstrap/server.ts` in tests — that would listen on a port and talk to MySQL

Example:

```ts
import { describe, expect, it, beforeAll } from 'vitest';
import request from 'supertest';
import type { Express } from 'express';

describe('GET /api/v1/employees', () => {
  let app: Express;
  beforeAll(async () => {
    const { createApp } = await import('../../../app/create-app.js');
    app = createApp();
  });

  it('returns 200 with ok() envelope', async () => {
    const res = await request(app).get('/api/v1/employees');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });
});
```

### Running
```bash
npm run test -w apps/api           # once
npm run test:watch -w apps/api     # watch mode
npm run test:coverage -w apps/api  # v8 coverage
```

## Current Implementation Reality

- `health` is a working endpoint that reports DB degraded state
- `tasks` currently returns scaffold data from repository code
- `ai` currently returns schema-validated draft output, not a live provider call
- Several domains are structured for scale first, with incremental implementation behind the interfaces

## Safe Change Rules

- Add new domain code under `modules/<domain>`
- Avoid cross-domain imports from one module's `http` layer into another module's `domain` layer
- Put reusable helpers in `shared/` only if they are truly cross-domain
- Put DB and logging wiring in `infrastructure/`, not inside feature modules
- If backend data is shared with web, put the type in `packages/contracts` (and add a `Dashboard*`-style interface there rather than in the service file)
- Add at least one integration test for every new public endpoint

## Where To Edit By Intent

| Intent | Path |
| --- | --- |
| new endpoint | `modules/<domain>/http/*.routes.ts` + controller + service + register in `app/register-routes.ts` |
| business rule | `modules/<domain>/domain/*.service.ts` |
| persistence | `modules/<domain>/domain/*.repository.ts` or `*.model.ts` |
| middleware behavior | `shared/middlewares/*` |
| app-wide startup | `app/*`, `bootstrap/*`, `config/*`, `infrastructure/*` |
| contracts | `packages/contracts/src/types/api.ts` (remember: `postinstall` rebuilds dist) |

## Validation

Run from repo root:

```bash
npm run typecheck        # contracts + api + web
npm run test             # web (48) + api (9)
npm run build            # full build pipeline
```
