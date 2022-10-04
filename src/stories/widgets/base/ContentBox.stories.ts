import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { ContentBoxComponent } from '@uiux/widgets/content-box/content-box.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { apiUrlFactory } from '@core/factory/factory';
export default {
  title: '基础/内容/内容块',
  component: ContentBoxComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        WidgetsModule,
        RouterTestingModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          userValue: {},
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="width:40%" class="position-relative">${story}</div>`
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
  content: {
    type: 'content-box',
    width: '33.33',
    ratios: 'media-140',
    subTitle: {
      label: '信使',
      href: '/search',
      queryParams: {
        law_category: 25,
      },
    },
    title: {
      label: '基于 Drupal 的 Angular 前端框架',
      href: '/search',
      queryParams: {
        law_category: 25,
      },
    },
    img: {
      classes: 'object-fit',
      src: '/assets/images/cases/porto1.jpg',
      alt: 'alt',
    },
  },
};
