export interface EmployeeListItem {
  id: number;
  employeeCode: string;
  fullName: string;
  department: string;
  team: string;
  role: string;
  status: string;
}

export class EmployeesRepository {
  async list(): Promise<EmployeeListItem[]> {
    return [
      {
        id: 1,
        employeeCode: 'EMP-10000',
        fullName: 'Narin Sutham',
        department: 'Engineering',
        team: 'Platform',
        role: 'superadmin',
        status: 'active'
      },
      {
        id: 2,
        employeeCode: 'EMP-10001',
        fullName: 'Mali K.',
        department: 'Operations',
        team: 'PMO',
        role: 'project_manager',
        status: 'active'
      }
    ];
  }
}
