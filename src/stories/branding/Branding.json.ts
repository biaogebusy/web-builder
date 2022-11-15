import { IBranding } from '../../app/core/interface/IBranding';
export const defaultHeader: IBranding = {
  header: {
    params: {
      themeSwitch: true,
      userInfo: true,
      isMegaMenu: false,
      menuHoverOpen: false,
    },
    logo: {
      label: '信使',
      version: true,
      href: '/',
    },
    top: {
      banner: {
        left: [
          {
            icon: 'call',
            label: '(123)456-7890',
          },
          {
            icon: 'email',
            label: 'service@zhaobg.com',
          },
        ],
        right: [
          {
            label: '关于',
            href: '/about',
          },
          {
            label: '公益',
            href: '/',
          },
          {
            label: '活动',
            href: '/events',
          },
          {
            label: 'nnitpay',
            svg: 'wechat',
            href: '#',
          },
        ],
      },
    },
    mainMenu: [
      {
        label: '内推',
        classes: 'bold',
        href: '/lists/jobs',
      },
      {
        label: '自习室',
        classes: 'bold',
        href: '/lists/blog',
        params: {
          reqRoles: [],
        },
        queryParams: {
          demo: '466',
        },
        fragment: 'title',
      },
      {
        label: '案例',
        classes: 'bold',
        href: '/lists/cases',
      },
      {
        label: '组件库',
        classes: 'bold for-test',
        child: [
          {
            label: 'Hero',
            child: [
              {
                label: 'Hero 1v1',
                href: '/sample/combs/hero/hero1v1',
              },
              {
                label: 'Hero 1v2',
                href: '/sample/combs/hero/hero1v2',
              },
              {
                label: 'Hero 2v1',
                href: '/sample/combs/hero/hero2v1',
              },
              {
                label: 'Hero 2v2',
                href: '/sample/combs/hero/hero2v2',
              },
              {
                label: 'Hero 2v3',
                href: '/sample/combs/hero/hero2v3',
              },
            ],
          },
          {
            label: 'Showcase',
            child: [
              {
                label: 'Showcase 1v1',
                href: '/sample/combs/showcase/showcase1v1',
              },
              {
                label: 'Showcase 1v2',
                href: '/sample/combs/showcase/showcase1v2',
              },
              {
                label: 'Showcase 1v3',
                href: '/sample/combs/showcase/showcase1v3',
              },
              {
                label: 'Showcase 2v1',
                href: '/sample/combs/showcase/showcase2v1',
              },
              {
                label: 'Showcase 2v2',
                href: '/sample/combs/showcase/showcase2v2',
              },
              {
                label: 'Showcase 2v3',
                href: '/sample/combs/showcase/showcase2v3',
              },
              {
                label: 'Showcase 2v4',
                href: '/sample/combs/showcase/showcase2v4',
              },
              {
                label: 'Showcase 2v5',
                href: '/sample/combs/showcase/showcase2v5',
              },
              {
                label: 'Showcase 2v6',
                href: '/sample/combs/showcase/showcase2v6',
              },
              {
                label: 'Showcase 3v1',
                href: '/sample/combs/showcase/showcase3v1',
              },
              {
                label: 'Showcase 3v2',
                href: '/sample/combs/showcase/showcase3v2',
              },
              {
                label: 'Showcase 3v3',
                href: '/sample/combs/showcase/showcase3v3',
              },
              {
                label: 'Showcase 3v4',
                href: '/sample/combs/showcase/showcase3v4',
              },
              {
                label: 'Showcase 3v5',
                href: '/sample/combs/showcase/showcase3v5',
              },
              {
                label: 'Showcase 3v6',
                href: '/sample/combs/showcase/showcase3v6',
              },
              {
                label: 'Showcase 3v7',
                href: '/sample/combs/showcase/showcase3v7',
              },
              {
                label: 'Showcase 3v8',
                href: '/sample/combs/showcase/showcase3v8',
              },
              {
                label: 'Showcase 4v1',
                href: '/sample/combs/showcase/showcase4v1',
              },
            ],
          },
          {
            label: 'Carousel',
            href: 'javascript:void(0)',
            child: [
              {
                label: 'Carousel 1v1',
                href: '/sample/combs/carousel/carousel1v1',
              },
              {
                label: 'Carousel 1v2',
                href: '/sample/combs/carousel/carousel1v2',
              },
              {
                label: 'Carousel 1v3',
                href: '/sample/combs/carousel/carousel1v3',
              },
              {
                label: 'Carousel 1v4',
                href: '/sample/combs/carousel/carousel1v4',
              },
              {
                label: 'Carousel 2v1',
                href: '/sample/combs/carousel/carousel2v1',
              },
              {
                label: 'Carousel 2v2',
                href: '/sample/combs/carousel/carousel2v2',
              },
              {
                label: 'Line Year',
                href: '/sample/combs/carousel/lineyear',
              },
            ],
          },
          {
            label: 'Node',
            href: 'javascript:void(0)',
            child: [
              {
                label: 'Case',
                href: '/sample/node/case',
              },
              {
                label: 'Law Case',
                href: '/sample/node/law-case',
              },
              {
                label: 'Law Meeting',
                href: '/sample/node/law-meeting',
              },
              {
                label: 'Law Project',
                href: '/sample/node/law-project',
              },
              {
                label: 'Law Tab',
                href: '/sample/node/law-tab',
              },
              {
                label: 'article',
                href: '/sample/node/article',
              },
              {
                label: 'article v1 with comment',
                href: '/sample/node/article-v1',
              },
              {
                label: '问答',
                href: '/sample/node/question',
              },
              {
                label: 'User center lxy',
                href: '/sample/combs/profile/user-center-lxy',
              },
              {
                label: 'User center amigo',
                href: '/sample/combs/profile/user-center-amigo',
              },
              {
                label: 'Profile 1v1',
                href: '/sample/combs/profile/profile1v1',
              },
              {
                label: 'Profile 1v1 judge',
                href: '/sample/combs/profile/profile1v1-judge',
              },
              {
                label: 'Profile 1v1 handler',
                href: '/sample/combs/profile/profile1v1-handler',
              },
              {
                label: 'Profile 1v1 customer',
                href: '/sample/combs/profile/profile1v1-customer',
              },
              {
                label: 'Profile 1v1 court',
                href: '/sample/combs/profile/profile1v1-court',
              },
              {
                label: 'Dynamic Media List',
                href: '/sample/list/dynamic-media-list',
              },
              {
                label: 'Dynamic Card List',
                href: '/sample/list/dynamic-card-list',
              },
              {
                label: 'Dynamic Card List 1v1',
                href: '/sample/list/dynamic-card-list-1v1',
              },
              {
                label: 'Taxonomy list',
                href: '/sample/list/taxonomy-list',
              },
              {
                label: 'Taxonomy thin list',
                href: '/sample/list/taxonomy-thin-list',
              },
              {
                label: 'Tree list',
                href: '/sample/list/tree-list',
              },
              {
                label: 'Search',
                href: '/sample/combs/search/search',
              },
              {
                label: 'Search filter dialog',
                href: '/sample/combs/search/search-filter-dialog',
              },
            ],
          },
          {
            label: 'Widgets',
            href: 'javascript:void(0)',
            child: [
              {
                label: '通用文本组件',
                href: '/sample/widgets/text',
              },
              {
                label: 'Tab',
                href: '/sample/widgets/tab',
              },
              {
                label: 'View List',
                href: '/sample/list/view-list',
              },
              {
                label: 'View List Formly',
                href: '/sample/list/view-list-formly',
              },
              {
                label: 'Tab View List',
                href: '/sample/widgets/tab-view-list',
              },
              {
                label: 'Panel',
                href: '/sample/widgets/panel',
              },
              {
                label: 'Widgets',
                href: '/sample/widgets',
              },
            ],
          },
          {
            label: 'Action',
            href: 'javascript:void(0)',
            child: [
              {
                label: 'Action 1v1',
                href: '/sample/combs/action/action1v1',
              },
            ],
          },
          {
            label: 'Map',
            href: 'javascript:void(0)',
            child: [
              {
                label: 'Location',
                href: '/sample/combs/map/location',
              },
              {
                label: 'Map list v1',
                href: '/sample/combs/map/map-list-v1',
              },
            ],
          },
          {
            label: 'Other',
            href: 'javascript:void(0)',
            child: [
              {
                label: 'Shuffle',
                href: '/sample/combs/masonry/shuffle',
              },
              {
                label: 'Packery',
                href: '/sample/combs/masonry/packery',
              },
              {
                label: 'Packery content box',
                href: '/sample/combs/masonry/packery-content-box',
              },
              {
                label: 'Video bg',
                href: '/sample/combs/video/videobg',
              },
              {
                label: 'Banner',
                href: '/sample/combs/banner/banner-simple',
              },
              {
                label: 'Why Choose Us',
                href: '/sample/combs/other/whychooseus',
              },
              {
                label: 'Contact us',
                href: '/sample/combs/other/contact',
              },
              {
                label: 'Full calendar',
                href: '/sample/combs/calendar/full-calendar',
              },
              {
                label: 'Auto Close Page',
                href: '/sample/combs/other/autoclose',
              },
            ],
          },
          {
            label: 'Calculator',
            child: [
              {
                label: 'Lottery',
                href: '/sample/combs/calculator/lottery',
              },
            ],
          },
        ],
      },
      {
        label: '关于我们',
        classes: 'bold',
        href: '/sample/combs/other/contact',
        fragment: 'form',
      },
    ],
    search: {
      enable: true,
      placeholder: '请输入关键词',
      tooltip: '回车进入综合搜索页面',
      link: '/search',
      type: 'input',
      key: 'title',
    },
    userMenu: [
      {
        label: '发布问题',
        icon: {
          name: 'edit',
        },
        dialog: {
          content: [
            {
              type: 'input',
              key: 'title',
              label: '标题',
              placeholder: '请输入问题',
              params: {
                required: true,
              },
              errorMes: '问题必填',
            },
            {
              type: 'textarea',
              key: 'body',
              label: '问题描述',
              placeholder: '请输入问题描述（可选）',
            },
          ],
          actions: [
            {
              label: '发布问题',
              color: 'primary',
              params: {
                type: 'question',
                snackMes: '您的问题已经发布',
              },
            },
          ],
        },
      },
      {
        label: '问题列表',
        href: '/questions',
        icon: {
          name: 'list',
        },
      },
    ],
    actions: [
      {
        label: '发布职位',
        href: '/create-job',
      },
    ],
  },
};

