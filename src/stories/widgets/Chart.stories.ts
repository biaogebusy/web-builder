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
      text: '一天用电量分布图',
      subtext: '万科金域缇香',
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
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // prettier-ignore
      data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} W',
      },
      axisPointer: {
        snap: true,
      },
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        {
          lte: 6,
          color: 'green',
        },
        {
          gt: 6,
          lte: 8,
          color: 'red',
        },
        {
          gt: 8,
          lte: 14,
          color: 'green',
        },
        {
          gt: 14,
          lte: 17,
          color: 'red',
        },
        {
          gt: 17,
          color: 'green',
        },
      ],
    },
    series: [
      {
        name: 'Electricity',
        type: 'line',
        smooth: true,
        // prettier-ignore
        data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
        markArea: {
          itemStyle: {
            color: 'rgba(255, 173, 177, 0.4)',
          },
          data: [
            [
              {
                name: 'Morning Peak',
                xAxis: '07:30',
              },
              {
                xAxis: '10:00',
              },
            ],
            [
              {
                name: 'Evening Peak',
                xAxis: '17:30',
              },
              {
                xAxis: '21:15',
              },
            ],
          ],
        },
      },
    ],
  },
};

export const Bar = Template.bind({});

Bar.args = {
  chartOption: {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  },
};

export const Pie = Template.bind({});
Pie.args = {
  chartOption: {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
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
