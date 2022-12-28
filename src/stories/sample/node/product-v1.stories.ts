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
import { Hero1v1Component } from '@uiux/combs/hero/hero1v1/hero1v1.component';
import { Hero1v2Component } from '@uiux/combs/hero/hero1v2/hero1v2.component';
import { Hero1v3Component } from '@uiux/combs/hero/hero1v3/hero1v3.component';
import { Hero2v1Component } from '@uiux/combs/hero/hero2v1/hero2v1.component';
import { Hero2v2Component } from '@uiux/combs/hero/hero2v2/hero2v2.component';
import { Hero2v3Component } from '@uiux/combs/hero/hero2v3/hero2v3.component';

export default {
  title: '示例页面/产品介绍/v1',
  id: 'product-v1',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [
        Hero1v1Component,
        Hero1v2Component,
        Hero1v3Component,
        Hero2v1Component,
        Hero2v2Component,
        Hero2v3Component,
      ],
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
