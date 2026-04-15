import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '../../../infrastructure/database/sequelize.js';

export class Task extends Model<
  InferAttributes<Task, { omit: 'createdAt' | 'updatedAt' }>,
  InferCreationAttributes<Task, { omit: 'createdAt' | 'updatedAt' }>
> {
  declare id: CreationOptional<number>;
  declare taskCode: string;
  declare projectId: number;
  declare title: string;
  declare statusCode: string;
  declare boardColumnKey: string;
  declare priority: string;
  declare dueDate: Date | null;
  declare rankKey: string;
  declare progressPercent: number;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Task.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    taskCode: { type: DataTypes.STRING(50), allowNull: false, unique: true, field: 'task_code' },
    projectId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, field: 'project_id' },
    title: { type: DataTypes.STRING(255), allowNull: false },
    statusCode: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'todo', field: 'status_code' },
    boardColumnKey: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'todo', field: 'board_column_key' },
    priority: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'medium' },
    dueDate: { type: DataTypes.DATE, allowNull: true, field: 'due_date' },
    rankKey: { type: DataTypes.STRING(40), allowNull: false, field: 'rank_key' },
    progressPercent: { type: DataTypes.DECIMAL(5, 2), allowNull: false, defaultValue: 0, field: 'progress_percent' }
  },
  {
    sequelize,
    tableName: 'tasks'
  }
);
