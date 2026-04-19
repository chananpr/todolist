import { describe, expect, it, beforeAll, vi } from 'vitest';
import request from 'supertest';
import type { Express } from 'express';

describe('GET /api/v1/projects', () => {
  let app: Express;

  beforeAll(async () => {
    // Force the repository to throw so the service's fallback
    // path is exercised deterministically. Without this, the
    // test depends on whether a local MySQL happens to be
    // listening on :3306 — CI has none (fallback triggers, test
    // passes) but a dev machine with MySQL installed natively
    // connects and returns an empty array (test would fail).
    const { ProjectsRepository } = await import('../domain/projects.repository.js');
    vi.spyOn(ProjectsRepository.prototype, 'list').mockRejectedValue(
      new Error('db unavailable (mocked for test)')
    );

    const { createApp } = await import('../../../app/create-app.js');
    app = createApp();
  });

  it('returns 200 with items array', async () => {
    const res = await request(app).get('/api/v1/projects');
    expect(res.status).toBe(200);
    expect(res.body.data.items).toEqual(expect.any(Array));
    expect(res.body.data.items.length).toBeGreaterThan(0);
  });

  it('each item has required ProjectSummary fields', async () => {
    const res = await request(app).get('/api/v1/projects');
    const item = res.body.data.items[0];
    expect(item).toMatchObject({
      id: expect.any(Number),
      projectCode: expect.any(String),
      projectName: expect.any(String),
      status: expect.any(String),
      priority: expect.any(String),
      progressPercent: expect.any(Number)
    });
  });
});
