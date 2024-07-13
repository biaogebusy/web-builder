import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { Showcase3v5Component } from '@uiux/combs/showcase/showcase3v5/showcase3v5.component';
import { StorysModule } from '@core/module/storys.module';
import * as showcase3v4Stories from './showcase3v4.stories';
import { IShowcase3v5 } from '@core/interface/combs/IShowcase';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<Showcase3v5Component> = {
  title: '特色组件/图文 Showcase/3v5',
  id: 'showcase-3v5',
  component: Showcase3v5Component,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Showcase3v5Component>;
export const Default: Story = {};
const Showcase3v4: any = showcase3v4Stories.Default.args;
const content: IShowcase3v5 = {
  type: 'showcase-3v5',
  id: '',
  title: {
    type: 'text',
    spacer: 'sm',
    title: {
      label: '为什么你将会喜欢这个前端框架？',
      style: 'style-v1',
      classes: 'mat-headline-3',
    },
    classes: 'text-center',
    body: '<p class="text-center">信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。</p>',
  },
  bg: {
    classes: 'bg-shadow bg-fill-width',
  },
  classes: '',
  img: {
    src: '/assets/images/hero/hero-component.svg',
    alt: 'OUR FEATURES',
    width: 500,
    height: 300,
    classes: 'object-contain',
    style: {
      opacity: '',
      borderRadius: '',
      boxShadow: '',
      aspectRatio: '',
      objectFit: 'cover',
    },
  },
  elements: [
    {
      type: 'box',
      style: 'style-v8',
      icon: {
        name: 'verified_user',
      },
      title: {
        href: '/',
        label: '组件编辑',
      },
      content: '通过简单的管理界面对复杂的可视化编辑',
    },
    {
      type: 'box',
      style: 'style-v8',
      icon: {
        name: 'favorite',
      },
      title: {
        href: '/',
        label: '多语言',
      },
      content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
    },
    {
      type: 'box',
      style: 'style-v8',
      icon: {
        name: 'android',
      },
      title: {
        href: '/',
        label: '高性能',
      },
      content:
        '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快',
    },
    {
      type: 'box',
      style: 'style-v8',
      icon: {
        name: 'devices',
      },
      title: {
        href: '/',
        label: '易用的编辑器',
      },
      content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作',
    },
    {
      type: 'box',
      icon: {
        name: 'border_all',
      },
      style: 'style-v8',
      title: {
        href: '#',
        label: '更有弹性',
      },
      content: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建',
    },
    {
      type: 'box',
      icon: {
        name: 'functions',
      },
      style: 'style-v8',
      title: {
        href: '#',
        label: '安全性',
      },
      content: '超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一',
    },
  ],
};

Default.args = {
  content,
};
