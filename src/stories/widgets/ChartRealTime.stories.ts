import { SafeHtmlPipe } from '../../app/core/pipe/safe-html.pipe';
import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  componentWrapperDecorator,
  Meta,
  Story,
} from '@storybook/angular';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { ChartRealtimeComponent } from '@uiux/widgets/chart/chart-realtime/chart-realtime.component';

export default {
  title: 'Widgets/ChartRealTime',
  component: ChartRealtimeComponent,
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

const Template: Story<ChartRealtimeComponent> = (args) => ({
  component: ChartRealtimeComponent,
  props: {
    ...args,
  },
});
export const Line = Template.bind({});

Line.args = {
  content: {
    chartType: 'line',
    data: {
      datasets: [
        {
          data: [4, 3, 5, 3, 2, 3, 5],
          label: '张三',
        },
        {
          data: [1, 2, 4, 7, 3, 2, 6],
          label: '李四',
        },
        {
          data: [2, 4, 3, 7, 5, 1, 1],
          label: '王五',
        },
      ],
      labels: [
        '2022-7-24',
        '2022-7-25',
        '2022-7-26',
        '2022-7-28',
        '2022-7-29',
        '2022-7-30',
        '2022-7-31',
      ],
    },
  },
};
