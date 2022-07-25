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
import { Showcase3v5Component } from '@uiux/combs/showcase/showcase3v5/showcase3v5.component';
export default {
  title: 'Components/showcase/3v5',
  component: Showcase3v5Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        HttpClientModule,
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

const Template: Story<Showcase3v5Component> = (args) => ({
  component: Showcase3v5Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'showcase-3v5',
    id: '',
    title: {
      type: 'text',
      spacer: 'sm',
      title: {
        label: 'App Features',
        style: 'style-v1',
      },
      body: '<p class="text-center">Start working with xinshi that can provide everything you need to generate awareness, drive traffic, connect.</p>',
    },
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    img: {
      src: '/assets/images/illustration/27.png',
      alt: 'OUR FEATURES',
    },
    elements: [
      {
        icon: {
          name: 'verified_user',
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: 'Use On Any Device',
        },
        content:
          'Composed in a pseudo-Latin language which more or less pseudo-Latin language corresponds.',
      },
      {
        icon: {
          name: 'verified_user',
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: 'Feather Icons',
        },
        content:
          'There are many variations of demo text passed sages of Lorem Ipsum available the majority.',
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: 'Retina Ready',
        },
        content:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: 'W3c Valid Code',
        },
        content:
          'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ',
      },
      {
        icon: {
          name: 'favorite',
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: 'Fully Responsive',
        },
        content:
          'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
      },
      {
        icon: {
          name: 'android',
        },
        style: 'style-v8',
        title: {
          href: '#',
          label: 'Browser Compatibility',
        },
        content:
          'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.',
      },
    ],
  },
};
