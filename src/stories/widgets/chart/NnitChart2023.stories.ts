import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  Story,
} from '@storybook/angular';
import { ChartComponent } from '@uiux/widgets/chart/chart.component';

const meta: Meta<MyComponent> = {
  title: '基础组件/图表/2023问卷',
  id: 'nnit-chart-2023',
  component: ChartComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="relative p-x p-y" style="z-index:1">${story}</div>`,
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `[2022年度南宁IT派互联网IT行业薪资生存情况调查](https://mp.weixin.qq.com/s/N4iFb0GBLkGwJyznRlIX4g)`,
      },
    },
  },
};

export default meta;

export const ITChart01 = Template.bind({});
ITChart01.storyName = '男女比例';
ITChart01.args = {
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
    title: [
      {
        text: '男女占比',
        left: 'center',
      },
      {
        text: '2021年',
        left: '20%',
        top: '85%',
        textAlign: 'center',
      },
      {
        text: '2022年',
        left: '50%',
        top: '85%',
        textAlign: 'center',
      },
      {
        text: '2023年',
        left: '80%',
        top: '85%',
        textAlign: 'center',
      },
    ],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    dataset: [
      {
        source: [
          ['性别', '人数', '年份'],
          ['女生', 28, 2023],
          ['女生', 16, 2022],
          ['女生', 19, 2021],
          ['男生', 174, 2023],
          ['男生', 119, 2022],
          ['男生', 97, 2021],
        ],
      },
      {
        transform: {
          type: 'filter',
          config: { dimension: '年份', value: 2021 },
        },
      },
      {
        transform: {
          type: 'filter',
          config: { dimension: '年份', value: 2022 },
        },
      },
      {
        transform: {
          type: 'filter',
          config: { dimension: '年份', value: 2023 },
        },
      },
    ],
    series: [
      {
        name: '2021',
        type: 'pie',
        radius: '50%',
        center: ['20%', '50%'],
        label: {
          formatter: '{b}: {d}%',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        datasetIndex: 1,
      },
      {
        name: '2022',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        label: {
          formatter: '{b}: {d}%',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        datasetIndex: 2,
      },
      {
        name: '2023',
        type: 'pie',
        radius: '50%',
        center: ['80%', '50%'],
        label: {
          formatter: '{b}: {d}%',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        datasetIndex: 3,
      },
    ],
  },
};

export const ITChart02 = Template.bind({});
ITChart02.storyName = '年龄分布';
ITChart02.args = {
  content: {
    type: 'chart',
    title: [
      {
        text: '年龄分布',
        left: 'center',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 人',
      },
      axisPointer: {
        snap: true,
      },
    },
    dataset: [
      {
        source: [
          ['年龄', '人数', '年份'],
          ['22岁以下', 5, 2023],
          ['22岁~24岁', 33, 2023],
          ['25岁~29岁', 82, 2023],
          ['30岁~34岁', 61, 2023],
          ['35岁~39岁', 16, 2023],
          ['40及以上', 5, 2023],
        ],
      },
    ],
    series: [
      {
        name: '2023',
        type: 'bar',
        label: {
          formatter: '{b}: {d}%',
        },
        emphasis: {
          focus: 'self',
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

export const ITChart03 = Template.bind({});
ITChart03.storyName = '办公所在地';
ITChart03.args = {
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
    title: [
      {
        text: '办公所在地',
        left: 'center',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 人',
      },
      axisPointer: {
        snap: true,
      },
    },
    dataset: [
      {
        source: [
          ['办公所在地', '人数'],
          ['青秀区', 83],
          ['兴宁区', 4],
          ['江南区', 18],
          ['良庆区', 41],
          ['邕宁区', 4],
          ['西乡塘区', 20],
          ['武鸣区', 0],
          ['区外', 22],
          ['远程办公', 10],
        ],
      },
    ],
    series: [
      {
        name: '2023',
        type: 'line',
        label: {
          formatter: '{b}: {d}%',
        },
        emphasis: {
          focus: 'self',
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

export const ITChart04 = Template.bind({});
ITChart04.storyName = '当前职位';
ITChart04.args = {
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
    title: [
      {
        text: '当前职位',
        left: 'center',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 人',
      },
      axisPointer: {
        snap: true,
      },
    },
    dataset: [
      {
        source: [
          ['职位', '人数'],
          ['产品', 12],
          ['设计', 5],
          ['前端开发', 31],
          ['后端开发', 82],
          ['运营', 7],
          ['市场', 6],
          ['人力行政', 2],
          ['自由职业', 3],
          ['已失业', 6],
          ['应届待业', 3],
          ['其他', 45],
        ],
      },
    ],
    series: [
      {
        name: '2023',
        type: 'bar',
        label: {
          position: 'top',
          show: true,
        },
      },
    ],
  },
};

export const ITChart05 = Template.bind({});
ITChart05.storyName = '月薪收入';
ITChart05.args = {
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
    title: [
      {
        text: '月薪收入',
        left: 'center',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 人',
      },
      axisPointer: {
        snap: true,
      },
    },
    dataset: [
      {
        source: [
          ['月薪收入', '月薪'],
          ['4000元以下', 18],
          ['4000元~6000元', 28],
          ['6000元~8000元', 42],
          ['8000元~1万', 44],
          ['1万~1.2万', 14],
          ['1.2万~1.5万', 26],
          ['1.5万~2万', 12],
          ['2万以上', 18],
        ],
      },
    ],
    series: [
      {
        name: '2023',
        type: 'bar',
        smooth: true,
        emphasis: { focus: 'series' },
        label: {
          position: 'top',
          show: true,
        },
      },
    ],
  },
};

export const ITChart06 = Template.bind({});
ITChart06.storyName = '周末双休';
ITChart06.args = {
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
    title: [
      {
        text: '周末双休',
        left: 'center',
      },
    ],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    dataset: [
      {
        source: [
          ['周末双休', '人数'],
          ['是', 168],
          ['否', 34],
        ],
      },
    ],
    series: [
      {
        name: '2023',
        type: 'pie',
        radius: '50%',
        label: {
          formatter: '{b}: {d}%',
        },
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

export const ITChart07 = Template.bind({});
ITChart07.storyName = '是否加班';
ITChart07.args = {
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
    title: [
      {
        text: '是否加班',
        left: 'center',
      },
    ],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    dataset: [
      {
        source: [
          ['是否加班', '人数'],
          ['没有或少有', 81],
          ['偶尔或一般', 90],
          ['经常、严重', 31],
        ],
      },
    ],
    series: [
      {
        name: '2023',
        type: 'pie',
        radius: '50%',
        label: {
          formatter: '{b}: {d}%',
        },
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

export const ITChart09 = Template.bind({});
ITChart09.storyName = '五险一金缴纳';
ITChart09.args = {
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
    title: [
      {
        text: '五险一金缴纳',
        left: 'center',
      },
    ],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    dataset: [
      {
        source: [
          ['五险一金缴纳', '人数'],
          ['都没有', 12],
          ['只有五险', 35],
          ['都有', 155],
        ],
      },
    ],
    series: [
      {
        name: '2023',
        type: 'pie',
        radius: '50%',
        label: {
          formatter: '{b}: {d}%',
        },
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

export const ITChart08 = Template.bind({});
ITChart08.storyName = '今年公司或团队扩招裁员情况';
ITChart08.args = {
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
    title: {
      text: '今年公司或团队扩招裁员情况',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    dataset: {
      source: [
        ['今年公司或团队扩招裁员情况', '人数'],
        ['没有明显变化', 83],
        ['有明显的裁员', 88],
        ['有明显的扩招', 31],
      ],
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        label: {
          formatter: '{b}: {d}%',
        },
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

export const ITChart10 = Template.bind({});
ITChart10.storyName = '车房情况';
ITChart10.args = {
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
    title: {
      text: '车房情况',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: { type: 'value' },
    dataset: {
      source: [
        ['车房状况', '人数'],
        ['有车', 18],
        ['有房', 22],
        ['有车有房', 66],
        ['无车无房', 84],
        ['已买房-在建', 4],
        ['已买房-延期', 2],
        ['已买房-烂尾', 6],
      ],
    },
    series: [
      {
        type: 'line',
      },
      {
        type: 'bar',
        label: {
          position: 'top',
          show: true,
        },
      },
    ],
  },
};
