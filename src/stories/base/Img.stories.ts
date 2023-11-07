import {
  moduleMetadata,
  Meta,
  Story,
  componentWrapperDecorator,
} from '@storybook/angular';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { StorysModule } from '@core/module/storys.module';
import * as btnVideoStory from '@stories/base/BtnVideo.stories';
import { IImg } from '@core/interface/widgets/IImg';

export default {
  title: '基本元素/图片',
  id: 'img',
  component: ImgComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="widget position-relative" fxFlex="300px" style="height:300px">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
const content: IImg = {
  type: 'img',
  hostClasses: 'text-center',
  classes: '',
  src: '/assets/images/cases/porto3.jpg',
  alt: 'alt',
};
Default.args = {
  content,
};

export const ImgWithLink = Template.bind({});
ImgWithLink.storyName = '带链接';
const link: IImg = {
  ...Default.args.content,
  href: '#',
  target: '_blank',
};
ImgWithLink.args = {
  content: link,
};

export const Mobile = Template.bind({});
Mobile.storyName = '移动端';
const mobile: IImg = {
  ...Default.args.content,
  mobile: '/assets/images/mobile/follower-01.jpg',
};

Mobile.args = {
  content: mobile,
};

export const Shape = Template.bind({});
Shape.storyName = '带背景形状';
const shape: IImg = {
  type: 'img',
  hostClasses: 'img-bg-shape',
  src: '/assets/images/illustration/29.png',
};
Shape.args = {
  content: shape,
};

export const Mover = Template.bind({});
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

export const VideoDefault = Template.bind({});
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

export const VideoPrimary = Template.bind({});
VideoPrimary.storyName = '视频-主色';
const videoPrimary: IImg = {
  type: 'img',
  src: '/assets/images/showcase/7.jpg',
  alt: '',
  hostClasses: 'position-relative',
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
