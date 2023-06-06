import { StorysModule } from '@core/module/storys.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BtnVideoComponent } from '@uiux/widgets/actions/btn-video/btn-video.component';

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
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

export const BtnDefault = Template.bind({});
BtnDefault.parameters = {
  controls: {
    include: ['content'],
  },
};
BtnDefault.args = {
  content: {
    type: 'btn-video',
    color: 'primary',
    video: {
      options: {
        controls: true,
        aspectRatio: '16:9',
        poster: '/assets/images/16-9/business-02.jpg',
        sources: [{ src: '/assets/video/afterglow.mp4', type: 'video/mp4' }],
      },
    },
  },
};
