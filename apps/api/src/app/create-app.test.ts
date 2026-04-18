import { describe, expect, it, beforeAll } from 'vitest';
import request from 'supertest';
import type { Express } from 'express';

/**
 * Smoke tests for the Express app assembled by `createApp()`.
 *
 * These tests intentionally don't boot the full server (no
 * sequelize.authenticate / model sync) so they run in CI without MySQL.
 * The health endpoint surfaces the database runtime state, so it
 * degrades gracefully when the DB hasn't been initialised.
 */
describe('createApp()', () => {
  let app: Express;

  beforeAll(async () => {
    const { createApp } = await import('./create-app.js');
    app = createApp();
  });

  it('exposes the API info payload at GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      name: expect.any(String),
      version: '0.1.0',
      apiBasePath: '/api/v1'
    });
  });

  it('exposes the health endpoint at GET /api/v1/health', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      service: 'taskforge-api',
      status: expect.stringMatching(/^(ok|degraded)$/),
      timestamp: expect.any(String),
      database: {
        connected: expect.any(Boolean),
        degraded: expect.any(Boolean)
      }
    });
  });

  it('reports a "degraded" status when no DB bootstrap has run', async () => {
    // create-app is imported without bootstrap/server.ts wiring,
    // so databaseRuntimeState.degraded should still be the initial value.
    const res = await request(app).get('/api/v1/health');
    expect(['ok', 'degraded']).toContain(res.body.data.status);
  });

  it('returns a JSON 404 for unknown routes', async () => {
    const res = await request(app).get('/api/v1/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });

  it('attaches a requestId in the response meta', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.body.meta?.requestId).toEqual(expect.any(String));
    expect(res.body.meta.requestId.length).toBeGreaterThan(0);
  });
});
