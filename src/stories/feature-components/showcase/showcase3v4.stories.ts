import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v4Component } from '@uiux/combs/showcase/showcase3v4/showcase3v4.component';
import * as BoxStories from 'src/stories/widgets/base/Box.stories';
import { StorysModule } from '@core/storys.module';

export default {
  title: '特色组件/展示 Showcase/3v4',
  id: 'showcase-3v4',
  component: Showcase3v4Component,
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
const BoxStyleV7: any = BoxStories.StyleV7.args;
Default.args = {
  content: {
    title: {
      label: '为什么你将会喜欢信使？',
      style: 'style-v1',
    },
    bg: {
      classes: 'bg-light bg-fill-width',
    },
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
        content:
          '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快',
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
  },
};

export const Background = Template.bind({});

Background.args = {
  content: {
    ...Default.args.content,
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    img: {
      src: '/assets/images/1-1/business-02.png',
      alt: 'OUR FEATURES',
    },
  },
};
