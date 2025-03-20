import type { Preview } from '@storybook/angular';
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          '介绍',
          '更新日志',
          '开发',
          [
            '本地环境',
            '页面渲染流程',
            '开发组件',
            '新建主题',
            '组件主题',
            'Drupal 配置',
            'Nginx 配置',
            '*',
            'JSONAPI',
          ],
          '部署',
          ['架构图', '部署流程', 'Drupal 部署', 'builder 前台部署', 'Nginx 配置'],
          '低代码',
          '主题',
          '全局配置',
          '基本元素',
          'Drupal',
          '*',
          '编程指南',
        ],
      },
    },
  },

  tags: ['autodocs'],
};

export default preview;
