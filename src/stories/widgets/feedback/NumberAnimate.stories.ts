import { StorysModule } from '@core/module/storys.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { NumberAnimateComponent } from '@uiux/widgets/number-animate/number-animate.component';

export default {
  title: '基础组件/反馈组件/动态数字',
  id: 'number-animate',
  component: NumberAnimateComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'number-animate',
    value: 100,
    label: '+',
  },
};
