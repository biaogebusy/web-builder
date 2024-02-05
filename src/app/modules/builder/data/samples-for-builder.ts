export const samples = {
  label: '构建示例',
  elements: [
    {
      label: '经典布局',
      id: 'home',
      icon: {
        svg: 'numeric-1',
      },
      page: {
        title: '首页 v1',
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
            type: 'showcase-1v1',
            classes: 'features-absolute',
            spacer: 'lg',
            bg: {
              classes: 'bg-shadow bg-fill-width',
            },
            row: 4,
            elements: [
              {
                icon: {
                  svg: 'palette-advanced',
                },
                style: 'style-v9',
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
                icon: {
                  svg: 'palette',
                },
                style: 'style-v9',
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
                icon: {
                  svg: 'format-list-text',
                },
                style: 'style-v9',
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
                icon: {
                  svg: 'microsoft-visual-studio-code',
                },
                style: 'style-v9',
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
            type: 'showcase-3v2',
            text: {
              title: {
                label:
                  '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
                style: 'style-v1',
                classes: 'mat-display-2 bold',
              },
              body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。 ',
            },
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
                    label: '组件驱动开发',
                    style: 'style-v4',
                    classes: 'mat-display-2',
                  },
                  body: '<strong class="text-primary">Storybook</strong> 采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。<ul class="list-done">\r\n\t<li>为每个UI组件创建"stories"</li>\r\n\t<li>描述组件在不同状态和交互方式下的行为和外观</li>\r\n\t<li>提高组件的可重用性和可测试性</li>\r\n</ul>\r\n',
                  actions: [
                    {
                      type: 'btn',
                      color: 'primary',
                      mode: 'raised',
                      href: '#',
                      label: '马上体验',
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
                    classes: 'mat-display-2',
                  },
                  body: '<strong class="text-primary">Storybook</strong> 提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
                  actions: [
                    {
                      type: 'btn',
                      color: 'primary',
                      mode: 'raised',
                      href: '#',
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
                    classes: 'mat-display-2',
                  },
                  body: '<strong class="text-primary">Storybook</strong> 不仅可以展示和测试组件，还可以自动生成组件的文档。<ul class="list-done">\r\n\t<li>使用Markdown或其他文档格式编写组件文档，并将其与组件关联</li>\r\n\t<li>团队成员可以更好地理解和使用组件，减少了沟通成本</li></ul>\r\n',
                  actions: [
                    {
                      type: 'btn',
                      color: 'primary',
                      mode: 'raised',
                      href: '#',
                      label: '马上体验',
                    },
                  ],
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
                  value: 963,
                  label: '+',
                },
                title: '日访问人数',
              },
              {
                icon: {
                  name: 'verified_user',
                },
                digit: {
                  value: 219,
                  label: '+',
                },
                title: '日打开次数',
              },
              {
                icon: {
                  name: 'android',
                },
                digit: {
                  value: 88,
                  label: '人',
                },
                title: '日新增人数',
              },
              {
                icon: {
                  name: 'mail',
                },
                digit: {
                  value: 6090,
                  label: '万',
                },
                title: '累计用户数',
              },
            ],
          },
          {
            type: 'carousel-2v1',
            title: {
              label: '用户是如何评价 Storybook',
              style: 'style-v1',
            },
            bg: {
              classes: 'bg-fill-width overlay overlay-80',
              img: {
                src: '/assets/images/bg/bg-03.jpeg',
                hostClasses: 'bg-center',
              },
            },
            classes: '',
            sliders: {
              params: {
                slidesPerView: 1,
                pagination: false,
                autoplay: {
                  delay: 5000,
                },
              },
              classes: 'p-bottom',
              elements: [
                {
                  type: 'testimonial',
                  style: 'style-v2',
                  title: 'Johnson',
                  subTitle: 'FrontEnd',
                  img: {
                    src: '/assets/images/avatar/01.jpeg',
                    alt: '',
                  },
                  body: 'Storybook是一个开发工具和UI组件库，用于构建、测试和文档化可复用的UI组件。它提供了一个独立于主应用程序的环境，让开发者能够以隔离的方式开发和调试组件。',
                },
                {
                  type: 'testimonial',
                  style: 'style-v2',
                  title: 'Will',
                  subTitle: 'FrontEnd',
                  img: {
                    src: '/assets/images/avatar/02.jpeg',
                    alt: '',
                  },
                  body: 'Storybook是我们团队的救星！它使我们能够独立地开发、测试和文档化组件，大大提高了我们的工作效率。非常好用！',
                },
                {
                  type: 'testimonial',
                  style: 'style-v2',
                  title: 'Ammy',
                  subTitle: 'Backend',
                  img: {
                    src: '/assets/images/avatar/03.jpeg',
                    alt: '',
                  },
                  body: '使用Storybook后，我们的组件开发变得更加高效和可靠。它帮助我们定义多个使用场景，清晰地展示组件在各种情景下的表现。我们团队对它赞不绝口！ ',
                },
                {
                  type: 'testimonial',
                  style: 'style-v2',
                  title: 'Alen',
                  subTitle: 'FrontEnd',
                  img: {
                    src: '/assets/images/avatar/04.jpeg',
                    alt: '',
                  },
                  body: 'Storybook为我们的团队带来了极大的协作效益。它提供了一个集中查看和交流的平台，团队成员可以轻松共享和讨论组件。无疑是一个必备工具！ ',
                },
              ],
            },
          },
          {
            type: 'showcase-2v1',
            text: {
              title: {
                label: 'Drupal 优秀案例',
                style: 'style-v1',
                classes: 'mat-display-2 bold',
              },
              body: '<p class="text-center">欢迎分享 Drupal 优秀的数字创新体验</p>',
            },
            bg: {
              classes: '',
            },
            classes: '',
            row: 5,
            elements: [
              {
                type: 'card',
                subTitle: '2024-02-04',
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
                subTitle: '2024-02-04',
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
                subTitle: '2024-02-04',
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
                subTitle: '2024-02-04',
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
                subTitle: '2024-02-04',
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
                subTitle: '2024-02-04',
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
                subTitle: '2024-02-04',
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
                subTitle: '2024-02-04',
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
          },
          {
            type: 'video-bg',
            source: {
              src: '/assets/video/storybook.mp4',
              type: 'video/mp4',
            },
            bg: {
              classes: 'bg-fill-width overlay overlay-80',
            },
            classes: '',
            elements: [
              {
                type: 'showcase-1v3',
                title: {
                  label: 'Storybook 是什么？',
                  style: 'style-v1',
                  classes: 'mat-display-1',
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
                    body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文，Storybook是一个用于开发和展示UI组件的工具。',
                    actionsAlign: 'center center',
                    actions: [
                      {
                        label: '了解更多',
                        type: 'btn',
                        href: '#',
                        mode: 'raised',
                        color: 'primary',
                      },
                      {
                        label: '回到官网',
                        type: 'btn',
                        href: '#',
                        icon: {
                          inline: true,
                          svg: 'home',
                        },
                      },
                    ],
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
                label: '体验生成页面',
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
                  value: 963,
                  label: '+',
                },
                title: '日访问人数',
              },
              {
                icon: {
                  name: 'verified_user',
                },
                digit: {
                  value: 219,
                  label: '+',
                },
                title: '日打开次数',
              },
              {
                icon: {
                  name: 'android',
                },
                digit: {
                  value: 88,
                  label: '人',
                },
                title: '日新增人数',
              },
              {
                icon: {
                  name: 'mail',
                },
                digit: {
                  value: 6090,
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
                label: '体验生成页面',
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
                label: '体验生成页面',
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
                label: '体验生成页面',
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
                label:
                  '欢迎使用 <strong class="text-">Builder</strong> 快速构建页面',
                classes: 'mat-display-2 bold',
                style: 'style-v4',
              },
              classes: 'text-light',
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
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: 'Demo',
                  target: '_blank',
                },
                {
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: '下载',
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
                label: '体验生成页面',
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
                label: '体验生成页面',
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
                  value: 42,
                  label: 'M',
                },
                title: 'Github Start',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset189.svg',
                },
                digit: {
                  value: 28177,
                  label: '+',
                },
                title: 'NPM 周下载量',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset190.svg',
                },
                digit: {
                  value: 2173,
                  label: 'K',
                },
                title: '社区活跃',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset192.svg',
                },
                digit: {
                  value: 682,
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
                label: '体验生成页面',
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
              classes: 'xy-center',
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
                {
                  type: 'closeDialog',
                  label: 'Ok',
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
                  value: 42,
                  label: 'M',
                },
                title: 'Github Start',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset189.svg',
                },
                digit: {
                  value: 28177,
                  label: '+',
                },
                title: 'NPM 周下载量',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset190.svg',
                },
                digit: {
                  value: 2173,
                  label: 'K',
                },
                title: '社区活跃',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset192.svg',
                },
                digit: {
                  value: 682,
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
          {
            type: 'list-2v1',
            title: {
              label: '最新文章',
              style: 'style-v4',
              classes: 'mat-display-1',
            },
            params: {
              apiBak: '/api/v2/xxx',
            },
            bg: {
              classes: '',
            },
            classes: '',
            more: {
              label: '查看更多',
              href: '#',
              mode: 'raised',
              color: 'primary',
            },
            elements: [
              {
                link: {
                  label: 'ChartGPT：开启自动生成数据可视化的新时代',
                  href: '#',
                },
                subTitle: '人工智能与数据科学',
                body: '探索ChartGPT，一种基于生成模型的技术，它能够自动从数据中生成精美的数据可视化图表。本文介绍了ChartGPT的工作原理、应用场景和潜在的影响，展示了它在数据分析和可视化领域的巨大潜力。',
                img: {
                  src: '/assets/images/16-9/business-06.jpg',
                  alt: '',
                },
              },
              {
                link: {
                  label: 'ChartGPT vs. 传统数据可视化工具：新老对决',
                  href: '#',
                },
                subTitle: '技术比较与评估',
                body: 'ChartGPT作为一种新兴的数据可视化技术，与传统的数据可视化工具展开竞争。本文比较了ChartGPT与传统工具在可视化质量、自动化程度和用户体验等方面的异同，并探讨了它们在不同场景下的适用性和优劣势。',
                img: {
                  src: '/assets/images/16-9/business-07.jpg',
                  alt: '',
                },
              },
              {
                link: {
                  label: 'ChartGPT应用实践：数据洞察的新探索',
                  href: '#',
                },
                subTitle: '数据分析与应用',
                body: '通过实际案例，本文展示了ChartGPT在数据洞察和决策支持方面的应用实践。从金融、市场营销到医疗健康，ChartGPT为数据分析师和决策者提供了一种创新的工具，帮助他们从海量数据中发现有价值的见解，并做出更准确的决策。',
                img: {
                  src: '/assets/images/16-9/business-13.jpg',
                  alt: '',
                },
              },
            ],
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
              label: 'Drupal 已经超越了传统的 Web概念',
              style: 'style-v1',
            },
            subTitle: {
              spacer: 'none',
              body: '<p class="text-center">可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。无论是一个还是多个站点，Drupal 总是可以游刃有余的构建。</p><br>',
            },
            bg: {
              classes: 'bg-shadow bg-fill-width',
            },
            row: 3,
            classes: '',
            elements: [
              {
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
                  classes: 'mat-display-2',
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
                  classes: 'mat-display-2',
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
                label: '体验生成页面',
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
                    classes: 'round-btn',
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
                    classes: 'round-btn',
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
                    classes: 'round-btn',
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
                    classes: 'round-btn',
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
          {
            type: 'list-2v1',
            title: {
              label: '最新文章',
              style: 'style-v4',
              classes: 'mat-display-1',
            },
            params: {
              apiBak: '/api/v2/xxx',
            },
            bg: {
              classes: '',
            },
            classes: '',
            more: {
              label: '查看更多',
              href: '#',
              mode: 'raised',
              color: 'primary',
            },
            elements: [
              {
                link: {
                  label: 'ChartGPT：开启自动生成数据可视化的新时代',
                  href: '#',
                },
                subTitle: '人工智能与数据科学',
                body: '探索ChartGPT，一种基于生成模型的技术，它能够自动从数据中生成精美的数据可视化图表。本文介绍了ChartGPT的工作原理、应用场景和潜在的影响，展示了它在数据分析和可视化领域的巨大潜力。',
                img: {
                  src: '/assets/images/16-9/business-06.jpg',
                  alt: '',
                },
              },
              {
                link: {
                  label: 'ChartGPT vs. 传统数据可视化工具：新老对决',
                  href: '#',
                },
                subTitle: '技术比较与评估',
                body: 'ChartGPT作为一种新兴的数据可视化技术，与传统的数据可视化工具展开竞争。本文比较了ChartGPT与传统工具在可视化质量、自动化程度和用户体验等方面的异同，并探讨了它们在不同场景下的适用性和优劣势。',
                img: {
                  src: '/assets/images/16-9/business-07.jpg',
                  alt: '',
                },
              },
              {
                link: {
                  label: 'ChartGPT应用实践：数据洞察的新探索',
                  href: '#',
                },
                subTitle: '数据分析与应用',
                body: '通过实际案例，本文展示了ChartGPT在数据洞察和决策支持方面的应用实践。从金融、市场营销到医疗健康，ChartGPT为数据分析师和决策者提供了一种创新的工具，帮助他们从海量数据中发现有价值的见解，并做出更准确的决策。',
                img: {
                  src: '/assets/images/16-9/business-13.jpg',
                  alt: '',
                },
              },
            ],
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
                label: '开源项目使用 Github actions 自动化',
                style: 'style-v4',
                classes: 'mat-display-1',
              },
              body: '<p>Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p>',
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
                label: '了解更多',
                mode: 'raised',
                color: 'primary',
                href: '#',
              },
            ],
          },
          {
            type: 'showcase-1v4',
            spacer: 'lg',
            bg: {
              classes: 'bg- bg-fill-width',
            },
            row: 2,
            classes: '',
            text: {
              title: {
                label: '艺术设计之旅：探索创意与美学的奇妙世界',
                style: 'style-v1',
                classes: 'mat-display-2 bold',
              },
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
                label: '体验生成页面',
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
                  '欢迎使用 <strong class="text-">Builder</strong> 快速构建页面',
                classes: 'mat-display-2 bold',
                style: 'style-v4',
              },
              classes: 'text-light',
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
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: 'Demo',
                  target: '_blank',
                },
                {
                  type: 'btn',
                  mode: 'raised',
                  color: 'primary',
                  href: '#',
                  label: '下载',
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
              label: 'Drupal 已经超越了传统的 Web概念',
              style: 'style-v1',
            },
            subTitle: {
              spacer: 'none',
              body: '<p class="text-center">可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。无论是一个还是多个站点，Drupal 总是可以游刃有余的构建。</p><br>',
            },
            bg: {
              classes: 'bg-shadow bg-fill-width',
            },
            row: 3,
            classes: '',
            elements: [
              {
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
            type: 'showcase-3v6',
            id: '',
            title: {
              type: 'text',
              spacer: 'sm',
              title: {
                label: '为所有开发者、所有应用场景而设计',
                style: 'style-v1',
              },
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
            type: 'showcase-4v1',
            spacer: 'lg',
            text: {
              title: {
                label: 'Storybook 是如何流行于前端开发测试的',
                style: 'style-v1',
                classes: 'mat-display-1',
              },
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
                  value: 42,
                  label: 'M',
                },
                title: 'Github Start',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset189.svg',
                },
                digit: {
                  value: 28177,
                  label: '+',
                },
                title: 'NPM 周下载量',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset190.svg',
                },
                digit: {
                  value: 2173,
                  label: 'K',
                },
                title: '社区活跃',
              },
              {
                img: {
                  src: '/assets/images/svg/Asset192.svg',
                },
                digit: {
                  value: 682,
                  label: '个',
                },
                title: '成功故事',
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
                label: '体验生成页面',
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
                    animate: {
                      disable: true,
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
                  animate: {
                    disable: true,
                  },
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
