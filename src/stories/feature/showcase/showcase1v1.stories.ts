import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { Showcase1v1Component } from '@uiux/combs/showcase/showcase1v1/showcase1v1.component';
import { StorysModule } from '@core/module/storys.module';
import { IShowcase1v1 } from '@core/interface/combs/IShowcase';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<Showcase1v1Component> = {
  title: '特色组件/图文 Showcase/1v1',
  id: 'showcase-1v1',
  component: Showcase1v1Component,
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
type Story = StoryObj<Showcase1v1Component>;
export const Default: Story = {};
Default.decorators = [
  componentWrapperDecorator(
    story =>
      `<div class="relative p-top-xl m-top-xl" style="z-index:1">
        ${story}
        </div>`
  ),
];
const content: IShowcase1v1 = {
  type: 'showcase-1v1',
  classes: 'features-absolute',
  spacer: 'lg',
  bg: {
    classes: 'bg-shadow bg-fill-width',
  },
  row: 3,
  elements: [
    {
      type: 'box',
      icon: {
        svg: 'palette-advanced',
      },
      style: 'style-v9',
      title: {
        href: '/?path=/story/guide--page',
        label: '丰富的组件库',
      },
      content: '常用的组件库，和三十多个基组件',
      more: {
        href: '/?path=/story/builder--default',
        label: '更多',
      },
    },
    {
      type: 'box',
      icon: {
        svg: 'palette',
      },
      style: 'style-v9',
      title: {
        href: '/?path=/story/themeconfig--page',
        label: '支持多主题',
      },
      content: '内置多个主题，Material 色彩生成，支持暗黑主题',
      more: {
        href: '/?path=/story/themeconfig--page',
        label: '更多',
      },
    },
    {
      type: 'box',
      icon: {
        svg: 'format-list-text',
      },
      style: 'style-v9',
      title: {
        href: '/?path=/story/flexlayout--page',
        label: '示例页',
      },
      content: '十多个经典示例页，展示组件的灵活性',
      more: {
        href: '/?path=/story/builder--default',
        label: '更多',
      },
    },
    {
      type: 'box',
      icon: {
        svg: 'microsoft-visual-studio-code',
      },
      style: 'style-v9',
      title: {
        href: '/?path=/story/home-v1--page',
        label: 'Web Builder',
      },
      content: '从组件库中通过拖拽快速构建页面',
      more: {
        href: '/?path=/story/builder--default',
        label: '更多',
      },
    },
  ],
};
Default.args = {
  content,
};

export const StyleV1: Story = {};
StyleV1.storyName = 'Style v1';
const v1: IShowcase1v1 = {
  type: 'showcase-1v1',
  title: {
    label: '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
    style: 'style-v1',
    classes: 'mat-headline-3',
  },
  row: 3,
  bg: { classes: '' },
  classes: '',
  elements: [
    {
      ...content.elements[0],
      style: 'style-v1',
    },
    {
      ...content.elements[1],
      style: 'style-v1',
    },
    {
      ...content.elements[2],
      style: 'style-v1',
    },
    {
      ...content.elements[3],
      style: 'style-v1',
    },
  ],
};

StyleV1.args = {
  content: v1,
};

export const StyleV2: Story = {};
StyleV2.storyName = 'Style v2';
const v2: IShowcase1v1 = {
  type: 'showcase-1v1',
  title: {
    label: '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
    style: 'style-v2',
    icon: 'mail',
    classes: 'mat-headline-3',
  },
  row: 3,
  bg: {
    classes: 'bg- bg-fill-width',
  },
  classes: '',
  elements: [
    {
      ...content.elements[0],
      icon: {
        name: 'verified_user',
      },
      style: 'style-v2',
    },
    {
      ...content.elements[1],
      icon: {
        name: 'fingerprint',
      },
      style: 'style-v2',
    },
    {
      ...content.elements[2],
      icon: {
        name: 'favorite',
      },
      style: 'style-v2',
    },
    {
      ...content.elements[3],
      icon: {
        name: 'android',
      },
      style: 'style-v2',
    },
  ],
};
StyleV2.args = {
  content: v2,
};

export const StyleV3: Story = {};
StyleV3.storyName = 'Style v3';
const v3: IShowcase1v1 = {
  type: 'showcase-1v1',
  title: {
    label: '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
    style: 'style-v3',
    classes: 'mat-headline-3',
  },
  row: 3,
  bg: {
    classes: 'bg- bg-fill-width',
  },
  classes: '',
  style: 'style-v3',
  elements: [
    {
      ...content.elements[0],
      icon: {
        name: 'verified_user',
      },
      style: 'style-v3',
    },
    {
      ...content.elements[1],
      icon: {
        name: 'fingerprint',
      },
      style: 'style-v3',
    },
    {
      ...content.elements[2],
      icon: {
        name: 'favorite',
      },
      style: 'style-v3',
    },
    {
      ...content.elements[3],
      icon: {
        name: 'android',
      },
      style: 'style-v3',
    },
  ],
};
StyleV3.args = {
  content: v3,
};

export const Primary: Story = {};
Primary.storyName = 'Primary';
const primary: IShowcase1v1 = {
  type: 'showcase-1v1',
  title: {
    label: 'Drupal 已经超越了传统的 CMS 概念',
    style: 'style-v1',
    classes: 'mat-headline-3',
  },
  subTitle: {
    spacer: 'none',
    classes: 'text-center',
    body: '<p class="text-center">可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。无论是一个还是多个站点，Drupal 总是可以游刃有余的构建。</p><br>',
  },
  bg: { classes: 'bg-shadow bg-fill-width' },
  row: 4,
  classes: '',
  elements: [
    {
      type: 'box',
      img: { src: '/assets/images/svg/Asset187.svg', alt: 'browser' },
      style: 'style-v3 use-image',
      title: { href: '#', label: '高性能' },
      content: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
    },
    {
      type: 'box',
      img: { src: '/assets/images/svg/Asset189.svg', alt: 'browser' },
      style: 'style-v3 use-image primary',
      title: { href: '#', label: '易用的编辑器' },
      content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
    },
    {
      type: 'box',
      img: { src: '/assets/images/svg/Asset190.svg', alt: 'browser' },
      style: 'style-v3 use-image',
      title: { href: '#', label: '多语言' },
      content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
    },
  ],
};
Primary.args = {
  content: primary,
};

export const StyleV4: Story = {};
StyleV4.storyName = 'Style v4';
const v4: IShowcase1v1 = {
  type: 'showcase-1v1',
  title: {
    label: '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
    style: 'style-v4',
    classes: 'mat-headline-3',
  },
  row: 3,
  bg: {
    classes: 'bg-shadow bg-fill-width',
  },
  classes: '',
  elements: [
    {
      ...content.elements[0],
      style: 'style-v4',
      icon: {
        name: 'verified_user',
      },
    },
    {
      ...content.elements[1],
      icon: {
        name: 'fingerprint',
      },
      style: 'style-v4',
    },
    {
      ...content.elements[2],
      icon: {
        name: 'favorite',
      },
      style: 'style-v4',
    },
    {
      ...content.elements[3],
      icon: {
        name: 'android',
      },
      style: 'style-v4',
    },
  ],
};
StyleV4.args = {
  content: v4,
};

export const StyleV5: Story = {};
StyleV5.storyName = 'Style v5';
const v5: IShowcase1v1 = {
  type: 'showcase-1v1',
  title: {
    label: '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
    style: 'style-v5',
    classes: 'mat-headline-3',
  },
  row: 3,
  bg: {
    classes: '',
  },
  classes: '',
  elements: [
    {
      label: '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
      icon: {
        name: 'verified_user',
      },
      style: 'style-v5',
    },
    {
      ...content.elements[1],
      icon: {
        name: 'fingerprint',
      },
      style: 'style-v5',
    },
    {
      ...content.elements[2],
      icon: {
        name: 'favorite',
      },
      style: 'style-v5',
    },
    {
      ...content.elements[3],
      icon: {
        name: 'android',
      },
      style: 'style-v5',
    },
  ],
};
StyleV5.args = {
  content: v5,
};

export const Image: Story = {};
Image.storyName = '图片';
const image: IShowcase1v1 = {
  type: 'showcase-1v1',
  bg: {
    classes: 'bg-none bg-fill-width',
  },
  row: 3,
  classes: '',
  elements: [
    {
      type: 'box',
      img: {
        src: '/assets/images/svg/user.svg',
        alt: 'browser',
      },
      style: 'style-v3 use-image',
      title: {
        href: '#',
        label: '高性能',
      },
      content: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
      more: {
        href: '#',
        label: '+',
      },
    },
    {
      type: 'box',
      img: {
        src: '/assets/images/svg/calendar.svg',
        alt: 'browser',
      },
      style: 'style-v3 use-image',
      title: {
        href: '#',
        label: '易用的编辑器',
      },
      content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
      more: {
        href: '#',
        label: '+',
      },
    },
    {
      type: 'box',
      img: {
        src: '/assets/images/svg/sand-clock.svg',
        alt: 'browser',
      },
      style: 'style-v3 use-image',
      title: {
        href: '#',
        label: '多语言',
      },
      content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
      more: {
        href: '#',
        label: '+',
      },
    },
    {
      type: 'box',
      img: {
        src: '/assets/images/svg/health.svg',
        alt: 'browser',
      },
      style: 'style-v3 use-image',
      title: {
        href: '#',
        label: '更有弹性',
      },
      content: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
      more: {
        href: '#',
        label: '+',
      },
    },
  ],
};
Image.args = {
  content: image,
};
