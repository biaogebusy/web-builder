import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { ShapeComponent } from '@uiux/widgets/shape/shape.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '基础/形状',
  id: 'shape',
  component: ShapeComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="shape-inner position-relative p-y-lg m-top-lg bg-primary">
         ${story}
         </div>
        `
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {};
