import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  Story,
} from '@storybook/angular';
import { ChartComponent } from '@uiux/widgets/chart/chart.component';
import { random } from 'lodash-es';

export default {
  title: '基础组件/图表/柱状图',
  id: 'chart-bar',
  component: ChartComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
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

export const Bar = Template.bind({});
Bar.storyName = '柱状图';
Bar.args = {
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
      // 提供一份数据。
      source: [
        ['红包预算', '2020', '2021', '2022'],
        [
          '第一季度',
          random(3000, 10000),
          random(3000, 10000),
          random(3000, 10000),
        ],
        [
          '第二季度',
          random(3000, 10000),
          random(3000, 10000),
          random(3000, 10000),
        ],
        [
          '第三季度',
          random(3000, 10000),
          random(3000, 10000),
          random(3000, 10000),
        ],
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

export const SingleSelected = Template.bind({});
SingleSelected.storyName = '单选图例';
SingleSelected.args = {
  ...Bar.args.data,
  content: {
    ...Bar.args.content,
    legend: {
      selected: {
        预算: true,
        第一季度: false,
        第二季度: false,
        第三季度: false,
      },
      selectedMode: 'single',
    },
  },
};
