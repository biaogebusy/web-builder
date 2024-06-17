import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { PlayerComponent } from '@uiux/widgets/media/player/player.component';
import { IPlayer } from '@core/interface/widgets/IPlayer';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<PlayerComponent> = {
  title: '特色组件/媒体/播放器',
  id: 'player',
  component: PlayerComponent,
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
type Story = StoryObj<PlayerComponent>;
export const Default: Story = {};
const content: IPlayer = {
  type: 'player',
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
