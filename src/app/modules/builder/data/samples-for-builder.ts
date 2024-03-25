export const samples = {
  label: '示例库',
  elements: [
    {
      label: '经典布局',
      id: 'home',
      icon: {
        svg: 'numeric-1',
      },
      page: {
        title: '信使 UI 低代码开源前端框架  | XINSHI信使',
        meta: [
          {
            name: 'description',
            content:
              '信使 UI 是基于 Material 的 Angular 低代码前端框架,丰富的组件库可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的Web 页面。',
          },
          {
            name: 'keywords',
            content: '信使UI,低代码,Drupal',
          },
        ],
        body: [
          {
            type: 'showcase-3v9',
            bg: {
              classes: 'bg-fill-width',
              img: {
                classes: 'object-fit',
                src: '/assets/images/bg/bg-01.png',
              },
            },
            spacer: 'lg',
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/13.png',
                classes: 'mover',
                hostClasses: 'position-relative img-bg-shape',
                actions: [
                  {
                    type: 'btn-video',
                    color: 'default',
                    dialog: {
                      width: '900',
                      height: '800',
                    },
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/storybook/assets/builder.png',
                        sources: [
                          {
                            src: '/assets/video/layout-builder-hero-demo.mp4',
                            'type:': 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label:
                    '欢迎使用 <strong class="text-primary"></strong> <br>快速构建页面',
                  style: 'style-v4',
                  classes: 'mat-display-1 bold',
                  typed: {
                    enable: true,
                    strings: [
                      {
                        label: '信使 UI',
                      },
                      {
                        label: 'Web builder',
                      },
                    ],
                    config: {
                      typeSpeed: 120,
                      loop: true,
                    },
                  },
                },
                body: '从左侧选择组件拖动到想要的位置：<ul class="list-done"><li>可视化编辑组件图文数据，所见即所得；</li><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li></ul><p>欢迎入群一起探索更多的可能性和数字创新体验，QQ 交流群：<span class="text-primary">1176468251</span></p><p style="display:flex"><video  muted  autoplay loop width="120px" src="/assets/video/drag-drop.mp4"></video></p>',
                actions: [
                  {
                    type: 'btn',
                    color: 'primary',
                    mode: 'raised',
                    href: '/builder',
                    label: '立即体验',
                  },
                  {
                    type: 'btn',
                    color: 'primary',
                    mode: 'stroked',
                    label: ' 关注作者',
                    href: 'https://www.zhihu.com/people/biaogebusy',
                    target: '_blank',
                    icon: {
                      inline: true,
                      svg: 'zhihu',
                    },
                  },
                  {
                    type: 'github-star',
                  },
                ],
              },
            ],
          },
          {
            type: 'showcase-3v2',
            classes: '',
            bg: {
              classes: 'bg-fill-width',
              img: {
                hostClasses: '',
                src: '/assets/images/bg/home-shape.png',
                mobile: '/assets/images/bg/home-shape.png',
              },
            },
            elements: [
              {
                img: {
                  src: '/assets/images/svg/vscode.svg',
                  alt: '',
                },
                content: {
                  type: 'text',
                  spacer: 'sm',
                  title: {
                    label: '开源框架',
                    style: 'style-v4',
                    classes: 'mat-display-1',
                  },
                  body: '信使UI是一款开源的前端框架，基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。',
                  actions: [
                    {
                      type: 'btn',
                      color: 'primary',
                      mode: 'raised',
                      label: ' Github',
                      href: 'https://github.com/biaogebusy/xinshi-ui',
                      target: '_blank',
                      icon: {
                        inline: true,
                        svg: 'github',
                      },
                    },
                  ],
                },
              },
              {
                img: {
                  src: '/assets/images/svg/storybook-mock-ui.svg',
                  alt: '',
                },
                content: {
                  type: 'text',
                  spacer: 'sm',
                  title: {
                    label: '组件展示和测试',
                    style: 'style-v4',
                    classes: 'mat-display-1',
                  },
                  body: '<strong class="text-primary">Storybook</strong> 提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
                  actions: [
                    {
                      type: 'btn',
                      color: 'primary',
                      mode: 'raised',
                      href: '/builder',
                      label: '马上体验',
                    },
                  ],
                },
              },
              {
                img: {
                  src: '/assets/images/svg/monday-com.webp',
                  alt: '',
                },
                content: {
                  type: 'text',
                  spacer: 'sm',
                  title: {
                    label: '文档化',
                    style: 'style-v4',
                    classes: 'mat-display-1',
                  },
                  body: '<strong class="text-primary">Storybook</strong> 不仅可以展示和测试组件，还可以自动生成组件的文档。<ul class="list-done">\r\n\t<li>使用Markdown或其他文档格式编写组件文档，并将其与组件关联</li>\r\n\t<li>团队成员可以更好地理解和使用组件，减少了沟通成本</li></ul>\r\n',
                  actions: [
                    {
                      type: 'btn',
                      color: 'primary',
                      mode: 'raised',
                      href: '/builder',
                      label: '马上体验',
                    },
                  ],
                },
              },
            ],
          },
          {
            type: 'showcase-1v1',
            bg: {
              classes: 'bg-shadow bg-fill-width',
            },
            title: {
              label: '使用人员',
              style: 'style-v1',
              classes: 'mat-display-1',
            },
            row: '4',
            elements: [
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/Asset187.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '前端开发',
                },
                content: '在Storybook中开发测试维护组件',
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/Asset189.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '产品经理',
                },
                content: '快速构建和预览页面',
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/Asset190.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '运维人员',
                },
                content: '构建页面和测试UI',
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/Asset192.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '市场营销人员',
                },
                content: '给客户演示数字创新能力',
              },
            ],
          },
          {
            type: 'text',
            spacer: 'md',
            body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
            title: {
              label:
                '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
              style: 'style-v1',
              classes: 'mat-display-1 bold',
            },
            bg: {
              classes: 'bg- bg-fill-width',
            },
            classes: 'text-center',
            actionsAlign: 'center center',
            actions: [
              {
                type: 'btn',
                mode: 'raised',
                color: 'primary',
                href: '/builder',
                label: '开始体验',
              },
              {
                type: 'btn',
                color: 'primary',
                mode: 'stroked',
                label: '演示视频',
                href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
                target: '_blank',
                icon: {
                  inline: true,
                  svg: 'play-circle-outline',
                },
              },
            ],
          },
        ],
      },
    },
    {
      label: '服务介绍',
      id: 'home-v2',
      icon: {
        svg: 'numeric-2',
      },
      page: {
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
            row: 4,
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
            row: 4,
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
            id: 'xxx',
            type: 'action-1v1',
            spacer: 'xl',
            bg: {
              classes: 'bg-shadow bg-fill-width',
            },
            classes: '',
            text: {
              title: {
                label: '如何才能帮助到您？',
                style: 'none',
                classes: 'mat-display-1',
              },
              classes: '',
              spacer: 'none',
              body: '<p>这里有你想要的答案，请根据以下筛选条件选择进行搜索。</p>',
              actions: [
                {
                  type: 'search-action',
                  button: {
                    label: '搜索',
                    color: 'primary',
                  },
                  form: [
                    {
                      type: 'select',
                      key: 'skill',
                      label: '技能',
                      options: [
                        {
                          label: '无',
                          value: '',
                        },
                        {
                          label: 'Angular',
                          value: 'angular',
                        },
                        {
                          label: 'React',
                          value: 'react',
                        },
                        {
                          label: 'Vue',
                          value: 'vue',
                        },
                      ],
                    },
                    {
                      type: 'select',
                      key: 'cms',
                      label: 'CMS',
                      options: [
                        {
                          label: '无',
                          value: '',
                        },
                        {
                          label: 'Drupal',
                          value: 'drupal',
                        },
                        {
                          label: 'WP',
                          value: 'wp',
                        },
                        {
                          label: 'Joomla',
                          value: 'joomla',
                        },
                      ],
                    },
                    {
                      type: 'input',
                      key: 'keys',
                      placeholder: '请输入关键词搜索',
                      controlType: 'search',
                      label: '关键词',
                      appearance: 'legacy',
                    },
                  ],
                },
              ],
            },
            shape: true,
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
                content:
                  '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作',
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
      },
    },
    {
      label: '应用推广',
      id: 'home-v3',
      icon: {
        svg: 'numeric-3',
      },
      page: {
        title: '首页 v3',
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
        body: [
          {
            spacer: 'none',
            type: 'hero-1v1',
            classes: 'text-light text-center',
            bg: {
              classes: '',
            },
            sliders: {
              params: {
                slidesPerView: 1,
                spaceBetween: 0,
                pagination: false,
                observer: true,
                observeParents: true,
                breakpoints: {
                  '600': {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  '960': {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                },
              },
              classes: '',
              elements: [
                {
                  type: 'text',
                  spacer: 'xl',
                  title: {
                    label: '组件驱动开发',
                    style: 'style-v1',
                    classes: 'mat-display-2 bold',
                  },
                  classes: 'xy-center',
                  bg: {
                    classes: 'bg-center overlay overlay-80',
                    img: {
                      src: '/assets/images/16-9/business-14.jpeg',
                      mobile: '/assets/images/mobile/mobile-03.jpg',
                    },
                  },
                  body: '<p style="font-size:18px">Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"</p>',
                  actionsAlign: 'center center',
                  actions: [
                    {
                      type: 'btn',
                      mode: 'raised',
                      color: 'primary',
                      href: '#',
                      label: '立刻体验',
                    },
                  ],
                },
                {
                  type: 'text',
                  title: {
                    label: '组件展示和测试',
                    style: 'style-v1',
                    classes: 'mat-display-2 bold',
                  },
                  spacer: 'xl',
                  classes: 'xy-center text-light',
                  bg: {
                    classes: 'bg-shadow  overlay overlay-80',
                    img: {
                      src: '/assets/images/16-9/business-15.jpeg',
                      mobile: '/assets/images/mobile/mobile-04.jpg',
                    },
                  },
                  body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。',
                  actionsAlign: 'center center',
                  actions: [
                    {
                      type: 'btn',
                      mode: 'raised',
                      color: 'primary',
                      href: '#',
                      label: '立刻体验',
                    },
                  ],
                },
                {
                  type: 'text',
                  title: {
                    label: '文档化',
                    style: 'style-v1',
                    classes: 'mat-display-2 bold',
                  },
                  spacer: 'xl',
                  classes: 'xy-center text-light',
                  bg: {
                    classes: 'bg-shadow  overlay overlay-80',
                    img: {
                      src: '/assets/images/hero/182.jpg',
                      mobile: '/assets/images/mobile/mobile-04.jpg',
                    },
                  },
                  body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。',
                  actionsAlign: 'center center',
                  actions: [
                    {
                      type: 'btn',
                      mode: 'raised',
                      color: 'primary',
                      href: '#',
                      label: '立刻体验',
                    },
                  ],
                },
              ],
            },
          },
          {
            type: 'carousel-2v2',
            id: '',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width bg-shadow',
            },
            classes: '',
            sliders: {
              params: {
                slidesPerView: 1.2,
                pagination: false,
                autoplay: {
                  delay: 5000,
                },
                breakpoints: {
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                },
              },
              classes: '',
              elements: [
                {
                  type: 'img',
                  src: '/assets/images/logo/amazon.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/google.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/lenovo.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/paypal.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/shopify.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/spotify.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/logo10.png',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
              ],
            },
          },
          {
            type: 'showcase-1v1',
            bg: {
              classes: 'bg-none bg-fill-width',
            },
            row: '4',
            elements: [
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/user.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '高性能',
                },
                content:
                  '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                more: {
                  href: '#',
                  label: '+',
                },
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/calendar.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '易用的编辑器',
                },
                content:
                  '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                more: {
                  href: '#',
                  label: '+',
                },
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/sand-clock.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '多语言',
                },
                content:
                  'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
                more: {
                  href: '#',
                  label: '+',
                },
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/health.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '更有弹性',
                },
                content:
                  '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                more: {
                  href: '#',
                  label: '+',
                },
              },
            ],
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-01.png',
              },
            },
            order: {
              left: 0,
              right: 1,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/25.png',
                alt: '',
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '使用信使构建你们的项目',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
              },
              {
                type: 'swiper',
                params: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  navigation: false,
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'card',
                    title: '高性能',
                    subTitle: 'High Performance',
                    avatar: {
                      src: '/assets/images/avatar/01.jpeg',
                      alt: '',
                    },
                    classes: 'card-no-shadow',
                    body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/02.jpeg',
                      alt: '',
                    },
                    title: '易用的编辑器',
                    subTitle: 'Simplicity for Editors',
                    classes: 'card-no-shadow',
                    body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/03.jpeg',
                      alt: '',
                    },
                    title: '多语言',
                    subTitle: 'Leader in Multilingual',
                    classes: 'card-no-shadow',
                    body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/04.jpeg',
                      alt: '',
                    },
                    title: '更有弹性',
                    subTitle: 'Flexibility',
                    classes: 'card-no-shadow',
                    body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/05.jpeg',
                      alt: '',
                    },
                    title: '安全性',
                    subTitle: 'Rigorous Security',
                    classes: 'card-no-shadow',
                    body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
                  },
                ],
              },
            ],
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/13.png',
                hostClasses: 'position-relative',
                actions: [
                  {
                    color: 'primary',
                    type: 'btn-video',
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/video/poster01.png',
                        sources: [
                          {
                            src: '/assets/video/storybook.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '使用信使构建你们的项目',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
              },
              {
                type: 'swiper',
                params: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  navigation: false,
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'card',
                    title: '高性能',
                    subTitle: 'High Performance',
                    avatar: {
                      src: '/assets/images/avatar/01.jpeg',
                      alt: '',
                    },
                    classes: 'card-no-shadow',
                    body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/02.jpeg',
                      alt: '',
                    },
                    title: '易用的编辑器',
                    subTitle: 'Simplicity for Editors',
                    classes: 'card-no-shadow',
                    body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/03.jpeg',
                      alt: '',
                    },
                    title: '多语言',
                    subTitle: 'Leader in Multilingual',
                    classes: 'card-no-shadow',
                    body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/04.jpeg',
                      alt: '',
                    },
                    title: '更有弹性',
                    subTitle: 'Flexibility',
                    classes: 'card-no-shadow',
                    body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/05.jpeg',
                      alt: '',
                    },
                    title: '安全性',
                    subTitle: 'Rigorous Security',
                    classes: 'card-no-shadow',
                    body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            title: {
              label:
                '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
              style: 'style-v1',
              classes: 'mat-display-2 bold',
            },
            bg: {
              classes: 'bg- bg-fill-width',
            },
            body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
            classes: 'text-center',
            actionsAlign: 'center center',
            actions: [
              {
                type: 'btn-generater',
                label: '生成页面',
                color: 'primary',
                mode: 'raised',
              },
              {
                type: 'btn',
                color: 'primary',
                mode: 'stroked',
                label: '演示视频',
                href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
                target: '_blank',
                icon: {
                  inline: true,
                  svg: 'play-circle-outline',
                },
              },
            ],
          },
        ],
      },
    },
    {
      label: '应用介绍',
      id: 'home-v4',
      icon: {
        svg: 'numeric-4',
      },
      page: {
        title: '首页 v4',
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
        body: [
          {
            type: 'hero-1v3',
            spacer: 'xl',
            bg: {
              classes: '',
            },
            classes: '',
            text: {
              title: {
                label:
                  '欢迎使用 <strong class="text-">Builder</strong> 快速构建页面',
                classes: 'mat-display-2 bold',
                style: 'style-v4',
              },
              classes: 'p-x',
              body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong >Storybook</strong> 页面时添加组件到预览页面。',
              actions: [
                {
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: '立刻体验',
                  target: '_blank',
                },
                {
                  type: 'btn-video',
                  color: 'primary',
                  video: {
                    type: 'player',
                    options: {
                      controls: true,
                      aspectRatio: '16:9',
                      poster: '/assets/video/poster01.png',
                      sources: [
                        {
                          src: '/assets/video/storybook.mp4',
                          type: 'video/mp4',
                        },
                      ],
                    },
                  },
                },
              ],
            },
            right: [
              {
                type: 'img',
                hostClasses: 'img-bg-shape',
                src: '/assets/images/illustration/29.png',
              },
            ],
          },
          {
            type: 'showcase-1v1',
            bg: {
              classes: 'bg-none bg-fill-width',
            },
            row: 4,
            classes: '',
            elements: [
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/user.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '高性能',
                },
                content:
                  '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                more: {
                  href: '#',
                  label: '+',
                },
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/calendar.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '易用的编辑器',
                },
                content:
                  '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                more: {
                  href: '#',
                  label: '+',
                },
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/sand-clock.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '多语言',
                },
                content:
                  'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
                more: {
                  href: '#',
                  label: '+',
                },
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/health.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '更有弹性',
                },
                content:
                  '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                more: {
                  href: '#',
                  label: '+',
                },
              },
            ],
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/13.png',
                hostClasses: 'position-relative',
                actions: [
                  {
                    color: 'primary',
                    type: 'btn-video',
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/video/poster01.png',
                        sources: [
                          {
                            src: '/assets/video/storybook.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '使用信使构建你们的项目',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
              },
              {
                type: 'swiper',
                params: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  navigation: false,
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'card',
                    title: '高性能',
                    subTitle: 'High Performance',
                    avatar: {
                      src: '/assets/images/avatar/01.jpeg',
                      alt: '',
                    },
                    classes: 'card-no-shadow',
                    body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/02.jpeg',
                      alt: '',
                    },
                    title: '易用的编辑器',
                    subTitle: 'Simplicity for Editors',
                    classes: 'card-no-shadow',
                    body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/03.jpeg',
                      alt: '',
                    },
                    title: '多语言',
                    subTitle: 'Leader in Multilingual',
                    classes: 'card-no-shadow',
                    body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/04.jpeg',
                      alt: '',
                    },
                    title: '更有弹性',
                    subTitle: 'Flexibility',
                    classes: 'card-no-shadow',
                    body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/05.jpeg',
                      alt: '',
                    },
                    title: '安全性',
                    subTitle: 'Rigorous Security',
                    classes: 'card-no-shadow',
                    body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
                  },
                ],
              },
            ],
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            classes: '',
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/12.png',
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: 'Storybook 是什么？',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。',
              },
              {
                type: 'panel',
                elements: [
                  {
                    title: '组件驱动开发',
                    icon: 'person',
                    params: {
                      expanded: true,
                    },
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: 'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
                      },
                    ],
                  },
                  {
                    title: '组件展示和测试',
                    icon: 'faviores',
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
                      },
                    ],
                  },
                  {
                    title: '文档化',
                    icon: 'faviores',
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'showcase-1v3',
            text: {
              title: {
                label: 'Storybook 是什么？',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
            },
            classes: 'text-light',
            bg: {
              classes: 'bg-fill-width overlay overlay-80',
              img: {
                hostClasses: 'bg-center',
                src: '/assets/images/showcase/8.jpg',
                alt: 'page title',
              },
            },
            elements: [
              {
                type: 'text',
                spacer: 'none',
                style: {
                  margin: '0 auto',
                  'text-align': 'center',
                  width: '600px',
                },
                body: 'Storybook是一个开源的前端工具，用于开发、测试和文档化UI组件。它提供了一个独立的环境，开发人员可以在其中构建和展示单个UI组件，而无需依赖于整个应用程序的上下文。',
                actionsAlign: 'center center',
                actions: [
                  {
                    type: 'btn-video',
                    color: 'primary',
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/video/poster01.png',
                        sources: [
                          {
                            src: '/assets/video/storybook.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'showcase-3v6',
            id: '',
            title: {
              type: 'text',
              spacer: 'sm',
              title: {
                label: '为所有开发者、所有应用场景而设计',
                style: 'style-v1',
              },
              classes: 'text-center',
              body: '<p class="text-center">让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。</p>',
            },
            bg: {
              classes: 'bg-shadow bg-fill-width',
            },
            classes: '',
            row: '3',
            elements: [
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '响应式设计',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '支持 SSR 服务端渲染',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '支持多主题、暗黑模式',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: 'MDI 6000多个icons',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: 'Storybook 全覆盖测试',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '动态组件动态表单',
              },
            ],
            action: {
              label: '查看更多',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
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
          {
            type: 'showcase-2v1',
            row: 4,
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
            type: 'text',
            title: {
              label:
                '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
              style: 'style-v1',
              classes: 'mat-display-1 bold',
            },
            bg: {
              classes: 'bg- bg-fill-width',
            },
            body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
            classes: 'text-center',
            actionsAlign: 'center center',
            actions: [
              {
                type: 'btn-generater',
                label: '生成页面',
                color: 'primary',
                mode: 'raised',
              },
              {
                type: 'btn',
                color: 'primary',
                mode: 'stroked',
                label: '演示视频',
                href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
                target: '_blank',
                icon: {
                  inline: true,
                  svg: 'play-circle-outline',
                },
              },
            ],
          },
        ],
      },
    },
    {
      label: '在线课程',
      id: 'home-v5',
      icon: {
        svg: 'numeric-5',
      },
      page: {
        title: '首页 v5',
        config: {
          headerMode: {
            transparent: true,
            style: 'light',
          },
        },
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
                    label: '前端面试全家桶',
                    style: 'style-v1',
                    classes: 'mat-display-2',
                  },
                  classes: 'xy-center',
                  style: {
                    width: '50%',
                  },
                  bg: {
                    classes: 'bg-shadow  overlay overlay-80',
                    img: {
                      src: '/assets/images/hero/bg01.jpg',
                      mobile: '/assets/images/hero/bg01.jpg',
                    },
                  },
                  body: '<p>专业老师带你刷爆大厂前面面试和流程，从求职准备到面试演练</p>\r\n',
                  actionsAlign: 'center center',
                  actions: [
                    {
                      href: '#',
                      label: '了解更多',
                    },
                  ],
                },
                {
                  type: 'text',
                  spacer: 'xl',
                  title: {
                    label: 'Java 亿级项目架构设计的落地和应用',
                    style: 'style-v1',
                    classes: 'mat-display-2',
                  },
                  classes: 'xy-center',
                  style: {
                    width: '50%',
                  },
                  bg: {
                    classes: 'bg-shadow  overlay overlay-80',
                    img: {
                      src: '/assets/images/hero/bg02.jpg',
                      mobile: '/assets/images/hero/bg02.jpg',
                    },
                  },
                  body: '<p>稀缺好课，实践可落地的架构设计</p>\r\n',
                  actionsAlign: 'center center',
                  actions: [
                    {
                      href: '#',
                      label: '了解更多',
                    },
                  ],
                },
                {
                  type: 'text',
                  spacer: 'xl',
                  title: {
                    label: '产品经理电商系统实践',
                    style: 'style-v1',
                    classes: 'mat-display-2',
                  },
                  classes: 'xy-center',
                  style: {
                    width: '50%',
                  },
                  bg: {
                    classes: 'bg-shadow  overlay overlay-80',
                    img: {
                      src: '/assets/images/hero/bg05.jpg',
                      mobile: '/assets/images/hero/bg05.jpg',
                    },
                  },
                  body: '<p>全流程搭建企业级应用，全面掌握前后端设计精髓</p>\r\n',
                  actionsAlign: 'center center',
                  actions: [
                    {
                      href: '#',
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
                  href: '#',
                  label: '会员无限制访问',
                },
                content:
                  '<p>只要支付799元/年，就可以成为会员，无限制观看所有的视频课程</p>\r\n',
                more: {
                  href: '#',
                  label: '成为会员',
                },
              },
              {
                icon: {
                  name: 'favorite',
                },
                style: 'style-v9',
                title: {
                  href: '#',
                  label: '我们的课程',
                },
                content:
                  '<p>课程包括了初入职场的初级课程，也包括进阶高级的精品好课</p>\r\n',
                more: {
                  href: '#',
                  label: '浏览更多',
                },
              },
              {
                icon: {
                  name: 'fingerprint',
                },
                style: 'style-v9',
                title: {
                  href: '#',
                  label: '优秀的老师',
                },
                content:
                  '<p>所有的老师都是层层筛选和把关，为学员提供真实有效的技能和经验</p>\r\n',
                more: {
                  href: '#',
                  label: '成为老师',
                },
              },
            ],
          },
          {
            type: 'carousel-2v2',
            id: '',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width bg-shadow',
            },
            classes: '',
            sliders: {
              params: {
                slidesPerView: 1.2,
                pagination: false,
                autoplay: {
                  delay: 5000,
                },
                breakpoints: {
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                },
              },
              classes: '',
              elements: [
                {
                  type: 'img',
                  src: '/assets/images/logo/amazon.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/google.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/lenovo.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/paypal.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/shopify.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/spotify.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/logo10.png',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
              ],
            },
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            classes: '',
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/12.png',
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '全天候学习支持',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '这里是您开启编程世界大门的理想起点。我们倾力打造了一系列适合各阶段学员的在线编程课程，无论您是初学者还是资深开发者，都将在这里找到适合自己的学习路径。',
              },
              {
                type: 'panel',
                elements: [
                  {
                    title: '精选实战课程',
                    icon: 'person',
                    params: {
                      expanded: true,
                    },
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: '我们的课程涵盖了Python、Java、C++、JavaScript等多种主流编程语言，同时紧跟AI、大数据、云计算等热门领域，确保课程内容与时俱进，贴近真实开发场景。',
                      },
                    ],
                  },
                  {
                    title: '个性化学习计划',
                    icon: 'faviores',
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: '根据每位学员的基础和目标，智能推荐适合的学习路线图，并设有难度分级，逐步引导您从基础知识到高级应用，步步为营，扎实提升编程技能。',
                      },
                    ],
                  },
                  {
                    title: '名师直播授课',
                    icon: 'faviores',
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: '    ○ 来自国内外顶级IT企业的技术大牛亲自授课，面对面互动答疑，确保理论与实践相结合，帮助学员快速理解和掌握编程要点。',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'showcase-1v3',
            text: {
              title: {
                label: 'Storybook 是什么？',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
            },
            classes: 'text-light',
            bg: {
              classes: 'bg-fill-width overlay overlay-80',
              img: {
                hostClasses: 'bg-center',
                src: '/assets/images/showcase/8.jpg',
                alt: 'page title',
              },
            },
            elements: [
              {
                type: 'text',
                spacer: 'none',
                style: {
                  margin: '0 auto',
                  'text-align': 'center',
                  width: '600px',
                },
                body: 'Storybook是一个开源的前端工具，用于开发、测试和文档化UI组件。它提供了一个独立的环境，开发人员可以在其中构建和展示单个UI组件，而无需依赖于整个应用程序的上下文。',
                actionsAlign: 'center center',
                actions: [
                  {
                    type: 'btn-video',
                    color: 'primary',
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/video/poster01.png',
                        sources: [
                          {
                            src: '/assets/video/storybook.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'showcase-3v6',
            id: '',
            title: {
              type: 'text',
              spacer: 'sm',
              title: {
                label: '为所有开发者、所有应用场景而设计',
                style: 'style-v1',
              },
              classes: 'text-center',
              body: '<p class="text-center">让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。</p>',
            },
            bg: {
              classes: 'bg-light bg-fill-width',
            },
            classes: '',
            row: 4,
            elements: [
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '响应式设计',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '支持 SSR 服务端渲染',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '支持多主题、暗黑模式',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: 'MDI 6000多个icons',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: 'Storybook 全覆盖测试',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '动态组件动态表单',
              },
            ],
          },
          {
            type: 'showcase-2v1',
            row: 4,
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
            type: 'text',
            title: {
              label:
                '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
              style: 'style-v1',
              classes: 'mat-display-2 bold',
            },
            bg: {
              classes: 'bg- bg-fill-width',
            },
            body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
            classes: 'text-center',
            actionsAlign: 'center center',
            actions: [
              {
                type: 'btn-generater',
                label: '生成页面',
                color: 'primary',
                mode: 'raised',
              },
              {
                type: 'btn',
                color: 'primary',
                mode: 'stroked',
                label: '演示视频',
                href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
                target: '_blank',
                icon: {
                  inline: true,
                  svg: 'play-circle-outline',
                },
              },
            ],
          },
        ],
      },
    },
    {
      label: '医疗科技',
      id: 'home-v6',
      icon: {
        svg: 'numeric-6',
      },
      page: {
        title: '首页 v6',
        configBak: {
          headerMode: {
            transparent: true,
            style: 'light',
          },
        },
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
        body: [
          {
            type: 'hero-1v3',
            spacer: 'xl',
            classes: '',
            text: {
              title: {
                label: '领先医疗科技，塑造健康未来，您的智能医疗解决方案伙伴',
                classes: 'mat-display-2 bold',
                style: 'style-v4',
              },
              classes: 'text-light',
              body: '我们是一家致力于运用前沿医疗科技，以提升人类健康水平为使命的创新型公司。通过融合尖端科技与人性化关怀，我们提供全方位、高质量的医疗服务解决方案，旨在革新医疗体验，普惠大众健康。',
              actions: [
                {
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: '立刻咨询',
                  target: '_blank',
                },
                {
                  type: 'btn-video',
                  color: 'primary',
                  video: {
                    type: 'player',
                    options: {
                      controls: true,
                      aspectRatio: '16:9',
                      poster: '/assets/video/poster01.png',
                      sources: [
                        {
                          src: '/assets/video/storybook.mp4',
                          type: 'video/mp4',
                        },
                      ],
                    },
                  },
                },
              ],
            },
            right: [
              {
                type: 'img',
                hostClasses: 'img-bg-shape',
                src: '/assets/images/hero/hero-component.svg',
              },
            ],
            bg: {
              classes: 'bg-fill-width bg-primary bg-center',
              img: {
                src: '/assets/images/bg/bg-hero.svg',
                mobile: '/assets/images/bg/bg-hero.svg',
              },
            },
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/13.png',
                hostClasses: 'position-relative',
                actions: [
                  {
                    color: 'primary',
                    type: 'btn-video',
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/video/poster01.png',
                        sources: [
                          {
                            src: '/assets/video/storybook.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '特色服务',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
              },
              {
                type: 'swiper',
                params: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  navigation: false,
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'card',
                    title: '个性化医疗解决方案',
                    subTitle: 'High Performance',
                    avatar: {
                      src: '/assets/images/avatar/01.jpeg',
                      alt: '',
                    },
                    classes: 'card-no-shadow',
                    body: '根据不同医疗机构及患者群体的具体需求，我们提供深度定制的综合医疗服务方案。',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/02.jpeg',
                      alt: '',
                    },
                    title: '持续的技术支持与培训',
                    subTitle: 'Simplicity for Editors',
                    classes: 'card-no-shadow',
                    body: '我们不仅提供优质产品，更注重用户使用体验和技术能力提升。通过定期的专业培训课程和全天候在线技术支持，确保合作伙伴能够充分利用我们的智能医疗解决方案，实现技术优势向临床价值的有效转化。',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/03.jpeg',
                      alt: '',
                    },
                    title: '严格的品质保障体系',
                    subTitle: 'Leader in Multilingual',
                    classes: 'card-no-shadow',
                    body: '产品和服务均遵循国际医疗质量标准，建立严格的质量管理体系，并通过权威机构认证。我们承诺，对每一个细节严谨把控，为每一位用户提供值得信赖的医疗安全保障。',
                  },
                ],
              },
            ],
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            classes: '',
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/12.png',
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '关于我们',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '作为医疗科技行业的翘楚，自成立以来，始终坚持以创新驱动发展，依托强大的科研实力和卓越的专业团队，不断推出涵盖预防、诊断、治疗和康复等全链条环节的医疗科技产品和服务。我们的目标是利用科技力量打破地域、时间限制，让更多人享受到高效便捷且富有温度的医疗服务。',
              },
              {
                type: 'panel',
                elements: [
                  {
                    title: '智能医疗设备',
                    icon: 'person',
                    params: {
                      expanded: true,
                    },
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: '我们提供的先进医疗设备，如智能化检测仪器、远程诊疗系统等，以精准、快速、安全的特点，助力医疗机构提升诊疗效率和服务质量。',
                      },
                    ],
                  },
                  {
                    title: '数字化健康管理',
                    icon: 'faviores',
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: '依托AI与大数据技术，我们为您提供个性化的健康管理方案，包括疾病风险评估、生活习惯改善建议及在线健康咨询服务，使健康管理更加科学化、精细化。',
                      },
                    ],
                  },
                  {
                    title: '云端医疗平台',
                    icon: 'faviores',
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: '构建覆盖线上线下一体化的医疗服务体系，实现医生与患者间的无缝沟通，无论何时何地，都能获得及时、专业的医疗支持。',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'showcase-2v1',
            row: 4,
            bg: {
              classes: '',
            },
            classes: '',
            text: {
              title: {
                label: '成功案例',
                style: 'style-v1',
                classes: 'mat-display-0 bold',
              },
              classes: 'text-center',
              body: '<p class="text-center">已在全球范围内助力众多医疗机构成功实现了数字化转型，其中不乏多个标杆性项目。</p>',
            },
            elements: [
              {
                type: 'card-1v1',
                link: {
                  href: '#',
                  label: '深度市场洞察与策划',
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
                  label: '整合营销传播',
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
                  label: '定制化培训体系',
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
                  label: '灵活的合作模式',
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
            type: 'carousel-1v2',
            title: {
              label: '近期案例',
              style: 'style-v5',
            },
            classes: '',
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
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                },
              },
              classes: 'p-bottom',
              elements: [
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '知乎社区问答平台',
                  },
                  classes: 'card-no-shadow',
                  body: '面向广大用户提供知识分享和交流的问答社区，具有简洁清晰的界面设计和消息通知系统，支持多种方式的分享和交流。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/5.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: 'Shopify电商平台',
                  },
                  classes: 'card-no-shadow',
                  body: '提供全面电商解决方案的科技公司的官方网站，拥有富有创意的设计和易于使用的交互功能，让用户轻松创建自己的电商网站并实现商业目标。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/6.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  classes: 'card-no-shadow',
                  link: {
                    href: '#',
                    label: '酷狗音乐web版',
                  },
                  body: '支持在线听歌的音乐网站，提供海量音乐资源，拥有个性化的推荐和电台功能。',
                  moreLabel: 'Learn More',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/1.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '全职高手小说官网',
                  },
                  classes: 'card-no-shadow',
                  body: '基于网络文学改编的小说官网，为读者提供轻松愉悦的用户界面和舒适的阅读体验。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/2.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '匠人联盟电商平台',
                  },
                  classes: 'card-no-shadow',
                  body: '面向手工艺爱好者的电商平台，提供独立设计师的手工作品和教程，让用户可以轻松地DIY定制自己的物品。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/3.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '美之味食品官网',
                  },
                  classes: 'card-no-shadow',
                  body: '为用户提供极致美食品味体验的食品官网，展现诱人的图片和独特的设计，吸引用户的注意力并增加销售。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/4.jpg',
                      alt: 'alt',
                    },
                  },
                },
              ],
            },
          },
          {
            type: 'showcase-1v3',
            text: {
              title: {
                label: '社会责任与愿景',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
            },
            classes: 'text-light',
            bg: {
              classes: 'bg-fill-width overlay overlay-80',
              img: {
                hostClasses: 'bg-center',
                src: '/assets/images/showcase/8.jpg',
                alt: 'page title',
              },
            },
            elements: [
              {
                type: 'text',
                spacer: 'none',
                style: {
                  margin: '0 auto',
                  'text-align': 'center',
                  width: '800px',
                },
                body: '作为行业内的领军企业，始终秉承“科技以人为本，创新引领健康”的理念，积极履行社会责任，投身于公益医疗项目和公共卫生能力建设。我们坚信，只有不断探索前沿医疗科技，才能更好地应对未来全球健康挑战，让高品质医疗服务触手可及，普惠全民。',
                actionsAlign: 'center center',
                actions: [
                  {
                    type: 'btn-video',
                    color: 'primary',
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/video/poster01.png',
                        sources: [
                          {
                            src: '/assets/video/storybook.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            title: {
              label: '合作与承诺',
              style: 'style-v1',
              classes: 'mat-display-2 bold',
            },
            bg: {
              classes: 'bg- bg-fill-width',
            },
            body: '携手共创医疗科技新纪元。我们诚挚邀请各医疗机构、研究机构以及关心健康的各界朋友展开深度合作，共同书写智慧医疗的新篇章。让我们一起，用科技的力量照亮健康之路！',
            classes: 'text-center',
            actionsAlign: 'center center',
            actions: [
              {
                type: 'btn-generater',
                label: '立即预约',
                color: 'primary',
                mode: 'raised',
              },
            ],
          },
        ],
      },
    },
    {
      label: 'Sass 服务',
      id: 'home-v7',
      icon: {
        svg: 'numeric-7',
      },
      page: {
        title: '首页 v7',
        configBak: {
          headerMode: {
            transparent: true,
            style: 'light',
          },
        },
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
        body: [
          {
            type: 'hero-1v4',
            spacer: 'xl',
            classes: '',
            text: {
              title: {
                label:
                  '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
                classes: 'mat-display-2 bold',
                style: 'style-v1',
              },
              classes: 'p-x text-center',
              body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。',
              actionsAlign: 'center center',
              actions: [
                {
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: '立刻体验',
                  target: '_blank',
                },
              ],
            },
            bg: {
              classes: 'bg-fill-width overlay- overlay-',
              img: {
                src: '/assets/images/bg/home-shape.png',
                hostClasses: '',
              },
            },
            widget: [
              {
                type: 'img',
                src: '/assets/images/illustration/29.png',
              },
            ],
          },
          {
            type: 'showcase-1v1',
            title: {
              label: '忠实的客户',
              style: 'style-v2',
            },
            subTitle: {
              spacer: 'none',
              classes: 'text-center',
              body: '<p class="text-center">可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。无论是一个还是多个站点，Drupal 总是可以游刃有余的构建。</p><br>',
            },
            bg: {
              classes: 'bg-shadow bg-fill-width',
            },
            row: '4',
            elements: [
              {
                img: {
                  src: '/assets/images/logo/amazon.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '高性能',
                },
                content:
                  '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                more: {
                  href: '#',
                  label: '+',
                },
              },
              {
                img: {
                  src: '/assets/images/logo/shopify.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '易用的编辑器',
                },
                content:
                  '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                more: {
                  href: '#',
                  label: '+',
                },
              },
              {
                img: {
                  src: '/assets/images/logo/google.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '多语言',
                },
                content:
                  'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
                more: {
                  href: '#',
                  label: '+',
                },
              },
              {
                img: {
                  src: '/assets/images/logo/lenovo.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '更有弹性',
                },
                content:
                  '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                more: {
                  href: '#',
                  label: '+',
                },
              },
            ],
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/13.png',
                hostClasses: 'position-relative',
                actions: [
                  {
                    color: 'primary',
                    type: 'btn-video',
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/video/poster01.png',
                        sources: [
                          {
                            src: '/assets/video/storybook.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '使用信使构建你们的项目',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
              },
              {
                type: 'swiper',
                params: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  navigation: false,
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'card',
                    title: '高性能',
                    subTitle: 'High Performance',
                    avatar: {
                      src: '/assets/images/avatar/01.jpeg',
                      alt: '',
                    },
                    classes: 'card-no-shadow',
                    body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/02.jpeg',
                      alt: '',
                    },
                    title: '易用的编辑器',
                    subTitle: 'Simplicity for Editors',
                    classes: 'card-no-shadow',
                    body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/03.jpeg',
                      alt: '',
                    },
                    title: '多语言',
                    subTitle: 'Leader in Multilingual',
                    classes: 'card-no-shadow',
                    body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/04.jpeg',
                      alt: '',
                    },
                    title: '更有弹性',
                    subTitle: 'Flexibility',
                    classes: 'card-no-shadow',
                    body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/05.jpeg',
                      alt: '',
                    },
                    title: '安全性',
                    subTitle: 'Rigorous Security',
                    classes: 'card-no-shadow',
                    body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
                  },
                ],
              },
            ],
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            classes: '',
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/12.png',
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: 'Storybook 是什么？',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。',
              },
              {
                type: 'panel',
                elements: [
                  {
                    title: '组件驱动开发',
                    icon: 'person',
                    params: {
                      expanded: true,
                    },
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: 'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
                      },
                    ],
                  },
                  {
                    title: '组件展示和测试',
                    icon: 'faviores',
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
                      },
                    ],
                  },
                  {
                    title: '文档化',
                    icon: 'faviores',
                    elements: [
                      {
                        type: 'text',
                        spacer: 'none',
                        body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'carousel-1v3',
            spacer: 'lg',
            text: {
              spacer: 'none',
              title: {
                label: '客户评价',
                icon: '',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
              classes: 'text-center',
              body: '<p class="text-center">Storybook是一个开发工具和UI组件库，用于构建、测试和文档化可复用的UI组件。它提供了一个独立于主应用程序的环境，让开发者能够以隔离的方式开发和调试组件。</p>',
            },
            classes: '',
            bg: {
              classes: 'bg-shadow',
            },
            sliders: {
              params: {
                slidesPerView: 1.1,
                spaceBetween: 20,
                navigation: false,
                breakpoints: {
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                },
              },
              classes: 'p-bottom',
              elements: [
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/01.jpeg',
                  },
                  star: 4,
                  title: '- 张明',
                  subTitle: '前端开发',
                  body: 'Storybook是我们团队的救星！它使我们能够独立地开发、测试和文档化组件，大大提高了我们的工作效率。非常好用！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/02.jpeg',
                  },
                  star: 5,
                  title: '- 王丽',
                  subTitle: '前端开发',
                  body: '使用Storybook后，我们的组件开发变得更加高效和可靠。它帮助我们定义多个使用场景，清晰地展示组件在各种情景下的表现。我们团队对它赞不绝口！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/03.jpeg',
                  },
                  star: 5,
                  title: '- 李军',
                  subTitle: '前端开发',
                  body: 'Storybook为我们的团队带来了极大的协作效益。它提供了一个集中查看和交流的平台，团队成员可以轻松共享和讨论组件。无疑是一个必备工具！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/04.jpeg',
                  },
                  star: 4,
                  title: '- 张燕',
                  subTitle: '前端开发',
                  body: '我们喜欢Storybook的文档化功能。它帮助我们详细记录和展示每个组件的使用方法和属性，使其他团队成员更容易理解和使用。真的很赞！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/05.jpeg',
                  },
                  star: 5,
                  title: '- 王刚',
                  subTitle: '前端开发',
                  body: 'Storybook让我们的前端开发更加流畅。它与我们的主应用程序分离，使我们能够更好地进行单独测试和调试。我们强烈推荐它给其他团队！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/06.jpeg',
                  },
                  star: 5,
                  title: '- 李丽',
                  subTitle: '前端开发',
                  body: 'Storybook是一个强大而灵活的工具，适用于各种项目和团队规模。我们发现它易于上手，并且它的插件生态系统给我们带来了很多扩展功能的选择。非常棒的工具！',
                },
              ],
            },
          },
          {
            type: 'text',
            title: {
              label:
                '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
              style: 'style-v1',
              classes: 'mat-display-1 bold',
            },
            bg: {
              classes: 'bg- bg-fill-width',
            },
            body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
            classes: 'text-center',
            actionsAlign: 'center center',
            actions: [
              {
                type: 'btn-generater',
                label: '生成页面',
                color: 'primary',
                mode: 'raised',
              },
              {
                type: 'btn',
                color: 'primary',
                mode: 'stroked',
                label: '演示视频',
                href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
                target: '_blank',
                icon: {
                  inline: true,
                  svg: 'play-circle-outline',
                },
              },
            ],
          },
        ],
      },
    },
    {
      label: '应用市场',
      id: 'home-v8',
      icon: {
        svg: 'numeric-8',
      },
      page: {
        title: '首页 v8',
        configBak: {
          headerMode: {
            transparent: true,
            style: 'light',
          },
        },
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
        body: [
          {
            spacer: 'xl',
            type: 'hero-1v4',
            classes: '',
            text: {
              title: {
                label:
                  '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
                classes: 'mat-display-2 bold',
                style: 'style-v1',
              },
              classes: 'p-x text-center',
              body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。',
              actionsAlign: 'center center',
              actions: [
                {
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: '立刻体验',
                  target: '_blank',
                },
                {
                  type: 'btn',
                  color: 'primary',
                  label: '联系我们',
                  icon: {
                    inline: true,
                    name: 'phone',
                  },
                  mode: 'stroked',
                },
              ],
            },
            bg: {
              classes: 'bg-fill-width overlay- overlay-',
              img: {
                src: '/assets/images/bg/bg-02.png',
                hostClasses: 'bg-center',
              },
            },
            order: -1,
            style: {
              maxWidth: '800px',
              margin: '0 auto',
            },
            widget: [
              {
                type: 'img',
                style: {
                  maxHeight: '400px',
                },
                src: '/assets/images/illustration/30.png',
              },
            ],
          },
          {
            type: 'carousel-2v2',
            id: '',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width bg-shadow',
            },
            classes: '',
            sliders: {
              params: {
                slidesPerView: 1.2,
                pagination: false,
                autoplay: {
                  delay: 5000,
                },
                breakpoints: {
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                },
              },
              classes: '',
              elements: [
                {
                  type: 'img',
                  src: '/assets/images/logo/amazon.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/google.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/lenovo.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/paypal.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/shopify.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/spotify.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/logo10.png',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
              ],
            },
          },
          {
            type: 'showcase-3v6',
            id: '',
            title: {
              type: 'text',
              spacer: 'sm',
              title: {
                label: '为所有开发者、所有应用场景而设计',
                style: 'style-v1',
              },
              classes: 'text-center',
              body: '<p class="text-center">让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。</p>',
            },
            bg: {
              classes: 'bg-fill-width bg-',
            },
            classes: '',
            row: '3',
            elements: [
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '响应式设计',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '支持 SSR 服务端渲染',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '支持多主题、暗黑模式',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: 'MDI 6000多个icons',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: 'Storybook 全覆盖测试',
              },
              {
                img: {
                  src: '/assets/images/logo/codepen.svg',
                  style: {
                    width: '45px',
                    height: '45px',
                  },
                  alt: 'logo',
                },
                css3: true,
                title: '动态组件动态表单',
              },
            ],
            action: {
              label: '查看更多',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/13.png',
                hostClasses: 'position-relative',
                actions: [
                  {
                    color: 'primary',
                    type: 'btn-video',
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/video/poster01.png',
                        sources: [
                          {
                            src: '/assets/video/storybook.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '使用信使构建你们的项目',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
              },
              {
                type: 'swiper',
                params: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  navigation: false,
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'card',
                    title: '高性能',
                    subTitle: 'High Performance',
                    avatar: {
                      src: '/assets/images/avatar/01.jpeg',
                      alt: '',
                    },
                    classes: 'card-no-shadow',
                    body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/02.jpeg',
                      alt: '',
                    },
                    title: '易用的编辑器',
                    subTitle: 'Simplicity for Editors',
                    classes: 'card-no-shadow',
                    body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/03.jpeg',
                      alt: '',
                    },
                    title: '多语言',
                    subTitle: 'Leader in Multilingual',
                    classes: 'card-no-shadow',
                    body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/04.jpeg',
                      alt: '',
                    },
                    title: '更有弹性',
                    subTitle: 'Flexibility',
                    classes: 'card-no-shadow',
                    body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/05.jpeg',
                      alt: '',
                    },
                    title: '安全性',
                    subTitle: 'Rigorous Security',
                    classes: 'card-no-shadow',
                    body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
                  },
                ],
              },
            ],
          },
          {
            type: 'carousel-1v3',
            spacer: 'lg',
            text: {
              spacer: 'none',
              title: {
                label: '客户评价',
                icon: '',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
              classes: 'text-center',
              body: '<p class="text-center">Storybook是一个开发工具和UI组件库，用于构建、测试和文档化可复用的UI组件。它提供了一个独立于主应用程序的环境，让开发者能够以隔离的方式开发和调试组件。</p>',
            },
            classes: '',
            bg: {
              classes: 'bg-shadow',
            },
            sliders: {
              params: {
                slidesPerView: 1.1,
                spaceBetween: 20,
                navigation: false,
                breakpoints: {
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                },
              },
              classes: 'p-bottom',
              elements: [
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/01.jpeg',
                  },
                  star: 4,
                  title: '- 张明',
                  subTitle: '前端开发',
                  body: 'Storybook是我们团队的救星！它使我们能够独立地开发、测试和文档化组件，大大提高了我们的工作效率。非常好用！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/02.jpeg',
                  },
                  star: 5,
                  title: '- 王丽',
                  subTitle: '前端开发',
                  body: '使用Storybook后，我们的组件开发变得更加高效和可靠。它帮助我们定义多个使用场景，清晰地展示组件在各种情景下的表现。我们团队对它赞不绝口！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/03.jpeg',
                  },
                  star: 5,
                  title: '- 李军',
                  subTitle: '前端开发',
                  body: 'Storybook为我们的团队带来了极大的协作效益。它提供了一个集中查看和交流的平台，团队成员可以轻松共享和讨论组件。无疑是一个必备工具！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/04.jpeg',
                  },
                  star: 4,
                  title: '- 张燕',
                  subTitle: '前端开发',
                  body: '我们喜欢Storybook的文档化功能。它帮助我们详细记录和展示每个组件的使用方法和属性，使其他团队成员更容易理解和使用。真的很赞！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/05.jpeg',
                  },
                  star: 5,
                  title: '- 王刚',
                  subTitle: '前端开发',
                  body: 'Storybook让我们的前端开发更加流畅。它与我们的主应用程序分离，使我们能够更好地进行单独测试和调试。我们强烈推荐它给其他团队！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/06.jpeg',
                  },
                  star: 5,
                  title: '- 李丽',
                  subTitle: '前端开发',
                  body: 'Storybook是一个强大而灵活的工具，适用于各种项目和团队规模。我们发现它易于上手，并且它的插件生态系统给我们带来了很多扩展功能的选择。非常棒的工具！',
                },
              ],
            },
          },
          {
            type: 'showcase-4v1',
            spacer: 'lg',
            text: {
              title: {
                label: 'Storybook 是如何流行于前端开发测试的',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
              classes: 'text-center',
              body: '<p class="text-center">通过Storybook，您可以以交互的方式在浏览器中浏览和测试组件，以确保它们在各种条件下的正确工作。</p>',
            },
            paramsBak: {
              api: 'api/v1/tab/order_process_statistics',
            },
            elements: [
              {
                img: {
                  src: '/assets/images/svg/Asset187.svg',
                },
                digit: {
                  value: 52,
                  label: 'M',
                },
                title: 'Github Start',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset189.svg',
                },
                digit: {
                  value: 32653,
                  label: '+',
                },
                title: 'NPM 周下载量',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset190.svg',
                },
                digit: {
                  value: 3923,
                  label: 'K',
                },
                title: '社区活跃',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset192.svg',
                },
                digit: {
                  value: 912,
                  label: '个',
                },
                title: '成功故事',
              },
            ],
            bg: {
              classes: 'bg-fill-width bg-shadow',
            },
          },
          {
            type: 'text',
            title: {
              label:
                '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
              style: 'style-v1',
              classes: 'mat-display-1 bold',
            },
            bg: {
              classes: 'bg- bg-fill-width',
            },
            body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
            classes: 'text-center',
            actionsAlign: 'center center',
            actions: [
              {
                type: 'btn-generater',
                label: '生成页面',
                color: 'primary',
                mode: 'raised',
              },
              {
                type: 'btn',
                color: 'primary',
                mode: 'stroked',
                label: '演示视频',
                href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
                target: '_blank',
                icon: {
                  inline: true,
                  svg: 'play-circle-outline',
                },
              },
            ],
          },
        ],
      },
    },
    {
      label: '艺术科学',
      id: 'home-v9',
      icon: {
        svg: 'numeric-9',
      },
      page: {
        title: '首页 v9',
        configBak: {
          headerMode: {
            transparent: true,
            style: 'light',
          },
        },
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
        body: [
          {
            type: 'hero-2v1',
            theme: 'text-light',
            params: {
              height: '750px',
            },
            text: {
              title: {
                label:
                  '欢迎使用 <strong class="text-">Builder</strong> 快速构建页面',
                style: 'style-v1',
                classes: 'mat-display-2',
              },
              spacer: 'xl',
              classes: 'xy-center text-center',
              bg: {
                classes: 'bg-shadow overlay overlay-80',
                img: {
                  src: '/assets/images/hero/1-6.jpg',
                  mobile: '/assets/images/mobile/mobile-03.jpg',
                },
              },
              body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-">Storybook</strong> 页面时添加组件到预览页面。',
              actionsAlign: 'center center',
              actions: [
                {
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: '立刻体验',
                },
              ],
            },
          },
          {
            type: 'showcase-2v2',
            text: {
              title: {
                label:
                  '本年度<strong class="text-primary">艺术作品</strong>代表作',
                style: 'style-v1',
                classes: 'mat-display-2 bold',
              },
              classes: 'text-center',
              body: '<p class="text-center">突破传统的艺术边界，展示前卫和创新的艺术作品</p>',
            },
            row: 4,
            bg: {
              classes: '',
            },
            classes: '',
            elements: [
              {
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
                      ratios: 'media-140',
                      img: {
                        classes: 'object-fit',
                        src: '/assets/images/cases/porto1.jpg',
                        alt: 'lazyload',
                      },
                    },
                    {
                      type: 'feature-box',
                      fullIcon: 'fullscreen',
                      openIcon: 'open_in_new',
                      link: '#',
                      ratios: 'media-140',
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
                  label: '《绝望之境》',
                },
                body: '展现了作者内心深处的黑暗情绪，让观者深陷其中，感受到无尽的绝望与孤独。',
              },
              {
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
                      ratios: 'media-140',
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
                  label: '《色彩之舞》',
                },
                body: '如同一幅绚丽的画卷，色彩的交织与流动呈现出动感和活力，令人心旷神怡。',
              },
              {
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
                      ratios: 'media-140',
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
                  label: '《时间的拥抱》',
                },
                body: '将时间的概念与人类情感相融合，通过流动的线条和温暖的色调传递出对美好回忆的珍视与怀念。',
              },
              {
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
                      ratios: 'media-140',
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
                  label: '《自由的翅膀》',
                },
                body: '象征着无拘束和追求自由的欲望，作品中的动感线条和飞扬的形态让人感受到自由的力量与憧憬。',
              },
            ],
          },
          {
            type: 'showcase-4v1',
            spacer: 'lg',
            text: {
              title: {
                label: 'Storybook 是如何流行于前端开发测试的',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
              classes: 'text-center',
              body: '<p class="text-center">通过Storybook，您可以以交互的方式在浏览器中浏览和测试组件，以确保它们在各种条件下的正确工作。</p>',
            },
            paramsBak: {
              api: 'api/v1/tab/order_process_statistics',
            },
            elements: [
              {
                img: {
                  src: '/assets/images/svg/Asset187.svg',
                },
                digit: {
                  value: 52,
                  label: 'M',
                },
                title: 'Github Start',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset189.svg',
                },
                digit: {
                  value: 32653,
                  label: '+',
                },
                title: 'NPM 周下载量',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset190.svg',
                },
                digit: {
                  value: 3923,
                  label: 'K',
                },
                title: '社区活跃',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset192.svg',
                },
                digit: {
                  value: 912,
                  label: '个',
                },
                title: '成功故事',
              },
            ],
            bg: {
              classes: 'bg-fill-width bg-shadow',
            },
          },
          {
            type: 'carousel-1v2',
            title: {
              label: '近期作品',
              style: 'style-v5',
            },
            classes: '',
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
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                },
              },
              classes: 'p-bottom',
              elements: [
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '知乎社区问答平台',
                  },
                  classes: 'card-no-shadow',
                  body: '面向广大用户提供知识分享和交流的问答社区，具有简洁清晰的界面设计和消息通知系统，支持多种方式的分享和交流。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/5.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: 'Shopify电商平台',
                  },
                  classes: 'card-no-shadow',
                  body: '提供全面电商解决方案的科技公司的官方网站，拥有富有创意的设计和易于使用的交互功能，让用户轻松创建自己的电商网站并实现商业目标。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/6.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  classes: 'card-no-shadow',
                  link: {
                    href: '#',
                    label: '酷狗音乐web版',
                  },
                  body: '支持在线听歌的音乐网站，提供海量音乐资源，拥有个性化的推荐和电台功能。',
                  moreLabel: 'Learn More',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/1.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '全职高手小说官网',
                  },
                  classes: 'card-no-shadow',
                  body: '基于网络文学改编的小说官网，为读者提供轻松愉悦的用户界面和舒适的阅读体验。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/2.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '匠人联盟电商平台',
                  },
                  classes: 'card-no-shadow',
                  body: '面向手工艺爱好者的电商平台，提供独立设计师的手工作品和教程，让用户可以轻松地DIY定制自己的物品。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/3.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '美之味食品官网',
                  },
                  classes: 'card-no-shadow',
                  body: '为用户提供极致美食品味体验的食品官网，展现诱人的图片和独特的设计，吸引用户的注意力并增加销售。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/4.jpg',
                      alt: 'alt',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      label: 'App 应用',
      id: 'home-v10',
      icon: {
        svg: 'numeric-10',
      },
      page: {
        title: '首页 v10',
        configBak: {
          headerMode: {
            transparent: true,
            style: 'light',
          },
        },
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
        body: [
          {
            type: 'hero-1v3',
            spacer: 'xl',
            bg: {
              classes: '',
            },
            classes: '',
            text: {
              title: {
                label:
                  '欢迎使用 <strong class="text-">Builder</strong> 快速构建页面',
                classes: 'mat-display-2 bold',
                style: 'style-v4',
              },
              classes: 'p-x',
              body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong >Storybook</strong> 页面时添加组件到预览页面。',
              actions: [
                {
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: '立刻体验',
                  target: '_blank',
                },
                {
                  type: 'btn-video',
                  color: 'primary',
                  video: {
                    type: 'player',
                    options: {
                      controls: true,
                      aspectRatio: '16:9',
                      poster: '/assets/video/poster01.png',
                      sources: [
                        {
                          src: '/assets/video/storybook.mp4',
                          type: 'video/mp4',
                        },
                      ],
                    },
                  },
                },
              ],
            },
            right: [
              {
                type: 'img',
                hostClasses: 'img-bg-shape',
                src: '/assets/images/illustration/29.png',
              },
            ],
          },
          {
            type: 'showcase-1v1',
            title: {
              label: 'Drupal 已经超越了传统的 CMS 概念',
              style: 'style-v1',
            },
            subTitle: {
              spacer: 'none',
              classes: 'text-center',
              body: '<p class="text-center">可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。无论是一个还是多个站点，Drupal 总是可以游刃有余的构建。</p><br>',
            },
            bg: {
              classes: 'bg-shadow bg-fill-width',
            },
            row: 3,
            classes: '',
            elements: [
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/Asset187.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '高性能',
                },
                content:
                  '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/Asset189.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image primary',
                title: {
                  href: '#',
                  label: '易用的编辑器',
                },
                content:
                  '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/Asset190.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '多语言',
                },
                content:
                  'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
              },
            ],
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/13.png',
                hostClasses: 'position-relative',
                actions: [
                  {
                    color: 'primary',
                    type: 'btn-video',
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/video/poster01.png',
                        sources: [
                          {
                            src: '/assets/video/storybook.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '使用信使构建你们的项目',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
              },
              {
                type: 'swiper',
                params: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  navigation: false,
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'card',
                    title: '高性能',
                    subTitle: 'High Performance',
                    avatar: {
                      src: '/assets/images/avatar/01.jpeg',
                      alt: '',
                    },
                    classes: 'card-no-shadow',
                    body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/02.jpeg',
                      alt: '',
                    },
                    title: '易用的编辑器',
                    subTitle: 'Simplicity for Editors',
                    classes: 'card-no-shadow',
                    body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/03.jpeg',
                      alt: '',
                    },
                    title: '多语言',
                    subTitle: 'Leader in Multilingual',
                    classes: 'card-no-shadow',
                    body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/04.jpeg',
                      alt: '',
                    },
                    title: '更有弹性',
                    subTitle: 'Flexibility',
                    classes: 'card-no-shadow',
                    body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/05.jpeg',
                      alt: '',
                    },
                    title: '安全性',
                    subTitle: 'Rigorous Security',
                    classes: 'card-no-shadow',
                    body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
                  },
                ],
              },
            ],
          },
          {
            id: '',
            spacer: 'xl',
            type: 'showcase-3v9',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/12.png',
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '组件展示和测试',
                  style: 'style-v4',
                  classes: 'mat-display-1',
                },
                body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
                actions: [
                  {
                    href: '#',
                    label: '马上体验',
                  },
                ],
              },
            ],
          },
          {
            id: '',
            spacer: 'xl',
            type: 'showcase-3v9',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-01.png',
              },
            },
            order: {
              left: 0,
              right: 1,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/12.png',
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '文档化',
                  style: 'style-v4',
                  classes: 'mat-display-1',
                },
                body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。<ul class="list-done">\r\n\t<li>使用Markdown或其他文档格式编写组件文档，并将其与组件关联</li>\r\n\t<li>团队成员可以更好地理解和使用组件，减少了沟通成本</li></ul>\r\n',
                actions: [
                  {
                    href: '#',
                    label: '马上体验',
                  },
                ],
              },
            ],
          },
          {
            type: 'carousel-1v3',
            spacer: 'lg',
            text: {
              spacer: 'none',
              title: {
                label: '客户评价',
                icon: '',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
              classes: 'text-center',
              body: '<p class="text-center">Storybook是一个开发工具和UI组件库，用于构建、测试和文档化可复用的UI组件。它提供了一个独立于主应用程序的环境，让开发者能够以隔离的方式开发和调试组件。</p>',
            },
            classes: '',
            bg: {
              classes: 'bg-shadow',
            },
            sliders: {
              params: {
                slidesPerView: 1.1,
                spaceBetween: 20,
                navigation: false,
                breakpoints: {
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                },
              },
              classes: 'p-bottom',
              elements: [
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/01.jpeg',
                  },
                  star: 4,
                  title: '- 张明',
                  subTitle: '前端开发',
                  body: 'Storybook是我们团队的救星！它使我们能够独立地开发、测试和文档化组件，大大提高了我们的工作效率。非常好用！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/02.jpeg',
                  },
                  star: 5,
                  title: '- 王丽',
                  subTitle: '前端开发',
                  body: '使用Storybook后，我们的组件开发变得更加高效和可靠。它帮助我们定义多个使用场景，清晰地展示组件在各种情景下的表现。我们团队对它赞不绝口！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/03.jpeg',
                  },
                  star: 5,
                  title: '- 李军',
                  subTitle: '前端开发',
                  body: 'Storybook为我们的团队带来了极大的协作效益。它提供了一个集中查看和交流的平台，团队成员可以轻松共享和讨论组件。无疑是一个必备工具！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/04.jpeg',
                  },
                  star: 4,
                  title: '- 张燕',
                  subTitle: '前端开发',
                  body: '我们喜欢Storybook的文档化功能。它帮助我们详细记录和展示每个组件的使用方法和属性，使其他团队成员更容易理解和使用。真的很赞！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/05.jpeg',
                  },
                  star: 5,
                  title: '- 王刚',
                  subTitle: '前端开发',
                  body: 'Storybook让我们的前端开发更加流畅。它与我们的主应用程序分离，使我们能够更好地进行单独测试和调试。我们强烈推荐它给其他团队！',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/06.jpeg',
                  },
                  star: 5,
                  title: '- 李丽',
                  subTitle: '前端开发',
                  body: 'Storybook是一个强大而灵活的工具，适用于各种项目和团队规模。我们发现它易于上手，并且它的插件生态系统给我们带来了很多扩展功能的选择。非常棒的工具！',
                },
              ],
            },
          },
          {
            type: 'text',
            title: {
              label:
                '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
              style: 'style-v1',
              classes: 'mat-display-1 bold',
            },
            bg: {
              classes: 'bg- bg-fill-width',
            },
            body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
            classes: 'text-center',
            actionsAlign: 'center center',
            actions: [
              {
                type: 'btn-generater',
                label: '生成页面',
                color: 'primary',
                mode: 'raised',
              },
              {
                type: 'btn',
                color: 'primary',
                mode: 'stroked',
                label: '演示视频',
                href: 'https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5',
                target: '_blank',
                icon: {
                  inline: true,
                  svg: 'play-circle-outline',
                },
              },
            ],
          },
        ],
      },
    },
    {
      label: '客户故事',
      id: 'home-v11',
      icon: {
        svg: 'roman-numeral-1',
      },
      page: {
        title: '首页 v11',
        configBak: {
          headerMode: {
            transparent: true,
            style: 'light',
          },
        },
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
        body: [
          {
            type: 'hero-1v2',
            spacer: 'none',
            classes: 'text-light text-center',
            sliders: {
              params: {
                slidesPerView: 1,
                spaceBetween: 0,
                pagination: true,
              },
              classes: '',
              elements: [
                {
                  title: '使Storybook 是什么？',
                  subTitle:
                    'Storybook是一个开源的前端工具，用于开发、测试和文档化UI组件。它提供了一个独立的环境，开发人员可以在其中构建和展示单个UI组件，而无需依赖于整个应用程序的上下文。',
                  bg: {
                    type: 'bg-img',
                    classes: 'bg-fill-width overlay overlay-40',
                    img: {
                      src: '/assets/images/16-9/business-13.jpg',
                      classes: 'object-fit',
                    },
                  },
                  btn: {
                    href: '#',
                    mode: 'raised',
                    label: '查看更多',
                    pill: true,
                  },
                },
                {
                  title: '组件驱动开发',
                  subTitle:
                    'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
                  bg: {
                    type: 'bg-img',
                    classes: 'bg-fill-width overlay overlay-40',
                    img: {
                      src: '/assets/images/16-9/business-14.jpeg',
                      classes: 'object-fit',
                    },
                  },
                  btn: {
                    href: '#',
                    mode: 'raised',
                    label: '查看更多',
                    pill: true,
                  },
                },
                {
                  title: '组件展示和测试',
                  subTitle:
                    'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
                  bg: {
                    type: 'bg-img',
                    classes: 'bg-fill-width overlay overlay-40',
                    img: {
                      src: '/assets/images/16-9/business-15.jpeg',
                      classes: 'object-fit',
                    },
                  },
                  btn: {
                    href: '#',
                    mode: 'raised',
                    label: '查看更多',
                    pill: true,
                  },
                },
                {
                  title: '文档化',
                  subTitle:
                    'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
                  bg: {
                    type: 'bg-img',
                    classes: 'bg-fill-width overlay overlay-40',
                    img: {
                      src: '/assets/images/16-9/business-16.jpeg',
                      classes: 'object-fit',
                    },
                  },
                  btn: {
                    href: '#',
                    mode: 'raised',
                    label: '查看更多',
                    pill: true,
                  },
                },
              ],
            },
            bg: {
              classes: 'bg-center overlay overlay-80',
              img: {
                src: '/assets/images/hero/bg-pattern-hero.png',
                mobile: '/assets/images/hero/bg-pattern-hero.png',
              },
            },
          },
          {
            type: 'carousel-1v2',
            title: {
              label: '近期作品',
              style: 'style-v5',
            },
            classes: '',
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
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                },
              },
              classes: 'p-bottom',
              elements: [
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '知乎社区问答平台',
                  },
                  classes: 'card-no-shadow',
                  body: '面向广大用户提供知识分享和交流的问答社区，具有简洁清晰的界面设计和消息通知系统，支持多种方式的分享和交流。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/5.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: 'Shopify电商平台',
                  },
                  classes: 'card-no-shadow',
                  body: '提供全面电商解决方案的科技公司的官方网站，拥有富有创意的设计和易于使用的交互功能，让用户轻松创建自己的电商网站并实现商业目标。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/6.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  classes: 'card-no-shadow',
                  link: {
                    href: '#',
                    label: '酷狗音乐web版',
                  },
                  body: '支持在线听歌的音乐网站，提供海量音乐资源，拥有个性化的推荐和电台功能。',
                  moreLabel: 'Learn More',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/1.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '全职高手小说官网',
                  },
                  classes: 'card-no-shadow',
                  body: '基于网络文学改编的小说官网，为读者提供轻松愉悦的用户界面和舒适的阅读体验。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/2.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '匠人联盟电商平台',
                  },
                  classes: 'card-no-shadow',
                  body: '面向手工艺爱好者的电商平台，提供独立设计师的手工作品和教程，让用户可以轻松地DIY定制自己的物品。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/3.jpg',
                      alt: 'alt',
                    },
                  },
                },
                {
                  type: 'card',
                  link: {
                    href: '#',
                    label: '美之味食品官网',
                  },
                  classes: 'card-no-shadow',
                  body: '为用户提供极致美食品味体验的食品官网，展现诱人的图片和独特的设计，吸引用户的注意力并增加销售。',
                  feature: {
                    fullIcon: 'fullscreen',
                    openIcon: 'open_in_new',
                    link: '#',
                    ratios: 'media-4-3',
                    img: {
                      classes: 'object-fit',
                      src: '/assets/images/showcase/4.jpg',
                      alt: 'alt',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      label: '工作室',
      id: 'home-v12',
      icon: {
        svg: 'roman-numeral-2',
      },
      page: {
        title: '首页 v12',
        configBak: {
          headerMode: {
            transparent: true,
            style: 'light',
          },
        },
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
        body: [
          {
            type: 'hero-2v2',
            spacer: 'lg',
            id: 'xxx',
            bg: {
              classes: 'bg-fill-width overlay',
              img: {
                classes: 'object-fit',
                src: '/assets/images/16-9/business-16.jpeg',
              },
            },
            classes: '',
            body: {
              type: 'text',
              title: {
                label:
                  '<p><span data-type="text">艺术点亮生活，为您打造独一无二的艺术之旅</span></p>',
                style: 'style-v4',
                classes: 'mat-display-1',
              },
              body: '<p><span data-type="text">在喧嚣的城市中寻找心灵的绿洲，[您的工作室名称]艺术工作室欢迎您！我们专注于为每一位热爱生活的您，提供个性化、高品质的艺术创作空间和课程服务。从零基础绘画课程到高端私人定制艺术品，让您在挥洒色彩间感受生活的美好。</span></p>',
              actions: [
                {
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: '了解更多',
                  icon: {
                    name: 'chat',
                    inline: true,
                  },
                },
              ],
            },
          },
          {
            type: 'carousel-2v2',
            id: '',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width bg-shadow',
            },
            classes: '',
            sliders: {
              params: {
                slidesPerView: 1.2,
                pagination: false,
                autoplay: {
                  delay: 5000,
                },
                breakpoints: {
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                },
              },
              classes: '',
              elements: [
                {
                  type: 'img',
                  src: '/assets/images/logo/amazon.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/google.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/lenovo.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/paypal.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/shopify.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/spotify.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/logo10.png',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
              ],
            },
          },
          {
            spacer: 'lg',
            bgClasses: 'bg- bg-fill-width',
            overlay: '',
            classes: '',
            id: '',
            bg: {
              img: {
                src: '/assets/images/bg/bg-05.svg',
                classes: 'object-fit',
                alt: 'bg-05',
              },
              classes: 'bg- bg-fill-width',
              overlay: '',
            },
            animate: {
              from: {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                delay: 0,
                duration: 1,
                ease: 'none',
              },
              trigger: {
                onEnter: 'play',
                onLeave: 'none',
                onEnterBack: 'none',
                onLeaveBack: 'none',
                start: 'top 90%',
                end: 'top 40%',
              },
            },
            type: 'showcase-1v4',
            row: 3,
            text: {
              title: {
                label: '特色服务',
                style: 'style-v1',
                classes: 'mat-display-2 bold',
              },
              classes: 'text-center',
              body: '<p class="text-center">沉浸式体验，专业定制，共享艺术的魅力与温度</p>',
            },
            elements: [
              {
                type: 'card-1v5',
                title: '专业艺术课程',
                body: '揭开艺术的神秘面纱，我们的专家团队一对一指导，让您轻松掌握绘画技巧，享受艺术创作的乐趣。',
                more: {
                  href: '/node/1',
                  target: '_blank',
                  label: '查看详情',
                },
                footer: {
                  label: 'Step 01.',
                  icon: {
                    svg: 'chevron-double-right',
                  },
                },
              },
              {
                type: 'card-1v5',
                title: '定制艺术作品',
                body: '无论您是企盼家居装饰的艺术画作，还是希望赠予亲友的独特礼品，[您的工作室名称]都能根据您的需求，为您量身定制专属的艺术品。',
                more: {
                  href: '/node/1',
                  target: '_blank',
                  label: '查看详情',
                },
                footer: {
                  label: 'Step 02.',
                  icon: {
                    svg: 'chevron-double-right',
                  },
                },
              },
              {
                type: 'card-1v5',
                title: '艺术活动策划',
                body: '提供丰富多样的艺术沙龙、工作坊等活动策划，搭建艺术交流平台，让灵感碰撞，让艺术在生活中绽放。',
                more: {
                  href: '/node/1',
                  target: '_blank',
                  label: '查看详情',
                },
                footer: {
                  label: 'Step 03.',
                  icon: {
                    svg: 'check-all',
                  },
                },
              },
            ],
            actions: [
              {
                type: 'btn',
                label: '了解更多',
                mode: 'raised',
                color: 'primary',
                href: '#',
              },
            ],
          },
          {
            spacer: 'lg',
            bgClasses: 'bg- bg-fill-width',
            overlay: '',
            classes: '',
            id: '',
            bg: {
              img: {
                src: '',
                classes: 'object-cover',
                alt: 'bg-05',
              },
              classes: 'bg- bg-fill-width',
              overlay: '',
            },
            animate: {
              from: {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                delay: 0,
                duration: 1,
                ease: 'none',
              },
              trigger: {
                onEnter: 'play',
                onLeave: 'none',
                onEnterBack: 'none',
                onLeaveBack: 'none',
                start: 'top 90%',
                end: 'top 40%',
              },
            },
            type: 'showcase-1v4',
            row: 2,
            text: {
              title: {
                label: '艺术设计之旅：探索创意与美学的奇妙世界',
                style: 'style-v1',
                classes: 'mat-display-2 bold',
              },
              classes: 'text-center',
              body: '<p class="text-center">这次艺术设计之旅不仅仅是一次观赏和欣赏的体验，更是一个与艺术创造亲密接触的机会。参与者们通过参观展览、讲座和工作坊，自己动手创作和表达，发掘了自己内在的艺术潜能和表达能力。</p>',
            },
            elements: [
              {
                type: 'card-1v1',
                link: {
                  href: '#',
                  label: '"创意之夜：探索艺术设计的无限可能"',
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
                    src: '/assets/images/showcase/1.jpg',
                    alt: 'alt',
                  },
                },
                moreLabel: '查看更多',
              },
              {
                type: 'card-1v1',
                link: {
                  href: '#',
                  label: '艺术与科技的交汇点：体验前沿艺术设计活动',
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
                    src: '/assets/images/showcase/2.jpg',
                    alt: 'alt',
                  },
                },
                moreLabel: '查看更多',
              },
              {
                type: 'card-1v1',
                link: {
                  href: '#',
                  label: '美学探险：发现艺术设计的独特魅力',
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
                    src: '/assets/images/showcase/3.jpg',
                    alt: 'alt',
                  },
                },
                moreLabel: '查看更多',
              },
              {
                type: 'card-1v1',
                link: {
                  href: '#',
                  label: '创造与表达：参与互动艺术设计工作坊',
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
                    src: '/assets/images/showcase/4.jpg',
                    alt: 'alt',
                  },
                },
                moreLabel: '查看更多',
              },
            ],
            actions: [
              {
                type: 'btn',
                label: '了解更多',
                mode: 'raised',
                color: 'primary',
                href: '#',
              },
            ],
          },
          {
            type: 'text',
            title: {
              label: '为您打造独一无二的艺术之旅',
              style: 'style-v1',
              classes: 'mat-display-2 bold',
            },
            bg: {
              classes: 'bg- bg-fill-width',
            },
            body: '艺术无界，创意无限。现在就加入吧，让我们共同探索艺术的无限可能，用艺术诠释生活之美！点击预约按钮，开启您的艺术探索之旅吧！',
            classes: 'text-center',
            actionsAlign: 'center center',
            actions: [
              {
                type: 'btn-generater',
                label: '立即联系',
                color: 'primary',
                mode: 'raised',
              },
            ],
          },
        ],
      },
    },
    {
      label: '现代商业',
      id: 'home-v13',
      icon: {
        svg: 'roman-numeral-3',
      },
      page: {
        title: '首页 v13',
        configBak: {
          headerMode: {
            transparent: true,
            style: 'light',
          },
        },
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
        body: [
          {
            type: 'hero-1v3',
            spacer: 'xl',
            classes: '',
            text: {
              title: {
                label:
                  '<p style="display: inline-block; margin-bottom: 0px;">为您的业务提供强大的运营方案</p>',
                classes: 'mat-display-2 bold',
                style: 'style-v4',
              },
              classes: 'text-light',
              body: '您的产品是独一无二的，而我们的目标是让更多的人了解它们、爱上它们，并成为您的忠实粉丝。我们是一家专注于产品宣传运营方案的公司，致力于帮助您实现品牌的价值最大化。',
              actions: [
                {
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: '立刻咨询',
                  target: '_blank',
                },
              ],
            },
            right: [
              {
                type: 'img',
                hostClasses: 'img-bg-shape',
                src: '/assets/images/illustration/02.png',
                style: {
                  width: 'auto',
                  height: 'auto',
                  opacity: 1,
                  borderRadius: 0,
                  boxShadow: 'none',
                  aspectRatio: 'auto',
                  objectFit: 'initial',
                },
              },
            ],
            bg: {
              classes: 'bg-fill-width bg-primary bg-center',
              img: {
                src: '/assets/images/bg/bg-hero.svg',
                mobile: '/assets/images/bg/bg-hero.svg',
              },
            },
          },
          {
            type: 'carousel-2v2',
            id: '',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width bg-',
            },
            classes: '',
            sliders: {
              params: {
                slidesPerView: 1.2,
                pagination: false,
                autoplay: {
                  delay: 5000,
                },
                breakpoints: {
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                },
              },
              classes: '',
              elements: [
                {
                  type: 'img',
                  src: '/assets/images/logo/amazon.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/google.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/lenovo.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/paypal.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/shopify.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/spotify.svg',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
                {
                  type: 'img',
                  src: '/assets/images/logo/logo10.png',
                  href: '#',
                  alt: '',
                  style: {
                    width: 'auto',
                    height: '40px',
                  },
                },
              ],
            },
          },
          {
            type: 'showcase-1v1',
            title: {
              label:
                '<p style="display: inline-block; margin-bottom: 0px;">我们的服务</p>',
              style: 'style-v2',
            },
            subTitle: {
              spacer: 'none',
              classes: 'text-center',
              body: '无论您是刚刚起步还是已经拥有一定市场份额，我们都能为您提供最佳的宣传解决方案。立即与我们联系，让我们一起开启成功之旅！',
            },
            bg: {
              classes: 'bg-shadow bg-fill-width',
            },
            row: 3,
            classes: '',
            elements: [
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/Asset187.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '定制化宣传方案',
                },
                content:
                  '我们根据您的产品特点和目标受众，为您量身打造个性化的宣传方案，确保每一份计划都能为您的产品增添光彩。',
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/Asset189.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image primary',
                title: {
                  href: '#',
                  label: '多渠道推广',
                },
                content:
                  '无论是社交媒体、线上广告还是线下宣传，我们都拥有丰富的经验和资源，可以帮助您在各个渠道上进行有针对性的推广，吸引更多潜在客户。',
              },
              {
                type: 'box',
                img: {
                  src: '/assets/images/svg/Asset190.svg',
                  alt: 'browser',
                },
                style: 'style-v3 use-image',
                title: {
                  href: '#',
                  label: '内容创意设计',
                },
                content:
                  '我们的创意团队将为您量身打造引人入胜的宣传内容，从文字到视觉设计，每一个细节都精心雕琢，让您的品牌故事更加生动有趣。 ',
              },
            ],
          },
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            bg: {
              classes: 'bg-fill-width',
              img: {
                src: '/assets/images/bg/bg-02.png',
              },
            },
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/13.png',
                hostClasses: 'position-relative',
                actions: [
                  {
                    color: 'primary',
                    type: 'btn-video',
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/video/poster01.png',
                        sources: [
                          {
                            src: '/assets/video/storybook.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '为何选择我们？',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
              },
              {
                type: 'swiper',
                params: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  navigation: false,
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'card',
                    title: '专业团队',
                    subTitle: 'High Performance',
                    avatar: {
                      src: '/assets/images/avatar/01.jpeg',
                      alt: '',
                    },
                    classes: 'card-no-shadow',
                    body: '我们拥有经验丰富的专业团队，可以为您提供一流的服务和支持。',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/02.jpeg',
                      alt: '',
                    },
                    title: '创意无限',
                    subTitle: 'Simplicity for Editors',
                    classes: 'card-no-shadow',
                    body: '我们热爱创意，不断追求创新，为您带来充满惊喜的宣传方案。',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/03.jpeg',
                      alt: '',
                    },
                    title: '成本效益',
                    subTitle: 'Leader in Multilingual',
                    classes: 'card-no-shadow',
                    body: '我们的服务不仅高效，而且价格合理，让您享受到最大的成本效益。',
                  },
                ],
              },
            ],
          },
          {
            type: 'showcase-4v1',
            spacer: 'lg',
            text: {
              title: {
                label: '让您的产品引领潮流，我们助您一臂之力',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
              classes: 'text-center',
              body: '<p class="text-center">赋予品牌力量，精准定位市场 —— 专业定制化市场宣传解决方案</p>',
            },
            paramsBak: {
              api: 'api/v1/tab/order_process_statistics',
            },
            elements: [
              {
                img: {
                  src: '/assets/images/svg/Asset187.svg',
                },
                digit: {
                  value: 20,
                  label: '%',
                },
                title: '营收增长',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset189.svg',
                },
                digit: {
                  value: 5000,
                  label: '+',
                },
                title: '全球企业',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset190.svg',
                },
                digit: {
                  value: 150,
                  label: '项',
                },
                title: '专利技术',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset192.svg',
                },
                digit: {
                  value: 1000,
                  label: '万',
                },
                title: '环保公益事业',
              },
            ],
          },
          {
            spacer: 'md',
            bgClasses: 'bg-fill-width overlay overlay-80',
            overlay: ' ',
            classes: 'text-light',
            id: '',
            bg: {
              img: {
                src: '/assets/images/showcase/6.jpg',
                classes: 'object-contain',
                alt: '6',
                hostClasses: 'bg-center',
              },
              classes: 'bg-fill-width overlay overlay-80',
              overlay: ' ',
            },
            animate: {
              from: {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                delay: 0,
                duration: 1,
                ease: 'none',
              },
              trigger: {
                onEnter: 'play',
                onLeave: 'none',
                onEnterBack: 'none',
                onLeaveBack: 'none',
                start: 'top 90%',
                end: 'top 40%',
              },
            },
            type: 'showcase-1v3',
            text: {
              title: {
                label:
                  '<p style="display: inline-block; margin-bottom: 0px;">市场领导力</p>',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
            },
            elements: [
              {
                type: 'text',
                spacer: 'none',
                style: {
                  margin: '0 auto',
                  'text-align': 'center',
                  width: '600px',
                },
                body: '作为行业领导者，我们公司凭借卓越的产品质量、创新的技术研发以及优质的客户服务，在市场中稳居主导地位，持续引领行业发展。',
                actionsAlign: 'center center',
                actions: [
                  {
                    type: 'btn-video',
                    color: 'primary',
                    video: {
                      type: 'player',
                      options: {
                        controls: true,
                        aspectRatio: '16:9',
                        poster: '/assets/video/poster01.png',
                        sources: [
                          {
                            src: '/assets/video/storybook.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'showcase-1v4',
            spacer: 'lg',
            bg: {
              classes: 'bg- bg-fill-width',
            },
            row: 4,
            classes: '',
            text: {
              title: {
                label: '会员等级与专属服务',
                style: 'style-v1',
                classes: 'mat-display-2 bold',
              },
              classes: 'text-center',
              body: '<p class="text-center">我们为您提供了一系列多样化的会员等级和相应的专属服务，旨在打造个性化的艺术设计体验。无论您是刚起步的爱好者还是专业设计师，我们的会员计划将满足您不同层次和需求。</p>',
            },
            elements: [
              {
                title: {
                  label: '免费',
                  classes: '',
                },
                type: 'card-1v6',
                prefix: '¥',
                number: '0',
                suffix: '/月',
                body: '<ul class="list-done"><li>获得免费访问平台的权限</li><li>浏览平台上公开的内容和资源</li><li>参与在线社区讨论和互动</li></ul>',
                actionsAlign: 'start center',
                actions: [
                  {
                    type: 'btn',
                    href: '/node/1',
                    target: '_blank',
                    label: '立即注册',
                    mode: 'raised',
                    color: 'primary',
                  },
                ],
              },
              {
                title: {
                  label: '初级会员',
                  classes: 'text-primary',
                },
                type: 'card-1v6',
                prefix: '¥',
                number: '99',
                suffix: '/月',
                classes: 'bg-light',
                body: '<ul class="list-done"><li>所有免费会员功能</li><li>享受高质量、独家的内容和教程</li><li>获得快速响应的客户支持服务</li><li>参与平台举办的活动和专属优惠</li></ul>',
                actionsAlign: 'start center',
                actions: [
                  {
                    type: 'btn',
                    href: '/node/1',
                    target: '_blank',
                    label: '立即购买',
                    mode: 'raised',
                    color: 'primary',
                  },
                ],
              },
              {
                title: {
                  label: '高级会员',
                  classes: '',
                },
                type: 'card-1v6',
                prefix: '¥',
                number: '899',
                suffix: '/月',
                body: '<ul class="list-done"><li>所有初级会员功能</li><li>获取深入的教程和指导</li><li>允许下载平台上的资源和素材</li><li>获得个性化的设计建议和反馈</li></ul>',
                actionsAlign: 'start center',
                actions: [
                  {
                    type: 'btn',
                    href: '/node/1',
                    target: '_blank',
                    label: '立即购买',
                    mode: 'raised',
                    color: 'primary',
                  },
                ],
              },
              {
                title: {
                  label: '白金会员',
                  classes: '',
                },
                type: 'card-1v6',
                prefix: '¥',
                number: '2889',
                suffix: '/月',
                body: '<ul class="list-done"><li>所有高级会员功能</li><li>使用平台提供的高级设计工具和插件</li><li>参与专业会员专属的培训和活动</li><li>与专业设计师一对一的指导</li></ul>',
                actionsAlign: 'start center',
                actions: [
                  {
                    type: 'btn',
                    href: '/node/1',
                    target: '_blank',
                    label: '立即购买',
                    mode: 'raised',
                    color: 'primary',
                  },
                ],
              },
            ],
          },
          {
            type: 'carousel-1v3',
            spacer: 'lg',
            text: {
              spacer: 'none',
              title: {
                label: '客户评价',
                icon: '',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
              classes: 'text-center',
              body: '在我们的客户眼中，我们不仅是一家提供服务的公司，更是他们成功路上的坚实支撑和伙伴。让我们为您的品牌增添成功的见证！',
            },
            classes: '',
            bg: {
              classes: 'bg-shadow',
            },
            sliders: {
              params: {
                slidesPerView: 1.1,
                spaceBetween: 20,
                navigation: false,
                breakpoints: {
                  '600': {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  '960': {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                },
              },
              classes: 'p-bottom',
              elements: [
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/01.jpeg',
                  },
                  star: 4,
                  title: '- 张明',
                  subTitle: 'CEO',
                  body: '合作是一次愉快的经历！他们的团队专业且富有创意，为我们的产品制定了一系列精准有效的宣传方案，帮助我们快速扩大了市场份额。',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/02.jpeg',
                  },
                  star: 5,
                  title: '- 王丽',
                  subTitle: '市场经理',
                  body: '他们不仅提供了优质的服务，还通过数据分析为我们提供了宝贵的反馈，让我们的宣传活动更加精准和有效。',
                },
                {
                  type: 'card-1v4',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/avatar/03.jpeg',
                  },
                  star: 5,
                  title: '- 李军',
                  subTitle: '初创企业创始人',
                  body: '团队总是能够超越我们的期望，他们的创意和执行力让我们的产品在市场上脱颖而出，为我们赢得了众多忠实客户。',
                },
              ],
            },
          },
          {
            type: 'text',
            title: {
              label: '立即与我们联系，让您的产品故事闪耀全球！',
              style: 'style-v1',
              classes: 'mat-display-2 bold',
            },
            bg: {
              classes: 'bg- bg-fill-width',
            },
            body: '无论您是刚刚起步还是已经拥有一定市场份额，我们都能为您提供最佳的宣传解决方案。立即与我们联系，让我们一起开启成功之旅！',
            classes: 'text-center',
            actionsAlign: 'center center',
            actions: [
              {
                type: 'btn-generater',
                label: '立即联系',
                color: 'primary',
                mode: 'raised',
              },
            ],
          },
        ],
      },
    },
    {
      label: '满屏',
      id: 'home-v14',
      icon: {
        svg: 'roman-numeral-4',
      },
      page: {
        title: '首页 v14',
        configBak: {
          headerMode: {
            transparent: true,
            style: 'light',
          },
        },
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
        body: [
          {
            type: 'carousel-1v1',
            spacer: 'none',
            disableContainer: true,
            bg: {
              classes: '',
            },
            sliders: {
              classes: 'full-screen',
              params: {
                direction: 'vertical',
                slidesPerView: 1,
                speed: 600,
                mousewheel: true,
                effect: 'slide',
                pagination: {
                  clickable: true,
                },
                navigation: true,
                autoplay: false,
                breakpoints: {
                  '600': {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  '960': {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                },
              },
              elements: [
                {
                  sliderClasses: 'slider-center',
                  spacer: 'none',
                  type: 'hero-1v1',
                  classes: 'text-light text-center',
                  bg: {
                    classes: '',
                  },
                  sliders: {
                    params: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                      pagination: false,
                    },
                    classes: '',
                    elements: [
                      {
                        type: 'text',
                        spacer: 'xl',
                        title: {
                          label: '组件驱动开发',
                          style: 'style-v1',
                          classes: 'mat-display-2 bold',
                        },
                        classes: 'xy-center',
                        bg: {
                          classes: 'bg-center overlay overlay-80',
                          img: {
                            src: '/assets/images/16-9/business-14.jpeg',
                            mobile: '/assets/images/mobile/mobile-03.jpg',
                          },
                        },
                        body: '<p style="font-size:18px">Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"</p>',
                        actionsAlign: 'center center',
                        actions: [
                          {
                            type: 'btn',
                            mode: 'raised',
                            color: 'primary',
                            href: '#',
                            label: '立刻体验',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        title: {
                          label: '组件展示和测试',
                          style: 'style-v1',
                          classes: 'mat-display-2 bold',
                        },
                        spacer: 'xl',
                        classes: 'xy-center text-light',
                        bg: {
                          classes: 'bg-shadow  overlay overlay-80',
                          img: {
                            src: '/assets/images/16-9/business-15.jpeg',
                            mobile: '/assets/images/mobile/mobile-04.jpg',
                          },
                        },
                        body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。',
                        actionsAlign: 'center center',
                        actions: [
                          {
                            type: 'btn',
                            mode: 'raised',
                            color: 'primary',
                            href: '#',
                            label: '立刻体验',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        title: {
                          label: '文档化',
                          style: 'style-v1',
                          classes: 'mat-display-2 bold',
                        },
                        spacer: 'xl',
                        classes: 'xy-center text-light',
                        bg: {
                          classes: 'bg-shadow  overlay overlay-80',
                          img: {
                            src: '/assets/images/16-9/business-15.jpeg',
                            mobile: '/assets/images/mobile/mobile-04.jpg',
                          },
                        },
                        body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。',
                        actionsAlign: 'center center',
                        actions: [
                          {
                            type: 'btn',
                            mode: 'raised',
                            color: 'primary',
                            href: '#',
                            label: '立刻体验',
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  sliderClasses: 'slider-center',
                  type: 'showcase-1v4',
                  spacer: 'lg',
                  bg: {
                    classes: 'bg- bg-fill-width',
                  },
                  row: 3,
                  classes: '',
                  text: {
                    title: {
                      label:
                        '使用 <strong class="text-primary">Storybook</strong> 开发组件',
                      style: 'style-v1',
                      classes: 'mat-display-2 bold',
                    },
                    body: '<p class="text-center">Storybook是一个面向UI组件开发的工具，它提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。</p>',
                  },
                  elements: [
                    {
                      type: 'card-1v5',
                      title: '初始化 ',
                      body: '使用 Npm 安装初始化 Storybook，在配置文件中定义组件库的入口和存放的目录。',
                      more: {
                        href: '/node/1',
                        target: '_blank',
                        label: '查看详情',
                      },
                      footer: {
                        label: 'Step 01.',
                        icon: {
                          svg: 'chevron-double-right',
                        },
                      },
                    },
                    {
                      type: 'card-1v5',
                      title: '创建和编写组件Story',
                      body: '在组件库中创建stories，导入要展示的组件，使用装饰器添加样式、数据和事件。',
                      more: {
                        href: '/node/1',
                        target: '_blank',
                        label: '查看详情',
                      },
                      footer: {
                        label: 'Step 02.',
                        icon: {
                          svg: 'chevron-double-right',
                        },
                      },
                    },
                    {
                      type: 'card-1v5',
                      title: '启动',
                      body: '在浏览器中打开预览页面，查看和交互组件的各个示例和文档。',
                      more: {
                        href: '/node/1',
                        target: '_blank',
                        label: '查看详情',
                      },
                      footer: {
                        label: 'Step 03.',
                        icon: {
                          svg: 'check-all',
                        },
                      },
                    },
                  ],
                  actions: [
                    {
                      type: 'btn',
                      mode: 'raised',
                      color: 'primary',
                      href: '#',
                      label: '开始',
                    },
                  ],
                },
                {
                  sliderClasses: 'slider-center',
                  type: 'showcase-3v4',
                  title: {
                    label: '为什么你将会喜欢这个前端框架？',
                    style: 'style-v1',
                  },
                  bg: {
                    classes: 'bg-light bg-fill-width',
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
                      content:
                        'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
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
                      content:
                        '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作',
                      more: {
                        href: '#',
                        label: '更多',
                      },
                    },
                  ],
                },
                {
                  sliderClasses: 'slider-center',
                  type: 'showcase-3v5',
                  id: '',
                  bg: {
                    classes: 'bg-shadow bg-fill-width',
                  },
                  classes: '',
                  img: {
                    src: '/assets/images/illustration/27.png',
                    alt: 'OUR FEATURES',
                  },
                  elements: [
                    {
                      type: 'box',
                      style: 'style-v8',
                      icon: {
                        name: 'verified_user',
                      },
                      title: {
                        href: '/',
                        label: '组件编辑',
                      },
                      content: '通过简单的管理界面对复杂的可视化编辑',
                      more: {},
                    },
                    {
                      type: 'box',
                      style: 'style-v8',
                      icon: {
                        name: 'favorite',
                      },
                      title: {
                        href: '/',
                        label: '多语言',
                      },
                      content:
                        'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
                      more: {},
                    },
                    {
                      type: 'box',
                      style: 'style-v8',
                      icon: {
                        name: 'android',
                      },
                      title: {
                        href: '/',
                        label: '高性能',
                      },
                      content:
                        '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快',
                      more: {},
                    },
                    {
                      type: 'box',
                      style: 'style-v8',
                      icon: {
                        name: 'devices',
                      },
                      title: {
                        href: '/',
                        label: '易用的编辑器',
                      },
                      content:
                        '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作',
                      more: {},
                    },
                    {
                      icon: {
                        name: 'border_all',
                      },
                      style: 'style-v8',
                      title: {
                        href: '#',
                        label: '更有弹性',
                      },
                      content:
                        '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建',
                    },
                    {
                      icon: {
                        name: 'functions',
                      },
                      style: 'style-v8',
                      title: {
                        href: '#',
                        label: '安全性',
                      },
                      content:
                        '超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一',
                    },
                  ],
                },
                {
                  sliderClasses: 'slider-center',
                  type: 'showcase-3v7',
                  bg: {
                    classes: 'bg-shadow bg-fill-width',
                  },
                  classes: '',
                  img: {
                    src: '/assets/images/illustration/27.png',
                    alt: 'OUR FEATURES',
                  },
                  left: [
                    {
                      type: 'box',
                      style: 'style-v10',
                      icon: {
                        name: 'verified_user',
                      },
                      title: {
                        href: '/',
                        label: '组件编辑',
                      },
                      content: '通过简单的管理界面对复杂的可视化编辑',
                      more: {},
                    },
                    {
                      type: 'box',
                      style: 'style-v10',
                      icon: {
                        name: 'favorite',
                      },
                      title: {
                        href: '/',
                        label: '多语言',
                      },
                      content:
                        'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程',
                      more: {},
                    },
                    {
                      type: 'box',
                      style: 'style-v10',
                      icon: {
                        name: 'android',
                      },
                      title: {
                        href: '/',
                        label: '高性能',
                      },
                      content:
                        '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快',
                      more: {},
                    },
                  ],
                  right: [
                    {
                      type: 'box',
                      style: 'style-v8',
                      icon: {
                        name: 'devices',
                      },
                      title: {
                        href: '/',
                        label: '易用的编辑器',
                      },
                      content:
                        '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作',
                      more: {},
                    },
                    {
                      icon: {
                        name: 'border_all',
                      },
                      style: 'style-v8',
                      title: {
                        href: '#',
                        label: '更有弹性',
                      },
                      content:
                        '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建',
                    },
                    {
                      icon: {
                        name: 'functions',
                      },
                      style: 'style-v8',
                      title: {
                        href: '#',
                        label: '安全性',
                      },
                      content:
                        '超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一',
                    },
                  ],
                },
                {
                  type: 'text',
                  spacer: 'md',
                  body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。<ul class="list-done"><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li><li>可以直接编辑组件的 JSON，所见即所得；</li></ul>',
                  title: {
                    label:
                      '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
                    style: 'style-v1',
                    classes: 'mat-display-2 bold',
                  },
                  bg: {
                    classes: 'bg- bg-fill-width',
                  },
                  actionsAlign: 'center center',
                  actions: [
                    {
                      type: 'btn',
                      mode: 'raised',
                      color: 'primary',
                      href: '#',
                      label: '开始',
                    },
                    {
                      type: 'closeDialog',
                      label: 'Ok',
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
