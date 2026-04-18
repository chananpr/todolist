# Deployment Guide

This document covers deploying TaskForge Enterprise to production.

- **Web (React + Vite)** -- deployed to **Vercel**
- **API (Express + TypeScript)** -- deployed to **Fly.io** via Docker

---

## Prerequisites

| Tool | Install |
|------|---------|
| Vercel CLI | `npm i -g vercel` |
| Fly CLI | `curl -L https://fly.io/install.sh \| sh` |
| GitHub repo secrets | See below |

### GitHub Secrets

Add these in **Settings > Secrets and variables > Actions**:

| Secret | Purpose |
|--------|---------|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Vercel team/org ID (from `.vercel/project.json`) |
| `VERCEL_PROJECT_ID` | Vercel project ID (from `.vercel/project.json`) |
| `FLY_API_TOKEN` | Fly.io deploy token (`fly tokens create deploy -a taskforge-api`) |

---

## Web -- Vercel

### First-time setup

```bash
cd apps/web
vercel link          # follow prompts to link to your Vercel project
vercel env pull      # pull remote env vars for local preview
```

The `vercel.json` in `apps/web/` configures:
- Framework: Vite
- Build command: installs from monorepo root, builds the web workspace
- SPA rewrite: all routes fall through to `index.html`

### Manual deploy

```bash
vercel --prod        # from apps/web/
```

### Environment variables (Vercel dashboard)

| Variable | Example |
|----------|---------|
| `VITE_API_URL` | `https://taskforge-api.fly.dev` |

---

## API -- Fly.io

### First-time setup

```bash
# Create the app (only once)
fly apps create taskforge-api

# Set secrets (required -- the API will not start without these)
fly secrets set \
  JWT_SECRET="<random-32-char-string>" \
  SESSION_SECRET="<random-32-char-string>" \
  AI_API_KEY="<your-openai-key>" \
  DB_HOST="<mysql-host>" \
  DB_PORT="3306" \
  DB_NAME="taskforge" \
  DB_USER="<db-user>" \
  DB_PASSWORD="<db-password>" \
  REDIS_URL="redis://<redis-host>:6379" \
  WEB_ORIGIN="https://your-web-domain.vercel.app" \
  -a taskforge-api
```

### Manual deploy

```bash
# From repo root
fly deploy --config apps/api/fly.toml --dockerfile apps/api/Dockerfile
```

### Required environment variables (Fly.io secrets)

These are required by `apps/api/src/config/env.ts` (no defaults or insecure defaults):

| Variable | Notes |
|----------|-------|
| `JWT_SECRET` | Min 8 chars |
| `SESSION_SECRET` | Min 8 chars |
| `AI_API_KEY` | Min 8 chars |
| `DB_HOST` | MySQL host |
| `DB_PORT` | Default: 3306 |
| `DB_NAME` | Default: taskforge |
| `DB_USER` | Default: root |
| `DB_PASSWORD` | Default: root (override in prod!) |
| `REDIS_URL` | Default: redis://127.0.0.1:6379 |
| `WEB_ORIGIN` | **Must be set** to your Vercel production URL for CORS |

Variables with safe defaults (set via `fly.toml`):

| Variable | Default |
|----------|---------|
| `PORT` | 4000 |
| `NODE_ENV` | production |
| `ALLOW_DEGRADED_START` | true |

### Setting WEB_ORIGIN for production

The `WEB_ORIGIN` env var controls CORS allowed origins. It defaults to
`http://localhost:5173` which is only suitable for local development. In
production, set it to your Vercel domain:

```bash
fly secrets set WEB_ORIGIN="https://your-app.vercel.app" -a taskforge-api
```

### Database migrations

This project uses Sequelize with model-sync (no migration files). The database
schema is managed by Sequelize's `sync()` calls. For production, consider adding
explicit migration files in the future.

---

## CI/CD Pipeline

Pushes to `main` trigger `.github/workflows/deploy.yml`:

1. **ci-web** -- typecheck, test, and build the web app
2. **ci-api** -- typecheck and test the API
3. **deploy-web** -- deploys to Vercel (after ci-web passes)
4. **deploy-api** -- deploys to Fly.io (after ci-api passes)

The deploy workflow runs independently of the existing CI workflow. Both
workflows trigger on push to `main` to ensure deployments are always validated.

---

## Health check

The API exposes a health endpoint:

```
GET /api/v1/health
```

Fly.io checks this endpoint every 30 seconds (configured in `fly.toml`).
