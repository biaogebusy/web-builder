import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v1Component } from '@uiux/combs/showcase/showcase3v1/showcase3v1.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '组件/展示/3v1',
  id: 'showcase-3v1',
  component: Showcase3v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
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
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    classes: 'text-light',
    bgImg: '/assets/images/showcase/bg2.jpeg',
    title: {
      label: '为什么你将会喜欢信使？',
      style: 'style-v1',
    },
    content:
      'Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。',
    carousel: {
      params: {
        slidesPerView: 1,
        navigation: false,
        centeredSlides: true,
      },
      classes: 'text-center',
      elements: [
        {
          type: 'img',
          src: '/assets/images/1-1/business-01.png',
          alt: 'porto1.jpg',
        },
        {
          type: 'img',
          src: '/assets/images/1-1/business-02.png',
          alt: 'porto2.jpg',
        },
        {
          type: 'img',
          src: '/assets/images/1-1/business-04.png',
          alt: 'porto2.jpg',
        },
      ],
    },
  },
};
