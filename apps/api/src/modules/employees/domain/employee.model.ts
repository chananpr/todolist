import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '../../../infrastructure/database/sequelize.js';

export class Employee extends Model<InferAttributes<Employee>, InferCreationAttributes<Employee>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare employeeCode: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phone: string | null;
  declare departmentId: number | null;
  declare teamId: number | null;
  declare position: string | null;
  declare employmentStatus: string;
}

Employee.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, unique: true, field: 'user_id' },
    employeeCode: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: 'employee_code' },
    firstName: { type: DataTypes.STRING(100), allowNull: false, field: 'first_name' },
    lastName: { type: DataTypes.STRING(100), allowNull: false, field: 'last_name' },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(30), allowNull: true },
    departmentId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, field: 'department_id' },
    teamId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, field: 'team_id' },
    position: { type: DataTypes.STRING(100), allowNull: true },
    employmentStatus: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'active', field: 'employment_status' }
  },
  {
    sequelize,
    tableName: 'employees'
  }
);
