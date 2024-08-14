import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { Showcase1v3Component } from '@uiux/combs/showcase/showcase1v3/showcase1v3.component';
import * as ContactUs from '@stories/drupal/form/ContactUs.stories';
import { StorysModule } from '@core/module/storys.module';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import { IShowcase1v3 } from '@core/interface/combs/IShowcase';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<Showcase1v3Component> = {
  title: '特色组件/图文 Showcase/1v3',
  id: 'showcase-1v3',
  component: Showcase1v3Component,
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
type Story = StoryObj<Showcase1v3Component>;
export const Default: Story = {};
Default.storyName = '默认';
const content: IShowcase1v3 = {
  type: 'showcase-1v3',
  text: {
    title: {
      label: 'Storybook 是什么？',
      style: 'style-v1',
      classes: 'mat-headline-3',
    },
  },
  classes: 'text-light',
  bg: {
    classes: 'bg-fill-width overlay overlay-20',
    img: {
      hostClasses: 'bg-center',
      src: '/assets/images/hero/bg-pattern-hero.png',
      alt: 'page title',
    },
  },
  elements: [
    {
      type: 'text',
      spacer: 'none',
      style: {
        margin: '0 auto',
        'text-align': 'center',
        width: '600px',
      },
      body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文，Storybook是一个用于开发和展示UI组件的工具。',
      actionsAlign: 'center center',
      actions: [
        {
          label: '了解更多',
          type: 'btn',
          mode: 'raised',
          href: '#',
          color: 'primary',
        },
        {
          label: '回到官网',
          type: 'btn',
          href: '#',
          classes: '!text-white',
          icon: {
            inline: true,
            svg: 'home',
          },
        },
      ],
    },
  ],
};
Default.args = {
  content,
};

export const Contact: Story = {};
Contact.storyName = '动态组件/联系我们';
const contact: any = ContactUs.Default.args;
const contactContent: IShowcase1v3 = {
  id: 'form',
  type: 'showcase-1v3',
  text: {
    title: {
      label: '联系我们',
      style: 'style-v1',
      classes: 'mat-headline-3',
    },
  },
  classes: '',
  bg: {
    classes: '',
  },
  elements: [
    {
      type: 'text',
      spacer: 'none',
      classes: 'text-center',
      body: '信使是以 Material UI为基础的 Angular 前端框架，为Drupal的数字创新提供友好的用户体验。',
    },
    contact.content,
  ],
};
Contact.args = {
  content: contactContent,
};

const {
  Default: {
    args: { content: btnVideo },
  },
} = btnVideoStory as any;

export const Video: Story = {};
Video.storyName = '视频';
const video: IShowcase1v3 = {
  type: 'showcase-1v3',
  text: {
    title: {
      label: 'Storybook 是什么？',
      style: 'style-v1',
      classes: 'mat-headline-3',
    },
  },
  classes: 'text-light',
  bg: {
    classes: 'bg-fill-width overlay overlay-80',
    img: {
      hostClasses: 'bg-center',
      src: '/assets/images/showcase/8.jpg',
      alt: 'page title',
    },
  },
  elements: [
    {
      type: 'text',
      spacer: 'none',
      style: {
        margin: '0 auto',
        'text-align': 'center',
        width: '600px',
      },
      body: 'Storybook是一个开源的前端工具，用于开发、测试和文档化UI组件。它提供了一个独立的环境，开发人员可以在其中构建和展示单个UI组件，而无需依赖于整个应用程序的上下文。',
      actionsAlign: 'center center',
      actions: [
        {
          ...btnVideo,
        },
      ],
    },
  ],
};
Video.args = {
  content: video,
};
