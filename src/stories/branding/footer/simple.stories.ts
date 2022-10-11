import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import {
  API_URL,
  BRANDING,
  CORE_CONFIG,
  PAGE_CONTENT,
  THEME,
  USER,
} from '@core/token/token-providers';
import { of } from 'rxjs';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import {
  apiUrlFactory,
  brandingFactory,
  coreConfigFactory,
  pageContentFactory,
  themeFactory,
  userFactory,
} from '@core/factory/factory';
import { ContentService } from '@core/service/content.service';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { ContentState } from '@core/mobx/ContentState';
import { BrandingModule } from '@core/branding/branding.module';
import { IBranding } from '@core/interface/IBranding';
import { FooterComponent } from '@core/branding/footer/footer.component';
const branding: IBranding = {
  footer: {
    params: {
      mode: 'space-between',
      shape: false,
    },
    footerBrand: {
      logo: {
        img: {
          src: '/assets/images/logo.png',
          alt: '信使',
          href: '/',
          classes: 'logo',
        },
      },
    },
    content: {
      left: {
        spacer: 'none',
        body: '<p class="m-bottom-0"><strong>地址：</strong>南宁市创客城</p><p class="m-bottom-0"><strong>微信：</strong> biaogebusy</p>',
      },
      middle: {
        spacer: 'none',
        body: '',
      },
    },
    footerBottom: {
      left: 'Copyright ©2021 xinshi',
      right: [
        {
          label: '首页',
          href: '/',
        },
        {
          label: '关于我们',
          href: '/about',
        },
        {
          label: '帮助中心',
          href: '#',
        },
        {
          label: '联系我们',
          href: '#',
        },
        {
          label: '常用网站',
          href: '#',
        },
      ],
    },
    fixBar: [
      {
        type: 'link',
        href: '#',
        target: '_blank',
        icon: {
          name: 'chat',
        },
        label: '在线客服',
      },
      {
        type: 'popup',
        icon: {
          svg: 'wechat',
        },
        label: '咨询合作',
        content: {
          spacer: 'none',
          body: '<p><img height="120" src="/assets/images/wechat.jpg" />',
        },
      },
    ],
  },
};
export default {
  title: '页头页脚/页脚/简单',
  id: 'footer-simple',
  component: FooterComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
        BrandingModule,
        WidgetsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: APP_INITIALIZER,
          useFactory: coreConfigFactory,
          deps: [ContentService, [new Inject(CORE_CONFIG)]],
          multi: true,
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
        {
          provide: THEME,
          useFactory: themeFactory,
          deps: [[new Inject(CORE_CONFIG)], LocalStorageService],
        },
        {
          provide: PAGE_CONTENT,
          useFactory: pageContentFactory,
          deps: [ActivatedRoute, ContentService, ContentState],
        },
        {
          provide: BRANDING,
          useValue: of(branding),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
        <div style="min-height:100vh">
          ${story}
        </div>
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
        浅色风格
        ##
        "params": {
          "mode": "light"
        }
        `,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = '预览';
Default.parameters = {
  docs: {
    source: {
      code: JSON.stringify(branding),
      language: 'json',
      type: 'auto',
    },
  },
};
