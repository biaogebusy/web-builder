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
    spacer: 'lg',
    title: {
      label: '平台实时数据',
      style: 'style-v1',
    },
    paramsBak: {
      api: 'api/v1/tab/order_process_statistics',
    },
    elements: [
      {
        icon: 'fingerprint',
        digit: {
          value: random(100, 1000),
          label: '+',
        },
        title: '日访问人数',
      },
      {
        icon: 'verified_user',
        digit: {
          value: random(100, 500),
          label: '+',
        },
        title: '日打开次数',
      },
      {
        icon: 'android',
        digit: {
          value: random(10, 300),
          label: '人',
        },
        title: '日新增人数',
      },
      {
        icon: 'mail',
        digit: {
          value: random(3000, 10000),
          label: '万',
        },
        title: '累计用户数',
      },
    ],
  },
};
