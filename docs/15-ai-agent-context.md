# 15 AI Agent Context

## Purpose

This document is written for AI coding agents that need fast orientation before working inside this repository.

It complements `AGENTS.md` files by summarizing the most important repo-wide assumptions.

For server path and deployment/runtime rules, also read `docs/17-server-workflow.md`.

## What This Project Is

TaskForge Enterprise is a portfolio-grade monorepo for an enterprise task and project management platform.

The project emphasizes:
- scalable codebase structure
- domain-oriented backend architecture
- route/page/widget frontend organization
- AI-assisted planning workflows
- shared contracts between client and server

## What Is Actually Implemented Today

- monorepo workspace layout
- backend module boundaries and route registration
- frontend dashboard UI composition
- shared contracts package
- architecture and product documentation

## What Is Still Scaffold-Level

- many domain modules are still sample or starter implementations
- AI planning is represented as a schema-driven scaffold, not a full provider workflow
- queue, storage, and analytics are documented more deeply than they are implemented

## Backend Mental Model

The backend follows this flow:

```text
request
  -> route
  -> controller
  -> service
  -> repository/model
  -> response envelope
```

Important directories:
- `apps/api/src/app`
- `apps/api/src/bootstrap`
- `apps/api/src/modules`
- `apps/api/src/shared`
- `apps/api/src/infrastructure`

## Frontend Mental Model

The frontend follows this flow:

```text
route
  -> page
  -> widget
  -> shared ui/data/lib
```

Important directories:
- `apps/web/src/app`
- `apps/web/src/pages`
- `apps/web/src/widgets`
- `apps/web/src/shared`

## Shared Contract Rule

If a type or constant is used by both frontend and backend, prefer moving it into `packages/contracts`.

Do not duplicate those definitions separately in client and server unless there is a very specific reason.

## Recommended AI Working Style

When making changes:
- inspect the nearest `AGENTS.md` first
- preserve existing module boundaries
- avoid adding shortcuts that weaken the architecture
- treat docs as intentional design guidance, not decoration
- check whether the implementation is real or mock-backed before assuming behavior

## Validation Checklist

Before considering work complete:
- `npm run typecheck`
- `npm run build`
- verify any route registration changes
- verify any shared type changes compile in both apps
