import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { API_URL, CORE_CONFIG, USER } from '@core/token/token-providers';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { Carousel1v2Component } from '@uiux/combs/carousel/carousel1v2/carousel1v2.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { apiUrlFactory, userFactory } from '@core/factory/factory';
import { CryptoJSService } from '@core/service/crypto-js.service';
import { UserService } from '@core/service/user.service';
export default {
  title: '组件/幻灯片/1v2',
  id: 'carousel-1v2',
  component: Carousel1v2Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        WidgetsModule,
        ShareModule,
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
    title: {
      label: 'Gallery',
      style: 'style-v6 line-full-width',
    },
    bg: {
      classes: 'bg-white bg-fill-width',
    },
    sliders: {
      params: {
        slidesPerView: 1.2,
        spaceBetween: 10,
        navigation: false,
        pagination: false,
        breakpoints: {
          600: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          960: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      },
      classes: 'p-bottom',
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
              pagination: false,
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
                  alt: 'alt',
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
              pagination: false,
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
                  alt: 'alt',
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
              pagination: false,
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
                  alt: 'alt',
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
              pagination: false,
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
                  alt: 'alt',
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
              pagination: false,
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
                  alt: 'alt',
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
              pagination: false,
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
                  alt: 'alt',
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
              pagination: false,
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
                  alt: 'alt',
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
              pagination: false,
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
                  alt: 'alt',
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
  },
};
