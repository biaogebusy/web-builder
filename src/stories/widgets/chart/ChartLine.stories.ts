import { StorysModule } from '@core/storys.module';
import {
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  Story,
} from '@storybook/angular';
import { ChartComponent } from '@uiux/widgets/chart/chart.component';

export default {
  title: '基础组件/图表/折线图',
  id: 'chart-line',
  component: ChartComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `数据可视化的一个常见思路是：<br>（I）提供数据；<br>（II）指定数据到视觉的映射。<br>简而言之，可以进行这些映射的设定：指定 数据集 的列（column）还是行（row）映射为 系列（series）。<br>这件事可以使用 series.seriesLayoutBy 属性来配置。默认是按照列（column）来映射。<br>指定维度映射的规则：如何从 dataset 的维度（一个“维度”的意思是一行/列）映射到坐标轴（如 X、Y 轴）、提示框（tooltip）、标签（label）、图形元素大小颜色等（visualMap）。<br>这件事可以使用 series.encode 属性，以及 visualMap 组件来配置（如果有需要映射颜色大小等视觉维度的话）。`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Line = Template.bind({});

Line.args = {
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
LineTime.storyName = '折线图';
LineTime.args = {
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
    legend: {
      bottom: '10px',
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

export const MutipleLineTime = Template.bind({});
MutipleLineTime.storyName = '多条折线图';
MutipleLineTime.args = {
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
    legend: {
      bottom: '10px',
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {},
      },
    },
    dataset: {
      source: [
        ['时间', '中奖个数', '浏览量'],
        ['00:00', 0, 12],
        ['01:00', 2, 22],
        ['02:00', 3, 23],
        ['03:00', 5, 25],
        ['04:00', 6, 26],
        ['05:00', 8, 28],
        ['06:00', 10, 40],
        ['07:00', 11, 41],
        ['08:00', 15, 45],
        ['09:00', 20, 60],
        ['10:00', 30, 80],
        ['11:00', 50, 120],
        ['12:00', 60, 140],
        ['13:00', 66, 146],
        ['14:00', 100, 400],
        ['15:00', 120, 420],
        ['16:00', 155, 455],
        ['17:00', 226, 626],
        ['18:00', 300, 800],
        ['19:00', 330, 830],
        ['20:00', 412, 1012],
        ['21:00', 500, 1200],
        ['22:00', 516, 1210],
        ['23:00', 530, 1230],
      ],
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    series: [
      {
        type: 'line',
        label: {
          position: 'top',
          show: true,
        },
      },
      {
        type: 'line',
        label: {
          position: 'top',
          show: true,
        },
      },
    ],
  },
};
