import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v6Component } from '@uiux/combs/showcase/showcase3v6/showcase3v6.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '特色组件/展示 Showcase/3v6',
  id: 'showcase-3v6',
  component: Showcase3v6Component,
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
    type: 'showcase-3v6',
    id: '',
    title: {
      type: 'text',
      spacer: 'sm',
      title: {
        label: '为所有开发者、所有应用场景而设计',
        style: 'style-v1',
      },
      body: '<p class="text-center">让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。</p>',
    },
    bg: {
      classes: 'bg-light bg-fill-width',
    },
    row: '4',
    elements: [
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '响应式设计',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '支持 SSR 服务端渲染',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',

          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '支持多主题、暗黑模式',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',

          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: 'MDI 6000多个icons',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',

          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: 'Storybook 全覆盖测试',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '动态组件动态表单',
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
    row: '3',
    action: {
      label: '查看更多',
      href: '#',
      style: 'style-v1',
      icon: 'open_in_new',
    },
  },
};
