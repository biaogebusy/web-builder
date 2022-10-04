import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { API_URL, CORE_CONFIG } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AmapService } from '@core/service/amap.service';
import { ShareModule } from '@share/share.module';
import { ShuffleComponent } from '@uiux/combs/masonry/shuffle/shuffle.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { apiUrlFactory } from '@core/factory/factory';
export default {
  title: '组件/瀑布流/洗牌',
  component: ShuffleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
        SwiperModule,
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
    title: {
      label: 'Our Blog',
      style: 'style-v1',
    },
    filter: [
      {
        label: 'Show All',
        value: 'all',
        selected: true,
      },
      {
        label: 'Design',
        value: 'design',
      },
      {
        label: 'Drupal',
        value: 'drupal',
      },
      {
        label: 'Priting',
        value: 'priting',
      },
    ],
    row: '4',
    elements: [
      {
        type: 'card',
        category: 'design',
        subTitle: '2016/03/04',
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
          label: 'FLAT LOGO DESIGN',
        },
      },
      {
        type: 'card',
        category: 'design',
        subTitle: '2016/02/26',
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
        category: 'drupal,design',
        subTitle: '2016/02/26',
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
        category: 'priting,drupal',
        subTitle: '2016/02/26',
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
        category: 'design,drupal',
        subTitle: '2016/02/26',
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
        category: 'drupal',
        subTitle: '2016/02/26',
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
        category: 'design,priting',
        subTitle: '2016/02/26',
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
        category: 'drupal,priting',
        subTitle: '2016/02/26',
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
