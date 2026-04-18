# Graphs & Diagrams

Graph รวมสำหรับ architecture / data flow / user journey — ใช้ Mermaid (render ได้ใน GitHub + VS Code)

## 1. System context

```mermaid
flowchart LR
    User((User)) -->|browser| Web[Web App<br/>Vite + React]
    Web -->|JSON over HTTPS| API[API<br/>Node/Express]
    API --> DB[(Postgres)]
    API --> Queue[[Job Queue]]
    Queue --> AIWorker[AI Planner Worker]
    AIWorker -->|LLM call| Claude[Claude API]
    API --> Audit[(Audit Store)]
    API --> Files[(Object Storage)]
```

## 2. Frontend module graph

```mermaid
flowchart TD
    main[main.tsx] --> App[app/App.tsx]
    App --> Router[app/router.tsx]
    App --> Layout[app/AppLayout.tsx]
    Layout --> Shell[widgets/layout/AppShell]
    Router --> Dashboard[pages/dashboard]
    Router --> Workspace[pages/workspace]
    Router --> Theme[pages/theme-showcase]
    Dashboard --> Hero[widgets/dashboard-overview/HeroPanel]
    Dashboard --> Metrics[widgets/dashboard-overview/MetricsGrid]
    Dashboard --> Board[widgets/dashboard-overview/BoardPreview]
    Dashboard --> Signals[widgets/dashboard-overview/SignalsPanel]
    Hero --> Badge[shared/ui/Badge]
    Dashboard --> DashAPI[shared/api/dashboard]
```

## 3. Data flow — Task update

```mermaid
sequenceDiagram
    actor U as User
    participant UI as Kanban Card
    participant Store as React Query Cache
    participant API as /tasks/:id
    participant DB as Postgres
    participant Audit as Audit Log

    U->>UI: drag card → column "Review"
    UI->>Store: optimistic update
    UI->>API: PATCH status=review
    API->>DB: UPDATE tasks
    API->>Audit: INSERT event
    API-->>UI: 200 OK + task
    alt error
      API-->>UI: 4xx/5xx
      UI->>Store: rollback
      UI-->>U: toast error
    end
```

## 4. AI Planner flow

```mermaid
sequenceDiagram
    actor U as Manager
    participant UI as AI Planner
    participant API as /ai/plans
    participant Q as Queue
    participant W as Worker
    participant L as Claude API
    participant DB as Postgres

    U->>UI: prompt + context
    UI->>API: POST /ai/plans
    API->>Q: enqueue job
    API-->>UI: 202 draftId
    Q->>W: dequeue
    W->>L: structured call (JSON schema)
    L-->>W: draft plan
    W->>DB: save draft (status=pending_review)
    W-->>UI: websocket "draft.ready"
    U->>UI: review draft
    U->>API: POST /ai/plans/:id/apply
    API->>DB: create tasks + link audit
    API-->>UI: success
```

## 5. User journey — Daily operator

```mermaid
journey
    title Daily flow for a team lead
    section Morning
      Open Overview: 5: User
      Scan risks/signals: 4: User
      Triage blocked tasks: 3: User
    section Mid-day
      Move cards on Kanban: 4: User
      Review AI draft: 3: User
      Apply plan: 4: User
    section Afternoon
      Check KPI trend: 4: User
      Leave note on task: 5: User
```

## 6. Role & permission graph

```mermaid
flowchart LR
    Admin[Admin] --> All[All routes]
    Manager[Manager] --> Plan[AI Planner]
    Manager --> Teams
    Manager --> KPI
    Manager --> Projects
    Member[Member] --> Projects
    Member --> Dashboard
    Member --> OwnTasks[My tasks]
    Viewer[Viewer] --> Dashboard
    Viewer -.read-only.-> Projects
```

## 7. Deployment topology

```mermaid
flowchart TB
    subgraph CDN
      Static[Vite build static assets]
    end
    subgraph Edge
      LB[Load balancer / TLS]
    end
    subgraph App Tier
      Web1[web-1]
      Web2[web-2]
      API1[api-1]
      API2[api-2]
    end
    subgraph Data Tier
      PG[(Postgres primary)]
      PGR[(Postgres read replica)]
      Redis[(Redis queue + cache)]
      S3[(Object store)]
    end
    Client --> CDN
    Client --> LB --> Web1 & Web2
    Web1 --> API1
    Web2 --> API2
    API1 --> PG
    API2 --> PG
    API1 --> Redis
    API2 --> Redis
    API1 --> S3
```
