# 08 API Design

Base path: `/api/v1`

## Auth
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

## Employees
- `GET /employees`
- `POST /employees`
- `GET /employees/:id`
- `PATCH /employees/:id`
- `PATCH /employees/:id/status`
- `POST /employees/:id/reset-password`

## Roles and permissions
- `GET /roles`
- `POST /roles`
- `PATCH /roles/:id`
- `GET /permissions`
- `PUT /roles/:id/permissions`
- `PUT /users/:id/roles`
- `PUT /users/:id/permission-overrides`

## Departments and teams
- `GET /departments`
- `POST /departments`
- `GET /teams`
- `POST /teams`
- `PATCH /teams/:id`
- `PUT /teams/:id/members`

## Projects
- `GET /projects`
- `POST /projects`
- `GET /projects/:id`
- `PATCH /projects/:id`
- `POST /projects/:id/cancel`
- `POST /projects/:id/restore`
- `PUT /projects/:id/managers`
- `GET /projects/:id/history`

## Tasks
- `GET /tasks`
- `POST /tasks`
- `GET /tasks/:id`
- `PATCH /tasks/:id`
- `POST /tasks/:id/assign`
- `POST /tasks/:id/unassign`
- `POST /tasks/:id/cancel`
- `POST /tasks/:id/restore`
- `POST /tasks/:id/move`
- `POST /tasks/reorder`
- `GET /tasks/today`
- `GET /tasks/my`
- `GET /tasks/overdue`

## Subtasks
- `POST /tasks/:taskId/subtasks`
- `PATCH /subtasks/:id`
- `POST /subtasks/:id/comment`
- `POST /subtasks/:id/upload`
- `GET /subtasks/:id/history`

## AI
- `POST /ai/projects/:id/generate-plan`
- `POST /ai/projects/:id/apply-plan`
- `POST /ai/tasks/daily-plan`
- `POST /ai/tasks/weekly-plan`
- `POST /ai/projects/:id/risk-analysis`
- `POST /ai/projects/:id/progress-summary`
- `GET /ai/runs/:id`

## Dashboard and KPI
- `GET /dashboard/overview`
- `GET /dashboard/my-today`
- `GET /dashboard/team`
- `GET /kpi/employees/:id`
- `GET /kpi/teams/:id`
- `GET /kpi/departments/:id`

## Files
- `POST /uploads/presign`
- `POST /uploads/complete`
- `DELETE /attachments/:id`
