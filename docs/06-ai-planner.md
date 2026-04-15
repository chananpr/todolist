# 06 AI Planner

## AI planner principles
- AI proposes structured work plans
- backend validates every generated action
- users review drafts before apply unless policy explicitly allows auto-apply
- AI outputs are logged for audit and troubleshooting

## AI use cases
- create tasks from project description
- break tasks into subtasks
- recommend assignees based on skill and workload
- recommend timeline and due dates
- generate daily and weekly plans
- summarize project progress
- identify delay risks

## AI execution flow
1. user requests plan generation
2. backend loads project context, team context, workload, and constraints
3. backend sends structured prompt to AI provider
4. AI returns JSON matching strict schema
5. backend validates schema, dates, assignees, duplicates, and permissions
6. backend stores plan draft in `ai_runs`
7. user reviews and approves
8. backend applies changes in a transaction
9. activity and AI audit logs are written

## Prompt example
```text
You are an enterprise project planner.
Return strictly valid JSON only.
Break work into realistic tasks and subtasks.
Use only the provided employee ids for assignee recommendations.
Do not exceed the project due date.
Highlight any deadline risk.
```

## Structured output shape
Top-level keys:
- `summary`
- `risks`
- `tasks`

Each task should include:
- title
- description
- priority
- status
- estimated minutes
- suggested assignee employee id
- due date
- subtasks

## Validation rules
- reject unknown assignee ids
- reject unsupported statuses or priorities
- clamp dates that exceed project boundary
- reject writes if user lacks create or assign permission
- store original raw response for audit if privacy policy allows
