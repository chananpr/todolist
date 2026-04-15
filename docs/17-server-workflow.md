# 17 Server Workflow

## Purpose

This document explains how this project is developed and deployed on the current server.

It is written to reduce confusion for both humans and AI agents.

## Short Version

- Edit code in `/home/ubuntu/todolist`
- Commit code in `/home/ubuntu/todolist`
- Deploy code into `/var/www/todolist/current`
- Build in `/var/www/todolist/current`
- Run the backend with `systemd`, not `pm2`
- Serve the public site through `nginx`

## Current Server Paths

### Source Workspace

This is the main development workspace:

```text
/home/ubuntu/todolist
```

Use this path for:
- reading and editing code
- creating commits
- local typecheck/build validation
- writing new docs

### Live Runtime Path

This is the deployed application path used by the public domain:

```text
/var/www/todolist/current
```

Use this path for:
- production dependency installation
- production build output
- files served by nginx
- backend code executed by the running service

## What Serves The Public Domain

As currently configured on this server:

- `https://todolist.mikeylabs.dev/` serves frontend files from:

```text
/var/www/todolist/current/apps/web/dist
```

- `/api/*` is proxied by nginx to:

```text
http://127.0.0.1:4000
```

- the backend process is started by `systemd` with:

```text
/usr/bin/node /var/www/todolist/current/apps/api/dist/server.js
```

## Process Manager Rule

Use `systemd` for the backend on this server.

Do not introduce `pm2` for the same production backend process unless the whole deployment strategy is intentionally migrated.

Reason:
- `systemd` is already the real process manager in production
- nginx and deploy scripts already assume that setup
- mixing `systemd` and `pm2` causes port conflicts and confusing ownership of the live process

## Recommended Development Flow

1. Work inside `/home/ubuntu/todolist`
2. Run validation there:
   - `npm run typecheck`
   - `npm run build`
3. Commit in `/home/ubuntu/todolist`
4. Deploy that updated code into `/var/www/todolist/current`
5. Run install and build in `/var/www/todolist/current`
6. Restart `taskforge-api`
7. Verify the live site and health endpoint

## Recommended Deploy Flow

### 1. Confirm Source State

Run in `/home/ubuntu/todolist`:

```bash
git status --short
git rev-parse --short HEAD
```

The workspace should be in the exact state you intend to deploy.

### 2. Sync Source To Runtime

Preferred approach on this server:

```bash
git -C /var/www/todolist/current fetch /home/ubuntu/todolist main
git -C /var/www/todolist/current reset --hard FETCH_HEAD
git -C /var/www/todolist/current clean -fd
```

This makes the runtime repo match the source repo exactly.

### 3. Install Dependencies In Runtime Path

Run in `/var/www/todolist/current`:

```bash
npm ci --include=dev
```

Use `--include=dev` because this server builds inside the runtime path and needs build tools such as TypeScript and Vite.

### 4. Build In Runtime Path

Run in `/var/www/todolist/current`:

```bash
npm run build
```

This produces:
- backend output in `apps/api/dist`
- frontend output in `apps/web/dist`

### 5. Restart Backend

Run:

```bash
sudo systemctl restart taskforge-api
sudo systemctl status taskforge-api --no-pager --lines=20
```

### 6. Reload Nginx Only If Config Changed

You do not need to reload nginx for normal app code changes.

Reload nginx only when nginx config files were edited:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Verification Checklist

After deploy, verify:

```bash
curl -sS http://127.0.0.1:4000/api/v1/health
curl -I -sS https://todolist.mikeylabs.dev/
git -C /var/www/todolist/current rev-parse --short HEAD
```

Expected outcomes:
- health returns `status: ok`
- database shows `connected: true` for a healthy production start
- public site returns `HTTP 200`
- deployed commit matches the source commit you intended to release

## What Not To Do

- Do not edit production code directly in `/var/www/todolist/current` unless there is an emergency hotfix and that choice is explicit
- Do not treat `/var/www/todolist/current` as the main source of truth
- Do not run the same backend under both `systemd` and `pm2`
- Do not assume the public domain uses `/home/ubuntu/todolist` directly
- Do not build only in `/home/ubuntu/todolist` and assume the public site changed automatically

## AI Agent Rules

If you are an AI agent working in this repo:

- treat `/home/ubuntu/todolist` as the authoring workspace
- treat `/var/www/todolist/current` as the deployment/runtime copy
- make code changes in the source workspace first
- only touch the runtime path during an explicit deploy step
- before restarting production, verify which path the live service actually uses
- if a user asks about the live domain, inspect nginx and `systemd`, not just the source workspace

## Current Reality Snapshot

As of the current server setup:

- source repo path: `/home/ubuntu/todolist`
- live repo path: `/var/www/todolist/current`
- backend process manager: `systemd`
- frontend server: `nginx`
- backend listen port: `4000`
- public domain: `todolist.mikeylabs.dev`

This file should be updated whenever the deployment model changes.
