/**
 * Vitest global setup for the API workspace.
 *
 * Ensures zod-backed env schema (src/config/env.ts) validates even when
 * developers haven't copied .env.example locally. Real values stay in
 * .env and override these defaults. Keep secrets at >=8 chars to
 * satisfy the min-length check.
 */
process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-jwt-secret';
process.env.SESSION_SECRET = process.env.SESSION_SECRET ?? 'test-session-secret';
process.env.AI_API_KEY = process.env.AI_API_KEY ?? 'test-ai-key';
process.env.ALLOW_DEGRADED_START = process.env.ALLOW_DEGRADED_START ?? 'true';
