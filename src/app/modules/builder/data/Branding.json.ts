import { formatDate } from '@angular/common';
import { IHeader, IFooter } from '@core/interface/branding/IBranding';
export const defaultHeader: IHeader = {
  params: {
    themeSwitch: true,
    userInfo: true,
    isMegaMenu: false,
    menuHoverOpen: false,
  },
  logo: {
    label: '信使',
    version: false,
    href: '/',
    img: {
      src: '/assets/images/logo/logo-blue.png',
      alt: '信使 logo',
    },
    invert: '/assets/images/logo/logo-white.png',
  },
  top: {
    banner: {
      left: [
        {
          icon: {
            svg: 'tooltip-check-outline',
            inline: true,
          },
          label: 'v5.0.0',
        },
        {
          icon: {
            svg: 'email-outline',
            inline: true,
          },
          label: '349255833@qq.com',
        },
      ],
      right: [
        {
          label: 'zhihu',
          svg: 'zhihu',
          href: 'https://www.zhihu.com/column/c_1331898788731375616',
        },
        {
          label: '微博',
          svg: 'weibo',
          href: 'https://weibo.com/u/1671667514',
        },
        {
          label: 'biaogebusy',
          svg: 'wechat',
          href: '#',
        },
      ],
    },
  },
  mainMenu: [
    {
      label: '首页',
      classes: 'bold',
      href: '/home',
    },
    {
      label: 'Web Builder',
      classes: 'bold',
      href: '/builder',
    },
    {
      label: '模板',
      classes: 'bold',
      href: 'https://ui.builder.design/?path=/story/home-v1--page',
      target: '_blank',
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
};

export const enDefaultHeader: IHeader = {
  params: {
    themeSwitch: true,
    userInfo: true,
    isMegaMenu: false,
    menuHoverOpen: false,
  },
  logo: {
    label: 'Web builder',
    version: false,
    href: '/en/home',
    img: {
      src: '/assets/images/logo/logo-blue.png',
      alt: 'xinshi logo',
    },
    invert: '/assets/images/logo/logo-white.png',
  },
  top: {
    banner: {
      left: [
        {
          icon: {
            svg: 'tooltip-check-outline',
            inline: true,
          },
          label: 'v5.0.0',
        },
        {
          icon: {
            svg: 'email-outline',
            inline: true,
          },
          label: '349255833@qq.com',
        },
      ],
      right: [
        {
          label: 'zhihu',
          svg: 'zhihu',
          href: 'https://www.zhihu.com/column/c_1331898788731375616',
        },
        {
          label: '微博',
          svg: 'weibo',
          href: 'https://weibo.com/u/1671667514',
        },
        {
          label: 'biaogebusy',
          svg: 'wechat',
          href: '#',
        },
      ],
    },
  },
  mainMenu: [
    {
      label: 'Home',
      classes: 'bold',
      href: '/home',
    },
    {
      label: 'Web Builder',
      classes: 'bold',
      href: '/builder',
    },
    {
      label: 'Samples',
      classes: 'bold',
      href: 'https://ui.builder.design/?path=/story/home-v1--page',
      target: '_blank',
    },
  ],
  search: {
    enable: true,
    placeholder: 'key word',
    tooltip: 'Go to search page',
    link: '/search',
    type: 'input',
    key: 'title',
  },
  userMenu: [
    {
      label: 'questions list',
      href: '/questions',
      icon: {
        name: 'list',
      },
    },
  ],
  actions: [
    {
      label: 'Creat Jobs',
      href: '/create-job',
    },
  ],
};

export const manageHeader: IHeader = {
  ...defaultHeader,
  sidebar: {
    params: {
      reqRoles: [],
      showUser: true,
    },
    classes: {
      inverse: true,
    },
    logo: {
      label: '信使',
      version: false,
      href: '/',
      img: {
        src: '/assets/images/logo/logo-blue.png',
      },
    },
    menu: [
      {
        label: '数据看板',
        expanded: true,
        icon: {
          svg: 'poll',
        },
        child: [
          {
            label: 'Dashboard',
            href: '#1',
          },
          {
            label: '文章数据',
            href: '#2',
          },
          {
            label: '用户数据',
            href: '#3',
          },
          {
            label: '投票统计',
            href: '#4',
          },
        ],
      },
      {
        label: '内容管理',
        icon: {
          svg: 'tune-vertical',
        },
        child: [
          {
            label: '着陆页',
            href: '#',
          },
          {
            label: '文章',
            child: [
              {
                label: '新闻',
                href: '#1',
              },
              {
                label: '博客',
                href: '#2',
              },
              {
                label: '专栏',
                href: '#3',
              },
              {
                label: '活动',
                child: [
                  {
                    label: '技术',
                    href: '#1',
                  },
                  {
                    label: '论坛',
                    href: '#2',
                  },
                  {
                    label: '线下',
                    href: '#3',
                  },
                  {
                    label: '合作',
                    href: '#4',
                  },
                ],
              },
            ],
          },
          {
            label: '评论',
            href: '#',
          },
          {
            label: '表单',
            href: '#',
          },
        ],
      },
      {
        label: '审核管理',
        icon: {
          svg: 'map-marker-path',
        },
        child: [
          {
            label: '文章审核',
            href: '#',
          },
          {
            label: '用户审核',
            href: '#',
          },
        ],
      },
      {
        label: '行为分析',
        icon: {
          svg: 'map-marker-path',
        },
        child: [
          {
            label: '事件分析',
            href: '#',
          },
          {
            label: '路径分析',
            href: '#',
          },
        ],
      },
    ],
  },
};

export const HoverHeader: IHeader = {
  params: {
    themeSwitch: true,
    userInfo: true,
    isMegaMenu: false,
    menuHoverOpen: true,
  },
  logo: defaultHeader.logo,
  top: defaultHeader.top,
  mainMenu: defaultHeader.mainMenu,
  search: defaultHeader.search,
  userMenu: defaultHeader.userMenu,
  actions: defaultHeader.actions,
};

export const megaHeader: IHeader = {
  params: {
    themeSwitch: true,
    userInfo: true,
    isMegaMenu: true,
    menuHoverOpen: true,
  },
  logo: defaultHeader.logo,
  top: defaultHeader.top,
  mainMenu: defaultHeader.mainMenu,
  search: defaultHeader.search,
  userMenu: defaultHeader.userMenu,
  actions: defaultHeader.actions,
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
        popup:
          '<img width="112px" src="./assets/images/qrcode-official.jpg" alt="">',
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
];

const fixBar = [
  {
    type: 'popup',
    icon: {
      svg: 'wechat',
    },
    label: '学习交流',
    content: {
      spacer: 'none',
      body: '<p><img height="120" src="/assets/images/wechat.jpg" />',
    },
  },
];

const footerBrandLogo = {
  img: {
    src: '/assets/images/logo/logo-white.png',
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
  form: [
    {
      type: 'input',
      key: 'email',
      props: {
        label: '邮箱地址',
        required: true,
        email: true,
        placeholder: '请输入您的邮箱',
        appearance: 'outline'
      },
    },
  ],
  action: {
    label: '订阅',
  },
};

const footerBottom = {
  left: `©${formatDate(new Date(), 'yyyy', 'en-US')} Copyright XINSHI UI. `,
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

export const footerLight: IFooter = {
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
};

export const footerSimple: IFooter = {
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
};

export const footerInverse: IFooter = {
  params: {
    mode: 'inverse',
    shape: false,
  },
  footerBrand: {
    logo: footerBrandLogo,
    summary:
      '信使 UI 是基于 Material 的 Angular 前端框架， 丰富的组件库可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。',
    social: [
      {
        label: 'zhihu',
        icon: {
          svg: 'zhihu',
        },
        href: 'https://www.zhihu.com/people/biaogebusy',
      },
      {
        label: '微博',
        icon: {
          svg: 'weibo',
        },
        href: 'https://weibo.com/u/1671667514',
      },
      {
        label: 'Github',
        icon: {
          svg: 'github',
        },
        href: 'https://github.com/biaogebusy/web-builder',
      },
    ],
  },
  mainMenu: footerMainMenu,
  mobileMenu: footerMobileMenu,
  footerNewsletter,
  footerBottom,
  fixBar,
};

export const enFooterInverse: IFooter = {
  params: {
    mode: 'inverse',
    shape: false,
  },
  footerBrand: {
    logo: footerBrandLogo,
    summary:
      'Rich component library, complete front-end solution, through Web Builder drag and drop quickly building responsive and multi themes websites.',
    social: [
      {
        label: 'zhihu',
        icon: {
          svg: 'zhihu',
        },
        href: 'https://www.zhihu.com/people/biaogebusy',
      },
      {
        label: '微博',
        icon: {
          svg: 'weibo',
        },
        href: 'https://weibo.com/u/1671667514',
      },
      {
        label: 'Github',
        icon: {
          svg: 'github',
        },
        href: 'https://github.com/biaogebusy/web-builder',
      },
    ],
  },
  mainMenu: footerMainMenu,
  mobileMenu: footerMobileMenu,
  footerNewsletter,
  footerBottom,
  fixBar,
};
