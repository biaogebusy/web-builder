import angular from '@analogjs/vite-plugin-angular';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

const fromRoot = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: {
      '@assets': fromRoot('./src/assets'),
      '@core': fromRoot('./src/app/core'),
      '@modules': fromRoot('./src/app/modules'),
      '@share': fromRoot('./src/app/share'),
      '@stories': fromRoot('./src/stories'),
      '@uiux': fromRoot('./src/app/uiux'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [fromRoot('./src/theme')],
      },
    },
  },
  test: {
    css: true,
    environment: 'jsdom',
    globals: true,
    include: ['src/app/core/util/**/*.spec.ts'],
    setupFiles: ['src/test.ts'],
  },
});
