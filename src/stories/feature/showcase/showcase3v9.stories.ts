import { moduleMetadata, Meta, StoryObj, applicationConfig } from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { Showcase3v9Component } from '@uiux/combs/showcase/showcase3v9/showcase3v9.component';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import { IShowcase3v9 } from '@core/interface/combs/IShowcase';
import { Actions } from '@stories/base/Text.stories';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<Showcase3v9Component> = {
  title: '特色组件/图文 Showcase/3v9',
  id: 'showcase-3v9',
  component: Showcase3v9Component,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Showcase3v9Component>;
export const Default: Story = {};
const content: IShowcase3v9 = {
  type: 'showcase-3v9',
  bg: {
    classes: 'bg-fill-width',
    img: {
      classes: 'object-fit',
      src: '/assets/images/bg/bg-01.png',
      width: 490,
      height: 500,
    },
  },
  classes: '',
  order: {
    left: 1,
    right: 0,
  },
  left: [
    {
      type: 'img',
      src: '/assets/images/illustration/13.png',
      classes: 'mover',
      style: {
        opacity: '',
        borderRadius: '',
        boxShadow: '',
        aspectRatio: '',
        objectFit: 'contain',
      },
      width: 500,
      height: 600,
      hostClasses: 'relative img-bg-shape',
      actions: [
        {
          type: 'btn-video',
          color: 'default',
          dialog: {
            width: '900',
            height: '800',
          },
          video: {
            type: 'iframe',
            url: '//player.bilibili.com/player.html?aid=998790468&bvid=BV1ux4y197kc&cid=1207367269&page=1',
            width: '900',
            height: '700',
          },
        },
      ],
    },
  ],
  right: [
    {
      ...Actions.args?.content,
    },
  ],
};
Default.args = {
  content,
};

export const Reverse: Story = {};
Reverse.storyName = '反向';
const reverse: IShowcase3v9 = {
  id: '',
  type: 'showcase-3v9',
  spacer: 'xl',
  bg: {
    classes: 'bg-fill-width',
    img: {
      src: '/assets/images/bg/bg-02.png',
    },
  },
  classes: '',
  order: {
    left: 1,
    right: 0,
  },
  left: [
    {
      type: 'img',
      src: '/assets/images/illustration/12.png',
      style: {
        opacity: '',
        borderRadius: '',
        boxShadow: '',
        aspectRatio: '',
        objectFit: 'contain',
      },
      width: 500,
      height: 600,
    },
  ],
  right: [
    {
      type: 'text',
      spacer: 'sm',
      title: {
        label: 'Storybook 是什么？',
        style: 'style-v4',
        classes: 'mat-headline-3',
      },
      body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。',
    },
    {
      type: 'panel',
      elements: [
        {
          title: '组件驱动开发',
          icon: 'person',
          params: {
            expanded: true,
          },
          elements: [
            {
              type: 'text',
              spacer: 'none',
              body: 'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
            },
          ],
        },
        {
          title: '组件展示和测试',
          icon: 'faviores',
          elements: [
            {
              type: 'text',
              spacer: 'none',
              body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
            },
          ],
        },
        {
          title: '文档化',
          icon: 'faviores',
          elements: [
            {
              type: 'text',
              spacer: 'none',
              body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
            },
          ],
        },
      ],
    },
  ],
};

Reverse.args = {
  content: reverse,
};

const {
  Default: {
    args: { content: btnVideo },
  },
} = btnVideoStory as any;

export const Video: Story = {};
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
        src: '/assets/images/illustration/13.png',
        hostClasses: 'relative',
        style: {
          opacity: '',
          borderRadius: '',
          boxShadow: '',
          aspectRatio: '',
          objectFit: 'contain',
        },
        width: 500,
        height: 600,
        actions: [
          {
            color: 'default',
            ...btnVideo,
          },
        ],
      },
    ],
    right: [
      {
        type: 'text',
        spacer: 'sm',
        title: {
          label: '使用信使构建你们的项目',
          style: 'style-v4',
          classes: 'mat-headline-2',
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
