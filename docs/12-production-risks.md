# 12 Production Risks

## Core risks
- using RBAC without scope checks creates data exposure risk
- storing overdue as a static status causes reporting drift
- KPI based only on task counts will distort employee behavior
- missing time entry data weakens analytics and AI forecasting
- AI-generated writes without validation create integrity risk
- naive integer board ordering causes concurrency issues
- public S3 access creates unnecessary data leakage risk
- missing audit correlation ids makes incidents hard to investigate
- lack of async workers will slow user-facing requests under AI and reporting load

## Operational recommendations
- add request ids to every API call and worker chain
- enforce idempotency for AI apply endpoints and file completion endpoints
- separate read-heavy dashboards from transactional writes when scale grows
- monitor queue latency, DB slow queries, and S3 failures
