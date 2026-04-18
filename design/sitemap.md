# Sitemap

โครงสร้าง route ของ web app ทั้งหมด ใช้อ้างอิงเวลาเพิ่ม/ย้ายหน้า

## Route tree

```mermaid
graph TD
    Root["/ (AppLayout)"] --> Dashboard["/ — Overview Dashboard"]
    Root --> Projects["/projects — Projects List"]
    Projects --> ProjectDetail["/projects/:id — Project Detail"]
    ProjectDetail --> Kanban["/projects/:id/board — Kanban Board"]
    ProjectDetail --> TaskDrawer["Task Drawer (overlay)"]
    Root --> AIPlanner["/ai-planner — AI Planner"]
    AIPlanner --> AIDraft["/ai-planner/:id — Draft Review"]
    Root --> Teams["/teams — Team Directory"]
    Teams --> Employee["/teams/:id — Employee Profile"]
    Root --> KPI["/kpi — KPI Dashboard"]
    KPI --> KPIDetail["/kpi/:metric — Metric Drilldown"]
    Root --> Security["/security — Security & Audit"]
    Security --> Roles["/security/roles — Roles & Permissions"]
    Security --> Audit["/security/audit — Activity Log"]
    Auth["/login — Login"] -.-> Root
    Showcase["/theme — Theme Showcase (dev only)"]
```

## Route inventory

| Path | Page | Widget หลัก | Role ที่เข้าถึงได้ |
| --- | --- | --- | --- |
| `/login` | Login | AuthPanel | public |
| `/` | Dashboard Overview | HeroPanel, MetricsGrid, BoardPreview, SignalsPanel | member+ |
| `/projects` | Projects List | ProjectTable, FilterBar | member+ |
| `/projects/:id` | Project Detail | MilestoneTrack, TeamPanel, RiskBadge | member+ |
| `/projects/:id/board` | Kanban Board | KanbanLanes, TaskCard, DragOverlay | member+ |
| `/ai-planner` | AI Planner | PromptPanel, DraftList | manager+ |
| `/ai-planner/:id` | Draft Review | PlanTimeline, RiskSummary, ApplyBar | manager+ |
| `/teams` | Team Directory | PeopleGrid, CapacityStrip | manager+ |
| `/teams/:id` | Employee Profile | WorkloadChart, HistoryFeed | manager+ |
| `/kpi` | KPI Dashboard | TrendWall, IndicatorCards | manager+ |
| `/kpi/:metric` | Metric Drilldown | TimeseriesChart, Breakdown | manager+ |
| `/security` | Security Hub | AuditSummary, RoleMatrix | admin only |
| `/security/roles` | Roles & Permissions | PermissionMatrix | admin only |
| `/security/audit` | Audit Log | EventTimeline, FilterRail | admin only |

## Information architecture (IA)

```mermaid
flowchart LR
    subgraph Execute
      Dash[Overview] --> Proj[Projects] --> Board[Kanban] --> Task[Task Drawer]
    end
    subgraph Plan
      AI[AI Planner] --> Draft[Draft Review]
    end
    subgraph People
      Teams[Teams] --> Emp[Employee]
    end
    subgraph Measure
      KPI[KPI] --> Metric[Metric Drilldown]
    end
    subgraph Govern
      Sec[Security] --> Roles[Roles]
      Sec --> Audit[Audit Log]
    end
    Execute --> Measure
    Plan --> Execute
    People --> Execute
    Govern -.-> Execute
```
