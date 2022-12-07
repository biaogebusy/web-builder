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
    yAxis: {},
    dataset: {
      source: [
        ['性别', '数值'],
        ['女生', 14],
        ['男生', 83],
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

export const ITChart02 = Template.bind({});
ITChart02.storyName = '年龄';
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
      text: '年龄',
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
      boundaryGap: false,
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
        ['年龄', '人数'],
        ['22岁以下', 3],
        ['22~24', 16],
        ['25~29', 40],
        ['30~34', 28],
        ['35~39', 9],
        ['40及以上', 1],
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
        name: '人数',
        type: 'line',
        smooth: true,
        emphasis: { focus: 'series' },
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
      boundaryGap: false,
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
        ['办公所在地', '人数'],
        ['青秀区', 28],
        ['兴宁区', 4],
        ['江南区', 8],
        ['良庆区', 23],
        ['邕宁区', 1],
        ['西乡塘区', 12],
        ['武鸣区', 0],
        ['区外', 21],
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
        name: '人数',
        type: 'line',
        smooth: true,
        emphasis: { focus: 'series' },
      },
    ],
  },
  style: {
    height: '600px',
  },
};

export const ITChart04 = Template.bind({});
ITChart04.storyName = '职位';
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
      text: '职位',
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
      boundaryGap: false,
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
        ['职位', '人数'],
        ['产品', 7],
        ['设计', 4],
        ['技术', 76],
        ['运营', 5],
        ['市场', 1],
        ['公关', 0],
        ['财务', 0],
        ['人力行政', 3],
        ['自由职业', 1],
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
        name: '人数',
        type: 'line',
        smooth: true,
        emphasis: { focus: 'series' },
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
      text: '职位',
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
      boundaryGap: false,
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
        ['4000元以下', 8],
        ['4000元~6000元', 11],
        ['6000元~8000元', 19],
        ['8000元~1万', 14],
        ['1万~1.2万', 19],
        ['1.2万~1.5万', 12],
        ['1.5万~2万', 6],
        ['2万以上', 8],
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
        name: '人数',
        type: 'line',
        smooth: true,
        emphasis: { focus: 'series' },
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
    dataset: {
      source: [
        ['周末双休', '人数'],
        ['是', 78],
        ['否', 19],
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
    dataset: {
      source: [
        ['是否加班', '人数'],
        ['没有或少有', 34],
        ['偶尔或一般', 37],
        ['经常、严重', 26],
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
    dataset: {
      source: [
        ['五险一金缴纳', '人数'],
        ['都没有', 7],
        ['只有五险', 22],
        ['都有', 68],
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
        ['没有明显变化', 60],
        ['有明显的裁员', 24],
        ['有明显的扩招', 13],
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
      boundaryGap: false,
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
        ['感情状况', '人数'],
        ['单身', 27],
        ['求交往', 17],
        ['暗恋中', 2],
        ['恋爱中', 14],
        ['已婚', 28],
        ['其他', 9],
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
      },
    ],
  },
  style: {
    height: '600px',
  },
};
