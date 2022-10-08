import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { Card1v2Component } from '@uiux/widgets/card/card1v2/card1v2.component';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { apiUrlFactory, userFactory } from '@core/factory/factory';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
export default {
  title: '基础/卡片/1v2',
  id: 'card-1v2',
  component: Card1v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        WidgetsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: USER,
          useFactory: userFactory,
          deps: [LocalStorageService, CryptoJSService, UserService],
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div fxFlex="50%" class="position-relative">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Base = Template.bind({});
Base.args = {
  content: {
    link: {
      href: '#',
      label: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
    },
    subTitle: '多语言',
    img: {
      href: '#',
      src: '/assets/images/showcase/card-1v2-1.jpg',
      alt: 'alt',
    },
    bg: {
      classes: 'object-fit',
      img: {
        hostClasses: '',
        src: '/assets/images/showcase/pattern-01.png',
      },
    },
  },
};
