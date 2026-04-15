import type { Request, Response } from 'express';
import { ok } from '../../../shared/http/api-response.js';
import { AuthService } from '../domain/auth.service.js';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async getMe(req: Request, res: Response) {
    const session = await this.authService.getCurrentSession(req.auth?.employeeId);
    return res.json(
      ok(
        {
          user: req.auth ?? null,
          ...session
        },
        req.requestId
      )
    );
  }
}
