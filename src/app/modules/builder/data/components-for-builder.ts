export const components: any[] = [
  {
    label: '首屏',
    id: 'hero',
    elements: [
      {
        label: 'V1',
        child: [
          {
            label: '1v1',
            content: {
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
          },
          {
            label: '1v2',
            content: {
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
          },
          {
            label: '1v3-1',
            content: {
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
          },
          {
            label: '1v3-2',
            content: {
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
          },
          {
            label: '1v4',
            content: {
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
          },
          {
            label: '1v4 Shape',
            content: {
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
          },
        ],
      },
      {
        label: 'V2',
        child: [
          {
            label: '2v1',
            content: {
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
          },
          {
            label: 'Y中心 X自定义',
            content: {
              type: 'hero-2v1',
              theme: '',
              params: {
                height: '750px',
              },
              text: {
                title: {
                  label:
                    '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
                  style: 'style-v4',
                  classes: 'mat-display-1',
                },
                spacer: 'xl',
                style: {
                  width: '50%',
                  left: '50%',
                },
                classes: 'y-center',
                bg: {
                  classes: 'bg-shadow overlay overlay-20',
                  img: {
                    src: '/assets/images/hero/light-bg.jpeg',
                    mobile: '/assets/images/mobile/follower-04.jpg',
                  },
                },
                body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。',
                actionsAlign: 'start center',
                actions: [
                  {
                    type: 'btn',
                    mode: 'raised',
                    color: 'primary',
                    href: '#',
                    label: '了解更多',
                  },
                ],
              },
            },
          },
          {
            label: 'XY自定义',
            content: {
              type: 'hero-2v1',
              theme: 'text-light',
              params: {
                height: '750px',
              },
              text: {
                title: {
                  label:
                    '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
                  style: 'style-v4',
                  classes: 'mat-h2',
                },
                spacer: 'xl',
                style: {
                  width: '50%',
                  left: '40%',
                  top: '10%',
                },
                classes: 'position-absolute',
                bg: {
                  classes: 'bg-shadow overlay overlay-80',
                  img: {
                    src: '/assets/images/hero/light-bg.jpeg',
                    mobile: '/assets/images/mobile/mobile-02.jpg',
                  },
                },
                body: '开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。',
                actionsAlign: 'start center',
                actions: [
                  {
                    type: 'btn',
                    mode: 'raised',
                    color: 'primary',
                    href: '#',
                    label: '了解更多',
                  },
                ],
              },
            },
          },
          {
            label: '动画',
            content: {
              type: 'hero-2v1',
              theme: '',
              params: {
                height: '940px',
              },
              text: {
                title: {
                  label:
                    '欢迎使用 <strong class="text-primary">Builder</strong> 快速构建页面',
                  style: 'style-v4',
                  classes: 'mat-display-1 bold',
                },
                animate: {
                  disable: false,
                  scrub: true,
                },
                spacer: 'md',
                style: {
                  width: '25%',
                  left: '40%',
                },
                classes: 'xy-center',
                bg: {
                  classes: 'bg-shadow bg-fill-width',
                  img: {
                    src: '/assets/images/products/TS97-Computer_08.jpg?itok=LdOsboTY',
                    mobile:
                      '/assets/images/products/TS97-Phone_08.jpg?itok=VZueJbig',
                  },
                },
                body: '<p style="text-align:justify"><span style="font-size:18px;">开启 Builder 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 <strong class="text-primary">Storybook</strong> 页面时添加组件到预览页面。</span></p>\r\n',
              },
            },
          },
          {
            label: '2v2',
            content: {
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
          },
          {
            label: '2v3',
            content: {
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
          },
        ],
      },
    ],
  },
  {
    label: '图文',
    id: 'showcase',
    elements: [
      {
        label: 'V1',
        child: [
          {
            label: '1v1',
            content: {
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
          },
          {
            label: '1v1-1',
            content: {
              type: 'showcase-1v1',
              title: {
                label:
                  '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
                style: 'style-v1',
              },
              row: 4,
              bg: {
                classes: '',
              },
              classes: '',
              elements: [
                {
                  icon: {
                    svg: 'palette-advanced',
                  },
                  style: 'style-v1',
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
                  style: 'style-v1',
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
                  style: 'style-v1',
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
                  style: 'style-v1',
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
          },
          {
            label: '1v1-2',
            content: {
              type: 'showcase-1v1',
              title: {
                label:
                  '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
                style: 'style-v2',
                icon: 'mail',
              },
              row: 4,
              bg: {
                classes: 'bg- bg-fill-width',
              },
              classes: '',
              elements: [
                {
                  icon: {
                    name: 'verified_user',
                  },
                  style: 'style-v2',
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
                  style: 'style-v2',
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
                  style: 'style-v2',
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
                  style: 'style-v2',
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
          },
          {
            label: '1v1-3',
            content: {
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
          },
          {
            label: '1v1 Primary',
            content: {
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
          },
          {
            label: '1v1-4',
            content: {
              type: 'showcase-1v1',
              title: {
                label:
                  '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
                style: 'style-v4',
              },
              row: 4,
              bg: {
                classes: 'bg-shadow bg-fill-width',
              },
              classes: '',
              elements: [
                {
                  icon: {
                    name: 'verified_user',
                  },
                  style: 'style-v4',
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
                  style: 'style-v4',
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
                  style: 'style-v4',
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
                  style: 'style-v4',
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
          },
          {
            label: '1v1-5',
            content: {
              type: 'showcase-1v1',
              title: {
                label:
                  '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
                style: 'style-v5',
              },
              row: 4,
              bg: {
                classes: '',
              },
              classes: '',
              elements: [
                {
                  icon: {
                    name: 'verified_user',
                  },
                  style: 'style-v5',
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
                  style: 'style-v5',
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
                  style: 'style-v5',
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
                  style: 'style-v5',
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
          },
          {
            label: '1v1 Image',
            content: {
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
          },
          {
            label: '1v2',
            content: {
              type: 'showcase-1v1',
              title: {
                label: '你将来喜欢 Drupal 的理由',
                style: 'style-v2',
              },
              subTitle: {
                spacer: 'none',
                body: '<p class="text-center">Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。</p><br>',
              },
              bg: {
                classes: 'bg-shadow bg-fill-width',
              },
              row: 4,
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
                  more: {
                    href: '#',
                    label: '+',
                  },
                },
                {
                  img: {
                    src: '/assets/images/svg/Asset189.svg',
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
                  more: {
                    href: '#',
                    label: '+',
                  },
                },
                {
                  img: {
                    src: '/assets/images/svg/Asset192.svg',
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
          },
          {
            label: '1v2 Primary',
            content: {
              type: 'showcase-1v1',
              title: {
                label: '使用 Drupal 作为你的低代码后台',
                style: 'style-v1',
              },
              subTitle: {
                spacer: 'none',
                body: '<p class="text-center">可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。无论是一个还是多个站点，Drupal 总是可以游刃有余的构建。</p><br>',
              },
              bg: {
                classes: 'bg-shadow bg-fill-width',
              },
              classes: '',
              row: 3,
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
          },
          {
            label: '1v3',
            content: {
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
                classes: 'bg-fill-width overlay overlay-20',
                img: {
                  hostClasses: 'bg-center',
                  src: '/assets/images/hero/bg-pattern-hero.png',
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
                  body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文，Storybook是一个用于开发和展示UI组件的工具。',
                  actionsAlign: 'center center',
                  actions: [
                    {
                      label: '了解更多',
                      type: 'btn',
                      mode: 'raised',
                      href: '#',
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
          },
          {
            label: '1v3 表单',
            content: {
              id: 'form',
              type: 'showcase-1v3',
              text: {
                title: {
                  label: '联系我们',
                  style: 'style-v1',
                },
              },
              classes: '',
              bg: {
                classes: '',
              },
              elements: [
                {
                  type: 'text',
                  spacer: 'none',
                  classes: 'text-center',
                  body: '信使是以 Material UI为基础的 Angular 前端框架，为Drupal的数字创新提供友好的用户体验。',
                },
                {
                  type: 'contact-us',
                  params: {
                    webform_id: 'contact',
                  },
                  bg: {
                    classes: 'bg-fill-width',
                    icon: 'wave',
                  },
                  action: {
                    label: '提交',
                  },
                  formOrder: '1',
                  contact: [
                    {
                      title: {
                        label: '地址',
                      },
                      icon: {
                        name: 'location_on',
                      },
                      style: 'style-v7 small-box',
                      content: '创客城2栋',
                    },
                    {
                      title: {
                        label: '电话号码',
                      },
                      style: 'style-v7 small-box',
                      icon: {
                        name: 'phone',
                      },
                      content: '+086 0771xxxx',
                    },
                    {
                      title: {
                        label: '邮件',
                      },
                      style: 'style-v7 small-box',
                      icon: {
                        name: 'mail',
                      },
                      content: 'service@example.com',
                    },
                    {
                      title: {
                        label: '微信',
                      },
                      style: 'style-v7 small-box',
                      icon: {
                        name: 'chat_bubble',
                      },
                      content: 'biaogebusy',
                    },
                  ],
                  forms: [
                    {
                      type: 'input',
                      label: '姓名',
                      key: 'name',
                      params: {
                        required: true,
                      },
                    },
                    {
                      type: 'input',
                      label: '邮箱',
                      key: 'email',
                      params: {
                        required: true,
                      },
                    },
                    {
                      type: 'input',
                      label: '主题',
                      key: 'subject',
                      params: {
                        required: true,
                      },
                    },
                    {
                      type: 'textarea',
                      label: '内容',
                      params: {
                        required: true,
                        matAutosizeMinRows: 5,
                      },
                      key: 'message',
                      placeholder: 'Message',
                    },
                  ],
                },
              ],
            },
          },
          {
            label: '1v3 视频',
            content: {
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
          },
          {
            label: '1v4',
            content: {
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
          },
          {
            label: '1v4 价格',
            content: {
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
          },
          {
            label: '1v4 动态',
            content: {
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
          },
        ],
      },
      {
        label: 'V2',
        child: [
          {
            label: '2v1',
            content: {
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
                  subTitle: '2024-02-27',
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
                  subTitle: '2024-02-27',
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
                  subTitle: '2024-02-27',
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
                  subTitle: '2024-02-27',
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
                  subTitle: '2024-02-27',
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
                  subTitle: '2024-02-27',
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
                  subTitle: '2024-02-27',
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
                  subTitle: '2024-02-27',
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
          },
          {
            label: '2v1 Card',
            content: {
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
          },
          {
            label: '2v2',
            content: {
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
          },
          {
            label: '2v4',
            content: {
              type: 'showcase-2v4',
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
              spacer: 'md',
              bg: {
                classes: '',
              },
              classes: '',
              fullWidth: true,
              elements: [
                {
                  type: 'content-box',
                  width: '33.33',
                  ratios: 'media-140',
                  subTitle: {
                    label: '《绝望之境》',
                    href: '/search',
                  },
                  title: {
                    label:
                      '展现了作者内心深处的黑暗情绪，让观者深陷其中，感受到无尽的绝望与孤独。',
                    href: '/search',
                  },
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/hero/1-6.jpg',
                    alt: 'alt',
                  },
                },
                {
                  type: 'content-box',
                  width: '33.33',
                  ratios: 'media-140',
                  subTitle: {
                    label: '《色彩之舞》',
                    href: '/search',
                  },
                  title: {
                    label:
                      '如同一幅绚丽的画卷，色彩的交织与流动呈现出动感和活力，令人心旷神怡。',
                    href: '/search',
                  },
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/hero/182.jpg',
                    alt: 'alt',
                  },
                },
                {
                  type: 'content-box',
                  width: '33.33',
                  ratios: 'media-140',
                  subTitle: {
                    label: '《时间的拥抱》',
                    href: '/search',
                  },
                  title: {
                    label:
                      '将时间的概念与人类情感相融合，通过流动的线条和温暖的色调传递出对美好回忆的珍视与怀念。',
                    href: '/search',
                  },
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/hero/329.jpg',
                    alt: 'alt',
                  },
                },
              ],
            },
          },
          {
            label: '2v5',
            content: {
              type: 'showcase-2v5',
              text: {
                title: {
                  label: 'Drupal 数据统计报告',
                  style: 'style-v1',
                  classes: 'mat-display-1',
                },
                classes: 'text-center',
                body: '<p class="text-center">Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。</p>',
              },
              spacer: 'md',
              fullWidth: true,
              bg: {
                classes: '',
              },
              classes: '',
              elements: [
                {
                  type: 'content-text-center',
                  ratios: 'media-140',
                  text: '<p style="font-size:45px">118k</p><p>活跃的模块</p><p style="font-size:45px">46k<sup>+</sup></p><p>开发者</p><p style="font-size:45px">1.4M<sup></sup></p><p>使用</p><p>Drupal 统计</p>',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/showcase/info01.png',
                    alt: 'alt',
                  },
                },
                {
                  type: 'content-text-center',
                  width: '25',
                  ratios: 'media-140',
                  text: '<p>全球有超过100万个网站采用 Drupal 进行构建和管理</p>',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/showcase/info02.png',
                    alt: 'alt',
                  },
                },
                {
                  type: 'content-text-center',
                  width: '25',
                  ratios: 'media-140',
                  text: '<p>全球约有200,000名活跃的 Drupal 开发者和贡献者</p>',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/showcase/info03.png',
                    alt: 'alt',
                  },
                },
                {
                  type: 'content-text-center',
                  width: '25',
                  ratios: 'media-140',
                  text: '<p>Drupal 支持超过100种不同语言的本地化和翻译</p>',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/showcase/info04.png',
                    alt: 'alt',
                  },
                },
                {
                  type: 'content-text-center',
                  width: '25',
                  ratios: 'media-140',
                  text: '<p>超过50,000个可用模块和主题，可根据不同需求轻松扩展和定制网站功能</p>',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/showcase/info05.png',
                    alt: 'alt',
                  },
                },
                {
                  type: 'content-text-center',
                  width: '25',
                  ratios: 'media-140',
                  text: '<p>全球一些知名的品牌和机构，如纽约时报、华盛顿邮报、红十字会等，都选择使用 Drupal 构建和管理其官方网站。</p>',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/showcase/info01.png',
                    alt: 'alt',
                  },
                },
                {
                  type: 'content-text-center',
                  width: '25',
                  ratios: 'media-140',
                  text: '<p>Drupal 社区每年都会举办全球各地的 DrupalCon 大会和其他相关活动，汇聚开发者、用户和专家，促进知识共享和交流。根据统计数据，DrupalCon 已在全球超过30个国家举办过。',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/showcase/info02.png',
                    alt: 'alt',
                  },
                },
                {
                  type: 'content-text-center',
                  width: '25',
                  ratios: 'media-140',
                  text: '<p>全球超过70%的 Drupal 网站具有响应式设计，能够适应不同设备和屏幕尺寸，提供优质的移动浏览体验</p>',
                  img: {
                    classes: 'object-fit',
                    src: '/assets/images/showcase/info05.png',
                    alt: 'alt',
                  },
                },
              ],
            },
          },
          {
            label: '2v6',
            content: {
              type: 'showcase-2v6',
              text: {
                title: {
                  label:
                    '<strong class="text-primary">Storybook</strong> 是什么？',
                  style: 'style-v1',
                  classes: 'mat-display-2 blod',
                },
                classes: 'text-center',
                body: '<p class="text-center">Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文</p>',
              },
              spacer: 'md',
              bg: {
                classes: '',
              },
              classes: '',
              row: 2,
              fullWidth: true,
              elements: [
                {
                  type: 'card-1v2',
                  link: {
                    href: '#',
                    label:
                      'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观',
                  },
                  subTitle: '组件驱动开发',
                  img: {
                    href: '#',
                    src: '/assets/images/16-9/business-06.jpg',
                    alt: 'alt',
                  },
                  bg: {
                    classes: 'object-fit',
                    img: {
                      hostClasses: '',
                      src: '/assets/images/showcase/pattern-01.png',
                    },
                  },
                },
                {
                  type: 'card-1v2',
                  link: {
                    href: '#',
                    label:
                      'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作',
                  },
                  subTitle: '组件展示和测试',
                  img: {
                    href: '#',
                    src: '/assets/images/16-9/business-11.jpg',
                    alt: 'alt',
                  },
                  bg: {
                    classes: 'object-fit',
                    img: {
                      hostClasses: '',
                      src: '/assets/images/showcase/pattern-02.png',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      {
        label: 'V3',
        child: [
          {
            label: '3v1',
            content: {
              type: 'showcase-3v1',
              bg: {
                classes: 'bg-shadow bg-fill-width',
              },
              classes: 'text-light',
              bgImg: '/assets/images/showcase/bg2.jpeg',
              title: {
                label: '<strong>Storybook</strong> 是什么？',
                style: 'style-v1',
                classes: 'mat-display-2 blod',
              },
              content:
                '<p class="text-center">Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文</p><br>',
              carousel: {
                params: {
                  slidesPerView: 1,
                  navigation: false,
                  centeredSlides: true,
                },
                classes: 'text-center',
                elements: [
                  {
                    type: 'img',
                    src: '/assets/images/1-1/business-01.png',
                    alt: 'porto1.jpg',
                  },
                  {
                    type: 'img',
                    src: '/assets/images/1-1/business-02.png',
                    alt: 'porto2.jpg',
                  },
                  {
                    type: 'img',
                    src: '/assets/images/1-1/business-04.png',
                    alt: 'porto2.jpg',
                  },
                ],
              },
            },
          },
          {
            label: '3v2',
            content: {
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
          },
          {
            label: '3v2 列表',
            content: {
              type: 'showcase-3v2',
              text: {
                title: {
                  label: '音乐',
                  style: 'style-v1',
                  classes: 'mat-display-1 bold',
                },
              },
              bg: {
                classes: 'bg-fill-width',
                img: {
                  hostClasses: '',
                  src: '/assets/images/bg/home-shape.png',
                },
              },
              classes: '',
              elements: [
                {
                  img: {
                    src: '/assets/images/illustration/24.png',
                    alt: '',
                  },
                  content: {
                    title: {
                      label: '专题文章',
                      style: 'style-v4',
                      classes: 'bold',
                    },
                    lists: {
                      params: {
                        icon: true,
                      },
                      elements: [
                        {
                          type: 'link',
                          label: '使用 DevTools 对 Angular 前端应用性能分析',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: '你应该了解的 Angular 最佳实践',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label:
                            'Jsona 一款转换 jsonapi 数据的工具库，也算是解放 Drupal jsonapi 反序列化的利器',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: 'Angular 有哪几种不同类型的绑定',
                          href: '#',
                        },
                      ],
                    },
                    actions: [
                      {
                        type: 'btn',
                        label: '更多',
                        href: '#',
                        mode: 'raised',
                        color: 'primary',
                      },
                    ],
                  },
                },
                {
                  img: {
                    src: '/assets/images/illustration/24.png',
                    alt: '',
                  },
                  content: {
                    title: {
                      label: '案例研究',
                      style: 'style-v4',
                      classes: 'bold',
                    },
                    lists: {
                      params: {
                        icon: true,
                      },
                      elements: [
                        {
                          type: 'link',
                          label: '使用 DevTools 对 Angular 前端应用性能分析',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: '你应该了解的 Angular 最佳实践',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label:
                            'Jsona 一款转换 jsonapi 数据的工具库，也算是解放 Drupal jsonapi 反序列化的利器',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: 'Angular 有哪几种不同类型的绑定',
                          href: '#',
                        },
                      ],
                    },
                    actions: [
                      {
                        type: 'btn',
                        label: '更多',
                        href: '#',
                        mode: 'raised',
                        color: 'primary',
                      },
                    ],
                  },
                },
                {
                  img: {
                    src: '/assets/images/illustration/24.png',
                    alt: '',
                  },
                  content: {
                    title: {
                      label: '行业资讯',
                      style: 'style-v4',
                      classes: 'bold',
                    },
                    lists: {
                      params: {
                        icon: true,
                      },
                      elements: [
                        {
                          type: 'link',
                          label: '使用 DevTools 对 Angular 前端应用性能分析',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: '你应该了解的 Angular 最佳实践',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label:
                            'Jsona 一款转换 jsonapi 数据的工具库，也算是解放 Drupal jsonapi 反序列化的利器',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: 'Angular 有哪几种不同类型的绑定',
                          href: '#',
                        },
                      ],
                    },
                    actions: [
                      {
                        type: 'btn',
                        label: '更多',
                        href: '#',
                        mode: 'raised',
                        color: 'primary',
                      },
                    ],
                  },
                },
                {
                  img: {
                    src: '/assets/images/illustration/24.png',
                    alt: '',
                  },
                  content: {
                    title: {
                      label: '合同模板',
                      style: 'style-v4',
                      classes: 'bold',
                    },
                    lists: {
                      params: {
                        icon: true,
                      },
                      elements: [
                        {
                          type: 'link',
                          label: '使用 DevTools 对 Angular 前端应用性能分析',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: '使用 takeUntil 操作符管理 Angular 组件的订阅',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: '你应该了解的 Angular 最佳实践',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label:
                            'Jsona 一款转换 jsonapi 数据的工具库，也算是解放 Drupal jsonapi 反序列化的利器',
                          href: '#',
                        },
                        {
                          type: 'link',
                          label: 'Angular 有哪几种不同类型的绑定',
                          href: '#',
                        },
                      ],
                    },
                    actions: [
                      {
                        type: 'btn',
                        label: '更多',
                        href: '#',
                        mode: 'raised',
                        color: 'primary',
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            label: '3v3',
            content: {
              type: 'showcase-3v3',
              title: {
                label: 'Storybook 是什么？',
                href: '#',
              },
              spacer: 'none',
              bg: {
                classes: '',
              },
              classes: '',
              date: '12/09/2022',
              commentCount: '2',
              category: 'Angular',
              body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。通过Storybook，您可以以交互的方式在浏览器中浏览和测试组件，以确保它们在各种条件下的正确工作。此外，您还可以使用Storybook提供的插件和工具来模拟数据、测试组件的不同状态和交互，并生成自动化测试报告。Storybook是一个用于构建、展示和文档化UI组件的工具。',
              details: {
                label: '查看更多',
                href: '#',
                type: 'btn',
                mode: 'raised',
                color: 'primary',
              },
            },
          },
          {
            label: '3v3 图片',
            content: {
              type: 'showcase-3v3',
              title: {
                label: 'Storybook 是什么？',
                href: '#',
              },
              spacer: 'none',
              bg: {
                classes: '',
              },
              classes: '',
              date: '12/09/2022',
              commentCount: '2',
              category: 'Angular',
              body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。通过Storybook，您可以以交互的方式在浏览器中浏览和测试组件，以确保它们在各种条件下的正确工作。此外，您还可以使用Storybook提供的插件和工具来模拟数据、测试组件的不同状态和交互，并生成自动化测试报告。Storybook是一个用于构建、展示和文档化UI组件的工具。',
              details: {
                label: '查看更多',
                href: '#',
                type: 'btn',
                mode: 'raised',
                color: 'primary',
              },
              showImage: true,
              feature: {
                fullIcon: 'fullscreen',
                openIcon: 'open_in_new',
                ratios: 'media-16-9',
                link: '#',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/showcase/blog1-large.jpeg',
                  alt: 'lazyload',
                },
              },
            },
          },
          {
            label: '3v4',
            content: {
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
          },
          {
            label: '3v4 背景',
            content: {
              type: 'showcase-3v4',
              title: {
                label: '为什么你将会喜欢这个前端框架？',
                style: 'style-v1',
              },
              bg: {
                classes: 'bg-shadow bg-fill-width',
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
          },
          {
            label: '3v5',
            content: {
              type: 'showcase-3v5',
              id: '',
              title: {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '为什么你将会喜欢这个前端框架？',
                  style: 'style-v1',
                },
                body: '<p class="text-center">信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。</p>',
              },
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
                  more: null,
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
                  more: null,
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
                  more: null,
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
                  more: null,
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
          },
          {
            label: '3v6',
            content: {
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
          },
          {
            label: '3v6 链接',
            content: {
              type: 'showcase-3v6',
              id: '',
              title: {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '职位招聘',
                  style: 'style-v1',
                },
                classes: 'text-center',
                body: '<p class="text-center">免费推送相关职位信息，关注公众号随时随地了解职位情况。</p>',
              },
              bg: {
                classes: 'bg-shadow bg-fill-width',
              },
              classes: '',
              row: 3,
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
                  link: {
                    label: '前端开发工程师 @dialog',
                    classes: 'bold',
                    dialog: {
                      params: {
                        width: '1000px',
                        disableClose: true,
                      },
                      afterClosed: {
                        success: {
                          label: '请检查是否发布成功！',
                        },
                        emit: true,
                      },
                      data: [
                        {
                          type: 'iframe',
                          url: '/manage/node/meeting/front/add?disable_sidebar=1',
                          height: '1000',
                        },
                      ],
                    },
                  },
                  subTitle: '字节跳动，北京',
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
                  link: {
                    label: '前端架构师',
                    classes: 'bold',
                    href: '#',
                  },
                  subTitle: '美团，广州',
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
                  link: {
                    label: '后端开发',
                    classes: 'bold',
                    href: '#',
                  },
                  subTitle: '微软，北京',
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
                  link: {
                    label: 'UI 设计师',
                    classes: 'bold',
                    href: '#',
                  },
                  subTitle: '腾讯，深圳',
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
                  link: {
                    label: 'IOS 开发',
                    classes: 'bold',
                    href: '#',
                  },
                  subTitle: '华为，深圳',
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
                  link: {
                    label: '游戏开发',
                    classes: 'bold',
                    href: '#',
                  },
                  subTitle: '腾讯，成都',
                },
              ],
              action: {
                label: '查看更多',
                href: '#',
                type: 'btn',
                mode: 'raised',
                color: 'primary',
              },
            },
          },
          {
            label: '3v6 背景',
            content: {
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
          },
          {
            label: '3v7',
            content: {
              type: 'showcase-3v7',
              title: {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '为什么你将会喜欢这个前端框架？',
                  style: 'style-v1',
                },
                body: '<p class="text-center">信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。</p>',
              },
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
                  more: null,
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
                  more: null,
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
                  more: null,
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
                  more: null,
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
          },
          {
            label: '3v9',
            content: {
              type: 'showcase-3v9',
              bg: {
                classes: 'bg-fill-width',
                img: {
                  classes: 'object-fit',
                  src: '/assets/images/bg/bg-01.png',
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
                        type: 'iframe',
                        url: '//player.bilibili.com/player.html?aid=998790468&bvid=BV1ux4y197kc&cid=1207367269&page=1',
                        width: '900',
                        height: '700',
                      },
                    },
                  ],
                },
              ],
              right: [
                {
                  type: 'text',
                  spacer: 'md',
                  body: '信使UI是基于 Material 的 Angular 前端框架， 丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。选择组件拖动到想要的位置：<ul class="list-done"><li>可视化编辑组件图文数据，所见即所得；</li><li>可以复制整个页面的 JSON 或者单个组件的 JSON；</li></ul><p>欢迎入群一起探索更多的可能性和数字创新体验，QQ 交流群：<span class="text-primary">1176468251</span></p><p style="display:flex"><img width="120px" src="/assets/icons/large-left-arrow.svg" /><video  muted  autoplay loop width="120px" src="/assets/video/drag-drop.mp4"></video></p>',
                  title: {
                    label:
                      '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建页面',
                    style: 'style-v4',
                    classes: 'mat-display-2 bold',
                  },
                },
              ],
            },
          },
          {
            label: '3v9 反向',
            content: {
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
          },
          {
            label: '3v9 视频',
            content: {
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
          },
        ],
      },
      {
        label: 'V4',
        child: [
          {
            label: '4v1',
            content: {
              type: 'showcase-4v1',
              spacer: 'lg',
              text: {
                title: {
                  label: '平台实时数据',
                  style: 'style-v1',
                },
              },
              bg: {
                classes: '',
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
                    value: 169,
                    label: '+',
                  },
                  title: '日访问人数',
                },
                {
                  icon: {
                    name: 'verified_user',
                  },
                  digit: {
                    value: 436,
                    label: '+',
                  },
                  title: '日打开次数',
                },
                {
                  icon: {
                    name: 'android',
                  },
                  digit: {
                    value: 199,
                    label: '人',
                  },
                  title: '日新增人数',
                },
                {
                  icon: {
                    name: 'mail',
                  },
                  digit: {
                    value: 4657,
                    label: '万',
                  },
                  title: '累计用户数',
                },
              ],
            },
          },
          {
            label: '4v1 图片',
            content: {
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
                    value: 58,
                    label: 'M',
                  },
                  title: 'Github Start',
                },
                {
                  img: {
                    src: '/assets/images/svg/Asset189.svg',
                  },
                  digit: {
                    value: 33112,
                    label: '+',
                  },
                  title: 'NPM 周下载量',
                },
                {
                  img: {
                    src: '/assets/images/svg/Asset190.svg',
                  },
                  digit: {
                    value: 3327,
                    label: 'K',
                  },
                  title: '社区活跃',
                },
                {
                  img: {
                    src: '/assets/images/svg/Asset192.svg',
                  },
                  digit: {
                    value: 801,
                    label: '个',
                  },
                  title: '成功故事',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    label: '幻灯片',
    id: 'carousel',
    elements: [
      {
        label: 'V1',
        child: [
          {
            label: '1v1',
            content: {
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
          },
          {
            label: '图文',
            content: {
              type: 'carousel-1v1',
              spacer: 'none',
              fullWidth: true,
              bg: {
                classes: '',
              },
              classes: '',
              sliders: {
                params: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                  navigation: false,
                  pagination: false,
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
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'text-hero',
                    theme: 'text-light',
                    params: {
                      height: '750px',
                    },
                    text: {
                      title: {
                        label: '高性能',
                        style: 'style-v4',
                        classes: 'mat-display-2 bold',
                      },
                      classes: 'y-center',
                      style: [],
                      bg: {
                        classes: '',
                        img: {
                          src: '/assets/images/hero/1-3.jpg',
                          hostClasses: '',
                          alt: '地图',
                        },
                      },
                      body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                      actionsAlign: 'start center',
                      actions: [
                        {
                          type: 'btn',
                          mode: 'raised',
                          color: 'primary',
                          href: '',
                          label: '了解更多',
                        },
                      ],
                    },
                  },
                  {
                    type: 'text-hero',
                    theme: 'text-light',
                    params: {
                      height: '750px',
                    },
                    text: {
                      title: {
                        label: '易用的编辑器',
                        style: 'style-v4',
                        classes: 'mat-display-2 bold',
                      },
                      classes: 'y-center',
                      style: [],
                      bg: {
                        classes: 'bg-shadow overlay overlay-',
                        img: {
                          src: '/assets/images/hero/1-6.jpg',
                          hostClasses: '',
                        },
                      },
                      body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                      actionsAlign: 'start center',
                      actions: [
                        {
                          type: 'btn',
                          mode: 'raised',
                          color: 'primary',
                          href: '',
                          label: '了解更多',
                        },
                      ],
                    },
                  },
                  {
                    type: 'text-hero',
                    theme: 'text-light',
                    params: {
                      height: '750px',
                    },
                    text: {
                      title: {
                        label: '多语言',
                        style: 'style-v4',
                        classes: 'mat-display-2 bold',
                      },
                      classes: 'y-center',
                      style: [],
                      bg: {
                        classes: 'bg-shadow overlay overlay-',
                        img: {
                          src: '/assets/images/hero/182.jpg',
                          hostClasses: '',
                        },
                      },
                      body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
                      actionsAlign: 'start center',
                      actions: [
                        {
                          type: 'btn',
                          mode: 'raised',
                          color: 'primary',
                          href: '',
                          label: '了解更多',
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
          {
            label: '视频',
            content: {
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
                params: {
                  slidesPerView: 1.5,
                  spaceBetween: 40,
                  centeredSlides: true,
                  loop: true,
                  navigation: true,
                  pagination: true,
                  autoplay: false,
                  breakpoints: {
                    '600': {
                      slidesPerView: 1.5,
                      spaceBetween: 40,
                    },
                    '960': {
                      slidesPerView: 1.5,
                      spaceBetween: 40,
                    },
                  },
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'img',
                    src: '/assets/images/16-9/business-02.jpg',
                    hostClasses: 'position-relative text-center',
                    classes: 'width-100 height-100',
                    actions: [
                      {
                        color: 'primary',
                        type: 'btn-video',
                        video: {
                          type: 'player',
                          options: {
                            controls: true,
                            aspectRatio: '16:9',
                            poster: '/assets/images/16-9/business-02.jpg',
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
                  {
                    type: 'img',
                    src: '/assets/images/16-9/business-03.jpg',
                    hostClasses: 'position-relative text-center',
                    classes: 'width-100 height-100',
                    actions: [
                      {
                        color: 'primary',
                        type: 'btn-video',
                        video: {
                          type: 'player',
                          options: {
                            controls: true,
                            aspectRatio: '16:9',
                            poster: '/assets/images/16-9/business-03.jpg',
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
                  {
                    type: 'img',
                    src: '/assets/images/16-9/business-06.jpg',
                    hostClasses: 'position-relative text-center',
                    classes: 'width-100 height-100',
                    actions: [
                      {
                        color: 'primary',
                        type: 'btn-video',
                        video: {
                          type: 'player',
                          options: {
                            controls: true,
                            aspectRatio: '16:9',
                            poster: '/assets/images/16-9/business-06.jpg',
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
                  {
                    type: 'img',
                    src: '/assets/images/16-9/business-08.jpg',
                    hostClasses: 'position-relative text-center',
                    classes: 'width-100 height-100',
                    actions: [
                      {
                        color: 'primary',
                        type: 'btn-video',
                        video: {
                          type: 'player',
                          options: {
                            controls: true,
                            aspectRatio: '16:9',
                            poster: '/assets/images/16-9/business-08.jpg',
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
            },
          },
          {
            label: '时间轴',
            content: {
              type: 'carousel-1v1',
              title: {
                label: '信使更新日志',
                style: 'style-v1',
              },
              style: 'text-dark',
              classes: '',
              bg: {
                classes: 'bg-white bg-fill-width',
                img: {
                  src: '/assets/images/map.png',
                  hostClasses: 'bg-center',
                  alt: '地图',
                },
              },
              sliders: {
                params: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
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
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'line-year',
                    title: '2022/10/09',
                    body: '- 移除 mobx-angular；<br>\n                - 移除了 ngx-swiper-wrapper 模块依赖；<br>\n                - user 通过 useFactory provider 注入；<br>\n                - 更新了 storybook 文档；<br>\n                - 修复打包报错的问题；<br>\n                - 升级 angular 至 11.2.14 版本；<br>\n                - 修复最新版无法 build 的问题；',
                  },
                  {
                    type: 'line-year',
                    title: '2022/10/13',
                    body: '- 优化了 Storybook import 和 provider；<br>\n          - 新建了 StoryModule 统一处理；<br>- 添加了 Storybook 的 play function；',
                  },
                  {
                    type: 'line-year',
                    title: '2022/10/25',
                    body: '- 添加了视频播放组件，基于 Video.js；<br>\n                - 添加了 btn-video widget；<br>\n                - Storybook 升级到 6.5.13;<br>\n                - 移除了分散在各处的 api 请求缓存;',
                  },
                  {
                    type: 'line-year',
                    title: '2022/10/31',
                    body: '- 使用 MDI 扩展了 icons 库；<br>\n                - 添加了 gsap 动画库;<br>\n                - 表格默认可以单元格 Sort 排序；<br>\n                - 应用可通过 Drawer 参数开启；<br>',
                  },
                  {
                    type: 'line-year',
                    title: '2022/12/27',
                    body: '- 动态导入模块组件；<br>\n                - 添加了 Manage sidebar 管理边栏<br>\n                - 添加了 View Map 通用型地图映射组件；',
                  },
                ],
              },
            },
          },
          {
            label: '1v4',
            content: {
              type: 'carousel-1v1',
              spacer: 'lg',
              title: {
                label: 'Storybook 能够做什么？',
                icon: 'email',
                style: 'style-v2',
                classes: 'mat-display-2',
              },
              bg: {
                classes: '',
              },
              classes: '',
              fullWidth: true,
              sliders: {
                params: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                  navigation: false,
                  pagination: false,
                  effect: 'fade',
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
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'text-hero',
                    theme: 'text-light',
                    params: {
                      height: '750px',
                    },
                    text: {
                      title: {
                        label: '组件驱动开发',
                        style: 'style-v1',
                        classes: 'mat-display-4',
                      },
                      spacer: 'xl',
                      classes: 'xy-center',
                      'style-': {
                        width: '50%',
                        left: '0%',
                        top: '5%',
                      },
                      bg: {
                        classes: 'bg-shadow overlay overlay-80',
                        img: {
                          src: '/assets/images/hero/1-6.jpg',
                          mobile: '/assets/images/mobile/mobile-03.jpg',
                        },
                      },
                      body: 'Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建"stories"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。',
                      actionsAlign: 'center center',
                      actions: [
                        {
                          href: '#',
                          label: '马上体验',
                        },
                      ],
                    },
                  },
                  {
                    type: 'text-hero',
                    theme: 'text-light',
                    params: {
                      height: '750px',
                    },
                    text: {
                      title: {
                        label: '组件展示和测试',
                        style: 'style-v4',
                        classes: 'mat-display-4',
                      },
                      spacer: 'xl',
                      style: {
                        width: '50%',
                      },
                      classes: 'y-center',
                      bg: {
                        classes: 'bg-shadow overlay overlay-80',
                        img: {
                          src: '/assets/images/hero/329.jpg',
                          mobile: '/assets/images/mobile/mobile-04.jpg',
                        },
                      },
                      body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
                      actionsAlign: 'start center',
                      actions: [
                        {
                          href: '#',
                          label: '马上体验',
                        },
                      ],
                    },
                  },
                  {
                    type: 'text-hero',
                    theme: '',
                    params: {
                      height: '750px',
                    },
                    text: {
                      title: {
                        label: '文档化',
                        style: 'style-v4',
                        classes: 'mat-display-4',
                      },
                      spacer: 'xl',
                      style: {
                        width: '50%',
                        left: '50%',
                      },
                      classes: 'y-center',
                      bg: {
                        classes: 'bg-shadow overlay overlay-20',
                        img: {
                          src: '/assets/images/hero/light-bg.jpeg',
                          mobile: '/assets/images/mobile/follower-04.jpg',
                        },
                      },
                      body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。',
                      actionsAlign: 'start center',
                      actions: [
                        {
                          href: '#',
                          label: '马上体验',
                        },
                      ],
                    },
                  },
                  {
                    type: 'text-hero',
                    theme: 'text-light',
                    params: {
                      height: '750px',
                    },
                    text: {
                      title: {
                        label: '插件和工具生态系统',
                        style: 'style-v4',
                        classes: 'mat-display-4',
                      },
                      spacer: 'xl',
                      style: {
                        width: '50%',
                        left: '40%',
                        top: '10%',
                      },
                      classes: 'position-absolute',
                      bg: {
                        classes: 'bg-shadow overlay overlay-80',
                        img: {
                          src: '/assets/images/hero/light-bg.jpeg',
                          mobile: '/assets/images/mobile/mobile-02.jpg',
                        },
                      },
                      body: 'Storybook拥有丰富的插件和工具生态系统，可以扩展其功能。这些插件可以用于模拟数据、测试组件的不同状态和交互，并生成自动化测试报告。这样，开发人员可以根据自己的需求定制和扩展Storybook。',
                      actionsAlign: 'start center',
                      actions: [
                        {
                          href: '#',
                          label: '马上体验',
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
          {
            label: '全屏',
            content: {
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
          },
          {
            label: '1v2',
            content: {
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
          },
          {
            label: '1v3',
            content: {
              type: 'carousel-1v3',
              spacer: 'lg',
              text: {
                spacer: 'none',
                title: {
                  label: '选择Drupal的原因',
                  icon: '',
                  style: 'style-v1',
                  classes: 'mat-display-1',
                },
                classes: 'text-center',
                body: '<p class="text-center">Drupal是数据管理中心，提供集中的地方来访问所有平台的数据</p><br>',
              },
              classes: '',
              bg: {
                classes: 'bg-shadow',
              },
              sliders: {
                params: {
                  slidesPerView: 1.2,
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
                    type: 'box',
                    img: {
                      src: '/assets/images/svg/Asset187.svg',
                      alt: 'browser',
                      style: {
                        width: '80px',
                        marginRight: '10px',
                      },
                    },
                    style: 'style-v8',
                    title: {
                      href: '#',
                      label: '组件编辑',
                    },
                    content: '通过简单的管理界面对复杂的可视化编辑',
                  },
                  {
                    type: 'box',
                    img: {
                      src: '/assets/images/svg/Asset189.svg',
                      alt: 'browser',
                      style: {
                        width: '80px',
                        marginRight: '10px',
                      },
                    },
                    style: 'style-v8',
                    title: {
                      href: '#',
                      label: '企业营销',
                    },
                    content: '与企业营销工具整合，实现对内容和表单的管理',
                  },
                  {
                    type: 'box',
                    img: {
                      src: '/assets/images/svg/Asset190.svg',
                      alt: 'browser',
                      style: {
                        width: '80px',
                        marginRight: '10px',
                      },
                    },
                    style: 'style-v8',
                    title: {
                      href: '#',
                      label: '数据收集',
                    },
                    content: '对数据进行收集和删除，符合政策的合规',
                  },
                  {
                    type: 'box',
                    img: {
                      src: '/assets/images/svg/Asset192.svg',
                      alt: 'browser',
                      style: {
                        width: '80px',
                        marginRight: '10px',
                      },
                    },
                    style: 'style-v8',
                    title: {
                      href: '#',
                      label: '简化管理',
                    },
                    content: '简化了内容管理和用户角色管理，易于提高服务器性能',
                  },
                  {
                    type: 'box',
                    img: {
                      src: '/assets/images/svg/bike.svg',
                      alt: 'browser',
                      style: {
                        width: '80px',
                        marginRight: '10px',
                      },
                    },
                    style: 'style-v8',
                    title: {
                      href: '#',
                      label: '存储集成',
                    },
                    content: '与云存储集成以实现解耦的文件管理',
                  },
                  {
                    type: 'box',
                    img: {
                      src: '/assets/images/svg/calendar.png',
                      alt: 'browser',
                      style: {
                        width: '80px',
                        marginRight: '10px',
                      },
                    },
                    style: 'style-v8',
                    title: {
                      href: '#',
                      label: 'API 优先',
                    },
                    content: 'API First 易于与外部系统集成',
                  },
                ],
              },
            },
          },
          {
            label: '客户评价',
            content: {
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
          },
        ],
      },
      {
        label: 'V2',
        child: [
          {
            label: '2v1',
            content: {
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
          },
          {
            label: '2v2',
            content: {
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
          },
        ],
      },
    ],
  },
  {
    label: '瀑布流',
    id: 'masonry',
    elements: [
      {
        label: 'packery',
        content: {
          type: 'packery',
          config: {
            gutter: 0,
            imagesLoaded: true,
            percentPosition: true,
          },
          spacer: 'md',
          text: {
            title: {
              label: 'Drupal 是如何数字创新的？',
              style: 'style-v1',
              classes: 'mat-display-1 text-light',
            },
            classes: 'text-center',
            body: '<p class="text-light text-center">Drupal通过其灵活性、多功能性和可扩展性，为数字创新提供了强大的基础。它能够满足不同规模和需求的组织和企业的数字化转型和创新需求，并提供可靠、安全、高效的数字解决方案。</p>',
          },
          classes: '',
          bg: {
            classes: 'bg-fill-width bg-shadow overlay overlay-80',
            img: {
              hostClasses: '',
              src: '/assets/images/bg/home-shape.png',
              mobile: '/assets/images/bg/home-shape.png',
            },
          },
          elements: [
            {
              type: 'feature-box',
              width: '20',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              hoverIcon: true,
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto1.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'feature-box',
              width: '20',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              hoverIcon: true,
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto2.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'feature-box',
              width: '40',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              hoverIcon: true,
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto3.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'feature-box',
              width: '20',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              hoverIcon: true,
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto4.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'feature-box',
              width: '20',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              hoverIcon: true,
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto5.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'feature-box',
              width: '20',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              hoverIcon: true,
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto6.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'feature-box',
              width: '20',
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              hoverIcon: true,
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto7.jpg',
                alt: 'alt',
              },
            },
          ],
        },
      },
      {
        label: '内容盒子',
        content: {
          type: 'packery',
          config: {
            gutter: 0,
            imagesLoaded: true,
            percentPosition: true,
          },
          spacer: 'md',
          text: {
            title: {
              label: 'Drupal 是如何数字创新的？',
              style: 'style-v1',
              classes: 'mat-display-1 text-light',
            },
            classes: 'text-center',
            body: '<p class="text-light text-center">Drupal通过其灵活性、多功能性和可扩展性，为数字创新提供了强大的基础。它能够满足不同规模和需求的组织和企业的数字化转型和创新需求，并提供可靠、安全、高效的数字解决方案。</p>',
          },
          bg: {
            classes: 'bg-fill-width bg-shadow overlay overlay-80',
            img: {
              hostClasses: '',
              src: '/assets/images/bg/home-shape.png',
              mobile: '/assets/images/bg/home-shape.png',
            },
          },
          fullWidth: true,
          classes: '',
          elements: [
            {
              type: 'content-box',
              width: '33.33',
              ratios: 'media-4-3',
              subTitle: {
                label: '灵活的架构',
                href: '/search',
              },
              title: {
                label: '能够构建各种类型的数字解决方案',
                href: '/search',
              },
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto1.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'content-box',
              width: '33.33',
              ratios: 'media-4-3',
              subTitle: {
                label: '多站点管理',
                href: '/search',
              },
              title: {
                label: '简化了多个网站的运维和维护工作',
                href: '/search',
              },
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto2.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'content-box',
              width: '33.33',
              ratios: 'media-4-3',
              subTitle: {
                label: '多语言支持',
                href: '/search',
              },
              title: {
                label: '企业能够更好地面向全球市场进行本地化和国际化',
                href: '/search',
              },
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto3.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'content-box',
              width: '25',
              ratios: 'media-4-3',
              subTitle: {
                label: '社交媒体集成',
                href: '/search',
              },
              title: {
                label: '增强用户参与度、推广品牌和提高网站的可见性',
                href: '/search',
              },
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto4.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'content-box',
              width: '25',
              ratios: 'media-4-3',
              subTitle: {
                label: '移动友好性',
                href: '/search',
              },
              title: {
                label: '能够更好地适应移动化的用户行为和需求',
                href: '/search',
              },
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto6.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'content-box',
              width: '25',
              ratios: 'media-4-3',
              subTitle: {
                label: '数据分析和个性化',
                href: '/search',
              },
              title: {
                label: '根据用户的兴趣和偏好提供个性化的内容和体验',
                href: '/search',
              },
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto7.jpg',
                alt: 'alt',
              },
            },
            {
              type: 'content-box',
              width: '25',
              ratios: 'media-4-3',
              subTitle: {
                label: '安全和稳定性',
                href: '/search',
              },
              title: {
                label:
                  '它的安全记录和稳定性得到了业界的认可，为企业提供了可信赖的数字平台',
                href: '/search',
              },
              img: {
                classes: 'object-fit',
                src: '/assets/images/cases/porto5.jpg',
                alt: 'alt',
              },
            },
          ],
        },
      },
      {
        label: '洗牌',
        content: {
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
      },
    ],
  },
];
