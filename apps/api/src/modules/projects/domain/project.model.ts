import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '../../../infrastructure/database/sequelize.js';

export class Project extends Model<
  InferAttributes<Project, { omit: 'createdAt' | 'updatedAt' }>,
  InferCreationAttributes<Project, { omit: 'createdAt' | 'updatedAt' }>
> {
  declare id: CreationOptional<number>;
  declare projectCode: string;
  declare projectName: string;
  declare statusCode: string;
  declare priority: string;
  declare progressPercent: number;
  declare dueDate: Date | null;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Project.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    projectCode: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: 'project_code' },
    projectName: { type: DataTypes.STRING(200), allowNull: false, field: 'project_name' },
    statusCode: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'draft', field: 'status_code' },
    priority: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'medium' },
    progressPercent: { type: DataTypes.DECIMAL(5, 2), allowNull: false, defaultValue: 0, field: 'progress_percent' },
    dueDate: { type: DataTypes.DATEONLY, allowNull: true, field: 'due_date' }
  },
  {
    sequelize,
    tableName: 'projects'
  }
);
