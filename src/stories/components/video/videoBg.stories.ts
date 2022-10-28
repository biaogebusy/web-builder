import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { VideoBgComponent } from '@uiux/combs/video/video-bg/video-bg.component';
import { StorysModule } from '@core/storys.module';
import { VideoModule } from '@uiux/combs/video/video.module';
import * as showcase1v3Stories from '../../feature-components/showcase/showcase1v3.stories';

export default {
  title: '复合组件/视频/背景视频',
  id: 'video-bg',
  component: VideoBgComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [VideoModule, StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const showcase1v3: any = showcase1v3Stories.Default.args;
Default.args = {
  content: {
    source: {
      src: '/assets/video/afterglow.mp4',
      type: 'video/mp4',
    },
    widget: {
      ...showcase1v3.content,
      type: 'showcase-1v3',
      bg: {},
    },
  },
};
