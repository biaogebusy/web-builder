import { ShareModule } from '@share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BgComponent } from '@uiux/widgets/bg/bg.component';

export default {
  title: '基础组件/内容/背景色',
  id: 'bg',
  component: BgComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ShareModule],
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
export const BgPrimary = Template.bind({});
BgPrimary.storyName = '主色背景';
BgPrimary.args = {
  content: {
    classes: 'bg-fill-width bg-primary',
  },
};

export const BgShadow = Template.bind({});
BgShadow.storyName = '灰色背景';
BgShadow.args = {
  content: {
    classes: 'bg-fill-width bg-shadow',
  },
};