const defaultHeaderParams: any = defaultHeader.header;
export const HoverHeader: IBranding = {
  header: {
    params: {
      themeSwitch: true,
      userInfo: true,
      isMegaMenu: false,
      menuHoverOpen: true,
    },
    logo: defaultHeaderParams.logo,
    top: defaultHeaderParams.top,
    mainMenu: defaultHeaderParams.mainMenu,
    search: defaultHeaderParams.search,
    userMenu: defaultHeaderParams.userMenu,
    actions: defaultHeaderParams.actions,
  },
};

export const megaHeader: IBranding = {
  header: {
    params: {
      themeSwitch: true,
      userInfo: true,
      isMegaMenu: true,
      menuHoverOpen: true,
    },
    logo: defaultHeaderParams.logo,
    top: defaultHeaderParams.top,
    mainMenu: defaultHeaderParams.mainMenu,
    search: defaultHeaderParams.search,
    userMenu: defaultHeaderParams.userMenu,
    actions: defaultHeaderParams.actions,
  },
};

const footerMainMenu = [
  {
    label: '相关资源',
    child: [
      {
        label: 'Angular 中文站',
        icon: 'arrow_right',
        href: 'https://angular.cn/',
        target: '_blank',
      },
      {
        label: 'Material Angular',
        icon: 'arrow_right',
        href: 'https://material.angular.io/',
        target: '_blank',
      },
      {
        label: 'Flex Layout',
        icon: 'arrow_right',
        href: 'https://github.com/angular/flex-layout/wiki',
        target: '_blank',
      },
      {
        label: 'JSONAPI',
        icon: 'arrow_right',
        href: 'https://jsonapi.org/format/',
        target: '_blank',
      },
    ],
  },
  {
    label: '帮助',
    child: [
      {
        label: 'Angular 中文站',
        icon: 'github',
        href: 'https://github.com/biaogebusy/nnitpay-angular',
        target: '_blank',
      },
      {
        label: 'Drupal 自习室',
        icon: 'offiaccount',
        href: 'https://www.zhihu.com/column/c_1331898788731375616',
        target: '_blank',
      },
      {
        label: '前端茶馆',
        icon: 'zhihu',
        href: 'https://www.zhihu.com/column/frontend-focus',
        target: '_blank',
      },
      {
        label: 'Drupal 中文模块',
        icon: 'github',
        href: 'https://github.com/biaogebusy/drupal-modules-cn',
        target: '_blank',
      },
    ],
  },
  {
    label: '社区',
    child: [
      {
        label: 'Drupal 自习室',
        icon: 'offiaccount',
        popup: '<img width="112px" src="./assets/images/qrcode.jpg" alt="">',
      },
      {
        label: 'Drupal 主题开发',
        icon: 'wechat',
        popup: '<img width="112px" src="./assets/images/wechat.jpg" alt="">',
      },
      {
        label: '南宁IT派',
        icon: 'offiaccount',
        popup: '<img width="112px" src="./assets/images/wechat.jpg" alt="">',
      },
    ],
  },
];

