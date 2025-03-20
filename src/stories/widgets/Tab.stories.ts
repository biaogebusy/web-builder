import { importProvidersFrom } from '@angular/core';
import { ITab } from '@core/interface/widgets/ITab';
import { sleep, StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { TabComponent } from '@uiux/widgets/tab/tab.component';

const meta: Meta<TabComponent> = {
  title: '基础组件/选项卡',
  id: 'tab',
  component: TabComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
    componentWrapperDecorator(story => `<div class="relative" style="z-index:1">${story}</div>`),
  ],
};

export default meta;
type Story = StoryObj<TabComponent>;
export const Default: Story = {};
const content: ITab = {
  type: 'tab',
  classes: 'bg-light',
  fullWidth: false,
  elements: [
    {
      label: '高性能',
      elements: [
        {
          type: 'text',
          animate: {
            disable: true,
          },
          spacer: 'none',
          body: '<p>默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；</p>',
        },
      ],
    },
    {
      label: '易用的编辑器',
      elements: [
        {
          type: 'text',
          animate: {
            disable: true,
          },
          spacer: 'none',
          body: '<p>通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；</p>',
        },
      ],
    },
    {
      label: '多语言',
      elements: [
        {
          type: 'text',
          animate: {
            disable: true,
          },
          spacer: 'none',
          body: '<p>Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；</p>',
        },
      ],
    },
    {
      label: '更有弹性',
      elements: [
        {
          type: 'text',
          animate: {
            disable: true,
          },
          spacer: 'none',
          body: '<p>无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；</p>',
        },
      ],
    },
    {
      label: '安全性',
      elements: [
        {
          type: 'text',
          animate: {
            disable: true,
          },
          spacer: 'none',
          body: '<p>为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；</p>',
        },
      ],
    },
  ],
};
Default.args = {
  content,
};

export const Align: Story = {};
const align: ITab = {
  type: 'tab',
  classes: 'bg-light',
  align: 'center',
  fullWidth: false,
  elements: [
    {
      label: '高性能',
      elements: [
        {
          type: 'text',
          animate: {
            disable: true,
          },
          spacer: 'none',
          body: '<p>默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；</p>',
        },
      ],
    },
    {
      label: '易用的编辑器',
      elements: [
        {
          type: 'text',
          animate: {
            disable: true,
          },
          spacer: 'none',
          body: '<p>通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；</p>',
        },
      ],
    },
    {
      label: '多语言',
      elements: [
        {
          type: 'text',
          animate: {
            disable: true,
          },
          spacer: 'none',
          body: '<p>Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；</p>',
        },
      ],
    },
    {
      label: '更有弹性',
      elements: [
        {
          type: 'text',
          animate: {
            disable: true,
          },
          spacer: 'none',
          body: '<p>无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；</p>',
        },
      ],
    },
    {
      label: '安全性',
      elements: [
        {
          type: 'text',
          animate: {
            disable: true,
          },
          spacer: 'none',
          body: '<p>为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；</p>',
        },
      ],
    },
  ],
};
Align.args = {
  content: align,
};

export const Pills: Story = {};
const pills: ITab = {
  type: 'tab',
  classes: 'bg-light',
  align: 'center',
  pills: true,
  fullWidth: false,
  elements: [
    {
      label: '简便快捷',
      elements: [
        {
          id: '',
          type: 'showcase-3v9',
          spacer: 'xl',
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
              style: {
                opacity: '',
                borderRadius: '',
                boxShadow: '',
                aspectRatio: '',
                objectFit: 'contain',
              },
              width: 800,
              height: 600,
            },
          ],
          right: [
            {
              type: 'text',
              spacer: 'sm',
              title: {
                label: '构建你们的项目',
                style: 'style-v4',
                classes: 'mat-headline-2',
              },
              body: '允许用户通过拖放元素、调整布局和编辑内容来设计页面，而无需编写复杂的代码。这使得即使没有专业的编程知识，用户也能够创建出具有吸引力和功能性的网页',
            },
            {
              type: 'swiper',
              params: {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: false,
                observer: true,
                observeParents: true,
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
      ],
    },
    {
      label: '无需专业',
      elements: [
        {
          id: '',
          type: 'showcase-3v9',
          spacer: 'xl',
          order: {
            left: 1,
            right: 0,
          },
          left: [
            {
              type: 'img',
              src: '/assets/images/illustration/25.png',
              style: {
                opacity: '',
                borderRadius: '',
                boxShadow: '',
                aspectRatio: '',
                objectFit: 'contain',
              },
              width: 800,
              height: 600,
            },
          ],
          right: [
            {
              type: 'text',
              spacer: 'sm',
              title: {
                label: '创意设计和干净整洁的代码',
                style: 'style-v4',
                classes: 'mat-headline-2',
              },
              body: '页面构建器的设计初衷是让非技术人员也能够轻松创建网页。通过使用页面构建器，任何人都可以成为网页设计师。',
            },
            {
              type: 'swiper',
              params: {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: false,
                observer: true,
                observeParents: true,
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
      ],
    },
    {
      label: '成本效益',
      elements: [
        {
          id: '',
          type: 'showcase-3v9',
          spacer: 'xl',
          order: {
            left: 0,
            right: 1,
          },
          left: [
            {
              type: 'img',
              src: '/assets/images/illustration/29.png',
              style: {
                opacity: '',
                borderRadius: '',
                boxShadow: '',
                aspectRatio: '',
                objectFit: 'contain',
              },
              width: 800,
              height: 600,
            },
          ],
          right: [
            {
              type: 'text',
              spacer: 'sm',
              title: {
                label: '应用24小时支持和响应',
                style: 'style-v4',
                classes: 'mat-headline-2',
              },
              body: '相对于传统的自定义网页开发，使用页面构建器可以节省大量的时间和成本。它们提供了一系列预先设计好的模块和功能，用户只需根据自己的需求进行选择和调整即可。',
            },
            {
              type: 'swiper',
              params: {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: false,
                observer: true,
                observeParents: true,
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
      ],
    },
  ],
};
Pills.args = {
  content: pills,
};
