import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Carousel1v1Component } from '@uiux/combs/carousel/carousel1v1/carousel1v1.component';
import * as SwiperStories from 'src/stories/widgets/Swiper.stories';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '复合组件/幻灯片/1v1',
  id: 'carousel-1v1',
  component: Carousel1v1Component,
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
const swiper: any = SwiperStories.Default.args;
Default.args = {
  content: {
    spacer: 'lg',
    type: 'carousel-1v1',
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
    type: 'carousel-1v1',
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
              label: '高性能',
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
            body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
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
              label: '易用的编辑器',
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
            body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
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
              label: '多语言',
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
            body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
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
