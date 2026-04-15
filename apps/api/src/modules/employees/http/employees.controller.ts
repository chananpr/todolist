import type { Request, Response } from 'express';
import { ok } from '../../../shared/http/api-response.js';
import { EmployeesService } from '../domain/employees.service.js';

export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  async list(req: Request, res: Response) {
    const items = await this.employeesService.listEmployees();
    return res.json(ok({ items }, req.requestId));
  }
}
