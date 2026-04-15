import { Sequelize } from 'sequelize';
import { env } from '../../config/env.js';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  logging: env.DB_LOGGING ? console.log : false,
  define: {
    underscored: true,
    freezeTableName: true,
    paranoid: false,
    timestamps: true
  }
});
