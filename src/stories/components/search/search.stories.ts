import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { SearchModule } from '@uiux/combs/search/search.module';
import { AmapService } from '@core/service/amap.service';
import { ShareModule } from '@share/share.module';
import { SearchComponent } from '@uiux/combs/search/search.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { apiUrlFactory, userFactory } from '@core/factory/factory';
import { SwiperModule } from 'swiper/angular';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { SearchFilterDialogComponent } from '@uiux/combs/search/search-filter-dialog/search-filter-dialog.component';
import { SearchFilterItemComponent } from '@uiux/combs/search/search-filter-dialog/search-filter-item/search-filter-item.component';
export default {
  title: '组件/搜索/默认',
  id: 'search',
  component: SearchComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [
        DialogComponent,
        SearchFilterDialogComponent,
        SearchFilterItemComponent,
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        SwiperModule,
        SearchModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        AmapService,
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
    type: 'search',
    header: {
      bg: {
        classes: 'bg-shadow overlay overlay-80',
        img: {
          hostClasses: 'bg-center',
          src: '/assets/images/hero/1-6.jpg',
          mobile: '/assets/images/mobile/mobile-03.jpg',
        },
      },
      text: {
        title: {
          label: '信使搜索',
          style: 'style-v1',
          classes: 'mat-display-1  text-light',
        },
        spacer: 'xl',
        'style-': {
          width: '50%',
          left: '0%',
          top: '5%',
        },
        body: '<p class="text-center text-light">这里有你想要的答案。</p>',
      },
      input: {
        placeholder: '请输入你的关键词',
      },
    },
    label: {
      clear: '清空',
      filter: '过滤条件',
    },
    sidebar: [
      {
        appearance: 'legacy',
        controlType: 'search',
        key: 'keys',
        label: '关键词',
        type: 'input',
      },
      {
        type: 'select',
        key: 'type',
        mutiple: false,
        label: '内容来源',
        options: [
          {
            label: '无',
            value: null,
          },
          {
            label: '文章',
            value: 'article',
          },
          {
            label: '律所',
            value: 'law_firm',
          },
          {
            label: '律师',
            value: 'lawyer',
          },
          {
            label: '法规库',
            value: 'law',
          },
          {
            label: '活动',
            value: 'event',
          },
          {
            label: '问答',
            value: 'question',
          },
        ],
      },
      {
        type: 'select',
        key: 'content_category',
        label: '内容分类',
        mutiple: true,
        options: [
          {
            label: '无',
            value: null,
          },
          {
            label: '司法解释',
            value: '75',
          },
          {
            label: '政策',
            value: '78',
          },
          {
            label: '法律',
            value: '73',
          },
          {
            label: '法规',
            value: '74',
          },
          {
            label: '规章',
            value: '76',
          },
          {
            label: '规范性',
            value: '77',
          },
          {
            label: '司法解释',
            value: '422',
          },
        ],
      },
      {
        type: 'select',
        key: 'article_category',
        label: '文章分类',
        mutiple: true,
        options: [
          {
            label: '无',
            value: null,
          },
          {
            label: '法律顾问',
            value: '149',
          },
          {
            label: '金融仲裁',
            value: '148',
          },
          {
            label: '金融刑事',
            value: '145',
          },
          {
            label: '金融行政',
            value: '146',
          },
          {
            label: '金融证券',
            value: '417',
          },
          {
            label: '金融诉讼',
            value: '147',
          },
          {
            label: '金融非诉讼',
            value: '150',
          },
        ],
      },
      {
        type: 'checkbox',
        label: '文章<span>50</span>',
        key: 'article',
        value: true,
      },
      {
        type: 'checkbox',
        label: '博客<span>20</span>',
        key: 'blog',
        value: true,
      },
    ],
  },
};

export const FilterDialog = Template.bind({});
FilterDialog.storyName = '弹窗过滤';
FilterDialog.args = {
  content: {
    filterDialog: {
      filter: {
        title: {
          label: '主分类',
          style: 'style-v4',
        },
        params: {
          expand: {
            show: 10,
            less: '收起',
            more: '展开更多',
          },
        },
        key: 'hundred_point',
        elements: [
          {
            label: '财政与税务',
            value: '1',
            dialogFrom: 0,
          },
          {
            label: '一委一行两会',
            value: '2',
            dialogFrom: 0,
          },
          {
            label: '自贸区与一带一路金融',
            value: '3',
            dialogFrom: 0,
          },
          {
            label: '政府与社会资本合作',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '国际投资与外汇',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '全球金融法',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '金融科技与大数据',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '金融单位及政府信息公开',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '基础设施、建工金融',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '房地产金融',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: 'P2P及非法金融',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '投资人并消费者权益保护',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '不良债权处置',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '金融衍生品与创新',
            value: '4',
            dialogFrom: 0,
          },
          {
            label: '金融公司管理与重整',
            value: '4',
            dialogFrom: 0,
          },
        ],
      },
      dialog: [
        {
          title: {
            label: '十大要点',
            style: 'style-v4',
          },
          key: 'search_category',
          actions: [
            {
              type: 'btn',
              label: '生成',
              color: 'primary',
              mode: 'raised',
            },
          ],
          elements: [
            {
              label: '案由分类',
              value: 1,
            },
            {
              label: '合同范本',
              value: 2,
            },
            {
              label: '法律依据',
              value: 3,
            },
            {
              label: '司法判例',
              value: 4,
            },
            {
              label: '合规审查',
              value: 5,
            },
            {
              label: '律师务实',
              value: 6,
            },
            {
              label: '焦点研判',
              value: 7,
            },
            {
              label: '金融数据',
              value: 8,
            },
            {
              label: '智能生成',
              value: 9,
            },
            {
              label: '金融律师',
              value: 10,
            },
          ],
        },
      ],
    },
  },
};
