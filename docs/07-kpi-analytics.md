# 07 KPI and Analytics

## KPI principles
- KPI should not rely only on task counts
- derive from actual assignments, completion time, deadline adherence, and workload
- keep formula definitions configurable
- store daily snapshots for fast dashboard queries

## Recommended source data
- tasks assigned
- tasks completed
- tasks completed on time
- tasks completed late
- overdue tasks still open
- reassigned tasks
- cancelled tasks
- subtask completion behavior
- time entries and actual minutes

## Core metrics
- `completion_rate`
- `on_time_rate`
- `average_cycle_time`
- `overdue_open_count`
- `actual_vs_estimated_ratio`
- `reassigned_count`
- `workload_balance_score`
- `quality_score`

## Example weighted score
```text
kpi_score =
  0.30 * on_time_rate +
  0.20 * completion_rate +
  0.20 * quality_score +
  0.15 * efficiency_score +
  0.15 * workload_balance_score
```

## Aggregation views
- employee daily, weekly, monthly
- team daily, weekly, monthly
- department daily, weekly, monthly

## Recommendation
Add `time_entries` from the first implementation phase. Without actual work logging, KPI quality and AI forecasting will be materially weaker.
