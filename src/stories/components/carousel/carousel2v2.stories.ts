import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { Carousel2v2Component } from '@uiux/combs/carousel/carousel2v2/carousel2v2.component';
export default {
  title: 'Components/carousel/2v2',
  component: Carousel2v2Component,
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
      ],
    }),
  ],
} as Meta;

const Template: Story<Carousel2v2Component> = (args) => ({
  component: Carousel2v2Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'carousel-2v2',
    id: '',
    spacer: 'xl',
    classes: 'bg-primary',
    'classes-': 'bg-shadow',
    sliders: {
      params: {
        slidesPerView: 1.2,
        pagination: false,
        autoplay: {
          delay: 5000,
        },
        breakpoints: {
          '600': {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          '960': {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        },
      },
      elements: [
        {
          type: 'img',
          src: '/assets/images/logo/logo7.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo9.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo10.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo11.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo12.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo7.png',
          href: '#',
          alt: '',
        },
        {
          type: 'img',
          src: '/assets/images/logo/logo10.png',
          href: '#',
          alt: '',
        },
      ],
    },
  },
};
