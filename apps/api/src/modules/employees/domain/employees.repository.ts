import { Employee } from './employee.model.js';

export interface EmployeeListItem {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  departmentId: number | null;
  teamId: number | null;
  position: string | null;
  status: string;
}

export class EmployeesRepository {
  async list(): Promise<EmployeeListItem[]> {
    const employees = await Employee.findAll({
      order: [
        ['firstName', 'ASC'],
        ['lastName', 'ASC']
      ]
    });

    return employees.map((employee) => ({
      id: employee.id,
      employeeCode: employee.employeeCode,
      fullName: `${employee.firstName} ${employee.lastName}`.trim(),
      email: employee.email,
      departmentId: employee.departmentId,
      teamId: employee.teamId,
      position: employee.position,
      status: employee.employmentStatus
    }));
  }
}
