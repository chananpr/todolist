import type { NextFunction, Request, Response } from 'express';

export function mockAuth(req: Request, _res: Response, next: NextFunction) {
  next();
}
