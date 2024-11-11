import { IBg } from '@core/interface/widgets/IBg';
import { Meta, componentWrapperDecorator, StoryObj } from '@storybook/angular';

import { BgComponent } from '@uiux/widgets/bg/bg.component';

const meta: Meta<BgComponent> = {
  title: '基本元素/背景色',
  id: 'bg',
  component: BgComponent,
  decorators: [
    componentWrapperDecorator(
      story =>
        `<div class="widget relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
};

export default meta;

type Story = StoryObj<BgComponent>;

export const BgPrimary: Story = {};
BgPrimary.storyName = '主色背景';
const content: IBg = {
  type: 'bg',
  classes: 'bg-fill-width bg-primary',
};
BgPrimary.args = {
  content,
};

export const BgShadow: Story = {};

BgShadow.storyName = '灰色背景';
const shadow: IBg = {
  type: 'bg',
  classes: 'bg-fill-width bg-shadow',
};
BgShadow.args = {
  content: shadow,
};
