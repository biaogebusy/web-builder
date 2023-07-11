import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { SwiperModule } from 'swiper/angular';
import { StorysModule } from '@core/module/storys.module';
import { LotteryComponent } from '@uiux/combs/calculator/lottery/lottery.component';
import { ILottery } from '@core/interface/combs/ICalculator';

export default {
  title: '特色组件/计算器',
  id: 'lottery',
  component: LotteryComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [SwiperModule, StorysModule.forRoot()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const content: ILottery = {
  type: 'lottery',
  text: {
    spacer: 'md',
    title: {
      label: '红包抽奖预算计算器',
      style: 'style-v1',
    },
    classes: 'text-center',
    body: '输入指标，自动计算出预算，指导市场营销计划。',
  },
  bg: {
    classes: '',
  },
  classes: '',
  form: [
    {
      key: 'max',
      className: 'm-bottom-sm',
      fieldGroupClassName: 'display-flex flex-wrap',
      fieldGroup: [
        {
          type: 'input',
          key: 'total_money',
          defaultValue: 300,
          className: 'm-right-sm',
          templateOptions: {
            label: '大额红包总预算',
            appearance: 'outline',
            type: 'number',
            required: true,
            min: 1,
            max: 10000,
            description: '最小1元，最大10000元',
          },
          validation: {
            messages: {
              min: '不能设置小于 1',
              max: '不能设置大于 10000',
            },
          },
        },
        {
          type: 'input',
          key: 'total_number',
          defaultValue: 10,
          templateOptions: {
            label: '大额红包总个数',
            appearance: 'outline',
            type: 'number',
            required: true,
            min: 1,
            max: 500,
            description: '最小1元，最大500元',
          },
          validation: {
            messages: {
              min: '不能设置小于 1',
              max: '不能设置大于 500',
            },
          },
        },
      ],
    },
    {
      key: 'min',
      className: 'm-bottom-sm m-top-sm',
      fieldGroupClassName: 'display-flex flex-wrap',
      fieldGroup: [
        {
          type: 'input',
          key: 'total_money',
          defaultValue: 500,
          className: 'm-right-sm',
          templateOptions: {
            label: '小额红包总预算',
            appearance: 'outline',
            type: 'number',
            required: true,
            min: 1,
            max: 10000,
            description: '最小1元，最大10000元',
          },
          validation: {
            messages: {
              min: '不能设置小于 1',
              max: '不能设置大于 10000',
            },
          },
        },
        {
          type: 'input',
          key: 'total_number',
          defaultValue: 1,
          templateOptions: {
            label: '小额红包总个数',
            appearance: 'outline',
            type: 'number',
            required: true,
            min: 1,
            max: 500,
            description: '最小1次，最大500次',
          },
          validation: {
            messages: {
              min: '不能设置小于 1',
              max: '不能设置大于 500',
            },
          },
        },
        {
          type: 'input',
          key: 'per_max',
          defaultValue: 0.8,
          className: 'm-right-sm',
          templateOptions: {
            label: '小额红包单次最大额',
            appearance: 'outline',
            type: 'number',
            required: true,
            min: 0.3,
            max: 2,
            description: '最小0.3元，最大2元',
          },
          validation: {
            messages: {
              min: '不能设置小于 0.3',
              max: '不能设置大于 2',
            },
          },
        },
        {
          type: 'input',
          key: 'per_max',
          defaultValue: 0.3,
          templateOptions: {
            label: '小额红包单次最小额',
            appearance: 'outline',
            type: 'number',
            required: true,
            min: 0.3,
            max: 1,
            description: '最小0.3元，最大1元',
          },
          validation: {
            messages: {
              min: '不能设置小于 0.3',
              max: '不能设置大于 1',
            },
          },
        },
      ],
    },
    {
      key: 'isPromote',
      type: 'toggle',
      className: 'width-100 m-bottom',
      templateOptions: {
        label: '开启推广提成',
        description: '超过推广次数则推广结束',
      },
    },
    {
      key: 'promote',
      fieldGroupClassName: 'display-flex flex-wrap',
      fieldGroup: [
        {
          type: 'select',
          key: 'type',
          defaultValue: 'fixed',
          className: 'm-bottom-sm m-right-sm',
          templateOptions: {
            label: '选择提成方式',
            description: '固定金额或者按比例',
            options: [
              {
                label: '固定金额',
                value: 'fixed',
              },
              {
                label: '比例',
                value: 'percent',
              },
            ],
          },
        },
        {
          type: 'input',
          key: 'fixed',
          defaultValue: 2,
          className: 'm-bottom-sm',
          templateOptions: {
            label: '每次推广可得金额/元',
            appearance: 'outline',
            type: 'number',
            required: true,
            min: 0.3,
            max: 100,
            description: '推广员推广一次固定的提成金额',
          },
          validation: {
            messages: {
              min: '不能设置小于 0.3',
              max: '不能设置大于 100',
            },
          },
          hideExpression: 'model.type=="percent"',
        },
        {
          type: 'input',
          key: 'percent',
          defaultValue: 80,
          templateOptions: {
            label: '每次推广可得比例%',
            appearance: 'outline',
            type: 'number',
            required: true,
            min: 1,
            max: 500,
            description: '最小 1% 到 最大500%',
          },
          hideExpression: 'model.type=="fixed"',
        },
      ],
    },
  ],
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
  chart: {
    color: ['#0071a2', '#00A281', '#8200a2'],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '0',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '预算占比',
        type: 'pie',
        radius: '50%',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  },
  description:
    '<ul class="list-done"><li>总金额 = 红包总金额（大额+小额）+ 推广金额</li></ul>',
};
Default.args = {
  content,
};
