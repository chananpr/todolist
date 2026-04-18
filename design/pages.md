# Page Previews

Wireframe ของทุกหน้าหลัก — ดูก่อนลง code ทุกครั้ง เพื่อให้ layout เป็นทิศเดียว

## Common shell

```
┌──────────────────────────────────────────────────────────────────┐
│  [≡]  ● Todolist          ⌘K Search          🔔   Avatar ▾       │ ← Topbar (64)
├────────┬─────────────────────────────────────────────────────────┤
│        │                                                         │
│  Side  │                   Main content                          │
│  nav   │                   (max-w-[1280])                        │
│ 240px  │                                                         │
│        │                                                         │
└────────┴─────────────────────────────────────────────────────────┘
```

---

## 1. Overview Dashboard — `/`

```
┌────────────────── HeroPanel ──────────────────┐
│ Eyebrow · "Today"                              │
│ H1 Space Grotesk — greeting / headline kpi     │
│ [chips: on-track, at-risk, blocked]            │
└────────────────────────────────────────────────┘
┌──────── MetricsGrid (4 cols) ────────┐
│ [Stat] [Stat] [Stat] [Stat]          │
└──────────────────────────────────────┘
┌─── BoardPreview (8 col) ────┬── SignalsPanel (4 col) ──┐
│ kanban thumbnail 3 lanes    │ list of risks + AI signals│
└─────────────────────────────┴──────────────────────────┘
```

## 2. Projects List — `/projects`

```
┌──────── FilterBar ───────────────────────────────┐
│ [search] [status ▾] [owner ▾] [+ New Project]    │
└──────────────────────────────────────────────────┘
┌──────── ProjectTable ─────────────────────────────┐
│ Name · Owner · Status · Milestone · Risk · Due    │
│ row ... row ... row ...                           │
└───────────────────────────────────────────────────┘
```

## 3. Project Detail — `/projects/:id`

```
┌─ Breadcrumb  Projects / Phoenix Launch ─────────┐
│ H1  Phoenix Launch           [Edit] [⋯]          │
│ chips: owner · status · due                      │
└──────────────────────────────────────────────────┘
┌── MilestoneTrack (full-width timeline) ──────────┐
│ ● ── ● ── ○ ── ○                                 │
└──────────────────────────────────────────────────┘
┌── TeamPanel (6col) ─┬── RiskBadge (6col) ──────┐
│ avatars + roles     │ risks list + owner        │
└─────────────────────┴───────────────────────────┘
┌── Tabs: Overview · Board · Files · Audit ──────┐
│ panel content                                   │
└─────────────────────────────────────────────────┘
```

## 4. Kanban Board — `/projects/:id/board`

```
┌── Toolbar: filters · swimlane · + Add task ────┐
└────────────────────────────────────────────────┘
┌─Backlog─┬─In Progress─┬─Review─┬─Done────────┐
│ [card]  │ [card]      │ [card] │ [card]      │
│ [card]  │ [card]      │ [card] │             │
│ [card]  │             │        │             │
│ + Add   │ + Add       │ + Add  │ + Add       │
└─────────┴─────────────┴────────┴─────────────┘
```
Card มี: title, subtle subtitle, due chip, avatar stack, priority dot

## 5. Task Drawer (overlay on any page)

```
                         ┌────── right drawer (max-w-xl) ───────┐
                         │ × Close                              │
                         │ Eyebrow · Project name               │
                         │ H2 Task title                        │
                         │ [status ▾] [priority ▾] [due date]   │
                         │──────────────────────────────────────│
                         │ Tabs: Details · Subtasks · Comments  │
                         │       · Files · Cost · Audit         │
                         │──────────────────────────────────────│
                         │ description rich text                │
                         │ checklist                            │
                         │ comments thread                      │
                         │──────────────────────────────────────│
                         │ [Save] [Cancel]                      │
                         └──────────────────────────────────────┘
```

## 6. AI Planner — `/ai-planner`

```
┌── PromptPanel (hero) ──────────────────────────┐
│ H1 "Plan a new initiative"                      │
│ large textarea with suggestions + [Generate]    │
└─────────────────────────────────────────────────┘
┌── DraftList ──────────────────────────────────┐
│ card row · title · confidence · risks · date   │
│ [Review →]                                     │
└────────────────────────────────────────────────┘
```

## 7. Draft Review — `/ai-planner/:id`

```
┌── Summary (hero navy) ────────────────────────┐
│ H2 name · badges: confidence, risk tier        │
└────────────────────────────────────────────────┘
┌── PlanTimeline (8col) ─┬── RiskSummary (4col) ┐
│ proposed tasks tree    │ risks + mitigations   │
└────────────────────────┴───────────────────────┘
┌── ApplyBar sticky bottom ─────────────────────┐
│ "Apply 12 tasks to Phoenix Launch"  [Discard][Apply] │
└────────────────────────────────────────────────┘
```

## 8. Team Directory — `/teams`

```
┌── PeopleGrid 3–4 col ──────────────────────────┐
│ [card avatar · name · role · capacity bar]     │
│ [card] [card] [card] [card]                    │
└────────────────────────────────────────────────┘
```

## 9. Employee Profile — `/teams/:id`

```
┌─ header avatar · name · role · team · ⋯ ──────┐
└────────────────────────────────────────────────┘
┌── WorkloadChart (8) ─┬── Capacity (4) ────────┐
│ time series          │ now / this wk / next    │
└──────────────────────┴─────────────────────────┘
┌── HistoryFeed ────────────────────────────────┐
│ activity timeline                              │
└────────────────────────────────────────────────┘
```

## 10. KPI Dashboard — `/kpi`

```
┌── TrendWall (3 large charts) ─────────────────┐
│ [chart] [chart] [chart]                        │
└────────────────────────────────────────────────┘
┌── IndicatorCards (grid 4) ────────────────────┐
│ [Stat] [Stat] [Stat] [Stat]                    │
└────────────────────────────────────────────────┘
```

## 11. Security Hub — `/security`

```
┌── AuditSummary (hero) ·  today's sensitive events ┐
└──────────────────────────────────────────────────┘
┌── Tabs:  Roles · Audit Log · Compliance ────────┐
│  RoleMatrix (table)                              │
└──────────────────────────────────────────────────┘
```

## 12. Login — `/login`

```
                ┌──────── centered card ──────┐
                │ logo                         │
                │ H2  Welcome back             │
                │ email                        │
                │ password                     │
                │ [Sign in]                    │
                │ SSO providers                │
                └──────────────────────────────┘
```

---

## Responsive notes

- **≥ 1280px** — 12-col grid, sidebar expanded
- **768–1279px** — sidebar collapsible icon-only; 8-col grid
- **< 768px** — bottom tab bar, drawer stack full-screen, single column

## Layout review checklist

- [ ] Main content max-w 1280, centered
- [ ] Grid ใช้ `gap-6` ระหว่าง card
- [ ] Section มี eyebrow + title + optional action bar
- [ ] Mobile: CTA หลักย้ายไป bottom sheet / sticky bar
