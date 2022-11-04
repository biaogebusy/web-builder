import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase1v1Component } from '@uiux/combs/showcase/showcase1v1/showcase1v1.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '特色组件/展示 Showcase/1v1',
  id: 'showcase-1v1',
  component: Showcase1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-top-xl m-top-xl" style="z-index:1">${story}</div>`
    ),
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
    classes: 'features-absolute',
    spacer: 'lg',
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    row: 4,
    elements: [
      {
        icon: {
          name: 'verified_user',
        },
        style: 'style-v9',
        title: {
          href: '/?path=/story/guide--page',
          label: '开发指南',
        },
        content: '开发前环境的设置，详细介绍应用参数的初始化配置',
        more: {
          href: '/?path=/story/guide--page',
          label: '更多',
        },
      },
      {
        icon: {
          name: 'fingerprint',
        },
        style: 'style-v9',
        title: {
          href: '/?path=/story/themeconfig--page',
          label: '主题定制',
        },
        content: '详细介绍如何新建主题，通过色盘来构建UI颜色',
        more: {
          href: '/?path=/story/themeconfig--page',
          label: '更多',
        },
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v9',
        title: {
          href: '/?path=/story/flexlayout--page',
          label: 'FxLayout 布局',
        },
        content: '在模板中使用动态响应式灵活 flex 快速布局',
        more: {
          href: '/?path=/story/flexlayout--page',
          label: '更多',
        },
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v9',
        title: {
          href: '/?path=/story/home-v1--page',
          label: '页面示例',
        },
        content: '我们构建了多个页面的示例，展示组件的灵活性',
        more: {
          href: '/?path=/story/home-v1--page',
          label: '更多',
        },
      },
    ],
  },
};

export const StyleV1 = Template.bind({});

StyleV1.args = {
  content: {
    title: {
      label: 'Showcase 1 v1 style v1',
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

StyleV2.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v2',
      style: 'style-v2',
      icon: 'mail',
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

StyleV3.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v3',
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

export const StyleV4 = Template.bind({});

StyleV4.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v4',
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

StyleV5.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v5',
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

export const StyleV6 = Template.bind({});

StyleV6.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v6',
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

StyleV7.args = {
  content: {
    type: 'showcase-1v1',
    title: {
      label: 'Showcase 1 v1 style v7',
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
