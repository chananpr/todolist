# 05 Workflow Design

## Project workflow
Statuses:
- `draft`
- `active`
- `completed`
- `cancelled`

Rules:
- `overdue` should be derived from due date, not stored as the main status
- cancelled projects remain restorable
- hard delete should be permission-limited and exceptional

## Task workflow
Board columns:
- `backlog`
- `todo`
- `in_progress`
- `review`
- `done`
- `cancelled`

Rules:
- task movement updates board position and writes activity logs
- overdue is computed from `due_date < now` and `status != done`
- `blocked` can be represented as a status or flag depending on process maturity

## Subtask workflow
Statuses:
- `todo`
- `in_progress`
- `done`
- `cancelled`

## Progress rules
- if a task has subtasks, derive task progress from subtasks
- if a task has no subtasks, task progress can be manually updated
- project progress derives from tasks, ideally weighted by estimate

## Employee workflow
- HR creates employee record
- system generates username and random initial password
- employee is assigned department, team, role, and manager
- activation, deactivation, and password reset all emit audit events

## Restore and cancel flow
- cancel stores reason, actor, and timestamp
- restore stores actor and timestamp
- delete uses soft delete first
