import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { PlayerComponent } from '@uiux/widgets/media/player/player.component';
import { IPlayer } from '@core/interface/widgets/IPlayer';

const meta: Meta<MyComponent> = {
  title: '特色组件/媒体/播放器',
  id: 'player',
  component: PlayerComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="relative p-x p-y" style="z-index:1">${story}</div>`,
    ),
  ],
};

export default meta;
type Story = StoryObj<MyComponent>;
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
