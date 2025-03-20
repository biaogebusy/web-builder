import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { StorysModule } from '@core/module/storys.module';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import { IImg } from '@core/interface/widgets/IImg';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<ImgComponent> = {
  title: '基本元素/图片',
  id: 'img',
  component: ImgComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
    componentWrapperDecorator(
      story => `<div class="widget relative  w-[300px]"  style="height:300px">${story}</div>`
    ),
  ],
};

export default meta;

type Story = StoryObj<ImgComponent>;
export const Default: Story = {};
const content: IImg = {
  type: 'img',
  hostClasses: 'text-center',
  classes: 'object-contain',
  src: '/assets/images/illustration/08.png',
  alt: 'alt',
  width: 400,
  height: 300,
};
Default.args = {
  content,
};

export const ImgWithLink: Story = {};
ImgWithLink.storyName = '带链接';
const link: IImg = {
  ...content,
  href: '#',
  target: '_blank',
};
ImgWithLink.args = {
  content: link,
};

export const Mobile: Story = {};
Mobile.storyName = '移动端';
const mobile: IImg = {
  ...content,
  mobile: '/assets/images/mobile/follower-01.jpg',
};

Mobile.args = {
  content: mobile,
};

export const Shape: Story = {};
Shape.storyName = '带背景形状';
const shape: IImg = {
  type: 'img',
  hostClasses: 'img-bg-shape',
  src: '/assets/images/illustration/29.png',
};
Shape.args = {
  content: shape,
};

export const Mover: Story = {};
Mover.storyName = '动起来';
const mover: IImg = {
  type: 'img',
  hostClasses: 'img-bg-shape',
  classes: 'mover',
  src: '/assets/images/illustration/12.png',
};
Mover.args = {
  content: mover,
};

const {
  Default: {
    args: { content: btnVideo },
  },
} = btnVideoStory as any;

export const VideoDefault: Story = {};
VideoDefault.storyName = '视频-默认';
const video: IImg = {
  type: 'img',
  src: '/assets/images/showcase/7.jpg',
  alt: '',
  actions: [
    {
      ...btnVideo,
      color: 'default',
    },
  ],
};
VideoDefault.args = {
  content: video,
};

export const VideoPrimary: Story = {};
VideoPrimary.storyName = '视频-主色';
const videoPrimary: IImg = {
  type: 'img',
  src: '/assets/images/showcase/7.jpg',
  alt: '',
  hostClasses: 'relative',
  actions: [
    {
      ...btnVideo,
      color: 'primary',
    },
  ],
};
VideoPrimary.args = {
  content: videoPrimary,
};
