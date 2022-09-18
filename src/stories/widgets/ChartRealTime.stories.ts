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
          data: [],
          label: '张三',
        },
        {
          data: [],
          label: '李四',
        },
        {
          data: [],
          label: '王五',
        },
      ],
    },
  },
};
