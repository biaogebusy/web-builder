import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { VideoBgComponent } from '@uiux/combs/video/video-bg/video-bg.component';
import { StorysModule } from '@core/storys.module';

export default {
  title: '组件/视频/背景视频',
  id: 'video-bg',
  component: VideoBgComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
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

Default.args = {
  content: {
    type: 'video-bg',
    source: {
      src: '/assets/video/afterglow.mp4',
      type: 'video/mp4',
    },
    widget: {
      type: 'showcase-1v3',
      title: {
        label: 'VIDEO BACKGROUND',
        style: 'style-v1',
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
          body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.Stet clita kasd gubergren.',
        },
      ],
      actions: [
        {
          label: 'Read more',
          href: '#',
          style: 'style-v1',
          icon: 'verified_user',
        },
        {
          label: 'Learn more',
          href: '#',
          style: 'style-v1',
          icon: 'fingerprint',
        },
      ],
    },
  },
};
