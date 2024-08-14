import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { VideoComponent } from '@uiux/combs/video/video/video.component';
import { IVideo } from '@core/interface/widgets/IVideo';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<VideoComponent> = {
  title: '特色组件/媒体/视频',
  id: 'video',
  component: VideoComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="relative p-x p-y" style="z-index:1">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<VideoComponent>;
export const Default: Story = {};
const content: IVideo = {
  type: 'video',
  options: {
    controls: true,
    aspectRatio: '16:9',
    poster: '/assets/video/poster01.png',
    sources: [
      {
        src: '/assets/video/storybook.mp4',
        type: 'video/mp4',
      },
    ],
  },
};
Default.args = {
  content,
};
