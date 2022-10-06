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
import { Showcase3v6Component } from '@uiux/combs/showcase/showcase3v6/showcase3v6.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { apiUrlFactory, userFactory } from '@core/factory/factory';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
export default {
  title: '组件/展示/3v6',
  id: 'showcase-3v6',
  component: Showcase3v6Component,
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
    type: 'showcase-3v6',
    id: '',
    title: {
      type: 'text',
      spacer: 'sm',
      title: {
        label: '为所有开发者、所有应用场景而设计',
        style: 'style-v1',
      },
      body: '<p class="text-center">让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。</p>',
    },
    bg: {
      classes: 'bg-light bg-fill-width',
    },
    row: '4',
    elements: [
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '响应式设计',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '基于 Material',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',

          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: 'Icon 库',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',

          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '使用 Sass 构建',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',

          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: 'W3C 验证',
      },
      {
        img: {
          src: '/assets/images/logo/codepen.svg',
          style: {
            width: '45px',
            height: '45px',
          },
          alt: 'logo',
        },
        css3: true,
        title: '易于扩展',
      },
    ],
  },
};

export const Background = Template.bind({});

Background.args = {
  content: {
    ...Default.args.content,
    bg: {
      classes: 'bg-shadow bg-fill-width',
    },
    row: '3',
    action: {
      label: 'Read more',
      href: '#',
      style: 'style-v1',
      icon: 'open_in_new',
    },
  },
};
