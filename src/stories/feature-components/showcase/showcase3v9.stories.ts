import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/storys.module';
import { Showcase3v9Component } from '@uiux/combs/showcase/showcase3v9/showcase3v9.component';

export default {
  title: '特色组件/展示 Showcase/3v9',
  id: 'showcase-3v9',
  component: Showcase3v9Component,
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
    id: '',
    spacer: 'xl',
    bg: {
      classes: 'bg-fill-width',
      img: {
        src: '/assets/images/bg-01.png',
      },
    },
    left: [
      {
        type: 'img',
        src: '/assets/images/illustration/25.png',
        alt: '',
      },
    ],
    right: [
      {
        type: 'text',
        spacer: 'sm',
        title: {
          label: '使用信使构建你们的项目',
          style: 'style-v4',
          classes: 'mat-display-2',
        },
        body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
      },
      {
        type: 'swiper',
        params: {
          slidesPerView: 1,
          spaceBetween: 20,
          navigation: false,
        },
        classes: 'p-bottom',
        elements: [
          {
            type: 'card',
            title: '高性能',
            subTitle: 'High Performance',
            avatar: {
              src: '/assets/images/avatar/01.jpeg',
              alt: '',
            },
            classes: 'card-no-shadow',
            body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
          },
          {
            type: 'card',
            avatar: {
              src: '/assets/images/avatar/02.jpeg',
              alt: '',
            },
            title: '易用的编辑器',
            subTitle: 'Simplicity for Editors',
            classes: 'card-no-shadow',
            body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
          },
          {
            type: 'card',
            avatar: {
              src: '/assets/images/avatar/03.jpeg',
              alt: '',
            },
            title: '多语言',
            subTitle: 'Leader in Multilingual',
            classes: 'card-no-shadow',
            body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
          },
          {
            type: 'card',
            avatar: {
              src: '/assets/images/avatar/04.jpeg',
              alt: '',
            },
            title: '更有弹性',
            subTitle: 'Flexibility',
            classes: 'card-no-shadow',
            body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
          },
          {
            type: 'card',
            avatar: {
              src: '/assets/images/avatar/05.jpeg',
              alt: '',
            },
            title: '安全性',
            subTitle: 'Rigorous Security',
            classes: 'card-no-shadow',
            body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
          },
        ],
      },
    ],
  },
};
