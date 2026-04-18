ด้านล่างคือ blueprint ระดับ Technical Lead / System Architect สำหรับระบบ Task / Project Management ที่ใช้งานจริงในองค์กร และรองรับ AI workflow, KPI, RBAC, audit, cost, และ future scale

**1. สรุป Requirement ใหม่ให้อ่านง่าย**
- ระบบนี้ไม่ใช่แค่ todo app แต่เป็น `internal work operating system`
- มี 6 domain หลัก: `Identity/HR`, `Org Structure`, `Project/Task/Subtask`, `AI Planning`, `KPI/Analytics`, `Audit/File`
- ต้องรองรับ `employee lifecycle` ตั้งแต่สร้างพนักงาน, reset password, deactivate, audit
- ต้องรองรับ `RBAC + scope control` ไม่ใช่ RBAC อย่างเดียว
- ต้องรองรับ `project/task/subtask` แบบ soft delete, cancel/restore, history ครบ
- ต้องมี `AI ที่สร้าง task/subtask ลง DB ได้จริง` แต่ทุก action ต้องผ่าน backend validation + permission check
- ต้องมี `Kanban drag & drop`, dashboard, today work, overdue, review queue
- ต้องมี `KPI จากข้อมูลจริง` ซึ่งหมายความว่าแนะนำให้เพิ่ม `time tracking / work log` ตั้งแต่ต้น
- ต้องมี `production concerns` เช่น security, queue, observability, retry, concurrency, migration, file lifecycle

**2. System Architecture**
แนะนำเริ่มด้วย `Modular Monolith` ก่อน ไม่ควรรีบแยก microservices ตั้งแต่วันแรก แต่ต้องออกแบบ module boundary ให้พร้อม split ภายหลัง

สถาปัตยกรรมหลัก:
- Frontend: `React + Tailwind CSS`
- Backend API: `Node.js + Express`
- ORM: `Sequelize`
- DB: `MySQL`
- Object Storage: `AWS S3`
- Auth: แนะนำ `session cookie + Redis` สำหรับ web เป็นหลัก และรองรับ JWT สำหรับ integration/mobile ในอนาคต
- AI Adapter: service layer ภายใน backend เรียก AI API ผ่าน secret key ฝั่ง server เท่านั้น
- Queue/Worker: แนะนำเพิ่ม `Redis + BullMQ` สำหรับ AI jobs, KPI aggregation, notifications, file post-processing
- Observability: `Winston/Pino`, request id, audit pipeline, metrics, error tracking

โครงแบบ:
```text
React SPA
  -> Nginx / Load Balancer
    -> Express API
      -> Auth Module
      -> HR Module
      -> RBAC Module
      -> Org Module
      -> Project Module
      -> Task/Subtask Module
      -> File Module
      -> AI Planner Module
      -> KPI Module
      -> Audit Module
      -> Notification Module
    -> MySQL
    -> Redis
    -> S3
    -> AI Provider API
```

แนวทาง production:
- ใช้ `domain modules` แยก folder ชัดเจน
- ใช้ `service layer + repository layer + policy layer`
- ใช้ `outbox/event table` สำหรับ async side effects เช่น update KPI, send notification, write activity
- ใช้ `cached derived fields` เช่น `project.progress_percent`, `task.progress_percent` แต่คำนวณจาก source of truth

**3. Database Design / ERD Tables ที่ควรมี**
แยกเป็นกลุ่มตารางดังนี้

Identity / HR
- `users`
- `employees`
- `login_sessions`
- `password_reset_tokens`
- `login_histories`
- `system_sequences`

RBAC
- `roles`
- `permissions`
- `role_permissions`
- `user_roles`
- `user_permission_overrides`

Organization
- `departments`
- `teams`
- `team_memberships` ถ้าต้องรองรับหลายทีมในอนาคต

Projects / Tasks / Work
- `projects`
- `project_managers`
- `project_members`
- `tasks`
- `task_assignees`
- `subtasks`
- `subtask_assignees` ถ้าอยาก future-proof
- `task_comments`
- `subtask_comments`
- `time_entries`
- `cost_entries`

