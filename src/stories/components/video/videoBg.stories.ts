import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { VideoBgComponent } from '@uiux/combs/video/video-bg/video-bg.component';
import { DynamicCombsModule } from '@uiux/combs/dynamic-combs/dynamic-combs.module';
export default {
  title: '组件/视频/背景视频',
  component: VideoBgComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        HttpClientModule,
        DynamicCombsModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
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
