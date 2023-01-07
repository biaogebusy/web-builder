import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase1v1Component } from '@uiux/combs/showcase/showcase1v1/showcase1v1.component';
import { StorysModule } from '@core/module/storys.module';
export default {
  title: '特色组件/展示 Showcase/1v2',
  id: 'showcase-1v2',
  component: Showcase1v1Component,
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
    type: 'showcase-1v1',
    title: {
      label: '你将来喜欢 Drupal 的理由',
      style: 'style-v2',
    },
    subTitle: {
      spacer: 'none',
      body: '<p class="text-center">Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。</p><br>',
    },
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    row: '4',
    elements: [
      {
        img: {
          src: '/assets/images/showcase/browser.png',
          alt: 'browser',
        },
        style: 'style-v3 use-image',
        title: {
          href: '#',
          label: '高性能',
        },
        content:
          '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
        more: {
          href: '#',
          label: '+',
        },
      },
      {
        img: {
          src: '/assets/images/showcase/clipboard.png',
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
        img: {
          src: '/assets/images/showcase/console.png',
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
        img: {
          src: '/assets/images/showcase/weather.png',
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
  },
};
