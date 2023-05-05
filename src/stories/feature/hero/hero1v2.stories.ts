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
          subTitle:
            '使用 lighthouse 评分 以南宁IT派[www.nnitpai.com]为例记录分析优化过程，使用 Devtools lighthouse 对首页进行综合的评分',
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
          subTitle:
            '在 Rxjs 中，可以使用 takeUntil 来控制另外一个 Observable 对象数据的产生。',
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
          subTitle:
            '遵循最佳实践可以让你的 Angular 应用保持性能优越，使团队的代码风格一致，以下代码摘自南宁IT派官网项目。',
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
          subTitle:
            '在特定情况下，有些接口无法提供一次性的请求达到目的，需要并行的多次请求，当所有请求都完成时，才进行下一步的逻辑。',
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
