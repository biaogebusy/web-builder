import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { FullCalendarComponent } from '@uiux/combs/calendar/full-calendar/full-calendar.component';
import { StorysModule } from '@core/module/storys.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CalendarModule } from '@uiux/combs/calendar/calendar.module';
import * as calendarStory from '../../widgets/Calendar.stories';
const calendar: any = calendarStory.Default.args;
export default {
  title: '特色组件/日历/Full calendar',
  id: 'full-calendar',
  component: FullCalendarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [MatSidenavModule, CalendarModule, StorysModule.forRoot()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `把数据映射到日历上，根据搜索条件显示日历内容。`,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'full-calendar',
    spacer: 'xxl',
    sidebar: [
      {
        type: 'text',
        title: {
          label: '筛选',
          style: 'style-v4',
          classes: 'm-bottom-xs',
        },
        spacer: 'sm',
      },
      {
        appearance: 'legacy',
        controlType: 'search',
        key: 'keys',
        label: '关键词',
        type: 'input',
      },
      {
        type: 'select',
        key: 'type',
        mutiple: false,
        label: '内容来源',
        options: [
          {
            label: '文章',
            value: 'article',
          },
          {
            label: '博客',
            value: 'blog',
          },
          {
            label: '会议',
            value: 'metting',
          },
        ],
      },
      {
        type: 'select',
        key: 'changed',
        mutiple: false,
        label: '最新更新',
        options: [
          {
            label: '文章',
            value: 'article',
          },
          {
            label: '博客',
            value: 'blog',
          },
          {
            label: '会议',
            value: 'metting',
          },
        ],
      },
      {
        type: 'datepicker',
        label: '日历',
        hint: 'MM/DD/YYYY – MM/DD/YYYY',
        key: 'datepicker',
        'key-': '固定值',
        value: '',
        inline: true,
        placeholder: '请选择日期',
        params: {
          required: true,
        },
      },
    ],
    calendar: {
      drawer: true,
      apiBak: '/api/v1/demo',
      options: {
        ...calendar.options,
      },
      theme: {
        meeting: 'bg-warn',
        case: 'bg-primary',
        project: 'bg-accent',
        event: 'bg-red',
      },
    },
  },
};
