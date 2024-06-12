import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { StepperComponent } from '@uiux/widgets/stepper/stepper.component';
import { StorysModule } from '@core/module/storys.module';

const meta: Meta<StepperComponent> = {
  title: '基础组件/进步器',
  id: 'stepper',
  component: StepperComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="relative p-x p-y" style="z-index:1">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<StepperComponent>;
export const Horizontal: Story = {};
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
export const Vertical: Story = {};
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

export const ForStory: Story = {};
ForStory.args = {
  content: {
    type: 'stepper',
    params: {
      mode: 'horizontal',
      labelPosition: 'bottom',
      linear: true,
    },
    steps: [
      {
        label: '多语言',
        completed: false,
      },
      {
        label: ' AI 生成',
        completed: false,
      },
      {
        label: 'Builder 拾色器',
        completed: false,
      },
      {
        label: 'Builder 媒体库',
        completed: true,
      },
      {
        label: 'Builder 预览可下载',
        completed: true,
      },
    ],
  },
};
