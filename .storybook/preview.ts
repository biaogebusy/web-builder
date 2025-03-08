import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

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
          ['通用', '页头', '页脚'],
          '示例页面',
          ['首页示例', '内容类型', '资料简介', '中台管理', '系统页面'],
          '特色组件',
          ['首屏', '图文 Showcase'],
          '复合组件',
          '基本元素',
          '基础组件',
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
