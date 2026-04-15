# 02 System Architecture

## Recommended architecture
Start with a modular monolith. The business domains are separated internally, but the deployment remains simple while the product is still evolving.

```text
React SPA
  -> Load Balancer / Reverse Proxy
    -> Express API
      -> Auth Module
      -> HR Module
      -> RBAC Module
      -> Org Module
      -> Project Module
      -> Task Module
      -> Subtask Module
      -> File Module
      -> AI Planner Module
      -> KPI Module
      -> Audit Module
    -> MySQL
    -> Redis
    -> AWS S3
    -> AI Provider API
```

## Why modular monolith first
- easier deployment and debugging than microservices
- shared transactions across task, audit, and KPI writes
- faster iteration while business rules are still changing
- can later split by module if load or team size requires it

## Module boundaries
- `auth`: login, session, JWT, password reset, login history
- `hr`: employees, managers, lifecycle events
- `rbac`: roles, permissions, overrides, policy evaluation
- `org`: departments, teams, leaders, memberships
- `projects`: project CRUD, managers, status lifecycle, history
- `tasks`: tasks, subtasks, assignees, board movement, comments
- `files`: S3 presign, metadata, attachment linking, deletion flow
- `ai`: prompts, structured outputs, validation, apply plan
- `kpi`: snapshots, formulas, aggregation jobs
- `audit`: activity feed, entity diffs, compliance logs

## Infrastructure recommendations
- MySQL for transactional data
- Redis for queueing, caching, session store, and rate limiting support
- BullMQ workers for AI processing, KPI aggregation, media post-processing, and notifications
- object storage in S3 with private bucket policy
- centralized logging and error tracking in production

## Deployment path
- phase 1: single API container + single web container + MySQL + Redis
- phase 2: split API and worker containers
- phase 3: separate analytics or reporting workloads if needed
