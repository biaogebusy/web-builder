import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { SpinnerComponent } from '@uiux/widgets/spinner/spinner.component';

const meta: Meta<MyComponent> = {
  title: '基础组件/反馈组件/加载 Loading',
  id: 'spinner',
  component: SpinnerComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget relative p-x p-y" style="z-index:1">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<MyComponent>;
export const Default: Story = {};

Default.args = {
  content: {
    type: 'spinner',
    color: 'primary',
    size: '50',
  },
};
