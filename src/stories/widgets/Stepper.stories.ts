import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StepperComponent } from '@uiux/widgets/stepper/stepper.component';
import { StorysModule } from '@core/module/storys.module';

export default {
  title: '基础组件/进步器',
  id: 'stepper',
  component: StepperComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Horizontal = Template.bind({});
Horizontal.storyName = '水平方向';
Horizontal.args = {
  content: {
    type: 'stepper',
    params: {
      mode: 'horizontal',
      labelPosition: 'bottom',
      linear: true,
    },
    steps: [
      {
        label: '指派中',
      },
      {
        label: '接受',
        completed: true,
      },
      {
        label: '停止',
      },
      {
        label: '转移',
      },
      {
        label: '已完成',
      },
    ],
  },
};
export const Vertical = Template.bind({});
Vertical.storyName = '垂直方向';
Vertical.args = {
  content: {
    ...Horizontal.args.content,
    params: {
      mode: 'vertical',
      linear: true,
    },
  },
};
