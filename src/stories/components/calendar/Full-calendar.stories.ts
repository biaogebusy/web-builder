import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { FullCalendarComponent } from '../../../app/uiux/combs/calendar/full-calendar/full-calendar.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
export default {
  title: 'Components/calendar/Full calendar',
  component: FullCalendarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
  ],
} as Meta;

const Template: Story<FullCalendarComponent> = (args) => ({
  component: FullCalendarComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
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
            label: '案件',
            value: 'case',
          },
          {
            label: '会议',
            value: 'meeting',
          },
          {
            label: '项目',
            value: 'project',
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
            label: '案件',
            value: 'case',
          },
          {
            label: '会议管理',
            value: 'meeting',
          },
          {
            label: '项目管理',
            value: 'project',
          },
          {
            label: '资料文库',
            value: 'doc_lib',
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
      options: {
        events: [
          {
            title: 'Angular 分享',
            event: 'meeting',
            start: '2022-07-20',
            end: '2022-07-20',
            user: 'Johnson',
            className: 'bg-primary',
          },
          {
            title: 'Drupal 分享',
            event: 'drupal',
            start: '2022-07-26',
            end: '2022-07-26',
            user: 'Johnson',
            className: 'bg-warn',
          },
        ],
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
