/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.ts'],
    // Run tests sequentially to avoid port / env collisions when
    // multiple tests spin up Express apps.
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/modules/**/*.ts', 'src/shared/**/*.ts'],
      exclude: ['**/*.test.*', '**/*.spec.*']
    }
  }
});
