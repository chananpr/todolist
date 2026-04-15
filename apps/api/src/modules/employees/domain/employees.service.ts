import { EmployeesRepository } from './employees.repository.js';

export class EmployeesService {
  constructor(private readonly repository: EmployeesRepository) {}

  listEmployees() {
    return this.repository.list();
  }
}
