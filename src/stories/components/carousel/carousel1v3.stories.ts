import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { Carousel1v3Component } from '@uiux/combs/carousel/carousel1v3/carousel1v3.component';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
export default {
  title: '组件/幻灯片/1v3',
  component: Carousel1v3Component,
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

const Template: Story<Carousel1v3Component> = (args) => ({
  component: Carousel1v3Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'carousel-1v3',
    spacer: 'lg',
    text: {
      spacer: 'none',
      title: {
        label: 'Work with some amazing partners',
        icon: '',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      body: '<p class="text-center">Start working with <a href="#">xinshi</a> that can provide everything you need to generate awareness,<br> drive traffic, connect.</p><br>',
    },
    style: '',
    bg: {
      classes: 'bg-shadow',
    },
    sliders: {
      params: {
        slidesPerView: 1.2,
        spaceBetween: 20,
        navigation: false,
        breakpoints: {
          '600': {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          '960': {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      },
      classes: 'p-bottom',
      elements: [
        {
          type: 'box',
          img: {
            src: '/assets/images/amazon.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: 'SUPER CODING',
          },
          content:
            'One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others.',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/google.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: 'SUPER CODING',
          },
          content:
            'One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others.',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/shopify.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: 'SUPER CODING',
          },
          content:
            'One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others.',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/paypal.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: 'SUPER CODING',
          },
          content:
            'One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others.',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/amazon.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: 'SUPER CODING',
          },
          content:
            'One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others.',
        },
        {
          type: 'box',
          img: {
            src: '/assets/images/google.svg',
            alt: 'browser',
          },
          style: 'style-v8',
          title: {
            href: '#',
            label: 'SUPER CODING',
          },
          content:
            'One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others.',
        },
      ],
    },
  },
};
