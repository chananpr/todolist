import type { ApiSuccess, ProjectSummary } from '@taskforge/contracts';

const API_BASE = 'http://localhost:4000';

export async function fetchProjects(signal?: AbortSignal): Promise<ProjectSummary[]> {
  const res = await fetch(`${API_BASE}/api/v1/projects`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal
  });
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
  const json = (await res.json()) as ApiSuccess<{ items: ProjectSummary[] }>;
  return json.data.items;
}
