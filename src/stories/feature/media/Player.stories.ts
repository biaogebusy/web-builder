import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { PlayerComponent } from '@uiux/widgets/media/player/player.component';
import { IPlayer } from '@core/interface/widgets/IPlayer';

export default {
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
        `<div class="relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
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