Board / Workflow
- `board_columns`
- `task_status_catalog`
- `project_status_catalog`

Files
- `attachments`
- `attachment_links`
- `file_upload_histories`

AI
- `ai_runs`
- `ai_run_items`
- `ai_action_logs`
- `ai_prompt_templates`

Analytics / KPI
- `kpi_metric_definitions`
- `kpi_snapshots_daily`
- `kpi_snapshots_weekly`
- `kpi_snapshots_monthly`

Audit / Activity
- `activity_logs`
- `entity_change_logs`

ข้อเสนอสำคัญ:
- อย่าใช้ MySQL `ENUM` สำหรับ status ที่จะขยายบ่อย
- ใช้ `status code` แบบ `VARCHAR` + master table จะยืดหยุ่นกว่า
- ทุก table สำคัญควรมี `created_at`, `updated_at`, `created_by`, `updated_by`
- entity ที่ยกเลิก/ลบต้องมี `cancelled_at`, `cancelled_by`, `cancel_reason`, `deleted_at`

**4. RBAC Design**
ระบบนี้ `RBAC เพียวๆ ไม่พอ` ต้องใช้ `RBAC + Scope + Ownership Policy`

ระดับสิทธิ์:
- `superadmin`: ทำได้ทั้งหมด
- `hr_admin`: จัดการ employee/hr
- `department_manager`: จัดการใน department ตัวเอง
- `team_lead`: จัดการใน team ตัวเอง
- `project_manager`: จัดการเฉพาะ project ที่เป็น owner/co-manager
- `employee`: จัดการเฉพาะงานที่ได้รับมอบหมายหรือ role อนุญาต

โมเดลสิทธิ์:
- `roles` มีหลาย permission
- user มีหลาย role ได้
- user มี `extra allow/deny permissions` ได้
- permission เป็น `string code` เช่น `task.create`, `task.assign`, `employee.manage`

ลำดับการประเมินสิทธิ์:
- `superadmin bypass`
- explicit `deny` ของ user
- explicit `allow` ของ user
- role permissions
- scope policy เช่น team/project ownership
- entity ownership เช่น assigned user / creator / manager

ตัวอย่าง scope policy:
- `task.edit` ได้ ถ้า:
  - มี permission `task.edit.any`
  - หรือเป็น project manager/co-manager
  - หรือเป็น team lead ของทีม owner
  - หรือเป็น assignee และมี `task.edit.own`
- `subtask.update` ได้ ถ้า:
  - มี `subtask.update.any`
  - หรือเป็น assignee และมี `subtask.update.own`

**5. Workflow ของ Project / Task / Subtask**
Project lifecycle:
- `draft` -> `active` -> `completed`
- `draft/active` -> `cancelled`
- `cancelled` -> `restored`
- `soft delete` แยกจาก cancel

Task lifecycle:
- `backlog` -> `todo` -> `in_progress` -> `review` -> `done`
- `blocked` เป็น status ได้ หรือเป็น flag overlay
- `cancelled` เป็นสถานะแยก
- `overdue` ควรเป็น `derived state` ไม่ใช่ stored primary status

Subtask lifecycle:
- `todo` -> `in_progress` -> `done`
- `blocked`, `cancelled` รองรับได้

กฎคำนวณ progress:
- `subtask.progress_percent` เป็น source ระดับย่อย
- `task.progress_percent` คำนวณจาก subtasks ถ้ามี subtasks
- ถ้า task ไม่มี subtasks ให้ใช้ progress ของ task โดยตรง
- `project.progress_percent` คำนวณจาก tasks ทั้งหมด โดยถ่วงน้ำหนักจาก `estimated_minutes` หรือ `estimated_cost`
- ถ้าไม่มี weight ให้เฉลี่ยเท่ากันเป็น fallback

ข้อเสนอเพิ่ม:
- เพิ่ม `estimated_minutes`, `actual_minutes`
- เพิ่ม `time_entries`
- ถ้าไม่มีเวลาใช้งานจริง KPI และ deadline prediction จะอ่อนมาก

**6. AI Workflow สำหรับ Generate Task**
AI ต้องไม่เขียน DB โดยตรง ให้ผ่าน backend orchestration เท่านั้น

