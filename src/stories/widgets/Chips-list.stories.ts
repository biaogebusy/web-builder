import { ShareModule } from '@share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ChipListComponent } from '@uiux/widgets/chip-list/chip-list.component';
export default {
  title: 'Widgets/Chips List',
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

const Template: Story<ChipListComponent> = (args) => ({
  component: ChipListComponent,
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
