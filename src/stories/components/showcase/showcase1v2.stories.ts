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
import { SwiperModule } from 'ngx-swiper-wrapper';
import { Showcase1v1Component } from '@uiux/combs/showcase/showcase1v1/showcase1v1.component';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
export default {
  title: '组件/showcase/1v2',
  component: Showcase1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        SwiperModule,
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

const Template: Story<Showcase1v1Component> = (args) => ({
  component: Showcase1v1Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v2',
      style: 'style-v2',
    },
    subTitle: {
      spacer: 'none',
      body: '<p class="text-center">At vero eos et accusam et justo duo dolores et ea rebum. <br>Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p><br>',
    },
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    row: '4',
    elements: [
      {
        img: {
          src: '/assets/images/showcase/browser.png',
          alt: 'browser',
        },
        style: 'style-v3 use-image',
        title: {
          href: '#',
          label: 'SUPER CODING',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        img: {
          src: '/assets/images/showcase/clipboard.png',
          alt: 'browser',
        },
        style: 'style-v3 use-image',
        title: {
          href: '#',
          label: 'BEST USER INTERFACE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        img: {
          src: '/assets/images/showcase/console.png',
          alt: 'browser',
        },
        style: 'style-v3 use-image',
        title: {
          href: '#',
          label: 'UNIQUE DESIGN',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        img: {
          src: '/assets/images/showcase/weather.png',
          alt: 'browser',
        },
        style: 'style-v3 use-image',
        title: {
          href: '#',
          label: 'EASY TO CUSTOMIZE',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
        more: {
          href: '#',
          label: '+',
        },
      },
    ],
  },
};
