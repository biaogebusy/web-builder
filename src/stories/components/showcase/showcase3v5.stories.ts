import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { Showcase3v5Component } from '@uiux/combs/showcase/showcase3v5/showcase3v5.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { apiUrlFactory, userFactory } from '@core/factory/factory';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
export default {
  title: '组件/展示/3v5',
  id: 'showcase-3v5',
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
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
        {
          provide: USER,
          useFactory: userFactory,
          deps: [LocalStorageService, CryptoJSService, UserService],
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
          'Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。',
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