const footerMobileMenu = [
  {
    label: '相关资源',
    child: [
      {
        label: 'Angular 中文站',
        icon: 'arrow_right',
        href: 'https://angular.cn/',
        target: '_blank',
      },
      {
        label: 'Material Angular',
        icon: 'arrow_right',
        href: 'https://material.angular.io/',
        target: '_blank',
      },
      {
        label: 'Flex Layout',
        icon: 'arrow_right',
        href: 'https://github.com/angular/flex-layout/wiki',
        target: '_blank',
      },
      {
        label: 'JSONAPI',
        icon: 'arrow_right',
        href: 'https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/jsonapi',
        target: '_blank',
      },
    ],
  },
  {
    label: '帮助',
    child: [
      {
        label: 'Angular 中文站',
        icon: 'github',
        href: 'https://github.com/biaogebusy/nnitpay-angular',
        target: '_blank',
      },
      {
        label: 'Drupal 自习室',
        icon: 'offiaccount',
        href: 'https://www.zhihu.com/column/c_1331898788731375616',
        target: '_blank',
      },
      {
        label: '前端茶馆',
        icon: 'zhihu',
        href: 'https://www.zhihu.com/column/frontend-focus',
        target: '_blank',
      },
      {
        label: 'Drupal 中文模块',
        icon: 'github',
        href: 'https://github.com/biaogebusy/drupal-modules-cn',
        target: '_blank',
      },
    ],
  },
];