workflow ที่แนะนำ:
- User กด `Generate Plan`
- Backend โหลด context:
  - project description
  - department/team
  - existing tasks
  - team members + skills + current workload
  - due date / budget / priority
- Backend สร้าง `structured prompt`
- เรียก AI ด้วย `function calling / JSON schema`
- ได้ผลลัพธ์เป็น `proposed tasks/subtasks/assignees/timeline/risks`
- Backend validate:
  - schema validation
  - permission validation
  - assignee exists
  - due date reasonable
  - budget/cost constraints
  - no duplicate or conflicting task
- บันทึกเป็น `AI draft plan`
- User review/approve
- Backend transactionally create project tasks/subtasks
- เขียน `ai_runs`, `ai_action_logs`, `activity_logs`
- ส่ง event ไป update KPI / notifications / audit stream

AI use cases:
- generate project breakdown
- generate daily plan
- weekly plan
- summarize progress
- detect delay risk
- suggest assignee by workload/skill fit
- estimate due date and task order

**7. KPI Calculation Model**
KPI ต้อง `configurable` และ `ไม่ใช้จำนวน task ล้วนๆ`

แนะนำ metric หลัก:
- `assigned_count`
- `completed_count`
- `completed_on_time_count`
- `completed_late_count`
- `open_overdue_count`
- `completion_rate`
- `on_time_rate`
- `average_cycle_time`
- `average_actual_vs_estimated_ratio`
- `reassigned_count`
- `cancelled_count`
- `review_rejected_count` ถ้ามี approval flow
- `workload_score`
- `utilization_score` จาก time entries

สูตร KPI ตัวอย่าง:
```text
KPI Score = 
  0.30 * on_time_rate +
  0.20 * completion_rate +
  0.15 * quality_score +
  0.15 * workload_balance_score +
  0.10 * efficiency_score +
  0.10 * collaboration_score
```

กฎสำคัญ:
- งานที่ถูก cancel โดย manager ไม่ควร penalize พนักงานตรงๆ
- งานที่ reassigned เพราะ scope เปลี่ยน ต้องแยกเหตุผล
- KPI ต้องมีระดับ `daily`, `weekly`, `monthly`
- ต้อง aggregate ได้ทั้ง `employee`, `team`, `department`
- ควร materialize snapshot รายวันผ่าน worker job

**8. API Routes ที่ควรมี**
ใช้ `/api/v1`

