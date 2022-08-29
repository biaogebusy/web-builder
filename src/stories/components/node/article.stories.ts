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
export default {
  title: 'Components/node/article',
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
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
} as Meta;

const Template: Story<ArticleComponent> = (args) => ({
  component: ArticleComponent,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    title: 'DRAG AND DROP LAYOUT',
    banner: {
      img: {
        src: '../assets/images/16-9/nature-08.jpg',
      },
    },
    meta: [
      {
        icon: 'person',
        label: 'editor',
      },
      {
        icon: 'schedule',
        label: '12/09/2021',
      },
      {
        icon: 'folder',
        label: 'category',
      },
    ],
    body: '<img src="/assets/images/showcase/blog1-large.jpeg" /><p><strong style="color:#000">Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit Mauris non laoreet dui, Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa Fusce non ante sed lorem rutrum feugiat, Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Mauris non laoreet dui, Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa Fusce non ante sed lorem rutrum feugiat, Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est</p>',
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
    sidebar: [
      {
        type: 'media-list',
        title: 'POPULAR POSTS',
        elements: [
          {
            link: {
              label: 'Drag and Drop Layout',
              href: '#',
            },
            img: {
              src: '../assets/images/showcase/blog1-large.jpeg',
              alt: '',
            },
            changed: '2021/02/07',
          },
          {
            link: {
              label: 'Drag and Drop Layout',
              href: '#',
            },
            img: {
              src: '../assets/images/showcase/blog2-large.jpeg',
              alt: '',
            },
            changed: '2021/02/07',
          },
          {
            link: {
              label: 'Drag and Drop Layout',
              href: '#',
            },
            img: {
              src: '../assets/images/showcase/blog3-large.jpeg',
              alt: '',
            },
            changed: '2021/02/07',
          },
          {
            link: {
              label: 'Drag and Drop Layout',
              href: '#',
            },
            img: {
              src: '../assets/images/showcase/blog4-large.jpeg',
              alt: '',
            },
            changed: '2021/02/07',
          },
        ],
      },
      {
        type: 'menu-list',
        title: 'CATEGORIES',
        elements: [
          {
            link: {
              href: '#',
              label: 'Desige',
            },
            label: '3',
          },
          {
            link: {
              href: '#',
              label: 'Drupal',
            },
            label: '3',
          },
          {
            link: {
              href: '#',
              label: 'Video',
            },
            label: '2',
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
