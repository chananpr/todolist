import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.js';

export function requirePermission(permission: string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const auth = req.auth;

    if (!auth) {
      return next(new HttpError(401, 'Authentication required'));
    }

    if (auth.permissionCodes.includes('*') || auth.permissionCodes.includes(permission)) {
      return next();
    }

    return next(new HttpError(403, `Missing permission: ${permission}`));
  };
}
