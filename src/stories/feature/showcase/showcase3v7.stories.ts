import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v7Component } from '@uiux/combs/showcase/showcase3v7/showcase3v7.component';
import { StorysModule } from '@core/module/storys.module';
import * as showcase3v5Stories from './showcase3v5.stories';
import { IShowcase3v7 } from '@core/interface/combs/IShowcase';

export default {
  title: '特色组件/展示 Showcase/3v7',
  id: 'showcase-3v7',
  component: Showcase3v7Component,
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
const showcase3v5: any = showcase3v5Stories.Default.args;
const content: IShowcase3v7 = {
  type: 'showcase-3v7',
  title: {
    ...showcase3v5.content.title,
  },
  bg: {
    classes: 'bg-shadow bg-fill-width',
  },
  classes: '',
  img: {
    src: '/assets/images/illustration/27.png',
    alt: 'OUR FEATURES',
  },
  left: [
    {
      ...showcase3v5.content.elements[0],
      style: 'style-v10',
    },
    {
      ...showcase3v5.content.elements[1],
      style: 'style-v10',
    },
    {
      ...showcase3v5.content.elements[2],
      style: 'style-v10',
    },
  ],
  right: [
    {
      ...showcase3v5.content.elements[3],
      style: 'style-v8',
    },
    {
      ...showcase3v5.content.elements[4],
      style: 'style-v8',
    },
    {
      ...showcase3v5.content.elements[5],
      style: 'style-v8',
    },
  ],
};

Default.args = {
  content,
};

export const ForStory = Template.bind({});
ForStory.args = {
  content: {
    type: 'showcase-3v7',
    title: {
      type: 'text',
      spacer: 'sm',
      title: {
        label: '开源目的',
        style: 'style-v1',
      },
      body: '<p class="text-center">项目非常适合初学者学习或者进阶。它涵盖了绝大部分 Angular 技术知识点，但并不仅限于以下内容。</p>',
    },
    bg: {
      classes: 'bg- bg-fill-width',
    },
    classes: '',
    img: {
      src: '/assets/images/illustration/27.png',
      alt: 'OUR FEATURES',
    },
    left: [
      {
        type: 'box',
        style: 'style-v10',
        icon: {
          name: 'verified_user',
        },
        title: {
          href: '/',
          label: '性能优化',
        },
        content: 'SSR 服务端渲染，模块懒加载，请求拦截缓存等',
        more: null,
      },
      {
        type: 'box',
        style: 'style-v10',
        icon: {
          name: 'favorite',
        },
        title: {
          href: '/',
          label: '动态数据',
        },
        content: '动态组件、JSON驱动的动态表单、动态表格',
        more: null,
      },
      {
        type: 'box',
        style: 'style-v10',
        icon: {
          name: 'android',
        },
        title: {
          href: '/',
          label: '自定义',
        },
        content: '自定义指令、自定义管道、自定义 Icon',
        more: null,
      },
    ],
    right: [
      {
        type: 'box',
        style: 'style-v8',
        icon: {
          name: 'devices',
        },
        title: {
          href: '/',
          label: '状态管理',
        },
        content: 'Rxjs',
        more: null,
      },
      {
        icon: {
          name: 'border_all',
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: 'Storybook',
        },
        content: 'UI 的开发、测试与预览',
      },
      {
        icon: {
          name: 'functions',
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: '常用',
        },
        content: '路由守卫、数据图表、Provider注入、地图应用',
      },
    ],
  },
};
