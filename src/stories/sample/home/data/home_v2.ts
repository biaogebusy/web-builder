export const home_v2 = {
  title: '首页 v2',
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'keywords',
      content: '',
    },
  ],
  config: {
    headerMode: {
      transparent: true,
      style: 'light',
    },
  },
  body: [
    {
      type: 'hero-2v3',
      id: 'xxx',
      spacer: 'lg',
      shape: true,
      bg: {
        classes: 'bg-center',
        img: {
          hostClasses: 'bg-center',
          src: '/assets/images/bg/bg-04.png',
        },
      },
      classes: '',
      text: {
        title: {
          label: '开源项目使用 Github actions 自动化',
          style: 'none',
          classes: 'mat-display-1',
        },
        spacer: 'none',
        body: '<p>Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p>',
      },
      row: 6,
      elements: [
        {
          img: {
            src: '/assets/images/svg/health.svg',
            href: '/',
          },
          link: {
            href: '/',
            label: '高性能',
          },
        },
        {
          img: {
            src: '/assets/images/svg/term-life.svg',
            href: '/',
          },
          link: {
            href: '/',
            label: '易用的编辑器',
          },
        },
        {
          img: {
            src: '/assets/images/svg/family-health.svg',
            href: '/',
          },
          link: {
            href: '/',
            label: '多语言',
          },
        },
        {
          img: {
            src: '/assets/images/svg/investment.svg',
            href: '/',
          },
          link: {
            href: '/',
            label: '更有弹性',
          },
        },
        {
          img: {
            src: '/assets/images/svg/car.svg',
            href: '/',
          },
          link: {
            href: '/',
            label: '安全性',
          },
        },
        {
          img: {
            src: '/assets/images/svg/bike.svg',
            href: '/',
          },
          link: {
            href: '/',
            label: '无障碍访问',
          },
        },
      ],
    },
    {
      type: 'showcase-1v1',
      title: {
        label:
          '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
        style: 'style-v3',
      },
      row: 3,
      bg: {
        classes: 'bg- bg-fill-width',
      },
      classes: '',
      style: 'style-v3',
      elements: [
        {
          type: 'box',
          icon: {
            name: 'verified_user',
          },
          style: 'style-v3',
          title: {
            href: '/?path=/story/guide--page',
            label: '丰富的组件库',
          },
          content: '常用的组件库，和三十多个基组件',
          more: {
            href: '/?path=/story/builder--default',
            label: '更多',
          },
        },
        {
          type: 'box',
          icon: {
            name: 'fingerprint',
          },
          style: 'style-v3',
          title: {
            href: '/?path=/story/themeconfig--page',
            label: '支持多主题',
          },
          content: '内置多个主题，Material 色彩生成，支持暗黑主题',
          more: {
            href: '/?path=/story/themeconfig--page',
            label: '更多',
          },
        },
        {
          type: 'box',
          icon: {
            name: 'favorite',
          },
          style: 'style-v3',
          title: {
            href: '/?path=/story/flexlayout--page',
            label: '示例页',
          },
          content: '十多个经典示例页，展示组件的灵活性',
          more: {
            href: '/?path=/story/builder--default',
            label: '更多',
          },
        },
        {
          type: 'box',
          icon: {
            name: 'android',
          },
          style: 'style-v3',
          title: {
            href: '/?path=/story/home-v1--page',
            label: 'Web Builder',
          },
          content: '从组件库中通过拖拽快速构建页面',
          more: {
            href: '/?path=/story/builder--default',
            label: '更多',
          },
        },
      ],
    },
    {
      type: 'showcase-2v1',
      row: 3,
      bg: {
        classes: '',
      },
      classes: '',
      text: {
        title: {
          label: '最新课程',
          style: 'style-v1',
          classes: 'mat-display-0 bold',
        },
        classes: 'text-center',
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
          link: {
            href: '#',
            label: '基于 Vue3 ，打造前台+中台通用提效解决方案',
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
              src: '/assets/images/hero/bg01.jpg',
              alt: 'alt',
            },
          },
          moreLabel: '立即学习',
        },
      ],
    },
    {
      type: 'showcase-3v4',
      title: {
        label: '为什么你将会喜欢这个前端框架？',
        style: 'style-v1',
      },
      bg: {
        classes: 'bg-fill-width bg-',
      },
      classes: '',
      img: {
        src: '/assets/images/1-1/business-02.png',
        alt: 'OUR FEATURES',
      },
      elements: [
        {
          type: 'box',
          style: 'style-v7',
          icon: {
            name: 'verified_user',
          },
          title: {
            href: '/',
            label: '组件编辑',
          },
          content: '通过简单的管理界面对复杂的可视化编辑',
          more: {
            href: '#',
            label: '更多',
          },
        },
        {
          type: 'box',
          style: 'style-v7',
          icon: {
            name: 'fingerprint',
          },
          title: {
            href: '/',
            label: '多语言',
          },
          content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
          more: {
            href: '#',
            label: '更多',
          },
        },
        {
          type: 'box',
          style: 'style-v7',
          icon: {
            name: 'favorite',
          },
          title: {
            href: '/',
            label: '高性能',
          },
          content:
            '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快',
          more: {
            href: '#',
            label: '更多',
          },
        },
        {
          type: 'box',
          style: 'style-v7',
          icon: {
            name: 'android',
          },
          title: {
            href: '/',
            label: '易用的编辑器',
          },
          content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作',
          more: {
            href: '#',
            label: '更多',
          },
        },
      ],
    },
    {
      type: 'showcase-4v1',
      spacer: 'lg',
      text: {
        title: {
          label: '平台实时数据',
          style: 'style-v1',
        },
      },
      bg: {
        classes: 'bg-fill-width bg-shadow',
      },
      classes: '',
      params: {
        apiBak: 'api/v1/xxx',
      },
      elements: [
        {
          icon: {
            name: 'fingerprint',
          },
          digit: {
            value: 301,
            label: '+',
          },
          title: '日访问人数',
        },
        {
          icon: {
            name: 'verified_user',
          },
          digit: {
            value: 371,
            label: '+',
          },
          title: '日打开次数',
        },
        {
          icon: {
            name: 'android',
          },
          digit: {
            value: 128,
            label: '人',
          },
          title: '日新增人数',
        },
        {
          icon: {
            name: 'mail',
          },
          digit: {
            value: 8017,
            label: '万',
          },
          title: '累计用户数',
        },
      ],
    },
    {
      spacer: 'lg',
      type: 'carousel-1v1',
      title: {
        label: '你将喜欢上 Drupal 的原因',
        icon: 'email',
        style: 'style-v2',
        classes: 'mat-display-1',
      },
      classes: '',
      bg: {
        classes: 'bg-white bg-fill-width',
      },
      sliders: {
        type: 'swiper',
        params: {
          navigation: false,
          breakpoints: {
            '600': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '960': {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          },
        },
        classes: '',
        elements: [
          {
            type: 'card',
            title: '高性能',
            subTitle: 'High Performance',
            classes: 'card-no-shadow',
            body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
            feature: {
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
          },
          {
            type: 'card',
            feature: {
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
            title: '易用的编辑器',
            subTitle: 'Simplicity for Editors',
            classes: 'card-no-shadow',
            body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
          },
          {
            type: 'card',
            feature: {
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
            title: '多语言',
            subTitle: 'Leader in Multilingual',
            classes: 'card-no-shadow',
            body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
          },
          {
            type: 'card',
            feature: {
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
            title: '更有弹性',
            subTitle: 'Flexibility',
            classes: 'card-no-shadow',
            body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
          },
          {
            type: 'card',
            feature: {
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
            title: '安全性',
            subTitle: 'Rigorous Security',
            classes: 'card-no-shadow',
            body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
          },
        ],
      },
    },
  ],
};
