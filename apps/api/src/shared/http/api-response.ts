import type { ApiSuccess } from '@taskforge/contracts';

export function ok<T>(data: T, requestId?: string): ApiSuccess<T> {
  return {
    data,
    meta: requestId ? { requestId } : undefined
  };
}
