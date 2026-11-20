import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

const fromRoot = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@assets': fromRoot('./src/assets'),
      '@core': fromRoot('./src/app/core'),
      '@modules': fromRoot('./src/app/modules'),
      '@share': fromRoot('./src/app/share'),
      '@stories': fromRoot('./src/stories'),
      '@uiux': fromRoot('./src/app/uiux'),
      'src': fromRoot('./src'),
    },
  },
  test: {
    environment: 'node',
    // Bound concurrent server fixtures while retaining per-file isolation.
    pool: 'forks',
    maxWorkers: 2,
    globals: true,
    // Angular tests use the separate @angular/build:unit-test target.
    include: ['src/server/**/*.spec.ts'],
  },
});
