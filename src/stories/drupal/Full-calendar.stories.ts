import { moduleMetadata, Meta, StoryObj, applicationConfig } from '@storybook/angular';

import { FullCalendarComponent } from '@uiux/combs/calendar/full-calendar/full-calendar.component';
import { StorysModule } from '@core/module/storys.module';
import * as calendarStory from '../widgets/Calendar.stories';
import { importProvidersFrom } from '@angular/core';
const calendar: any = calendarStory.Default.args;
const meta: Meta<FullCalendarComponent> = {
  title: 'Drupal/日历',
  id: 'full-calendar',
  component: FullCalendarComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
  ],
  parameters: {
    docs: {
      description: {
        component: `把数据映射到日历上，根据搜索条件显示日历内容。`,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<FullCalendarComponent>;
export const Default: Story = {};

Default.args = {
  content: {
    type: 'full-calendar',
    spacer: 'xxl',
    text: {
      title: {
        label: '筛选',
        style: 'style-v4',
        classes: 'm-bottom-xs',
      },
      spacer: 'sm',
    },
    form: [
      {
        fieldGroupClassName: 'flex flex-col',
        fieldGroup: [
          {
            key: 'keys',
            type: 'input',
            props: {
              label: '关键词',
            },
          },
          {
            type: 'select',
            key: 'type',
            props: {
              mutiple: false,
              label: '内容来源',
              options: [
                {
                  label: '文章',
                  value: 'article',
                },
                {
                  label: '博客',
                  value: 'blog',
                },
                {
                  label: '会议',
                  value: 'metting',
                },
              ],
            },
          },
          {
            type: 'select',
            key: 'changed',
            props: {
              mutiple: false,
              label: '最新更新',
              options: [
                {
                  label: '文章',
                  value: 'article',
                },
                {
                  label: '博客',
                  value: 'blog',
                },
                {
                  label: '会议',
                  value: 'metting',
                },
              ],
            },
          },
          {
            type: 'datepicker',
            key: 'date',
            props: {
              label: '日期',
              hint: 'MM/DD/YYYY',
              placeholder: '请选择日期',
              value: '',
            },
          },
        ],
      },
    ],
    calendar: {
      drawer: true,
      api: '/api/v1/content',
      options: {
        events: [
          {
            title: '使用 DEVTOOLS 对 ANGULAR 前端应用性能分析优化',
            event: 'meeting',
            start: '2024-05-31T15:19:11.195Z',
            user: 'Johnson',
            className: 'bg-primary',
          },
          {
            title: '使用 TAKEUNTIL 操作符管理 ANGULAR 组件的订阅',
            event: 'drupal',
            start: 1717341551195,
            user: 'Johnson',
            className: 'bg-accent',
          },
          {
            title: '你应该了解的 ANGULAR 最佳实践',
            event: 'drupal',
            start: 1718032751195,
            user: 'Johnson',
            className: 'bg-warn',
          },
          {
            title: 'ANGULAR 5 RXJS 5.5.2 多个 HTTP 并行 FORKJOIN 请求',
            event: 'drupal',
            start: 1717600751195,
            user: 'Johnson',
            className: 'bg-warn',
          },
          {
            title: 'DRUPAL 8 AJAX 弹出框可监听利用的 EVENT 事件',
            event: 'drupal',
            start: 1717773551195,
            user: 'Johnson',
            className: 'bg-pink',
          },
          {
            title: 'DRUPAL8 用户登录后自定义重定向',
            event: 'drupal',
            start: 1717946351195,
            user: 'Johnson',
            className: 'bg-orange',
          },
          {
            title: '如何更改 GIT COMMIT 某个历史提交信息',
            event: 'drupal',
            start: 1717600751195,
            user: 'Johnson',
            className: 'bg-yellow',
          },
          {
            title: '开源项目使用 GITHUB ACTIONS 自动化测试部署 ANGULAR 应用到 ECS 服务器',
            event: 'drupal',
            start: 1717514351195,
            user: 'Johnson',
            className: 'bg-red',
          },
          {
            title: 'DRUPAL JSONAPI 初级入门实践',
            event: 'drupal',
            start: 1717427951195,
            user: 'Johnson',
            className: 'bg-purple',
          },
          {
            title: 'RXJS SWITCHMAP 在 DRUPAL API中的应用',
            event: 'drupal',
            start: 1717859951195,
            user: 'Johnson',
            className: 'bg-indigo',
          },
          {
            title: '五年了，再谈南宁和深圳的差距',
            event: 'drupal',
            start: 1717773551195,
            user: 'Johnson',
            className: 'bg-blue',
          },
          {
            title: '没想到吧？2021年南宁IT互联网相关工作者最近一份工作求职渠道最受欢迎的竟然是它',
            event: 'drupal',
            start: 1716823151195,
            user: 'Johnson',
            className: 'bg-cyan',
          },
          {
            title: '南宁IT互联网行业薪资福利待遇如何？',
            event: 'drupal',
            start: 1716909551195,
            user: 'Johnson',
            className: 'bg-teal',
          },
          {
            title: '南宁IT互联网公司，有哪些是双休？',
            event: 'drupal',
            start: 1716995951195,
            user: 'Johnson',
            className: 'bg-green',
          },
          {
            title: 'JSONA 一款转换 JSONAPI 数据的工具库，也算是解放 DRUPAL JSONAPI 反序列化的利器',
            event: 'drupal',
            start: 1716304751195,
            user: 'Johnson',
            className: 'bg-light-green',
          },
          {
            title: 'ANGULAR 有哪几种不同类型的绑定',
            event: 'drupal',
            start: 1716909551195,
            user: 'Johnson',
            className: 'bg-brown',
          },
          {
            title: 'ANGULAR NG-CONTENT、NG-TEMPLATE、NG-CONTAINER 之间的区别',
            event: 'drupal',
            start: 1716736751195,
            user: 'Johnson',
            className: 'bg-grey',
          },
        ],
      },
      theme: {
        meeting: 'bg-warn',
        case: 'bg-primary',
        project: 'bg-accent',
        event: 'bg-red',
      },
    },
  },
};
