import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { ShapeComponent } from '@uiux/widgets/shape/shape.component';
import { StorysModule } from '@core/module/storys.module';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<ShapeComponent> = {
  title: '基础组件/形状',
  id: 'shape',
  component: ShapeComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
    componentWrapperDecorator(
      story =>
        `<div class="widget shape-inner relative p-y-lg m-top-lg bg-primary">
         ${story}
         </div>
        `
    ),
  ],
};

export default meta;
type Story = StoryObj<ShapeComponent>;
export const Default: Story = {};

Default.args = {};
