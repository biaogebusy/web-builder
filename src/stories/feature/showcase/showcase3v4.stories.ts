import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { Showcase3v4Component } from '@uiux/combs/showcase/showcase3v4/showcase3v4.component';
import * as BoxStories from '@stories/base/Box.stories';
import { StorysModule } from '@core/module/storys.module';
import { IShowcase3v4 } from '@core/interface/combs/IShowcase';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<Showcase3v4Component> = {
  title: '特色组件/图文 Showcase/3v4',
  id: 'showcase-3v4',
  component: Showcase3v4Component,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
    componentWrapperDecorator(story => `${story}`),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Showcase3v4Component>;
export const Default: Story = {};
const BoxStyleV7: any = BoxStories.StyleV7.args;
const content: IShowcase3v4 = {
  type: 'showcase-3v4',
  title: {
    label: '为什么你将会喜欢这个前端框架？',
    style: 'style-v1',
    classes: 'mat-headline-3',
  },
  bg: {
    classes: 'bg-light bg-fill-width',
  },
  classes: '',
  img: {
    src: '/assets/images/1-1/business-02.png',
    alt: 'OUR FEATURES',
  },
  elements: [
    {
      ...BoxStyleV7.content,
    },
    {
      ...BoxStyleV7.content,
      icon: {
        name: 'fingerprint',
      },
      title: {
        href: '/',
        label: '多语言',
      },
      content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
    },
    {
      ...BoxStyleV7.content,
      icon: {
        name: 'favorite',
      },
      title: {
        href: '/',
        label: '高性能',
      },
      content: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快',
    },
    {
      ...BoxStyleV7.content,
      icon: {
        name: 'android',
      },
      title: {
        href: '/',
        label: '易用的编辑器',
      },
      content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作',
    },
  ],
};
Default.args = {
  content,
};

export const Background: Story = {};
Background.storyName = '背景色';
const bg: IShowcase3v4 = {
  ...content,
  bg: {
    classes: 'bg-shadow bg-fill-width',
  },
  img: {
    src: '/assets/images/1-1/business-02.png',
    alt: 'OUR FEATURES',
  },
};
Background.args = {
  content: bg,
};
