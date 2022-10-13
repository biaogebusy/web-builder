import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase4v1Component } from '@uiux/combs/showcase/showcase4v1/showcase4v1.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '组件/展示/4v1',
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
      label: 'SHOWCASE 4v1',
      style: 'style-v1',
    },
    paramsBak: {
      api: 'api/v1/tab/order_process_statistics',
    },
    elements: [
      {
        icon: 'fingerprint',
        digit: {
          value: 100,
          label: '+',
        },
        title: 'Clients',
      },
      {
        icon: 'verified_user',
        digit: {
          value: 200,
          label: '+',
        },
        title: 'Awards',
      },
      {
        icon: 'android',
        digit: {
          value: 246,
          label: 'million',
        },
        title: 'Line of code',
      },
      {
        icon: 'mail',
        digit: {
          value: 578,
          label: '㎡',
        },
        title: 'Project',
      },
    ],
  },
};
