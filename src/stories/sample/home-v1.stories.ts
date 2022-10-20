import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockComponent } from '@uiux/combs/block/block/block.component';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/storys.module';
import { BrandingModule } from '@core/branding/branding.module';

export default {
  title: '示例页面/首页 v1',
  id: 'home-v1',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BlockModule, BrandingModule, StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `
    <app-header></app-header>
    ${story}
    <app-footer></app-footer>
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';
