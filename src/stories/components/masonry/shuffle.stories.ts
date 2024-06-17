import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { ShuffleComponent } from '@uiux/combs/masonry/shuffle/shuffle.component';
import { sleep, StorysModule } from '@core/module/storys.module';
import { IShuffle } from '@core/interface/combs/IMasonry';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<ShuffleComponent> = {
  title: '复合组件/瀑布流/图片洗牌',
  id: 'shuffle',
  component: ShuffleComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<ShuffleComponent>;
export const Default: Story = {};
const content: IShuffle = {
  type: 'shuffle',
  title: {
    label: 'Vue 开发',
    style: 'style-v1',
  },
  bg: {
    classes: '',
  },
  classes: '',
  filter: [
    {
      label: '全部',
      value: 'all',
      selected: true,
    },
    {
      label: '设计',
      value: 'design',
    },
    {
      label: 'CMS',
      value: 'cms',
    },
    {
      label: '框架',
      value: 'frontEnd',
    },
  ],
  row: 4,
  elements: [
    {
      type: 'card',
      category: 'design',
      subTitle: '2022/12/08',
      avatar: {
        src: '/assets/images/avatar/01.jpeg',
        alt: '',
      },
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto1.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: '初学者构建用户界面的指南',
      },
    },
    {
      type: 'card',
      category: 'design',
      subTitle: '2022/11/23',
      avatar: {
        src: '/assets/images/avatar/02.jpeg',
        alt: '',
      },
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto2.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: '5个理由说明为什么Vue.js是你下个项目的最佳选择',
      },
    },
    {
      type: 'card',
      category: 'cms,design',
      subTitle: '2022/10/15',
      avatar: {
        src: '/assets/images/avatar/03.jpeg',
        alt: '',
      },
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto3.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: 'Vuex：在Vue.js应用中管理状态',
      },
    },
    {
      type: 'card',
      category: 'frontEnd,drupal',
      subTitle: '2022/09/05',
      avatar: {
        src: '/assets/images/avatar/04.jpeg',
        alt: '',
      },
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto4.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: 'Vue Router：使用Vue.js构建单页应用程序',
      },
    },
    {
      type: 'card',
      category: 'design,cms',
      subTitle: '2022/08/20',
      avatar: {
        src: '/assets/images/avatar/05.jpeg',
        alt: '',
      },
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto5.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: 'Vue.js组件：最佳实践和技巧',
      },
    },
    {
      type: 'card',
      category: 'cms',
      subTitle: '2022/07/10',
      avatar: {
        src: '/assets/images/avatar/06.jpeg',
        alt: '',
      },
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto6.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: '使用TypeScript与Vue.js：完整指南',
      },
    },
    {
      type: 'card',
      category: 'design,frontEnd',
      subTitle: '2022/06/05',
      avatar: {
        src: '/assets/images/avatar/01.jpeg',
        alt: '',
      },
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto7.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: 'Vue.js性能优化技巧',
      },
    },
    {
      type: 'card',
      category: 'drupal,frontEnd',
      subTitle: '2022/05/15',
      avatar: {
        src: '/assets/images/avatar/02.jpeg',
        alt: '',
      },
      carousel: {
        params: {
          slidesPerView: 1,
          navigation: false,
          autoplay: {
            delay: 5000,
          },
          breakpoints: null,
        },
        elements: [
          {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto8.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: '将Vue.js与Node.js后端集成',
      },
    },
  ],
};
Default.args = {
  content,
};
