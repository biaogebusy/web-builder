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
import { TaxonomyListComponent } from '@uiux/combs/list/taxonomy-list/taxonomy-list.component';
import { ListModule } from '@uiux/combs/list/list.module';
import { TaxonomyThinListComponent } from '@uiux/combs/list/taxonomy-thin-list/taxonomy-thin-list.component';
export default {
  title: 'Components/list/taxonomy thin list',
  component: TaxonomyThinListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        ListModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
} as Meta;

const Template: Story<TaxonomyThinListComponent> = (args) => ({
  component: TaxonomyThinListComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    params: {
      type: 'article',
      taxonomy: 'search_category',
      page: '20',
    },
    sidebar: [
      {
        type: 'menu-list',
        title: '内容分类',
        elements: [
          {
            link: {
              href: '',
              label: 'Angular',
            },
            label: '8',
          },
          {
            link: {
              href: '',
              label: 'Drupal',
            },
            label: '5',
          },
        ],
      },
      {
        type: 'menu-list',
        title: '文章分类',
        elements: [
          {
            link: {
              href: '',
              label: '新闻',
            },
            label: '8',
          },
          {
            link: {
              href: '',
              label: '技术',
            },
            label: '5',
          },
        ],
      },
    ],
    pager: {
      itemsPerPage: '20',
    },
    elements: [
      {
        type: 'list-thin',
        link: {
          label: '使用 DEVTOOLS 对 ANGULAR 前端应用性能分析优化',
          href: '/',
        },
        meta: [
          {
            label: 'Johnson',
          },
          {
            label: '2021-08-28',
          },
        ],
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
      {
        type: 'list-thin',
        link: {
          label: '使用 TAKEUNTIL 操作符管理 ANGULAR 组件的订阅',
          href: '/',
        },
        meta: [
          {
            label: 'Johnson',
          },
          {
            label: '2021-08-28',
          },
        ],
        actions: [
          {
            type: 'flag',
            label: '收藏',
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
            params: {
              url: '/',
            },
          },
          {
            type: 'download',
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
      {
        type: 'list-thin',
        link: {
          label: '你应该了解的 ANGULAR 最佳实践',
          href: '/',
        },
        meta: [
          {
            label: 'Johnson',
          },
          {
            label: '2021-08-28',
          },
        ],
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
    ],
  },
};
