import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { CORE_CONFIG } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TaxonomyListComponent } from '@uiux/combs/list/taxonomy-list/taxonomy-list.component';
import { ListModule } from '@uiux/combs/list/list.module';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
export default {
  title: '组件/列表/分类列表',
  component: TaxonomyListComponent,
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
        component: `分类列表一般用在分类术语上，该列表聚合了该分类下的所属文章列表。`,
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
    pager: {
      itemsPerPage: 20,
    },
    elements: [
      {
        type: 'showcase-3v3',
        title: {
          label: 'Blog title for sample',
          href: '#',
        },
        spacer: 'none',
        showImage: true,
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          img: {
            classes: 'object-fit',
            src: '/assets/images/cases/porto1.jpg',
            alt: 'alt',
          },
        },
        date: '12/09/2016',
        commentCount: '2',
        category: 'Design',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Mauris non laoreet dui, Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa Fusce non ante sed lorem rutrum feugiat, Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est',
        details: {
          label: 'Read more',
          href: '#',
          style: 'style-v1',
          icon: 'open_in_new',
        },
      },
      {
        type: 'showcase-3v3',
        spacer: 'none',
        title: {
          label: 'DRAG AND DROP LAYOUT',
          href: '#',
        },
        showImage: true,
        feature: {
          fullIcon: 'fullscreen',
          openIcon: 'open_in_new',
          link: '#',
          img: {
            classes: 'object-fit',
            src: '/assets/images/cases/porto2.jpg',
            alt: 'alt',
          },
        },
        date: '12/09/2016',
        commentCount: '2',
        category: 'Design',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Mauris non laoreet dui, Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa Fusce non ante sed lorem rutrum feugiat, Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est',
        details: {
          label: 'Read more',
          href: '#',
          style: 'style-v1',
          icon: 'open_in_new',
        },
      },
    ],
    sidebar: [
      {
        type: 'media-list',
        title: '热门文章',
        elements: [
          {
            link: {
              label: '使用 DevTools 对 Angular 前端应用性能分析优化',
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
              label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
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
              label: '你应该了解的 Angular 最佳实践',
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
              label: 'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
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
        title: '\u5206\u7c7b',
        elements: [
          {
            link: {
              href: '/frontend',
              label: '\u524d\u7aef\u8336\u9986',
            },
            label: '8',
          },
          {
            link: {
              href: '/drupal',
              label: 'Drupal \u81ea\u4e60\u5ba4',
            },
            label: '5',
          },
        ],
      },
    ],
  },
};
