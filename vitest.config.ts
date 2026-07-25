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
    include: [
      'src/app/core/util/**/*.spec.ts',
      'src/app/core/service/comment.service.spec.ts',
      'src/app/core/service/node.service.comment-facade.spec.ts',
      'src/app/core/service/node.service.media.spec.ts',
      'src/app/core/state/BuilderState.spec.ts',
      'src/app/modules/builder/factory/getAnimate.spec.ts',
      'src/app/modules/builder/factory/getComponentSetting.spec.ts',
      'src/app/modules/builder/main/edit-branding/**/*.spec.ts',
      'src/app/modules/builder/main/page-setting/page-setting.component.fields.spec.ts',
      'src/app/modules/builder/main/page-setting/page-setting.component.payload.spec.ts',
      'src/app/uiux/combs/other/code-editor/code-editor.component.spec.ts',
      'src/app/uiux/combs/other/custom-template/custom-template.component.spec.ts',
      'src/app/uiux/combs/node/article/article.component.spec.ts',
      'src/app/uiux/widgets/builder/dynamic-component/dynamic-component.component.spec.ts',
      'src/server/**/*.spec.ts',
    ],
    setupFiles: ['src/test.ts'],
  },
});
