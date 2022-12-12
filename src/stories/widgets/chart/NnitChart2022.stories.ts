import { StorysModule } from '@core/storys.module';
import {
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  Story,
} from '@storybook/angular';
import { ChartComponent } from '@uiux/widgets/chart/chart.component';

export default {
  title: '基础组件/图表/2022问卷',
  id: 'nnit-chart-2022',
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
        component: `[2022年度南宁IT派互联网IT行业薪资生存情况调查](https://mp.weixin.qq.com/s/N4iFb0GBLkGwJyznRlIX4g)`,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

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
    title: {
      text: '男女占比',
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
    yAxis: { show: false },
    grid: { top: '55%' },
    dataset: {
      source: [
        ['女生', 16],
        ['男生', 114],
      ],
    },
    series: [
      {
        type: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
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
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  },
  style: {
    height: '600px',
  },
};

export const ITChart02 = Template.bind({});
ITChart02.storyName = '年龄分布';
ITChart02.args = {
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
      text: '年龄分布',
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
    yAxis: { show: false },
    grid: { top: '55%' },
    dataset: {
      source: [
        ['22岁以下', 5],
        ['22岁~24岁', 18],
        ['25岁~29岁', 49],
        ['30岁~34岁', 43],
        ['35岁~39岁', 12],
        ['40及以上', 3],
      ],
    },
    series: [
      {
        type: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
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
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  },
  style: {
    height: '600px',
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
    title: {
      text: '办公所在地',
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
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 人',
      },
      axisPointer: {
        snap: true,
      },
    },
    grid: { top: '55%' },
    dataset: [
      {
        dimensions: ['name', 'value'],
        source: [
          ['青秀区', 43],
          ['兴宁区', 5],
          ['江南区', 10],
          ['良庆区', 31],
          ['邕宁区', 1],
          ['西乡塘区', 12],
          ['武鸣区', 0],
          ['区外', 26],
        ],
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'value', order: 'desc' },
        },
      },
    ],
    series: [
      {
        type: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
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
      {
        type: 'bar',
        encode: { x: 'name', y: 'value' },
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  },
  style: {
    height: '600px',
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
    title: {
      text: '当前职位',
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
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 人',
      },
      axisPointer: {
        snap: true,
      },
    },
    grid: { top: '55%' },
    dataset: {
      source: [
        ['产品', 11],
        ['设计', 5],
        ['技术', 101],
        ['运营', 6],
        ['市场', 1],
        ['公关', 0],
        ['财务', 0],
        ['人力行政', 3],
        ['自由职业', 3],
      ],
    },
    series: [
      {
        type: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
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
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  },
  style: {
    height: '600px',
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
    title: {
      text: '月薪收入',
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
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 人',
      },
      axisPointer: {
        snap: true,
      },
    },
    grid: { top: '55%' },
    dataset: {
      source: [
        ['月薪收入', '月薪'],
        ['4000以下', 12],
        ['4000~6000', 12],
        ['6000~8000', 21],
        ['8000~1w', 23],
        ['1w~1.2w', 22],
        ['1.2w~1.5w', 17],
        ['1.5w~2w', 8],
        ['2w以上', 15],
      ],
    },
    series: [
      {
        type: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
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
      {
        type: 'line',
        emphasis: { focus: 'series' },
      },
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  },
  style: {
    height: '600px',
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
    title: {
      text: '周末双休',
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
    grid: { top: '55%' },
    dataset: {
      source: [
        ['是', 104],
        ['否', 26],
      ],
    },
    series: [
      {
        type: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
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
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  },
  style: {
    height: '600px',
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
    title: {
      text: '是否加班',
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
    grid: { top: '55%' },
    dataset: {
      source: [
        ['没有或少有', 47],
        ['偶尔或一般', 49],
        ['经常、严重', 34],
      ],
    },
    series: [
      {
        type: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
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
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  },
  style: {
    height: '600px',
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
  style: {
    height: '600px',
  },
  content: {
    title: {
      text: '五险一金缴纳',
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
    grid: { top: '55%' },
    dataset: {
      source: [
        ['都没有', 8],
        ['只有五险', 34],
        ['都有', 88],
      ],
    },
    series: [
      {
        type: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
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
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
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
  style: {
    height: '600px',
  },
  content: {
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
    grid: { top: '55%' },
    dataset: {
      source: [
        ['没有明显变化', 77],
        ['有明显的裁员', 31],
        ['有明显的扩招', 22],
      ],
    },
    series: [
      {
        type: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
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
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  },
};

export const ITChart10 = Template.bind({});
ITChart10.storyName = '感情状况';
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
  style: {
    height: '600px',
  },
  content: {
    title: {
      text: '感情状况',
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
    grid: {
      top: '55%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    dataset: {
      source: [
        ['单身', 36],
        ['求交往', 18],
        ['暗恋中', 2],
        ['恋爱中', 20],
        ['已婚', 42],
        ['其他', 12],
      ],
    },
    series: [
      {
        type: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
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
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  },
};
