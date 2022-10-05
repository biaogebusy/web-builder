import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { Hero1v2Component } from '@uiux/combs/hero/hero1v2/hero1v2.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { apiUrlFactory } from '@core/factory/factory';
import { SwiperModule } from 'swiper/angular';
export default {
  title: '组件/英雄区/1v2',
  component: Hero1v2Component,
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
    spacer: 'none',
    classes: 'text-light text-center',
    sliders: {
      params: {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: true,
      },
      elements: [
        {
          title:
            'Innovative Solutions for the Toughest Business Problems, Deals, and Disputes',
          img: {
            src: '/assets/images/hero/hero-1-v2-4.jpeg',
            alt: '',
          },
          btn: {
            href: '#',
            mode: 'raised',
            label: 'Learn More',
            classes: 'round-btn',
          },
        },
        {
          title: 'Collaborative, Team-Based Culture Benefitting Our Clients',
          img: {
            src: '/assets/images/hero/hero-1-v2-3.jpeg',
            alt: '',
          },
          btn: {
            href: '#',
            mode: 'raised',
            label: 'Learn More',
            classes: 'round-btn',
          },
        },
        {
          title: 'Strategic Foresight at the Intersection of Law and Policy',
          img: {
            src: '/assets/images/hero/hero-1-v2-2.jpeg',
            alt: '',
          },
          btn: {
            href: '#',
            mode: 'raised',
            label: 'Learn More',
            classes: 'round-btn',
          },
        },
        {
          title: 'Collaborative, Team-Based Culture Benefitting Our Clients',
          img: {
            src: '/assets/images/hero/hero-1-v2-1.jpeg',
            alt: '',
          },
          btn: {
            href: '#',
            mode: 'raised',
            label: 'Learn More',
            classes: 'round-btn',
          },
        },
      ],
    },
    bg: {
      classes: 'bg-center overlay overlay-80',
      img: {
        src: '/assets/images/hero/bg-pattern-hero.png',
        mobile: '/assets/images/hero/bg-pattern-hero.png',
      },
    },
  },
};
