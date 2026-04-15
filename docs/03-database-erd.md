# 03 Database ERD

## Design principles
- use numeric primary keys for join efficiency
- keep status values extensible with string codes or master tables
- store soft delete and cancel metadata explicitly
- keep actor columns on critical tables for auditability
- maintain derived aggregates as cached fields backed by real source data

## Core tables by domain

### Identity and HR
- `users`
- `employees`
- `login_sessions`
- `login_histories`
- `password_reset_tokens`
- `system_sequences`

### RBAC
- `roles`
- `permissions`
- `role_permissions`
- `user_roles`
- `user_permission_overrides`

### Organization
- `departments`
- `teams`
- `team_memberships`

### Projects and delivery
- `projects`
- `project_managers`
- `project_members`
- `tasks`
- `task_assignees`
- `subtasks`
- `task_comments`
- `subtask_comments`
- `time_entries`
- `cost_entries`

### File and evidence
- `attachments`
- `attachment_links`
- `file_upload_histories`

### AI
- `ai_runs`
- `ai_run_items`
- `ai_action_logs`
- `ai_prompt_templates`

### KPI and analytics
- `kpi_metric_definitions`
- `kpi_snapshots_daily`
- `kpi_snapshots_weekly`
- `kpi_snapshots_monthly`

### Audit and compliance
- `activity_logs`
- `entity_change_logs`

## Relationship summary
- one `user` has one `employee`
- one `department` has many `teams`
- one `team` belongs to one `department`
- one `project` belongs to one department and one team
- one `project` has many `tasks`
- one `task` has many `subtasks`
- one `task` has many assignees through `task_assignees`
- one `project` has many co-managers through `project_managers`
- attachments can link to `task`, `subtask`, `project`, or `cost_entry`

## Suggested index strategy
- compound indexes for list views: `(team_id, status_code)`, `(project_id, board_column_key, rank_key)`
- due date indexes for today and overdue queries
- actor/entity indexes for activity log browsing
- partial uniqueness pattern through nullable `revoked_at` or `deleted_at`

## Sequence strategy
Use `system_sequences` for values such as:
- employee username starting at `10000`
- employee code
- project code
- task code

Increment these values inside a database transaction or through a stored locking strategy.
