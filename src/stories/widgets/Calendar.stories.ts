import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CORE_CONFIG } from '../../app/core/token/core.config';
import { CalendarComponent } from '../../app/uiux/widgets/date/calendar/calendar.component';
export default {
  title: '基础/日历',
  component: CalendarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [WidgetsModule, RouterTestingModule],
      providers: [
        {
          provide: CORE_CONFIG,
          userValue: {},
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div class="position-relative text-light">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<CalendarComponent> = (args) => ({
  component: CalendarComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    options: {
      api: '/api/v1/full-calendar',
    },
    theme: {
      meeting: 'bg-warn',
      case: 'bg-primary',
      project: 'bg-accent',
      event: 'bg-red',
    },
  },
};
