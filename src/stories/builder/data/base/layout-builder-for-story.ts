import * as titleStory from '@stories/base/Title.stories';
import * as swiperStory from '@stories/widgets/Swiper.stories';
import * as btnStory from '@stories/base/Btn.stories';
import * as BoxStories from '@stories/base/Box.stories';

export const {
  Primary: { args: box },
} = BoxStories;

export const {
  BtnLink: { args: btn },
} = btnStory;

export const {
  TitleV1: { args: title },
} = titleStory;

export const {
  Default: { args: swiper },
} = swiperStory;

export const layoutBuilder: any[] = [
  {
    label: '默认',
    icon: {
      svg: 'view-week-outline',
    },
    content: {
      type: 'layout-builder',
      spacer: 'md',
      fullWidth: false,
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/home-shape.png',
          alt: 'home-shape.png',
          classes: 'object-fit',
        },
      },
      elements: [
        {
          classes: '',
          row: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 7,
          },
          direction: 'column',
          layoutAlign: 'start start',
          elements: [
            {
              ...title?.content,
            },
            {
              type: 'text',
              spacer: 'none',
              body: '信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class="text-primary">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。',
              bg: {
                classes: 'bg- bg-fill-width',
              },
              classes: '',
            },
            {
              ...btn?.content,
            },
          ],
        },
        {
          classes: '',
          row: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 5,
          },
          direction: 'column',
          layoutAlign: 'center stretch',
          elements: [
            {
              type: 'img',
              hostClasses: 'text-center',
              classes: '',
              src: '/assets/images/illustration/11.png',
              alt: 'alt',
              style: {
                'max-width': '60%',
              },
            },
          ],
        },
      ],
    },
  },
  {
    label: '两栏',
    icon: {
      svg: 'view-grid',
    },
    content: {
      type: 'layout-builder',
      spacer: 'md',
      fullWidth: false,
      bg: {
        classes: 'bg-shadow bg-fill-width',
        img: {
          src: '/assets/images/bg/home-shape.png',
          alt: 'home-shape.png',
          classes: 'object-fit',
        },
      },
      elements: [
        {
          classes: '',
          row: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
          direction: 'row',
          layoutAlign: 'center stretch',
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
      ],
    },
  },
  {
    label: '三栏',
    icon: {
      svg: 'view-week-outline',
    },
    content: {
      type: 'layout-builder',
      spacer: 'md',
      fullWidth: false,
      bg: {
        classes: 'bg-shadow bg-fill-width',
        img: {
          src: '/assets/images/bg/home-shape.png',
          alt: 'home-shape.png',
          classes: 'object-fit',
        },
      },
      elements: [
        {
          classes: '',
          row: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
          direction: 'row',
          layoutAlign: 'center stretch',
          elements: [
            {
              type: 'box',
              img: { src: '/assets/images/svg/Asset187.svg', alt: 'browser' },
              style: 'style-v3 use-image',
              title: { href: '#', label: '高性能' },
              content:
                '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
            },
            {
              type: 'box',
              img: { src: '/assets/images/svg/Asset189.svg', alt: 'browser' },
              style: 'style-v3 use-image primary',
              title: { href: '#', label: '易用的编辑器' },
              content:
                '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
            },
            {
              type: 'box',
              img: { src: '/assets/images/svg/Asset190.svg', alt: 'browser' },
              style: 'style-v3 use-image',
              title: { href: '#', label: '多语言' },
              content:
                'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
            },
          ],
        },
      ],
    },
  },
  {
    label: '四栏',
    icon: {
      svg: 'land-rows-vertical',
    },
    content: {
      type: 'layout-builder',
      spacer: 'md',
      fullWidth: false,
      bg: {
        classes: 'bg-shadow bg-fill-width',
        img: {
          src: '/assets/images/bg/home-shape.png',
          alt: 'home-shape.png',
          classes: 'object-fit',
        },
      },
      elements: [
        {
          classes: '',
          row: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
          direction: 'row',
          layoutAlign: 'center stretch',
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
      ],
    },
  },
  {
    label: '图文',
    icon: {
      svg: 'image-text',
    },
    content: {
      type: 'layout-builder',
      spacer: 'md',
      fullWidth: false,
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/home-shape.png',
          alt: 'home-shape.png',
          classes: 'object-fit',
        },
      },
      elements: [
        {
          classes: '',
          row: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 5,
          },
          direction: 'column',
          layoutAlign: 'start stretch',
          elements: [
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
          classes: '',
          row: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 7,
          },
          direction: 'column',
          layoutAlign: 'center center',
          elements: [
            {
              type: 'img',
              src: '/assets/images/illustration/12.png',
            },
          ],
        },
      ],
    },
  },
  {
    label: '空白',
    icon: {
      svg: 'border-none-variant',
    },
    content: {
      type: 'layout-builder',
      spacer: 'md',
      fullWidth: false,
      elements: [
        {
          classes: '',
          row: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 7,
          },
          direction: 'column',
          layoutAlign: 'start start',
          elements: [],
        },
      ],
    },
  },
];
