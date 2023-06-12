import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase2v1Component } from '@uiux/combs/showcase/showcase2v1/showcase2v1.component';
import { StorysModule } from '@core/module/storys.module';

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
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = 'Card';
Default.args = {
  content: {
    type: 'showcase-2v1',
    text: {
      title: {
        label: '国内 Drupal 优秀网站案例',
        style: 'style-v1',
        classes: 'mat-display-0 bold',
      },
      body: '<p class="text-center">欢迎分享 Drupal 优秀的数字创新体验</p>',
    },
    row: 5,
    elements: [
      {
        type: 'card',
        subTitle: '2022/03/04',
        avatar: {
          src: '/assets/images/showcase/weather.png',
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
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        subTitle: '2022/02/26',
        avatar: {
          src: '/assets/images/showcase/browser.png',
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
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        subTitle: '2022/02/26',
        avatar: {
          src: '/assets/images/showcase/clipboard.png',
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
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        subTitle: '2022/02/26',
        avatar: {
          src: '/assets/images/showcase/console.png',
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
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        subTitle: '2022/02/26',
        avatar: {
          src: '/assets/images/showcase/weather.png',
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
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        subTitle: '2022/02/26',
        avatar: {
          src: '/assets/images/showcase/weather.png',
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
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        subTitle: '2022/02/26',
        avatar: {
          src: '/assets/images/showcase/weather.png',
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
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        subTitle: '2022/02/26',
        avatar: {
          src: '/assets/images/showcase/weather.png',
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
          label: 'FLAT LOGO DESIGN',
        },
      },
    ],
  },
};

export const Card1v1 = Template.bind({});
Card1v1.storyName = 'Card 1v1';
Card1v1.args = {
  content: {
    type: 'showcase-2v1',
    text: {
      title: {
        label: '最新活动',
        style: 'style-v1',
        classes: 'mat-display-0 bold',
      },
      body: '<p class="text-center">欢迎分享 Drupal 优秀的数字创新体验，前端开发分享，欢迎交流！</p>',
    },
    row: 4,
    elements: [
      {
        type: 'card-1v1',
        link: {
          href: '#',
          label: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
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
        moreLabel: '查看更多',
      },
      {
        type: 'card-1v1',
        link: {
          href: '#',
          label: '使用 DEVTOOLS 对 ANGULAR 前端应用性能分析优化',
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
        moreLabel: '查看更多',
      },
      {
        type: 'card-1v1',
        link: {
          href: '#',
          label: '你应该了解的 ANGULAR 最佳实践',
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
        moreLabel: '查看更多',
      },
    ],
  },
};

export const Card1v1FromApi = Template.bind({});
Card1v1FromApi.storyName = 'From api';
Card1v1FromApi.args = {
  content: {
    type: 'showcase-2v1',
    text: {
      title: {
        label: '最新活动',
        style: 'style-v1',
        classes: 'mat-display-0 bold',
      },
      body: '<p class="text-center">欢迎分享 Drupal 优秀的数字创新体验，前端开发分享，欢迎交流！</p>',
    },
    row: 4,
    params: {
      api: '/api/v1/blog',
      widget: 'card-1v1',
    },
  },
};
