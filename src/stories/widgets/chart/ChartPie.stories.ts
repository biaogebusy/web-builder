import { importProvidersFrom } from '@angular/core';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';
import { ChartComponent } from '@uiux/combs/chart/chart/chart.component';
import { random } from 'lodash-es';

const meta: Meta<ChartComponent> = {
  title: '基础组件/图表/饼图',
  id: 'chart-pie',
  component: ChartComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      providers: [],
    }),
    componentWrapperDecorator(
      story => `<div class="relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `数据可视化的一个常见思路是：<br>（I）提供数据；<br>（II）指定数据到视觉的映射。<br>简而言之，可以进行这些映射的设定：指定 数据集 的列（column）还是行（row）映射为 系列（series）。<br>这件事可以使用 series.seriesLayoutBy 属性来配置。默认是按照列（column）来映射。<br>指定维度映射的规则：如何从 dataset 的维度（一个“维度”的意思是一行/列）映射到坐标轴（如 X、Y 轴）、提示框（tooltip）、标签（label）、图形元素大小颜色等（visualMap）。<br>这件事可以使用 series.encode 属性，以及 visualMap 组件来配置（如果有需要映射颜色大小等视觉维度的话）。`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ChartComponent>;
export const Pie: Story = {};
Pie.storyName = '饼图';
Pie.args = {
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
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    dataset: {
      source: [
        ['预算', '费用'],
        ['大额红包总金额', random(300, 1000)],
        ['小额红包总金额', random(300, 1000)],
        ['提成总额', random(300, 1000)],
      ],
    },
    series: [
      {
        name: 'Access From',
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
