import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Hero1v2Component } from '@uiux/combs/hero/hero1v2/hero1v2.component';
import { SwiperModule } from 'swiper/angular';
import { StorysModule } from '@core/storys.module';

export default {
  title: '常规组件/英雄区/1v2',
  id: 'hero-1v2',
  component: Hero1v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [SwiperModule, StorysModule.forRoot()],
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
