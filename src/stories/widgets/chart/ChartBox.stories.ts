import { importProvidersFrom } from '@angular/core';
import { IChartBox } from '@core/interface/widgets/IWidgets';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';
import { ChartBoxComponent } from '@uiux/combs/chart/chart-box/chart-box.component';

const meta: Meta<ChartBoxComponent> = {
  title: '基础组件/图表/图表数据',
  id: 'chart-box',
  component: ChartBoxComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
    componentWrapperDecorator(story => `<div class="relative p-x p-y" >${story}</div>`),
  ],
};

export default meta;

type Story = StoryObj<ChartBoxComponent>;
export const Default: Story = {};
Default.storyName = '图表数据';
const content: IChartBox = {
  type: 'chart',
  label: '广告发布量',
  count: '5,000',
  params: {
    apiBak: '/api/v3/node/vote/report',
  },
  chart: {
    grid: {
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
    },
    xAxis: {
      show: false,
      type: 'category',
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    dataset: [
      {
        source: [
          ['name', '用户'],
          ['1月', 12],
          ['2月', 35],
          ['3月', 55],
          ['4月', 152],
          ['5月', 90],
          ['6月', 109],
          ['7月', 10],
          ['8月', 25],
          ['9月', 22],
          ['10月', 75],
          ['11月', 12],
          ['12月', 66],
        ],
      },
    ],
    series: [
      {
        type: 'line',
        symbol: 'none',
        areaStyle: {
          opacity: 0.2,
        },
        label: {
          position: 'top',
          show: true,
        },
        datasetIndex: 0,
      },
    ],
  },
};
Default.args = {
  content,
};
