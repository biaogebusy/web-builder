import { StorysModule } from '@core/module/storys.module';
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
    type: 'chart',
    title: [
      {
        text: '男女占比',
        left: 'center',
      },
      {
        text: '2021年',
        left: '33%',
        top: '85%',
        textAlign: 'center',
      },
      {
        text: '2022年',
        left: '66%',
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
          ['女生', 16, 2022],
          ['女生', 19, 2021],
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
    ],
    series: [
      {
        name: '2021',
        type: 'pie',
        radius: '50%',
        center: ['33%', '50%'],
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
        center: ['66%', '50%'],
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
    ],
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
    type: 'chart',
    title: [
      {
        text: '年龄分布',
        left: 'center',
      },
      {
        text: '2021年',
        left: '33%',
        top: '45%',
        textAlign: 'center',
      },
      {
        text: '2022年',
        left: '66%',
        top: '45%',
        textAlign: 'center',
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
    grid: { top: '55%' },
    dataset: [
      {
        source: [
          ['年龄', '人数', '年份'],
          ['22岁以下', 5, 2022],
          ['22岁~24岁', 20, 2022],
          ['25岁~29岁', 50, 2022],
          ['30岁~34岁', 45, 2022],
          ['35岁~39岁', 12, 2022],
          ['40及以上', 3, 2022],
          ['22岁以下', 4, 2021],
          ['22岁~24岁', 23, 2021],
          ['25岁~29岁', 44, 2021],
          ['30岁~34岁', 36, 2021],
          ['35岁~39岁', 8, 2021],
          ['40及以上', 1, 2021],
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
    ],
    series: [
      {
        name: '2021',
        type: 'pie',
        radius: '30%',
        center: ['33%', '25%'],
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
        datasetIndex: 1,
      },
      {
        name: '2022',
        type: 'pie',
        radius: '30%',
        center: ['70%', '25%'],
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
        datasetIndex: 2,
      },
      {
        name: '2021',
        type: 'line',
        smooth: true,
        emphasis: { focus: 'series' },
        datasetIndex: 1,
        label: {
          position: 'top',
          show: true,
        },
      },
      {
        name: '2022',
        type: 'line',
        smooth: true,
        emphasis: { focus: 'series' },
        datasetIndex: 2,
        label: {
          position: 'top',
          show: true,
        },
      },
    ],
  },
  style: {
    height: '800px',
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
      {
        text: '2021年',
        left: '30%',
        top: '45%',
        textAlign: 'center',
      },
      {
        text: '2022年',
        left: '70%',
        top: '45%',
        textAlign: 'center',
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
    grid: { top: '55%' },
    dataset: [
      {
        source: [
          ['办公所在地', '人数', '年份'],
          ['青秀区', 45, 2022],
          ['兴宁区', 5, 2022],
          ['江南区', 10, 2022],
          ['良庆区', 33, 2022],
          ['邕宁区', 1, 2022],
          ['西乡塘区', 14, 2022],
          ['武鸣区', 0, 2022],
          ['区外', 27, 2022],
          ['青秀区', 42, 2021],
          ['兴宁区', 2, 2021],
          ['江南区', 5, 2021],
          ['良庆区', 33, 2021],
          ['邕宁区', 0, 2021],
          ['西乡塘区', 22, 2021],
          ['武鸣区', 1, 2021],
          ['区外', 1, 2021],
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
    ],
    series: [
      {
        name: '2021',
        type: 'pie',
        radius: '30%',
        center: ['30%', '25%'],
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
        datasetIndex: 1,
      },
      {
        name: '2022',
        type: 'pie',
        radius: '30%',
        center: ['70%', '25%'],
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
        datasetIndex: 2,
      },
      {
        name: '2021',
        type: 'line',
        smooth: true,
        emphasis: { focus: 'series' },
        datasetIndex: 1,
        label: {
          position: 'top',
          show: true,
        },
      },
      {
        name: '2022',
        type: 'line',
        smooth: true,
        emphasis: { focus: 'series' },
        datasetIndex: 2,
        label: {
          position: 'top',
          show: true,
        },
      },
    ],
  },
  style: {
    height: '800px',
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
      {
        text: '2021年',
        left: '30%',
        top: '45%',
        textAlign: 'center',
      },
      {
        text: '2022年',
        left: '70%',
        top: '45%',
        textAlign: 'center',
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
    grid: { top: '55%' },
    dataset: [
      {
        source: [
          ['职位', '人数', '年份'],
          ['产品', 11, 2022],
          ['设计', 6, 2022],
          ['技术', 105, 2022],
          ['运营', 6, 2022],
          ['市场', 1, 2022],
          ['公关', 0, 2022],
          ['财务', 0, 2022],
          ['人力行政', 3, 2022],
          ['自由职业', 3, 2022],
          ['产品', 6, 2021],
          ['设计', 3, 2021],
          ['技术', 85, 2021],
          ['运营', 9, 2021],
          ['市场', 1, 2021],
          ['公关', 0, 2021],
          ['财务', 2, 2021],
          ['人力行政', 2, 2021],
          ['自由职业', 8, 2021],
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
    ],
    series: [
      {
        name: '2021',
        type: 'pie',
        radius: '30%',
        center: ['30%', '25%'],
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
        datasetIndex: 1,
      },
      {
        name: '2022',
        type: 'pie',
        radius: '30%',
        center: ['70%', '25%'],
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
        datasetIndex: 2,
      },
      {
        name: '2021',
        type: 'bar',
        datasetIndex: 1,
        label: {
          position: 'top',
          show: true,
        },
      },
      {
        name: '2022',
        type: 'bar',
        datasetIndex: 2,
        label: {
          position: 'top',
          show: true,
        },
      },
    ],
  },
  style: {
    height: '800px',
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
      {
        text: '2021年',
        left: '30%',
        top: '45%',
        textAlign: 'center',
      },
      {
        text: '2022年',
        left: '70%',
        top: '45%',
        textAlign: 'center',
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
    grid: { top: '60%', left: '4%', right: '4%' },
    dataset: [
      {
        source: [
          ['月薪收入', '月薪', '年份'],
          ['4000元以下', 12, 2022],
          ['4000元~6000元', 12, 2022],
          ['6000元~8000元', 23, 2022],
          ['8000元~1万', 23, 2022],
          ['1万~1.2万', 22, 2022],
          ['1.2万~1.5万', 18, 2022],
          ['1.5万~2万', 9, 2022],
          ['2万以上', 16, 2022],
          ['4000元以下', 12, 2021],
          ['4000元~6000元', 14, 2021],
          ['6000元~8000元', 25, 2021],
          ['8000元~1万', 27, 2021],
          ['1万~1.2万', 13, 2021],
          ['1.2万~1.5万', 11, 2021],
          ['1.5万~2万', 6, 2021],
          ['2万以上', 14, 2021],
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
    ],
    series: [
      {
        name: '2021',
        type: 'pie',
        radius: '30%',
        center: ['30%', '25%'],
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
        datasetIndex: 1,
      },
      {
        name: '2022',
        type: 'pie',
        radius: '30%',
        center: ['70%', '25%'],
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
        datasetIndex: 2,
      },
      {
        name: '2021',
        type: 'line',
        smooth: true,
        emphasis: { focus: 'series' },
        markArea: {
          itemStyle: {
            color: 'rgba(255, 173, 177, 0.4)',
          },
          data: [
            [
              {
                name: '收入',
                xAxis: '6000元~8000元',
              },
              {
                xAxis: '1万~1.2万',
              },
            ],
          ],
        },
        label: {
          position: 'top',
          show: true,
        },
        datasetIndex: 1,
      },
      {
        name: '2022',
        type: 'line',
        smooth: true,
        emphasis: { focus: 'series' },
        datasetIndex: 2,
        label: {
          position: 'top',
          show: true,
        },
      },
    ],
  },
  style: {
    height: '800px',
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
      {
        text: '2021年',
        left: '30%',
        top: '85%',
        textAlign: 'center',
      },
      {
        text: '2022年',
        left: '70%',
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
          ['周末双休', '人数', '年份'],
          ['是', 109, 2022],
          ['否', 26, 2022],
          ['是', 89, 2021],
          ['否', 27, 2021],
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
    ],
    series: [
      {
        name: '2021',
        type: 'pie',
        radius: '50%',
        center: ['30%', '50%'],
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
        center: ['70%', '50%'],
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
      {
        text: '2021年',
        left: '30%',
        top: '85%',
        textAlign: 'center',
      },
      {
        text: '2022年',
        left: '70%',
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
          ['是否加班', '人数', '年份'],
          ['没有或少有', 49, 2022],
          ['偶尔或一般', 52, 2022],
          ['经常、严重', 34, 2022],
          ['没有或少有', 37, 2021],
          ['偶尔或一般', 55, 2021],
          ['经常、严重', 24, 2021],
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
    ],
    series: [
      {
        name: '2021',
        type: 'pie',
        radius: '50%',
        center: ['30%', '50%'],
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
        center: ['70%', '50%'],
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
      {
        text: '2021年',
        left: '30%',
        top: '85%',
        textAlign: 'center',
      },
      {
        text: '2022年',
        left: '70%',
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
          ['五险一金缴纳', '人数', '年份'],
          ['都没有', 8, 2022],
          ['只有五险', 34, 2022],
          ['都有', 93, 2022],
          ['都没有', 6, 2021],
          ['只有五险', 32, 2021],
          ['都有', 78, 2021],
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
    ],
    series: [
      {
        name: '2021',
        type: 'pie',
        radius: '50%',
        center: ['30%', '50%'],
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
        center: ['70%', '50%'],
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
        ['没有明显变化', 81],
        ['有明显的裁员', 32],
        ['有明显的扩招', 22],
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
    type: 'chart',
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
        ['感情状况', '人数'],
        ['单身', 39],
        ['求交往', 18],
        ['暗恋中', 2],
        ['恋爱中', 20],
        ['已婚', 44],
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
  style: {
    height: '600px',
  },
};
