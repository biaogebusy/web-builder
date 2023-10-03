import { IBg } from '@core/interface/widgets/IBg';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BgComponent } from '@uiux/widgets/bg/bg.component';

export default {
  title: '基本元素/背景色',
  id: 'bg',
  component: BgComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget position-relative p-x p-y" style="z-index:1">${story}</div>`
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
const content: IBg = {
  type: 'bg',
  classes: 'bg-fill-width bg-primary',
};
BgPrimary.args = {
  content,
};

export const BgShadow = Template.bind({});
BgShadow.storyName = '灰色背景';
const shadow: IBg = {
  type: 'bg',
  classes: 'bg-fill-width bg-shadow',
};
BgShadow.args = {
  content: shadow,
};
