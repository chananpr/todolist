# 04 RBAC and Security

## Authorization model
The system should use `RBAC + scope-aware policy`.

RBAC answers:
- does this user generally have permission to perform this action?

Scope policy answers:
- does this user have access to this specific resource?

## Role model
Recommended system roles:
- `superadmin`
- `hr_admin`
- `department_manager`
- `team_lead`
- `project_manager`
- `employee`

## Permission naming
Prefer dot notation.

Examples:
- `project.create`
- `project.edit.any`
- `project.cancel`
- `task.create`
- `task.edit.own`
- `task.assign`
- `subtask.update.own`
- `employee.manage`
- `cost.view`
- `cost.edit`
- `kpi.view`
- `department.manage`

## Policy examples
A user can edit a task if any of the following is true:
- has `task.edit.any`
- is a project owner or co-manager
- is the leader of the task's team and has scoped management permission
- is an assignee and has `task.edit.own`

## Security controls
- keep AI and AWS secrets server-side only
- use `argon2id` or `bcrypt` for password storage
- use secure cookies for session-based auth in web environments
- enable CSRF protection if using cookies
- apply rate limiting to auth and AI endpoints
- validate request bodies and query parameters
- log high-risk actions with request id, actor, and diff payload
- use private S3 buckets with signed upload and download URLs
- never let the AI provider determine authorization or persistence directly
