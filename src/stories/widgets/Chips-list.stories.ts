import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';
import { ChipListComponent } from '../../app/uiux/widgets/chip-list/chip-list.component';
export default {
  title: '基础/胶囊',
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
