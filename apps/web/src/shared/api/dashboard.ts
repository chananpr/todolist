import type { ApiSuccess, DashboardOverview } from '@taskforge/contracts';

export async function fetchDashboardOverview(signal?: AbortSignal): Promise<DashboardOverview> {
  const response = await fetch('/api/v1/dashboard/overview', {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    },
    signal
  });

  if (!response.ok) {
    throw new Error(`Failed to load dashboard overview: ${response.status}`);
  }

  const payload = (await response.json()) as ApiSuccess<DashboardOverview>;
  return payload.data;
}
