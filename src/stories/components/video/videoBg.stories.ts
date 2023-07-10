import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { VideoBgComponent } from '@uiux/combs/video/video-bg/video-bg.component';
import { StorysModule } from '@core/module/storys.module';
import { VideoModule } from '@uiux/combs/video/video.module';
import * as showcase1v3Stories from '../../feature/showcase/showcase1v3.stories';
import { Showcase1v3Component } from '@uiux/combs/showcase/showcase1v3/showcase1v3.component';
import { IVideoBg } from '@core/interface/combs/IVideoBg';

export default {
  title: '复合组件/视频/背景视频',
  id: 'video-bg',
  component: VideoBgComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [
        ...StorysModule.forEntryComponents(),
        Showcase1v3Component,
      ],
      imports: [VideoModule, StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const showcase1v3: any = showcase1v3Stories.Default.args;
const content: IVideoBg = {
  type: 'video-bg',
  source: {
    src: '/assets/video/storybook.mp4',
    type: 'video/mp4',
  },
  bg: {
    classes: '',
  },
  classes: '',
  widget: {
    ...showcase1v3.content,
    type: 'showcase-1v3',
    bg: {
      classes: 'bg-fill-width overlay overlay-80',
    },
  },
};
Default.args = {
  content,
};
