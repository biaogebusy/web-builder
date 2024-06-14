import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  logLevel: 'debug',
  staticDirs: [
    { from: '../src/assets', to: '/assets' },
    {
      from: '../node_modules/@mdi/angular-material/mdi.svg',
      to: '/assets/mdi.svg',
    },
  ],
};
export default config;