const fixBar = [
  {
    type: 'link',
    href: '#',
    target: '_blank',
    icon: {
      name: 'chat',
    },
    label: '在线客服',
  },
  {
    type: 'popup',
    icon: {
      svg: 'wechat',
    },
    label: '咨询合作',
    content: {
      spacer: 'none',
      body: '<p><img height="120" src="/assets/images/wechat.jpg" />',
    },
  },
];

const footerBrandLogo = {
  img: {
    src: '/assets/images/logo.png',
    alt: '信使',
    href: '/',
    classes: 'logo',
  },
};

const footerNewsletter = {
  params: {
    webform_id: 'subscribe',
  },
  label: '资讯',
  summary: '欢迎使用邮箱订阅最新的公告和产品。',
  forms: [
    {
      type: 'input',
      label: '邮箱地址',
      key: 'email',
      params: {
        required: true,
        email: true,
      },
      placeholder: '请输入您的邮箱',
      hint: '请输入邮箱',
      error: '邮箱地址无效',
    },
  ],
  action: {
    label: '订阅',
  },
};

const footerBottom = {
  left: '© 2022 Copyright ❤️ XINSHI. ',
  right: [
    {
      label: '首页',
      href: '/',
    },
    {
      label: '关于我们',
      href: '/about',
    },
    {
      label: '帮助中心',
      href: '#',
    },
    {
      label: '联系我们',
      href: '#',
    },
  ],
};

export const footerLight: IBranding = {
  footer: {
    params: {
      mode: 'light',
    },
    logo: {
      label: '远方信使',
    },
    copyRight: 'Copyright by XinShi',
    mainMenu: footerMainMenu,
    mobileMenu: footerMobileMenu,
    fixBar,
  },
};

export const footerSimple: IBranding = {
  footer: {
    params: {
      mode: 'space-between',
      shape: false,
    },
    footerBrand: {
      logo: footerBrandLogo,
    },
    content: {
      left: {
        spacer: 'none',
        body: '<p class="m-bottom-0"><strong>地址：</strong>南宁市创客城</p><p class="m-bottom-0"><strong>微信：</strong> biaogebusy</p>',
      },
      middle: {
        spacer: 'none',
        body: '',
      },
    },
    footerBottom,
    fixBar,
  },
};

export const footerInverse: IBranding = {
  footer: {
    params: {
      mode: 'inverse',
      shape: true,
    },
    footerBrand: {
      logo: footerBrandLogo,
      summary:
        '信使围绕 Drupal jsonapi 为核心的 Angular 前端框架，分享 Drupal 优秀的数字创新体验。',
      social: [
        {
          label: 'zhihu',
          svg: 'zhihu',
          href: 'https://www.zhihu.com/column/c_1331898788731375616',
        },
        {
          label: '微博',
          svg: 'weibo',
          href: '#',
        },
        {
          label: 'nnitpay',
          svg: 'wechat',
          href: '#',
        },
        {
          label: 'Github',
          svg: 'github',
          href: 'https://github.com/biaogebusy/xinshi-angular',
        },
      ],
    },
    mainMenu: footerMainMenu,
    mobileMenu: footerMobileMenu,
    footerNewsletter,
    footerBottom,
    fixBar,
  },
};