Auth
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/refresh`
- `GET /auth/me`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

Employees / HR
- `GET /employees`
- `POST /employees`
- `GET /employees/:id`
- `PATCH /employees/:id`
- `PATCH /employees/:id/status`
- `POST /employees/:id/reset-password`
- `GET /employees/:id/activity`

Roles / Permissions
- `GET /roles`
- `POST /roles`
- `PATCH /roles/:id`
- `GET /permissions`
- `PUT /roles/:id/permissions`
- `PUT /users/:id/roles`
- `PUT /users/:id/permission-overrides`

Departments / Teams
- `GET /departments`
- `POST /departments`
- `PATCH /departments/:id`
- `GET /teams`
- `POST /teams`
- `PATCH /teams/:id`
- `PUT /teams/:id/members`
- `PUT /teams/:id/leader`

Projects
- `GET /projects`
- `POST /projects`
- `GET /projects/:id`
- `PATCH /projects/:id`
- `POST /projects/:id/cancel`
- `POST /projects/:id/restore`
- `DELETE /projects/:id`
- `DELETE /projects/:id/hard`
- `PUT /projects/:id/managers`
- `GET /projects/:id/history`

Tasks
- `GET /tasks`
- `POST /tasks`
- `GET /tasks/:id`
- `PATCH /tasks/:id`
- `POST /tasks/:id/cancel`
- `POST /tasks/:id/restore`
- `POST /tasks/:id/assign`
- `POST /tasks/:id/unassign`
- `POST /tasks/:id/move`
- `POST /tasks/reorder`
- `GET /tasks/today`
- `GET /tasks/my`
- `GET /tasks/overdue`
- `GET /tasks/upcoming`
- `GET /tasks/cancelled`
- `GET /tasks/:id/history`

Subtasks
- `POST /tasks/:taskId/subtasks`
- `PATCH /subtasks/:id`
- `POST /subtasks/:id/assign`
- `POST /subtasks/:id/comment`
- `POST /subtasks/:id/upload`
- `GET /subtasks/:id/history`

Files
- `POST /uploads/presign`
- `POST /uploads/complete`
- `DELETE /attachments/:id`

AI
- `POST /ai/projects/:id/generate-plan`
- `POST /ai/projects/:id/apply-plan`
- `POST /ai/tasks/daily-plan`
- `POST /ai/tasks/weekly-plan`
- `POST /ai/projects/:id/risk-analysis`
- `POST /ai/projects/:id/progress-summary`
- `GET /ai/runs`
- `GET /ai/runs/:id`

Dashboard / KPI
- `GET /dashboard/overview`
- `GET /dashboard/my-today`
- `GET /dashboard/team`
- `GET /dashboard/department`
- `GET /kpi/employees/:id`
- `GET /kpi/teams/:id`
- `GET /kpi/departments/:id`
- `GET /reports/cost-summary`

Activity
- `GET /activities`
- `GET /activities/entity/:type/:id`

**9. Frontend Pages / Components ที่ควรมี**
Pages:
- Login
- Dashboard
- My Tasks
- Today Work
- Calendar / Schedule
- Projects List
- Project Detail
- Task Board
- Task Detail Drawer / Modal
- Employee Directory
- Employee Detail
- Department Management
- Team Management
- Roles & Permissions
- KPI Dashboard
- Cost Dashboard
- Activity Center
- AI Planner Console
- Settings / Audit / Login History

Core components:
- `AppShell`
- `PermissionGuard`
- `DataTable`
- `KanbanBoard`
- `TaskCard`
- `TaskDrawer`
- `SubtaskList`
- `AssigneeSelector`
- `PriorityBadge`
- `StatusBadge`
- `DueDateBadge`
- `ActivityTimeline`
- `FileUploader`
- `CostPanel`
- `KPIWidget`
- `AIPlanPreview`
- `ApprovalBanner`

Frontend stack เสริมที่แนะนำ:
- `React Router`
- `TanStack Query`
- `react-hook-form`
- `zod`
- `@dnd-kit`
- `FullCalendar`
- `Headless UI` หรือ `Radix UI`

**10. Drag & Drop Board Structure**
โครงบอร์ด:
- `Backlog`
- `Todo`
- `In Progress`
- `Review`
- `Done`
- `Cancelled`

ข้อเสนอ production:
- ใช้ `@dnd-kit`
- เก็บ order เป็น `rank_key` แบบ fractional / LexoRank แทน integer ล้วน
- task record มี:
  - `board_column_id`
  - `rank_key`
  - `status_code`
- drag ข้ามคอลัมน์ = update `board_column_id`, `status_code`, `rank_key`
- optimistic UI ได้ แต่ backend ต้องมี conflict handling
- ถ้า due date เลยกำหนด ให้แสดง `Overdue badge` ไม่จำเป็นต้องย้ายคอลัมน์
- รองรับ filter ตาม assignee, priority, project, team

**11. Activity Log / Audit Design**
แยก 2 แบบ:
- `activity_logs` สำหรับ UI timeline
- `entity_change_logs` สำหรับ audit/detail diff

โครง activity log:
- `actor_type`: user, ai, system
- `actor_id`
- `entity_type`: employee, role, project, task, subtask, attachment
- `entity_id`
- `action`: created, updated, assigned, moved, cancelled, restored, deleted, uploaded, ai_generated
- `summary`
- `metadata_json`
- `request_id`
- `ip_address`
- `user_agent`
- `created_at`

โครง change log:
- `old_values_json`
- `new_values_json`
- `changed_fields_json`

แนวทาง:
- เขียน log ใน transaction เดียวกับ business action
- มี `request_id` ผูกทั้ง API request และ worker job
- AI action ต้องระบุ `ai_run_id`

**12. S3 Upload Design**
แนวทางปลอดภัย:
- S3 bucket เป็น `private`
- Frontend ขอ `presigned PUT URL` จาก backend
- backend validate:
  - entity type
  - permission
  - mime type
  - file size
  - allowed extension
- อัปโหลดเสร็จ frontend เรียก `complete upload`
- backend บันทึก `attachments` และ link กับ task/subtask
- preview ใช้ `signed GET URL`
- ลบไฟล์ใช้ soft delete ที่ metadata ก่อน แล้ว async cleanup object

แนะนำ metadata:
- `bucket`
- `object_key`
- `original_name`
- `mime_type`
- `file_size`
- `uploaded_by`
- `checksum`
- `entity_type`
- `entity_id`
- `visibility`
- `scan_status`

ถ้าต้อง production จริง:
- เพิ่ม `virus scan`
- resize thumbnail แยก worker

**13. Security Best Practices**
- เก็บ AI secret key ฝั่ง backend เท่านั้น
- ใช้ `Argon2id` หรือ `bcrypt` สำหรับ password hash
- ถ้า web-only ให้ใช้ `HTTP-only Secure SameSite cookie session`
- ถ้าใช้ JWT ให้ใช้ `short-lived access token + rotating refresh token`
- ใช้ `CSRF protection` ถ้า session cookie
- ใช้ `helmet`, rate limit, brute-force protection
- ใช้ input validation ทุก endpoint ด้วย `zod/joi`
- ใช้ `permission middleware` + `resource policy check`
- ใช้ audit log สำหรับทุก action สำคัญ
- S3 bucket เป็น private, ไม่ hardcode public URL
- sanitize filenames, block executable upload
- ใช้ parameterized queries ผ่าน ORM
- ใช้ DB migrations versioned
- แยก env secrets ต่อ environment
- เปิด TLS ทุกจุด
- AI prompt ต้อง strip sensitive data ที่ไม่จำเป็น
- ป้องกัน prompt injection โดยห้าม model ตัดสิน permission เอง
- ทุก AI-generated action ต้อง validate และ optionally require approval

**14. Phased Development Plan**
MVP
- Auth + session/JWT
- Employee CRUD + auto username/password
- Department/Team
- Roles/Permissions พื้นฐาน
- Project CRUD
- Task/Subtask CRUD
- Task board drag & drop
- File upload S3 สำหรับภาพ
- Activity log พื้นฐาน
- Dashboard พื้นฐาน
- AI generate draft tasks จาก project description
- Manual approve ก่อน apply

Phase 2
- Time tracking / work logs
- KPI daily/weekly/monthly
- Cost tracking summary
- AI assignee suggestion
- AI risk prediction
- Calendar view
- Notification center
- Review / approval workflow
- Restore/cancel flows ครบทุก entity

Advanced
- Configurable workflow engine
- Multi-step approval
- Advanced KPI formulas
- SLA / workload balancing
- Cross-project resource planning
- SSO / LDAP / Google Workspace / Azure AD
- Multi-tenant / business unit separation
- Data warehouse / BI export
- AI copilot chat with task actions
- RAG over project docs / SOP

**15. ตัวอย่าง Schema/Table Structure แบบใช้งานจริง**
ตัวอย่างตารางหลัก

```sql
CREATE TABLE system_sequences (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  sequence_key VARCHAR(100) NOT NULL UNIQUE,
  next_value BIGINT NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  auth_status VARCHAR(30) NOT NULL DEFAULT 'active',
  must_change_password TINYINT(1) NOT NULL DEFAULT 1,
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE employees (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  employee_code VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(30) NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  department_id BIGINT NULL,
  team_id BIGINT NULL,
  position VARCHAR(100) NULL,
  manager_employee_id BIGINT NULL,
  start_date DATE NULL,
  employment_status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_by BIGINT NULL,
  updated_by BIGINT NULL,
  deactivated_at DATETIME NULL,
  deleted_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  is_system TINYINT(1) NOT NULL DEFAULT 0,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(120) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  resource VARCHAR(80) NOT NULL,
  action VARCHAR(80) NOT NULL,
  description VARCHAR(255) NULL
);

CREATE TABLE role_permissions (
  role_id BIGINT NOT NULL,
  permission_id BIGINT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE user_roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  is_primary TINYINT(1) NOT NULL DEFAULT 0,
  assigned_by BIGINT NULL,
  assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  revoked_at DATETIME NULL,
  UNIQUE KEY uniq_active_user_role (user_id, role_id, revoked_at)
);

CREATE TABLE projects (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  project_code VARCHAR(50) NOT NULL UNIQUE,
  project_name VARCHAR(200) NOT NULL,
  description TEXT NULL,
  department_id BIGINT NULL,
  team_id BIGINT NULL,
  owner_employee_id BIGINT NOT NULL,
  default_manager_employee_id BIGINT NULL,
  status_code VARCHAR(30) NOT NULL DEFAULT 'draft',
  priority VARCHAR(20) NOT NULL DEFAULT 'medium',
  progress_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
  budget DECIMAL(14,2) NOT NULL DEFAULT 0,
  estimated_cost DECIMAL(14,2) NOT NULL DEFAULT 0,
  actual_cost DECIMAL(14,2) NOT NULL DEFAULT 0,
  start_date DATE NULL,
  due_date DATE NULL,
  cancel_reason TEXT NULL,
  cancelled_at DATETIME NULL,
  cancelled_by BIGINT NULL,
  deleted_at DATETIME NULL,
  created_by BIGINT NOT NULL,
  updated_by BIGINT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_projects_team_status (team_id, status_code),
  KEY idx_projects_due_date (due_date)
);

CREATE TABLE project_managers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  project_id BIGINT NOT NULL,
  employee_id BIGINT NOT NULL,
  manager_type VARCHAR(30) NOT NULL DEFAULT 'co_manager',
  assigned_by BIGINT NULL,
  assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  revoked_at DATETIME NULL,
  UNIQUE KEY uniq_active_project_manager (project_id, employee_id, revoked_at)
);

