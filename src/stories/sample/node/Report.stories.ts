import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NodeModule } from '@uiux/combs/node/node.module';
import { StorysModule, sleep } from '@core/storys.module';
import { ReportComponent } from '@uiux/combs/node/report/report.component';
import { FormGroup } from '@angular/forms';

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
  form: new FormGroup({}),
  model: {},
  content: {
    header: {
      text: {
        spaver: 'none',
        title: {
          label: '十一月份我的福利投票统计',
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
        key: 'filter',
        className: '',
        fieldGroupClassName: 'display-flex flex-wrap',
        fieldGroup: [
          {
            type: 'select',
            key: 'position',
            defaultValue: 5,
            className: 'display-block m-bottom-sm m-right-sm',
            templateOptions: {
              label: '位置距离',
              description: '请选择位置距离',
              options: [
                {
                  label: '0.5公里',
                  value: 0.5,
                },
                {
                  label: '1公里',
                  value: 1,
                },
                {
                  label: '2公里',
                  value: 2,
                },
                {
                  label: '3公里',
                  value: 3,
                },
                {
                  label: '4公里',
                  value: 4,
                },
                {
                  label: '5公里',
                  value: 5,
                },
                {
                  label: '10公里',
                  value: 10,
                },
                {
                  label: '20公里',
                  value: 20,
                },
                {
                  label: '50公里',
                  value: 50,
                },
                {
                  label: '100公里',
                  value: 100,
                },
              ],
            },
          },
          {
            type: 'select',
            key: 'shop',
            defaultValue: 5,
            className: 'display-block m-bottom-sm m-right-sm',
            templateOptions: {
              label: '指定门店',
              description: '请选择门店',
              options: [
                {
                  label: '南宁市西乡塘区爱特买百货超市',
                  value: 26,
                },
                {
                  label: '钦州协盛百货有限公司',
                  value: 6,
                },
              ],
            },
          },
          {
            type: 'date-range',
            key: 'date',
            templateOptions: {
              label: '日期范围',
              value: '',
              placeholder: '选择发布日期',
            },
            fieldGroup: [
              {
                type: 'input',
                key: 'start',
                placeholder: '开始',
              },
              {
                type: 'input',
                key: 'end',
                placeholder: '结束',
              },
            ],
          },
        ],
      },
    ],
    row: 2,
    box: [
      {
        data: {
          toggle: [
            {
              label: '饼图',
              icon: {
                name: 'pie_chart',
                inline: true,
              },
              value: 'pie',
            },
            {
              label: '柱状图',
              icon: {
                name: 'equalizer',
                inline: true,
              },
              value: 'bar',
            },
            {
              label: '折线图',
              icon: {
                name: 'show_chart',
                inline: true,
              },
              value: 'line',
            },
          ],
        },
        content: {
          type: 'chart',
          tooltip: {
            trigger: 'axis',
          },
          dataset: [
            {
              source: [
                ['name', 'total'],
                ['当季水果', 123],
                ['猪牛羊肉', 35],
                ['鸡鸭鹅肉', 55],
                ['新鲜蔬菜', 152],
                ['海鲜水产', 90],
                ['豆制类品', 109],
                ['懒人拖把', 10],
                ['禽蛋', 25],
                ['脸盆水桶', 22],
                ['淡水水产', 75],
                ['花卉绿植', 12],
                ['日用百货', 66],
                ['个护清洁', 10],
                ['冷冻冷藏', 9],
                ['粮油调味', 98],
                ['休闲零食', 36],
                ['酒水乳饮', 59],
                ['肉蛋水产', 18],
                ['时令水果', 59],
                ['生鲜商品', 78],
              ],
            },
            {
              transform: {
                type: 'sort',
                config: { dimension: 'total', order: 'asc' },
              },
            },
          ],
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 30,
            },
          },
          yAxis: {},
          series: [
            {
              type: 'bar',
              label: {
                position: 'top',
                show: true,
              },
              datasetIndex: 1,
            },
          ],
        },
      },
      {
        content: {
          type: 'dynamic-table',
          header: [
            {
              label: '想要礼品',
              key: 'name',
            },
            {
              label: '想要人数',
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
            {
              name: '花卉绿植',
              total: '12',
              percent: '1.9%',
            },
            {
              name: '日用百货',
              total: '66',
              percent: '10.6%',
            },
            {
              name: '冷冻冷藏',
              total: '10',
              percent: '1.4%',
            },
            {
              name: '粮油调味',
              total: '99',
              percent: '15%',
            },
            {
              name: '休闲零食',
              total: '36',
              percent: '5.7%',
            },
            {
              name: '酒水乳饮',
              total: '59',
              percent: '9.4%',
            },
            {
              name: '肉蛋水产',
              total: '18',
              percent: '2.8%',
            },
            {
              name: '时令水果',
              total: '59',
              percent: '9.4%',
            },
            {
              name: '生鲜商品',
              total: '78',
              percent: '12.5%',
            },
          ],
        },
      },
    ],
  },
};
