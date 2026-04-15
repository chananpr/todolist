import { z } from 'zod';

export const aiTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  status: z.enum(['backlog', 'todo']),
  estimated_minutes: z.number().int().nonnegative(),
  suggested_assignee_employee_id: z.number().int().positive(),
  due_date: z.string().datetime().optional(),
  subtasks: z.array(
    z.object({
      title: z.string().min(3),
      description: z.string().min(3),
      estimated_minutes: z.number().int().nonnegative()
    })
  )
});

export const aiPlanSchema = z.object({
  summary: z.string(),
  risks: z.array(
    z.object({
      title: z.string(),
      severity: z.enum(['low', 'medium', 'high']),
      mitigation: z.string()
    })
  ).default([]),
  tasks: z.array(aiTaskSchema)
});
