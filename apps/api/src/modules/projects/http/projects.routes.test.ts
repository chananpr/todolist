import { describe, expect, it, beforeAll } from 'vitest';
import request from 'supertest';
import type { Express } from 'express';

describe('GET /api/v1/projects', () => {
  let app: Express;
  beforeAll(async () => {
    const { createApp } = await import('../../../app/create-app.js');
    app = createApp();
  });

  it('returns 200 with items array', async () => {
    const res = await request(app).get('/api/v1/projects');
    expect(res.status).toBe(200);
    expect(res.body.data.items).toEqual(expect.any(Array));
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
      progressPercent: expect.any(Number),
    });
  });
});
