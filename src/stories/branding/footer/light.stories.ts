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
      mode: 'light',
    },
    logo: {
      label: '远方信使',
    },
    copyRight: 'Copyright by XinShi',
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
      {
        label: '社区',
        child: [
          {
            label: 'Drupal 自习室',
            icon: 'offiaccount',
            popup:
              '<img width="112px" src="./assets/images/qrcode.jpg" alt="">',
          },
          {
            label: 'Drupal 主题开发',
            icon: 'wechat',
            popup:
              '<img width="112px" src="./assets/images/wechat.jpg" alt="">',
          },
          {
            label: '南宁IT派',
            icon: 'offiaccount',
            popup:
              '<img width="112px" src="./assets/images/wechat.jpg" alt="">',
          },
        ],
      },
    ],
    mobileMenu: [
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
  title: '页头页脚/页脚/浅色',
  id: 'footer-light',
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
