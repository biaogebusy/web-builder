import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase4v1Component } from '@uiux/combs/showcase/showcase4v1/showcase4v1.component';
import { StorysModule } from '@core/module/storys.module';
import { random } from 'lodash-es';

export default {
  title: '特色组件/展示 Showcase/4v1',
  id: 'showcase-4v1',
  component: Showcase4v1Component,
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
    type: 'showcase-1v4',
    spacer: 'lg',
    text: {
      title: {
        label: '平台实时数据',
        style: 'style-v1',
      },
    },
    paramsBak: {
      api: 'api/v1/tab/order_process_statistics',
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
  },
};

export const Img = Template.bind({});

Img.args = {
  content: {
    type: 'showcase-1v4',
    spacer: 'lg',
    text: {
      title: {
        label: 'See everything about your Landrick',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      body: '<p class="text-center">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p>',
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
          value: random(50, 100),
          label: '%',
        },
        title: 'Happy Client',
      },
      {
        img: {
          src: '/assets/images/svg/Asset189.svg',
        },
        digit: {
          value: random(100, 500),
          label: '+',
        },
        title: 'Awards',
      },
      {
        img: {
          src: '/assets/images/svg/Asset190.svg',
        },
        digit: {
          value: random(10, 300),
          label: 'K',
        },
        title: 'Job Placement',
      },
      {
        img: {
          src: '/assets/images/svg/Asset192.svg',
        },
        digit: {
          value: random(60, 100),
          label: '%',
        },
        title: 'Project Complete',
      },
    ],
  },
};
