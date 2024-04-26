import { IProgressBar } from '@core/interface/widgets/IWidgets';
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
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Determinate = Template.bind({});
const deter: IProgressBar = {
  type: 'progress-bar',
  color: 'primary',
  mode: 'determinate',
  value: 40,
};
Determinate.args = {
  content: deter,
};

export const Indeterminate = Template.bind({});
const indeter: IProgressBar = {
  type: 'progress-bar',
  color: 'primary',
  mode: 'indeterminate',
  value: 40,
};
Indeterminate.args = {
  content: indeter,
};

export const Buffer = Template.bind({});
const buffer: IProgressBar = {
  type: 'progress-bar',
  color: 'primary',
  mode: 'buffer',
  value: 40,
};
Buffer.args = {
  content: buffer,
};

export const Query = Template.bind({});
const query: IProgressBar = {
  type: 'progress-bar',
  color: 'primary',
  mode: 'query',
};
Query.args = {
  content: query,
};
