# 16 Frontend Implementation Guide

## Purpose

This document explains how the frontend is structured in code, how routing and UI composition work, and how future contributors should extend it without flattening the architecture.

## Frontend Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion

## Source Layout

```text
apps/web/src/
  app/
    App.tsx
    AppLayout.tsx
    router.tsx
  pages/
    dashboard/ui/
    workspace/ui/
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

## Layering Rules

### `app/`
- owns app bootstrapping
- defines router composition
- hosts the shared shell layout used across routes

### `pages/`
- owns route-level screens
- composes widgets into a complete page
- should not become a dumping ground for low-level UI atoms

### `widgets/`
- owns larger reusable sections inside pages
- examples: dashboard hero, metrics grid, board preview, app shell

### `shared/`
- owns generic UI, utilities, mock data, app config, and global styles
- should remain business-neutral where possible

## Routing Strategy

The frontend now uses a layout route:

```text
/
  -> AppLayout
    -> AppShell
      -> child route content
```

Current routes:
- `/`
- `/projects`
- `/ai-planner`
- `/teams`
- `/kpi`
- `/security`

The sidebar uses `NavLink`, so active state and navigation are both driven by router state instead of static buttons.

## Sidebar Navigation Contract

Primary navigation config lives in:

`apps/web/src/shared/config/navigation.ts`

Each item defines:
- label
- path
- icon
- eyebrow
- summary
- highlights

This keeps sidebar rendering and route metadata aligned in one place.

## Page Composition Pattern

### Dashboard route

`DashboardPage` is a route screen that assembles:
- `HeroPanel`
- `MetricsGrid`
- `BoardPreview`
- `SignalsPanel`

### Workspace routes

Non-dashboard sidebar routes currently use a shared route-level component:

`pages/workspace/ui/WorkspacePage.tsx`

This is intentional. It gives each navigation item a real route now, while leaving room for later feature-specific implementation.

## Styling Strategy

Global styling is in:

`apps/web/src/shared/styles/index.css`

Current styling direction:
- light enterprise UI
- clean white panels with subtle shadows
- blue primary accents
- display font for section titles
- restrained motion and hover states

Reusable design patterns:
- rounded large-radius panels
- soft borders
- layered shadows
- motion-based reveal on first load

## Motion Guidance

Framer Motion is used to:
- stage page entrance
- stagger cards and panels
- add hover lift on important interactive surfaces

Use motion intentionally:
- prefer reveal and hierarchy cues over decorative animation
- keep everyday interactions fast
- avoid long-running looping effects unless they communicate system state

## Data Strategy Today

The dashboard currently reads from:

`apps/web/src/shared/data/dashboard.ts`

That means:
- current widgets are mock-driven
- component composition is real
- API integration can be added later without rewriting the route structure

## How To Add A New Frontend Feature

1. Add or update route metadata in `shared/config/navigation.ts` if the feature is route-driven.
2. Add a route in `app/router.tsx`.
3. Create a route screen in `pages/`.
4. Extract reusable sections into `widgets/`.
5. Keep generic UI and helpers in `shared/`.
6. If types are shared with the backend, move them to `packages/contracts`.

## Safe Extension Rules

- do not put route-specific business UI into `shared`
- do not bypass the router by using static sidebar buttons
- do not duplicate route metadata in multiple files
- prefer route composition through layout + pages + widgets
- keep visual changes aligned with the current enterprise dashboard language unless doing an intentional redesign

## Recommended Next Frontend Steps

- connect dashboard metrics to backend endpoints
- implement projects list and project detail routes
- add AI planner review/apply screens
- add team capacity and KPI drill-down pages
- add responsive mobile navigation for sidebar actions
