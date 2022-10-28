import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Carousel1v1Component } from '@uiux/combs/carousel/carousel1v1/carousel1v1.component';
import * as SwiperStories from 'src/stories/widgets/Swiper.stories';
import { StorysModule } from '@core/storys.module';

export default {
  title: '复合组件/幻灯片/1v1',
  id: 'carousel-1v1',
  component: Carousel1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
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
const swiper: any = SwiperStories.Base.args;
Default.args = {
  content: {
    spacer: 'lg',
    title: {
      label: '你将喜欢上 Drupal 的原因',
      icon: 'email',
      style: 'style-v2',
      classes: 'mat-display-1',
    },
    bg: {
      classes: 'bg-white bg-fill-width',
    },
    sliders: swiper.content,
  },
};

export const TextHero = Template.bind({});
TextHero.storyName = '图片带文本';
TextHero.args = {
  content: {
    spacer: 'none',
    disableContainer: true,
    sliders: {
      params: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: false,
        pagination: false,
      },
      classes: 'p-bottom',
      elements: [
        {
          type: 'text-hero',
          theme: 'text-light',
          params: {
            height: '750px',
          },
          text: {
            title: {
              label: '私募基金业务',
              style: 'style-v4',
              classes: 'mat-display-2 bold',
            },
            classes: 'y-center',
            style: [],
            bg: {
              classes: 'bg-shadow overlay overlay-20',
              img: {
                src: '/assets/images/hero/1-3.jpg',
                hostClasses: '',
              },
            },
            body: '<p>精通私募股权投资和风险投资所涉诸多法律事务，并在该领域拥有广泛的客户群体</p>\r\n',
            actionsAlign: 'start center',
            actions: [
              {
                type: 'btn',
                mode: 'raised',
                color: 'primary',
                href: '',
                label: '了解更多',
              },
            ],
          },
        },
        {
          type: 'text-hero',
          theme: 'text-light',
          params: {
            height: '750px',
          },
          text: {
            title: {
              label: '风险投资、收购兼并',
              style: 'style-v4',
              classes: 'mat-display-2 bold',
            },
            classes: 'y-center',
            style: [],
            bg: {
              classes: 'bg-shadow overlay overlay-',
              img: {
                src: '/assets/images/hero/1-6.jpg',
                hostClasses: '',
              },
            },
            body: '<p>在并购与重组领域拥有丰富的经验，多年来处于市场领先地位并得到广泛认可，曾代表众多国内和跨境并购交易</p>\r\n',
            actionsAlign: 'start center',
            actions: [
              {
                type: 'btn',
                mode: 'raised',
                color: 'primary',
                href: '',
                label: '了解更多',
              },
            ],
          },
        },
        {
          type: 'text-hero',
          theme: 'text-light',
          params: {
            height: '750px',
          },
          text: {
            title: {
              label: '新架构介绍，使用指南',
              style: 'style-v4',
              classes: 'mat-display-2 bold',
            },
            classes: 'y-center',
            style: [],
            bg: {
              classes: 'bg-shadow overlay overlay-',
              img: {
                src: '/assets/images/hero/182.jpg',
                hostClasses: '',
              },
            },
            body: '<p>全新的用户前台框架，体验更高效和流畅，为工作带来更多的效率</p>\r\n',
            actionsAlign: 'start center',
            actions: [
              {
                type: 'btn',
                mode: 'raised',
                color: 'primary',
                href: '',
                label: '了解更多',
              },
            ],
          },
        },
      ],
    },
  },
};
