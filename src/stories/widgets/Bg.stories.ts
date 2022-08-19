import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BgComponent } from '../../app/uiux/widgets/bg/bg.component';

export default {
  title: 'Widgets/Bg',
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

const Template: Story<BgComponent> = (args) => ({
  component: BgComponent,
  props: {
    ...args,
  },
});
export const BgColor = Template.bind({});

BgColor.args = {
  content: {
    classes: 'bg-fill-width bg-primary',
  },
};
