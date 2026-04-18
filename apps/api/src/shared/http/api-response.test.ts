import { describe, expect, it } from 'vitest';
import { ok } from './api-response.js';

describe('ok() response shape', () => {
  it('wraps data under a `data` key', () => {
    const response = ok({ message: 'hello' });
    expect(response.data).toEqual({ message: 'hello' });
  });

  it('includes requestId in meta when provided', () => {
    const response = ok({ ok: true }, 'req-123');
    expect(response.meta).toEqual({ requestId: 'req-123' });
  });

  it('omits meta entirely when no requestId is given', () => {
    const response = ok({ ok: true });
    expect(response.meta).toBeUndefined();
  });

  it('preserves the input data type (sanity check)', () => {
    const payload = { count: 42, items: ['a', 'b'] };
    const response = ok(payload);
    expect(response.data).toBe(payload);
  });
});
