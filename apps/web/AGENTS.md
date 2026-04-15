# Frontend Agent Guide

This folder contains the TaskForge frontend application.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router

## Source Layout

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
  shared/
    config/
    data/
    lib/
    styles/
    ui/
```

## UI Architecture

- `app/`: app-level shell and routing
- `pages/`: route-level screens
- `widgets/`: composable screen sections
- `shared/`: generic UI primitives, config, data, helpers, and styling

## Current Implementation Reality

- The app currently has a single route: `/`
- The main screen is `DashboardPage`
- The dashboard is composed from widgets such as `HeroPanel`, `MetricsGrid`, `BoardPreview`, and `SignalsPanel`
- Data is currently mock-driven from `src/shared/data/dashboard.ts`

## Conventions

- Add new routes in `src/app/router.tsx`
- Put route screens under `src/pages`
- Put reusable route sections under `src/widgets`
- Keep generic UI atoms in `src/shared/ui`
- Keep static mock data or temporary demo data in `src/shared/data`
- Prefer consistent styling tokens and existing visual language over random one-off patterns

## Where To Edit By Intent

- new route: `src/app/router.tsx` plus a new `pages/*` screen
- dashboard behavior: `src/pages/dashboard/ui/*` and `src/widgets/dashboard-overview/ui/*`
- shell or nav: `src/widgets/layout/ui/AppShell.tsx`, `src/shared/config/navigation.ts`
- design primitives: `src/shared/ui/*`, `src/shared/styles/index.css`
- shared helpers: `src/shared/lib/*`

## Safe Change Rules

- Do not move business-specific UI into `shared`
- Do not add API-coupled types directly in the web app if they belong in `packages/contracts`
- Keep route composition simple: page assembles widgets, widgets render sections, shared contains neutral primitives
- Preserve the current design direction unless the task is explicitly a redesign

## Validation

Run from repo root:

```bash
npm run typecheck
npm run build
```
