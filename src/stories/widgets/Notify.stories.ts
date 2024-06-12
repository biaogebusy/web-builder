import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { NotifyComponent } from '@uiux/widgets/notify/notify.component';

const meta: Meta<NotifyComponent> = {
  title: '全局配置/页头/通知',
  id: 'notify',
  component: NotifyComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrandingModule, StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
};

export default meta;
type Story = StoryObj<NotifyComponent>;
export const Default: Story = {};
// Raname Story
Default.storyName = '通知';
