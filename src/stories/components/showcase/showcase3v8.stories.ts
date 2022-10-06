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
import { Showcase3v8Component } from '@uiux/combs/showcase/showcase3v8/showcase3v8.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { apiUrlFactory, userFactory } from '@core/factory/factory';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
export default {
  title: '组件/展示/3v8',
  id: 'showcase-3v8',
  component: Showcase3v8Component,
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
    id: '',
    title: {
      type: 'text',
      spacer: 'sm',
      title: {
        label: '热门职位招聘',
        style: 'style-v1',
      },
      body: '<p class="text-center">甄选热门大厂内推职位，机不可失。',
    },
    bg: {
      classes: 'bg-fill-width',
      img: {
        hostClasses: '',
        src: '/assets/images/illustration/home-shape.png',
        mobile: '/assets/images/illustration/home-shape.png',
      },
    },
    main: {
      img: {
        src: '/assets/images/logo/codepen.svg',
        style: {
          width: '45px',
          height: '45px',
        },
        alt: 'logo',
      },
      css3: true,
      link: {
        label: '前端开发工程师',
        classes: 'bold',
        href: '#',
      },
      subTitle: '字节跳动，北京',
    },
    top: [
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
        link: {
          label: '前端开发工程师',
          classes: 'bold',
          href: '#',
        },
        subTitle: '字节跳动，北京',
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
        link: {
          label: '前端架构师',
          classes: 'bold',
          href: '#',
        },
        subTitle: '美团，广州',
      },
    ],
    bottom: [
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
        link: {
          label: '后端开发',
          classes: 'bold',
          href: '#',
        },
        subTitle: '微软，北京',
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
        link: {
          label: 'UI 设计师',
          classes: 'bold',
          href: '#',
        },
        subTitle: '腾讯，深圳',
      },
    ],
  },
};
