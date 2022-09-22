import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  Story,
} from '@storybook/angular';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { ChartComponent } from '@uiux/widgets/chart/chart.component';

export default {
  title: 'Widgets/Chart',
  component: ChartComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ShareModule, WidgetsModule],
      providers: [SafeHtmlPipe],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<ChartComponent> = (args) => ({
  component: ChartComponent,
  props: {
    ...args,
  },
});
export const Line = Template.bind({});

Line.args = {
  chartOption: {
    title: {
      text: '年度活动金额预算',
      subtext: '南宁',
    },
    tooltip: {
      trigger: 'axis',
    },
    dataset: {
      // 提供一份数据
      source: [
        ['红包预算', '2020', '2021', '2022'],
        ['大额红包', 3600, 4000, 4551],
        ['小额红包', 6000, 7000, 8450],
        ['推广费用', 2400, 4000, 6000],
      ],
    },
    // 声明x轴，类目轴（category），默认情况下类目轴对应到 dataset 第一列
    xAxis: {
      type: 'category',
    },
    // 声明一个 y 轴，数值轴
    yAxis: {},
    // 声明对应的数据使用系列，默认情况下每个系列自动对应到 dataset 的每一列
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
};

export const LineTime = Template.bind({});
LineTime.args = {
  chartOption: {
    title: {
      text: '超市宣传上新红包抽奖趋势图',
      subtext: '万科金域缇香店',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {},
      },
    },
    dataset: {
      source: [
        ['时间', '中奖个数'],
        ['00:00', 0],
        ['01:00', 2],
        ['02:00', 3],
        ['03:00', 5],
        ['04:00', 6],
        ['05:00', 8],
        ['06:00', 10],
        ['07:00', 11],
        ['08:00', 15],
        ['09:00', 20],
        ['10:00', 30],
        ['11:00', 50],
        ['12:00', 60],
        ['13:00', 66],
        ['14:00', 100],
        ['15:00', 120],
        ['16:00', 155],
        ['17:00', 226],
        ['18:00', 300],
        ['19:00', 330],
        ['20:00', 412],
        ['21:00', 500],
        ['22:00', 516],
        ['23:00', 530],
      ],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 个',
      },
      axisPointer: {
        snap: true,
      },
    },
    series: [
      {
        name: '红包个数',
        type: 'line',
        smooth: true,
      },
    ],
  },
};

export const Bar = Template.bind({});

Bar.args = {
  chartOption: {
    title: {
      text: '年度活动金额预算',
      subtext: '南宁',
    },
    tooltip: {
      trigger: 'axis',
    },
    dataset: {
      // 提供一份数据。
      source: [
        ['红包预算', '2020', '2021', '2022'],
        ['大额红包', 3600, 4000, 4551],
        ['小额红包', 6000, 7000, 8450],
        ['推广费用', 2400, 4000, 6000],
      ],
    },
    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
    xAxis: { type: 'category' },
    // 声明一个 Y 轴，数值轴。
    yAxis: {},
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
  },
};

export const Pie = Template.bind({});
Pie.args = {
  chartOption: {
    title: {
      text: '金额预算占比',
      subtext: '2022年9月',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    dataset: {
      source: [
        ['预算', '费用'],
        ['大额红包总金额', 300],
        ['小额红包总金额', 500],
        ['提成总额', 200],
      ],
    },
    series: [
      {
        name: 'Access From',
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
};

export const Radar = Template.bind({});
Radar.args = {
  chartOption: {
    title: {
      text: 'Basic Radar Chart',
    },
    legend: {
      data: ['Allocated Budget', 'Actual Spending'],
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: 'Actual Spending',
          },
        ],
      },
    ],
  },
};
