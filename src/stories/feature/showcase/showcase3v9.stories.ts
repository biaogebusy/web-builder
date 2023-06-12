import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { Showcase3v9Component } from '@uiux/combs/showcase/showcase3v9/showcase3v9.component';

export default {
  title: '特色组件/展示 Showcase/3v9',
  id: 'showcase-3v9',
  component: Showcase3v9Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
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
    type: 'showcase-3v9',
    bg: {
      classes: 'bg-fill-width',
      img: {
        src: '/assets/images/bg/bg-01.png',
      },
    },
    order: {
      left: 0,
      right: 1,
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

export const Reverse = Template.bind({});
Reverse.storyName = '反向';
Reverse.args = {
  content: {
    id: '',
    type: 'showcase-3v9',
    spacer: 'xl',
    bg: {
      classes: 'bg-fill-width',
      img: {
        src: '/assets/images/bg/bg-02.png',
      },
    },
    order: {
      left: 1,
      right: 0,
    },
    left: [
      {
        type: 'img',
        src: '/assets/images/illustration/12.png',
      },
    ],
    right: [
      {
        type: 'text',
        spacer: 'sm',
        title: {
          label: '为什么选择我们？',
          style: 'style-v4',
          classes: 'mat-display-2',
        },
        body: '为所有开发者、所有应用场景而设计，让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。',
      },
      {
        type: 'panel',
        elements: [
          {
            title: '关于我们',
            icon: 'person',
            params: {
              expanded: true,
            },
            elements: [
              {
                type: 'text',
                spacer: 'none',
                body: '远方信使（XINSHI）是一个使用 Drupal 提供 API 的 Angular 前端开发学习框架，拥有丰富的前端组件，通 过 Drupal Pannel 可快速构建 Landing 营销着陆页，常规的 Web 官网通过拖曳的方式即可创建。',
              },
            ],
          },
          {
            title: '我们的故事',
            icon: 'faviores',
            elements: [
              {
                type: 'text',
                spacer: 'none',
                body: '我们是专业开发 Drupal 多年的前后端开发人员，热衷于分享 Drupal 相关的技术和资讯，创建维护微信公众号：  drupalstudy 从 Drupal 7开始，目前已发布了了四百多期，是国内为数不多的 Drupal 相关的微信公众号。',
              },
            ],
          },
          {
            title: '技术分享',
            icon: 'faviores',
            elements: [
              {
                type: 'text',
                spacer: 'none',
                body: '我们也及时在知乎更新 Drupal 相关的技术文章，分享给更多感兴趣的人，愿你们能够享受 Drupal 带来的字数创新体验。',
              },
            ],
          },
        ],
      },
    ],
  },
};

export const Video = Template.bind({});
Video.storyName = '视频';
Video.args = {
  content: {
    id: '',
    type: 'showcase-3v9',
    spacer: 'xl',
    bg: {
      classes: 'bg-fill-width',
      img: {
        src: '/assets/images/bg/bg-02.png',
      },
    },
    order: {
      left: 1,
      right: 0,
    },
    left: [
      {
        type: 'img',
        src: '/assets/images/showcase/7.jpg',
        hostClasses: 'position-relative',
        actions: [
          {
            type: 'btn-video',
            color: 'default',
            video: {
              options: {
                controls: true,
                aspectRatio: '16:9',
                poster: '/assets/images/16-9/business-02.jpg',
                sources: [
                  { src: '/assets/video/afterglow.mp4', type: 'video/mp4' },
                ],
              },
            },
          },
        ],
      },
    ],
    right: [
      {
        type: 'text',
        spacer: 'sm',
        title: {
          label: '为什么选择我们？',
          style: 'style-v4',
          classes: 'mat-display-2',
        },
        body: '为所有开发者、所有应用场景而设计，让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。<ul class="list-done"><li>通过 Docker 隔离</li><li>每个 workflow 独享1核虚拟CPU</li><li>在 yml 配置文件中可以使用上下文环境变量</li><li>每个workflow 排队和执行时间最多58分钟</li></ul>',
      },
    ],
  },
};
