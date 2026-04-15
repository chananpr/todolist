import type { Request, Response } from 'express';
import { ok } from '../../../shared/http/api-response.js';
import { AuthService } from '../domain/auth.service.js';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  getMe(req: Request, res: Response) {
    return res.json(
      ok(
        {
          user: req.auth ?? null,
          ...this.authService.getCurrentSession()
        },
        req.requestId
      )
    );
  }
}
