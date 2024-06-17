import { importProvidersFrom } from '@angular/core';
import { IProgressBar } from '@core/interface/widgets/IWidgets';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { ProgressBarComponent } from '@uiux/widgets/progress-bar/progress-bar.component';

const meta: Meta<ProgressBarComponent> = {
  title: '基础组件/反馈组件/进度条',
  id: 'progress-bar',
  component: ProgressBarComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget relative p-x p-y" style="z-index:1">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<ProgressBarComponent>;
export const Determinate: Story = {};
const deter: IProgressBar = {
  type: 'progress-bar',
  color: 'primary',
  mode: 'determinate',
  value: 40,
};
Determinate.args = {
  content: deter,
};

export const Indeterminate: Story = {};
const indeter: IProgressBar = {
  type: 'progress-bar',
  color: 'primary',
  mode: 'indeterminate',
  value: 40,
};
Indeterminate.args = {
  content: indeter,
};

export const Buffer: Story = {};
const buffer: IProgressBar = {
  type: 'progress-bar',
  color: 'primary',
  mode: 'buffer',
  value: 40,
};
Buffer.args = {
  content: buffer,
};

export const Query: Story = {};
const query: IProgressBar = {
  type: 'progress-bar',
  color: 'primary',
  mode: 'query',
};
Query.args = {
  content: query,
};
