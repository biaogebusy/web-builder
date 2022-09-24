import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/core.config';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '../../../app/uiux/widgets/widgets.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ShareModule } from '../../../app/share/share.module';
import { ArticleComponent } from '@uiux/combs/node/article/article.component';
import { NodeModule } from '@uiux/combs/node/node.module';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
import { APP_INITIALIZER, Inject } from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { initConfig } from 'src/app/app.module';
export default {
  title: '组件/文章/普通文章',
  component: ArticleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        NodeModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initConfig,
          deps: [AppState, [new Inject(CORE_CONFIG)]],
          multi: true,
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: `通用的普遍文章，一般包含标题和内容相关属性信息，还包括文章相关联的数据等等。`,
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

Default.args = {
  content: {
    title: '使用 DevTools 对 Angular 前端应用性能分析优化',
    banner: {
      img: {
        src: '../assets/images/16-9/nature-08.jpg',
      },
    },
    meta: [
      {
        icon: 'schedule',
        label: '08/01/2022',
      },
      {
        icon: 'folder',
        label: '前端茶馆',
      },
    ],
    body: '在上一篇文章中，有个知友评论说是要 takeUntil 来管理订阅更加清晰明了，那我们就探探究竟。在 Rxjs 中，可以使用 takeUntil 来控制另外一个 Observable 对象数据的产生。使用 takeUntil，上游的数据直接转手给下游，直到takeUntil的参数吐出一个数据或者完结。就像一个水龙头开关，一开始是打开的状态，上游的数据一开始直接流到下游，只要 takeUntil 一旦触发吐出数据，水龙头立刻关闭。利用这点，可以在订阅时时，在管道中添加 takeUntil，在组件销毁时吐出数据，这样这些订阅就会立刻关闭，也就达到回收内存的作用。',
    sidebar: [
      {
        type: 'media-list',
        title: 'POPULAR POSTS',
        elements: [
          {
            link: {
              label: '使用 DevTools 对 Angular 前端应用性能分析优化',
              href: '/node/417',
            },
            img: {
              src: '../assets/images/showcase/blog1-large.jpeg',
              alt: '',
            },
            changed: '2022/01/08',
          },
          {
            link: {
              label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
              href: '/node/415',
            },
            img: {
              src: '../assets/images/showcase/blog2-large.jpeg',
              alt: '',
            },
            changed: '2022/01/03',
          },
          {
            link: {
              label: '你应该了解的 Angular 最佳实践',
              href: '/node/414',
            },
            img: {
              src: '../assets/images/showcase/blog3-large.jpeg',
              alt: '',
            },
            changed: '2022/01/03',
          },
          {
            link: {
              label: 'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
              href: '/node/387',
            },
            img: {
              src: '../assets/images/showcase/blog4-large.jpeg',
              alt: '',
            },
            changed: '2021/05/14',
          },
        ],
      },
      {
        type: 'menu-list',
        title: 'CATEGORIES',
        elements: [
          {
            link: {
              href: '/frontend',
              label: '前端茶馆',
            },
            label: '10',
          },
          {
            link: {
              href: '/drupal',
              label: 'Drupal 自习室',
            },
            label: '6',
          },
        ],
      },
    ],
  },
};

export const Comment = Template.bind({});

Comment.args = {
  content: {
    title: 'DRAG AND DROP LAYOUT',
    params: {
      pay: {
        money: 10,
      },
      require_rule: ['authenticated'],
      comment: {
        type: 'comment--comment',
        attributes: {
          entity_type: 'node',
          field_name: 'comment',
          comment_body: {
            format: 'full_html',
          },
        },
        relationships: {
          comment_type: {
            data: {
              type: 'comment_type--comment_type',
              id: '19c33b19-bfdc-4a26-9c64-af6171b123cb',
            },
          },
          entity_id: {
            data: {
              type: 'node--article',
              id: '{{entity_uuid}}',
            },
          },
        },
      },
    },
    meta: [
      {
        label: '发布日期',
        value: '2021-12-14',
      },
      {
        label: '类别',
        value: '分享',
      },
      {
        label: '关键字',
        value: '纠纷',
      },
    ],
    body: '<img src="/assets/images/showcase/blog1-large.jpeg" /><p><strong style="color:#000">Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit Mauris non laoreet dui, Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa Fusce non ante sed lorem rutrum feugiat, Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Mauris non laoreet dui, Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa Fusce non ante sed lorem rutrum feugiat, Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est</p>',
    editor: {
      action: {
        label: '提交',
      },
      succes: {
        label: '成功发布！',
      },
    },
    actions: [
      {
        type: 'flag',
        label: '收藏',
        icon: {
          name: 'star',
          inline: true,
        },
        params: {
          type: 'flagging--favorite',
          entity_type: 'node',
          entity_id: '1312',
          relationships: {
            flagged_entity: {
              type: 'node--article',
              id: 'cb31d69f-a95e-4c91-97d1-1169f82a10a5',
            },
          },
        },
      },
      {
        type: 'share',
        button: {
          icon: 'share',
          label: '分享',
        },
        params: {
          url: '/',
        },
      },
      {
        type: 'download',
        label: '下载',
        icon: {
          name: 'file_download',
          inline: true,
        },
        elements: [
          {
            type: 'link',
            label: 'Doc',
            icon: {
              name: 'description',
            },
            href: '#',
          },
          {
            type: 'link',
            label: 'Pdf',
            icon: {
              name: 'picture_as_pdf',
            },
            href: '#',
          },
        ],
      },
    ],
  },
};
