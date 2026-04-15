import { aiPlanSchema } from './ai.schemas.js';

export class AiPlannerService {
  generateDraftPlan(projectId: number) {
    return aiPlanSchema.parse({
      summary: `Draft AI plan scaffold for project ${projectId}`,
      risks: [],
      tasks: []
    });
  }
}
