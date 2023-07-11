import { IBtnAnimate } from '@core/interface/widgets/IBtnAnimate';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BtnAnimateComponent } from '@uiux/widgets/btn-animate/btn-animate.component';

export default {
  title: '基础组件/基本元素/动态按钮',
  id: 'btn-animate',
  component: BtnAnimateComponent,
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
export const Default = Template.bind({});
const content: IBtnAnimate = {
  type: 'btn-animate',
  label: '查看更多',
  href: '#',
  style: 'style-v1',
  icon: 'open_in_new',
};
Default.args = {
  content: content,
};
