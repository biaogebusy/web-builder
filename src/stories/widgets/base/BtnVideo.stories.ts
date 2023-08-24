import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BtnVideoComponent } from '@uiux/widgets/actions/btn-video/btn-video.component';
import * as playerStory from '../../feature/media/Player.stories';
import { IBtnVideo } from '@core/interface/widgets/IBtn';

export default {
  title: '基础组件/基本元素/播放按钮',
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
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
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
    width: '900',
    height: '800',
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
