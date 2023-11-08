import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { VideoBgComponent } from '@uiux/combs/video/video-bg/video-bg.component';
import { StorysModule } from '@core/module/storys.module';
import { VideoModule } from '@uiux/combs/video/video.module';
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
const content: IVideoBg = {
  type: 'video-bg',
  source: {
    src: '/assets/video/storybook.mp4',
    type: 'video/mp4',
  },
  bg: {
    classes: 'bg-fill-width overlay overlay-80',
  },
  classes: '',
  elements: [
    {
      type: 'showcase-1v3',
      title: {
        label: 'Storybook 是什么？',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      classes: 'text-light',
      elements: [
        {
          type: 'text',
          spacer: 'none',
          style: {
            margin: '0 auto',
            'text-align': 'center',
            width: '600px',
          },
          body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文，Storybook是一个用于开发和展示UI组件的工具。',
          actionsAlign: 'center center',
          actions: [
            {
              label: '了解更多',
              type: 'btn-animate',
              href: '#',
              style: 'style-v1',
              icon: 'verified_user',
            },
            {
              label: '回到官网',
              type: 'btn-animate',
              href: '#',
              style: 'style-v1',
              icon: 'fingerprint',
            },
          ],
        },
      ],
    },
  ],
};
Default.args = {
  content,
};