CREATE TABLE tasks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  task_code VARCHAR(50) NOT NULL UNIQUE,
  project_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  created_by BIGINT NOT NULL,
  managed_by BIGINT NULL,
  approved_by BIGINT NULL,
  status_code VARCHAR(30) NOT NULL DEFAULT 'todo',
  board_column_key VARCHAR(30) NOT NULL DEFAULT 'todo',
  rank_key VARCHAR(40) NOT NULL,
  priority VARCHAR(20) NOT NULL DEFAULT 'medium',
  progress_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
  estimated_cost DECIMAL(14,2) NOT NULL DEFAULT 0,
  actual_cost DECIMAL(14,2) NOT NULL DEFAULT 0,
  estimated_minutes INT NOT NULL DEFAULT 0,
  actual_minutes INT NOT NULL DEFAULT 0,
  start_date DATETIME NULL,
  due_date DATETIME NULL,
  cancel_reason TEXT NULL,
  cancelled_at DATETIME NULL,
  restored_at DATETIME NULL,
  deleted_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_tasks_project_status (project_id, status_code),
  KEY idx_tasks_due_date (due_date),
  KEY idx_tasks_board (project_id, board_column_key, rank_key)
);

CREATE TABLE task_assignees (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  task_id BIGINT NOT NULL,
  employee_id BIGINT NOT NULL,
  is_primary TINYINT(1) NOT NULL DEFAULT 0,
  assigned_by BIGINT NULL,
  assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  unassigned_at DATETIME NULL,
  UNIQUE KEY uniq_active_task_assignee (task_id, employee_id, unassigned_at)
);

