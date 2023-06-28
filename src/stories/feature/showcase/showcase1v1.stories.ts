import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase1v1Component } from '@uiux/combs/showcase/showcase1v1/showcase1v1.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '特色组件/展示 Showcase/1v1',
  id: 'showcase-1v1',
  component: Showcase1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
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
Default.decorators = [
  componentWrapperDecorator(
    (story) =>
      `<div class="position-relative p-top-xl m-top-xl" style="z-index:1">
        ${story}
        </div>`
  ),
];
Default.args = {
  content: {
    type: 'showcase-1v1',
    classes: 'features-absolute',
    spacer: 'lg',
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    row: 4,
    elements: [
      {
        icon: {
          svg: 'palette-advanced',
        },
        style: 'style-v9',
        title: {
          href: '/?path=/story/guide--page',
          label: '丰富的组件库',
        },
        content: '超过五十多个组件，和三十多个基组件',
        more: {
          href: '/?path=/story/builder--default',
          label: '更多',
        },
      },
      {
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
  },
};

export const StyleV1 = Template.bind({});
StyleV1.storyName = 'Style v1';
StyleV1.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label:
        '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
      style: 'style-v1',
    },
    row: 4,
    elements: [
      {
        ...Default.args.content.elements[0],
        style: 'style-v1',
      },
      {
        ...Default.args.content.elements[1],
        style: 'style-v1',
      },
      {
        ...Default.args.content.elements[2],
        style: 'style-v1',
      },
      {
        ...Default.args.content.elements[3],
        style: 'style-v1',
      },
    ],
  },
};

export const StyleV2 = Template.bind({});
StyleV2.storyName = 'Style v2';
StyleV2.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      ...StyleV1.args.content.title,
      style: 'style-v2',
      icon: 'mail',
    },
    row: 4,
    bg: {
      classes: 'bg- bg-fill-width',
    },
    elements: [
      {
        ...Default.args.content.elements[0],
        icon: {
          name: 'verified_user',
        },
        style: 'style-v2',
      },
      {
        ...Default.args.content.elements[1],
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v2',
      },
      {
        ...Default.args.content.elements[2],
        icon: {
          name: 'favorite',
        },
        style: 'style-v2',
      },
      {
        ...Default.args.content.elements[3],
        icon: {
          name: 'android',
        },
        style: 'style-v2',
      },
    ],
  },
};

export const StyleV3 = Template.bind({});
StyleV3.storyName = 'Style v3';
StyleV3.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      ...StyleV1.args.content.title,
      style: 'style-v3',
    },
    row: 4,
    style: 'style-v3',
    elements: [
      {
        ...Default.args.content.elements[0],
        icon: {
          name: 'verified_user',
        },
        style: 'style-v3',
      },
      {
        ...Default.args.content.elements[1],
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v3',
      },
      {
        ...Default.args.content.elements[2],
        icon: {
          name: 'favorite',
        },
        style: 'style-v3',
      },
      {
        ...Default.args.content.elements[3],
        icon: {
          name: 'android',
        },
        style: 'style-v3',
      },
    ],
  },
};

export const Primary = Template.bind({});
Primary.storyName = 'Primary';
Primary.args = {
  content: {
    type: 'showcase-1v1',
    title: { label: 'Drupal 已经超越了传统的 Web概念', style: 'style-v1' },
    subTitle: {
      spacer: 'none',
      body: '<p class="text-center">可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。无论是一个还是多个站点，Drupal 总是可以游刃有余的构建。</p><br>',
    },
    bg: { classes: 'bg-shadow bg-fill-width' },
    row: '3',
    elements: [
      {
        img: { src: '/assets/images/svg/Asset187.svg', alt: 'browser' },
        style: 'style-v3 use-image',
        title: { href: '#', label: '高性能' },
        content:
          '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
      },
      {
        img: { src: '/assets/images/svg/Asset189.svg', alt: 'browser' },
        style: 'style-v3 use-image primary',
        title: { href: '#', label: '易用的编辑器' },
        content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
      },
      {
        img: { src: '/assets/images/svg/Asset190.svg', alt: 'browser' },
        style: 'style-v3 use-image',
        title: { href: '#', label: '多语言' },
        content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
      },
    ],
  },
};

export const StyleV4 = Template.bind({});
StyleV4.storyName = 'Style v4';
StyleV4.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      ...StyleV1.args.content.title,
      style: 'style-v4',
    },
    row: 4,
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    elements: [
      {
        ...Default.args.content.elements[0],
        style: 'style-v4',
        icon: {
          name: 'verified_user',
        },
      },
      {
        ...Default.args.content.elements[1],
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v4',
      },
      {
        ...Default.args.content.elements[2],
        icon: {
          name: 'favorite',
        },
        style: 'style-v4',
      },
      {
        ...Default.args.content.elements[3],
        icon: {
          name: 'android',
        },
        style: 'style-v4',
      },
    ],
  },
};

export const StyleV5 = Template.bind({});
StyleV5.storyName = 'Style v5';
StyleV5.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      ...StyleV1.args.content.title,
      style: 'style-v5',
    },
    row: 4,
    elements: [
      {
        ...Default.args.content.elements[0],
        icon: {
          name: 'verified_user',
        },
        style: 'style-v5',
      },
      {
        ...Default.args.content.elements[1],
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v5',
      },
      {
        ...Default.args.content.elements[2],
        icon: {
          name: 'favorite',
        },
        style: 'style-v5',
      },
      {
        ...Default.args.content.elements[3],
        icon: {
          name: 'android',
        },
        style: 'style-v5',
      },
    ],
  },
};

export const Image = Template.bind({});
Image.storyName = '图片';
Image.args = {
  content: {
    type: 'showcase-1v1',
    bg: {
      classes: 'bg-none bg-fill-width',
    },
    row: '4',
    elements: [
      {
        img: {
          src: '/assets/images/svg/user.svg',
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
  },
};

export const StyleV6 = Template.bind({});
StyleV6.storyName = 'Style v6';
StyleV6.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      ...StyleV1.args.content.title,
      style: 'style-v6',
    },
    row: 4,
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    elements: [
      {
        ...Default.args.content.elements[0],
        icon: {
          name: 'verified_user',
        },
        style: 'style-v6',
      },
      {
        ...Default.args.content.elements[1],
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v6',
      },
      {
        ...Default.args.content.elements[2],
        icon: {
          name: 'favorite',
        },
        style: 'style-v6',
      },
      {
        ...Default.args.content.elements[3],
        icon: {
          name: 'android',
        },
        style: 'style-v6',
      },
    ],
  },
};

export const StyleV7 = Template.bind({});
StyleV7.storyName = 'Style v7';
StyleV7.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      ...StyleV1.args.content.title,
      style: 'style-v7',
    },
    row: 4,
    elements: [
      {
        ...Default.args.content.elements[0],
        icon: {
          name: 'verified_user',
        },
        style: 'style-v7',
      },
      {
        ...Default.args.content.elements[1],
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v7',
      },
      {
        ...Default.args.content.elements[2],
        icon: {
          name: 'favorite',
        },
        style: 'style-v7',
      },
      {
        ...Default.args.content.elements[3],
        icon: {
          name: 'android',
        },
        style: 'style-v7',
      },
    ],
  },
};
