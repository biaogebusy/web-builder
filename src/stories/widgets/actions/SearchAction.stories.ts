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
  CORE_CONFIG,
  PAGE_CONTENT,
  THEME,
  USER,
} from '@core/token/token-providers';
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
import { SearchActionComponent } from '@uiux/widgets/actions/search-action/search-action.component';

export default {
  title: '基础/Actions/搜索控件',
  id: 'search-action',
  component: SearchActionComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ShareModule,
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
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `搜索控件可以让人到页面的组件当中，提交时会路由到/search页面并带上queryParams参数，所以search页面要做好router queryParams 的订阅。`,
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
// Raname Story
Default.storyName = '预览';
Default.args = {
  content: {
    type: 'search-action',
    button: {
      label: '搜索',
      color: 'primary',
    },
    form: [
      {
        type: 'select',
        key: 'skill',
        label: '技能',
        options: [
          {
            label: '无',
            value: '',
          },
          {
            label: 'Angular',
            value: '170',
          },
          {
            label: 'React',
            value: '162',
          },
          {
            label: 'Vue',
            value: '167',
          },
        ],
      },
      {
        type: 'select',
        key: 'cms',
        label: 'CMS',
        options: [
          {
            label: '无',
            value: '',
          },
          {
            label: 'Drupal',
            value: '170',
          },
          {
            label: 'WP',
            value: '162',
          },
          {
            label: 'Joomla',
            value: '167',
          },
        ],
      },
      {
        type: 'input',
        key: 'keys',
        placeholder: '请输入关键词搜索',
        controlType: 'search',
        label: '关键词',
        appearance: 'legacy',
      },
    ],
  },
};
