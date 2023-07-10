import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Carousel2v2Component } from '@uiux/combs/carousel/carousel2v2/carousel2v2.component';
import { StorysModule } from '@core/module/storys.module';
import { ICarouselBase } from '@core/interface/combs/ICarousel';
export default {
  title: '复合组件/幻灯片/2v2',
  id: 'carousel-2v2',
  component: Carousel2v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
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
