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
import { ViewListComponent } from '@uiux/widgets/view-list/view-list.component';

export default {
  title: '基础/View 视图列表',
  id: 'view-list',
  component: ViewListComponent,
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
        component: `View List 组件顾名思义是针对 Drupal view 视图进行配置的组件，通过 View 配置出数据的REST api，配置出下拉菜单选项的 api，根据这些 view api 来动态读取和筛选数据的组件。`,
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
Default.parameters = {
  controls: {
    include: ['content', 'canShow', 'form', 'table'],
  },
};
Default.args = {
  canShow: true,
  content: {
    type: 'view-list',
    spacer: 'none',
    params: {
      apiType: '/api/v1/event',
    },
    header: [
      {
        label: '标题',
        key: 'title',
      },
      {
        label: 'Url',
        key: 'url',
      },
      {
        label: '图片',
        key: 'image',
      },
      {
        label: '内容',
        key: 'body',
      },
      {
        label: '用户',
        key: 'user',
      },
    ],
    form: [
      {
        type: 'input',
        key: 'title',
        templateOptions: {
          label: '标题',
        },
      },
      {
        type: 'mat-select',
        key: 'user',
        templateOptions: {
          multiple: true,
          search: true,
          hideSelected: true,
          label: '用户',
          options: [
            { value: 1, label: 'Johnson' },
            { value: 2, label: '表歌' },
            { value: 3, label: '小南' },
          ],
        },
      },
      {
        type: 'date-range',
        key: 'date',
        templateOptions: {
          label: '期间',
          value: '',
          placeholder: '选择发布日期',
        },
        fieldGroup: [
          {
            type: 'input',
            key: 'start',
            placeholder: '开始',
          },
          {
            type: 'input',
            key: 'end',
            placeholder: '结束',
          },
        ],
      },
      {
        type: 'input',
        key: 'page',
        className: 'display-none',
        templateOptions: {
          label: '页码',
        },
      },
    ],
  },
};
