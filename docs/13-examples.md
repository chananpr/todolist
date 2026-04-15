# 13 Examples

## Example SQL table structures

```sql
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
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE subtasks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  task_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  assigned_employee_id BIGINT NULL,
  status_code VARCHAR(30) NOT NULL DEFAULT 'todo',
  progress_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
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
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Example AI planner prompt

```text
System:
You are an enterprise project planning assistant.
Return valid JSON only.
Break the project into executable tasks and subtasks.
Use only the employee ids provided in context.
Prefer realistic workload allocation and deadline safety.
Do not create vague tasks.

User Context:
Project: ERP Rollout for Finance and Procurement
Description: Replace legacy spreadsheets with integrated approval workflows.
Available Assignees:
- 18: backend engineer, workload 60%
- 22: frontend engineer, workload 70%
- 31: finance operations lead, workload 50%
- 44: QA analyst, workload 40%
Project Start: 2026-04-20
Project Due: 2026-06-15

Task:
Generate a plan with tasks, subtasks, estimates, assignees, and risk notes.
```

## Example structured AI output contract

```json
{
  "summary": "Work is split into discovery, backend integration, frontend rollout, training, and go-live readiness.",
  "risks": [
    {
      "title": "Frontend review bandwidth is limited",
      "severity": "medium",
      "mitigation": "Pull UI review earlier and reserve QA review windows weekly"
    }
  ],
  "tasks": [
    {
      "title": "Map existing finance approval process",
      "description": "Document current spreadsheet and approval routing behavior before system design.",
      "priority": "high",
      "status": "todo",
      "estimated_minutes": 720,
      "suggested_assignee_employee_id": 31,
      "due_date": "2026-04-25T18:00:00+07:00",
      "subtasks": [
        {
          "title": "Interview finance approvers",
          "description": "Capture approval steps, exceptions, and pain points.",
          "estimated_minutes": 240
        },
        {
          "title": "Draft target workflow document",
          "description": "Create system-ready workflow outline for engineering handoff.",
          "estimated_minutes": 300
        }
      ]
    }
  ]
}
```

## Example task creation validation checklist
- caller has `task.create`
- caller has `task.assign` if assignees are included
- assignee exists and is active
- due date is within project range unless override permission exists
- cancelled project cannot receive new tasks
- duplicated title within same project is flagged for confirmation
