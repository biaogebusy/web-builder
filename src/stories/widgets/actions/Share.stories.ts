import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { ShareComponent } from '@uiux/widgets/actions/share/share.component';
import { StorysModule } from '@core/module/storys.module';
import { IShare } from '@core/interface/widgets/IActions';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<ShareComponent> = {
  title: '基础组件/Actions/分享',
  id: 'share',
  component: ShareComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
    componentWrapperDecorator(story => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `根据页面url可分享到微博、QQ、微信朋友圈。`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ShareComponent>;
export const Default: Story = {};
// Raname Story
Default.storyName = '预览';
const content: IShare = {
  type: 'share',
  button: {
    icon: 'share',
    label: '分享',
  },
  params: {
    url: '/',
  },
};
Default.args = {
  content,
};
