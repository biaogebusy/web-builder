import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BtnVideoComponent } from '@uiux/widgets/actions/btn-video/btn-video.component';
import * as playerStory from '../../feature/media/Player.stories';

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

Default.args = {
  content: {
    type: 'btn-video',
    color: 'primary',
    video: {
      ...play,
    },
  },
};
