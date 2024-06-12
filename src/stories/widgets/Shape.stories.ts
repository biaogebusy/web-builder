import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { ShapeComponent } from '@uiux/widgets/shape/shape.component';
import { StorysModule } from '@core/module/storys.module';

const meta: Meta<MyComponent> = {
  title: '基础组件/形状',
  id: 'shape',
  component: ShapeComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget shape-inner relative p-y-lg m-top-lg bg-primary">
         ${story}
         </div>
        `,
    ),
  ],
};

export default meta;
type Story = StoryObj<MyComponent>;
export const Default: Story = {};

Default.args = {
  content: {
    type: 'shape',
  },
};
