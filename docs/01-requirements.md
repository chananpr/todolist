# 01 Requirements

## Business goal
Build an enterprise work management platform that supports daily operations, project execution, team coordination, performance measurement, and AI-assisted planning.

## Capability domains
- HR and employee lifecycle management
- RBAC with scope-aware authorization
- Department and team hierarchy
- Project, task, and subtask execution
- Drag and drop board management
- AI-generated work planning with controlled write operations
- KPI and productivity analytics
- Cost tracking and evidence storage
- Audit logs, activity timelines, and login history
- Secure file upload through AWS S3

## Key business rules
- `superadmin` can access all resources
- team leaders manage their own teams by default
- project co-managers share operational authority on assigned projects
- standard employees can only edit work assigned to them unless policy allows broader access
- cancelled resources are retained and restorable
- soft delete is the default delete mode
- project and task progress are derived from actual child records
- AI can propose and create work items only through backend validation and authorization
- AI secrets must remain on the server side

## Non-functional requirements
- production-ready API and database design
- scale to more users, teams, departments, and permissions without schema rewrites
- immutable audit behavior for critical actions
- secure media upload and retrieval
- extensible KPI formulas and workflow rules
