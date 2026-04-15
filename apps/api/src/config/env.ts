import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const rootEnvPath = path.resolve(currentDir, '../../../../.env');
const localEnvPath = path.resolve(process.cwd(), '.env');

dotenv.config({ path: rootEnvPath });
if (localEnvPath !== rootEnvPath) {
  dotenv.config({ path: localEnvPath, override: false });
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  APP_NAME: z.string().default('TaskForge Enterprise API'),
  WEB_ORIGIN: z.string().default('http://localhost:5173'),
  DB_HOST: z.string().default('127.0.0.1'),
  DB_PORT: z.coerce.number().default(3306),
  DB_NAME: z.string().default('taskforge'),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default('root'),
  DB_LOGGING: z.coerce.boolean().default(false),
  REDIS_URL: z.string().default('redis://127.0.0.1:6379'),
  JWT_SECRET: z.string().min(8),
  JWT_EXPIRES_IN: z.string().default('1d'),
  SESSION_SECRET: z.string().min(8),
  AWS_REGION: z.string().default('ap-southeast-1'),
  AWS_S3_BUCKET: z.string().default('taskforge-assets'),
  AWS_ACCESS_KEY_ID: z.string().default('replace-me'),
  AWS_SECRET_ACCESS_KEY: z.string().default('replace-me'),
  AWS_S3_MAX_FILE_SIZE: z.coerce.number().default(5 * 1024 * 1024),
  ALLOW_DEGRADED_START: z.coerce.boolean().default(false),
  AI_PROVIDER: z.string().default('openai'),
  AI_API_KEY: z.string().min(8),
  AI_MODEL: z.string().default('gpt-5.4-mini')
});

export const env = envSchema.parse(process.env);
