import { importProvidersFrom } from '@angular/core';
import { INumberAnimate } from '@core/interface/widgets/INumberAnimate';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { NumberAnimateComponent } from '@uiux/widgets/number-animate/number-animate.component';

const meta: Meta<NumberAnimateComponent> = {
  title: '基础组件/反馈组件/动态数字',
  id: 'number-animate',
  component: NumberAnimateComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
    componentWrapperDecorator(story => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
};

export default meta;
type Story = StoryObj<NumberAnimateComponent>;
export const Default: Story = {};
const content: INumberAnimate = {
  type: 'number-animate',
  value: 100,
  label: '+',
};
Default.args = {
  content,
};
