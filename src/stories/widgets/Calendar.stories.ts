import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CalendarComponent } from '@uiux/widgets/date/calendar/calendar.component';
import { StorysModule } from '@core/storys.module';
export default {
  title: '基础/日历',
  id: 'calendar',
  component: CalendarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `<div class="position-relative text-light">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  options: {
    events: [
      {
        title: 'Angular 分享',
        event: 'meeting',
        start: new Date(),
        user: 'Johnson',
        className: 'bg-primary',
      },
      {
        title: 'Drupal 分享',
        event: 'drupal',
        start: new Date(),
        user: 'Johnson',
        className: 'bg-warn',
      },
    ],
  },
  content: {
    theme: {
      meeting: 'bg-warn',
      case: 'bg-primary',
      project: 'bg-accent',
      event: 'bg-red',
    },
  },
};