CREATE TABLE subtasks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  task_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  status_code VARCHAR(30) NOT NULL DEFAULT 'todo',
  progress_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
  assigned_employee_id BIGINT NULL,
  estimated_cost DECIMAL(14,2) NOT NULL DEFAULT 0,
  actual_cost DECIMAL(14,2) NOT NULL DEFAULT 0,
  estimated_minutes INT NOT NULL DEFAULT 0,
  actual_minutes INT NOT NULL DEFAULT 0,
  start_date DATETIME NULL,
  due_date DATETIME NULL,
  completed_at DATETIME NULL,
  notes TEXT NULL,
  created_by BIGINT NOT NULL,
  updated_by BIGINT NULL,
  deleted_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_subtasks_task_status (task_id, status_code)
);

CREATE TABLE attachments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  entity_type VARCHAR(50) NOT NULL,
  entity_id BIGINT NOT NULL,
  bucket VARCHAR(120) NOT NULL,
  object_key VARCHAR(255) NOT NULL UNIQUE,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(120) NOT NULL,
  file_size BIGINT NOT NULL,
  uploaded_by BIGINT NOT NULL,
  checksum_sha256 VARCHAR(64) NULL,
  scan_status VARCHAR(30) NOT NULL DEFAULT 'pending',
  deleted_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_attachments_entity (entity_type, entity_id)
);

