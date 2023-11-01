import { StorysModule } from '@core/module/storys.module';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { ThemePreviewComponent } from '@uiux/combs/other/theme-preview/theme-preview.component';
import { BannerWithBg } from '../components/banner/BannerSimple.stories';
import {
  Base as BaseCard,
  Avatar,
  BroderShadow,
} from '@stories/widgets/card/Card.stories';
import { StepFirst } from '@stories/widgets/card/Card1v5.stories';
import { Default as Card1v6 } from '@stories/widgets/card/Card1v6.stories';
import { Default as Card1v4 } from '@stories/widgets/card/Card1v4.stories';
import { Default as Card1v2 } from '@stories/widgets/card/Card1v2.stories';
import { Default as test } from '@stories/widgets/media/Testimonial.stories';
import { random } from 'lodash-es';
import { environment } from 'src/environments/environment';
export default {
  title: '主题/主题预览',
  id: 'theme-preview',
  component: ThemePreviewComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'theme-preview',
    top: [
      {
        ...BannerWithBg.args?.content,
        title: '主题颜色预览',
      },
    ],
    bgColors: {
      row: 10,
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
          ...Card1v2.args?.content,
        },
        {
          type: 'stepper',
          params: {
            mode: 'vertical',
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
  },
};

if (!environment.production) {
  console.log(Default.args.content);
}
