import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockComponent } from '@uiux/combs/block/block/block.component';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { of } from 'rxjs';
import { BRANDING } from '@core/token/token-providers';
import { defaultHeader, footerInverse } from '../../branding/Branding.json';

export default {
  title: '示例页面/首页示例/01 经典布局',
  id: 'home-v1',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [BlockModule, BrandingModule, StorysModule.forRoot()],
      providers: [
        {
          provide: BRANDING,
          useValue: of({
            ...defaultHeader,
            ...footerInverse,
          }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      <app-header></app-header>
      ${story}
      <app-footer></app-footer>
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';
const content = of({
  title: '首页 | v1',
  meta: [
    {
      name: 'description',
      content:
        '信使是一个基于戴文 Dyniva 开源模块，围绕 Drupal jsonapi 为核心的 Angular 前端框架，分享 Drupal 优秀的数字创新体验。',
    },
    {
      name: 'keywords',
      content: 'angular,drupal,jsonapi,信使',
    },
  ],
  body: [
    {
      type: 'hero-1v1',
      spacer: 'none',
      classes: 'text-light text-center',
      sliders: {
        params: {
          slidesPerView: 1,
          spaceBetween: 0,
          pagination: false,
        },
        elements: [
          {
            type: 'text',
            spacer: 'xl',
            title: {
              label: 'Angular Latest Version ',
              style: 'style-v1',
              classes: 'mat-display-3',
            },
            classes: 'xy-center',
            style: {
              width: '50%',
            },
            bg: {
              classes: 'bg-shadow  overlay overlay-80',
              img: {
                src: '/assets/images/hero/1-3.jpg',
                mobile: '/assets/images/hero/1-3.jpg',
              },
            },
            body: '<p>信使使用 Angular 最新稳定的版本开发，提供强大而优秀的底层框架。</p>\r\n',
            actionsAlign: 'center center',
            actions: [
              {
                href: 'https://angular.cn/',
                label: '了解更多',
              },
            ],
          },
          {
            type: 'text',
            spacer: 'xl',
            title: {
              label: 'JSONAPI ',
              style: 'style-v1',
              classes: 'mat-display-3',
            },
            classes: 'xy-center',
            style: {
              width: '50%',
            },
            bg: {
              classes: 'bg-shadow  overlay overlay-80',
              img: {
                src: '/assets/images/hero/1-6.jpg',
                mobile: '/assets/images/hero/1-6.jpg',
              },
            },
            body: '<p>依托 JSONAPI 统一的接口规范</p>\r\n',
            actionsAlign: 'center center',
            actions: [
              {
                href: 'https://jsonapi.org/format/',
                label: '了解更多',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'showcase-1v1',
      spacer: 'lg',
      classes: 'features-absolute',
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      row: 4,
      elements: [
        {
          icon: {
            name: 'verified_user',
          },
          style: 'style-v9',
          title: {
            href: 'https://www.drupal.org',
            label: 'Drupal 官网',
          },
          content: '<p>搜索下载第三方贡献模块和主题等</p>\r\n',
          more: {
            href: 'https://www.drupal.org',
            label: '了解更多',
          },
        },
        {
          icon: {
            name: 'favorite',
          },
          style: 'style-v9',
          title: {
            href: 'https://material.angular.io/',
            label: 'Material UI',
          },
          content: '<p>Google 出品的高质量 Angular UI</p>\r\n',
          more: {
            href: 'https://material.angular.io/',
            label: '了解更多',
          },
        },
        {
          icon: {
            name: 'fingerprint',
          },
          style: 'style-v9',
          title: {
            href: 'https://jsonapi.org/format/',
            label: 'JSONAPI',
          },
          content: '<p>通过标准的API接口，提高开发效率</p>\r\n',
          more: {
            href: 'https://jsonapi.org/format/',
            label: '了解更多',
          },
        },
      ],
    },
    {
      type: 'showcase-3v2',
      spacer: 'xl',
      bg: {
        classes: 'bg-fill-width overlay overlay-',
        img: {
          src: '/assets/images/bg/home-shape.png',
          hostClasses: '',
        },
      },
      elements: [
        {
          img: {
            src: '/assets/images/illustration/23.png',
            alt: '',
          },
          content: {
            title: {
              label: '快速创建优秀数字创新体验',
              style: 'style-v4',
              classes: 'mat-display-1',
            },
            actions: [
              {
                type: 'btn-animate',
                label: '了解更多',
                href: '/home',
                style: 'style-v1',
                icon: 'open_in_new',
              },
            ],
            body: '<p>Drupal 拥有数万个贡献模块和上千套主题，基于这些贡献模块和主题快速构建应用原型，为客户搭建应用价值的可行性。</p>\r\n\r\n<ul class="list-done">\r\n\t<li>47194 个贡献模块</li>\r\n\t<li>2960 套主题</li>\r\n\t<li>1392 套发行版</li>\r\n</ul>\r\n',
          },
        },
      ],
    },
    {
      type: 'showcase-4v1',
      spacer: 'xl',
      text: {
        title: {
          label: 'Drupal 数据',
          style: 'style-v1',
          classes: 'mat-display-1 bold',
        },
      },
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      elements: [
        {
          icon: {
            name: 'settings',
          },
          digit: {
            value: 47194,
            label: '个',
          },
          title: '贡献模块',
        },
        {
          icon: {
            name: 'camera',
          },
          digit: {
            value: 2960,
            label: '个',
          },
          title: '主题',
        },
        {
          icon: {
            name: 'filter_vintage',
          },
          digit: {
            value: 1392,
            label: '套',
          },
          title: '发行版',
        },
        {
          icon: {
            name: 'security',
          },
          digit: {
            value: 9,
            label: 'Version',
          },
          title: '最新内核',
        },
      ],
    },
    {
      type: 'carousel-2v1',
      spacer: 'lg',
      title: {
        label: '信使主要贡献人员',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      bg: {
        classes: ' bg-fill-width',
        img: {
          src: '/assets/images/16-9/nature-08.jpg',
        },
      },
      sliders: {
        params: {
          slidesPerView: 1,
          pagination: true,
          autoplay: {
            delay: 5000,
          },
        },
        classes: 'p-bottom',
        elements: [
          {
            type: 'testimonial',
            style: 'style-v2',
            title: '表歌',
            subTitle: '前端开发',
            img: {
              src: '/assets/images/avatar/01.jpeg',
              alt: '',
            },
            body: '专注前端开发领域，多年 Drupal 前端开发经验，微信公众号：Drupal 自习室 维护者。',
          },
          {
            type: 'testimonial',
            style: 'style-v2',
            title: '骗人的鱼',
            subTitle: '后端开发',
            img: {
              src: '/assets/images/avatar/02.jpeg',
              alt: '',
            },
            body: 'Drupal 后端开发多年，拥有丰富的 Drupal 项目开发经验',
          },
        ],
      },
    },
    {
      type: 'showcase-2v1',
      text: {
        title: {
          label: '特色功能',
          style: 'style-v1',
          classes: 'mat-display-1 bold',
        },
      },
      elements: [
        {
          type: 'card',
          subTitle: 'Material UI 有完善的主题颜色系统，有优秀的性能和用户体验',
          link: {
            href: 'javascript:void(0);',
            label: 'Material UI',
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
                hoverIcon: 0,
                fullIcon: 'fullscreen',
                ratios: 'media-16-9',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/badge.scene.png',
                  alt: 'badge.scene_.png',
                },
              },
            ],
          },
        },
        {
          type: 'card',
          subTitle: '提供了足够丰富的布局 API，响应式适配各种设备视口尺寸',
          link: {
            href: 'javascript:void(0);',
            label: 'Flex Layout',
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
                hoverIcon: 0,
                fullIcon: 'fullscreen',
                ratios: 'media-16-9',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/grid-list.scene.png',
                  alt: 'grid-list.scene_.png',
                },
              },
            ],
          },
        },
        {
          type: 'card',
          subTitle: '可切换内建的自定义主题，可自定义符合品牌的颜色主题',
          link: {
            href: 'javascript:void(0);',
            label: '支持多种颜色主题',
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
                hoverIcon: 0,
                fullIcon: 'fullscreen',
                ratios: 'media-16-9',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/form-field.scene.png',
                  alt: 'Blueprint_for_MWS_2000x1520.jpeg',
                },
              },
            ],
          },
        },
        {
          type: 'card',
          subTitle: '使用AOT编译和懒加载使你的应用反应更快速',
          link: {
            href: 'javascript:void(0);',
            label: 'AOT + Lazy Loading',
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
                hoverIcon: 0,
                fullIcon: 'fullscreen',
                ratios: 'media-16-9',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/menu.scene.png',
                  alt: 'Reg_Page_Video_Image_Watch_Now.jpeg',
                },
              },
            ],
          },
        },
      ],
    },
    {
      type: 'video-bg',
      spacer: 'sm',
      source: {
        src: '/assets/video/afterglow.mp4',
        type: 'video/mp4',
      },
      widget: {
        type: 'showcase-1v3',
        title: {
          label: 'Drupal 自习室',
          style: 'style-v1',
          classes: 'mat-display-1 bold',
        },
        classes: 'text-light',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            style: {
              margin: '0 auto',
              'text-align': 'center',
              width: '600px',
            },
            body: '<p class="text-align-center">欢迎加入 Drupal 自习室微信交流群，分享主题开发和模块设计，快来享受Drupal优秀的数字创新体验，滑到底部扫码加入：）</p>\r\n',
          },
        ],
        actions: [
          {
            label: '关于我们',
            href: '/about',
            style: 'style-v1',
            icon: 'favorite',
          },
        ],
      },
    },
    {
      type: 'showcase-3v6',
      id: '',
      title: {
        title: {
          label: '为响应式而设计',
          style: 'style-v1',
          classes: 'mat-display-1 bold',
        },
        body: '<p class="text-align-center">信使让构建应用更加简单快捷，即使没有开发经验的建站者也可以快速上手。</p>\r\n',
        spacer: 'md',
        type: 'text',
      },
      bg: {
        classes: 'bg-light bg-fill-width',
      },
      row: '3',
      elements: [
        {
          img: {
            src: '',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: '',
          },
          css3: true,
          link: {
            href: 'https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/jsonapi',
            label: 'Drupal JSONAPI',
            classes: 'bold',
          },
        },
        {
          img: {
            src: '',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: '',
          },
          css3: true,
          link: {
            label: '多颜色主题',
            classes: 'bold',
          },
        },
        {
          img: {
            src: '',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: '',
          },
          css3: true,
          link: {
            label: '使用 Sass 预编译',
            classes: 'bold',
          },
        },
        {
          img: {
            src: '',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: '',
          },
          css3: true,
          link: {
            label: '支持暗黑风格',
            classes: 'bold',
          },
        },
        {
          img: {
            src: '',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: '',
          },
          css3: true,
          link: {
            label: '易于定制',
            classes: 'bold',
          },
        },
        {
          img: {
            src: '',
            style: {
              width: '45px',
              height: '45px',
            },
            alt: '',
          },
          css3: true,
          link: {
            label: '内置丰富的组件',
            classes: 'bold',
          },
        },
      ],
    },
    {
      type: 'shuffle',
      spacer: 'lg',
      title: {
        label: '最新文章',
        style: 'style-v1',
        classes: 'mat-display-1 bold',
      },
      filter: [
        {
          label: 'All',
          value: 'all',
          selected: true,
        },
        {
          label: '前端茶馆',
          value: '前端茶馆',
        },
        {
          label: 'Drupal 自习室',
          value: 'Drupal 自习室',
        },
      ],
      row: '4',
      elements: [
        {
          type: 'card',
          category: '前端茶馆',
          subTitle: '2022-01-08',
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
                link: '/node/417',
                ratios: 'media-4-3',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/1-1/business-02.png',
                  alt: 'lazyload',
                },
              },
            ],
          },
          link: {
            href: '/node/417',
            label: '使用 DevTools 对 Angular 前端应用性能分析优化',
          },
        },
        {
          type: 'card',
          category: 'Drupal 自习室',
          subTitle: '2022-01-03',
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
                link: '/node/415',
                ratios: 'media-4-3',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/1-1/business-04.png',
                  alt: 'lazyload',
                },
              },
            ],
          },
          link: {
            href: '/node/415',
            label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
          },
        },
        {
          type: 'card',
          category: '前端茶馆',
          subTitle: '2022-01-03',
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
                link: '/node/414',
                ratios: 'media-4-3',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/1-1/animal-01.jpg',
                  alt: 'lazyload',
                },
              },
            ],
          },
          link: {
            href: '/node/414',
            label: '你应该了解的 Angular 最佳实践',
          },
        },
        {
          type: 'card',
          category: '前端茶馆',
          subTitle: '2021-05-14',
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
                link: '/node/387',
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
            href: '/node/387',
            label: 'Angular 5 rxjs 5.5.2 多个 http 并行 forkJoin 请求',
          },
        },
      ],
    },
    {
      type: 'text',
      spacer: 'xl',
      body: '<p class="text-align-center">基于 Drupal jsonapi 为核心，使用 Angular 来快速搭建用户体验优先的前端主题。</p>\r\n\r\n<div class="text-center"><br><img alt="Drupal自习室" data-align="center" data-entity-type="file" data-entity-uuid="b82fa893-a20b-4ea8-b562-ec620e977eea" src="/assets/images/wechat.jpg" /></div>\r\n\r\n<p>&nbsp;</p>\r\n',
    },
  ],
});
Page.args = {
  pageContent$: content,
};
