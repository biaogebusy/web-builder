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
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { PlayerComponent } from '@uiux/widgets/media/player/player.component';

export default {
  title: '示例页面/首页 v4',
  id: 'home-v4',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [DialogComponent, PlayerComponent],
      declarations: [],
      imports: [StorysModule.forRoot(), BlockModule, BrandingModule],
    }),
    componentWrapperDecorator(
      (story) => `
      <app-header></app-header>
      <div style="overflow:hidden">
      ${story}
      </div>
      <app-footer></app-footer>
    `
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';
