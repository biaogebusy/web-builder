import { importProvidersFrom } from '@angular/core';
import { IChipList } from '@core/interface/widgets/IChipList';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { ChipListComponent } from '@uiux/widgets/chip-list/chip-list.component';

const meta: Meta<ChipListComponent> = {
  title: '基础组件/胶囊按钮',
  id: 'chip-list',
  component: ChipListComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
};

export default meta;
type Story = StoryObj<ChipListComponent>;
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

export const Mini: Story = {};
const mini = {
  ...Default.args.content,
};
Mini.args = {
  classes: 'mini',
  content: content,
};
