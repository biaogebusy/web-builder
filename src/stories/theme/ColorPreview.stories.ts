import { StorysModule } from '@core/module/storys.module';
import {
  Meta,
  StoryObj,
  applicationConfig,
  moduleMetadata,
} from '@storybook/angular';
import { ThemePreviewComponent } from '@uiux/combs/other/theme-preview/theme-preview.component';
import { BannerWithBg } from '../components/banner/BannerSimple.stories';
import {
  Base as BaseCard,
  Avatar,
  BroderShadow,
} from '@stories/widgets/card/Card.stories';
import { StepFirst } from '@stories/widgets/card/Card1v5.stories';
import { Default as Card1v1 } from '@stories/widgets/card/Card1v1.stories';
import { Default as Card1v4 } from '@stories/widgets/card/Card1v4.stories';
import { Default as Card1v6 } from '@stories/widgets/card/Card1v6.stories';
import { Default as test } from '@stories/widgets/media/Testimonial.stories';
import { Primary as Box } from '@stories/base/Box.stories';
import { Default as MediaObject } from '@stories/widgets/media/MediaObject.stories';
import { random } from 'lodash-es';
import { environment } from 'src/environments/environment';
import { IThemePreview } from '@core/interface/combs/IThemePreview';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<ThemePreviewComponent> = {
  title: '主题/色彩检查',
  id: 'color-preview',
  component: ThemePreviewComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<ThemePreviewComponent>;
export const Default: Story = {};

const content: IThemePreview = {
  type: 'theme-preview',
  top: [
    {
      ...BannerWithBg.args?.content,
      title: '色彩检查',
      subTitle:
        '使用包含所有颜色变化的界面示例测试您的主题颜色，确保它们能够搭配协调并有清晰的视觉层次。',
      breadcrumb: null,
    },
  ],
  bgColors: {
    row: 1,
    lists: [
      {
        label: 'primary',
        classes: 'bg-primary',
      },
      {
        label: 'accent',
        classes: 'bg-accent',
      },
      {
        label: 'warn',
        classes: 'bg-warn',
      },
      {
        label: 'pink',
        classes: 'bg-pink',
      },
      {
        label: 'orange',
        classes: 'bg-orange',
      },
      {
        label: 'yellow',
        classes: 'bg-yellow',
      },
      {
        label: 'red',
        classes: 'bg-red',
      },
      {
        label: 'purple',
        classes: 'bg-purple',
      },
      {
        label: 'indigo',
        classes: 'bg-indigo',
      },
      {
        label: 'blue',
        classes: 'bg-blue',
      },
      {
        label: 'cyan',
        classes: 'bg-cyan',
      },
      {
        label: 'teal',
        classes: 'bg-teal',
      },
      {
        label: 'green',
        classes: 'bg-green',
      },
      {
        label: 'light-green',
        classes: 'bg-light-green',
      },
      {
        label: 'brown',
        classes: 'bg-brown',
      },
      {
        label: 'grey',
        classes: 'bg-grey',
      },
    ],
  },
  row: [
    {
      type: 'chart-box',
      label: '广告发布量',
      count: '5',
      params: {
        apiBak: '/api/v3/node/vote/report',
      },
      chart: {
        grid: {
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
        },
        xAxis: {
          show: false,
          type: 'category',
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        dataset: [
          {
            source: [
              ['name', '广告'],
              ['1月', random(10, 100)],
              ['2月', random(10, 100)],
              ['3月', random(10, 100)],
              ['4月', random(10, 100)],
              ['5月', random(10, 100)],
              ['6月', random(10, 100)],
              ['7月', random(10, 100)],
              ['8月', random(10, 100)],
              ['9月', random(10, 100)],
              ['10月', random(10, 100)],
              ['11月', random(10, 100)],
              ['12月', random(10, 100)],
            ],
          },
        ],
        series: [
          {
            type: 'line',
            symbol: 'none',
            areaStyle: {
              opacity: 0.1,
              color: '#1976d2',
            },
            lineStyle: {
              color: '#1976d2',
            },
            label: {
              position: 'top',
              show: true,
            },
            datasetIndex: 0,
          },
        ],
      },
    },
    {
      type: 'chart-box',
      label: '消费者增长',
      count: '1,156',
      params: {
        apiBak: '/api/v3/node/vote/report',
      },
      chart: {
        grid: {
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
        },
        xAxis: {
          show: false,
          type: 'category',
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        dataset: [
          {
            source: [
              ['name', '用户'],
              ['1月', random(10, 100)],
              ['2月', random(10, 100)],
              ['3月', random(10, 100)],
              ['4月', random(10, 100)],
              ['5月', random(10, 100)],
              ['6月', random(10, 100)],
              ['7月', random(10, 100)],
              ['8月', random(10, 100)],
              ['9月', random(10, 100)],
              ['10月', random(10, 100)],
              ['11月', random(10, 100)],
              ['12月', random(10, 100)],
            ],
          },
        ],
        series: [
          {
            type: 'line',
            symbol: 'none',
            areaStyle: {
              opacity: 0.1,
              color: '#512da8',
            },
            lineStyle: {
              color: '#512da8',
            },
            label: {
              position: 'top',
              show: true,
            },
            datasetIndex: 0,
          },
        ],
      },
    },
    {
      type: 'chart-box',
      label: '门店增长',
      count: '50%',
      params: {
        apiBak: '/api/v3/node/vote/report',
      },
      chart: {
        grid: {
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
        },
        xAxis: {
          show: false,
          type: 'category',
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        dataset: [
          {
            source: [
              ['name', '门店'],
              ['1月', random(1, 10)],
              ['2月', random(1, 10)],
              ['3月', random(1, 10)],
              ['4月', random(1, 10)],
              ['5月', random(1, 10)],
              ['6月', random(1, 10)],
              ['7月', random(1, 10)],
              ['8月', random(1, 10)],
              ['9月', random(1, 10)],
              ['10月', random(1, 10)],
              ['11月', random(1, 10)],
              ['12月', random(1, 10)],
            ],
          },
        ],
        series: [
          {
            type: 'line',
            symbol: 'none',
            areaStyle: {
              opacity: 0.1,
              color: '#f57f17',
            },
            lineStyle: {
              color: '#f57f17',
            },
            label: {
              position: 'top',
              show: true,
            },
            datasetIndex: 0,
          },
        ],
      },
    },
  ],
  columns: [
    [
      {
        ...BaseCard.args?.content,
      },
      {
        ...StepFirst.args?.content,
      },
      {
        ...Card1v6.args?.content,
      },
      {
        type: 'chart',
        title: {
          text: '年度活动金额预算',
          subtext: '南宁',
        },
        legend: {
          bottom: '10px',
        },
        tooltip: {
          trigger: 'axis',
        },
        dataset: {
          source: [
            ['红包预算', '2020', '2021', '2022'],
            ['第一季度', 4875, 4670, 7742],
            ['第二季度', 7746, 5029, 9867],
            ['第三季度', 5997, 5979, 3590],
          ],
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {},
        series: [
          {
            type: 'line',
          },
          {
            type: 'line',
          },
          {
            type: 'line',
          },
        ],
      },
    ],
    [
      {
        ...Avatar.args?.content,
      },
      {
        ...Card1v1.args?.content,
      },
      {
        ...Box.args?.content,
      },
      {
        ...MediaObject.args?.content,
      },
      {
        type: 'stepper',
        params: {
          mode: 'horizontal',
          linear: true,
        },
        steps: [
          {
            label: '指派中',
            color: 'primary',
          },
          {
            label: '接受',
            color: 'accent',
            completed: true,
          },
          {
            label: '停止',
            completed: true,
            color: 'warn',
          },
          {
            label: '已完成',
          },
        ],
      },
    ],
    [
      {
        ...BroderShadow.args?.content,
      },
      {
        ...Card1v4.args?.content,
      },
      {
        ...test.args?.content,
      },
    ],
  ],
  bottom: [
    {
      type: 'text',
      spacer: 'md',
      title: {
        label:
          '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建响应式页面',
        style: 'style-v1',
        classes: 'mat-display-3 bold',
      },
      body: '<p class="ql-align-center">信使UI是基于 Material 的 Angular 前端框架， 丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。</p>',
      classes: 'text-center',
      actionsAlign: 'center center',
      actions: [
        {
          type: 'btn',
          href: '/node/1',
          target: '_blank',
          label: '了解更多',
          mode: 'raised',
          color: 'primary',
        },
      ],
    },
  ],
};

Default.args = {
  content: {
    ...content,
  },
};

if (!environment.production) {
  console.log('Color Test:', {
    title: '色彩检查',
    body: [Default.args.content],
  });
}
