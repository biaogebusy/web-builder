import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v5Component } from '@uiux/combs/showcase/showcase3v5/showcase3v5.component';
import { StorysModule } from '@core/module/storys.module';
import * as showcase3v4Stories from './showcase3v4.stories';
import { IShowcase3v5 } from '@core/interface/combs/IShowcase';

export default {
  title: '特色组件/图文 Showcase/3v5',
  id: 'showcase-3v5',
  component: Showcase3v5Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
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
    },
    classes: 'text-center',
    body: '<p class="text-center">信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。</p>',
  },
  bg: {
    classes: 'bg-shadow bg-fill-width',
  },
  classes: '',
  img: {
    src: '/assets/images/illustration/27.png',
    alt: 'OUR FEATURES',
  },
  elements: [
    {
      ...Showcase3v4.content.elements[0],
      icon: {
        name: 'verified_user',
      },
      style: 'style-v8',
      more: null,
    },
    {
      ...Showcase3v4.content.elements[1],
      icon: {
        name: 'favorite',
      },
      style: 'style-v8',
      more: null,
    },
    {
      ...Showcase3v4.content.elements[2],
      icon: {
        name: 'android',
      },
      style: 'style-v8',
      more: null,
    },
    {
      ...Showcase3v4.content.elements[3],
      icon: {
        name: 'devices',
      },
      style: 'style-v8',
      more: null,
    },
    {
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
