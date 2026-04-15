import { Router } from 'express';
import { EmployeesController } from './employees.controller.js';
import { EmployeesRepository } from '../domain/employees.repository.js';
import { EmployeesService } from '../domain/employees.service.js';
import { requirePermission } from '../../../shared/middlewares/require-permission.js';
import { asyncHandler } from '../../../shared/utils/async-handler.js';

const controller = new EmployeesController(new EmployeesService(new EmployeesRepository()));

export const employeesRouter = Router();
employeesRouter.get('/', requirePermission('employee.manage'), asyncHandler(controller.list.bind(controller)));
