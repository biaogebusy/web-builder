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
      src: fromRoot('./src'),
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
    // 仅承担 node 环境的服务端 spec;src/app/** 全部由 `npm test`(@angular/build:unit-test)覆盖
    include: ['src/server/**/*.spec.ts'],
    setupFiles: ['src/test.ts'],
  },
});
