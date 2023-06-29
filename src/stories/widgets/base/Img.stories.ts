import {
  moduleMetadata,
  Meta,
  Story,
  componentWrapperDecorator,
} from '@storybook/angular';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { StorysModule } from '@core/module/storys.module';
import * as btnVideoStory from '@stories/widgets/base/BtnVideo.stories';

export default {
  title: '基础组件/基本元素/图片',
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

Default.args = {
  content: {
    type: 'img',
    classes: '',
    src: '/assets/images/cases/porto3.jpg',
    alt: 'alt',
  },
};

export const ImgWithLink = Template.bind({});
ImgWithLink.storyName = '带链接';
ImgWithLink.args = {
  content: {
    ...Default.args.content,
    href: '#',
    target: '_blank',
  },
};

export const Shape = Template.bind({});
Shape.storyName = '带背景形状';
Shape.args = {
  content: {
    type: 'img',
    hostClasses: 'img-bg-shape',
    src: '/assets/images/illustration/29.png',
  },
};

export const Mover = Template.bind({});
Mover.storyName = '动起来';
Mover.args = {
  content: {
    type: 'img',
    hostClasses: 'img-bg-shape',
    classes: 'mover',
    src: '/assets/images/illustration/12.png',
  },
};

const {
  Default: {
    args: { content: btnVideo },
  },
} = btnVideoStory as any;

export const VideoDefault = Template.bind({});
VideoDefault.storyName = '视频-默认';
VideoDefault.args = {
  content: {
    type: 'img',
    src: '/assets/images/showcase/7.jpg',
    alt: '',
    actions: [
      {
        ...btnVideo,
        color: 'default',
      },
    ],
  },
};

export const VideoPrimary = Template.bind({});
VideoPrimary.storyName = '视频-主色';
VideoPrimary.args = {
  content: {
    type: 'img',
    src: '/assets/images/showcase/7.jpg',
    alt: '',
    hostClass: 'position-relative',
    actions: [
      {
        ...btnVideo,
        color: 'primary',
      },
    ],
  },
};
