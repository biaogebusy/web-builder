import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CORE_CONFIG } from '@core/token/core.config';
import { ContentTextCenterComponent } from '@uiux/widgets/content-text-center/content-text-center.component';
import { CalendarComponent } from '@uiux/widgets/date/calendar/calendar.component';
export default {
  title: 'Widgets/Calendar',
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
      (story) =>
        `<div style="width:40%" class="position-relative text-light">${story}</div>`
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
