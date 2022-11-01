import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NodeModule } from '@uiux/combs/node/node.module';
import { StorysModule, sleep } from '@core/storys.module';
import { ReportComponent } from '@uiux/combs/node/report/report.component';

export default {
  title: '示例页面/内容类型/统计报告',
  id: 'report',
  component: ReportComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [],
      imports: [StorysModule.forRoot(), NodeModule],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `主要展示统计调查报告等数据内容`,
      },
    },
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
    header: {
      text: {
        spaver: 'none',
        title: {
          label: '南宁互联网职业求职渠道调查',
          style: 'style-v4',
          classes: 'mat-display-3 m-bottom-0',
        },
      },
      meta: [
        {
          label: '回收量',
          value: 622,
        },
        {
          label: '浏览量',
          value: 964,
        },
        {
          label: '回收率',
          value: '64%',
        },
      ],
    },
    form: [
      {
        key: 'max',
        className: 'm-bottom-sm',
        fieldGroupClassName: 'display-flex flex-wrap',
        fieldGroup: [
          {
            type: 'input',
            key: 'total',
            defaultValue: 300,
            className: 'm-right-sm',
            templateOptions: {
              label: '大额红包总金额',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 10,
              max: 10000,
              description: '最小10元，最大10000元',
            },
            validation: {
              messages: {
                min: '不能设置小于 10',
                max: '不能设置大于 10000',
              },
            },
          },
          {
            type: 'input',
            key: 'per',
            defaultValue: 10,
            templateOptions: {
              label: '大额红包平均每次可抽得',
              appearance: 'outline',
              type: 'number',
              required: true,
              min: 0.5,
              max: 100,
              description: '最小0.5元，最大100元',
            },
            validation: {
              messages: {
                min: '不能设置小于 0.5',
                max: '不能设置大于 100',
              },
            },
          },
        ],
      },
    ],
    box: [
      {
        type: 'dynamic-table',
        header: [
          {
            label: '礼品',
            key: 'name',
          },
          {
            label: '投票数',
            key: 'total',
          },
          {
            label: '占比',
            key: 'percent',
          },
        ],
        elements: [
          {
            name: '新鲜蔬菜',
            total: '152',
            percent: '24.4%',
          },
          {
            name: '当季水果',
            total: '123',
            percent: '19.8%',
          },
          {
            name: '豆制类品',
            total: '109',
            percent: '17.5%',
          },
          {
            name: '海鲜水产',
            total: '90',
            percent: '14.5%',
          },
          {
            name: '淡水水产',
            total: '90',
            percent: '5.8%',
          },
          {
            name: '鸡鸭鹅肉',
            total: '55',
            percent: '8.8%',
          },
          {
            name: '猪牛羊肉',
            total: '36',
            percent: '5.8%',
          },
          {
            name: '禽蛋',
            total: '25',
            percent: '4%',
          },
          {
            name: '脸盆水桶',
            total: '22',
            percent: '3.5%',
          },
          {
            name: '懒人拖把',
            total: '10',
            percent: '1.6%',
          },
        ],
      },
      {
        type: 'chart',
        title: {
          text: '柱状图',
        },
        tooltip: {
          trigger: 'axis',
        },
        dataset: [
          {
            dimensions: ['name', 'age', 'profession', 'score', 'date'],
            source: [
              ['Hannah Krause', 41, 'Engineer', 314, '2011-02-12'],
              ['Zhao Qian', 20, 'Teacher', 351, '2011-03-01'],
              ['Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
              ['Li Lei', 37, 'Teacher', 219, '2011-02-18'],
              ['Karle Neumann', 25, 'Engineer', 253, '2011-04-02'],
              ['Adrian Groß', 19, 'Teacher', '-', '2011-01-16'],
              ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
              ['Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
              ['Han Meimei', 67, 'Engineer', 366, '2011-03-12'],
            ],
          },
          {
            transform: {
              type: 'sort',
              config: { dimension: 'score', order: 'desc' },
            },
          },
        ],
        xAxis: {
          type: 'category',
          axisLabel: { interval: 0 },
        },
        yAxis: {},
        series: {
          type: 'bar',
          encode: { x: 'name', y: 'score' },
          datasetIndex: 1,
        },
      },
    ],
  },
};
