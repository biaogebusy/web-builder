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
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { Showcase2v4Component } from '@uiux/combs/showcase/showcase2v4/showcase2v4.component';
import { API_URL, apiUrlFactory } from '@core/token/token-providers';
export default {
  title: 'Components/showcase/2v4',
  component: Showcase2v4Component,
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
    componentWrapperDecorator((story) => `${story}`),
  ],
} as Meta;

const Template: Story<Showcase2v4Component> = (args) => ({
  component: Showcase2v4Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    text: {
      title: {
        label: 'Our Products',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      body: '<p class="text-center">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>',
    },
    spacer: 'md',
    fullWidth: true,
    elements: [
      {
        type: 'content-box',
        width: '33.33',
        ratios: 'media-140',
        subTitle: {
          label: '音乐',
          href: '/search',
          queryParams: {
            law_category: 25,
          },
        },
        title: {
          label: '音乐版权发行代理顾问服务',
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
      {
        type: 'content-box',
        width: '33.33',
        ratios: 'media-140',
        subTitle: {
          label: '影视',
          href: '/search',
          queryParams: {
            law_category: 27,
          },
        },
        title: {
          label: '影视项目投融资法律顾问，影视电视拍摄全程法律顾问',
          href: '/search',
          queryParams: {
            law_category: 27,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto2.jpg',
          alt: 'alt',
        },
      },
      {
        type: 'content-box',
        width: '33.33',
        ratios: 'media-140',
        subTitle: {
          label: '商务代言',
          href: '/search',
          queryParams: {
            law_category: 13,
          },
        },
        title: {
          label: '电视影视作品联合拍摄、外资引进专项法律顾问',
          href: '/search',
          queryParams: {
            law_category: 13,
          },
        },
        img: {
          classes: 'object-fit',
          src: '/assets/images/cases/porto3.jpg',
          alt: 'alt',
        },
      },
    ],
  },
};
