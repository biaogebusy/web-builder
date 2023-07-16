import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase2v1Component } from '@uiux/combs/showcase/showcase2v1/showcase2v1.component';
import { StorysModule } from '@core/module/storys.module';
import { formatDate } from '@angular/common';
import { IShowcase2v1 } from '@core/interface/combs/IShowcase';

export default {
  title: '特色组件/展示 Showcase/2v1',
  id: 'showcase-2v1',
  component: Showcase2v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = 'Card';
const content: IShowcase2v1 = {
  type: 'showcase-2v1',
  text: {
    title: {
      label: 'Drupal 优秀案例',
      style: 'style-v1',
      classes: 'mat-display-3 bold',
    },
    body: '<p class="text-center">欢迎分享 Drupal 优秀的数字创新体验</p>',
  },
  bg: { classes: '' },
  classes: '',
  row: 5,
  elements: [
    {
      type: 'card',
      subTitle: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
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
            hoverIcon: true,
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
          {
            type: 'feature-box',
            hoverIcon: false,
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
        label: '哈佛大学',
      },
    },
    {
      type: 'card',
      subTitle: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
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
            hoverIcon: false,
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/cases/porto9.jpg',
              alt: 'lazyload',
            },
          },
        ],
      },
      link: {
        href: '/node/1',
        label: '斯坦福大学',
      },
    },
    {
      type: 'card',
      subTitle: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
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
            hoverIcon: false,
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
        label: '牛津大学',
      },
    },
    {
      type: 'card',
      subTitle: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
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
            hoverIcon: false,
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
        label: '麻省理工学院',
      },
    },
    {
      type: 'card',
      subTitle: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
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
            hoverIcon: false,
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
        label: '加州大学伯克利分校',
      },
    },
    {
      type: 'card',
      subTitle: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
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
            hoverIcon: false,
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
        label: '爱丁堡大学',
      },
    },
    {
      type: 'card',
      subTitle: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
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
            hoverIcon: false,
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
        label: '多伦多大学',
      },
    },
    {
      type: 'card',
      subTitle: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
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
            hoverIcon: false,
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
        label: '墨尔本大学',
      },
    },
  ],
};

Default.args = {
  content,
};

export const Card1v1 = Template.bind({});
Card1v1.storyName = 'Card 1v1';
const card1v1: IShowcase2v1 = {
  type: 'showcase-2v1',
  row: 4,
  bg: { classes: '' },
  classes: '',
  text: {
    title: {
      label: '最新课程',
      style: 'style-v1',
      classes: 'mat-display-0 bold',
    },
    body: '<p class="text-center">欢迎分享 Drupal 优秀的数字创新体验，新上好课！</p>',
  },
  elements: [
    {
      type: 'card-1v1',
      link: {
        href: '#',
        label: '自主搭建5个精品脚手架，助力前端研发全流程提效',
      },
      user: '表歌',
      time: '2022/09/27',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        img: {
          classes: 'object-fit',
          src: '/assets/images/16-9/business-01.jpg',
          alt: 'alt',
        },
      },
      moreLabel: '立即学习',
    },
    {
      type: 'card-1v1',
      link: {
        href: '#',
        label: '2022全新 Node.js+Express+Koa2 开发Web Server博客',
      },
      user: '表歌',
      time: '2022/09/27',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        img: {
          classes: 'object-fit',
          src: '/assets/images/16-9/business-02.jpg',
          alt: 'alt',
        },
      },
      moreLabel: '立即学习',
    },
    {
      type: 'card-1v1',
      link: {
        href: '#',
        label: '国家级认证-软考高级，一站式通关课程，全力备战2022',
      },
      user: '表歌',
      time: '2022/09/27',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        img: {
          classes: 'object-fit',
          src: '/assets/images/16-9/business-03.jpg',
          alt: 'alt',
        },
      },
      moreLabel: '立即学习',
    },
    {
      type: 'card-1v1',
      link: { href: '#', label: '基于 Vue3 ，打造前台+中台通用提效解决方案' },
      user: '表歌',
      time: '2022/09/27',
      feature: {
        fullIcon: 'fullscreen',
        openIcon: 'open_in_new',
        link: '#',
        ratios: 'media-4-3',
        img: {
          classes: 'object-fit',
          src: '/assets/images/16-9/business-04.jpg',
          alt: 'alt',
        },
      },
      moreLabel: '立即学习',
    },
  ],
};

Card1v1.args = {
  content: card1v1,
};
