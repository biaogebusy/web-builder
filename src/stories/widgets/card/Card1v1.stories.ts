import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Card1v1Component } from '@uiux/widgets/card/card1v1/card1v1.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '基础组件/卡片/1v1',
  id: 'card-1v1',
  component: Card1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `<div fxFlex="33.33%" class="position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});
Base.args = {
  content: {
    type: 'card-1v1',
    link: {
      href: '#',
      label: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
    },
    user: '表歌',
    time: '2022/09/27',
    feature: {
      fullIcon: 'fullscreen',
      openIcon: 'open_in_new',
      link: '#',
      ratios: 'media-4-3',
      img: {
        classes: 'object-fit',
        src: '/assets/images/cases/porto1.jpg',
        alt: 'alt',
      },
    },
    moreLabel: '查看更多',
  },
};

export const Component = Template.bind({});
Component.args = {
  content: {
    type: 'card-1v1',
    link: {
      href: '#',
      label: 'Showcase 1v1',
    },
    components: [
      {
        type: 'hero-1v2',
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
                '使用 lighthouse 评分 以南宁IT派[www.nnitpai.com]为例记录分析优化过程',
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
                '遵循最佳实践可以让你的 Angular 应用保持性能优越，使团队的代码风格一致',
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
              subTitle: '在特定情况下，有些接口无法提供一次性的请求达到目的',
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
    ],
  },
};
