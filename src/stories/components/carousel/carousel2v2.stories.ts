import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { Carousel2v2Component } from '@uiux/combs/carousel/carousel2v2/carousel2v2.component';
import { StorysModule } from '@core/module/storys.module';
import { ICarouselBase } from '@core/interface/combs/ICarousel';
import { importProvidersFrom } from '@angular/core';
const meta: Meta<Carousel2v2Component> = {
  title: '复合组件/幻灯片/2v2',
  id: 'carousel-2v2',
  component: Carousel2v2Component,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
  ],
};

export default meta;
type Story = StoryObj<Carousel2v2Component>;
export const Default: Story = {};
const content: ICarouselBase = {
  type: 'carousel-2v2',
  id: '',
  spacer: 'xl',
  bg: { classes: 'bg-fill-width bg-shadow' },
  classes: '',
  sliders: {
    params: {
      slidesPerView: 1.2,
      pagination: false,
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      },
    },
    classes: '',
    elements: [
      {
        type: 'img',
        src: '/assets/images/logo/amazon.svg',
        href: '#',
        alt: '',
        style: {
          width: 'auto',
          height: '40px',
        },
      },
      {
        type: 'img',
        src: '/assets/images/logo/google.svg',
        href: '#',
        alt: '',
        style: {
          width: 'auto',
          height: '40px',
        },
      },
      {
        type: 'img',
        src: '/assets/images/logo/lenovo.svg',
        href: '#',
        alt: '',
        style: {
          width: 'auto',
          height: '40px',
        },
      },
      {
        type: 'img',
        src: '/assets/images/logo/paypal.svg',
        href: '#',
        alt: '',
        style: {
          width: 'auto',
          height: '40px',
        },
      },
      {
        type: 'img',
        src: '/assets/images/logo/shopify.svg',
        href: '#',
        alt: '',
        style: {
          width: 'auto',
          height: '40px',
        },
      },
      {
        type: 'img',
        src: '/assets/images/logo/spotify.svg',
        href: '#',
        alt: '',
        style: {
          width: 'auto',
          height: '40px',
        },
      },
      {
        type: 'img',
        src: '/assets/images/logo/logo10.png',
        href: '#',
        alt: '',
        style: {
          width: 'auto',
          height: '40px',
        },
      },
    ],
  },
};
Default.args = {
  content,
};
