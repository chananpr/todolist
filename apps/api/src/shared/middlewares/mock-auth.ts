import type { NextFunction, Request, Response } from 'express';

export function mockAuth(req: Request, _res: Response, next: NextFunction) {
  req.auth = {
    userId: 1,
    employeeId: 1,
    roleCodes: ['superadmin'],
    permissionCodes: ['*']
  };

  next();
}
