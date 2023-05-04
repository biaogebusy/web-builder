import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Hero1v2Component } from '@uiux/combs/hero/hero1v2/hero1v2.component';
import { SwiperModule } from 'swiper/angular';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '特色组件/英雄区/1v2',
  id: 'hero-1v2',
  component: Hero1v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [SwiperModule, StorysModule.forRoot()],
    }),
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
          title: '使用 DEVTOOLS 对 ANGULAR 前端应用性能分析优化',
          img: {
            src: '/assets/images/hero/hero-1-v2-4.jpeg',
            alt: '',
          },
          btn: {
            href: '#',
            mode: 'raised',
            label: '查看更多',
            classes: 'round-btn',
          },
        },
        {
          title: '使用 TAKEUNTIL 操作符管理 ANGULAR 组件的订阅',
          img: {
            src: '/assets/images/hero/hero-1-v2-3.jpeg',
            alt: '',
          },
          btn: {
            href: '#',
            mode: 'raised',
            label: '查看更多',
            classes: 'round-btn',
          },
        },
        {
          title: '你应该了解的 ANGULAR 最佳实践',
          img: {
            src: '/assets/images/hero/hero-1-v2-2.jpeg',
            alt: '',
          },
          btn: {
            href: '#',
            mode: 'raised',
            label: '查看更多',
            classes: 'round-btn',
          },
        },
        {
          title: 'ANGULAR 5 RXJS 5.5.2 多个 HTTP 并行 FORKJOIN 请求',
          img: {
            src: '/assets/images/hero/hero-1-v2-1.jpeg',
            alt: '',
          },
          btn: {
            href: '#',
            mode: 'raised',
            label: '查看更多',
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
