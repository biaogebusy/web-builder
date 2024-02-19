import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase4v1Component } from '@uiux/combs/showcase/showcase4v1/showcase4v1.component';
import { StorysModule } from '@core/module/storys.module';
import { random } from 'lodash-es';
import { IShowcase4v1 } from '@core/interface/combs/IShowcase';

export default {
  title: '特色组件/图文 Showcase/4v1',
  id: 'showcase-4v1',
  component: Showcase4v1Component,
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
const content: IShowcase4v1 = {
  type: 'showcase-4v1',
  spacer: 'lg',
  text: {
    title: {
      label: '平台实时数据',
      style: 'style-v1',
    },
  },
  bg: {
    classes: '',
  },
  classes: '',
  params: {
    apiBak: 'api/v1/xxx',
  },
  elements: [
    {
      icon: {
        name: 'fingerprint',
      },
      digit: {
        value: random(100, 1000),
        label: '+',
      },
      title: '日访问人数',
    },
    {
      icon: {
        name: 'verified_user',
      },
      digit: {
        value: random(100, 500),
        label: '+',
      },
      title: '日打开次数',
    },
    {
      icon: {
        name: 'android',
      },
      digit: {
        value: random(10, 300),
        label: '人',
      },
      title: '日新增人数',
    },
    {
      icon: {
        name: 'mail',
      },
      digit: {
        value: random(3000, 10000),
        label: '万',
      },
      title: '累计用户数',
    },
  ],
};

Default.args = {
  content,
};

export const Img = Template.bind({});
Img.storyName = '图片';
Img.args = {
  content: {
    type: 'showcase-4v1',
    spacer: 'lg',
    text: {
      title: {
        label: 'Storybook 是如何流行于前端开发测试的',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      classes: 'text-center',
      body: '<p class="text-center">通过Storybook，您可以以交互的方式在浏览器中浏览和测试组件，以确保它们在各种条件下的正确工作。</p>',
    },
    paramsBak: {
      api: 'api/v1/tab/order_process_statistics',
    },
    elements: [
      {
        img: {
          src: '/assets/images/svg/Asset187.svg',
        },
        digit: {
          value: random(20, 60),
          label: 'M',
        },
        title: 'Github Start',
      },
      {
        img: {
          src: '/assets/images/svg/Asset189.svg',
        },
        digit: {
          value: random(10000, 50000),
          label: '+',
        },
        title: 'NPM 周下载量',
      },
      {
        img: {
          src: '/assets/images/svg/Asset190.svg',
        },
        digit: {
          value: random(2000, 4300),
          label: 'K',
        },
        title: '社区活跃',
      },
      {
        img: {
          src: '/assets/images/svg/Asset192.svg',
        },
        digit: {
          value: random(500, 1000),
          label: '个',
        },
        title: '成功故事',
      },
    ],
  },
};
