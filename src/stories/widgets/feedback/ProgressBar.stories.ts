import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { ProgressBarComponent } from '@uiux/widgets/progress-bar/progress-bar.component';

export default {
  title: '基础组件/反馈组件/进度条',
  id: 'progress-bar',
  component: ProgressBarComponent,
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
export const Determinate = Template.bind({});

Determinate.args = {
  content: {
    color: 'primary',
    mode: 'determinate',
    value: '40',
  },
};

export const Indeterminate = Template.bind({});

Indeterminate.args = {
  content: {
    color: 'primary',
    mode: 'indeterminate',
    value: '40',
  },
};

export const Buffer = Template.bind({});

Buffer.args = {
  content: {
    color: 'primary',
    mode: 'buffer',
    value: '40',
  },
};

export const Query = Template.bind({});

Query.args = {
  content: {
    color: 'primary',
    mode: 'query',
  },
};
