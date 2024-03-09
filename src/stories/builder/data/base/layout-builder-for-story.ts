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
      layoutAlign: 'center center',
      gap: {
        xs: 8,
        sm: 16,
        md: 32,
        lg: 48,
      },
      elements: [
        {
          row: {
            xs: 12,
            sm: 6,
            md: 6,
            lg: 7,
          },
          direction: 'column',
          horizontal: 'center',
          vertical: 'flex-start',
          layoutAlign: 'center start',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            overlay: '',
            classes: 'bg-fill-width',
          },
          style: {
            paddingTop: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
          },
          animate: {
            from: {
              x: 0,
              y: '100',
              rotation: 0,
              scale: 1,
              opacity: 0,
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
          classes: '',
          elements: [
            {
              type: 'title',
              label:
                '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建响应式页面',
              style: 'style-v4',
              classes: 'mat-display-2 bold',
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
              type: 'card-1v4',
              img: {
                classes: 'object-fit',
                src: '/assets/images/avatar/01.jpeg',
              },
              star: 5,
              title: '- Johnson',
              subTitle: '前端开发',
              body: '信使是一个灵活可扩展性高的前端Anuglar框架，动态组件可以使得组件之间变得更加灵活，但是依赖循环也变得复杂。',
            },
            {
              type: 'btn',
              href: '/node/1',
              target: '_blank',
              label: '了解更多',
              mode: 'raised',
              color: 'primary',
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
              classes: '',
              alt: 'alt',
              hostClasses: 'text-center',
              animate: {
                from: {
                  x: '100',
                  y: 0,
                  rotation: 0,
                  scale: 0.8,
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
                  scrub: false,
                },
              },
              type: 'img',
              src: '/assets/images/illustration/11.png',
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
      svg: 'image-text',
    },
    content: {
      fullWidth: false,
      spacer: 'md',
      bgClasses: 'bg-fill-width',
      overlay: '',
      classes: '',
      id: '',
      bg: {
        img: {
          src: '',
          classes: 'object-fit',
          alt: '',
        },
        classes: 'bg-fill-width',
        overlay: '',
      },
      direction: 'row wrap',
      horizontal: 'center',
      vertical: 'stretch',
      layoutAlign: 'center stretch',
      gap: {
        xs: 0,
        sm: 16,
        md: 32,
        lg: 48,
      },
      animate: {
        from: {
          x: 0,
          y: '100',
          rotation: 0,
          scale: 1,
          opacity: 0,
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
      type: 'layout-builder',
      elements: [
        {
          row: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 6,
          },
          direction: 'column',
          horizontal: 'center',
          vertical: 'center',
          layoutAlign: 'center center',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            overlay: '',
            classes: 'bg-fill-width',
          },
          classes: 'overflow-hidden',
          style: {
            paddingTop: '30px',
            paddingRight: '30px',
            paddingBottom: '30px',
            paddingLeft: '30px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            backgroundColor: '#f0f0f0',
          },
          animate: {
            from: {
              x: 0,
              y: '0',
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
          elements: [
            {
              style: 'none',
              classes: 'mat-display-1 bold',
              typed: {
                enable: false,
                config: {
                  typeSpeed: 120,
                },
                strings: [
                  {
                    label: 'web builder',
                  },
                ],
              },
              animate: {
                from: {
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
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
              type: 'title',
              label: '自由搭配，玩出新意',
            },
            {
              type: 'link',
              label: '链接搭配你的风格',
              classes: '',
              href: '/',
            },
            {
              classes: '',
              alt: 'alt',
              hostClasses: 'text-center',
              animate: {
                from: {
                  x: -500,
                  y: 0,
                  rotation: 0,
                  scale: 0,
                  opacity: 0,
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
                  scrub: true,
                },
              },
              type: 'img',
              src: 'assets/images/products/huawei-watch-gt4-select-strap.webp',
            },
          ],
        },
        {
          row: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 6,
          },
          direction: 'column',
          horizontal: 'center',
          vertical: 'center',
          layoutAlign: 'center center',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            overlay: '',
            classes: 'bg-fill-width',
          },
          classes: 'overflow-hidden',
          style: {
            paddingTop: '30px',
            paddingRight: '30px',
            paddingBottom: '30px',
            paddingLeft: '30px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            backgroundColor: '#f0f0f0',
          },
          animate: {
            from: {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
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
          elements: [
            {
              style: 'none',
              classes: 'mat-display-1 bold',
              typed: {
                enable: false,
                config: {
                  typeSpeed: 120,
                },
                strings: [
                  {
                    label: 'web builder',
                  },
                ],
              },
              animate: {
                from: {
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
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
              type: 'title',
              label: '款款亮眼，爱不释手',
            },
            {
              type: 'link',
              label: '探索更多',
              classes: '',
              href: '/',
            },
            {
              classes: '',
              alt: 'alt',
              hostClasses: 'text-center',
              animate: {
                from: {
                  x: '500',
                  y: 0,
                  rotation: 0,
                  scale: 0,
                  opacity: 0,
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
                  scrub: true,
                },
              },
              type: 'img',
              src: 'assets/images/products/huawei-watch-gt4-Huawei-wearables.webp',
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
      layoutAlign: 'center center',
      gap: {
        xs: 8,
        sm: 16,
        md: 32,
        lg: 48,
      },
      elements: [
        {
          row: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
          direction: 'row',
          horizontal: 'center',
          vertical: 'stretch',
          layoutAlign: 'center stretch',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            overlay: '',
            classes: 'bg-fill-width',
          },
          classes: '',
          style: {
            paddingTop: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
          },
          animate: {
            from: {
              x: 0,
              y: '100',
              rotation: 0,
              scale: 1,
              delay: 0,
              duration: 1,
              ease: 'none',
              opacity: 0,
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
          ],
        },
        {
          row: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
          direction: 'row',
          horizontal: 'center',
          vertical: 'stretch',
          layoutAlign: 'center stretch',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            overlay: '',
            classes: 'bg-fill-width',
          },
          classes: '',
          style: {
            paddingTop: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
          },
          animate: {
            from: {
              x: 0,
              y: '100',
              rotation: 0,
              scale: 1,
              delay: '0.6',
              duration: 1,
              ease: 'none',
              opacity: 0,
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
          elements: [
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
          ],
        },
        {
          row: {
            xs: 12,
            sm: 4,
            md: 4,
            lg: 4,
          },
          direction: 'row',
          horizontal: 'center',
          vertical: 'stretch',
          layoutAlign: 'center stretch',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            overlay: '',
            classes: 'bg-fill-width',
          },
          classes: '',
          style: {
            paddingTop: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
          },
          animate: {
            from: {
              x: 0,
              y: '100',
              rotation: 0,
              scale: 1,
              delay: '1',
              duration: 1,
              ease: 'none',
              opacity: '0',
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
          elements: [
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
      layoutAlign: 'center center',
      gap: {
        xs: 8,
        sm: 16,
        md: 32,
        lg: 48,
      },
      elements: [
        {
          row: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
          direction: 'row',
          horizontal: 'center',
          vertical: 'stretch',
          layoutAlign: 'center stretch',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            overlay: '',
            classes: 'bg-fill-width',
          },
          classes: '',
          style: {
            paddingTop: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
          },
          animate: {
            from: {
              x: 0,
              y: '100',
              rotation: 0,
              scale: 1,
              delay: 0,
              duration: 1,
              ease: 'none',
              opacity: '0',
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
          ],
        },
        {
          row: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
          direction: 'row',
          horizontal: 'center',
          vertical: 'stretch',
          layoutAlign: 'center stretch',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            overlay: '',
            classes: 'bg-fill-width',
          },
          classes: '',
          style: {
            paddingTop: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
          },
          animate: {
            from: {
              x: 0,
              y: '200',
              rotation: 0,
              scale: 1,
              delay: '0.6',
              duration: 1,
              ease: 'none',
              opacity: '0',
            },
            trigger: {
              onEnter: 'play',
              onLeave: 'none',
              onEnterBack: 'none',
              onLeaveBack: 'none',
              start: 'top 90%',
              end: 'top 40%',
              scrub: true,
            },
          },
          elements: [
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
          ],
        },
        {
          row: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
          direction: 'row',
          horizontal: 'center',
          vertical: 'stretch',
          layoutAlign: 'center stretch',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            overlay: '',
            classes: 'bg-fill-width',
          },
          classes: '',
          style: {
            paddingTop: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
          },
          animate: {
            from: {
              x: 0,
              y: '100',
              rotation: 0,
              scale: 1,
              opacity: '0',
              delay: '0.6',
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
          elements: [
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
          ],
        },
        {
          row: {
            xs: 12,
            sm: 6,
            md: 3,
            lg: 3,
          },
          direction: 'row',
          horizontal: 'center',
          vertical: 'stretch',
          layoutAlign: 'center stretch',
          bg: {
            img: {
              src: '',
              classes: 'object-fit',
              alt: '',
            },
            overlay: '',
            classes: 'bg-fill-width',
          },
          classes: '',
          style: {
            paddingTop: '0px',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            marginTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
          },
          animate: {
            from: {
              x: 0,
              y: '100',
              rotation: 0,
              scale: 1,
              opacity: '0',
              delay: '1.2',
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
          elements: [
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
    label: '竖排',
    icon: {
      svg: 'format-align-center',
    },
    content: {
      type: 'layout-builder',
      spacer: 'md',
      fullWidth: false,
      direction: 'column',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/bg-01.png',
          alt: 'bg-01.png',
          classes: 'object-fit',
        },
      },
      layoutAlign: 'center center',
      gap: {
        xs: 0,
        sm: 0,
        md: 0,
        lg: 0,
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
          direction: 'column',
          layoutAlign: 'center center',
          elements: [
            {
              type: 'title',
              label:
                '欢迎使用 <strong class="text-primary">Web Builder</strong> 快速构建响应式页面',
              style: 'style-v1',
              classes: 'mat-display-3 bold',
            },
          ],
        },
        {
          classes: '',
          row: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
          direction: 'column',
          layoutAlign: 'center center',
          elements: [
            {
              type: 'text',
              spacer: 'none',
              body: '<p class="ql-align-center">信使UI是基于 Material 的 Angular 前端框架， 丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。</p>',
            },
          ],
        },
        {
          classes: '',
          row: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
          direction: 'column',
          layoutAlign: 'center center',
          elements: [
            {
              type: 'btn',
              href: '/node/1',
              target: '_blank',
              label: '了解更多',
              mode: 'raised',
              color: 'primary',
            },
          ],
        },
        {
          classes: '',
          row: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
          },
          direction: 'column',
          layoutAlign: 'center center',
          elements: [
            {
              type: 'img',
              hostClasses: 'text-center',
              classes: '',
              src: '/assets/images/illustration/08.png',
              alt: 'alt',
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
      bg: {
        classes: 'bg-fill-width',
      },
      layoutAlign: 'center center',
      gap: {
        xs: 8,
        sm: 16,
        md: 32,
        lg: 48,
      },
      elements: [
        {
          classes: '',
          row: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
          direction: 'column',
          layoutAlign: 'start start',
          elements: [],
        },
        {
          classes: '',
          row: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
          direction: 'column',
          layoutAlign: 'start start',
          elements: [],
        },
      ],
    },
  },
];
