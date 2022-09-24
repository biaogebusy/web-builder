import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BtnAnimateComponent } from '../../app/uiux/widgets/btn-animate/btn-animate.component';

export default {
  title: '基础/动态按钮',
  component: BtnAnimateComponent,
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
  component: BtnAnimateComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    label: '查看更多',
    href: '#',
    style: 'style-v1',
    icon: 'open_in_new',
  },
};
