import { IChipList } from '@core/interface/widgets/IChipList';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { ChipListComponent } from '@uiux/widgets/chip-list/chip-list.component';

const meta: Meta<MyComponent> = {
  title: '基础组件/胶囊按钮',
  id: 'chip-list',
  component: ChipListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
};

export default meta;
type Story = StoryObj<MyComponent>;
export const Default: Story = {};
const content: IChipList = {
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
};
Default.args = {
  content,
};

export const Mini = Template.bind({});
const mini: IChipList = {
  ...Default.args.content,
};
Mini.args = {
  classes: 'mini',
  content: mini,
};
