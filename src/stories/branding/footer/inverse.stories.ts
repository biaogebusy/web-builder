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
      mode: 'inverse',
      shape: true,
    },
    footerBrand: {
      logo: {
        img: {
          src: '/assets/images/logo.png',
          alt: '信使 Demo',
          href: '/',
          classes: 'logo',
        },
      },
      summary:
        '信使围绕 Drupal jsonapi 为核心的 Angular 前端框架，分享 Drupal 优秀的数字创新体验。',
      social: [
        {
          label: 'zhihu',
          svg: 'zhihu',
          href: 'https://www.zhihu.com/column/c_1331898788731375616',
        },
        {
          label: '微博',
          svg: 'weibo',
          href: '#',
        },
        {
          label: 'nnitpay',
          svg: 'wechat',
          href: '#',
        },
        {
          label: 'Github',
          svg: 'github',
          href: 'https://github.com/biaogebusy/xinshi-angular',
        },
      ],
    },
    mainMenu: [
      {
        label: '相关资源',
        child: [
          {
            label: 'Angular 中文站',
            icon: 'arrow_right',
            href: 'https://angular.cn/',
            target: '_blank',
          },
          {
            label: 'Material Angular',
            icon: 'arrow_right',
            href: 'https://material.angular.io/',
            target: '_blank',
          },
          {
            label: 'Flex Layout',
            icon: 'arrow_right',
            href: 'https://github.com/angular/flex-layout/wiki',
            target: '_blank',
          },
          {
            label: 'JSONAPI',
            icon: 'arrow_right',
            href: 'https://jsonapi.org/format/',
            target: '_blank',
          },
        ],
      },
      {
        label: '帮助',
        child: [
          {
            label: 'Angular 中文站',
            icon: 'github',
            href: 'https://github.com/biaogebusy/nnitpay-angular',
            target: '_blank',
          },
          {
            label: 'Drupal 自习室',
            icon: 'offiaccount',
            href: 'https://www.zhihu.com/column/c_1331898788731375616',
            target: '_blank',
          },
          {
            label: '前端茶馆',
            icon: 'zhihu',
            href: 'https://www.zhihu.com/column/frontend-focus',
            target: '_blank',
          },
          {
            label: 'Drupal 中文模块',
            icon: 'github',
            href: 'https://github.com/biaogebusy/drupal-modules-cn',
            target: '_blank',
          },
        ],
      },
    ],
    mobileMenu: [
      {
        label: '相关资源',
        child: [
          {
            label: 'Material Angular',
            icon: 'arrow_right',
            href: 'https://material.angular.io/',
            target: '_blank',
          },
          {
            label: 'Flex Layout',
            icon: 'arrow_right',
            href: 'https://github.com/angular/flex-layout/wiki',
            target: '_blank',
          },
          {
            label: 'JSONAPI',
            icon: 'arrow_right',
            href: 'https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/jsonapi',
            target: '_blank',
          },
        ],
      },
      {
        label: '帮助',
        child: [
          {
            label: 'Angular 中文站',
            icon: 'github',
            href: 'https://angular.cn/',
            target: '_blank',
          },
          {
            label: 'Drupal 自习室',
            icon: 'offiaccount',
            href: 'https://www.zhihu.com/column/c_1331898788731375616',
            target: '_blank',
          },
          {
            label: '前端茶馆',
            icon: 'zhihu',
            href: 'https://www.zhihu.com/column/frontend-focus',
            target: '_blank',
          },
          {
            label: 'Drupal 中文模块',
            icon: 'github',
            href: 'https://github.com/biaogebusy/drupal-modules-cn',
            target: '_blank',
          },
        ],
      },
    ],
    footerNewsletter: {
      params: {
        webform_id: 'subscribe',
      },
      label: '资讯',
      summary: '欢迎使用邮箱订阅最新的公告和产品。',
      forms: [
        {
          type: 'input',
          label: 'Your email:',
          key: 'email',
          params: {
            required: true,
            email: true,
          },
          placeholder: 'Your email:',
          hint: '请输入邮箱',
          error: '邮箱地址无效',
        },
      ],
      action: {
        label: '订阅',
      },
    },
    footerBottom: {
      left: "Copyright ©2021 Powered By Xinshi <a href='https://beian.miit.gov.cn/'>桂ICP备2020009081号-1</a>",
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
  title: '页头页脚/页脚/反色',
  id: 'footer-inverse',
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
        反色风格
        ##
        "params": {
          "mode": "inverse",
          "shape": true,
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
