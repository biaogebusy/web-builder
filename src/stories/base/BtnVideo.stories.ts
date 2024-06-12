import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { BtnVideoComponent } from '@uiux/widgets/actions/btn-video/btn-video.component';
import * as playerStory from '../feature/media/Player.stories';
import { IBtnVideo } from '@core/interface/widgets/IBtn';

const meta: Meta<MyComponent> = {
  title: '基本元素/播放按钮',
  id: 'btn-video',
  component: BtnVideoComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
};

export default meta;

type Story = StoryObj<MyComponent>;
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

export const Iframe = Template.bind({});
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
Iframe.args = {
  content: iframeContent,
};
