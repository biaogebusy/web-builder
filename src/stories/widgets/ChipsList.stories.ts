import { ShareModule } from '@share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { ChipListComponent } from '@uiux/widgets/chip-list/chip-list.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
export default {
  title: '基础/胶囊按钮',
  component: ChipListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ShareModule, WidgetsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div fxFlex="300px" class="position-relative">${story}</div>`
    ),
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
    elements: [
      {
        label: 'Primary',
      },
      {
        label: 'Warn',
        color: 'warn',
      },
      {
        label: 'Accent',
        color: 'accent',
      },
    ],
  },
};

export const Mini = Template.bind({});

Mini.args = {
  classes: 'mini',
  ...Default.args,
};
