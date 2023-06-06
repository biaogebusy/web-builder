import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { ChipListComponent } from '@uiux/widgets/chip-list/chip-list.component';

export default {
  title: '基础组件/胶囊按钮',
  id: 'chip-list',
  component: ChipListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
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
    type: 'chip-list',
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
      {
        label: 'Selected',
        selected: true,
      },
      {
        color: 'accent',
        link: {
          label: 'link',
          href: '#',
        },
      },
    ],
  },
};

export const Mini = Template.bind({});

Mini.args = {
  classes: 'mini',
  ...Default.args,
};