CREATE TABLE activity_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  actor_type VARCHAR(20) NOT NULL,
  actor_id BIGINT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id BIGINT NOT NULL,
  action_code VARCHAR(80) NOT NULL,
  summary VARCHAR(255) NOT NULL,
  metadata_json JSON NULL,
  request_id VARCHAR(64) NULL,
  ip_address VARCHAR(64) NULL,
  user_agent VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_activity_entity (entity_type, entity_id, created_at),
  KEY idx_activity_actor (actor_type, actor_id, created_at)
);

CREATE TABLE ai_runs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  requested_by BIGINT NOT NULL,
  project_id BIGINT NULL,
  run_type VARCHAR(50) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  model_name VARCHAR(100) NOT NULL,
  input_snapshot_json JSON NOT NULL,
  output_json JSON NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'queued',
  validation_errors_json JSON NULL,
  applied_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**16. ตัวอย่าง Prompt สำหรับ AI Planner**
```text
System:
You are an enterprise project planning assistant.
Generate executable work items for an internal project management system.
You must return strictly valid JSON matching the provided schema.
Do not include markdown.
Do not assign users that are not in the allowed assignee list.
Respect project deadline, workload, and dependency order.
Prefer realistic task breakdown over vague suggestions.

Business rules:
- Tasks must be actionable and measurable.
- Each task should have 1 primary owner, but can include additional collaborators.
- Subtasks must reflect actual execution steps.
- Do not create more than 12 top-level tasks unless explicitly requested.
- Use priority: low, medium, high, urgent.
- Use status: backlog or todo only for newly generated items.
- If deadline risk exists, include risk flags and mitigation suggestions.

User context:
Project name: {{project_name}}
Project description: {{project_description}}
Department: {{department_name}}
Team: {{team_name}}
Start date: {{start_date}}
Due date: {{due_date}}
Budget: {{budget}}
Existing tasks: {{existing_tasks_summary}}
Available assignees: {{assignee_catalog_with_skills_and_workload}}
Planning preference: {{planning_mode}}

Task:
Generate a project execution plan with tasks, subtasks, dependencies, suggested assignees, estimates, priorities, and risks.
```

**17. ตัวอย่าง Function Calling / JSON Output Format**
schema ที่ backend ควร validate:

