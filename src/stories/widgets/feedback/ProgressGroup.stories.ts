import { IProgressGroup } from '@core/interface/widgets/IWidgets';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { ProgressGroupComponent } from '@uiux/widgets/progress-group/progress-group.component';

const meta: Meta<MyComponent> = {
  title: '基础组件/反馈组件/进度条组',
  id: 'progress-group',
  component: ProgressGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="relative p-x p-y" style="z-index:1">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<MyComponent>;
export const Default: Story = {};
const content: IProgressGroup = {
  type: 'progress-group',
  elements: [
    {
      label: 'HTML/CSS',
      value: 95,
    },
    {
      label: 'Angular/JavaScript',
      value: 79,
    },
    {
      label: 'Drupal',
      value: 60,
    },
  ],
};
Default.args = {
  content,
};
