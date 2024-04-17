import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockComponent } from '@modules/render/block/block.component';
import { RenderModule } from '@modules/render/render.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { CalendarModule } from '@uiux/combs/calendar/calendar.module';
import { of } from 'rxjs';
import * as calendarStory from '@stories/widgets/Calendar.stories';
import { BRANDING } from '@core/token/token-providers';
const calendar: any = calendarStory.Default.args;
import {
  defaultHeader,
  footerInverse,
} from '@modules/builder/data/Branding.json';
export default {
  title: '示例页面/工作日历',
  id: 'calendar-page',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [
        RenderModule,
        StorysModule.forRoot(),
        CalendarModule,
        BrandingModule,
      ],
      providers: [
        {
          provide: BRANDING,
          useValue: of({
            header: defaultHeader,
            footer: footerInverse,
          }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
     <app-header></app-header>
      ${story}
      <app-footer></app-footer>
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
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
export const Page = Template.bind({});
// Raname Story
const content = of({
  title: '工作日历',
  body: [
    {
      type: 'banner-simple',
      style: 'normal',
      bannerBg: {
        classes: 'bg-fill-width overlay overlay-40',
        img: {
          hostClasses: 'bg-center',
          src: '/assets/images/16-9/business-03.jpg',
          alt: 'grass-3251984_1920.jpg',
        },
      },
      title: '日历',
      breadcrumb: [],
    },
    {
      type: 'full-calendar',
      id: 'full_calendar',
      spacer: 'sm',
      calendar: {
        drawer: true,
        options: {
          ...calendar.options,
        },
        theme: {
          case: 'bg-yellow',
          meeting: 'bg-light-green',
          project: 'bg-accent',
          event: 'bg-red',
        },
      },
      sidebar: [
        {
          type: 'text',
          title: {
            label: '筛选',
            style: 'style-v4',
            classes: ' m-bottom-xs',
          },
          spacer: 'sm',
        },
        {
          type: 'input',
          key: 'keys',
          placeholder: '请输入关键词',
          label: '关键词',
          appearance: 'legacy',
          controlType: 'search',
        },
        {
          type: 'select',
          key: 'status',
          label: '状态',
          options: [
            {
              label: '无',
              value: '',
            },
            {
              label: '规划中',
              value: '0',
            },
            {
              label: '实现中',
              value: '1',
            },
            {
              label: '已实现',
              value: '2',
            },
            {
              label: '已拒绝',
              value: '3',
            },
          ],
        },
        {
          type: 'datepicker',
          label: '日历',
          hint: 'MM/DD/YYYY – MM/DD/YYYY',
          key: 'datepicker',
          value: '',
          inline: true,
          placeholder: '请选择日期',
          params: {
            required: true,
          },
        },
      ],
    },
  ],
});
Page.storyName = '预览';
Page.args = {
  pageContent$: content,
};
