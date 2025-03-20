import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { ListModule } from '@uiux/combs/list/list.module';
import { TaxonomyThinListComponent } from '@uiux/combs/list/taxonomy-thin-list/taxonomy-thin-list.component';
import { StorysModule } from '@core/module/storys.module';
import { ITaxonomyThinList } from '@core/interface/combs/IList';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<TaxonomyThinListComponent> = {
  title: '复合组件/列表/分类列表（thin）',
  id: 'taxonomy-thin-list',
  component: TaxonomyThinListComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({}),
    componentWrapperDecorator(story => `${story}`),
  ],
};

export default meta;
type Story = StoryObj<TaxonomyThinListComponent>;
export const Default: Story = {};
const content: ITaxonomyThinList = {
  type: 'taxonomy-thin-list',
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
};
Default.args = {
  content,
};
