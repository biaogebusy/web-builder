import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { BtnVideoComponent } from '@uiux/widgets/actions/btn-video/btn-video.component';
import * as playerStory from '../feature/media/Video.stories';
import { IBtnVideo } from '@core/interface/widgets/IBtn';
import { importProvidersFrom } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

const meta: Meta<BtnVideoComponent> = {
  title: '基本元素/播放按钮',
  id: 'btn-video',
  component: BtnVideoComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [MatIcon],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
};

export default meta;

type Story = StoryObj<BtnVideoComponent>;
export const Default: Story = {};
Default.parameters = {
  controls: {
    include: ['content'],
  },
};

const {
  Default: {
    args: { content: play },
  },
} = playerStory as any;
const content: IBtnVideo = {
  type: 'btn-video',
  color: 'primary',
  video: {
    ...play,
  },
};
Default.args = {
  content,
};
const iframeContent: IBtnVideo = {
  type: 'btn-video',
  color: 'primary',
  dialog: {
    width: '800px',
  },
  video: {
    type: 'iframe',
    url: '//player.bilibili.com/player.html?aid=998790468&bvid=BV1ux4y197kc&cid=1207367269&page=1',
    width: '900',
    height: '700',
  },
};

export const Iframe: Story = {};

Iframe.args = {
  content: iframeContent,
};
