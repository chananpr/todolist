import { Employee } from '../../employees/domain/employee.model.js';

export class AuthService {
  async getCurrentSession(employeeId?: number) {
    if (!employeeId) {
      return {
        session: null
      };
    }

    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      return {
        session: null
      };
    }

    return {
      session: {
        employee: {
          id: employee.id,
          employeeCode: employee.employeeCode,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          position: employee.position,
          employmentStatus: employee.employmentStatus
        }
      }
    };
  }
}