```json
{
  "type": "object",
  "required": ["project_plan"],
  "properties": {
    "project_plan": {
      "type": "object",
      "required": ["summary", "tasks"],
      "properties": {
        "summary": { "type": "string" },
        "risks": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["title", "severity", "mitigation"],
            "properties": {
              "title": { "type": "string" },
              "severity": { "type": "string", "enum": ["low", "medium", "high"] },
              "mitigation": { "type": "string" }
            }
          }
        },
        "tasks": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["title", "description", "priority", "status", "estimated_minutes", "suggested_assignee_employee_id", "subtasks"],
            "properties": {
              "title": { "type": "string" },
              "description": { "type": "string" },
              "priority": { "type": "string", "enum": ["low", "medium", "high", "urgent"] },
              "status": { "type": "string", "enum": ["backlog", "todo"] },
              "estimated_minutes": { "type": "integer", "minimum": 0 },
              "start_date": { "type": "string", "format": "date-time" },
              "due_date": { "type": "string", "format": "date-time" },
              "suggested_assignee_employee_id": { "type": "integer" },
              "collaborator_employee_ids": {
                "type": "array",
                "items": { "type": "integer" }
              },
              "dependency_titles": {
                "type": "array",
                "items": { "type": "string" }
              },
              "subtasks": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": ["title", "description", "estimated_minutes"],
                  "properties": {
                    "title": { "type": "string" },
                    "description": { "type": "string" },
                    "estimated_minutes": { "type": "integer", "minimum": 0 },
                    "start_date": { "type": "string", "format": "date-time" },
                    "due_date": { "type": "string", "format": "date-time" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

ตัวอย่าง output:
```json
{
  "project_plan": {
    "summary": "แผนงานแบ่งเป็น 4 stream หลัก: requirements, backend, frontend, UAT",
    "risks": [
      {
        "title": "ทีม frontend มี workload สูง",
        "severity": "medium",
        "mitigation": "เลื่อนงาน dashboard ระยะ 2 และ assign backend-first endpoints ก่อน"
      }
    ],
    "tasks": [
      {
        "title": "วิเคราะห์ requirement และออกแบบ data model",
        "description": "เก็บ requirement และสร้าง schema เบื้องต้นสำหรับ project, task, subtask, RBAC",
        "priority": "high",
        "status": "todo",
        "estimated_minutes": 720,
        "start_date": "2026-04-16T09:00:00+07:00",
        "due_date": "2026-04-17T18:00:00+07:00",
        "suggested_assignee_employee_id": 23,
        "collaborator_employee_ids": [31],
        "dependency_titles": [],
        "subtasks": [
          {
            "title": "สรุป requirement จาก stakeholder",
            "description": "จัดหมวดหมู่ business rules และ permissions",
            "estimated_minutes": 180,
            "start_date": "2026-04-16T09:00:00+07:00",
            "due_date": "2026-04-16T12:00:00+07:00"
          },
          {
            "title": "ออกแบบ ERD และ indexes",
            "description": "ออกแบบ tables และ index strategy สำหรับ production",
            "estimated_minutes": 240,
            "start_date": "2026-04-16T13:00:00+07:00",
            "due_date": "2026-04-16T17:00:00+07:00"
          }
        ]
      }
    ]
  }
}
```

backend apply flow:
- รับ output
- validate schema
- map dependency by title -> task ids
- check assignee exists and allowed
- clamp dates within project range
- create draft rows in transaction
- return preview or apply immediately if mode = auto_apply และ user มีสิทธิ์

**18. จุดที่ควรระวังใน Production**
- `Pure RBAC ไม่พอ` ต้องมี scope/ownership policy
- `Overdue` ไม่ควรเก็บเป็นสถานะหลัก เพราะข้อมูลจะเพี้ยนง่าย
- `KPI จาก task count อย่างเดียว` จะทำให้ behavior บิด
- ถ้าไม่มี `time_entries` จะวัด actual effort และ forecast ยาก
- drag & drop ถ้าใช้ integer order อย่างเดียวจะชนกันง่ายเมื่อ concurrent สูง
- soft delete/cancel/restore ต้องแยก semantics ให้ชัด
- AI ต้องไม่ write DB ตรง และต้องไม่ตัดสิน permission เอง
- AI output ต้อง validate ทุก field
- S3 upload ต้องระวัง orphan files และ incomplete uploads
- audit log ต้อง immutable พอสมควร และ query ได้เร็ว
- sequence generation เช่น username/task_code ต้องใช้ transaction-safe mechanism
- project progress ที่คำนวณทุก query จะช้า ควรมี cached aggregate
- timezone ต้องชัดเจน โดยเฉพาะ due date / overdue / KPI daily cutoff
- cost data ต้องมี permission แยกจาก task permission
- long-running AI/KPI jobs ต้องใช้ queue + retry + idempotency key
- analytics/dashboard ควรอ่านจาก snapshot/materialized tables ไม่ยิง query หนักตลอด
- migration ต้องออกแบบ rollback strategy และ seed master data ให้ดี

ถ้าต้องการ ผมทำต่อได้ 2 ทาง:
1. แปลง blueprint นี้เป็น `backend folder structure + Sequelize models/migrations + API contract`
2. สร้าง `docs/architecture.md`, `ERD`, และ `implementation roadmap` ลงใน repo นี้ให้พร้อมเริ่มพัฒนา